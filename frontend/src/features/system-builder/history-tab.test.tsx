import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { HistoryTab, eventSummary, rowChange } from "./history-tab";
import { instance, systemDocument } from "./test-fixtures";
import type { AuditEvent } from "@/types/system";

afterEach(() => vi.unstubAllGlobals());

const obc = instance("OBC-A");
const doc = systemDocument([obc]);
const labels = new Map([[obc.id, "OBC-A"]]);
const event = (kind: string, payload: Record<string, unknown> | null, patch: Partial<AuditEvent> = {}): AuditEvent => ({
  seq: 1, id: `e-${kind}`, at: "2026-09-30T10:00:00Z", actor: "user:a@x", kind, payload, redacted: false, ...patch,
});

describe("history formatting", () => {
  it("summarises audit events", () => {
    expect(eventSummary(event("baseline_auto_advanced", { instanceId: obc.id, from: "1".repeat(40), to: "2".repeat(40) }), labels))
      .toBe("OBC-A 11111111 → 22222222");
    expect(eventSummary(event("review_applied", { kind: "import", created: 2, updated: 1 }), labels)).toBe("import review: 2 created, 1 updated");
    expect(eventSummary(event("rows_replaced", { rowCount: 4, added: ["x"], removed: [] }), labels)).toBe("4 rows (1 added, 0 removed)");
    expect(eventSummary(event("link_created", null, { redacted: true }), labels)).toBe("on a board you cannot see");
  });

  it("describes only what changed in a row", () => {
    expect(rowChange(
      { pinA: "18", pinB: "18", signal: "IRQ", netA: ["PAYLOAD_IRQ#"], netB: ["/IRQ_OUT#"] },
      { pinA: "18", pinB: "18", signal: "IRQ", netA: ["PAYLOAD_INT#"], netB: ["/IRQ_OUT#"] },
    )).toBe("net A PAYLOAD_IRQ# → PAYLOAD_INT#");
  });
});

describe("HistoryTab", () => {
  it("takes a snapshot with If-Match, re-reads both lists, and compares against live", async () => {
    const calls: [string, RequestInit][] = [];
    let snapshots: unknown[] = [];
    vi.stubGlobal("fetch", vi.fn(async (url: string, init: RequestInit = {}) => {
      calls.push([url, init]);
      const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
        status, headers: { "Content-Type": "application/json", ETag: '"sys:sys_1:3"' },
      });
      if (url.includes("/history")) return json({ events: [event("link_created", {})], nextCursor: null });
      if (url.includes("/diff")) {
        return json({ snapshotId: "ssn_1", against: "live", boards: [{ instanceId: obc.id, label: "OBC-A", status: "rebased", before: "a".repeat(40), after: "b".repeat(40) }],
          links: [] });
      }
      if (url.endsWith("/snapshots") && init.method === "POST") {
        snapshots = [{ id: "ssn_1", name: "CDR", note: "", createdBy: "user:a@x", createdAt: "2026-09-30T10:00:00Z",
          digest: "sha256:abcdef0123456789abcdef", openReviewCount: 1, rendererVersion: "1" }];
        return json(snapshots[0], 201);
      }
      if (url.endsWith("/snapshots")) return json(snapshots);
      return json({});
    }));
    render(<HistoryTab systemId="sys_1" document={doc} etag='"sys:sys_1:3"' canEdit user={null} reload={vi.fn(async () => undefined)} onNavigate={vi.fn()} />);
    expect(await screen.findByText("No snapshots yet.")).toBeTruthy();
    expect(screen.getByRole("link", { name: /Live ICD/ }).getAttribute("href")).toBe("/api/systems/sys_1/icd.html");

    fireEvent.change(screen.getByLabelText("Snapshot name"), { target: { value: " CDR " } });
    fireEvent.click(screen.getByRole("button", { name: /Take snapshot/ }));
    expect(await screen.findByText("1 unreviewed")).toBeTruthy();
    const post = calls.find(([url, init]) => url.endsWith("/snapshots") && init.method === "POST")!;
    expect(JSON.parse(String(post[1].body))).toEqual({ name: "CDR", note: "" });
    expect(new Headers(post[1].headers).get("If-Match")).toBe('"sys:sys_1:3"');
    await waitFor(() => expect(calls.filter(([url]) => url.includes("/history"))).toHaveLength(2));
    expect(screen.getByRole("link", { name: "ICD of CDR" }).getAttribute("href")).toBe("/api/systems/sys_1/snapshots/ssn_1/icd.html");

    fireEvent.click(screen.getByRole("button", { name: "Compare CDR" }));
    expect(await screen.findByText("rebased")).toBeTruthy();
    expect(calls.some(([url]) => url.endsWith("/snapshots/ssn_1/diff?against=live"))).toBe(true);
  });

  it("hides snapshot creation from viewers", async () => {
    vi.stubGlobal("fetch", vi.fn(async (url: string) => new Response(JSON.stringify(url.includes("history") ? { events: [], nextCursor: null } : []), {
      status: 200, headers: { "Content-Type": "application/json" },
    })));
    render(<HistoryTab systemId="sys_1" document={doc} etag="e" canEdit={false} user={null} reload={vi.fn()} onNavigate={vi.fn()} />);
    expect(await screen.findByText("No snapshots yet.")).toBeTruthy();
    expect(screen.queryByLabelText("Snapshot name")).toBeNull();
  });
});
