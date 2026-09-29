import { Suspense, lazy } from "react";

import type { User } from "@/types/auth";
import type { SystemDocument } from "@/types/system";

import { BoardsTab } from "./boards-tab";
import { ChangesTab } from "./changes-tab";
import { ConnectivityTab } from "./connectivity-tab";
import { OverviewTab } from "./overview-tab";
import type { SystemTab } from "./system-tabs";

// The canvas library is only loaded when the diagram is opened.
const DiagramTab = lazy(() => import("./diagram-tab").then((module) => ({ default: module.DiagramTab })));

export interface SystemTabProps {
  systemId: string;
  document: SystemDocument;
  /** The ETag every mutation sends as `If-Match`. */
  etag: string;
  canEdit: boolean;
  user: User | null;
  reload: () => Promise<void>;
  /** Switch tab, optionally selecting something in it (`{board: id}`, `{link: id}`). */
  onNavigate: (tab: SystemTab, params?: Record<string, string>) => void;
}

export function SystemTabContent({ tab, ...props }: SystemTabProps & { tab: SystemTab }) {
  switch (tab) {
    case "overview":
      return <OverviewTab {...props} />;
    case "boards":
      return <BoardsTab {...props} />;
    case "changes":
      return <ChangesTab {...props} />;
    case "connectivity":
      return <ConnectivityTab {...props} />;
    case "diagram":
      return (
        <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading diagram…</div>}>
          <DiagramTab {...props} />
        </Suspense>
      );
    default:
      return (
        <div className="p-6 text-sm text-muted-foreground">This section is not available yet.</div>
      );
  }
}
