import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { clearMating, getMating, setMating } from "@/lib/systems-api";
import type { MatingAxis, PortMating, SystemDocument, SystemLink } from "@/types/system";

import type { Mutate } from "./use-system-mutation";

/** How the mating axis reads to a designer (CONTRACTS_P2 §15.1; ±x/±y are the footprint's own axes). */
export const AXIS_LABELS: Record<MatingAxis, string> = {
  top: "Vertical, top side",
  bottom: "Vertical, bottom side",
  "+x": "Right-angle, footprint +X",
  "-x": "Right-angle, footprint −X",
  "+y": "Right-angle, footprint +Y",
  "-y": "Right-angle, footprint −Y",
};

/** The one-line state of a port's frame, as the link details show it. */
export function matingSummary(port: PortMating): { label: string; tone: "ok" | "info" | "warn" } {
  if (port.stored) {
    const turns = port.stored.quarterTurns ? ` · turned ${port.stored.quarterTurns * 90}°` : "";
    const how = port.stored.mode === "confirmed" ? "Confirmed" : "Set by hand";
    if (port.stored.stale) return { label: `${how}: ${AXIS_LABELS[port.stored.axis]}${turns} · footprint moved, check again`, tone: "warn" };
    return { label: `${how}: ${AXIS_LABELS[port.stored.axis]}${turns}`, tone: "ok" };
  }
  if (port.inferred.axis) {
    return { label: `Inferred (${port.inferred.confidence}): ${AXIS_LABELS[port.inferred.axis]}`, tone: "info" };
  }
  return { label: "Mating details needed", tone: "warn" };
}

const TONE: Record<"ok" | "info" | "warn", "secondary" | "outline" | "destructive"> = { ok: "secondary", info: "outline", warn: "destructive" };

interface EndProps {
  systemId: string;
  etag: string;
  side: "A" | "B";
  instanceId: string;
  portKey: string;
  label: string;
  editable: boolean;
  busy: boolean;
  run: Mutate;
}

function MatingEnd({ systemId, etag, side, instanceId, portKey, label, editable, busy, run }: EndProps) {
  const [port, setPort] = useState<{ key: string; body: PortMating | null } | null>(null);
  const [picking, setPicking] = useState<{ axis: MatingAxis; quarterTurns: number } | null>(null);
  const key = `${instanceId}:${portKey}:${etag}`;

  useEffect(() => {
    let cancelled = false;
    getMating(systemId, instanceId)
      .then((body) => !cancelled && setPort({ key, body: body.ports.find((p) => p.portKey === portKey) ?? null }))
      .catch(() => !cancelled && setPort({ key, body: null }));
    return () => {
      cancelled = true;
    };
  }, [systemId, instanceId, portKey, key]);

  const current = port?.key === key ? port.body : undefined;
  if (current === undefined) return <p className="text-sm text-muted-foreground">{side} · {label}: loading…</p>;
  if (current === null) return <p className="text-sm text-muted-foreground">{side} · {label}: no frame (the board interface is not ready).</p>;
  const summary = matingSummary(current);
  const canConfirm = editable && Boolean(current.inferred.axis) && current.stored?.mode !== "confirmed";
  const start = picking ?? { axis: current.stored?.axis ?? current.inferred.axis ?? "top", quarterTurns: current.stored?.quarterTurns ?? 0 };

  return (
    <div className="space-y-2 rounded-md border p-3" data-testid={`mating-${side}`}>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="font-medium">{side} · {label}</span>
        <Badge variant={TONE[summary.tone]}>{summary.label}</Badge>
      </div>
      {editable && (
        <div className="flex flex-wrap items-center gap-2">
          {canConfirm && (
            <Button size="sm" variant="outline" disabled={busy}
              onClick={() => void run("mating", () => setMating(systemId, etag, instanceId, portKey, { mode: "confirmed" }), "Mating frame confirmed")}>
              Confirm
            </Button>
          )}
          {!picking && (
            <Button size="sm" variant="ghost" disabled={busy} onClick={() => setPicking(start)}>Set by hand</Button>
          )}
          {current.stored && !picking && (
            <Button size="sm" variant="ghost" disabled={busy}
              onClick={() => void run("mating", () => clearMating(systemId, etag, instanceId, portKey), "Back to the inferred frame")}>
              Reset
            </Button>
          )}
        </div>
      )}
      {editable && picking && (
        <form className="flex flex-wrap items-end gap-2" aria-label={`Mating frame ${side}`}
          onSubmit={async (event) => {
            event.preventDefault();
            // run() reports failures itself and never rejects.
            await run("mating", () => setMating(systemId, etag, instanceId, portKey, { mode: "override", ...picking }), "Mating frame saved");
            setPicking(null);
          }}>
          <Select value={picking.axis} onValueChange={(value) => setPicking({ ...picking, axis: value as MatingAxis })}>
            <SelectTrigger aria-label={`Mating direction ${side}`} className="h-8 w-56"><SelectValue /></SelectTrigger>
            <SelectContent>
              {(Object.keys(AXIS_LABELS) as MatingAxis[]).map((axis) => <SelectItem key={axis} value={axis}>{AXIS_LABELS[axis]}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={String(picking.quarterTurns)} onValueChange={(value) => setPicking({ ...picking, quarterTurns: Number(value) })}>
            <SelectTrigger aria-label={`Turn about the mating axis ${side}`} className="h-8 w-28"><SelectValue /></SelectTrigger>
            <SelectContent>
              {[0, 1, 2, 3].map((turns) => <SelectItem key={turns} value={String(turns)}>{turns * 90}°</SelectItem>)}
            </SelectContent>
          </Select>
          <Button size="sm" type="submit" disabled={busy}>Save</Button>
          <Button size="sm" type="button" variant="ghost" onClick={() => setPicking(null)}>Cancel</Button>
        </form>
      )}
    </div>
  );
}

interface MatingPanelProps {
  systemId: string;
  etag: string;
  document: SystemDocument;
  link: SystemLink;
  editable: boolean;
  busy: boolean;
  run: Mutate;
}

/** CONTRACTS_P2 §16.2: a board-to-board link shows both connectors' mating frames. */
export function MatingPanel({ systemId, etag, document, link, editable, busy, run }: MatingPanelProps) {
  return (
    <section className="space-y-2" aria-label="Mating">
      <h3 className="text-sm font-semibold">
        Mating{link.stackHeightMm ? ` · stack height ${link.stackHeightMm} mm` : ""}
      </h3>
      <p className="text-xs text-muted-foreground">
        Automatic 3D placement uses only frames that are confirmed or set by hand.
      </p>
      {(["a", "b"] as const).map((end) => {
        const instance = document.instances.find((candidate) => candidate.id === link[end].instanceId);
        const side = end === "a" ? "A" : "B";
        const label = `${instance?.label ?? "?"} ${link[end].port?.reference ?? ""}`.trim();
        if (link[end].redacted || !link[end].port) return <p key={end} className="text-sm text-muted-foreground">{side} · restricted</p>;
        if (instance?.kind === "assembly") {
          return <p key={end} className="text-sm text-muted-foreground">{side} · {label}: the frame comes from the subsystem's snapshot.</p>;
        }
        return (
          <MatingEnd key={end} systemId={systemId} etag={etag} side={side} instanceId={link[end].instanceId}
            portKey={link[end].port!.portKey} label={label} editable={editable} busy={busy} run={run} />
        );
      })}
    </section>
  );
}
