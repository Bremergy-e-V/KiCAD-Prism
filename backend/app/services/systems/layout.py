"""Deterministic default layout for the ICD's block diagram.

The same rules as the canvas (``frontend/src/features/system-builder/system-layout.ts``);
keep the two in step:

- The most-connected board sits in column 0; its neighbours alternate left
  and right, and boards further out continue away from the centre.
- A board lists its linked ports as rows, ordered by where their partner port
  sits, so the wires of a bundle never cross.
- Boards shift vertically so linked rows face their partners.
- Wires are orthogonal. Each wire in the channel between two columns has its
  own vertical lane, ordered so wires running the same way do not cross.

Pure: takes plain dicts, reads nothing.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any, Mapping, Optional

BOARD_WIDTH = 240
HEADER_HEIGHT = 48
ROW_HEIGHT = 26
FOOTER_HEIGHT = 8
COLUMN_GAP = 220
BOARD_GAP = 48
COMPONENT_GAP = 96
RESTRICTED = "__restricted__"


def _natural(text: str) -> tuple:
    return tuple((0, int(part), "") if part.isdigit() else (1, 0, part.casefold())
                 for part in re.split(r"(\d+)", text or "") if part)


@dataclass
class Partner:
    link_id: str
    board: str
    board_label: str
    reference: Optional[str]


@dataclass
class Row:
    key: str
    reference: str
    partners: list[Partner] = field(default_factory=list)


@dataclass
class Board:
    id: str
    label: str
    column: int = 0
    x: float = 0.0
    y: float = 0.0
    rows: list[Row] = field(default_factory=list)

    @property
    def height(self) -> float:
        return HEADER_HEIGHT + max(1, len(self.rows)) * ROW_HEIGHT + FOOTER_HEIGHT

    def row_y(self, index: int) -> float:
        return self.y + HEADER_HEIGHT + index * ROW_HEIGHT + ROW_HEIGHT / 2

    def index_of(self, key: str) -> Optional[int]:
        return next((i for i, row in enumerate(self.rows) if row.key == key), None)


@dataclass
class Wire:
    link_id: str
    points: list[tuple[float, float]]


def _ends(link: Mapping[str, Any], instances: Mapping[str, Mapping[str, Any]]) -> list[dict]:
    out = []
    for end in ("a", "b"):
        instance = instances.get(link[end]["instanceId"]) or {}
        port = None if instance.get("restricted") else link[end].get("port")
        out.append({
            "board": link[end]["instanceId"],
            "key": port["portKey"] if port else RESTRICTED,
            "reference": port.get("reference") if port else None,
        })
    return out


def layout(document: Mapping[str, Any]) -> tuple[dict[str, Board], list[Wire]]:
    """Board boxes and wire polylines for a (redacted) system document."""

    instances = {i["id"]: i for i in document["instances"]}
    links = [link for link in document["links"]
             if link["a"]["instanceId"] in instances and link["b"]["instanceId"] in instances]
    boards = {i["id"]: Board(id=i["id"], label=i["label"]) for i in document["instances"]}
    ends = {link["id"]: _ends(link, instances) for link in links}

    degree = {board_id: 0 for board_id in boards}
    neighbours: dict[str, dict[str, int]] = {board_id: {} for board_id in boards}
    for link in links:
        a, b = ends[link["id"]]
        degree[a["board"]] += 1
        if a["board"] != b["board"]:
            degree[b["board"]] += 1
            neighbours[a["board"]][b["board"]] = neighbours[a["board"]].get(b["board"], 0) + 1
            neighbours[b["board"]][a["board"]] = neighbours[b["board"]].get(a["board"], 0) + 1

    # Rows: one per linked port, restricted ends sharing one row per board.
    for link in links:
        a, b = ends[link["id"]]
        for own, other in ((a, b), (b, a)):
            if own is b and a["board"] == b["board"] and a["key"] == b["key"]:
                continue
            board = boards[own["board"]]
            row = next((r for r in board.rows if r.key == own["key"]), None)
            if row is None:
                row = Row(key=own["key"], reference=own["reference"] or "restricted")
                board.rows.append(row)
            row.partners.append(Partner(link["id"], other["board"], boards[other["board"]].label, other["reference"]))
    for board in boards.values():
        board.rows.sort(key=lambda row: _natural(row.reference))

    # Columns per connected component.
    def by_weight(ids, weight):
        return sorted(ids, key=lambda i: (-weight(i), _natural(boards[i].label), i))

    columns: dict[str, int] = {}
    components: list[list[str]] = []
    for hub in by_weight(boards, lambda i: degree[i]):
        if hub in columns:
            continue
        columns[hub] = 0
        component, queue, alternate = [hub], [hub], 0
        while queue:
            current = queue.pop(0)
            here = columns[current]
            for other in by_weight([i for i in neighbours[current] if i not in columns],
                                   lambda i: neighbours[current][i]):
                if here == 0:
                    side = -1 if alternate % 2 == 0 else 1
                    alternate += 1
                else:
                    side = 1 if here > 0 else -1
                columns[other] = here + side
                component.append(other)
                queue.append(other)
        components.append(component)
    for board_id, column in columns.items():
        boards[board_id].column = column

    def partner_y(board: Board, partner: Partner) -> Optional[float]:
        other = boards[partner.board]
        a, b = ends[partner.link_id]
        end = b if a["board"] == board.id and b["board"] == partner.board else a
        index = other.index_of(end["key"])
        return None if index is None else other.row_y(index)

    def sort_rows(board: Board) -> None:
        keyed = []
        for index, row in enumerate(board.rows):
            ys = [y for y in (partner_y(board, p) for p in row.partners) if y is not None]
            keyed.append((sum(ys) / len(ys) if ys else float("inf"), _natural(row.reference), index, row))
        keyed.sort(key=lambda item: item[:3])
        board.rows = [item[3] for item in keyed]

    top = 0.0
    for component in components:
        members = [boards[i] for i in component]
        present = sorted({b.column for b in members})
        for board in members:
            board.x = (board.column - present[0]) * (BOARD_WIDTH + COLUMN_GAP)
        floor = top
        for board in [b for b in members if b.column == 0]:
            board.y = floor
            floor = board.y + board.height + BOARD_GAP
        outward = sorted((c for c in present if c != 0), key=lambda c: (abs(c), c))
        for _ in range(3):
            for board in members:
                sort_rows(board)
            for column in outward:
                in_column = [b for b in members if b.column == column]
                for board in in_column:
                    offsets = []
                    for index, row in enumerate(board.rows):
                        for partner in row.partners:
                            if abs(boards[partner.board].column) >= abs(column):
                                continue
                            y = partner_y(board, partner)
                            if y is not None:
                                offsets.append(y - (HEADER_HEIGHT + index * ROW_HEIGHT + ROW_HEIGHT / 2))
                    board.y = sum(offsets) / len(offsets) if offsets else top
                in_column.sort(key=lambda b: (b.y, _natural(b.label)))
                floor = float("-inf")
                for board in in_column:
                    board.y = max(board.y, floor)
                    floor = board.y + board.height + BOARD_GAP
        lowest = min(b.y for b in members)
        for board in members:
            board.y += top - lowest
        top = max(b.y + b.height for b in members) + COMPONENT_GAP

    return boards, _route(boards, links, ends)


def _route(boards: dict[str, Board], links: list, ends: dict) -> list[Wire]:
    wires: list[Wire] = []
    channels: dict[tuple, list] = {}
    loops: dict[float, list] = {}
    for link in links:
        a, b = ends[link["id"]]
        ba, bb = boards[a["board"]], boards[b["board"]]
        ya = ba.row_y(ba.index_of(a["key"]) or 0)
        yb = bb.row_y(bb.index_of(b["key"]) or 0)
        if ba.id == bb.id or abs(ba.x - bb.x) < BOARD_WIDTH:
            x = max(ba.x, bb.x) + BOARD_WIDTH
            wire = Wire(link["id"], [(ba.x + BOARD_WIDTH, ya), (x, ya), (x, yb), (bb.x + BOARD_WIDTH, yb)])
            loops.setdefault(x, []).append(wire)
            wires.append(wire)
            continue
        (left, y1), (right, y2) = sorted(((ba, ya), (bb, yb)), key=lambda item: item[0].x)
        start, end = (left.x + BOARD_WIDTH, y1), (right.x, y2)
        wire = Wire(link["id"], [start, end])
        wires.append(wire)
        if abs(y1 - y2) >= 1:
            channels.setdefault((left.x, right.x), []).append((wire, y1, y2, start, end))
    for entries in channels.values():
        down = sorted((e for e in entries if e[2] > e[1]), key=lambda e: (-e[1], e[2]))
        up = sorted((e for e in entries if e[2] < e[1]), key=lambda e: (e[1], -e[2]))
        ordered = down + up
        for index, (wire, y1, y2, start, end) in enumerate(ordered):
            lane = start[0] + (end[0] - start[0]) * (index + 1) / (len(ordered) + 1)
            wire.points = [start, (lane, y1), (lane, y2), end]
    for group in loops.values():
        for index, wire in enumerate(group):
            offset = 24 + index * 12
            (x0, y0), (x, _), (_, y1), (x3, y3) = wire.points
            wire.points = [(x0, y0), (x + offset, y0), (x + offset, y1), (x3, y3)]
    return wires


def crossings(wires: list[Wire]) -> int:
    """Proper crossings between orthogonal polylines (used by tests)."""

    def segments(points):
        return list(zip(points, points[1:]))

    def cross(s, t):
        (a, b), (c, d) = s, t
        sh, th = a[1] == b[1], c[1] == d[1]
        if sh == th:
            return False
        h, v = (s, t) if sh else (t, s)
        hx = sorted((h[0][0], h[1][0]))
        vy = sorted((v[0][1], v[1][1]))
        return hx[0] < v[0][0] < hx[1] and vy[0] < h[0][1] < vy[1]

    count = 0
    for i, first in enumerate(wires):
        for second in wires[i + 1:]:
            count += sum(cross(s, t) for s in segments(first.points) for t in segments(second.points))
    return count
