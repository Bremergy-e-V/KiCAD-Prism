import { describe, expect, it } from "vitest";

import { applyOverrides } from "./diagram-tab";
import {
  FALLBACK_HANDLE,
  buildDiagram,
  connectionToLink,
  handleId,
  layoutInputs,
  nodeHeight,
  portKeyOf,
  subsystemContents,
} from "./diagram-model";
import { exportOf, instance, link, port, systemDocument } from "./test-fixtures";
import type { SystemOccurrence } from "@/types/system";

const obc = instance("OBC", { ports: [port("J7"), port("J10"), port("J2", { exposed: false, override: "hidden" })] });
const pay = instance("PAY", { ports: [port("J4"), port("J9")] });
const secret = instance("SECRET", { restricted: true, ports: null, projectId: null });

describe("layoutInputs", () => {
  it("offers exposed ports, plus a linked port that is no longer exposed", () => {
    const doc = systemDocument([obc, pay], [link("L1", obc.id, "J2", pay.id, "J4")]);
    const { boards } = layoutInputs(doc);
    expect(boards[0].ports.map((p) => p.reference)).toEqual(["J7", "J10", "J2"]);
  });

  it("gives a restricted board no ports and its link end no port key", () => {
    const doc = systemDocument([obc, secret], [link("L1", obc.id, "J7", secret.id, "J1")]);
    const { boards, links } = layoutInputs(doc);
    expect(boards[1].ports).toEqual([]);
    expect(links[0].b).toEqual({ board: secret.id, portKey: null, reference: null });
  });
});

describe("buildDiagram", () => {
  it("always shows an exported port as a row named after its export", () => {
    const doc = systemDocument([obc, pay], [link("L1", obc.id, "J7", pay.id, "J4", 3)], [exportOf("DEBUG", obc.id, "J10")]);
    const [a] = buildDiagram(doc, {}).nodes;
    expect(a.data.rows.map((row) => [row.reference, row.exportName ?? null])).toEqual([["J7", null], ["J10", "DEBUG"]]);
    expect(a.data.hiddenCount).toBe(0);
    expect(a.height).toBe(nodeHeight(2, 0)); // two rows, no "show unlinked" footer
  });

  it("draws linked ports as rows with their partner, and counts the rest", () => {
    const doc = systemDocument([obc, pay], [link("L1", obc.id, "J7", pay.id, "J4", 3)]);
    const { nodes } = buildDiagram(doc, {});
    const [a, b] = nodes;
    expect(a.data.rows).toEqual([{ portKey: "key-J7", reference: "J7", partners: ["PAY J4"], linked: true, orphan: false }]);
    expect(a.data.hiddenCount).toBe(1);
    expect(b.data.rows.map((row) => row.reference)).toEqual(["J4"]);
    expect(a.position.x).not.toBe(b.position.x);
  });

  it("lists unlinked ports when a board is expanded", () => {
    const doc = systemDocument([obc, pay], [link("L1", obc.id, "J7", pay.id, "J4")]);
    const { nodes } = buildDiagram(doc, {}, new Set([obc.id]));
    expect(nodes[0].data.rows.map((row) => [row.reference, row.linked])).toEqual([["J7", true], ["J10", false]]);
    expect(nodes[0].height).toBeGreaterThan(buildDiagram(doc, {}).nodes[0].height);
  });

  it("marks an orphan row and keeps saved positions", () => {
    const doc = systemDocument([obc, pay], [link("L1", obc.id, "J2", pay.id, "J4")]);
    const { nodes } = buildDiagram(doc, { [pay.id]: { x: 5, y: 6 } });
    expect(nodes[0].data.rows[0].orphan).toBe(true);
    expect(nodes[1].position).toEqual({ x: 5, y: 6 });
  });

  it("wires the facing sides, oriented left to right, with a fallback handle for restricted ends", () => {
    const doc = systemDocument([obc, pay, secret], [
      link("L1", obc.id, "J7", pay.id, "J4", 3),
      link("L2", obc.id, "J10", secret.id, "J1"),
    ]);
    const positions = { [obc.id]: { x: 400, y: 0 }, [pay.id]: { x: 0, y: 0 }, [secret.id]: { x: 800, y: 0 } };
    const { edges } = buildDiagram(doc, positions);
    const [l1, l2] = edges;
    expect([l1.source, l1.sourceHandle, l1.target, l1.targetHandle]).toEqual([pay.id, "r:key-J4", obc.id, "l:key-J7"]);
    expect(l1.data.label).toBe("L1 · 3 pins");
    expect([l2.sourceHandle, l2.targetHandle]).toEqual(["r:key-J10", handleId("l", null)]);
    expect(handleId("l", null)).toBe(`l:${FALLBACK_HANDLE}`);
  });
});

describe("connectionToLink", () => {
  it("strips the side from both handles", () => {
    expect(connectionToLink({ source: "a", sourceHandle: "r:key:with:colons", target: "b", targetHandle: "l:k2" }))
      .toEqual({ a: { instanceId: "a", portKey: "key:with:colons" }, b: { instanceId: "b", portKey: "k2" } });
  });

  it("refuses the same port, missing handles and fallback handles", () => {
    expect(connectionToLink({ source: "a", sourceHandle: "l:k", target: "a", targetHandle: "r:k" })).toHaveProperty("error");
    expect(connectionToLink({ source: "a", sourceHandle: null, target: "b", targetHandle: "l:k" })).toHaveProperty("error");
    expect(connectionToLink({ source: "a", sourceHandle: handleId("r", FALLBACK_HANDLE), target: "b", targetHandle: "l:k" }))
      .toHaveProperty("error");
    expect(portKeyOf("garbage")).toBeNull();
  });
});

describe("applyOverrides", () => {
  it("keeps drags, measurements and selection, ignoring other changes", () => {
    const next = applyOverrides({}, [
      { id: "n1", type: "position", position: { x: 1, y: 2 }, dragging: true },
      { id: "n1", type: "dimensions", dimensions: { width: 10, height: 20 } },
      { id: "n2", type: "select", selected: true },
      { id: "n3", type: "remove" },
    ]);
    expect(next).toEqual({
      n1: { position: { x: 1, y: 2 }, dragging: true, measured: { width: 10, height: 20 } },
      n2: { selected: true },
    });
  });
});

describe("subsystemContents", () => {
  const occurrence = (path: string, kind: "board" | "assembly", restricted = false) => {
    const labels = path.split("/").filter(Boolean);
    return { path, displayPath: labels.join(" ▸ "), labels, instanceId: labels[labels.length - 1], kind, depth: labels.length + 1,
      systemId: "s", projectId: null, baselineCommit: null, componentId: null, restricted } as unknown as SystemOccurrence;
  };

  it("lists what sits under one subsystem, nested levels included, and nothing from its siblings", () => {
    const occurrences = [occurrence("/A", "assembly"), occurrence("/A/OBC", "board"), occurrence("/A/SUB", "assembly"),
      occurrence("/A/SUB/PAY", "board", true), occurrence("/AB", "assembly"), occurrence("/AB/X", "board"), occurrence("/PDU", "board")];
    expect(subsystemContents(occurrences, "A")).toEqual([
      { path: "/A/OBC", label: "OBC", kind: "board", depth: 3, restricted: false },
      { path: "/A/SUB", label: "SUB", kind: "assembly", depth: 3, restricted: false },
      { path: "/A/SUB/PAY", label: "PAY", kind: "board", depth: 4, restricted: true },
    ]);
    expect(subsystemContents(occurrences, "PDU")).toEqual([]);
  });
});
