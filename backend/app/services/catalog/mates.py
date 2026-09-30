"""Catalog "mates with" (CONTRACTS_P2 §18): which parts mate with which.

A pair is stored once with ``part_a < part_b`` and read in both directions.
Only ``part`` components take part. Board connectors are matched to parts by
MPN, case-insensitively, against each part's current revision.
"""

from __future__ import annotations

from typing import Any, Iterable

MPN_FIELDS = ("mpn", "manufacturer_part_number", "mfr_pn", "mfr. no.", "mfr no", "manufacturer part number")


def ordered(a: str, b: str) -> tuple[str, str]:
    return (a, b) if a < b else (b, a)


def _part_row(conn: Any, component_id: str) -> dict | None:
    row = conn.execute(
        """
        SELECT c.id, c.kind, c.is_active, r.name, r.mpn, r.manufacturer, r.value
        FROM components c LEFT JOIN component_revisions r ON r.id = c.current_revision_id
        WHERE c.id = %s
        """,
        (component_id,),
    ).fetchone()
    return dict(row) if row else None


def summary(row: dict) -> dict[str, Any]:
    return {"componentId": str(row["id"]), "name": str(row.get("name") or ""), "mpn": str(row.get("mpn") or ""),
            "manufacturer": str(row.get("manufacturer") or "")}


def require_part(conn: Any, component_id: str) -> dict:
    row = _part_row(conn, component_id)
    if row is None or not int(row["is_active"] or 0):
        raise LookupError("Component not found")
    if str(row["kind"] or "part") != "part":
        raise ValueError("only parts mate with parts")
    return row


def list_mates(conn: Any, component_id: str) -> list[dict[str, Any]]:
    rows = conn.execute(
        """
        SELECT c.id, r.name, r.mpn, r.manufacturer, m.created_by, m.created_at
        FROM catalog_mates_with m
        JOIN components c ON c.id = CASE WHEN m.part_a = %s THEN m.part_b ELSE m.part_a END
        LEFT JOIN component_revisions r ON r.id = c.current_revision_id
        WHERE (m.part_a = %s OR m.part_b = %s) AND c.is_active = 1
        ORDER BY lower(coalesce(r.mpn, '')), c.id
        """,
        (component_id, component_id, component_id),
    ).fetchall()
    return [{**summary(dict(row)), "createdBy": str(row["created_by"]), "createdAt": str(row["created_at"])}
            for row in rows]


def add(conn: Any, a: str, b: str, *, actor: str, now: str) -> bool:
    """Record the pair; False when it already existed."""
    if a == b:
        raise ValueError("a part cannot mate with itself")
    part_a, part_b = ordered(a, b)
    inserted = conn.execute(
        "INSERT INTO catalog_mates_with (part_a, part_b, created_by, created_at) VALUES (%s, %s, %s, %s)"
        " ON CONFLICT DO NOTHING RETURNING part_a",
        (part_a, part_b, actor, now),
    ).fetchone()
    return inserted is not None


def remove(conn: Any, a: str, b: str) -> bool:
    part_a, part_b = ordered(a, b)
    return conn.execute(
        "DELETE FROM catalog_mates_with WHERE part_a = %s AND part_b = %s RETURNING part_a", (part_a, part_b)
    ).fetchone() is not None


def parts_by_mpn(conn: Any, mpns: Iterable[str]) -> dict[str, dict[str, Any]]:
    """``lower(mpn) -> part summary`` for active parts; an MPN shared by several parts is left out (ambiguous)."""
    wanted = sorted({m.strip().lower() for m in mpns if m and m.strip()})
    if not wanted:
        return {}
    rows = conn.execute(
        """
        SELECT c.id, r.name, r.mpn, r.manufacturer, lower(r.mpn) AS key
        FROM components c JOIN component_revisions r ON r.id = c.current_revision_id
        WHERE c.is_active = 1 AND c.kind = 'part' AND lower(r.mpn) = ANY(%s)
        """,
        (wanted,),
    ).fetchall()
    found: dict[str, list[dict]] = {}
    for row in rows:
        found.setdefault(str(row["key"]), []).append(dict(row))
    return {key: summary(items[0]) for key, items in found.items() if len(items) == 1}


def pairs_among(conn: Any, component_ids: Iterable[str]) -> set[tuple[str, str]]:
    ids = sorted(set(component_ids))
    if not ids:
        return set()
    rows = conn.execute(
        "SELECT part_a, part_b FROM catalog_mates_with WHERE part_a = ANY(%s) OR part_b = ANY(%s)", (ids, ids)
    ).fetchall()
    return {(str(r["part_a"]), str(r["part_b"])) for r in rows}
