"""Generate the P2 geometry fixture boards (SB2-21, plan §8).

Boards (``sources/<board>/<step>/``):

* ``mezz_base`` / F0: 50×40 mm, 1.6 mm. J1 and J2 are Hirose DF12E3.0-20DP headers on
  the top side, 30 mm apart.
* ``mezz_top`` / F0: the same outline. J1 and J2 are DF12C3.0-20DS receptacles on the
  bottom side, over the headers, so both pairs mate. F1 is the next commit: J2 moved
  +1.5 mm in X.
* ``edge_a`` / F0 and ``edge_b`` / F0: J1 is a right-angle pin header (edge_a) mating a
  vertical socket (edge_b); J2 is a right-angle socket (edge_a) mating a right-angle
  header (edge_b).
* ``ambiguous`` / F0: J1 is a fixture-library 2×05 footprint whose name says neither
  vertical nor right-angle, with no courtyard and no 3D model.

Footprints are KiCad 10.0.6 stock, placed through KiCad's IPC API (``ipc_build.py``;
KiCad 11 drops the SWIG ``pcbnew`` module). KiCad ships
no 3D model for the DF12, so the boards reference Hirose's own STEP files for the
drop-in successors DF12NC(3.0)-20DP/-20DS-0.5V(51) (Hirose: compatible in mounting,
mating and specification). They are not redistributed: put them in ``vendor/hirose/``
(see the README) before running this.

Every board is checked with ``kicad-cli`` 10.0.6: ``sch erc``, ``pcb drc
--schematic-parity``, ``sch export netlist``, ``pcb export step`` and ``pcb export glb``.
Reports go to ``evidence/fixtures/<board>/<step>/``; ``evidence/fixtures/record.json``
holds every command, exit code and violation count, and the SHA-256 of every file.

Run it with a Python that has ``kicad-python==0.8.0``, while KiCad 10.0.6's PCB editor is
open on any board with the API server enabled (the generator replaces that board's
contents and saves it under each fixture's name)::

    <python with kicad-python> tests/fixtures/system_builder/p2/geometry_fixtures.py
"""

from __future__ import annotations

import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent))

import generate as g  # noqa: E402  (the P1 schematic writer)

sys.path.insert(0, str(HERE))
import ipc_build  # noqa: E402

SOURCES = HERE / "sources"
EVIDENCE = HERE / "evidence" / "fixtures"
VENDOR = HERE / "vendor" / "hirose"
KICAD = Path("/Applications/KiCad/KiCad.app/Contents")
CLI = os.environ.get("KICAD_CLI", str(KICAD / "MacOS" / "kicad-cli"))
STOCK = KICAD / "SharedSupport" / "footprints"
FIXTURE_LIB = "PrismFixture"
THICKNESS = 1.6

# Hirose STEP files for the DF12 successors, with their SHA-256 as downloaded from
# https://www.hirose.com/api/v1/products/<code>/documents/model_3d_step/content (2026-10-01).
VENDOR_MODELS = {
    "DP": ("DF12NC(3.0)-20DP.stp", "CL0537-0398-0-51"),
    "DS": ("DF12NC(3.0)-20DS.stp", "CL0537-0193-0-51"),
}


def _mod(board: str, step: str) -> str:
    """Model paths are relative to the project, so the committed sources work wherever the repo is."""
    return "${KIPRJMOD}/" + os.path.relpath(VENDOR, SOURCES / board / step)


# Placement of each vendor model on its KiCad footprint (mm, KiCad model space: y up).
# Hirose's models have their origin at a body corner (Geometer bounds: DP x 0..7.2,
# y -0.4..4.2, z 0..2.3; DS x 0..7.1, y -0.5..4.1, z 0..2.2). The offsets put each body's
# XY centre on the centre of its footprint's F.Fab outline (y up: DP x ±3.6, y -2.65..1.9;
# DS x ±3.55, y -1.8..2.55) with its seat on the board (z 0). KiCad's GLB export of the
# fixtures confirms it to 0.025 mm (README). The bounds cannot show pin 1, so the vendor
# body's own pin-1 end is not checked; the models are for the M2 scene only.
MODEL_PLACEMENT = {
    "DP": {"offsetMm": [-3.6, -2.275, 0.0], "rotationDeg": [0.0, 0.0, 0.0]},
    "DS": {"offsetMm": [-3.55, -1.425, 0.0], "rotationDeg": [0.0, 0.0, 0.0]},
}


# --------------------------------------------------------------------------
# Symbols: one fixture-library symbol per footprint, so the schematic's Footprint
# field and the board agree (DRC schematic parity).

def _conn(name: str, pins: int, footprint: str) -> g.LibSymbol:
    return g.LibSymbol(f"{FIXTURE_LIB}:{name}", "J", name, footprint,
                       tuple(g.LibPin(str(i), f"Pin_{i}") for i in range(1, pins + 1)))


SYMBOLS = {
    "DF12_DP": _conn("DF12_Header_2x10", 20, f"{FIXTURE_LIB}:Hirose_DF12_DF12E3.0-20DP-0.5V_2x10_P0.50mm_Vertical"),
    "DF12_DS": _conn("DF12_Receptacle_2x10", 20, f"{FIXTURE_LIB}:Hirose_DF12_DF12C3.0-20DS-0.5V_2x10_P0.50mm_Vertical"),
    "HDR_RA": _conn("Header_1x04_RA", 4, "Connector_PinHeader_2.54mm:PinHeader_1x04_P2.54mm_Horizontal"),
    "SKT_RA": _conn("Socket_1x04_RA", 4, "Connector_PinSocket_2.54mm:PinSocket_1x04_P2.54mm_Horizontal"),
    "SKT_V": _conn("Socket_1x04_V", 4, "Connector_PinSocket_2.54mm:PinSocket_1x04_P2.54mm_Vertical"),
    "CUSTOM": _conn("Conn_Custom_2x05", 10, f"{FIXTURE_LIB}:Conn_Custom_2x05"),
}

# A footprint of the fixture's own library: 2×05 at 2.54 mm, no courtyard, no model,
# and a name that says neither vertical nor right-angle.
CUSTOM_FOOTPRINT = """(footprint "Conn_Custom_2x05"
\t(version 20260206)
\t(generator "prism_fixture")
\t(layer "F.Cu")
\t(descr "SB2-21 fixture: a connector whose orientation cannot be inferred")
\t(property "Reference" "REF**" (at 0 -2.5 0) (layer "F.SilkS") (effects (font (size 1 1) (thickness 0.15))))
\t(property "Value" "Conn_Custom_2x05" (at 0 12.7 0) (layer "F.Fab") (effects (font (size 1 1) (thickness 0.15))))
\t(fp_rect (start -1.27 -1.27) (end 3.81 11.43) (stroke (width 0.1) (type default)) (fill no) (layer "F.Fab"))
{pads}
\t(embedded_fonts no)
)
"""


def _custom_pads() -> str:
    rows = []
    for i in range(10):
        number, x, y = i + 1, (i % 2) * 2.54, (i // 2) * 2.54
        shape = "rect" if number == 1 else "circle"
        rows.append(f'\t(pad "{number}" thru_hole {shape} (at {x:g} {y:g}) (size 1.7 1.7) (drill 1) '
                    '(layers "*.Cu" "*.Mask"))')
    return "\n".join(rows)


# --------------------------------------------------------------------------
# Boards. Page coordinates in mm (y down), as KiCad stores them.

def _part(key: str, reference: str, at: tuple[float, float], side: str, rotation: float, prefix: str,
          model: str | None = None) -> dict:
    return {"symbol": key, "reference": reference, "atMm": list(at), "side": side, "rotationDeg": rotation,
            "netPrefix": prefix, "model": model}


# Each net joins two pins of one connector (a loopback), routed on the board, so every
# net is real (no ERC isolated labels, no DRC unconnected items). DF12 pins n and n+10
# face each other across the rows; the others pair neighbours on the same row.
LOOPBACKS = {
    "DF12_DP": [(str(n), str(n + 10)) for n in range(1, 11)],
    "DF12_DS": [(str(n), str(n + 10)) for n in range(1, 11)],
    "HDR_RA": [("1", "2"), ("3", "4")],
    "SKT_RA": [("1", "2"), ("3", "4")],
    "SKT_V": [("1", "2"), ("3", "4")],
    "CUSTOM": [(str(n), str(n + 1)) for n in range(1, 11, 2)],
}


def _net(part: dict, pin: str) -> str:
    """The loopback net a pin is on, named after its first pin (A1 joins J1 pins 1 and 11)."""
    first = next(a for a, b in LOOPBACKS[part["symbol"]] if pin in (a, b))
    return f"{part['netPrefix']}{first}"


def boards() -> list[dict]:
    base = [_part("DF12_DP", "J1", (110, 120), "top", 0, "A", "DP"),
            _part("DF12_DP", "J2", (140, 120), "top", 0, "B", "DP")]
    # Flipped to the bottom with no further turn, the receptacle's pin n lands on the
    # header's pin n: the stock DS and DP footprints are drawn mirrored for exactly this.
    # The generator checks it from the placed pads (and kicad-cli's IPC-D-356 agrees).
    top = [_part("DF12_DS", "J1", (110, 120), "bottom", 0, "A", "DS"),
           _part("DF12_DS", "J2", (140, 120), "bottom", 0, "B", "DS")]
    shifted = [top[0], {**top[1], "atMm": [141.5, 120]}]
    return [
        {"board": "mezz_base", "step": "F0", "outlineMm": [100, 100, 150, 140], "parts": base},
        {"board": "mezz_top", "step": "F0", "outlineMm": [100, 100, 150, 140], "parts": top},
        {"board": "mezz_top", "step": "F1", "outlineMm": [100, 100, 150, 140], "parts": shifted},
        {"board": "edge_a", "step": "F0", "outlineMm": [100, 100, 140, 130],
         "parts": [_part("HDR_RA", "J1", (105, 104), "top", 0, "E"),
                   _part("SKT_RA", "J2", (135, 118), "top", 0, "C")]},
        {"board": "edge_b", "step": "F0", "outlineMm": [100, 100, 140, 130],
         "parts": [_part("SKT_V", "J1", (110, 106), "top", 0, "E"),
                   _part("HDR_RA", "J2", (105, 118), "top", 0, "C")]},
        {"board": "ambiguous", "step": "F0", "outlineMm": [100, 100, 130, 125],
         "parts": [_part("CUSTOM", "J1", (110, 106), "top", 0, "X")]},
    ]


# --------------------------------------------------------------------------
# Writers.

def _schematic_board(spec: dict) -> g.Board:
    symbols = []
    for index, part in enumerate(spec["parts"]):
        lib = SYMBOLS[part["symbol"]]
        pins = {p.number: ("local", _net(part, p.number)) for p in lib.pins}
        symbols.append(g.Symbol(key=part["reference"], lib=part["symbol"], at=(60.96 + index * 50.8, 50.8),
                                pins=pins, refs={"": part["reference"]}))
    return g.Board(name=spec["board"], root=g.SheetFile(f"{spec['board']}.kicad_sch", symbols))


def _symbol_library() -> str:
    body = []
    for sym in SYMBOLS.values():
        text = g.lib_symbol_sexpr(sym)
        body.append(text.replace(g.q(sym.lib_id), g.q(sym.lib_id.split(":", 1)[1]), 1))
    return ('(kicad_symbol_lib\n(version 20251024)\n(generator "prism_fixture")\n(generator_version "10.0")\n'
            + "\n".join(body) + "\n)\n")


def _tables(directory: Path) -> None:
    (directory / "sym-lib-table").write_text(
        '(sym_lib_table\n\t(version 7)\n'
        f'\t(lib (name "{FIXTURE_LIB}") (type "KiCad") (uri "${{KIPRJMOD}}/{FIXTURE_LIB}.kicad_sym") (options "") (descr "SB2-21 fixture symbols"))\n)\n')
    (directory / "fp-lib-table").write_text(
        '(fp_lib_table\n\t(version 7)\n'
        f'\t(lib (name "{FIXTURE_LIB}") (type "KiCad") (uri "${{KIPRJMOD}}/{FIXTURE_LIB}.pretty") (options "") (descr "SB2-21 fixture footprints"))\n)\n')
    (directory / f"{FIXTURE_LIB}.kicad_sym").write_text(_symbol_library())
    pretty = directory / f"{FIXTURE_LIB}.pretty"
    pretty.mkdir(exist_ok=True)
    (pretty / "Conn_Custom_2x05.kicad_mod").write_text(CUSTOM_FOOTPRINT.format(pads=_custom_pads()))
    # The DF12 footprints are KiCad's stock files with one change: the (model ...) block names
    # Hirose's STEP (KiCad ships none), placed on the footprint as MODEL_PLACEMENT says.
    board, step = directory.parent.name, directory.name
    for kind, stock in DF12_STOCK.items():
        text = (STOCK / "Connector_Hirose.pretty" / f"{stock}.kicad_mod").read_text()
        file, _code = VENDOR_MODELS[kind]
        offset, rotation = MODEL_PLACEMENT[kind]["offsetMm"], MODEL_PLACEMENT[kind]["rotationDeg"]
        model = (f'(model "{_mod(board, step)}/{file}"\n\t\t(offset\n\t\t\t(xyz {" ".join(f"{v:g}" for v in offset)})\n\t\t)'
                 '\n\t\t(scale\n\t\t\t(xyz 1 1 1)\n\t\t)'
                 f'\n\t\t(rotate\n\t\t\t(xyz {" ".join(f"{v:g}" for v in rotation)})\n\t\t)\n\t)')
        replaced, count = re.subn(r'\(model "[^"]*"\s*\(offset\s*\(xyz [^)]*\)\s*\)\s*\(scale\s*\(xyz [^)]*\)\s*\)\s*\(rotate\s*\(xyz [^)]*\)\s*\)\s*\)',
                                  lambda _m: model, text)
        if count != 1:
            raise SystemExit(f"{stock}: expected one model block, found {count}")
        (pretty / f"{stock}.kicad_mod").write_text(replaced)


DF12_STOCK = {
    "DP": "Hirose_DF12_DF12E3.0-20DP-0.5V_2x10_P0.50mm_Vertical",
    "DS": "Hirose_DF12_DF12C3.0-20DS-0.5V_2x10_P0.50mm_Vertical",
}


def _pcb_spec(spec: dict, directory: Path, board: g.Board) -> dict:
    footprints = []
    for part in spec["parts"]:
        lib = SYMBOLS[part["symbol"]]
        library, name = lib.footprint.split(":", 1)
        path = (directory / f"{FIXTURE_LIB}.pretty") if library == FIXTURE_LIB else (STOCK / f"{library}.pretty")
        sym = next(s for s in board.root.symbols if s.key == part["reference"])
        footprints.append({
            "library": library, "name": name, "footprintFile": str(path / f"{name}.kicad_mod"), "reference": part["reference"],
            "value": lib.value, "atMm": part["atMm"], "side": part["side"], "rotationDeg": part["rotationDeg"],
            "path": f"{g.instance_path(board, None)}/{g.symbol_uuid(board, sym)}",
            "nets": {p.number: f"/{_net(part, p.number)}" for p in lib.pins},
            "loopbacks": [list(pair) for pair in LOOPBACKS[part["symbol"]]],
        })
    return {"thicknessMm": THICKNESS, "outlineMm": spec["outlineMm"], "footprints": footprints,
            "schematicFile": f"{spec['board']}.kicad_sch"}


def _stable_uuids(text: str, board: str, step: str) -> str:
    """pcbnew draws random UUIDs; replace them in order of appearance so the file is reproducible."""
    seen: dict[str, str] = {}

    def stable(match: re.Match) -> str:
        old = match.group(1)
        seen.setdefault(old, g.uid(board, step, "pcb", str(len(seen))))
        return f'(uuid "{seen[old]}")'

    return re.sub(r'\(uuid "([0-9a-f-]{36})"\)', stable, text)


def _numeric_models(models: list) -> list:
    return [[m[1], *[[float(v) for v in ipc_build.child(ipc_build.child(m, key), "xyz")[1:]]
                     for key in ("offset", "scale", "rotate")]] for m in models]


def _check_models(spec: dict, directory: Path, pcb: Path) -> None:
    """Every placed footprint's 3D model block must equal its library file's (DRC does not check offsets)."""
    board = ipc_build.parse(pcb.read_text())
    placed = {}
    for footprint in ipc_build.children(board, "footprint"):
        reference = next(p[2] for p in ipc_build.children(footprint, "property") if p[1] == "Reference")
        placed[reference] = ipc_build.children(footprint, "model")
    for part in spec["parts"]:
        library, name = SYMBOLS[part["symbol"]].footprint.split(":", 1)
        path = (directory / f"{FIXTURE_LIB}.pretty") if library == FIXTURE_LIB else (STOCK / f"{library}.pretty")
        expected = ipc_build.children(ipc_build.parse((path / f"{name}.kicad_mod").read_text()), "model")
        if _numeric_models(placed[part["reference"]]) != _numeric_models(expected):
            raise SystemExit(f"{spec['board']}/{spec['step']} {part['reference']}: 3D model differs from the library: "
                             f"{_numeric_models(placed[part['reference']])} != {_numeric_models(expected)}")


def _run(argv: list[str], cwd: Path) -> dict:
    result = subprocess.run([CLI, *argv], cwd=cwd, capture_output=True, text=True)
    return {"argv": ["kicad-cli", *argv], "exitCode": result.returncode}


def _sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def _violations(report: Path) -> dict:
    data = json.loads(report.read_text())
    counts: dict[str, int] = {}
    for sheet in data.get("sheets") or [data]:
        for key in ("violations", "unconnected_items", "schematic_parity"):
            for violation in sheet.get(key) or []:
                counts[violation.get("severity", "?")] = counts.get(violation.get("severity", "?"), 0) + 1
    return counts


def build(spec: dict, record: dict) -> None:
    board_name, step = spec["board"], spec["step"]
    directory = SOURCES / board_name / step
    if directory.exists():
        shutil.rmtree(directory)
    directory.mkdir(parents=True)
    board = _schematic_board(spec)
    g.LIB.update(SYMBOLS)
    _tables(directory)
    (directory / f"{board_name}.kicad_pro").write_text(g.project_text(board))
    (directory / f"{board_name}.kicad_sch").write_text(g.schematic_text(board, board.root))

    pads = ipc_build.build({**_pcb_spec(spec, directory, board), "output": str(directory / f"{board_name}.kicad_pcb"),
                            "idSeed": f"{board_name}/{step}"})
    # Saving from the editor may rewrite the project file; keep the generated one.
    (directory / f"{board_name}.kicad_pro").write_text(g.project_text(board))
    pcb = directory / f"{board_name}.kicad_pcb"
    pcb.write_text(_stable_uuids(pcb.read_text(), board_name, step))
    _check_models(spec, directory, pcb)

    out = EVIDENCE / board_name / step
    if out.exists():
        shutil.rmtree(out)
    out.mkdir(parents=True)
    (out / "pads.json").write_text(json.dumps(pads, indent=1, sort_keys=True) + "\n")
    commands = [_run(["sch", "upgrade", "--force", f"{board_name}.kicad_sch"], directory)]
    checks = {
        "erc": ["sch", "erc", "--format", "json", "--severity-all", "-o", str(out / "erc.json"), f"{board_name}.kicad_sch"],
        "drc": ["pcb", "drc", "--format", "json", "--severity-all", "--schematic-parity", "-o", str(out / "drc.json"),
                f"{board_name}.kicad_pcb"],
        "netlist": ["sch", "export", "netlist", "--format", "kicadxml", "-o", str(out / "netlist.xml"), f"{board_name}.kicad_sch"],
        "step": ["pcb", "export", "step", "--force", "--no-dnp", "-o", str(Path(tempfile.gettempdir()) / f"{board_name}-{step}.step"),
                 f"{board_name}.kicad_pcb"],
        "glb": ["pcb", "export", "glb", "--force", "-o", str(Path(tempfile.gettempdir()) / f"{board_name}-{step}.glb"),
                f"{board_name}.kicad_pcb"],
    }
    results = {}
    for name, argv in checks.items():
        result = subprocess.run([CLI, *argv], cwd=directory, capture_output=True, text=True)
        commands.append({"argv": ["kicad-cli", *argv[:2], *(a for a in argv[2:] if not a.startswith("/"))],
                         "exitCode": result.returncode})
        results[name] = {"exitCode": result.returncode}
        if name in ("step", "glb"):
            # The export log names each model it could not load; none may be missing.
            log = result.stdout + result.stderr
            results[name]["missingModels"] = sorted(set(re.findall(r"[Cc]ould not (?:load|find|add) [^\n]*", log)))
    for name in ("erc", "drc"):
        results[name]["violations"] = _violations(out / f"{name}.json")
        # The reports carry the date and absolute paths; keep only what is reproducible.
        data = json.loads((out / f"{name}.json").read_text())
        for key in ("date", "source", "kicad_version"):
            data.pop(key, None)
        (out / f"{name}.json").write_text(json.dumps(data, indent=1, sort_keys=True) + "\n")
    netlist = (out / "netlist.xml").read_text()
    netlist = re.sub(r"<source>.*?</source>", "<source/>", netlist)
    netlist = re.sub(r"<date>.*?</date>", "<date/>", netlist)
    netlist = re.sub(r"<tool>.*?</tool>", "<tool/>", netlist)
    (out / "netlist.xml").write_text(netlist)
    for leftover in list(directory.glob("*.kicad_prl")) + list(directory.glob("*-backups")) + list(directory.glob("*.bak")):
        shutil.rmtree(leftover) if leftover.is_dir() else leftover.unlink()
    record["boards"][f"{board_name}/{step}"] = {
        "commands": commands, "checks": results,
        "files": {str(p.relative_to(HERE)): _sha(p) for p in sorted(directory.rglob("*")) if p.is_file()},
    }


def main() -> int:
    version = subprocess.run([CLI, "--version"], capture_output=True, text=True, check=True).stdout.strip()
    if version != "10.0.6":
        print(f"expected kicad-cli 10.0.6, found {version!r}", file=sys.stderr)
        return 1
    missing = [f for f, _code in VENDOR_MODELS.values() if not (VENDOR / f).is_file()]
    if missing:
        print(f"missing Hirose models in {VENDOR}: {', '.join(missing)} (see the README)", file=sys.stderr)
        return 1
    record = {"kicad": version, "vendorModels": {f: {"hiroseCode": code, "sha256": _sha(VENDOR / f)}
                                                 for f, code in VENDOR_MODELS.values()},
              "boards": {}}
    for spec in boards():
        build(spec, record)
    (EVIDENCE / "record.json").write_text(json.dumps(record, indent=1, sort_keys=True) + "\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
