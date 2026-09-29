"""Extract the ``prism.system_interface.v1`` artifact from one KiCad project.

Contract: ``docs/system-builder/CONTRACTS.md`` §2–§4. The artifact lists every
placed component with pins, keyed by occurrence (``KIID_PATH``), with the
schematic nets of each pad and, when the commit has a board, the pad nets for
the PCB-sync warning.

Sources, all from the pinned kicad-monkey:

* identity (occurrence keys, unit numbers, ``lib_id``) from the native
  schematic symbols and their per-instance records;
* nets, pin names and pin types from the compiled **schematic** netlist, so no
  PCB overlay can leak in (the semantic index overwrites terminal nets with pad
  nets; this extractor does not use it);
* DNP from the design-variant resolver's default assembly state;
* ``pcbNets`` from board pad nets, matched by reference and pad number.
"""

from __future__ import annotations

import hashlib
import importlib.metadata
import json
from collections import defaultdict
from pathlib import Path
from typing import Any, Iterable, Mapping

from app.services import semantic_index_variants
from app.services.systems import connector_detection

SCHEMA = "prism.system_interface.v1"
EXTRACTOR_VERSION = "2"
_UNCONNECTED_PREFIX = "unconnected-("


def canonical_digest(value: Any) -> str:
    text = json.dumps(value, sort_keys=True, separators=(",", ":"), ensure_ascii=False)
    return "sha256:" + hashlib.sha256(text.encode("utf-8")).hexdigest()


def normalized_nets(names: Iterable[str]) -> list[str]:
    """Sorted schematic net set with KiCad's unconnected placeholders removed."""
    return sorted({name for name in names if name and not name.startswith(_UNCONNECTED_PREFIX)})


_NOT_DIGESTED = frozenset({"digest", "extractor", "projectId", "commit"})


def interface_digest(payload: Mapping[str, Any]) -> str:
    """§3: digest over the interface facts only.

    Identity and provenance (project, commit, extractor) are excluded, so two
    commits with the same schematic interface share a digest.
    """
    body = {key: value for key, value in payload.items() if key not in _NOT_DIGESTED}
    return canonical_digest(body)


def connected_interface_digest(
    lib_id: str, footprint: str, pins: Mapping[str, Iterable[str]]
) -> str:
    """§3: the per-end digest the drift engine compares; ``pins`` is pad → nets."""
    return canonical_digest(
        {
            "libId": lib_id,
            "footprint": footprint,
            "pins": [[pad, sorted(set(nets))] for pad, nets in sorted(pins.items())],
        }
    )


def _kicad_monkey_version() -> str:
    try:
        return importlib.metadata.version("kicad-monkey")
    except importlib.metadata.PackageNotFoundError:
        return "workspace"


def _string(value: object) -> str:
    return "" if value is None else str(value)


def _natural(pad: str) -> tuple:
    head = pad.rstrip("0123456789")
    tail = pad[len(head):]
    return (head, int(tail) if tail else -1, pad)


def _occurrences(native: Any) -> dict[str, list[tuple[int, str, Any]]]:
    """``reference -> [(unit, occurrence_key, symbol)]`` for placed symbols.

    Grouping by reference is what makes the units of a multi-unit symbol one
    port. Unannotated symbols that share a reference such as ``J?`` are grouped
    too; they can never be ports (CONTRACTS.md §2.3), and the netlist cannot
    tell their pins apart either, so only the diagnostic is affected.
    """
    result: dict[str, list[tuple[int, str, Any]]] = defaultdict(list)
    for instance in native.schematic_instances() or ():
        sheet_path = _string(getattr(instance, "sheet_instance_path", "")) or "/"
        schematic = getattr(instance, "schematic", None)
        for symbol in getattr(schematic, "symbols", ()) or ():
            if not _string(getattr(symbol, "lib_id", "")):
                continue
            record = next(
                (
                    entry
                    for entry in getattr(symbol, "instances", ()) or ()
                    if _string(getattr(entry, "path", "")) == sheet_path
                ),
                None,
            )
            reference = _string(getattr(record, "reference", "")) if record else ""
            if not reference or reference.startswith("#"):
                continue  # power flags and other virtual symbols
            unit = getattr(record, "unit", None) or getattr(symbol, "unit", None) or 1
            key = f"{sheet_path.rstrip('/')}/{_string(symbol.uuid)}"
            result[reference].append((int(unit), key, symbol))
    return result


def _schematic_pins(netlist: Any) -> dict[str, dict[str, dict[str, set[str]]]]:
    """``reference -> pad -> {nets, names, types}`` from the schematic netlist."""
    pins: dict[str, dict[str, dict[str, set[str]]]] = defaultdict(
        lambda: defaultdict(lambda: {"nets": set(), "names": set(), "types": set()})
    )
    for net in getattr(netlist, "nets", ()) or ():
        name = _string(getattr(net, "name", ""))
        for terminal in getattr(net, "terminals", ()) or ():
            reference = _string(getattr(terminal, "designator", ""))
            pad = _string(getattr(terminal, "pin", ""))
            if not reference or not pad:
                continue
            entry = pins[reference][pad]
            entry["nets"].add(name)
            if _string(getattr(terminal, "pin_name", "")):
                entry["names"].add(_string(terminal.pin_name))
            if _string(getattr(terminal, "pin_type", "")):
                entry["types"].add(_string(terminal.pin_type))
    return pins


def _board_pad_nets(board: Any) -> dict[str, dict[str, set[str]]]:
    """``reference -> pad -> {net names}`` from the board, if any."""
    result: dict[str, dict[str, set[str]]] = defaultdict(lambda: defaultdict(set))
    for footprint in getattr(board, "footprints", ()) or ():
        reference = ""
        for prop in getattr(footprint, "properties", ()) or ():
            if _string(getattr(prop, "name", "")) == "Reference":
                reference = _string(getattr(prop, "value", ""))
        if not reference:
            continue
        for pad in getattr(footprint, "pads", ()) or ():
            number = _string(getattr(pad, "number", ""))
            if not number:
                continue
            net = getattr(pad, "net", None)
            name = _string(getattr(net, "name", "")) if net is not None else ""
            result[reference][number].add(name)
    return result


def _field_map(component: Any) -> dict[str, str]:
    fields = getattr(component, "fields", None) or {}
    return {str(key): _string(value) for key, value in dict(fields).items()}


def extract_interface(
    project_file: Path,
    *,
    project_id: str,
    commit: str | None,
    design: Any = None,
) -> dict[str, Any]:
    """Build the interface artifact for the project at ``project_file``.

    ``design`` lets a caller pass an already-loaded ``KiCadDesign``.
    """

    project_file = Path(project_file)
    if design is None:
        from kicad_monkey import KiCadDesign

        design = KiCadDesign.from_project_file(project_file)

    netlist = design.to_netlist()
    components_by_reference = {
        _string(getattr(component, "reference", "")): component
        for component in getattr(netlist, "components", ()) or ()
    }
    schematic_pins = _schematic_pins(netlist)
    occurrences = _occurrences(design)

    pcb_path = getattr(design, "pcb_path", None)
    has_pcb = bool(pcb_path) and Path(pcb_path).is_file()
    board = design.pcb if has_pcb else None
    board_pads = _board_pad_nets(board) if board is not None else {}

    assembly = semantic_index_variants.build_assembly_state(design, project_file=project_file)
    default_components = (assembly.get("default") or {}).get("components") or {}

    components: list[dict[str, Any]] = []
    diagnostics: list[dict[str, Any]] = []
    for reference in sorted(occurrences, key=_natural):
        units = sorted(occurrences[reference], key=lambda item: (item[0], item[1]))
        pads = schematic_pins.get(reference, {})
        if not pads:
            continue  # no electrical pins: graphics, mounting-only symbols
        _unit, port_key, first_symbol = units[0]
        netlist_component = components_by_reference.get(reference)
        lib_id = _string(getattr(first_symbol, "lib_id", ""))
        footprint = _string(getattr(netlist_component, "footprint", "")) if netlist_component else ""
        fields = _field_map(netlist_component) if netlist_component else {}
        candidate, reason = connector_detection.classify(reference, lib_id, footprint, fields)
        annotated = "?" not in reference
        if not annotated:
            diagnostics.append(
                {"code": "unannotated_connector", "portKey": port_key, "pad": None,
                 "detail": f"{reference} is not annotated"}
                if candidate
                else {"code": "unannotated_component", "portKey": port_key, "pad": None,
                      "detail": f"{reference} is not annotated"}
            )

        pins = []
        for pad in sorted(pads, key=_natural):
            entry = pads[pad]
            nets = normalized_nets(entry["nets"])
            if len(nets) > 1:
                diagnostics.append(
                    {"code": "pin_net_ambiguous", "portKey": port_key, "pad": pad,
                     "detail": f"{reference}.{pad} carries {len(nets)} schematic nets"}
                )
            board_nets = board_pads.get(reference, {}).get(pad) if board is not None else None
            pins.append(
                {
                    "pad": pad,
                    "nets": nets,
                    "pcbNets": normalized_nets(board_nets) if board_nets is not None else None,
                    "pinNames": sorted(entry["names"]) or None,
                    "pinTypes": sorted(entry["types"]) or None,
                }
            )

        components.append(
            {
                "portKey": port_key,
                "memberKeys": sorted(key for _unit, key, _symbol in units),
                "reference": reference,
                "libId": lib_id,
                "footprint": footprint,
                "value": _string(getattr(netlist_component, "value", "")) if netlist_component else "",
                "dnp": bool((default_components.get(reference) or {}).get("dnp", False)),
                "candidate": candidate,
                "candidateReason": reason,
                "pins": pins,
            }
        )

    payload: dict[str, Any] = {
        "schema": SCHEMA,
        "projectId": project_id,
        "commit": commit,
        "extractor": {"version": EXTRACTOR_VERSION, "kicadMonkeyVersion": _kicad_monkey_version()},
        "hasPcb": board is not None,
        "components": components,
        "diagnostics": sorted(
            diagnostics, key=lambda d: (d["code"], d["portKey"] or "", d["pad"] or "")
        ),
    }
    payload["digest"] = interface_digest(payload)
    return payload


def extract_for_revision(project: Any, commit: str) -> dict[str, Any]:
    """Materialize ``project`` at ``commit`` and extract its interface."""

    from app.services.project_source_snapshot import project_source_snapshot

    with project_source_snapshot(project, commit) as snapshot:
        return extract_interface(
            snapshot.project_file,
            project_id=str(project.id),
            commit=snapshot.commit or commit,
        )
