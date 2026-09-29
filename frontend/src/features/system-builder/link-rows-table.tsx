import { AlertTriangle, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVirtualViewport } from "@/hooks/use-virtual-viewport";
import { cn } from "@/lib/utils";
import type { Finding, RowSource } from "@/types/system";

export const ROW_HEIGHT = 36;
const OVERSCAN = 8;

export interface EndView {
  pad: string | null;
  names: string[] | null;
  nets: string[] | null;
  /** The pad's nets now differ from the net baseline accepted for the row. */
  changed: boolean;
  /** The pad no longer exists at the baseline. */
  missing: boolean;
  redacted: boolean;
}

export interface RowView {
  key: string;
  signal: string;
  source: RowSource;
  a: EndView;
  b: EndView;
  findings: Finding[];
  problems: string[];
}

const COLUMNS = "grid-cols-[4rem_minmax(6rem,1fr)_minmax(8rem,1.5fr)_minmax(8rem,1.2fr)_4rem_minmax(6rem,1fr)_minmax(8rem,1.5fr)_5.5rem_4rem]";

function End({ end, net }: { end: EndView; net?: boolean }) {
  if (end.redacted) {
    return <span className="text-muted-foreground">restricted</span>;
  }
  if (!net) {
    return <span className="truncate">{end.names?.join(", ") ?? ""}</span>;
  }
  if (end.missing) {
    return <span className="text-destructive">pad missing</span>;
  }
  return (
    <span className={cn("truncate font-mono text-xs", end.changed && "text-warning")}
      title={end.changed ? "This net changed since the row was accepted" : end.nets?.join(" | ")}>
      {end.nets?.length ? end.nets.join(" | ") : "(no net)"}
    </span>
  );
}

interface LinkRowsTableProps {
  rows: RowView[];
  editable: boolean;
  onSignalChange?: (key: string, signal: string) => void;
  onRemove?: (key: string) => void;
}

export function LinkRowsTable({ rows, editable, onSignalChange, onRemove }: LinkRowsTableProps) {
  const { height, scrollTop, viewportRef, onScroll } = useVirtualViewport();
  const first = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
  const last = Math.min(rows.length, Math.ceil((scrollTop + height) / ROW_HEIGHT) + OVERSCAN);
  const visible = rows.slice(first, last);

  // A real table for screen readers; block/grid display so rows can be absolutely positioned (virtualised).
  return (
    <div className="relative overflow-x-auto rounded-md border">
      <table aria-label="Link pins" aria-rowcount={rows.length + 1} className="block min-w-[60rem] text-sm">
        <thead className="block">
          <tr className={cn("grid gap-2 border-b bg-muted/50 px-2 py-2 text-left text-xs font-medium text-muted-foreground", COLUMNS)}>
            <th>Pin A</th>
            <th>Name A</th>
            <th>Net A</th>
            <th>Signal</th>
            <th>Pin B</th>
            <th>Name B</th>
            <th>Net B</th>
            <th>Source</th>
            <th><span className="sr-only">Status</span></th>
          </tr>
        </thead>
        {rows.length === 0 ? (
          <tbody className="block">
            <tr className="block">
              <td className="block p-6 text-center text-sm text-muted-foreground">No pins connected yet. Add rows or use a generator.</td>
            </tr>
          </tbody>
        ) : (
          <tbody ref={viewportRef} onScroll={onScroll} className="relative block max-h-[60vh] overflow-y-auto" data-testid="link-rows-viewport">
            <tr aria-hidden className="block" style={{ height: rows.length * ROW_HEIGHT }} />
            {visible.map((row, offset) => {
              const index = first + offset;
              const worst = row.problems.length || row.findings.some((f) => f.severity === "error")
                ? "error"
                : row.findings.some((f) => f.severity === "warning") ? "warning" : null;
              const tooltip = [...row.problems, ...row.findings.map((f) => `${f.rule} ${f.name}`)].join("\n");
              return (
                <tr
                  key={row.key}
                  aria-rowindex={index + 2}
                  className={cn("absolute left-0 right-0 grid items-center gap-2 border-b px-2", COLUMNS,
                    worst === "error" && "bg-destructive/5", worst === "warning" && "bg-warning/5")}
                  style={{ top: index * ROW_HEIGHT, height: ROW_HEIGHT }}
                >
                  <td className="font-mono">{row.a.redacted ? "—" : row.a.pad}</td>
                  <td className="truncate text-muted-foreground"><End end={row.a} /></td>
                  <td className="truncate"><End end={row.a} net /></td>
                  <td>
                    {editable && onSignalChange ? (
                      <Input aria-label={`Signal for ${row.a.pad ?? ""} ↔ ${row.b.pad ?? ""}`} value={row.signal} maxLength={200}
                        className="h-7 text-xs" onChange={(event) => onSignalChange(row.key, event.target.value)} />
                    ) : (
                      <span className="truncate">{row.signal}</span>
                    )}
                  </td>
                  <td className="font-mono">{row.b.redacted ? "—" : row.b.pad}</td>
                  <td className="truncate text-muted-foreground"><End end={row.b} /></td>
                  <td className="truncate"><End end={row.b} net /></td>
                  <td className="text-xs text-muted-foreground">{row.source}</td>
                  <td className="flex items-center justify-end">
                    {worst ? (
                      <AlertTriangle className={cn("h-4 w-4", worst === "error" ? "text-destructive" : "text-warning")}
                        aria-label={tooltip} />
                    ) : null}
                    {editable && onRemove && (
                      <Button variant="ghost" size="icon" className="h-7 w-7" aria-label={`Remove ${row.a.pad} ↔ ${row.b.pad}`}
                        onClick={() => onRemove(row.key)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
}
