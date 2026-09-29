/**
 * System Builder response shapes (docs/system-builder/CONTRACTS.md §7–§9).
 * Fields mirror the API exactly; restricted boards arrive with nulls and
 * `redacted: true` (§8.2), so every field a restricted board can hide is
 * nullable here.
 */

export interface SystemSummary {
  id: string;
  kind: "system";
  name: string;
  description: string;
  folderId: string | null;
  version: number;
  etag: string;
  instanceCount: number;
  openReviewCount: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type InterfaceStatus = "ready" | "pending" | "failed";

export interface InstanceInterfaceState {
  status: InterfaceStatus;
  digest: string | null;
  hasPcb: boolean | null;
  jobId: string | null;
  errorCode: string | null;
}

export interface SystemPort {
  portKey: string;
  memberKeys: string[];
  reference: string;
  libId: string | null;
  footprint: string | null;
  value: string | null;
  dnp: boolean;
  candidate: boolean;
  candidateReason: string | null;
  override: "hidden" | "promoted" | null;
  exposed: boolean;
  pinCount: number;
}

export interface SystemInstance {
  id: string;
  label: string;
  restricted: boolean;
  redacted?: boolean;
  projectId: string | null;
  projectName: string | null;
  baselineCommit: string | null;
  trackedRef: string | null;
  pinned: boolean;
  resolution: "resolved" | "unresolved";
  tipCommit: string | null;
  tipCheckedAt: string | null;
  updateAvailable: boolean | null;
  interface: InstanceInterfaceState | null;
  ports: SystemPort[] | null;
}

export interface PortBaseline {
  portKey: string;
  memberKeys: string[];
  reference: string;
  libId: string | null;
  footprint: string | null;
  pinCount: number;
}

export interface LinkEnd {
  instanceId: string;
  redacted: boolean;
  port: PortBaseline | null;
  resolved: boolean | null;
  exposed: boolean | null;
}

export interface PinObservation {
  present: boolean;
  nets: string[] | null;
  pcbNets: string[] | null;
  pinNames: string[] | null;
  pinTypes: string[] | null;
}

export type RowSource = "manual" | "generator" | "import";

export interface LinkRow {
  id: string;
  pinA: string | null;
  pinB: string | null;
  signal: string;
  source: RowSource;
  netA: string[] | null;
  netB: string[] | null;
  observedA: PinObservation | null;
  observedB: PinObservation | null;
  redacted: boolean;
  redactedEnds: ("a" | "b")[];
}

export interface SystemLink {
  id: string;
  name: string;
  harness: string | null;
  updatedAt: string;
  a: LinkEnd;
  b: LinkEnd;
  rows: LinkRow[];
}

export interface FindingCounts {
  error: number;
  warning: number;
  info: number;
  notEvaluated: number;
}

export interface SystemDocument {
  system: SystemSummary;
  instances: SystemInstance[];
  links: SystemLink[];
  openReviewCount: number;
  findingCounts: FindingCounts | null;
}

/** A component from `GET …/interface`: artifact facts plus exposure, with pins instead of a count. */
export interface InstanceComponent extends Omit<SystemPort, "pinCount"> {
  pins: { pad: string; nets: string[]; pcbNets?: string[] | null; pinNames?: string[] | null; pinTypes?: string[] | null }[];
}

/** `GET …/instances/{iid}/interface`: the artifact (§3) plus exposure. */
export interface InstanceInterface {
  instanceId: string;
  atBaseline: boolean;
  projectId: string;
  commit: string;
  digest: string;
  hasPcb: boolean;
  components: InstanceComponent[];
}

// Validation (§7.2)

export type Severity = "error" | "warning" | "info";

export interface Finding {
  rule: string;
  name: string;
  severity: Severity;
  instanceId: string | null;
  linkId: string | null;
  rowId: string | null;
  end: "a" | "b" | null;
  reference: string | null;
  pin: string | null;
  detail: Record<string, unknown> | null;
  redacted: boolean;
}

export interface ValidationReport {
  findings: Finding[];
  notEvaluated: { rule: string; instanceId: string; reason: string }[];
  exempt: {
    rule: string;
    instanceId: string;
    portKey: string | null;
    reference: string | null;
    pin: string | null;
    links: string[];
    harness: string;
    redacted?: boolean;
  }[];
  counts: FindingCounts;
}

// Reviews (§7.1, §8.4)

export type ReviewKind = "source_update" | "baseline_unreachable" | "import";
export type ReviewStatus = "open" | "applied" | "kept_pinned" | "superseded" | "closed";
export type Decision = "accept" | "remap" | "bind_candidate" | "remove_rows";
export type ReviewItemKind = "connector_missing" | "connector_changed" | "pin_missing" | "net_changed" | "signal_mismatch";

export interface RebindCandidate {
  portKey: string;
  reference: string;
  referenceEqual: boolean;
  libIdEqual: boolean;
  pinCountEqual: boolean;
  netOverlap: number;
}

export interface ReviewItem {
  id: string;
  ordinal: number;
  kind: ReviewItemKind;
  linkId: string | null;
  end: "a" | "b" | null;
  rowIds: string[];
  pins: string[];
  expected: unknown;
  observed: unknown;
  candidates: RebindCandidate[] | null;
  decision: Decision | null;
  decisionPayload: Record<string, unknown> | null;
  redacted?: boolean;
}

export interface Review {
  id: string;
  kind: ReviewKind;
  status: ReviewStatus;
  instanceId: string | null;
  createdAt: string;
  decidedBy: string | null;
  decidedAt: string | null;
  redacted: boolean;
  fromCommit: string | null;
  toCommit: string | null;
  pendingChanges: {
    portUpdates?: { linkId: string; end: "a" | "b"; port: PortBaseline }[];
    silent?: { kind: string; linkId: string; end: "a" | "b"; via?: string; before?: unknown; after?: unknown }[];
  } | null;
  items: ReviewItem[] | null;
}

// History (§8.4)

export interface AuditEvent {
  seq: number;
  id: string;
  at: string;
  actor: string;
  kind: string;
  payload: Record<string, unknown> | null;
  redacted: boolean;
}

export interface HistoryPage {
  events: AuditEvent[];
  nextCursor: number | null;
}

// Snapshots (§9.1)

export interface SnapshotMeta {
  id: string;
  name: string;
  note: string;
  createdBy: string;
  createdAt: string;
  digest: string;
  openReviewCount: number;
  rendererVersion: string;
}

export interface Snapshot extends SnapshotMeta {
  document: SystemDocument & { validation: ValidationReport; reviewRowIds: string[] };
}

export interface RowFields {
  pinA: string | null;
  pinB: string | null;
  signal: string;
  netA: string[] | null;
  netB: string[] | null;
}

export interface SnapshotDiff {
  snapshotId: string;
  against: string;
  boards: { instanceId: string; label: string; status: "added" | "removed" | "rebased"; before: string | null; after: string | null }[];
  links: {
    linkId: string;
    name: string;
    status: "added" | "removed" | "changed";
    rows: { added: LinkRow[]; removed: LinkRow[]; changed: { id: string; before: RowFields; after: RowFields }[] };
  }[];
}

// CSV import (§9.3)

export type ImportTarget =
  | "from_board" | "from_connector" | "from_pin" | "to_board" | "to_connector" | "to_pin"
  | "signal" | "harness" | "link_name" | "row_id";
export type ImportBucket = "matched" | "needsReview" | "unresolved" | "conflict";

export interface ImportUpload {
  importId: string;
  filename: string;
  delimiter: string;
  rowCount: number;
  columns: string[];
  sampleRows: Record<string, string>[];
  suggestedColumnMap: Partial<Record<ImportTarget, string>>;
  boardValues: Record<string, string[]>;
}

export interface ImportEnd {
  instanceId: string;
  label: string;
  reference: string;
  portKey: string;
  exposed: boolean;
  pin: string;
  pinNames: string[] | null;
  nets: string[];
}

export interface ImportEntry {
  line: number;
  values: Record<ImportTarget, string>;
  reason: string | null;
  from: ImportEnd | null;
  to: ImportEnd | null;
  signal: string;
  harness: string | null;
  linkName: string;
  linkId: string | null;
  rowId: string | null;
  action: "create" | "update" | null;
}

export interface ImportPreview extends Record<ImportBucket, ImportEntry[]> {
  importId: string;
  committed: boolean;
  counts: Record<ImportBucket, number>;
}

export interface ImportCommitReport {
  importId: string;
  created: number;
  updated: number;
  unchanged: number;
  linksCreated: string[];
  reviewId: string | null;
  counts: Record<ImportBucket, number>;
  unresolved: ImportEntry[];
  conflict: ImportEntry[];
}

// Generators (§8.5)

export type GeneratorKind = "identity" | "reverse" | "offset" | "net_name";

export interface GeneratedRow {
  pinA: string;
  pinB: string;
  signal: string;
  source: "generator";
  netA: string[];
  netB: string[];
  pinNamesA: string[] | null;
  pinNamesB: string[] | null;
}

export interface GeneratorResult {
  linkId: string;
  generator: GeneratorKind;
  rows: GeneratedRow[];
  skipped: { pinA: string; pinB: string; reason: "existing" | "unconnected" }[];
}
