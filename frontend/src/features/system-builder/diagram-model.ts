/**
 * Pure mapping between the system document and the diagram canvas (D10):
 * one node per board instance, one handle per exposed port, one edge per
 * link. Kept free of React Flow so it can be tested without a canvas.
 */

import type { LayoutPositions } from "@/lib/systems-api";
import type { SystemDocument, SystemInstance, SystemLink } from "@/types/system";

export const NODE_WIDTH = 220;
const COLUMN_GAP = 140;
const ROW_GAP = 80;
const HEADER_HEIGHT = 52;
const PORT_HEIGHT = 24;
const COLUMNS = 3;

export interface DiagramPort {
  portKey: string;
  reference: string;
  /** Some link end uses it. */
  linked: boolean;
  /** Present only because a link needs it; the port is no longer exposed at the baseline. */
  orphan: boolean;
}

export interface DiagramNodeData extends Record<string, unknown> {
  instance: SystemInstance;
  ports: DiagramPort[];
}

export interface DiagramNode {
  id: string;
  position: { x: number; y: number };
  data: DiagramNodeData;
}

export interface DiagramEdge {
  id: string;
  source: string;
  sourceHandle: string;
  target: string;
  targetHandle: string;
  label: string;
  harness: string | null;
  rowCount: number;
}

/** A handle for a link end whose port the board no longer shows; the edge still renders. */
export const FALLBACK_HANDLE = "__board__";

export type Side = "l" | "r";

/** Every port has a handle on each side; edges use the sides facing each other. */
export function handleId(side: Side, portKey: string): string {
  return `${side}:${portKey}`;
}

export function portKeyOf(handle: string | null | undefined): string | null {
  if (!handle || handle.length < 3 || handle[1] !== ":") {
    return null;
  }
  const key = handle.slice(2);
  return key === FALLBACK_HANDLE ? null : key;
}

export function nodeHeight(portCount: number): number {
  return HEADER_HEIGHT + Math.max(1, portCount) * PORT_HEIGHT + 12;
}

/** Ports to draw on a board: exposed ones, plus any a link uses. */
export function diagramPorts(document: SystemDocument, instance: SystemInstance): DiagramPort[] {
  const used = new Map<string, string>();
  for (const link of document.links) {
    for (const end of [link.a, link.b]) {
      if (end.instanceId === instance.id && end.port) {
        used.set(end.port.portKey, end.port.reference);
      }
    }
  }
  const ports: DiagramPort[] = [];
  for (const port of instance.ports ?? []) {
    if (port.exposed) {
      ports.push({ portKey: port.portKey, reference: port.reference, linked: used.has(port.portKey), orphan: false });
    }
  }
  const drawn = new Set(ports.map((port) => port.portKey));
  for (const [portKey, reference] of used) {
    if (!drawn.has(portKey) && instance.ports !== null) {
      ports.push({ portKey, reference, linked: true, orphan: true });
    }
  }
  return ports.sort((a, b) => a.reference.localeCompare(b.reference, undefined, { numeric: true }));
}

/** Default grid position for the n-th board, used until the user drags it. */
export function gridPosition(index: number, heights: number[]): { x: number; y: number } {
  const column = index % COLUMNS;
  const row = Math.floor(index / COLUMNS);
  let y = 0;
  for (let r = 0; r < row; r += 1) {
    const rowHeights = heights.slice(r * COLUMNS, r * COLUMNS + COLUMNS);
    y += Math.max(...rowHeights) + ROW_GAP;
  }
  return { x: column * (NODE_WIDTH + COLUMN_GAP), y };
}

export function buildNodes(document: SystemDocument, positions: LayoutPositions): DiagramNode[] {
  const ports = document.instances.map((instance) => diagramPorts(document, instance));
  const heights = ports.map((list) => nodeHeight(list.length));
  return document.instances.map((instance, index) => ({
    id: instance.id,
    position: positions[instance.id] ?? gridPosition(index, heights),
    data: { instance, ports: ports[index] },
  }));
}

function endHandle(document: SystemDocument, link: SystemLink, end: "a" | "b", side: Side): string {
  const port = link[end].port;
  const instance = document.instances.find((candidate) => candidate.id === link[end].instanceId);
  if (!port || !instance || instance.ports === null) {
    return handleId(side, FALLBACK_HANDLE);
  }
  return handleId(side, port.portKey);
}

export function edgeLabel(link: SystemLink): string {
  const ends = [link.a.port?.reference ?? "restricted", link.b.port?.reference ?? "restricted"].join(" ↔ ");
  const name = link.name || ends;
  return `${name} · ${link.rows.length} ${link.rows.length === 1 ? "pin" : "pins"}`;
}

/** Edges between the facing sides of their boards (a board linked to itself loops on the right). */
export function buildEdges(document: SystemDocument, nodes: Pick<DiagramNode, "id" | "position">[]): DiagramEdge[] {
  const x = new Map(nodes.map((node) => [node.id, node.position.x]));
  return document.links.map((link) => {
    const ax = x.get(link.a.instanceId) ?? 0;
    const bx = x.get(link.b.instanceId) ?? 0;
    const [aSide, bSide]: [Side, Side] = link.a.instanceId === link.b.instanceId ? ["r", "r"] : ax <= bx ? ["r", "l"] : ["l", "r"];
    return {
      id: link.id,
      source: link.a.instanceId,
      sourceHandle: endHandle(document, link, "a", aSide),
      target: link.b.instanceId,
      targetHandle: endHandle(document, link, "b", bSide),
      label: edgeLabel(link),
      harness: link.harness,
      rowCount: link.rows.length,
    };
  });
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
