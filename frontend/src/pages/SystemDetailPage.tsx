import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Boxes, GitPullRequestArrow } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SystemTabContent } from "@/features/system-builder/system-tab-content";
import { SYSTEM_TABS, systemTabFromParam, type SystemTab } from "@/features/system-builder/system-tabs";
import { useSystemDocument } from "@/features/system-builder/use-system-document";
import { canManageProjects } from "@/lib/roles";
import { cn } from "@/lib/utils";
import type { User } from "@/types/auth";

interface SystemDetailPageProps {
  user: User | null;
}

export function SystemDetailPage({ user }: SystemDetailPageProps) {
  const { systemId = "" } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = systemTabFromParam(searchParams.get("tab"));
  const state = useSystemDocument(systemId);
  const system = state.document?.system ?? null;
  const canEdit = canManageProjects(user?.role);

  /** Switch tab; per-tab selections (`board`, `link`, …) belong to their tab and are replaced. */
  const setTab = (next: SystemTab, extra: Record<string, string> = {}) => {
    setSearchParams(() => {
      const params = new URLSearchParams();
      if (next !== "overview") {
        params.set("tab", next);
      }
      for (const [key, value] of Object.entries(extra)) {
        params.set(key, value);
      }
      return params;
    });
  };

  const back = () => navigate(system?.folderId ? `/?folder=${encodeURIComponent(system.folderId)}` : "/");

  if (state.notFound) {
    return (
      <div className="flex h-app-viewport flex-col items-center justify-center gap-3 bg-background text-center">
        <p className="text-lg font-semibold">System not found</p>
        <p className="text-sm text-muted-foreground">It may have been deleted, or it is in a folder you cannot see.</p>
        <Button variant="outline" onClick={() => navigate("/")}>Back to workspace</Button>
      </div>
    );
  }

  const counts = state.document?.findingCounts;
  return (
    <div className="flex h-app-viewport flex-col bg-background">
      <header className="flex items-center gap-4 border-b px-4 py-4 md:px-6">
        <Button variant="ghost" size="sm" onClick={back}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Boxes className="h-5 w-5 shrink-0 text-primary" />
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold">{system?.name ?? ""}</h1>
            {system?.description && (
              <p className="hidden truncate text-sm text-muted-foreground md:block">{system.description}</p>
            )}
          </div>
        </div>
        {system && (
          <div className="flex shrink-0 items-center gap-2">
            {system.openReviewCount > 0 && (
              <button type="button" onClick={() => setTab("changes")} aria-label="Open source changes">
                <Badge variant="warning" className="cursor-pointer">
                  <GitPullRequestArrow /> {system.openReviewCount} to review
                </Badge>
              </button>
            )}
            {counts && counts.error > 0 && (
              <Badge variant="destructive"><AlertTriangle /> {counts.error} {counts.error === 1 ? "error" : "errors"}</Badge>
            )}
            {counts && counts.warning > 0 && (
              <Badge variant="outline">{counts.warning} {counts.warning === 1 ? "warning" : "warnings"}</Badge>
            )}
          </div>
        )}
      </header>

      <nav className="flex gap-1 overflow-x-auto border-b px-4 md:px-6" aria-label="System sections">
        {SYSTEM_TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => setTab(item.id)}
            className={cn(
              "-mb-px whitespace-nowrap border-b-2 px-3 py-2.5 text-sm transition-colors",
              tab === item.id
                ? "border-primary font-medium text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <main className="min-h-0 flex-1 overflow-auto">
        {state.error && !state.document ? (
          <div className="m-6 rounded-md border border-destructive/40 p-4 text-sm text-destructive" role="alert">
            {state.error}
            <Button variant="outline" size="sm" className="ml-3" onClick={() => void state.reload()}>Retry</Button>
          </div>
        ) : state.document && state.etag ? (
          <SystemTabContent
            tab={tab}
            systemId={systemId}
            document={state.document}
            etag={state.etag}
            canEdit={canEdit}
            user={user}
            reload={state.reload}
            onNavigate={setTab}
          />
        ) : (
          <div className="p-6 text-sm text-muted-foreground">Loading…</div>
        )}
      </main>
    </div>
  );
}
