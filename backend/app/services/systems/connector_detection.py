"""Decide which components are System Builder connector candidates.

The order is frozen in ``docs/system-builder/CONTRACTS.md`` §4.1: an explicit
field wins in both directions, then the reference prefix, then the library
nickname. Pure: takes plain values, reads nothing.
"""

from __future__ import annotations

import re
from typing import Mapping

REFERENCE_PREFIXES = frozenset({"J", "P", "CN", "X"})
_PORT_FIELD = "prismport"
_SYSTEM_FIELD = "system"
_TRUE = frozenset({"true", "yes", "1", "port"})
_FALSE = frozenset({"false", "no", "0"})


def _fold(name: str) -> str:
    return re.sub(r"[^a-z0-9]", "", name.casefold())


def reference_prefix(reference: str) -> str:
    match = re.match(r"[A-Za-z]+", reference)
    return match.group(0).upper() if match else ""


def _library(identifier: str) -> str:
    return identifier.split(":", 1)[0] if ":" in identifier else ""


def classify(
    reference: str,
    lib_id: str,
    footprint: str,
    fields: Mapping[str, str],
) -> tuple[bool, str]:
    """Return ``(candidate, reason)``; reason is field, refdes, library or none."""

    folded = {_fold(key): str(value).strip().casefold() for key, value in fields.items()}
    explicit = folded.get(_PORT_FIELD, "")
    if explicit in _TRUE:
        return True, "field"
    if explicit in _FALSE:
        return False, "field"
    if folded.get(_SYSTEM_FIELD) == "connector":
        return True, "field"
    if reference_prefix(reference) in REFERENCE_PREFIXES:
        return True, "refdes"
    for identifier in (lib_id, footprint):
        if _library(identifier).casefold().startswith("connector"):
            return True, "library"
    return False, "none"
