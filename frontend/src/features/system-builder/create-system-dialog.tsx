import { useRef, useState, type KeyboardEvent } from "react";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { isDialogSubmitShortcut } from "@/lib/dialog-shortcuts";
import { addInstance, createSystem } from "@/lib/systems-api";
import type { Project } from "@/types/project";

const SELECT_CLASS =
  "h-9 w-full rounded-md border border-input bg-background px-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export type BoardSource = "branch" | "commit";

export interface BoardDraft {
  key: number;
  projectId: string;
  label: string;
  source: BoardSource;
  /** Branch name for `branch`, SHA (or unambiguous prefix) for `commit`. */
  ref: string;
  pinned: boolean;
}

export interface CreatedSystem {
  systemId: string;
  /** Boards the server refused, with its reason; the system itself exists. */
  failures: { label: string; error: string }[];
}

const projectName = (project: Project) => project.display_name || project.name;

/** Problems that stop submission, or an empty list. */
export function validateDraft(name: string, boards: BoardDraft[]): string[] {
  const problems: string[] = [];
  if (!name.trim()) {
    problems.push("Name the system.");
  }
  const labels = new Map<string, number>();
  boards.forEach((board, index) => {
    const label = board.label.trim();
    if (!board.projectId) {
      problems.push(`Board ${index + 1}: choose a project.`);
    }
    if (!label) {
      problems.push(`Board ${index + 1}: give it a label.`);
    } else {
      labels.set(label.toLowerCase(), (labels.get(label.toLowerCase()) ?? 0) + 1);
    }
    if (!board.ref.trim()) {
      problems.push(`Board ${index + 1}: ${board.source === "branch" ? "name the branch to track" : "enter a commit"}.`);
    } else if (board.source === "commit" && !/^[0-9a-f]{7,40}$/i.test(board.ref.trim())) {
      problems.push(`Board ${index + 1}: a commit is 7 to 40 hex characters.`);
    }
  });
  for (const [label, count] of labels) {
    if (count > 1) {
      problems.push(`Labels must be unique: "${label}" is used ${count} times.`);
    }
  }
  return problems;
}

/**
 * Create the system, then add each board in order, carrying the ETag from one
 * call to the next. A refused board does not undo the system: the caller can
 * fix it on the system page.
 */
export async function submitSystem(
  input: { name: string; description: string; folderId: string | null },
  boards: BoardDraft[],
): Promise<CreatedSystem> {
  const created = await createSystem({
    name: input.name.trim(), description: input.description.trim(), folderId: input.folderId,
  });
  let etag = created.etag ?? created.body.etag;
  const failures: CreatedSystem["failures"] = [];
  for (const board of boards) {
    const ref = board.ref.trim();
    try {
      const added = await addInstance(created.body.id, etag, {
        projectId: board.projectId,
        label: board.label.trim(),
        baselineCommit: board.source === "commit" ? ref : null,
        trackedRef: board.source === "branch" ? ref : null,
        pinned: board.source === "branch" ? board.pinned : false,
      });
      etag = added.etag ?? etag;
    } catch (error) {
      failures.push({ label: board.label.trim(), error: error instanceof Error ? error.message : String(error) });
    }
  }
  return { systemId: created.body.id, failures };
}

interface CreateSystemDialogProps {
  open: boolean;
  projects: Project[];
  folderId: string | null;
  folderName: string | null;
  onOpenChange: (open: boolean) => void;
  onCreated: (result: CreatedSystem) => void;
}

export function CreateSystemDialog({ open, projects, folderId, folderName, onOpenChange, onCreated }: CreateSystemDialogProps) {
  // Mounted only while open, so each open starts from a fresh form.
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [boards, setBoards] = useState<BoardDraft[]>([]);
  const nextKey = useRef(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempted, setAttempted] = useState(false);

  const sortedProjects = [...projects].sort((a, b) => projectName(a).localeCompare(projectName(b)));
  const problems = validateDraft(name, boards);

  const addBoard = () => {
    const key = nextKey.current;
    nextKey.current += 1;
    setBoards((current) => [...current, { key, projectId: "", label: "", source: "branch", ref: "main", pinned: false }]);
  };

  const updateBoard = (key: number, patch: Partial<BoardDraft>) => {
    setBoards((current) => current.map((board) => (board.key === key ? { ...board, ...patch } : board)));
  };

  const chooseProject = (key: number, projectId: string) => {
    const project = projects.find((candidate) => candidate.id === projectId);
    setBoards((current) => current.map((board) => {
      if (board.key !== key) {
        return board;
      }
      // Suggest a label from the project until the user types their own.
      const suggested = board.label === "" || projects.some((p) => projectName(p) === board.label);
      return { ...board, projectId, label: suggested && project ? projectName(project) : board.label };
    }));
  };

  const submit = async () => {
    setAttempted(true);
    if (problems.length > 0 || submitting) {
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      onCreated(await submitSystem({ name, description, folderId }, boards));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not create the system");
      setSubmitting(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (isDialogSubmitShortcut(event)) {
      event.preventDefault();
      void submit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !submitting && onOpenChange(next)}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl" onKeyDown={handleKeyDown}>
        <DialogHeader>
          <DialogTitle>New system</DialogTitle>
          <DialogDescription>
            A system connects several boards through their connectors.
            {` It will be created in ${folderName ?? "the workspace root"}.`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="system-name">Name</Label>
            <Input id="system-name" value={name} maxLength={200} onChange={(event) => setName(event.target.value)}
              placeholder="Flight stack" autoFocus />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="system-description">Description</Label>
            <Textarea id="system-description" value={description} maxLength={4000} rows={2}
              onChange={(event) => setDescription(event.target.value)} placeholder="Optional" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Boards</Label>
              <Button type="button" variant="outline" size="sm" onClick={addBoard} disabled={projects.length === 0}>
                <Plus className="mr-1 h-4 w-4" /> Add board
              </Button>
            </div>
            {boards.length === 0 && (
              <p className="text-xs text-muted-foreground">
                {projects.length === 0
                  ? "Import a project first; boards are projects in this workspace."
                  : "Optional. You can add boards later, and the same project can appear more than once."}
              </p>
            )}
            {boards.map((board, index) => (
              <fieldset key={board.key} className="space-y-2 rounded-md border p-3" aria-label={`Board ${index + 1}`}>
                <div className="grid gap-2 sm:grid-cols-[1fr_10rem_auto]">
                  <select
                    aria-label={`Board ${index + 1} project`}
                    className={SELECT_CLASS}
                    value={board.projectId}
                    onChange={(event) => chooseProject(board.key, event.target.value)}
                  >
                    <option value="">Choose a project…</option>
                    {sortedProjects.map((project) => (
                      <option key={project.id} value={project.id}>{projectName(project)}</option>
                    ))}
                  </select>
                  <Input aria-label={`Board ${index + 1} label`} value={board.label} maxLength={100}
                    placeholder="Label, e.g. OBC-A" onChange={(event) => updateBoard(board.key, { label: event.target.value })} />
                  <Button type="button" variant="ghost" size="icon" aria-label={`Remove board ${index + 1}`}
                    onClick={() => setBoards((current) => current.filter((item) => item.key !== board.key))}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid items-center gap-2 sm:grid-cols-[10rem_1fr_auto]">
                  <select
                    aria-label={`Board ${index + 1} source`}
                    className={SELECT_CLASS}
                    value={board.source}
                    onChange={(event) => {
                      const source = event.target.value as BoardSource;
                      updateBoard(board.key, { source, ref: source === "branch" ? "main" : "" });
                    }}
                  >
                    <option value="branch">Track a branch</option>
                    <option value="commit">Fixed commit</option>
                  </select>
                  <Input aria-label={`Board ${index + 1} ${board.source === "branch" ? "branch" : "commit"}`}
                    className="font-mono" value={board.ref}
                    maxLength={board.source === "branch" ? 200 : 40}
                    placeholder={board.source === "branch" ? "main" : "Commit SHA"}
                    onChange={(event) => updateBoard(board.key, { ref: event.target.value })} />
                  {board.source === "branch" && (
                    <label className="flex items-center gap-1.5 text-xs text-muted-foreground" title="Record new commits as available updates instead of reviewing them">
                      <input type="checkbox" aria-label={`Board ${index + 1} pinned`} checked={board.pinned}
                        onChange={(event) => updateBoard(board.key, { pinned: event.target.checked })} />
                      Pinned
                    </label>
                  )}
                </div>
              </fieldset>
            ))}
          </div>

          {attempted && problems.length > 0 && (
            <ul className="list-disc space-y-0.5 pl-5 text-xs text-destructive" role="alert">
              {problems.map((problem) => <li key={problem}>{problem}</li>)}
            </ul>
          )}
          {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>Cancel</Button>
          <Button onClick={() => void submit()} disabled={submitting}>
            {submitting ? "Creating…" : "Create system"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
