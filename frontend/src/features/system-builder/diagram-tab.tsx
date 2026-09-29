import { useEffect, useState } from "react";
import {
  Background,
  BaseEdge,
  ConnectionMode,
  Controls,
  EdgeLabelRenderer,
  Handle,
  Position,
  ReactFlow,
  type Connection,
  type Edge,
  type EdgeProps,
  type Node,
  type NodeChange,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { toast } from "sonner";
import { ChevronDown, LayoutGrid, Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createLink, getLayout, putLayout, type LayoutPositions } from "@/lib/systems-api";
import { cn } from "@/lib/utils";

import {
  HEADER_HEIGHT,
  NODE_WIDTH,
  ROW_HEIGHT,
  buildDiagram,
  connectionToLink,
  handleId,
  type DiagramEdgeData,
  type DiagramNodeData,
} from "./diagram-model";
import { wirePoints } from "./system-layout";
import type { SystemTabProps } from "./system-tab-content";
import { TONE_BADGE, boardStatus } from "./system-format";
import { useSystemMutation } from "./use-system-mutation";

type BoardNode = Node<DiagramNodeData & { height: number; onToggle: (id: string) => void }, "board">;
type WireEdge = Edge<DiagramEdgeData & { hovered: boolean }, "wire">;

const HANDLE_CLASS = "!h-2 !w-2 !min-h-0 !min-w-0 !border !border-background !bg-primary";

function BoardNodeView({ id, data, isConnectable, selected }: NodeProps<BoardNode>) {
  const { instance, rows, hiddenCount, expanded, height, onToggle } = data;
  const status = boardStatus(instance);
  return (
    <div className={cn("relative border bg-card text-card-foreground shadow-sm", selected ? "border-primary" : "border-border")}
      style={{ width: NODE_WIDTH, height }}>
      <div className="flex items-center gap-2 border-b bg-muted/40 px-3" style={{ height: HEADER_HEIGHT }}>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 truncate text-sm font-semibold">
            {instance.restricted && <Lock className="h-3 w-3" aria-label="restricted" />}
            {instance.label}
          </p>
          <p className="truncate text-[11px] text-muted-foreground">{instance.projectName ?? status.label}</p>
        </div>
        {status.tone !== "ok" && (
          <Badge variant={TONE_BADGE[status.tone]} className="h-5 shrink-0 px-1.5 text-[10px]" title={status.detail}>{status.label}</Badge>
        )}
      </div>
      {rows.length === 0 && (
        <p className="px-3 text-[11px] text-muted-foreground" style={{ lineHeight: `${ROW_HEIGHT}px` }}>
          {instance.restricted ? "Restricted" : instance.interface?.status === "ready" ? "No links yet" : status.label}
        </p>
      )}
      {rows.map((row, index) => {
        const top = HEADER_HEIGHT + index * ROW_HEIGHT;
        return (
          <div key={row.portKey ?? "restricted"}
            className={cn("absolute inset-x-0 flex items-center gap-2 px-3 text-xs", index > 0 && "border-t border-border/50")}
            style={{ top, height: ROW_HEIGHT }}
            title={row.orphan ? "This linked port is no longer exposed at the baseline" : row.partners.join(", ") || undefined}>
            <span className={cn("shrink-0 font-mono", row.linked ? "font-semibold" : "text-muted-foreground", row.orphan && "text-warning")}>
              {row.reference}
            </span>
            {row.partners.length > 0 && (
              <span className="min-w-0 flex-1 truncate text-right text-[11px] text-muted-foreground">
                ↔ {row.partners.join(", ")}
              </span>
            )}
            {(["l", "r"] as const).map((side) => (
              <Handle
                key={side}
                id={handleId(side, row.portKey)}
                type="source"
                position={side === "l" ? Position.Left : Position.Right}
                isConnectable={isConnectable && row.portKey !== null && !row.orphan}
                className={HANDLE_CLASS}
                aria-label={`${instance.label} ${row.reference} ${side === "l" ? "left" : "right"}`}
              />
            ))}
          </div>
        );
      })}
      {hiddenCount > 0 && (
        <button type="button" onClick={() => onToggle(id)}
          className="nodrag absolute inset-x-0 bottom-0 flex h-7 items-center justify-center gap-1 border-t text-[11px] text-muted-foreground hover:bg-muted/50 hover:text-foreground">
          {expanded ? "Hide unlinked ports" : `${hiddenCount} unlinked ${hiddenCount === 1 ? "port" : "ports"}`}
          <ChevronDown className={cn("h-3 w-3", expanded && "rotate-180")} />
        </button>
      )}
    </div>
  );
}

function WireEdgeView({ id, sourceX, sourceY, targetX, targetY, data, selected }: EdgeProps<WireEdge>) {
  const points = wirePoints(data!.wire, { x: sourceX, y: sourceY }, { x: targetX, y: targetY });
  const path = points.map((point, index) => `${index ? "L" : "M"}${point.x},${point.y}`).join(" ");
  const middle = points.length === 4 ? { x: points[1].x, y: (points[1].y + points[2].y) / 2 } : { x: (sourceX + targetX) / 2, y: sourceY };
  const active = selected || data!.hovered;
  return (
    <>
      <BaseEdge id={id} path={path} interactionWidth={14}
        style={{ strokeWidth: active ? 2.5 : 1.5, stroke: active ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }} />
      {active && (
        <EdgeLabelRenderer>
          <div className="nodrag nopan pointer-events-none absolute border bg-popover px-2 py-1 text-[11px] text-popover-foreground shadow-sm"
            style={{ transform: `translate(-50%, -120%) translate(${middle.x}px, ${middle.y}px)` }}>
            {data!.label}{data!.harness ? ` · harness ${data!.harness}` : ""}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

const NODE_TYPES = { board: BoardNodeView };
const EDGE_TYPES = { wire: WireEdgeView };

interface NodeOverride {
  position?: { x: number; y: number };
  measured?: { width?: number; height?: number };
  selected?: boolean;
  dragging?: boolean;
}

/** Fold React Flow's node changes into per-node overrides of the derived nodes. */
export function applyOverrides(current: Record<string, NodeOverride>, changes: NodeChange[]): Record<string, NodeOverride> {
  const next = { ...current };
  for (const change of changes) {
    if (!("id" in change)) {
      continue;
    }
    const entry = { ...next[change.id] };
    if (change.type === "position") {
      if (change.position) entry.position = change.position;
      entry.dragging = change.dragging;
    } else if (change.type === "dimensions") {
      if (change.dimensions) entry.measured = change.dimensions;
    } else if (change.type === "select") {
      entry.selected = change.selected;
    } else {
      continue;
    }
    next[change.id] = entry;
  }
  return next;
}

export function DiagramTab({ systemId, document, etag, canEdit, reload, onNavigate }: SystemTabProps) {
  const [layout, setLayout] = useState<{ systemId: string; positions: LayoutPositions } | null>(null);
  const [overrides, setOverrides] = useState<Record<string, NodeOverride>>({});
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [hovered, setHovered] = useState<string | null>(null);
  const { run } = useSystemMutation(reload);

  // The saved layout is a separate, unversioned read (§1 invariant 6).
  useEffect(() => {
    let cancelled = false;
    getLayout(systemId)
      .then((positions) => !cancelled && setLayout({ systemId, positions }))
      .catch(() => !cancelled && setLayout({ systemId, positions: {} }));
    return () => {
      cancelled = true;
    };
  }, [systemId]);

  if (layout?.systemId !== systemId) {
    return <div className="p-6 text-sm text-muted-foreground">Loading diagram…</div>;
  }

  // Positions being dragged count as placed, so wires re-route while dragging.
  const live: LayoutPositions = { ...layout.positions };
  for (const [id, extra] of Object.entries(overrides)) {
    if (extra.position) live[id] = extra.position;
  }
  const diagram = buildDiagram(document, live, expanded);
  const toggle = (id: string) => setExpanded((current) => {
    const next = new Set(current);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });
  const nodes: BoardNode[] = diagram.nodes.map((node) => {
    const extra = overrides[node.id] ?? {};
    return {
      id: node.id,
      type: "board",
      position: node.position,
      data: { ...node.data, height: node.height, onToggle: toggle },
      measured: extra.measured,
      selected: extra.selected,
      dragging: extra.dragging,
      width: NODE_WIDTH,
      height: node.height,
    };
  });
  const edges: WireEdge[] = diagram.edges.map((edge) => ({
    id: edge.id,
    type: "wire",
    source: edge.source,
    sourceHandle: edge.sourceHandle,
    target: edge.target,
    targetHandle: edge.targetHandle,
    data: { ...edge.data, hovered: hovered === edge.id },
  }));

  const savePositions = (positions: LayoutPositions) =>
    putLayout(systemId, positions)
      .then((saved) => {
        setLayout({ systemId, positions: saved });
        setOverrides({});
      })
      .catch(() => toast.error("Could not save the layout"));

  const saveLayout = (moved: BoardNode) => {
    void savePositions(Object.fromEntries(nodes.map((node) => [node.id, node.id === moved.id ? moved.position : node.position])));
  };

  const connect = (connection: Connection) => {
    const request = connectionToLink(connection);
    if ("error" in request) {
      toast.error(request.error);
      return;
    }
    void run("link", () => createLink(systemId, etag, request), "Link created").then((created) => {
      if (created) {
        onNavigate("connectivity", { link: created.body.id });
      }
    });
  };

  const dark = typeof window !== "undefined" && window.document.documentElement.classList.contains("dark");
  const arranged = Object.keys(layout.positions).length > 0;

  return (
    <div className="flex h-full min-h-[32rem] flex-col">
      <div className="flex items-center gap-3 border-b px-4 py-2 md:px-6">
        <p className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
          {canEdit
            ? "Drag between ports to link them. Hover a wire to see it; click it to edit its pins."
            : "Hover a wire to see it; click it to see its pins."}
        </p>
        {canEdit && arranged && (
          <Button variant="outline" size="sm" className="h-7" onClick={() => void savePositions({})}
            title="Discard the saved arrangement and place boards automatically">
            <LayoutGrid className="mr-1 h-3.5 w-3.5" /> Auto-arrange
          </Button>
        )}
      </div>
      <div className="min-h-0 flex-1" data-testid="system-diagram">
        {document.instances.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">Add boards on the Boards tab to see them here.</p>
        ) : (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={NODE_TYPES}
            edgeTypes={EDGE_TYPES}
            colorMode={dark ? "dark" : "light"}
            connectionMode={ConnectionMode.Loose}
            nodesDraggable={canEdit}
            nodesConnectable={canEdit}
            elementsSelectable
            onNodesChange={(changes) => setOverrides((current) => applyOverrides(current, changes))}
            onNodeDragStop={(_event, node) => saveLayout(node)}
            onConnect={connect}
            onEdgeClick={(_event, edge) => onNavigate("connectivity", { link: edge.id })}
            onEdgeMouseEnter={(_event, edge) => setHovered(edge.id)}
            onEdgeMouseLeave={() => setHovered(null)}
            fitView
            fitViewOptions={{ padding: 0.15 }}
            minZoom={0.2}
          >
            <Background gap={16} />
            <Controls showInteractive={false} />
          </ReactFlow>
        )}
      </div>
    </div>
  );
}
