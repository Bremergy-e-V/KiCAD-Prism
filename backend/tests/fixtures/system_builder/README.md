# System Builder fixture boards (SYS-01)

Shared evidence for the System Builder drift engine, detection and acceptance
tickets. The rules the expectations encode are frozen in
`docs/system-builder/CONTRACTS.md` (version 1.0, §11). Nothing here is derived
from a Prism implementation.

## Layout

| Path | Contents |
| --- | --- |
| `generate.py` | The only hand-authored design input. It models three boards and the change made at every step, emits KiCad S-expressions with uuid5 UUIDs, and has `kicad-cli` 10.0.6 re-save each file. It also writes the evidence, `system.json` and `manifest.json`. |
| `sources/<board>/<step>/` | Redistributable KiCad 10.0.6 projects, one full snapshot per step, re-saved by `kicad-cli sch/pcb upgrade --force`. |
| `evidence/<board>/<step>/netlist.xml` | `kicad-cli sch export netlist --format kicadxml` for each snapshot, with source path, date and tool normalized. |
| `system.json` | The fixture system at F0: four instances and five links. Port identity comes from the model; row net baselines come from the F0 netlists. |
| `expected/steps.json` | Expected drift outcomes per step, hand-written from the contract. |
| `manifest.json` | kicad-cli version and path, every command and exit code, and the SHA-256 of every file. |

Tests use `backend/tests/system_builder_fixtures.py`. Its
`build_fixture_repo(board, dest)` turns a board's snapshots into a real Git
repository: `main` is F0, each step is a branch `step/Fn` with one commit on
F0, and `step/F11` carries two commits. Author, committer and dates are fixed,
so the commit SHAs are deterministic.

## Boards

| Board | Contents |
| --- | --- |
| `mini_obc` | Root sheet with J2, J5, J6 (1×04) and JP1 (a solder jumper, which must not be detected). Sheet "Payload IF" holds J7 (2×10) and R10. It has a PCB. |
| `mini_payload` | J4 (2×10) on the root. TP1 is a custom-library test pad marked `Prism_Port=yes`, and J9 is a connector marked `Prism_Port=no`. Two instances of the `channel` sheet hold J11 and J12, which share a symbol UUID. **No PCB.** |
| `mini_power` | J1 (1×04). J3 is a two-unit `MiniSys:Conn_Split_2x2`: unit A has pads 1–2 and unit B has pads 3–4. J8 is DNP. It has a PCB. |

## Steps

| Step | Board | Change from F0 |
| --- | --- | --- |
| F1 | mini_obc | J7.17 is no-connected (was global `PAYLOAD_RESET#`) |
| F2 | mini_obc | J2 re-annotated to J12, UUID kept |
| F3 | mini_obc | J7 replaced by a new symbol (new UUID, same reference, lib and nets) |
| F4 | mini_obc | J7 `lib_id` and footprint changed from 2×10 to 2×12 |
| F5 | mini_obc | Sheet "Payload IF" renamed "Payload Interface" |
| F6 | mini_obc | README only |
| F7 | mini_obc | J7.19 net changed; no row uses it |
| F8 | mini_obc | J7.18 schematic net changed while the PCB still carries the old net |
| F9 | mini_obc | J2 deleted; J5 and J6 remain as candidates |
| F10 | mini_power | J3 unit A deleted, unit B kept |
| F11.1, F11.2 | mini_obc | F1, then additionally J7.3 renamed `SPI_CLK` |

F12 (the pinned second instance) needs no extra snapshot. It evaluates the F1
tip against the pinned `OBC-B` instance in `system.json`.

## What the native evidence proves

The netlists confirm these directly:

- Sheet-local nets are full hierarchical names such as `/Payload IF/SPI_SCK`, and global nets keep plain names.
- A sheet rename changes only the local names, and leaves symbol UUIDs alone.
- Unconnected pins are named `unconnected-(<ref>-<pin name>-Pad<n>)`.
- Repeated sheets share a symbol UUID under distinct sheet paths.
- A multi-unit symbol reports every unit's UUID.

The netlist sheet path omits the root sheet UUID, while occurrence keys and
footprint `(path …)` include it. `system.json` keys are full KIID paths.

The evidence cannot show how the pinned kicad-monkey exposes these facts. That
is SYS-02's job: `lib_id` access, and capturing the schematic net before the
PCB overlay.

## Regenerating

```bash
KICAD_CLI=/Applications/KiCad/KiCad.app/Contents/MacOS/kicad-cli \
    python3 backend/tests/fixtures/system_builder/generate.py
```

The generator refuses any kicad-cli other than 10.0.6. Its output is
byte-reproducible apart from `generatedAt` in the manifest.
`tests/test_system_builder_fixtures.py` fails when a file no longer matches the
manifest, or when an expectation contradicts the native evidence.
