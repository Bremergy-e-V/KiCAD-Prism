"""O1 redaction of a system document (``docs/system-builder/CONTRACTS.md`` §8.2).

Documents are built unredacted and redacted for the reader last. That is what
lets a snapshot store the full document once and redact it on every read,
for whoever reads it then (§9.1).
"""

from __future__ import annotations

import copy
from typing import Any, Collection, Mapping


def redact_instance(instance: Mapping[str, Any]) -> dict:
    return {
        "id": instance["id"], "label": instance["label"], "restricted": True, "redacted": True,
        "projectId": None, "projectName": None, "baselineCommit": None, "trackedRef": None,
        "pinned": instance["pinned"], "resolution": instance["resolution"],
        "projectDeleted": instance.get("projectDeleted", False),
        "tipCommit": None, "tipCheckedAt": None, "updateAvailable": None,
        "interface": None, "ports": None,
    }


def redact_link(link: Mapping[str, Any], restricted: Collection[str]) -> dict:
    out = copy.deepcopy(dict(link))
    hidden = [end for end in ("a", "b") if out[end]["instanceId"] in restricted]
    for end in hidden:
        out[end] = {"instanceId": out[end]["instanceId"], "redacted": True, "port": None,
                    "resolved": None, "exposed": None}
    for row in out["rows"]:
        for end in hidden:
            column = end.upper()
            row[f"pin{column}"] = row[f"net{column}"] = row[f"observed{column}"] = None
        row["redactedEnds"] = sorted(set(row.get("redactedEnds") or []) | set(hidden))
        row["redacted"] = bool(row["redactedEnds"])
    return out


def redact_harness(harness: Mapping[str, Any], restricted: Collection[str]) -> dict:
    """CONTRACTS_P2 §17: an end on a hidden board keeps its place but not its connector or nets."""
    out = copy.deepcopy(dict(harness))
    if not restricted:
        return out
    hidden = {end["id"] for end in out["ends"] if end["mates"] and end["mates"]["instanceId"] in restricted}
    for end in out["ends"]:
        if end["id"] in hidden:
            end["mates"] = {"instanceId": end["mates"]["instanceId"], "portKey": None, "port": None,
                            "redacted": True, "resolved": None}
            end["pins"] = []
    for wire in out["wires"]:
        sides = [side for side in ("from", "to") if wire[side]["end"] in hidden]
        for side in sides:
            wire["netFrom" if side == "from" else "netTo"] = None
        wire["redactedEnds"] = sorted(set(wire.get("redactedEnds") or []) | set(sides))
    return out


def redact_findings(report: Mapping[str, Any], restricted: Collection[str]) -> dict:
    out = copy.deepcopy(dict(report))
    for finding in out.get("findings") or []:
        if finding["instanceId"] in restricted:
            finding.update(reference=None, pin=None, detail=None, redacted=True)
        else:
            finding.setdefault("redacted", False)
    for entry in out.get("exempt") or []:
        if entry["instanceId"] in restricted:
            entry.update(reference=None, pin=None, portKey=None, redacted=True)
    return out


def redact_document(document: Mapping[str, Any], restricted: Collection[str]) -> dict:
    """A copy of ``document`` as a reader who cannot see ``restricted`` instances sees it."""

    out = copy.deepcopy(dict(document))
    if not restricted:
        return out
    out["instances"] = [redact_instance(i) if i["id"] in restricted else i for i in out["instances"]]
    out["exports"] = [
        {**e, "portKey": None, "port": None, "resolved": None, "redacted": True}
        if e["instanceId"] in restricted else e
        for e in out.get("exports") or []
    ]
    out["links"] = [redact_link(link, restricted) for link in out["links"]]
    out["harnesses"] = [redact_harness(h, restricted) for h in out.get("harnesses") or []]
    if out.get("validation") is not None:
        out["validation"] = redact_findings(out["validation"], restricted)
    return out
