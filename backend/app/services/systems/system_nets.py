"""System nets: board nets joined across boards and subsystems (CONTRACTS_P2 §8).

A node is ``(occurrence path, net)``: one net on one physical board somewhere
in the hierarchy. Every link row joins the nets of its two pins; an end on a
subsystem export is followed down to the child's physical board (and further
through re-exports). Connected components of that graph are system nets.

Also here: the net-name tokens and the two join checks each system runs on
its own rows (SYS-V09 name mismatch, SYS-V10 power meets signal).
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any, Mapping, Optional, Sequence

from app.services.systems.hierarchy import ChildSystem, Tree

_MARKUP = re.compile(r"~\{|\{slash\}|[{}]")
_SPLIT = re.compile(r"[^A-Z0-9]+")
LARGE_GROUP_PINS = 200


# ---------------------------------------------------------------------------
# Tokens and join checks (§8.3, §8.4)


def is_auto(net: str) -> bool:
    """KiCad's own names for unnamed nets carry no designer intent."""
    leaf = net.rsplit("/", 1)[-1]
    return leaf.startswith("Net-(") or leaf.startswith("unconnected-")


def leaf(net: str) -> str:
    return net.rstrip("/").rsplit("/", 1)[-1]


def tokens(net: str) -> set[str]:
    """§8.3: the leaf, uppercased, markup removed, split on non-alphanumerics; no numbers, no NET."""
    text = _MARKUP.sub("", leaf(net)).upper()
    return {t for t in _SPLIT.split(text) if t and not t.isdigit() and t != "NET"}


def named(nets: Sequence[str]) -> list[str]:
    return [n for n in nets if n and not is_auto(n)]


def _abbreviates(short: str, long: str) -> bool:
    """``RST`` abbreviates ``RESET``: same first letter, the rest in order."""
    if len(short) < 2 or len(short) >= len(long) or short[0] != long[0]:
        return False
    rest = iter(long[1:])
    return all(ch in rest for ch in short[1:])


# Crossed pairs: a UART's TX lands on the other board's RX, and so on.
_COMPLEMENTS = {frozenset(p) for p in (("TX", "RX"), ("TXD", "RXD"), ("SDO", "SDI"), ("DOUT", "DIN"), ("CTS", "RTS"))}


def _related(x: str, y: str) -> bool:
    if x == y or frozenset((x, y)) in _COMPLEMENTS:
        return True
    short, long = sorted((x, y), key=len)
    if len(short) >= 2 and (long.startswith(short) or long.endswith(short)):
        return True  # GPIO4 / IO4, SCK / SCKA
    return short.isalpha() and _abbreviates(short, long)


def _acronym(token: str, others: set[str]) -> bool:
    """``PG`` is the acronym of ``PWR GOOD`` (initials of the other side's tokens, in any order)."""
    initials = {t[0] for t in others if t}
    return len(token) >= 2 and token.isalpha() and len(others) >= len(token) and set(token) <= initials


def name_mismatch(nets_a: Sequence[str], nets_b: Sequence[str]) -> bool:
    """SYS-V09 (P2-1.8): both sides named, and no token on one side is *related* to one on the other.

    Related: equal; a prefix or suffix of the other (2+ characters, digits kept,
    so GPIO4/IO4 match and GPIO4/IO5 do not); an in-order abbreviation with
    the same first letter (RST/RESET); or an acronym of the other side's
    tokens (PG/PWR_GOOD). Designers rename across boards constantly; the
    warning is for joins that share nothing at all (TM_MON/GND_3).
    """
    a, b = named(nets_a), named(nets_b)
    if not a or not b:
        return False
    tokens_a = set().union(*(tokens(n) for n in a))
    tokens_b = set().union(*(tokens(n) for n in b))
    if not tokens_a or not tokens_b:
        return False
    if any(_related(x, y) for x in tokens_a for y in tokens_b):
        return False
    if any(_acronym(t, tokens_b) for t in tokens_a) or any(_acronym(t, tokens_a) for t in tokens_b):
        return False
    return True


def power_meets_signal(power_a: Optional[bool], nets_a: Sequence[str],
                       power_b: Optional[bool], nets_b: Sequence[str]) -> bool:
    """SYS-V10: exactly one side is a power net and the other is a named non-power net.

    ``None`` means the interface predates extractor v5: not evaluated.
    """
    if power_a is None or power_b is None or power_a == power_b:
        return False
    other = nets_b if power_a else nets_a
    return bool(named(other))


# ---------------------------------------------------------------------------
# The graph (§8.1, §8.2)


def _end(link: Mapping[str, Any], end: str) -> tuple[str, str, str]:
    """(instance ID, port key or export ID, reference) for store rows or manifest links."""
    if f"{end}_instance_id" in link:
        port = link[f"{end}_port"]
        return link[f"{end}_instance_id"], port["portKey"], port.get("reference") or ""
    raw = link[end]
    baseline = raw.get("port") or raw.get("export") or {}
    return raw["instanceId"], raw.get("portKey") or raw.get("exportId"), baseline.get("reference") or baseline.get("name") or ""


def _rows(link: Mapping[str, Any]) -> list[tuple[str, str, list[str], list[str]]]:
    out = []
    for row in link.get("rows") or []:
        if "pin_a" in row:
            out.append((str(row["pin_a"]), str(row["pin_b"]), list(row["net_a"]), list(row["net_b"])))
        else:
            out.append((str(row["pinA"]), str(row["pinB"]), list(row["netA"]), list(row["netB"])))
    return out


@dataclass
class Level:
    """One system in the tree: its instances' kinds, links and exports, under an occurrence prefix."""

    prefix: str  # "" for the root, else the assembly occurrence path
    kinds: dict[str, str]
    labels: dict[str, str]
    links: Sequence[Mapping[str, Any]]
    exports: Sequence[Mapping[str, Any]] = ()
    children: dict[str, "Level"] = field(default_factory=dict)  # assembly instance ID -> its level


def level_from_child(prefix: str, child: ChildSystem) -> Level:
    return Level(prefix=prefix, kinds={i["id"]: i.get("kind", "board") for i in child.instances},
                 labels={i["id"]: i["label"] for i in child.instances}, links=child.links, exports=child.exports)


def attach_children(root: Level, tree: Tree) -> None:
    """Hang each resolved assembly's level under its parent level, by occurrence path."""
    levels: dict[str, Level] = {"": root}
    for occurrence in sorted(tree.occurrences, key=lambda o: o.depth):
        if occurrence.child is None:
            continue
        parent_prefix = occurrence.path.rsplit("/", 1)[0]
        parent = levels.get(parent_prefix)
        if parent is None:
            continue
        level = level_from_child(occurrence.path, occurrence.child)
        parent.children[occurrence.instance_id] = level
        levels[occurrence.path] = level


def _resolve_export(level: Level, export_id: str, depth: int = 0) -> Optional[tuple[str, str, str]]:
    """Follow an export down to ``(board occurrence path, board port key, reference)``."""
    if depth > 8:
        return None
    export = next((e for e in level.exports if e["id"] == export_id), None)
    if export is None:
        return None
    target = export["target"]
    if "portKey" in target:
        return (f"{level.prefix}/{target['instanceId']}", target["portKey"],
                (target.get("port") or {}).get("reference") or "")
    child = level.children.get(target["instanceId"])
    return _resolve_export(child, target["exportId"], depth + 1) if child else None


@dataclass
class Group:
    group_id: str
    members: list[dict]
    hops: list[dict]
    aliases: list[str]

    @property
    def pin_count(self) -> int:
        return len({(h[side]["occurrence"], h[side]["portKey"], h[side]["pad"]) for h in self.hops for side in ("from", "to")})


def build(root: Level) -> list[Group]:
    parent: dict[str, str] = {}

    def find(key: str) -> str:
        parent.setdefault(key, key)
        while parent[key] != key:
            parent[key] = parent[parent[key]]
            key = parent[key]
        return key

    def union(a: str, b: str) -> None:
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[max(ra, rb)] = min(ra, rb)

    hops: list[tuple[str, dict]] = []  # (a node key, hop)

    def node(occurrence: str, port_key: str, pad: str, nets: Sequence[str]) -> list[str]:
        keys = [f"{occurrence}#{net}" for net in sorted(set(nets))] or [f"{occurrence}#pin:{port_key}#{pad}"]
        for key in keys:
            find(key)
        return keys

    def walk(level: Level) -> None:
        for link in level.links:
            ends = {}
            for end in ("a", "b"):
                instance_id, key, reference = _end(link, end)
                if level.kinds.get(instance_id, "board") == "assembly":
                    child = level.children.get(instance_id)
                    resolved = _resolve_export(child, key) if child else None
                    if resolved is None:
                        ends[end] = None
                        continue
                    ends[end] = resolved
                else:
                    ends[end] = (f"{level.prefix}/{instance_id}", key, reference)
            if ends["a"] is None or ends["b"] is None:
                continue
            for pin_a, pin_b, nets_a, nets_b in _rows(link):
                keys_a = node(ends["a"][0], ends["a"][1], pin_a, nets_a)
                keys_b = node(ends["b"][0], ends["b"][1], pin_b, nets_b)
                for key in keys_a[1:] + keys_b:
                    union(keys_a[0], key)
                hops.append((keys_a[0], {
                    "kind": "row", "linkId": link["id"], "linkName": link.get("name") or "",
                    "from": {"occurrence": ends["a"][0], "portKey": ends["a"][1], "reference": ends["a"][2],
                             "pad": pin_a, "nets": sorted(nets_a)},
                    "to": {"occurrence": ends["b"][0], "portKey": ends["b"][1], "reference": ends["b"][2],
                           "pad": pin_b, "nets": sorted(nets_b)},
                }))
        for child in level.children.values():
            walk(child)

    walk(root)
    members: dict[str, list[str]] = {}
    for key in parent:
        members.setdefault(find(key), []).append(key)
    by_root: dict[str, list[dict]] = {}
    for key, hop in hops:
        by_root.setdefault(find(key), []).append(hop)
    groups = []
    for group_root, keys in members.items():
        rows = []
        for key in sorted(keys):
            occurrence, net = key.split("#", 1)
            rows.append({"occurrence": occurrence, "net": None if net.startswith("pin:") else net})
        aliases = sorted({leaf(r["net"]) for r in rows if r["net"] and not is_auto(r["net"])})
        groups.append(Group(group_id=min(keys), members=rows, hops=by_root.get(group_root, []), aliases=aliases))
    return sorted(groups, key=lambda g: g.group_id)


def matches(group: Group, search: str) -> bool:
    needle = search.strip().casefold()
    if not needle:
        return True
    return any(needle in alias.casefold() for alias in group.aliases) or any(
        needle in (m["net"] or "").casefold() for m in group.members)
