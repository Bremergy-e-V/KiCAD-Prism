import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Cable, FileUp, Network } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { getValidation } from "@/lib/systems-api";
import { cn } from "@/lib/utils";
import type { ValidationReport } from "@/types/system";

import { FindingCountBadge } from "./findings-ui";
import { HarnessEditor } from "./harness-editor";
import { ImportTab } from "./import-tab";
import { LinkEditor, endLabel } from "./link-editor";
import type { SystemTabProps } from "./system-tab-content";
import { useSystemMutation } from "./use-system-mutation";

export function ConnectivityTab(props: SystemTabProps) {
  const { systemId, document, etag, canEdit, reload, onNavigate } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = searchParams.get("link");
  const requestedHarness = searchParams.get("harness");
  const importing = searchParams.get("tab") === "import";
  const harnesses = document.harnesses ?? [];
  const selectedHarness = harnesses.find((harness) => harness.id === requestedHarness) ?? null;
  const selected = selectedHarness ? null : document.links.find((link) => link.id === requested) ?? document.links[0] ?? null;
  const shownHarness = selectedHarness ?? (!selected && harnesses.length ? harnesses[0] : null);
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

  const update = (change: (params: URLSearchParams) => void) =>
    setSearchParams((current) => {
      const params = new URLSearchParams(current);
      change(params);
      return params;
    }, { replace: true });
  const select = (linkId: string) => update((params) => {
    params.delete("harness");
    params.set("link", linkId);
  });
  const selectHarness = (harnessId: string) => update((params) => {
    params.delete("link");
    params.set("harness", harnessId);
  });
  const setImporting = (open: boolean) => update((params) => params.set("tab", open ? "import" : "connectivity"));

  const importSheet = canEdit && (
    <Sheet open={importing} onOpenChange={setImporting}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-3xl">
        <SheetHeader>
          <SheetTitle>Import connections</SheetTitle>
          <SheetDescription>
            Upload a wiring list as CSV. An ICD export of this system imports back unchanged. Nothing is written until you commit.
          </SheetDescription>
        </SheetHeader>
        <ImportTab {...props} onNavigate={(tab, params) => {
          setImporting(false);
          if (tab !== "connectivity") onNavigate(tab, params);
        }} />
      </SheetContent>
    </Sheet>
  );

  if (document.links.length === 0 && harnesses.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 p-10 text-center">
        <Network className="h-8 w-8 text-muted-foreground" />
        <p className="font-medium">No connections yet</p>
        <p className="max-w-md text-sm text-muted-foreground">
          Drag from one port to another on the diagram to create a link, or import an existing wiring list.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onNavigate("diagram")}>Open the diagram</Button>
          {canEdit && <Button onClick={() => setImporting(true)}><FileUp className="mr-1 h-4 w-4" /> Import CSV</Button>}
        </div>
        {importSheet}
      </div>
    );
  }

  return (
    <div className="grid min-h-full md:grid-cols-[17rem_minmax(0,1fr)]">
      <aside className="flex min-w-0 flex-col border-b md:border-b-0 md:border-r">
        <div className="flex items-center justify-between gap-2 border-b px-3 py-2">
          <h2 className="text-sm font-semibold">Links <span className="font-normal text-muted-foreground">{document.links.length}</span></h2>
          {canEdit && (
            <Button variant="ghost" size="sm" className="h-7 px-2" onClick={() => setImporting(true)}>
              <FileUp className="mr-1 h-3.5 w-3.5" /> Import CSV
            </Button>
          )}
        </div>
        <nav className="grid gap-0.5 p-2" aria-label="Links">
          {document.links.map((link) => {
            const title = link.name || `${endLabel(document, link, "a")} ↔ ${endLabel(document, link, "b")}`;
            return (
              <button key={link.id} type="button" onClick={() => select(link.id)}
                aria-current={selected?.id === link.id ? "true" : undefined}
                className={cn("grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-2 py-1.5 text-left text-sm",
                  selected?.id === link.id ? "bg-muted" : "hover:bg-muted/50")}>
                <span className="min-w-0">
                  <span className="block truncate font-medium">{title}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {link.name ? `${endLabel(document, link, "a")} ↔ ${endLabel(document, link, "b")} · ` : ""}
                    {link.rows.length} {link.rows.length === 1 ? "pin" : "pins"}
                  </span>
                </span>
                <FindingCountBadge findings={findings.filter((finding) => finding.linkId === link.id)} />
              </button>
            );
          })}
        </nav>
        {harnesses.length > 0 && (
          <>
            <h2 className="border-y px-3 py-2 text-sm font-semibold">Harnesses <span className="font-normal text-muted-foreground">{harnesses.length}</span></h2>
            <nav className="grid gap-0.5 p-2" aria-label="Harnesses">
              {harnesses.map((harness) => (
                <button key={harness.id} type="button" onClick={() => selectHarness(harness.id)}
                  aria-current={shownHarness?.id === harness.id ? "true" : undefined}
                  className={cn("grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-2 py-1.5 text-left text-sm",
                    shownHarness?.id === harness.id ? "bg-muted" : "hover:bg-muted/50")}>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1 truncate font-medium"><Cable className="h-3.5 w-3.5 shrink-0" /> {harness.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">{harness.ends.length} ends · {harness.wires.length} wires</span>
                  </span>
                  <FindingCountBadge findings={findings.filter((finding) => (finding.detail as { harnessId?: string } | null)?.harnessId === harness.id)} />
                </button>
              ))}
            </nav>
          </>
        )}
      </aside>
      <section className="min-w-0 p-4 md:p-6">
        {shownHarness && (
          <HarnessEditor key={shownHarness.id} systemId={systemId} document={document} harness={shownHarness} etag={etag}
            canEdit={canEdit} findings={findings} busy={busy} run={run}
            onDeleted={() => update((params) => params.delete("harness"))}
            onConverted={(linkId) => select(linkId)} />
        )}
        {!shownHarness && selected && (
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
            onDeleted={() => update((params) => params.delete("link"))}
            onHarness={selectHarness}
          />
        )}
      </section>
      {importSheet}
    </div>
  );
}
