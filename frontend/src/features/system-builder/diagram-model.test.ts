import { describe, expect, it } from "vitest";

import { applyOverrides } from "./diagram-tab";
import {
  FALLBACK_HANDLE,
  buildEdges,
  buildNodes,
  connectionToLink,
  diagramPorts,
  gridPosition,
  handleId,
  nodeHeight,
  portKeyOf,
} from "./diagram-model";
import { instance, link, port, systemDocument } from "./test-fixtures";

const obc = instance("OBC", { ports: [port("J7"), port("J10"), port("J2", { exposed: false, override: "hidden" })] });
const pay = instance("PAY", { ports: [port("J4")] });
const secret = instance("SECRET", { restricted: true, ports: null, projectId: null });

describe("diagramPorts", () => {
  it("draws exposed ports in natural order and marks linked ones", () => {
    const doc = systemDocument([obc, pay], [link("L1", obc.id, "J7", pay.id, "J4", 2)]);
    expect(diagramPorts(doc, obc)).toEqual([
      { portKey: "key-J7", reference: "J7", linked: true, orphan: false },
      { portKey: "key-J10", reference: "J10", linked: false, orphan: false },
    ]);
  });

  it("keeps a linked port that is no longer exposed, as an orphan", () => {
    const doc = systemDocument([obc, pay], [link("L1", obc.id, "J2", pay.id, "J4")]);
    expect(diagramPorts(doc, obc).find((p) => p.reference === "J2")).toEqual(
      { portKey: "key-J2", reference: "J2", linked: true, orphan: true },
    );
  });

  it("draws nothing for a restricted board", () => {
    const doc = systemDocument([obc, secret], [link("L1", obc.id, "J7", secret.id, "J1")]);
    expect(diagramPorts(doc, secret)).toEqual([]);
  });
});

describe("layout", () => {
  it("uses saved positions and falls back to a grid", () => {
    const doc = systemDocument([obc, pay, instance("PWR"), instance("X")]);
    const nodes = buildNodes(doc, { [pay.id]: { x: 5, y: 6 } });
    expect(nodes.map((n) => n.position)).toEqual([
      { x: 0, y: 0 }, { x: 5, y: 6 }, { x: 720, y: 0 }, { x: 0, y: nodeHeight(2) + 80 },
    ]);
    expect(gridPosition(1, [100, 100])).toEqual({ x: 360, y: 0 });
  });
});

describe("edges", () => {
  it("attach to the facing sides and fall back for restricted ends", () => {
    const doc = systemDocument([obc, pay, secret], [
      link("L1", obc.id, "J7", pay.id, "J4", 3),
      link("L2", obc.id, "J10", secret.id, "J1"),
    ]);
    const nodes = [
      { id: obc.id, position: { x: 400, y: 0 } },
      { id: pay.id, position: { x: 0, y: 0 } },
      { id: secret.id, position: { x: 800, y: 0 } },
    ];
    const [l1, l2] = buildEdges(doc, nodes);
    expect([l1.sourceHandle, l1.targetHandle, l1.label]).toEqual(["l:key-J7", "r:key-J4", "L1 · 3 pins"]);
    expect([l2.sourceHandle, l2.targetHandle]).toEqual(["r:key-J10", handleId("l", FALLBACK_HANDLE)]);
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
