/**
 * Typed client for `/api/systems` (docs/system-builder/CONTRACTS.md §8).
 *
 * Every engineering change is guarded by the whole-system ETag: mutations
 * take the ETag the caller last read and return the new one. A stale ETag
 * is a 412 `StaleSystemError` carrying the current ETag, so a caller can
 * reload and retry deliberately rather than overwrite someone's work.
 */

import { ApiHttpError, fetchApi, readApiError } from "@/lib/api";
import type { InstanceInterface, SystemDocument, SystemInstance, SystemLink, SystemPort, SystemSummary } from "@/types/system";

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

export type LayoutPositions = Record<string, { x: number; y: number }>;

export function getLayout(systemId: string) {
  return send<{ positions: LayoutPositions }>(path(systemId, "layout")).then((r) => r.body.positions);
}

export function putLayout(systemId: string, positions: LayoutPositions) {
  return send<{ positions: LayoutPositions }>(path(systemId, "layout"),
    { method: "PUT", body: json({ positions }) }).then((r) => r.body.positions);
}
