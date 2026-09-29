import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { LinkEditor } from "./link-editor";
import { instance, link, systemDocument } from "./test-fixtures";

afterEach(() => vi.unstubAllGlobals());

const a = instance("OBC");
const b = instance("PAY");
const theLink = link("L1", a.id, "J1", b.id, "J1", 2);
const doc = systemDocument([a, b], [theLink]);

function iface(instanceId: string) {
  return {
    instanceId, atBaseline: true, projectId: "p", commit: "c", digest: "d", hasPcb: true,
    components: [{
      portKey: "key-J1", memberKeys: ["key-J1"], reference: "J1", libId: null, footprint: null, value: null, dnp: false,
      candidate: true, candidateReason: null, override: null, exposed: true,
      pins: ["1", "2", "3"].map((pad) => ({ pad, nets: [`/X/NET${pad}`], pinNames: [`P${pad}`], pinTypes: null })),
    }],
  };
}

function stubApi() {
  const calls: [string, RequestInit][] = [];
  vi.stubGlobal("fetch", vi.fn(async (url: string, init: RequestInit = {}) => {
    calls.push([url, init]);
    const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
      status, headers: { "Content-Type": "application/json", ETag: '"sys:sys_1:2"' },
    });
    if (url.endsWith("/interface")) return json(iface(url.split("/")[5]));
    if (url.endsWith("/rows")) return json(theLink);
    if (url.endsWith("/generate")) {
      return json({ linkId: "L1", generator: "identity", skipped: [{ pinA: "1", pinB: "1", reason: "existing" }],
        rows: [{ pinA: "3", pinB: "3", signal: "NET3", source: "generator", netA: ["/X/NET3"], netB: ["/X/NET3"], pinNamesA: null, pinNamesB: null }] });
    }
    return json({});
  }));
  return calls;
}

function renderEditor(canEdit = true) {
  const run = vi.fn(async (_label: string, action: () => Promise<unknown>) => action());
  render(<LinkEditor systemId="sys_1" document={doc} link={theLink} etag='"sys:sys_1:1"' canEdit={canEdit}
    findings={[]} busy={null} run={run as never} onDeleted={vi.fn()} />);
  return run;
}

describe("LinkEditor", () => {
  it("adds a row with a signal from net A and saves every row with its id", async () => {
    const calls = stubApi();
    renderEditor();
    await waitFor(() => expect(screen.getByLabelText("New row pin A").querySelectorAll("option")).toHaveLength(4));
    fireEvent.change(screen.getByLabelText("New row pin A"), { target: { value: "3" } });
    fireEvent.change(screen.getByLabelText("New row pin B"), { target: { value: "3" } });
    fireEvent.click(screen.getByRole("button", { name: /Add row/ }));
    expect(screen.getByText(/Unsaved changes: 3 rows/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Save pins" }));
    await waitFor(() => expect(calls.some(([url]) => url.endsWith("/rows"))).toBe(true));
    const [, init] = calls.find(([url]) => url.endsWith("/rows"))!;
    expect(init.method).toBe("PUT");
    expect(new Headers(init.headers).get("If-Match")).toBe('"sys:sys_1:1"');
    expect(JSON.parse(String(init.body))).toEqual([
      { id: "L1-r0", pinA: "1", pinB: "1", signal: "S0", source: "manual" },
      { id: "L1-r1", pinA: "2", pinB: "2", signal: "S1", source: "manual" },
      { pinA: "3", pinB: "3", signal: "NET3", source: "manual" },
    ]);
  });

  it("blocks saving a duplicate pair", async () => {
    stubApi();
    renderEditor();
    await waitFor(() => expect(screen.getByLabelText("New row pin A").querySelectorAll("option")).toHaveLength(4));
    fireEvent.change(screen.getByLabelText("New row pin A"), { target: { value: "1" } });
    fireEvent.change(screen.getByLabelText("New row pin B"), { target: { value: "1" } });
    fireEvent.click(screen.getByRole("button", { name: /Add row/ }));
    expect(screen.getByText(/1 to fix before saving/)).toBeTruthy();
    expect((screen.getByRole("button", { name: "Save pins" }) as HTMLButtonElement).disabled).toBe(true);
  });

  it("previews a generator and approves its rows into the draft", async () => {
    stubApi();
    renderEditor();
    fireEvent.click(screen.getByRole("button", { name: /Preview/ }));
    expect(await screen.findByText(/1 proposed · 1 skipped \(already used\)/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Add 1 to the draft" }));
    expect(screen.getByText(/Unsaved changes: 3 rows/)).toBeTruthy();
  });

  it("is read-only for viewers", () => {
    stubApi();
    renderEditor(false);
    expect(screen.queryByRole("button", { name: /Add row/ })).toBeNull();
    expect(screen.queryByRole("button", { name: /Delete link/ })).toBeNull();
    expect(screen.queryByLabelText(/Signal for/)).toBeNull();
  });
});
