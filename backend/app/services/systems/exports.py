"""Exports: the connectors a system publishes to its parents (CONTRACTS_P2 §4).

An export points at one board port of this system. It resolves at the board's
baseline exactly like a link end: by ``memberKeys`` intersection, so
re-annotating or re-placing the connector keeps the export. When a baseline
advances, ``refresh_after_advance`` moves each export's stored port baseline to
the component it now resolves to. An export that no longer resolves, or whose
port is no longer exposed, is the ``SYS-V16 export_unresolved`` error.

Re-exports (a child assembly's export passed up) arrive with SB2-05.
"""

from __future__ import annotations

from typing import Any, Mapping, Optional, Sequence

from app.services.systems import exposure

INTERFACE_SCHEMA = "prism.system_export_interface.v1"


def resolve(interface: Optional[Mapping[str, Any]], port: Mapping[str, Any]) -> Optional[dict]:
    """The unique component whose ``memberKeys`` intersect the stored baseline's."""

    if interface is None:
        return None
    wanted = set(port.get("memberKeys") or [port["portKey"]])
    matches = [c for c in interface.get("components") or [] if wanted & set(c.get("memberKeys") or [])]
    return dict(matches[0]) if len(matches) == 1 else None


def refresh_after_advance(
    store: Any, change: Any, instance_id: str, candidate: Mapping[str, Any],
) -> None:
    """Keep export port baselines in step with a new board baseline (audited like link relabels)."""

    for export in store.list_exports(change.system_id):
        port = export["target_port"]
        if export["target_instance_id"] != instance_id or not port:
            continue
        component = resolve(candidate, port)
        if component is None:
            continue  # reported as SYS-V16 until someone retargets or deletes it
        after = exposure.port_baseline(component)
        if after == dict(port):
            continue
        kind = "connector_relabelled" if after["portKey"] == port["portKey"] else "connector_rebound"
        store.set_export_port(change, export["id"], after)
        change.audit(kind, {"instanceId": instance_id, "exportId": export["id"], "before": dict(port),
                            "after": after})


def _pins(component: Mapping[str, Any]) -> list[dict]:
    pins = []
    for pad, pin in sorted(exposure.pins_by_pad(component).items(), key=lambda item: _natural(item[0])):
        pins.append({"pad": pad, "nets": list(pin.get("nets") or []), "powerNet": pin.get("powerNet"),
                     "pinNames": pin.get("pinNames"), "pinTypes": pin.get("pinTypes")})
    return pins


def _natural(pad: str) -> tuple:
    from app.services.systems.drift import pad_sort_key

    return pad_sort_key(pad)


def interface(
    exports: Sequence[Mapping[str, Any]], instances: Mapping[str, Mapping[str, Any]],
    interfaces: Mapping[str, Optional[Mapping[str, Any]]], overrides: Mapping[str, Mapping[str, str]],
) -> dict:
    """``prism.system_export_interface.v1`` over baseline interfaces (§4.3).

    ``interfaces`` maps instance ID to its baseline interface (None while not
    extracted). An export that does not resolve is listed with
    ``resolved: false`` and no pins, so a publish can refuse it.
    """

    out = []
    for export in exports:
        entry: dict[str, Any] = {"id": export["id"], "name": export["name"], "description": export["description"],
                                 "occurrence": "/" + export["target_instance_id"]}
        port = export["target_port"]
        component = resolve(interfaces.get(export["target_instance_id"]), port) if port else None
        exposed = component is not None and exposure.is_exposed(
            component, overrides.get(export["target_instance_id"], {}).get(component["portKey"])
        )
        if component is None or not exposed:
            entry.update({"resolved": False, "reference": (port or {}).get("reference"), "libId": None,
                          "footprint": None, "pinCount": 0, "pins": []})
        else:
            baseline = exposure.port_baseline(component)
            entry.update({"resolved": True, "reference": baseline["reference"], "libId": baseline["libId"],
                          "footprint": baseline["footprint"], "pinCount": baseline["pinCount"],
                          "pins": _pins(component)})
        out.append(entry)
    return {"schema": INTERFACE_SCHEMA, "exports": out}


def findings(
    exports: Sequence[Mapping[str, Any]], interfaces: Mapping[str, Optional[Mapping[str, Any]]],
    overrides: Mapping[str, Mapping[str, str]], unevaluated: set[str],
) -> list[dict]:
    """SYS-V16 for each port export that no longer resolves or is not exposed at its baseline.

    Instances in ``unevaluated`` (interface not extracted, or source
    unavailable) are skipped: unevaluated is never reported as passed or failed.
    """

    out = []
    for export in exports:
        port = export["target_port"]
        iid = export["target_instance_id"]
        if not port or iid in unevaluated or interfaces.get(iid) is None:
            continue
        component = resolve(interfaces[iid], port)
        if component is None:
            reason = "connector_missing"
        elif not exposure.is_exposed(component, overrides.get(iid, {}).get(component["portKey"])):
            reason = "port_not_exposed"
        else:
            continue
        out.append({"exportId": export["id"], "instanceId": iid, "reference": port.get("reference"),
                    "reason": reason, "name": export["name"]})
    return out
