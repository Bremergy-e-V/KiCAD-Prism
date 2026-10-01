export const SYSTEM_TABS = [
  { id: "overview", label: "Overview" },
  { id: "diagram", label: "Diagram" },
  { id: "scene3d", label: "3D" },
  { id: "boards", label: "Boards" },
  { id: "connectivity", label: "Connections" },
  { id: "changes", label: "Changes" },
  { id: "history", label: "History" },
] as const;

export type SystemTab = (typeof SYSTEM_TABS)[number]["id"];

/** The URL owns the tab (`?tab=`); anything unknown is the overview. `import` opens the import sheet on Connections. */
export function systemTabFromParam(value: string | null): SystemTab {
  if (value === "import") return "connectivity";
  return SYSTEM_TABS.some((tab) => tab.id === value) ? (value as SystemTab) : "overview";
}
