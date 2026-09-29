import type { SystemDocument } from "@/types/system";

import type { SystemTab } from "./system-tabs";

export interface SystemTabProps {
  systemId: string;
  document: SystemDocument;
  /** The ETag every mutation sends as `If-Match`. */
  etag: string;
  canEdit: boolean;
  reload: () => Promise<void>;
  onNavigateTab: (tab: SystemTab) => void;
}

export function SystemTabContent({ tab, ...props }: SystemTabProps & { tab: SystemTab }) {
  switch (tab) {
    default:
      return <PendingTab document={props.document} />;
  }
}

function PendingTab({ document }: { document: SystemDocument }) {
  return (
    <div className="p-6 text-sm text-muted-foreground">
      {document.instances.length} {document.instances.length === 1 ? "board" : "boards"} ·{" "}
      {document.links.length} {document.links.length === 1 ? "link" : "links"}
    </div>
  );
}
