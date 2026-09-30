"""Generate ``placement_cases.json``: shared goldens for the placement library pair (SB2-12).

Inputs are KiCad 10.0.6 **stock** footprints, read with the extractor v6 code
at the origin and then posed here (side, rotation, position), so each case is
the geometry a board with that footprint would produce. The expected outputs
come from the Python library; ``test_system_placement_frames.py`` checks the
meaning of every case by hand (axis, confidence, which way pad 1 and the
mating axis point) and the TypeScript twin must reproduce the numbers.

Run from ``backend/``::

    venv/bin/python tests/fixtures/system_builder/p2/placement_cases.py
"""

from __future__ import annotations

import copy
import json
import math
from pathlib import Path

from kicad_monkey import kicad_pcb_footprint, kicad_sexpr

from app.services.systems.interface_extractor import _footprint_geometry
from app.services.systems.placement.frames import connector_frame, infer

STOCK = Path("/Applications/KiCad/KiCad.app/Contents/SharedSupport/footprints")
OUT = Path(__file__).resolve().parents[1] / "placement_cases.json"
THICKNESS = 1.6

FOOTPRINTS = {
    "header_v": "Connector_PinHeader_2.54mm.pretty/PinHeader_1x04_P2.54mm_Vertical.kicad_mod",
    "header_h": "Connector_PinHeader_2.54mm.pretty/PinHeader_1x04_P2.54mm_Horizontal.kicad_mod",
    "header_2x2": "Connector_PinHeader_2.54mm.pretty/PinHeader_2x02_P2.54mm_Vertical.kicad_mod",
    "jst_side": "Connector_JST.pretty/JST_PH_S4B-PH-K_1x04_P2.00mm_Horizontal.kicad_mod",
    "df40": "Connector_Hirose_DF40.pretty/Hirose_DF40B-10DS-0.4V_2x05-1MP_P0.4mm.kicad_mod",
}


def stock(name: str) -> dict:
    footprint = kicad_pcb_footprint.Footprint.from_sexp(kicad_sexpr.parse_sexp((STOCK / FOOTPRINTS[name]).read_text()))
    return _footprint_geometry(footprint)


def pose(local: dict, *, x: float, y: float, angle: float, side: str = "top") -> dict:
    """Place origin-extracted geometry: mirror left-right for the back, then rotate and move."""
    geometry = copy.deepcopy(local)
    a = math.radians(angle)

    def place(px: float, py: float) -> list[float]:
        if side == "bottom":
            px = -px
        return [round(x + px * math.cos(a) - py * math.sin(a), 4) + 0.0,
                round(y + px * math.sin(a) + py * math.cos(a), 4) + 0.0]

    for pad in geometry["pads"]:
        pad["positionMm"] = place(*pad["positionMm"])
    if side == "bottom" and geometry["courtyard"]:
        lo, hi = geometry["courtyard"]["minMm"], geometry["courtyard"]["maxMm"]
        geometry["courtyard"] = {"minMm": [-hi[0], lo[1]], "maxMm": [-lo[0], hi[1]]}
    geometry.update(side=side, positionMm=[x, y], rotationDeg=angle)
    return geometry


def cases() -> list[dict]:
    header_v, header_h = stock("header_v"), stock("header_h")
    no_courtyard = dict(stock("df40"), courtyard=None)
    renamed = dict(header_h, footprintName="PinHeader_1x04_P2.54mm_Vertical")
    single = dict(header_v, pads=header_v["pads"][:1])
    specs = [
        ("vertical header, top", pose(header_v, x=50, y=-10, angle=0), None),
        ("vertical header, bottom, 90°", pose(header_v, x=20, y=-30, angle=90, side="bottom"), None),
        ("right-angle header, top", pose(header_h, x=0, y=0, angle=0), None),
        ("right-angle header, top, 90°", pose(header_h, x=10, y=5, angle=90), None),
        ("right-angle header, bottom, 180°", pose(header_h, x=-4, y=12, angle=180, side="bottom"), None),
        ("JST PH side entry, top, -90°", pose(stock("jst_side"), x=30, y=-20, angle=-90), None),
        ("DF40 mezzanine without a keyword, top", pose(stock("df40"), x=40, y=-40, angle=0), None),
        ("DF40 mezzanine without a keyword, bottom, 45°", pose(stock("df40"), x=40, y=-40, angle=45, side="bottom"), None),
        ("2x2 header (square array), top, 30°", pose(stock("header_2x2"), x=5, y=5, angle=30), None),
        ("no courtyard and no keyword", pose(no_courtyard, x=0, y=0, angle=0), None),
        ("vertical name on a right-angle body", pose(renamed, x=0, y=0, angle=0), None),
        ("one pad", pose(single, x=0, y=0, angle=0), None),
        ("override: right-angle header turned to +y, two quarter-turns", pose(header_h, x=0, y=0, angle=0),
         {"axis": "+y", "quarterTurns": 2}),
        ("override on an ambiguous footprint", pose(no_courtyard, x=0, y=0, angle=0), {"axis": "top", "quarterTurns": 1}),
    ]
    out = []
    for name, geometry, stored in specs:
        out.append({"name": name, "geometry": geometry, "thicknessMm": THICKNESS, "stored": stored,
                    "expected": {"inference": infer(geometry), "frame": connector_frame(geometry, THICKNESS, stored)}})
    return out


def main() -> None:
    OUT.write_text(json.dumps({"schema": "prism.placement_cases.v1", "kicad": "10.0.6 stock footprints",
                               "tolerance": {"mm": 1e-6, "unit": 1e-9}, "frames": cases()}, indent=1) + "\n")


if __name__ == "__main__":
    main()
