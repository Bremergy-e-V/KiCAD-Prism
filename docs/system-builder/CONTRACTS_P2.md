# System Builder P2 — contracts

**Version P2-1.2 · 2026-09-30 · tickets SB2-00 to SB2-02.** §0 choices S1–S8 were signed off by the user on 2026-09-30, with S6 revised.

This document extends [CONTRACTS.md](CONTRACTS.md) (P1, v1.12) and never overrides it
silently. Where P2 changes a P1 rule, the P1 section is named and the change is listed in §14.
The plan and decisions (D-P2-1 … D-P2-24) are on the audit board
`audit-reports/system-builder-p2-2026-09-30/PLAN.md`.

Changing a rule here is a contract revision: bump the version, record it in §14, and re-run
the affected goldens.

Machine-checkable parts:

| Artifact | Path |
|---|---|
| Manifest models (the source of truth) | `backend/app/services/systems/manifest_schema.py` |
| Generated JSON Schema | `docs/system-builder/schemas/system_manifest.v1.schema.json` |
| Example manifests | `docs/system-builder/examples/manifest-child-cndh.json`, `manifest-parent-bus.json` |
| Contract tests | `backend/tests/test_system_manifest_schema.py` |

Regenerate the schema with:

```bash
cd backend && venv/bin/python -m app.services.systems.manifest_schema > ../docs/system-builder/schemas/system_manifest.v1.schema.json
```

---

## 0. Choices made in this contract that need sign-off

These defaults were not settled explicitly in the grilling. Each is marked **[S#]** where
it appears.

| # | Choice | Why |
|---|---|---|
| S1 | A harness is **not** a link type. `system_links.type` is `unspecified` \| `b2b`. Pressing **H** or converting a link creates a harness object (§6.3), whose wires replace the link's rows. | One place for pin pairs per connection; avoids a link that is secretly a harness. |
| S2 | One system publishes to **exactly one** catalog `assembly` component, bound on first publish. Publishing the same snapshot twice returns the existing revision. | Stable IPN per subsystem; idempotent retries. |
| S3 | Depth counts **system levels including the root**: root → child → grandchild → great-grandchild is depth 4, the maximum. | A clear reading of "depth 4". |
| S4 | The power-meets-signal finding needs a per-pin **power-net flag**. Extractor **v5** (in M0, SB2-08) adds only that flag. The connector geometry planned as "v5" becomes **v6** (SB2-11). | Connector pins are usually `passive`, so pin types can't tell power from signal. |
| S5 | The name-mismatch finding (V09) compares **tokens**, not whole names (§8.3). `/SPI_SCK` meets `/SCK_IN` → shares `SCK` → no warning. `TM_MON` meets `GND_3` → warning. | Whole-name comparison would warn on nearly every link. |
| S6 | **Revised by the user:** canvas layout is **in** the manifest (`layout`), frozen by snapshots and (M7) committed to Git, like a Vivado block design. It is excluded from the connectivity digest and included in the full digest. Live layout edits still take no If-Match and write no audit event (P1 invariant 6, revised in §9.5). | A saved arrangement is shared work other users should see and get back from a snapshot; it is still never an engineering change. |
| S7 | A child system hidden from the reader shows its **catalog interface** (export names and pin numbers) but no internals, and its export pin nets are redacted if the board behind the export is hidden. | Consistent with catalog readability (D-P2-24) and P1 per-board redaction. |
| S8 | **Viewers** gain catalog read (D-P2-24). The SB2-02 test lists every catalog read route that opens up; inventory and provider tokens stay writer-only. | User decision 2026-09-30; guarded by a test. |

---

## 1. Scope

P2-1.0 freezes what **M0** needs, and the shapes later milestones must fit:

- catalog kinds and publishing (§3);
- exports and the export interface (§4);
- the hierarchy of systems (§5);
- links to exports, link types and harness objects (§6);
- child drift (§7);
- system nets and findings (§8);
- the manifest and digests (§9);
- ICD changes (§10);
- API, errors and audit (§11–§13).

Placement conventions (frames, units, quaternions) are frozen in SB2-10, harness geometry numbers in SB2-40, and the Git model in SB2-52. Until then the manifest carries their fields with the shapes in §9, but not their math.

## 2. Identity

### 2.1 New portable IDs

The format is P1 §2.1's: a prefix plus 32 lowercase hex characters.

| Object | Prefix |
|---|---|
| Export | `sxp_` |
| Harness | `shn_` |
| Harness end | `she_` |
| Harness wire | `shw_` |
| Harness node (breakout or waypoint) | `shd_` |

Catalog IDs keep the catalog's own formats; the manifest treats them as opaque strings.

### 2.2 Occurrence path

A **board occurrence** is one physical board somewhere in a hierarchy. Its identity is the path of instance IDs from the root system's instances downwards:

```text
occurrence_path = "/" + "/".join(instance_ids)      e.g. /sin_…A/sin_…C
display_path    = " ▸ ".join(labels)                 e.g. CNDH-A ▸ CMBD
```

- The first ID is an instance of the root system; each later ID is an instance inside the child named by the previous one.
- Only IDs are identity. Labels are display, and renaming never changes a path.
- A repeated child (CNDH-A, CNDH-B) gives distinct paths for the same inner instance.
- Everything below the root keys on occurrence paths: system nets, 3D picking and poses, search and ICD grouping.

## 3. Catalog kinds and publishing

### 3.1 Kinds

`components.kind` is `part` (default; every existing component) \| `module` \| `assembly`.

| Kind | Identity | Revision payload | DBL export / KLC |
|---|---|---|---|
| `part` | MPN or provisional IPN (unchanged) | unchanged | unchanged |
| `module` | MPN (bought) or IPN | `interface` (units = connectors) + STEP model (M6) | excluded |
| `assembly` | IPN | `interface` (units = exports) + `source_ref` | excluded |

- **IPN identity (P2-1.2):** an IPN is stored as the catalog's existing `provisional_ipn` identity, with `identity_source = "prism"` and the IPN as the internal part number. This reuses identity uniqueness without touching the catalog's 34 identity checks.
  - For `module` and `assembly`, approval and release accept that identity, in both the Python gate and the database trigger (integrity guards v5).
  - The UI shows such items by kind and never labels them "provisional".
- **Required metadata:** `value` = IPN, `category` = `Assemblies` or `Modules`, and `manufacturer` and `datasheet_url` are required as for parts. Publish passes the organisation name and the system's Prism URL.
- The `kind` of a component never changes after creation (`components.kind`, catalog migration 3, `CHECK` constrained).
- **Hash stability:** the revision payload is stored in `interface_json` and `source_ref_json` (JSON text). Both are left out of the revision manifest hash while empty, so every revision hashed before migration 3 keeps its hash.

### 3.2 Assembly revision payload

- `source_ref`: `{"kind": "system_snapshot", "systemId", "snapshotId", "fullDigest", "connectivityDigest", "openReviewCount", "hierarchyValid", "children": [{"componentId", "revisionId"}]}`. M7 adds `{"kind": "git_commit", …}`.
  - The last three are copied at publish so release gates read **only catalog data**. In CI, and possibly in deployments, the catalog lives in another database than `system_snapshots`. Snapshots are immutable, so the copy never goes stale.
- `interface`: the snapshot's **export interface** (§4.3), computed once at publish and immutable.

A revision **never copies** the manifest. Readers load the snapshot through `source_ref`.

### 3.3 Publish

`POST /api/systems/{id}/snapshots/{sid}/publish`, with body `{ipn?, name?, description?}` on the first publish (creating the component) and `{}` after.

- **Who:** designer on the system (P1 §8.2) **and** `CATALOG_WRITE_ROLES`.
- **Effect:** creates a new `component_revisions` row in stage `open`, with `change_kind = "publish"`.
  - On the first publish it creates the `assembly` component and binds `system_projects.catalog_component_id` **[S2]**.
  - The normal catalog workflow then applies (`open → in_progress → qa_review → done → released`).
- **Idempotent:** a unique constraint on (component, snapshotId). Re-publishing a snapshot returns the existing revision with 200; a new publish returns 201.
- **Two stores, retry-safe:** the catalog and workspace schemas share one database, but are written by different services. The order is: catalog revision first, then the audit event `snapshot_published` on the system. A crash between the two is repaired by re-publishing, because of the idempotency above.
- **Release gates** for `assembly` (`catalog/system_items.assert_release_gates`), each fail-closed, replacing the part gates (default representation, KLC):
  - the source snapshot is present (`source_ref.kind = "system_snapshot"`);
  - `source_ref.openReviewCount` is 0;
  - `source_ref.hierarchyValid` is true;
  - every `source_ref.children` revision is `released` (checked in the catalog);
  - the interface is non-empty.

  A `module` needs only a non-empty interface until M6 adds its model gates.

### 3.4 "Mates with" (M1; shape frozen here)

`catalog_mates_with(part_a, part_b)` is stored once with `part_a < part_b`, read in both directions, and only between `part` components. The M1 behaviour (suggest, warning, error) is in PLAN D-P2-13.

## 4. Exports

### 4.1 Definition

An export is `{id, name, description, target}`:
- **`target`:** either a board port of the same system (`{instanceId, portKey}`), or a **re-export** of a child's export (`{instanceId, exportId}`), so a mid-level system can pass a grandchild's connector up.
- **Names:** unique per system, case-insensitive, 1–100 characters.
- **Stable ID:** an export ID never changes. Retargeting an export keeps its ID and is an audited change.

### 4.2 Rules

1. **An export's port must be free.** A board port that is an end of any link in the same system cannot be an export target (409 `export_port_linked`), and linking an exported port is refused the same way. The exception, a harness splice, arrives in M1: a port mated by a harness end whose harness sets `allowExport` (M1 contract revision).
2. **An export's port must be exposed** (P1 §4.2), otherwise 409 `port_not_exposed`.
3. **A re-export needs an assembly instance.** Its target must be an assembly instance's export at that instance's pinned revision.
4. **Deleting an export is allowed.** Parents learn of it as `export_missing` in child drift (§7).
5. At most **200 exports** per system.

### 4.3 Export interface (`prism.system_export_interface.v1`)

```json
{
  "schema": "prism.system_export_interface.v1",
  "exports": [{
    "id": "sxp_…", "name": "PWR_IN", "description": "…",
    "occurrence": "/sin_…",            // path inside the child, to the board carrying it
    "reference": "J20", "libId": "…", "footprint": "…", "pinCount": 4,
    "pins": [{"pad": "1", "nets": ["/PWR/VBUS_28V"], "powerNet": true,
              "pinNames": ["VBUS"], "pinTypes": ["passive"]}]
  }]
}
```

- It is computed from the snapshot's instance baselines and their interface artifacts, using P1 §3 pin rules (pad strings, sorted net sets).
- A re-export is resolved to the physical connector.
- `powerNet` comes from extractor v5 **[S4]**.

## 5. Hierarchy

### 5.1 Instances

`system_instances.kind` is `board` (every P1 instance) \| `assembly` \| `module`.

- **Assembly or module instances** carry `catalog_component_id`, `catalog_revision_id` and `follow` (`pinned` \| `latest_released`). Board columns are null.
- **Adding one:** `POST …/instances` with `{kind: "assembly", componentId, revisionId?, label, follow}`.
  - When `revisionId` is omitted, it resolves once to the current released revision. 409 `no_released_revision` if there is none.
  - Pinning an unreleased revision is allowed and produces warning `SYS-V14` (§8.4).
- **Removing one** follows P1 §5.1 (`?cascade=links`).

### 5.2 Resolution

`resolve(root)` builds the occurrence tree:
- an assembly instance → its revision → `source_ref` snapshot → that snapshot's manifest → its instances, recursively;
- snapshots are immutable, so resolution is memoized per snapshot ID.

`flatten(tree)` lists board occurrences with occurrence paths and **world-independent** data (pose composition is a placement concern, SB2-10).

### 5.3 Limits and cycles

| Limit | Value | Error |
|---|---|---|
| Depth (system levels incl. root) **[S3]** | 4 | 422 `hierarchy_too_deep` |
| Board occurrences when flattened | 200 | 422 `hierarchy_too_large` |
| Cycle (a system reaching itself through any child snapshot) | none | 422 `hierarchy_cycle` |

- **When checked:** when an assembly instance is added, rebased or auto-advanced, and at publish (`assembly_hierarchy_valid`).
- **Advancing:** a parent following `latest_released` does not advance to a revision that would break a limit. It records warning `SYS-V15` instead.
- **Cycle detection:** by system ID along the resolution path, not component ID. A snapshot of an older version of the same system is still a cycle.

### 5.4 Visibility and redaction (extends P1 §8.2)

Redaction recurses. For each board occurrence, P1 §8.2 applies with the reader's access to that board's project today.

- **A hidden child system:** the reader can't see the child system's folder. The occurrence renders as its label plus the catalog interface, with pin nets redacted wherever the board behind the export is hidden **[S7]**. None of its internal boards, links or harnesses are returned.
- **Parent access never grants child access.**
- **Deleted projects:** P1 v1.12 applies at every depth.

## 6. Links, exports as ends, and harnesses

### 6.1 Link ends

A link end is either a **port end** `{instanceId, portKey, port: PortBaseline}` (board or module instance) or an **export end** `{instanceId, exportId, export: ExportBaseline}` (assembly instance).

- `ExportBaseline` is `{exportId, name, reference, libId, footprint, pinCount}`, captured from the export interface of the instance's current revision.
- Row nets on an export end are that interface's pin nets, following the P1 row rules.
- The P1 generators work on export ends, using the interface pins.

### 6.2 Link type

`system_links.type` is `unspecified` (every P1 link) \| `b2b` **[S1]**.
- **B** on the diagram sets the next drawn link to `b2b`.
- `PATCH …/links/{lid}` changes `type`.
- M1 adds the `b2b` mating requirements (PLAN D-P2-10).

### 6.3 Harness objects (shape frozen; behaviour in M1)

A harness has `ends` (1–32), `wires` and `nodes` (see §9.1 for fields).

- **End mates:** an end mates to a port end or export end, or to nothing.
- **Pins:** an end's pins map to the mated connector's pins through `pinMap` (null = identity).
- **Wires:** each wire joins `{end, pin}` to `{end, pin}` and carries `netFrom`/`netTo` baselines, like rows.
- **Pressing H**, drawing A → B, creates a 2-end harness with identity wires.
- **Converting** a P1 link with a `harness` label creates a harness and deletes the link. Its rows become wires with IDs preserved in `label`.
- **Drift:** P1 drift and review rules apply to harness end mates, like link ends (M1).

## 7. Child drift

### 7.1 Trigger

- Releasing a catalog revision of an `assembly` or `module` component enqueues `system_child_check` for every instance with `follow = latest_released` of that component.
- `POST …/instances/{iid}/rebase` with `{revisionId}` evaluates an explicit revision, like P1 rebase.

### 7.2 Evaluation

Evaluation compares, **for the exports this parent's links and harness ends use**, the pinned revision's interface baselines (stored on ends and rows) against the candidate revision's interface.

| Item kind | When | Allowed decisions |
|---|---|---|
| `export_missing` | the export ID is absent | `bind_candidate` (ranked: same name, same pin count, net overlap), `remove_rows` |
| `export_connector_changed` | `libId`, `footprint` or `pinCount` differ | `accept` (refused with 409 if used pads are missing), `remove_rows` |
| `pin_missing` | a used pad is absent | `remap`, `remove_rows` |
| `net_changed` | a used pad's net set differs | `accept`, `remap`, `remove_rows` |

- An export **retargeted** to a different connector with identical libId, footprint, pin count and used-pin nets is a **silent** change (audited `export_retargeted`), like P1 rebind.
- **Auto-advance** happens exactly when there are no items (P1 invariant 2 at the export boundary), and moves `catalog_revision_id` (audited `child_auto_advanced`).
- **Otherwise** a review of kind **`child_update`** opens. It has P1 review semantics: decisions, `keep-pinned`, superseding, and the v1.12 `basis` staleness rule.
- **Never considered:** internal child changes.

### 7.3 Warnings

`SYS-V14` and `SYS-V15` (§8.4) cover revisions pinned deliberately while unreleased or carrying open reviews, and advances blocked by limits.

## 8. System nets

### 8.1 Nodes and edges

- **Node:** `(occurrence_path, net)` for a named board net; `(occurrence_path, "pin:" + portKey + "#" + pad)` for a pin with no net (unconnected), so tracing still reaches it.
- **Edges:**
  - each row joins the nets of its two pins (every net in each sorted set);
  - each harness wire joins the nets of the board pins its two end pins map to;
  - an export end resolves to the child's physical pin before joining.
- **Group:** a connected component (union-find), computed over the flattened hierarchy.

### 8.2 Group output (`GET …/nets`, `GET …/nets/{groupId}`)

```json
{"groupId": "<min member key>", "name": "<clicked or first member leaf>", "aliases": ["SPI_SCK", "SCK_IN"],
 "pinCount": 6, "members": [{"occurrence": "/sin_…", "displayPath": "CNDH-A ▸ OBC-1", "net": "/Payload IF/SPI_SCK"}],
 "hops": [{"kind": "row"|"wire", "linkId"|"harnessId", "from": {"occurrence", "reference", "pad"},
           "to": {…}, "wireId"?: "shw_…"}]}
```

- `groupId` is stable for an unchanged membership, and it is valid only for the system version in the response's ETag.
- Search (`?search=&occurrence=`) matches aliases case-insensitively, using fuzzy ranking.
- Groups with `pinCount > 200` carry `"large": true`. The UI confirms before highlighting.
- Restricted occurrences appear as `{"occurrence": null, "redacted": true}` members, and their hops are dropped.

### 8.3 Tokens **[S5]**

A net's **tokens** are the last path segment, uppercased, with KiCad markup (`~{…}`, `{slash}`) removed, split on anything not `[A-Z0-9]`. Pure-number tokens are dropped, and so is the token `NET` from auto-names like `Net-(J1-Pad3)`.

### 8.4 Findings (P1 §7.2 numbering continues)

| Rule | Name | Severity | Definition |
|---|---|---|---|
| SYS-V09 | `net_name_mismatch` | warning | At a join (row or wire), the two sides' named nets share **no token**. It is reported once per join, with both names. Unnamed auto-nets and unconnected pins never trigger it. |
| SYS-V10 | `power_meets_signal` | error | At a join, exactly one side's pin has `powerNet: true` and the other side's net is a named, non-power net. |
| SYS-V11 | `mate_mismatch` | warning | Reserved for M4 (PLAN §5.3). |
| SYS-V12 | `harness_collision` | warning | Reserved for M5. |
| SYS-V13 | `length_mismatch` | warning | Reserved for M5. |
| SYS-V14 | `child_revision_unreleased` | warning | An assembly or module instance pins a revision that is not `released`, or whose snapshot had open reviews. |
| SYS-V15 | `child_advance_blocked` | warning | A released revision exists but advancing would break §5.3 limits. |

**`powerNet` (extractor v5 [S4]).** A pin's net is a power net when any schematic symbol on that net is a power symbol: KiCad `power` flag set on its lib symbol, or a reference starting with `#PWR`/`#FLG`. The extractor records `powerNet: bool` per pin. `EXTRACTOR_VERSION` goes to 5, and every board re-extracts once.

## 9. Manifest `prism.system_manifest.v1`

### 9.1 Shape

The models in `manifest_schema.py` are normative. Top-level keys:

| Key | Content |
|---|---|
| `schema` | `"prism.system_manifest.v1"` |
| `system` | `{id, name, description}` |
| `meta` | `{createdAt, createdBy, sourceVersion, snapshot?: {id, name, note}}` |
| `instances` | board `{id, label, kind: "board", projectId, baselineCommit, trackedRef, pinned, portOverrides}` or catalog `{id, label, kind: "assembly"\|"module", catalog: {componentId, revisionId, revisionVersion, identity}, follow}` |
| `exports` | §4.1 |
| `links` | `{id, name, type, harnessLabel, a, b, rows}` with P1 rows (`netA`/`netB` baselines) |
| `harnesses` | `{id, name, label, ends[{id, ordinal, mates, part, pinCount, pinMap, bootMm}], wires[{id, from, to, signal, gaugeAwg, colour, label, netFrom, netTo}], nodes[{id, kind, positionMm, pinned, order, ends}], cutLengthMm, serviceAllowancePct}` |
| `mating` | `{instanceId, portKey, mode, frame: {axis, quarterTurns}, stackHeightMm}` |
| `placement` | `{poses[{instanceId, translationMm, rotation (xyzw unit), source}], drivingMates[{instanceId, linkId}]}` |
| `layout` | `{positions: {<nodeKey>: {x, y}}}`, the saved diagram arrangement. Node keys are instance IDs and harness IDs at this level (at most 1000). An expanded child renders with the layout frozen in its own snapshot. |

Rules:
- Unknown fields are rejected.
- Array order is meaningful only where stated (`ordinal`, `order`). Writers emit instances, links, rows and wires sorted by ID; readers must not depend on order.

### 9.2 Referential rules (checked by `reference_problems`)

- Instance IDs are unique, and labels are unique case-insensitively.
- Export names are unique case-insensitively.
- Port ends and targets name board or module instances; export ends and targets name assembly instances.
- Row IDs are unique across the manifest, and pin pairs are unique per link.
- Wire and node ends exist in their harness.
- Mating names a board or module instance.
- There is at most one pose per instance, and every pose names an existing instance.
- Driving mates name an existing link and instance.

Checks that need other documents (a child's export exists at the pinned revision, a portKey exists at the baseline) belong to validation (§8.4, P1 §7.2), not to the manifest.

### 9.3 Digests

The canonical form is JSON with sorted keys, `(",", ":")` separators and `ensure_ascii=False`, hashed with SHA-256 and written `sha256:<hex>`.

- **`full`**: the manifest without `meta`.
- **`connectivity`**: `full` without `layout`, `mating`, `placement`, and each harness's `nodes`, `cutLengthMm`, `serviceAllowancePct` and every end's `bootMm`.

Drift, publish identity and catalog `connectivityDigest` use **connectivity**. Snapshot identity uses **full**.

### 9.4 Snapshots (changes P1 §9.1; implemented in SB2-01)

A snapshot row (migration 30) stores:

- `document`: the P1 rendered document, unchanged (it includes `validation` and `reviewRowIds`). The ICD, diffs and redacted reads keep using it as the evidence of what the system showed.
- `manifest`: v1, unredacted, built in the same transaction as the document. `meta.snapshot` is `{id, name, note}` and `meta.sourceVersion` is the frozen version.
- `manifest_schema`: `"prism.system_manifest.v1"`.
- `digest`: the manifest's **full** digest. P1 snapshots keep their document digest.
- `connectivity_digest`: the manifest's connectivity digest.

Reading rules:

- Snapshot metadata gains `connectivityDigest` and `manifestSchema`. Both are null on P1 snapshots.
- `GET …/snapshots/{sid}/manifest` returns the manifest **whole or not at all**. It gives 403 when the reader cannot see every board it names (a manifest is an exchange artifact; a partial one would be misleading), and 404 for a P1 snapshot without a manifest.
- P1 snapshots stay readable everywhere else, but cannot be published.
- Writers emit instances, links and rows sorted by ID, so an unchanged system snapshots to identical digests.

**Import.** `manifest.import_manifest` recreates a system from a manifest, **keeping every ID** (system, instances, links, rows), and audits `system_imported`. A clash with an existing ID fails the transaction. Sections without tables yet (exports, harnesses, mating, placement, catalog instances) are refused with 422 until their tickets land. There is no HTTP route yet; M7 adds one.

### 9.5 Canvas layout (revises P1 invariant 6)

- **Live:** `GET/PUT …/layout` is unchanged. It is shared by every user of the system, takes no If-Match (last write wins), writes no audit event and never bumps the system version.
- **Frozen:** a snapshot's manifest carries the layout as it was when the snapshot was taken. A system restored or published from a snapshot shows that arrangement.
- **Digests:** layout is excluded from the connectivity digest and included in the full digest.
- **A layout change alone never** opens a review, bumps drift, or makes a parent see a new child revision.

## 10. ICD changes (extends P1 §9.4–§9.5)

- **Parent ICD (default):**
  - A **Subsystems** table: label, kind, identity, revision, stage, snapshot name and digest, open reviews.
  - Link and harness ends on exports print as `CNDH-A ▸ PWR_IN → CMBD J20 pin 3 · /PWR/VBUS_28V`.
  - The printed banner also warns about SYS-V14.
- **`?depth=all`:** every link and harness at every level, grouped by occurrence path, in both CSV and HTML. CSV gains an `occurrence` column.
- **Renderer** version 3.

## 11. API additions

All routes are under `/api/systems/{id}` and follow P1 conventions (If-Match, 412/428, redaction).

| Method and path | Purpose |
|---|---|
| `GET …/exports`, `POST …/exports`, `PATCH …/exports/{xid}`, `DELETE …/exports/{xid}` | Export CRUD (§4) |
| `GET …/export-interface?snapshot=` | The interface (§4.3), live or for a snapshot |
| `POST …/snapshots/{sid}/publish` | §3.3 |
| `GET …/snapshots/{sid}/manifest` | The frozen manifest, whole or 403 (§9.4) |
| `POST …/instances` (extended) | `kind: "assembly"\|"module"` (§5.1) |
| `POST …/instances/{iid}/rebase` (extended) | `{revisionId}` for assembly and module instances |
| `GET …/hierarchy` | Occurrence tree: `{occurrences: [{path, displayPath, kind, instanceId, systemId?, revision?, restricted}]}` |
| `GET …/nets?search=&occurrence=&limit=`, `GET …/nets/{groupId}` | §8.2 |
| `GET …/icd.{csv,html}?depth=all` | §10 |
| Catalog: `GET /api/catalog/components?kind=part\|module\|assembly` | Filter by kind. Component payloads carry `kind`, `interface` and `source_ref` |

**Viewer browsing (D-P2-24, [S8]).** The dependency `require_catalog_browser` (roles `CATALOG_BROWSE_ROLES` = reader roles + `viewer`) guards exactly these 22 routes:
- components list, detail, revisions (list, compare, one), audit (and verify), usage, reviews, releases and validation;
- categories, workflow summary, release queue, asset search, previews and asset content;
- metadata fields, grid, grid preferences (GET and PUT, per user) and `export.csv`.

Everything else stays on reader or writer roles, including inventory export, health, imports, jobs, validation runs and metadata batches. `test_catalog_system_items.ViewerBrowseRoutesTest` pins the list. The frontend `view_catalog` authority includes `viewer`.

## 12. Error codes (additions)

| Status | Code | When |
|---|---|---|
| 409 | `export_port_linked` | Exporting a linked port, or linking an exported port |
| 409 | `no_released_revision` | Following latest-released with none released |
| 409 | `already_published` | Never returned: re-publish is idempotent (200). Listed so clients don't expect it |
| 409 | `review_stale` | P1 v1.12, also for `child_update` |
| 422 | `hierarchy_too_deep`, `hierarchy_too_large`, `hierarchy_cycle` | §5.3 |
| 422 | `export_limit` | More than 200 exports |
| 403 | — | Publish without catalog write role; a manifest naming a board the reader cannot see |

## 13. Audit event kinds (additions)

`system_imported`, `export_created`, `export_updated`, `export_retargeted`, `export_deleted`, `snapshot_published`, `child_auto_advanced`, `child_rebased`, `link_type_changed`, `harness_created`, `harness_updated`, `harness_deleted`, `pose_updated`, `poses_reset`, `mating_updated`.

## 14. Revision log

| Version | Date | Change |
|---|---|---|
| P2-1.2 | 2026-09-30 | SB2-02: catalog kinds (migration 3); IPN via `provisional_ipn` + source `prism` instead of a new identity kind; `source_ref` carries the gate facts; assembly gates; integrity guards v5; hash stability; `?kind=`; viewer browse routes. |
| P2-1.1 | 2026-09-30 | SB2-01: snapshots store the manifest and both digests (`digest` = full); `GET …/manifest` is whole-or-403; `import_manifest` keeps IDs; migration 30. §0 signed off. |
| P2-1.0 | 2026-09-30 | First draft for sign-off (SB2-00). Adds catalog kinds and publishing, exports, hierarchy, child drift, system nets V09–V15, manifest v1 with digests, API, errors and audit kinds. P1 changes: snapshots store a manifest (§9.4); instances gain `kind` (§5.1); extractor v5 adds `powerNet` (§8.4). S6 revised by the user: canvas layout is part of the manifest and snapshots (§9.5, revises P1 invariant 6). |
