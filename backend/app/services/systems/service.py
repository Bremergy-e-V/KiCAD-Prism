"""System Builder application service: the SYS-04 CRUD surface of §8.

Each public method runs in one transaction, authorizes the caller against the
system (§8.2), applies O1 redaction, and turns ``SystemStore`` results into
the camelCase documents the API returns. Git lookups run before the
transaction; extraction jobs are enqueued after it commits.

Detection, reviews, validation, snapshots and imports arrive with their own
tickets (SYS-06 to SYS-10) and extend this service.

Documents are built unredacted (``_build``) and redacted for the reader last
(``redaction``), so a snapshot can freeze one document and serve it to any
reader later (§9.1).
"""

from __future__ import annotations

import json
import logging
import re
from contextlib import contextmanager
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any, Callable, Collection, ContextManager, Iterator, Mapping, Optional, Sequence

from app.core.roles import Role
from app.services.systems import (
    csv_import, drift, exposure, generators, icd, reconcile, redaction, sources, validation, visibility,
)
from app.services.systems.interface_extractor import EXTRACTOR_VERSION, canonical_digest
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
        self, store: SystemStore, system_id: str, instance_id: str, caller: Caller,
        *, allow_deleted: bool = False,
    ) -> dict:
        """An instance the caller may change; restricted ones are 404 (§8.2).

        ``allow_deleted`` admits an instance restricted only because its project
        was deleted: removing it reveals nothing.
        """

        try:
            instance = store.get_instance(system_id, instance_id)
        except NotFound:
            raise NotFound("Instance not found") from None
        access = self._access(store, [instance], caller)[instance["project_id"]]
        if not access["visible"] and not (allow_deleted and access["deleted"]):
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

    def _build(self, store: SystemStore, system: Mapping[str, Any]) -> tuple[dict, list[dict], dict]:
        """The unredacted system document with its full validation report.

        Snapshots freeze exactly this; readers get it through ``redact_document``.
        Also returns the instance rows and their latest extraction jobs.
        """

        system_id = system["id"]
        instances = store.list_instances(system_id)
        links = store.list_links(system_id)
        names = visibility.project_access(store.conn, [i["project_id"] for i in instances], "admin")
        interfaces: dict[str, dict] = {}
        for instance in instances:
            found = store.get_interface(instance["project_id"], instance["baseline_commit"], EXTRACTOR_VERSION)
            if found is not None:
                interfaces[instance["id"]] = found
        pending = [i for i in instances if i["id"] not in interfaces]
        job_state = self._latest_jobs(store, pending)
        overrides = {i["id"]: store.list_overrides(i["id"]) for i in instances if i["id"] in interfaces}
        open_reviews = store.list_reviews(system_id, status="open")
        report = self._validate(store, system_id, instances, links, interfaces, job_state, open_reviews)
        review_rows = sorted({rid for review in open_reviews for item in review["items"] for rid in item["row_ids"]})
        return {
            "system": dict(system),
            "instances": [
                self._instance_doc(i, names.get(i["project_id"]), interfaces.get(i["id"]),
                                   overrides.get(i["id"], {}),
                                   job_state.get(artifact_key(i["project_id"], i["baseline_commit"])))
                for i in instances
            ],
            "links": [self._link_doc(link, interfaces, overrides) for link in links],
            "openReviewCount": system["openReviewCount"],
            "findingCounts": report["counts"],
            "validation": report,
            "reviewRowIds": review_rows,
        }, instances, job_state

    def document(self, caller: Caller, system_id: str) -> Result:
        with self._tx() as store:
            system = self._system(store, system_id, caller)
            built, instances, job_state = self._build(store, system)
            restricted = self._restricted_instances(store, system_id, caller)
        ready = {i["id"] for i in built["instances"] if i["interface"]["status"] == "ready"}
        for instance in instances:
            key = artifact_key(instance["project_id"], instance["baseline_commit"])
            if (instance["id"] not in ready and instance["id"] not in restricted
                    and key not in job_state and instance["resolution"] == "resolved"):
                self._enqueue_quietly(instance["project_id"], instance["baseline_commit"], caller)
        body = {k: v for k, v in built.items() if k not in ("validation", "reviewRowIds")}
        return Result(redaction.redact_document(body, restricted), system_id, system["version"])

    def _validate(
        self, store: SystemStore, system_id: str, instances: Sequence[dict], links: Sequence[dict],
        interfaces: Mapping[str, dict], job_state: Mapping[str, dict], open_reviews: Sequence[dict],
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
            open_reviews, unavailable=unavailable,
        )

    def validation_report(self, caller: Caller, system_id: str) -> Result:
        """``GET …/validation`` (§7.2), redacted for restricted boards (§8.2)."""

        with self._tx() as store:
            system = self._system(store, system_id, caller)
            built, _instances, _jobs = self._build(store, system)
            restricted = self._restricted_instances(store, system_id, caller)
        return Result(redaction.redact_findings(built["validation"], restricted), system_id, system["version"])

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
        self, instance: dict, access: Optional[dict], interface: Optional[dict],
        overrides: Mapping[str, str], job: Optional[dict],
    ) -> dict:
        tip = instance["tip_commit"]
        return {
            "id": instance["id"],
            "label": instance["label"],
            "restricted": False,
            "projectId": instance["project_id"],
            "projectName": access["name"] if access else None,
            # Not sensitive, and survives redaction: tells a designer the board can be removed.
            "projectDeleted": bool(access and access["deleted"]),
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
        self, link: dict, interfaces: Mapping[str, dict], overrides: Mapping[str, Mapping[str, str]],
    ) -> dict:
        ends: dict[str, dict] = {}
        pins: dict[str, Optional[dict]] = {}
        for end in ("a", "b"):
            instance_id = link[f"{end}_instance_id"]
            port = dict(link[f"{end}_port"])
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
            for end, column in (("a", "A"), ("b", "B")):
                pad = row[f"pin_{end}"]
                doc[f"pin{column}"] = pad
                doc[f"net{column}"] = list(row[f"net_{end}"])
                doc[f"observed{column}"] = (
                    None if pins[end] is None else self._observed(pins[end].get(pad))
                )
            doc["redacted"] = False
            doc["redactedEnds"] = []
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
                before = self._open_instance(store, system_id, instance_id, caller)
                row = store.update_instance(
                    change, instance_id, label=fields.get("label"), pinned=fields.get("pinned"),
                    tracked_ref=tracked_ref,
                )
        resumed = before["pinned"] and not row["pinned"]
        if row["tracked_ref"] and (resumed or row["tracked_ref"] != before["tracked_ref"]):
            # Evaluate the branch now rather than at the next fetch.
            try:
                self._enqueue_check(instance_id, row["project_id"], requested_by=caller.email)
            except Exception:
                logger.exception("Could not enqueue a source check for instance %s", instance_id)
        return Result(self._instance_row(row), system_id, change.version)

    def remove_instance(
        self, caller: Caller, system_id: str, version: int, instance_id: str, *, cascade: bool
    ) -> Result:
        with self._tx() as store:
            self._system(store, system_id, caller)
            with store.mutation(system_id, expected_version=version, actor=caller.actor) as change:
                self._open_instance(store, system_id, instance_id, caller, allow_deleted=True)
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
                if other == instance_id:
                    continue
                if not access[instances[other]["project_id"]]["visible"]:
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
        return self._link_doc(link, interfaces, overrides)

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

    def generate_rows(
        self, caller: Caller, system_id: str, link_id: str, generator: str, options: Mapping[str, Any],
    ) -> Result:
        """``POST …/links/{lid}/generate`` (§8.5): proposed rows, nothing written."""

        with self._tx() as store:
            system = self._system(store, system_id, caller)
            link = self._visible_link(store, system_id, link_id, caller)
            pins = {}
            for end in ("a", "b"):
                instance = store.get_instance(system_id, link[f"{end}_instance_id"])
                component = exposure.component_by_key(self._interface(store, instance), link[f"{end}_port"]["portKey"])
                if component is None:
                    raise Conflict("a link end no longer resolves at its baseline; resolve its review first")
                pins[end] = exposure.pins_by_pad(component)
        body = generators.generate(generator, pins["a"], pins["b"], link["rows"], options)
        return Result({"linkId": link_id, **body}, system_id, system["version"])

    # ------------------------------------------------------------------
    # Reviews and rebase (§7.1, §8.1)

    def _review_doc(self, store: SystemStore, review: Mapping[str, Any], restricted: bool,
                    hidden: Collection[str] = ()) -> dict:
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
            if review["kind"] == "import" and hidden and {
                (item["observed"] or {}).get(side, {}).get("instanceId") for side in ("from", "to")
            } & set(hidden):
                items.append({"id": item["id"], "ordinal": item["ordinal"], "kind": item["kind"],
                              "linkId": None, "end": None, "rowIds": [], "pins": [], "expected": None,
                              "observed": None, "candidates": None, "decision": item["decision"],
                              "decisionPayload": None, "redacted": True})
                continue
            items.append({
                "id": item["id"], "ordinal": item["ordinal"], "kind": item["kind"],
                "linkId": item["link_id"], "end": end, "rowIds": list(item["row_ids"]), "pins": pins,
                "expected": item["expected"], "observed": item["observed"],
                "candidates": item["candidates"], "decision": item["decision"],
                "decisionPayload": item["decision_payload"], "redacted": False,
            })
        return {**base, "redacted": False, "fromCommit": review["from_commit"],
                "toCommit": review["to_commit"], "pendingChanges": review["pending_changes"],
                "items": items}

    def _restricted_instances(self, store: SystemStore, system_id: str, caller: Caller) -> set[str]:
        instances = store.list_instances(system_id)
        access = self._access(store, instances, caller)
        return {i["id"] for i in instances if not access[i["project_id"]]["visible"]}

    def list_reviews(self, caller: Caller, system_id: str, status: Optional[str]) -> list[dict]:
        with self._tx() as store:
            self._system(store, system_id, caller)
            restricted = self._restricted_instances(store, system_id, caller)
            return [self._review_doc(store, review, review["instance_id"] in restricted, restricted)
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

    def _require_visible_import_item(
        self, store: SystemStore, system_id: str, review_id: str, item_id: str, caller: Caller
    ) -> None:
        """An import item proposing a row on a restricted board is 404 to its caller (§8.2)."""

        review = store.get_review(system_id, review_id)
        if review["kind"] != "import":
            return
        item = next((i for i in review["items"] if i["id"] == item_id), None)
        touched = {(item["observed"] or {}).get(side, {}).get("instanceId") for side in ("from", "to")} if item else set()
        if touched & self._restricted_instances(store, system_id, caller):
            raise NotFound("Review item not found")

    def decide(
        self, caller: Caller, system_id: str, version: int, review_id: str, item_id: str,
        decision: str, payload: Optional[Mapping[str, Any]],
    ) -> Result:
        try:
            return self._decide(caller, system_id, version, review_id, item_id, decision, payload)
        except reconcile.StaleReview as stale:
            self._reevaluate(caller, stale.review)
            raise Conflict(
                "review_stale: links or rows on this board changed while the review was open, "
                "so it has been evaluated again; review the new items"
            ) from None

    def _reevaluate(self, caller: Caller, review: Mapping[str, Any]) -> None:
        """Replace a stale review with a fresh evaluation of the same commit."""

        from app.services.systems.detection import apply_evaluation

        with self._tx() as store:
            with store.mutation(review["system_id"], expected_version=None, actor=caller.actor) as change:
                current = store.get_review(review["system_id"], review["id"])
                if current["status"] != "open" or not reconcile.is_stale(store, current):
                    return  # someone else already re-evaluated it
                instance = store.get_instance(review["system_id"], review["instance_id"])
                candidate = reconcile.candidate_interface(store, current)
                apply_evaluation(store, change, instance, current["to_commit"], candidate,
                                 auto_kind="baseline_auto_advanced")

    def _decide(
        self, caller: Caller, system_id: str, version: int, review_id: str, item_id: str,
        decision: str, payload: Optional[Mapping[str, Any]],
    ) -> Result:
        with self._tx() as store:
            self._system(store, system_id, caller)
            with store.mutation(system_id, expected_version=version, actor=caller.actor) as change:
                self._open_review_instance(store, system_id, review_id, caller)
                self._require_visible_import_item(store, system_id, review_id, item_id, caller)
                review = reconcile.decide(store, change, review_id, item_id, decision, payload)
                restricted = self._restricted_instances(store, system_id, caller)
                body = self._review_doc(store, review, False, restricted)
        return Result(body, system_id, change.version)

    def keep_pinned(self, caller: Caller, system_id: str, version: int, review_id: str) -> Result:
        with self._tx() as store:
            self._system(store, system_id, caller)
            with store.mutation(system_id, expected_version=version, actor=caller.actor) as change:
                self._open_review_instance(store, system_id, review_id, caller)
                review = reconcile.keep_pinned(store, change, review_id)
                restricted = self._restricted_instances(store, system_id, caller)
                body = self._review_doc(store, review, False, restricted)
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
    # Snapshots, ICD and diff (§9)

    @staticmethod
    def _snapshot_meta(row: Mapping[str, Any]) -> dict:
        return {"id": row["id"], "name": row["name"], "note": row["note"], "createdBy": row["created_by"],
                "createdAt": _iso(row["created_at"]), "digest": row["digest"],
                "openReviewCount": int(row["open_review_count"]), "rendererVersion": row["renderer_version"]}

    @staticmethod
    def _restricted_in(store: SystemStore, document: Mapping[str, Any], caller: Caller) -> set[str]:
        """Restricted instances of a frozen document, by today's access (§8.2).

        A snapshot can hold instances that have since been removed, so this
        reads the project identities the document itself recorded.
        """

        projects = {i["id"]: i["projectId"] for i in document["instances"]}
        access = visibility.project_access(store.conn, projects.values(), caller.role)
        return {iid for iid, pid in projects.items() if not access[pid]["visible"]}

    def create_snapshot(self, caller: Caller, system_id: str, version: int, name: str, note: str) -> Result:
        """Freeze the unredacted document at ``version`` (§9.1). The version is not bumped."""

        with self._tx() as store:
            system = self._system(store, system_id, caller)
            with store.mutation(system_id, expected_version=version, actor=caller.actor, bump=False) as change:
                built, _instances, _jobs = self._build(store, system)
                document = json.loads(json.dumps(built, default=_iso))
                row = store.create_snapshot(
                    change, name=name, note=note, document=document, digest=canonical_digest(document),
                    open_review_count=document["openReviewCount"], renderer_version=icd.RENDERER_VERSION,
                )
        return Result(self._snapshot_meta(row), system_id, change.version)

    def list_snapshots(self, caller: Caller, system_id: str) -> list[dict]:
        with self._tx() as store:
            self._system(store, system_id, caller)
            return [self._snapshot_meta(row) for row in store.list_snapshots(system_id)]

    def _snapshot(self, store: SystemStore, system_id: str, snapshot_id: str, caller: Caller) -> tuple[dict, dict]:
        """A snapshot's metadata and its document, redacted for ``caller``."""

        row = store.get_snapshot(system_id, snapshot_id)
        restricted = self._restricted_in(store, row["document"], caller)
        return self._snapshot_meta(row), redaction.redact_document(row["document"], restricted)

    def get_snapshot(self, caller: Caller, system_id: str, snapshot_id: str) -> dict:
        with self._tx() as store:
            self._system(store, system_id, caller)
            meta, document = self._snapshot(store, system_id, snapshot_id, caller)
        return {**meta, "document": document}

    def _icd_source(
        self, caller: Caller, system_id: str, snapshot_id: Optional[str]
    ) -> tuple[dict, str, Optional[int]]:
        """``(redacted document, source label, live version or None)`` for an ICD."""

        with self._tx() as store:
            system = self._system(store, system_id, caller)
            if snapshot_id is not None:
                meta, document = self._snapshot(store, system_id, snapshot_id, caller)
                return document, meta["name"], None
            built, _instances, _jobs = self._build(store, system)
            restricted = self._restricted_instances(store, system_id, caller)
        return redaction.redact_document(built, restricted), "live", system["version"]

    def icd(
        self, caller: Caller, system_id: str, fmt: str, snapshot_id: Optional[str] = None
    ) -> tuple[str, str, Optional[int]]:
        """``(content, system name, live version or None)``; ``fmt`` is ``csv`` or ``html`` (§9.4, §9.5)."""

        document, source, version = self._icd_source(caller, system_id, snapshot_id)
        if fmt == "csv":
            content = icd.render_csv(document)
        else:
            generated = datetime.now(timezone.utc).replace(microsecond=0).isoformat()
            content = icd.render_html(document, source=source, generated_at=generated)
        return content, document["system"]["name"], version

    def diff_snapshot(self, caller: Caller, system_id: str, snapshot_id: str, against: str) -> dict:
        """``GET …/snapshots/{sid}/diff?against=live|<sid>``: what changed since the snapshot.

        Both sides are redacted with the union of their restricted boards, so a
        comparison cannot reveal a restricted side by difference.
        """

        with self._tx() as store:
            system = self._system(store, system_id, caller)
            before = store.get_snapshot(system_id, snapshot_id)["document"]
            if against == "live":
                after = json.loads(json.dumps(self._build(store, system)[0], default=_iso))
                restricted = self._restricted_instances(store, system_id, caller)
            else:
                try:
                    after = store.get_snapshot(system_id, against)["document"]
                except NotFound:
                    raise NotFound("Snapshot not found") from None
                restricted = self._restricted_in(store, after, caller)
            restricted |= self._restricted_in(store, before, caller)
        return {"snapshotId": snapshot_id, "against": against,
                **icd.diff(redaction.redact_document(before, restricted),
                           redaction.redact_document(after, restricted))}

    # ------------------------------------------------------------------
    # CSV import (§9.3)

    def upload_import(
        self, caller: Caller, system_id: str, *, filename: str, raw: bytes, delimiter: Optional[str],
    ) -> dict:
        """``POST …/imports``: store the upload and describe it for mapping."""

        text = csv_import.decode(raw)
        parsed = csv_import.parse(text, delimiter)
        with self._tx() as store:
            self._system(store, system_id, caller)
            row = store.create_import_session(
                system_id, actor=caller.actor, filename=filename[:255], delimiter=parsed.delimiter,
                content=text, row_count=len(parsed.rows),
            )
        return {"importId": row["id"], "filename": row["filename"], **csv_import.summary(parsed)}

    def _import_state(
        self, store: SystemStore, system_id: str, caller: Caller, session: Mapping[str, Any],
        column_map: Mapping[str, str], board_map: Mapping[str, str], delimiter: Optional[str],
    ) -> dict:
        """Parse the session and classify it against the system's current state."""

        parsed = csv_import.parse(session["content"], delimiter or session["delimiter"])
        instances = {i["id"]: i for i in store.list_instances(system_id)}
        csv_import.check_maps(parsed, column_map, board_map, instances)
        restricted = self._restricted_instances(store, system_id, caller)
        if {v for v in board_map.values() if v != csv_import.SKIP} & restricted:
            raise NotFound("Instance not found")
        interfaces = csv_import.baseline_interfaces(store, system_id)
        overrides = {iid: store.list_overrides(iid) for iid in instances}
        return csv_import.classify(parsed, column_map, board_map, instances=instances, interfaces=interfaces,
                                   overrides=overrides, links=store.list_links(system_id))

    def preview_import(
        self, caller: Caller, system_id: str, import_id: str, column_map: Mapping[str, str],
        board_map: Mapping[str, str], delimiter: Optional[str],
    ) -> Result:
        with self._tx() as store:
            system = self._system(store, system_id, caller)
            session = store.get_import_session(system_id, import_id)
            buckets = self._import_state(store, system_id, caller, session, column_map, board_map, delimiter)
        return Result({"importId": import_id, "committed": session["committed_at"] is not None, **buckets},
                      system_id, system["version"])

    def commit_import(
        self, caller: Caller, system_id: str, version: int, import_id: str, column_map: Mapping[str, str],
        board_map: Mapping[str, str], delimiter: Optional[str],
    ) -> Result:
        """``POST …/imports/{imid}/commit``: write Matched rows, review Needs review rows.

        The rows are classified again under the lock, so the commit acts on the
        state it writes to, not on whatever an earlier preview saw.
        """

        with self._tx() as store:
            self._system(store, system_id, caller)
            with store.mutation(system_id, expected_version=version, actor=caller.actor) as change:
                session = store.get_import_session(system_id, import_id, lock=True)
                if session["committed_at"] is not None:
                    raise Conflict("this import has already been committed")
                buckets = self._import_state(store, system_id, caller, session, column_map, board_map, delimiter)
                interfaces = csv_import.baseline_interfaces(store, system_id)
                written = csv_import.apply_rows(store, change, buckets["matched"], interfaces)
                review_id = None
                if buckets["needsReview"]:
                    review = store.open_review(
                        change, instance_id=None, kind="import", from_commit=None, to_commit=None,
                        items=[{
                            "kind": "signal_mismatch", "linkId": entry["linkId"],
                            "rowIds": [entry["rowId"]] if entry["rowId"] else [],
                            "expected": {"leaves": sorted({csv_import.leaf(n) for side in ("from", "to")
                                                           for n in entry[side]["nets"]})},
                            "observed": csv_import.proposal(entry),
                        } for entry in buckets["needsReview"]],
                    )
                    review_id = review["id"]
                report = {**written, "reviewId": review_id, "counts": buckets["counts"]}
                store.mark_import_committed(change, import_id, report)
        body = {"importId": import_id, **report, "unresolved": buckets["unresolved"],
                "conflict": buckets["conflict"]}
        return Result(body, system_id, change.version)

    # ------------------------------------------------------------------
    # History and layout

    def history(
        self, caller: Caller, system_id: str, *, cursor: Optional[int], limit: int
    ) -> dict:
        with self._tx() as store:
            self._system(store, system_id, caller)
            events = store.history(system_id, before_seq=cursor, limit=limit)
            # Removed instances too: their older events still name them.
            owners = store.instance_projects(system_id)
            project_ids = set(owners.values())
            for event in events:
                project = (event["payload"] or {}).get("projectId")
                if isinstance(project, str):
                    project_ids.add(project)
            access = visibility.project_access(store.conn, project_ids, caller.role)
        hidden_projects = {pid for pid, seen in access.items() if not seen["visible"]}
        hidden_instances = {iid for iid, pid in owners.items() if pid in hidden_projects}
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
