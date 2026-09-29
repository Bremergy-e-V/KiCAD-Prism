"""System Builder application service: the SYS-04 CRUD surface of §8.

Each public method runs in one transaction, authorizes the caller against the
system (§8.2), applies O1 redaction, and turns ``SystemStore`` results into
the camelCase documents the API returns. Git lookups run before the
transaction; extraction jobs are enqueued after it commits.

Detection, reviews, validation, snapshots and imports arrive with their own
tickets (SYS-06 to SYS-10) and extend this service.
"""

from __future__ import annotations

import json
import logging
import re
from contextlib import contextmanager
from dataclasses import dataclass
from datetime import datetime
from typing import Any, Callable, ContextManager, Iterator, Mapping, Optional, Sequence

from app.core.roles import Role
from app.services.systems import drift, exposure, reconcile, sources, validation, visibility
from app.services.systems.interface_extractor import EXTRACTOR_VERSION
from app.services.systems.jobs import (
    EXTRACT_JOB_KIND,
    artifact_key,
    enqueue_extraction,
    workspace_connection,
)
from app.services.systems.store import Conflict, Invalid, NotFound, SystemStore

logger = logging.getLogger(__name__)

MAX_LAYOUT_ENTRIES = 1000
_FULL_SHA = re.compile(r"^[0-9a-f]{40}$")


@dataclass(frozen=True)
class Caller:
    role: Role
    email: str

    @property
    def actor(self) -> str:
        return f"user:{self.email or 'anonymous'}"


@dataclass(frozen=True)
class Result:
    """A payload plus the system version after the call (for the ETag)."""

    body: Any
    system_id: str
    version: int

    @property
    def etag(self) -> str:
        return visibility.etag(self.system_id, self.version)


def _iso(value: Any) -> Any:
    return value.isoformat() if isinstance(value, datetime) else value


def _default_project_loader(project_id: str) -> Any:
    # Role-blind by design: every caller authorizes the project first, through
    # ``visibility.project_access`` (``_require_project``/``_open_instance``).
    from app.services.project_service import _workspace_row_to_project
    from app.services.workspace_service import workspace

    row = workspace.get_project_by_id(project_id)
    return _workspace_row_to_project(row) if row else None


def _default_enqueue_check(instance_id: str, project_id: str, *, requested_by: str) -> Mapping[str, Any]:
    from app.services.systems.detection import enqueue_instance_check

    return enqueue_instance_check(instance_id, project_id, requested_by=requested_by)


class SystemService:
    def __init__(
        self,
        *,
        connect: Callable[[], ContextManager[Any]] = workspace_connection,
        project_loader: Callable[[str], Any] = _default_project_loader,
        enqueue: Callable[..., Mapping[str, Any]] = enqueue_extraction,
        enqueue_check: Callable[..., Mapping[str, Any]] | None = None,
    ) -> None:
        self._connect = connect
        self._load_project = project_loader
        self._enqueue = enqueue
        self._enqueue_check = enqueue_check or _default_enqueue_check

    # ------------------------------------------------------------------
    # Plumbing

    @contextmanager
    def _tx(self) -> Iterator[SystemStore]:
        with self._connect() as conn:
            try:
                yield SystemStore(conn)
                conn.commit()
            except BaseException:
                conn.rollback()
                raise

    def _system(self, store: SystemStore, system_id: str, caller: Caller) -> dict:
        found = visibility.visible_systems(store.conn, caller.role, system_id=system_id)
        if not found:
            raise NotFound("System not found")
        return found[0]

    def _access(self, store: SystemStore, instances: Sequence[dict], caller: Caller) -> dict[str, dict]:
        return visibility.project_access(store.conn, [i["project_id"] for i in instances], caller.role)

    def _open_instance(
        self, store: SystemStore, system_id: str, instance_id: str, caller: Caller
    ) -> dict:
        """An instance the caller may change; restricted ones are 404 (§8.2)."""

        try:
            instance = store.get_instance(system_id, instance_id)
        except NotFound:
            raise NotFound("Instance not found") from None
        access = self._access(store, [instance], caller).get(instance["project_id"])
        if access is not None and not access["visible"]:
            raise NotFound("Instance not found")
        return instance

    def _interface(self, store: SystemStore, instance: dict) -> dict:
        found = store.get_interface(instance["project_id"], instance["baseline_commit"], EXTRACTOR_VERSION)
        if found is None:
            raise Conflict("interface_not_ready: the board interface at this baseline is still being extracted")
        return found

    def _require_project(self, store: SystemStore, project_id: str, caller: Caller) -> Any:
        access = visibility.project_access(store.conn, [project_id], caller.role).get(project_id)
        project = self._load_project(project_id) if access and access["visible"] else None
        if project is None:
            raise NotFound("Project not found")
        return project

    def _enqueue_quietly(self, project_id: str, commit: str, caller: Caller) -> Optional[dict]:
        try:
            return dict(self._enqueue(project_id, commit, requested_by=caller.email))
        except Exception:  # extraction is re-requested by the next read
            logger.exception("Could not enqueue interface extraction for %s@%s", project_id, commit)
            return None

    # ------------------------------------------------------------------
    # Systems

    def list_systems(self, caller: Caller) -> list[dict]:
        with self._tx() as store:
            return visibility.visible_systems(store.conn, caller.role)

    def create_system(
        self, caller: Caller, *, name: str, description: str, folder_id: Optional[str]
    ) -> Result:
        with self._tx() as store:
            if folder_id is not None and not visibility.folder_visible(store.conn, folder_id, caller.role):
                raise Invalid("folderId does not name a folder")
            row = store.create_system(
                name=name, description=description, folder_id=folder_id, actor=caller.actor
            )
            body = self._system(store, row["id"], caller)
        return Result(body, row["id"], body["version"])

    def update_system(
        self, caller: Caller, system_id: str, version: int, fields: Mapping[str, Any]
    ) -> Result:
        with self._tx() as store:
            self._system(store, system_id, caller)
            folder_id = fields.get("folderId", ...)
            if folder_id not in (..., None) and not visibility.folder_visible(
                store.conn, folder_id, caller.role
            ):
                raise Invalid("folderId does not name a folder")
            with store.mutation(system_id, expected_version=version, actor=caller.actor) as change:
                store.update_system(
                    change, name=fields.get("name"), description=fields.get("description"),
                    folder_id=folder_id,
                )
            body = self._system(store, system_id, caller)
        return Result(body, system_id, change.version)

    def delete_system(self, caller: Caller, system_id: str, version: int) -> None:
        with self._tx() as store:
            self._system(store, system_id, caller)
            access = self._access(store, store.list_instances(system_id), caller)
            if any(not seen["visible"] for seen in access.values()):
                # Deleting would destroy rows of a board the caller cannot see.
                raise Conflict("system contains restricted boards")
            with store.mutation(system_id, expected_version=version, actor=caller.actor):
                pass
            store.delete_system(system_id)

    # ------------------------------------------------------------------
    # The system document (§8.1)

    def document(self, caller: Caller, system_id: str) -> Result:
        with self._tx() as store:
            system = self._system(store, system_id, caller)
            instances = store.list_instances(system_id)
            links = store.list_links(system_id)
            access = self._access(store, instances, caller)
            restricted = {
                i["id"] for i in instances
                if access.get(i["project_id"]) is not None and not access[i["project_id"]]["visible"]
            }
            interfaces: dict[str, dict] = {}
            for instance in instances:
                if instance["id"] in restricted:
                    continue
                found = store.get_interface(
                    instance["project_id"], instance["baseline_commit"], EXTRACTOR_VERSION
                )
                if found is not None:
                    interfaces[instance["id"]] = found
            pending = [i for i in instances if i["id"] not in restricted and i["id"] not in interfaces]
            job_state = self._latest_jobs(store, pending)
            overrides = {i["id"]: store.list_overrides(i["id"]) for i in instances if i["id"] in interfaces}

            body = {
                "system": system,
                "instances": [
                    self._instance_doc(i, access.get(i["project_id"]), i["id"] in restricted,
                                       interfaces.get(i["id"]), overrides.get(i["id"], {}),
                                       job_state.get(artifact_key(i["project_id"], i["baseline_commit"])))
                    for i in instances
                ],
                "links": [self._link_doc(link, restricted, interfaces, overrides) for link in links],
                "openReviewCount": system["openReviewCount"],
                "findingCounts": self._validate(store, system_id, instances, links, interfaces,
                                                job_state)["counts"],
            }
        for instance in pending:
            key = artifact_key(instance["project_id"], instance["baseline_commit"])
            if key not in job_state and instance["resolution"] == "resolved":
                self._enqueue_quietly(instance["project_id"], instance["baseline_commit"], caller)
        return Result(body, system_id, system["version"])

    def _validate(
        self, store: SystemStore, system_id: str, instances: Sequence[dict], links: Sequence[dict],
        interfaces: Mapping[str, dict], job_state: Mapping[str, dict],
    ) -> dict:
        """§7.2 over the live state; an instance's failed extraction makes its source unavailable."""

        unavailable = {}
        for instance in instances:
            job = job_state.get(artifact_key(instance["project_id"], instance["baseline_commit"]))
            if instance["id"] not in interfaces and job and job["status"] in ("failed", "cancelled"):
                unavailable[instance["id"]] = job["error_code"] or "extraction_failed"
        return validation.validate(
            instances, links, {i["id"]: interfaces.get(i["id"]) for i in instances},
            {i["id"]: store.list_overrides(i["id"]) for i in instances},
            store.list_reviews(system_id, status="open"), unavailable=unavailable,
        )

    def validation_report(self, caller: Caller, system_id: str) -> Result:
        """``GET …/validation`` (§7.2), redacted for restricted boards (§8.2)."""

        with self._tx() as store:
            system = self._system(store, system_id, caller)
            instances = store.list_instances(system_id)
            links = store.list_links(system_id)
            interfaces = {}
            for instance in instances:
                found = store.get_interface(instance["project_id"], instance["baseline_commit"],
                                            EXTRACTOR_VERSION)
                if found is not None:
                    interfaces[instance["id"]] = found
            job_state = self._latest_jobs(store, [i for i in instances if i["id"] not in interfaces])
            report = self._validate(store, system_id, instances, links, interfaces, job_state)
            restricted = self._restricted_instances(store, system_id, caller)
        for finding in report["findings"]:
            if finding["instanceId"] in restricted:
                finding.update(reference=None, pin=None, detail=None, redacted=True)
            else:
                finding["redacted"] = False
        for entry in report["exempt"]:
            if entry["instanceId"] in restricted:
                entry.update(reference=None, pin=None, portKey=None, redacted=True)
        return Result(report, system_id, system["version"])

    def _latest_jobs(self, store: SystemStore, instances: Sequence[dict]) -> dict[str, dict]:
        keys = sorted({artifact_key(i["project_id"], i["baseline_commit"]) for i in instances})
        if not keys:
            return {}
        rows = store.conn.execute(
            """
            SELECT DISTINCT ON (artifact_key) id, artifact_key, status, error_code
            FROM ws_jobs
            WHERE kind = %s AND artifact_key = ANY(%s)
            ORDER BY artifact_key, created_at DESC
            """,
            (EXTRACT_JOB_KIND, keys),
        ).fetchall()
        return {row["artifact_key"]: dict(row) for row in rows}

    @staticmethod
    def _interface_state(interface: Optional[dict], job: Optional[dict]) -> dict:
        if interface is not None:
            return {"status": "ready", "digest": interface["digest"], "hasPcb": interface["hasPcb"],
                    "jobId": None, "errorCode": None}
        if job is not None and job["status"] in ("failed", "cancelled"):
            return {"status": "failed", "digest": None, "hasPcb": None,
                    "jobId": str(job["id"]), "errorCode": job["error_code"] or "extraction_failed"}
        return {"status": "pending", "digest": None, "hasPcb": None,
                "jobId": str(job["id"]) if job else None, "errorCode": None}

    def _instance_doc(
        self, instance: dict, access: Optional[dict], restricted: bool,
        interface: Optional[dict], overrides: Mapping[str, str], job: Optional[dict],
    ) -> dict:
        if restricted:
            return {
                "id": instance["id"], "label": instance["label"], "restricted": True, "redacted": True,
                "projectId": None, "projectName": None, "baselineCommit": None, "trackedRef": None,
                "pinned": instance["pinned"], "resolution": instance["resolution"],
                "tipCommit": None, "tipCheckedAt": None, "updateAvailable": None,
                "interface": None, "ports": None,
            }
        tip = instance["tip_commit"]
        return {
            "id": instance["id"],
            "label": instance["label"],
            "restricted": False,
            "projectId": instance["project_id"],
            "projectName": access["name"] if access else None,
            "baselineCommit": instance["baseline_commit"],
            "trackedRef": instance["tracked_ref"],
            "pinned": instance["pinned"],
            "resolution": instance["resolution"],
            "tipCommit": tip,
            "tipCheckedAt": _iso(instance["tip_checked_at"]),
            "updateAvailable": bool(tip) and tip != instance["baseline_commit"],
            "interface": self._interface_state(interface, job),
            # Exposed ports plus any the user overrode; the full list is GET …/interface.
            "ports": None if interface is None else [
                port for port in exposure.resolve_ports(interface, overrides)
                if port["exposed"] or port["override"] is not None
            ],
        }

    @staticmethod
    def _observed(pin: Optional[dict]) -> Optional[dict]:
        if pin is None:
            return {"present": False, "nets": None, "pcbNets": None, "pinNames": None, "pinTypes": None}
        return {"present": True, "nets": pin["nets"], "pcbNets": pin.get("pcbNets"),
                "pinNames": pin.get("pinNames"), "pinTypes": pin.get("pinTypes")}

    def _link_doc(
        self, link: dict, restricted: set[str], interfaces: Mapping[str, dict],
        overrides: Mapping[str, Mapping[str, str]],
    ) -> dict:
        ends: dict[str, dict] = {}
        pins: dict[str, Optional[dict]] = {}
        for end in ("a", "b"):
            instance_id = link[f"{end}_instance_id"]
            port = dict(link[f"{end}_port"])
            if instance_id in restricted:
                ends[end] = {"instanceId": instance_id, "redacted": True, "port": None,
                             "resolved": None, "exposed": None}
                pins[end] = None
                continue
            interface = interfaces.get(instance_id)
            component = exposure.component_by_key(interface, port["portKey"]) if interface else None
            ends[end] = {
                "instanceId": instance_id,
                "redacted": False,
                "port": port,
                "resolved": None if interface is None else component is not None,
                "exposed": None if component is None else exposure.is_exposed(
                    component, overrides.get(instance_id, {}).get(component["portKey"])
                ),
            }
            pins[end] = exposure.pins_by_pad(component) if component is not None else None

        rows = []
        for row in link["rows"]:
            doc: dict[str, Any] = {"id": row["id"], "signal": row["signal"], "source": row["source"]}
            redacted_ends = []
            for end, column in (("a", "A"), ("b", "B")):
                if ends[end]["redacted"]:
                    redacted_ends.append(end)
                    doc[f"pin{column}"] = doc[f"net{column}"] = doc[f"observed{column}"] = None
                    continue
                pad = row[f"pin_{end}"]
                doc[f"pin{column}"] = pad
                doc[f"net{column}"] = list(row[f"net_{end}"])
                doc[f"observed{column}"] = (
                    None if pins[end] is None else self._observed(pins[end].get(pad))
                )
            doc["redacted"] = bool(redacted_ends)
            doc["redactedEnds"] = redacted_ends
            rows.append(doc)
        return {
            "id": link["id"],
            "name": link["name"],
            "harness": link["harness"],
            "a": ends["a"],
            "b": ends["b"],
            "rows": rows,
            "updatedAt": _iso(link["updated_at"]),
        }

    # ------------------------------------------------------------------
    # Instances

    def add_instance(
        self, caller: Caller, system_id: str, version: int, *, project_id: str, label: str,
        baseline_commit: Optional[str], tracked_ref: Optional[str], pinned: bool,
    ) -> Result:
        with self._tx() as store:
            self._system(store, system_id, caller)
            project = self._require_project(store, project_id, caller)
        commit = self._resolve_baseline(project, baseline_commit, tracked_ref)
        with self._tx() as store:
            self._system(store, system_id, caller)
            with store.mutation(system_id, expected_version=version, actor=caller.actor) as change:
                row = store.add_instance(
                    change, project_id=project_id, label=label, baseline_commit=commit,
                    tracked_ref=tracked_ref, pinned=pinned,
                )
        self._enqueue_quietly(project_id, commit, caller)
        return Result(self._instance_row(row), system_id, change.version)

    def _resolve_baseline(
        self, project: Any, baseline_commit: Optional[str], tracked_ref: Optional[str]
    ) -> str:
        try:
            if tracked_ref is not None:
                tip = sources.resolve_tracked_ref(project, tracked_ref)
                if tip is None:
                    raise Invalid("trackedRef does not exist in the project repository")
            else:
                tip = None
            if baseline_commit is None:
                if tip is None:
                    raise Invalid("baselineCommit or trackedRef is required")
                return tip  # resolved once (§8.1)
            commit = sources.resolve_commit(project, baseline_commit)
        except sources.SourceError as error:
            raise Invalid(str(error)) from None
        if commit is None:
            raise Invalid("baselineCommit does not exist in the project repository")
        return commit

    @staticmethod
    def _instance_row(row: Mapping[str, Any]) -> dict:
        return {
            "id": row["id"], "label": row["label"], "projectId": row["project_id"],
            "baselineCommit": row["baseline_commit"], "trackedRef": row["tracked_ref"],
            "pinned": row["pinned"], "resolution": row["resolution"],
            "tipCommit": row["tip_commit"], "tipCheckedAt": _iso(row["tip_checked_at"]),
        }

    def update_instance(
        self, caller: Caller, system_id: str, version: int, instance_id: str,
        fields: Mapping[str, Any],
    ) -> Result:
        tracked_ref = fields.get("trackedRef", ...)
        if tracked_ref not in (..., None):
            with self._tx() as store:
                self._system(store, system_id, caller)
                instance = self._open_instance(store, system_id, instance_id, caller)
                project = self._require_project(store, instance["project_id"], caller)
            try:
                if sources.resolve_tracked_ref(project, tracked_ref) is None:
                    raise Invalid("trackedRef does not exist in the project repository")
            except sources.SourceError as error:
                raise Invalid(str(error)) from None
        with self._tx() as store:
            self._system(store, system_id, caller)
            with store.mutation(system_id, expected_version=version, actor=caller.actor) as change:
                self._open_instance(store, system_id, instance_id, caller)
                row = store.update_instance(
                    change, instance_id, label=fields.get("label"), pinned=fields.get("pinned"),
                    tracked_ref=tracked_ref,
                )
        return Result(self._instance_row(row), system_id, change.version)

    def remove_instance(
        self, caller: Caller, system_id: str, version: int, instance_id: str, *, cascade: bool
    ) -> Result:
        with self._tx() as store:
            self._system(store, system_id, caller)
            with store.mutation(system_id, expected_version=version, actor=caller.actor) as change:
                self._open_instance(store, system_id, instance_id, caller)
                if cascade:
                    self._require_open_links(store, system_id, caller, instance_id=instance_id)
                store.remove_instance(change, instance_id, cascade_links=cascade)
        return Result(None, system_id, change.version)

    def _require_open_links(
        self, store: SystemStore, system_id: str, caller: Caller, *, instance_id: str
    ) -> None:
        """Cascading must not delete a link whose other end the caller cannot see."""

        instances = {i["id"]: i for i in store.list_instances(system_id)}
        access = self._access(store, list(instances.values()), caller)
        for link in store.list_links(system_id):
            if instance_id not in (link["a_instance_id"], link["b_instance_id"]):
                continue
            for other in (link["a_instance_id"], link["b_instance_id"]):
                seen = access.get(instances[other]["project_id"])
                if seen is not None and not seen["visible"]:
                    raise NotFound("Link not found")

    def interface(
        self, caller: Caller, system_id: str, instance_id: str, commit: Optional[str]
    ) -> tuple[str, dict]:
        """``("ready", body)`` or ``("queued", job)`` (§8.1 ``202``)."""

        with self._tx() as store:
            self._system(store, system_id, caller)
            instance = self._open_instance(store, system_id, instance_id, caller)
            target = instance["baseline_commit"]
            if commit is not None:
                target = commit.strip().lower()
                if not _FULL_SHA.match(target):
                    raise Invalid("commit must be a full 40-character SHA")
            found = store.get_interface(instance["project_id"], target, EXTRACTOR_VERSION)
            overrides = store.list_overrides(instance_id)
        if found is not None:
            ports = {p["portKey"]: p for p in exposure.resolve_ports(found, overrides)}
            body = dict(found)
            body["components"] = [
                {**component, "override": ports[component["portKey"]]["override"],
                 "exposed": ports[component["portKey"]]["exposed"]}
                for component in found.get("components") or []
            ]
            body["instanceId"] = instance_id
            body["atBaseline"] = target == instance["baseline_commit"]
            return "ready", body
        if target != instance["baseline_commit"]:
            project = self._load_project(instance["project_id"])
            try:
                exists = project is not None and sources.resolve_commit(project, target) == target
            except sources.SourceError:
                exists = False
            if not exists:
                raise NotFound("Commit not found")
        job = self._enqueue(instance["project_id"], target, requested_by=caller.email)
        return "queued", {"job_id": str(job["job_id"]), "status": job["status"]}

    def check_now(self, caller: Caller, system_id: str, instance_id: str) -> dict:
        """``POST …/check`` (§8.1): queue detection for one instance now."""

        with self._tx() as store:
            self._system(store, system_id, caller)
            instance = self._open_instance(store, system_id, instance_id, caller)
        if not instance["tracked_ref"]:
            raise Conflict("instance does not track a branch")
        job = self._enqueue_check(instance_id, instance["project_id"], requested_by=caller.email)
        return {"job_id": str(job["job_id"]), "status": job["status"]}

    def set_override(
        self, caller: Caller, system_id: str, version: int, instance_id: str, port_key: str,
        state: Optional[str],
    ) -> Result:
        with self._tx() as store:
            self._system(store, system_id, caller)
            with store.mutation(system_id, expected_version=version, actor=caller.actor) as change:
                instance = self._open_instance(store, system_id, instance_id, caller)
                interface = self._interface(store, instance)
                component = next(
                    (c for c in interface.get("components") or [] if c["portKey"] == port_key), None
                )
                if component is None:
                    raise Invalid("portKey is not a component of this board at its baseline")
                if state == "promoted" and not exposure.is_annotated(component["reference"]):
                    raise Invalid("an unannotated component cannot be promoted")
                store.set_override(change, instance_id, port_key, state)
                summary = exposure.port_summary(component, state)
        return Result(summary, system_id, change.version)

    # ------------------------------------------------------------------
    # Links and rows

    def _visible_link(self, store: SystemStore, system_id: str, link_id: str, caller: Caller) -> dict:
        try:
            link = store.get_link(system_id, link_id)
        except NotFound:
            raise NotFound("Link not found") from None
        for end in ("a", "b"):
            try:
                self._open_instance(store, system_id, link[f"{end}_instance_id"], caller)
            except NotFound:
                raise NotFound("Link not found") from None
        return link

    def _link_body(self, store: SystemStore, system_id: str, link_id: str) -> dict:
        instances = store.list_instances(system_id)
        link = store.get_link(system_id, link_id)
        interfaces: dict[str, dict] = {}
        overrides: dict[str, dict] = {}
        for instance in instances:
            if instance["id"] in (link["a_instance_id"], link["b_instance_id"]):
                found = store.get_interface(
                    instance["project_id"], instance["baseline_commit"], EXTRACTOR_VERSION
                )
                if found is not None:
                    interfaces[instance["id"]] = found
                    overrides[instance["id"]] = store.list_overrides(instance["id"])
        return self._link_doc(link, set(), interfaces, overrides)

    def create_link(
        self, caller: Caller, system_id: str, version: int, *, a: Mapping[str, str],
        b: Mapping[str, str], name: str, harness: Optional[str],
    ) -> Result:
        with self._tx() as store:
            self._system(store, system_id, caller)
            with store.mutation(system_id, expected_version=version, actor=caller.actor) as change:
                baselines = []
                for end in (a, b):
                    instance = self._open_instance(store, system_id, end["instanceId"], caller)
                    interface = self._interface(store, instance)
                    component = exposure.component_by_key(interface, end["portKey"])
                    if component is None:
                        raise Invalid("portKey is not a component of this board at its baseline")
                    override = store.list_overrides(instance["id"]).get(component["portKey"])
                    if not exposure.is_exposed(component, override):
                        raise Conflict("port is not exposed on this board")
                    baselines.append(exposure.port_baseline(component))
                link = store.create_link(
                    change, a_instance_id=a["instanceId"], a_port=baselines[0],
                    b_instance_id=b["instanceId"], b_port=baselines[1], name=name, harness=harness,
                )
                body = self._link_body(store, system_id, link["id"])
        return Result(body, system_id, change.version)

    def update_link(
        self, caller: Caller, system_id: str, version: int, link_id: str, fields: Mapping[str, Any]
    ) -> Result:
        with self._tx() as store:
            self._system(store, system_id, caller)
            with store.mutation(system_id, expected_version=version, actor=caller.actor) as change:
                self._visible_link(store, system_id, link_id, caller)
                store.update_link(
                    change, link_id, name=fields.get("name"), harness=fields.get("harness", ...)
                )
                body = self._link_body(store, system_id, link_id)
        return Result(body, system_id, change.version)

    def delete_link(self, caller: Caller, system_id: str, version: int, link_id: str) -> Result:
        with self._tx() as store:
            self._system(store, system_id, caller)
            with store.mutation(system_id, expected_version=version, actor=caller.actor) as change:
                self._visible_link(store, system_id, link_id, caller)
                store.delete_link(change, link_id)
        return Result(None, system_id, change.version)

    def replace_rows(
        self, caller: Caller, system_id: str, version: int, link_id: str,
        rows: Sequence[Mapping[str, Any]],
    ) -> Result:
        with self._tx() as store:
            self._system(store, system_id, caller)
            with store.mutation(system_id, expected_version=version, actor=caller.actor) as change:
                link = self._visible_link(store, system_id, link_id, caller)
                pins: dict[str, dict[str, dict]] = {}
                references: dict[str, str] = {}
                for end in ("a", "b"):
                    instance = store.get_instance(system_id, link[f"{end}_instance_id"])
                    interface = self._interface(store, instance)
                    component = exposure.component_by_key(interface, link[f"{end}_port"]["portKey"])
                    if component is None:
                        raise Conflict("a link end no longer resolves at its baseline; resolve its review first")
                    pins[end] = exposure.pins_by_pad(component)
                    references[end] = component["reference"]
                captured = []
                for row in rows:
                    item = dict(row)
                    for end, column in (("a", "A"), ("b", "B")):
                        pad = str(item.get(f"pin{column}") or "")
                        if pad and pad not in pins[end]:
                            raise Invalid(f"pin {pad} does not exist on {references[end]}")
                        item[f"net{column}"] = pins[end][pad]["nets"] if pad else []
                    captured.append(item)
                store.replace_rows(change, link_id, captured)
                body = self._link_body(store, system_id, link_id)
        return Result(body, system_id, change.version)

    # ------------------------------------------------------------------
    # Reviews and rebase (§7.1, §8.1)

    def _review_doc(self, store: SystemStore, review: Mapping[str, Any], restricted: bool) -> dict:
        base = {"id": review["id"], "kind": review["kind"], "status": review["status"],
                "instanceId": review["instance_id"], "createdAt": _iso(review["created_at"]),
                "decidedBy": review["decided_by"], "decidedAt": _iso(review["decided_at"])}
        if restricted:
            return {**base, "redacted": True, "fromCommit": None, "toCommit": None,
                    "pendingChanges": None, "items": None}
        rows = {row["id"]: row for link in store.list_links(review["system_id"]) for row in link["rows"]}
        items = []
        for item in review["items"]:
            end = item["link_end"]
            pins = sorted({rows[rid][f"pin_{end}"] for rid in item["row_ids"] if rid in rows},
                          key=drift.pad_sort_key) if end else []
            items.append({
                "id": item["id"], "ordinal": item["ordinal"], "kind": item["kind"],
                "linkId": item["link_id"], "end": end, "rowIds": list(item["row_ids"]), "pins": pins,
                "expected": item["expected"], "observed": item["observed"],
                "candidates": item["candidates"], "decision": item["decision"],
                "decisionPayload": item["decision_payload"],
            })
        return {**base, "redacted": False, "fromCommit": review["from_commit"],
                "toCommit": review["to_commit"], "pendingChanges": review["pending_changes"],
                "items": items}

    def _restricted_instances(self, store: SystemStore, system_id: str, caller: Caller) -> set[str]:
        instances = store.list_instances(system_id)
        access = self._access(store, instances, caller)
        return {i["id"] for i in instances
                if access.get(i["project_id"]) is not None and not access[i["project_id"]]["visible"]}

    def list_reviews(self, caller: Caller, system_id: str, status: Optional[str]) -> list[dict]:
        with self._tx() as store:
            self._system(store, system_id, caller)
            restricted = self._restricted_instances(store, system_id, caller)
            return [self._review_doc(store, review, review["instance_id"] in restricted)
                    for review in store.list_reviews(system_id, status=status)]

    def _open_review_instance(self, store: SystemStore, system_id: str, review_id: str, caller: Caller) -> None:
        try:
            review = store.get_review(system_id, review_id)
        except NotFound:
            raise NotFound("Review not found") from None
        if review["instance_id"]:
            try:
                self._open_instance(store, system_id, review["instance_id"], caller)
            except NotFound:
                raise NotFound("Review not found") from None

    def decide(
        self, caller: Caller, system_id: str, version: int, review_id: str, item_id: str,
        decision: str, payload: Optional[Mapping[str, Any]],
    ) -> Result:
        with self._tx() as store:
            self._system(store, system_id, caller)
            with store.mutation(system_id, expected_version=version, actor=caller.actor) as change:
                self._open_review_instance(store, system_id, review_id, caller)
                review = reconcile.decide(store, change, review_id, item_id, decision, payload)
                body = self._review_doc(store, review, False)
        return Result(body, system_id, change.version)

    def keep_pinned(self, caller: Caller, system_id: str, version: int, review_id: str) -> Result:
        with self._tx() as store:
            self._system(store, system_id, caller)
            with store.mutation(system_id, expected_version=version, actor=caller.actor) as change:
                self._open_review_instance(store, system_id, review_id, caller)
                review = reconcile.keep_pinned(store, change, review_id)
                body = self._review_doc(store, review, False)
        return Result(body, system_id, change.version)

    def rebase(
        self, caller: Caller, system_id: str, version: int, instance_id: str, commit: str
    ) -> tuple[str, Any]:
        """``POST …/rebase``: evaluate an explicit commit like detection (§8.1, §10.1).

        Returns ``("queued", job)`` while the commit's interface is extracted,
        else ``("done", Result)``.
        """

        with self._tx() as store:
            self._system(store, system_id, caller)
            instance = self._open_instance(store, system_id, instance_id, caller)
            project = self._require_project(store, instance["project_id"], caller)
        try:
            target = sources.resolve_commit(project, commit)
        except sources.SourceError as error:
            raise Invalid(str(error)) from None
        if target is None:
            raise Invalid("commit does not exist in the project repository")
        if target == instance["baseline_commit"]:
            raise Conflict("commit is already the baseline")
        with self._tx() as store:
            candidate = store.get_interface(instance["project_id"], target, EXTRACTOR_VERSION)
        if candidate is None:
            job = self._enqueue(instance["project_id"], target, requested_by=caller.email)
            return "queued", {"job_id": str(job["job_id"]), "status": job["status"]}
        from app.services.systems.detection import apply_evaluation

        with self._tx() as store:
            self._system(store, system_id, caller)
            with store.mutation(system_id, expected_version=version, actor=caller.actor) as change:
                current = self._open_instance(store, system_id, instance_id, caller)
                if current["baseline_commit"] == target:
                    raise Conflict("commit is already the baseline")
                outcome, review_id = apply_evaluation(
                    store, change, current, target, candidate, auto_kind="baseline_rebased"
                )
                row = store.get_instance(system_id, instance_id)
        body = {"outcome": outcome, "reviewId": review_id, "instance": self._instance_row(row)}
        return "done", Result(body, system_id, change.version)

    # ------------------------------------------------------------------
    # History and layout

    def history(
        self, caller: Caller, system_id: str, *, cursor: Optional[int], limit: int
    ) -> dict:
        with self._tx() as store:
            self._system(store, system_id, caller)
            events = store.history(system_id, before_seq=cursor, limit=limit)
            instances = store.list_instances(system_id)
            project_ids = {i["project_id"] for i in instances}
            for event in events:
                project = (event["payload"] or {}).get("projectId")
                if isinstance(project, str):
                    project_ids.add(project)
            access = visibility.project_access(store.conn, project_ids, caller.role)
        hidden_projects = {pid for pid, seen in access.items() if not seen["visible"]}
        hidden_instances = {i["id"] for i in instances if i["project_id"] in hidden_projects}
        out = []
        for event in events:
            text = json.dumps(event["payload"], sort_keys=True)
            redacted = any(token in text for token in hidden_instances | hidden_projects)
            out.append({
                "seq": int(event["seq"]), "id": event["id"], "at": _iso(event["at"]),
                "actor": event["actor"], "kind": event["kind"],
                "payload": None if redacted else event["payload"], "redacted": redacted,
            })
        next_cursor = out[-1]["seq"] if len(out) == limit and out else None
        return {"events": out, "nextCursor": next_cursor}

    def get_layout(self, caller: Caller, system_id: str) -> dict:
        with self._tx() as store:
            self._system(store, system_id, caller)
            return {"positions": store.get_layout(system_id)}

    def put_layout(self, caller: Caller, system_id: str, positions: Mapping[str, Any]) -> dict:
        if len(positions) > MAX_LAYOUT_ENTRIES:
            raise Invalid(f"limit layout_entries ({MAX_LAYOUT_ENTRIES})")
        if any(not key or len(key) > 200 for key in positions):
            raise Invalid("layout keys must be 1 to 200 characters")
        with self._tx() as store:
            self._system(store, system_id, caller)
            store.put_layout(system_id, positions)
            return {"positions": store.get_layout(system_id)}


service = SystemService()
