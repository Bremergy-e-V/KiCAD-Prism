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

Reviews and snapshots get their store methods with the tickets that use them
(SYS-06/07/09); their tables already exist.
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


_COMMIT = re.compile(r"^[0-9a-f]{40}$")


def _require_commit(commit: str) -> str:
    if not isinstance(commit, str) or not _COMMIT.match(commit):
        raise Invalid("commit must be a full 40-character lowercase SHA")
    return commit


def new_id(prefix: str) -> str:
    """§2.1: a prefix plus 32 lowercase hex characters from a UUID4."""
    return f"{prefix}{uuid.uuid4().hex}"


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
        self, *, name: str, description: str = "", folder_id: Optional[str], actor: str
    ) -> dict:
        if not name.strip():
            raise Invalid("name is required")
        system_id = new_id("sys_")
        row = self.conn.execute(
            """
            INSERT INTO system_projects (id, name, description, folder_id, created_by)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING *
            """,
            (system_id, name.strip(), description, folder_id, actor),
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
        self, system_id: str, *, expected_version: Optional[int], actor: str
    ) -> Iterator[Mutation]:
        row = self.conn.execute(
            "SELECT version FROM system_projects WHERE id = %s FOR UPDATE", (system_id,)
        ).fetchone()
        if row is None:
            raise NotFound(system_id)
        if expected_version is not None and int(expected_version) != int(row["version"]):
            raise StaleVersion(int(row["version"]))
        change = Mutation(self, system_id, actor, int(row["version"]))
        yield change
        bumped = self.conn.execute(
            """
            UPDATE system_projects SET version = version + 1, updated_at = NOW()
            WHERE id = %s RETURNING version
            """,
            (system_id,),
        ).fetchone()
        change.version = int(bumped["version"])

    def update_system(
        self, change: Mutation, *, name: Optional[str] = None,
        description: Optional[str] = None, folder_id: Any = ...,
    ) -> dict:
        before = self.get_system(change.system_id)
        values = {
            "name": before["name"] if name is None else name.strip(),
            "description": before["description"] if description is None else description,
            "folder_id": before["folder_id"] if folder_id is ... else folder_id,
        }
        if not values["name"]:
            raise Invalid("name is required")
        self.conn.execute(
            "UPDATE system_projects SET name = %s, description = %s, folder_id = %s WHERE id = %s",
            (values["name"], values["description"], values["folder_id"], change.system_id),
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

    def list_instances(self, system_id: str) -> list[dict]:
        rows = self.conn.execute(
            "SELECT * FROM system_instances WHERE system_id = %s ORDER BY lower(label), id",
            (system_id,),
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
        tracked_ref: Optional[str], pinned: bool,
    ) -> dict:
        count = self.conn.execute(
            "SELECT count(*) AS n FROM system_instances WHERE system_id = %s", (change.system_id,)
        ).fetchone()["n"]
        if count >= MAX_INSTANCES:
            raise Invalid(f"limit instances_per_system ({MAX_INSTANCES})")
        _require_commit(baseline_commit)
        self._require_free_label(change.system_id, label)
        instance_id = new_id("sin_")
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
        if links and not cascade_links:
            raise Conflict("instance is an endpoint of a link")
        for link in links:
            self.delete_link(change, link["id"])
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

        Returns the affected system IDs so the caller can bump their versions.
        """
        rows = self.conn.execute(
            """
            UPDATE system_instances SET resolution = 'unresolved', updated_at = NOW()
            WHERE project_id = %s AND resolution <> 'unresolved'
            RETURNING system_id
            """,
            (project_id,),
        ).fetchall()
        return sorted({row["system_id"] for row in rows})

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
        harness: Optional[str] = None,
    ) -> dict:
        a_baseline, b_baseline = _port_baseline(a_port), _port_baseline(b_port)
        if a_instance_id == b_instance_id and a_baseline["portKey"] == b_baseline["portKey"]:
            raise Invalid("both link ends are the same port")
        for instance_id in (a_instance_id, b_instance_id):
            self.get_instance(change.system_id, instance_id)
        count = self.conn.execute(
            "SELECT count(*) AS n FROM system_links WHERE system_id = %s", (change.system_id,)
        ).fetchone()["n"]
        if count >= MAX_LINKS:
            raise Invalid(f"limit links_per_system ({MAX_LINKS})")
        link_id = new_id("slk_")
        self.conn.execute(
            """
            INSERT INTO system_links
                (id, system_id, name, harness, a_instance_id, a_port, b_instance_id, b_port)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (link_id, change.system_id, name, harness or None, a_instance_id, Jsonb(a_baseline),
             b_instance_id, Jsonb(b_baseline)),
        )
        change.audit(
            "link_created",
            {"linkId": link_id, "name": name, "harness": harness or None,
             "a": {"instanceId": a_instance_id, "portKey": a_baseline["portKey"]},
             "b": {"instanceId": b_instance_id, "portKey": b_baseline["portKey"]}},
        )
        return self.get_link(change.system_id, link_id)

    def update_link(
        self, change: Mutation, link_id: str, *, name: Optional[str] = None, harness: Any = ...,
    ) -> dict:
        before = self.get_link(change.system_id, link_id)
        values = {
            "name": before["name"] if name is None else name,
            "harness": before["harness"] if harness is ... else (harness or None),
        }
        self.conn.execute(
            "UPDATE system_links SET name = %s, harness = %s, updated_at = NOW() WHERE id = %s",
            (values["name"], values["harness"], link_id),
        )
        changed = {k: {"before": before[k], "after": v} for k, v in values.items() if before[k] != v}
        if changed:
            change.audit("link_updated", {"linkId": link_id, **changed})
        return self.get_link(change.system_id, link_id)

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
        self, change: Mutation, link_id: str, rows: Sequence[Mapping[str, Any]]
    ) -> list[dict]:
        """§8.1 ``PUT …/rows``: replace a link's rows atomically.

        Each row carries ``pinA``, ``pinB``, ``signal``, ``source`` and the net
        baselines ``netA``/``netB`` the caller captured from the current
        observation. A row with an ``id`` of this link keeps that id.
        """

        link = self.get_link(change.system_id, link_id)
        existing = {row["id"] for row in link["rows"]}
        seen: set[tuple[str, str]] = set()
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
                raise Conflict(f"row {row_id} does not belong to this link")
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
        change.audit(
            "rows_replaced",
            {"linkId": link_id, "rowCount": len(normalized),
             "added": sorted(kept - existing), "removed": sorted(existing - kept)},
        )
        return self.get_link(change.system_id, link_id)["rows"]

    # ------------------------------------------------------------------
    # Audit history

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
        outcome: str,
    ) -> None:
        """Record what detection saw. Not a design change: no version bump, no audit."""
        self.conn.execute(
            "UPDATE system_instances SET tip_commit = %s, tip_checked_at = NOW() WHERE id = %s",
            (tip_commit, instance_id),
        )
        self.conn.execute(
            """
            INSERT INTO system_source_checks (instance_id, last_checked_commit, last_outcome)
            VALUES (%s, %s, %s)
            ON CONFLICT (instance_id) DO UPDATE SET
                last_checked_commit = COALESCE(EXCLUDED.last_checked_commit,
                                               system_source_checks.last_checked_commit),
                last_outcome = EXCLUDED.last_outcome,
                checked_at = NOW()
            """,
            (instance_id, checked_commit, outcome),
        )
