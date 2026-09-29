import { useState } from "react";
import { Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateRows } from "@/lib/systems-api";
import type { GeneratedRow, GeneratorKind, GeneratorResult } from "@/types/system";

import { SELECT_CLASS } from "./board-fields";

const GENERATOR_LABELS: Record<GeneratorKind, string> = {
  identity: "Same pin (1↔1, 2↔2…)",
  reverse: "Reversed (1↔N, 2↔N−1…)",
  offset: "Offset (n ↔ n + k)",
  net_name: "Matching net names",
};

/** An inclusive pad window, or nothing when both bounds are blank. */
function padRange(from: string, to: string) {
  return from.trim() || to.trim() ? { from: from.trim() || undefined, to: to.trim() || undefined } : undefined;
}

function pairKey(row: GeneratedRow): string {
  return `${row.pinA}\u0000${row.pinB}`;
}

interface GeneratorPanelProps {
  systemId: string;
  linkId: string;
  onApprove: (rows: GeneratedRow[]) => void;
}

/** Preview a generator's proposals, then approve some or all into the draft (never saved directly). */
export function GeneratorPanel({ systemId, linkId, onApprove }: GeneratorPanelProps) {
  const [generator, setGenerator] = useState<GeneratorKind>("identity");
  const [offset, setOffset] = useState("0");
  const [range, setRange] = useState({ aFrom: "", aTo: "", bFrom: "", bTo: "" });
  const [includeUnconnected, setIncludeUnconnected] = useState(false);
  const [result, setResult] = useState<GeneratorResult | null>(null);
  const [rejected, setRejected] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const preview = async () => {
    setLoading(true);
    setError(null);
    try {
      const options: Record<string, unknown> = { includeUnconnected };
      if (generator === "offset") options.offset = Number.parseInt(offset, 10);
      const rangeA = padRange(range.aFrom, range.aTo);
      const rangeB = padRange(range.bFrom, range.bTo);
      if (rangeA) options.rangeA = rangeA;
      if (rangeB) options.rangeB = rangeB;
      const { body } = await generateRows(systemId, linkId, generator, options);
      setResult(body);
      setRejected(new Set());
    } catch (caught) {
      setResult(null);
      setError(caught instanceof Error ? caught.message : "Could not generate rows");
    } finally {
      setLoading(false);
    }
  };

  const approved = result?.rows.filter((row) => !rejected.has(pairKey(row))) ?? [];
  const skippedExisting = result?.skipped.filter((s) => s.reason === "existing").length ?? 0;
  const skippedUnconnected = result?.skipped.filter((s) => s.reason === "unconnected").length ?? 0;

  return (
    <section className="space-y-3 rounded-md border p-3" aria-label="Generate rows">
      <div className="flex flex-wrap items-end gap-2">
        <label className="space-y-1 text-xs">
          <span className="text-muted-foreground">Generator</span>
          <select aria-label="Generator" className={`${SELECT_CLASS} w-56`} value={generator}
            onChange={(event) => { setGenerator(event.target.value as GeneratorKind); setResult(null); }}>
            {(Object.keys(GENERATOR_LABELS) as GeneratorKind[]).map((kind) => (
              <option key={kind} value={kind}>{GENERATOR_LABELS[kind]}</option>
            ))}
          </select>
        </label>
        {generator === "offset" && (
          <label className="space-y-1 text-xs">
            <span className="text-muted-foreground">Offset</span>
            <Input aria-label="Offset" type="number" className="h-9 w-20" value={offset} onChange={(event) => setOffset(event.target.value)} />
          </label>
        )}
        {(["a", "b"] as const).map((end) => (
          <div key={end} className="space-y-1 text-xs">
            <span className="text-muted-foreground">End {end.toUpperCase()} pads</span>
            <div className="flex gap-1">
              <Input aria-label={`End ${end.toUpperCase()} from`} placeholder="from" className="h-9 w-16 font-mono"
                value={range[`${end}From`]} onChange={(event) => setRange({ ...range, [`${end}From`]: event.target.value })} />
              <Input aria-label={`End ${end.toUpperCase()} to`} placeholder="to" className="h-9 w-16 font-mono"
                value={range[`${end}To`]} onChange={(event) => setRange({ ...range, [`${end}To`]: event.target.value })} />
            </div>
          </div>
        ))}
        <label className="flex h-9 items-center gap-1.5 text-xs text-muted-foreground">
          <input type="checkbox" aria-label="Include unconnected pins" checked={includeUnconnected}
            onChange={(event) => setIncludeUnconnected(event.target.checked)} />
          Unconnected pins
        </label>
        <Button variant="outline" size="sm" className="h-9" onClick={() => void preview()} disabled={loading}>
          <Wand2 className="mr-1 h-4 w-4" /> {loading ? "Generating…" : "Preview"}
        </Button>
      </div>

      {error && <p className="text-sm text-destructive" role="alert">{error}</p>}

      {result && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">
            {result.rows.length} proposed
            {skippedExisting > 0 && ` · ${skippedExisting} skipped (already used)`}
            {skippedUnconnected > 0 && ` · ${skippedUnconnected} skipped (no net)`}
          </p>
          {result.rows.length > 0 && (
            <div className="max-h-56 overflow-y-auto rounded border">
              <table className="w-full text-xs">
                <tbody>
                  {result.rows.map((row) => {
                    const key = pairKey(row);
                    return (
                      <tr key={key} className="border-b last:border-0">
                        <td className="px-2 py-1">
                          <input type="checkbox" aria-label={`Keep ${row.pinA} ↔ ${row.pinB}`} checked={!rejected.has(key)}
                            onChange={(event) => setRejected((current) => {
                              const next = new Set(current);
                              if (event.target.checked) next.delete(key); else next.add(key);
                              return next;
                            })} />
                        </td>
                        <td className="px-2 py-1 font-mono">{row.pinA} ↔ {row.pinB}</td>
                        <td className="px-2 py-1">{row.signal}</td>
                        <td className="truncate px-2 py-1 font-mono text-muted-foreground">{row.netA.join(" | ") || "(no net)"}</td>
                        <td className="truncate px-2 py-1 font-mono text-muted-foreground">{row.netB.join(" | ") || "(no net)"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          <Button size="sm" disabled={approved.length === 0} onClick={() => { onApprove(approved); setResult(null); }}>
            Add {approved.length} to the draft
          </Button>
        </div>
      )}
    </section>
  );
}
