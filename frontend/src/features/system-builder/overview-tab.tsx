import { ArrowRight, Pin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { SystemDocument, SystemLink } from "@/types/system";

import type { SystemTabProps } from "./system-tab-content";
import { TONE_BADGE, boardStatus, shortSha } from "./system-format";

function Stat({ label, value, hint, onClick }: { label: string; value: string | number; hint?: string; onClick?: () => void }) {
  const body = (
    <>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold tabular-nums">{value}</p>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </>
  );
  return onClick ? (
    <button type="button" onClick={onClick} className="rounded-lg border bg-card p-4 text-left transition-colors hover:border-primary/40">
      {body}
    </button>
  ) : (
    <div className="rounded-lg border bg-card p-4">{body}</div>
  );
}

export function linkEnds(document: SystemDocument, link: SystemLink): string {
  const labels = new Map(document.instances.map((instance) => [instance.id, instance.label]));
  return (["a", "b"] as const)
    .map((end) => `${labels.get(link[end].instanceId) ?? "?"}/${link[end].port?.reference ?? "restricted"}`)
    .join(" ↔ ");
}

export function OverviewTab({ document, onNavigate }: SystemTabProps) {
  const rows = document.links.reduce((total, link) => total + link.rows.length, 0);
  const counts = document.findingCounts;
  const findingsHint = counts
    ? [`${counts.warning} warnings`, `${counts.info} info`, counts.notEvaluated ? `${counts.notEvaluated} not evaluated` : ""]
      .filter(Boolean).join(" · ")
    : "Not evaluated";

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <Stat label="Boards" value={document.instances.length} onClick={() => onNavigate("boards")} />
        <Stat label="Links" value={document.links.length} onClick={() => onNavigate("connectivity")} />
        <Stat label="Connections" value={rows} hint="pin-to-pin rows" />
        <Stat label="To review" value={document.openReviewCount} onClick={() => onNavigate("changes")} />
        <Stat label="Errors" value={counts ? counts.error : "—"} hint={findingsHint} onClick={() => onNavigate("connectivity")} />
      </div>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold">Boards</h2>
        {document.instances.length === 0 ? (
          <p className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
            No boards yet. Add one on the Boards tab.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left text-xs text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 font-medium">Board</th>
                  <th className="px-3 py-2 font-medium">Project</th>
                  <th className="px-3 py-2 font-medium">Baseline</th>
                  <th className="px-3 py-2 font-medium">Branch</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {document.instances.map((instance) => {
                  const status = boardStatus(instance);
                  return (
                    <tr key={instance.id} className="border-t hover:bg-muted/40">
                      <td className="px-3 py-2 font-medium">
                        <button type="button" className="hover:underline" onClick={() => onNavigate("boards", { board: instance.id })}>
                          {instance.label}
                        </button>
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">{instance.projectName ?? "—"}</td>
                      <td className="px-3 py-2 font-mono text-xs" title={instance.baselineCommit ?? undefined}>
                        {shortSha(instance.baselineCommit)}
                      </td>
                      <td className="px-3 py-2">
                        <span className="inline-flex items-center gap-1">
                          {instance.trackedRef ?? "—"}
                          {instance.pinned && <Pin className="h-3 w-3 text-muted-foreground" aria-label="pinned" />}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <Badge variant={TONE_BADGE[status.tone]} title={status.detail}>{status.label}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold">Links</h2>
        {document.links.length === 0 ? (
          <p className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
            No links yet. Connect two ports on the Diagram tab.
          </p>
        ) : (
          <ul className="divide-y rounded-md border">
            {document.links.map((link) => (
              <li key={link.id}>
                <button type="button" className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm hover:bg-muted/40"
                  onClick={() => onNavigate("connectivity", { link: link.id })}>
                  <span className="min-w-0 flex-1 truncate font-medium">{link.name || "Unnamed link"}</span>
                  <span className="hidden truncate text-muted-foreground md:inline">{linkEnds(document, link)}</span>
                  {link.harness && <Badge variant="outline">{link.harness}</Badge>}
                  <span className="shrink-0 tabular-nums text-muted-foreground">{link.rows.length} pins</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
