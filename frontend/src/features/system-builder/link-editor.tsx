import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Input } from "@/components/ui/input";
import { deleteLink, getInstanceInterface, replaceRows, updateLink } from "@/lib/systems-api";
import type { Finding, SystemDocument, SystemInstance, SystemLink } from "@/types/system";

import { SELECT_CLASS } from "./board-fields";
import { GeneratorPanel } from "./generator-panel";
import {
  componentFor,
  draftFromRows,
  draftProblems,
  draftToInputs,
  linkFindings,
  mergeGenerated,
  newDraftKey,
  pinFacts,
  sameNets,
  type DraftRow,
  type PinFact,
} from "./link-model";
import { LinkRowsTable, type RowView } from "./link-rows-table";
import { comparePads } from "./pads";
import type { useSystemMutation } from "./use-system-mutation";

type Mutate = ReturnType<typeof useSystemMutation>["run"];

interface EndPins {
  key: string;
  a: Map<string, PinFact> | null;
  b: Map<string, PinFact> | null;
}

const leaf = (net: string) => net.slice(net.lastIndexOf("/") + 1);

function sortedPads(facts: Map<string, PinFact> | null | undefined): string[] {
  return [...(facts?.keys() ?? [])].sort(comparePads);
}

function findingKey(finding: Finding): string {
  return [finding.rule, finding.linkId, finding.rowId, finding.end, finding.instanceId, finding.reference, finding.pin].join("|");
}

/** Pins of each end at its baseline, for adding rows and showing draft rows. */
function useEndPins(systemId: string, link: SystemLink, instances: SystemInstance[]): EndPins | null {
  const byId = new Map(instances.map((instance) => [instance.id, instance]));
  // Everything that decides which pins are read, as one comparable value.
  const spec = JSON.stringify((["a", "b"] as const).map((end) => {
    const instance = byId.get(link[end].instanceId);
    const port = link[end].port;
    return instance && !instance.restricted && port && instance.interface?.status === "ready"
      ? { instanceId: instance.id, baseline: instance.baselineCommit, port }
      : null;
  }));
  const [loaded, setLoaded] = useState<EndPins | null>(null);

  useEffect(() => {
    let cancelled = false;
    const requests = JSON.parse(spec) as ({ instanceId: string; port: SystemLink["a"]["port"] } | null)[];
    Promise.all(requests.map(async (request) => {
      if (!request?.port) {
        return null;
      }
      const result = await getInstanceInterface(systemId, request.instanceId);
      return result.state === "ready" ? pinFacts(componentFor(result.body, request.port)) : null;
    }))
      .then(([a, b]) => !cancelled && setLoaded({ key: spec, a, b }))
      .catch(() => !cancelled && setLoaded({ key: spec, a: null, b: null }));
    return () => {
      cancelled = true;
    };
  }, [systemId, spec]);

  return loaded?.key === spec ? loaded : null;
}

interface LinkEditorProps {
  systemId: string;
  document: SystemDocument;
  link: SystemLink;
  etag: string;
  canEdit: boolean;
  findings: Finding[];
  busy: string | null;
  run: Mutate;
  onDeleted: () => void;
}

export function LinkEditor({ systemId, document, link, etag, canEdit, findings, busy, run, onDeleted }: LinkEditorProps) {
  const pins = useEndPins(systemId, link, document.instances);
  const [draft, setDraft] = useState<DraftRow[] | null>(null);
  const [nameDraft, setNameDraft] = useState<string | null>(null);
  const [harnessDraft, setHarnessDraft] = useState<string | null>(null);
  const [newRow, setNewRow] = useState({ pinA: "", pinB: "", signal: "" });
  const [confirmDelete, setConfirmDelete] = useState(false);

  const labels = new Map(document.instances.map((instance) => [instance.id, instance.label]));
  const redacted = link.a.redacted || link.b.redacted;
  const editable = canEdit && !redacted;
  const { all: linkIssues, byRow } = linkFindings(findings, link);
  const name = nameDraft ?? link.name;
  const harness = harnessDraft ?? link.harness ?? "";

  const padsA = pins?.a ? new Set(pins.a.keys()) : null;
  const padsB = pins?.b ? new Set(pins.b.keys()) : null;
  const problems = draft ? draftProblems(draft, padsA, padsB) : [];
  const problemsByRow = new Map<string, string[]>();
  for (const problem of problems) {
    problemsByRow.set(problem.key, [...(problemsByRow.get(problem.key) ?? []), problem.message]);
  }

  const rows: RowView[] = draft
    ? draft.map((row) => {
      const factA = pins?.a?.get(row.pinA);
      const factB = pins?.b?.get(row.pinB);
      return {
        key: row.key, signal: row.signal, source: row.source,
        a: { pad: row.pinA, names: factA?.pinNames ?? null, nets: factA?.nets ?? null, changed: false,
          missing: Boolean(pins?.a) && !factA, redacted: false },
        b: { pad: row.pinB, names: factB?.pinNames ?? null, nets: factB?.nets ?? null, changed: false,
          missing: Boolean(pins?.b) && !factB, redacted: false },
        findings: row.id ? byRow.get(row.id) ?? [] : [],
        problems: problemsByRow.get(row.key) ?? [],
      };
    })
    : [...link.rows].sort((x, y) => comparePads(x.pinA ?? "", y.pinA ?? "") || comparePads(x.pinB ?? "", y.pinB ?? "")).map((row) => {
      const end = (side: "a" | "b") => {
        const observed = side === "a" ? row.observedA : row.observedB;
        const accepted = side === "a" ? row.netA : row.netB;
        return {
          pad: side === "a" ? row.pinA : row.pinB,
          names: observed?.pinNames ?? null,
          nets: observed?.present ? observed.nets : accepted,
          changed: Boolean(observed?.present) && !sameNets(observed?.nets, accepted),
          missing: observed?.present === false,
          redacted: row.redactedEnds.includes(side),
        };
      };
      return { key: row.id, signal: row.signal, source: row.source, a: end("a"), b: end("b"),
        findings: byRow.get(row.id) ?? [], problems: [] };
    });

  const editDraft = (update: (rows: DraftRow[]) => DraftRow[]) => setDraft((current) => update(current ?? draftFromRows(link.rows)));

  const addRow = () => {
    const nets = pins?.a?.get(newRow.pinA)?.nets ?? [];
    editDraft((current) => [...current, {
      key: newDraftKey(), pinA: newRow.pinA, pinB: newRow.pinB,
      signal: newRow.signal.trim() || (nets[0] ? leaf(nets[0]) : ""), source: "manual",
    }]);
    setNewRow({ pinA: "", pinB: "", signal: "" });
  };

  const save = async () => {
    if (!draft) return;
    const done = await run("rows", () => replaceRows(systemId, etag, link.id, draftToInputs(draft)), "Pins saved");
    if (done) setDraft(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">{link.name || "Unnamed link"}</h2>
          <p className="text-sm text-muted-foreground">
            {labels.get(link.a.instanceId)}/{link.a.port?.reference ?? "restricted"}
            {" ↔ "}
            {labels.get(link.b.instanceId)}/{link.b.port?.reference ?? "restricted"}
            {link.harness && <Badge variant="outline" className="ml-2">{link.harness}</Badge>}
          </p>
        </div>
        {editable && (
          <Button variant="ghost" size="sm" className="text-destructive" onClick={() => setConfirmDelete(true)}>
            <Trash2 className="mr-1 h-4 w-4" /> Delete link
          </Button>
        )}
      </div>

      {editable && (
        <div className="flex flex-wrap items-end gap-2">
          <label className="space-y-1 text-xs">
            <span className="text-muted-foreground">Name</span>
            <Input aria-label="Link name" className="h-9 w-56" value={name} maxLength={200}
              onChange={(event) => setNameDraft(event.target.value)} />
          </label>
          <label className="space-y-1 text-xs">
            <span className="text-muted-foreground">Harness</span>
            <Input aria-label="Harness" className="h-9 w-40" value={harness} maxLength={200} placeholder="none"
              onChange={(event) => setHarnessDraft(event.target.value)} />
          </label>
          <Button variant="outline" size="sm" className="h-9" disabled={busy !== null || (name === link.name && harness === (link.harness ?? ""))}
            onClick={() => void run("link", () => updateLink(systemId, etag, link.id, { name, harness: harness.trim() || null }), "Link updated")
              .then((done) => { if (done) { setNameDraft(null); setHarnessDraft(null); } })}>
            Save
          </Button>
        </div>
      )}

      {linkIssues.length > 0 && (
        <ul className="space-y-1 rounded-md border border-warning/40 bg-warning/5 p-3 text-sm" aria-label="Findings for this link">
          {linkIssues.map((finding) => (
            <li key={findingKey(finding)} className="flex gap-2">
              <Badge variant={finding.severity === "error" ? "destructive" : finding.severity === "warning" ? "warning" : "outline"}>
                {finding.severity}
              </Badge>
              <span>
                <span className="font-medium">{finding.rule}</span> {finding.name.replace(/_/g, " ")}
                {finding.reference && ` · ${finding.reference}`}{finding.pin && ` pin ${finding.pin}`}
              </span>
            </li>
          ))}
        </ul>
      )}

      {redacted && (
        <p className="text-sm text-muted-foreground">One end of this link is on a board you cannot see, so it cannot be edited here.</p>
      )}

      <LinkRowsTable
        rows={rows}
        editable={editable}
        onSignalChange={(key, signal) => editDraft((current) => current.map((row) => (row.key === key ? { ...row, signal } : row)))}
        onRemove={(key) => editDraft((current) => current.filter((row) => row.key !== key))}
      />

      {editable && (
        <>
          <div className="flex flex-wrap items-end gap-2" aria-label="Add a row">
            <label className="space-y-1 text-xs">
              <span className="text-muted-foreground">Pin A</span>
              <select aria-label="New row pin A" className={`${SELECT_CLASS} w-24`} value={newRow.pinA}
                onChange={(event) => setNewRow({ ...newRow, pinA: event.target.value })}>
                <option value="">—</option>
                {sortedPads(pins?.a).map((pad) => <option key={pad} value={pad}>{pad}</option>)}
              </select>
            </label>
            <label className="space-y-1 text-xs">
              <span className="text-muted-foreground">Pin B</span>
              <select aria-label="New row pin B" className={`${SELECT_CLASS} w-24`} value={newRow.pinB}
                onChange={(event) => setNewRow({ ...newRow, pinB: event.target.value })}>
                <option value="">—</option>
                {sortedPads(pins?.b).map((pad) => <option key={pad} value={pad}>{pad}</option>)}
              </select>
            </label>
            <label className="space-y-1 text-xs">
              <span className="text-muted-foreground">Signal</span>
              <Input aria-label="New row signal" className="h-9 w-48" placeholder="from net A" value={newRow.signal}
                maxLength={200} onChange={(event) => setNewRow({ ...newRow, signal: event.target.value })} />
            </label>
            <Button variant="outline" size="sm" className="h-9" disabled={!newRow.pinA || !newRow.pinB} onClick={addRow}>
              <Plus className="mr-1 h-4 w-4" /> Add row
            </Button>
          </div>

          <GeneratorPanel systemId={systemId} linkId={link.id}
            onApprove={(generated) => editDraft((current) => mergeGenerated(current, generated))} />

          {draft && (
            <div className="sticky bottom-0 flex flex-wrap items-center gap-3 rounded-md border bg-card p-3 shadow-sm">
              <p className="text-sm">
                Unsaved changes: {draft.length} {draft.length === 1 ? "row" : "rows"}
                {problems.length > 0 && <span className="text-destructive"> · {problems.length} to fix before saving</span>}
              </p>
              <div className="ml-auto flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setDraft(null)} disabled={busy !== null}>Discard</Button>
                <Button size="sm" onClick={() => void save()} disabled={busy !== null || problems.length > 0}>
                  {busy === "rows" ? "Saving…" : "Save pins"}
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title="Delete this link?"
        description={`The link and its ${link.rows.length} ${link.rows.length === 1 ? "row" : "rows"} are deleted. The boards are not touched.`}
        confirmLabel="Delete link"
        destructive
        busy={busy === "delete"}
        onConfirm={() => {
          void run("delete", () => deleteLink(systemId, etag, link.id), "Link deleted").then((done) => {
            setConfirmDelete(false);
            if (done !== undefined) onDeleted();
          });
        }}
      />
    </div>
  );
}
