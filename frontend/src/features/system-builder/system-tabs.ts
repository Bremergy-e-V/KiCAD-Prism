export const SYSTEM_TABS = [
  { id: "overview", label: "Overview" },
  { id: "boards", label: "Boards" },
  { id: "diagram", label: "Diagram" },
  { id: "connectivity", label: "Connectivity" },
  { id: "changes", label: "Source changes" },
  { id: "import", label: "Import" },
  { id: "history", label: "History" },
] as const;

export type SystemTab = (typeof SYSTEM_TABS)[number]["id"];

/** The URL owns the tab (`?tab=`); anything unknown is the overview. */
export function systemTabFromParam(value: string | null): SystemTab {
  return SYSTEM_TABS.some((tab) => tab.id === value) ? (value as SystemTab) : "overview";
}
