"""The system scene descriptor ``prism.system_scene.a0`` (CONTRACTS_P2 §20).

Pure: the service hands in the occurrence tree, the reader's redaction, each
board's interface and each bundle's status; this module places every
occurrence and lists the board bundles the renderer needs, one per
(project, commit), however many occurrences share it.
"""

from __future__ import annotations

import hashlib
from collections import defaultdict
from typing import Any, Callable, Mapping, Optional, Sequence

from app.services.systems.hierarchy import Occurrence
from app.services.systems.placement import poses

SCHEMA = "prism.system_scene.a0"


def asset_id(project_id: str, commit: str) -> str:
    return "sba_" + hashlib.sha256(f"{project_id}\0{commit}".encode()).hexdigest()[:16]


def board_bounds(interface: Optional[Mapping[str, Any]]) -> Optional[dict]:
    """A board's box in its own frame (§14.2): the outline in x/y, ±t/2 in z."""
    outline = (interface or {}).get("boardOutlineMm")
    if not outline:
        return None
    half = float(interface.get("boardThicknessMm") or 0.0) / 2.0
    return {"minMm": [*outline["minMm"], -half], "maxMm": [*outline["maxMm"], half]}


def bundle_to_board(mid_plane_mm: Optional[float]) -> Optional[list[float]]:
    """Column-major map from a bundle's runtime frame (metres, z from the board's
    bottom face) to the board frame (mm, z = 0 at the mid-plane): scale by 1000,
    then lower by the mid-plane height."""
    if mid_plane_mm is None:
        return None
    return [1000.0, 0.0, 0.0, 0.0, 0.0, 1000.0, 0.0, 0.0, 0.0, 0.0, 1000.0, 0.0,
            0.0, 0.0, poses._clean(-mid_plane_mm), 1.0]


def build(
    system_id: str,
    system_version: int,
    occurrences: Sequence[Occurrence],
    shown: Mapping[str, Mapping[str, Any]],
    interface: Callable[[Occurrence], Optional[Mapping[str, Any]]],
    asset: Callable[[Occurrence], dict],
) -> dict:
    """``shown`` is ``GET …/hierarchy``'s redacted entries by path (absent = hidden inside a
    restricted child system). ``asset(o)`` is the asset entry for a visible board."""

    children: dict[str, list[Occurrence]] = defaultdict(list)
    for occurrence in occurrences:
        children[occurrence.path.rsplit("/", 1)[0]].append(occurrence)
    for members in children.values():
        members.sort(key=lambda o: (o.labels[-1].casefold(), o.instance_id))

    local: dict[str, Optional[dict]] = {}  # an occurrence's bounds in its own frame
    placed: dict[str, dict] = {}  # an occurrence's pose in its parent's frame

    def layout(prefix: str) -> Optional[dict]:
        """Place the members of the system at ``prefix``; return their union in its frame."""
        members = children.get(prefix, [])
        for member in members:
            local[member.path] = board_bounds(interface(member)) if member.kind == "board" else layout(member.path)
        row = poses.default_row([(m.path, local[m.path]) for m in members])
        placed.update(row)
        return poses.union([poses.transform_bounds(row[m.path], local[m.path]) for m in members])

    layout("")

    world: dict[str, dict] = {}
    assets: dict[str, dict] = {}
    out = []
    for occurrence in occurrences:  # parents come before their members
        parent = occurrence.path.rsplit("/", 1)[0]
        world[occurrence.path] = poses.compose(world[parent] if parent else poses.IDENTITY, placed[occurrence.path])
        entry = shown.get(occurrence.path)
        if entry is None:
            continue
        item = {
            "path": occurrence.path, "parentPath": parent or None, "displayPath": entry["displayPath"],
            "labels": entry["labels"], "instanceId": occurrence.instance_id, "kind": occurrence.kind,
            "depth": occurrence.depth, "restricted": entry["restricted"], "assetId": None,
            "pose": {**placed[occurrence.path], "source": "default"},
            "worldMatrix": poses.matrix(world[occurrence.path]),
            "boundsMm": local[occurrence.path],
        }
        if occurrence.kind == "board" and not entry["restricted"]:
            found = asset(occurrence)
            assets.setdefault(found["assetId"], found)
            item["assetId"] = found["assetId"]
        out.append(item)
    return {
        "schema": SCHEMA, "systemId": system_id, "systemVersion": system_version, "units": "mm",
        "assets": sorted(assets.values(), key=lambda a: a["assetId"]),
        "occurrences": out,
    }
