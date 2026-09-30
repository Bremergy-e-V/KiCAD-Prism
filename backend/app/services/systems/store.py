"""PostgreSQL persistence for System Builder (``docs/system-builder/CONTRACTS.md`` §5).

``SystemStore`` wraps a connection the caller owns; it never commits. Every
change to a system's engineering state happens inside ``store.mutation(...)``,
which:

* locks the ``system_projects`` row, so concurrent mutations of one system
  serialize;
* checks the caller's expected version (the ETag, §8), raising
  ``StaleVersion`` with the current version when it differs;
* records audit events in the same transaction as the change (§10.2);
* bumps the version exactly once when the block exits cleanly.

Detection passes ``expected_version=None``: it has no ETag, but its changes
still move the version so an editor holding the old ETag gets 412.

Reviews are opened and superseded here for detection (SYS-06), decided for
reconcile (SYS-07), and snapshots are frozen here for SYS-09.
"""

from __future__ import annotations

import re
import uuid
from contextlib import contextmanager
from dataclasses import dataclass, field
from typing import Any, Iterator, Mapping, Optional, Sequence

from psycopg.types.json import Jsonb

# §8.3 (default O4).
MAX_INSTANCES = 50
MAX_LINKS = 500
MAX_ROWS = 5000
MAX_EXPORTS = 200

ROW_SOURCES = frozenset({"manual", "generator", "import"})
OVERRIDE_STATES = frozenset({"hidden", "promoted"})
PORT_BASELINE_KEYS = ("portKey", "memberKeys", "reference", "libId", "footprint", "pinCount")


class SystemStoreError(Exception):
    """Base class; each subclass maps to one HTTP status in the API layer."""


class NotFound(SystemStoreError):
    """404."""


class StaleVersion(SystemStoreError):
    """412: the caller's ETag version is not the current one."""

    def __init__(self, current: int) -> None:
        super().__init__(f"system is at version {current}")
        self.current = current


class Conflict(SystemStoreError):
    """409: the request is well formed but contradicts current state."""


class Invalid(SystemStoreError):
    """422: schema or limit violation."""


class Forbidden(SystemStoreError):
    """403: the caller may see the system but not this whole artifact."""


_COMMIT = re.compile(r"^[0-9a-f]{40}$")


def _require_commit(commit: str) -> str:
    if not isinstance(commit, str) or not _COMMIT.match(commit):
        raise Invalid("commit must be a full 40-character lowercase SHA")
    return commit


def new_id(prefix: str) -> str:
    """§2.1: a prefix plus 32 lowercase hex characters from a UUID4."""
    return f"{prefix}{uuid.uuid4().hex}"


def _given_id(prefix: str, value: Optional[str]) -> str:
    """A caller-supplied ID (manifest import keeps IDs), or a new one."""
    if value is None:
        return new_id(prefix)
    if not re.fullmatch(rf"{prefix}[0-9a-f]{{32}}", value):
        raise Invalid(f"{value!r} is not a {prefix} id")
    return value


LINK_TYPES = ("unspecified", "b2b")


def _check_link_type(link_type: str, stack_height_mm: Optional[float]) -> None:
    if link_type not in LINK_TYPES:
        raise Invalid(f"type must be one of {', '.join(LINK_TYPES)}")
    if stack_height_mm is not None:
        if link_type != "b2b":
            raise Invalid("stackHeightMm applies to board-to-board links only")
        if not (0 < float(stack_height_mm) < 1000):
            raise Invalid("stackHeightMm must be between 0 and 1000 mm")


def _port_baseline(port: Mapping[str, Any]) -> dict[str, Any]:
    missing = [key for key in PORT_BASELINE_KEYS if key not in port]
    if missing:
        raise Invalid(f"port baseline is missing {', '.join(missing)}")
    baseline = {key: port[key] for key in PORT_BASELINE_KEYS}
    if not baseline["portKey"] or baseline["portKey"] not in baseline["memberKeys"]:
        raise Invalid("portKey must be one of memberKeys")
    return baseline


def _nets(value: Sequence[str]) -> list[str]:
    return sorted({str(item) for item in value})


@dataclass
class Mutation:
    """An open, locked change to one system. Obtain it from ``store.mutation``."""

    store: "SystemStore"
    system_id: str
    actor: str
    version: int
    events: list[str] = field(default_factory=list)

    def audit(self, kind: str, payload: Mapping[str, Any] | None = None) -> str:
        event_id = new_id("sae_")
        self.store.conn.execute(
            """
            INSERT INTO system_audit_events (id, system_id, actor, kind, payload)
            VALUES (%s, %s, %s, %s, %s)
            """,
            (event_id, self.system_id, self.actor, kind, Jsonb(dict(payload or {}))),
        )
        self.events.append(event_id)
        return event_id


class SystemStore:
    def __init__(self, conn: Any) -> None:
        self.conn = conn

    # ------------------------------------------------------------------
    # Systems

    def create_system(
        self, *, name: str, description: str = "", folder_id: Optional[str], actor: str,
        system_id: Optional[str] = None, optional_rules: Sequence[str] = (),
    ) -> dict:
        if not name.strip():
            raise Invalid("name is required")
        system_id = _given_id("sys_", system_id)
        row = self.conn.execute(
            """
            INSERT INTO system_projects (id, name, description, folder_id, created_by, optional_rules)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING *
            """,
            (system_id, name.strip(), description, folder_id, actor, sorted(set(optional_rules))),
        ).fetchone()
        Mutation(self, system_id, actor, row["version"]).audit(
            "system_created", {"name": row["name"], "folderId": folder_id}
        )
        return dict(row)

    def get_system(self, system_id: str) -> dict:
        row = self.conn.execute(
            "SELECT * FROM system_projects WHERE id = %s", (system_id,)
        ).fetchone()
        if row is None:
            raise NotFound(system_id)
        return dict(row)

    def list_systems(self) -> list[dict]:
        """Every system with its counts. Role visibility is applied by the caller."""
        rows = self.conn.execute(
            """
            SELECT s.*,
                   (SELECT count(*) FROM system_instances i WHERE i.system_id = s.id)
                       AS instance_count,
                   (SELECT count(*) FROM system_reviews r
                     WHERE r.system_id = s.id AND r.status = 'open') AS open_review_count
            FROM system_projects s
            ORDER BY lower(s.name), s.id
            """
        ).fetchall()
        return [dict(row) for row in rows]

    @contextmanager
    def mutation(
        self, system_id: str, *, expected_version: Optional[int], actor: str, bump: bool = True
    ) -> Iterator[Mutation]:
        """``bump=False`` locks and checks the version but leaves it alone, for
        audited writes that change no engineering state (a snapshot, §9.1)."""

        row = self.conn.execute(
            "SELECT version FROM system_projects WHERE id = %s FOR UPDATE", (system_id,)
        ).fetchone()
        if row is None:
            raise NotFound(system_id)
        if expected_version is not None and int(expected_version) != int(row["version"]):
            raise StaleVersion(int(row["version"]))
        change = Mutation(self, system_id, actor, int(row["version"]))
        yield change
        if not bump:
            return
        bumped = self.conn.execute(
            """
            UPDATE system_projects SET version = version + 1, updated_at = NOW()
            WHERE id = %s RETURNING version
            """,
            (system_id,),
        ).fetchone()
        change.version = int(bumped["version"])

    def bind_catalog_component(self, change: Mutation, component_id: str) -> None:
        """First publish (CONTRACTS_P2 §3.3): the system's assembly, set once."""
        row = self.conn.execute(
            """
            UPDATE system_projects SET catalog_component_id = %s
            WHERE id = %s AND (catalog_component_id IS NULL OR catalog_component_id = %s)
            RETURNING id
            """,
            (component_id, change.system_id, component_id),
        ).fetchone()
        if row is None:
            raise Conflict("this system already publishes to another catalog component")

    def update_system(
        self, change: Mutation, *, name: Optional[str] = None,
        description: Optional[str] = None, folder_id: Any = ...,
        optional_rules: Optional[Sequence[str]] = None,
    ) -> dict:
        before = self.get_system(change.system_id)
        values = {
            "name": before["name"] if name is None else name.strip(),
            "description": before["description"] if description is None else description,
            "folder_id": before["folder_id"] if folder_id is ... else folder_id,
            "optional_rules": list(before["optional_rules"] or []) if optional_rules is None
            else sorted(set(optional_rules)),
        }
        if not values["name"]:
            raise Invalid("name is required")
        self.conn.execute(
            "UPDATE system_projects SET name = %s, description = %s, folder_id = %s, optional_rules = %s"
            " WHERE id = %s",
            (values["name"], values["description"], values["folder_id"], values["optional_rules"],
             change.system_id),
        )
        changed = {k: {"before": before[k], "after": v} for k, v in values.items() if before[k] != v}
        if changed:
            change.audit("system_updated", changed)
        return self.get_system(change.system_id)

    def delete_system(self, system_id: str) -> None:
        deleted = self.conn.execute(
            "DELETE FROM system_projects WHERE id = %s RETURNING id", (system_id,)
        ).fetchone()
        if deleted is None:
            raise NotFound(system_id)

    # ------------------------------------------------------------------
    # Instances

    BOARD_KINDS = ("board",)
    ALL_KINDS = ("board", "assembly", "module")

    def list_instances(self, system_id: str, *, kinds: Sequence[str] = BOARD_KINDS) -> list[dict]:
        """Boards by default: every P1 path (interfaces, drift, validation, access) is board-only.

        Pass ``kinds=SystemStore.ALL_KINDS`` where assembly and module
        instances matter (the document, the hierarchy, the manifest).
        """
        rows = self.conn.execute(
            "SELECT * FROM system_instances WHERE system_id = %s AND kind = ANY(%s) ORDER BY lower(label), id",
            (system_id, list(kinds)),
        ).fetchall()
        return [dict(row) for row in rows]

    def get_instance(self, system_id: str, instance_id: str) -> dict:
        row = self.conn.execute(
            "SELECT * FROM system_instances WHERE system_id = %s AND id = %s",
            (system_id, instance_id),
        ).fetchone()
        if row is None:
            raise NotFound(instance_id)
        return dict(row)

    def add_instance(
        self, change: Mutation, *, project_id: str, label: str, baseline_commit: str,
        tracked_ref: Optional[str], pinned: bool, instance_id: Optional[str] = None,
    ) -> dict:
        count = self.conn.execute(
            "SELECT count(*) AS n FROM system_instances WHERE system_id = %s", (change.system_id,)
        ).fetchone()["n"]
        if count >= MAX_INSTANCES:
            raise Invalid(f"limit instances_per_system ({MAX_INSTANCES})")
        _require_commit(baseline_commit)
        self._require_free_label(change.system_id, label)
        instance_id = _given_id("sin_", instance_id)
        row = self.conn.execute(
            """
            INSERT INTO system_instances
                (id, system_id, project_id, label, baseline_commit, tracked_ref, pinned)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING *
            """,
            (instance_id, change.system_id, project_id, label.strip(), baseline_commit,
             tracked_ref, bool(pinned)),
        ).fetchone()
        change.audit(
            "instance_added",
            {"instanceId": instance_id, "projectId": project_id, "label": row["label"],
             "baselineCommit": baseline_commit, "trackedRef": tracked_ref, "pinned": bool(pinned)},
        )
        return dict(row)

    def add_catalog_instance(
        self, change: Mutation, *, kind: str, label: str, component_id: str, revision_id: str,
        follow: str, instance_id: Optional[str] = None,
    ) -> dict:
        """An ``assembly`` or ``module`` instance pinning one catalog revision (CONTRACTS_P2 §5.1)."""
        if kind not in ("assembly", "module"):
            raise Invalid("kind must be assembly or module")
        if follow not in ("pinned", "latest_released"):
            raise Invalid("follow must be pinned or latest_released")
        count = self.conn.execute(
            "SELECT count(*) AS n FROM system_instances WHERE system_id = %s", (change.system_id,)
        ).fetchone()["n"]
        if count >= MAX_INSTANCES:
            raise Invalid(f"limit instances_per_system ({MAX_INSTANCES})")
        self._require_free_label(change.system_id, label)
        instance_id = _given_id("sin_", instance_id)
        row = self.conn.execute(
            """
            INSERT INTO system_instances
                (id, system_id, kind, label, catalog_component_id, catalog_revision_id, follow)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING *
            """,
            (instance_id, change.system_id, kind, label.strip(), component_id, revision_id, follow),
        ).fetchone()
        change.audit("instance_added", {
            "instanceId": instance_id, "kind": kind, "label": row["label"], "componentId": component_id,
            "revisionId": revision_id, "follow": follow,
        })
        return dict(row)

    def set_catalog_revision(self, change: Mutation, instance_id: str, revision_id: str, *, kind: str,
                             payload: Optional[Mapping[str, Any]] = None) -> None:
        """Move an assembly/module instance to another revision (audited as ``kind``)."""
        before = self.get_instance(change.system_id, instance_id)
        self.conn.execute(
            "UPDATE system_instances SET catalog_revision_id = %s, updated_at = NOW() WHERE id = %s",
            (revision_id, instance_id),
        )
        change.audit(kind, {"instanceId": instance_id, "from": before["catalog_revision_id"], "to": revision_id,
                            **dict(payload or {})})

    def set_follow(self, change: Mutation, instance_id: str, follow: str) -> None:
        if follow not in ("pinned", "latest_released"):
            raise Invalid("follow must be pinned or latest_released")
        before = self.get_instance(change.system_id, instance_id)
        if before["kind"] == "board":
            raise Invalid("only assembly and module instances follow catalog revisions")
        if before["follow"] == follow:
            return
        self.conn.execute("UPDATE system_instances SET follow = %s, updated_at = NOW() WHERE id = %s",
                          (follow, instance_id))
        change.audit("instance_updated", {"instanceId": instance_id,
                                          "follow": {"before": before["follow"], "after": follow}})

    def update_instance(
        self, change: Mutation, instance_id: str, *, label: Optional[str] = None,
        pinned: Optional[bool] = None, tracked_ref: Any = ...,
    ) -> dict:
        before = self.get_instance(change.system_id, instance_id)
        values = {
            "label": before["label"] if label is None else label.strip(),
            "pinned": before["pinned"] if pinned is None else bool(pinned),
            "tracked_ref": before["tracked_ref"] if tracked_ref is ... else tracked_ref,
        }
        if values["label"].lower() != before["label"].lower():
            self._require_free_label(change.system_id, values["label"])
        self.conn.execute(
            """
            UPDATE system_instances SET label = %s, pinned = %s, tracked_ref = %s, updated_at = NOW()
            WHERE id = %s
            """,
            (values["label"], values["pinned"], values["tracked_ref"], instance_id),
        )
        changed = {k: {"before": before[k], "after": v} for k, v in values.items() if before[k] != v}
        if "tracked_ref" in changed:
            # The old branch's tip says nothing about the new one.
            self.conn.execute(
                "UPDATE system_instances SET tip_commit = NULL, tip_checked_at = NULL WHERE id = %s",
                (instance_id,),
            )
            self.conn.execute("DELETE FROM system_source_checks WHERE instance_id = %s", (instance_id,))
        elif changed.get("pinned", {}).get("after") is False:
            # A pinned check only reported the tip; unpinned, the same tip must be evaluated.
            self.conn.execute("DELETE FROM system_source_checks WHERE instance_id = %s", (instance_id,))
        if changed:
            change.audit("instance_updated", {"instanceId": instance_id, **changed})
        return self.get_instance(change.system_id, instance_id)

    def set_baseline(
        self, change: Mutation, instance_id: str, commit: str, *, kind: str,
        payload: Mapping[str, Any] | None = None,
    ) -> None:
        """Move the accepted baseline; ``kind`` is the audit event (§10.2)."""
        _require_commit(commit)
        before = self.get_instance(change.system_id, instance_id)
        self.conn.execute(
            """
            UPDATE system_instances
            SET baseline_commit = %s, resolution = 'resolved', updated_at = NOW()
            WHERE id = %s
            """,
            (commit, instance_id),
        )
        change.audit(
            kind,
            {"instanceId": instance_id, "from": before["baseline_commit"], "to": commit,
             **dict(payload or {})},
        )

    def set_resolution(self, change: Mutation, instance_id: str, resolution: str) -> None:
        self.conn.execute(
            "UPDATE system_instances SET resolution = %s, updated_at = NOW() WHERE id = %s",
            (resolution, instance_id),
        )

    def remove_instance(self, change: Mutation, instance_id: str, *, cascade_links: bool) -> None:
        instance = self.get_instance(change.system_id, instance_id)
        links = self.conn.execute(
            """
            SELECT id FROM system_links
            WHERE system_id = %s AND (a_instance_id = %s OR b_instance_id = %s)
            ORDER BY id
            """,
            (change.system_id, instance_id, instance_id),
        ).fetchall()
        exports = self.conn.execute(
            "SELECT id FROM system_exports WHERE system_id = %s AND target_instance_id = %s ORDER BY id",
            (change.system_id, instance_id),
        ).fetchall()
        if links and not cascade_links:
            raise Conflict("instance is an endpoint of a link")
        if exports and not cascade_links:
            raise Conflict("instance carries exports; remove them or pass ?cascade=links")
        for link in links:
            self.delete_link(change, link["id"])
        for export in exports:
            self.delete_export(change, export["id"])
        self.conn.execute("DELETE FROM system_instances WHERE id = %s", (instance_id,))
        change.audit(
            "instance_removed",
            {"instanceId": instance_id, "projectId": instance["project_id"],
             "label": instance["label"], "removedLinks": [link["id"] for link in links]},
        )

    def instances_for_projects(self, project_ids: Sequence[str]) -> list[dict]:
        """Reverse index: every instance of the given projects, across systems."""
        if not project_ids:
            return []
        rows = self.conn.execute(
            "SELECT * FROM system_instances WHERE project_id = ANY(%s) ORDER BY system_id, id",
            (list(project_ids),),
        ).fetchall()
        return [dict(row) for row in rows]

    def mark_project_unresolved(self, project_id: str) -> list[str]:
        """§5.1: the child project is gone; keep its instances, unresolved.

        The affected systems' versions move, so an editor holding an old ETag
        re-reads before changing anything. Returns their IDs.
        """
        rows = self.conn.execute(
            """
            UPDATE system_instances SET resolution = 'unresolved', updated_at = NOW()
            WHERE project_id = %s AND resolution <> 'unresolved'
            RETURNING system_id
            """,
            (project_id,),
        ).fetchall()
        system_ids = sorted({row["system_id"] for row in rows})
        if system_ids:
            self.conn.execute(
                """
                UPDATE system_projects SET version = version + 1, updated_at = NOW()
                WHERE id = ANY(%s)
                """,
                (system_ids,),
            )
        return system_ids

    def _require_free_label(self, system_id: str, label: str) -> None:
        if not label.strip():
            raise Invalid("label is required")
        taken = self.conn.execute(
            "SELECT 1 FROM system_instances WHERE system_id = %s AND lower(label) = lower(%s)",
            (system_id, label.strip()),
        ).fetchone()
        if taken:
            raise Conflict(f"label {label.strip()!r} is already used in this system")

    # ------------------------------------------------------------------
    # Port overrides

    def list_overrides(self, instance_id: str) -> dict[str, str]:
        rows = self.conn.execute(
            "SELECT port_key, state FROM system_port_overrides WHERE instance_id = %s",
            (instance_id,),
        ).fetchall()
        return {row["port_key"]: row["state"] for row in rows}

    def list_mating(self, instance_id: str) -> dict[str, dict]:
        """CONTRACTS_P2 §15.2: ``port_key -> {mode, axis, quarterTurns, geometryDigest}``."""
        rows = self.conn.execute(
            "SELECT port_key, mode, axis, quarter_turns, geometry_digest FROM system_port_mating"
            " WHERE instance_id = %s",
            (instance_id,),
        ).fetchall()
        return {row["port_key"]: {"mode": row["mode"], "axis": row["axis"], "quarterTurns": int(row["quarter_turns"]),
                                  "geometryDigest": row["geometry_digest"]} for row in rows}

    def set_mating(
        self, change: Mutation, instance_id: str, port_key: str, record: Optional[Mapping[str, Any]]
    ) -> None:
        """Store a confirmed/override frame, or clear it (``None``) back to inferred."""
        self.get_instance(change.system_id, instance_id)
        before = self.list_mating(instance_id).get(port_key)
        if record is None:
            self.conn.execute(
                "DELETE FROM system_port_mating WHERE instance_id = %s AND port_key = %s", (instance_id, port_key)
            )
        else:
            self.conn.execute(
                """
                INSERT INTO system_port_mating (instance_id, port_key, mode, axis, quarter_turns, geometry_digest,
                                                updated_by)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (instance_id, port_key) DO UPDATE SET
                    mode = EXCLUDED.mode, axis = EXCLUDED.axis, quarter_turns = EXCLUDED.quarter_turns,
                    geometry_digest = EXCLUDED.geometry_digest, updated_by = EXCLUDED.updated_by, updated_at = NOW()
                """,
                (instance_id, port_key, record["mode"], record["axis"], int(record.get("quarterTurns") or 0),
                 record.get("geometryDigest"), change.actor),
            )
        after = self.list_mating(instance_id).get(port_key)
        if before != after:
            change.audit("mating_updated", {"instanceId": instance_id, "portKey": port_key,
                                            "before": before, "after": after})

    def set_override(
        self, change: Mutation, instance_id: str, port_key: str, state: Optional[str]
    ) -> None:
        self.get_instance(change.system_id, instance_id)
        if state is not None and state not in OVERRIDE_STATES:
            raise Invalid(f"unknown override state {state!r}")
        if state == "hidden" and self._port_is_linked(change.system_id, instance_id, port_key):
            raise Conflict("a port that is an endpoint of a link cannot be hidden")
        before = self.list_overrides(instance_id).get(port_key)
        if state is None:
            self.conn.execute(
                "DELETE FROM system_port_overrides WHERE instance_id = %s AND port_key = %s",
                (instance_id, port_key),
            )
        else:
            self.conn.execute(
                """
                INSERT INTO system_port_overrides (instance_id, port_key, state)
                VALUES (%s, %s, %s)
                ON CONFLICT (instance_id, port_key) DO UPDATE SET state = EXCLUDED.state
                """,
                (instance_id, port_key, state),
            )
        if before != state:
            change.audit(
                "port_override_set",
                {"instanceId": instance_id, "portKey": port_key, "before": before, "after": state},
            )

    def _port_is_linked(self, system_id: str, instance_id: str, port_key: str) -> bool:
        return self.conn.execute(
            """
            SELECT 1 FROM system_links
            WHERE system_id = %s AND (
                (a_instance_id = %s AND a_port->>'portKey' = %s)
                OR (b_instance_id = %s AND b_port->>'portKey' = %s))
            LIMIT 1
            """,
            (system_id, instance_id, port_key, instance_id, port_key),
        ).fetchone() is not None

    # ------------------------------------------------------------------
    # Links and rows

    def list_links(self, system_id: str) -> list[dict]:
        links = [
            dict(row)
            for row in self.conn.execute(
                "SELECT * FROM system_links WHERE system_id = %s ORDER BY lower(name), id",
                (system_id,),
            ).fetchall()
        ]
        rows = self.conn.execute(
            """
            SELECT r.* FROM system_link_rows r
            JOIN system_links l ON l.id = r.link_id
            WHERE l.system_id = %s
            ORDER BY r.link_id, r.id
            """,
            (system_id,),
        ).fetchall()
        by_link: dict[str, list[dict]] = {}
        for row in rows:
            by_link.setdefault(row["link_id"], []).append(dict(row))
        for link in links:
            link["rows"] = by_link.get(link["id"], [])
        return links

    def get_link(self, system_id: str, link_id: str) -> dict:
        row = self.conn.execute(
            "SELECT * FROM system_links WHERE system_id = %s AND id = %s", (system_id, link_id)
        ).fetchone()
        if row is None:
            raise NotFound(link_id)
        link = dict(row)
        link["rows"] = [
            dict(r)
            for r in self.conn.execute(
                "SELECT * FROM system_link_rows WHERE link_id = %s ORDER BY id", (link_id,)
            ).fetchall()
        ]
        return link

    def create_link(
        self, change: Mutation, *, a_instance_id: str, a_port: Mapping[str, Any],
        b_instance_id: str, b_port: Mapping[str, Any], name: str = "",
        harness: Optional[str] = None, link_id: Optional[str] = None,
        link_type: str = "unspecified", stack_height_mm: Optional[float] = None,
    ) -> dict:
        a_baseline, b_baseline = _port_baseline(a_port), _port_baseline(b_port)
        _check_link_type(link_type, stack_height_mm)
        if a_instance_id == b_instance_id and a_baseline["portKey"] == b_baseline["portKey"]:
            raise Invalid("both link ends are the same port")
        for instance_id, baseline in ((a_instance_id, a_baseline), (b_instance_id, b_baseline)):
            self.get_instance(change.system_id, instance_id)
            if self.exported_port(change.system_id, instance_id, baseline["portKey"]):
                raise Conflict("export_port_linked: this port is exported; delete or retarget the export first")
        count = self.conn.execute(
            "SELECT count(*) AS n FROM system_links WHERE system_id = %s", (change.system_id,)
        ).fetchone()["n"]
        if count >= MAX_LINKS:
            raise Invalid(f"limit links_per_system ({MAX_LINKS})")
        link_id = _given_id("slk_", link_id)
        if link_type == "b2b":
            self._check_b2b_ports(change.system_id, link_id, ((a_instance_id, a_baseline["portKey"]),
                                                              (b_instance_id, b_baseline["portKey"])))
        self.conn.execute(
            """
            INSERT INTO system_links
                (id, system_id, name, harness, a_instance_id, a_port, b_instance_id, b_port, type, stack_height_mm)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (link_id, change.system_id, name, harness or None, a_instance_id, Jsonb(a_baseline),
             b_instance_id, Jsonb(b_baseline), link_type, stack_height_mm),
        )
        change.audit(
            "link_created",
            {"linkId": link_id, "name": name, "harness": harness or None, "type": link_type,
             "a": {"instanceId": a_instance_id, "portKey": a_baseline["portKey"]},
             "b": {"instanceId": b_instance_id, "portKey": b_baseline["portKey"]}},
        )
        return self.get_link(change.system_id, link_id)

    # ------------------------------------------------------------------
    # Exports (CONTRACTS_P2 §4)

    def list_exports(self, system_id: str) -> list[dict]:
        rows = self.conn.execute(
            "SELECT * FROM system_exports WHERE system_id = %s ORDER BY lower(name), id", (system_id,)
        ).fetchall()
        return [dict(row) for row in rows]

    def get_export(self, system_id: str, export_id: str) -> dict:
        row = self.conn.execute(
            "SELECT * FROM system_exports WHERE system_id = %s AND id = %s", (system_id, export_id)
        ).fetchone()
        if row is None:
            raise NotFound("Export not found")
        return dict(row)

    def exported_port(self, system_id: str, instance_id: str, port_key: str) -> Optional[dict]:
        """The export whose target is this port: a board port by portKey, or a child export (re-export)."""
        for export in self.list_exports(system_id):
            if export["target_instance_id"] != instance_id:
                continue
            port = export["target_port"]
            if (port and port["portKey"] == port_key) or export["target_export_id"] == port_key:
                return export
        return None

    def linked_port(self, system_id: str, instance_id: str, port_key: str) -> bool:
        return any(
            link[f"{end}_instance_id"] == instance_id and link[f"{end}_port"]["portKey"] == port_key
            for link in self.list_links(system_id) for end in ("a", "b")
        )

    def _require_free_export_name(self, system_id: str, name: str, *, except_id: str = "") -> str:
        name = name.strip()
        if not name or len(name) > 100:
            raise Invalid("export name must be 1 to 100 characters")
        clash = self.conn.execute(
            "SELECT 1 FROM system_exports WHERE system_id = %s AND lower(name) = lower(%s) AND id <> %s",
            (system_id, name, except_id),
        ).fetchone()
        if clash:
            raise Conflict(f"an export named {name!r} already exists")
        return name

    def create_export(
        self, change: Mutation, *, name: str, description: str, instance_id: str,
        port: Optional[Mapping[str, Any]] = None, child_export_id: Optional[str] = None,
        export_id: Optional[str] = None,
    ) -> dict:
        """One of ``port`` (a board port baseline) or ``child_export_id`` (a re-export)."""
        if (port is None) == (child_export_id is None):
            raise Invalid("an export targets exactly one of a port or a child export")
        count = self.conn.execute(
            "SELECT count(*) AS n FROM system_exports WHERE system_id = %s", (change.system_id,)
        ).fetchone()["n"]
        if count >= MAX_EXPORTS:
            raise Invalid(f"export_limit: at most {MAX_EXPORTS} exports per system")
        instance = self.get_instance(change.system_id, instance_id)
        name = self._require_free_export_name(change.system_id, name)
        baseline = _port_baseline(port) if port is not None else None
        if baseline is not None:
            if instance.get("kind", "board") not in ("board", "module"):
                raise Invalid("a port export needs a board or module instance")
            if self.linked_port(change.system_id, instance_id, baseline["portKey"]):
                raise Conflict("export_port_linked: this port is an end of a link in this system")
            if self.exported_port(change.system_id, instance_id, baseline["portKey"]):
                raise Conflict("this port is already exported")
        else:
            if instance.get("kind", "board") != "assembly":
                raise Invalid("a re-export needs an assembly instance")
            if self.linked_port(change.system_id, instance_id, child_export_id):
                raise Conflict("export_port_linked: this subsystem export is an end of a link in this system")
            if self.exported_port(change.system_id, instance_id, child_export_id):
                raise Conflict("this subsystem export is already re-exported")
        export_id = _given_id("sxp_", export_id)
        self.conn.execute(
            """
            INSERT INTO system_exports
                (id, system_id, name, description, target_instance_id, target_port, target_export_id)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """,
            (export_id, change.system_id, name, description or "", instance_id,
             Jsonb(baseline) if baseline is not None else None, child_export_id),
        )
        change.audit("export_created", {
            "exportId": export_id, "name": name, "instanceId": instance_id,
            "portKey": baseline["portKey"] if baseline else None, "childExportId": child_export_id,
        })
        return self.get_export(change.system_id, export_id)

    def update_export(
        self, change: Mutation, export_id: str, *, name: Optional[str] = None,
        description: Optional[str] = None,
    ) -> dict:
        before = self.get_export(change.system_id, export_id)
        values = {
            "name": before["name"] if name is None else self._require_free_export_name(
                change.system_id, name, except_id=export_id),
            "description": before["description"] if description is None else description,
        }
        self.conn.execute(
            "UPDATE system_exports SET name = %s, description = %s, updated_at = NOW() WHERE id = %s",
            (values["name"], values["description"], export_id),
        )
        changed = {k: {"before": before[k], "after": v} for k, v in values.items() if before[k] != v}
        if changed:
            change.audit("export_updated", {"exportId": export_id, **changed})
        return self.get_export(change.system_id, export_id)

    def retarget_export(
        self, change: Mutation, export_id: str, *, instance_id: str, port: Mapping[str, Any],
    ) -> dict:
        """Point an export at another board port; its ID never changes (§4.1)."""
        before = self.get_export(change.system_id, export_id)
        baseline = _port_baseline(port)
        instance = self.get_instance(change.system_id, instance_id)
        if instance.get("kind", "board") not in ("board", "module"):
            raise Invalid("a port export needs a board or module instance")
        if self.linked_port(change.system_id, instance_id, baseline["portKey"]):
            raise Conflict("export_port_linked: this port is an end of a link in this system")
        other = self.exported_port(change.system_id, instance_id, baseline["portKey"])
        if other and other["id"] != export_id:
            raise Conflict("this port is already exported")
        self.conn.execute(
            """
            UPDATE system_exports
            SET target_instance_id = %s, target_port = %s, target_export_id = NULL, updated_at = NOW()
            WHERE id = %s
            """,
            (instance_id, Jsonb(baseline), export_id),
        )
        change.audit("export_retargeted", {
            "exportId": export_id,
            "before": {"instanceId": before["target_instance_id"],
                       "portKey": (before["target_port"] or {}).get("portKey"),
                       "childExportId": before["target_export_id"]},
            "after": {"instanceId": instance_id, "portKey": baseline["portKey"]},
        })
        return self.get_export(change.system_id, export_id)

    def set_export_port(self, change: Mutation, export_id: str, port: Mapping[str, Any]) -> None:
        """Refresh an export's port baseline after a silent relabel or rebind (no audit of its own)."""
        self.conn.execute(
            "UPDATE system_exports SET target_port = %s, updated_at = NOW() WHERE id = %s",
            (Jsonb(_port_baseline(port)), export_id),
        )

    def delete_export(self, change: Mutation, export_id: str) -> None:
        export = self.get_export(change.system_id, export_id)
        self.conn.execute("DELETE FROM system_exports WHERE id = %s", (export_id,))
        change.audit("export_deleted", {"exportId": export_id, "name": export["name"],
                                        "instanceId": export["target_instance_id"]})

    def update_link(
        self, change: Mutation, link_id: str, *, name: Optional[str] = None, harness: Any = ...,
        link_type: Optional[str] = None, stack_height_mm: Any = ...,
    ) -> dict:
        before = self.get_link(change.system_id, link_id)
        values = {
            "name": before["name"] if name is None else name,
            "harness": before["harness"] if harness is ... else (harness or None),
        }
        new_type = before["type"] if link_type is None else link_type
        stack = before["stack_height_mm"] if stack_height_mm is ... else stack_height_mm
        if new_type != "b2b" and stack_height_mm is ...:
            stack = None  # leaving b2b drops the pair's stack height (§16.2)
        _check_link_type(new_type, stack)
        if new_type == "b2b" and before["type"] != "b2b":
            self._check_b2b_ports(change.system_id, link_id, ((before["a_instance_id"], before["a_port"]["portKey"]),
                                                              (before["b_instance_id"], before["b_port"]["portKey"])))
        self.conn.execute(
            "UPDATE system_links SET name = %s, harness = %s, type = %s, stack_height_mm = %s, updated_at = NOW()"
            " WHERE id = %s",
            (values["name"], values["harness"], new_type, stack, link_id),
        )
        changed = {k: {"before": before[k], "after": v} for k, v in values.items() if before[k] != v}
        if before["stack_height_mm"] != stack:
            changed["stackHeightMm"] = {"before": before["stack_height_mm"], "after": stack}
        if changed:
            change.audit("link_updated", {"linkId": link_id, **changed})
        if before["type"] != new_type:
            change.audit("link_type_changed", {"linkId": link_id, "before": before["type"], "after": new_type})
        return self.get_link(change.system_id, link_id)

    def _check_b2b_ports(self, system_id: str, link_id: str, ends: Sequence[tuple[str, str]]) -> None:
        """§16.2 [T6]: a port is in at most one ``b2b`` link."""
        for instance_id, port_key in ends:
            clash = self.conn.execute(
                """
                SELECT id FROM system_links
                WHERE system_id = %s AND type = 'b2b' AND id <> %s
                  AND ((a_instance_id = %s AND a_port->>'portKey' = %s) OR (b_instance_id = %s AND b_port->>'portKey' = %s))
                LIMIT 1
                """,
                (system_id, link_id, instance_id, port_key, instance_id, port_key),
            ).fetchone()
            if clash is not None:
                raise Conflict("port_already_mated: this connector already mates in another board-to-board link")

    def set_link_port(
        self, change: Mutation, link_id: str, end: str, port: Mapping[str, Any]
    ) -> None:
        """Replace one end's port baseline (silent relabel, rebind, accepted change)."""
        if end not in ("a", "b"):
            raise Invalid("end must be 'a' or 'b'")
        self.get_link(change.system_id, link_id)
        self.conn.execute(
            f"UPDATE system_links SET {end}_port = %s, updated_at = NOW() WHERE id = %s",
            (Jsonb(_port_baseline(port)), link_id),
        )

    def delete_link(self, change: Mutation, link_id: str) -> None:
        link = self.get_link(change.system_id, link_id)
        self.conn.execute("DELETE FROM system_links WHERE id = %s", (link_id,))
        change.audit(
            "link_deleted", {"linkId": link_id, "name": link["name"], "rowCount": len(link["rows"])}
        )

    def replace_rows(
        self, change: Mutation, link_id: str, rows: Sequence[Mapping[str, Any]],
        *, keep_new_ids: bool = False,
    ) -> list[dict]:
        """§8.1 ``PUT …/rows``: replace a link's rows atomically.

        Each row carries ``pinA``, ``pinB``, ``signal``, ``source`` and the net
        baselines ``netA``/``netB`` the caller captured from the current
        observation. A row with an ``id`` of this link keeps that id.
        """

        link = self.get_link(change.system_id, link_id)
        previous = {row["id"]: row for row in link["rows"]}
        existing = set(previous)
        seen: set[tuple[str, str]] = set()
        ids: set[str] = set()
        normalized = []
        for row in rows:
            pin_a, pin_b = str(row.get("pinA") or ""), str(row.get("pinB") or "")
            if not pin_a or not pin_b:
                raise Invalid("every row needs pinA and pinB")
            if (pin_a, pin_b) in seen:
                raise Invalid(f"duplicate row {pin_a} ↔ {pin_b}")
            seen.add((pin_a, pin_b))
            source = str(row.get("source") or "manual")
            if source not in ROW_SOURCES:
                raise Invalid(f"unknown row source {source!r}")
            row_id = row.get("id")
            if row_id is not None and row_id not in existing:
                if not keep_new_ids:
                    raise Conflict(f"row {row_id} does not belong to this link")
                _given_id("srw_", row_id)  # manifest import: a new row keeps its ID
            if row_id is not None and row_id in ids:
                raise Invalid(f"row {row_id} appears twice")
            if row_id is not None:
                ids.add(row_id)
            normalized.append(
                (row_id or new_id("srw_"), pin_a, pin_b, str(row.get("signal") or ""),
                 _nets(row.get("netA") or []), _nets(row.get("netB") or []), source)
            )
        other_rows = self.conn.execute(
            """
            SELECT count(*) AS n FROM system_link_rows r JOIN system_links l ON l.id = r.link_id
            WHERE l.system_id = %s AND r.link_id <> %s
            """,
            (change.system_id, link_id),
        ).fetchone()["n"]
        if other_rows + len(normalized) > MAX_ROWS:
            raise Invalid(f"limit rows_per_system ({MAX_ROWS})")
        self.conn.execute("DELETE FROM system_link_rows WHERE link_id = %s", (link_id,))
        for row_id, pin_a, pin_b, signal, net_a, net_b, source in normalized:
            self.conn.execute(
                """
                INSERT INTO system_link_rows (id, link_id, pin_a, pin_b, signal, net_a, net_b, source)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                """,
                (row_id, link_id, pin_a, pin_b, signal, Jsonb(net_a), Jsonb(net_b), source),
            )
        kept = {row[0] for row in normalized}

        def described(pin_a: str, pin_b: str, signal: str, net_a: list, net_b: list) -> dict:
            return {"pinA": pin_a, "pinB": pin_b, "signal": signal, "netA": net_a, "netB": net_b}

        after = {row[0]: described(*row[1:6]) for row in normalized}
        before = {rid: described(r["pin_a"], r["pin_b"], r["signal"], list(r["net_a"]), list(r["net_b"]))
                  for rid, r in previous.items()}
        change.audit(
            "rows_replaced",
            {"linkId": link_id, "rowCount": len(normalized),
             "added": sorted(kept - existing), "removed": sorted(existing - kept),
             # What each row was and became, so history explains the engineering change.
             "rows": {
                 "added": [{"id": rid, **after[rid]} for rid in sorted(kept - existing)],
                 "removed": [{"id": rid, **before[rid]} for rid in sorted(existing - kept)],
                 "changed": [{"id": rid, "before": before[rid], "after": after[rid]}
                             for rid in sorted(kept & existing) if before[rid] != after[rid]],
             }},
        )
        return self.get_link(change.system_id, link_id)["rows"]

    # ------------------------------------------------------------------
    # Reviews (§5, §6.2, §6.5, §10.1)

    def open_source_review(self, instance_id: str) -> Optional[dict]:
        """The instance's open ``source_update``, ``baseline_unreachable`` or ``child_update`` review."""
        row = self.conn.execute(
            """
            SELECT * FROM system_reviews
            WHERE instance_id = %s AND status = 'open'
              AND kind IN ('source_update', 'baseline_unreachable', 'child_update')
            """,
            (instance_id,),
        ).fetchone()
        return dict(row) if row else None

    def open_review(
        self, change: Mutation, *, instance_id: Optional[str], kind: str,
        from_commit: Optional[str], to_commit: Optional[str],
        items: Sequence[Mapping[str, Any]] = (),
        pending_changes: Mapping[str, Any] | None = None,
    ) -> dict:
        """Create an open review with its items, in order, and audit it."""
        review_id = new_id("srv_")
        self.conn.execute(
            """
            INSERT INTO system_reviews
                (id, system_id, instance_id, kind, from_commit, to_commit, pending_changes)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """,
            (review_id, change.system_id, instance_id, kind, from_commit, to_commit,
             Jsonb(dict(pending_changes or {}))),
        )
        for ordinal, item in enumerate(items):
            self.conn.execute(
                """
                INSERT INTO system_review_items
                    (id, review_id, ordinal, kind, link_id, link_end, row_ids,
                     expected, observed, candidates)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """,
                (new_id("sri_"), review_id, ordinal, item["kind"], item.get("linkId"),
                 item.get("end"), Jsonb(list(item.get("rowIds") or [])),
                 Jsonb(item.get("expected")), Jsonb(item.get("observed")),
                 None if item.get("candidates") is None else Jsonb(list(item["candidates"]))),
            )
        change.audit(
            "review_opened",
            {"reviewId": review_id, "instanceId": instance_id, "kind": kind,
             "from": from_commit, "to": to_commit, "itemCount": len(items)},
        )
        return self.get_review(change.system_id, review_id)

    def set_review_status(
        self, change: Mutation, review_id: str, status: str, *, audit_kind: Optional[str] = None,
        payload: Mapping[str, Any] | None = None,
    ) -> None:
        self.conn.execute(
            """
            UPDATE system_reviews SET status = %s, decided_by = %s, decided_at = NOW()
            WHERE id = %s AND system_id = %s
            """,
            (status, change.actor, review_id, change.system_id),
        )
        if audit_kind:
            change.audit(audit_kind, {"reviewId": review_id, "status": status, **dict(payload or {})})

    def set_item_decision(
        self, change: Mutation, review_id: str, item_id: str, decision: str,
        payload: Mapping[str, Any] | None,
    ) -> None:
        self.conn.execute(
            """
            UPDATE system_review_items SET decision = %s, decision_payload = %s
            WHERE id = %s AND review_id = %s
            """,
            (decision, None if payload is None else Jsonb(dict(payload)), item_id, review_id),
        )
        change.audit(
            "review_item_decided",
            {"reviewId": review_id, "itemId": item_id, "decision": decision,
             "payload": None if payload is None else dict(payload)},
        )

    def update_row_end(
        self, change: Mutation, link_id: str, row_id: str, end: str, *,
        pin: Optional[str] = None, nets: Sequence[str],
    ) -> None:
        """Set one end's accepted net set, and optionally its pin (§7.1)."""
        if end not in ("a", "b"):
            raise Invalid("end must be 'a' or 'b'")
        try:
            self.conn.execute(
                f"""
                UPDATE system_link_rows
                SET pin_{end} = COALESCE(%s, pin_{end}), net_{end} = %s
                WHERE id = %s AND link_id = %s
                """,
                (pin, Jsonb(_nets(nets)), row_id, link_id),
            )
        except Exception as error:
            if getattr(error, "sqlstate", None) == "23505":
                raise Conflict("the remapped row would duplicate another row") from None
            raise

    def delete_rows(self, change: Mutation, link_id: str, row_ids: Sequence[str]) -> None:
        self.conn.execute(
            "DELETE FROM system_link_rows WHERE link_id = %s AND id = ANY(%s)",
            (link_id, list(row_ids)),
        )

    def get_review(self, system_id: str, review_id: str) -> dict:
        row = self.conn.execute(
            "SELECT * FROM system_reviews WHERE system_id = %s AND id = %s", (system_id, review_id)
        ).fetchone()
        if row is None:
            raise NotFound(review_id)
        review = dict(row)
        review["items"] = [
            dict(item)
            for item in self.conn.execute(
                "SELECT * FROM system_review_items WHERE review_id = %s ORDER BY ordinal",
                (review_id,),
            ).fetchall()
        ]
        return review

    def list_reviews(self, system_id: str, *, status: Optional[str] = None) -> list[dict]:
        rows = self.conn.execute(
            """
            SELECT id FROM system_reviews
            WHERE system_id = %s AND (%s::text IS NULL OR status = %s::text)
            ORDER BY created_at DESC, id
            """,
            (system_id, status, status),
        ).fetchall()
        return [self.get_review(system_id, row["id"]) for row in rows]

    # ------------------------------------------------------------------
    # Snapshots (§9.1): immutable, stored unredacted

    _SNAPSHOT_META = ("id, system_id, name, note, created_by, created_at, digest, open_review_count, "
                      "renderer_version, manifest_schema, connectivity_digest")

    def create_snapshot(
        self, change: Mutation, *, name: str, note: str, document: Mapping[str, Any], digest: str,
        open_review_count: int, renderer_version: str, snapshot_id: Optional[str] = None,
        manifest: Optional[Mapping[str, Any]] = None, connectivity_digest: Optional[str] = None,
    ) -> dict:
        if not name.strip():
            raise Invalid("name is required")
        snapshot_id = _given_id("ssn_", snapshot_id)
        row = self.conn.execute(
            f"""
            INSERT INTO system_snapshots
                (id, system_id, name, note, created_by, document, digest, open_review_count, renderer_version,
                 manifest, manifest_schema, connectivity_digest)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT ON CONSTRAINT system_snapshots_name_key DO NOTHING
            RETURNING {self._SNAPSHOT_META}
            """,
            (snapshot_id, change.system_id, name.strip(), note, change.actor, Jsonb(dict(document)),
             digest, int(open_review_count), renderer_version,
             Jsonb(dict(manifest)) if manifest is not None else None,
             manifest.get("schema") if manifest is not None else None, connectivity_digest),
        ).fetchone()
        if row is None:
            raise Conflict(f"a snapshot named {name.strip()!r} already exists")
        change.audit("snapshot_created", {"snapshotId": snapshot_id, "name": row["name"], "digest": digest})
        return dict(row)

    def list_snapshots(self, system_id: str) -> list[dict]:
        rows = self.conn.execute(
            f"SELECT {self._SNAPSHOT_META} FROM system_snapshots WHERE system_id = %s ORDER BY created_at DESC, id",
            (system_id,),
        ).fetchall()
        return [dict(row) for row in rows]

    def get_snapshot(self, system_id: str, snapshot_id: str) -> dict:
        row = self.conn.execute(
            f"SELECT {self._SNAPSHOT_META}, document, manifest FROM system_snapshots WHERE system_id = %s AND id = %s",
            (system_id, snapshot_id),
        ).fetchone()
        if row is None:
            raise NotFound("Snapshot not found")
        return dict(row)

    # ------------------------------------------------------------------
    # Import sessions (§9.3)

    IMPORT_RETENTION_DAYS = 7

    def create_import_session(
        self, system_id: str, *, actor: str, filename: str, delimiter: str, content: str, row_count: int,
    ) -> dict:
        self.get_system(system_id)
        self.conn.execute(
            """
            DELETE FROM system_import_sessions
            WHERE system_id = %s AND committed_at IS NULL
              AND created_at < NOW() - make_interval(days => %s)
            """,
            (system_id, self.IMPORT_RETENTION_DAYS),
        )
        row = self.conn.execute(
            """
            INSERT INTO system_import_sessions (id, system_id, created_by, filename, delimiter, content, row_count)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING *
            """,
            (new_id("sim_"), system_id, actor, filename, delimiter, content, int(row_count)),
        ).fetchone()
        return dict(row)

    def get_import_session(self, system_id: str, import_id: str, *, lock: bool = False) -> dict:
        row = self.conn.execute(
            "SELECT * FROM system_import_sessions WHERE system_id = %s AND id = %s"
            + (" FOR UPDATE" if lock else ""),
            (system_id, import_id),
        ).fetchone()
        if row is None:
            raise NotFound("Import not found")
        return dict(row)

    def mark_import_committed(self, change: Mutation, import_id: str, report: Mapping[str, Any]) -> None:
        self.conn.execute(
            "UPDATE system_import_sessions SET committed_at = NOW(), committed_by = %s WHERE id = %s",
            (change.actor, import_id),
        )
        change.audit("import_committed", {"importId": import_id, **dict(report)})

    # ------------------------------------------------------------------
    # Audit history

    def instance_projects(self, system_id: str) -> dict[str, str]:
        """Every instance the system has had, current or removed, and its project."""

        rows = self.conn.execute(
            """
            SELECT id, project_id FROM system_instances WHERE system_id = %s AND project_id IS NOT NULL
            UNION
            SELECT payload->>'instanceId', payload->>'projectId' FROM system_audit_events
            WHERE system_id = %s AND kind IN ('instance_added', 'instance_removed')
              AND payload ? 'instanceId' AND payload->>'projectId' IS NOT NULL
            """,
            (system_id, system_id),
        ).fetchall()
        return {row["id"]: row["project_id"] for row in rows}

    def history(self, system_id: str, *, before_seq: Optional[int] = None, limit: int = 100) -> list[dict]:
        rows = self.conn.execute(
            """
            SELECT seq, id, at, actor, kind, payload FROM system_audit_events
            WHERE system_id = %s AND (%s::bigint IS NULL OR seq < %s::bigint)
            ORDER BY seq DESC LIMIT %s
            """,
            (system_id, before_seq, before_seq, max(1, min(int(limit), 500))),
        ).fetchall()
        return [dict(row) for row in rows]

    # ------------------------------------------------------------------
    # Layout (§1 invariant 6: no version, no audit)

    def get_layout(self, system_id: str) -> dict:
        self.get_system(system_id)
        row = self.conn.execute(
            "SELECT positions FROM system_layouts WHERE system_id = %s", (system_id,)
        ).fetchone()
        return dict(row["positions"]) if row else {}

    def put_layout(self, system_id: str, positions: Mapping[str, Any]) -> None:
        self.get_system(system_id)
        self.conn.execute(
            """
            INSERT INTO system_layouts (system_id, positions) VALUES (%s, %s)
            ON CONFLICT (system_id) DO UPDATE
                SET positions = EXCLUDED.positions, updated_at = NOW()
            """,
            (system_id, Jsonb(dict(positions))),
        )

    # ------------------------------------------------------------------
    # Interface artifact cache (§3)

    def get_interface(self, project_id: str, commit: str, extractor_version: str) -> Optional[dict]:
        row = self.conn.execute(
            """
            SELECT payload FROM system_interface_artifacts
            WHERE project_id = %s AND commit = %s AND extractor_version = %s
            """,
            (project_id, commit, extractor_version),
        ).fetchone()
        return dict(row["payload"]) if row else None

    def put_interface(self, payload: Mapping[str, Any]) -> dict:
        """Store an artifact; the first writer wins, and its copy is returned."""
        project_id, commit = payload["projectId"], payload["commit"]
        version = payload["extractor"]["version"]
        self.conn.execute(
            """
            INSERT INTO system_interface_artifacts
                (project_id, commit, extractor_version, digest, payload)
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT (project_id, commit, extractor_version) DO NOTHING
            """,
            (project_id, commit, version, payload["digest"], Jsonb(dict(payload))),
        )
        stored = self.get_interface(project_id, commit, version)
        assert stored is not None
        return stored

    # ------------------------------------------------------------------
    # Detection bookkeeping (§10.1)

    def get_source_check(self, instance_id: str) -> Optional[dict]:
        row = self.conn.execute(
            "SELECT * FROM system_source_checks WHERE instance_id = %s", (instance_id,)
        ).fetchone()
        return dict(row) if row else None

    def record_source_check(
        self, instance_id: str, *, tip_commit: Optional[str], checked_commit: Optional[str],
        outcome: str, retry: bool = False,
    ) -> None:
        """Record what detection saw. Not a design change: no version bump, no audit.

        ``retry`` forgets the checked commit, so the next check evaluates the tip again.
        """
        self.conn.execute(
            "UPDATE system_instances SET tip_commit = %s, tip_checked_at = NOW() WHERE id = %s",
            (tip_commit, instance_id),
        )
        self.conn.execute(
            """
            INSERT INTO system_source_checks (instance_id, last_checked_commit, last_outcome)
            VALUES (%s, %s, %s)
            ON CONFLICT (instance_id) DO UPDATE SET
                last_checked_commit = CASE WHEN %s THEN NULL ELSE COALESCE(
                    EXCLUDED.last_checked_commit, system_source_checks.last_checked_commit) END,
                last_outcome = EXCLUDED.last_outcome,
                checked_at = NOW()
            """,
            (instance_id, checked_commit, outcome, retry),
        )
