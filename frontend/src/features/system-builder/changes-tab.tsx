import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2, GitCommitHorizontal, Pin, Wand2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  decideReviewItem,
  getHistory,
  keepPinned,
  listReviews,
  rebaseInstance,
} from "@/lib/systems-api";
import { cn } from "@/lib/utils";
import type { AuditEvent, Decision, Review, ReviewItem, SystemDocument, SystemInstance } from "@/types/system";

import { SELECT_CLASS } from "./board-fields";
import {
  DECISION_LABELS,
  KIND_LABELS,
  allowedDecisions,
  automaticEvents,
  describeValue,
  groupItems,
  progress,
} from "./review-model";
import type { SystemTabProps } from "./system-tab-content";
import { shortSha } from "./system-format";
import { useSystemMutation } from "./use-system-mutation";

type Mutate = ReturnType<typeof useSystemMutation>["run"];

interface Loaded {
  etag: string;
  reviews: Review[];
  events: AuditEvent[];
}

function linkName(document: SystemDocument, linkId: string | null): string {
  const link = document.links.find((candidate) => candidate.id === linkId);
  return link ? link.name || `${link.a.port?.reference ?? "?"} ↔ ${link.b.port?.reference ?? "?"}` : "deleted link";
}

export function ChangesTab({ systemId, document, etag, canEdit, reload, onNavigate }: SystemTabProps) {
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [failed, setFailed] = useState<string | null>(null);
  const { busy, run } = useSystemMutation(reload);

  // Reviews and recent automatic changes follow the system version.
  useEffect(() => {
    let cancelled = false;
    Promise.all([listReviews(systemId, "open"), getHistory(systemId, null, 50)])
      .then(([reviews, history]) => {
        if (!cancelled) {
          setLoaded({ etag, reviews, events: history.events });
          setFailed(null);
        }
      })
      .catch((error: unknown) => !cancelled && setFailed(error instanceof Error ? error.message : "Could not load changes"));
    return () => {
      cancelled = true;
    };
  }, [systemId, etag]);

  if (failed && !loaded) {
    return <p className="p-6 text-sm text-destructive" role="alert">{failed}</p>;
  }
  if (!loaded) {
    return <p className="p-6 text-sm text-muted-foreground">Loading changes…</p>;
  }

  const instances = new Map(document.instances.map((instance) => [instance.id, instance]));
  const updates = document.instances.filter((instance) => instance.pinned && instance.updateAvailable && !instance.restricted);
  const automatic = automaticEvents(loaded.events).slice(0, 10);
  const nothing = loaded.reviews.length === 0 && updates.length === 0;

  return (
    <div className="space-y-6 p-4 md:p-6">
      {nothing && (
        <div className="flex items-center gap-2 rounded-md border p-4 text-sm">
          <CheckCircle2 className="h-4 w-4 text-success" />
          Every board is at its accepted baseline. Nothing needs review.
        </div>
      )}

      {loaded.reviews.map((review) => (
        <ReviewCard
          key={review.id}
          systemId={systemId}
          document={document}
          review={review}
          instance={review.instanceId ? instances.get(review.instanceId) ?? null : null}
          etag={etag}
          canEdit={canEdit}
          busy={busy}
          run={run}
          onOpenLink={(linkId) => onNavigate("connectivity", { link: linkId })}
        />
      ))}

      {updates.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-sm font-semibold">Updates available on pinned boards</h2>
          {updates.map((instance) => (
            <UpdateRow key={instance.id} systemId={systemId} instance={instance} etag={etag} canEdit={canEdit} busy={busy} run={run} />
          ))}
        </section>
      )}

      {automatic.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-sm font-semibold">Applied automatically</h2>
          <p className="text-xs text-muted-foreground">
            Changes that kept every connected pin on the same nets are applied without review.
          </p>
          <ul className="divide-y rounded-md border text-sm">
            {automatic.map((event) => (
              <li key={event.id} className="flex flex-wrap items-center gap-2 px-3 py-2">
                <Wand2 className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{event.kind.replace(/_/g, " ")}</span>
                <span className="text-muted-foreground">{automaticSummary(event, instances)}</span>
                <span className="ml-auto text-xs text-muted-foreground">{new Date(event.at).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function automaticSummary(event: AuditEvent, instances: Map<string, SystemInstance>): string {
  if (event.redacted || !event.payload) {
    return "on a restricted board";
  }
  const payload = event.payload as Record<string, unknown>;
  const board = typeof payload.instanceId === "string" ? instances.get(payload.instanceId)?.label ?? "" : "";
  if (event.kind === "baseline_auto_advanced") {
    return `${board} ${shortSha(payload.from as string)} → ${shortSha(payload.to as string)}`;
  }
  const before = payload.before as { reference?: string } | undefined;
  const after = payload.after as { reference?: string } | undefined;
  return `${board} ${before?.reference ?? ""} → ${after?.reference ?? ""}`.trim();
}

interface ReviewCardProps {
  systemId: string;
  document: SystemDocument;
  review: Review;
  instance: SystemInstance | null;
  etag: string;
  canEdit: boolean;
  busy: string | null;
  run: Mutate;
  onOpenLink: (linkId: string) => void;
}

function ReviewCard({ systemId, document, review, instance, etag, canEdit, busy, run, onOpenLink }: ReviewCardProps) {
  const title = review.kind === "import" ? "CSV import" : instance?.label ?? "Board";
  const { decided, total } = progress(review);
  const groups = groupItems(review.items ?? []);
  const silent = review.pendingChanges?.silent ?? [];
  const editable = canEdit && !review.redacted;

  return (
    <section className="space-y-3 rounded-lg border p-4" aria-label={`Review ${title}`}>
      <header className="flex flex-wrap items-center gap-2">
        <h2 className="text-base font-semibold">{title}</h2>
        <Badge variant="outline">{review.kind.replace(/_/g, " ")}</Badge>
        {review.fromCommit && (
          <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
            <GitCommitHorizontal className="h-3.5 w-3.5" /> {shortSha(review.fromCommit)}
            <ArrowRight className="h-3 w-3" /> {shortSha(review.toCommit)}
          </span>
        )}
        {total > 0 && <span className="text-xs text-muted-foreground">{decided} of {total} decided</span>}
        {editable && review.kind === "source_update" && (
          <Button variant="outline" size="sm" className="ml-auto" disabled={busy !== null}
            title="Close this review, keep the current baseline and pin the board"
            onClick={() => void run("pin", () => keepPinned(systemId, etag, review.id), `${title} kept pinned`)}>
            <Pin className="mr-1 h-4 w-4" /> Keep pinned
          </Button>
        )}
      </header>

      {review.redacted && <p className="text-sm text-muted-foreground">This review is on a board you cannot see.</p>}

      {review.kind === "baseline_unreachable" && instance && (
        <div className="space-y-2 text-sm">
          <p>
            The accepted baseline {shortSha(instance.baselineCommit)} is no longer in the repository (the branch was
            probably rewritten). Rebase the board onto a commit that exists to re-check its connections.
          </p>
          {editable && <RebaseForm systemId={systemId} instance={instance} etag={etag} busy={busy} run={run} />}
        </div>
      )}

      {silent.length > 0 && (
        <Group title="Resolved automatically when applied" tone="ok">
          {silent.map((change) => (
            <li key={`${change.kind}-${change.linkId}-${change.end}`} className="px-3 py-2 text-sm">
              <span className="font-medium">{change.kind.replace(/_/g, " ")}</span>{" "}
              <span className="text-muted-foreground">
                {linkName(document, change.linkId)} end {change.end.toUpperCase()}
                {" · "}{describeValue((change.before as { reference?: string } | undefined)?.reference)}
                {" → "}{describeValue((change.after as { reference?: string } | undefined)?.reference)}
              </span>
            </li>
          ))}
        </Group>
      )}

      {groups.conflict.length > 0 && (
        <Group title="Conflicts: choose a new mapping" tone="error">
          {groups.conflict.map((item) => (
            <ItemRow key={item.id} systemId={systemId} document={document} review={review} item={item} etag={etag}
              editable={editable} busy={busy} run={run} onOpenLink={onOpenLink} />
          ))}
        </Group>
      )}
      {groups.review.length > 0 && (
        <Group title="Review required" tone="warning">
          {groups.review.map((item) => (
            <ItemRow key={item.id} systemId={systemId} document={document} review={review} item={item} etag={etag}
              editable={editable} busy={busy} run={run} onOpenLink={onOpenLink} />
          ))}
        </Group>
      )}
      {total > 0 && decided < total && (
        <p className="text-xs text-muted-foreground">
          The review is applied, all at once, when its last item is decided. Decisions can be changed until then.
        </p>
      )}
    </section>
  );
}

function Group({ title, tone, children }: { title: string; tone: "ok" | "warning" | "error"; children: React.ReactNode }) {
  return (
    <div className={cn("rounded-md border", tone === "error" && "border-destructive/40", tone === "warning" && "border-warning/40")}>
      <h3 className={cn("border-b px-3 py-1.5 text-xs font-semibold uppercase tracking-wide",
        tone === "error" ? "text-destructive" : tone === "warning" ? "text-warning" : "text-success")}>
        {title}
      </h3>
      <ul className="divide-y">{children}</ul>
    </div>
  );
}

interface ItemRowProps {
  systemId: string;
  document: SystemDocument;
  review: Review;
  item: ReviewItem;
  etag: string;
  editable: boolean;
  busy: string | null;
  run: Mutate;
  onOpenLink: (linkId: string) => void;
}

function ItemRow({ systemId, document, review, item, etag, editable, busy, run, onOpenLink }: ItemRowProps) {
  const [pad, setPad] = useState("");
  const [candidate, setCandidate] = useState(item.candidates?.[0]?.portKey ?? "");
  const [signal, setSignal] = useState("");
  const allowed = allowedDecisions(review, item.kind);
  const proposal = review.kind === "import" ? (item.observed as { from?: { label: string; reference: string; pin: string }; to?: { label: string; reference: string; pin: string }; signal?: string } | null) : null;

  const decide = (decision: Decision, payload?: Record<string, unknown>) =>
    run("decide", () => decideReviewItem(systemId, etag, review.id, item.id, decision, payload),
      `${DECISION_LABELS[decision]} recorded`);

  if (item.redacted) {
    return <li className="px-3 py-2 text-sm text-muted-foreground">An item on a board you cannot see.</li>;
  }

  return (
    <li className="space-y-2 px-3 py-2 text-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-medium">{KIND_LABELS[item.kind]}</span>
        {item.linkId && (
          <button type="button" className="text-primary hover:underline" onClick={() => onOpenLink(item.linkId as string)}>
            {linkName(document, item.linkId)}
          </button>
        )}
        {item.end && <span className="text-muted-foreground">end {item.end.toUpperCase()}</span>}
        {item.pins.length > 0 && <span className="font-mono text-xs text-muted-foreground">pins {item.pins.join(", ")}</span>}
        {item.decision && (
          <Badge variant="success" className="ml-auto">
            {DECISION_LABELS[item.decision]}
            {item.decisionPayload?.pad ? ` → ${String(item.decisionPayload.pad)}` : ""}
          </Badge>
        )}
      </div>

      {proposal ? (
        <p className="font-mono text-xs">
          {proposal.from?.label}/{proposal.from?.reference}.{proposal.from?.pin} ↔ {proposal.to?.label}/{proposal.to?.reference}.{proposal.to?.pin}
          {" · signal "}<span className="text-warning">{proposal.signal}</span>
          {" · nets "}{describeValue((item.expected as { leaves?: string[] } | null)?.leaves)}
        </p>
      ) : item.kind !== "connector_missing" ? (
        <div className="grid gap-1 font-mono text-xs sm:grid-cols-2">
          <span className="rounded bg-destructive/10 px-2 py-1"><span className="text-muted-foreground">− </span>{describeValue(item.expected)}</span>
          <span className="rounded bg-success/10 px-2 py-1"><span className="text-muted-foreground">+ </span>{describeValue(item.observed)}</span>
        </div>
      ) : null}

      {item.kind === "connector_missing" && (item.candidates?.length ?? 0) === 0 && (
        <p className="text-xs text-muted-foreground">No candidate connector was found. Fix the board, or delete the link.</p>
      )}

      {editable && allowed.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {allowed.includes("accept") && (
            review.kind === "import" ? (
              <>
                <Input aria-label="Signal to use" className="h-8 w-40 text-xs" placeholder={proposal?.signal ?? "signal"}
                  value={signal} maxLength={200} onChange={(event) => setSignal(event.target.value)} />
                <Button size="sm" variant="outline" disabled={busy !== null}
                  onClick={() => void decide("accept", signal.trim() ? { signal: signal.trim() } : undefined)}>
                  Create row
                </Button>
              </>
            ) : (
              <Button size="sm" variant="outline" disabled={busy !== null} onClick={() => void decide("accept")}>Accept</Button>
            )
          )}
          {allowed.includes("remap") && (
            <>
              <Input aria-label="Remap to pad" className="h-8 w-24 font-mono text-xs" placeholder="pad" value={pad}
                maxLength={100} onChange={(event) => setPad(event.target.value)} />
              <Button size="sm" variant="outline" disabled={busy !== null || !pad.trim()}
                onClick={() => void decide("remap", { pad: pad.trim() })}>
                Remap
              </Button>
            </>
          )}
          {allowed.includes("bind_candidate") && (item.candidates?.length ?? 0) > 0 && (
            <>
              <select aria-label="Candidate connector" className={cn(SELECT_CLASS, "h-8 w-auto text-xs")} value={candidate}
                onChange={(event) => setCandidate(event.target.value)}>
                {item.candidates?.map((option) => (
                  <option key={option.portKey} value={option.portKey}>
                    {option.reference} · {Math.round(option.netOverlap * 100)}% nets
                    {option.libIdEqual ? " · same part" : ""}{option.pinCountEqual ? "" : " · pin count differs"}
                  </option>
                ))}
              </select>
              <Button size="sm" variant="outline" disabled={busy !== null || !candidate}
                onClick={() => void decide("bind_candidate", { portKey: candidate })}>
                Bind
              </Button>
            </>
          )}
          {allowed.includes("remove_rows") && (
            <Button size="sm" variant="ghost" className="text-destructive" disabled={busy !== null}
              onClick={() => void decide("remove_rows")}>
              {review.kind === "import" ? "Skip row" : "Remove rows"}
            </Button>
          )}
        </div>
      )}
    </li>
  );
}

interface RebaseProps {
  systemId: string;
  instance: SystemInstance;
  etag: string;
  busy: string | null;
  run: Mutate;
}

function RebaseForm({ systemId, instance, etag, busy, run }: RebaseProps) {
  const [commit, setCommit] = useState(instance.tipCommit ?? "");
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Input aria-label="Commit to rebase onto" className="h-8 w-80 font-mono text-xs" value={commit} maxLength={40}
        placeholder="commit SHA" onChange={(event) => setCommit(event.target.value)} />
      <Button size="sm" variant="outline" disabled={busy !== null || commit.trim().length < 7}
        onClick={() => void rebase(systemId, instance, etag, commit.trim(), run)}>
        Rebase
      </Button>
    </div>
  );
}

function UpdateRow({ systemId, instance, etag, canEdit, busy, run }: RebaseProps & { canEdit: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-md border p-3 text-sm">
      <span className="font-medium">{instance.label}</span>
      <span className="font-mono text-xs text-muted-foreground">
        {shortSha(instance.baselineCommit)} <ArrowRight className="inline h-3 w-3" /> {shortSha(instance.tipCommit)} on {instance.trackedRef}
      </span>
      {canEdit && instance.tipCommit && (
        <Button size="sm" variant="outline" className="ml-auto" disabled={busy !== null}
          onClick={() => void rebase(systemId, instance, etag, instance.tipCommit as string, run)}>
          Rebase to tip
        </Button>
      )}
    </div>
  );
}

async function rebase(systemId: string, instance: SystemInstance, etag: string, commit: string, run: Mutate) {
  const result = await run("rebase", () => rebaseInstance(systemId, etag, instance.id, commit));
  if (!result) {
    return;
  }
  if (result.state === "queued") {
    toast.info(`Reading ${instance.label} at ${shortSha(commit)}. Try the rebase again in a moment.`);
  } else if (result.body.outcome === "review_opened") {
    toast.warning(`${instance.label} rebased: some connections need review.`);
  } else {
    toast.success(`${instance.label} rebased to ${shortSha(commit)}.`);
  }
}
