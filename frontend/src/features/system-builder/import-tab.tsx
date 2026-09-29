import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Upload } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/ui/file-input";
import { commitImport, previewImport, uploadImport } from "@/lib/systems-api";
import { cn } from "@/lib/utils";
import type { ImportBucket, ImportCommitReport, ImportEntry, ImportPreview, ImportUpload } from "@/types/system";

import { SELECT_CLASS } from "./board-fields";
import {
  REASON_LABELS,
  SKIP,
  TARGETS,
  boardValues,
  missingTargets,
  suggestBoardMap,
  unmappedBoards,
  type ColumnMap,
} from "./import-model";
import type { SystemTabProps } from "./system-tab-content";
import { useSystemMutation } from "./use-system-mutation";

type Step = "upload" | "map" | "preview" | "done";

const BUCKETS: { bucket: ImportBucket; label: string; tone: "success" | "warning" | "destructive" | "outline"; hint: string }[] = [
  { bucket: "matched", label: "Matched", tone: "success", hint: "Written on commit." },
  { bucket: "needsReview", label: "Needs review", tone: "warning", hint: "Queued as an import review on commit." },
  { bucket: "conflict", label: "Conflict", tone: "destructive", hint: "Not imported." },
  { bucket: "unresolved", label: "Unresolved", tone: "outline", hint: "Not imported." },
];

function plural(count: number, noun: string): string {
  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}

function endText(entry: ImportEntry, side: "from" | "to"): string {
  const v = entry.values;
  return `${v[`${side}_board`]}/${v[`${side}_connector`]}.${v[`${side}_pin`]}`;
}

export function ImportTab({ systemId, document, etag, canEdit, reload, onNavigate }: SystemTabProps) {
  const [step, setStep] = useState<Step>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [upload, setUpload] = useState<ImportUpload | null>(null);
  const [columnMap, setColumnMap] = useState<ColumnMap>({});
  const [boardMap, setBoardMap] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<ImportPreview | null>(null);
  const [bucket, setBucket] = useState<ImportBucket>("matched");
  const [report, setReport] = useState<ImportCommitReport | null>(null);
  const [working, setWorking] = useState(false);
  const { run } = useSystemMutation(reload);

  if (!canEdit) {
    return <p className="p-6 text-sm text-muted-foreground">Only designers can import connections.</p>;
  }

  const boards = document.instances.filter((instance) => !instance.restricted);
  const values = upload ? boardValues(upload, columnMap) : [];
  const missing = missingTargets(columnMap);
  const unmapped = unmappedBoards(values, boardMap);
  const maps = { columnMap, boardMap };

  const doUpload = async () => {
    if (!file) return;
    setWorking(true);
    try {
      const body = await uploadImport(systemId, file);
      setUpload(body);
      setColumnMap(body.suggestedColumnMap);
      setBoardMap(suggestBoardMap(boardValues(body, body.suggestedColumnMap), document.instances));
      setStep("map");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not read the CSV");
    } finally {
      setWorking(false);
    }
  };

  const setColumn = (target: string, column: string) => {
    const next = { ...columnMap, [target]: column || undefined };
    setColumnMap(next);
    if (upload) setBoardMap(suggestBoardMap(boardValues(upload, next), document.instances, boardMap));
  };

  const doPreview = async () => {
    if (!upload) return;
    setWorking(true);
    try {
      const { body } = await previewImport(systemId, upload.importId, maps);
      setPreview(body);
      setBucket(body.counts.matched ? "matched" : (BUCKETS.find((b) => body.counts[b.bucket])?.bucket ?? "matched"));
      setStep("preview");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not preview the import");
    } finally {
      setWorking(false);
    }
  };

  const doCommit = async () => {
    if (!upload) return;
    setWorking(true);
    try {
      const result = await run("import", () => commitImport(systemId, etag, upload.importId, maps));
      if (result) {
        setReport(result.body);
        setStep("done");
      }
    } finally {
      setWorking(false);
    }
  };

  const restart = () => {
    setStep("upload");
    setFile(null);
    setUpload(null);
    setPreview(null);
    setReport(null);
    setColumnMap({});
    setBoardMap({});
  };

  return (
    <div className="space-y-5 p-4 md:p-6">
      <ol className="flex flex-wrap gap-2 text-xs" aria-label="Import steps">
        {(["upload", "map", "preview", "done"] as Step[]).map((name, index) => (
          <li key={name} className={cn("rounded-full border px-3 py-1", step === name ? "border-primary text-primary" : "text-muted-foreground")}>
            {index + 1}. {name === "upload" ? "Upload" : name === "map" ? "Map columns and boards" : name === "preview" ? "Preview" : "Done"}
          </li>
        ))}
      </ol>

      {step === "upload" && (
        <section className="max-w-xl space-y-3">
          <p className="text-sm text-muted-foreground">
            Upload a wiring list as CSV: one row per connection, naming each end's board, connector and pin. An ICD
            export of this system imports back unchanged. Nothing is written until you commit.
          </p>
          <FileInput accept=".csv,text/csv" value={file} onValueChange={setFile} aria-label="CSV file" />
          <Button onClick={() => void doUpload()} disabled={!file || working}>
            <Upload className="mr-1 h-4 w-4" /> {working ? "Reading…" : "Upload"}
          </Button>
        </section>
      )}

      {step === "map" && upload && (
        <section className="space-y-5">
          <p className="text-sm text-muted-foreground">
            {upload.filename} · {upload.rowCount} rows · {upload.columns.length} columns
          </p>
          <div className="grid max-w-3xl gap-2 sm:grid-cols-2">
            {TARGETS.map(({ target, label, required }) => (
              <label key={target} className="grid grid-cols-[9rem_1fr] items-center gap-2 text-sm">
                <span>{label}{required && <span className="text-destructive"> *</span>}</span>
                <select aria-label={`Column for ${label}`} className={SELECT_CLASS} value={columnMap[target] ?? ""}
                  onChange={(event) => setColumn(target, event.target.value)}>
                  <option value="">{required ? "Choose a column…" : "(none)"}</option>
                  {upload.columns.map((column) => <option key={column} value={column}>{column}</option>)}
                </select>
              </label>
            ))}
          </div>

          {values.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Boards</h3>
              <p className="text-xs text-muted-foreground">Match each board named in the file to a board of this system, or skip it.</p>
              <div className="grid max-w-3xl gap-2 sm:grid-cols-2">
                {values.map((value) => (
                  <label key={value} className="grid grid-cols-[9rem_1fr] items-center gap-2 text-sm">
                    <span className="truncate font-mono" title={value}>{value}</span>
                    <select aria-label={`Board for ${value}`} className={SELECT_CLASS} value={boardMap[value] ?? ""}
                      onChange={(event) => setBoardMap({ ...boardMap, [value]: event.target.value })}>
                      <option value="">Choose…</option>
                      <option value={SKIP}>Skip these rows</option>
                      {boards.map((instance) => <option key={instance.id} value={instance.id}>{instance.label}</option>)}
                    </select>
                  </label>
                ))}
              </div>
            </div>
          )}

          <details className="text-xs">
            <summary className="cursor-pointer text-muted-foreground">Sample rows</summary>
            <div className="relative mt-2 overflow-x-auto rounded border">
              <table className="text-xs">
                <thead className="bg-muted/50">
                  <tr>{upload.columns.map((column) => <th key={column} className="px-2 py-1 text-left font-medium">{column}</th>)}</tr>
                </thead>
                <tbody>
                  {upload.sampleRows.map((row, index) => (
                    // Sample rows have no identity of their own; their order is the file's.
                    // react-doctor-disable-next-line no-array-index-as-key
                    <tr key={index} className="border-t">
                      {upload.columns.map((column) => <td key={column} className="whitespace-nowrap px-2 py-1">{row[column]}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>

          {(missing.length > 0 || unmapped.length > 0) && (
            <p className="text-xs text-destructive" role="alert">
              {missing.length > 0 && `Map ${missing.join(", ")}. `}
              {unmapped.length > 0 && `Choose a board (or skip) for ${unmapped.join(", ")}.`}
            </p>
          )}
          <div className="flex gap-2">
            <Button variant="outline" onClick={restart}>Start over</Button>
            <Button onClick={() => void doPreview()} disabled={working || missing.length > 0 || unmapped.length > 0}>
              {working ? "Checking…" : "Preview"}
            </Button>
          </div>
        </section>
      )}

      {step === "preview" && preview && (
        <section className="space-y-4">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Import buckets">
            {BUCKETS.map(({ bucket: name, label, tone }) => (
              <button key={name} type="button" role="tab" aria-selected={bucket === name} onClick={() => setBucket(name)}
                className={cn("rounded-md border px-3 py-2 text-left text-sm", bucket === name && "border-primary")}>
                <span className="block text-xs text-muted-foreground">{label}</span>
                <Badge variant={tone}>{preview.counts[name]}</Badge>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">{BUCKETS.find((b) => b.bucket === bucket)?.hint}</p>
          <div className="relative max-h-[50vh] overflow-auto rounded-md border">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-muted text-left text-xs text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 font-medium">Line</th>
                  <th className="px-3 py-2 font-medium">From</th>
                  <th className="px-3 py-2 font-medium">To</th>
                  <th className="px-3 py-2 font-medium">Signal</th>
                  <th className="px-3 py-2 font-medium">{bucket === "matched" ? "Action" : "Reason"}</th>
                </tr>
              </thead>
              <tbody>
                {preview[bucket].length === 0 && (
                  <tr><td colSpan={5} className="px-3 py-4 text-center text-muted-foreground">No rows.</td></tr>
                )}
                {preview[bucket].map((entry) => (
                  <tr key={entry.line} className="border-t">
                    <td className="px-3 py-1.5 tabular-nums text-muted-foreground">{entry.line}</td>
                    <td className="px-3 py-1.5 font-mono text-xs">{endText(entry, "from")}</td>
                    <td className="px-3 py-1.5 font-mono text-xs">{endText(entry, "to")}</td>
                    <td className="px-3 py-1.5">{entry.signal}</td>
                    <td className="px-3 py-1.5 text-xs">
                      {bucket === "matched"
                        ? `${entry.action === "update" ? "update" : "create"}${entry.linkId ? "" : " (new link)"}`
                        : REASON_LABELS[entry.reason ?? ""] ?? entry.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep("map")}>Back</Button>
            <Button onClick={() => void doCommit()} disabled={working || preview.counts.matched + preview.counts.needsReview === 0}>
              {working ? "Importing…" : `Commit ${plural(preview.counts.matched, "row")}`}
              {preview.counts.needsReview > 0 && ` and review ${preview.counts.needsReview}`}
            </Button>
          </div>
        </section>
      )}

      {step === "done" && report && (
        <section className="max-w-xl space-y-3">
          <p className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="h-4 w-4 text-success" /> Import committed</p>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            <li>{plural(report.created, "row")} created, {report.updated} updated, {report.unchanged} unchanged</li>
            <li>{report.linksCreated.length} new {report.linksCreated.length === 1 ? "link" : "links"}</li>
            <li>{plural(report.unresolved.length + report.conflict.length, "row")} not imported</li>
          </ul>
          <div className="flex gap-2">
            {report.reviewId && (
              <Button onClick={() => onNavigate("changes")}>Review {plural(report.counts.needsReview, "row")}</Button>
            )}
            <Button variant="outline" onClick={() => onNavigate("connectivity")}>Open connectivity</Button>
            <Button variant="ghost" onClick={restart}>Import another file</Button>
          </div>
        </section>
      )}
    </div>
  );
}
