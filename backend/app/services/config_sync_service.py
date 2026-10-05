"""Mirror a KiCad Project Manager config repository into the workspace.

KiCad Project Manager keeps a team's folder structure and project list as
``kicad-projects.json`` in a dedicated "config repository". Prism reads that
file -- the Project Manager knows nothing about Prism -- and reshapes the
workspace to match: folders are created, renamed and removed, listed
repositories are cloned into their folder, and repositories dropped from the
list are removed again.

The sync only touches what it owns. Every folder and repository it creates or
adopts is recorded in ``ws_config_sync_folders`` / ``ws_config_sync_projects``;
projects imported by hand and folders made in Prism stay where they are.

Project repositories are addressed the same way as the config repository: the
config's ``owner/name`` replaces the config repository's own path in its URL.
A config reached over SSH therefore clones its projects over SSH with the
workspace key, one reached over HTTPS clones them over HTTPS.
"""

from __future__ import annotations

import json
import logging
import shutil
import subprocess
import tempfile
from contextlib import contextmanager
from dataclasses import dataclass, field
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any, Iterator, Optional

from app.services import project_service
from app.services.git_failures import as_access_error
from app.services.git_remote_url import ParsedRemote, parse_remote_url
from app.services.job_runtime import JobContext, JobResult
from app.services.job_service import jobs as v3_jobs
from app.services.postgres_database import database
from app.services.project_import_service import (
    find_existing_repository,
    git_env,
    remote_url_policy,
    start_import_job,
)
from app.services.workspace_service import ProjectHasSignedReleasesError, workspace

logger = logging.getLogger(__name__)

CONFIG_FILE = "kicad-projects.json"
SUPPORTED_FORMAT = 1
JOB_KIND = "config_sync"
REQUESTED_BY = "system:config-sync"
# A failed clone is retried this long after the last attempt, not on every
# pass: a repository without KiCad files would otherwise be re-cloned every
# few minutes forever.
IMPORT_RETRY_AFTER = timedelta(hours=1)
_ACTIVE_JOB_STATES = {"queued", "running", "retry_wait", "cancel_requested"}
_GIT_TIMEOUT_SECONDS = 120


class ConfigSyncError(ValueError):
    """A problem with the config repository the administrator can act on."""


# ---------------------------------------------------------------------------
# Reading the Project Manager's config
# ---------------------------------------------------------------------------

FolderPath = tuple[str, ...]


@dataclass(frozen=True)
class ConfigProject:
    id: str
    name: str
    repo: str
    description: str
    folder: FolderPath


@dataclass
class TeamConfig:
    name: str
    folders: list[FolderPath] = field(default_factory=list)
    projects: list[ConfigProject] = field(default_factory=list)


def _clean_name(value: Any) -> str:
    name = str(value or "").strip()
    if not name or "/" in name or "\\" in name:
        raise ConfigSyncError(f"The config contains an invalid folder name: {value!r}")
    return name


def parse_team_config(data: Any) -> TeamConfig:
    """Read ``kicad-projects.json`` as written by KiCad Project Manager."""
    if not isinstance(data, dict):
        raise ConfigSyncError(f"{CONFIG_FILE} is not a JSON object.")
    try:
        version = int(data.get("format", 1))
    except (TypeError, ValueError):
        raise ConfigSyncError(f"{CONFIG_FILE} has an unreadable format version.") from None
    if version > SUPPORTED_FORMAT:
        raise ConfigSyncError(
            f"{CONFIG_FILE} uses format {version}; this Prism understands format {SUPPORTED_FORMAT}."
        )

    config = TeamConfig(name=str(data.get("name") or "Projects"))
    seen_ids: set[str] = set()

    def walk(node: dict, path: FolderPath) -> None:
        for raw in node.get("projects") or []:
            if not isinstance(raw, dict):
                continue
            project_id = str(raw.get("id") or "").strip()
            repo = str(raw.get("repo") or "").strip().strip("/")
            if not project_id or not repo or "/" not in repo:
                raise ConfigSyncError(f"The config lists a project without an id or owner/name repository: {raw!r}")
            if project_id in seen_ids:
                raise ConfigSyncError(f"The config lists project id {project_id} twice.")
            seen_ids.add(project_id)
            config.projects.append(
                ConfigProject(
                    id=project_id,
                    name=str(raw.get("name") or repo.rpartition("/")[2]).strip(),
                    repo=repo,
                    description=str(raw.get("description") or ""),
                    folder=path,
                )
            )
        names: set[str] = set()
        for raw in node.get("folders") or []:
            if not isinstance(raw, dict):
                continue
            name = _clean_name(raw.get("name"))
            if name in names:
                raise ConfigSyncError(f"The config has two folders named '{name}' in the same place.")
            names.add(name)
            child = (*path, name)
            config.folders.append(child)
            walk(raw, child)

    walk(data, ())
    return config


def project_clone_url(config_remote: ParsedRemote, repo: str) -> str:
    """The clone URL of ``owner/name`` on the config repository's server.

    Swapping only the path keeps the scheme, user and port the administrator
    entered, so projects are reached exactly the way the config was.
    """
    repo = repo.strip().strip("/")
    if repo.endswith(".git"):
        repo = repo[: -len(".git")]
    core = config_remote.path.strip("/")
    position = config_remote.url.rfind(core) if core else -1
    if position < 0:
        raise ConfigSyncError("Could not derive project URLs from the config repository URL.")
    return f"{config_remote.url[:position]}{repo}.git"


def _folder_key(path: FolderPath) -> str:
    return "/".join(path)


# ---------------------------------------------------------------------------
# Git access to the config repository
# ---------------------------------------------------------------------------


def _git(*args: str, cwd: Optional[str] = None) -> str:
    result = subprocess.run(
        ["git", *args],
        cwd=cwd,
        env=git_env(),
        capture_output=True,
        text=True,
        timeout=_GIT_TIMEOUT_SECONDS,
    )
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or f"git {args[0]} failed")
    return result.stdout


def _describe(parsed: ParsedRemote) -> str:
    return f"{parsed.host}/{parsed.path.strip('/').removesuffix('.git')}"


def remote_head(parsed: ParsedRemote) -> Optional[str]:
    """The commit the config repository's default branch points at."""
    try:
        out = _git("ls-remote", parsed.url, "HEAD")
    except Exception as error:
        raise as_access_error(error, target=_describe(parsed), host=parsed.host) from error
    for line in out.splitlines():
        sha, _, ref = line.partition("\t")
        if ref == "HEAD" and sha:
            return sha
    return None


def fetch_config(parsed: ParsedRemote) -> tuple[str, dict]:
    """Read ``kicad-projects.json`` from the default branch.

    A blobless, depth-one clone without checkout: preview images in the config
    repository are never downloaded, only the one file that is read.
    """
    temp_dir = tempfile.mkdtemp(prefix="prism_config_sync_")
    try:
        target = str(Path(temp_dir) / "config")
        try:
            _git("clone", "-q", "--depth", "1", "--filter=blob:none", "--no-checkout", "--", parsed.url, target)
        except Exception as error:
            raise as_access_error(error, target=_describe(parsed), host=parsed.host) from error
        try:
            commit = _git("rev-parse", "HEAD", cwd=target).strip()
        except RuntimeError:
            raise ConfigSyncError("The config repository is empty. Set it up in KiCad Project Manager first.") from None
        try:
            text = _git("show", f"HEAD:{CONFIG_FILE}", cwd=target)
        except RuntimeError:
            raise ConfigSyncError(
                f"The repository has no {CONFIG_FILE}. Choose the config repository KiCad Project Manager created."
            ) from None
        try:
            data = json.loads(text)
        except json.JSONDecodeError as error:
            raise ConfigSyncError(f"{CONFIG_FILE} is not valid JSON: {error}") from None
        return commit, data
    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)


def parse_config_url(url: str) -> ParsedRemote:
    return parse_remote_url(url, remote_url_policy())


def check_repository(url: str) -> dict:
    """Read and validate a config repository without changing anything."""
    parsed = parse_config_url(url)
    commit, data = fetch_config(parsed)
    config = parse_team_config(data)
    projects = []
    for project in config.projects:
        clone_url = project_clone_url(parsed, project.repo)
        try:
            imported = find_existing_repository(parse_config_url(clone_url)) is not None
        except Exception:
            imported = False
        projects.append(
            {
                "id": project.id,
                "name": project.name,
                "repo": project.repo,
                "folder": _folder_key(project.folder),
                "clone_url": clone_url,
                "already_imported": imported,
            }
        )
    return {
        "url": parsed.url,
        "name": config.name,
        "commit": commit,
        "folder_count": len(config.folders),
        "project_count": len(config.projects),
        "projects": projects,
    }


# ---------------------------------------------------------------------------
# Stored settings
# ---------------------------------------------------------------------------


@contextmanager
def _connect() -> Iterator[Any]:
    workspace.initialize()
    with database.connection() as conn:
        conn.execute("SET search_path TO workspace, public")
        yield conn


def _iso(value: Any) -> Any:
    return value.isoformat() if isinstance(value, datetime) else value


def get_settings() -> Optional[dict]:
    with _connect() as conn:
        row = conn.execute("SELECT * FROM ws_config_sync WHERE id='default'").fetchone()
    if not row:
        return None
    data = {key: _iso(value) for key, value in dict(row).items()}
    raw = data.get("config_json")
    data["config_json"] = json.loads(raw) if isinstance(raw, str) else raw
    return data


def get_status() -> dict:
    """What the settings page shows: the repository, the last pass, the backlog."""
    current = get_settings()
    if current is None:
        return {"configured": False}
    with _connect() as conn:
        rows = conn.execute("SELECT * FROM ws_config_sync_projects ORDER BY config_project_id").fetchall()
        folders = conn.execute("SELECT COUNT(*) AS n FROM ws_config_sync_folders").fetchone()
    names: dict[str, str] = {}
    try:
        for project in parse_team_config(current.get("config_json") or {}).projects:
            names[project.id] = project.name
    except ConfigSyncError:
        pass
    problems = [
        {"name": names.get(row["config_project_id"], row["repo_url"]), "url": row["repo_url"], "error": row["last_error"]}
        for row in rows
        if row["last_error"]
    ]
    return {
        "configured": True,
        "url": current["url"],
        "enabled": current["enabled"],
        "name": (current.get("config_json") or {}).get("name"),
        "commit": current.get("config_commit"),
        "last_synced_at": current.get("last_synced_at"),
        "last_status": current.get("last_status"),
        "last_message": current.get("last_message"),
        "updated_by": current.get("updated_by"),
        "updated_at": current.get("updated_at"),
        "managed_folders": int(folders["n"]) if folders else 0,
        "managed_projects": sum(1 for row in rows if row["repo_id"]),
        "pending_imports": sum(1 for row in rows if not row["repo_id"] and not row["last_error"]),
        "problems": problems,
    }


def save_settings(url: str, *, updated_by: str) -> None:
    """Store the config repository. Switching repositories forgets the old mapping.

    Folders and projects the old repository created stay in the workspace as
    ordinary, unmanaged entries; nothing is deleted by changing the URL.
    """
    parsed = parse_config_url(url)
    now = datetime.now(timezone.utc)
    with _connect() as conn:
        row = conn.execute("SELECT url FROM ws_config_sync WHERE id='default' FOR UPDATE").fetchone()
        if row and parse_config_url(row["url"]).dedup_key != parsed.dedup_key:
            conn.execute("DELETE FROM ws_config_sync_folders")
            conn.execute("DELETE FROM ws_config_sync_projects")
        conn.execute(
            """
            INSERT INTO ws_config_sync (id, url, enabled, last_status, last_message, updated_by, updated_at)
            VALUES ('default', %s, TRUE, 'pending', 'Waiting for the first sync', %s, %s)
            ON CONFLICT (id) DO UPDATE SET
                url = EXCLUDED.url,
                enabled = TRUE,
                config_commit = CASE WHEN ws_config_sync.url = EXCLUDED.url THEN ws_config_sync.config_commit END,
                config_json = CASE WHEN ws_config_sync.url = EXCLUDED.url THEN ws_config_sync.config_json END,
                updated_by = EXCLUDED.updated_by,
                updated_at = EXCLUDED.updated_at
            """,
            (parsed.url, updated_by, now),
        )
        conn.commit()


def disconnect() -> bool:
    """Stop mirroring. Everything already in the workspace stays as it is."""
    with _connect() as conn:
        conn.execute("DELETE FROM ws_config_sync_folders")
        conn.execute("DELETE FROM ws_config_sync_projects")
        cursor = conn.execute("DELETE FROM ws_config_sync WHERE id='default'")
        conn.commit()
    return cursor.rowcount > 0


def _record_result(status: str, message: str, *, commit: Optional[str] = None, data: Optional[dict] = None) -> None:
    with _connect() as conn:
        if data is not None:
            conn.execute(
                """UPDATE ws_config_sync SET last_status=%s, last_message=%s, last_synced_at=%s,
                       config_commit=%s, config_json=%s WHERE id='default'""",
                (status, message, datetime.now(timezone.utc), commit, json.dumps(data)),
            )
        else:
            conn.execute(
                "UPDATE ws_config_sync SET last_status=%s, last_message=%s, last_synced_at=%s WHERE id='default'",
                (status, message, datetime.now(timezone.utc)),
            )
        conn.commit()


# ---------------------------------------------------------------------------
# Jobs
# ---------------------------------------------------------------------------


def start_sync_job(*, requested_by: str = REQUESTED_BY) -> str:
    queued = v3_jobs.enqueue(
        JOB_KIND,
        {},
        worker_pool="prism",
        artifact_key="config-sync",
        requested_by=requested_by,
        priority=150,
        max_attempts=1,
        resources={"prism_worker": 1},
        locks=[{"key": "config-sync", "mode": "write"}],
    )
    return str(queued["job_id"])


def enqueue_if_configured() -> Optional[str]:
    """Called by the worker on its interval."""
    current = get_settings()
    if not current or not current.get("enabled"):
        return None
    return start_sync_job()


def run_config_sync_job(context: JobContext) -> JobResult:
    current = get_settings()
    if not current or not current.get("enabled"):
        return JobResult(message="No config repository is configured")
    context.progress(stage="read-config", message="Reading the config repository", percent=5, force=True)
    try:
        parsed = parse_config_url(current["url"])
        commit = current.get("config_commit")
        data = current.get("config_json")
        head = remote_head(parsed)
        if data is None or not head or head != commit:
            commit, data = fetch_config(parsed)
            config = parse_team_config(data)
            _record_result("running", "Applying the config", commit=commit, data=data)
        else:
            config = parse_team_config(data)
    except Exception as error:
        _record_result("error", str(error))
        raise

    context.check_cancelled()
    context.progress(stage="apply", message="Restructuring the workspace", percent=30, force=True)
    try:
        summary = apply_config(config, parsed)
    except Exception as error:
        _record_result("error", f"Applying the config failed: {error}")
        raise
    message = _summarize(summary)
    _record_result("ok", message)
    return JobResult(message=message, details=summary)


def _summarize(summary: dict) -> str:
    parts = [f"{summary['projects']} project(s) in {summary['folders']} folder(s)"]
    for key, label in (
        ("imports_started", "cloning"),
        ("imports_pending", "still cloning"),
        ("removed", "removed"),
        ("failed", "failed"),
    ):
        if summary.get(key):
            parts.append(f"{summary[key]} {label}")
    return ", ".join(parts)


# ---------------------------------------------------------------------------
# Reconciliation
# ---------------------------------------------------------------------------


def _folder_children(parent_id: Optional[str]) -> list[dict]:
    return list(workspace.get_folder_contents(parent_id)["folders"])


def _reconcile_folders(desired: list[FolderPath]) -> tuple[dict[FolderPath, str], dict[str, str]]:
    """Create or move the configured folders. Returns path→id and the stale mapping."""
    with _connect() as conn:
        mapped = {str(row["path"]): str(row["folder_id"]) for row in conn.execute("SELECT * FROM ws_config_sync_folders").fetchall()}

    resolved: dict[FolderPath, str] = {}
    for path in sorted(desired, key=len):
        parent_id = resolved[path[:-1]] if len(path) > 1 else None
        name = path[-1]
        folder_id = mapped.get(_folder_key(path))
        folder = workspace.get_folder(folder_id) if folder_id else None
        if folder is not None:
            # Someone moved or renamed it in Prism; the config wins.
            if folder["name"] != name or folder.get("parent_id") != parent_id:
                workspace.update_folder(folder_id, name=name, parent_id=parent_id, _use_parent=True)
        else:
            existing = next((f for f in _folder_children(parent_id) if f["name"] == name), None)
            folder_id = str(existing["id"]) if existing else str(workspace.create_folder(name, parent_id)["id"])
        resolved[path] = folder_id

    keep = {_folder_key(path) for path in resolved}
    stale = {path: folder_id for path, folder_id in mapped.items() if path not in keep}
    with _connect() as conn:
        for path, folder_id in resolved.items():
            conn.execute(
                """INSERT INTO ws_config_sync_folders (path, folder_id) VALUES (%s, %s)
                   ON CONFLICT (path) DO UPDATE SET folder_id = EXCLUDED.folder_id""",
                (_folder_key(path), folder_id),
            )
        conn.commit()
    return resolved, stale


def _remove_stale_folders(stale: dict[str, str]) -> None:
    """Delete folders dropped from the config, deepest first, if nothing else lives there."""
    for path, folder_id in sorted(stale.items(), key=lambda item: -item[0].count("/")):
        folder = workspace.get_folder(folder_id)
        if folder is not None:
            contents = workspace.get_folder_contents(folder_id)
            if contents["folders"] or contents["projects"]:
                # Holds something Prism users put there; leave it, unmanaged.
                logger.info("Config sync keeps non-empty folder %s", path)
            else:
                workspace.delete_folder(folder_id, cascade=False)
        with _connect() as conn:
            conn.execute("DELETE FROM ws_config_sync_folders WHERE path=%s", (path,))
            conn.commit()


def _place_projects(repo_id: str, project: ConfigProject, folder_id: Optional[str]) -> None:
    rows = workspace.get_projects_by_repo(repo_id)
    ids = [str(row["id"]) for row in rows if row.get("folder_id") != folder_id]
    if ids:
        workspace.move_projects_to_folder(ids, folder_id)
    if len(rows) == 1:
        row = rows[0]
        updates: dict[str, Any] = {}
        if project.name and row.get("display_name") != project.name:
            updates["display_name"] = project.name
        if project.description and row.get("description") != project.description:
            updates["description"] = project.description
        if updates:
            workspace.update_project(str(row["id"]), **updates)


def remove_repository(repo_id: str) -> bool:
    """Remove a repository the config no longer lists: its projects, comments and checkout.

    A project with signed release records is kept (the audit trail must not be
    erased by a list edit) and moved to the top level instead.
    """
    from app.services.comments_store_service import comments_store

    repository = workspace.get_repository(repo_id)
    if repository is None:
        return True
    kept = False
    for row in workspace.get_projects_by_repo(repo_id):
        project_id = str(row["id"])
        try:
            workspace.delete_project(project_id, force=False)
        except ProjectHasSignedReleasesError:
            workspace.move_project_to_folder(project_id, None)
            kept = True
            continue
        try:
            comments_store.delete_project_comments(project_id)
        except Exception:
            logger.exception("Config sync could not delete comments of %s", project_id)
    if kept:
        return False
    clone_path = workspace.repository_clone_path(repository)
    workspace.delete_repository(repo_id)
    try:
        root = Path(project_service.PROJECTS_ROOT).resolve()
        target = Path(clone_path).resolve()
        if target != root and root in target.parents and target.exists():
            shutil.rmtree(target)
    except Exception:
        logger.exception("Config sync could not delete the checkout of %s", repo_id)
    return True


def _import_state(row: Optional[dict], now: datetime) -> tuple[bool, str]:
    """Whether to start a clone now, and the error to record if not."""
    if not row or not row.get("import_job_id"):
        return True, ""
    job = v3_jobs.get(str(row["import_job_id"]))
    if job and job.get("status") in _ACTIVE_JOB_STATES:
        return False, ""
    error = str((job or {}).get("error_message") or row.get("last_error") or "")
    if job and job.get("status") == "completed":
        # Finished, yet the repository is unknown: it was deleted since. Clone again.
        return True, ""
    requested = row.get("import_requested_at")
    if isinstance(requested, str):
        requested = datetime.fromisoformat(requested)
    if requested and now - requested < IMPORT_RETRY_AFTER:
        return False, error or "Clone failed"
    return True, ""


def apply_config(config: TeamConfig, config_remote: ParsedRemote) -> dict:
    folder_ids, stale_folders = _reconcile_folders(config.folders)
    now = datetime.now(timezone.utc)
    with _connect() as conn:
        rows = {
            str(row["config_project_id"]): dict(row)
            for row in conn.execute("SELECT * FROM ws_config_sync_projects").fetchall()
        }

    summary = {
        "name": config.name,
        "folders": len(config.folders),
        "projects": len(config.projects),
        "imports_started": 0,
        "imports_pending": 0,
        "removed": 0,
        "failed": 0,
    }

    for project in config.projects:
        folder_id = folder_ids.get(project.folder) if project.folder else None
        row = rows.get(project.id)
        try:
            clone_url = project_clone_url(config_remote, project.repo)
            parsed = parse_config_url(clone_url)
        except Exception as error:
            _save_project_row(project.id, project.repo, None, error=str(error))
            summary["failed"] += 1
            continue

        repo_id = str(row["repo_id"]) if row and row.get("repo_id") else None
        if row and row["repo_url"] != parsed.url and repo_id:
            # The entry now points at another repository.
            remove_repository(repo_id)
            repo_id = None
        if repo_id and workspace.get_repository(repo_id) is None:
            repo_id = None
        if repo_id is None:
            existing = find_existing_repository(parsed)
            repo_id = str(existing["id"]) if existing else None

        if repo_id:
            _place_projects(repo_id, project, folder_id)
            _save_project_row(project.id, parsed.url, repo_id)
            continue

        start, error = _import_state(row if row and row["repo_url"] == parsed.url else None, now)
        if not start:
            if error:
                summary["failed"] += 1
                _save_project_row(project.id, parsed.url, None, error=error, keep_job=True)
            else:
                summary["imports_pending"] += 1
            continue
        try:
            job_id = start_import_job(
                parsed.url,
                "type2",
                requested_by=REQUESTED_BY,
                import_all=True,
                folder_id=folder_id,
            )
        except Exception as error:
            _save_project_row(project.id, parsed.url, None, error=str(error))
            summary["failed"] += 1
            continue
        _save_project_row(project.id, parsed.url, None, job_id=job_id, requested_at=now)
        summary["imports_started"] += 1

    listed = {project.id for project in config.projects}
    for config_id, row in rows.items():
        if config_id in listed:
            continue
        if row.get("repo_id"):
            remove_repository(str(row["repo_id"]))
            summary["removed"] += 1
        with _connect() as conn:
            conn.execute("DELETE FROM ws_config_sync_projects WHERE config_project_id=%s", (config_id,))
            conn.commit()

    _remove_stale_folders(stale_folders)
    return summary


def _save_project_row(
    config_id: str,
    repo_url: str,
    repo_id: Optional[str],
    *,
    error: str = "",
    job_id: Optional[str] = None,
    requested_at: Optional[datetime] = None,
    keep_job: bool = False,
) -> None:
    with _connect() as conn:
        if keep_job:
            conn.execute(
                """INSERT INTO ws_config_sync_projects (config_project_id, repo_url, repo_id, last_error)
                   VALUES (%s, %s, %s, %s)
                   ON CONFLICT (config_project_id) DO UPDATE SET
                       repo_url = EXCLUDED.repo_url, repo_id = EXCLUDED.repo_id, last_error = EXCLUDED.last_error""",
                (config_id, repo_url, repo_id, error),
            )
        else:
            conn.execute(
                """INSERT INTO ws_config_sync_projects
                       (config_project_id, repo_url, repo_id, import_job_id, import_requested_at, last_error)
                   VALUES (%s, %s, %s, %s, %s, %s)
                   ON CONFLICT (config_project_id) DO UPDATE SET
                       repo_url = EXCLUDED.repo_url, repo_id = EXCLUDED.repo_id,
                       import_job_id = COALESCE(EXCLUDED.import_job_id, CASE WHEN EXCLUDED.repo_id IS NULL
                           THEN ws_config_sync_projects.import_job_id END),
                       import_requested_at = COALESCE(EXCLUDED.import_requested_at, CASE WHEN EXCLUDED.repo_id IS NULL
                           THEN ws_config_sync_projects.import_requested_at END),
                       last_error = EXCLUDED.last_error""",
                (config_id, repo_url, repo_id, job_id, requested_at, error),
            )
        conn.commit()
