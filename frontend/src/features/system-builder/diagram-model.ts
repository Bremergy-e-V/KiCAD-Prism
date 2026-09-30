/**
 * Pure mapping between the system document and the diagram canvas (D10):
 * one node per board instance, one row per linked port, one edge per link.
 * Placement, row order and wire lanes come from `system-layout.ts`. Kept free
 * of React Flow so it can be tested without a canvas.
 */

import type { LayoutPositions } from "@/lib/systems-api";
import type { SystemDocument, SystemInstance, SystemLink, SystemOccurrence } from "@/types/system";

import {
  BOARD_WIDTH,
  HEADER_HEIGHT,
  ROW_HEIGHT,
  boardHeight,
  layoutSystem,
  routeWires,
  rowKey,
  type LayoutBoardInput,
  type LayoutLinkInput,
  type LayoutRow,
  type Side,
  type Wire,
} from "./system-layout";

export { BOARD_WIDTH as NODE_WIDTH, HEADER_HEIGHT, ROW_HEIGHT };
export type { Side };

export interface DiagramRow {
  /** `null` for link ends whose port cannot be shown (restricted, or gone). */
  portKey: string | null;
  reference: string;
  /** Other ends, as "OBC-1 J14". Empty for an unlinked port. */
  partners: string[];
  linked: boolean;
  /** A linked port that is no longer exposed at the baseline. */
  orphan: boolean;
  /** The export name when this port is published to parent systems (CONTRACTS_P2 §4). */
  exportName?: string;
}

export interface DiagramNodeData extends Record<string, unknown> {
  instance: SystemInstance;
  rows: DiagramRow[];
  /** Unlinked exposed ports not drawn as rows until the board is expanded. */
  hiddenCount: number;
  expanded: boolean;
}

export interface DiagramNode {
  id: string;
  position: { x: number; y: number };
  height: number;
  data: DiagramNodeData;
}

export interface DiagramEdgeData extends Record<string, unknown> {
  wire: Pick<Wire, "kind" | "lane" | "loopOffset">;
  label: string;
  harness: string | null;
}

export interface DiagramEdge {
  id: string;
  source: string;
  sourceHandle: string;
  target: string;
  targetHandle: string;
  data: DiagramEdgeData;
}

/** A handle for a link end whose port the board cannot show; its row reads "restricted". */
export const FALLBACK_HANDLE = "__board__";

export function handleId(side: Side, portKey: string | null): string {
  return `${side}:${portKey ?? FALLBACK_HANDLE}`;
}

export function portKeyOf(handle: string | null | undefined): string | null {
  if (!handle || handle.length < 3 || handle[1] !== ":") {
    return null;
  }
  const key = handle.slice(2);
  return key === FALLBACK_HANDLE ? null : key;
}

export function nodeHeight(rowCount: number, hiddenCount: number, expanded = false): number {
  return boardHeight(rowCount + (expanded ? hiddenCount : 0), hiddenCount);
}

/** Ports a board may show: exposed ones, plus any a link still uses. */
function drawablePorts(document: SystemDocument, instance: SystemInstance) {
  if (instance.ports === null) {
    return { ports: [], orphans: new Set<string>() };
  }
  const exposed: { portKey: string; reference: string }[] = [];
  for (const port of instance.ports) {
    if (port.exposed) exposed.push({ portKey: port.portKey, reference: port.reference });
  }
  const known = new Set(exposed.map((port) => port.portKey));
  const orphans = new Set<string>();
  for (const link of document.links) {
    for (const end of [link.a, link.b]) {
      const key = end.port?.portKey;
      if (end.instanceId === instance.id && end.port && key && !known.has(key)) {
        known.add(key);
        orphans.add(key);
        exposed.push({ portKey: key, reference: end.port.reference });
      }
    }
  }
  return { ports: exposed, orphans };
}

function linkEnd(document: SystemDocument, link: SystemLink, end: "a" | "b") {
  const instance = document.instances.find((candidate) => candidate.id === link[end].instanceId);
  const port = instance?.ports === null ? null : link[end].port;
  return { board: link[end].instanceId, portKey: port?.portKey ?? null, reference: port?.reference ?? null };
}

export function layoutInputs(document: SystemDocument): { boards: LayoutBoardInput[]; links: LayoutLinkInput[] } {
  return {
    boards: document.instances.map((instance) => ({
      id: instance.id,
      label: instance.label,
      ports: drawablePorts(document, instance).ports,
    })),
    links: document.links.map((link) => ({
      id: link.id,
      name: link.name,
      a: linkEnd(document, link, "a"),
      b: linkEnd(document, link, "b"),
      rowCount: link.rows.length,
    })),
  };
}

export function edgeLabel(link: SystemLink): string {
  const ends = [link.a.port?.reference ?? "restricted", link.b.port?.reference ?? "restricted"].join(" ↔ ");
  const name = link.name || ends;
  return `${name} · ${link.rows.length} ${link.rows.length === 1 ? "pin" : "pins"}`;
}

function partnerText(row: LayoutRow): string[] {
  return row.partners.map((partner) => `${partner.boardLabel} ${partner.reference ?? "restricted"}`);
}

/**
 * Nodes and edges for the canvas. Saved `positions` win; boards without one
 * take the default layout. `expanded` boards also list their unlinked ports.
 */
export function buildDiagram(
  document: SystemDocument,
  positions: LayoutPositions,
  expanded: ReadonlySet<string> = new Set(),
): { nodes: DiagramNode[]; edges: DiagramEdge[] } {
  const inputs = layoutInputs(document);
  const layout = layoutSystem(inputs.boards, inputs.links, positions);
  const nodes = document.instances.map((instance) => {
    const placed = layout.get(instance.id)!;
    const { orphans } = drawablePorts(document, instance);
    const open = expanded.has(instance.id);
    const exported = new Map<string, string>();
    for (const entry of document.exports ?? []) {
      if (entry.instanceId === instance.id && entry.portKey !== null) exported.set(entry.portKey, entry.name);
    }
    const rows: DiagramRow[] = placed.rows.map((row) => ({
      portKey: row.portKey,
      reference: row.reference,
      partners: partnerText(row),
      linked: true,
      orphan: row.portKey !== null && orphans.has(row.portKey),
    }));
    // Exported ports are always shown: they are this board's connections to the parent system.
    const hidden = placed.hiddenPorts.filter((port) => !exported.has(port.portKey));
    for (const port of placed.hiddenPorts) {
      if (exported.has(port.portKey)) {
        rows.push({ portKey: port.portKey, reference: port.reference, partners: [], linked: false, orphan: false,
          exportName: exported.get(port.portKey) });
      }
    }
    if (open) {
      for (const port of hidden) {
        rows.push({ portKey: port.portKey, reference: port.reference, partners: [], linked: false, orphan: false });
      }
    }
    return {
      id: instance.id,
      position: { x: placed.x, y: placed.y },
      height: nodeHeight(placed.rows.length + placed.hiddenPorts.length - hidden.length, hidden.length, open),
      data: { instance, rows, hiddenCount: hidden.length, expanded: open },
    };
  });
  const labels = new Map(document.links.map((link) => [link.id, link]));
  const edges = routeWires(layout, inputs.links).map((wire) => {
    const link = labels.get(wire.linkId)!;
    const handle = (end: Wire["source"]) => handleId(end.side, end.rowKey === rowKey(null) ? null : end.rowKey);
    return {
      id: wire.linkId,
      source: wire.source.board,
      sourceHandle: handle(wire.source),
      target: wire.target.board,
      targetHandle: handle(wire.target),
      data: {
        wire: { kind: wire.kind, lane: wire.lane, loopOffset: wire.loopOffset },
        label: edgeLabel(link),
        harness: link.harness,
      },
    };
  });
  return { nodes, edges };
}

export interface ConnectionLike {
  source: string | null;
  sourceHandle?: string | null;
  target: string | null;
  targetHandle?: string | null;
}

/** The link a dragged connection asks for, or why it cannot be one. */
export function connectionToLink(
  connection: ConnectionLike,
): { a: { instanceId: string; portKey: string }; b: { instanceId: string; portKey: string } } | { error: string } {
  const { source, target } = connection;
  const sourceKey = portKeyOf(connection.sourceHandle);
  const targetKey = portKeyOf(connection.targetHandle);
  if (!source || !target || !sourceKey || !targetKey) {
    return { error: "Connect one port to another." };
  }
  if (source === target && sourceKey === targetKey) {
    return { error: "A link needs two different ports." };
  }
  return { a: { instanceId: source, portKey: sourceKey }, b: { instanceId: target, portKey: targetKey } };
}

/** What a subsystem holds, for its in-place contents panel (from `GET …/hierarchy`). */
export interface InsideEntry {
  path: string;
  label: string;
  kind: string;
  depth: number;
  restricted: boolean;
}

/** The occurrences under subsystem instance `instanceId` of the root, in hierarchy order. */
export function subsystemContents(occurrences: SystemOccurrence[], instanceId: string): InsideEntry[] {
  const prefix = `/${instanceId}/`;
  return occurrences.flatMap((o) => (o.path.startsWith(prefix)
    ? [{ path: o.path, label: o.labels[o.labels.length - 1], kind: o.kind, depth: o.depth, restricted: o.restricted }]
    : []));
}
