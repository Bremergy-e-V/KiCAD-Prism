import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, Lock, Pin, PinOff, Plus, RefreshCw, RotateCcw, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useWorkspaceData, workspaceSessionKey } from "@/hooks/use-workspace-data";
import {
  addInstance,
  checkNow,
  getInstanceInterface,
  removeInstance,
  setPortOverride,
  updateInstance,
} from "@/lib/systems-api";
import { cn } from "@/lib/utils";
import type { User } from "@/types/auth";
import type { InstanceComponent, SystemDocument, SystemInstance, SystemPort } from "@/types/system";

import { BoardFields, boardProblems, instanceInput, type BoardDraft } from "./board-fields";
import type { SystemTabProps } from "./system-tab-content";
import { TONE_BADGE, boardStatus, shortSha } from "./system-format";
import { useSystemMutation } from "./use-system-mutation";

type Mutate = ReturnType<typeof useSystemMutation>["run"];

/** Port keys (and member keys) of this board that some link end uses. */
export function linkedPortKeys(document: SystemDocument, instanceId: string): Set<string> {
  const keys = new Set<string>();
  for (const link of document.links) {
    for (const end of [link.a, link.b]) {
      if (end.instanceId === instanceId && end.port) {
        keys.add(end.port.portKey);
        end.port.memberKeys.forEach((key) => keys.add(key));
      }
    }
  }
  return keys;
}

export function portState(port: Pick<SystemPort, "override" | "exposed">): "promoted" | "hidden" | "exposed" | "not exposed" {
  if (port.override === "promoted") return "promoted";
  if (port.override === "hidden") return "hidden";
  return port.exposed ? "exposed" : "not exposed";
}

export function BoardsTab({ systemId, document, etag, canEdit, user, reload }: SystemTabProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = searchParams.get("board");
  const selected = document.instances.find((instance) => instance.id === requested) ?? document.instances[0] ?? null;
  const [adding, setAdding] = useState(false);
  const { busy, run } = useSystemMutation(reload);

  const select = (instanceId: string) =>
    setSearchParams((current) => {
      const params = new URLSearchParams(current);
      params.set("board", instanceId);
      return params;
    }, { replace: true });

  return (
    <div className="grid min-h-full md:grid-cols-[16rem_1fr]">
      <aside className="space-y-1 border-b p-3 md:border-b-0 md:border-r">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Boards</h2>
          {canEdit && (
            <Button size="sm" variant="outline" onClick={() => setAdding(true)}>
              <Plus className="mr-1 h-4 w-4" /> Add
            </Button>
          )}
        </div>
        {document.instances.length === 0 && (
          <p className="text-xs text-muted-foreground">No boards yet.</p>
        )}
        {document.instances.map((instance) => {
          const status = boardStatus(instance);
          return (
            <button
              key={instance.id}
              type="button"
              onClick={() => select(instance.id)}
              aria-current={selected?.id === instance.id ? "true" : undefined}
              className={cn(
                "flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-sm",
                selected?.id === instance.id ? "bg-muted font-medium" : "hover:bg-muted/50",
              )}
            >
              <span className="flex min-w-0 items-center gap-1.5 truncate">
                {instance.restricted && <Lock className="h-3 w-3 shrink-0" aria-label="restricted" />}
                {instance.label}
              </span>
              <Badge variant={TONE_BADGE[status.tone]} className="shrink-0">{status.label}</Badge>
            </button>
          );
        })}
      </aside>

      <section className="min-w-0 p-4 md:p-6">
        {selected ? (
          <BoardDetail
            key={selected.id}
            systemId={systemId}
            document={document}
            instance={selected}
            etag={etag}
            canEdit={canEdit}
            busy={busy}
            run={run}
          />
        ) : (
          <p className="text-sm text-muted-foreground">Add a board to start building this system.</p>
        )}
      </section>

      {adding && (
        <AddBoardDialog
          user={user}
          existingLabels={document.instances.map((instance) => instance.label)}
          onClose={() => setAdding(false)}
          onSubmit={async (board) => {
            const created = await run("add", () => addInstance(systemId, etag, instanceInput(board)), `Added ${board.label.trim()}`);
            if (created) {
              setAdding(false);
              select(created.body.id);
            }
          }}
          busy={busy === "add"}
        />
      )}
    </div>
  );
}

interface BoardDetailProps {
  systemId: string;
  document: SystemDocument;
  instance: SystemInstance;
  etag: string;
  canEdit: boolean;
  busy: string | null;
  run: Mutate;
}

function BoardDetail({ systemId, document, instance, etag, canEdit, busy, run }: BoardDetailProps) {
  const status = boardStatus(instance);
  // Drafts exist only while the user is editing; otherwise the live value shows.
  const [labelDraft, setLabelDraft] = useState<string | null>(null);
  const [branchDraft, setBranchDraft] = useState<string | null>(null);
  const label = labelDraft ?? instance.label;
  const branch = branchDraft ?? instance.trackedRef ?? "";
  const [confirmRemove, setConfirmRemove] = useState(false);
  const linkCount = document.links.filter((link) => link.a.instanceId === instance.id || link.b.instanceId === instance.id).length;
  const editable = canEdit && !instance.restricted;

  if (instance.restricted) {
    return (
      <div className="space-y-2">
        <h2 className="flex items-center gap-2 text-lg font-semibold"><Lock className="h-4 w-4" /> {instance.label}</h2>
        <p className="text-sm text-muted-foreground">
          This board's project is in a folder you cannot see. Its details and connections on its side are hidden.
        </p>
      </div>
    );
  }

  const save = (fields: Parameters<typeof updateInstance>[3], message: string) =>
    run("update", () => updateInstance(systemId, etag, instance.id, fields), message);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">{instance.label}</h2>
          <p className="text-sm text-muted-foreground">{instance.projectName}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={TONE_BADGE[status.tone]}>{status.label}</Badge>
          {editable && (
            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => setConfirmRemove(true)}>
              <Trash2 className="mr-1 h-4 w-4" /> Remove
            </Button>
          )}
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{status.detail}</p>

      <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-[9rem_1fr]">
        <dt className="text-muted-foreground">Baseline</dt>
        <dd className="break-all font-mono text-xs">{instance.baselineCommit}</dd>
        <dt className="text-muted-foreground">Branch tip</dt>
        <dd className="font-mono text-xs">
          {instance.trackedRef ? shortSha(instance.tipCommit) : "—"}
          {instance.tipCheckedAt && (
            <span className="ml-2 font-sans text-muted-foreground">checked {new Date(instance.tipCheckedAt).toLocaleString()}</span>
          )}
        </dd>
        <dt className="text-muted-foreground">Label</dt>
        <dd className="flex max-w-md gap-2">
          <Input aria-label="Board label" value={label} maxLength={100} disabled={!editable}
            onChange={(event) => setLabelDraft(event.target.value)} />
          {editable && (
            <Button size="sm" variant="outline" disabled={!label.trim() || label.trim() === instance.label || busy !== null}
              onClick={() => void save({ label: label.trim() }, "Board renamed").then((done) => done && setLabelDraft(null))}>
              Rename
            </Button>
          )}
        </dd>
        <dt className="text-muted-foreground">Tracked branch</dt>
        <dd className="flex max-w-md gap-2">
          <Input aria-label="Tracked branch" className="font-mono" value={branch} maxLength={200} disabled={!editable}
            placeholder="Not tracking" onChange={(event) => setBranchDraft(event.target.value)} />
          {editable && (
            <Button size="sm" variant="outline" disabled={branch.trim() === (instance.trackedRef ?? "") || busy !== null}
              onClick={() => void save({ trackedRef: branch.trim() || null }, branch.trim() ? "Branch updated" : "Stopped tracking")
                .then((done) => done && setBranchDraft(null))}>
              Save
            </Button>
          )}
        </dd>
      </dl>

      {editable && instance.trackedRef && (
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" disabled={busy !== null}
            onClick={() => void save({ pinned: !instance.pinned }, instance.pinned ? "Unpinned" : "Pinned")}>
            {instance.pinned ? <PinOff className="mr-1 h-4 w-4" /> : <Pin className="mr-1 h-4 w-4" />}
            {instance.pinned ? "Unpin" : "Pin"}
          </Button>
          <Button variant="outline" size="sm" disabled={busy !== null}
            onClick={() => void run("check", () => checkNow(systemId, instance.id), "Checking the branch for changes")}>
            <RefreshCw className="mr-1 h-4 w-4" /> Check now
          </Button>
          <p className="self-center text-xs text-muted-foreground">
            {instance.pinned
              ? "Pinned: new commits are recorded as available updates, never applied."
              : "New commits are checked after each sync and applied or queued for review."}
          </p>
        </div>
      )}

      <PortsSection systemId={systemId} document={document} instance={instance} etag={etag} editable={editable} busy={busy} run={run} />

      <ConfirmDialog
        open={confirmRemove}
        onOpenChange={setConfirmRemove}
        title={`Remove ${instance.label}?`}
        description={linkCount > 0
          ? `This board is an end of ${linkCount} ${linkCount === 1 ? "link" : "links"}. Removing it deletes those links and their rows.`
          : "The board is removed from this system. The project itself is not touched."}
        confirmLabel="Remove board"
        destructive
        busy={busy === "remove"}
        onConfirm={() => {
          void run("remove", () => removeInstance(systemId, etag, instance.id, linkCount > 0), `Removed ${instance.label}`)
            .then(() => setConfirmRemove(false));
        }}
      />
    </div>
  );
}

interface PortsSectionProps {
  systemId: string;
  document: SystemDocument;
  instance: SystemInstance;
  etag: string;
  editable: boolean;
  busy: string | null;
  run: Mutate;
}

function PortsSection({ systemId, document, instance, etag, editable, busy, run }: PortsSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const [components, setComponents] = useState<{ key: string; items: InstanceComponent[] } | null>(null);
  const linked = linkedPortKeys(document, instance.id);
  const componentsKey = `${instance.id}:${instance.baselineCommit}:${etag}`;

  const loadComponents = useCallback(async () => {
    const result = await getInstanceInterface(systemId, instance.id);
    if (result.state === "ready") {
      setComponents({ key: componentsKey, items: result.body.components });
    } else {
      toast.info("The board interface is still being read. Try again in a moment.");
      setShowAll(false);
    }
  }, [systemId, instance.id, componentsKey]);

  // The full component list is a separate read; refresh it when the system moves on.
  useEffect(() => {
    if (showAll && components?.key !== componentsKey) {
      loadComponents().catch((error: unknown) => toast.error(error instanceof Error ? error.message : "Could not read the board"));
    }
  }, [showAll, components?.key, componentsKey, loadComponents]);

  if (instance.interface?.status !== "ready") {
    return (
      <section className="space-y-2">
        <h3 className="text-sm font-semibold">Ports</h3>
        <p className="text-sm text-muted-foreground">
          {instance.interface?.status === "failed"
            ? `The board interface could not be read (${instance.interface.errorCode ?? "unknown error"}).`
            : "Reading the board interface…"}
        </p>
      </section>
    );
  }

  const rows: SystemPort[] = showAll && components?.key === componentsKey
    ? components.items.map((component) => ({ ...component, pinCount: component.pins.length }))
    : instance.ports ?? [];

  const setOverride = (port: SystemPort, state: "hidden" | "promoted" | null, message: string) =>
    run("override", () => setPortOverride(systemId, etag, instance.id, port.portKey, state), message);

  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold">{showAll ? "All components" : "Ports"}</h3>
        <Button variant="ghost" size="sm" onClick={() => setShowAll((value) => !value)}>
          {showAll ? "Show ports only" : "Show all components"}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Connectors are detected automatically. Promote any other component to use it as a port, or hide a
        detected connector that is not one.
      </p>
      <div className="overflow-x-auto rounded-md border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-xs text-muted-foreground">
            <tr>
              <th className="px-3 py-2 font-medium">Reference</th>
              <th className="px-3 py-2 font-medium">Value</th>
              <th className="px-3 py-2 font-medium">Pins</th>
              <th className="px-3 py-2 font-medium">State</th>
              {editable && <th className="px-3 py-2 font-medium"><span className="sr-only">Actions</span></th>}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={5} className="px-3 py-4 text-center text-muted-foreground">No ports on this board.</td></tr>
            )}
            {rows.map((port) => {
              const state = portState(port);
              const isLinked = linked.has(port.portKey);
              return (
                <tr key={port.portKey} className="border-t">
                  <td className="px-3 py-2 font-medium" title={port.libId ?? undefined}>{port.reference}</td>
                  <td className="px-3 py-2 text-muted-foreground">{port.value ?? ""}</td>
                  <td className="px-3 py-2 tabular-nums">{port.pinCount}</td>
                  <td className="px-3 py-2">
                    <span className={cn(state === "hidden" || state === "not exposed" ? "text-muted-foreground" : "")}>{state}</span>
                    {isLinked && <Badge variant="outline" className="ml-2">linked</Badge>}
                  </td>
                  {editable && (
                    <td className="px-3 py-2 text-right">
                      {port.override !== null ? (
                        <Button size="sm" variant="ghost" disabled={busy !== null || (port.override === "promoted" && isLinked && !port.candidate)}
                          onClick={() => void setOverride(port, null, `${port.reference} reset`)}>
                          <RotateCcw className="mr-1 h-3.5 w-3.5" /> Reset
                        </Button>
                      ) : port.exposed ? (
                        <Button size="sm" variant="ghost" disabled={busy !== null || isLinked}
                          title={isLinked ? "A linked port cannot be hidden" : undefined}
                          onClick={() => void setOverride(port, "hidden", `${port.reference} hidden`)}>
                          <EyeOff className="mr-1 h-3.5 w-3.5" /> Hide
                        </Button>
                      ) : (
                        <Button size="sm" variant="ghost" disabled={busy !== null}
                          onClick={() => void setOverride(port, "promoted", `${port.reference} promoted`)}>
                          <Eye className="mr-1 h-3.5 w-3.5" /> Promote
                        </Button>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

interface AddBoardDialogProps {
  user: User | null;
  existingLabels: string[];
  busy: boolean;
  onClose: () => void;
  onSubmit: (board: BoardDraft) => void | Promise<void>;
}

function AddBoardDialog({ user, existingLabels, busy, onClose, onSubmit }: AddBoardDialogProps) {
  const { projects } = useWorkspaceData({ sessionKey: workspaceSessionKey(user) });
  const [board, setBoard] = useState<BoardDraft>({ key: 1, projectId: "", label: "", source: "branch", ref: "main", pinned: false });
  const [attempted, setAttempted] = useState(false);
  const problems = boardProblems([board], existingLabels);

  return (
    <Dialog open onOpenChange={(open) => !open && !busy && onClose()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add board</DialogTitle>
          <DialogDescription>Add a project as a board. The same project can appear more than once.</DialogDescription>
        </DialogHeader>
        <BoardFields board={board} index={0} projects={projects} onChange={setBoard} />
        {attempted && problems.length > 0 && (
          <ul className="list-disc space-y-0.5 pl-5 text-xs text-destructive" role="alert">
            {problems.map((problem) => <li key={problem}>{problem.replace(/^Board 1: /, "")}</li>)}
          </ul>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={busy}>Cancel</Button>
          <Button disabled={busy} onClick={() => {
            setAttempted(true);
            if (problems.length === 0) {
              void onSubmit(board);
            }
          }}>
            {busy ? "Adding…" : "Add board"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
