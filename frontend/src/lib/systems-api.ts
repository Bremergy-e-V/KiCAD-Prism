/**
 * Typed client for `/api/systems` (docs/system-builder/CONTRACTS.md §8).
 *
 * Every engineering change is guarded by the whole-system ETag: mutations
 * take the ETag the caller last read and return the new one. A stale ETag
 * is a 412 `StaleSystemError` carrying the current ETag, so a caller can
 * reload and retry deliberately rather than overwrite someone's work.
 */

import { ApiHttpError, fetchApi, readApiError } from "@/lib/api";
import type {
  Decision,
  GeneratorKind,
  GeneratorResult,
  HistoryPage,
  ImportCommitReport,
  ImportPreview,
  ImportTarget,
  ImportUpload,
  InstanceInterface,
  Review,
  ReviewStatus,
  RowSource,
  SnapshotDiff,
  SnapshotMeta,
  SystemDocument,
  SystemInstance,
  SystemLink,
  SystemPort,
  SystemSummary,
  ValidationReport,
} from "@/types/system";

const BASE = "/api/systems";

export interface Versioned<T> {
  body: T;
  /** The system ETag after the call; null for calls that carry none (layout). */
  etag: string | null;
}

export class StaleSystemError extends ApiHttpError {
  currentEtag: string | null;

  constructor(message: string, currentEtag: string | null) {
    super(412, message, "stale_version");
    this.name = "StaleSystemError";
    this.currentEtag = currentEtag;
  }
}

function path(...parts: string[]): string {
  return [BASE, ...parts.map((part) => encodeURIComponent(part))].join("/");
}

async function send<T>(
  url: string,
  init: RequestInit & { etag?: string } = {},
  fallback = "System request failed",
): Promise<{ status: number; body: T; etag: string | null }> {
  const { etag, ...rest } = init;
  const headers = new Headers(rest.headers);
  if (etag) {
    headers.set("If-Match", etag);
  }
  const response = await fetchApi(url, { ...rest, headers });
  const nextEtag = response.headers.get("ETag");
  if (response.status === 412) {
    throw new StaleSystemError(await readApiError(response, "This system changed; reload it"), nextEtag);
  }
  if (!response.ok) {
    let code: string | undefined;
    const message = await readApiError(response.clone(), fallback);
    if (response.status === 409 && message.startsWith("interface_not_ready")) {
      code = "interface_not_ready";
    }
    throw new ApiHttpError(response.status, message, code);
  }
  const body = response.status === 204 ? (undefined as T) : ((await response.json()) as T);
  return { status: response.status, body, etag: nextEtag };
}

async function versioned<T>(url: string, init: RequestInit & { etag?: string } = {}, fallback?: string): Promise<Versioned<T>> {
  const { body, etag } = await send<T>(url, init, fallback);
  return { body, etag };
}

const json = (value: unknown) => JSON.stringify(value);

/** A queued background job (`202`): extraction, detection or rebase. */
export interface QueuedJob {
  job_id: string;
  status: string;
}

// ---------------------------------------------------------------------------
// Systems

export function createSystem(input: { name: string; description?: string; folderId?: string | null }) {
  return versioned<SystemSummary>(BASE, { method: "POST", body: json(input) }, "Could not create the system");
}

export function getSystem(systemId: string, init?: RequestInit) {
  return versioned<SystemDocument>(path(systemId), init, "Could not load the system");
}

// ---------------------------------------------------------------------------
// Instances

export interface InstanceInput {
  projectId: string;
  label: string;
  baselineCommit?: string | null;
  trackedRef?: string | null;
  pinned?: boolean;
}

export type InstanceRow = Pick<
  SystemInstance,
  "id" | "label" | "projectId" | "baselineCommit" | "trackedRef" | "pinned" | "resolution" | "tipCommit" | "tipCheckedAt"
>;

export function addInstance(systemId: string, etag: string, input: InstanceInput) {
  return versioned<InstanceRow>(path(systemId, "instances"), { method: "POST", etag, body: json(input) },
    "Could not add the board");
}

export function updateInstance(
  systemId: string, etag: string, instanceId: string,
  fields: { label?: string; pinned?: boolean; trackedRef?: string | null },
) {
  return versioned<InstanceRow>(path(systemId, "instances", instanceId), { method: "PATCH", etag, body: json(fields) });
}

export function removeInstance(systemId: string, etag: string, instanceId: string, cascadeLinks = false) {
  const query = cascadeLinks ? "?cascade=links" : "";
  return versioned<void>(`${path(systemId, "instances", instanceId)}${query}`, { method: "DELETE", etag });
}

export async function getInstanceInterface(
  systemId: string, instanceId: string, commit?: string,
): Promise<{ state: "ready"; body: InstanceInterface } | { state: "queued"; job: QueuedJob }> {
  const query = commit ? `?commit=${encodeURIComponent(commit)}` : "";
  const { status, body } = await send<InstanceInterface | QueuedJob>(
    `${path(systemId, "instances", instanceId, "interface")}${query}`,
  );
  return status === 202 ? { state: "queued", job: body as QueuedJob } : { state: "ready", body: body as InstanceInterface };
}

export function checkNow(systemId: string, instanceId: string) {
  return send<QueuedJob>(path(systemId, "instances", instanceId, "check"), { method: "POST" }).then((r) => r.body);
}

export function setPortOverride(
  systemId: string, etag: string, instanceId: string, portKey: string, state: "hidden" | "promoted" | null,
) {
  return versioned<SystemPort>(path(systemId, "instances", instanceId, "ports", portKey, "override"),
    { method: "PUT", etag, body: json({ state }) });
}

// ---------------------------------------------------------------------------
// Links and layout

export interface LinkEndInput {
  instanceId: string;
  portKey: string;
}

export function createLink(
  systemId: string, etag: string, input: { a: LinkEndInput; b: LinkEndInput; name?: string; harness?: string | null },
) {
  return versioned<SystemLink>(path(systemId, "links"), { method: "POST", etag, body: json(input) },
    "Could not create the link");
}

export function updateLink(systemId: string, etag: string, linkId: string, fields: { name?: string; harness?: string | null }) {
  return versioned<SystemLink>(path(systemId, "links", linkId), { method: "PATCH", etag, body: json(fields) });
}

export function deleteLink(systemId: string, etag: string, linkId: string) {
  return versioned<void>(path(systemId, "links", linkId), { method: "DELETE", etag });
}

export interface RowInput {
  id?: string;
  pinA: string;
  pinB: string;
  signal: string;
  source: RowSource;
}

/** `PUT …/rows` replaces **all** of a link's rows; send the ones to keep too. */
export function replaceRows(systemId: string, etag: string, linkId: string, rows: RowInput[]) {
  return versioned<SystemLink>(path(systemId, "links", linkId, "rows"), { method: "PUT", etag, body: json(rows) },
    "Could not save the rows");
}

export function generateRows(
  systemId: string, linkId: string, generator: GeneratorKind, options: Record<string, unknown> = {},
) {
  return versioned<GeneratorResult>(path(systemId, "links", linkId, "generate"),
    { method: "POST", body: json({ generator, options }) });
}

export function getValidation(systemId: string) {
  return versioned<ValidationReport>(path(systemId, "validation"));
}

export async function rebaseInstance(systemId: string, etag: string, instanceId: string, commit: string) {
  const result = await send<
    QueuedJob | { outcome: "auto_advanced" | "review_opened" | string; reviewId: string | null; instance: InstanceRow }
  >(path(systemId, "instances", instanceId, "rebase"), { method: "POST", etag, body: json({ commit }) });
  return result.status === 202
    ? { state: "queued" as const, job: result.body as QueuedJob }
    : { state: "done" as const, etag: result.etag, body: result.body as { outcome: string; reviewId: string | null; instance: InstanceRow } };
}

export function listReviews(systemId: string, status?: ReviewStatus) {
  const query = status ? `?status=${status}` : "";
  return send<Review[]>(`${path(systemId, "reviews")}${query}`).then((r) => r.body);
}

export function decideReviewItem(
  systemId: string, etag: string, reviewId: string, itemId: string, decision: Decision,
  payload?: Record<string, unknown>,
) {
  return versioned<Review>(path(systemId, "reviews", reviewId, "items", itemId, "decision"),
    { method: "POST", etag, body: json({ decision, payload: payload ?? null }) }, "Could not record the decision");
}

export function keepPinned(systemId: string, etag: string, reviewId: string) {
  return versioned<Review>(path(systemId, "reviews", reviewId, "keep-pinned"), { method: "POST", etag });
}

export function getHistory(systemId: string, cursor?: number | null, limit = 100) {
  const query = new URLSearchParams({ limit: String(limit) });
  if (cursor) {
    query.set("cursor", String(cursor));
  }
  return send<HistoryPage>(`${path(systemId, "history")}?${query}`).then((r) => r.body);
}

export type LayoutPositions = Record<string, { x: number; y: number }>;

export function getLayout(systemId: string) {
  return send<{ positions: LayoutPositions }>(path(systemId, "layout")).then((r) => r.body.positions);
}

export function putLayout(systemId: string, positions: LayoutPositions) {
  return send<{ positions: LayoutPositions }>(path(systemId, "layout"),
    { method: "PUT", body: json({ positions }) }).then((r) => r.body.positions);
}

// ---------------------------------------------------------------------------
// Snapshots and ICD (§9)

export function createSnapshot(systemId: string, etag: string, input: { name: string; note?: string }) {
  return versioned<SnapshotMeta>(path(systemId, "snapshots"), { method: "POST", etag, body: json(input) },
    "Could not create the snapshot");
}

export function listSnapshots(systemId: string) {
  return send<SnapshotMeta[]>(path(systemId, "snapshots")).then((r) => r.body);
}

export function diffSnapshot(systemId: string, snapshotId: string, against: "live" | string = "live") {
  return send<SnapshotDiff>(`${path(systemId, "snapshots", snapshotId, "diff")}?against=${encodeURIComponent(against)}`)
    .then((r) => r.body);
}

/** Where the browser opens an ICD: live, or a snapshot's. */
export function manifestUrl(systemId: string, snapshotId: string): string {
  return `${path(systemId, "snapshots", snapshotId)}/manifest`;
}

export function icdUrl(systemId: string, format: "csv" | "html", snapshotId?: string): string {
  return snapshotId
    ? `${path(systemId, "snapshots", snapshotId)}/icd.${format}`
    : `${path(systemId)}/icd.${format}`;
}

// ---------------------------------------------------------------------------
// CSV import (§9.3)

export interface ImportMaps {
  columnMap: Partial<Record<ImportTarget, string>>;
  boardMap: Record<string, string>;
  delimiter?: string | null;
}

export async function uploadImport(systemId: string, file: File, delimiter?: string) {
  const form = new FormData();
  form.append("file", file);
  if (delimiter) {
    form.append("delimiter", delimiter);
  }
  const { body } = await send<ImportUpload>(path(systemId, "imports"), { method: "POST", body: form },
    "Could not read the CSV");
  return body;
}

export function previewImport(systemId: string, importId: string, maps: ImportMaps) {
  return versioned<ImportPreview>(path(systemId, "imports", importId, "preview"), { method: "POST", body: json(maps) },
    "Could not preview the import");
}

export function commitImport(systemId: string, etag: string, importId: string, maps: ImportMaps) {
  return versioned<ImportCommitReport>(path(systemId, "imports", importId, "commit"),
    { method: "POST", etag, body: json(maps) }, "Could not commit the import");
}
