# System Builder

**Status: in development on `feature/system-builder`. Not in any release.**
Tracking issue: [#166](https://github.com/krishna-swaroop/KiCAD-Prism/issues/166).

System Builder binds an interface control document (ICD) to the revisioned
KiCad sources it describes, so a board revision cannot silently break a
system-level connection.

A **system** groups instances of Prism projects. Each instance is pinned to an
accepted commit and can track a branch. Prism extracts the connectors of each
instance as **ports**. Users connect ports with **links** and map pins inside
each link, either by hand or by importing an existing ICD spreadsheet.

When a tracked branch advances, Prism compares the new schematic against what
every connected pin was accepted as:

- If nothing a connection depends on changed, the baseline advances on its
  own.
- If something did change, Prism opens a review listing the affected
  connections. The user can accept the change, remap the pin, or stay pinned
  to the older revision.

## Documents

- [User guide](USER_GUIDE.md): creating a system, connecting boards,
  importing an ICD spreadsheet, deciding reviews, snapshots and the ICD.
- [Frozen contracts](CONTRACTS.md): identity, the interface artifact, drift
  and auto-accept rules, the HTTP API, CSV and ICD formats, and the fixture
  acceptance matrix. Implementation must follow the current version.

## P1 boundaries

Out of P1:

- Git-tracked system manifests
- Nested systems and packages
- Harness objects (wires, splices, gauge, colour); a link carries only a
  harness label
- Non-KiCad peripherals
- Multi-board 3D and mechanical mating
- MCAD exchange
- System-level electrical rule checks
- Per-instance variant selection
- Board-side "used in systems" indicators

Release Studio document generation is the intended P2 path for ICD
publication. P1 renders a printable HTML ICD and a CSV.
