import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { chooseMenuItem, chooseOption } from "@/test/select";
import type { PortMating, SystemLink } from "@/types/system";

import { LinkEditor } from "./link-editor";
import { matingSummary } from "./mating-panel";
import { instance, link, systemDocument } from "./test-fixtures";

afterEach(() => vi.unstubAllGlobals());

const obc = instance("OBC");
const cmbd = instance("CMBD");

function port(patch: Partial<PortMating> = {}): PortMating {
  return {
    portKey: "key-J1", reference: "J1", footprint: "F:X", hasGeometry: true,
    inferred: { axis: "top", confidence: "medium", reasons: ["body_over_pads"] }, stored: null, ...patch,
  };
}

function stubApi(ports: Record<string, PortMating>) {
  const calls: [string, RequestInit][] = [];
  vi.stubGlobal("fetch", vi.fn(async (url: string, init: RequestInit = {}) => {
    calls.push([url, init]);
    const json = (body: unknown) => new Response(JSON.stringify(body), {
      status: 200, headers: { "Content-Type": "application/json", ETag: '"sys:sys_1:2"' },
    });
    const mating = url.match(/instances\/([^/]+)\/mating$/);
    if (mating) return json({ instanceId: mating[1], boardThicknessMm: 1.6, ports: [ports[mating[1]]] });
    if (url.includes("/interface")) return json({ components: [] });
    return json({});
  }));
  return calls;
}

function renderEditor(theLink: SystemLink = { ...link("L1", obc.id, "J1", cmbd.id, "J1", 1), type: "b2b", stackHeightMm: 8 }) {
  const run = vi.fn(async (_label: string, action: () => Promise<unknown>) => action());
  render(<LinkEditor systemId="sys_1" document={systemDocument([obc, cmbd], [theLink])} link={theLink}
    etag='"sys:sys_1:1"' canEdit findings={[]} busy={null} run={run as never} onDeleted={vi.fn()} />);
}

describe("matingSummary", () => {
  it("reads stored, inferred and missing frames", () => {
    expect(matingSummary(port())).toEqual({ label: "Inferred (medium): Vertical, top side", tone: "info" });
    expect(matingSummary(port({ stored: { mode: "override", axis: "+x", quarterTurns: 1, stale: false } })))
      .toEqual({ label: "Set by hand: Right-angle, footprint +X · turned 90°", tone: "ok" });
    expect(matingSummary(port({ stored: { mode: "confirmed", axis: "top", quarterTurns: 0, stale: true } })).tone).toBe("warn");
    expect(matingSummary(port({ inferred: { axis: null, confidence: "low", reasons: ["no_courtyard"] } })))
      .toEqual({ label: "Mating details needed", tone: "warn" });
  });
});

describe("board-to-board link details", () => {
  it("shows both ends' frames and confirms an inferred one", async () => {
    const calls = stubApi({
      [obc.id]: port(),
      [cmbd.id]: port({ inferred: { axis: null, confidence: "low", reasons: ["too_few_pads"] } }),
    });
    renderEditor();
    expect(screen.getByText("Board-to-board")).toBeTruthy();
    expect(screen.getByText(/stack height 8 mm/)).toBeTruthy();
    await screen.findByText("Inferred (medium): Vertical, top side");
    expect(await screen.findByText("Mating details needed")).toBeTruthy();
    expect(screen.getAllByRole("button", { name: "Confirm" })).toHaveLength(1); // nothing to confirm on a low inference
    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));
    await waitFor(() => expect(calls.some(([, init]) => init.method === "PUT")).toBe(true));
    const [url, init] = calls.find(([, i]) => i.method === "PUT")!;
    expect([url, JSON.parse(String(init.body))]).toEqual([`/api/systems/sys_1/instances/${obc.id}/mating/key-J1`, { mode: "confirmed" }]);
  });

  it("sets a frame by hand with a direction and a turn", async () => {
    const calls = stubApi({ [obc.id]: port(), [cmbd.id]: port() });
    renderEditor();
    await screen.findAllByText("Inferred (medium): Vertical, top side");
    fireEvent.click(screen.getAllByRole("button", { name: "Set by hand" })[1]);
    await chooseOption("Mating direction B", "Right-angle, footprint −Y");
    await chooseOption("Turn about the mating axis B", "270°");
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    await waitFor(() => expect(calls.some(([, init]) => init.method === "PUT")).toBe(true));
    const [url, init] = calls.find(([, i]) => i.method === "PUT")!;
    expect([url, JSON.parse(String(init.body))]).toEqual([
      `/api/systems/sys_1/instances/${cmbd.id}/mating/key-J1`, { mode: "override", axis: "-y", quarterTurns: 3 }]);
  });

  it("changes the type and stack height in the details dialog", async () => {
    const calls = stubApi({ [obc.id]: port(), [cmbd.id]: port() });
    renderEditor(link("L1", obc.id, "J1", cmbd.id, "J1", 1));
    expect(screen.queryByRole("region", { name: "Mating" })).toBeNull();
    await chooseMenuItem("Link actions", /Edit details/);
    await chooseOption("Link type", /Board-to-board/);
    fireEvent.change(screen.getByLabelText("Stack height (mm)"), { target: { value: "11.5" } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    await waitFor(() => expect(calls.some(([, init]) => init.method === "PATCH")).toBe(true));
    const [url, init] = calls.find(([, i]) => i.method === "PATCH")!;
    expect([url, JSON.parse(String(init.body))]).toEqual(["/api/systems/sys_1/links/L1",
      { name: "L1", harness: null, type: "b2b", stackHeightMm: 11.5 }]);
  });
});
