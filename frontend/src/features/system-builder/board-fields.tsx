import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Project } from "@/types/project";

export const SELECT_CLASS =
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

export const projectName = (project: Project) => project.display_name || project.name;

/** Problems with the boards themselves; `existingLabels` are labels already in the system. */
export function boardProblems(boards: BoardDraft[], existingLabels: string[] = []): string[] {
  const problems: string[] = [];
  const labels = new Map<string, number>(existingLabels.map((label) => [label.toLowerCase(), 1]));
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

/** A board draft with its project chosen, suggesting a label until one is typed. */
export function withProject(board: BoardDraft, projectId: string, projects: Project[]): BoardDraft {
  const project = projects.find((candidate) => candidate.id === projectId);
  const suggested = board.label === "" || projects.some((p) => projectName(p) === board.label);
  return { ...board, projectId, label: suggested && project ? projectName(project) : board.label };
}

export function instanceInput(board: BoardDraft) {
  const ref = board.ref.trim();
  return {
    projectId: board.projectId,
    label: board.label.trim(),
    baselineCommit: board.source === "commit" ? ref : null,
    trackedRef: board.source === "branch" ? ref : null,
    pinned: board.source === "branch" ? board.pinned : false,
  };
}

interface BoardFieldsProps {
  board: BoardDraft;
  index: number;
  projects: Project[];
  onChange: (next: BoardDraft) => void;
  onRemove?: () => void;
}

export function BoardFields({ board, index, projects, onChange, onRemove }: BoardFieldsProps) {
  const sorted = [...projects].sort((a, b) => projectName(a).localeCompare(projectName(b)));
  return (
    <fieldset className="space-y-2 rounded-md border p-3" aria-label={`Board ${index + 1}`}>
      <div className={onRemove ? "grid gap-2 sm:grid-cols-[1fr_10rem_auto]" : "grid gap-2 sm:grid-cols-[1fr_10rem]"}>
        <select
          aria-label={`Board ${index + 1} project`}
          className={SELECT_CLASS}
          value={board.projectId}
          onChange={(event) => onChange(withProject(board, event.target.value, projects))}
        >
          <option value="">Choose a project…</option>
          {sorted.map((project) => (
            <option key={project.id} value={project.id}>{projectName(project)}</option>
          ))}
        </select>
        <Input aria-label={`Board ${index + 1} label`} value={board.label} maxLength={100}
          placeholder="Label, e.g. OBC-A" onChange={(event) => onChange({ ...board, label: event.target.value })} />
        {onRemove && (
          <Button type="button" variant="ghost" size="icon" aria-label={`Remove board ${index + 1}`} onClick={onRemove}>
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="grid items-center gap-2 sm:grid-cols-[10rem_1fr_auto]">
        <select
          aria-label={`Board ${index + 1} source`}
          className={SELECT_CLASS}
          value={board.source}
          onChange={(event) => {
            const source = event.target.value as BoardSource;
            onChange({ ...board, source, ref: source === "branch" ? "main" : "" });
          }}
        >
          <option value="branch">Track a branch</option>
          <option value="commit">Fixed commit</option>
        </select>
        <Input aria-label={`Board ${index + 1} ${board.source === "branch" ? "branch" : "commit"}`}
          className="font-mono" value={board.ref}
          maxLength={board.source === "branch" ? 200 : 40}
          placeholder={board.source === "branch" ? "main" : "Commit SHA"}
          onChange={(event) => onChange({ ...board, ref: event.target.value })} />
        {board.source === "branch" && (
          <label className="flex items-center gap-1.5 text-xs text-muted-foreground"
            title="Record new commits as available updates instead of reviewing them">
            <input type="checkbox" aria-label={`Board ${index + 1} pinned`} checked={board.pinned}
              onChange={(event) => onChange({ ...board, pinned: event.target.checked })} />
            Pinned
          </label>
        )}
      </div>
    </fieldset>
  );
}
