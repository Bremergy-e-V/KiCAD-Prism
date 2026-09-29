import { useEffect, useState } from "react";
import {
  Background,
  ConnectionMode,
  Controls,
  Handle,
  Position,
  ReactFlow,
  type Connection,
  type Edge,
  type Node,
  type NodeChange,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { toast } from "sonner";
import { Lock } from "lucide-react";

import { createLink, getLayout, putLayout, type LayoutPositions } from "@/lib/systems-api";
import { cn } from "@/lib/utils";

import {
  FALLBACK_HANDLE,
  NODE_WIDTH,
  buildEdges,
  buildNodes,
  connectionToLink,
  handleId,
  nodeHeight,
  type DiagramNodeData,
} from "./diagram-model";
import type { SystemTabProps } from "./system-tab-content";
import { TONE_BADGE, boardStatus } from "./system-format";
import { useSystemMutation } from "./use-system-mutation";

type BoardNode = Node<DiagramNodeData, "board">;

const HEADER = 52;
const ROW = 24;

const TONE_BORDER: Record<string, string> = {
  success: "border-border",
  info: "border-primary/60",
  warning: "border-warning/70",
  destructive: "border-destructive/70",
  outline: "border-border",
};

function BoardNodeView({ data, isConnectable }: NodeProps<BoardNode>) {
  const { instance, ports } = data;
  const status = boardStatus(instance);
  return (
    <div
      className={cn("rounded-lg border-2 bg-card text-card-foreground shadow-sm", TONE_BORDER[TONE_BADGE[status.tone]])}
      style={{ width: NODE_WIDTH, height: nodeHeight(ports.length) }}
    >
      <div className="border-b px-3 py-1.5" style={{ height: HEADER - 8 }}>
        <p className="flex items-center gap-1 truncate text-sm font-semibold">
          {instance.restricted && <Lock className="h-3 w-3" aria-label="restricted" />}
          {instance.label}
        </p>
        <p className="truncate text-[11px] text-muted-foreground">{instance.projectName ?? status.label}</p>
      </div>
      {ports.length === 0 && (
        <p className="px-3 py-1 text-[11px] text-muted-foreground">
          {instance.restricted ? "Restricted" : instance.interface?.status === "ready" ? "No exposed ports" : status.label}
        </p>
      )}
      {ports.map((port, index) => {
        const top = HEADER + index * ROW + ROW / 2;
        return (
          <div key={port.portKey}>
            <div
              className={cn(
                "absolute left-0 right-0 px-3 text-center text-xs",
                port.orphan ? "text-warning" : port.linked ? "font-medium" : "text-muted-foreground",
              )}
              style={{ top: top - 8 }}
              title={port.orphan ? "This linked port is no longer exposed at the baseline" : undefined}
            >
              {port.reference}
            </div>
            {(["l", "r"] as const).map((side) => (
              <Handle
                key={side}
                id={handleId(side, port.portKey)}
                type="source"
                position={side === "l" ? Position.Left : Position.Right}
                isConnectable={isConnectable && !port.orphan}
                style={{ top }}
                className="!h-2.5 !w-2.5 !border-2 !border-background !bg-primary"
                aria-label={`${instance.label} ${port.reference} ${side === "l" ? "left" : "right"}`}
              />
            ))}
          </div>
        );
      })}
      {/* Edges whose port the board no longer shows still need somewhere to attach. */}
      {(["l", "r"] as const).map((side) => (
        <Handle key={side} id={handleId(side, FALLBACK_HANDLE)} type="source"
          position={side === "l" ? Position.Left : Position.Right} isConnectable={false}
          style={{ top: HEADER / 2, opacity: 0 }} />
      ))}
    </div>
  );
}

const NODE_TYPES = { board: BoardNodeView };

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

  const base = buildNodes(document, layout.positions);
  const nodes: BoardNode[] = base.map((node) => {
    const extra = overrides[node.id] ?? {};
    return {
      id: node.id,
      type: "board",
      position: extra.position ?? node.position,
      data: node.data,
      measured: extra.measured,
      selected: extra.selected,
      dragging: extra.dragging,
      width: NODE_WIDTH,
      height: nodeHeight(node.data.ports.length),
    };
  });
  const edges: Edge[] = buildEdges(document, nodes).map((edge) => ({
    id: edge.id,
    source: edge.source,
    sourceHandle: edge.sourceHandle,
    target: edge.target,
    targetHandle: edge.targetHandle,
    label: edge.harness ? `${edge.label} · ${edge.harness}` : edge.label,
    type: "smoothstep",
    style: { strokeWidth: 2 },
    labelBgPadding: [6, 3] as [number, number],
    labelBgBorderRadius: 4,
    labelStyle: { fontSize: 11 },
  }));

  const saveLayout = (moved: BoardNode) => {
    const positions: LayoutPositions = Object.fromEntries(
      nodes.map((node) => [node.id, node.id === moved.id ? moved.position : node.position]),
    );
    putLayout(systemId, positions)
      .then((saved) => setLayout({ systemId, positions: saved }))
      .catch(() => toast.error("Could not save the layout"));
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

  return (
    <div className="flex h-full min-h-[32rem] flex-col">
      <p className="border-b px-4 py-2 text-xs text-muted-foreground md:px-6">
        {canEdit
          ? "Drag from one port to another to link them. Drag boards to arrange them; the layout is shared. Click a link to edit its pins."
          : "Click a link to see its pins."}
      </p>
      <div className="min-h-0 flex-1" data-testid="system-diagram">
        {document.instances.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">Add boards on the Boards tab to see them here.</p>
        ) : (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={NODE_TYPES}
            colorMode={dark ? "dark" : "light"}
            connectionMode={ConnectionMode.Loose}
            nodesDraggable={canEdit}
            nodesConnectable={canEdit}
            elementsSelectable
            onNodesChange={(changes) => setOverrides((current) => applyOverrides(current, changes))}
            onNodeDragStop={(_event, node) => saveLayout(node)}
            onConnect={connect}
            onEdgeClick={(_event, edge) => onNavigate("connectivity", { link: edge.id })}
            fitView
          >
            <Background gap={16} />
            <Controls showInteractive={false} />
          </ReactFlow>
        )}
      </div>
    </div>
  );
}
