import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { getValidation } from "@/lib/systems-api";
import { cn } from "@/lib/utils";
import type { ValidationReport } from "@/types/system";

import { LinkEditor } from "./link-editor";
import { linkEnds } from "./overview-tab";
import type { SystemTabProps } from "./system-tab-content";
import { useSystemMutation } from "./use-system-mutation";

export function ConnectivityTab({ systemId, document, etag, canEdit, reload, onNavigate }: SystemTabProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = searchParams.get("link");
  const selected = document.links.find((link) => link.id === requested) ?? document.links[0] ?? null;
  const [report, setReport] = useState<{ etag: string; body: ValidationReport } | null>(null);
  const { busy, run } = useSystemMutation(reload);

  // Findings follow the system version: re-read whenever the ETag moves.
  useEffect(() => {
    let cancelled = false;
    getValidation(systemId)
      .then(({ body }) => !cancelled && setReport({ etag, body }))
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [systemId, etag]);

  const findings = report?.etag === etag ? report.body.findings : [];
  const issueCount = (linkId: string) => findings.filter((f) => f.linkId === linkId && f.severity !== "info").length;

  const select = (linkId: string) =>
    setSearchParams((current) => {
      const params = new URLSearchParams(current);
      params.set("link", linkId);
      return params;
    }, { replace: true });

  if (document.links.length === 0) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        No links yet.{" "}
        <button type="button" className="underline" onClick={() => onNavigate("diagram")}>Open the diagram</button>
        {" "}and drag from one port to another to create one.
      </div>
    );
  }

  return (
    <div className="grid min-h-full md:grid-cols-[18rem_1fr]">
      <aside className="space-y-1 border-b p-3 md:border-b-0 md:border-r">
        <h2 className="mb-2 text-sm font-semibold">Links</h2>
        {document.links.map((link) => {
          const issues = issueCount(link.id);
          return (
            <button key={link.id} type="button" onClick={() => select(link.id)}
              aria-current={selected?.id === link.id ? "true" : undefined}
              className={cn("w-full rounded-md px-2 py-1.5 text-left text-sm",
                selected?.id === link.id ? "bg-muted" : "hover:bg-muted/50")}>
              <span className="flex items-center justify-between gap-2">
                <span className="truncate font-medium">{link.name || "Unnamed link"}</span>
                {issues > 0 && (
                  <Badge variant="warning" className="shrink-0"><AlertTriangle /> {issues}</Badge>
                )}
              </span>
              <span className="block truncate text-xs text-muted-foreground">{linkEnds(document, link)} · {link.rows.length} pins</span>
            </button>
          );
        })}
      </aside>
      <section className="min-w-0 p-4 md:p-6">
        {selected && (
          <LinkEditor
            key={selected.id}
            systemId={systemId}
            document={document}
            link={selected}
            etag={etag}
            canEdit={canEdit}
            findings={findings}
            busy={busy}
            run={run}
            onDeleted={() => setSearchParams((current) => {
              const params = new URLSearchParams(current);
              params.delete("link");
              return params;
            }, { replace: true })}
          />
        )}
      </section>
    </div>
  );
}
