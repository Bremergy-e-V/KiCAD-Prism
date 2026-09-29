"""Connection CSV import (``docs/system-builder/CONTRACTS.md`` §9.3).

Three steps share this module:

* ``parse`` turns an upload into a header and data rows (upload);
* ``classify`` resolves every row against each instance's **baseline**
  interface and sorts it into the four buckets, first match wins
  (preview, and again under the lock at commit);
* ``apply_rows`` writes resolved rows into links, reusing a link with the
  same unordered port pair and harness or creating one (commit, and an
  ``import`` review once its accepted items are applied).

``classify`` is pure. ``apply_rows`` runs inside a caller's
``SystemStore.mutation``.
"""

from __future__ import annotations

import csv
import io
import re
from dataclasses import dataclass
from typing import Any, Iterable, Mapping, Optional, Sequence

from app.services.systems import exposure
from app.services.systems.store import MAX_ROWS, Conflict, Invalid, Mutation, SystemStore

MAX_UPLOAD_BYTES = 5_000_000
SAMPLE_ROWS = 20
MAX_BOARD_VALUES = 100
DELIMITERS = (",", ";", "\t", "|")

ENDPOINT_TARGETS = ("from_board", "from_connector", "from_pin", "to_board", "to_connector", "to_pin")
TARGETS = ENDPOINT_TARGETS + ("signal", "harness", "link_name", "row_id")
SKIP = "skip"

BUCKETS = ("matched", "needsReview", "unresolved", "conflict")

# Header spellings suggested for each target; the §9.2 export columns first.
_ALIASES = {
    "from_board": ("a_board", "from_board", "board_a", "from"),
    "from_connector": ("a_connector", "from_connector", "connector_a", "a_ref", "from_ref", "from_reference"),
    "from_pin": ("a_pin", "from_pin", "pin_a"),
    "to_board": ("b_board", "to_board", "board_b", "to"),
    "to_connector": ("b_connector", "to_connector", "connector_b", "b_ref", "to_ref", "to_reference"),
    "to_pin": ("b_pin", "to_pin", "pin_b"),
    "signal": ("signal", "signal_name"),
    "harness": ("harness", "cable"),
    "link_name": ("link_name", "link"),
    "row_id": ("row_id",),
}


# ---------------------------------------------------------------------------
# Upload


@dataclass(frozen=True)
class Parsed:
    delimiter: str
    columns: list[str]
    rows: list[tuple[int, dict[str, str]]]  # (source line, {column: value})


def _normalize_header(value: str) -> str:
    return re.sub(r"[\s\-]+", "_", value.strip().lower())


def decode(raw: bytes) -> str:
    if len(raw) > MAX_UPLOAD_BYTES:
        raise Invalid(f"limit import_bytes ({MAX_UPLOAD_BYTES})")
    try:
        return raw.decode("utf-8-sig")
    except UnicodeDecodeError:
        raise Invalid("the CSV must be UTF-8") from None


def sniff_delimiter(text: str) -> str:
    header = text.split("\n", 1)[0]
    counts = {d: header.count(d) for d in DELIMITERS}
    best = max(DELIMITERS, key=lambda d: counts[d])
    return best if counts[best] else ","


def parse(text: str, delimiter: Optional[str] = None) -> Parsed:
    delimiter = delimiter or sniff_delimiter(text)
    if delimiter not in DELIMITERS:
        raise Invalid("delimiter must be one of , ; tab |")
    reader = csv.reader(io.StringIO(text, newline=""), delimiter=delimiter)
    try:
        header = next(reader)
    except StopIteration:
        raise Invalid("the CSV is empty") from None
    except csv.Error as error:
        raise Invalid(f"malformed CSV: {error}") from None
    columns = [name.strip() or f"column {i + 1}" for i, name in enumerate(header)]
    if len(set(columns)) != len(columns):
        raise Invalid("column names must be unique")
    rows = []
    try:
        for values in reader:
            if not any(v.strip() for v in values):
                continue
            if len(rows) >= MAX_ROWS:
                raise Invalid(f"limit import_rows ({MAX_ROWS})")
            values = (values + [""] * len(columns))[: len(columns)]
            rows.append((reader.line_num, {c: v.strip() for c, v in zip(columns, values)}))
    except csv.Error as error:
        raise Invalid(f"malformed CSV at line {reader.line_num}: {error}") from None
    return Parsed(delimiter, columns, rows)


def suggest_column_map(columns: Sequence[str]) -> dict[str, str]:
    by_name = {_normalize_header(c): c for c in columns}
    out = {}
    for target, aliases in _ALIASES.items():
        for alias in aliases:
            if alias in by_name:
                out[target] = by_name[alias]
                break
    return out


def summary(parsed: Parsed) -> dict:
    """What the upload response shows: columns, samples and per-column board candidates."""

    distinct: dict[str, set[str]] = {c: set() for c in parsed.columns}
    for _line, row in parsed.rows:
        for column, value in row.items():
            bucket = distinct[column]
            if value and len(bucket) <= MAX_BOARD_VALUES:
                bucket.add(value)
    return {
        "delimiter": parsed.delimiter,
        "rowCount": len(parsed.rows),
        "columns": list(parsed.columns),
        "sampleRows": [row for _line, row in parsed.rows[:SAMPLE_ROWS]],
        "suggestedColumnMap": suggest_column_map(parsed.columns),
        "boardValues": {c: sorted(v) for c, v in distinct.items() if v and len(v) <= MAX_BOARD_VALUES},
    }


def check_maps(parsed: Parsed, column_map: Mapping[str, str], board_map: Mapping[str, str],
               instance_ids: Iterable[str]) -> None:
    unknown = sorted(set(column_map) - set(TARGETS))
    if unknown:
        raise Invalid(f"unknown column map targets: {', '.join(unknown)}")
    missing = [t for t in ENDPOINT_TARGETS if not column_map.get(t)]
    if missing:
        raise Invalid(f"column map needs {', '.join(missing)}")
    absent = sorted({c for c in column_map.values() if c} - set(parsed.columns))
    if absent:
        raise Invalid(f"columns not in the upload: {', '.join(absent)}")
    known = set(instance_ids)
    bad = sorted({v for v in board_map.values() if v != SKIP and v not in known})
    if bad:
        raise Invalid(f"board map names instances not in this system: {', '.join(bad)}")


# ---------------------------------------------------------------------------
# Classification


def leaf(net: str) -> str:
    return net.rsplit("/", 1)[-1]


def _harness(value: Optional[str]) -> Optional[str]:
    return (value or "").strip() or None


def _port_matches(port: Mapping[str, Any], component: Mapping[str, Any]) -> bool:
    return bool(set(port.get("memberKeys") or [port["portKey"]]) & set(component.get("memberKeys") or []))


def find_link(links: Sequence[Mapping[str, Any]], ends: Sequence[tuple[str, Mapping[str, Any]]],
              harness: Optional[str]) -> Optional[tuple[dict, bool]]:
    """The link joining the two ``(instance_id, component-or-port)`` ends with ``harness``.

    Returns ``(link, swapped)``; ``swapped`` means the first end is the link's B end.
    """

    (ia, ca), (ib, cb) = ends
    for link in sorted(links, key=lambda l: l["id"]):
        if _harness(link["harness"]) != harness:
            continue
        la, lb = (link["a_instance_id"], link["a_port"]), (link["b_instance_id"], link["b_port"])
        if la[0] == ia and lb[0] == ib and _port_matches(la[1], ca) and _port_matches(lb[1], cb):
            return dict(link), False
        if la[0] == ib and lb[0] == ia and _port_matches(la[1], cb) and _port_matches(lb[1], ca):
            return dict(link), True
    return None


def _resolve_end(values: Mapping[str, str], side: str, board_map: Mapping[str, str],
                 instances: Mapping[str, Mapping[str, Any]], interfaces: Mapping[str, Optional[dict]],
                 overrides: Mapping[str, Mapping[str, str]]) -> tuple[Optional[dict], Optional[str]]:
    board, reference, pad = (values.get(f"{side}_{k}", "") for k in ("board", "connector", "pin"))
    if not board or not reference or not pad:
        return None, "missing_value"
    target = board_map.get(board)
    if target is None:
        return None, "board_unmapped"
    if target == SKIP:
        return None, "board_skipped"
    interface = interfaces.get(target)
    if interface is None:
        return None, "interface_not_ready"
    if not exposure.is_annotated(reference):
        return None, "connector_not_found"
    found = [c for c in interface.get("components") or [] if c.get("reference") == reference]
    if not found:
        return None, "connector_not_found"
    if len(found) > 1:
        return None, "connector_ambiguous"
    component = found[0]
    pins = exposure.pins_by_pad(component)
    if pad not in pins:
        return None, "pin_not_found"
    override = (overrides.get(target) or {}).get(component["portKey"])
    return {
        "instanceId": target, "label": instances[target]["label"], "reference": reference,
        "portKey": component["portKey"], "port": exposure.port_baseline(component),
        "exposed": exposure.is_exposed(component, override), "pin": pad,
        "pinNames": pins[pad].get("pinNames"), "nets": sorted(set(pins[pad].get("nets") or [])),
    }, None


def classify(parsed: Parsed, column_map: Mapping[str, str], board_map: Mapping[str, str], *,
             instances: Mapping[str, Mapping[str, Any]], interfaces: Mapping[str, Optional[dict]],
             overrides: Mapping[str, Mapping[str, str]], links: Sequence[Mapping[str, Any]]) -> dict:
    """§9.3 buckets for every uploaded row, in upload order."""

    row_links = {row["id"]: link["id"] for link in links for row in link["rows"]}
    seen: set[tuple] = set()
    updated: set[str] = set()
    buckets: dict[str, list[dict]] = {b: [] for b in BUCKETS}

    for line, row in parsed.rows:
        values = {t: row.get(column_map[t], "") if column_map.get(t) else "" for t in TARGETS}
        entry: dict[str, Any] = {
            "line": line, "values": values, "reason": None, "from": None, "to": None,
            "signal": values["signal"], "harness": _harness(values["harness"]),
            "linkName": values["link_name"], "linkId": None, "rowId": None, "action": None,
        }

        def put(bucket: str, reason: Optional[str] = None) -> None:
            entry["reason"] = reason
            buckets[bucket].append(entry)

        ends = []
        reason = None
        for side in ("from", "to"):
            end, why = _resolve_end(values, side, board_map, instances, interfaces, overrides)
            ends.append(end)
            reason = reason or why
        if reason:
            put("unresolved", reason)
            continue
        a, b = ends
        entry["from"], entry["to"] = a, b
        if a["instanceId"] == b["instanceId"] and a["portKey"] == b["portKey"]:
            put("conflict", "same_port")
            continue

        found = find_link(links, [(a["instanceId"], a["port"]), (b["instanceId"], b["port"])], entry["harness"])
        ordered = sorted([(a["instanceId"], a["portKey"], a["pin"]), (b["instanceId"], b["portKey"], b["pin"])])
        key = (tuple(x[:2] for x in ordered), entry["harness"], tuple(x[2] for x in ordered))
        if found:
            link, swapped = found
            entry["linkId"] = link["id"]
            pin_a, pin_b = (b["pin"], a["pin"]) if swapped else (a["pin"], b["pin"])
            existing = {(r["pin_a"], r["pin_b"]): r["id"] for r in link["rows"]}
        else:
            pin_a = pin_b = None
            existing = {}

        row_id = values["row_id"] or None
        if row_id and row_id in row_links:
            if row_links[row_id] != entry["linkId"]:
                put("conflict", "row_in_other_link")
                continue
            taken = existing.get((pin_a, pin_b))
            if taken is not None and taken != row_id:
                put("conflict", "pin_pair_taken")
                continue
            if row_id in updated:
                put("conflict", "duplicate_upload")
                continue
            entry["rowId"], entry["action"] = row_id, "update"
        else:
            if (pin_a, pin_b) in existing:
                put("conflict", "duplicate_existing")
                continue
            entry["action"] = "create"
        if key in seen:
            put("conflict", "duplicate_upload")
            continue
        seen.add(key)
        if entry["rowId"]:
            updated.add(entry["rowId"])

        leaves = {leaf(n).casefold() for n in a["nets"] + b["nets"]}
        if not values["signal"]:
            entry["signal"] = leaf(a["nets"][0]) if a["nets"] else ""
            put("matched")
        elif values["signal"].casefold() in leaves:
            put("matched")
        else:
            put("needsReview", "signal_mismatch")
    return {"counts": {b: len(v) for b, v in buckets.items()}, **buckets}


# ---------------------------------------------------------------------------
# Application


def default_link_name(proposal: Mapping[str, Any]) -> str:
    a, b = proposal["from"], proposal["to"]
    return f"{a['label']}/{a['reference']} ↔ {b['label']}/{b['reference']}"


def baseline_interfaces(store: SystemStore, system_id: str) -> dict[str, Optional[dict]]:
    """Each instance's interface at its current baseline, or ``None`` while extracting."""

    from app.services.systems.interface_extractor import EXTRACTOR_VERSION

    return {i["id"]: store.get_interface(i["project_id"], i["baseline_commit"], EXTRACTOR_VERSION)
            for i in store.list_instances(system_id)}


def resolve_proposal(proposal: Mapping[str, Any], interfaces: Mapping[str, Optional[dict]]) -> list[dict]:
    """The two components a proposal names, re-read at the current baselines."""

    components = []
    for side in ("from", "to"):
        end = proposal[side]
        interface = interfaces.get(end["instanceId"])
        component = exposure.component_by_key(interface, end["portKey"]) if interface else None
        if component is None:
            raise Conflict(f"{end['label']}/{end['reference']} no longer resolves at its baseline")
        if end["pin"] not in exposure.pins_by_pad(component):
            raise Conflict(f"pad {end['pin']} no longer exists on {end['label']}/{end['reference']}")
        components.append(component)
    return components


def proposal(entry: Mapping[str, Any]) -> dict:
    """The part of a classified entry an ``import`` review item stores (``observed``)."""

    return {k: entry[k] for k in ("line", "from", "to", "signal", "harness", "linkName", "linkId", "rowId",
                                  "action")}


def apply_rows(store: SystemStore, change: Mutation, proposals: Sequence[Mapping[str, Any]],
               interfaces: Mapping[str, Optional[dict]]) -> dict:
    """Write resolved rows (``classify`` entries or stored review proposals).

    Ports are re-read from each instance's **current** baseline interface, so a
    proposal whose pad has since disappeared is refused rather than written.
    A port that is not exposed is promoted, since creating a link needs it.
    """

    created, updated, unchanged, links_created = 0, 0, 0, []
    plans: dict[str, dict[str, Any]] = {}
    for proposal in proposals:
        components = resolve_proposal(proposal, interfaces)
        ends = [(proposal["from"]["instanceId"], components[0]), (proposal["to"]["instanceId"], components[1])]
        harness = _harness(proposal.get("harness"))
        found = find_link(store.list_links(change.system_id), ends, harness)
        if found is None:
            for (instance_id, component) in ends:
                override = store.list_overrides(instance_id).get(component["portKey"])
                if not exposure.is_exposed(component, override):
                    store.set_override(change, instance_id, component["portKey"], "promoted")
            link = store.create_link(
                change, a_instance_id=ends[0][0], a_port=exposure.port_baseline(components[0]),
                b_instance_id=ends[1][0], b_port=exposure.port_baseline(components[1]),
                name=proposal.get("linkName") or default_link_name(proposal), harness=harness,
            )
            links_created.append(link["id"])
            swapped = False
        else:
            link, swapped = found
        plan = plans.setdefault(link["id"], {"updates": {}, "creates": []})
        a_side, b_side = (1, 0) if swapped else (0, 1)
        sides = (proposal["from"], proposal["to"])
        pins = [exposure.pins_by_pad(c) for c in components]
        row = {
            "pinA": sides[a_side]["pin"], "pinB": sides[b_side]["pin"], "signal": proposal["signal"],
            "netA": pins[a_side][sides[a_side]["pin"]].get("nets") or [],
            "netB": pins[b_side][sides[b_side]["pin"]].get("nets") or [],
            "source": "import",
        }
        if proposal.get("rowId"):
            plan["updates"][proposal["rowId"]] = row
        else:
            plan["creates"].append(row)

    for link_id, plan in plans.items():
        link = store.get_link(change.system_id, link_id)
        rows = []
        for current in link["rows"]:
            update = plan["updates"].pop(current["id"], None)
            same = update is not None and (update["pinA"], update["pinB"], update["signal"]) == (
                current["pin_a"], current["pin_b"], current["signal"])
            if update is not None and not same:
                rows.append({"id": current["id"], **update})
                updated += 1
            else:
                unchanged += int(same)
                rows.append({"id": current["id"], "pinA": current["pin_a"], "pinB": current["pin_b"],
                             "signal": current["signal"], "netA": current["net_a"], "netB": current["net_b"],
                             "source": current["source"]})
        if plan["updates"]:
            raise Conflict("a row this import updates no longer exists; re-run the preview")
        rows.extend(plan["creates"])
        created += len(plan["creates"])
        if not plan["creates"] and len(rows) == len(link["rows"]) and all(
                r["id"] == c["id"] and r["pinA"] == c["pin_a"] and r["pinB"] == c["pin_b"]
                and r["signal"] == c["signal"] for r, c in zip(rows, link["rows"])):
            continue  # nothing changes on this link: no write, no audit
        pairs = [(r["pinA"], r["pinB"]) for r in rows]
        if len(set(pairs)) != len(pairs):
            raise Conflict(f"link {link['name'] or link_id} would hold the same pin pair twice; re-run the preview")
        store.replace_rows(change, link_id, rows)
    return {"created": created, "updated": updated, "unchanged": unchanged, "linksCreated": links_created}
