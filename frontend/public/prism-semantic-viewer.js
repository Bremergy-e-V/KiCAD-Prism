var or=`:host,
:root {
  color-scheme: dark;
  --shell: var(--prism-shell, #09090b);
  --panel: var(--prism-panel, #09090b);
  --panel-raised: var(--prism-panel-raised, #18181b);
  --control: var(--prism-control, #18181b);
  --control-hover: var(--prism-control-hover, #27272a);
  --foreground: var(--prism-foreground, #fafafa);
  --muted: var(--prism-muted, #a1a1aa);
  --border: var(--prism-border, #27272a);
  --primary: var(--prism-primary, #3b82f6);
  --primary-foreground: var(--prism-primary-foreground, var(--panel));
  --surface: var(--prism-shell, #09090b);
  --stackup-via-thru: color-mix(in srgb, var(--primary) 34%, var(--foreground));
  --stackup-via-blind: var(--primary);
  --stackup-via-buried: color-mix(in srgb, var(--primary) 58%, var(--muted));
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

:host {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  background: var(--shell);
  color: var(--foreground);
}

html,
body {
  width: 100%;
  height: 100%;
  min-height: 0;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  overflow: hidden;
  background: var(--shell);
  color: var(--foreground);
}

button,
input {
  font: inherit;
}

#app {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr) 376px;
  height: 100%;
  min-height: 0;
  background: var(--shell);
  color: var(--foreground);
  transition: grid-template-columns 180ms ease;
}

#app.panel-collapsed {
  grid-template-columns: 48px minmax(0, 1fr) 46px;
}

.workspace-rail {
  position: relative;
  z-index: 8;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border);
  background: var(--panel);
}

.workspace-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 132px;
  padding: 0;
  border: 0;
  border-bottom: 1px solid var(--border);
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  font-size: 11px;
  font-weight: 700;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

.workspace-tab:hover {
  background: var(--control);
  color: var(--foreground);
}

.workspace-tab.active {
  box-shadow: inset -2px 0 var(--primary);
  background: var(--panel-raised);
  color: var(--foreground);
}

.viewport-shell {
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  background: var(--surface);
}

#viewport {
  display: block;
  width: 100%;
  height: 100%;
}

#schematic-viewport {
  display: block;
  width: 100%;
  height: 100%;
  background: #0b0e13;
}

#schematic-dom-layer {
  position: absolute;
  inset: 0;
  z-index: 2;
  overflow: hidden;
  background: transparent;
  touch-action: none;
}

#schematic-flow-overlay {
  position: absolute;
  inset: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.svg-dom-page {
  position: absolute;
  left: 0;
  top: 0;
  transform-origin: 0 0;
  will-change: transform;
}

.svg-dom-page-svg {
  display: block;
  overflow: visible;
  background: #f4f1e7;
  box-shadow: 0 18px 58px rgba(0, 0, 0, 0.22);
}

.svg-dom-world-page {
  overflow: hidden;
  pointer-events: auto;
}

.svg-dom-world-page .svg-dom-page-svg {
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-shadow: none;
}

#viewport[hidden],
#schematic-viewport[hidden],
#schematic-dom-layer[hidden],
#schematic-flow-overlay[hidden],
#bom-view[hidden] {
  display: none;
}

#bom-view {
  position: absolute;
  inset: 0;
  z-index: 2;
  overflow: hidden;
  background: var(--shell);
  color: var(--foreground);
}

.bom-workspace {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  height: 100%;
  min-height: 0;
}

.bom-toolbar {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 18px;
  padding: 18px 22px 14px;
  border-bottom: 1px solid var(--border);
  background: color-mix(in srgb, var(--panel) 88%, transparent);
  backdrop-filter: blur(14px);
}

.bom-toolbar h2 {
  margin: 2px 0 1px;
  color: var(--foreground);
  font-size: 20px;
  letter-spacing: 0;
}

.bom-toolbar span,
.bom-search span {
  color: var(--muted);
  font-size: 12px;
  font-weight: 650;
}

.bom-search {
  display: grid;
  gap: 6px;
  min-width: min(420px, 46vw);
}

.bom-search input {
  min-height: 38px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--control);
  color: var(--foreground);
  padding: 0 11px;
  outline: none;
}

.bom-search input:focus {
  border-color: rgba(59, 130, 246, 0.7);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.13);
}

.bom-content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 24vw);
  min-height: 0;
}

.bom-content:not(:has(.bom-detail)) {
  grid-template-columns: minmax(0, 1fr);
}

.bom-table-wrap {
  min-width: 0;
  overflow: auto;
}

.bom-table {
  width: 100%;
  min-width: 1680px;
  border-collapse: separate;
  border-spacing: 0;
  color: var(--foreground);
  font-size: 12px;
}

.bom-table th {
  position: sticky;
  top: 0;
  z-index: 1;
  border-bottom: 1px solid var(--border);
  background: var(--panel-raised);
  color: var(--muted);
  padding: 9px 10px;
  text-align: left;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.bom-table td {
  max-width: 220px;
  border-bottom: 1px solid color-mix(in srgb, var(--border) 72%, transparent);
  padding: 9px 10px;
  vertical-align: top;
  white-space: normal;
  overflow-wrap: anywhere;
}

.bom-table tr {
  cursor: pointer;
}

.bom-table tr:hover td {
  background: color-mix(in srgb, var(--primary) 8%, transparent);
}

.bom-table tr.selected td {
  background: color-mix(in srgb, var(--primary) 15%, transparent);
}

.bom-reference-cell {
  min-width: 180px;
}

.bom-ref-chip {
  display: inline-flex;
  align-items: center;
  min-height: 22px;
  margin: 0 4px 4px 0;
  border: 1px solid color-mix(in srgb, var(--primary) 42%, var(--border));
  border-radius: 4px;
  background: color-mix(in srgb, var(--primary) 9%, var(--control));
  color: color-mix(in srgb, var(--primary) 45%, var(--foreground));
  padding: 2px 7px;
  cursor: pointer;
  font-size: 11px;
  font-weight: 750;
}

.bom-ref-chip:hover,
.bom-ref-chip.active {
  border-color: var(--primary);
  background: color-mix(in srgb, var(--primary) 24%, var(--control));
  color: var(--foreground);
}

.bom-ref-chip.detail {
  margin-bottom: 6px;
}

.bom-missing {
  color: #f59e0b;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.bom-detail {
  min-width: 0;
  overflow: auto;
  border-left: 1px solid var(--border);
  background: color-mix(in srgb, var(--panel-raised) 90%, transparent);
  padding: 18px;
}

.bom-detail-head {
  border-bottom: 1px solid var(--border);
  padding-bottom: 14px;
}

.bom-detail-head h3 {
  margin: 4px 0;
  color: var(--foreground);
  font-size: 18px;
  line-height: 1.25;
  overflow-wrap: anywhere;
}

.bom-detail-head span {
  color: var(--muted);
  font-size: 12px;
}

.bom-ref-list {
  padding: 14px 0 10px;
}

.bom-field-list {
  display: grid;
  gap: 9px;
  margin: 0;
}

.bom-field-list div {
  border-top: 1px solid color-mix(in srgb, var(--border) 74%, transparent);
  padding-top: 8px;
}

.bom-field-list dt {
  color: var(--muted);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.bom-field-list dd {
  margin: 3px 0 0;
  color: var(--foreground);
  overflow-wrap: anywhere;
}

.bom-empty {
  color: var(--muted);
  font-size: 13px;
}

#panel-labels {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

#panel-labels span {
  position: absolute;
  padding: 4px 8px;
  border: 1px solid rgba(26, 36, 51, 0.14);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
  color: #253047;
  font-size: 11px;
  font-weight: 650;
  backdrop-filter: blur(8px);
  transform: translate(10px, -50%);
  transition: left 60ms linear, top 60ms linear;
}

#axis-gizmo {
  position: absolute;
  left: 14px;
  bottom: 14px;
  width: 104px;
  height: 104px;
  cursor: pointer;
  border: 0;
  background: transparent;
  filter: drop-shadow(0 4px 8px rgba(15, 23, 42, 0.18));
}

#selection-card {
  position: absolute;
  z-index: 4;
  width: min(360px, calc(100% - 32px));
  border: 1px solid var(--border);
  border-radius: 3px;
  background: color-mix(in srgb, var(--panel-raised) 96%, transparent);
  box-shadow: 0 22px 58px rgba(0, 0, 0, 0.34);
  color: var(--foreground);
  font-family: Inter, "SF Pro Text", "Segoe UI", ui-sans-serif, system-ui, sans-serif;
  font-feature-settings: "tnum" 1, "ss01" 1;
  backdrop-filter: blur(16px);
}

#selection-card[hidden] {
  display: none;
}

.selection-card-head {
  display: grid;
  grid-template-columns: 4px auto minmax(0, 1fr) 24px;
  min-height: 48px;
  border-bottom: 1px solid var(--border);
  align-items: center;
  cursor: grab;
  user-select: none;
}

.selection-card-head:active {
  cursor: grabbing;
}

.selection-card-drag-handle {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--muted);
  padding: 6px;
  margin-left: 2px;
}

.selection-card-drag-handle svg {
  opacity: 0.5;
  transition: opacity 120ms ease;
}

.selection-card-head:hover .selection-card-drag-handle svg {
  opacity: 0.8;
  color: var(--foreground);
}

.selection-card-accent {
  width: 4px;
  height: 100%;
  background: #18ef52;
  box-shadow: 3px 0 14px rgba(24, 239, 82, 0.24);
}

.selection-card-title {
  display: grid;
  align-content: center;
  gap: 1px;
  min-width: 0;
  padding: 6px 10px;
}

.selection-card-title small,
.selection-section-title {
  color: var(--muted);
  font-size: 9px;
  font-weight: 750;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.selection-card-title strong {
  overflow: hidden;
  font-size: 14px;
  font-weight: 670;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.selection-card-close {
  width: 24px;
  height: 24px;
  margin: 6px 6px 0 0;
  padding: 0;
  border: 0;
  border-radius: 2px;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
}

.selection-card-close:hover {
  background: var(--control-hover);
  color: var(--foreground);
}

.selection-properties {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid var(--border);
}

.selection-property {
  flex: 1;
  min-width: 0;
  padding: 8px 12px;
  border-right: 1px solid var(--border);
}

.selection-property:last-child {
  border-right: 0;
}

.selection-property small {
  display: block;
  margin-bottom: 2px;
  color: var(--muted);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.selection-property strong {
  display: block;
  overflow: hidden;
  color: var(--foreground);
  font-size: 11px;
  font-weight: 620;
  text-overflow: clip;
  white-space: normal;
  overflow-wrap: anywhere;
}

.selection-section {
  padding: 8px 12px;
}

.selection-section-title {
  display: block;
  margin-bottom: 5px;
}

.selection-table {
  max-height: 152px;
  overflow: auto;
  border: 1px solid var(--border);
  background: var(--panel);
}

.selection-row {
  display: grid;
  grid-template-columns: minmax(48px, 0.7fr) minmax(42px, 0.55fr) minmax(0, 1.4fr);
  min-height: 26px;
  border-bottom: 1px solid var(--border);
}

.selection-row:last-child {
  border-bottom: 0;
}

.selection-row > span {
  overflow: hidden;
  padding: 5px 8px;
  border-right: 1px solid var(--border);
  color: var(--muted);
  font-size: 10px;
  text-overflow: clip;
  white-space: normal;
  overflow-wrap: anywhere;
}

.selection-row > span:last-child {
  border-right: 0;
}

.selection-row strong {
  color: var(--foreground);
  font-weight: 680;
}

.selection-empty {
  padding: 10px;
  color: var(--muted);
  font-size: 10px;
}

.selection-card-actions {
  display: flex;
  justify-content: flex-end;
  padding: 6px 12px;
  border-top: 1px solid var(--border);
  background: var(--panel);
}

.selection-card-actions button {
  min-height: 26px;
  padding: 0 8px;
  border: 1px solid var(--border);
  border-radius: 3px;
  background: var(--control);
  color: var(--foreground);
  cursor: pointer;
  font-size: 10px;
  font-weight: 650;
}

.selection-card-actions button:hover {
  border-color: var(--primary);
  background: var(--control-hover);
}

/* Net Dashboard styles */
.selection-net-dashboard {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px 12px;
}

.net-metric-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
}

.metric-card {
  display: flex;
  flex-direction: column;
  padding: 8px 10px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 3px;
}

.metric-card small {
  color: var(--muted);
  font-size: 8px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 2px;
}

.metric-card strong {
  font-size: 13px;
  color: var(--foreground);
  font-weight: 670;
}

.metric-card .unit {
  font-size: 9px;
  color: var(--muted);
  font-weight: normal;
}

.net-layers-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
}

.layer-badge {
  font-size: 9px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 3px;
  background: var(--control-hover);
  color: var(--foreground);
  border: 1px solid var(--border);
}

.layer-badge.unknown {
  color: var(--muted);
  font-style: italic;
}

.pin-row-interactive {
  cursor: pointer;
  transition: background 100ms ease;
}

.pin-row-interactive:hover {
  background: color-mix(in srgb, var(--primary) 12%, transparent);
}

.refdes-col {
  color: var(--primary) !important;
}

.refdes-col:hover {
  text-decoration: underline;
}

.pin-col {
  font-weight: 600;
}

.compact-scroll::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.compact-scroll::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 2px;
}

.compact-scroll::-webkit-scrollbar-thumb:hover {
  background: var(--muted);
}

.selection-card-actions button {
  margin-left: 6px;
}

.selection-card-actions button.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

#fallback {
  position: absolute;
  inset: 16px;
  color: #171d28;
  font-size: 13px;
}

.panel {
  display: grid;
  grid-template-columns: 46px minmax(0, 1fr);
  min-width: 0;
  min-height: 0;
  border-left: 1px solid var(--border);
  background: var(--panel);
}

.panel-rail {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-right: 1px solid var(--border);
  background: var(--panel);
}

.rail-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 94px;
  padding: 0;
  border: 0;
  border-bottom: 1px solid var(--border);
  background: transparent;
  color: #718096;
  cursor: pointer;
  font-size: 11px;
  font-weight: 650;
  letter-spacing: 0;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  transition: color 120ms ease, background 120ms ease;
}

.rail-tab:hover {
  background: var(--control);
  color: var(--foreground);
}

.rail-tab.active {
  box-shadow: inset -2px 0 var(--primary);
  background: var(--panel-raised);
  color: var(--foreground);
}

.panel-drawer {
  min-width: 0;
  overflow: auto;
  padding: 18px;
  opacity: 1;
  transition: opacity 100ms ease;
}

.panel-collapsed .panel-drawer {
  visibility: hidden;
  padding: 0;
  opacity: 0;
}

.panel header {
  margin-bottom: 18px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.panel-mode-header {
  padding-top: 1px;
}

.eyebrow {
  margin: 0 0 5px;
  color: #60a5fa;
  font-size: 10px;
  font-weight: 750;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h1,
h2 {
  margin: 0;
  letter-spacing: 0;
}

h1 {
  overflow: hidden;
  font-size: 18px;
  line-height: 1.25;
  text-overflow: ellipsis;
  white-space: nowrap;
}

h2 {
  font-size: 13px;
  font-weight: 700;
}

#status {
  margin: 7px 0 0;
  color: var(--muted);
  font-size: 12px;
}

.tab-panel {
  display: none;
}

.tab-panel.active {
  display: block;
}

.section-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.section-heading span {
  color: var(--muted);
  font-size: 10px;
}

.mode-toolbar {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  padding: 3px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--panel-raised);
}

.mode-toolbar button,
.layer-presets button,
.quick-actions button {
  min-width: 0;
  height: 32px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 120ms ease;
}

.mode-toolbar button:hover,
.layer-presets button:hover,
.quick-actions button:hover {
  background: var(--control-hover);
  color: var(--foreground);
}

.mode-toolbar button.active {
  background: var(--primary);
  border: 1px solid var(--primary);
  color: var(--primary-foreground);
  box-shadow: 0 1px 2px color-mix(in srgb, var(--primary) 30%, transparent);
}

.quick-actions button.active {
  background: var(--control-hover);
  border: 1px solid var(--border);
  color: var(--foreground);
  box-shadow: 0 1px 2px color-mix(in srgb, var(--shell) 60%, transparent);
}

.layer-presets,
.quick-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
  margin-top: 10px;
}

.layer-presets button,
.quick-actions button {
  border: 1px solid var(--border);
  background: var(--control);
  font-size: 11px;
}

.layer-list {
  display: grid;
  gap: 1px;
  margin-top: 12px;
}

.layer-row {
  display: grid;
  grid-template-columns: 16px 12px minmax(0, 1fr) auto;
  gap: 8px;
  align-items: center;
  min-height: 31px;
  padding: 0 7px;
  border-radius: 4px;
  color: #d9e0ea;
  font-size: 12px;
}

.layer-row:hover {
  background: #111b2a;
}

.layer-row input,
.toggle-row input {
  width: 14px;
  height: 14px;
  margin: 0;
  accent-color: var(--primary);
}

.layer-row small {
  color: #68758a;
  font-size: 10px;
  font-variant-numeric: tabular-nums;
}

.swatch {
  width: 11px;
  height: 11px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 2px;
}

.control-field {
  display: grid;
  gap: 7px;
  margin-top: 12px;
}

.control-field > span {
  color: var(--muted);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
}

.layer-select {
  width: 100%;
  height: 36px;
  padding: 0 10px;
  border: 1px solid var(--border);
  border-radius: 5px;
  outline: none;
  background: var(--control);
  color: var(--foreground);
  font-size: 12px;
}

.layer-select:focus {
  border-color: #3974be;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.13);
}

.search-results {
  display: grid;
  gap: 2px;
}

.search-results button {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px;
  width: 100%;
  min-height: 32px;
  padding: 6px 8px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: var(--foreground);
  text-align: left;
  cursor: pointer;
}

.search-results button:hover {
  background: var(--control);
}

.search-results span {
  overflow: hidden;
  color: var(--muted);
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.camera-toolbar {
  margin-bottom: 14px;
}

.toggle-list {
  display: grid;
  gap: 2px;
  padding: 8px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.toggle-row {
  display: grid;
  grid-template-columns: 16px minmax(0, 1fr);
  gap: 8px;
  align-items: center;
  min-height: 32px;
  color: #dce3ed;
  font-size: 12px;
}

.range-field {
  margin-top: 18px;
}

input[type="range"] {
  width: 100%;
  height: 4px;
  margin: 8px 0;
  accent-color: var(--primary);
}

pre {
  overflow: auto;
  max-height: calc(100vh - 170px);
  margin: 0;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 5px;
  background: #070c14;
  color: #dbe4f0;
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 11px;
  line-height: 1.5;
  white-space: pre-wrap;
}

#diagnostics {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px 14px;
  margin: 0;
  font-size: 11px;
}

#diagnostics dt {
  color: var(--muted);
}

#diagnostics dd {
  margin: 0;
  color: #dbe4f0;
  text-align: right;
  font-variant-numeric: tabular-nums;
}

#schematic-labels {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
}

#schematic-labels[hidden] {
  display: none;
}

.schematic-page-label {
  position: absolute;
  display: grid;
  gap: 1px;
  min-width: 96px;
  max-width: 220px;
  padding: 5px 7px;
  border-left: 2px solid #4b8de8;
  background: rgba(8, 13, 22, 0.88);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.22);
  color: #edf3fb;
  font-size: 10px;
  transform: translateY(-100%);
  backdrop-filter: blur(8px);
}

.schematic-page-label strong {
  overflow: hidden;
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.schematic-page-label small {
  color: #8f9caf;
  font-size: 8px;
}

.page-list {
  display: grid;
  gap: 2px;
  margin-top: 12px;
}

.page-row {
  display: grid;
  grid-template-columns: 26px minmax(0, 1fr) auto;
  gap: 8px;
  align-items: center;
  min-height: 36px;
  padding: 0 8px;
  border: 1px solid transparent;
  border-radius: 3px;
  background: transparent;
  color: #dce3ee;
  cursor: pointer;
  text-align: left;
}

.page-row:hover {
  border-color: #28364a;
  background: #111a28;
}

.page-row.active {
  border-color: #346db6;
  background: #14243c;
}

.page-row > span:first-child {
  color: #6f7d92;
  font-size: 10px;
  font-variant-numeric: tabular-nums;
}

.page-row strong {
  overflow: hidden;
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.page-row small {
  color: #718096;
  font-size: 9px;
}

@media (max-width: 900px) {
  #app {
    grid-template-columns: 42px minmax(0, 1fr) 326px;
  }

  #app.panel-collapsed {
    grid-template-columns: 42px minmax(0, 1fr) 46px;
  }
}

/* Workspace specific panel rail controls */
.workspace-schematic [data-tab="view"] {
  display: none !important;
}

.workspace-schematic [data-tab="stackup"],
.workspace-bom [data-tab="stackup"] {
  display: none !important;
}

/* Stackup Workspace layout */
#app.workspace-stackup {
  grid-template-columns: 48px minmax(0, 1fr);
}

.workspace-stackup .panel {
  display: none !important;
}

#stackup-workspace-view {
  position: absolute;
  inset: 0;
  z-index: 2;
  overflow: hidden;
  background: var(--shell);
  color: var(--foreground);
  padding: clamp(20px, 3vw, 40px);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

#stackup-workspace-view[hidden] {
  display: none !important;
}

.stackup-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--border);
}

.stackup-header-title {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stackup-header-title h1 {
  font-size: clamp(22px, 2vw, 30px);
  font-weight: 700;
  margin: 0;
  color: var(--foreground);
}

.stackup-header-title p {
  font-size: 13px;
  color: var(--muted);
  margin: 0;
}

.stackup-summary-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.stackup-summary-card {
  background: color-mix(in srgb, var(--panel-raised) 54%, var(--panel));
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stackup-summary-card label {
  font-size: 9px;
  color: var(--muted);
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.stackup-summary-card span {
  font-size: 16px;
  font-weight: 650;
  color: var(--foreground);
}

.stackup-workspace-body {
  display: grid;
  grid-template-columns: minmax(520px, 1fr) minmax(360px, 44vw);
  gap: 28px;
  align-items: stretch;
  flex: 1;
  min-height: 0;
}

.stackup-diagram-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: flex-start;
  background: color-mix(in srgb, var(--panel-raised) 38%, var(--panel));
  border: 1px solid var(--border);
  border-radius: 6px;
  min-height: 0;
  height: 100%;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stackup-visual-svg {
  width: 96%;
  max-width: 720px;
  height: auto;
  flex: none;
  overflow: visible;
}

.stackup-side-panel {
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
  height: 100%;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding-right: 4px;
}

.stackup-via-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
  color: var(--muted);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.stackup-via-legend span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.stackup-via-legend i {
  width: 9px;
  height: 9px;
  border-radius: 2px;
  background: var(--stackup-via-thru);
}

.stackup-via-legend i[data-via-type="blind"] {
  background: var(--stackup-via-blind);
}

.stackup-via-legend i[data-via-type="buried"] {
  background: var(--stackup-via-buried);
}

.stackup-svg-layer {
  cursor: pointer;
  transition: opacity 120ms ease, filter 120ms ease;
}

.stackup-svg-column-headings text {
  fill: var(--muted);
  font-size: 8px;
  font-weight: 750;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.stackup-layer-dimension,
.stackup-total-dimension path {
  fill: none;
  stroke: var(--muted);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

.stackup-total-dimension text {
  fill: var(--muted);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-anchor: middle;
  text-transform: uppercase;
}

.stackup-layer-name,
.stackup-layer-thickness,
.stackup-layer-metadata {
  transition: fill 120ms ease, font-weight 120ms ease;
}

.stackup-svg-layer:hover {
  filter: brightness(1.2) contrast(1.1);
  opacity: 0.95;
}

.stackup-svg-layer.active rect {
  stroke: var(--primary);
  stroke-width: 1.5px;
  filter: brightness(1.3);
}

.stackup-svg-layer.active .stackup-layer-dimension {
  stroke: var(--primary);
  stroke-width: 1.5px;
}

.stackup-svg-layer.active .stackup-layer-name,
.stackup-svg-layer.active .stackup-layer-thickness {
  fill: var(--primary);
  font-weight: 800;
}

.stackup-tables-container {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.stackup-table-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stackup-section-title {
  color: var(--muted);
  font-size: 10px;
  font-weight: 750;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 2px;
}

.stackup-section-heading {
  min-height: 28px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-left: 3px solid var(--primary);
  background: color-mix(in srgb, var(--primary) 9%, var(--panel));
  color: var(--foreground);
  font-size: 11px;
  letter-spacing: 0.1em;
}

.stackup-section-heading small {
  margin-left: auto;
  color: var(--muted);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: none;
}

.stackup-table-wrapper {
  overflow: auto;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: color-mix(in srgb, var(--panel-raised) 26%, var(--panel));
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-height: min(360px, calc(100vh - 420px));
}

.stackup-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
  text-align: left;
}

.stackup-table th {
  position: sticky;
  top: 0;
  background: var(--control);
  color: var(--muted);
  font-weight: 700;
  padding: 8px 12px;
  border-bottom: 1px solid var(--border);
  text-transform: uppercase;
  font-size: 9px;
  letter-spacing: 0.05em;
  z-index: 1;
}

.stackup-table td {
  padding: 8px 12px;
  border-bottom: 1px solid var(--border);
  color: var(--foreground);
  vertical-align: middle;
}

.stackup-table tr:last-child td {
  border-bottom: 0;
}

.stackup-table tr.active td {
  background: color-mix(in srgb, var(--primary) 10%, transparent);
  color: var(--primary);
}

.stackup-table tr:hover td {
  background: var(--control-hover);
}

.stackup-table tbody tr[data-layer-id] {
  cursor: crosshair;
}

.stackup-table tbody tr[data-layer-id]:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: -2px;
}

.stackup-badge {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 8px;
  font-weight: 700;
  text-transform: uppercase;
}

.stackup-badge.copper {
  background: rgba(224, 133, 36, 0.15);
  color: #f97316;
}

.stackup-badge.dielectric {
  background: rgba(169, 141, 92, 0.15);
  color: #ca8a04;
}

.stackup-badge.mask {
  background: rgba(47, 107, 79, 0.15);
  color: #10b981;
}

.stackup-badge.paste {
  background: rgba(203, 213, 225, 0.12);
  color: #cbd5e1;
}

.stackup-badge.silk {
  background: rgba(255, 255, 255, 0.1);
  color: var(--foreground);
}

@media (max-width: 1180px) {
  #stackup-workspace-view {
    overflow-y: auto;
  }

  .stackup-workspace-body {
    grid-template-columns: 1fr;
    flex: none;
  }

  .stackup-diagram-card {
    min-height: auto;
    height: auto;
    overflow: visible;
  }

  .stackup-side-panel {
    height: auto;
    overflow: visible;
    padding-right: 0;
  }

  .stackup-table-wrapper {
    max-height: none;
  }
}

@media (max-width: 760px) {
  #stackup-workspace-view {
    padding: 16px;
  }

  .stackup-diagram-card {
    align-items: flex-start;
    overflow-x: auto;
  }

  .stackup-visual-svg,
  .stackup-via-legend {
    width: 680px;
    max-width: none;
  }

  .stackup-summary-grid {
    grid-template-columns: 1fr;
  }
}
`;var ie=(e,t,a)=>Math.max(t,Math.min(a,e)),Dt=(e,t,a)=>e+(t-e)*a;function da(e,t){return[e[0]+t[0],e[1]+t[1],e[2]+t[2]]}function Zi(e,t){return[e[0]-t[0],e[1]-t[1],e[2]-t[2]]}function Ut(e,t){return[e[0]*t,e[1]*t,e[2]*t]}function eo(e){return Math.hypot(e[0],e[1],e[2])}function St(e){let t=eo(e)||1;return Ut(e,1/t)}function ca(e,t){return[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]]}function us(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function la(e,t){let a=new Float32Array(16);for(let s=0;s<4;s+=1)for(let r=0;r<4;r+=1)a[s*4+r]=e[r]*t[s*4]+e[4+r]*t[s*4+1]+e[8+r]*t[s*4+2]+e[12+r]*t[s*4+3];return a}function cr(e,t,a){let s=St(Zi(e,t)),r=St(ca(a,s)),n=ca(s,r);return new Float32Array([r[0],n[0],s[0],0,r[1],n[1],s[1],0,r[2],n[2],s[2],0,-us(r,e),-us(n,e),-us(s,e),1])}function dr(e,t,a,s){let r=1/Math.tan(e/2);return new Float32Array([r/t,0,0,0,0,r,0,0,0,0,s/(a-s),-1,0,0,a*s/(a-s),0])}function lr(e,t,a,s){return new Float32Array([2/e,0,0,0,0,2/t,0,0,0,0,1/(a-s),0,0,0,0,1])}function fs(e){return[(e[0]+e[3])/2,(e[1]+e[4])/2,(e[2]+e[5])/2]}function Lt(e){return Math.max(.001,Math.hypot(e[3]-e[0],e[4]-e[1],e[5]-e[2])/2)}var ua=class{constructor(t){let a=fs(t),s=Lt(t);this.focus=[...a],this.targetFocus=[...a],this.azimuth=-.62,this.targetAzimuth=this.azimuth,this.polar=.72,this.targetPolar=this.polar,this.distance=s*2.8,this.targetDistance=this.distance,this.orthoScale=s*2.15,this.targetOrthoScale=this.orthoScale,this.sceneRadius=s,this.fov=Math.PI/4}update(t){let a=1-Math.exp(-t*14);this.focus=this.focus.map((s,r)=>Dt(s,this.targetFocus[r],a)),this.azimuth=to(this.azimuth,this.targetAzimuth,a),this.polar=Dt(this.polar,this.targetPolar,a),this.distance=Dt(this.distance,this.targetDistance,a),this.orthoScale=Dt(this.orthoScale,this.targetOrthoScale,a)}snap(){this.focus=[...this.targetFocus],this.azimuth=this.targetAzimuth,this.polar=this.targetPolar,this.distance=this.targetDistance,this.orthoScale=this.targetOrthoScale}basis(){let t=Math.sin(this.polar),a=Math.cos(this.polar),s=St([t*Math.sin(this.azimuth),-t*Math.cos(this.azimuth),a]),r=St([Math.cos(this.azimuth),Math.sin(this.azimuth),0]),n=St(ca(s,r));return{right:r,up:n,back:s}}matrix(t,a,s=!1,r=1){let n=Math.max(.01,t/Math.max(1,a)),{up:i,back:o}=this.basis(),c=da(this.focus,Ut(o,this.distance)),l=cr(c,this.focus,i),p=s?lr(this.orthoScale*r*n,this.orthoScale*r,-this.sceneRadius*40,this.sceneRadius*40):dr(this.fov,n,Math.max(this.sceneRadius*5e-4,this.distance-this.sceneRadius*3.5),this.distance+this.sceneRadius*4.5);return la(p,l)}orbit(t,a){this.targetAzimuth-=t*.006,this.targetPolar=ie(this.targetPolar-a*.006,.015,Math.PI-.015)}pan(t,a,s,r=!1){let{right:n,up:i}=this.basis(),o=r?this.targetOrthoScale/Math.max(1,s):2*this.targetDistance*Math.tan(this.fov/2)/Math.max(1,s),c=da(Ut(n,-t*o),Ut(i,a*o));this.targetFocus=da(this.targetFocus,c)}dolly(t,a=!1){let s=Math.exp(t*.0032);a?this.targetOrthoScale=ie(this.targetOrthoScale*s,this.sceneRadius*.008,this.sceneRadius*24):this.targetDistance=ie(this.targetDistance*s,this.sceneRadius*.01,this.sceneRadius*48)}frame(t){if(!t)return;let a=Lt(t);this.targetFocus=fs(t),this.targetDistance=Math.max(a*2.8,this.sceneRadius*.02),this.targetOrthoScale=Math.max(a*2.15,this.sceneRadius*.02)}setFocus(t){this.targetFocus=[...t]}setAxis(t,a=!1){t==="z"?(this.targetAzimuth=0,this.targetPolar=a?Math.PI-.015:.015):t==="x"?(this.targetAzimuth=a?-Math.PI/2:Math.PI/2,this.targetPolar=Math.PI/2):(this.targetAzimuth=a?0:Math.PI,this.targetPolar=Math.PI/2)}rotateZ(t=1){this.targetAzimuth+=t*Math.PI/2}flip(){this.targetPolar=Math.PI-this.targetPolar}};function to(e,t,a){let s=Math.atan2(Math.sin(t-e),Math.cos(t-e));return e+s*a}var fa=class e{static async create(t,a,s={}){let r=await fetch(a,{cache:"default"});if(!r.ok)throw new Error(`Failed to load BoM ${a}: ${r.status}`);let n=await r.json();if(n.schema!=="prism.bom_a0")throw new Error(`Unsupported BoM schema: ${n.schema||"missing"}`);let i=new e(t,n,s);return i.render(),i}constructor(t,a,s){this.container=t,this.payload=a,this.callbacks=s,this.query="",this.selectedRowId="",this.selectedReference="",this.rowsById=new Map((a.rows||[]).map(r=>[r.id,r])),this.componentIndex=new Map(Object.entries(a.componentIndex||{}))}setSelectionByReference(t,a={}){let s=this.componentIndex.get(t);s&&(this.selectedReference=t,this.selectedRowId=s.rowId,this.renderContent(),a.scroll&&this.container.querySelector(`[data-row-id="${ro(s.rowId)}"]`)?.scrollIntoView({block:"center",behavior:"smooth"}))}clearSelection(){this.selectedReference="",this.selectedRowId="",this.renderContent()}render(){let t=this.filteredRows();this.container.innerHTML=`
      <section class="bom-workspace">
        <header class="bom-toolbar">
          <div>
            <p class="eyebrow">Prism BoM A0</p>
            <h2>Bill of Materials</h2>
            <span data-bom-count>${t.length} of ${(this.payload.rows||[]).length} grouped rows \xB7 ${(this.payload.components||[]).length} components</span>
          </div>
          <label class="bom-search">
            <span>Search</span>
            <input id="bom-search" type="search" value="${Ce(this.query)}" placeholder="Reference, value, footprint, manufacturer..." />
          </label>
        </header>
        <div class="bom-content" data-bom-content>
          ${this.contentHtml(t,this.payload.displayColumns||[])}
        </div>
      </section>
    `,this.bind()}renderContent(){let t=this.container.querySelector("[data-bom-content]");if(!t){this.render();return}let a=this.filteredRows();t.innerHTML=this.contentHtml(a,this.payload.displayColumns||[]);let s=this.container.querySelector("[data-bom-count]");s&&(s.textContent=`${a.length} of ${(this.payload.rows||[]).length} grouped rows \xB7 ${(this.payload.components||[]).length} components`),this.bindContent(t)}contentHtml(t,a){let s=this.rowsById.get(this.selectedRowId);return`
      <div class="bom-table-wrap">
        <table class="bom-table">
          <thead>
            <tr>${a.map(r=>`<th>${Ce(r)}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${t.map(r=>this.rowHtml(r,a)).join("")}
          </tbody>
        </table>
      </div>
      ${s?`<aside class="bom-detail">${this.detailHtml(s)}</aside>`:""}
    `}filteredRows(){let t=this.query.trim().toLowerCase(),a=this.payload.rows||[];return t?a.filter(s=>JSON.stringify(s).toLowerCase().includes(t)):a}rowHtml(t,a){return`
      <tr class="${t.id===this.selectedRowId?"selected":""}" data-row-id="${Ce(t.id)}">
        ${a.map(r=>{let n=t.fields?.[r]||"";return r==="Reference"?`<td class="bom-reference-cell">${(t.references||[]).map(i=>`
              <button class="bom-ref-chip ${i===this.selectedReference?"active":""}" data-reference="${Ce(i)}">${Ce(i)}</button>
            `).join("")}</td>`:!n&&so(r)?'<td><span class="bom-missing">Missing</span></td>':`<td title="${Ce(n)}">${Ce(n)}</td>`}).join("")}
      </tr>
    `}detailHtml(t){let a=ao(t,this.payload.displayColumns||[],this.payload.extraColumns||[]);return`
      <div class="bom-detail-head">
        <p class="eyebrow">Line item</p>
        <h3>${Ce((t.references||[]).join(", "))}</h3>
        <span>${t.qty} component${t.qty===1?"":"s"}${t.dnp?" \xB7 DNP":""}</span>
      </div>
      <div class="bom-ref-list">
        ${(t.references||[]).map(s=>`
          <button class="bom-ref-chip detail ${s===this.selectedReference?"active":""}" data-reference="${Ce(s)}">${Ce(s)}</button>
        `).join("")}
      </div>
      <dl class="bom-field-list">
        ${a.map(([s,r])=>`
          <div>
            <dt>${Ce(s)}</dt>
            <dd>${Ce(r)}</dd>
          </div>
        `).join("")}
      </dl>
    `}bind(){let t=this.container.querySelector("#bom-search");t?.addEventListener("input",()=>{this.query=t.value,this.renderContent()}),this.bindContent(this.container)}bindContent(t){t.querySelectorAll("[data-row-id]").forEach(a=>{a.addEventListener("click",s=>{s.target.closest("[data-reference]")||(this.selectedRowId=a.dataset.rowId,this.selectedReference="",this.renderContent())})}),t.querySelectorAll("[data-reference]").forEach(a=>{a.addEventListener("click",s=>{s.stopPropagation();let r=a.dataset.reference;this.setSelectionByReference(r),this.callbacks.onSelectReference?.(r)})})}};function ao(e,t,a){let s=[],r=new Set(["Reference","Qty"].map(hs));for(let i of t){if(i==="Reference"||i==="Qty")continue;let o=e.fields?.[i]||"";o&&(s.push([i,o]),r.add(hs(i)))}let n=e.canonicalFields||{};for(let i of a){let o=n[i]||"";if(!o)continue;let c=hs(i);r.has(c)||(r.add(c),s.push([i,o]))}return s}function hs(e){return String(e||"").toLowerCase().replace(/[\s_\-()[\]/]+/g,"")}function so(e){return["Manufacturer Part Number","Vendor Part Number","Datasheet","Footprint","Value"].includes(e)}function Ce(e){return String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function ro(e){return String(e).replace(/["\\]/g,"\\$&")}function ur(e,t=new Map){let a=new Map;for(let r of e||[]){let n=String(r?.designator||"");if(!n)continue;let i=a.get(n)||{reference:n,featureIds:new Set,modelCount:0},o=Number(r?.featureId)||0;o>0&&i.featureIds.add(o),a.set(n,i)}for(let[r,n]of t||[]){let i=a.get(String(r));i&&(i.modelCount=Math.max(i.modelCount,Number(n)||0))}let s=new Map;for(let[r,n]of a)s.set(r,{reference:r,featureIds:[...n.featureIds].sort((i,o)=>i-o),ambiguous:n.featureIds.size>1||n.modelCount>1});return s}function fr(e,t){let a=[...new Set((Array.isArray(e)?e:[]).map(c=>String(c||"")).filter(Boolean))],s=[],r=[],n=[],i=new Set,o=new Set;for(let c of a){let l=t.get(c);if(!l){n.push(c);continue}if(l.ambiguous){r.push(c);continue}s.push(c),o.add(c);for(let p of l.featureIds)i.add(p)}return{requested:a,applied:s,ambiguous:r,unknown:n,hiddenFeatureIds:i,hiddenReferences:o}}function ha(e,t){return!!e&&t.has(String(e))}var no={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function L(e){return String(e??"").replace(/[&<>"']/g,t=>no[t])}var bs=`
fn netEmphasized(id: u32) -> bool {
  return id != 0u && id < arrayLength(&netMask) && netMask[id] != 0u;
}
`;function ba(e){let t=new Set;if(e==null)return t;for(let a of e){let s=Number(a);!Number.isInteger(s)||s<=0||s>4294967295||t.add(s)}return t}function hr(e,t=0){let a=0;for(let r of ba(e))a=Math.max(a,r);let s=64;for(;s<a+1;)s*=2;return Math.max(s,Math.floor(t)||0)}function br(e,t){let a=Math.max(64,Math.floor(t)||0),s=new Uint32Array(a);s.fill(0);for(let r of ba(e))r<a&&(s[r]=1);return s}function Kt(e,t){return!Array.isArray(e)||!t?null:e.find(a=>a.name===t||Array.isArray(a.aliases)&&a.aliases.includes(t))||null}function gr(e,t){let a=new Set;if(!Array.isArray(e)||!Array.isArray(t))return a;for(let s of t){if(!s)continue;let r=s.netUid&&e.find(i=>i.uid===s.netUid)||s.netName&&Kt(e,s.netName),n=Number(r?.id);Number.isInteger(n)&&n>0&&a.add(n)}return a}var pr=class{_listeners={};addEventListener(e,t){let a=this._listeners;return a[e]===void 0&&(a[e]=[]),a[e].indexOf(t)===-1&&a[e].push(t),this}removeEventListener(e,t){let a=this._listeners[e];if(a!==void 0){let s=a.indexOf(t);s!==-1&&a.splice(s,1)}return this}dispatchEvent(e){let t=this._listeners[e.type];if(t!==void 0){let a=t.slice(0);for(let s=0,r=a.length;s<r;s++)a[s].call(this,e)}return this}dispose(){for(let e in this._listeners)delete this._listeners[e]}},et=class{_disposed=!1;_name;_parent;_child;_attributes;constructor(e,t,a,s={}){if(this._name=e,this._parent=t,this._child=a,this._attributes=s,!t.isOnGraph(a))throw new Error("Cannot connect disconnected graphs.")}getName(){return this._name}getParent(){return this._parent}getChild(){return this._child}setChild(e){return this._child=e,this}getAttributes(){return this._attributes}dispose(){this._disposed||(this._parent._destroyRef(this),this._disposed=!0)}isDisposed(){return this._disposed}},gs=class extends pr{_emptySet=new Set;_edges=new Set;_parentEdges=new Map;_childEdges=new Map;listEdges(){return Array.from(this._edges)}listParentEdges(e){return Array.from(this._childEdges.get(e)||this._emptySet)}listParents(e){let t=new Set;for(let a of this.listParentEdges(e))t.add(a.getParent());return Array.from(t)}listChildEdges(e){return Array.from(this._parentEdges.get(e)||this._emptySet)}listChildren(e){let t=new Set;for(let a of this.listChildEdges(e))t.add(a.getChild());return Array.from(t)}disconnectParents(e,t){for(let a of this.listParentEdges(e))(!t||t(a.getParent()))&&a.dispose();return this}_createEdge(e,t,a,s){let r=new et(e,t,a,s);this._edges.add(r);let n=r.getParent();this._parentEdges.has(n)||this._parentEdges.set(n,new Set),this._parentEdges.get(n).add(r);let i=r.getChild();return this._childEdges.has(i)||this._childEdges.set(i,new Set),this._childEdges.get(i).add(r),r}_destroyEdge(e){return this._edges.delete(e),this._parentEdges.get(e.getParent()).delete(e),this._childEdges.get(e.getChild()).delete(e),this}},be=class{list=[];constructor(e){if(e)for(let t of e)this.list.push(t)}add(e){this.list.push(e)}remove(e){let t=this.list.indexOf(e);t>=0&&this.list.splice(t,1)}removeChild(e){let t=[];for(let a of this.list)a.getChild()===e&&t.push(a);for(let a of t)this.remove(a);return t}listRefsByChild(e){let t=[];for(let a of this.list)a.getChild()===e&&t.push(a);return t}values(){return this.list}},ae=class{set=new Set;map=new Map;constructor(e){if(e)for(let t of e)this.add(t)}add(e){let t=e.getChild();this.removeChild(t),this.set.add(e),this.map.set(t,e)}remove(e){this.set.delete(e),this.map.delete(e.getChild())}removeChild(e){let t=this.map.get(e)||null;return t&&this.remove(t),t}getRefByChild(e){return this.map.get(e)||null}values(){return Array.from(this.set)}},le=class{map={};constructor(e){e&&Object.assign(this.map,e)}set(e,t){this.map[e]=t}delete(e){delete this.map[e]}get(e){return this.map[e]||null}keys(){return Object.keys(this.map)}values(){return Object.values(this.map)}},$=Symbol("attributes"),Ze=Symbol("immutableKeys"),mr=class xr extends pr{_disposed=!1;graph;[$];[Ze];constructor(t){super(),this.graph=t,this[Ze]=new Set,this[$]=this._createAttributes()}getDefaults(){return{}}_createAttributes(){let t=this.getDefaults(),a={};for(let s in t){let r=t[s];if(r instanceof xr){let n=this.graph._createEdge(s,this,r);this[Ze].add(s),a[s]=n}else a[s]=r}return a}isOnGraph(t){return this.graph===t.graph}isDisposed(){return this._disposed}dispose(){this._disposed||(this.graph.listChildEdges(this).forEach(t=>t.dispose()),this.graph.disconnectParents(this),this._disposed=!0,this.dispatchEvent({type:"dispose"}))}detach(){return this.graph.disconnectParents(this),this}swap(t,a){for(let s in this[$]){let r=this[$][s];if(r instanceof et){let n=r;n.getChild()===t&&this.setRef(s,a,n.getAttributes())}else if(r instanceof be)for(let n of r.listRefsByChild(t)){let i=n.getAttributes();this.removeRef(s,t),this.addRef(s,a,i)}else if(r instanceof ae){let n=r.getRefByChild(t);if(n){let i=n.getAttributes();this.removeRef(s,t),this.addRef(s,a,i)}}else if(r instanceof le)for(let n of r.keys()){let i=r.get(n);i.getChild()===t&&this.setRefMap(s,n,a,i.getAttributes())}}return this}get(t){return this[$][t]}set(t,a){return this[$][t]=a,this.dispatchEvent({type:"change",attribute:t})}getRef(t){let a=this[$][t];return a?a.getChild():null}setRef(t,a,s){if(this[Ze].has(t))throw new Error(`Cannot overwrite immutable attribute, "${t}".`);let r=this[$][t];if(r&&r.dispose(),!a)return this;let n=this.graph._createEdge(t,this,a,s);return this[$][t]=n,this.dispatchEvent({type:"change",attribute:t})}listRefs(t){return this.assertRefList(t).values().map(a=>a.getChild())}addRef(t,a,s){let r=this.graph._createEdge(t,this,a,s);return this.assertRefList(t).add(r),this.dispatchEvent({type:"change",attribute:t})}removeRef(t,a){let s=this.assertRefList(t);if(s instanceof be)for(let r of s.listRefsByChild(a))r.dispose();else{let r=s.getRefByChild(a);r&&r.dispose()}return this}assertRefList(t){let a=this[$][t];if(a instanceof be||a instanceof ae)return a;throw new Error(`Expected RefList or RefSet for attribute "${t}"`)}listRefMapKeys(t){return this.assertRefMap(t).keys()}listRefMapValues(t){return this.assertRefMap(t).values().map(a=>a.getChild())}getRefMap(t,a){let s=this.assertRefMap(t).get(a);return s?s.getChild():null}setRefMap(t,a,s,r){let n=this.assertRefMap(t),i=n.get(a);if(i&&i.dispose(),!s)return this;r=Object.assign(r||{},{key:a});let o=this.graph._createEdge(t,this,s,{...r,key:a});return n.set(a,o),this.dispatchEvent({type:"change",attribute:t,key:a})}assertRefMap(t){let a=this[$][t];if(a instanceof le)return a;throw new Error(`Expected RefMap for attribute "${t}"`)}dispatchEvent(t){return super.dispatchEvent({...t,target:this}),this.graph.dispatchEvent({...t,target:this,type:`node:${t.type}`}),this}_destroyRef(t){let a=t.getName();if(this[$][a]===t)this[$][a]=null,this[Ze].has(a)&&t.getChild().dispose();else if(this[$][a]instanceof be)this[$][a].remove(t);else if(this[$][a]instanceof ae)this[$][a].remove(t);else if(this[$][a]instanceof le){let s=this[$][a];for(let r of s.keys())s.get(r)===t&&s.delete(r)}else return;this.graph._destroyEdge(t),this.dispatchEvent({type:"change",attribute:a})}};var Rr="v4.4.2",at="@glb.bin",N=(function(e){return e.ACCESSOR="Accessor",e.ANIMATION="Animation",e.ANIMATION_CHANNEL="AnimationChannel",e.ANIMATION_SAMPLER="AnimationSampler",e.BUFFER="Buffer",e.CAMERA="Camera",e.MATERIAL="Material",e.MESH="Mesh",e.PRIMITIVE="Primitive",e.PRIMITIVE_TARGET="PrimitiveTarget",e.NODE="Node",e.ROOT="Root",e.SCENE="Scene",e.SKIN="Skin",e.TEXTURE="Texture",e.TEXTURE_INFO="TextureInfo",e})({});var io=(function(e){return e.ARRAY_BUFFER="ARRAY_BUFFER",e.ELEMENT_ARRAY_BUFFER="ELEMENT_ARRAY_BUFFER",e.INVERSE_BIND_MATRICES="INVERSE_BIND_MATRICES",e.OTHER="OTHER",e.SPARSE="SPARSE",e})({}),Le=(function(e){return e[e.R=4096]="R",e[e.G=256]="G",e[e.B=16]="B",e[e.A=1]="A",e})({});var oo=class extends Float32Array{constructor(){throw super(),new Error("Unsupported typed array instantiation.")}},Ta={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5131:typeof Float16Array<"u"?Float16Array:oo,5126:Float32Array,5130:Float64Array},G=class{static createBufferFromDataURI(e){if(typeof Buffer>"u"){let t=atob(e.split(",")[1]),a=new Uint8Array(t.length);for(let s=0;s<t.length;s++)a[s]=t.charCodeAt(s);return a}else{let t=e.split(",")[1],a=e.indexOf("base64")>=0;return Buffer.from(t,a?"base64":"utf8")}}static encodeText(e){return new TextEncoder().encode(e)}static decodeText(e){return new TextDecoder().decode(e)}static concat(e){let t=0;for(let r of e)t+=r.byteLength;let a=new Uint8Array(t),s=0;for(let r of e)a.set(r,s),s+=r.byteLength;return a}static pad(e,t=0){let a=this.padNumber(e.byteLength);if(a===e.byteLength)return e;let s=new Uint8Array(a);if(s.set(e),t!==0)for(let r=e.byteLength;r<a;r++)s[r]=t;return s}static padNumber(e){return Math.ceil(e/4)*4}static equals(e,t){if(e===t)return!0;if(e.byteLength!==t.byteLength)return!1;let a=e.byteLength;for(;a--;)if(e[a]!==t[a])return!1;return!0}static toView(e,t=0,a=1/0){return new Uint8Array(e.buffer,e.byteOffset+t,Math.min(e.byteLength,a))}static assertView(e){if(e&&!ArrayBuffer.isView(e))throw new Error(`Method requires Uint8Array parameter; received "${typeof e}".`);return e}};var co=class{match(e){return e.length>=3&&e[0]===255&&e[1]===216&&e[2]===255}getSize(e){let t=new DataView(e.buffer,e.byteOffset+4),a,s;for(;t.byteLength;){if(a=t.getUint16(0,!1),uo(t,a),s=t.getUint8(a+1),s===192||s===193||s===194)return[t.getUint16(a+7,!1),t.getUint16(a+5,!1)];t=new DataView(e.buffer,t.byteOffset+a+2)}throw new TypeError("Invalid JPG, no size found")}getChannels(e){return 3}},lo=class Ir{static PNG_FRIED_CHUNK_NAME="CgBI";match(t){return t.length>=8&&t[0]===137&&t[1]===80&&t[2]===78&&t[3]===71&&t[4]===13&&t[5]===10&&t[6]===26&&t[7]===10}getSize(t){let a=new DataView(t.buffer,t.byteOffset);return G.decodeText(t.slice(12,16))===Ir.PNG_FRIED_CHUNK_NAME?[a.getUint32(32,!1),a.getUint32(36,!1)]:[a.getUint32(16,!1),a.getUint32(20,!1)]}getChannels(t){return 4}},qe=class{static impls={"image/jpeg":new co,"image/png":new lo};static registerFormat(e,t){this.impls[e]=t}static getMimeType(e){for(let t in this.impls)if(this.impls[t].match(e))return t;return null}static getSize(e,t){return this.impls[t]?this.impls[t].getSize(e):null}static getChannels(e,t){return this.impls[t]?this.impls[t].getChannels(e):null}static getVRAMByteLength(e,t){if(!this.impls[t])return null;if(this.impls[t].getVRAMByteLength)return this.impls[t].getVRAMByteLength(e);let a=0,s=4,r=this.getSize(e,t);if(!r)return null;for(;r[0]>1||r[1]>1;)a+=r[0]*r[1]*s,r[0]=Math.max(Math.floor(r[0]/2),1),r[1]=Math.max(Math.floor(r[1]/2),1);return a+=1*s,a}static mimeTypeToExtension(e){return e==="image/jpeg"?"jpg":e.split("/").pop()}static extensionToMimeType(e){return e==="jpg"?"image/jpeg":e?`image/${e}`:""}};function uo(e,t){if(t>e.byteLength)throw new TypeError("Corrupt JPG, exceeded buffer limits");if(e.getUint8(t)!==255)throw new TypeError("Invalid JPG, marker table corrupted");return e}var _t=class{static basename(e){let t=e.split(/[\\/]/).pop();return t.substring(0,t.lastIndexOf("."))}static extension(e){if(e.startsWith("data:image/")){let t=e.match(/data:(image\/\w+)/)[1];return qe.mimeTypeToExtension(t)}else{if(e.startsWith("data:model/gltf+json"))return"gltf";if(e.startsWith("data:model/gltf-binary"))return"glb";if(e.startsWith("data:application/"))return"bin"}return e.split(/[\\/]/).pop().split(/[.]/).pop()}},xs=typeof Float32Array<"u"?Float32Array:Array;Math.PI/180;180/Math.PI;function fo(){var e=new xs(3);return xs!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e}function ps(e){var t=e[0],a=e[1],s=e[2];return Math.sqrt(t*t+a*a+s*s)}function ho(e,t,a){var s=t[0],r=t[1],n=t[2],i=a[3]*s+a[7]*r+a[11]*n+a[15];return i=i||1,e[0]=(a[0]*s+a[4]*r+a[8]*n+a[12])/i,e[1]=(a[1]*s+a[5]*r+a[9]*n+a[13])/i,e[2]=(a[2]*s+a[6]*r+a[10]*n+a[14])/i,e}(function(){var e=fo();return function(t,a,s,r,n,i){var o,c;for(a||(a=3),s||(s=0),r?c=Math.min(r*a+s,t.length):c=t.length,o=s;o<c;o+=a)e[0]=t[o],e[1]=t[o+1],e[2]=t[o+2],n(e,e,i),t[o]=e[0],t[o+1]=e[1],t[o+2]=e[2];return t}})();function Mr(e){let t=Ar(),a=e.propertyType==="Node"?[e]:e.listChildren();for(let s of a)s.traverse(r=>{let n=r.getMesh();if(!n)return;let i=bo(n,r.getWorldMatrix());i.min.every(isFinite)&&i.max.every(isFinite)&&(ys(i.min,t),ys(i.max,t))});return t}function bo(e,t){let a=Ar();for(let s of e.listPrimitives()){let r=s.getAttribute("POSITION"),n=s.getIndices();if(!r)continue;let i=[0,0,0],o=[0,0,0];for(let c=0,l=n?n.getCount():r.getCount();c<l;c++){let p=n?n.getScalar(c):c;i=r.getElement(p,i),o=ho(o,i,t),ys(o,a)}}return a}function ys(e,t){for(let a=0;a<3;a++)t.min[a]=Math.min(e[a],t.min[a]),t.max[a]=Math.max(e[a],t.max[a])}function Ar(){return{min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]}}var yr="https://null.example",ms=class{static DEFAULT_INIT={};static PROTOCOL_REGEXP=/^[a-zA-Z]+:\/\//;static dirname(e){let t=e.lastIndexOf("/");return t===-1?"./":e.substring(0,t+1)}static basename(e){return _t.basename(new URL(e,yr).pathname)}static extension(e){return _t.extension(new URL(e,yr).pathname)}static resolve(e,t){if(!this.isRelativePath(t))return t;let a=e.split("/"),s=t.split("/");a.pop();for(let r=0;r<s.length;r++)s[r]!=="."&&(s[r]===".."?a.pop():a.push(s[r]));return a.join("/")}static isAbsoluteURL(e){return this.PROTOCOL_REGEXP.test(e)}static isRelativePath(e){return!/^(?:[a-zA-Z]+:)?\//.test(e)}};function vr(e){return Object.prototype.toString.call(e)==="[object Object]"}function Et(e){if(vr(e)===!1)return!1;let t=e.constructor;if(t===void 0)return!0;let a=t.prototype;return!(vr(a)===!1||Object.hasOwn(a,"isPrototypeOf")===!1)}var go=(function(e){return e[e.SILENT=4]="SILENT",e[e.ERROR=3]="ERROR",e[e.WARN=2]="WARN",e[e.INFO=1]="INFO",e[e.DEBUG=0]="DEBUG",e})({}),Ea=class Sr{verbosity;static Verbosity=go;static DEFAULT_INSTANCE=new Sr(1);constructor(t){this.verbosity=t}debug(t){this.verbosity<=0&&console.debug(t)}info(t){this.verbosity<=1&&console.info(t)}warn(t){this.verbosity<=2&&console.warn(t)}error(t){this.verbosity<=3&&console.error(t)}};function po(e){var t=e[0],a=e[1],s=e[2],r=e[3],n=e[4],i=e[5],o=e[6],c=e[7],l=e[8],p=e[9],g=e[10],w=e[11],y=e[12],f=e[13],d=e[14],x=e[15],u=t*i-a*n,h=t*o-s*n,m=a*o-s*i,v=l*f-p*y,T=l*d-g*y,k=p*d-g*f,I=t*k-a*T+s*v,M=n*k-i*T+o*v,_=l*m-p*h+g*u,A=y*m-f*h+d*u;return c*I-r*M+x*_-w*A}function mo(e,t,a){var s=t[0],r=t[1],n=t[2],i=t[3],o=t[4],c=t[5],l=t[6],p=t[7],g=t[8],w=t[9],y=t[10],f=t[11],d=t[12],x=t[13],u=t[14],h=t[15],m=a[0],v=a[1],T=a[2],k=a[3];return e[0]=m*s+v*o+T*g+k*d,e[1]=m*r+v*c+T*w+k*x,e[2]=m*n+v*l+T*y+k*u,e[3]=m*i+v*p+T*f+k*h,m=a[4],v=a[5],T=a[6],k=a[7],e[4]=m*s+v*o+T*g+k*d,e[5]=m*r+v*c+T*w+k*x,e[6]=m*n+v*l+T*y+k*u,e[7]=m*i+v*p+T*f+k*h,m=a[8],v=a[9],T=a[10],k=a[11],e[8]=m*s+v*o+T*g+k*d,e[9]=m*r+v*c+T*w+k*x,e[10]=m*n+v*l+T*y+k*u,e[11]=m*i+v*p+T*f+k*h,m=a[12],v=a[13],T=a[14],k=a[15],e[12]=m*s+v*o+T*g+k*d,e[13]=m*r+v*c+T*w+k*x,e[14]=m*n+v*l+T*y+k*u,e[15]=m*i+v*p+T*f+k*h,e}function xo(e,t){var a=t[0],s=t[1],r=t[2],n=t[4],i=t[5],o=t[6],c=t[8],l=t[9],p=t[10];return e[0]=Math.sqrt(a*a+s*s+r*r),e[1]=Math.sqrt(n*n+i*i+o*o),e[2]=Math.sqrt(c*c+l*l+p*p),e}function yo(e,t){var a=new xs(3);xo(a,t);var s=1/a[0],r=1/a[1],n=1/a[2],i=t[0]*s,o=t[1]*r,c=t[2]*n,l=t[4]*s,p=t[5]*r,g=t[6]*n,w=t[8]*s,y=t[9]*r,f=t[10]*n,d=i+p+f,x=0;return d>0?(x=Math.sqrt(d+1)*2,e[3]=.25*x,e[0]=(g-y)/x,e[1]=(w-c)/x,e[2]=(o-l)/x):i>p&&i>f?(x=Math.sqrt(1+i-p-f)*2,e[3]=(g-y)/x,e[0]=.25*x,e[1]=(o+l)/x,e[2]=(w+c)/x):p>f?(x=Math.sqrt(1+p-i-f)*2,e[3]=(w-c)/x,e[0]=(o+l)/x,e[1]=.25*x,e[2]=(g+y)/x):(x=Math.sqrt(1+f-i-p)*2,e[3]=(o-l)/x,e[0]=(w+c)/x,e[1]=(g+y)/x,e[2]=.25*x),e}var re=class Gt{static identity(t){return t}static eq(t,a,s=1e-5){if(t.length!==a.length)return!1;for(let r=0;r<t.length;r++)if(Math.abs(t[r]-a[r])>s)return!1;return!0}static clamp(t,a,s){return t<a?a:t>s?s:t}static decodeNormalizedInt(t,a){switch(a){case 5126:return t;case 5123:return t/65535;case 5121:return t/255;case 5122:return Math.max(t/32767,-1);case 5120:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}static encodeNormalizedInt(t,a){switch(a){case 5126:return t;case 5123:return Math.round(Gt.clamp(t,0,1)*65535);case 5121:return Math.round(Gt.clamp(t,0,1)*255);case 5122:return Math.round(Gt.clamp(t,-1,1)*32767);case 5120:return Math.round(Gt.clamp(t,-1,1)*127);default:throw new Error("Invalid component type.")}}static decompose(t,a,s,r){let n=ps([t[0],t[1],t[2]]),i=ps([t[4],t[5],t[6]]),o=ps([t[8],t[9],t[10]]);po(t)<0&&(n=-n),a[0]=t[12],a[1]=t[13],a[2]=t[14];let c=t.slice(),l=1/n,p=1/i,g=1/o;c[0]*=l,c[1]*=l,c[2]*=l,c[4]*=p,c[5]*=p,c[6]*=p,c[8]*=g,c[9]*=g,c[10]*=g,yo(s,c),r[0]=n,r[1]=i,r[2]=o}static compose(t,a,s,r){let n=r,i=a[0],o=a[1],c=a[2],l=a[3],p=i+i,g=o+o,w=c+c,y=i*p,f=i*g,d=i*w,x=o*g,u=o*w,h=c*w,m=l*p,v=l*g,T=l*w,k=s[0],I=s[1],M=s[2];return n[0]=(1-(x+h))*k,n[1]=(f+T)*k,n[2]=(d-v)*k,n[3]=0,n[4]=(f-T)*I,n[5]=(1-(y+h))*I,n[6]=(u+m)*I,n[7]=0,n[8]=(d+v)*M,n[9]=(u-m)*M,n[10]=(1-(y+x))*M,n[11]=0,n[12]=t[0],n[13]=t[1],n[14]=t[2],n[15]=1,n}};function vo(e,t){if(!!e!=!!t)return!1;let a=e.getChild(),s=t.getChild();return a===s||a.equals(s)}function wo(e,t){if(!!e!=!!t)return!1;let a=e.values(),s=t.values();if(a.length!==s.length)return!1;for(let r=0;r<a.length;r++){let n=a[r],i=s[r];if(n.getChild()!==i.getChild()&&!n.getChild().equals(i.getChild()))return!1}return!0}function To(e,t){if(!!e!=!!t)return!1;let a=e.keys(),s=t.keys();if(a.length!==s.length)return!1;for(let r of a){let n=e.get(r),i=t.get(r);if(!!n!=!!i)return!1;let o=n.getChild(),c=i.getChild();if(o!==c&&!o.equals(c))return!1}return!0}function _r(e,t){if(e===t)return!0;if(!!e!=!!t||!e||!t||e.length!==t.length)return!1;for(let a=0;a<e.length;a++)if(e[a]!==t[a])return!1;return!0}function Nr(e,t){if(e===t)return!0;if(!!e!=!!t)return!1;if(!Et(e)||!Et(t))return e===t;let a=e,s=t,r=0,n=0,i;for(i in a)r++;for(i in s)n++;if(r!==n)return!1;for(i in a){let o=a[i],c=s[i];if(va(o)&&va(c)){if(!_r(o,c))return!1}else if(Et(o)&&Et(c)){if(!Nr(o,c))return!1}else if(o!==c)return!1}return!0}function va(e){return Array.isArray(e)||ArrayBuffer.isView(e)}var Eo="23456789abdegjkmnpqrvwxyzABDEGJKMNPQRVWXYZ",ko=999,Ro=6,wr=new Set,Io=function(){let e="";for(let t=0;t<Ro;t++)e+=Eo.charAt(Math.floor(Math.random()*42));return e},Mo=function(){for(let e=0;e<ko;e++){let t=Io();if(!wr.has(t))return wr.add(t),t}return""},st=e=>e,Ao=new Set,Ts=class extends mr{constructor(e,t=""){super(e),this[$].name=t,this.init(),this.dispatchEvent({type:"create"})}getGraph(){return this.graph}getDefaults(){return Object.assign(super.getDefaults(),{name:"",extras:{}})}set(e,t){return Array.isArray(t)&&(t=t.slice()),super.set(e,t)}getName(){return this.get("name")}setName(e){return this.set("name",e)}getExtras(){return this.get("extras")}setExtras(e){return this.set("extras",e)}clone(){let e=this.constructor;return new e(this.graph).copy(this,st)}copy(e,t=st){for(let a in this[$]){let s=this[$][a];if(s instanceof et)this[Ze].has(a)||s.dispose();else if(s instanceof be||s instanceof ae)for(let r of s.values())r.dispose();else if(s instanceof le)for(let r of s.values())r.dispose()}for(let a in e[$]){let s=this[$][a],r=e[$][a];if(r instanceof et)this[Ze].has(a)?s.getChild().copy(t(r.getChild()),t):this.setRef(a,t(r.getChild()),r.getAttributes());else if(r instanceof ae||r instanceof be)for(let n of r.values())this.addRef(a,t(n.getChild()),n.getAttributes());else if(r instanceof le)for(let n of r.keys()){let i=r.get(n);this.setRefMap(a,n,t(i.getChild()),i.getAttributes())}else Et(r)?this[$][a]=JSON.parse(JSON.stringify(r)):Array.isArray(r)||r instanceof ArrayBuffer||ArrayBuffer.isView(r)?this[$][a]=r.slice():this[$][a]=r}return this}equals(e,t=Ao){if(this===e)return!0;if(this.propertyType!==e.propertyType)return!1;for(let a in this[$]){if(t.has(a))continue;let s=this[$][a],r=e[$][a];if(s instanceof et||r instanceof et){if(!vo(s,r))return!1}else if(s instanceof ae||r instanceof ae||s instanceof be||r instanceof be){if(!wo(s,r))return!1}else if(s instanceof le||r instanceof le){if(!To(s,r))return!1}else if(Et(s)||Et(r)){if(!Nr(s,r))return!1}else if(va(s)||va(r)){if(!_r(s,r))return!1}else if(s!==r)return!1}return!0}detach(){return this.graph.disconnectParents(this,e=>e.propertyType!=="Root"),this}listParents(){return this.graph.listParents(this)}},ve=class extends Ts{getDefaults(){return Object.assign(super.getDefaults(),{extensions:new le})}getExtension(e){return this.getRefMap("extensions",e)}setExtension(e,t){return t&&t._validateParent(this),this.setRefMap("extensions",e,t)}listExtensions(){return this.listRefMapValues("extensions")}},D=class ue extends ve{static Type={SCALAR:"SCALAR",VEC2:"VEC2",VEC3:"VEC3",VEC4:"VEC4",MAT2:"MAT2",MAT3:"MAT3",MAT4:"MAT4"};static ComponentType={BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,UNSIGNED_INT:5125,FLOAT:5126,FLOAT16:5131,FLOAT64:5130};init(){this.propertyType="Accessor"}getDefaults(){return Object.assign(super.getDefaults(),{array:null,type:ue.Type.SCALAR,componentType:ue.ComponentType.FLOAT,normalized:!1,sparse:!1,buffer:null})}static getElementSize(t){switch(t){case ue.Type.SCALAR:return 1;case ue.Type.VEC2:return 2;case ue.Type.VEC3:return 3;case ue.Type.VEC4:return 4;case ue.Type.MAT2:return 4;case ue.Type.MAT3:return 9;case ue.Type.MAT4:return 16;default:throw new Error("Unexpected type: "+t)}}static getComponentSize(t){switch(t){case ue.ComponentType.BYTE:case ue.ComponentType.UNSIGNED_BYTE:return 1;case ue.ComponentType.SHORT:case ue.ComponentType.UNSIGNED_SHORT:return 2;case ue.ComponentType.UNSIGNED_INT:case ue.ComponentType.FLOAT:return 4;case ue.ComponentType.FLOAT16:return 2;case ue.ComponentType.FLOAT64:return 8;default:throw new Error("Unexpected component type: "+t)}}getMinNormalized(t){let a=this.getNormalized(),s=this.getElementSize(),r=this.getComponentType();if(this.getMin(t),a)for(let n=0;n<s;n++)t[n]=re.decodeNormalizedInt(t[n],r);return t}getMin(t){let a=this.getArray(),s=this.getCount(),r=this.getElementSize();for(let n=0;n<r;n++)t[n]=1/0;for(let n=0;n<s*r;n+=r)for(let i=0;i<r;i++){let o=a[n+i];Number.isFinite(o)&&(t[i]=Math.min(t[i],o))}return t}getMaxNormalized(t){let a=this.getNormalized(),s=this.getElementSize(),r=this.getComponentType();if(this.getMax(t),a)for(let n=0;n<s;n++)t[n]=re.decodeNormalizedInt(t[n],r);return t}getMax(t){let a=this.get("array"),s=this.getCount(),r=this.getElementSize();for(let n=0;n<r;n++)t[n]=-1/0;for(let n=0;n<s*r;n+=r)for(let i=0;i<r;i++){let o=a[n+i];Number.isFinite(o)&&(t[i]=Math.max(t[i],o))}return t}getCount(){let t=this.get("array");return t?t.length/this.getElementSize():0}getType(){return this.get("type")}setType(t){return this.set("type",t)}getElementSize(){return ue.getElementSize(this.get("type"))}getComponentSize(){return this.get("array").BYTES_PER_ELEMENT}getComponentType(){return this.get("componentType")}getNormalized(){return this.get("normalized")}setNormalized(t){return this.set("normalized",t)}getScalar(t){let a=this.getElementSize(),s=this.getComponentType(),r=this.getArray();return this.getNormalized()?re.decodeNormalizedInt(r[t*a],s):r[t*a]}setScalar(t,a){let s=this.getElementSize(),r=this.getComponentType(),n=this.getArray();return this.getNormalized()?n[t*s]=re.encodeNormalizedInt(a,r):n[t*s]=a,this}getElement(t,a){let s=this.getNormalized(),r=this.getElementSize(),n=this.getComponentType(),i=this.getArray();for(let o=0;o<r;o++)s?a[o]=re.decodeNormalizedInt(i[t*r+o],n):a[o]=i[t*r+o];return a}setElement(t,a){let s=this.getNormalized(),r=this.getElementSize(),n=this.getComponentType(),i=this.getArray();for(let o=0;o<r;o++)s?i[t*r+o]=re.encodeNormalizedInt(a[o],n):i[t*r+o]=a[o];return this}getSparse(){return this.get("sparse")}setSparse(t){return this.set("sparse",t)}getBuffer(){return this.getRef("buffer")}setBuffer(t){return this.setRef("buffer",t)}getArray(){return this.get("array")}setArray(t){return this.set("componentType",t?So(t):ue.ComponentType.FLOAT),this.set("array",t),this}getByteLength(){let t=this.get("array");return t?t.byteLength:0}};function So(e){switch(e.constructor){case Float32Array:return D.ComponentType.FLOAT;case Uint32Array:return D.ComponentType.UNSIGNED_INT;case Uint16Array:return D.ComponentType.UNSIGNED_SHORT;case Uint8Array:return D.ComponentType.UNSIGNED_BYTE;case Int16Array:return D.ComponentType.SHORT;case Int8Array:return D.ComponentType.BYTE;case Float64Array:return D.ComponentType.FLOAT64}if(typeof Float16Array<"u"&&e.constructor===Float16Array)return D.ComponentType.FLOAT16;throw new Error("Unknown accessor componentType.")}var jr=class extends ve{init(){this.propertyType="Animation"}getDefaults(){return Object.assign(super.getDefaults(),{channels:new ae,samplers:new ae})}addChannel(e){return this.addRef("channels",e)}removeChannel(e){return this.removeRef("channels",e)}listChannels(){return this.listRefs("channels")}addSampler(e){return this.addRef("samplers",e)}removeSampler(e){return this.removeRef("samplers",e)}listSamplers(){return this.listRefs("samplers")}},Es=class extends ve{static TargetPath={TRANSLATION:"translation",ROTATION:"rotation",SCALE:"scale",WEIGHTS:"weights"};init(){this.propertyType="AnimationChannel"}getDefaults(){return Object.assign(super.getDefaults(),{targetPath:null,targetNode:null,sampler:null})}getTargetPath(){return this.get("targetPath")}setTargetPath(e){return this.set("targetPath",e)}getTargetNode(){return this.getRef("targetNode")}setTargetNode(e){return this.setRef("targetNode",e)}getSampler(){return this.getRef("sampler")}setSampler(e){return this.setRef("sampler",e)}},ka=class Fr extends ve{static Interpolation={LINEAR:"LINEAR",STEP:"STEP",CUBICSPLINE:"CUBICSPLINE"};init(){this.propertyType="AnimationSampler"}getDefaultAttributes(){return Object.assign(super.getDefaults(),{interpolation:Fr.Interpolation.LINEAR,input:null,output:null})}getInterpolation(){return this.get("interpolation")}setInterpolation(t){return this.set("interpolation",t)}getInput(){return this.getRef("input")}setInput(t){return this.setRef("input",t,{usage:"OTHER"})}getOutput(){return this.getRef("output")}setOutput(t){return this.setRef("output",t,{usage:"OTHER"})}},Cr=class extends ve{init(){this.propertyType="Buffer"}getDefaults(){return Object.assign(super.getDefaults(),{uri:""})}getURI(){return this.get("uri")}setURI(e){return this.set("uri",e)}},Ra=class Br extends ve{static Type={PERSPECTIVE:"perspective",ORTHOGRAPHIC:"orthographic"};init(){this.propertyType="Camera"}getDefaults(){return Object.assign(super.getDefaults(),{type:Br.Type.PERSPECTIVE,znear:.1,zfar:100,aspectRatio:null,yfov:Math.PI*2*50/360,xmag:1,ymag:1})}getType(){return this.get("type")}setType(t){return this.set("type",t)}getZNear(){return this.get("znear")}setZNear(t){return this.set("znear",t)}getZFar(){return this.get("zfar")}setZFar(t){return this.set("zfar",t)}getAspectRatio(){return this.get("aspectRatio")}setAspectRatio(t){return this.set("aspectRatio",t)}getYFov(){return this.get("yfov")}setYFov(t){return this.set("yfov",t)}getXMag(){return this.get("xmag")}setXMag(t){return this.set("xmag",t)}getYMag(){return this.get("ymag")}setYMag(t){return this.set("ymag",t)}},H=class extends Ts{static EXTENSION_NAME;_validateParent(e){if(!this.parentTypes.includes(e.propertyType))throw new Error(`Parent "${e.propertyType}" invalid for child "${this.propertyType}".`)}},se=class vs extends ve{static WrapMode={CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,REPEAT:10497};static MagFilter={NEAREST:9728,LINEAR:9729};static MinFilter={NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987};init(){this.propertyType="TextureInfo"}getDefaults(){return Object.assign(super.getDefaults(),{texCoord:0,magFilter:null,minFilter:null,wrapS:vs.WrapMode.REPEAT,wrapT:vs.WrapMode.REPEAT})}getTexCoord(){return this.get("texCoord")}setTexCoord(t){return this.set("texCoord",t)}getMagFilter(){return this.get("magFilter")}setMagFilter(t){return this.set("magFilter",t)}getMinFilter(){return this.get("minFilter")}setMinFilter(t){return this.set("minFilter",t)}getWrapS(){return this.get("wrapS")}setWrapS(t){return this.set("wrapS",t)}getWrapT(){return this.get("wrapT")}setWrapT(t){return this.set("wrapT",t)}},{R:ga,G:pa,B:ma,A:_o}=Le,wa=class Or extends ve{static AlphaMode={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};init(){this.propertyType="Material"}getDefaults(){return Object.assign(super.getDefaults(),{alphaMode:Or.AlphaMode.OPAQUE,alphaCutoff:.5,doubleSided:!1,baseColorFactor:[1,1,1,1],baseColorTexture:null,baseColorTextureInfo:new se(this.graph,"baseColorTextureInfo"),emissiveFactor:[0,0,0],emissiveTexture:null,emissiveTextureInfo:new se(this.graph,"emissiveTextureInfo"),normalScale:1,normalTexture:null,normalTextureInfo:new se(this.graph,"normalTextureInfo"),occlusionStrength:1,occlusionTexture:null,occlusionTextureInfo:new se(this.graph,"occlusionTextureInfo"),roughnessFactor:1,metallicFactor:1,metallicRoughnessTexture:null,metallicRoughnessTextureInfo:new se(this.graph,"metallicRoughnessTextureInfo")})}getDoubleSided(){return this.get("doubleSided")}setDoubleSided(t){return this.set("doubleSided",t)}getAlpha(){return this.get("baseColorFactor")[3]}setAlpha(t){let a=this.get("baseColorFactor").slice();return a[3]=t,this.set("baseColorFactor",a)}getAlphaMode(){return this.get("alphaMode")}setAlphaMode(t){return this.set("alphaMode",t)}getAlphaCutoff(){return this.get("alphaCutoff")}setAlphaCutoff(t){return this.set("alphaCutoff",t)}getBaseColorFactor(){return this.get("baseColorFactor")}setBaseColorFactor(t){return this.set("baseColorFactor",t)}getBaseColorTexture(){return this.getRef("baseColorTexture")}getBaseColorTextureInfo(){return this.getRef("baseColorTexture")?this.getRef("baseColorTextureInfo"):null}setBaseColorTexture(t){return this.setRef("baseColorTexture",t,{channels:ga|pa|ma|_o,isColor:!0})}getEmissiveFactor(){return this.get("emissiveFactor")}setEmissiveFactor(t){return this.set("emissiveFactor",t)}getEmissiveTexture(){return this.getRef("emissiveTexture")}getEmissiveTextureInfo(){return this.getRef("emissiveTexture")?this.getRef("emissiveTextureInfo"):null}setEmissiveTexture(t){return this.setRef("emissiveTexture",t,{channels:ga|pa|ma,isColor:!0})}getNormalScale(){return this.get("normalScale")}setNormalScale(t){return this.set("normalScale",t)}getNormalTexture(){return this.getRef("normalTexture")}getNormalTextureInfo(){return this.getRef("normalTexture")?this.getRef("normalTextureInfo"):null}setNormalTexture(t){return this.setRef("normalTexture",t,{channels:ga|pa|ma})}getOcclusionStrength(){return this.get("occlusionStrength")}setOcclusionStrength(t){return this.set("occlusionStrength",t)}getOcclusionTexture(){return this.getRef("occlusionTexture")}getOcclusionTextureInfo(){return this.getRef("occlusionTexture")?this.getRef("occlusionTextureInfo"):null}setOcclusionTexture(t){return this.setRef("occlusionTexture",t,{channels:ga})}getRoughnessFactor(){return this.get("roughnessFactor")}setRoughnessFactor(t){return this.set("roughnessFactor",t)}getMetallicFactor(){return this.get("metallicFactor")}setMetallicFactor(t){return this.set("metallicFactor",t)}getMetallicRoughnessTexture(){return this.getRef("metallicRoughnessTexture")}getMetallicRoughnessTextureInfo(){return this.getRef("metallicRoughnessTexture")?this.getRef("metallicRoughnessTextureInfo"):null}setMetallicRoughnessTexture(t){return this.setRef("metallicRoughnessTexture",t,{channels:pa|ma})}},Pr=class extends ve{init(){this.propertyType="Mesh"}getDefaults(){return Object.assign(super.getDefaults(),{weights:[],primitives:new ae})}addPrimitive(e){return this.addRef("primitives",e)}removePrimitive(e){return this.removeRef("primitives",e)}listPrimitives(){return this.listRefs("primitives")}getWeights(){return this.get("weights")}setWeights(e){return this.set("weights",e)}},Dr=class extends ve{init(){this.propertyType="Node"}getDefaults(){return Object.assign(super.getDefaults(),{translation:[0,0,0],rotation:[0,0,0,1],scale:[1,1,1],weights:[],camera:null,mesh:null,skin:null,children:new ae})}copy(e,t=st){if(t===st)throw new Error("Node cannot be copied.");return super.copy(e,t)}getTranslation(){return this.get("translation")}getRotation(){return this.get("rotation")}getScale(){return this.get("scale")}setTranslation(e){return this.set("translation",e)}setRotation(e){return this.set("rotation",e)}setScale(e){return this.set("scale",e)}getMatrix(){return re.compose(this.get("translation"),this.get("rotation"),this.get("scale"),[])}setMatrix(e){let t=this.get("translation").slice(),a=this.get("rotation").slice(),s=this.get("scale").slice();return re.decompose(e,t,a,s),this.set("translation",t).set("rotation",a).set("scale",s)}getWorldTranslation(){let e=[0,0,0];return re.decompose(this.getWorldMatrix(),e,[0,0,0,1],[1,1,1]),e}getWorldRotation(){let e=[0,0,0,1];return re.decompose(this.getWorldMatrix(),[0,0,0],e,[1,1,1]),e}getWorldScale(){let e=[1,1,1];return re.decompose(this.getWorldMatrix(),[0,0,0],[0,0,0,1],e),e}getWorldMatrix(){let e=[];for(let s=this;s!=null;s=s.getParentNode())e.push(s);let t,a=e.pop().getMatrix();for(;t=e.pop();)mo(a,a,t.getMatrix());return a}addChild(e){let t=e.getParentNode();t&&t.removeChild(e);for(let a of e.listParents())a.propertyType==="Scene"&&a.removeChild(e);return this.addRef("children",e)}removeChild(e){return this.removeRef("children",e)}listChildren(){return this.listRefs("children")}getParentNode(){for(let e of this.listParents())if(e.propertyType==="Node")return e;return null}getMesh(){return this.getRef("mesh")}setMesh(e){return this.setRef("mesh",e)}getCamera(){return this.getRef("camera")}setCamera(e){return this.setRef("camera",e)}getSkin(){return this.getRef("skin")}setSkin(e){return this.setRef("skin",e)}getWeights(){return this.get("weights")}setWeights(e){return this.set("weights",e)}traverse(e){e(this);for(let t of this.listChildren())t.traverse(e);return this}},zt=class Ur extends ve{static Mode={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6};init(){this.propertyType="Primitive"}getDefaults(){return Object.assign(super.getDefaults(),{mode:Ur.Mode.TRIANGLES,material:null,indices:null,attributes:new le,targets:new ae})}getIndices(){return this.getRef("indices")}setIndices(t){return this.setRef("indices",t,{usage:"ELEMENT_ARRAY_BUFFER"})}getAttribute(t){return this.getRefMap("attributes",t)}setAttribute(t,a){return this.setRefMap("attributes",t,a,{usage:"ARRAY_BUFFER"})}listAttributes(){return this.listRefMapValues("attributes")}listSemantics(){return this.listRefMapKeys("attributes")}getMaterial(){return this.getRef("material")}setMaterial(t){return this.setRef("material",t)}getMode(){return this.get("mode")}setMode(t){return this.set("mode",t)}listTargets(){return this.listRefs("targets")}addTarget(t){return this.addRef("targets",t)}removeTarget(t){return this.removeRef("targets",t)}},No=class extends Ts{init(){this.propertyType="PrimitiveTarget"}getDefaults(){return Object.assign(super.getDefaults(),{attributes:new le})}getAttribute(e){return this.getRefMap("attributes",e)}setAttribute(e,t){return this.setRefMap("attributes",e,t,{usage:"ARRAY_BUFFER"})}listAttributes(){return this.listRefMapValues("attributes")}listSemantics(){return this.listRefMapKeys("attributes")}},Lr=class extends ve{init(){this.propertyType="Scene"}getDefaults(){return Object.assign(super.getDefaults(),{children:new ae})}copy(e,t=st){if(t===st)throw new Error("Scene cannot be copied.");return super.copy(e,t)}addChild(e){let t=e.getParentNode();return t&&t.removeChild(e),this.addRef("children",e)}removeChild(e){return this.removeRef("children",e)}listChildren(){return this.listRefs("children")}traverse(e){for(let t of this.listChildren())t.traverse(e);return this}},Kr=class extends ve{init(){this.propertyType="Skin"}getDefaults(){return Object.assign(super.getDefaults(),{skeleton:null,inverseBindMatrices:null,joints:new ae})}getSkeleton(){return this.getRef("skeleton")}setSkeleton(e){return this.setRef("skeleton",e)}getInverseBindMatrices(){return this.getRef("inverseBindMatrices")}setInverseBindMatrices(e){return this.setRef("inverseBindMatrices",e,{usage:"INVERSE_BIND_MATRICES"})}addJoint(e){return this.addRef("joints",e)}removeJoint(e){return this.removeRef("joints",e)}listJoints(){return this.listRefs("joints")}},Gr=class extends ve{init(){this.propertyType="Texture"}getDefaults(){return Object.assign(super.getDefaults(),{image:null,mimeType:"",uri:""})}getMimeType(){return this.get("mimeType")||qe.extensionToMimeType(_t.extension(this.get("uri")))}setMimeType(e){return this.set("mimeType",e)}getURI(){return this.get("uri")}setURI(e){this.set("uri",e);let t=qe.extensionToMimeType(_t.extension(e));return t&&this.set("mimeType",t),this}getImage(){return this.get("image")}setImage(e){return this.set("image",G.assertView(e))}getSize(){let e=this.get("image");return e?qe.getSize(e,this.getMimeType()):null}},ks=class extends ve{_extensions=new Set;init(){this.propertyType="Root"}getDefaults(){return Object.assign(super.getDefaults(),{asset:{generator:`glTF-Transform ${Rr}`,version:"2.0"},defaultScene:null,accessors:new ae,animations:new ae,buffers:new ae,cameras:new ae,materials:new ae,meshes:new ae,nodes:new ae,scenes:new ae,skins:new ae,textures:new ae})}constructor(e){super(e),e.addEventListener("node:create",t=>{this._addChildOfRoot(t.target)})}clone(){throw new Error("Root cannot be cloned.")}copy(e,t=st){if(t===st)throw new Error("Root cannot be copied.");this.set("asset",{...e.get("asset")}),this.setName(e.getName()),this.setExtras({...e.getExtras()}),this.setDefaultScene(e.getDefaultScene()?t(e.getDefaultScene()):null);for(let a of e.listRefMapKeys("extensions")){let s=e.getExtension(a);this.setExtension(a,t(s))}return this}_addChildOfRoot(e){return e instanceof Lr?this.addRef("scenes",e):e instanceof Dr?this.addRef("nodes",e):e instanceof Ra?this.addRef("cameras",e):e instanceof Kr?this.addRef("skins",e):e instanceof Pr?this.addRef("meshes",e):e instanceof wa?this.addRef("materials",e):e instanceof Gr?this.addRef("textures",e):e instanceof jr?this.addRef("animations",e):e instanceof D?this.addRef("accessors",e):e instanceof Cr&&this.addRef("buffers",e),this}getAsset(){return this.get("asset")}listExtensionsUsed(){return Array.from(this._extensions)}listExtensionsRequired(){return this.listExtensionsUsed().filter(e=>e.isRequired())}_enableExtension(e){return this._extensions.add(e),this}_disableExtension(e){return this._extensions.delete(e),this}listScenes(){return this.listRefs("scenes")}setDefaultScene(e){return this.setRef("defaultScene",e)}getDefaultScene(){return this.getRef("defaultScene")}listNodes(){return this.listRefs("nodes")}listCameras(){return this.listRefs("cameras")}listSkins(){return this.listRefs("skins")}listMeshes(){return this.listRefs("meshes")}listMaterials(){return this.listRefs("materials")}listTextures(){return this.listRefs("textures")}listAnimations(){return this.listRefs("animations")}listAccessors(){return this.listRefs("accessors")}listBuffers(){return this.listRefs("buffers")}},jo=class ws{_graph=new gs;_root=new ks(this._graph);_logger=Ea.DEFAULT_INSTANCE;static _GRAPH_DOCUMENTS=new WeakMap;static fromGraph(t){return ws._GRAPH_DOCUMENTS.get(t)||null}constructor(){ws._GRAPH_DOCUMENTS.set(this._graph,this)}getRoot(){return this._root}getGraph(){return this._graph}getLogger(){return this._logger}setLogger(t){return this._logger=t,this}clone(){throw new Error("Use 'cloneDocument(source)' from '@gltf-transform/functions'.")}merge(t){throw new Error("Use 'mergeDocuments(target, source)' from '@gltf-transform/functions'.")}async transform(...t){let a=t.map(s=>s.name);for(let s of t)await s(this,{stack:a});return this}hasExtension(t){return this.getRoot().listExtensionsUsed().some(a=>a.extensionName===t)}createExtension(t){let a=t.EXTENSION_NAME;return this.getRoot().listExtensionsUsed().find(s=>s.extensionName===a)||new t(this)}disposeExtension(t){let a=this.getRoot().listExtensionsUsed().find(s=>s.extensionName===t);a&&a.dispose()}createScene(t=""){return new Lr(this._graph,t)}createNode(t=""){return new Dr(this._graph,t)}createCamera(t=""){return new Ra(this._graph,t)}createSkin(t=""){return new Kr(this._graph,t)}createMesh(t=""){return new Pr(this._graph,t)}createPrimitive(){return new zt(this._graph)}createPrimitiveTarget(t=""){return new No(this._graph,t)}createMaterial(t=""){return new wa(this._graph,t)}createTexture(t=""){return new Gr(this._graph,t)}createAnimation(t=""){return new jr(this._graph,t)}createAnimationChannel(t=""){return new Es(this._graph,t)}createAnimationSampler(t=""){return new ka(this._graph,t)}createAccessor(t="",a=null){return a||(a=this.getRoot().listBuffers()[0]),new D(this._graph,t).setBuffer(a)}createBuffer(t=""){return new Cr(this._graph,t)}},Z=class{static EXTENSION_NAME;extensionName="";prereadTypes=[];prewriteTypes=[];readDependencies=[];writeDependencies=[];document;required=!1;properties=new Set;_listener;constructor(e){this.document=e,e.getRoot()._enableExtension(this),this._listener=a=>{let s=a,r=s.target;r instanceof H&&r.extensionName===this.extensionName&&(s.type==="node:create"&&this._addExtensionProperty(r),s.type==="node:dispose"&&this._removeExtensionProperty(r))};let t=e.getGraph();t.addEventListener("node:create",this._listener),t.addEventListener("node:dispose",this._listener)}dispose(){this.document.getRoot()._disableExtension(this);let e=this.document.getGraph();e.removeEventListener("node:create",this._listener),e.removeEventListener("node:dispose",this._listener);for(let t of this.properties)t.dispose()}static register(){}isRequired(){return this.required}setRequired(e){return this.required=e,this}listProperties(){return Array.from(this.properties)}_addExtensionProperty(e){return this.properties.add(e),this}_removeExtensionProperty(e){return this.properties.delete(e),this}install(e,t){return this}preread(e,t){return this}prewrite(e,t){return this}},Fo=class{jsonDoc;buffers=[];bufferViews=[];bufferViewBuffers=[];accessors=[];textures=[];textureInfos=new Map;materials=[];meshes=[];cameras=[];nodes=[];skins=[];animations=[];scenes=[];constructor(e){this.jsonDoc=e}setTextureInfo(e,t){this.textureInfos.set(e,t),t.texCoord!==void 0&&e.setTexCoord(t.texCoord),t.extras!==void 0&&e.setExtras(t.extras);let a=this.jsonDoc.json.textures[t.index];if(a.sampler===void 0)return;let s=this.jsonDoc.json.samplers[a.sampler];s.magFilter!==void 0&&e.setMagFilter(s.magFilter),s.minFilter!==void 0&&e.setMinFilter(s.minFilter),s.wrapS!==void 0&&e.setWrapS(s.wrapS),s.wrapT!==void 0&&e.setWrapT(s.wrapT)}},Tr={logger:Ea.DEFAULT_INSTANCE,extensions:[],dependencies:{}},Co=new Set(["Buffer","Texture","Material","Mesh","Primitive","Node","Scene"]),Bo=class{static read(e,t=Tr){let a={...Tr,...t},{json:s}=e,r=new jo().setLogger(a.logger);this.validate(e,a);let n=new Fo(e),i=s.asset,o=r.getRoot().getAsset();i.copyright&&(o.copyright=i.copyright),i.extras&&(o.extras=i.extras),s.extras!==void 0&&r.getRoot().setExtras({...s.extras});let c=s.extensionsUsed||[],l=s.extensionsRequired||[];a.extensions.sort((u,h)=>u.EXTENSION_NAME>h.EXTENSION_NAME?1:-1);for(let u of a.extensions)if(c.includes(u.EXTENSION_NAME)){let h=r.createExtension(u).setRequired(l.includes(u.EXTENSION_NAME)),m=h.prereadTypes.filter(v=>!Co.has(v));m.length&&a.logger.warn(`Preread hooks for some types (${m.join()}), requested by extension ${h.extensionName}, are unsupported. Please file an issue or a PR.`);for(let v of h.readDependencies)h.install(v,a.dependencies[v])}let p=s.buffers||[];r.getRoot().listExtensionsUsed().filter(u=>u.prereadTypes.includes("Buffer")).forEach(u=>u.preread(n,"Buffer")),n.buffers=p.map(u=>{let h=r.createBuffer(u.name);return u.extras&&h.setExtras(u.extras),u.uri&&u.uri.indexOf("__")!==0&&h.setURI(u.uri),h}),n.bufferViewBuffers=(s.bufferViews||[]).map((u,h)=>{if(!n.bufferViews[h]){let m=e.json.buffers[u.buffer],v=m.uri?e.resources[m.uri]:e.resources[at],T=u.byteOffset||0;n.bufferViews[h]=G.toView(v,T,u.byteLength)}return n.buffers[u.buffer]});let g=s.accessors||[];n.accessors=g.map(u=>{let h=n.bufferViewBuffers[u.bufferView],m=r.createAccessor(u.name,h).setType(u.type);return u.extras&&m.setExtras(u.extras),u.normalized!==void 0&&m.setNormalized(u.normalized),u.bufferView===void 0||m.setArray(ya(u,n)),m});let w=s.images||[],y=s.textures||[];r.getRoot().listExtensionsUsed().filter(u=>u.prereadTypes.includes("Texture")).forEach(u=>u.preread(n,"Texture")),n.textures=w.map(u=>{let h=r.createTexture(u.name);if(u.extras&&h.setExtras(u.extras),u.bufferView!==void 0){let m=s.bufferViews[u.bufferView],v=e.json.buffers[m.buffer],T=v.uri?e.resources[v.uri]:e.resources[at],k=m.byteOffset||0,I=m.byteLength,M=T.slice(k,k+I);h.setImage(M)}else u.uri!==void 0&&(h.setImage(e.resources[u.uri]),u.uri.indexOf("__")!==0&&h.setURI(u.uri));if(u.mimeType!==void 0)h.setMimeType(u.mimeType);else if(u.uri){let m=_t.extension(u.uri);h.setMimeType(qe.extensionToMimeType(m))}return h}),r.getRoot().listExtensionsUsed().filter(u=>u.prereadTypes.includes("Material")).forEach(u=>u.preread(n,"Material")),n.materials=(s.materials||[]).map(u=>{let h=r.createMaterial(u.name);u.extras&&h.setExtras(u.extras),u.alphaMode!==void 0&&h.setAlphaMode(u.alphaMode),u.alphaCutoff!==void 0&&h.setAlphaCutoff(u.alphaCutoff),u.doubleSided!==void 0&&h.setDoubleSided(u.doubleSided);let m=u.pbrMetallicRoughness||{};if(m.baseColorFactor!==void 0&&h.setBaseColorFactor(m.baseColorFactor),u.emissiveFactor!==void 0&&h.setEmissiveFactor(u.emissiveFactor),m.metallicFactor!==void 0&&h.setMetallicFactor(m.metallicFactor),m.roughnessFactor!==void 0&&h.setRoughnessFactor(m.roughnessFactor),m.baseColorTexture!==void 0){let v=m.baseColorTexture,T=n.textures[y[v.index].source];h.setBaseColorTexture(T),n.setTextureInfo(h.getBaseColorTextureInfo(),v)}if(u.emissiveTexture!==void 0){let v=u.emissiveTexture,T=n.textures[y[v.index].source];h.setEmissiveTexture(T),n.setTextureInfo(h.getEmissiveTextureInfo(),v)}if(u.normalTexture!==void 0){let v=u.normalTexture,T=n.textures[y[v.index].source];h.setNormalTexture(T),n.setTextureInfo(h.getNormalTextureInfo(),v),u.normalTexture.scale!==void 0&&h.setNormalScale(u.normalTexture.scale)}if(u.occlusionTexture!==void 0){let v=u.occlusionTexture,T=n.textures[y[v.index].source];h.setOcclusionTexture(T),n.setTextureInfo(h.getOcclusionTextureInfo(),v),u.occlusionTexture.strength!==void 0&&h.setOcclusionStrength(u.occlusionTexture.strength)}if(m.metallicRoughnessTexture!==void 0){let v=m.metallicRoughnessTexture,T=n.textures[y[v.index].source];h.setMetallicRoughnessTexture(T),n.setTextureInfo(h.getMetallicRoughnessTextureInfo(),v)}return h}),r.getRoot().listExtensionsUsed().filter(u=>u.prereadTypes.includes("Mesh")).forEach(u=>u.preread(n,"Mesh"));let f=s.meshes||[];r.getRoot().listExtensionsUsed().filter(u=>u.prereadTypes.includes("Primitive")).forEach(u=>u.preread(n,"Primitive")),n.meshes=f.map(u=>{let h=r.createMesh(u.name);return u.extras&&h.setExtras(u.extras),u.weights!==void 0&&h.setWeights(u.weights),(u.primitives||[]).forEach(m=>{let v=r.createPrimitive();m.extras&&v.setExtras(m.extras),m.material!==void 0&&v.setMaterial(n.materials[m.material]),m.mode!==void 0&&v.setMode(m.mode);for(let[k,I]of Object.entries(m.attributes||{}))v.setAttribute(k,n.accessors[I]);m.indices!==void 0&&v.setIndices(n.accessors[m.indices]);let T=u.extras&&u.extras.targetNames||[];(m.targets||[]).forEach((k,I)=>{let M=T[I]||I.toString(),_=r.createPrimitiveTarget(M);for(let[A,C]of Object.entries(k))_.setAttribute(A,n.accessors[C]);v.addTarget(_)}),h.addPrimitive(v)}),h}),n.cameras=(s.cameras||[]).map(u=>{let h=r.createCamera(u.name).setType(u.type);if(u.extras&&h.setExtras(u.extras),u.type===Ra.Type.PERSPECTIVE){let m=u.perspective;h.setYFov(m.yfov),h.setZNear(m.znear),m.zfar!==void 0&&h.setZFar(m.zfar),m.aspectRatio!==void 0&&h.setAspectRatio(m.aspectRatio)}else{let m=u.orthographic;h.setZNear(m.znear).setZFar(m.zfar).setXMag(m.xmag).setYMag(m.ymag)}return h});let d=s.nodes||[];r.getRoot().listExtensionsUsed().filter(u=>u.prereadTypes.includes("Node")).forEach(u=>u.preread(n,"Node")),n.nodes=d.map(u=>{let h=r.createNode(u.name);if(u.extras&&h.setExtras(u.extras),u.translation!==void 0&&h.setTranslation(u.translation),u.rotation!==void 0&&h.setRotation(u.rotation),u.scale!==void 0&&h.setScale(u.scale),u.matrix!==void 0){let m=[0,0,0],v=[0,0,0,1],T=[1,1,1];re.decompose(u.matrix,m,v,T),h.setTranslation(m),h.setRotation(v),h.setScale(T)}return u.weights!==void 0&&h.setWeights(u.weights),h}),n.skins=(s.skins||[]).map(u=>{let h=r.createSkin(u.name);u.extras&&h.setExtras(u.extras),u.inverseBindMatrices!==void 0&&h.setInverseBindMatrices(n.accessors[u.inverseBindMatrices]),u.skeleton!==void 0&&h.setSkeleton(n.nodes[u.skeleton]);for(let m of u.joints)h.addJoint(n.nodes[m]);return h}),d.map((u,h)=>{let m=n.nodes[h];(u.children||[]).forEach(v=>m.addChild(n.nodes[v])),u.mesh!==void 0&&m.setMesh(n.meshes[u.mesh]),u.camera!==void 0&&m.setCamera(n.cameras[u.camera]),u.skin!==void 0&&m.setSkin(n.skins[u.skin])}),n.animations=(s.animations||[]).map(u=>{let h=r.createAnimation(u.name);u.extras&&h.setExtras(u.extras);let m=(u.samplers||[]).map(v=>{let T=r.createAnimationSampler().setInput(n.accessors[v.input]).setOutput(n.accessors[v.output]).setInterpolation(v.interpolation||ka.Interpolation.LINEAR);return v.extras&&T.setExtras(v.extras),h.addSampler(T),T});return(u.channels||[]).forEach(v=>{let T=r.createAnimationChannel().setSampler(m[v.sampler]).setTargetPath(v.target.path);v.target.node!==void 0&&T.setTargetNode(n.nodes[v.target.node]),v.extras&&T.setExtras(v.extras),h.addChannel(T)}),h});let x=s.scenes||[];return r.getRoot().listExtensionsUsed().filter(u=>u.prereadTypes.includes("Scene")).forEach(u=>u.preread(n,"Scene")),n.scenes=x.map(u=>{let h=r.createScene(u.name);return u.extras&&h.setExtras(u.extras),(u.nodes||[]).map(m=>n.nodes[m]).forEach(m=>h.addChild(m)),h}),s.scene!==void 0&&r.getRoot().setDefaultScene(n.scenes[s.scene]),r.getRoot().listExtensionsUsed().forEach(u=>u.read(n)),g.forEach((u,h)=>{let m=n.accessors[h],v=!!u.sparse,T=!u.bufferView&&!m.getArray();(v||T)&&m.setSparse(!0).setArray(Po(u,n))}),r}static validate(e,t){let a=e.json;if(a.asset.version!=="2.0")throw new Error(`Unsupported glTF version, "${a.asset.version}".`);if(a.extensionsRequired){for(let s of a.extensionsRequired)if(!t.extensions.find(r=>r.EXTENSION_NAME===s))throw new Error(`Missing required extension, "${s}".`)}if(a.extensionsUsed)for(let s of a.extensionsUsed)t.extensions.find(r=>r.EXTENSION_NAME===s)||t.logger.warn(`Missing optional extension, "${s}".`)}};function Oo(e,t){let a=t.jsonDoc,s=t.bufferViews[e.bufferView],r=a.json.bufferViews[e.bufferView],n=Ta[e.componentType],i=D.getElementSize(e.type),o=n.BYTES_PER_ELEMENT,c=e.byteOffset||0,l=new n(e.count*i),p=new DataView(s.buffer,s.byteOffset,s.byteLength),g=r.byteStride;for(let w=0;w<e.count;w++)for(let y=0;y<i;y++){let f=c+w*g+y*o,d;switch(e.componentType){case D.ComponentType.FLOAT:d=p.getFloat32(f,!0);break;case D.ComponentType.UNSIGNED_INT:d=p.getUint32(f,!0);break;case D.ComponentType.UNSIGNED_SHORT:d=p.getUint16(f,!0);break;case D.ComponentType.UNSIGNED_BYTE:d=p.getUint8(f);break;case D.ComponentType.SHORT:d=p.getInt16(f,!0);break;case D.ComponentType.BYTE:d=p.getInt8(f);break;case D.ComponentType.FLOAT16:d=p.getFloat16(f,!0);break;case D.ComponentType.FLOAT64:d=p.getFloat64(f,!0);break;default:throw new Error(`Unexpected componentType "${e.componentType}".`)}l[w*i+y]=d}return l}function ya(e,t){let a=t.jsonDoc,s=t.bufferViews[e.bufferView],r=a.json.bufferViews[e.bufferView],n=Ta[e.componentType],i=D.getElementSize(e.type),o=n.BYTES_PER_ELEMENT,c=i*o;if(r.byteStride!==void 0&&r.byteStride!==c)return Oo(e,t);let l=s.byteOffset+(e.byteOffset||0),p=e.count*i*o;return new n(s.buffer.slice(l,l+p))}function Po(e,t){let a=Ta[e.componentType],s=D.getElementSize(e.type),r;e.bufferView!==void 0?r=ya(e,t):r=new a(e.count*s);let n=e.sparse;if(!n)return r;let i=n.count,o={...e,...n.indices,count:i,type:"SCALAR"},c={...e,...n.values,count:i},l=ya(o,t),p=ya(c,t);for(let g=0;g<o.count;g++)for(let w=0;w<s;w++)r[l[g]*s+w]=p[g*s+w];return r}var zr=(function(e){return e[e.ARRAY_BUFFER=34962]="ARRAY_BUFFER",e[e.ELEMENT_ARRAY_BUFFER=34963]="ELEMENT_ARRAY_BUFFER",e})(zr||{}),tt=class{_doc;jsonDoc;options;static BufferViewTarget=zr;static BufferViewUsage=io;static USAGE_TO_TARGET={ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963};accessorIndexMap=new Map;animationIndexMap=new Map;bufferIndexMap=new Map;cameraIndexMap=new Map;skinIndexMap=new Map;materialIndexMap=new Map;meshIndexMap=new Map;nodeIndexMap=new Map;imageIndexMap=new Map;textureDefIndexMap=new Map;textureInfoDefMap=new Map;samplerDefIndexMap=new Map;sceneIndexMap=new Map;imageBufferViews=[];otherBufferViews=new Map;otherBufferViewsIndexMap=new Map;extensionData={};bufferURIGenerator;imageURIGenerator;logger;_accessorUsageMap=new Map;accessorUsageGroupedByParent=new Set(["ARRAY_BUFFER"]);accessorParents=new Map;constructor(e,t,a){this._doc=e,this.jsonDoc=t,this.options=a;let s=e.getRoot(),r=s.listBuffers().length,n=s.listTextures().length;this.bufferURIGenerator=new Er(r>1,()=>a.basename||"buffer"),this.imageURIGenerator=new Er(n>1,i=>Do(e,i)||a.basename||"texture"),this.logger=e.getLogger()}createTextureInfoDef(e,t){let a={magFilter:t.getMagFilter()||void 0,minFilter:t.getMinFilter()||void 0,wrapS:t.getWrapS(),wrapT:t.getWrapT()},s=JSON.stringify(a);this.samplerDefIndexMap.has(s)||(this.samplerDefIndexMap.set(s,this.jsonDoc.json.samplers.length),this.jsonDoc.json.samplers.push(a));let r={source:this.imageIndexMap.get(e),sampler:this.samplerDefIndexMap.get(s)},n=JSON.stringify(r);this.textureDefIndexMap.has(n)||(this.textureDefIndexMap.set(n,this.jsonDoc.json.textures.length),this.jsonDoc.json.textures.push(r));let i={index:this.textureDefIndexMap.get(n)};return t.getTexCoord()!==0&&(i.texCoord=t.getTexCoord()),Object.keys(t.getExtras()).length>0&&(i.extras=t.getExtras()),this.textureInfoDefMap.set(t,i),i}createPropertyDef(e){let t={};return e.getName()&&(t.name=e.getName()),Object.keys(e.getExtras()).length>0&&(t.extras=e.getExtras()),t}createAccessorDef(e){let t=this.createPropertyDef(e);return t.type=e.getType(),t.componentType=e.getComponentType(),t.count=e.getCount(),this._doc.getGraph().listParentEdges(e).some(a=>a.getName()==="attributes"&&a.getAttributes().key==="POSITION"||a.getName()==="input")&&(t.max=e.getMax([]).map(Math.fround),t.min=e.getMin([]).map(Math.fround)),e.getNormalized()&&(t.normalized=e.getNormalized()),t}createImageData(e,t,a){if(this.options.format==="GLB")this.imageBufferViews.push(t),e.bufferView=this.jsonDoc.json.bufferViews.length,this.jsonDoc.json.bufferViews.push({buffer:0,byteOffset:-1,byteLength:t.byteLength});else{let s=qe.mimeTypeToExtension(a.getMimeType());e.uri=this.imageURIGenerator.createURI(a,s),this.assignResourceURI(e.uri,t,!1)}}assignResourceURI(e,t,a){let s=this.jsonDoc.resources;if(!(e in s)){s[e]=t;return}if(t===s[e]){this.logger.warn(`Duplicate resource URI, "${e}".`);return}let r=`Resource URI "${e}" already assigned to different data.`;if(!a){this.logger.warn(r);return}throw new Error(r)}getAccessorUsage(e){let t=this._accessorUsageMap.get(e);if(t)return t;if(e.getSparse())return"SPARSE";for(let a of this._doc.getGraph().listParentEdges(e)){let{usage:s}=a.getAttributes();if(s)return s;a.getParent().propertyType!=="Root"&&this.logger.warn(`Missing attribute ".usage" on edge, "${a.getName()}".`)}return"OTHER"}addAccessorToUsageGroup(e,t){let a=this._accessorUsageMap.get(e);if(a&&a!==t)throw new Error(`Accessor with usage "${a}" cannot be reused as "${t}".`);return this._accessorUsageMap.set(e,t),this}},Er=class{multiple;basename;counter={};constructor(e,t){this.multiple=e,this.basename=t}createURI(e,t){if(e.getURI())return e.getURI();if(this.multiple){let a=this.basename(e);return this.counter[a]=this.counter[a]||1,`${a}_${this.counter[a]++}.${t}`}else return`${this.basename(e)}.${t}`}};function Do(e,t){let a=e.getGraph().listParentEdges(t).find(s=>s.getParent()!==e.getRoot());return a?a.getName().replace(/texture$/i,""):""}var{BufferViewUsage:xa}=tt,{UNSIGNED_INT:Uo,UNSIGNED_SHORT:Lo,UNSIGNED_BYTE:Ko}=D.ComponentType,Go=new Set(["Accessor","Buffer","Material","Mesh"]),zo=class{static write(e,t){let a=e.getGraph(),s=e.getRoot(),r={asset:{generator:`glTF-Transform ${Rr}`,...s.getAsset()},extras:{...s.getExtras()}},n={json:r,resources:{}},i=new tt(e,n,t),o=t.logger||Ea.DEFAULT_INSTANCE,c=new Set(t.extensions.map(d=>d.EXTENSION_NAME)),l=e.getRoot().listExtensionsUsed().filter(d=>c.has(d.extensionName)).sort((d,x)=>d.extensionName>x.extensionName?1:-1),p=e.getRoot().listExtensionsRequired().filter(d=>c.has(d.extensionName)).sort((d,x)=>d.extensionName>x.extensionName?1:-1);l.length<e.getRoot().listExtensionsUsed().length&&o.warn("Some extensions were not registered for I/O, and will not be written.");for(let d of l){let x=d.prewriteTypes.filter(u=>!Go.has(u));x.length&&o.warn(`Prewrite hooks for some types (${x.join()}), requested by extension ${d.extensionName}, are unsupported. Please file an issue or a PR.`);for(let u of d.writeDependencies)d.install(u,t.dependencies[u])}function g(d,x,u,h){let m=[],v=0;for(let k of d){let I=i.createAccessorDef(k);I.bufferView=r.bufferViews.length;let M=k.getArray(),_=G.pad(G.toView(M));I.byteOffset=v,v+=_.byteLength,m.push(_),i.accessorIndexMap.set(k,r.accessors.length),r.accessors.push(I)}let T={buffer:x,byteOffset:u,byteLength:G.concat(m).byteLength};return h&&(T.target=h),r.bufferViews.push(T),{buffers:m,byteLength:v}}function w(d,x,u){let h=d[0].getCount(),m=0;for(let M of d){let _=i.createAccessorDef(M);_.bufferView=r.bufferViews.length,_.byteOffset=m;let A=M.getElementSize(),C=M.getComponentSize();m+=G.padNumber(A*C),i.accessorIndexMap.set(M,r.accessors.length),r.accessors.push(_)}let v=h*m,T=new ArrayBuffer(v),k=new DataView(T);for(let M=0;M<h;M++){let _=0;for(let A of d){let C=A.getElementSize(),U=A.getComponentSize(),B=A.getComponentType(),F=A.getArray();for(let q=0;q<C;q++){let te=M*m+_+q*U,ne=F[M*C+q];switch(B){case D.ComponentType.FLOAT:k.setFloat32(te,ne,!0);break;case D.ComponentType.BYTE:k.setInt8(te,ne);break;case D.ComponentType.SHORT:k.setInt16(te,ne,!0);break;case D.ComponentType.UNSIGNED_BYTE:k.setUint8(te,ne);break;case D.ComponentType.UNSIGNED_SHORT:k.setUint16(te,ne,!0);break;case D.ComponentType.UNSIGNED_INT:k.setUint32(te,ne,!0);break;case D.ComponentType.FLOAT16:k.setFloat16(te,ne,!0);break;case D.ComponentType.FLOAT64:k.setFloat64(te,ne,!0);break;default:throw new Error("Unexpected component type: "+B)}}_+=G.padNumber(C*U)}}let I={buffer:x,byteOffset:u,byteLength:v,byteStride:m,target:tt.BufferViewTarget.ARRAY_BUFFER};return r.bufferViews.push(I),{byteLength:v,buffers:[new Uint8Array(T)]}}function y(d,x,u){let h=[],m=0,v=new Map,T=-1/0,k=!1;for(let B of d){let F=i.createAccessorDef(B);r.accessors.push(F),i.accessorIndexMap.set(B,r.accessors.length-1);let q=[],te=[],ne=[],je=new Array(B.getElementSize()).fill(0);for(let me=0,Ve=B.getCount();me<Ve;me++)if(B.getElement(me,ne),!re.eq(ne,je,0)){T=Math.max(me,T),q.push(me);for(let Ue=0;Ue<ne.length;Ue++)te.push(ne[Ue])}let de=q.length,Fe={accessorDef:F,count:de};if(v.set(B,Fe),de===0)continue;de>B.getCount()/2&&(k=!0);let De=Ta[B.getComponentType()];Fe.indices=q,Fe.values=new De(te)}if(!Number.isFinite(T))return{buffers:h,byteLength:m};k&&o.warn("Some sparse accessors have >50% non-zero elements, which may increase file size.");let I=T<255?Uint8Array:T<65535?Uint16Array:Uint32Array,M=T<255?Ko:T<65535?Lo:Uo,_={buffer:x,byteOffset:u+m,byteLength:0};for(let B of d){let F=v.get(B);if(F.count===0)continue;F.indicesByteOffset=_.byteLength;let q=G.pad(G.toView(new I(F.indices)));h.push(q),m+=q.byteLength,_.byteLength+=q.byteLength}r.bufferViews.push(_);let A=r.bufferViews.length-1,C={buffer:x,byteOffset:u+m,byteLength:0};for(let B of d){let F=v.get(B);if(F.count===0)continue;F.valuesByteOffset=C.byteLength;let q=G.pad(G.toView(F.values));h.push(q),m+=q.byteLength,C.byteLength+=q.byteLength}r.bufferViews.push(C);let U=r.bufferViews.length-1;for(let B of d){let F=v.get(B);F.count!==0&&(F.accessorDef.sparse={count:F.count,indices:{bufferView:A,byteOffset:F.indicesByteOffset,componentType:M},values:{bufferView:U,byteOffset:F.valuesByteOffset}})}return{buffers:h,byteLength:m}}if(r.accessors=[],r.bufferViews=[],r.samplers=[],r.textures=[],r.images=s.listTextures().map((d,x)=>{let u=i.createPropertyDef(d);d.getMimeType()&&(u.mimeType=d.getMimeType());let h=d.getImage();return h&&i.createImageData(u,h,d),i.imageIndexMap.set(d,x),u}),l.filter(d=>d.prewriteTypes.includes("Accessor")).forEach(d=>d.prewrite(i,"Accessor")),s.listAccessors().forEach(d=>{let x=i.accessorUsageGroupedByParent,u=i.accessorParents;if(i.accessorIndexMap.has(d))return;let h=i.getAccessorUsage(d);if(i.addAccessorToUsageGroup(d,h),x.has(h)){let m=a.listParents(d).find(v=>v.propertyType!=="Root");u.set(d,m)}}),l.filter(d=>d.prewriteTypes.includes("Buffer")).forEach(d=>d.prewrite(i,"Buffer")),(s.listAccessors().length>0||i.otherBufferViews.size>0||s.listTextures().length>0&&t.format==="GLB")&&s.listBuffers().length===0)throw new Error("Buffer required for Document resources, but none was found.");r.buffers=[],s.listBuffers().forEach((d,x)=>{let u=i.createPropertyDef(d),h=i.accessorUsageGroupedByParent,m=d.listParents().filter(A=>A instanceof D),v=new Set(m.map(A=>i.accessorParents.get(A))),T=new Map(Array.from(v).map((A,C)=>[A,C])),k={};for(let A of m){if(i.accessorIndexMap.has(A))continue;let C=i.getAccessorUsage(A),U=C;if(h.has(C)){let B=i.accessorParents.get(A);U+=`:${T.get(B)}`}k[U]||={usage:C,accessors:[]},k[U].accessors.push(A)}let I=[],M=r.buffers.length,_=0;for(let{usage:A,accessors:C}of Object.values(k))if(A===xa.ARRAY_BUFFER&&t.vertexLayout==="interleaved"){let U=w(C,M,_);_+=U.byteLength;for(let B of U.buffers)I.push(B)}else if(A===xa.ARRAY_BUFFER)for(let U of C){let B=w([U],M,_);_+=B.byteLength;for(let F of B.buffers)I.push(F)}else if(A===xa.SPARSE){let U=y(C,M,_);_+=U.byteLength;for(let B of U.buffers)I.push(B)}else if(A===xa.ELEMENT_ARRAY_BUFFER){let U=tt.BufferViewTarget.ELEMENT_ARRAY_BUFFER,B=g(C,M,_,U);_+=B.byteLength;for(let F of B.buffers)I.push(F)}else{let U=g(C,M,_);_+=U.byteLength;for(let B of U.buffers)I.push(B)}if(i.imageBufferViews.length&&x===0){for(let A=0;A<i.imageBufferViews.length;A++)if(r.bufferViews[r.images[A].bufferView].byteOffset=_,_+=i.imageBufferViews[A].byteLength,I.push(i.imageBufferViews[A]),_%8){let C=8-_%8;_+=C,I.push(new Uint8Array(C))}}if(i.otherBufferViews.has(d))for(let A of i.otherBufferViews.get(d))r.bufferViews.push({buffer:M,byteOffset:_,byteLength:A.byteLength}),i.otherBufferViewsIndexMap.set(A,r.bufferViews.length-1),_+=A.byteLength,I.push(A);if(_){let A;t.format==="GLB"?A=at:(A=i.bufferURIGenerator.createURI(d,"bin"),u.uri=A),u.byteLength=_,i.assignResourceURI(A,G.concat(I),!0)}r.buffers.push(u),i.bufferIndexMap.set(d,x)}),s.listAccessors().find(d=>!d.getBuffer())&&o.warn("Skipped writing one or more Accessors: no Buffer assigned."),l.filter(d=>d.prewriteTypes.includes("Material")).forEach(d=>d.prewrite(i,"Material")),r.materials=s.listMaterials().map((d,x)=>{let u=i.createPropertyDef(d);if(d.getAlphaMode()!==wa.AlphaMode.OPAQUE&&(u.alphaMode=d.getAlphaMode()),d.getAlphaMode()===wa.AlphaMode.MASK&&(u.alphaCutoff=d.getAlphaCutoff()),d.getDoubleSided()&&(u.doubleSided=!0),u.pbrMetallicRoughness={},re.eq(d.getBaseColorFactor(),[1,1,1,1])||(u.pbrMetallicRoughness.baseColorFactor=d.getBaseColorFactor()),re.eq(d.getEmissiveFactor(),[0,0,0])||(u.emissiveFactor=d.getEmissiveFactor()),d.getRoughnessFactor()!==1&&(u.pbrMetallicRoughness.roughnessFactor=d.getRoughnessFactor()),d.getMetallicFactor()!==1&&(u.pbrMetallicRoughness.metallicFactor=d.getMetallicFactor()),d.getBaseColorTexture()){let h=d.getBaseColorTexture(),m=d.getBaseColorTextureInfo();u.pbrMetallicRoughness.baseColorTexture=i.createTextureInfoDef(h,m)}if(d.getEmissiveTexture()){let h=d.getEmissiveTexture(),m=d.getEmissiveTextureInfo();u.emissiveTexture=i.createTextureInfoDef(h,m)}if(d.getNormalTexture()){let h=d.getNormalTexture(),m=d.getNormalTextureInfo(),v=i.createTextureInfoDef(h,m);d.getNormalScale()!==1&&(v.scale=d.getNormalScale()),u.normalTexture=v}if(d.getOcclusionTexture()){let h=d.getOcclusionTexture(),m=d.getOcclusionTextureInfo(),v=i.createTextureInfoDef(h,m);d.getOcclusionStrength()!==1&&(v.strength=d.getOcclusionStrength()),u.occlusionTexture=v}if(d.getMetallicRoughnessTexture()){let h=d.getMetallicRoughnessTexture(),m=d.getMetallicRoughnessTextureInfo();u.pbrMetallicRoughness.metallicRoughnessTexture=i.createTextureInfoDef(h,m)}return i.materialIndexMap.set(d,x),u}),l.filter(d=>d.prewriteTypes.includes("Mesh")).forEach(d=>d.prewrite(i,"Mesh")),r.meshes=s.listMeshes().map((d,x)=>{let u=i.createPropertyDef(d),h=null;return u.primitives=d.listPrimitives().map(m=>{let v={attributes:{}};v.mode=m.getMode();let T=m.getMaterial();T&&(v.material=i.materialIndexMap.get(T)),Object.keys(m.getExtras()).length&&(v.extras=m.getExtras());let k=m.getIndices();k&&(v.indices=i.accessorIndexMap.get(k));for(let I of m.listSemantics())v.attributes[I]=i.accessorIndexMap.get(m.getAttribute(I));for(let I of m.listTargets()){let M={};for(let _ of I.listSemantics())M[_]=i.accessorIndexMap.get(I.getAttribute(_));v.targets=v.targets||[],v.targets.push(M)}return m.listTargets().length&&!h&&(h=m.listTargets().map(I=>I.getName())),v}),d.getWeights().length&&(u.weights=d.getWeights()),h&&(u.extras=u.extras||{},u.extras.targetNames=h),i.meshIndexMap.set(d,x),u}),r.cameras=s.listCameras().map((d,x)=>{let u=i.createPropertyDef(d);if(u.type=d.getType(),u.type===Ra.Type.PERSPECTIVE){u.perspective={znear:d.getZNear(),zfar:d.getZFar(),yfov:d.getYFov()};let h=d.getAspectRatio();h!==null&&(u.perspective.aspectRatio=h)}else u.orthographic={znear:d.getZNear(),zfar:d.getZFar(),xmag:d.getXMag(),ymag:d.getYMag()};return i.cameraIndexMap.set(d,x),u}),r.nodes=s.listNodes().map((d,x)=>{let u=i.createPropertyDef(d);return re.eq(d.getTranslation(),[0,0,0])||(u.translation=d.getTranslation()),re.eq(d.getRotation(),[0,0,0,1])||(u.rotation=d.getRotation()),re.eq(d.getScale(),[1,1,1])||(u.scale=d.getScale()),d.getWeights().length&&(u.weights=d.getWeights()),i.nodeIndexMap.set(d,x),u}),r.skins=s.listSkins().map((d,x)=>{let u=i.createPropertyDef(d),h=d.getInverseBindMatrices();h&&(u.inverseBindMatrices=i.accessorIndexMap.get(h));let m=d.getSkeleton();return m&&(u.skeleton=i.nodeIndexMap.get(m)),u.joints=d.listJoints().map(v=>i.nodeIndexMap.get(v)),i.skinIndexMap.set(d,x),u}),s.listNodes().forEach((d,x)=>{let u=r.nodes[x],h=d.getMesh();h&&(u.mesh=i.meshIndexMap.get(h));let m=d.getCamera();m&&(u.camera=i.cameraIndexMap.get(m));let v=d.getSkin();v&&(u.skin=i.skinIndexMap.get(v)),d.listChildren().length>0&&(u.children=d.listChildren().map(T=>i.nodeIndexMap.get(T)))}),r.animations=s.listAnimations().map((d,x)=>{let u=i.createPropertyDef(d),h=new Map;return u.samplers=d.listSamplers().map((m,v)=>{let T=i.createPropertyDef(m);return T.input=i.accessorIndexMap.get(m.getInput()),T.output=i.accessorIndexMap.get(m.getOutput()),T.interpolation=m.getInterpolation(),h.set(m,v),T}),u.channels=d.listChannels().map(m=>{let v=i.createPropertyDef(m);return v.sampler=h.get(m.getSampler()),v.target={node:i.nodeIndexMap.get(m.getTargetNode()),path:m.getTargetPath()},v}),i.animationIndexMap.set(d,x),u}),r.scenes=s.listScenes().map((d,x)=>{let u=i.createPropertyDef(d);return u.nodes=d.listChildren().map(h=>i.nodeIndexMap.get(h)),i.sceneIndexMap.set(d,x),u});let f=s.getDefaultScene();return f&&(r.scene=s.listScenes().indexOf(f)),r.extensionsUsed=l.map(d=>d.extensionName),r.extensionsRequired=p.map(d=>d.extensionName),l.forEach(d=>d.write(i)),Vo(r),n}};function Vo(e){let t=[];for(let a in e){let s=e[a];(Array.isArray(s)&&s.length===0||s===null||s===""||s&&typeof s=="object"&&Object.keys(s).length===0)&&t.push(a)}for(let a of t)delete e[a]}var Ho=class{_logger=Ea.DEFAULT_INSTANCE;_extensions=new Set;_dependencies={};_vertexLayout="interleaved";_strictResources=!0;lastReadBytes=0;lastWriteBytes=0;setLogger(e){return this._logger=e,this}registerExtensions(e){for(let t of e)this._extensions.add(t),t.register();return this}registerDependencies(e){return Object.assign(this._dependencies,e),this}setVertexLayout(e){return this._vertexLayout=e,this}setStrictResources(e){return this._strictResources=e,this}async read(e){return await this.readJSON(await this.readAsJSON(e))}async readAsJSON(e){let t=await this.readURI(e,"view");this.lastReadBytes=t.byteLength;let a=kr(t)?this._binaryToJSON(t):{json:JSON.parse(G.decodeText(t)),resources:{}};return await this._readResourcesExternal(a,this.dirname(e)),this._readResourcesInternal(a),a}async readJSON(e){return e=this._copyJSON(e),this._readResourcesInternal(e),Bo.read(e,{extensions:Array.from(this._extensions),dependencies:this._dependencies,logger:this._logger})}async binaryToJSON(e){let t=this._binaryToJSON(G.assertView(e));this._readResourcesInternal(t);let a=t.json;if(a.buffers&&a.buffers.some(s=>qo(t,s)))throw new Error("Cannot resolve external buffers with binaryToJSON().");if(a.images&&a.images.some(s=>Xo(t,s)))throw new Error("Cannot resolve external images with binaryToJSON().");return t}async readBinary(e){return this.readJSON(await this.binaryToJSON(G.assertView(e)))}async writeJSON(e,t={}){if(t.format==="GLB"&&e.getRoot().listBuffers().length>1)throw new Error("GLB must have 0\u20131 buffers.");return zo.write(e,{format:t.format||"GLTF",basename:t.basename||"",logger:this._logger,vertexLayout:this._vertexLayout,dependencies:{...this._dependencies},extensions:Array.from(this._extensions)})}async writeBinary(e){let{json:t,resources:a}=await this.writeJSON(e,{format:"GLB"}),s=new Uint32Array([1179937895,2,12]),r=JSON.stringify(t),n=G.pad(G.encodeText(r),32),i=G.toView(new Uint32Array([n.byteLength,1313821514])),o=G.concat([i,n]);s[s.length-1]+=o.byteLength;let c=Object.values(a)[0];if(!c||!c.byteLength)return G.concat([G.toView(s),o]);let l=G.pad(c,0),p=G.toView(new Uint32Array([l.byteLength,5130562])),g=G.concat([p,l]);return s[s.length-1]+=g.byteLength,G.concat([G.toView(s),o,g])}async _readResourcesExternal(e,t){let a=e.json.images||[],s=e.json.buffers||[],r=[...a,...s].map(async n=>{let i=n.uri;if(!i||i.match(/data:/))return Promise.resolve();try{e.resources[i]=await this.readURI(this.resolve(t,i),"view"),this.lastReadBytes+=e.resources[i].byteLength}catch(o){if(!this._strictResources&&a.includes(n))this._logger.warn(`Failed to load image URI, "${i}". ${o}`),e.resources[i]=null;else throw o}});await Promise.all(r)}_readResourcesInternal(e){function t(a){if(a.uri){if(a.uri in e.resources){G.assertView(e.resources[a.uri]);return}if(a.uri.match(/data:/)){let s=`__${Mo()}.${_t.extension(a.uri)}`;e.resources[s]=G.createBufferFromDataURI(a.uri),a.uri=s}}}(e.json.images||[]).forEach(a=>{if(a.bufferView===void 0&&a.uri===void 0)throw new Error("Missing resource URI or buffer view.");t(a)}),(e.json.buffers||[]).forEach(t)}_copyJSON(e){let{images:t,buffers:a}=e.json;return e={json:{...e.json},resources:{...e.resources}},t&&(e.json.images=t.map(s=>({...s}))),a&&(e.json.buffers=a.map(s=>({...s}))),e}_binaryToJSON(e){if(!kr(e))throw new Error("Invalid glTF 2.0 binary.");let t=new Uint32Array(e.buffer,e.byteOffset+12,2);if(t[1]!==1313821514)throw new Error("Missing required GLB JSON chunk.");let a=20,s=t[0],r=G.decodeText(G.toView(e,a,s)),n=JSON.parse(r),i=a+s;if(e.byteLength<=i)return{json:n,resources:{}};let o=new Uint32Array(e.buffer,e.byteOffset+i,2);if(o[1]!==5130562)return{json:n,resources:{}};let c=o[0],l=G.toView(e,i+8,c);return{json:n,resources:{[at]:l}}}};function qo(e,t){return t.uri!==void 0&&!(t.uri in e.resources)}function Xo(e,t){return t.uri!==void 0&&!(t.uri in e.resources)&&t.bufferView===void 0}function kr(e){if(e.byteLength<3*Uint32Array.BYTES_PER_ELEMENT)return!1;let t=new Uint32Array(e.buffer,e.byteOffset,3);return t[0]===1179937895&&t[1]===2}var Vr=class extends Ho{_fetchConfig;constructor(e=ms.DEFAULT_INIT){super(),this._fetchConfig=e}async readURI(e,t){let a=await fetch(e,this._fetchConfig);switch(t){case"view":return new Uint8Array(await a.arrayBuffer());case"text":return a.text()}}resolve(e,t){return ms.resolve(e,t)}dirname(e){return ms.dirname(e)}};function Wo(){return{vkFormat:0,typeSize:1,pixelWidth:0,pixelHeight:0,pixelDepth:0,layerCount:0,faceCount:1,levelCount:0,supercompressionScheme:0,levels:[],dataFormatDescriptor:[{vendorId:0,descriptorType:0,versionNumber:2,colorModel:0,colorPrimaries:1,transferFunction:2,flags:0,texelBlockDimension:[0,0,0,0],bytesPlane:[0,0,0,0,0,0,0,0],samples:[]}],keyValue:{},globalData:null}}var kt=class{constructor(t,a,s,r){this._dataView=void 0,this._littleEndian=void 0,this._offset=void 0,this._dataView=new DataView(t.buffer,t.byteOffset+a,s),this._littleEndian=r,this._offset=0}_nextUint8(){let t=this._dataView.getUint8(this._offset);return this._offset+=1,t}_nextUint16(){let t=this._dataView.getUint16(this._offset,this._littleEndian);return this._offset+=2,t}_nextUint32(){let t=this._dataView.getUint32(this._offset,this._littleEndian);return this._offset+=4,t}_nextUint64(){let t=this._dataView.getUint32(this._offset,this._littleEndian),a=this._dataView.getUint32(this._offset+4,this._littleEndian),s=t+2**32*a;return this._offset+=8,s}_nextInt32(){let t=this._dataView.getInt32(this._offset,this._littleEndian);return this._offset+=4,t}_nextUint8Array(t){let a=new Uint8Array(this._dataView.buffer,this._dataView.byteOffset+this._offset,t);return this._offset+=t,a}_skip(t){return this._offset+=t,this}_scan(t,a=0){let s=this._offset,r=0;for(;this._dataView.getUint8(this._offset)!==a&&r<t;)r++,this._offset++;return r<t&&this._offset++,new Uint8Array(this._dataView.buffer,this._dataView.byteOffset+s,r)}};var ub=new Uint8Array([0]),we=[171,75,84,88,32,50,48,187,13,10,26,10];function Hr(e){return new TextDecoder().decode(e)}function Ia(e){let t=new Uint8Array(e.buffer,e.byteOffset,we.length);if(t[0]!==we[0]||t[1]!==we[1]||t[2]!==we[2]||t[3]!==we[3]||t[4]!==we[4]||t[5]!==we[5]||t[6]!==we[6]||t[7]!==we[7]||t[8]!==we[8]||t[9]!==we[9]||t[10]!==we[10]||t[11]!==we[11])throw new Error("Missing KTX 2.0 identifier.");let a=Wo(),s=17*Uint32Array.BYTES_PER_ELEMENT,r=new kt(e,we.length,s,!0);a.vkFormat=r._nextUint32(),a.typeSize=r._nextUint32(),a.pixelWidth=r._nextUint32(),a.pixelHeight=r._nextUint32(),a.pixelDepth=r._nextUint32(),a.layerCount=r._nextUint32(),a.faceCount=r._nextUint32(),a.levelCount=r._nextUint32(),a.supercompressionScheme=r._nextUint32();let n=r._nextUint32(),i=r._nextUint32(),o=r._nextUint32(),c=r._nextUint32(),l=r._nextUint64(),p=r._nextUint64(),g=Math.max(a.levelCount,1)*3*8,w=new kt(e,we.length+s,g,!0);for(let j=0,O=Math.max(a.levelCount,1);j<O;j++)a.levels.push({levelData:new Uint8Array(e.buffer,e.byteOffset+w._nextUint64(),w._nextUint64()),uncompressedByteLength:w._nextUint64()});let y=new kt(e,n,i,!0);y._skip(4);let f=y._nextUint16(),d=y._nextUint16(),x=y._nextUint16(),u=y._nextUint16(),h=y._nextUint8(),m=y._nextUint8(),v=y._nextUint8(),T=y._nextUint8(),k=[y._nextUint8(),y._nextUint8(),y._nextUint8(),y._nextUint8()],I=[y._nextUint8(),y._nextUint8(),y._nextUint8(),y._nextUint8(),y._nextUint8(),y._nextUint8(),y._nextUint8(),y._nextUint8()],_={vendorId:f,descriptorType:d,versionNumber:x,colorModel:h,colorPrimaries:m,transferFunction:v,flags:T,texelBlockDimension:k,bytesPlane:I,samples:[]},U=(u/4-6)/4;for(let j=0;j<U;j++){let O={bitOffset:y._nextUint16(),bitLength:y._nextUint8(),channelType:y._nextUint8(),samplePosition:[y._nextUint8(),y._nextUint8(),y._nextUint8(),y._nextUint8()],sampleLower:Number.NEGATIVE_INFINITY,sampleUpper:Number.POSITIVE_INFINITY};O.channelType&64?(O.sampleLower=y._nextInt32(),O.sampleUpper=y._nextInt32()):(O.sampleLower=y._nextUint32(),O.sampleUpper=y._nextUint32()),_.samples[j]=O}a.dataFormatDescriptor.length=0,a.dataFormatDescriptor.push(_);let B=new kt(e,o,c,!0);for(;B._offset<c;){let j=B._nextUint32(),O=B._scan(j),W=Hr(O);if(a.keyValue[W]=B._nextUint8Array(j-O.byteLength-1),W.match(/^ktx/i)){let ye=Hr(a.keyValue[W]);a.keyValue[W]=ye.substring(0,ye.lastIndexOf("\0"))}let oe=j%4?4-j%4:0;B._skip(oe)}if(p<=0)return a;let F=new kt(e,l,p,!0),q=F._nextUint16(),te=F._nextUint16(),ne=F._nextUint32(),je=F._nextUint32(),de=F._nextUint32(),Fe=F._nextUint32(),De=[];for(let j=0,O=Math.max(a.levelCount,1);j<O;j++)De.push({imageFlags:F._nextUint32(),rgbSliceByteOffset:F._nextUint32(),rgbSliceByteLength:F._nextUint32(),alphaSliceByteOffset:F._nextUint32(),alphaSliceByteLength:F._nextUint32()});let me=l+F._offset,Ve=me+ne,Ue=Ve+je,Qe=Ue+de,At=new Uint8Array(e.buffer,e.byteOffset+me,ne),ds=new Uint8Array(e.buffer,e.byteOffset+Ve,je),ia=new Uint8Array(e.buffer,e.byteOffset+Ue,de),E=new Uint8Array(e.buffer,e.byteOffset+Qe,Fe);return a.globalData={endpointCount:q,selectorCount:te,imageDescs:De,endpointsData:At,selectorsData:ds,tablesData:ia,extendedData:E},a}var rt="EXT_mesh_gpu_instancing",Je="EXT_mesh_features",Ie="EXT_meshopt_compression",K="EXT_structural_metadata",Ma="EXT_texture_webp",Aa="EXT_texture_avif",ec="KHR_accessor_float16",tc="KHR_accessor_float64",ce="KHR_draco_mesh_compression",We="KHR_lights_punctual",nt="KHR_materials_anisotropy",it="KHR_materials_clearcoat",ot="KHR_materials_diffuse_transmission",ct="KHR_materials_dispersion",dt="KHR_materials_emissive_strength",lt="KHR_materials_ior",ut="KHR_materials_iridescence",ft="KHR_materials_pbrSpecularGlossiness",ht="KHR_materials_sheen",bt="KHR_materials_specular",gt="KHR_materials_transmission",Nt="KHR_materials_unlit",pt="KHR_materials_volume",_e="KHR_materials_variants",qr="KHR_mesh_primitive_restart",Xr="KHR_mesh_quantization",mt="KHR_node_visibility",Sa="KHR_texture_basisu",xt="KHR_texture_transform",Ke="KHR_xmp_json_ld",ac=class extends H{static EXTENSION_NAME=Je;init(){this.extensionName=Je,this.propertyType="FeatureID",this.parentTypes=["Features"]}getDefaults(){return Object.assign(super.getDefaults(),{nullFeatureId:null,label:"",attribute:null,texture:null,propertyTable:null})}getFeatureCount(){return this.get("featureCount")}setFeatureCount(e){return this.set("featureCount",e)}getNullFeatureID(){return this.get("nullFeatureId")}setNullFeatureID(e){return this.set("nullFeatureId",e)}getLabel(){return this.get("label")}setLabel(e){return this.set("label",e)}getAttribute(){return this.get("attribute")}setAttribute(e){return this.set("attribute",e)}getTexture(){return this.getRef("texture")}setTexture(e){return this.setRef("texture",e)}getPropertyTable(){return this.getRef("propertyTable")}setPropertyTable(e){return this.setRef("propertyTable",e)}},sc=class extends H{static EXTENSION_NAME=Je;init(){this.extensionName=Je,this.propertyType="FeatureIDTexture",this.parentTypes=["FeatureID"]}getDefaults(){let e=new se(this.graph,"textureInfo");return e.setMinFilter(se.MagFilter.NEAREST),e.setMagFilter(se.MagFilter.NEAREST),Object.assign(super.getDefaults(),{channels:[0],texture:null,textureInfo:e})}getChannels(){return this.get("channels")}setChannels(e){return this.set("channels",e)}getTexture(){return this.getRef("texture")}setTexture(e){return this.setRef("texture",e)}getTextureInfo(){return this.getRef("texture")?this.getRef("textureInfo"):null}},rc=class extends H{static EXTENSION_NAME=Je;init(){this.extensionName=Je,this.propertyType="Features",this.parentTypes=[N.PRIMITIVE]}getDefaults(){return Object.assign(super.getDefaults(),{featureIds:new ae([])})}listFeatureIDs(){return this.listRefs("featureIds")}addFeatureID(e){return this.addRef("featureIds",e)}removeFeatureID(e){return this.removeRef("featureIds",e)}},Vt=Je,_s=class extends Z{extensionName=Je;static EXTENSION_NAME=Je;createFeatures(){return new rc(this.document.getGraph())}createFeatureID(){return new ac(this.document.getGraph())}createFeatureIDTexture(){return new sc(this.document.getGraph())}read(e){return(e.jsonDoc.json.meshes||[]).forEach((t,a)=>{(t.primitives||[]).forEach((s,r)=>{this._readPrimitive(e,a,s,r)})}),this}_readPrimitive(e,t,a,s){if(!a.extensions||!a.extensions[Vt])return;let r=this.createFeatures(),n=a.extensions[Vt];for(let i of n.featureIds){let o=nc(this.document,this,e,i);r.addFeatureID(o)}e.meshes[t].listPrimitives()[s].setExtension(Vt,r)}write(e){let t=e.jsonDoc.json.meshes;if(!t)return this;for(let a of this.document.getRoot().listMeshes()){let s=t[e.meshIndexMap.get(a)];a.listPrimitives().forEach((r,n)=>{let i=s.primitives[n];this._writePrimitive(e,r,i)})}return this}_writePrimitive(e,t,a){let s=t.getExtension(Vt);if(!s)return;let r={featureIds:[]};s.listFeatureIDs().forEach(n=>{r.featureIds.push(oc(this.document,e,n))}),a.extensions=a.extensions||{},a.extensions[Vt]=r}};function nc(e,t,a,s){let r=t.createFeatureID().setFeatureCount(s.featureCount);s.nullFeatureId!==void 0&&r.setNullFeatureID(s.nullFeatureId),s.label!==void 0&&r.setLabel(s.label),s.attribute!==void 0&&r.setAttribute(s.attribute);let n=s.texture;if(n!==void 0){let i=ic(t,a,n);r.setTexture(i)}if(s.propertyTable!==void 0){let i=e.getRoot().getExtension(K).listPropertyTables();r.setPropertyTable(i[s.propertyTable])}return r}function ic(e,t,a){let s=e.createFeatureIDTexture(),{json:r}=t.jsonDoc;if(a.channels&&s.setChannels(a.channels),a.index!==void 0){let n=r.textures[a.index].source;s.setTexture(t.textures[n]),t.setTextureInfo(s.getTextureInfo(),a)}return s}function oc(e,t,a){let s=e.getRoot(),r={featureCount:a.getFeatureCount()};if(a.getNullFeatureID()!=null&&(r.nullFeatureId=a.getNullFeatureID()),a.getLabel()&&(r.label=a.getLabel()),a.getAttribute()!=null&&(r.attribute=a.getAttribute()),a.getTexture()){let n=a.getTexture(),i=n.getTexture(),o=n.getTextureInfo();r.texture=t.createTextureInfoDef(i,o);let c=n.getChannels();re.eq(c,[0])||(r.texture.channels=c)}if(a.getPropertyTable()){let n=s.getExtension(K),i=a.getPropertyTable();r.propertyTable=n.listPropertyTables().indexOf(i)}return r}var Ms="INSTANCE_ATTRIBUTE",cc=class extends H{static EXTENSION_NAME=rt;init(){this.extensionName=rt,this.propertyType="InstancedMesh",this.parentTypes=[N.NODE]}getDefaults(){return Object.assign(super.getDefaults(),{attributes:new le})}getAttribute(e){return this.getRefMap("attributes",e)}setAttribute(e,t){return this.setRefMap("attributes",e,t,{usage:Ms})}listAttributes(){return this.listRefMapValues("attributes")}listSemantics(){return this.listRefMapKeys("attributes")}},dc=class extends Z{static EXTENSION_NAME=rt;extensionName=rt;prewriteTypes=[N.ACCESSOR];createInstancedMesh(){return new cc(this.document.getGraph())}read(e){return(e.jsonDoc.json.nodes||[]).forEach((t,a)=>{if(!t.extensions||!t.extensions.EXT_mesh_gpu_instancing)return;let s=t.extensions[rt],r=this.createInstancedMesh();for(let n in s.attributes)r.setAttribute(n,e.accessors[s.attributes[n]]);e.nodes[a].setExtension(rt,r)}),this}prewrite(e){e.accessorUsageGroupedByParent.add(Ms);for(let t of this.properties)for(let a of t.listAttributes())e.addAccessorToUsageGroup(a,Ms);return this}write(e){let t=e.jsonDoc;return this.document.getRoot().listNodes().forEach(a=>{let s=a.getExtension(rt);if(s){let r=e.nodeIndexMap.get(a),n=t.json.nodes[r],i={attributes:{}};s.listSemantics().forEach(o=>{let c=s.getAttribute(o);i.attributes[o]=e.accessorIndexMap.get(c)}),n.extensions=n.extensions||{},n.extensions[rt]=i}}),this}},lc=(function(e){return e.QUANTIZE="quantize",e.FILTER="filter",e})({});function uc(e){return!e.extensions||!e.extensions.EXT_meshopt_compression?!1:!!e.extensions[Ie].fallback}var{BYTE:fc,SHORT:Wr,FLOAT:hc}=D.ComponentType,{encodeNormalizedInt:Jr,decodeNormalizedInt:As}=re;function bc(e,t,a,s){let{filter:r,bits:n}=s,i={array:e.getArray(),byteStride:e.getElementSize()*e.getComponentSize(),componentType:e.getComponentType(),normalized:e.getNormalized()};if(a!=="ATTRIBUTES")return i;if(r!=="NONE"){let o=e.getNormalized()?gc(e):new Float32Array(i.array);switch(r){case"EXPONENTIAL":i.byteStride=e.getElementSize()*4,i.componentType=hc,i.normalized=!1,i.array=t.encodeFilterExp(o,e.getCount(),i.byteStride,n);break;case"OCTAHEDRAL":i.byteStride=n>8?8:4,i.componentType=n>8?Wr:fc,i.normalized=!0,o=e.getElementSize()===3?mc(o):o,i.array=t.encodeFilterOct(o,e.getCount(),i.byteStride,n);break;case"QUATERNION":i.byteStride=8,i.componentType=Wr,i.normalized=!0,i.array=t.encodeFilterQuat(o,e.getCount(),i.byteStride,n);break;default:throw new Error("Invalid filter.")}i.min=e.getMin([]),i.max=e.getMax([]),e.getNormalized()&&(i.min=i.min.map(c=>As(c,e.getComponentType())),i.max=i.max.map(c=>As(c,e.getComponentType()))),i.normalized&&(i.min=i.min.map(c=>Jr(c,i.componentType)),i.max=i.max.map(c=>Jr(c,i.componentType)))}else i.byteStride%4&&(i.array=pc(i.array,e.getElementSize()),i.byteStride=i.array.byteLength/e.getCount());return i}function gc(e){let t=e.getComponentType(),a=e.getArray(),s=new Float32Array(a.length);for(let r=0;r<a.length;r++)s[r]=As(a[r],t);return s}function pc(e,t){let a=G.padNumber(e.BYTES_PER_ELEMENT*t)/e.BYTES_PER_ELEMENT,s=e.length/t,r=new e.constructor(s*a);for(let n=0;n*t<e.length;n++)for(let i=0;i<t;i++)r[n*a+i]=e[n*t+i];return r}function mc(e){let t=new Float32Array(e.length*4/3);for(let a=0,s=e.length/3;a<s;a++)t[a*4]=e[a*3],t[a*4+1]=e[a*3+1],t[a*4+2]=e[a*3+2];return t}function xc(e,t){return t===tt.BufferViewUsage.ELEMENT_ARRAY_BUFFER?e.listParents().some(a=>a instanceof zt&&a.getMode()===zt.Mode.TRIANGLES)?"TRIANGLES":"INDICES":"ATTRIBUTES"}function yc(e,t){let a=t.getGraph().listParentEdges(e).filter(s=>!(s.getParent()instanceof ks));for(let s of a){let r=s.getName(),n=s.getAttributes().key||"",i=s.getParent().propertyType===N.PRIMITIVE_TARGET;if(r==="indices")return{filter:"NONE"};if(r==="attributes"){if(n==="POSITION")return{filter:"NONE"};if(n==="TEXCOORD_0")return{filter:"NONE"};if(n.startsWith("JOINTS_"))return{filter:"NONE"};if(n.startsWith("WEIGHTS_"))return{filter:"NONE"};if(n==="NORMAL"||n==="TANGENT")return i?{filter:"NONE"}:{filter:"OCTAHEDRAL",bits:8}}if(r==="output"){let o=hn(e);return o==="rotation"?{filter:"QUATERNION",bits:16}:o==="translation"?{filter:"EXPONENTIAL",bits:12}:o==="scale"?{filter:"EXPONENTIAL",bits:12}:{filter:"NONE"}}if(r==="input")return{filter:"NONE"};if(r==="inverseBindMatrices")return{filter:"NONE"}}return{filter:"NONE"}}function hn(e){for(let t of e.listParents())if(t instanceof ka){for(let a of t.listParents())if(a instanceof Es)return a.getTargetPath()}return null}var Yr={method:"quantize"},Ns=class extends Z{extensionName=Ie;prereadTypes=[N.BUFFER,N.PRIMITIVE];prewriteTypes=[N.BUFFER,N.ACCESSOR];readDependencies=["meshopt.decoder"];writeDependencies=["meshopt.encoder"];static EXTENSION_NAME=Ie;static EncoderMethod=lc;_decoder=null;_decoderFallbackBufferMap=new Map;_encoder=null;_encoderOptions=Yr;_encoderFallbackBuffer=null;_encoderBufferViews={};_encoderBufferViewData={};_encoderBufferViewAccessors={};install(e,t){return e==="meshopt.decoder"&&(this._decoder=t),e==="meshopt.encoder"&&(this._encoder=t),this}setEncoderOptions(e){return this._encoderOptions={...Yr,...e},this}preread(e,t){if(!this._decoder){if(!this.isRequired())return this;throw new Error(`[${Ie}] Please install extension dependency, "meshopt.decoder".`)}if(!this._decoder.supported){if(!this.isRequired())return this;throw new Error(`[${Ie}]: Missing WASM support.`)}return t===N.BUFFER?this._prereadBuffers(e):t===N.PRIMITIVE&&this._prereadPrimitives(e),this}_prereadBuffers(e){let t=e.jsonDoc;(t.json.bufferViews||[]).forEach((a,s)=>{if(!a.extensions||!a.extensions.EXT_meshopt_compression)return;let r=a.extensions[Ie],n=r.byteOffset||0,i=r.byteLength||0,o=r.count,c=r.byteStride,l=new Uint8Array(o*c),p=t.json.buffers[r.buffer],g=p.uri?t.resources[p.uri]:t.resources[at],w=G.toView(g,n,i);this._decoder.decodeGltfBuffer(l,o,c,w,r.mode,r.filter),e.bufferViews[s]=l})}_prereadPrimitives(e){let t=e.jsonDoc;(t.json.bufferViews||[]).forEach(a=>{if(!a.extensions||!a.extensions.EXT_meshopt_compression)return;let s=a.extensions[Ie],r=e.buffers[s.buffer],n=e.buffers[a.buffer],i=t.json.buffers[a.buffer];uc(i)&&this._decoderFallbackBufferMap.set(n,r)})}read(e){if(!this.isRequired())return this;for(let[t,a]of this._decoderFallbackBufferMap){for(let s of t.listParents())s instanceof D&&s.swap(t,a);t.dispose()}return this}prewrite(e,t){return t===N.ACCESSOR?this._prewriteAccessors(e):t===N.BUFFER&&this._prewriteBuffers(e),this}_prewriteAccessors(e){let t=e.jsonDoc.json,a=this._encoder,s=this._encoderOptions,r=this.document.getGraph(),n=this.document.createBuffer(),i=this.document.getRoot().listBuffers().indexOf(n),o=1,c=new Map,l=p=>{for(let g of r.listParents(p)){if(g.propertyType===N.ROOT)continue;let w=c.get(p);return w===void 0&&c.set(p,w=o++),w}return-1};this._encoderFallbackBuffer=n,this._encoderBufferViews={},this._encoderBufferViewData={},this._encoderBufferViewAccessors={};for(let p of this.document.getRoot().listAccessors()){if(hn(p)==="weights"||p.getSparse())continue;let g=e.getAccessorUsage(p),w=e.accessorUsageGroupedByParent.has(g)?l(p):null,y=xc(p,g),f=s.method==="filter"?yc(p,this.document):{filter:"NONE"},d=bc(p,a,y,f),{array:x,byteStride:u}=d,h=p.getBuffer();if(!h)throw new Error(`${Ie}: Missing buffer for accessor.`);let m=this.document.getRoot().listBuffers().indexOf(h),v=[g,w,y,f.filter,u,m].join(":"),T=this._encoderBufferViews[v],k=this._encoderBufferViewData[v],I=this._encoderBufferViewAccessors[v];(!T||!k)&&(I=this._encoderBufferViewAccessors[v]=[],k=this._encoderBufferViewData[v]=[],T=this._encoderBufferViews[v]={buffer:i,target:tt.USAGE_TO_TARGET[g],byteOffset:0,byteLength:0,byteStride:g===tt.BufferViewUsage.ARRAY_BUFFER?u:void 0,extensions:{[Ie]:{buffer:m,byteOffset:0,byteLength:0,mode:y,filter:f.filter!=="NONE"?f.filter:void 0,byteStride:u,count:0}}});let M=e.createAccessorDef(p);M.componentType=d.componentType,M.normalized=d.normalized,M.byteOffset=T.byteLength,M.min&&d.min&&(M.min=d.min),M.max&&d.max&&(M.max=d.max),e.accessorIndexMap.set(p,t.accessors.length),t.accessors.push(M),I.push(M),k.push(new Uint8Array(x.buffer,x.byteOffset,x.byteLength)),T.byteLength+=x.byteLength,T.extensions.EXT_meshopt_compression.count+=p.getCount()}}_prewriteBuffers(e){let t=this._encoder;for(let a in this._encoderBufferViews){let s=this._encoderBufferViews[a],r=this._encoderBufferViewData[a],n=this.document.getRoot().listBuffers()[s.extensions[Ie].buffer],i=e.otherBufferViews.get(n)||[],{count:o,byteStride:c,mode:l}=s.extensions[Ie],p=G.concat(r),g=t.encodeGltfBuffer(p,o,c,l),w=G.pad(g);s.extensions[Ie].byteLength=g.byteLength,r.length=0,r.push(w),i.push(w),e.otherBufferViews.set(n,i)}}write(e){let t=0;for(let n in this._encoderBufferViews){let i=this._encoderBufferViews[n],o=this._encoderBufferViewData[n][0],c=e.otherBufferViewsIndexMap.get(o),l=this._encoderBufferViewAccessors[n];for(let y of l)y.bufferView=c;let p=e.jsonDoc.json.bufferViews[c],g=p.byteOffset||0;Object.assign(p,i),p.byteOffset=t;let w=p.extensions[Ie];w.byteOffset=g,t+=G.padNumber(i.byteLength)}let a=this._encoderFallbackBuffer,s=e.bufferIndexMap.get(a),r=e.jsonDoc.json.buffers[s];return r.byteLength=t,r.extensions={[Ie]:{fallback:!0}},a.dispose(),this}},vc=class extends H{static EXTENSION_NAME=K;init(){this.extensionName=K,this.propertyType="StructuralMetadata",this.parentTypes=[N.ROOT]}getDefaults(){return Object.assign(super.getDefaults(),{schema:null,schemaUri:"",propertyTables:new be,propertyTextures:new be,propertyAttributes:new be})}getSchema(){return this.getRef("schema")}setSchema(e){return this.setRef("schema",e)}getSchemaUri(){return this.get("schemaUri")}setSchemaUri(e){return this.set("schemaUri",e)}listPropertyTables(){return this.listRefs("propertyTables")}addPropertyTable(e){return this.addRef("propertyTables",e)}removePropertyTable(e){return this.removeRef("propertyTables",e)}listPropertyTextures(){return this.listRefs("propertyTextures")}addPropertyTexture(e){return this.addRef("propertyTextures",e)}removePropertyTexture(e){return this.removeRef("propertyTextures",e)}listPropertyAttributes(){return this.listRefs("propertyAttributes")}addPropertyAttribute(e){return this.addRef("propertyAttributes",e)}removePropertyAttribute(e){return this.removeRef("propertyAttributes",e)}},wc=class extends H{static EXTENSION_NAME=K;init(){this.extensionName=K,this.propertyType="Schema",this.parentTypes=["StructuralMetadata"]}getDefaults(){return Object.assign(super.getDefaults(),{description:"",version:"",classes:new le,enums:new le})}getId(){return this.get("id")}setId(e){return this.set("id",e)}getDescription(){return this.get("description")}setDescription(e){return this.set("description",e)}getVersion(){return this.get("version")}setVersion(e){return this.set("version",e)}setClass(e,t){return this.setRefMap("classes",e,t)}getClass(e){return this.getRefMap("classes",e)}listClassKeys(){return this.listRefMapKeys("classes")}listClassValues(){return this.listRefMapValues("classes")}setEnum(e,t){return this.setRefMap("enums",e,t)}getEnum(e){return this.getRefMap("enums",e)}listEnumKeys(){return this.listRefMapKeys("enums")}listEnumValues(){return this.listRefMapValues("enums")}},Tc=class extends H{static EXTENSION_NAME=K;init(){this.extensionName=K,this.propertyType="Class",this.parentTypes=["Schema"]}getDefaults(){return Object.assign(super.getDefaults(),{description:"",properties:new le})}getDescription(){return this.get("description")}setDescription(e){return this.set("description",e)}setProperty(e,t){return this.setRefMap("properties",e,t)}getProperty(e){return this.getRefMap("properties",e)}listPropertyKeys(){return this.listRefMapKeys("properties")}listPropertyValues(){return this.listRefMapValues("properties")}},Ec=class extends H{static EXTENSION_NAME=K;init(){this.extensionName=K,this.propertyType="ClassProperty",this.parentTypes=["Class"]}getDefaults(){return Object.assign(super.getDefaults(),{description:"",componentType:null,enumType:null,array:null,count:null,normalized:null,offset:null,scale:null,max:null,min:null,required:null,noData:null,default:null})}getDescription(){return this.get("description")}setDescription(e){return this.set("description",e)}getType(){return this.get("type")}setType(e){return this.set("type",e)}getComponentType(){return this.get("componentType")}setComponentType(e){return this.set("componentType",e)}getEnumType(){return this.get("enumType")}setEnumType(e){return this.set("enumType",e)}getArray(){return this.get("array")}setArray(e){return this.set("array",e)}getCount(){return this.get("count")}setCount(e){return this.set("count",e)}getNormalized(){return this.get("normalized")}setNormalized(e){return this.set("normalized",e)}getOffset(){return this.get("offset")}setOffset(e){return this.set("offset",e)}getScale(){return this.get("scale")}setScale(e){return this.set("scale",e)}getMax(){return this.get("max")}setMax(e){return this.set("max",e)}getMin(){return this.get("min")}setMin(e){return this.set("min",e)}getRequired(){return this.get("required")}setRequired(e){return this.set("required",e)}getNoData(){return this.get("noData")}setNoData(e){return this.set("noData",e)}getDefault(){return this.get("default")}setDefault(e){return this.set("default",e)}},kc=class extends H{static EXTENSION_NAME=K;init(){this.extensionName=K,this.propertyType="Enum",this.parentTypes=["Schema"]}getDefaults(){return Object.assign(super.getDefaults(),{description:"",valueType:"UINT16",values:new be})}getDescription(){return this.get("description")}setDescription(e){return this.set("description",e)}getValueType(){return this.get("valueType")}setValueType(e){return this.set("valueType",e)}listValues(){return this.listRefs("values")}addEnumValue(e){return this.addRef("values",e)}removeEnumValue(e){return this.removeRef("values",e)}},Rc=class extends H{static EXTENSION_NAME=K;init(){this.extensionName=K,this.propertyType="EnumValue",this.parentTypes=["Enum"]}getDefaults(){return Object.assign(super.getDefaults(),{description:null})}getDescription(){return this.get("description")}setDescription(e){return this.set("description",e)}getValue(){return this.get("value")}setValue(e){return this.set("value",e)}},Ic=class extends H{static EXTENSION_NAME=K;init(){this.extensionName=K,this.propertyType="PropertyTable",this.parentTypes=["StructuralMetadata"]}getDefaults(){return Object.assign(super.getDefaults(),{properties:new le})}getClass(){return this.get("class")}setClass(e){return this.set("class",e)}getCount(){return this.get("count")}setCount(e){return this.set("count",e)}setProperty(e,t){return this.setRefMap("properties",e,t)}getProperty(e){return this.getRefMap("properties",e)}listPropertyKeys(){return this.listRefMapKeys("properties")}listPropertyValues(){return this.listRefMapValues("properties")}},Mc=class extends H{static EXTENSION_NAME=K;init(){this.extensionName=K,this.propertyType="PropertyTableProperty",this.parentTypes=["PropertyTable"]}getDefaults(){return Object.assign(super.getDefaults(),{arrayOffsets:null,stringOffsets:null,arrayOffsetType:null,stringOffsetType:null,offset:null,scale:null,max:null,min:null})}getValues(){return this.get("values")}setValues(e){return this.set("values",e)}getArrayOffsets(){return this.get("arrayOffsets")}setArrayOffsets(e){return this.set("arrayOffsets",e)}getStringOffsets(){return this.get("stringOffsets")}setStringOffsets(e){return this.set("stringOffsets",e)}getArrayOffsetType(){return this.get("arrayOffsetType")}setArrayOffsetType(e){return this.set("arrayOffsetType",e)}getStringOffsetType(){return this.get("stringOffsetType")}setStringOffsetType(e){return this.set("stringOffsetType",e)}getOffset(){return this.get("offset")}setOffset(e){return this.set("offset",e)}getScale(){return this.get("scale")}setScale(e){return this.set("scale",e)}getMax(){return this.get("max")}setMax(e){return this.set("max",e)}getMin(){return this.get("min")}setMin(e){return this.set("min",e)}},Ac=class extends H{static EXTENSION_NAME=K;init(){this.extensionName=K,this.propertyType="PropertyTexture",this.parentTypes=["StructuralMetadata"]}getDefaults(){return Object.assign(super.getDefaults(),{properties:new le})}getClass(){return this.get("class")}setClass(e){return this.set("class",e)}setProperty(e,t){return this.setRefMap("properties",e,t)}getProperty(e){return this.getRefMap("properties",e)}listPropertyKeys(){return this.listRefMapKeys("properties")}listPropertyValues(){return this.listRefMapValues("properties")}},Sc=class extends H{static EXTENSION_NAME=K;init(){this.extensionName=K,this.propertyType="PropertyTextureProperty",this.parentTypes=["PropertyTexture"]}getDefaults(){let e=new se(this.graph,"textureInfo");return e.setMinFilter(se.MagFilter.NEAREST),e.setMagFilter(se.MagFilter.NEAREST),Object.assign(super.getDefaults(),{channels:[0],texture:null,textureInfo:e,offset:null,scale:null,max:null,min:null})}getChannels(){return this.get("channels")}setChannels(e){return this.set("channels",e)}getTexture(){return this.getRef("texture")}setTexture(e){return this.setRef("texture",e)}getTextureInfo(){return this.getRef("texture")?this.getRef("textureInfo"):null}getOffset(){return this.get("offset")}setOffset(e){return this.set("offset",e)}getScale(){return this.get("scale")}setScale(e){return this.set("scale",e)}getMax(){return this.get("max")}setMax(e){return this.set("max",e)}getMin(){return this.get("min")}setMin(e){return this.set("min",e)}},_c=class extends H{static EXTENSION_NAME=K;init(){this.extensionName=K,this.propertyType="PropertyAttribute",this.parentTypes=["StructuralMetadata"]}getDefaults(){return Object.assign(super.getDefaults(),{properties:new le})}getClass(){return this.get("class")}setClass(e){return this.set("class",e)}setProperty(e,t){return this.setRefMap("properties",e,t)}getProperty(e){return this.getRefMap("properties",e)}listPropertyKeys(){return this.listRefMapKeys("properties")}listPropertyValues(){return this.listRefMapValues("properties")}},Nc=class extends H{static EXTENSION_NAME=K;init(){this.extensionName=K,this.propertyType="PropertyAttributeProperty",this.parentTypes=["PropertyAttribute"]}getDefaults(){return Object.assign(super.getDefaults(),{offset:null,scale:null,max:null,min:null})}getAttribute(){return this.get("attribute")}setAttribute(e){return this.set("attribute",e)}getOffset(){return this.get("offset")}setOffset(e){return this.set("offset",e)}getScale(){return this.get("scale")}setScale(e){return this.set("scale",e)}getMax(){return this.get("max")}setMax(e){return this.set("max",e)}getMin(){return this.get("min")}setMin(e){return this.set("min",e)}},jc=class extends H{static EXTENSION_NAME=K;init(){this.extensionName=K,this.propertyType="NodeStructuralMetadata",this.parentTypes=[N.NODE]}getDefaults(){return Object.assign(super.getDefaults(),{class:"",properties:{}})}getClass(){return this.get("class")}setClass(e){return this.set("class",e)}getProperties(){return this.get("properties")}setProperties(e){return this.set("properties",e)}},Fc=class extends H{static EXTENSION_NAME=K;init(){this.extensionName=K,this.propertyType="MeshPrimitiveStructuralMetadata",this.parentTypes=[N.PRIMITIVE]}getDefaults(){return Object.assign(super.getDefaults(),{propertyTextures:new be,propertyAttributes:new be})}listPropertyTextures(){return this.listRefs("propertyTextures")}addPropertyTexture(e){return this.addRef("propertyTextures",e)}removePropertyTexture(e){return this.removeRef("propertyTextures",e)}listPropertyAttributes(){return this.listRefs("propertyAttributes")}addPropertyAttribute(e){return this.addRef("propertyAttributes",e)}removePropertyAttribute(e){return this.removeRef("propertyAttributes",e)}},Cc=class extends Z{extensionName=K;static EXTENSION_NAME=K;prewriteTypes=[N.BUFFER];prereadTypes=[N.SCENE];createStructuralMetadata(){return new vc(this.document.getGraph())}createSchema(){return new wc(this.document.getGraph())}createClass(){return new Tc(this.document.getGraph())}createClassProperty(){return new Ec(this.document.getGraph())}createEnum(){return new kc(this.document.getGraph())}createEnumValue(){return new Rc(this.document.getGraph())}createPropertyTable(){return new Ic(this.document.getGraph())}createPropertyTableProperty(){return new Mc(this.document.getGraph())}createPropertyTexture(){return new Ac(this.document.getGraph())}createPropertyTextureProperty(){return new Sc(this.document.getGraph())}createPropertyAttribute(){return new _c(this.document.getGraph())}createPropertyAttributeProperty(){return new Nc(this.document.getGraph())}createNodeStructuralMetadata(){return new jc(this.document.getGraph())}createMeshPrimitiveStructuralMetadata(){return new Fc(this.document.getGraph())}read(e){return this}preread(e){let t=this.document.getRoot(),{json:a}=e.jsonDoc,s=a.extensions[K],r=Bc(this,e,s);return t.setExtension(K,r),(a.meshes||[]).forEach((n,i)=>{let o=e.meshes[i].listPrimitives();(n.primitives||[]).forEach((c,l)=>{let p=o[l];this._readPrimitive(r,p,c)})}),(a.nodes||[]).forEach((n,i)=>{this._readNode(e.nodes[i],n)}),this}_readPrimitive(e,t,a){if(!a.extensions||!a.extensions.EXT_structural_metadata)return;let s=this.createMeshPrimitiveStructuralMetadata(),r=a.extensions[K],n=e.listPropertyTextures(),i=r.propertyTextures||[];for(let l of i){let p=n[l];s.addPropertyTexture(p)}let o=e.listPropertyAttributes(),c=r.propertyAttributes||[];for(let l of c){let p=o[l];s.addPropertyAttribute(p)}t.setExtension(K,s)}_readNode(e,t){if(!t.extensions||!t.extensions.EXT_structural_metadata)return;let a=t.extensions[K],s=this.createNodeStructuralMetadata().setClass(a.class).setProperties(a.properties);e.setExtension(K,s)}write(e){let t=this.document.getRoot(),a=t.getExtension(K);if(!a)return this;let s=e.jsonDoc.json,r=Xc(e,a);s.extensions=s.extensions||{},s.extensions[K]=r;let n=t.listMeshes(),i=s.meshes;if(i)for(let l of n){let p=i[e.meshIndexMap.get(l)];l.listPrimitives().forEach((g,w)=>{let y=p.primitives[w];this._writePrimitive(a,g,y)})}let o=t.listNodes(),c=s.nodes;if(c)for(let l of o){let p=e.nodeIndexMap.get(l);this._writeNode(l,c[p])}return this}_writePrimitive(e,t,a){let s=t.getExtension(K);if(!s)return;let r=e.listPropertyTextures(),n=e.listPropertyAttributes(),i,o,c=s.listPropertyTextures();if(c.length>0){i=[];for(let g of c){let w=r.indexOf(g);if(w>=0)i.push(w);else throw new Error(`${K}: Invalid property texture in mesh primitive`)}}let l=s.listPropertyAttributes();if(l.length>0){o=[];for(let g of l){let w=n.indexOf(g);if(w>=0)o.push(w);else throw new Error(`${K}: Invalid property attribute in mesh primitive`)}}let p={propertyTextures:i,propertyAttributes:o};a.extensions=a.extensions||{},a.extensions[K]=p}_writeNode(e,t){let a=e.getExtension("EXT_structural_metadata");a&&(t.extensions=t.extensions||{},t.extensions[K]={class:a.getClass(),properties:a.getProperties()})}prewrite(e,t){return t===N.BUFFER&&this._prewriteBuffers(e),this}_prewriteBuffers(e){let t=this.document,a=t.getRoot().getExtension(K);e.jsonDoc.json.bufferViews||=[];for(let s of a.listPropertyTables())for(let r of s.listPropertyValues()){let n=nd(t,e);n.push(r.getValues());let i=r.getArrayOffsets();i&&n.push(i);let o=r.getStringOffsets();o&&n.push(o)}}};function Bc(e,t,a){let s=e.createStructuralMetadata();if(a.schema!==void 0){let o=Oc(e,a.schema);s.setSchema(o)}else if(a.schemaUri){let o=a.schemaUri;s.setSchemaUri(o)}let r=a.propertyTextures||[];for(let o of r){let c=Kc(e,t,o);s.addPropertyTexture(c)}let n=a.propertyTables||[];for(let o of n){let c=zc(e,t,o);s.addPropertyTable(c)}let i=a.propertyAttributes||[];for(let o of i){let c=Hc(e,o);s.addPropertyAttribute(c)}return s}function Oc(e,t){let a=e.createSchema().setId(t.id);t.name!==void 0&&a.setName(t.name),t.description!==void 0&&a.setDescription(t.description),t.version!==void 0&&a.setVersion(t.version);let s=t.classes||{};for(let n of Object.keys(s)){let i=s[n];a.setClass(n,Pc(e,i))}let r=t.enums||{};for(let n of Object.keys(r))a.setEnum(n,Uc(e,r[n]));return a}function Pc(e,t){let a=e.createClass();t.name!==void 0&&a.setName(t.name),t.description!==void 0&&a.setDescription(t.description);let s=t.properties||{};for(let r of Object.keys(s)){let n=Dc(e,s[r]);a.setProperty(r,n)}return a}function Dc(e,t){let a=e.createClassProperty().setType(t.type);return t.name!==void 0&&a.setName(t.name),t.description!==void 0&&a.setDescription(t.description),t.componentType!==void 0&&a.setComponentType(t.componentType),t.enumType!==void 0&&a.setEnumType(t.enumType),t.array!==void 0&&a.setArray(t.array),t.count!==void 0&&a.setCount(t.count),t.normalized!==void 0&&a.setNormalized(t.normalized),t.offset!==void 0&&a.setOffset(t.offset),t.scale!==void 0&&a.setScale(t.scale),t.max!==void 0&&a.setMax(t.max),t.min!==void 0&&a.setMin(t.min),t.required!==void 0&&a.setRequired(t.required),t.noData!==void 0&&a.setNoData(t.noData),t.default!==void 0&&a.setDefault(t.default),a}function Uc(e,t){let a=e.createEnum();t.name!==void 0&&a.setName(t.name),t.description!==void 0&&a.setDescription(t.description),t.valueType!==void 0&&a.setValueType(t.valueType);let s=t.values||{};for(let r of s)a.addEnumValue(Lc(e,r));return a}function Lc(e,t){let a=e.createEnumValue();return t.name!==void 0&&a.setName(t.name),t.description!==void 0&&a.setDescription(t.description),t.value!==void 0&&a.setValue(t.value),a}function Kc(e,t,a){let s=e.createPropertyTexture();s.setClass(a.class),a.name!==void 0&&s.setName(a.name);let r=a.properties||{};for(let n of Object.keys(r)){let i=Gc(e,t,r[n]);s.setProperty(n,i)}return s}function Gc(e,t,a){let s=e.createPropertyTextureProperty(),r=t.jsonDoc.json.textures||[];a.channels&&s.setChannels(a.channels);let n=r[a.index].source;if(n!==void 0){let i=t.textures[n];s.setTexture(i);let o=s.getTextureInfo();o&&t.setTextureInfo(o,a)}return a.offset!==void 0&&s.setOffset(a.offset),a.scale!==void 0&&s.setScale(a.scale),a.max!==void 0&&s.setMax(a.max),a.min!==void 0&&s.setMin(a.min),s}function zc(e,t,a){let s=e.createPropertyTable().setClass(a.class).setCount(a.count);a.name!==void 0&&s.setName(a.name);let r=a.properties||{};for(let n of Object.keys(r)){let i=Vc(e,t,r[n]);s.setProperty(n,i)}return s}function Vc(e,t,a){let s=e.createPropertyTableProperty(),r=Rs(t,a.values);if(s.setValues(r),a.arrayOffsets!==void 0){let n=Rs(t,a.arrayOffsets);s.setArrayOffsets(n)}if(a.stringOffsets!==void 0){let n=Rs(t,a.stringOffsets);s.setStringOffsets(n)}return a.arrayOffsetType!==void 0&&s.setArrayOffsetType(a.arrayOffsetType),a.stringOffsetType!==void 0&&s.setStringOffsetType(a.stringOffsetType),a.offset!==void 0&&s.setOffset(a.offset),a.scale!==void 0&&s.setScale(a.scale),a.max!==void 0&&s.setMax(a.max),a.min!==void 0&&s.setMin(a.min),s}function Hc(e,t){let a=e.createPropertyAttribute();a.setClass(t.class),t.name!==void 0&&a.setName(t.name);let s=t.properties||{};for(let r of Object.keys(s)){let n=qc(e,s[r]);a.setProperty(r,n)}return a}function qc(e,t){let a=e.createPropertyAttributeProperty();return a.setAttribute(t.attribute),t.offset!==void 0&&a.setOffset(t.offset),t.scale!==void 0&&a.setScale(t.scale),t.max!==void 0&&a.setMax(t.max),t.min!==void 0&&a.setMin(t.min),a}function Xc(e,t){let a={},s=t.getSchema();s&&(a.schema=Wc(s));let r=t.getSchemaUri();r&&(a.schemaUri=r);let n=t.listPropertyTables();if(n.length>0){let c=[];for(let l of n){let p=Zc(e,l);c.push(p)}a.propertyTables=c}let i=t.listPropertyTextures();if(i.length>0){let c=[];for(let l of i){let p=sd(e,l);c.push(p)}a.propertyTextures=c}let o=t.listPropertyAttributes();if(o.length>0){let c=[];for(let l of o){let p=td(l);c.push(p)}a.propertyAttributes=c}return a}function Wc(e){let t={id:e.getId()},a=e.listClassKeys();if(a.length>0){t.classes={};for(let r of a){let n=Jc(e.getClass(r));t.classes[r]=n}}let s=e.listEnumKeys();if(s.length>0){t.enums={};for(let r of s){let n=$c(e.getEnum(r));t.enums[r]=n}}return e.getName()&&(t.name=e.getName()),e.getDescription()&&(t.description=e.getDescription()),e.getVersion()&&(t.version=e.getVersion()),t}function Jc(e){let t={},a=e.listPropertyKeys();if(a.length>0){t.properties={};for(let s of a){let r=e.getProperty(s);t.properties[s]=Yc(r)}}return e.getName()&&(t.name=e.getName()),e.getDescription()&&(t.description=e.getDescription()),t}function Yc(e){let t={type:e.getType()};return e.getArray()&&(t.array=e.getArray()),e.getNormalized()&&(t.normalized=e.getNormalized()),e.getRequired()&&(t.required=e.getRequired()),e.getName()&&(t.name=e.getName()),e.getDescription()&&(t.description=e.getDescription()),e.getComponentType()!=null&&(t.componentType=e.getComponentType()),e.getEnumType()!=null&&(t.enumType=e.getEnumType()),e.getCount()!=null&&(t.count=e.getCount()),e.getOffset()!=null&&(t.offset=e.getOffset()),e.getScale()!=null&&(t.scale=e.getScale()),e.getMax()!=null&&(t.max=e.getMax()),e.getMin()!=null&&(t.min=e.getMin()),e.getNoData()!=null&&(t.noData=e.getNoData()),e.getDefault()!=null&&(t.default=e.getDefault()),t}function $c(e){let t={values:e.listValues().map(Qc)};return e.getName()&&(t.name=e.getName()),e.getDescription()&&(t.description=e.getDescription()),e.getValueType()!=="UINT16"&&(t.valueType=e.getValueType()),t}function Qc(e){let t={name:e.getName(),value:e.getValue()};return e.getDescription()&&(t.description=e.getDescription()),t}function Zc(e,t){let a={class:t.getClass(),count:t.getCount()};t.getName()&&(a.name=t.getName());let s=t.listPropertyKeys();if(s.length>0){a.properties={};for(let r of s){let n=ed(e,t.getProperty(r));a.properties[r]=n}}return a}function ed(e,t){let a=t.getValues(),s={values:e.otherBufferViewsIndexMap.get(a)};if(t.getArrayOffsets()){let r=t.getArrayOffsets();s.arrayOffsets=e.otherBufferViewsIndexMap.get(r)}if(t.getStringOffsets()){let r=t.getStringOffsets();s.stringOffsets=e.otherBufferViewsIndexMap.get(r)}return t.getArrayOffsetType()!=null&&(s.arrayOffsetType=t.getArrayOffsetType()),t.getStringOffsetType()!=null&&(s.stringOffsetType=t.getStringOffsetType()),t.getOffset()!=null&&(s.offset=t.getOffset()),t.getScale()!=null&&(s.scale=t.getScale()),t.getMax()!=null&&(s.max=t.getMax()),t.getMin()!=null&&(s.min=t.getMin()),s}function td(e){let t={class:e.getClass()};e.getName()&&(t.name=e.getName());let a=e.listPropertyKeys();if(a.length>0){t.properties={};for(let s of a){let r=ad(e.getProperty(s));t.properties[s]=r}}return t}function ad(e){let t={attribute:e.getAttribute()};return e.getOffset()!=null&&(t.offset=e.getOffset()),e.getScale()!=null&&(t.scale=e.getScale()),e.getMax()!=null&&(t.max=e.getMax()),e.getMin()!=null&&(t.min=e.getMin()),t}function sd(e,t){let a={class:t.getClass()};t.getName()&&(a.name=t.getName());let s=t.listPropertyKeys();if(s.length>0){a.properties={};for(let r of s){let n=rd(e,t.getProperty(r));a.properties[r]=n}}return a}function rd(e,t){let a=t.getTexture(),s=t.getTextureInfo(),r=t.getChannels(),n=e.createTextureInfoDef(a,s);return re.eq(r,[0])||(n.channels=r),t.getOffset()!=null&&(n.offset=t.getOffset()),t.getScale()!=null&&(n.scale=t.getScale()),t.getMax()!=null&&(n.max=t.getMax()),t.getMin()!=null&&(n.min=t.getMin()),n}function Rs(e,t){let a=e.jsonDoc,s=a.json.buffers||[],r=(a.json.bufferViews||[])[t],n=s[r.buffer],i=n.uri?a.resources[n.uri]:a.resources[at],o=r.byteOffset||0,c=r.byteLength;return i.slice(o,o+c)}function nd(e,t){let a=e.getRoot().listBuffers()[0],s=t.otherBufferViews.get(a);return s||(s=[],t.otherBufferViews.set(a,s)),s}var id=class{match(e){return e.length>=12&&G.decodeText(e.slice(4,12))==="ftypavif"}getSize(e){if(!this.match(e))return null;let t=new DataView(e.buffer,e.byteOffset,e.byteLength),a=$r(t,0);if(!a)return null;let s=a.end;for(;a=$r(t,s);)if(a.type==="meta")s=a.start+4;else if(a.type==="iprp"||a.type==="ipco")s=a.start;else{if(a.type==="ispe")return[t.getUint32(a.start+4),t.getUint32(a.start+8)];if(a.type==="mdat")break;s=a.end}return null}getChannels(e){return 4}},od=class extends Z{extensionName=Aa;prereadTypes=[N.TEXTURE];static EXTENSION_NAME=Aa;static register(){qe.registerFormat("image/avif",new id)}preread(e){return(e.jsonDoc.json.textures||[]).forEach(t=>{t.extensions&&t.extensions.EXT_texture_avif&&(t.source=t.extensions[Aa].source)}),this}read(e){return this}write(e){let t=e.jsonDoc;return this.document.getRoot().listTextures().forEach(a=>{if(a.getMimeType()==="image/avif"){let s=e.imageIndexMap.get(a);(t.json.textures||[]).forEach(r=>{r.source===s&&(r.extensions=r.extensions||{},r.extensions[Aa]={source:r.source},delete r.source)})}}),this}};function $r(e,t){if(e.byteLength<4+t)return null;let a=e.getUint32(t);return e.byteLength<a+t||a<8?null:{type:G.decodeText(new Uint8Array(e.buffer,e.byteOffset+t+4,4)),start:t+8,end:t+a}}var cd=class{match(e){return e.length>=12&&e[8]===87&&e[9]===69&&e[10]===66&&e[11]===80}getSize(e){let t=G.decodeText(e.slice(0,4)),a=G.decodeText(e.slice(8,12));if(t!=="RIFF"||a!=="WEBP")return null;let s=new DataView(e.buffer,e.byteOffset),r=12;for(;r<s.byteLength;){let n=G.decodeText(new Uint8Array([s.getUint8(r),s.getUint8(r+1),s.getUint8(r+2),s.getUint8(r+3)])),i=s.getUint32(r+4,!0);if(n==="VP8 ")return[s.getInt16(r+14,!0)&16383,s.getInt16(r+16,!0)&16383];if(n==="VP8L"){let o=s.getUint8(r+9),c=s.getUint8(r+10),l=s.getUint8(r+11),p=s.getUint8(r+12);return[1+((c&63)<<8|o),1+((p&15)<<10|l<<2|(c&192)>>6)]}r+=8+i+i%2}return null}getChannels(e){return 4}},dd=class extends Z{extensionName=Ma;prereadTypes=[N.TEXTURE];static EXTENSION_NAME=Ma;static register(){qe.registerFormat("image/webp",new cd)}preread(e){return(e.jsonDoc.json.textures||[]).forEach(t=>{t.extensions&&t.extensions.EXT_texture_webp&&(t.source=t.extensions[Ma].source)}),this}read(e){return this}write(e){let t=e.jsonDoc;return this.document.getRoot().listTextures().forEach(a=>{if(a.getMimeType()==="image/webp"){let s=e.imageIndexMap.get(a);(t.json.textures||[]).forEach(r=>{r.source===s&&(r.extensions=r.extensions||{},r.extensions[Ma]={source:r.source},delete r.source)})}}),this}},Qr=ec,ld=class extends Z{extensionName=Qr;static EXTENSION_NAME=Qr;read(e){return this}write(e){return this}},Zr=tc,ud=class extends Z{extensionName=Zr;static EXTENSION_NAME=Zr;read(e){return this}write(e){return this}},fe,bn,gn;function fd(e,t){let a=new fe.DecoderBuffer;try{if(a.Init(t,t.length),e.GetEncodedGeometryType(a)!==fe.TRIANGULAR_MESH)throw new Error(`[${ce}] Unknown geometry type.`);let s=new fe.Mesh;if(!e.DecodeBufferToMesh(a,s).ok()||s.ptr===0)throw new Error(`[${ce}] Decoding failure.`);return s}finally{fe.destroy(a)}}function hd(e,t){let a=t.num_faces()*3,s,r;if(t.num_points()<=65534){let n=a*Uint16Array.BYTES_PER_ELEMENT;s=fe._malloc(n),e.GetTrianglesUInt16Array(t,n,s),r=new Uint16Array(fe.HEAPU16.buffer,s,a).slice()}else{let n=a*Uint32Array.BYTES_PER_ELEMENT;s=fe._malloc(n),e.GetTrianglesUInt32Array(t,n,s),r=new Uint32Array(fe.HEAPU32.buffer,s,a).slice()}return fe._free(s),r}function bd(e,t,a,s){let r=gn[s.componentType],n=bn[s.componentType],i=a.num_components(),o=t.num_points()*i,c=o*n.BYTES_PER_ELEMENT,l=fe._malloc(c);e.GetAttributeDataArrayForAllPoints(t,a,r,c,l);let p=new n(fe.HEAPF32.buffer,l,o).slice();return fe._free(l),p}function gd(e){fe=e,bn={[D.ComponentType.FLOAT]:Float32Array,[D.ComponentType.UNSIGNED_INT]:Uint32Array,[D.ComponentType.UNSIGNED_SHORT]:Uint16Array,[D.ComponentType.UNSIGNED_BYTE]:Uint8Array,[D.ComponentType.SHORT]:Int16Array,[D.ComponentType.BYTE]:Int8Array},gn={[D.ComponentType.FLOAT]:fe.DT_FLOAT32,[D.ComponentType.UNSIGNED_INT]:fe.DT_UINT32,[D.ComponentType.UNSIGNED_SHORT]:fe.DT_UINT16,[D.ComponentType.UNSIGNED_BYTE]:fe.DT_UINT8,[D.ComponentType.SHORT]:fe.DT_INT16,[D.ComponentType.BYTE]:fe.DT_INT8}}var Be,pd=(function(e){return e[e.EDGEBREAKER=1]="EDGEBREAKER",e[e.SEQUENTIAL=0]="SEQUENTIAL",e})({}),pn={POSITION:14,NORMAL:10,COLOR:8,TEX_COORD:12,GENERIC:12},en={decodeSpeed:5,encodeSpeed:5,method:1,quantizationBits:pn,quantizationVolume:"mesh"};function md(e){Be=e}function xd(e,t=en){let a={...en,...t};a.quantizationBits={...pn,...t.quantizationBits};let s=new Be.MeshBuilder,r=new Be.Mesh,n=new Be.ExpertEncoder(r),i={},o=new Be.DracoInt8Array,c=e.listTargets().length>0,l=!1;for(let d of e.listSemantics()){let x=e.getAttribute(d);if(x.getSparse()){l=!0;continue}let u=yd(d),h=vd(s,x.getComponentType(),r,Be[u],x.getCount(),x.getElementSize(),x.getArray());if(h===-1)throw new Error(`Error compressing "${d}" attribute.`);if(i[d]=h,a.quantizationVolume==="mesh"||d!=="POSITION")n.SetAttributeQuantization(h,a.quantizationBits[u]);else if(typeof a.quantizationVolume=="object"){let{quantizationVolume:m}=a,v=Math.max(m.max[0]-m.min[0],m.max[1]-m.min[1],m.max[2]-m.min[2]);n.SetAttributeExplicitQuantization(h,a.quantizationBits[u],x.getElementSize(),m.min,v)}else throw new Error("Invalid quantization volume state.")}let p=e.getIndices();if(!p)throw new Ss("Primitive must have indices.");s.AddFacesToMesh(r,p.getCount()/3,p.getArray()),n.SetSpeedOptions(a.encodeSpeed,a.decodeSpeed),n.SetTrackEncodedProperties(!0),a.method===0||c||l?n.SetEncodingMethod(Be.MESH_SEQUENTIAL_ENCODING):n.SetEncodingMethod(Be.MESH_EDGEBREAKER_ENCODING);let g=n.EncodeToDracoBuffer(!(c||l),o);if(g<=0)throw new Ss("Error applying Draco compression.");let w=new Uint8Array(g);for(let d=0;d<g;++d)w[d]=o.GetValue(d);let y=n.GetNumberOfEncodedPoints(),f=n.GetNumberOfEncodedFaces()*3;return Be.destroy(o),Be.destroy(r),Be.destroy(s),Be.destroy(n),{numVertices:y,numIndices:f,data:w,attributeIDs:i}}function yd(e){return e==="POSITION"?"POSITION":e==="NORMAL"?"NORMAL":e.startsWith("COLOR_")?"COLOR":e.startsWith("TEXCOORD_")?"TEX_COORD":"GENERIC"}function vd(e,t,a,s,r,n,i){switch(t){case D.ComponentType.UNSIGNED_BYTE:return e.AddUInt8Attribute(a,s,r,n,i);case D.ComponentType.BYTE:return e.AddInt8Attribute(a,s,r,n,i);case D.ComponentType.UNSIGNED_SHORT:return e.AddUInt16Attribute(a,s,r,n,i);case D.ComponentType.SHORT:return e.AddInt16Attribute(a,s,r,n,i);case D.ComponentType.UNSIGNED_INT:return e.AddUInt32Attribute(a,s,r,n,i);case D.ComponentType.FLOAT:return e.AddFloatAttribute(a,s,r,n,i);default:throw new Error(`Unexpected component type, "${t}".`)}}var Ss=class extends Error{},wd=class extends Z{extensionName=ce;prereadTypes=[N.PRIMITIVE];prewriteTypes=[N.ACCESSOR];readDependencies=["draco3d.decoder"];writeDependencies=["draco3d.encoder"];static EXTENSION_NAME=ce;static EncoderMethod=pd;_decoderModule=null;_encoderModule=null;_encoderOptions={};install(e,t){return e==="draco3d.decoder"&&(this._decoderModule=t,gd(this._decoderModule)),e==="draco3d.encoder"&&(this._encoderModule=t,md(this._encoderModule)),this}setEncoderOptions(e){return this._encoderOptions=e,this}preread(e){if(!this._decoderModule)throw new Error(`[${ce}] Please install extension dependency, "draco3d.decoder".`);let t=this.document.getLogger(),a=e.jsonDoc,s=new Map;try{let r=a.json.meshes||[];for(let n of r)for(let i of n.primitives){if(!i.extensions||!i.extensions.KHR_draco_mesh_compression)continue;let o=i.extensions[ce],[c,l]=s.get(o.bufferView)||[];if(!l||!c){let p=a.json.bufferViews[o.bufferView],g=a.json.buffers[p.buffer],w=g.uri?a.resources[g.uri]:a.resources[at],y=p.byteOffset||0,f=p.byteLength,d=G.toView(w,y,f);c=new this._decoderModule.Decoder,l=fd(c,d),s.set(o.bufferView,[c,l]),t.debug(`[${ce}] Decompressed ${d.byteLength} bytes.`)}for(let p in o.attributes){let g=e.jsonDoc.json.accessors[i.attributes[p]],w=c.GetAttributeByUniqueId(l,o.attributes[p]),y=bd(c,l,w,g);e.accessors[i.attributes[p]].setArray(y)}i.indices!==void 0&&e.accessors[i.indices].setArray(hd(c,l))}}finally{for(let[r,n]of Array.from(s.values()))this._decoderModule.destroy(r),this._decoderModule.destroy(n)}return this}read(e){return this}prewrite(e,t){if(!this._encoderModule)throw new Error(`[${ce}] Please install extension dependency, "draco3d.encoder".`);let a=this.document.getLogger();a.debug(`[${ce}] Compression options: ${JSON.stringify(this._encoderOptions)}`);let s=Td(this.document),r=new Map,n="mesh";this._encoderOptions.quantizationVolume==="scene"&&(this.document.getRoot().listScenes().length!==1?a.warn(`[${ce}]: quantizationVolume=scene requires exactly 1 scene.`):n=Mr(this.document.getRoot().listScenes().pop()));for(let i of Array.from(s.keys())){let o=s.get(i);if(!o)throw new Error("Unexpected primitive.");if(r.has(o)){r.set(o,r.get(o));continue}let c=i.getIndices(),l=e.jsonDoc.json.accessors,p;try{p=xd(i,{...this._encoderOptions,quantizationVolume:n})}catch(y){if(y instanceof Ss){a.warn(`[${ce}]: ${y.message} Skipping primitive compression.`);continue}throw y}r.set(o,p);let g=e.createAccessorDef(c);g.count=p.numIndices,e.accessorIndexMap.set(c,l.length),l.push(g),p.numVertices>65534&&D.getComponentSize(g.componentType)<=2?g.componentType=D.ComponentType.UNSIGNED_INT:p.numVertices>254&&D.getComponentSize(g.componentType)<=1&&(g.componentType=D.ComponentType.UNSIGNED_SHORT);for(let y of i.listSemantics()){let f=i.getAttribute(y);if(p.attributeIDs[y]===void 0)continue;let d=e.createAccessorDef(f);d.count=p.numVertices,e.accessorIndexMap.set(f,l.length),l.push(d)}let w=i.getAttribute("POSITION").getBuffer()||this.document.getRoot().listBuffers()[0];e.otherBufferViews.has(w)||e.otherBufferViews.set(w,[]),e.otherBufferViews.get(w).push(p.data)}return a.debug(`[${ce}] Compressed ${s.size} primitives.`),e.extensionData[ce]={primitiveHashMap:s,primitiveEncodingMap:r},this}write(e){let t=e.extensionData[ce];for(let a of this.document.getRoot().listMeshes()){let s=e.jsonDoc.json.meshes[e.meshIndexMap.get(a)];for(let r=0;r<a.listPrimitives().length;r++){let n=a.listPrimitives()[r],i=s.primitives[r],o=t.primitiveHashMap.get(n);if(!o)continue;let c=t.primitiveEncodingMap.get(o);c&&(i.extensions=i.extensions||{},i.extensions[ce]={bufferView:e.otherBufferViewsIndexMap.get(c.data),attributes:c.attributeIDs})}}if(!t.primitiveHashMap.size){let a=e.jsonDoc.json;a.extensionsUsed=(a.extensionsUsed||[]).filter(s=>s!==ce),a.extensionsRequired=(a.extensionsRequired||[]).filter(s=>s!==ce)}return this}};function Td(e){let t=e.getLogger(),a=new Set,s=new Set,r=0,n=0;for(let g of e.getRoot().listMeshes())for(let w of g.listPrimitives())w.getIndices()?w.getMode()!==zt.Mode.TRIANGLES?(s.add(w),n++):a.add(w):(s.add(w),r++);r>0&&t.warn(`[${ce}] Skipping Draco compression of ${r} non-indexed primitives.`),n>0&&t.warn(`[${ce}] Skipping Draco compression of ${n} non-TRIANGLES primitives.`);let i=e.getRoot().listAccessors(),o=new Map;for(let g=0;g<i.length;g++)o.set(i[g],g);let c=new Map,l=new Set,p=new Map;for(let g of Array.from(a)){let w=tn(g,o);if(l.has(w)){p.set(g,w);continue}if(c.has(g.getIndices())){let y=g.getIndices(),f=y.clone();o.set(f,e.getRoot().listAccessors().length-1),g.swap(y,f)}for(let y of g.listAttributes())if(c.has(y)){let f=y.clone();o.set(f,e.getRoot().listAccessors().length-1),g.swap(y,f)}w=tn(g,o),l.add(w),p.set(g,w),c.set(g.getIndices(),w);for(let y of g.listAttributes())c.set(y,w)}for(let g of Array.from(c.keys())){let w=new Set(g.listParents().map(y=>y.propertyType));if(w.size!==2||!w.has(N.PRIMITIVE)||!w.has(N.ROOT))throw new Error(`[${ce}] Compressed accessors must only be used as indices or vertex attributes.`)}for(let g of Array.from(a)){let w=p.get(g),y=g.getIndices();if(c.get(y)!==w||g.listAttributes().some(f=>c.get(f)!==w))throw new Error(`[${ce}] Draco primitives must share all, or no, accessors.`)}for(let g of Array.from(s)){let w=g.getIndices();if(c.has(w)||g.listAttributes().some(y=>c.has(y)))throw new Error(`[${ce}] Accessor cannot be shared by compressed and uncompressed primitives.`)}return p}function tn(e,t){let a=[],s=e.getIndices();a.push(t.get(s));for(let r of e.listAttributes())a.push(t.get(r));return a.sort().join("|")}var an=class mn extends H{static EXTENSION_NAME=We;static Type={POINT:"point",SPOT:"spot",DIRECTIONAL:"directional"};init(){this.extensionName=We,this.propertyType="Light",this.parentTypes=[N.NODE]}getDefaults(){return Object.assign(super.getDefaults(),{color:[1,1,1],intensity:1,type:mn.Type.POINT,range:null,innerConeAngle:0,outerConeAngle:Math.PI/4})}getColor(){return this.get("color")}setColor(t){return this.set("color",t)}getIntensity(){return this.get("intensity")}setIntensity(t){return this.set("intensity",t)}getType(){return this.get("type")}setType(t){return this.set("type",t)}getRange(){return this.get("range")}setRange(t){return this.set("range",t)}getInnerConeAngle(){return this.get("innerConeAngle")}setInnerConeAngle(t){return this.set("innerConeAngle",t)}getOuterConeAngle(){return this.get("outerConeAngle")}setOuterConeAngle(t){return this.set("outerConeAngle",t)}},Ed=class extends Z{extensionName=We;static EXTENSION_NAME=We;createLight(e=""){return new an(this.document.getGraph(),e)}read(e){let t=e.jsonDoc;if(!t.json.extensions||!t.json.extensions.KHR_lights_punctual)return this;let a=(t.json.extensions.KHR_lights_punctual.lights||[]).map(s=>{let r=this.createLight().setName(s.name||"").setType(s.type);return s.extras&&r.setExtras(s.extras),s.color!==void 0&&r.setColor(s.color),s.intensity!==void 0&&r.setIntensity(s.intensity),s.range!==void 0&&r.setRange(s.range),s.spot?.innerConeAngle!==void 0&&r.setInnerConeAngle(s.spot.innerConeAngle),s.spot?.outerConeAngle!==void 0&&r.setOuterConeAngle(s.spot.outerConeAngle),r});return t.json.nodes.forEach((s,r)=>{if(!s.extensions||!s.extensions.KHR_lights_punctual)return;let n=s.extensions[We];e.nodes[r].setExtension(We,a[n.light])}),this}write(e){let t=e.jsonDoc;if(this.properties.size===0)return this;let a=[],s=new Map;for(let r of this.properties){let n=r,i=e.createPropertyDef(r);i.type=n.getType(),re.eq(n.getColor(),[1,1,1])||(i.color=n.getColor()),n.getIntensity()!==1&&(i.intensity=n.getIntensity()),n.getRange()!=null&&(i.range=n.getRange()),n.getName()&&(i.name=n.getName()),n.getType()===an.Type.SPOT&&(i.spot={innerConeAngle:n.getInnerConeAngle(),outerConeAngle:n.getOuterConeAngle()}),a.push(i),s.set(n,a.length-1)}return this.document.getRoot().listNodes().forEach(r=>{let n=r.getExtension(We);if(n){let i=e.nodeIndexMap.get(r),o=t.json.nodes[i];o.extensions=o.extensions||{},o.extensions[We]={light:s.get(n)}}}),t.json.extensions=t.json.extensions||{},t.json.extensions[We]={lights:a},this}},{R:kd,G:Rd,B:Id}=Le,Md=class extends H{static EXTENSION_NAME=nt;init(){this.extensionName=nt,this.propertyType="Anisotropy",this.parentTypes=[N.MATERIAL]}getDefaults(){return Object.assign(super.getDefaults(),{anisotropyStrength:0,anisotropyRotation:0,anisotropyTexture:null,anisotropyTextureInfo:new se(this.graph,"anisotropyTextureInfo")})}getAnisotropyStrength(){return this.get("anisotropyStrength")}setAnisotropyStrength(e){return this.set("anisotropyStrength",e)}getAnisotropyRotation(){return this.get("anisotropyRotation")}setAnisotropyRotation(e){return this.set("anisotropyRotation",e)}getAnisotropyTexture(){return this.getRef("anisotropyTexture")}getAnisotropyTextureInfo(){return this.getRef("anisotropyTexture")?this.getRef("anisotropyTextureInfo"):null}setAnisotropyTexture(e){return this.setRef("anisotropyTexture",e,{channels:kd|Rd|Id})}},Ad=class extends Z{static EXTENSION_NAME=nt;extensionName=nt;prereadTypes=[N.MESH];prewriteTypes=[N.MESH];createAnisotropy(){return new Md(this.document.getGraph())}read(e){return this}write(e){return this}preread(e){let t=e.jsonDoc,a=t.json.materials||[],s=t.json.textures||[];return a.forEach((r,n)=>{if(r.extensions&&r.extensions.KHR_materials_anisotropy){let i=this.createAnisotropy();e.materials[n].setExtension(nt,i);let o=r.extensions[nt];if(o.extras&&i.setExtras(o.extras),o.anisotropyStrength!==void 0&&i.setAnisotropyStrength(o.anisotropyStrength),o.anisotropyRotation!==void 0&&i.setAnisotropyRotation(o.anisotropyRotation),o.anisotropyTexture!==void 0){let c=o.anisotropyTexture,l=e.textures[s[c.index].source];i.setAnisotropyTexture(l),e.setTextureInfo(i.getAnisotropyTextureInfo(),c)}}}),this}prewrite(e){let t=e.jsonDoc;return this.document.getRoot().listMaterials().forEach(a=>{let s=a.getExtension(nt);if(s){let r=e.materialIndexMap.get(a),n=t.json.materials[r],i=e.createPropertyDef(s);if(n.extensions=n.extensions||{},n.extensions[nt]=i,s.getAnisotropyStrength()>0&&(i.anisotropyStrength=s.getAnisotropyStrength()),s.getAnisotropyRotation()!==0&&(i.anisotropyRotation=s.getAnisotropyRotation()),s.getAnisotropyTexture()){let o=s.getAnisotropyTexture(),c=s.getAnisotropyTextureInfo();i.anisotropyTexture=e.createTextureInfoDef(o,c)}}}),this}},{R:sn,G:rn,B:Sd}=Le,_d=class extends H{static EXTENSION_NAME=it;init(){this.extensionName=it,this.propertyType="Clearcoat",this.parentTypes=[N.MATERIAL]}getDefaults(){return Object.assign(super.getDefaults(),{clearcoatFactor:0,clearcoatTexture:null,clearcoatTextureInfo:new se(this.graph,"clearcoatTextureInfo"),clearcoatRoughnessFactor:0,clearcoatRoughnessTexture:null,clearcoatRoughnessTextureInfo:new se(this.graph,"clearcoatRoughnessTextureInfo"),clearcoatNormalScale:1,clearcoatNormalTexture:null,clearcoatNormalTextureInfo:new se(this.graph,"clearcoatNormalTextureInfo")})}getClearcoatFactor(){return this.get("clearcoatFactor")}setClearcoatFactor(e){return this.set("clearcoatFactor",e)}getClearcoatTexture(){return this.getRef("clearcoatTexture")}getClearcoatTextureInfo(){return this.getRef("clearcoatTexture")?this.getRef("clearcoatTextureInfo"):null}setClearcoatTexture(e){return this.setRef("clearcoatTexture",e,{channels:sn})}getClearcoatRoughnessFactor(){return this.get("clearcoatRoughnessFactor")}setClearcoatRoughnessFactor(e){return this.set("clearcoatRoughnessFactor",e)}getClearcoatRoughnessTexture(){return this.getRef("clearcoatRoughnessTexture")}getClearcoatRoughnessTextureInfo(){return this.getRef("clearcoatRoughnessTexture")?this.getRef("clearcoatRoughnessTextureInfo"):null}setClearcoatRoughnessTexture(e){return this.setRef("clearcoatRoughnessTexture",e,{channels:rn})}getClearcoatNormalScale(){return this.get("clearcoatNormalScale")}setClearcoatNormalScale(e){return this.set("clearcoatNormalScale",e)}getClearcoatNormalTexture(){return this.getRef("clearcoatNormalTexture")}getClearcoatNormalTextureInfo(){return this.getRef("clearcoatNormalTexture")?this.getRef("clearcoatNormalTextureInfo"):null}setClearcoatNormalTexture(e){return this.setRef("clearcoatNormalTexture",e,{channels:sn|rn|Sd})}},Nd=class extends Z{static EXTENSION_NAME=it;extensionName=it;prereadTypes=[N.MESH];prewriteTypes=[N.MESH];createClearcoat(){return new _d(this.document.getGraph())}read(e){return this}write(e){return this}preread(e){let t=e.jsonDoc,a=t.json.materials||[],s=t.json.textures||[];return a.forEach((r,n)=>{if(r.extensions&&r.extensions.KHR_materials_clearcoat){let i=this.createClearcoat();e.materials[n].setExtension(it,i);let o=r.extensions[it];if(o.extras&&i.setExtras(o.extras),o.clearcoatFactor!==void 0&&i.setClearcoatFactor(o.clearcoatFactor),o.clearcoatRoughnessFactor!==void 0&&i.setClearcoatRoughnessFactor(o.clearcoatRoughnessFactor),o.clearcoatTexture!==void 0){let c=o.clearcoatTexture,l=e.textures[s[c.index].source];i.setClearcoatTexture(l),e.setTextureInfo(i.getClearcoatTextureInfo(),c)}if(o.clearcoatRoughnessTexture!==void 0){let c=o.clearcoatRoughnessTexture,l=e.textures[s[c.index].source];i.setClearcoatRoughnessTexture(l),e.setTextureInfo(i.getClearcoatRoughnessTextureInfo(),c)}if(o.clearcoatNormalTexture!==void 0){let c=o.clearcoatNormalTexture,l=e.textures[s[c.index].source];i.setClearcoatNormalTexture(l),e.setTextureInfo(i.getClearcoatNormalTextureInfo(),c),c.scale!==void 0&&i.setClearcoatNormalScale(c.scale)}}}),this}prewrite(e){let t=e.jsonDoc;return this.document.getRoot().listMaterials().forEach(a=>{let s=a.getExtension(it);if(s){let r=e.materialIndexMap.get(a),n=t.json.materials[r],i=e.createPropertyDef(s);if(n.extensions=n.extensions||{},n.extensions[it]=i,i.clearcoatFactor=s.getClearcoatFactor(),i.clearcoatRoughnessFactor=s.getClearcoatRoughnessFactor(),s.getClearcoatTexture()){let o=s.getClearcoatTexture(),c=s.getClearcoatTextureInfo();i.clearcoatTexture=e.createTextureInfoDef(o,c)}if(s.getClearcoatRoughnessTexture()){let o=s.getClearcoatRoughnessTexture(),c=s.getClearcoatRoughnessTextureInfo();i.clearcoatRoughnessTexture=e.createTextureInfoDef(o,c)}if(s.getClearcoatNormalTexture()){let o=s.getClearcoatNormalTexture(),c=s.getClearcoatNormalTextureInfo();i.clearcoatNormalTexture=e.createTextureInfoDef(o,c),s.getClearcoatNormalScale()!==1&&(i.clearcoatNormalTexture.scale=s.getClearcoatNormalScale())}}}),this}},{R:jd,G:Fd,B:Cd,A:Bd}=Le,Od=class extends H{static EXTENSION_NAME=ot;init(){this.extensionName=ot,this.propertyType="DiffuseTransmission",this.parentTypes=[N.MATERIAL]}getDefaults(){return Object.assign(super.getDefaults(),{diffuseTransmissionFactor:0,diffuseTransmissionTexture:null,diffuseTransmissionTextureInfo:new se(this.graph,"diffuseTransmissionTextureInfo"),diffuseTransmissionColorFactor:[1,1,1],diffuseTransmissionColorTexture:null,diffuseTransmissionColorTextureInfo:new se(this.graph,"diffuseTransmissionColorTextureInfo")})}getDiffuseTransmissionFactor(){return this.get("diffuseTransmissionFactor")}setDiffuseTransmissionFactor(e){return this.set("diffuseTransmissionFactor",e)}getDiffuseTransmissionTexture(){return this.getRef("diffuseTransmissionTexture")}getDiffuseTransmissionTextureInfo(){return this.getRef("diffuseTransmissionTexture")?this.getRef("diffuseTransmissionTextureInfo"):null}setDiffuseTransmissionTexture(e){return this.setRef("diffuseTransmissionTexture",e,{channels:Bd})}getDiffuseTransmissionColorFactor(){return this.get("diffuseTransmissionColorFactor")}setDiffuseTransmissionColorFactor(e){return this.set("diffuseTransmissionColorFactor",e)}getDiffuseTransmissionColorTexture(){return this.getRef("diffuseTransmissionColorTexture")}getDiffuseTransmissionColorTextureInfo(){return this.getRef("diffuseTransmissionColorTexture")?this.getRef("diffuseTransmissionColorTextureInfo"):null}setDiffuseTransmissionColorTexture(e){return this.setRef("diffuseTransmissionColorTexture",e,{channels:jd|Fd|Cd})}},Pd=class extends Z{extensionName=ot;static EXTENSION_NAME=ot;createDiffuseTransmission(){return new Od(this.document.getGraph())}read(e){let t=e.jsonDoc,a=t.json.materials||[],s=t.json.textures||[];return a.forEach((r,n)=>{if(r.extensions&&r.extensions.KHR_materials_diffuse_transmission){let i=this.createDiffuseTransmission();e.materials[n].setExtension(ot,i);let o=r.extensions[ot];if(o.extras&&i.setExtras(o.extras),o.diffuseTransmissionFactor!==void 0&&i.setDiffuseTransmissionFactor(o.diffuseTransmissionFactor),o.diffuseTransmissionColorFactor!==void 0&&i.setDiffuseTransmissionColorFactor(o.diffuseTransmissionColorFactor),o.diffuseTransmissionTexture!==void 0){let c=o.diffuseTransmissionTexture,l=e.textures[s[c.index].source];i.setDiffuseTransmissionTexture(l),e.setTextureInfo(i.getDiffuseTransmissionTextureInfo(),c)}if(o.diffuseTransmissionColorTexture!==void 0){let c=o.diffuseTransmissionColorTexture,l=e.textures[s[c.index].source];i.setDiffuseTransmissionColorTexture(l),e.setTextureInfo(i.getDiffuseTransmissionColorTextureInfo(),c)}}}),this}write(e){let t=e.jsonDoc;for(let a of this.document.getRoot().listMaterials()){let s=a.getExtension(ot);if(!s)continue;let r=e.materialIndexMap.get(a),n=t.json.materials[r],i=e.createPropertyDef(s);if(n.extensions=n.extensions||{},n.extensions[ot]=i,i.diffuseTransmissionFactor=s.getDiffuseTransmissionFactor(),i.diffuseTransmissionColorFactor=s.getDiffuseTransmissionColorFactor(),s.getDiffuseTransmissionTexture()){let o=s.getDiffuseTransmissionTexture(),c=s.getDiffuseTransmissionTextureInfo();i.diffuseTransmissionTexture=e.createTextureInfoDef(o,c)}if(s.getDiffuseTransmissionColorTexture()){let o=s.getDiffuseTransmissionColorTexture(),c=s.getDiffuseTransmissionColorTextureInfo();i.diffuseTransmissionColorTexture=e.createTextureInfoDef(o,c)}}return this}},Dd=class extends H{static EXTENSION_NAME=ct;init(){this.extensionName=ct,this.propertyType="Dispersion",this.parentTypes=[N.MATERIAL]}getDefaults(){return Object.assign(super.getDefaults(),{dispersion:0})}getDispersion(){return this.get("dispersion")}setDispersion(e){return this.set("dispersion",e)}},Ud=class extends Z{static EXTENSION_NAME=ct;extensionName=ct;prereadTypes=[N.MESH];prewriteTypes=[N.MESH];createDispersion(){return new Dd(this.document.getGraph())}read(e){return this}write(e){return this}preread(e){return(e.jsonDoc.json.materials||[]).forEach((t,a)=>{if(t.extensions&&t.extensions.KHR_materials_dispersion){let s=this.createDispersion();e.materials[a].setExtension(ct,s);let r=t.extensions[ct];r.extras&&s.setExtras(r.extras),r.dispersion!==void 0&&s.setDispersion(r.dispersion)}}),this}prewrite(e){let t=e.jsonDoc;return this.document.getRoot().listMaterials().forEach(a=>{let s=a.getExtension(ct);if(s){let r=e.materialIndexMap.get(a),n=t.json.materials[r],i=e.createPropertyDef(s);n.extensions=n.extensions||{},n.extensions[ct]=i,i.dispersion=s.getDispersion()}}),this}},Ld=class extends H{static EXTENSION_NAME=dt;init(){this.extensionName=dt,this.propertyType="EmissiveStrength",this.parentTypes=[N.MATERIAL]}getDefaults(){return Object.assign(super.getDefaults(),{emissiveStrength:1})}getEmissiveStrength(){return this.get("emissiveStrength")}setEmissiveStrength(e){return this.set("emissiveStrength",e)}},Kd=class extends Z{static EXTENSION_NAME=dt;extensionName=dt;prereadTypes=[N.MESH];prewriteTypes=[N.MESH];createEmissiveStrength(){return new Ld(this.document.getGraph())}read(e){return this}write(e){return this}preread(e){return(e.jsonDoc.json.materials||[]).forEach((t,a)=>{if(t.extensions&&t.extensions.KHR_materials_emissive_strength){let s=this.createEmissiveStrength();e.materials[a].setExtension(dt,s);let r=t.extensions[dt];r.extras&&s.setExtras(r.extras),r.emissiveStrength!==void 0&&s.setEmissiveStrength(r.emissiveStrength)}}),this}prewrite(e){let t=e.jsonDoc;return this.document.getRoot().listMaterials().forEach(a=>{let s=a.getExtension(dt);if(s){let r=e.materialIndexMap.get(a),n=t.json.materials[r],i=e.createPropertyDef(s);n.extensions=n.extensions||{},n.extensions[dt]=i,i.emissiveStrength=s.getEmissiveStrength()}}),this}},Gd=class extends H{static EXTENSION_NAME=lt;init(){this.extensionName=lt,this.propertyType="IOR",this.parentTypes=[N.MATERIAL]}getDefaults(){return Object.assign(super.getDefaults(),{ior:1.5})}getIOR(){return this.get("ior")}setIOR(e){return this.set("ior",e)}},zd=class extends Z{static EXTENSION_NAME=lt;extensionName=lt;prereadTypes=[N.MESH];prewriteTypes=[N.MESH];createIOR(){return new Gd(this.document.getGraph())}read(e){return this}write(e){return this}preread(e){return(e.jsonDoc.json.materials||[]).forEach((t,a)=>{if(t.extensions&&t.extensions.KHR_materials_ior){let s=this.createIOR();e.materials[a].setExtension(lt,s);let r=t.extensions[lt];r.extras&&s.setExtras(r.extras),r.ior!==void 0&&s.setIOR(r.ior)}}),this}prewrite(e){let t=e.jsonDoc;return this.document.getRoot().listMaterials().forEach(a=>{let s=a.getExtension(lt);if(s){let r=e.materialIndexMap.get(a),n=t.json.materials[r],i=e.createPropertyDef(s);n.extensions=n.extensions||{},n.extensions[lt]=i,i.ior=s.getIOR()}}),this}},{R:Vd,G:Hd}=Le,qd=class extends H{static EXTENSION_NAME=ut;init(){this.extensionName=ut,this.propertyType="Iridescence",this.parentTypes=[N.MATERIAL]}getDefaults(){return Object.assign(super.getDefaults(),{iridescenceFactor:0,iridescenceTexture:null,iridescenceTextureInfo:new se(this.graph,"iridescenceTextureInfo"),iridescenceIOR:1.3,iridescenceThicknessMinimum:100,iridescenceThicknessMaximum:400,iridescenceThicknessTexture:null,iridescenceThicknessTextureInfo:new se(this.graph,"iridescenceThicknessTextureInfo")})}getIridescenceFactor(){return this.get("iridescenceFactor")}setIridescenceFactor(e){return this.set("iridescenceFactor",e)}getIridescenceTexture(){return this.getRef("iridescenceTexture")}getIridescenceTextureInfo(){return this.getRef("iridescenceTexture")?this.getRef("iridescenceTextureInfo"):null}setIridescenceTexture(e){return this.setRef("iridescenceTexture",e,{channels:Vd})}getIridescenceIOR(){return this.get("iridescenceIOR")}setIridescenceIOR(e){return this.set("iridescenceIOR",e)}getIridescenceThicknessMinimum(){return this.get("iridescenceThicknessMinimum")}setIridescenceThicknessMinimum(e){return this.set("iridescenceThicknessMinimum",e)}getIridescenceThicknessMaximum(){return this.get("iridescenceThicknessMaximum")}setIridescenceThicknessMaximum(e){return this.set("iridescenceThicknessMaximum",e)}getIridescenceThicknessTexture(){return this.getRef("iridescenceThicknessTexture")}getIridescenceThicknessTextureInfo(){return this.getRef("iridescenceThicknessTexture")?this.getRef("iridescenceThicknessTextureInfo"):null}setIridescenceThicknessTexture(e){return this.setRef("iridescenceThicknessTexture",e,{channels:Hd})}},Xd=class extends Z{static EXTENSION_NAME=ut;extensionName=ut;prereadTypes=[N.MESH];prewriteTypes=[N.MESH];createIridescence(){return new qd(this.document.getGraph())}read(e){return this}write(e){return this}preread(e){let t=e.jsonDoc,a=t.json.materials||[],s=t.json.textures||[];return a.forEach((r,n)=>{if(r.extensions&&r.extensions.KHR_materials_iridescence){let i=this.createIridescence();e.materials[n].setExtension(ut,i);let o=r.extensions[ut];if(o.extras&&i.setExtras(o.extras),o.iridescenceFactor!==void 0&&i.setIridescenceFactor(o.iridescenceFactor),o.iridescenceIor!==void 0&&i.setIridescenceIOR(o.iridescenceIor),o.iridescenceThicknessMinimum!==void 0&&i.setIridescenceThicknessMinimum(o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&i.setIridescenceThicknessMaximum(o.iridescenceThicknessMaximum),o.iridescenceTexture!==void 0){let c=o.iridescenceTexture,l=e.textures[s[c.index].source];i.setIridescenceTexture(l),e.setTextureInfo(i.getIridescenceTextureInfo(),c)}if(o.iridescenceThicknessTexture!==void 0){let c=o.iridescenceThicknessTexture,l=e.textures[s[c.index].source];i.setIridescenceThicknessTexture(l),e.setTextureInfo(i.getIridescenceThicknessTextureInfo(),c)}}}),this}prewrite(e){let t=e.jsonDoc;return this.document.getRoot().listMaterials().forEach(a=>{let s=a.getExtension(ut);if(s){let r=e.materialIndexMap.get(a),n=t.json.materials[r],i=e.createPropertyDef(s);if(n.extensions=n.extensions||{},n.extensions[ut]=i,s.getIridescenceFactor()>0&&(i.iridescenceFactor=s.getIridescenceFactor()),s.getIridescenceIOR()!==1.3&&(i.iridescenceIor=s.getIridescenceIOR()),s.getIridescenceThicknessMinimum()!==100&&(i.iridescenceThicknessMinimum=s.getIridescenceThicknessMinimum()),s.getIridescenceThicknessMaximum()!==400&&(i.iridescenceThicknessMaximum=s.getIridescenceThicknessMaximum()),s.getIridescenceTexture()){let o=s.getIridescenceTexture(),c=s.getIridescenceTextureInfo();i.iridescenceTexture=e.createTextureInfoDef(o,c)}if(s.getIridescenceThicknessTexture()){let o=s.getIridescenceThicknessTexture(),c=s.getIridescenceThicknessTextureInfo();i.iridescenceThicknessTexture=e.createTextureInfoDef(o,c)}}}),this}},{R:nn,G:on,B:cn,A:dn}=Le,Wd=class extends H{static EXTENSION_NAME=ft;init(){this.extensionName=ft,this.propertyType="PBRSpecularGlossiness",this.parentTypes=[N.MATERIAL]}getDefaults(){return Object.assign(super.getDefaults(),{diffuseFactor:[1,1,1,1],diffuseTexture:null,diffuseTextureInfo:new se(this.graph,"diffuseTextureInfo"),specularFactor:[1,1,1],glossinessFactor:1,specularGlossinessTexture:null,specularGlossinessTextureInfo:new se(this.graph,"specularGlossinessTextureInfo")})}getDiffuseFactor(){return this.get("diffuseFactor")}setDiffuseFactor(e){return this.set("diffuseFactor",e)}getDiffuseTexture(){return this.getRef("diffuseTexture")}getDiffuseTextureInfo(){return this.getRef("diffuseTexture")?this.getRef("diffuseTextureInfo"):null}setDiffuseTexture(e){return this.setRef("diffuseTexture",e,{channels:nn|on|cn|dn,isColor:!0})}getSpecularFactor(){return this.get("specularFactor")}setSpecularFactor(e){return this.set("specularFactor",e)}getGlossinessFactor(){return this.get("glossinessFactor")}setGlossinessFactor(e){return this.set("glossinessFactor",e)}getSpecularGlossinessTexture(){return this.getRef("specularGlossinessTexture")}getSpecularGlossinessTextureInfo(){return this.getRef("specularGlossinessTexture")?this.getRef("specularGlossinessTextureInfo"):null}setSpecularGlossinessTexture(e){return this.setRef("specularGlossinessTexture",e,{channels:nn|on|cn|dn})}},Jd=class extends Z{static EXTENSION_NAME=ft;extensionName=ft;prereadTypes=[N.MESH];prewriteTypes=[N.MESH];createPBRSpecularGlossiness(){return new Wd(this.document.getGraph())}read(e){return this}write(e){return this}preread(e){let t=e.jsonDoc,a=t.json.materials||[],s=t.json.textures||[];return a.forEach((r,n)=>{if(r.extensions&&r.extensions.KHR_materials_pbrSpecularGlossiness){let i=this.createPBRSpecularGlossiness();e.materials[n].setExtension(ft,i);let o=r.extensions[ft];if(o.extras&&i.setExtras(o.extras),o.diffuseFactor!==void 0&&i.setDiffuseFactor(o.diffuseFactor),o.specularFactor!==void 0&&i.setSpecularFactor(o.specularFactor),o.glossinessFactor!==void 0&&i.setGlossinessFactor(o.glossinessFactor),o.diffuseTexture!==void 0){let c=o.diffuseTexture,l=e.textures[s[c.index].source];i.setDiffuseTexture(l),e.setTextureInfo(i.getDiffuseTextureInfo(),c)}if(o.specularGlossinessTexture!==void 0){let c=o.specularGlossinessTexture,l=e.textures[s[c.index].source];i.setSpecularGlossinessTexture(l),e.setTextureInfo(i.getSpecularGlossinessTextureInfo(),c)}}}),this}prewrite(e){let t=e.jsonDoc;return this.document.getRoot().listMaterials().forEach(a=>{let s=a.getExtension(ft);if(s){let r=e.materialIndexMap.get(a),n=t.json.materials[r],i=e.createPropertyDef(s);if(n.extensions=n.extensions||{},n.extensions[ft]=i,i.diffuseFactor=s.getDiffuseFactor(),i.specularFactor=s.getSpecularFactor(),i.glossinessFactor=s.getGlossinessFactor(),s.getDiffuseTexture()){let o=s.getDiffuseTexture(),c=s.getDiffuseTextureInfo();i.diffuseTexture=e.createTextureInfoDef(o,c)}if(s.getSpecularGlossinessTexture()){let o=s.getSpecularGlossinessTexture(),c=s.getSpecularGlossinessTextureInfo();i.specularGlossinessTexture=e.createTextureInfoDef(o,c)}}}),this}},{R:Yd,G:$d,B:Qd,A:Zd}=Le,el=class extends H{static EXTENSION_NAME=ht;init(){this.extensionName=ht,this.propertyType="Sheen",this.parentTypes=[N.MATERIAL]}getDefaults(){return Object.assign(super.getDefaults(),{sheenColorFactor:[0,0,0],sheenColorTexture:null,sheenColorTextureInfo:new se(this.graph,"sheenColorTextureInfo"),sheenRoughnessFactor:0,sheenRoughnessTexture:null,sheenRoughnessTextureInfo:new se(this.graph,"sheenRoughnessTextureInfo")})}getSheenColorFactor(){return this.get("sheenColorFactor")}setSheenColorFactor(e){return this.set("sheenColorFactor",e)}getSheenColorTexture(){return this.getRef("sheenColorTexture")}getSheenColorTextureInfo(){return this.getRef("sheenColorTexture")?this.getRef("sheenColorTextureInfo"):null}setSheenColorTexture(e){return this.setRef("sheenColorTexture",e,{channels:Yd|$d|Qd,isColor:!0})}getSheenRoughnessFactor(){return this.get("sheenRoughnessFactor")}setSheenRoughnessFactor(e){return this.set("sheenRoughnessFactor",e)}getSheenRoughnessTexture(){return this.getRef("sheenRoughnessTexture")}getSheenRoughnessTextureInfo(){return this.getRef("sheenRoughnessTexture")?this.getRef("sheenRoughnessTextureInfo"):null}setSheenRoughnessTexture(e){return this.setRef("sheenRoughnessTexture",e,{channels:Zd})}},tl=class extends Z{static EXTENSION_NAME=ht;extensionName=ht;prereadTypes=[N.MESH];prewriteTypes=[N.MESH];createSheen(){return new el(this.document.getGraph())}read(e){return this}write(e){return this}preread(e){let t=e.jsonDoc,a=t.json.materials||[],s=t.json.textures||[];return a.forEach((r,n)=>{if(r.extensions&&r.extensions.KHR_materials_sheen){let i=this.createSheen();e.materials[n].setExtension(ht,i);let o=r.extensions[ht];if(o.extras&&i.setExtras(o.extras),o.sheenColorFactor!==void 0&&i.setSheenColorFactor(o.sheenColorFactor),o.sheenRoughnessFactor!==void 0&&i.setSheenRoughnessFactor(o.sheenRoughnessFactor),o.sheenColorTexture!==void 0){let c=o.sheenColorTexture,l=e.textures[s[c.index].source];i.setSheenColorTexture(l),e.setTextureInfo(i.getSheenColorTextureInfo(),c)}if(o.sheenRoughnessTexture!==void 0){let c=o.sheenRoughnessTexture,l=e.textures[s[c.index].source];i.setSheenRoughnessTexture(l),e.setTextureInfo(i.getSheenRoughnessTextureInfo(),c)}}}),this}prewrite(e){let t=e.jsonDoc;return this.document.getRoot().listMaterials().forEach(a=>{let s=a.getExtension(ht);if(s){let r=e.materialIndexMap.get(a),n=t.json.materials[r],i=e.createPropertyDef(s);if(n.extensions=n.extensions||{},n.extensions[ht]=i,i.sheenColorFactor=s.getSheenColorFactor(),i.sheenRoughnessFactor=s.getSheenRoughnessFactor(),s.getSheenColorTexture()){let o=s.getSheenColorTexture(),c=s.getSheenColorTextureInfo();i.sheenColorTexture=e.createTextureInfoDef(o,c)}if(s.getSheenRoughnessTexture()){let o=s.getSheenRoughnessTexture(),c=s.getSheenRoughnessTextureInfo();i.sheenRoughnessTexture=e.createTextureInfoDef(o,c)}}}),this}},{R:al,G:sl,B:rl,A:nl}=Le,il=class extends H{static EXTENSION_NAME=bt;init(){this.extensionName=bt,this.propertyType="Specular",this.parentTypes=[N.MATERIAL]}getDefaults(){return Object.assign(super.getDefaults(),{specularFactor:1,specularTexture:null,specularTextureInfo:new se(this.graph,"specularTextureInfo"),specularColorFactor:[1,1,1],specularColorTexture:null,specularColorTextureInfo:new se(this.graph,"specularColorTextureInfo")})}getSpecularFactor(){return this.get("specularFactor")}setSpecularFactor(e){return this.set("specularFactor",e)}getSpecularColorFactor(){return this.get("specularColorFactor")}setSpecularColorFactor(e){return this.set("specularColorFactor",e)}getSpecularTexture(){return this.getRef("specularTexture")}getSpecularTextureInfo(){return this.getRef("specularTexture")?this.getRef("specularTextureInfo"):null}setSpecularTexture(e){return this.setRef("specularTexture",e,{channels:nl})}getSpecularColorTexture(){return this.getRef("specularColorTexture")}getSpecularColorTextureInfo(){return this.getRef("specularColorTexture")?this.getRef("specularColorTextureInfo"):null}setSpecularColorTexture(e){return this.setRef("specularColorTexture",e,{channels:al|sl|rl,isColor:!0})}},ol=class extends Z{static EXTENSION_NAME=bt;extensionName=bt;prereadTypes=[N.MESH];prewriteTypes=[N.MESH];createSpecular(){return new il(this.document.getGraph())}read(e){return this}write(e){return this}preread(e){let t=e.jsonDoc,a=t.json.materials||[],s=t.json.textures||[];return a.forEach((r,n)=>{if(r.extensions&&r.extensions.KHR_materials_specular){let i=this.createSpecular();e.materials[n].setExtension(bt,i);let o=r.extensions[bt];if(o.extras&&i.setExtras(o.extras),o.specularFactor!==void 0&&i.setSpecularFactor(o.specularFactor),o.specularColorFactor!==void 0&&i.setSpecularColorFactor(o.specularColorFactor),o.specularTexture!==void 0){let c=o.specularTexture,l=e.textures[s[c.index].source];i.setSpecularTexture(l),e.setTextureInfo(i.getSpecularTextureInfo(),c)}if(o.specularColorTexture!==void 0){let c=o.specularColorTexture,l=e.textures[s[c.index].source];i.setSpecularColorTexture(l),e.setTextureInfo(i.getSpecularColorTextureInfo(),c)}}}),this}prewrite(e){let t=e.jsonDoc;return this.document.getRoot().listMaterials().forEach(a=>{let s=a.getExtension(bt);if(s){let r=e.materialIndexMap.get(a),n=t.json.materials[r],i=e.createPropertyDef(s);if(n.extensions=n.extensions||{},n.extensions[bt]=i,s.getSpecularFactor()!==1&&(i.specularFactor=s.getSpecularFactor()),re.eq(s.getSpecularColorFactor(),[1,1,1])||(i.specularColorFactor=s.getSpecularColorFactor()),s.getSpecularTexture()){let o=s.getSpecularTexture(),c=s.getSpecularTextureInfo();i.specularTexture=e.createTextureInfoDef(o,c)}if(s.getSpecularColorTexture()){let o=s.getSpecularColorTexture(),c=s.getSpecularColorTextureInfo();i.specularColorTexture=e.createTextureInfoDef(o,c)}}}),this}},{R:cl}=Le,dl=class extends H{static EXTENSION_NAME=gt;init(){this.extensionName=gt,this.propertyType="Transmission",this.parentTypes=[N.MATERIAL]}getDefaults(){return Object.assign(super.getDefaults(),{transmissionFactor:0,transmissionTexture:null,transmissionTextureInfo:new se(this.graph,"transmissionTextureInfo")})}getTransmissionFactor(){return this.get("transmissionFactor")}setTransmissionFactor(e){return this.set("transmissionFactor",e)}getTransmissionTexture(){return this.getRef("transmissionTexture")}getTransmissionTextureInfo(){return this.getRef("transmissionTexture")?this.getRef("transmissionTextureInfo"):null}setTransmissionTexture(e){return this.setRef("transmissionTexture",e,{channels:cl})}},ll=class extends Z{static EXTENSION_NAME=gt;extensionName=gt;prereadTypes=[N.MESH];prewriteTypes=[N.MESH];createTransmission(){return new dl(this.document.getGraph())}read(e){return this}write(e){return this}preread(e){let t=e.jsonDoc,a=t.json.materials||[],s=t.json.textures||[];return a.forEach((r,n)=>{if(r.extensions&&r.extensions.KHR_materials_transmission){let i=this.createTransmission();e.materials[n].setExtension(gt,i);let o=r.extensions[gt];if(o.extras&&i.setExtras(o.extras),o.transmissionFactor!==void 0&&i.setTransmissionFactor(o.transmissionFactor),o.transmissionTexture!==void 0){let c=o.transmissionTexture,l=e.textures[s[c.index].source];i.setTransmissionTexture(l),e.setTextureInfo(i.getTransmissionTextureInfo(),c)}}}),this}prewrite(e){let t=e.jsonDoc;return this.document.getRoot().listMaterials().forEach(a=>{let s=a.getExtension(gt);if(s){let r=e.materialIndexMap.get(a),n=t.json.materials[r],i=e.createPropertyDef(s);if(n.extensions=n.extensions||{},n.extensions[gt]=i,i.transmissionFactor=s.getTransmissionFactor(),s.getTransmissionTexture()){let o=s.getTransmissionTexture(),c=s.getTransmissionTextureInfo();i.transmissionTexture=e.createTextureInfoDef(o,c)}}}),this}},ul=class extends H{static EXTENSION_NAME=Nt;init(){this.extensionName=Nt,this.propertyType="Unlit",this.parentTypes=[N.MATERIAL]}},fl=class extends Z{static EXTENSION_NAME=Nt;extensionName=Nt;prereadTypes=[N.MESH];prewriteTypes=[N.MESH];createUnlit(){return new ul(this.document.getGraph())}read(e){return this}write(e){return this}preread(e){return(e.jsonDoc.json.materials||[]).forEach((t,a)=>{t.extensions&&t.extensions.KHR_materials_unlit&&e.materials[a].setExtension(Nt,this.createUnlit())}),this}prewrite(e){let t=e.jsonDoc;return this.document.getRoot().listMaterials().forEach(a=>{if(a.getExtension("KHR_materials_unlit")){let s=e.materialIndexMap.get(a),r=t.json.materials[s];r.extensions=r.extensions||{},r.extensions[Nt]={}}}),this}},hl=class extends H{static EXTENSION_NAME=_e;init(){this.extensionName=_e,this.propertyType="Mapping",this.parentTypes=["MappingList"]}getDefaults(){return Object.assign(super.getDefaults(),{material:null,variants:new ae})}getMaterial(){return this.getRef("material")}setMaterial(e){return this.setRef("material",e)}addVariant(e){return this.addRef("variants",e)}removeVariant(e){return this.removeRef("variants",e)}listVariants(){return this.listRefs("variants")}},bl=class extends H{static EXTENSION_NAME=_e;init(){this.extensionName=_e,this.propertyType="MappingList",this.parentTypes=[N.PRIMITIVE]}getDefaults(){return Object.assign(super.getDefaults(),{mappings:new ae})}addMapping(e){return this.addRef("mappings",e)}removeMapping(e){return this.removeRef("mappings",e)}listMappings(){return this.listRefs("mappings")}},ln=class extends H{static EXTENSION_NAME=_e;init(){this.extensionName=_e,this.propertyType="Variant",this.parentTypes=["MappingList"]}},gl=class extends Z{extensionName=_e;static EXTENSION_NAME=_e;createMappingList(){return new bl(this.document.getGraph())}createVariant(e=""){return new ln(this.document.getGraph(),e)}createMapping(){return new hl(this.document.getGraph())}listVariants(){return Array.from(this.properties).filter(e=>e instanceof ln)}read(e){let t=e.jsonDoc;if(!t.json.extensions||!t.json.extensions.KHR_materials_variants)return this;let a=(t.json.extensions.KHR_materials_variants.variants||[]).map(s=>this.createVariant().setName(s.name||""));return(t.json.meshes||[]).forEach((s,r)=>{let n=e.meshes[r];(s.primitives||[]).forEach((i,o)=>{if(!i.extensions||!i.extensions.KHR_materials_variants)return;let c=this.createMappingList(),l=i.extensions[_e];for(let p of l.mappings){let g=this.createMapping();p.material!==void 0&&g.setMaterial(e.materials[p.material]);for(let w of p.variants||[])g.addVariant(a[w]);c.addMapping(g)}n.listPrimitives()[o].setExtension(_e,c)})}),this}write(e){let t=e.jsonDoc,a=this.listVariants();if(!a.length)return this;let s=[],r=new Map;for(let n of a)r.set(n,s.length),s.push(e.createPropertyDef(n));for(let n of this.document.getRoot().listMeshes()){let i=e.meshIndexMap.get(n);n.listPrimitives().forEach((o,c)=>{let l=o.getExtension(_e);if(!l)return;let p=e.jsonDoc.json.meshes[i].primitives[c],g=l.listMappings().map(w=>{let y=e.createPropertyDef(w),f=w.getMaterial();return f&&(y.material=e.materialIndexMap.get(f)),y.variants=w.listVariants().map(d=>r.get(d)),y});p.extensions=p.extensions||{},p.extensions[_e]={mappings:g}})}return t.json.extensions=t.json.extensions||{},t.json.extensions[_e]={variants:s},this}},{G:pl}=Le,ml=class extends H{static EXTENSION_NAME=pt;init(){this.extensionName=pt,this.propertyType="Volume",this.parentTypes=[N.MATERIAL]}getDefaults(){return Object.assign(super.getDefaults(),{thicknessFactor:0,thicknessTexture:null,thicknessTextureInfo:new se(this.graph,"thicknessTexture"),attenuationDistance:1/0,attenuationColor:[1,1,1]})}getThicknessFactor(){return this.get("thicknessFactor")}setThicknessFactor(e){return this.set("thicknessFactor",e)}getThicknessTexture(){return this.getRef("thicknessTexture")}getThicknessTextureInfo(){return this.getRef("thicknessTexture")?this.getRef("thicknessTextureInfo"):null}setThicknessTexture(e){return this.setRef("thicknessTexture",e,{channels:pl})}getAttenuationDistance(){return this.get("attenuationDistance")}setAttenuationDistance(e){return this.set("attenuationDistance",e)}getAttenuationColor(){return this.get("attenuationColor")}setAttenuationColor(e){return this.set("attenuationColor",e)}},xl=class extends Z{static EXTENSION_NAME=pt;extensionName=pt;prereadTypes=[N.MESH];prewriteTypes=[N.MESH];createVolume(){return new ml(this.document.getGraph())}read(e){return this}write(e){return this}preread(e){let t=e.jsonDoc,a=t.json.materials||[],s=t.json.textures||[];return a.forEach((r,n)=>{if(r.extensions&&r.extensions.KHR_materials_volume){let i=this.createVolume();e.materials[n].setExtension(pt,i);let o=r.extensions[pt];if(o.extras&&i.setExtras(o.extras),o.thicknessFactor!==void 0&&i.setThicknessFactor(o.thicknessFactor),o.attenuationDistance!==void 0&&i.setAttenuationDistance(o.attenuationDistance),o.attenuationColor!==void 0&&i.setAttenuationColor(o.attenuationColor),o.thicknessTexture!==void 0){let c=o.thicknessTexture,l=e.textures[s[c.index].source];i.setThicknessTexture(l),e.setTextureInfo(i.getThicknessTextureInfo(),c)}}}),this}prewrite(e){let t=e.jsonDoc;return this.document.getRoot().listMaterials().forEach(a=>{let s=a.getExtension(pt);if(s){let r=e.materialIndexMap.get(a),n=t.json.materials[r],i=e.createPropertyDef(s);if(n.extensions=n.extensions||{},n.extensions[pt]=i,s.getThicknessFactor()>0&&(i.thicknessFactor=s.getThicknessFactor()),Number.isFinite(s.getAttenuationDistance())&&(i.attenuationDistance=s.getAttenuationDistance()),re.eq(s.getAttenuationColor(),[1,1,1])||(i.attenuationColor=s.getAttenuationColor()),s.getThicknessTexture()){let o=s.getThicknessTexture(),c=s.getThicknessTextureInfo();i.thicknessTexture=e.createTextureInfoDef(o,c)}}}),this}},yl=class extends Z{extensionName=qr;static EXTENSION_NAME=qr;read(e){return this}write(e){return this}},js=class extends Z{extensionName=Xr;static EXTENSION_NAME=Xr;read(e){return this}write(e){return this}},vl=class extends H{static EXTENSION_NAME=mt;init(){this.extensionName=mt,this.propertyType="Visibility",this.parentTypes=[N.NODE]}getDefaults(){return Object.assign(super.getDefaults(),{visible:!0})}getVisible(){return this.get("visible")}setVisible(e){return this.set("visible",e)}},wl=class extends Z{static EXTENSION_NAME=mt;extensionName=mt;createVisibility(){return new vl(this.document.getGraph())}read(e){return(e.jsonDoc.json.nodes||[]).forEach((t,a)=>{if(t.extensions&&t.extensions.KHR_node_visibility){let s=this.createVisibility();e.nodes[a].setExtension(mt,s);let r=t.extensions[mt];r.visible!==void 0&&s.setVisible(r.visible)}}),this}write(e){let t=e.jsonDoc;for(let a of this.document.getRoot().listNodes()){let s=a.getExtension(mt);if(!s)continue;let r=e.nodeIndexMap.get(a),n=t.json.nodes[r];n.extensions=n.extensions||{},n.extensions[mt]={visible:s.getVisible()}}return this}};function Tl(e){return e.vkFormat>0&&e.vkFormat<=123}function un(e){let t=e.vkFormat===1000066e3&&e.dataFormatDescriptor[0].colorModel===167;return e.vkFormat===0||t}var El=class{match(e){return e[0]===171&&e[1]===75&&e[2]===84&&e[3]===88&&e[4]===32&&e[5]===50&&e[6]===48&&e[7]===187&&e[8]===13&&e[9]===10&&e[10]===26&&e[11]===10}getSize(e){let t=Ia(e);return[t.pixelWidth,t.pixelHeight]}getChannels(e){let t=Ia(e),a=t.dataFormatDescriptor[0];if(Tl(t))return a.samples.length;if(un(t))switch(a.colorModel){case 163:return a.samples.length===2&&(a.samples[1].channelType&15)===15?4:3;case 166:return(a.samples[0].channelType&15)===3?4:3;default:throw new Error(`Unexpected KTX2 colorModel, "${a.colorModel}".`)}throw new Error(`Unexpected KTX2 vkFormat, "${t.vkFormat}".`)}getVRAMByteLength(e){let t=Ia(e),a=0;if(un(t)){let s=this.getChannels(e)>3;for(let r=0;r<t.levels.length;r++){let n=t.levels[r];if(n.uncompressedByteLength)a+=n.uncompressedByteLength;else{let i=Math.max(1,Math.floor(t.pixelWidth/Math.pow(2,r))),o=Math.max(1,Math.floor(t.pixelHeight/Math.pow(2,r))),c=s?16:8;a+=i/4*(o/4)*c}}}else for(let s of t.levels)t.supercompressionScheme===0?a+=s.levelData.byteLength:a+=s.uncompressedByteLength;return a}},kl=class extends Z{static EXTENSION_NAME=Sa;extensionName=Sa;prereadTypes=[N.TEXTURE];static register(){qe.registerFormat("image/ktx2",new El)}preread(e){return e.jsonDoc.json.textures&&e.jsonDoc.json.textures.forEach(t=>{t.extensions&&t.extensions.KHR_texture_basisu&&(t.source=t.extensions[Sa].source)}),this}read(e){return this}write(e){let t=e.jsonDoc;return this.document.getRoot().listTextures().forEach(a=>{if(a.getMimeType()==="image/ktx2"){let s=e.imageIndexMap.get(a);t.json.textures.forEach(r=>{r.source===s&&(r.extensions=r.extensions||{},r.extensions[Sa]={source:r.source},delete r.source)})}}),this}},Rl=class extends H{static EXTENSION_NAME=xt;init(){this.extensionName=xt,this.propertyType="Transform",this.parentTypes=[N.TEXTURE_INFO]}getDefaults(){return Object.assign(super.getDefaults(),{offset:[0,0],rotation:0,scale:[1,1],texCoord:null})}getOffset(){return this.get("offset")}setOffset(e){return this.set("offset",e)}getRotation(){return this.get("rotation")}setRotation(e){return this.set("rotation",e)}getScale(){return this.get("scale")}setScale(e){return this.set("scale",e)}getTexCoord(){return this.get("texCoord")}setTexCoord(e){return this.set("texCoord",e)}},Il=class extends Z{extensionName=xt;static EXTENSION_NAME=xt;createTransform(){return new Rl(this.document.getGraph())}read(e){for(let[t,a]of Array.from(e.textureInfos.entries())){if(!a.extensions||!a.extensions.KHR_texture_transform)continue;let s=this.createTransform(),r=a.extensions[xt];r.offset!==void 0&&s.setOffset(r.offset),r.rotation!==void 0&&s.setRotation(r.rotation),r.scale!==void 0&&s.setScale(r.scale),r.texCoord!==void 0&&s.setTexCoord(r.texCoord),t.setExtension(xt,s)}return this}write(e){let t=Array.from(e.textureInfoDefMap.entries());for(let[a,s]of t){let r=a.getExtension(xt);if(!r)continue;s.extensions=s.extensions||{};let n={},i=re.eq;i(r.getOffset(),[0,0])||(n.offset=r.getOffset()),r.getRotation()!==0&&(n.rotation=r.getRotation()),i(r.getScale(),[1,1])||(n.scale=r.getScale()),r.getTexCoord()!=null&&(n.texCoord=r.getTexCoord()),s.extensions[xt]=n}return this}},Ml=[N.ROOT,N.SCENE,N.NODE,N.MESH,N.MATERIAL,N.TEXTURE,N.ANIMATION],Al=class extends H{static EXTENSION_NAME=Ke;init(){this.extensionName=Ke,this.propertyType="Packet",this.parentTypes=Ml}getDefaults(){return Object.assign(super.getDefaults(),{context:{},properties:{}})}getContext(){return this.get("context")}setContext(e){return this.set("context",{...e})}listProperties(){return Object.keys(this.get("properties"))}getProperty(e){let t=this.get("properties");return e in t?t[e]:null}setProperty(e,t){this._assertContext(e);let a={...this.get("properties")};return t?a[e]=t:delete a[e],this.set("properties",a)}toJSONLD(){return{"@context":Is(this.get("context")),...Is(this.get("properties"))}}fromJSONLD(e){e=Is(e);let t=e["@context"];return t&&this.set("context",t),delete e["@context"],this.set("properties",e)}_assertContext(e){if(!(e.split(":")[0]in this.get("context")))throw new Error(`${Ke}: Missing context for term, "${e}".`)}};function Is(e){return JSON.parse(JSON.stringify(e))}var Sl=class extends Z{extensionName=Ke;static EXTENSION_NAME=Ke;createPacket(){return new Al(this.document.getGraph())}listPackets(){return Array.from(this.properties)}read(e){let t=e.jsonDoc.json.extensions?.[Ke];if(!t||!t.packets)return this;let a=e.jsonDoc.json,s=this.document.getRoot(),r=t.packets.map(o=>this.createPacket().fromJSONLD(o)),n=[[a.asset],a.scenes,a.nodes,a.meshes,a.materials,a.images,a.animations],i=[[s],s.listScenes(),s.listNodes(),s.listMeshes(),s.listMaterials(),s.listTextures(),s.listAnimations()];for(let o=0;o<n.length;o++){let c=n[o]||[];for(let l=0;l<c.length;l++){let p=c[l];if(p.extensions&&p.extensions.KHR_xmp_json_ld){let g=p.extensions[Ke];i[o][l].setExtension(Ke,r[g.packet])}}}return this}write(e){let{json:t}=e.jsonDoc,a=[];for(let s of this.properties){a.push(s.toJSONLD());for(let r of s.listParents()){let n;switch(r.propertyType){case N.ROOT:n=t.asset;break;case N.SCENE:n=t.scenes[e.sceneIndexMap.get(r)];break;case N.NODE:n=t.nodes[e.nodeIndexMap.get(r)];break;case N.MESH:n=t.meshes[e.meshIndexMap.get(r)];break;case N.MATERIAL:n=t.materials[e.materialIndexMap.get(r)];break;case N.TEXTURE:n=t.images[e.imageIndexMap.get(r)];break;case N.ANIMATION:n=t.animations[e.animationIndexMap.get(r)];break;default:n=null,this.document.getLogger().warn(`[${Ke}]: Unsupported parent property, "${r.propertyType}"`);break}n&&(n.extensions=n.extensions||{},n.extensions[Ke]={packet:a.length-1})}}return a.length>0&&(t.extensions=t.extensions||{},t.extensions[Ke]={packets:a}),this}},_l=[ld,ud,wd,Ed,Ad,Nd,Pd,Ud,Kd,zd,Xd,Jd,ol,tl,ll,fl,gl,xl,yl,js,wl,kl,Il,Sl],gb=[dc,_s,Ns,Cc,od,dd,..._l];var Cg=(function(){var e="b9H79Tebbbe9ok9Geueu9Geub9Gbb9Gruuuuuuueu9Gvuuuuueu9Gduueu9Gluuuueu9Gvuuuuub9Gouuuuuub9Gluuuub9Giuuueui8AYdilveoveovrrwrrDDoDrbqqbelve9Weiiviebeoweuec;G:Qdkr:nlAo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8F9TW79O9V9Wt9FW9U9J9V9KW9wWVtW949c919M9MWV9mW4W2be8A9TW79O9V9Wt9FW9U9J9V9KW9wWVtW949c919M9MWVbd8F9TW79O9V9Wt9FW9U9J9V9KW9wWVtW949c919M9MWV9c9V919U9KbiE9TW79O9V9Wt9FW9U9J9V9KW9wWVtW949wWV79P9V9UblY9TW79O9V9Wt9FW9U9J9V9KW69U9KW949c919M9MWVbv8E9TW79O9V9Wt9FW9U9J9V9KW69U9KW949c919M9MWV9c9V919U9Kbo8A9TW79O9V9Wt9FW9U9J9V9KW69U9KW949wWV79P9V9UbrE9TW79O9V9Wt9FW9U9J9V9KW69U9KW949tWG91W9U9JWbwa9TW79O9V9Wt9FW9U9J9V9KW69U9KW949tWG91W9U9JW9c9V919U9KbDL9TW79O9V9Wt9FW9U9J9V9KWS9P2tWV9p9JtbqK9TW79O9V9Wt9FW9U9J9V9KWS9P2tWV9r919HtbkL9TW79O9V9Wt9FW9U9J9V9KWS9P2tWVT949WbxE9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94J9H9J9OWbsa9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94J9H9J9OW9ttV9P9Wbza9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94SWt9J9O9sW9T9H9WbHK9TW79O9V9Wt9F79W9Ht9P9H29t9VVt9sW9T9H9WbOl79IV9RbCDwebcekdKLqN9OYdbk:Bhdhud9:8Jjjjjbc;qw9Rgr8KjjjjbcbhwdnaeTmbabcbyd;C:kjjbaoaocb9iEgDc:GeV86bbarc;adfcbcjdz:wjjjb8AdnaiTmbarc;adfadalz:vjjjb8Akarc;abfalfcbcbcjdal9RalcFe0Ez:wjjjb8Aarc;abfarc;adfalz:vjjjb8AarcUf9cb83ibarc8Wf9cb83ibarcyf9cb83ibarcaf9cb83ibarcKf9cb83ibarczf9cb83ibar9cb83iwar9cb83ibcj;abal9Uc;WFbGcjdalca0Ehqdnaicd6mbavcd9imbaDTmbadcefhkaqci2gxal2hmarc;alfclfhParc;qlfceVhsarc;qofclVhzarc;qofcKfhHarc;qofczfhOcbhAincdhCcbhodnavci6mbaH9cb83ibaO9cb83ibar9cb83i;yoar9cb83i;qoadaAfgoybbhXcbhQincbhwcbhLdninaoalfhKaoybbgYaX7aLVhLawcP0meaKhoaYhXawcefgwaQfai6mbkkcbhXarc;qofhwincwh8AcwhEdnaLaX93gocFeGg3cs0mbclhEa3ci0mba3cb9hcethEkdnaocw4cFeGg3cs0mbclh8Aa3ci0mba3cb9hceth8Aka8AaEfh3awydbh5cwh8AcwhEdnaocz4cFeGg8Ecs0mbclhEa8Eci0mba8Ecb9hcethEka3a5fh3dnaocFFFFb0mbclh8AaocFFF8F0mbaocFFFr0ceth8Akawa3aEfa8AfBdbawclfhwaXcefgXcw9hmbkaKhoaYhXaQczfgQai6mbkcbhocehwazhLinawaoaLydbarc;qofaocdtfydb6EhoaLclfhLawcefgwcw9hmbkcihCkcbh3arc;qlfcbcjdz:wjjjb8Aarc;alfcwfcbBdbar9cb83i;alaoclth8Fadhaaqhhakh5inarc;qlfadcba3cufgoaoa30Eal2falz:vjjjb8Aaiahaiah6Ehgdnaqaia39Ra3aqfai6EgYcsfc9WGgoaY9nmbarc;qofaYfcbaoaY9Rz:wjjjb8Akada3al2fh8Jcbh8Kina8Ka8FVcl4hQarc;alfa8Kcdtfh8LaAh8Mcbh8Nina8NaAfhwdndndndndndna8KPldebidkasa8Mc98GgLfhoa5aLfh8Aarc;qlfawc98GgLfRbbhXcwhwinaoRbbawtaXVhXaocefhoawcwfgwca9hmbkaYTmla8Ncith8Ea8JaLfhEcbhKinaERbbhLcwhoa8AhwinawRbbaotaLVhLawcefhwaocwfgoca9hmbkarc;qofaKfaLaX7aQ93a8E486bba8Aalfh8AaEalfhEaLhXaKcefgKaY9hmbxlkkaYTmia8Mc9:Ghoa8NcitcwGhEarc;qlfawceVfRbbcwtarc;qlfawc9:GfRbbVhLarc;qofhwaghXinawa5aofRbbcwtaaaofRbbVg8AaL9RgLcetaLcztcz91cs47cFFiGaE486bbaoalfhoawcefhwa8AhLa3aXcufgX9hmbxikkaYTmda8Jawfhoarc;qlfawfRbbhLarc;qofhwaghXinawaoRbbg8AaL9RgLcetaLcKtcK91cr4786bbawcefhwaoalfhoa8AhLa3aXcufgX9hmbxdkkaYTmeka8LydbhEcbhKarc;qofhoincdhLcbhwinaLaoawfRbbcb9hfhLawcefgwcz9hmbkclhXcbhwinaXaoawfRbbcd0fhXawcefgwcz9hmbkcwh8Acbhwina8AaoawfRbbcP0fh8Aawcefgwcz9hmbkaLaXaLaX6Egwa8Aawa8A6Egwczawcz6EaEfhEaoczfhoaKczfgKaY6mbka8LaEBdbka8Mcefh8Ma8Ncefg8Ncl9hmbka8Kcefg8KaC9hmbkaaamfhaahaxfhha5amfh5a3axfg3ai6mbkcbhocehwaPhLinawaoaLydbarc;alfaocdtfydb6EhoaLclfhLawcefgXhwaCaX9hmbkaraAcd4fa8FcdVaoaocdSE86bbaAclfgAal6mbkkabaefh8Kabcefhoalcd4gecbaDEhkadcefhOarc;abfceVhHcbhmdndninaiam9nmearc;qofcbcjdz:wjjjb8Aa8Kao9Rak6mdadamal2gwfhxcbh8JaOawfhzaocbakz:wjjjbghakfh5aqaiam9Ramaqfai6Egscsfgocl4cifcd4hCaoc9WGg8LThPindndndndndndndndndndnaDTmbara8Jcd4fRbbgLciGPlbedlbkasTmdaxa8Jfhoarc;abfa8JfRbbhLarc;qofhwashXinawaoRbbg8AaL9RgLcetaLcKtcK91cr4786bbawcefhwaoalfhoa8AhLaXcufgXmbxikkasTmia8JcitcwGhEarc;abfa8JceVfRbbcwtarc;abfa8Jc9:GgofRbbVhLaxaofhoarc;qofhwashXinawao8Vbbg8AaL9RgLcetaLcztcz91cs47cFFiGaE486bbawcefhwaoalfhoa8AhLaXcufgXmbxdkkaHa8Jc98GgEfhoazaEfh8Aarc;abfaEfRbbhXcwhwinaoRbbawtaXVhXaocefhoawcwfgwca9hmbkasTmbaLcl4hYa8JcitcKGh3axaEfhEcbhKinaERbbhLcwhoa8AhwinawRbbaotaLVhLawcefhwaocwfgoca9hmbkarc;qofaKfaLaX7aY93a3486bba8Aalfh8AaEalfhEaLhXaKcefgKas9hmbkkaDmbcbhoxlka8LTmbcbhodninarc;qofaofgwcwf8Pibaw8Pib:e9qTmeaoczfgoa8L9pmdxbkkdnavmbcehoxikcbhEaChKaChYinarc;qofaEfgocwf8Pibhyao8Pibh8PcdhLcbhwinaLaoawfRbbcb9hfhLawcefgwcz9hmbkclhXcbhwinaXaoawfRbbcd0fhXawcefgwcz9hmbkcwh8Acbhwina8AaoawfRbbcP0fh8Aawcefgwcz9hmbkaLaXaLaX6Egoa8Aaoa8A6Egoczaocz6EaYfhYaocucbaya8P:e9cb9sEgwaoaw6EaKfhKaEczfgEa8L9pmdxbkkaha8Jcd4fgoaoRbbcda8JcetcoGtV86bbxikdnaKas6mbaYas6mbaha8Jcd4fgoaoRbbcia8JcetcoGtV86bba8Ka59Ras6mra5arc;qofasz:vjjjbasfh5xikaKaY9phokaha8Jcd4fgwawRbbaoa8JcetcoGtV86bbka8Ka59RaC6mla5cbaCz:wjjjbgAaCfhYdndna8LmbaPhoxekdna8KaY9RcK9pmbaPhoxekaocdtc:q1jjbfcj1jjbaDEg5ydxggcetc;:FFFeGh8Fcuh3cuagtcu7cFeGhacbh8Marc;qofhLinarc;qofa8MfhQczhEdndndnagPDbeeeeeeedekcucbaQcwf8PibaQ8Pib:e9cb9sEhExekcbhoa8FhEinaEaaaLaofRbb9nfhEaocefgocz9hmbkkcih8Ecbh8Ainczhwdndndna5a8AcdtfydbgKPDbeeeeeeedekcucbaQcwf8PibaQ8Pib:e9cb9sEhwxekaKcetc;:FFFeGhwcuaKtcu7cFeGhXcbhoinawaXaLaofRbb9nfhwaocefgocz9hmbkkdndnawaE6mbaKa39hmeawaE9hmea5a8EcdtfydbcwSmeka8Ah8EawhEka8Acefg8Aci9hmbkaAa8Mco4fgoaoRbba8Ea8Mci4coGtV86bbdndndna5a8Ecdtfydbg3PDdbbbbbbbebkdncwa39Tg8ETmbcua3tcu7hwdndna3ceSmbcbh8NaLhQinaQhoa8Eh8AcbhXinaoRbbgEawcFeGgKaEaK6EaXa3tVhXaocefhoa8Acufg8AmbkaYaX86bbaQa8EfhQaYcefhYa8Na8Efg8Ncz6mbxdkkcbh8NaLhQinaQhoa8Eh8AcbhXinaoRbbgEawcFeGgKaEaK6EaXcetVhXaocefhoa8Acufg8AmbkaYaX:T9cFe:d9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:9ca188bbaQa8EfhQaYcefhYa8Na8Efg8Ncz6mbkkcbhoinaYaLaofRbbgX86bbaYaXawcFeG9pfhYaocefgocz9hmbxikkdna3ceSmbinaYcb86bbaYcefhYxbkkinaYcb86bbaYcefhYxbkkaYaQ8Pbb83bbaYcwfaQcwf8Pbb83bbaYczfhYka8Mczfg8Ma8L9pgomeaLczfhLa8KaY9RcK9pmbkkaoTmlaYh5aYTmlka8Jcefg8Jal9hmbkarc;abfaxascufal2falz:vjjjb8Aasamfhma5hoa5mbkcbhwxdkdna8Kao9RakalfgwcKcaaDEgLawaL0EgX9pmbcbhwxdkdnawaL9pmbaocbaXaw9Rgwz:wjjjbawfhokaoarc;adfalz:vjjjbalfhodnaDTmbaoaraez:vjjjbaefhokaoab9Rhwxekcbhwkarc;qwf8Kjjjjbawk5babaeadaialcdcbyd;C:kjjbz:bjjjbk9reduaecd4gdaefgicaaica0Eabcj;abae9Uc;WFbGcjdaeca0Egifcufai9Uae2aiadfaicl4cifcd4f2fcefkmbcbabBd;C:kjjbk:Ese5u8Jjjjjbc;ae9Rgl8Kjjjjbcbhvdnaici9UgocHfae0mbabcbyd;m:kjjbgrc;GeV86bbalc;abfcFecjez:wjjjb8AalcUfgw9cu83ibalc8WfgD9cu83ibalcyfgq9cu83ibalcafgk9cu83ibalcKfgx9cu83ibalczfgm9cu83ibal9cu83iwal9cu83ibabaefc9WfhPabcefgsaofhednaiTmbcmcsarcb9kgzEhHcbhOcbhAcbhCcbhXcbhQindnaeaP9nmbcbhvxikaQcufhvadaCcdtfgLydbhKaLcwfydbhYaLclfydbh8AcbhEdndndninalc;abfavcsGcitfgoydlh3dndndnaoydbgoaK9hmba3a8ASmekdnaoa8A9hmba3aY9hmbaEcefhExekaoaY9hmea3aK9hmeaEcdfhEkaEc870mdaXcufhvaLaEciGcx2goc;i1jjbfydbcdtfydbh3aLaoc;e1jjbfydbcdtfydbh8AaLaoc;a1jjbfydbcdtfydbhKcbhodnindnalavcsGcdtfydba39hmbaohYxdkcuhYavcufhvaocefgocz9hmbkkaOa3aOSgvaYce9iaYaH9oVgoGfhOdndndncbcsavEaYaoEgvcs9hmbarce9imba3a3aAa3cefaASgvEgAcefSmecmcsavEhvkasavaEcdtc;WeGV86bbavcs9hmea3aA9Rgvcetavc8F917hvinaeavcFb0crtavcFbGV86bbaecefheavcje6hoavcr4hvaoTmbka3hAxvkcPhvasaEcdtcPV86bba3hAkavTmiavaH9omicdhocehEaQhYxlkavcufhvaEclfgEc;ab9hmbkkdnaLceaYaOSceta8AaOSEcx2gvc;a1jjbfydbcdtfydbgKTaLavc;e1jjbfydbcdtfydbg8AceSGaLavc;i1jjbfydbcdtfydbg3cdSGaOcb9hGazGg5ce9hmbaw9cu83ibaD9cu83ibaq9cu83ibak9cu83ibax9cu83ibam9cu83ibal9cu83iwal9cu83ibcbhOkcbhEaXcufgvhodnindnalaocsGcdtfydba8A9hmbaEhYxdkcuhYaocufhoaEcefgEcz9hmbkkcbhodnindnalavcsGcdtfydba39hmbaohExdkcuhEavcufhvaocefgocz9hmbkkaOaKaOSg8EfhLdndnaYcm0mbaYcefhYxekcbcsa8AaLSgvEhYaLavfhLkdndnaEcm0mbaEcefhExekcbcsa3aLSgvEhEaLavfhLkc9:cua8EEh8FcbhvaEaYcltVgacFeGhodndndninavc:W1jjbfRbbaoSmeavcefgvcz9hmbxdkka5aKaO9havcm0VVmbasavc;WeV86bbxekasa8F86bbaeaa86bbaecefhekdna8EmbaKaA9Rgvcetavc8F917hvinaeavcFb0gocrtavcFbGV86bbavcr4hvaecefheaombkaKhAkdnaYcs9hmba8AaA9Rgvcetavc8F917hvinaeavcFb0gocrtavcFbGV86bbavcr4hvaecefheaombka8AhAkdnaEcs9hmba3aA9Rgvcetavc8F917hvinaeavcFb0gocrtavcFbGV86bbavcr4hvaecefheaombka3hAkalaXcdtfaKBdbaXcefcsGhvdndnaYPzbeeeeeeeeeeeeeebekalavcdtfa8ABdbaXcdfcsGhvkdndnaEPzbeeeeeeeeeeeeeebekalavcdtfa3BdbavcefcsGhvkcihoalc;abfaQcitfgEaKBdlaEa8ABdbaQcefcsGhYcdhEavhXaLhOxekcdhoalaXcdtfa3BdbcehEaXcefcsGhXaQhYkalc;abfaYcitfgva8ABdlava3Bdbalc;abfaQaEfcsGcitfgva3BdlavaKBdbascefhsaQaofcsGhQaCcifgCai6mbkkdnaeaP9nmbcbhvxekcbhvinaeavfavc:W1jjbfRbb86bbavcefgvcz9hmbkaeab9Ravfhvkalc;aef8KjjjjbavkZeeucbhddninadcefgdc8F0meceadtae6mbkkadcrfcFeGcr9Uci2cdfabci9U2cHfkmbcbabBd;m:kjjbk:Adewu8Jjjjjbcz9Rhlcbhvdnaicvfae0mbcbhvabcbRb;m:kjjbc;qeV86bbal9cb83iwabcefhoabaefc98fhrdnaiTmbcbhwcbhDindnaoar6mbcbskadaDcdtfydbgqalcwfawaqav9Rgvavc8F91gv7av9Rc507gwcdtfgkydb9Rgvc8E91c9:Gavcdt7awVhvinaoavcFb0gecrtavcFbGV86bbavcr4hvaocefhoaembkakaqBdbaqhvaDcefgDai9hmbkkdnaoar9nmbcbskaocbBbbaoab9RclfhvkavkBeeucbhddninadcefgdc8F0meceadtae6mbkkadcwfcFeGcr9Uab2cvfk:bvli99dui99ludnaeTmbcuadcetcuftcu7:Zhvdndncuaicuftcu7:ZgoJbbbZMgr:lJbbb9p9DTmbar:Ohwxekcjjjj94hwkcbhicbhDinalclfIdbgrJbbbbJbbjZalIdbgq:lar:lMalcwfIdbgk:lMgr:varJbbbb9BEgrNhxaqarNhrdndnakJbbbb9GTmbaxhqxekJbbjZar:l:tgqaq:maxJbbbb9GEhqJbbjZax:l:tgxax:marJbbbb9GEhrkdndnalcxfIdbgxJbbj:;axJbbj:;9GEgkJbbjZakJbbjZ9FEavNJbbbZJbbb:;axJbbbb9GEMgx:lJbbb9p9DTmbax:Ohmxekcjjjj94hmkdndnaqJbbj:;aqJbbj:;9GEgxJbbjZaxJbbjZ9FEaoNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:OhPxekcjjjj94hPkdndnarJbbj:;arJbbj:;9GEgqJbbjZaqJbbjZ9FEaoNJbbbZJbbb:;arJbbbb9GEMgr:lJbbb9p9DTmbar:Ohsxekcjjjj94hskdndnadcl9hmbabaifgzas86bbazcifam86bbazcdfaw86bbazcefaP86bbxekabaDfgzas87ebazcofam87ebazclfaw87ebazcdfaP87ebkalczfhlaiclfhiaDcwfhDaecufgembkkk;hlld99eud99eudnaeTmbdndncuaicuftcu7:ZgvJbbbZMgo:lJbbb9p9DTmbao:Ohixekcjjjj94hikaic;8FiGhrinabcofcicdalclfIdb:lalIdb:l9EgialcwfIdb:lalaicdtfIdb:l9EEgialcxfIdb:lalaicdtfIdb:l9EEgiarV87ebdndnJbbj:;JbbjZalaicdtfIdbJbbbb9DEgoalaicd7cdtfIdbJ;Zl:1ZNNgwJbbj:;awJbbj:;9GEgDJbbjZaDJbbjZ9FEavNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohqxekcjjjj94hqkabcdfaq87ebdndnalaicefciGcdtfIdbJ;Zl:1ZNaoNgwJbbj:;awJbbj:;9GEgDJbbjZaDJbbjZ9FEavNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohqxekcjjjj94hqkabaq87ebdndnaoalaicufciGcdtfIdbJ;Zl:1ZNNgoJbbj:;aoJbbj:;9GEgwJbbjZawJbbjZ9FEavNJbbbZJbbb:;aoJbbbb9GEMgo:lJbbb9p9DTmbao:Ohixekcjjjj94hikabclfai87ebabcwfhbalczfhlaecufgembkkk;3viDue99eu8Jjjjjbcjd9Rgo8Kjjjjbadcd4hrdndndndnavcd9hmbadcl6meaohwarhDinawc:CuBdbawclfhwaDcufgDmbkaeTmiadcl6mdarcdthqalhkcbhxinaohwakhDarhminawawydbgPcbaDIdbgs:8cL4cFeGc:cufasJbbbb9BEgzaPaz9kEBdbaDclfhDawclfhwamcufgmmbkakaqfhkaxcefgxaeSmixbkkaeTmdxekaeTmekarcdthkavce9hhqadcl6hdcbhxindndndnaqmbadmdc:CuhDalhwarhminaDcbawIdbgs:8cL4cFeGc:cufasJbbbb9BEgPaDaP9kEhDawclfhwamcufgmmbxdkkc:CuhDdndnavPleddbdkadmdaohwalhmarhPinawcbamIdbgs:8cL4cFeGgzc;:bazc;:b0Ec:cufasJbbbb9BEBdbamclfhmawclfhwaPcufgPmbxdkkadmecbhwarhminaoawfcbalawfIdbgs:8cL4cFeGgPc8AaPc8A0Ec:cufasJbbbb9BEBdbawclfhwamcufgmmbkkadmbcbhwarhPinaDhmdnavceSmbaoawfydbhmkdndnalawfIdbgscjjj;8iamai9RcefgmcLt9R::NJbbbZJbbb:;asJbbbb9GEMgs:lJbbb9p9DTmbas:Ohzxekcjjjj94hzkabawfazcFFFrGamcKtVBdbawclfhwaPcufgPmbkkabakfhbalakfhlaxcefgxae9hmbkkaocjdf8Kjjjjbk;YqdXui998Jjjjjbc:qd9Rgv8Kjjjjbavc:Sefcbc;Kbz:wjjjb8AcbhodnadTmbcbhoaiTmbdndnabaeSmbaehrxekavcuadcdtgwadcFFFFi0Ecbyd;u:kjjbHjjjjbbgrBd:SeavceBd:mdaraeawz:vjjjb8Akavc:GefcwfcbBdbav9cb83i:Geavc:Gefaradaiavc:Sefz:ojjjbavyd:GehDadci9Ugqcbyd;u:kjjbHjjjjbbheavc:Sefavyd:mdgkcdtfaeBdbavakcefgwBd:mdaecbaqz:wjjjbhxavc:SefawcdtfcuaicdtaicFFFFi0Ecbyd;u:kjjbHjjjjbbgmBdbavakcdfgPBd:mdalc;ebfhsaDheamhwinawalIdbasaeydbgzcwazcw6EcdtfIdbMUdbaeclfheawclfhwaicufgimbkavc:SefaPcdtfcuaqcdtadcFFFF970Ecbyd;u:kjjbHjjjjbbgPBdbdnadci6mbarheaPhwaqhiinawamaeydbcdtfIdbamaeclfydbcdtfIdbMamaecwfydbcdtfIdbMUdbaecxfheawclfhwaicufgimbkkakcifhoalc;ebfhHavc;qbfhOavheavyd:KehAavyd:OehCcbhzcbhwcbhXcehQinaehLcihkarawci2gKcdtfgeydbhsaeclfydbhdabaXcx2fgicwfaecwfydbgYBdbaiclfadBdbaiasBdbaxawfce86bbaOaYBdwaOadBdlaOasBdbaPawcdtfcbBdbdnazTmbcihkaLhiinaOakcdtfaiydbgeBdbakaeaY9haeas9haead9hGGfhkaiclfhiazcufgzmbkkaXcefhXcbhzinaCaAarazaKfcdtfydbcdtgifydbcdtfgYheaDaifgdydbgshidnasTmbdninaeydbawSmeaeclfheaicufgiTmdxbkkaeaYascdtfc98fydbBdbadadydbcufBdbkazcefgzci9hmbkdndnakTmbcuhwJbbbbh8Acbhdavyd:KehYavyd:OehKindndnaDaOadcdtfydbcdtgzfydbgembadcefhdxekadcs0hiamazfgsIdbhEasalcbadcefgdaiEcdtfIdbaHaecwaecw6EcdtfIdbMg3Udba3aE:th3aecdthiaKaYazfydbcdtfheinaPaeydbgzcdtfgsa3asIdbMgEUdbaEa8Aa8AaE9DgsEh8AazawasEhwaeclfheaic98fgimbkkadak9hmbkawcu9hmekaQaq9pmdindnaxaQfRbbmbaQhwxdkaqaQcefgQ9hmbxikkakczakcz6EhzaOheaLhOawcu9hmbkkaocdtavc:Seffc98fhedninaoTmeaeydbcbyd;q:kjjbH:bjjjbbaec98fheaocufhoxbkkavc:qdf8Kjjjjbk;IlevucuaicdtgvaicFFFFi0Egocbyd;u:kjjbHjjjjbbhralalyd9GgwcdtfarBdbalawcefBd9GabarBdbaocbyd;u:kjjbHjjjjbbhralalyd9GgocdtfarBdbalaocefBd9GabarBdlcuadcdtadcFFFFi0Ecbyd;u:kjjbHjjjjbbhralalyd9GgocdtfarBdbalaocefBd9GabarBdwabydbcbavz:wjjjb8Aadci9UhDdnadTmbabydbhoaehladhrinaoalydbcdtfgvavydbcefBdbalclfhlarcufgrmbkkdnaiTmbabydbhlabydlhrcbhvaihoinaravBdbarclfhralydbavfhvalclfhlaocufgombkkdnadci6mbabydlhrabydwhvcbhlinaecwfydbhoaeclfydbhdaraeydbcdtfgwawydbgwcefBdbavawcdtfalBdbaradcdtfgdadydbgdcefBdbavadcdtfalBdbaraocdtfgoaoydbgocefBdbavaocdtfalBdbaecxfheaDalcefgl9hmbkkdnaiTmbabydlheabydbhlinaeaeydbalydb9RBdbalclfhlaeclfheaicufgimbkkkQbabaeadaic;K1jjbz:njjjbkQbabaeadaic;m:jjjbz:njjjbk9DeeuabcFeaicdtz:wjjjbhlcbhbdnadTmbindnalaeydbcdtfgiydbcu9hmbaiabBdbabcefhbkaeclfheadcufgdmbkkabk:Vvioud9:du8Jjjjjbc;Wa9Rgl8Kjjjjbcbhvalcxfcbc;Kbz:wjjjb8AalcuadcitgoadcFFFFe0Ecbyd;u:kjjbHjjjjbbgrBdxalceBd2araeadaicez:tjjjbalcuaoadcjjjjoGEcbyd;u:kjjbHjjjjbbgwBdzadcdthednadTmbabhiinaiavBdbaiclfhiadavcefgv9hmbkkawaefhDalabBdwalawBdl9cbhqindnadTmbaq9cq9:hkarhvaDhiadheinaiav8Pibak1:NcFrG87ebavcwfhvaicdfhiaecufgembkkalclfaq:NceGcdtfydbhxalclfaq9ce98gq:NceGcdtfydbhmalc;Wbfcbcjaz:wjjjb8AaDhvadhidnadTmbinalc;Wbfav8VebcdtfgeaeydbcefBdbavcdfhvaicufgimbkkcbhvcbhiinalc;WbfavfgeydbhoaeaiBdbaoaifhiavclfgvcja9hmbkadhvdndnadTmbinalc;WbfaDamydbgicetf8VebcdtfgeaeydbgecefBdbaxaecdtfaiBdbamclfhmavcufgvmbkaq9cv9smdcbhvinabawydbcdtfavBdbawclfhwadavcefgv9hmbxdkkaq9cv9smekkclhvdninavc98Smealcxfavfydbcbyd;q:kjjbH:bjjjbbavc98fhvxbkkalc;Waf8Kjjjjbk:Jwliuo99iud9:cbhv8Jjjjjbca9Rgoczfcwfcbyd:8:kjjbBdbaocb8Pd:0:kjjb83izaocwfcbyd;i:kjjbBdbaocb8Pd;a:kjjb83ibaicd4hrdndnadmbJFFuFhwJFFuuhDJFFuuhqJFFuFhkJFFuuhxJFFuFhmxekarcdthPaehsincbhiinaoczfaifgzasaifIdbgwazIdbgDaDaw9EEUdbaoaifgzawazIdbgDaDaw9DEUdbaiclfgicx9hmbkasaPfhsavcefgvad9hmbkaoIdKhDaoIdwhwaoIdChqaoIdlhkaoIdzhxaoIdbhmkdnadTmbJbbbbJbFu9hJbbbbamax:tgmamJbbbb9DEgmakaq:tgkakam9DEgkawaD:tgwawak9DEgw:vawJbbbb9BEhwdnalmbarcdthoindndnaeclfIdbaq:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikai:S9cC:ghHdndnaeIdbax:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikaHai:S:ehHdndnaecwfIdbaD:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabaHai:T9cy:g:e83ibaeaofheabcwfhbadcufgdmbxdkkarcdthoindndnaeIdbax:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikai:SgH9ca:gaH9cz:g9cjjj;4s:d:eaH9cFe:d:e9cF:bj;4:pj;ar:d9c:bd9:9c:p;G:d;4j:E;ar:d9cH9:9c;d;H:W:y:m:g;d;Hb:d9cv9:9c;j:KM;j:KM;j:Kd:dhOdndnaeclfIdbaq:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikai:SgH9ca:gaH9cz:g9cjjj;4s:d:eaH9cFe:d:e9cF:bj;4:pj;ar:d9c:bd9:9c:p;G:d;4j:E;ar:d9cH9:9c;d;H:W:y:m:g;d;Hb:d9cq9:9cM;j:KM;j:KM;jl:daO:ehOdndnaecwfIdbaD:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabaOai:SgH9ca:gaH9cz:g9cjjj;4s:d:eaH9cFe:d:e9cF:bj;4:pj;ar:d9c:bd9:9c:p;G:d;4j:E;ar:d9cH9:9c;d;H:W:y:m:g;d;Hb:d9cC9:9c:KM;j:KM;j:KMD:d:e83ibaeaofheabcwfhbadcufgdmbkkk9teiucbcbyd;y:kjjbgeabcifc98GfgbBd;y:kjjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;teeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiaeydlBdlaiaeydwBdwaiaeydxBdxaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk:3eedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdxaialBdwaialBdlaialBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabk9teiucbcbyd;y:kjjbgeabcrfc94GfgbBd;y:kjjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik9:eiuZbhedndncbyd;y:kjjbgdaecztgi9nmbcuheadai9RcFFifcz4nbcuSmekadhekcbabae9Rcifc98Gcbyd;y:kjjbfgdBd;y:kjjbdnadZbcztge9nmbadae9RcFFifcz4nb8Akkk;Qddbcjwk;mdbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbbbbbbbbbbbbb4:h9w9N94:P:gW:j9O:ye9Pbbbbbbebbbdbbbebbbdbbbbbbbdbbbbbbbebbbbbbb:l29hZ;69:9kZ;N;76Z;rg97Z;z;o9xZ8J;B85Z;:;u9yZ;b;k9HZ:2;Z9DZ9e:l9mZ59A8KZ:r;T3Z:A:zYZ79OHZ;j4::8::Y:D9V8:bbbb9s:49:Z8R:hBZ9M9M;M8:L;z;o8:;8:PG89q;x:J878R:hQ8::M:B;e87bbbbbbjZbbjZbbjZ:E;V;N8::Y:DsZ9i;H;68:xd;R8:;h0838:;W:NoZbbbb:WV9O8:uf888:9i;H;68:9c9G;L89;n;m9m89;D8Ko8:bbbbf:8tZ9m836ZS:2AZL;zPZZ818EZ9e:lxZ;U98F8:819E;68:FFuuFFuuFFuuFFuFFFuFFFuFbc;mqkzebbbebbbdbbb9G:vbb",t=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var a,s=WebAssembly.instantiate(r(e),{}).then(function(y){a=y.instance,a.exports.__wasm_call_ctors(),a.exports.meshopt_encodeVertexVersion(0),a.exports.meshopt_encodeIndexVersion(1)});function r(y){for(var f=new Uint8Array(y.length),d=0;d<y.length;++d){var x=y.charCodeAt(d);f[d]=x>96?x-97:x>64?x-39:x+4}for(var u=0,d=0;d<y.length;++d)f[u++]=f[d]<60?t[f[d]]:(f[d]-60)*64+f[++d];return f.buffer.slice(0,u)}function n(y){if(!y)throw new Error("Assertion failed")}function i(y){return new Uint8Array(y.buffer,y.byteOffset,y.byteLength)}function o(y,f,d,x){var u=a.exports.sbrk,h=u(f.length*4),m=u(d*4),v=new Uint8Array(a.exports.memory.buffer),T=i(f);v.set(T,h),x&&x(h,h,f.length,d);var k=y(m,h,f.length,d);v=new Uint8Array(a.exports.memory.buffer);var I=new Uint32Array(d);new Uint8Array(I.buffer).set(v.subarray(m,m+d*4)),T.set(v.subarray(h,h+f.length*4)),u(h-u(0));for(var M=0;M<f.length;++M)f[M]=I[f[M]];return[I,k]}function c(y,f,d,x){var u=a.exports.sbrk,h=u(d*4),m=u(d*x),v=new Uint8Array(a.exports.memory.buffer);v.set(i(f),m),y(h,m,d,x),v=new Uint8Array(a.exports.memory.buffer);var T=new Uint32Array(d);return new Uint8Array(T.buffer).set(v.subarray(h,h+d*4)),u(h-u(0)),T}function l(y,f,d,x,u){var h=a.exports.sbrk,m=h(f),v=h(x*u),T=new Uint8Array(a.exports.memory.buffer);T.set(i(d),v);var k=y(m,f,v,x,u),I=new Uint8Array(k);return I.set(T.subarray(m,m+k)),h(m-h(0)),I}function p(y){for(var f=0,d=0;d<y.length;++d){var x=y[d];f=f<x?x:f}return f}function g(y,f){if(n(f==2||f==4),f==4)return new Uint32Array(y.buffer,y.byteOffset,y.byteLength/4);var d=new Uint16Array(y.buffer,y.byteOffset,y.byteLength/2);return new Uint32Array(d)}function w(y,f,d,x,u,h,m){var v=a.exports.sbrk,T=v(d*x),k=v(d*h),I=new Uint8Array(a.exports.memory.buffer);I.set(i(f),k),y(T,d,x,u,k,m);var M=new Uint8Array(d*x);return M.set(I.subarray(T,T+d*x)),v(T-v(0)),M}return{ready:s,supported:!0,reorderMesh:function(y,f,d){var x=f?d?a.exports.meshopt_optimizeVertexCacheStrip:a.exports.meshopt_optimizeVertexCache:void 0;return o(a.exports.meshopt_optimizeVertexFetchRemap,y,p(y)+1,x)},reorderPoints:function(y,f){return n(y instanceof Float32Array),n(y.length%f==0),n(f>=3),c(a.exports.meshopt_spatialSortRemap,y,y.length/f,f*4)},encodeVertexBuffer:function(y,f,d){n(d>0&&d<=256),n(d%4==0);var x=a.exports.meshopt_encodeVertexBufferBound(f,d);return l(a.exports.meshopt_encodeVertexBuffer,x,y,f,d)},encodeIndexBuffer:function(y,f,d){n(d==2||d==4),n(f%3==0);var x=g(y,d),u=a.exports.meshopt_encodeIndexBufferBound(f,p(x)+1);return l(a.exports.meshopt_encodeIndexBuffer,u,x,f,4)},encodeIndexSequence:function(y,f,d){n(d==2||d==4);var x=g(y,d),u=a.exports.meshopt_encodeIndexSequenceBound(f,p(x)+1);return l(a.exports.meshopt_encodeIndexSequence,u,x,f,4)},encodeGltfBuffer:function(y,f,d,x){var u={ATTRIBUTES:this.encodeVertexBuffer,TRIANGLES:this.encodeIndexBuffer,INDICES:this.encodeIndexSequence};return n(u[x]),u[x](y,f,d)},encodeFilterOct:function(y,f,d,x){return n(d==4||d==8),n(x>=1&&x<=16),w(a.exports.meshopt_encodeFilterOct,y,f,d,x,16)},encodeFilterQuat:function(y,f,d,x){return n(d==8),n(x>=4&&x<=16),w(a.exports.meshopt_encodeFilterQuat,y,f,d,x,16)},encodeFilterExp:function(y,f,d,x,u){n(d>0&&d%4==0),n(x>=1&&x<=24);var h={Separate:0,SharedVector:1,SharedComponent:2,Clamped:3};return w(a.exports.meshopt_encodeFilterExp,y,f,d,x,d,u?h[u]:1)}}})();var Fs=(function(){var e="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:W:Odkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:S86qdbk;jYi5ud9:du8Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxcj;abad9Uc;WFbGcjdadca0EhmaialfgPar9Rgoadfhsavaoadz1jjjbgzceVhHcbhOdndninaeaO9nmeaPax9RaD6mdamaeaO9RaOamfgoae6EgAcsfglc9WGhCabaOad2fhXaAcethQaxaDfhiaOaeaoaeao6E9RhLalcl4cifcd4hKazcj;cbfaAfhYcbh8AazcjdfhEaHh3incbhodnawTmbaxa8Acd4fRbbhokaocFeGh5cbh8Eazcj;cbfhqinaih8Fdndndndna5a8Ecet4ciGgoc9:fPdebdkaPa8F9RaA6mrazcj;cbfa8EaA2fa8FaAz1jjjb8Aa8FaAfhixdkazcj;cbfa8EaA2fcbaAz:jjjjb8Aa8FhixekaPa8F9RaK6mva8FaKfhidnaCTmbaPai9RcK6mbaocdtc:q1jjbfcj1jjbawEhaczhrcbhlinargoc9Wfghaqfhrdndndndndndnaaa8Fahco4fRbbalcoG4ciGcdtfydbPDbedvivvvlvkar9cb83bbarcwf9cb83bbxlkarcbaiRbdai8Xbb9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbaqaofgrcGfag9c8F1:NghcKtc8F91aicdfa8J9c8N1:Nfg8KRbbG86bbarcVfcba8KahcjeGcr4fghRbbag9cjjjjjl:dg8J9qE86bbarc7fcbaha8J9c8L1:NfghRbbag9cjjjjjd:dg8J9qE86bbarctfcbaha8J9c8K1:NfghRbbag9cjjjjje:dg8J9qE86bbarc91fcbaha8J9c8J1:NfghRbbag9cjjjj;ab:dg8J9qE86bbarc4fcbaha8J9cg1:NfghRbbag9cjjjja:dg8J9qE86bbarc93fcbaha8J9ch1:NfghRbbag9cjjjjz:dgg9qE86bbarc94fcbahag9ca1:NfghRbbai8Xbe9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbarc95fag9c8F1:NgicKtc8F91aha8J9c8N1:NfghRbbG86bbarc96fcbahaicjeGcr4fgiRbbag9cjjjjjl:dg8J9qE86bbarc97fcbaia8J9c8L1:NfgiRbbag9cjjjjjd:dg8J9qE86bbarc98fcbaia8J9c8K1:NfgiRbbag9cjjjjje:dg8J9qE86bbarc99fcbaia8J9c8J1:NfgiRbbag9cjjjj;ab:dg8J9qE86bbarc9:fcbaia8J9cg1:NfgiRbbag9cjjjja:dg8J9qE86bbarcufcbaia8J9ch1:NfgiRbbag9cjjjjz:dgg9qE86bbaiag9ca1:NfhixikaraiRblaiRbbghco4g8Ka8KciSg8KE86bbaqaofgrcGfaiclfa8Kfg8KRbbahcl4ciGg8La8LciSg8LE86bbarcVfa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc7fa8Ka8Lfg8KRbbahciGghahciSghE86bbarctfa8Kahfg8KRbbaiRbeghco4g8La8LciSg8LE86bbarc91fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc4fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc93fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc94fa8Kahfg8KRbbaiRbdghco4g8La8LciSg8LE86bbarc95fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc96fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc97fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc98fa8KahfghRbbaiRbigico4g8Ka8KciSg8KE86bbarc99faha8KfghRbbaicl4ciGg8Ka8KciSg8KE86bbarc9:faha8KfghRbbaicd4ciGg8Ka8KciSg8KE86bbarcufaha8KfgrRbbaiciGgiaiciSgiE86bbaraifhixdkaraiRbwaiRbbghcl4g8Ka8KcsSg8KE86bbaqaofgrcGfaicwfa8Kfg8KRbbahcsGghahcsSghE86bbarcVfa8KahfghRbbaiRbeg8Kcl4g8La8LcsSg8LE86bbarc7faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarctfaha8KfghRbbaiRbdg8Kcl4g8La8LcsSg8LE86bbarc91faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc4faha8KfghRbbaiRbig8Kcl4g8La8LcsSg8LE86bbarc93faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc94faha8KfghRbbaiRblg8Kcl4g8La8LcsSg8LE86bbarc95faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc96faha8KfghRbbaiRbvg8Kcl4g8La8LcsSg8LE86bbarc97faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc98faha8KfghRbbaiRbog8Kcl4g8La8LcsSg8LE86bbarc99faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc9:faha8KfghRbbaiRbrgicl4g8Ka8KcsSg8KE86bbarcufaha8KfgrRbbaicsGgiaicsSgiE86bbaraifhixekarai8Pbb83bbarcwfaicwf8Pbb83bbaiczfhikdnaoaC9pmbalcdfhlaoczfhraPai9RcL0mekkaoaC6moaimexokaCmva8FTmvkaqaAfhqa8Ecefg8Ecl9hmbkdndndndnawTmbasa8Acd4fRbbgociGPlbedrbkaATmdaza8Afh8Fazcj;cbfhhcbh8EaEhaina8FRbbhraahocbhlinaoahalfRbbgqce4cbaqceG9R7arfgr86bbaoadfhoaAalcefgl9hmbkaacefhaa8Fcefh8FahaAfhha8Ecefg8Ecl9hmbxikkaATmeaza8Afhaazcj;cbfhhcbhoceh8EaYh8FinaEaofhlaa8Vbbhrcbhoinala8FaofRbbcwtahaofRbbgqVc;:FiGce4cbaqceG9R7arfgr87bbaladfhlaLaocefgofmbka8FaQfh8FcdhoaacdfhaahaQfhha8EceGhlcbh8EalmbxdkkaATmbcbaocl49Rh8Eaza8AfRbbhqcwhoa3hlinalRbbaotaqVhqalcefhlaocwfgoca9hmbkcbhhaEh8FaYhainazcj;cbfahfRbbhrcwhoaahlinalRbbaotarVhralaAfhlaocwfgoca9hmbkara8E93aq7hqcbhoa8Fhlinalaqao486bbalcefhlaocwfgoca9hmbka8Fadfh8FaacefhaahcefghaA9hmbkkaEclfhEa3clfh3a8Aclfg8Aad6mbkaXazcjdfaAad2z1jjjb8AazazcjdfaAcufad2fadz1jjjb8AaAaOfhOaihxaimbkc9:hoxdkcbc99aPax9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaok:XseHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbaxcefgOavaiaqaDcsGfRbbgscl49RcsGcdtfydbascz6gPEhDavaias9RcsGcdtfydbaOaPfgzascsGgOEhsaOThOdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiaPfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaOfhiazaOfhxxekaxcbalRbbgHEgAaDc;:eSgDfhzaHcsGhCaHcl4hXdndnaHcs0mbazcefhOxekazhOavaiaX9RcsGcdtfydbhzkdndnaCmbaOcefhxxekaOhxavaiaH9RcsGcdtfydbhOkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhAascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaAhDxekaDcefhDkasce4cbasceG9R7amfgmhAkdndnaXcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhzaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkazhsxekascefhskaPce4cbaPceG9R7amfgmhzkdndnaCcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhOaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkaOhlxekalcefhlkaPce4cbaPceG9R7amfgmhOkdndnadcd9hmbabarcetfgDaA87ebaDclfaO87ebaDcdfaz87ebxekabarcdtfgDaABdbaDcwfaOBdbaDclfazBdbkavc;abfaocitfgDazBdbaDaABdlavaicdtfaABdbavc;abfaocefcsGcitfgDaOBdbaDazBdlavaicefgicsGcdtfazBdbavc;abfaocdfcsGcitfgDaABdbaDaOBdlavaiaHcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnaecvfal9nmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;oiliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabaiavcefciGfcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavciGfgkcd7cetfaD87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavcufciGfcetfaD87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohvxekcjjjj94hvkabakcetfav87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk9teiucbcbyd:K1jjbgeabcifc98GfgbBd:K1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;teeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiaeydlBdlaiaeydwBdwaiaeydxBdxaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk:3eedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdxaialBdwaialBdlaialBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkk81dbcjwk8Kbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbc:Kwkl8WNbb",t="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q:6dkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;G9Mqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk:183lYud97dur978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxavaialfgmar9Rgoad;8qbbcj;abad9Uc;WFbGcjdadca0EhPdndndnadTmbaoadfhscbhzinaeaz9nmdamax9RaD6miabazad2fhHaxaDfhOaPaeaz9RazaPfae6EgAcsfgocl4cifcd4hCavcj;cbfaoc9WGgXcetfhQavcj;cbfaXci2fhLavcj;cbfaXfhKcbhYaoc;ab6h8AincbhodnawTmbaxaYcd4fRbbhokaocFeGhEcbh3avcj;cbfh5indndndndnaEa3cet4ciGgoc9:fPdebdkamaO9RaX6mwavcj;cbfa3aX2faOaX;8qbbaOaAfhOxdkavcj;cbfa3aX2fcbaX;8kbxekamaO9RaC6moaoclVcbawEhraOaCfhocbhidna8Ambamao9Rc;Gb6mbcbhlina5alfhidndndndndndnaOalco4fRbbgqciGarfPDbedibledibkaipxbbbbbbbbbbbbbbbbpklbxlkaiaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaoclffahc:q:yjjbfRbbfhoxikaiaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaocwffahc:q:yjjbfRbbfhoxdkaiaopbbbpklbaoczfhoxekaiaopbbdaoRbbgacitc:q1jjbfpbibaac:q:yjjbfRbbgapsaoRbeghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpklbaaaocdffahc:q:yjjbfRbbfhokdndndndndndnaqcd4ciGarfPDbedibledibkaiczfpxbbbbbbbbbbbbbbbbpklbxlkaiczfaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaoclffahc:q:yjjbfRbbfhoxikaiczfaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaocwffahc:q:yjjbfRbbfhoxdkaiczfaopbbbpklbaoczfhoxekaiczfaopbbdaoRbbgacitc:q1jjbfpbibaac:q:yjjbfRbbgapsaoRbeghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpklbaaaocdffahc:q:yjjbfRbbfhokdndndndndndnaqcl4ciGarfPDbedibledibkaicafpxbbbbbbbbbbbbbbbbpklbxlkaicafaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaoclffahc:q:yjjbfRbbfhoxikaicafaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaocwffahc:q:yjjbfRbbfhoxdkaicafaopbbbpklbaoczfhoxekaicafaopbbdaoRbbgacitc:q1jjbfpbibaac:q:yjjbfRbbgapsaoRbeghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpklbaaaocdffahc:q:yjjbfRbbfhokdndndndndndnaqco4arfPDbedibledibkaic8Wfpxbbbbbbbbbbbbbbbbpklbxlkaic8Wfaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngicitc:q1jjbfpbibaic:q:yjjbfRbbgipsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaiaoclffaqc:q:yjjbfRbbfhoxikaic8Wfaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngicitc:q1jjbfpbibaic:q:yjjbfRbbgipsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaiaocwffaqc:q:yjjbfRbbfhoxdkaic8Wfaopbbbpklbaoczfhoxekaic8WfaopbbdaoRbbgicitc:q1jjbfpbibaic:q:yjjbfRbbgipsaoRbegqcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpklbaiaocdffaqc:q:yjjbfRbbfhokalc;abfhialcjefaX0meaihlamao9Rc;Fb0mbkkdnaiaX9pmbaici4hlinamao9RcK6mwa5aifhqdndndndndndnaOaico4fRbbalcoG4ciGarfPDbedibledibkaqpxbbbbbbbbbbbbbbbbpkbbxlkaqaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spkbbaaaoclffahc:q:yjjbfRbbfhoxikaqaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spkbbaaaocwffahc:q:yjjbfRbbfhoxdkaqaopbbbpkbbaoczfhoxekaqaopbbdaoRbbgacitc:q1jjbfpbibaac:q:yjjbfRbbgapsaoRbeghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpkbbaaaocdffahc:q:yjjbfRbbfhokalcdfhlaiczfgiaX6mbkkaohOaoTmoka5aXfh5a3cefg3cl9hmbkdndndndnawTmbasaYcd4fRbbglciGPlbedwbkaXTmdavcjdfaYfhlavaYfpbdbhgcbhoinalavcj;cbfaofpblbg8JaKaofpblbg8KpmbzeHdOiAlCvXoQrLg8LaQaofpblbg8MaLaofpblbg8NpmbzeHdOiAlCvXoQrLgypmbezHdiOAlvCXorQLg8Ecep9Ta8Epxeeeeeeeeeeeeeeeeg8Fp9op9Hp9rg8Eagp9Uggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp9Uggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp9Uggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp9Uggp9Abbbaladfglaga8LaypmwDKYqk8AExm35Ps8E8Fg8Ecep9Ta8Ea8Fp9op9Hp9rg8Ep9Uggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp9Uggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp9Uggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp9Uggp9Abbbaladfglaga8Ja8KpmwKDYq8AkEx3m5P8Es8Fg8Ja8Ma8NpmwKDYq8AkEx3m5P8Es8Fg8KpmbezHdiOAlvCXorQLg8Ecep9Ta8Ea8Fp9op9Hp9rg8Ep9Uggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp9Uggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp9Uggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp9Uggp9Abbbaladfglaga8Ja8KpmwDKYqk8AExm35Ps8E8Fg8Ecep9Ta8Ea8Fp9op9Hp9rg8Ep9Ug8Fp9Abbbaladfgla8Fa8Ea8Epmlvorlvorlvorlvorp9Ug8Fp9Abbbaladfgla8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9Ug8Fp9Abbbaladfgla8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9Uggp9AbbbaladfhlaoczfgoaX6mbxikkaXTmeavcjdfaYfhlavaYfpbdbhgcbhoinalavcj;cbfaofpblbg8JaKaofpblbg8KpmbzeHdOiAlCvXoQrLg8LaQaofpblbg8MaLaofpblbg8NpmbzeHdOiAlCvXoQrLgypmbezHdiOAlvCXorQLg8Ecep:nea8Epxebebebebebebebebg8Fp9op:bep9rg8Eagp:oeggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp:oeggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp:oeggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp:oeggp9Abbbaladfglaga8LaypmwDKYqk8AExm35Ps8E8Fg8Ecep:nea8Ea8Fp9op:bep9rg8Ep:oeggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp:oeggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp:oeggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp:oeggp9Abbbaladfglaga8Ja8KpmwKDYq8AkEx3m5P8Es8Fg8Ja8Ma8NpmwKDYq8AkEx3m5P8Es8Fg8KpmbezHdiOAlvCXorQLg8Ecep:nea8Ea8Fp9op:bep9rg8Ep:oeggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp:oeggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp:oeggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp:oeggp9Abbbaladfglaga8Ja8KpmwDKYqk8AExm35Ps8E8Fg8Ecep:nea8Ea8Fp9op:bep9rg8Ep:oeg8Fp9Abbbaladfgla8Fa8Ea8Epmlvorlvorlvorlvorp:oeg8Fp9Abbbaladfgla8Fa8Ea8EpmwDqkwDqkwDqkwDqkp:oeg8Fp9Abbbaladfgla8Fa8Ea8EpmxmPsxmPsxmPsxmPsp:oeggp9AbbbaladfhlaoczfgoaX6mbxdkkaXTmbcbhocbalcl4gl9Rc8FGhiavcjdfaYfhravaYfpbdbh8Finaravcj;cbfaofpblbggaKaofpblbg8JpmbzeHdOiAlCvXoQrLg8KaQaofpblbg8LaLaofpblbg8MpmbzeHdOiAlCvXoQrLg8NpmbezHdiOAlvCXorQLg8Eaip:Rea8Ealp:Sep9qg8Ea8Fp9rg8Fp9Abbbaradfgra8Fa8Ea8Epmlvorlvorlvorlvorp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9rg8Fp9Abbbaradfgra8Fa8Ka8NpmwDKYqk8AExm35Ps8E8Fg8Eaip:Rea8Ealp:Sep9qg8Ep9rg8Fp9Abbbaradfgra8Fa8Ea8Epmlvorlvorlvorlvorp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9rg8Fp9Abbbaradfgra8Faga8JpmwKDYq8AkEx3m5P8Es8Fgga8La8MpmwKDYq8AkEx3m5P8Es8Fg8JpmbezHdiOAlvCXorQLg8Eaip:Rea8Ealp:Sep9qg8Ep9rg8Fp9Abbbaradfgra8Fa8Ea8Epmlvorlvorlvorlvorp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9rg8Fp9Abbbaradfgra8Faga8JpmwDKYqk8AExm35Ps8E8Fg8Eaip:Rea8Ealp:Sep9qg8Ep9rg8Fp9Abbbaradfgra8Fa8Ea8Epmlvorlvorlvorlvorp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9rg8Fp9AbbbaradfhraoczfgoaX6mbkkaYclfgYad6mbkaHavcjdfaAad2;8qbbavavcjdfaAcufad2fad;8qbbaAazfhzc9:hoaOhxaOmbxlkkaeTmbaDalfhrcbhocuhlinaralaD9RglfaD6mdaPaeao9RaoaPfae6Eaofgoae6mbkaial9Rhxkcbc99amax9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaokwbz:bjjjbk:TseHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbaxcefgOavaiaqaDcsGfRbbgscl49RcsGcdtfydbascz6gPEhDavaias9RcsGcdtfydbaOaPfgzascsGgOEhsaOThOdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiaPfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaOfhiazaOfhxxekaxcbalRbbgHEgAaDc;:eSgDfhzaHcsGhCaHcl4hXdndnaHcs0mbazcefhOxekazhOavaiaX9RcsGcdtfydbhzkdndnaCmbaOcefhxxekaOhxavaiaH9RcsGcdtfydbhOkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhAascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaAhDxekaDcefhDkasce4cbasceG9R7amfgmhAkdndnaXcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhzaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkazhsxekascefhskaPce4cbaPceG9R7amfgmhzkdndnaCcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhOaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkaOhlxekalcefhlkaPce4cbaPceG9R7amfgmhOkdndnadcd9hmbabarcetfgDaA87ebaDclfaO87ebaDcdfaz87ebxekabarcdtfgDaABdbaDcwfaOBdbaDclfazBdbkavc;abfaocitfgDazBdbaDaABdlavaicdtfaABdbavc;abfaocefcsGcitfgDaOBdbaDazBdlavaicefgicsGcdtfazBdbavc;abfaocdfcsGcitfgDaABdbaDaOBdlavaiaHcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnaecvfal9nmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:SPliuo97eue978Jjjjjbca9Rhiaec98Ghldndnadcl9hmbdnalTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalaeSmeaipxbbbbbbbbbbbbbbbbgqpklbaiabalcdtfgdaeciGglcdtgv;8qbbdnalTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDaqp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkadaiav;8qbbskdnalTmbcbhvabhdinadczfgxaxpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;7eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oaoarpmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgval6mbkkalaeSmbaiczfpxbbbbbbbbbbbbbbbbgopklbaiaopklbaiabalcitfgdaeciGglcitgv;8qbbdnalTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;7eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oaoarpmbezHdiOAlvCXorQLp9qpklbkadaiav;8qbbkk:oDllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalaeSmbaiczfpxbbbbbbbbbbbbbbbbgkpklbaiakpklbaiabalcitfgoaeciGgvcitgw;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkaoaiaw;8qbbkk;uddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbheabhdinadadpbbbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbadczfhdaeclfgeav6mbkkdnavalSmbaic8WfpxbbbbbbbbbbbbbbbbgopklbaicafaopklbaiczfaopklbaiaopklbaiabavcdtfgdalciGgecdtgv;8qbbdnaeTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepklbkadaiav;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz:Dbb",a=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),s=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var r=WebAssembly.validate(a)?o(t):o(e),n,i=WebAssembly.instantiate(r,{}).then(function(u){n=u.instance,n.exports.__wasm_call_ctors()});function o(u){for(var h=new Uint8Array(u.length),m=0;m<u.length;++m){var v=u.charCodeAt(m);h[m]=v>96?v-97:v>64?v-39:v+4}for(var T=0,m=0;m<u.length;++m)h[T++]=h[m]<60?s[h[m]]:(h[m]-60)*64+h[++m];return h.buffer.slice(0,T)}function c(u,h,m,v,T,k,I){var M=u.exports.sbrk,_=v+3&-4,A=M(_*T),C=M(k.length),U=new Uint8Array(u.exports.memory.buffer);U.set(k,C);var B=h(A,v,T,C,k.length);if(B==0&&I&&I(A,_,T),m.set(U.subarray(A,A+v*T)),M(A-M(0)),B!=0)throw new Error("Malformed buffer data: "+B)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},p={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},g=[],w=0;function y(u){var h={object:new Worker(u),pending:0,requests:{}};return h.object.onmessage=function(m){var v=m.data;h.pending-=v.count,h.requests[v.id][v.action](v.value),delete h.requests[v.id]},h}function f(u){for(var h="self.ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(r)+"]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = "+x.name+";"+c.toString()+x.toString(),m=new Blob([h],{type:"text/javascript"}),v=URL.createObjectURL(m),T=g.length;T<u;++T)g[T]=y(v);for(var T=u;T<g.length;++T)g[T].object.postMessage({});g.length=u,URL.revokeObjectURL(v)}function d(u,h,m,v,T){for(var k=g[0],I=1;I<g.length;++I)g[I].pending<k.pending&&(k=g[I]);return new Promise(function(M,_){var A=new Uint8Array(m),C=++w;k.pending+=u,k.requests[C]={resolve:M,reject:_},k.object.postMessage({id:C,count:u,size:h,source:A,mode:v,filter:T},[A.buffer])})}function x(u){var h=u.data;if(!h.id)return self.close();self.ready.then(function(m){try{var v=new Uint8Array(h.count*h.size);c(m,m.exports[h.mode],v,h.count,h.size,h.source,m.exports[h.filter]),self.postMessage({id:h.id,count:h.count,action:"resolve",value:v},[v.buffer])}catch(T){self.postMessage({id:h.id,count:h.count,action:"reject",value:T})}})}return{ready:i,supported:!0,useWorkers:function(u){f(u)},decodeVertexBuffer:function(u,h,m,v,T){c(n,n.exports.meshopt_decodeVertexBuffer,u,h,m,v,n.exports[l[T]])},decodeIndexBuffer:function(u,h,m,v){c(n,n.exports.meshopt_decodeIndexBuffer,u,h,m,v)},decodeIndexSequence:function(u,h,m,v){c(n,n.exports.meshopt_decodeIndexSequence,u,h,m,v)},decodeGltfBuffer:function(u,h,m,v,T,k){c(n,n.exports[p[T]],u,h,m,v,n.exports[l[k]])},decodeGltfBufferAsync:function(u,h,m,v,T){return g.length>0?d(u,h,m,p[v],l[T]):i.then(function(){var k=new Uint8Array(u*h);return c(n,n.exports[p[v]],k,u,h,m,n.exports[l[T]]),k})}}})();var Pg=(function(){var e="b9H79Tebbbetm9Geueu9Geub9Gbb9Gsuuuuuuuuuuuu99uueu9Gvuuuuub9Gruuuuuuub9Gvuuuuue999Gvuuuuueu9Gquuuuuuu99uueu9Gwuuuuuu99ueu9Giuuue999Gluuuueu9GiuuueuiOHdilvorlwiDqkbxxbelve9Weiiviebeoweuec:G:Pdkr:Tewo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bbz9TW79O9V9Wt9F79P9T9W29P9M95br8E9TW79O9V9Wt9F79P9T9W29P9M959x9Pt9OcttV9P9I91tW7bwQ9TW79O9V9Wt9F79P9T9W29P9M959q9V9P9Ut7bDX9TW79O9V9Wt9F79P9T9W29P9M959t9J9H2Wbqa9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94SWt9J9O9sW9T9H9Wbkl79IV9RbxDwebcekdzsq;B:xeHdbkM9Hi8Au8A99Au8Jjjjjbc;W;qb9Rgs8Kjjjjbcbhzascxfcbc;Kbz:ojjjb8AdnabaeSmbabaeadcdtz:njjjb8AkdndnamcdGmbascxfhHcbhOxekasalcrfci4gecbyd:m:jjjbHjjjjbbgABdxasceBd2aAcbaez:ojjjbhCcbhlcbhednadTmbcbhlabheadhAinaCaeydbgXci4fgQaQRbbgQceaXcrGgXtV86bbaQcu7aX4ceGalfhlaeclfheaAcufgAmbkcualcdtalcFFFFi0EhekascCfhHasaecbyd:m:jjjbHjjjjbbgOBdzascdBd2alcd4alfhXcehAinaAgecethAaeaX6mbkcdhzcbhLascuaecdtgAaecFFFFi0Ecbyd:m:jjjbHjjjjbbgXBdCasciBd2aXcFeaAz:ojjjbhKdnadTmbaecufhYcbh8AindndnaKabaLcdtfgEydbgQc:v;t;h;Ev2aYGgXcdtfgCydbgAcuSmbceheinaOaAcdtfydbaQSmdaXaefhAaecefheaKaAaYGgXcdtfgCydbgAcu9hmbkkaOa8AcdtfaQBdbaCa8ABdba8AhAa8Acefh8AkaEaABdbaLcefgLad9hmbkkaKcbyd1:jjjbH:bjjjbbascdBd2kcbh3aHcualcefgecdtaecFFFFi0Ecbyd:m:jjjbHjjjjbbg5Bdbasa5BdlasazceVgeBd2ascxfaecdtfcuadcitadcFFFFe0Ecbyd:m:jjjbHjjjjbbg8EBdbasa8EBdwasazcdfgeBd2asclfabadalcbz:cjjjbascxfaecdtfcualcdtgealcFFFFi0Eg8Fcbyd:m:jjjbHjjjjbbgABdbasazcifgXBd2ascxfaXcdtfa8Fcbyd:m:jjjbHjjjjbbgaBdbasazclVBd2aAaaaialavaOascxfz:djjjbalcbyd:m:jjjbHjjjjbbhCascxfasyd2ghcdtfaCBdbasahcefgXBd2ascxfaXcdtfa8Fcbyd:m:jjjbHjjjjbbgXBdbasahcdfgQBd2ascxfaQcdtfa8Fcbyd:m:jjjbHjjjjbbgQBdbasahcifggBd2aXcFeaez:ojjjbh8JaQcFeaez:ojjjbh8KdnalTmba8Ecwfh8Lindna5a3gQcefg3cdtfydbgKa5aQcdtgefydbgXSmbaKaX9Rhza8EaXcitfhHa8Kaefh8Ma8JaefhEcbhYindndnaHaYcitfydbg8AaQ9hmbaEaQBdba8MaQBdbxekdna5a8Acdtg8NfgeclfydbgXaeydbgeSmba8EaecitgKfydbaQSmeaXae9Rhyaecu7aXfhLa8LaKfhXcbheinaLaeSmeaecefheaXydbhKaXcwfhXaKaQ9hmbkaeay6meka8Ka8NfgeaQa8AaeydbcuSEBdbaEa8AaQaEydbcuSEBdbkaYcefgYaz9hmbkka3al9hmbkaAhXaahQa8KhKa8JhYcbheindndnaeaXydbg8A9hmbdnaeaQydbg8A9hmbaYydbh8AdnaKydbgLcu9hmba8Acu9hmbaCaefcb86bbxikaCaefhEdnaeaLSmbaea8ASmbaEce86bbxikaEcl86bbxdkdnaeaaa8AcdtgLfydb9hmbdnaKydbgEcuSmbaeaESmbaYydbgzcuSmbaeazSmba8KaLfydbgHcuSmbaHa8ASmba8JaLfydbgLcuSmbaLa8ASmbdnaAaEcdtfydbg8AaAaLcdtfydb9hmba8AaAazcdtfydbgLSmbaLaAaHcdtfydb9hmbaCaefcd86bbxlkaCaefcl86bbxikaCaefcl86bbxdkaCaefcl86bbxekaCaefaCa8AfRbb86bbkaXclfhXaQclfhQaKclfhKaYclfhYalaecefge9hmbkdnaqTmbdndnaOTmbaOheaAhXalhQindnaqaeydbfRbbTmbaCaXydbfcl86bbkaeclfheaXclfhXaQcufgQmbxdkkaAhealhXindnaqRbbTmbaCaeydbfcl86bbkaqcefhqaeclfheaXcufgXmbkkaAhealhQaChXindnaCaeydbfRbbcl9hmbaXcl86bbkaeclfheaXcefhXaQcufgQmbkkamceGTmbaChealhXindnaeRbbce9hmbaecl86bbkaecefheaXcufgXmbkkascxfagcdtfcualcx2alc;v:Q;v:Qe0Ecbyd:m:jjjbHjjjjbbg3BdbasahclfgHBd2a3aialavaOz:ejjjbh8PdndnaDmbcbhgcbh8Lxekcbh8LawhecbhXindnaeIdbJbbbb9ETmbasc;Wbfa8LcdtfaXBdba8Lcefh8LkaeclfheaDaXcefgX9hmbkascxfaHcdtfcua8Lal2gecdtaecFFFFi0Ecbyd:m:jjjbHjjjjbbggBdbasahcvfgHBd2alTmba8LTmbarcd4hEdnaOTmba8Lcdthzcbh8AaghLinaoaOa8AcdtfydbaE2cdtfhYasc;WbfheaLhXa8LhQinaXaYaeydbcdtgKfIdbawaKfIdbNUdbaeclfheaXclfhXaQcufgQmbkaLazfhLa8Acefg8Aal9hmbxdkka8Lcdthzcbh8AaghLinaoa8AaE2cdtfhYasc;WbfheaLhXa8LhQinaXaYaeydbcdtgKfIdbawaKfIdbNUdbaeclfheaXclfhXaQcufgQmbkaLazfhLa8Acefg8Aal9hmbkkascxfaHcdtfcualc8S2gealc;D;O;f8U0EgQcbyd:m:jjjbHjjjjbbgXBdbasaHcefgKBd2aXcbaez:ojjjbhqdndndna8LTmbascxfaKcdtfaQcbyd:m:jjjbHjjjjbbgvBdbasaHcdfgXBd2avcbaez:ojjjb8AascxfaXcdtfcua8Lal2gecltgXaecFFFFb0Ecbyd:m:jjjbHjjjjbbgiBdbasaHcifBd2aicbaXz:ojjjb8AadmexdkcbhvcbhiadTmekcbhYabhXindna3aXclfydbg8Acx2fgeIdba3aXydbgLcx2fgQIdbgI:tg8Ra3aXcwfydbgEcx2fgKIdlaQIdlg8S:tgRNaKIdbaI:tg8UaeIdla8S:tg8VN:tg8Wa8WNa8VaKIdwaQIdwg8X:tg8YNaRaeIdwa8X:tg8VN:tgRaRNa8Va8UNa8Ya8RN:tg8Ra8RNMM:rg8UJbbbb9ETmba8Wa8U:vh8Wa8Ra8U:vh8RaRa8U:vhRkaqaAaLcdtfydbc8S2fgeaRa8U:rg8UaRNNg8VaeIdbMUdbaea8Ra8Ua8RNg8ZNg8YaeIdlMUdlaea8Wa8Ua8WNg80Ng81aeIdwMUdwaea8ZaRNg8ZaeIdxMUdxaea80aRNgBaeIdzMUdzaea80a8RNg80aeIdCMUdCaeaRa8Ua8Wa8XNaRaINa8Sa8RNMM:mg8SNgINgRaeIdKMUdKaea8RaINg8RaeId3MUd3aea8WaINg8WaeIdaMUdaaeaIa8SNgIaeId8KMUd8Kaea8UaeIdyMUdyaqaAa8Acdtfydbc8S2fgea8VaeIdbMUdbaea8YaeIdlMUdlaea81aeIdwMUdwaea8ZaeIdxMUdxaeaBaeIdzMUdzaea80aeIdCMUdCaeaRaeIdKMUdKaea8RaeId3MUd3aea8WaeIdaMUdaaeaIaeId8KMUd8Kaea8UaeIdyMUdyaqaAaEcdtfydbc8S2fgea8VaeIdbMUdbaea8YaeIdlMUdlaea81aeIdwMUdwaea8ZaeIdxMUdxaeaBaeIdzMUdzaea80aeIdCMUdCaeaRaeIdKMUdKaea8RaeId3MUd3aea8WaeIdaMUdaaeaIaeId8KMUd8Kaea8UaeIdyMUdyaXcxfhXaYcifgYad6mbkcbhzabhLinabazcdtfh8AcbhXinaCa8AaXc;a1jjbfydbcdtfydbgQfRbbhedndnaCaLaXfydbgKfRbbgYc99fcFeGcpe0mbaec99fcFeGc;:e6mekdnaYcufcFeGce0mba8JaKcdtfydbaQ9hmekdnaecufcFeGce0mba8KaQcdtfydbaK9hmekdnaYcv2aefc:G1jjbfRbbTmbaAaQcdtfydbaAaKcdtfydb0mekJbbacJbbacJbbjZaecFeGceSEaYceSEh80dna3a8AaXc;e1jjbfydbcdtfydbcx2fgeIdwa3aKcx2fgYIdwg8S:tg8Wa3aQcx2fgEIdwa8S:tgRaRNaEIdbaYIdbg8X:tg8Ra8RNaEIdlaYIdlg8V:tg8Ua8UNMMgINa8WaRNaeIdba8X:tg81a8RNa8UaeIdla8V:tg8ZNMMg8YaRN:tg8Wa8WNa81aINa8Ya8RN:tgRaRNa8ZaINa8Ya8UN:tg8Ra8RNMM:rg8UJbbbb9ETmba8Wa8U:vh8Wa8Ra8U:vh8RaRa8U:vhRkaqaAaKcdtfydbc8S2fgeaRa80aI:rNg8UaRNNg8YaeIdbMUdbaea8Ra8Ua8RNg80Ng81aeIdlMUdlaea8Wa8Ua8WNgINg8ZaeIdwMUdwaea80aRNg80aeIdxMUdxaeaIaRNgBaeIdzMUdzaeaIa8RNg83aeIdCMUdCaeaRa8Ua8Wa8SNaRa8XNa8Va8RNMM:mg8SNgINgRaeIdKMUdKaea8RaINg8RaeId3MUd3aea8WaINg8WaeIdaMUdaaeaIa8SNgIaeId8KMUd8Kaea8UaeIdyMUdyaqaAaQcdtfydbc8S2fgea8YaeIdbMUdbaea81aeIdlMUdlaea8ZaeIdwMUdwaea80aeIdxMUdxaeaBaeIdzMUdzaea83aeIdCMUdCaeaRaeIdKMUdKaea8RaeId3MUd3aea8WaeIdaMUdaaeaIaeId8KMUd8Kaea8UaeIdyMUdykaXclfgXcx9hmbkaLcxfhLazcifgzad6mbka8LTmbcbhLinJbbbbh8Xa3abaLcdtfgeclfydbgEcx2fgXIdwa3aeydbgzcx2fgQIdwg8Z:tg8Ra8RNaXIdbaQIdbgB:tg8Wa8WNaXIdlaQIdlg83:tg8Ua8UNMMg80a3aecwfydbgHcx2fgeIdwa8Z:tgINa8Ra8RaINa8WaeIdbaB:tg8SNa8UaeIdla83:tg8VNMMgRN:tJbbbbJbbjZa80aIaINa8Sa8SNa8Va8VNMMg81NaRaRN:tg8Y:va8YJbbbb9BEg8YNhUa81a8RNaIaRN:ta8YNh85a80a8VNa8UaRN:ta8YNh86a81a8UNa8VaRN:ta8YNh87a80a8SNa8WaRN:ta8YNh88a81a8WNa8SaRN:ta8YNh89a8Wa8VNa8Sa8UN:tgRaRNa8UaINa8Va8RN:tgRaRNa8Ra8SNaIa8WN:tgRaRNMM:rJbbbZNhRagaza8L2gwcdtfhXagaHa8L2g8NcdtfhQagaEa8L2g5cdtfhKa8Z:mh8:a83:mhZaB:mhncbhYa8Lh8AJbbbbh8VJbbbbh8YJbbbbh80Jbbbbh81Jbbbbh8ZJbbbbhBJbbbbh83JbbbbhcJbbbbh9cinasc;WbfaYfgecwfaRa85aKIdbaXIdbgI:tg8UNaUaQIdbaI:tg8SNMg8RNUdbaeclfaRa87a8UNa86a8SNMg8WNUdbaeaRa89a8UNa88a8SNMg8UNUdbaecxfaRa8:a8RNaZa8WNaIana8UNMMMgINUdbaRa8Ra8WNNa81Mh81aRa8Ra8UNNa8ZMh8ZaRa8Wa8UNNaBMhBaRaIaINNa8XMh8XaRa8RaINNa8VMh8VaRa8WaINNa8YMh8YaRa8UaINNa80Mh80aRa8Ra8RNNa83Mh83aRa8Wa8WNNacMhcaRa8Ua8UNNa9cMh9caXclfhXaKclfhKaQclfhQaYczfhYa8Acufg8Ambkavazc8S2fgea9caeIdbMUdbaeacaeIdlMUdlaea83aeIdwMUdwaeaBaeIdxMUdxaea8ZaeIdzMUdzaea81aeIdCMUdCaea80aeIdKMUdKaea8YaeId3MUd3aea8VaeIdaMUdaaea8XaeId8KMUd8KaeaRaeIdyMUdyavaEc8S2fgea9caeIdbMUdbaeacaeIdlMUdlaea83aeIdwMUdwaeaBaeIdxMUdxaea8ZaeIdzMUdzaea81aeIdCMUdCaea80aeIdKMUdKaea8YaeId3MUd3aea8VaeIdaMUdaaea8XaeId8KMUd8KaeaRaeIdyMUdyavaHc8S2fgea9caeIdbMUdbaeacaeIdlMUdlaea83aeIdwMUdwaeaBaeIdxMUdxaea8ZaeIdzMUdzaea81aeIdCMUdCaea80aeIdKMUdKaea8YaeId3MUd3aea8VaeIdaMUdaaea8XaeId8KMUd8KaeaRaeIdyMUdyaiawcltfh8AcbhXa8LhKina8AaXfgeasc;WbfaXfgQIdbaeIdbMUdbaeclfgYaQclfIdbaYIdbMUdbaecwfgYaQcwfIdbaYIdbMUdbaecxfgeaQcxfIdbaeIdbMUdbaXczfhXaKcufgKmbkaia5cltfh8AcbhXa8LhKina8AaXfgeasc;WbfaXfgQIdbaeIdbMUdbaeclfgYaQclfIdbaYIdbMUdbaecwfgYaQcwfIdbaYIdbMUdbaecxfgeaQcxfIdbaeIdbMUdbaXczfhXaKcufgKmbkaia8Ncltfh8AcbhXa8LhKina8AaXfgeasc;WbfaXfgQIdbaeIdbMUdbaeclfgYaQclfIdbaYIdbMUdbaecwfgYaQcwfIdbaYIdbMUdbaecxfgeaQcxfIdbaeIdbMUdbaXczfhXaKcufgKmbkaLcifgLad6mbkkcbhQdndnamcwGgJmbJbbbbh8Vcbh9ecbhocbhhxekcbh9ea8Fcbyd:m:jjjbHjjjjbbhhascxfasyd2gecdtfahBdbasaecefgXBd2ascxfaXcdtfcuahalabadaAz:fjjjbgKcltaKcjjjjiGEcbyd:m:jjjbHjjjjbbgoBdbasaecdfBd2aoaKaha3alz:gjjjbJFFuuh8VaKTmbaoheaKhXinaeIdbgRa8Va8VaR9EEh8VaeclfheaXcufgXmbkaKh9ekasydlhTdnalTmbaTclfheaTydbhKaChXalhYcbhQincbaeydbg8AaK9RaXRbbcpeGEaQfhQaXcefhXaeclfhea8AhKaYcufgYmbkaQce4hQkcuadaQ9RcifgScx2aSc;v:Q;v:Qe0Ecbyd:m:jjjbHjjjjbbhDascxfasyd2g9hcdtfaDBdbasa9hcefgeBd2ascxfaecdtfcuaScdtaScFFFFi0Ecbyd:m:jjjbHjjjjbbgrBdbasa9hcdfgeBd2ascxfaecdtfa8Fcbyd:m:jjjbHjjjjbbgyBdbasa9hcifgeBd2ascxfaecdtfalcbyd:m:jjjbHjjjjbbg9iBdbasa9hclfg6Bd2axaxNa8PJbbjZamclGEgUaUN:vh9cJbbbbhcdnadak9nmbdnaSci6mba8Lclth9kaDcwfh0Jbbbbh83JbbbbhcinasclfabadalaAz:cjjjbabhzcbh8Ecbh8Finaba8FcdtfhHcbheindnaAazaefydbgQcdtgEfydbgYaAaHaec;q1jjbfydbcdtfydbgXcdtgwfydbg8ASmbaCaXfRbbgLcv2aCaQfRbbgKfc;G1jjbfRbbg5aKcv2aLfg8Nc;G1jjbfRbbg8MVcFeGTmbdna8AaY9nmba8Nc:G1jjbfRbbcFeGmekaKcufhYdnaKaL9hmbaYcFeGce0mba8JaEfydbaX9hmekdndnaKclSmbaLcl9hmekdnaYcFeGce0mba8JaEfydbaX9hmdkaLcufcFeGce0mba8KawfydbaQ9hmekaDa8Ecx2fgKaXaQa8McFeGgYEBdlaKaQaXaYEBdbaKaYa5Gcb9hBdwa8Ecefh8Ekaeclfgecx9hmbkdna8Fcifg8Fad9pmbazcxfhza8EcifaS9nmekka8ETmdcbhLinaqaAaDaLcx2fgKydbgYcdtgzfydbc8S2fgeIdwa3aKydlg8Acx2fgXIdwg8WNaeIdzaXIdbg8UNaeIdaMgRaRMMa8WNaeIdlaXIdlgINaeIdCa8WNaeId3MgRaRMMaINaeIdba8UNaeIdxaINaeIdKMgRaRMMa8UNaeId8KMMM:lhRJbbbbJbbjZaeIdyg8R:va8RJbbbb9BEh8RdndnaKydwgEmbJFFuuh8YxekJbbbbJbbjZaqaAa8Acdtfydbc8S2fgeIdyg8S:va8SJbbbb9BEaeIdwa3aYcx2fgXIdwg8SNaeIdzaXIdbg8XNaeIdaMg8Ya8YMMa8SNaeIdlaXIdlg8YNaeIdCa8SNaeId3Mg8Sa8SMMa8YNaeIdba8XNaeIdxa8YNaeIdKMg8Sa8SMMa8XNaeId8KMMM:lNh8Yka8RaRNh80dna8LTmbavaYc8S2fgQIdwa8WNaQIdza8UNaQIdaMgRaRMMa8WNaQIdlaINaQIdCa8WNaQId3MgRaRMMaINaQIdba8UNaQIdxaINaQIdKMgRaRMMa8UNaQId8KMMMhRaga8Aa8L2gHcdtfhXaiaYa8L2gwcltfheaQIdyh8Sa8LhQinaXIdbg8Ra8Ra8SNaecxfIdba8WaecwfIdbNa8UaeIdbNaIaeclfIdbNMMMg8Ra8RM:tNaRMhRaXclfhXaeczfheaQcufgQmbkdndnaEmbJbbbbh8Rxekava8Ac8S2fgQIdwa3aYcx2fgeIdwg8UNaQIdzaeIdbgINaQIdaMg8Ra8RMMa8UNaQIdlaeIdlg8SNaQIdCa8UNaQId3Mg8Ra8RMMa8SNaQIdbaINaQIdxa8SNaQIdKMg8Ra8RMMaINaQId8KMMMh8RagawcdtfhXaiaHcltfheaQIdyh8Xa8LhQinaXIdbg8Wa8Wa8XNaecxfIdba8UaecwfIdbNaIaeIdbNa8SaeclfIdbNMMMg8Wa8WM:tNa8RMh8RaXclfhXaeczfheaQcufgQmbka8R:lh8Rka80aR:lMh80a8Ya8RMh8YaCaYfRbbcd9hmbdna8Ka8Ja8Jazfydba8ASEaaazfydbgHcdtfydbgzcu9hmbaaa8AcdtfydbhzkavaHc8S2fgQIdwa3azcx2fgeIdwg8WNaQIdzaeIdbg8UNaQIdaMgRaRMMa8WNaQIdlaeIdlgINaQIdCa8WNaQId3MgRaRMMaINaQIdba8UNaQIdxaINaQIdKMgRaRMMa8UNaQId8KMMMhRagaza8L2gwcdtfhXaiaHa8L2g8NcltfheaQIdyh8Sa8LhQinaXIdbg8Ra8Ra8SNaecxfIdba8WaecwfIdbNa8UaeIdbNaIaeclfIdbNMMMg8Ra8RM:tNaRMhRaXclfhXaeczfheaQcufgQmbkdndnaEmbJbbbbh8Rxekavazc8S2fgQIdwa3aHcx2fgeIdwg8UNaQIdzaeIdbgINaQIdaMg8Ra8RMMa8UNaQIdlaeIdlg8SNaQIdCa8UNaQId3Mg8Ra8RMMa8SNaQIdbaINaQIdxa8SNaQIdKMg8Ra8RMMaINaQId8KMMMh8Raga8NcdtfhXaiawcltfheaQIdyh8Xa8LhQinaXIdbg8Wa8Wa8XNaecxfIdba8UaecwfIdbNaIaeIdbNa8SaeclfIdbNMMMg8Wa8WM:tNa8RMh8RaXclfhXaeczfheaQcufgQmbka8R:lh8Rka80aR:lMh80a8Ya8RMh8YkaKa80a8Ya80a8Y9FgeEUdwaKa8AaYaeaETVgeEBdlaKaYa8AaeEBdbaLcefgLa8E9hmbkasc;Wbfcbcj;qbz:ojjjb8Aa0hea8EhXinasc;WbfaeydbcA4cF8FGgQcFAaQcFA6EcdtfgQaQydbcefBdbaecxfheaXcufgXmbkcbhecbhXinasc;WbfaefgQydbhKaQaXBdbaKaXfhXaeclfgecj;qb9hmbkcbhea0hXinasc;WbfaXydbcA4cF8FGgQcFAaQcFA6EcdtfgQaQydbgQcefBdbaraQcdtfaeBdbaXcxfhXa8Eaecefge9hmbkadak9RgQci9Uh9mdnalTmbcbheayhXinaXaeBdbaXclfhXalaecefge9hmbkkcbh9na9icbalz:ojjjbh8FaQcO9Uh9oa9mce4h9pasydwh9qcbh8Mcbh5dninaDara5cdtfydbcx2fg8NIdwgRa9c9Emea8Ma9m9pmeJFFuuh8Rdna9pa8E9pmbaDara9pcdtfydbcx2fIdwJbb;aZNh8RkdnaRa8R9ETmbaRac9ETmba8Ma9o0mdkdna8FaAa8NydlgHcdtg9rfydbgKfg9sRbba8FaAa8Nydbgzcdtg9tfydbgefg9uRbbVmbaCazfRbbh9vdnaTaecdtfgXclfydbgQaXydbgXSmbaQaX9RhYa3aKcx2fhLa3aecx2fhEa9qaXcitfhecbhXcehwdnindnayaeydbcdtfydbgQaKSmbayaeclfydbcdtfydbg8AaKSmbaQa8ASmba3a8Acx2fg8AIdba3aQcx2fgQIdbg8W:tgRaEIdlaQIdlg8U:tg8XNaEIdba8W:tg8Ya8AIdla8U:tg8RN:tgIaRaLIdla8U:tg80NaLIdba8W:tg81a8RN:tg8UNa8RaEIdwaQIdwg8S:tg8ZNa8Xa8AIdwa8S:tg8WN:tg8Xa8RaLIdwa8S:tgBNa80a8WN:tg8RNa8Wa8YNa8ZaRN:tg8Sa8Wa81NaBaRN:tgRNMMaIaINa8Xa8XNa8Sa8SNMMa8Ua8UNa8Ra8RNaRaRNMMN:rJbbj8:N9FmdkaecwfheaXcefgXaY6hwaYaX9hmbkkawceGTmba9pcefh9pxekdndndndna9vc9:fPdebdkazheinayaecdtgefaHBdbaaaefydbgeaz9hmbxikkdna8Ka8Ja8Ja9tfydbaHSEaaa9tfydbgzcdtfydbgecu9hmbaaa9rfydbhekaya9tfaHBdbaehHkayazcdtfaHBdbka9uce86bba9sce86bba8NIdwgRacacaR9DEhca9ncefh9ncecda9vceSEa8Mfh8Mka5cefg5a8E9hmbkka9nTmddnalTmbcbh8AcbhEindnayaEcdtgefydbgQaESmbaAaQcdtfydbhzdnaEaAaefydb9hgHmbaqazc8S2fgeaqaEc8S2fgXIdbaeIdbMUdbaeaXIdlaeIdlMUdlaeaXIdwaeIdwMUdwaeaXIdxaeIdxMUdxaeaXIdzaeIdzMUdzaeaXIdCaeIdCMUdCaeaXIdKaeIdKMUdKaeaXId3aeId3MUd3aeaXIdaaeIdaMUdaaeaXId8KaeId8KMUd8KaeaXIdyaeIdyMUdyka8LTmbavaQc8S2fgeavaEc8S2gwfgXIdbaeIdbMUdbaeaXIdlaeIdlMUdlaeaXIdwaeIdwMUdwaeaXIdxaeIdxMUdxaeaXIdzaeIdzMUdzaeaXIdCaeIdCMUdCaeaXIdKaeIdKMUdKaeaXId3aeId3MUd3aeaXIdaaeIdaMUdaaeaXId8KaeId8KMUd8KaeaXIdyaeIdyMUdya9kaQ2hLaihXa8LhKinaXaLfgeaXa8AfgQIdbaeIdbMUdbaeclfgYaQclfIdbaYIdbMUdbaecwfgYaQcwfIdbaYIdbMUdbaecxfgeaQcxfIdbaeIdbMUdbaXczfhXaKcufgKmbkaHmbJbbbbJbbjZaqawfgeIdygR:vaRJbbbb9BEaeIdwa3azcx2fgXIdwgRNaeIdzaXIdbg8RNaeIdaMg8Wa8WMMaRNaeIdlaXIdlg8WNaeIdCaRNaeId3MgRaRMMa8WNaeIdba8RNaeIdxa8WNaeIdKMgRaRMMa8RNaeId8KMMM:lNgRa83a83aR9DEh83ka8Aa9kfh8AaEcefgEal9hmbkcbhXa8JheindnaeydbgQcuSmbdnaXayaQcdtgKfydbgQ9hmbcuhQa8JaKfydbgKcuSmbayaKcdtfydbhQkaeaQBdbkaeclfhealaXcefgX9hmbkcbhXa8KheindnaeydbgQcuSmbdnaXayaQcdtgKfydbgQ9hmbcuhQa8KaKfydbgKcuSmbayaKcdtfydbhQkaeaQBdbkaeclfhealaXcefgX9hmbkka83aca8LEh83cbhKabhecbhYindnayaeydbcdtfydbgXayaeclfydbcdtfydbgQSmbaXayaecwfydbcdtfydbg8ASmbaQa8ASmbabaKcdtfgLaXBdbaLcwfa8ABdbaLclfaQBdbaKcifhKkaecxfheaYcifgYad6mbkdndnaJTmbaKak9nmba8Va839FTmbcbhdabhecbhXindnaoahaeydbgQcdtfydbcdtfIdba839ETmbabadcdtfgYaQBdbaYclfaeclfydbBdbaYcwfaecwfydbBdbadcifhdkaecxfheaXcifgXaK6mbkJFFuuh8Va9eTmeaohea9ehXJFFuuhRinaeIdbg8RaRaRa8R9EEg8WaRa8Ra839EgQEhRa8Wa8VaQEh8VaeclfheaXcufgXmbxdkkaKhdkadak0mbxdkkasclfabadalaAz:cjjjbkdndnadak0mbadhXxekdnaJmbadhXxekdna8Va9c9FmbadhXxekina8VJbb;aZNgRa9caRa9c9DEh8WJbbbbhRdna9eTmbaohea9ehAinaeIdbg8RaRa8Ra8W9FEaRa8RaR9EEhRaeclfheaAcufgAmbkkcbhXabhecbhAindnaoahaeydbgQcdtfydbcdtfIdba8W9ETmbabaXcdtfgKaQBdbaKclfaeclfydbBdbaKcwfaecwfydbBdbaXcifhXkaecxfheaAcifgAad6mbkJFFuuh8Vdna9eTmbaohea9ehAJFFuuh8RinaeIdbg8Ua8Ra8Ra8U9EEgIa8Ra8Ua8W9EgQEh8RaIa8VaQEh8VaeclfheaAcufgAmbkkdnaXad9hmbadhXxdkaRacacaR9DEhcaXak9nmeaXhda8Va9c9FmbkkdnamcjjjjlGTmbaOmbaXTmbcbh8AabheinaCaeydbgKfRbbc3thLaecwfgEydbhAdndna8JaKcdtgHfydbaeclfgzydbgQSmbcbhYa8KaQcdtfydbaK9hmekcjjjj94hYkaeaLaYVaKVBdbaCaQfRbbc3thLdndna8JaQcdtfydbaASmbcbhYa8KaAcdtfydbaQ9hmekcjjjj94hYkazaLaYVaQVBdbaCaAfRbbc3thYdndna8JaAcdtfydbaKSmbcbhQa8KaHfydbaA9hmekcjjjj94hQkaEaYaQVaAVBdbaecxfhea8Acifg8AaX6mbkkdnaOTmbaXTmbaXheinabaOabydbcdtfydbBdbabclfhbaecufgembkkdnaPTmbaPaUac:rNUdbka9hcdtascxffcxfhednina6Tmeaeydbcbyd1:jjjbH:bjjjbbaec98fhea6cufh6xbkkasc;W;qbf8KjjjjbaXk;Yieouabydlhvabydbclfcbaicdtz:ojjjbhoadci9UhrdnadTmbdnalTmbaehwadhDinaoalawydbcdtfydbcdtfgqaqydbcefBdbawclfhwaDcufgDmbxdkkaehwadhDinaoawydbcdtfgqaqydbcefBdbawclfhwaDcufgDmbkkdnaiTmbcbhDaohwinawydbhqawaDBdbawclfhwaqaDfhDaicufgimbkkdnadci6mbinaecwfydbhwaeclfydbhDaeydbhidnalTmbalawcdtfydbhwalaDcdtfydbhDalaicdtfydbhikavaoaicdtfgqydbcitfaDBdbavaqydbcitfawBdlaqaqydbcefBdbavaoaDcdtfgqydbcitfawBdbavaqydbcitfaiBdlaqaqydbcefBdbavaoawcdtfgwydbcitfaiBdbavawydbcitfaDBdlawawydbcefBdbaecxfhearcufgrmbkkabydbcbBdbk:todDue99aicd4aifhrcehwinawgDcethwaDar6mbkcuaDcdtgraDcFFFFi0Ecbyd:m:jjjbHjjjjbbhwaoaoyd9GgqcefBd9GaoaqcdtfawBdbawcFearz:ojjjbhkdnaiTmbalcd4hlaDcufhxcbhminamhDdnavTmbavamcdtfydbhDkcbadaDal2cdtfgDydlgwawcjjjj94SEgwcH4aw7c:F:b:DD2cbaDydbgwawcjjjj94SEgwcH4aw7c;D;O:B8J27cbaDydwgDaDcjjjj94SEgDcH4aD7c:3F;N8N27axGhwamcdthPdndndnavTmbakawcdtfgrydbgDcuSmeadavaPfydbal2cdtfgsIdbhzcehqinaqhrdnadavaDcdtfydbal2cdtfgqIdbaz9CmbaqIdlasIdl9CmbaqIdwasIdw9BmlkarcefhqakawarfaxGgwcdtfgrydbgDcu9hmbxdkkakawcdtfgrydbgDcuSmbadamal2cdtfgsIdbhzcehqinaqhrdnadaDal2cdtfgqIdbaz9CmbaqIdlasIdl9CmbaqIdwasIdw9BmikarcefhqakawarfaxGgwcdtfgrydbgDcu9hmbkkaramBdbamhDkabaPfaDBdbamcefgmai9hmbkkakcbyd1:jjjbH:bjjjbbaoaoyd9GcufBd9GdnaeTmbaiTmbcbhDaehwinawaDBdbawclfhwaiaDcefgD9hmbkcbhDaehwindnaDabydbgrSmbawaearcdtfgrydbBdbaraDBdbkawclfhwabclfhbaiaDcefgD9hmbkkk;Qodvuv998Jjjjjbca9Rgvczfcwfcbyd11jjbBdbavcb8Pdj1jjb83izavcwfcbydN1jjbBdbavcb8Pd:m1jjb83ibdnadTmbaicd4hodnabmbdnalTmbcbhrinaealarcdtfydbao2cdtfhwcbhiinavczfaifgDawaifIdbgqaDIdbgkakaq9EEUdbavaifgDaqaDIdbgkakaq9DEUdbaiclfgicx9hmbkarcefgrad9hmbxikkaocdthrcbhwincbhiinavczfaifgDaeaifIdbgqaDIdbgkakaq9EEUdbavaifgDaqaDIdbgkakaq9DEUdbaiclfgicx9hmbkaearfheawcefgwad9hmbxdkkdnalTmbcbhrinabarcx2fgiaealarcdtfydbao2cdtfgwIdbUdbaiawIdlUdlaiawIdwUdwcbhiinavczfaifgDawaifIdbgqaDIdbgkakaq9EEUdbavaifgDaqaDIdbgkakaq9DEUdbaiclfgicx9hmbkarcefgrad9hmbxdkkaocdthlcbhraehwinabarcx2fgiaearao2cdtfgDIdbUdbaiaDIdlUdlaiaDIdwUdwcbhiinavczfaifgDawaifIdbgqaDIdbgkakaq9EEUdbavaifgDaqaDIdbgkakaq9DEUdbaiclfgicx9hmbkawalfhwarcefgrad9hmbkkJbbbbavIdbavIdzgk:tgqaqJbbbb9DEgqavIdlavIdCgx:tgmamaq9DEgqavIdwavIdKgm:tgPaPaq9DEhPdnabTmbadTmbJbbbbJbbjZaP:vaPJbbbb9BEhqinabaqabIdbak:tNUdbabclfgvaqavIdbax:tNUdbabcwfgvaqavIdbam:tNUdbabcxfhbadcufgdmbkkaPk:ZlewudnaeTmbcbhvabhoinaoavBdbaoclfhoaeavcefgv9hmbkkdnaiTmbcbhrinadarcdtfhwcbhDinalawaDcdtgvc;a1jjbfydbcdtfydbcdtfydbhodnabalawavfydbcdtfydbgqcdtfgkydbgvaqSmbinakabavgqcdtfgxydbgvBdbaxhkaqav9hmbkkdnabaocdtfgkydbgvaoSmbinakabavgocdtfgxydbgvBdbaxhkaoav9hmbkkdnaqaoSmbabaqaoaqao0Ecdtfaqaoaqao6EBdbkaDcefgDci9hmbkarcifgrai6mbkkdnaembcbskcbhxindnalaxcdtgvfydbax9hmbaxhodnabavfgDydbgvaxSmbaDhqinaqabavgocdtfgkydbgvBdbakhqaoav9hmbkkaDaoBdbkaxcefgxae9hmbkcbhvabhocbhkindndnavalydbgq9hmbdnavaoydbgq9hmbaoakBdbakcefhkxdkaoabaqcdtfydbBdbxekaoabaqcdtfydbBdbkaoclfhoalclfhlaeavcefgv9hmbkakk;Jiilud99duabcbaecltz:ojjjbhvdnalTmbadhoaihralhwinarcwfIdbhDarclfIdbhqavaoydbcltfgkarIdbakIdbMUdbakclfgxaqaxIdbMUdbakcwfgxaDaxIdbMUdbakcxfgkakIdbJbbjZMUdbaoclfhoarcxfhrawcufgwmbkkdnaeTmbavhraehkinarcxfgoIdbhDaocbBdbararIdbJbbbbJbbjZaD:vaDJbbbb9BEgDNUdbarclfgoaDaoIdbNUdbarcwfgoaDaoIdbNUdbarczfhrakcufgkmbkkdnalTmbinavadydbcltfgrcxfgkaicwfIdbarcwfIdb:tgDaDNaiIdbarIdb:tgDaDNaiclfIdbarclfIdb:tgDaDNMMgDakIdbgqaqaD9DEUdbadclfhdaicxfhialcufglmbkkdnaeTmbavcxfhrinabarIdbUdbarczfhrabclfhbaecufgembkkk8MbabaeadaialavcbcbcbcbcbaoarawaDz:bjjjbk8MbabaeadaialavaoarawaDaqakaxamaPz:bjjjbk:DCoDud99rue99iul998Jjjjjbc;Wb9Rgw8KjjjjbdndnarmbcbhDxekawcxfcbc;Kbz:ojjjb8Aawcuadcx2adc;v:Q;v:Qe0Ecbyd:m:jjjbHjjjjbbgqBdxawceBd2aqaeadaicbz:ejjjb8AawcuadcdtadcFFFFi0Egkcbyd:m:jjjbHjjjjbbgxBdzawcdBd2adcd4adfhmceheinaegicetheaiam6mbkcbhPawcuaicdtgsaicFFFFi0Ecbyd:m:jjjbHjjjjbbgzBdCawciBd2dndnar:ZgH:rJbbbZMgO:lJbbb9p9DTmbaO:Ohexekcjjjj94hekaicufhAc:bwhmcbhCadhXcbhQinaChLaeamgKcufaeaK9iEaPgDcefaeaD9kEhYdndnadTmbaYcuf:YhOaqhiaxheadhmindndnaiIdbaONJbbbZMg8A:lJbbb9p9DTmba8A:OhCxekcjjjj94hCkaCcCthCdndnaiclfIdbaONJbbbZMg8A:lJbbb9p9DTmba8A:OhExekcjjjj94hEkaEcqtaCVhCdndnaicwfIdbaONJbbbZMg8A:lJbbb9p9DTmba8A:OhExekcjjjj94hEkaeaCaEVBdbaicxfhiaeclfheamcufgmmbkazcFeasz:ojjjbh3cbh5cbhPindna3axaPcdtfydbgCcm4aC7c:v;t;h;Ev2gics4ai7aAGgmcdtfgEydbgecuSmbaeaCSmbcehiina3amaifaAGgmcdtfgEydbgecuSmeaicefhiaeaC9hmbkkaEaCBdba5aecuSfh5aPcefgPad9hmbxdkkazcFeasz:ojjjb8Acbh5kaDaYa5ar0giEhPaLa5aiEhCdna5arSmbaYaKaiEgmaP9Rcd9imbdndnaQcl0mbdnaX:ZgOaL:Zg8A:taY:Yg8EaD:Y:tg8Fa8EaK:Y:tgaa5:ZghaH:tNNNaOaH:taaNa8Aah:tNa8AaH:ta8FNahaO:tNM:va8EMJbbbZMgO:lJbbb9p9DTmbaO:Ohexdkcjjjj94hexekaPamfcd9Theka5aXaiEhXaQcefgQcs9hmekkdndnaCmbcihicbhDxekcbhiawakcbyd:m:jjjbHjjjjbbg5BdKawclBd2aPcuf:Yh8AdndnadTmbaqhiaxheadhmindndnaiIdba8ANJbbbZMgO:lJbbb9p9DTmbaO:OhCxekcjjjj94hCkaCcCthCdndnaiclfIdba8ANJbbbZMgO:lJbbb9p9DTmbaO:OhExekcjjjj94hEkaEcqtaCVhCdndnaicwfIdba8ANJbbbZMgO:lJbbb9p9DTmbaO:OhExekcjjjj94hEkaeaCaEVBdbaicxfhiaeclfheamcufgmmbkazcFeasz:ojjjbh3cbhDcbhYindndndna3axaYcdtgKfydbgCcm4aC7c:v;t;h;Ev2gics4ai7aAGgmcdtfgEydbgecuSmbcehiinaxaecdtgefydbaCSmdamaifheaicefhia3aeaAGgmcdtfgEydbgecu9hmbkkaEaYBdbaDhiaDcefhDxeka5aefydbhika5aKfaiBdbaYcefgYad9hmbkcuaDc32giaDc;j:KM;jb0EhexekazcFeasz:ojjjb8AcbhDcbhekawaecbyd:m:jjjbHjjjjbbgeBd3awcvBd2aecbaiz:ojjjbhEavcd4hKdnadTmbdnalTmbaKcdth3a5hCaqhealhmadhAinaEaCydbc32fgiaeIdbaiIdbMUdbaiaeclfIdbaiIdlMUdlaiaecwfIdbaiIdwMUdwaiamIdbaiIdxMUdxaiamclfIdbaiIdzMUdzaiamcwfIdbaiIdCMUdCaiaiIdKJbbjZMUdKaCclfhCaecxfheama3fhmaAcufgAmbxdkka5hmaqheadhCinaEamydbc32fgiaeIdbaiIdbMUdbaiaeclfIdbaiIdlMUdlaiaecwfIdbaiIdwMUdwaiaiIdxJbbbbMUdxaiaiIdzJbbbbMUdzaiaiIdCJbbbbMUdCaiaiIdKJbbjZMUdKamclfhmaecxfheaCcufgCmbkkdnaDTmbaEhiaDheinaiaiIdbJbbbbJbbjZaicKfIdbgO:vaOJbbbb9BEgONUdbaiclfgmaOamIdbNUdbaicwfgmaOamIdbNUdbaicxfgmaOamIdbNUdbaiczfgmaOamIdbNUdbaicCfgmaOamIdbNUdbaic3fhiaecufgembkkcbhCawcuaDcdtgYaDcFFFFi0Egicbyd:m:jjjbHjjjjbbgeBdaawcoBd2awaicbyd:m:jjjbHjjjjbbg3Bd8KaecFeaYz:ojjjbhxdnadTmbJbbjZJbbjZa8A:vaPceSEaoNgOaONh8AaKcdthPalheina8Aaec;81jjbalEgmIdwaEa5ydbgAc32fgiIdC:tgOaONamIdbaiIdx:tgOaONamIdlaiIdz:tgOaONMMNaqcwfIdbaiIdw:tgOaONaqIdbaiIdb:tgOaONaqclfIdbaiIdl:tgOaONMMMhOdndnaxaAcdtgifgmydbcuSmba3aifIdbaO9ETmekamaCBdba3aifaOUdbka5clfh5aqcxfhqaeaPfheadaCcefgC9hmbkkabaxaYz:njjjb8AcrhikaicdthiinaiTmeaic98fgiawcxffydbcbyd1:jjjbH:bjjjbbxbkkawc;Wbf8KjjjjbaDk:Ydidui99ducbhi8Jjjjjbca9Rglczfcwfcbyd11jjbBdbalcb8Pdj1jjb83izalcwfcbydN1jjbBdbalcb8Pd:m1jjb83ibdndnaembJbbjFhvJbbjFhoJbbjFhrxekadcd4cdthwincbhdinalczfadfgDabadfIdbgvaDIdbgoaoav9EEUdbaladfgDavaDIdbgoaoav9DEUdbadclfgdcx9hmbkabawfhbaicefgiae9hmbkalIdwalIdK:thralIdlalIdC:thoalIdbalIdz:thvkJbbbbavavJbbbb9DEgvaoaoav9DEgvararav9DEk9DeeuabcFeaicdtz:ojjjbhlcbhbdnadTmbindnalaeydbcdtfgiydbcu9hmbaiabBdbabcefhbkaeclfheadcufgdmbkkabk9teiucbcbyd:q:jjjbgeabcifc98GfgbBd:q:jjjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;teeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiaeydlBdlaiaeydwBdwaiaeydxBdxaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk:3eedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdxaialBdwaialBdlaialBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabk9teiucbcbyd:q:jjjbgeabcrfc94GfgbBd:q:jjjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik9:eiuZbhedndncbyd:q:jjjbgdaecztgi9nmbcuheadai9RcFFifcz4nbcuSmekadhekcbabae9Rcifc98Gcbyd:q:jjjbfgdBd:q:jjjbdnadZbcztge9nmbadae9RcFFifcz4nb8Akkk:Iedbcjwk1eFFuuFFuuFFuuFFuFFFuFFFuFbbbbbbbbeeebeebebbeeebebbbbbebebbbbbbbbbebbbdbbbbbbbebbbebbbdbbbbbbbbbbbeeeeebebbebbebebbbeebbbbbbbbbbbbbbbbbbbbbc1Dkxebbbdbbb:GNbb",t=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var a,s=WebAssembly.instantiate(r(e),{}).then(function(f){a=f.instance,a.exports.__wasm_call_ctors()});function r(f){for(var d=new Uint8Array(f.length),x=0;x<f.length;++x){var u=f.charCodeAt(x);d[x]=u>96?u-97:u>64?u-39:u+4}for(var h=0,x=0;x<f.length;++x)d[h++]=d[x]<60?t[d[x]]:(d[x]-60)*64+d[++x];return d.buffer.slice(0,h)}function n(f){if(!f)throw new Error("Assertion failed")}function i(f){return new Uint8Array(f.buffer,f.byteOffset,f.byteLength)}function o(f,d,x){var u=a.exports.sbrk,h=u(d.length*4),m=u(x*4),v=new Uint8Array(a.exports.memory.buffer),T=i(d);v.set(T,h);var k=f(m,h,d.length,x);v=new Uint8Array(a.exports.memory.buffer);var I=new Uint32Array(x);new Uint8Array(I.buffer).set(v.subarray(m,m+x*4)),T.set(v.subarray(h,h+d.length*4)),u(h-u(0));for(var M=0;M<d.length;++M)d[M]=I[d[M]];return[I,k]}function c(f){for(var d=0,x=0;x<f.length;++x){var u=f[x];d=d<u?u:d}return d}function l(f,d,x,u,h,m,v,T,k){var I=a.exports.sbrk,M=I(4),_=I(x*4),A=I(h*m),C=I(x*4),U=new Uint8Array(a.exports.memory.buffer);U.set(i(u),A),U.set(i(d),C);var B=f(_,C,x,A,h,m,v,T,k,M);U=new Uint8Array(a.exports.memory.buffer);var F=new Uint32Array(B);i(F).set(U.subarray(_,_+B*4));var q=new Float32Array(1);return i(q).set(U.subarray(M,M+4)),I(M-I(0)),[F,q[0]]}function p(f,d,x,u,h,m,v,T,k,I,M,_,A){var C=a.exports.sbrk,U=C(4),B=C(x*4),F=C(h*m),q=C(h*T),te=C(k.length*4),ne=C(x*4),je=I?C(h):0,de=new Uint8Array(a.exports.memory.buffer);de.set(i(u),F),de.set(i(v),q),de.set(i(k),te),de.set(i(d),ne),I&&de.set(i(I),je);var Fe=f(B,ne,x,F,h,m,q,T,te,k.length,je,M,_,A,U);de=new Uint8Array(a.exports.memory.buffer);var De=new Uint32Array(Fe);i(De).set(de.subarray(B,B+Fe*4));var me=new Float32Array(1);return i(me).set(de.subarray(U,U+4)),C(U-C(0)),[De,me[0]]}function g(f,d,x,u){var h=a.exports.sbrk,m=h(x*u),v=new Uint8Array(a.exports.memory.buffer);v.set(i(d),m);var T=f(m,x,u);return h(m-h(0)),T}function w(f,d,x,u,h,m,v,T){var k=a.exports.sbrk,I=k(T*4),M=k(x*u),_=k(x*m),A=new Uint8Array(a.exports.memory.buffer);A.set(i(d),M),h&&A.set(i(h),_);var C=f(I,M,x,u,_,m,v,T);A=new Uint8Array(a.exports.memory.buffer);var U=new Uint32Array(C);return i(U).set(A.subarray(I,I+C*4)),k(I-k(0)),U}var y={LockBorder:1,Sparse:2,ErrorAbsolute:4,Prune:8,_InternalDebug:1<<30};return{ready:s,supported:!0,compactMesh:function(f){n(f instanceof Uint32Array||f instanceof Int32Array||f instanceof Uint16Array||f instanceof Int16Array),n(f.length%3==0);var d=f.BYTES_PER_ELEMENT==4?f:new Uint32Array(f);return o(a.exports.meshopt_optimizeVertexFetchRemap,d,c(f)+1)},simplify:function(f,d,x,u,h,m){n(f instanceof Uint32Array||f instanceof Int32Array||f instanceof Uint16Array||f instanceof Int16Array),n(f.length%3==0),n(d instanceof Float32Array),n(d.length%x==0),n(x>=3),n(u>=0&&u<=f.length),n(u%3==0),n(h>=0);for(var v=0,T=0;T<(m?m.length:0);++T)n(m[T]in y),v|=y[m[T]];var k=f.BYTES_PER_ELEMENT==4?f:new Uint32Array(f),I=l(a.exports.meshopt_simplify,k,f.length,d,d.length/x,x*4,u,h,v);return I[0]=f instanceof Uint32Array?I[0]:new f.constructor(I[0]),I},simplifyWithAttributes:function(f,d,x,u,h,m,v,T,k,I){n(f instanceof Uint32Array||f instanceof Int32Array||f instanceof Uint16Array||f instanceof Int16Array),n(f.length%3==0),n(d instanceof Float32Array),n(d.length%x==0),n(x>=3),n(u instanceof Float32Array),n(u.length%h==0),n(h>=0),n(v==null||v instanceof Uint8Array),n(v==null||v.length==d.length/x),n(T>=0&&T<=f.length),n(T%3==0),n(k>=0),n(Array.isArray(m)),n(h>=m.length),n(m.length<=32);for(var M=0;M<m.length;++M)n(m[M]>=0);for(var _=0,M=0;M<(I?I.length:0);++M)n(I[M]in y),_|=y[I[M]];var A=f.BYTES_PER_ELEMENT==4?f:new Uint32Array(f),C=p(a.exports.meshopt_simplifyWithAttributes,A,f.length,d,d.length/x,x*4,u,h*4,new Float32Array(m),v?new Uint8Array(v):null,T,k,_);return C[0]=f instanceof Uint32Array?C[0]:new f.constructor(C[0]),C},getScale:function(f,d){return n(f instanceof Float32Array),n(f.length%d==0),n(d>=3),g(a.exports.meshopt_simplifyScale,f,f.length/d,d*4)},simplifyPoints:function(f,d,x,u,h,m){return n(f instanceof Float32Array),n(f.length%d==0),n(d>=3),n(x>=0&&x<=f.length/d),u?(n(u instanceof Float32Array),n(u.length%h==0),n(h>=3),n(f.length/d==u.length/h),w(a.exports.meshopt_simplifyPoints,f,f.length/d,d*4,u,h*4,m,x)):w(a.exports.meshopt_simplifyPoints,f,f.length/d,d*4,void 0,0,0,x)}}})();var Ug=(function(){var e="b9H79TebbbeVx9Geueu9Geub9Gbb9Giuuueu9Gmuuuuuuuuuuu9999eu9Gvuuuuueu9Gwuuuuuuuub9Gxuuuuuuuuuuuueu9Gkuuuuuuuuuu99eu9Gouuuuuub9Gruuuuuuub9GluuuubiOHdilvorwDqqkbiibeilve9Weiiviebeoweuec;G:Odkr:Yewo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9I919P29K9nW79O2Wt79c9V919U9KbeX9TW79O9V9Wt9F9I919P29K9nW79O2Wt7bo39TW79O9V9Wt9F9J9V9T9W91tWJ2917tWV9c9V919U9K7br39TW79O9V9Wt9F9J9V9T9W91tW9nW79O2Wt9c9V919U9K7bDL9TW79O9V9Wt9F9V9Wt9P9T9P96W9nW79O2Wtbql79IV9RbkDwebcekdsPq;Q9BHdbkIbabaec9:fgefcufae9Ugeabci9Uadfcufad9Ugbaeab0Ek:w8KDPue99eux99dui99euo99iu8Jjjjjbc:WD9Rgm8KjjjjbdndnalmbcbhPxekamc:Cwfcbc;Kbz:njjjb8Adndnalcb9imbaoal9nmbamcuaocdtaocFFFFi0Egscbyd;y1jjbHjjjjbbgzBd:CwamceBd;8wamascbyd;y1jjbHjjjjbbgHBd:GwamcdBd;8wamcualcdtalcFFFFi0Ecbyd;y1jjbHjjjjbbgOBd:KwamciBd;8waihsalhAinazasydbcdtfcbBdbasclfhsaAcufgAmbkaihsalhAinazasydbcdtfgCaCydbcefBdbasclfhsaAcufgAmbkaihsalhCcbhXindnazasydbcdtgQfgAydbcb9imbaHaQfaXBdbaAaAydbgQcjjjj94VBdbaQaXfhXkasclfhsaCcufgCmbkalci9UhLdnalci6mbcbhsaihAinaAcwfydbhCaAclfydbhXaHaAydbcdtfgQaQydbgQcefBdbaOaQcdtfasBdbaHaXcdtfgXaXydbgXcefBdbaOaXcdtfasBdbaHaCcdtfgCaCydbgCcefBdbaOaCcdtfasBdbaAcxfhAaLascefgs9hmbkkaihsalhAindnazasydbcdtgCfgXydbgQcu9kmbaXaQcFFFFrGgQBdbaHaCfgCaCydbaQ9RBdbkasclfhsaAcufgAmbxdkkamcuaocdtgsaocFFFFi0EgAcbyd;y1jjbHjjjjbbgzBd:CwamceBd;8wamaAcbyd;y1jjbHjjjjbbgHBd:GwamcdBd;8wamcualcdtalcFFFFi0Ecbyd;y1jjbHjjjjbbgOBd:KwamciBd;8wazcbasz:njjjbhXalci9UhLaihsalhAinaXasydbcdtfgCaCydbcefBdbasclfhsaAcufgAmbkdnaoTmbcbhsaHhAaXhCaohQinaAasBdbaAclfhAaCydbasfhsaCclfhCaQcufgQmbkkdnalci6mbcbhsaihAinaAcwfydbhCaAclfydbhQaHaAydbcdtfgKaKydbgKcefBdbaOaKcdtfasBdbaHaQcdtfgQaQydbgQcefBdbaOaQcdtfasBdbaHaCcdtfgCaCydbgCcefBdbaOaCcdtfasBdbaAcxfhAaLascefgs9hmbkkaoTmbcbhsaohAinaHasfgCaCydbaXasfydb9RBdbasclfhsaAcufgAmbkkamaLcbyd;y1jjbHjjjjbbgsBd:OwamclBd;8wascbaLz:njjjbhYamcuaLcK2alcjjjjd0Ecbyd;y1jjbHjjjjbbg8ABd:SwamcvBd;8wJbbbbhEdnalci6g3mbarcd4hKaihAa8AhsaLhrJbbbbh5inavaAclfydbaK2cdtfgCIdlh8EavaAydbaK2cdtfgXIdlhEavaAcwfydbaK2cdtfgQIdlh8FaCIdwhaaXIdwhhaQIdwhgasaCIdbg8JaXIdbg8KMaQIdbg8LMJbbnn:vUdbasclfaXIdlaCIdlMaQIdlMJbbnn:vUdbaQIdwh8MaCIdwh8NaXIdwhyascxfa8EaE:tg8Eagah:tggNa8FaE:tg8Faaah:tgaN:tgEJbbbbJbbjZa8Ja8K:tg8Ja8FNa8La8K:tg8Ka8EN:tghahNaEaENaaa8KNaga8JN:tgEaENMM:rg8K:va8KJbbbb9BEg8ENUdbasczfaEa8ENUdbascCfaha8ENUdbascwfa8Maya8NMMJbbnn:vUdba5a8KMh5aAcxfhAascKfhsarcufgrmbka5aL:Z:vJbbbZNhEkamcuaLcdtalcFFFF970Ecbyd;y1jjbHjjjjbbgCBd:WwamcoBd;8waEaq:ZNhEdna3mbcbhsaChAinaAasBdbaAclfhAaLascefgs9hmbkkaE:rhhcuh8PamcuaLcltalcFFFFd0Ecbyd;y1jjbHjjjjbbgIBd:0wamcrBd;8wcbaIa8AaCaLz:djjjb8AJFFuuhyJFFuuh8RJFFuuh8Sdnalci6gXmbJFFuuh8Sa8AhsaLhAJFFuuh8RJFFuuhyinascwfIdbgEayayaE9EEhyasclfIdbgEa8Ra8RaE9EEh8RasIdbgEa8Sa8SaE9EEh8SascKfhsaAcufgAmbkkahJbbbZNhgamaocetgscuaocu9kEcbyd;y1jjbHjjjjbbgABd:4waAcFeasz:njjjbhCdnaXmbcbhAJFFuuhEa8Ahscuh8PinascwfIdbay:tghahNasIdba8S:tghahNasclfIdba8R:tghahNMM:rghaEa8PcuSahaE9DVgXEhEaAa8PaXEh8PascKfhsaLaAcefgA9hmbkkamczfcbcjwz:njjjb8Aamcwf9cb83ibam9cb83ibagaxNhRJbbjZak:th8Ncbh8UJbbbbh8VJbbbbh8WJbbbbh8XJbbbbh8YJbbbbh8ZJbbbbh80cbh81cbhPinJbbbbhEdna8UTmbJbbjZa8U:Z:vhEkJbbbbhhdna80a80Na8Ya8YNa8Za8ZNMMg8KJbbbb9BmbJbbjZa8K:r:vhhka8XaENh5a8WaENh8Fa8VaENhaa8PhQdndndndndna8UaPVTmbamydwgBTmea80ahNh8Ja8ZahNh8La8YahNh8Maeamydbcdtfh83cbh3JFFuuhEcvhXcuhQindnaza83a3cdtfydbcdtgsfydbgvTmbaOaHasfydbcdtfhAindndnaCaiaAydbgKcx2fgsclfydbgrcetf8Vebcs4aCasydbgLcetf8Vebcs4faCascwfydbglcetf8Vebcs4fgombcbhsxekcehsazaLcdtfydbgLceSmbcehsazarcdtfydbgrceSmbcehsazalcdtfydbglceSmbdnarcdSaLcdSfalcdSfcd6mbaocefhsxekaocdfhskdnasaX9kmba8AaKcK2fgLIdwa5:thhaLIdla8F:th8KaLIdbaa:th8EdndnakJbbbb9DTmba8E:lg8Ea8K:lg8Ka8Ea8K9EEg8Kah:lgha8Kah9EEag:vJbbjZMhhxekahahNa8Ea8ENa8Ka8KNMM:rag:va8NNJbbjZMJ9VO:d86JbbjZaLIdCa8JNaLIdxa8MNa8LaLIdzNMMakN:tghahJ9VO:d869DENhhkaKaQasaX6ahaE9DVgLEhQasaXaLEhXahaEaLEhEkaAclfhAavcufgvmbkka3cefg3aB9hmbkkaQcu9hmekama5Ud:ODama8FUd:KDamaaUd:GDamcuBd:qDamcFFF;7rBdjDaIcba8AaYamc:GDfakJbbbb9Damc:qDfamcjDfz:ejjjbamyd:qDhQdndnaxJbbbb9ETmba8UaD6mbaQcuSmeceh3amIdjDaR9EmixdkaQcu9hmekdna8UTmbdnamydlgza8Uci2fgsciGTmbadasfcba8Uazcu7fciGcefz:njjjb8AkabaPcltfgzam8Pib83dbazcwfamcwf8Pib83dbaPcefhPkc3hzinazc98Smvamc:Cwfazfydbcbyd;u1jjbH:bjjjbbazc98fhzxbkkcbh3a8Uaq9pmbamydwaCaiaQcx2fgsydbcetf8Vebcs4aCascwfydbcetf8Vebcs4faCasclfydbcetf8Vebcs4ffaw9nmekcbhscbhAdna81TmbcbhAamczfhXinamczfaAcdtfaXydbgLBdbaXclfhXaAaYaLfRbbTfhAa81cufg81mbkkamydwhlamydbhXam9cu83i:GDam9cu83i:ODam9cu83i:qDam9cu83i:yDaAc;8eaAclfc:bd6Eh81inamcjDfasfcFFF;7rBdbasclfgscz9hmbka81cdthBdnalTmbaeaXcdtfhocbhrindnazaoarcdtfydbcdtgsfydbgvTmbaOaHasfydbcdtfhAcuhLcuhsinazaiaAydbgKcx2fgXclfydbcdtfydbazaXydbcdtfydbfazaXcwfydbcdtfydbfgXasaXas6gXEhsaKaLaXEhLaAclfhAavcufgvmbkaLcuSmba8AaLcK2fgAIdway:tgEaENaAIdba8S:tgEaENaAIdla8R:tgEaENMM:rhEcbhAindndnasamc:qDfaAfgvydbgX6mbasaX9hmeaEamcjDfaAfIdb9FTmekavasBdbamc:GDfaAfaLBdbamcjDfaAfaEUdbxdkaAclfgAcz9hmbkkarcefgral9hmbkkamczfaBfhLcbhscbhAindnamc:GDfasfydbgXcuSmbaLaAcdtfaXBdbaAcefhAkasclfgscz9hmbkaAa81fg81TmbJFFuuhhcuhKamczfhsa81hvcuhLina8AasydbgXcK2fgAIdway:tgEaENaAIdba8S:tgEaENaAIdla8R:tgEaENMM:rhEdndnazaiaXcx2fgAclfydbcdtfydbazaAydbcdtfydbfazaAcwfydbcdtfydbfgAaL6mbaAaL9hmeaEah9DTmekaEhhaAhLaXhKkasclfhsavcufgvmbkaKcuSmbaKhQkdnamaiaQcx2fgrydbarclfydbarcwfydbaCabaeadaPawaqa3z:fjjjbTmbaPcefhPJbbbbh8VJbbbbh8WJbbbbh8XJbbbbh8YJbbbbh8ZJbbbbh80kcbhXinaOaHaraXcdtfydbcdtgAfydbcdtfgKhsazaAfgvydbgLhAdnaLTmbdninasydbaQSmeasclfhsaAcufgATmdxbkkasaKaLcdtfc98fydbBdbavavydbcufBdbkaXcefgXci9hmbka8AaQcK2fgsIdbhEasIdlhhasIdwh8KasIdxh8EasIdzh5asIdCh8FaYaQfce86bba80a8FMh80a8Za5Mh8Za8Ya8EMh8Ya8Xa8KMh8Xa8WahMh8Wa8VaEMh8Vamydxh8Uxbkkamc:WDf8KjjjjbaPk;Vvivuv99lu8Jjjjjbca9Rgv8Kjjjjbdndnalcw0mbaiydbhoaeabcitfgralcdtcufBdlaraoBdbdnalcd6mbaiclfhoalcufhwarcxfhrinaoydbhDarcuBdbarc98faDBdbarcwfhraoclfhoawcufgwmbkkalabfhrxekcbhDavczfcwfcbBdbav9cb83izavcwfcbBdbav9cb83ibJbbjZhqJbbjZhkinadaiaDcdtfydbcK2fhwcbhrinavczfarfgoawarfIdbgxaoIdbgm:tgPakNamMgmUdbavarfgoaPaxam:tNaoIdbMUdbarclfgrcx9hmbkJbbjZaqJbbjZMgq:vhkaDcefgDal9hmbkcbhoadcbcecdavIdlgxavIdwgm9GEgravIdbgPam9GEaraPax9GEgscdtgrfhzavczfarfIdbhxaihralhwinaiaocdtfgDydbhHaDarydbgOBdbaraHBdbarclfhraoazaOcK2fIdbax9Dfhoawcufgwmbkaeabcitfhrdndnaocv6mbaoalc98f6mekaraiydbBdbaralcdtcufBdlaiclfhoalcufhwarcxfhrinaoydbhDarcuBdbarc98faDBdbarcwfhraoclfhoawcufgwmbkalabfhrxekaraxUdbararydlc98GasVBdlabcefaeadaiaoz:djjjbhwararydlciGawabcu7fcdtVBdlawaeadaiaocdtfalao9Rz:djjjbhrkavcaf8Kjjjjbark:;idiud99dndnabaecitfgwydlgDciGgqciSmbinabcbaDcd4gDalaqcdtfIdbawIdb:tgkJbbbb9FEgwaecefgefadaialavaoarz:ejjjbak:larIdb9FTmdabawaD7aefgecitfgwydlgDciGgqci9hmbkkabaecitfgeclfhbdnavmbcuhwindnaiaeydbgDfRbbmbadaDcK2fgqIdwalIdw:tgkakNaqIdbalIdb:tgkakNaqIdlalIdl:tgkakNMM:rgkarIdb9DTmbarakUdbaoaDBdbkaecwfheawcefgwabydbcd46mbxdkkcuhwindnaiaeydbgDfRbbmbadaDcK2fgqIdbalIdb:t:lgkaqIdlalIdl:t:lgxakax9EEgkaqIdwalIdw:t:lgxakax9EEgkarIdb9DTmbarakUdbaoaDBdbkaecwfheawcefgwabydbcd46mbkkk;llevudnabydwgxaladcetfgm8Vebcs4alaecetfgP8Vebgscs4falaicetfgz8Vebcs4ffaD0abydxaq9pVakVgDce9hmbavawcltfgxab8Pdb83dbaxcwfabcwfgx8Pdb83dbdnaxydbgqTmbaoabydbcdtfhxaqhsinalaxydbcetfcFFi87ebaxclfhxascufgsmbkkdnabydxglci2gsabydlgxfgkciGTmbarakfcbalaxcu7fciGcefz:njjjb8Aabydxci2hsabydlhxabydwhqkab9cb83dwababydbaqfBdbabascifc98GaxfBdlaP8Vebhscbhxkdnascztcz91cu9kmbabaxcefBdwaPax87ebaoabydbcdtfaxcdtfaeBdbkdnam8Uebcu9kmbababydwgxcefBdwamax87ebaoabydbcdtfaxcdtfadBdbkdnaz8Uebcu9kmbababydwgxcefBdwazax87ebaoabydbcdtfaxcdtfaiBdbkarabydlfabydxci2faPRbb86bbarabydlfabydxci2fcefamRbb86bbarabydlfabydxci2fcdfazRbb86bbababydxcefBdxaDk8LbabaeadaialavaoarawaDaDaqJbbbbz:cjjjbk;Nkovud99euv99eul998Jjjjjbc:W;ae9Rgo8KjjjjbdndnadTmbavcd4hrcbhwcbhDindnaiaeclfydbar2cdtfgvIdbaiaeydbar2cdtfgqIdbgk:tgxaiaecwfydbar2cdtfgmIdlaqIdlgP:tgsNamIdbak:tgzavIdlaP:tgPN:tgkakNaPamIdwaqIdwgH:tgONasavIdwaH:tgHN:tgPaPNaHazNaOaxN:tgxaxNMM:rgsJbbbb9Bmbaoc:W:qefawcx2fgAakas:vUdwaAaxas:vUdlaAaPas:vUdbaoc8Wfawc8K2fgAaq8Pdb83dbaAav8Pdb83dxaAam8Pdb83dKaAcwfaqcwfydbBdbaAcCfavcwfydbBdbaAcafamcwfydbBdbawcefhwkaecxfheaDcifgDad6mbkab9cb83dbabcyf9cb83dbabcaf9cb83dbabcKf9cb83dbabczf9cb83dbabcwf9cb83dbawTmeaocbBd8Sao9cb83iKao9cb83izaoczfaoc8Wfawci2cxaoc8Sfcbcrz1jjjbaoIdKhCaoIdChXaoIdzhQao9cb83iwao9cb83ibaoaoc:W:qefawcxaoc8Sfcbciz1jjjbJbbjZhkaoIdwgPJbbbbJbbjZaPaPNaoIdbgPaPNaoIdlgsasNMM:rgx:vaxJbbbb9BEgzNhxasazNhsaPazNhzaoc:W:qefheawhvinaecwfIdbaxNaeIdbazNasaeclfIdbNMMgPakaPak9DEhkaecxfheavcufgvmbkabaCUdwabaXUdlabaQUdbabaoId3UdxdndnakJ;n;m;m899FmbJbbbbhPaoc:W:qefheaoc8WfhvinaCavcwfIdb:taecwfIdbgHNaQavIdb:taeIdbgONaXavclfIdb:taeclfIdbgLNMMaxaHNazaONasaLNMM:vgHaPaHaP9EEhPavc8KfhvaecxfheawcufgwmbkabaxUd8KabasUdaabazUd3abaCaxaPN:tUdKabaXasaPN:tUdCabaQazaPN:tUdzabJbbjZakakN:t:rgkUdydndnaxJbbj:;axJbbj:;9GEgPJbbjZaPJbbjZ9FEJbb;:9cNJbbbZJbbb:;axJbbbb9GEMgP:lJbbb9p9DTmbaP:Ohexekcjjjj94hekabae86b8UdndnasJbbj:;asJbbj:;9GEgPJbbjZaPJbbjZ9FEJbb;:9cNJbbbZJbbb:;asJbbbb9GEMgP:lJbbb9p9DTmbaP:Ohvxekcjjjj94hvkabav86bRdndnazJbbj:;azJbbj:;9GEgPJbbjZaPJbbjZ9FEJbb;:9cNJbbbZJbbb:;azJbbbb9GEMgP:lJbbb9p9DTmbaP:Ohqxekcjjjj94hqkabaq86b8SdndnaecKtcK91:YJbb;:9c:vax:t:lavcKtcK91:YJbb;:9c:vas:t:laqcKtcK91:YJbb;:9c:vaz:t:lakMMMJbb;:9cNJbbjZMgk:lJbbb9p9DTmbak:Ohexekcjjjj94hekaecFbaecFb9iEhexekabcjjj;8iBdycFbhekabae86b8Vxekab9cb83dbabcyf9cb83dbabcaf9cb83dbabcKf9cb83dbabczf9cb83dbabcwf9cb83dbkaoc:W;aef8Kjjjjbk;Iwwvul99iud99eue99eul998Jjjjjbcje9Rgr8Kjjjjbavcd4hwaicd4hDdndnaoTmbarc;abfcbaocdtgvz:njjjb8Aarc;Gbfcbavz:njjjb8AarhvarcafhiaohqinavcFFF97BdbaicFFF;7rBdbaiclfhiavclfhvaqcufgqmbkdnadTmbcbhkinaeakaD2cdtfgvIdwhxavIdlhmavIdbhPalakaw2cdtfIdbhsarc;abfhzarhiarc;GbfhHarcafhqcj1jjbhvaohOinasavcwfIdbaxNavIdbaPNavclfIdbamNMMgAMhCakhXdnaAas:tgAaqIdbgQ9DgLmbaHydbhXkaHaXBdbakhXdnaCaiIdbgK9EmbazydbhXaKhCkazaXBdbaiaCUdbaqaAaQaLEUdbavcxfhvaqclfhqaHclfhHaiclfhiazclfhzaOcufgOmbkakcefgkad9hmbkkadThkJbbbbhCcbhXarc;abfhvarc;Gbfhicbhqinalavydbgzaw2cdtfIdbalaiydbgHaw2cdtfIdbaeazaD2cdtfgzIdwaeaHaD2cdtfgHIdw:tgsasNazIdbaHIdb:tgsasNazIdlaHIdl:tgsasNMM:rMMgsaCasaC9EgzEhCaqaXazEhXaiclfhiavclfhvaoaqcefgq9hmbkaCJbbbZNhKxekadThkcbhXJbbbbhKkJbbbbhCdnaearc;abfaXcdtgifydbgqaD2cdtfgvIdwaearc;GbfaifydbgzaD2cdtfgiIdwgm:tgsasNavIdbaiIdbgY:tgAaANavIdlaiIdlgP:tgQaQNMM:rgxJbbbb9ETmbaxalaqaw2cdtfIdbMalazaw2cdtfIdb:taxaxM:vhCkasaCNamMhmaQaCNaPMhPaAaCNaYMhYdnakmbaDcdthvawcdthiindnalIdbg8AaecwfIdbam:tgCaCNaeIdbaY:tgsasNaeclfIdbaP:tgAaANMM:rgQMgEaK9ETmbJbbbbhxdnaQJbbbb9ETmbaEaK:taQaQM:vhxkaxaCNamMhmaxaANaPMhPaxasNaYMhYa8AaKaQMMJbbbZNhKkaeavfhealaifhladcufgdmbkkabaKUdxabamUdwabaPUdlabaYUdbarcjef8Kjjjjbkjeeiu8Jjjjjbcj8W9Rgr8Kjjjjbaici2hwdnaiTmbawceawce0EhDarhiinaiaeadRbbcdtfydbBdbadcefhdaiclfhiaDcufgDmbkkabarawaladaoz:hjjjbarcj8Wf8Kjjjjbk:3lequ8JjjjjbcjP9Rgl8Kjjjjbcbhvalcjxfcbaiz:njjjb8AdndnadTmbcjehoaehrincuhwarhDcuhqavhkdninawakaoalcjxfaDcefRbbfRbb9RcFeGci6aoalcjxfaDRbbfRbb9RcFeGci6faoalcjxfaDcdfRbbfRbb9RcFeGci6fgxaq9mgmEhwdnammbaxce0mdkaxaqaxaq9kEhqaDcifhDadakcefgk9hmbkkaeawci2fgDcdfRbbhqaDcefRbbhxaDRbbhkaeavci2fgDcifaDawav9Rci2z:qjjjb8Aakalcjxffaocefgo86bbaxalcjxffao86bbaDcdfaq86bbaDcefax86bbaDak86bbaqalcjxffao86bbarcifhravcefgvad9hmbkalcFeaicetz:njjjbhoadci2gDceaDce0EhqcbhxindnaoaeRbbgkcetfgw8UebgDcu9kmbawax87ebaocjlfaxcdtfabakcdtfydbBdbaxhDaxcefhxkaeaD86bbaecefheaqcufgqmbkaxcdthDxekcbhDkabalcjlfaDz:mjjjb8AalcjPf8Kjjjjbk9teiucbcbyd;C1jjbgeabcifc98GfgbBd;C1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;teeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiaeydlBdlaiaeydwBdwaiaeydxBdxaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk:3eedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdxaialBdwaialBdlaialBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabk9teiucbcbyd;C1jjbgeabcrfc94GfgbBd;C1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik9:eiuZbhedndncbyd;C1jjbgdaecztgi9nmbcuheadai9RcFFifcz4nbcuSmekadhekcbabae9Rcifc98Gcbyd;C1jjbfgdBd;C1jjbdnadZbcztge9nmbadae9RcFFifcz4nb8Akk:;Deludndndnadch9pmbabaeSmdaeabadfgi9Rcbadcet9R0mekabaead;8qbbxekaeab7ciGhldndndnabae9pmbdnalTmbadhvabhixikdnabciGmbadhvabhixdkadTmiabaeRbb86bbadcufhvdnabcefgiciGmbaecefhexdkavTmiabaeRbe86beadc9:fhvdnabcdfgiciGmbaecdfhexdkavTmiabaeRbd86bdadc99fhvdnabcifgiciGmbaecifhexdkavTmiabaeRbi86biabclfhiaeclfheadc98fhvxekdnalmbdnaiciGTmbadTmlabadcufgifglaeaifRbb86bbdnalciGmbaihdxekaiTmlabadc9:fgifglaeaifRbb86bbdnalciGmbaihdxekaiTmlabadc99fgifglaeaifRbb86bbdnalciGmbaihdxekaiTmlabadc98fgdfaeadfRbb86bbkadcl6mbdnadc98fgocd4cefciGgiTmbaec98fhlabc98fhvinavadfaladfydbBdbadc98fhdaicufgimbkkaocx6mbaec9Wfhvabc9WfhoinaoadfgicxfavadfglcxfydbBdbaicwfalcwfydbBdbaiclfalclfydbBdbaialydbBdbadc9Wfgdci0mbkkadTmdadhidnadciGglTmbaecufhvabcufhoadhiinaoaifavaifRbb86bbaicufhialcufglmbkkadcl6mdaec98fhlabc98fhvinavaifgecifalaifgdcifRbb86bbaecdfadcdfRbb86bbaecefadcefRbb86bbaeadRbb86bbaic98fgimbxikkavcl6mbdnavc98fglcd4cefcrGgdTmbavadcdt9RhvinaiaeydbBdbaeclfheaiclfhiadcufgdmbkkalc36mbinaiaeydbBdbaiaeydlBdlaiaeydwBdwaiaeydxBdxaiaeydzBdzaiaeydCBdCaiaeydKBdKaiaeyd3Bd3aecafheaicafhiavc9Gfgvci0mbkkavTmbdndnavcrGgdmbavhlxekavc94GhlinaiaeRbb86bbaicefhiaecefheadcufgdmbkkavcw6mbinaiaeRbb86bbaiaeRbe86beaiaeRbd86bdaiaeRbi86biaiaeRbl86blaiaeRbv86bvaiaeRbo86boaiaeRbr86braicwfhiaecwfhealc94fglmbkkabkk9Tdbcjwk9ubbjZbbbbbbbbbbbbbbjZbbbbbbbbbbbbbbjZ86;nAZ86;nAZ86;nAZ86;nA:;86;nAZ86;nAZ86;nAZ86;nA:;86;nAZ86;nAZ86;nAZ86;nA:;bc;uwkxebbbdbbb9GNbb",t=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var a,s=WebAssembly.instantiate(r(e),{}).then(function(f){a=f.instance,a.exports.__wasm_call_ctors()});function r(f){for(var d=new Uint8Array(f.length),x=0;x<f.length;++x){var u=f.charCodeAt(x);d[x]=u>96?u-97:u>64?u-39:u+4}for(var h=0,x=0;x<f.length;++x)d[h++]=d[x]<60?t[d[x]]:(d[x]-60)*64+d[++x];return d.buffer.slice(0,h)}function n(f){if(!f)throw new Error("Assertion failed")}function i(f){return new Uint8Array(f.buffer,f.byteOffset,f.byteLength)}var o=48,c=16;function l(f,d){var x=f.meshlets[d*4+0],u=f.meshlets[d*4+1],h=f.meshlets[d*4+2],m=f.meshlets[d*4+3];return{vertices:f.vertices.subarray(x,x+h),triangles:f.triangles.subarray(u,u+m*3)}}function p(f,d,x,u,h,m,v){var T=a.exports.sbrk,k=a.exports.meshopt_buildMeshletsBound(f.length,h,m),I=T(k*c),M=T(k*h*4),_=T(k*m*3),A=T(f.byteLength),C=T(d.byteLength),U=new Uint8Array(a.exports.memory.buffer);U.set(i(f),A),U.set(i(d),C);var B=a.exports.meshopt_buildMeshlets(I,M,_,A,f.length,C,x,u,h,m,v);U=new Uint8Array(a.exports.memory.buffer);for(var F=U.subarray(I,I+B*c),q=new Uint32Array(F.buffer,F.byteOffset,F.byteLength/4).slice(),te=0;te<B;++te){var ne=q[te*4+0],je=q[te*4+1],x=q[te*4+2],de=q[te*4+3];a.exports.meshopt_optimizeMeshlet(M+ne*4,_+je,de,x)}var Fe=q[(B-1)*4+0],De=q[(B-1)*4+1],me=q[(B-1)*4+2],Ve=q[(B-1)*4+3],Ue=Fe+me,Qe=De+(Ve*3+3&-4),At={meshlets:q,vertices:new Uint32Array(U.buffer,M,Ue).slice(),triangles:new Uint8Array(U.buffer,_,Qe*3).slice(),meshletCount:B};return T(I-T(0)),At}function g(f){var d=new Float32Array(a.exports.memory.buffer,f,o/4);return{centerX:d[0],centerY:d[1],centerZ:d[2],radius:d[3],coneApexX:d[4],coneApexY:d[5],coneApexZ:d[6],coneAxisX:d[7],coneAxisY:d[8],coneAxisZ:d[9],coneCutoff:d[10]}}function w(f,d,x,u){var h=a.exports.sbrk,m=[],v=h(d.byteLength),T=h(f.vertices.byteLength),k=h(f.triangles.byteLength),I=h(o),M=new Uint8Array(a.exports.memory.buffer);M.set(i(d),v),M.set(i(f.vertices),T),M.set(i(f.triangles),k);for(var _=0;_<f.meshletCount;++_){var A=f.meshlets[_*4+0],C=f.meshlets[_*4+0+1],U=f.meshlets[_*4+0+3];a.exports.meshopt_computeMeshletBounds(I,T+A*4,k+C,U,v,x,u),m.push(g(I))}return h(v-h(0)),m}function y(f,d,x,u){var h=a.exports.sbrk,m=h(o),v=h(f.byteLength),T=h(d.byteLength),k=new Uint8Array(a.exports.memory.buffer);k.set(i(f),v),k.set(i(d),T),a.exports.meshopt_computeClusterBounds(m,v,f.length,T,x,u);var I=g(m);return h(m-h(0)),I}return{ready:s,supported:!0,buildMeshlets:function(f,d,x,u,h,m){n(f.length%3==0),n(d instanceof Float32Array),n(d.length%x==0),n(x>=3),n(u<=256||u>0),n(h<=512),n(h%4==0),m=m||0;var v=f.BYTES_PER_ELEMENT==4?f:new Uint32Array(f);return p(v,d,d.length/x,x*4,u,h,m)},computeClusterBounds:function(f,d,x){n(f.length%3==0),n(f.length/3<=512),n(d instanceof Float32Array),n(d.length%x==0),n(x>=3);var u=f.BYTES_PER_ELEMENT==4?f:new Uint32Array(f);return y(u,d,d.length/x,x*4)},computeMeshletBounds:function(f,d,x){return n(f.meshletCount!=0),n(d instanceof Float32Array),n(d.length%x==0),n(x>=3),w(f,d,d.length/x,x*4)},extractMeshlet:function(f,d){return n(d>=0&&d<f.meshletCount),l(f,d)}}})();var Nl=new Vr().registerExtensions([_s,Ns,js]).registerDependencies({"meshopt.decoder":Fs});async function _a(e,t={}){await Fs.ready;let a=await fetch(e,{cache:t.fetchCache||"no-store"});if(!a.ok)throw new Error(`Failed to load ${e}: ${a.status}`);let s=new Uint8Array(await a.arrayBuffer()),r=await Nl.readBinary(s),n=[],i=t.componentFeatures||new Map,o=new Map;function c(l,p=""){let g=i.has(l.getName());g&&o.set(l.getName(),(o.get(l.getName())||0)+1);let w=g?l.getName():p,y=l.getMesh();if(y){let f=l.getWorldMatrix();for(let d of y.listPrimitives()){let x=d.getAttribute("POSITION"),u=d.getAttribute("NORMAL"),h=d.getAttribute("_FEATURE_ID_0"),m=d.getAttribute("_FEATURE_ID_1"),v=d.getIndices()?.getArray();if(!x||!v)continue;let T=x.getCount(),k=new Float32Array(T*3),I=new Float32Array(T*3),M=new Uint32Array(T),_=new Uint32Array(T),A=[1/0,1/0,1/0,-1/0,-1/0,-1/0],C=[],U=i.get(w)?.featureId||t.defaultFeatureId||0;for(let F=0;F<T;F+=1)x.getElement(F,C),jl(k,F*3,C,f),A[0]=Math.min(A[0],k[F*3]),A[1]=Math.min(A[1],k[F*3+1]),A[2]=Math.min(A[2],k[F*3+2]),A[3]=Math.max(A[3],k[F*3]),A[4]=Math.max(A[4],k[F*3+1]),A[5]=Math.max(A[5],k[F*3+2]),u?(u.getElement(F,C),Fl(I,F*3,C,f)):I.set([0,0,1],F*3),M[F]=Number(h?.getScalar(F)||0),_[F]=Number(m?m.getScalar(F)||0:U);let B=d.getMaterial();n.push({position:k,normal:I,netId:M,objectFeatureId:_,indices:v,designator:w,nodeName:l.getName(),meshName:y.getName(),bounds:A,material:B?{name:B.getName(),baseColor:B.getBaseColorFactor(),metallic:B.getMetallicFactor(),roughness:B.getRoughnessFactor(),emissive:B.getEmissiveFactor()}:{baseColor:t.baseColor||[.55,.58,.64,1],metallic:.05,roughness:.72,emissive:[0,0,0]}})}}for(let f of l.listChildren())c(f,w)}for(let l of r.getRoot().listScenes())for(let p of l.listChildren())c(p);return{byteLength:s.byteLength,primitives:n,componentNodeCounts:o}}function jl(e,t,a,s){let r=s[0]*a[0]+s[4]*a[1]+s[8]*a[2]+s[12],n=s[1]*a[0]+s[5]*a[1]+s[9]*a[2]+s[13],i=s[2]*a[0]+s[6]*a[1]+s[10]*a[2]+s[14];e[t]=r,e[t+1]=-i,e[t+2]=n}function Fl(e,t,a,s){let r=s[0]*a[0]+s[4]*a[1]+s[8]*a[2],n=s[1]*a[0]+s[5]*a[1]+s[9]*a[2],i=s[2]*a[0]+s[6]*a[1]+s[10]*a[2],o=Math.hypot(r,n,i)||1;e[t]=r/o,e[t+1]=-i/o,e[t+2]=n/o}var Na=`
struct Occurrence {
  model: mat4x4f,
  normal: mat4x4f,
};
@group(0) @binding(5) var<storage, read> occurrences: array<Occurrence>;
`,ja=Object.freeze([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);function Cl(e){let t=e?.matrix??e;if(!t||typeof t.length!="number"||t.length!==16)throw new TypeError("An occurrence matrix must have 16 numbers (column-major)");let a=Array.from(t,Number);if(!a.every(Number.isFinite))throw new TypeError("An occurrence matrix must be finite");if(a[3]!==0||a[7]!==0||a[11]!==0||a[15]!==1)throw new TypeError("An occurrence matrix must be affine (last row 0 0 0 1)");return a}function Bl(e){let[t,a,s,,r,n,i,,o,c,l]=e,p=n*l-c*i,g=c*s-a*l,w=a*i-n*s,y=o*i-r*l,f=t*l-o*s,d=r*s-t*i,x=r*c-o*n,u=o*a-t*c,h=t*n-r*a,m=t*p+r*g+o*w;if(m===0)throw new TypeError("An occurrence matrix must be invertible");let v=m<0?-1:1;return[v*p,v*y,v*x,0,v*g,v*f,v*u,0,v*w,v*d,v*h,0,0,0,0,1]}function Bs(e){let t=new Float32Array(Math.max(1,e.length)*32);return e.forEach((a,s)=>{let r=s*32;t.set(a,r),t.set(Bl(a),r+16)}),t}function xn(e){let t=new ArrayBuffer(Math.max(1,e.length)*48),a=new DataView(t);return e.forEach((s,r)=>{let n=r*48;a.setFloat32(n,s.centerMm[0]/1e3,!0),a.setFloat32(n+4,-s.centerMm[1]/1e3,!0),a.setFloat32(n+8,Math.min(s.drillWidthMm,s.drillHeightMm)/2e3,!0),a.setFloat32(n+12,Math.max(s.outerWidthMm,s.outerHeightMm)/2e3,!0),a.setFloat32(n+16,s.startZMm/1e3,!0),a.setFloat32(n+20,s.endZMm/1e3,!0),a.setUint32(n+32,s.netId||0,!0),a.setUint32(n+36,s.objectFeatureId||0,!0),a.setUint32(n+40,s.startLayerId||0,!0),a.setUint32(n+44,s.endLayerId||0,!0)}),t}function Os(e,t){let[a,s,r]=t;return[e[0]*a+e[4]*s+e[8]*r+e[12],e[1]*a+e[5]*s+e[9]*r+e[13],e[2]*a+e[6]*s+e[10]*r+e[14]]}function Ps(e,t){if(!t)return null;let a=[1/0,1/0,1/0,-1/0,-1/0,-1/0];for(let s=0;s<8;s+=1){let r=Os(e,[t[s&1?3:0],t[s&2?4:1],t[s&4?5:2]]);for(let n=0;n<3;n+=1)a[n]=Math.min(a[n],r[n]),a[n+3]=Math.max(a[n+3],r[n])}return a}function yn(e,t){if(!t||!e.length)return t||null;if(e.length===1&&Ht(e[0]))return t;let a=e.map(s=>Ps(s,t));return[0,1,2,3,4,5].map(s=>s<3?Math.min(...a.map(r=>r[s])):Math.max(...a.map(r=>r[s])))}function Ht(e){return e.every((t,a)=>t===ja[a])}var Ol=0,Cs=4294901760,Pl=Cs-1;function vn(e,t){let a=e>>>0,s=t>>>0;return a===Ol?{kind:"none",occurrenceIndex:-1,featureId:0}:a>=Cs?{kind:"gizmo",occurrenceIndex:-1,featureId:0,gizmoPart:a-Cs,gizmoValue:s}:{kind:s?"feature":"board",occurrenceIndex:a-1,featureId:s}}function wn(e){let t=Array.from(e);if(t.length>Pl)throw new RangeError("Too many occurrences for the pick target");let a=t.map(Cl),s=t.map((r,n)=>r&&!Array.isArray(r)&&!ArrayBuffer.isView(r)&&r.key!=null?String(r.key):String(n));if(new Set(s).size!==s.length)throw new TypeError("Occurrence keys must be unique");return{matrices:a,keys:s}}function Tn(e,t,a){let[s,r,n]=t,i=e[0]*s+e[4]*r+e[8]*n+e[12],o=e[1]*s+e[5]*r+e[9]*n+e[13],c=e[2]*s+e[6]*r+e[10]*n+e[14],l=e[3]*s+e[7]*r+e[11]*n+e[15];return!(l>0)||c<0||c>l?null:{x:a.x+(i/l*.5+.5)*a.width,y:a.y+(.5-o/l*.5)*a.height}}var Ds=`
fn featureHidden(id: u32) -> bool {
  return id < arrayLength(&hiddenMask) && hiddenMask[id] == 0u;
}
`;function Fa(e){let t=new Set;if(e==null)return t;for(let a of e){let s=Number(a);!Number.isInteger(s)||s<=0||s>4294967295||t.add(s)}return t}function En(e,t=0){let a=0;for(let n of Fa(e))a=Math.max(a,n);let s=64,r=a+1;for(;s<r;)s*=2;return Math.max(s,Math.floor(t)||0)}function kn(e,t){let a=Math.max(64,Math.floor(t)||0),s=new Uint32Array(a);s.fill(1);for(let r of Fa(e))r<a&&(s[r]=0);return s}var Rn=40,Ca=256,In=112,Rt="rg32uint",An=`
struct Globals {
  viewProjection: mat4x4f,
  activeNet: u32,
  selectedLayer: u32,
  time: f32,
  hasHighlight: f32,
  selectedFeature: u32,
  padding0: u32,
  padding1: u32,
  padding2: u32,
  lightDirection: vec4f,
};
struct Draw {
  color: vec4f,
  material: vec4f,
  offset: vec4f,
  flags: vec4f,
};
@group(0) @binding(0) var<uniform> globals: Globals;
@group(0) @binding(1) var<uniform> draw: Draw;
@group(0) @binding(3) var<storage, read> hiddenMask: array<u32>;
@group(0) @binding(4) var<storage, read> netMask: array<u32>;
${Ds}
${bs}

struct VertexInput {
  @location(0) position: vec3f,
  @location(1) normal: vec3f,
  @location(2) netId: u32,
  @location(3) objectId: u32,
  @location(4) layerId: u32,
  @location(5) materialId: u32,
};
struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) normal: vec3f,
  @location(1) @interpolate(flat) netId: u32,
  @location(2) @interpolate(flat) objectId: u32,
  @location(3) world: vec3f,
};
@vertex fn vs(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;
  output.world = input.position + draw.offset.xyz;
  output.position = globals.viewProjection * vec4f(output.world, 1.0);
  output.normal = normalize(input.normal);
  output.netId = input.netId;
  output.objectId = input.objectId;
  return output;
}
fn aces(color: vec3f) -> vec3f {
  let a = 2.51;
  let b = 0.03;
  let c = 2.43;
  let d = 0.59;
  let e = 0.14;
  return clamp((color * (a * color + b)) / (color * (c * color + d) + e), vec3f(0), vec3f(1));
}
@fragment fn fs(input: VertexOutput) -> @location(0) vec4f {
  let kind = u32(draw.flags.x);
  let copper = kind == 1u;
  let component = kind == 2u;
  if (component && featureHidden(input.objectId)) { discard; }
  let selected = netEmphasized(input.netId) || (globals.activeNet != 0u && input.netId == globals.activeNet);
  let selectedComponent = component && globals.selectedFeature != 0u && input.objectId == globals.selectedFeature;
  var base = draw.color.rgb;
  if (selected && copper) {
    if (draw.flags.z < 0.5) {
      let pulse = 0.88 + 0.12 * sin(globals.time * 3.2);
      base = vec3f(0.08, 1.0, 0.2) * pulse;
    }
  } else if (globals.hasHighlight > 0.5 && copper) {
    base = mix(base, vec3f(0.12, 0.14, 0.17), 0.58);
  }
  if (selectedComponent) {
    let pulse = 0.84 + 0.16 * sin(globals.time * 3.6);
    base = mix(base, vec3f(0.15, 0.72, 1.0) * pulse, 0.72);
  }
  if (draw.flags.z > 0.5 && copper && !selected) { discard; }
  let normal = normalize(input.normal);
  let light = normalize(globals.lightDirection.xyz);
  let diffuse = max(dot(normal, light), 0.0);
  let hemi = mix(0.28, 0.62, normal.z * 0.5 + 0.5);
  let roughness = clamp(draw.material.y, 0.05, 1.0);
  let metallic = clamp(draw.material.x, 0.0, 1.0);
  let specular = pow(max(dot(normal, normalize(light + vec3f(0.3, -0.4, 0.85))), 0.0), mix(96.0, 6.0, roughness));
  let shaded = base * (hemi + diffuse * 0.72) + mix(vec3f(0.04), base, metallic) * specular * 0.5;
  var lit = shaded;
  if (draw.flags.w > 0.5) {
    lit = base;
  }
  return vec4f(aces(lit), draw.flags.y);
}
`,Sn=`
struct Globals {
  viewProjection: mat4x4f,
  activeNet: u32,
  selectedLayer: u32,
  time: f32,
  hasHighlight: f32,
  selectedFeature: u32,
  padding0: u32,
  padding1: u32,
  padding2: u32,
  lightDirection: vec4f,
};
struct Draw { color: vec4f, material: vec4f, offset: vec4f, flags: vec4f };
@group(0) @binding(0) var<uniform> globals: Globals;
@group(0) @binding(1) var<uniform> draw: Draw;
@group(0) @binding(3) var<storage, read> hiddenMask: array<u32>;
${Ds}
struct Input {
  @location(0) position: vec3f,
  @location(1) normal: vec3f,
  @location(2) netId: u32,
  @location(3) objectId: u32,
  @location(4) layerId: u32,
  @location(5) materialId: u32,
};
struct Output {
  @builtin(position) position: vec4f,
  @location(0) @interpolate(flat) objectId: u32,
};
@vertex fn vs(input: Input) -> Output {
  var output: Output;
  output.position = globals.viewProjection * vec4f(input.position + draw.offset.xyz, 1.0);
  output.objectId = input.objectId;
  return output;
}
@fragment fn fs(input: Output) -> @location(0) vec2u {
  if (u32(draw.flags.x) == 2u && featureHidden(input.objectId)) { discard; }
  return vec2u(1u, input.objectId);
}
`,_n=`
struct Globals {
  viewProjection: mat4x4f,
  activeNet: u32,
  selectedLayer: u32,
  time: f32,
  hasHighlight: f32,
  selectedFeature: u32,
  padding0: u32,
  padding1: u32,
  padding2: u32,
  lightDirection: vec4f,
};
struct Draw { color: vec4f, material: vec4f, offset: vec4f, flags: vec4f };
@group(0) @binding(0) var<uniform> globals: Globals;
@group(0) @binding(1) var<uniform> draw: Draw;
@group(0) @binding(2) var<storage, read> layerOffsets: array<f32>;
@group(0) @binding(4) var<storage, read> netMask: array<u32>;
${bs}
struct Input {
  @location(0) unit: vec3f,
  @location(1) normal: vec3f,
  @location(2) radiusMix: f32,
  @location(3) dimensions: vec4f,
  @location(4) span: vec2f,
  @location(5) ids: vec4u,
};
struct Output {
  @builtin(position) position: vec4f,
  @location(0) normal: vec3f,
  @location(1) @interpolate(flat) netId: u32,
  @location(2) @interpolate(flat) objectId: u32,
  @location(3) @interpolate(flat) visible: u32,
};
@vertex fn vs(input: Input) -> Output {
  let radius = mix(input.dimensions.z, input.dimensions.w, input.radiusMix);
  let z0 = input.span.x + layerOffsets[input.ids.z];
  let z1 = input.span.y + layerOffsets[input.ids.w];
  let world = vec3f(
    input.dimensions.x + input.unit.x * radius,
    input.dimensions.y + input.unit.y * radius,
    mix(z0, z1, input.unit.z)
  );
  var output: Output;
  output.position = globals.viewProjection * vec4f(world, 1.0);
  output.normal = input.normal;
  output.netId = input.ids.x;
  output.objectId = input.ids.y;
  output.visible = 0u;
  if (globals.selectedLayer == 0u || (globals.selectedLayer >= input.ids.z && globals.selectedLayer <= input.ids.w)) {
    output.visible = 1u;
  }
  return output;
}
@fragment fn fs(input: Output) -> @location(0) vec4f {
  if (input.visible == 0u) { discard; }
  let selected = netEmphasized(input.netId) || (globals.activeNet != 0u && input.netId == globals.activeNet);
  var base = draw.color.rgb;
  if (selected) {
    if (draw.flags.z < 0.5) {
      base = vec3f(0.1, 1.0, 0.22) * (0.88 + 0.12 * sin(globals.time * 3.2));
    }
  } else if (globals.hasHighlight > 0.5) {
    base = mix(base, vec3f(0.12, 0.14, 0.17), 0.58);
  }
  if (draw.flags.z > 0.5 && !selected) { discard; }
  let light = normalize(globals.lightDirection.xyz);
  let lit = base * (0.38 + max(dot(normalize(input.normal), light), 0.0) * 0.72);
  return vec4f(lit, 1.0);
}
`,Nn=`
struct Globals {
  viewProjection: mat4x4f,
  activeNet: u32,
  selectedLayer: u32,
  time: f32,
  hasHighlight: f32,
  selectedFeature: u32,
  padding0: u32,
  padding1: u32,
  padding2: u32,
  lightDirection: vec4f,
};
struct Draw { color: vec4f, material: vec4f, offset: vec4f, flags: vec4f };
@group(0) @binding(0) var<uniform> globals: Globals;
@group(0) @binding(1) var<uniform> draw: Draw;
@group(0) @binding(2) var<storage, read> layerOffsets: array<f32>;
struct Input {
  @location(0) unit: vec3f,
  @location(1) normal: vec3f,
  @location(2) radiusMix: f32,
  @location(3) dimensions: vec4f,
  @location(4) span: vec2f,
  @location(5) ids: vec4u,
};
struct Output {
  @builtin(position) position: vec4f,
  @location(0) @interpolate(flat) objectId: u32,
  @location(1) @interpolate(flat) visible: u32,
};
@vertex fn vs(input: Input) -> Output {
  let radius = mix(input.dimensions.z, input.dimensions.w, input.radiusMix);
  let world = vec3f(
    input.dimensions.x + input.unit.x * radius,
    input.dimensions.y + input.unit.y * radius,
    mix(input.span.x + layerOffsets[input.ids.z], input.span.y + layerOffsets[input.ids.w], input.unit.z)
  );
  var output: Output;
  output.position = globals.viewProjection * vec4f(world, 1.0);
  output.objectId = input.ids.y;
  output.visible = 0u;
  if (globals.selectedLayer == 0u || (globals.selectedLayer >= input.ids.z && globals.selectedLayer <= input.ids.w)) {
    output.visible = 1u;
  }
  return output;
}
@fragment fn fs(input: Output) -> @location(0) vec2u {
  if (input.visible == 0u) { discard; }
  return vec2u(1u, input.objectId);
}
`;function Us(e,t){return t.reduce((a,[s,r])=>{if(a.split(s).length!==2)throw new Error(`Shader variant anchor not found once: ${s.slice(0,60)}`);return a.replace(s,()=>r)},e)}var jn=Us(An,[[`@vertex fn vs(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;
  output.world = input.position + draw.offset.xyz;
  output.position = globals.viewProjection * vec4f(output.world, 1.0);
  output.normal = normalize(input.normal);`,`${Na}
@vertex fn vs(input: VertexInput, @builtin(instance_index) instance: u32) -> VertexOutput {
  let occurrence = occurrences[instance];
  var output: VertexOutput;
  output.world = (occurrence.model * vec4f(input.position + draw.offset.xyz, 1.0)).xyz;
  output.position = globals.viewProjection * vec4f(output.world, 1.0);
  output.normal = normalize((occurrence.normal * vec4f(input.normal, 0.0)).xyz);`]]),Fn=Us(Sn,[[`  @location(0) @interpolate(flat) objectId: u32,
};`,`  @location(0) @interpolate(flat) objectId: u32,
  @location(1) @interpolate(flat) occurrence: u32,
};`],[`@vertex fn vs(input: Input) -> Output {
  var output: Output;
  output.position = globals.viewProjection * vec4f(input.position + draw.offset.xyz, 1.0);`,`${Na}
@vertex fn vs(input: Input, @builtin(instance_index) instance: u32) -> Output {
  let world = (occurrences[instance].model * vec4f(input.position + draw.offset.xyz, 1.0)).xyz;
  var output: Output;
  output.position = globals.viewProjection * vec4f(world, 1.0);
  output.occurrence = instance + 1u;`],["  return vec2u(1u, input.objectId);",`  let kind = u32(draw.flags.x);
  return vec2u(input.occurrence, select(input.objectId, 0u, kind == 0u));`]]),Gl=`struct Input {
  @location(0) unit: vec3f,
  @location(1) normal: vec3f,
  @location(2) radiusMix: f32,
  @location(3) dimensions: vec4f,
  @location(4) span: vec2f,
  @location(5) ids: vec4u,
};`,zl=`struct Barrel {
  dimensions: vec4f,
  span: vec2f,
  ids: vec4u,
};
@group(0) @binding(6) var<storage, read> barrels: array<Barrel>;
${Na}
struct Input {
  @location(0) unit: vec3f,
  @location(1) normal: vec3f,
  @location(2) radiusMix: f32,
};`;function Cn(e,t,a=[]){return Us(e,[[Gl,zl],["@vertex fn vs(input: Input) -> Output {",`struct Record {
  unit: vec3f,
  normal: vec3f,
  radiusMix: f32,
  dimensions: vec4f,
  span: vec2f,
  ids: vec4u,
};
@vertex fn vs(vertex: Input, @builtin(instance_index) instance: u32) -> Output {
  let count = arrayLength(&barrels);
  let barrel = barrels[instance % count];
  let occurrence = occurrences[instance / count];
  let input = Record(vertex.unit, vertex.normal, vertex.radiusMix, barrel.dimensions, barrel.span, barrel.ids);`],[t,t.replace("vec4f(world, 1.0)","vec4f((occurrence.model * vec4f(world, 1.0)).xyz, 1.0)")],...a])}var Bn=Cn(_n,`  output.position = globals.viewProjection * vec4f(world, 1.0);
  output.normal = input.normal;`,[[`  output.normal = input.normal;
  output.netId`,`  output.normal = (occurrence.normal * vec4f(input.normal, 0.0)).xyz;
  output.netId`]]),On=Cn(Nn,`  output.position = globals.viewProjection * vec4f(world, 1.0);
  output.objectId`,[[`  @location(1) @interpolate(flat) visible: u32,
};`,`  @location(1) @interpolate(flat) visible: u32,
  @location(2) @interpolate(flat) occurrence: u32,
};`],["  output.objectId = input.ids.y;",`  output.objectId = input.ids.y;
  output.occurrence = instance / count + 1u;`],["  return vec2u(1u, input.objectId);","  return vec2u(input.occurrence, input.objectId);"]]),tp=Object.freeze({main:jn,pick:Fn,barrel:Bn,barrelPick:On}),Ba=class e{static async create(t){if(!navigator.gpu)throw new Error("WebGPU is unavailable in this browser");let a=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!a)throw new Error("No WebGPU adapter is available");let s=await a.requestDevice();return new e(t,s)}constructor(t,a){this.canvas=t,this.device=a,a.addEventListener("uncapturederror",n=>{console.error(`Uncaptured WebGPU error: ${n.error?.message||n.error}`)}),a.lost.then(n=>{console.error(`WebGPU device lost: ${n.reason}`,n.message)}),this.context=t.getContext("webgpu"),this.format=navigator.gpu.getPreferredCanvasFormat(),this.context.configure({device:a,format:this.format,alphaMode:"opaque"}),this.entries=[],this.barrels=null,this.globalBuffer=a.createBuffer({size:In,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.layerOffsetBuffer=a.createBuffer({size:1024,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.occurrenceMatrices=[[...ja]],this.occurrenceKeys=["0"],this.identityOnly=!0,this.occurrenceCapacity=1,this.occurrenceBuffer=this.createOccurrenceBuffer(this.occurrenceCapacity),this.device.queue.writeBuffer(this.occurrenceBuffer,0,Bs(this.occurrenceMatrices)),this.barrelRecordBuffer=a.createBuffer({label:"barrel-records",size:48,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.instancedPipelines=null,this.bindGroupLayout=a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:2,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}},{binding:3,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:4,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:5,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}},{binding:6,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}}]});let s=a.createPipelineLayout({bindGroupLayouts:[this.bindGroupLayout]});this.pipelineLayout=s;let r=this.vertexBuffers=[{arrayStride:Rn,attributes:[{shaderLocation:0,offset:0,format:"float32x3"},{shaderLocation:1,offset:12,format:"float32x3"},{shaderLocation:2,offset:24,format:"uint32"},{shaderLocation:3,offset:28,format:"uint32"},{shaderLocation:4,offset:32,format:"uint32"},{shaderLocation:5,offset:36,format:"uint32"}]}];this.pipeline=this.makePipeline(s,An,this.format,r,"main"),this.pickPipeline=this.makePipeline(s,Sn,Rt,r,"pick"),this.barrelPipeline=this.makeBarrelPipeline(s,_n,this.format,"barrel"),this.barrelPickPipeline=this.makeBarrelPipeline(s,Nn,Rt,"barrel-pick"),this.singlePipelines={main:this.pipeline,pick:this.pickPipeline,barrel:this.barrelPipeline,barrelPick:this.barrelPickPipeline},this.depth=null,this.pickTexture=null,this.pickSerial=Promise.resolve(),this.bundleCache=new Map,this.globalScratch=new ArrayBuffer(In),this.globalScratchF32=new Float32Array(this.globalScratch),this.globalScratchView=new DataView(this.globalScratch),this.drawScratch=new Float32Array(Ca/4),this.barrelDrawScratch=new Float32Array(Ca/4),this.nextEntryId=1,this.hiddenFeatureIds=new Set,this.featureMaskCapacity=64,this.featureMaskBuffer=this.createFeatureMaskBuffer(this.featureMaskCapacity),this.uploadFeatureMask(),this.emphasizedNetIds=new Set,this.netMaskCapacity=64,this.netMaskBuffer=this.createNetMaskBuffer(this.netMaskCapacity),this.uploadNetMask()}createOccurrenceBuffer(t){return this.device.createBuffer({label:"occurrences",size:t*128,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST})}get occurrenceCount(){return this.occurrenceMatrices.length}setOccurrences(t){let{matrices:a,keys:s}=wn(t??[ja]);this.occurrenceMatrices=a,this.occurrenceKeys=s,this.identityOnly=a.length===1&&Ht(a[0]),this.identityOnly||this.ensureInstancedPipelines(),a.length>this.occurrenceCapacity&&(this.occurrenceBuffer?.destroy?.(),this.occurrenceCapacity=Math.max(a.length,this.occurrenceCapacity*2),this.occurrenceBuffer=this.createOccurrenceBuffer(this.occurrenceCapacity),this.rebindAll()),a.length&&this.device.queue.writeBuffer(this.occurrenceBuffer,0,Bs(a)),this.bundleCache.clear()}ensureInstancedPipelines(){if(this.instancedPipelines)return;let t=this.pipelineLayout;this.instancedPipelines={main:this.makePipeline(t,jn,this.format,this.vertexBuffers,"main-instanced"),pick:this.makePipeline(t,Fn,Rt,this.vertexBuffers,"pick-instanced"),barrel:this.makeBarrelPipeline(t,Bn,this.format,"barrel-instanced",!1),barrelPick:this.makeBarrelPipeline(t,On,Rt,"barrel-pick-instanced",!1)}}drawSet(){if(this.identityOnly)return{pipelines:this.singlePipelines,instances:1,barrelInstances:this.barrels?.instanceCount||0};let t=this.occurrenceMatrices.length;return{pipelines:this.instancedPipelines,instances:t,barrelInstances:(this.barrels?.instanceCount||0)*t}}createNetMaskBuffer(t){return this.device.createBuffer({label:"net-emphasis-mask",size:t*Uint32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST})}uploadNetMask(){let t=br(this.emphasizedNetIds,this.netMaskCapacity);this.device.queue.writeBuffer(this.netMaskBuffer,0,t)}setEmphasizedNetIds(t){this.emphasizedNetIds=ba(t);let a=hr(this.emphasizedNetIds,this.netMaskCapacity);a!==this.netMaskCapacity&&(this.netMaskBuffer?.destroy?.(),this.netMaskCapacity=a,this.netMaskBuffer=this.createNetMaskBuffer(a),this.rebindAll()),this.uploadNetMask()}rebindAll(){for(let t of this.entries)t.bindGroup=this.makeBindGroup(t.drawBuffer);this.barrels&&(this.barrels.bindGroup=this.makeBindGroup(this.barrels.drawBuffer)),this.bundleCache.clear()}createFeatureMaskBuffer(t){return this.device.createBuffer({label:"feature-visibility-mask",size:t*Uint32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST})}makeBindGroup(t){return this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:{buffer:this.globalBuffer}},{binding:1,resource:{buffer:t}},{binding:2,resource:{buffer:this.layerOffsetBuffer}},{binding:3,resource:{buffer:this.featureMaskBuffer}},{binding:4,resource:{buffer:this.netMaskBuffer}},{binding:5,resource:{buffer:this.occurrenceBuffer}},{binding:6,resource:{buffer:this.barrelRecordBuffer}}]})}uploadFeatureMask(){let t=kn(this.hiddenFeatureIds,this.featureMaskCapacity);this.device.queue.writeBuffer(this.featureMaskBuffer,0,t)}setHiddenFeatureIds(t){this.hiddenFeatureIds=Fa(t);let a=En(this.hiddenFeatureIds,this.featureMaskCapacity);a!==this.featureMaskCapacity&&(this.featureMaskBuffer?.destroy?.(),this.featureMaskCapacity=a,this.featureMaskBuffer=this.createFeatureMaskBuffer(a),this.rebindAll()),this.uploadFeatureMask(),this.bundleCache.clear()}makePipeline(t,a,s,r,n){let i=this.createShaderModule(a,n);return this.device.createRenderPipeline({layout:t,vertex:{module:i,entryPoint:"vs",buffers:r},fragment:{module:i,entryPoint:"fs",targets:[{format:s,blend:s===Rt?void 0:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-list",cullMode:"none"},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"},multisample:{count:1}})}makeBarrelPipeline(t,a,s,r,n=!0){let i=this.createShaderModule(a,r);return this.device.createRenderPipeline({layout:t,vertex:{module:i,entryPoint:"vs",buffers:[{arrayStride:28,attributes:[{shaderLocation:0,offset:0,format:"float32x3"},{shaderLocation:1,offset:12,format:"float32x3"},{shaderLocation:2,offset:24,format:"float32"}]},...n?[{arrayStride:40,stepMode:"instance",attributes:[{shaderLocation:3,offset:0,format:"float32x4"},{shaderLocation:4,offset:16,format:"float32x2"},{shaderLocation:5,offset:24,format:"uint32x4"}]}]:[]]},fragment:{module:i,entryPoint:"fs",targets:[{format:s,blend:s===Rt?void 0:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-list",cullMode:"none"},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"}})}createShaderModule(t,a){let s=this.device.createShaderModule({label:`pcb-${a}`,code:t});return typeof s.getCompilationInfo=="function"&&s.getCompilationInfo().then(r=>{let n=[...r.messages||[]];if(n.length){console.groupCollapsed(`WebGPU shader compilation info: pcb-${a}`);for(let i of n)console[i.type==="error"?"error":"warn"](`${i.type} ${i.lineNum}:${i.linePos} ${i.message}`);console.groupEnd()}}),s}resize(){let t=Math.min(devicePixelRatio||1,2),a=Math.max(1,Math.floor(this.canvas.clientWidth*t)),s=Math.max(1,Math.floor(this.canvas.clientHeight*t));this.canvas.width===a&&this.canvas.height===s||(this.canvas.width=a,this.canvas.height=s,this.depth?.destroy(),this.pickTexture?.destroy(),this.depth=this.device.createTexture({size:[a,s],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),this.pickTexture=this.device.createTexture({size:[a,s],format:Rt,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC}))}addPrimitive(t,a){let s=t.position.length/3,r=new ArrayBuffer(s*Rn),n=new Float32Array(r),i=new Uint32Array(r);for(let y=0;y<s;y+=1){let f=y*10,d=y*3;n[f]=t.position[d],n[f+1]=t.position[d+1],n[f+2]=t.position[d+2],n[f+3]=t.normal[d],n[f+4]=t.normal[d+1],n[f+5]=t.normal[d+2],i[f+6]=t.netId[y]||0,i[f+7]=t.objectFeatureId[y]||0,i[f+8]=a.layerId||0,i[f+9]=a.materialId||0}let o=this.device.createBuffer({size:r.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});this.device.queue.writeBuffer(o,0,r);let c=t.indices instanceof Uint32Array?t.indices:new Uint32Array(t.indices),l=this.device.createBuffer({size:c.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST});this.device.queue.writeBuffer(l,0,c);let p=this.device.createBuffer({size:Ca,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),g=this.makeBindGroup(p),w={...a,bounds:t.bounds||a.bounds||null,id:this.nextEntryId++,vertexBuffer:o,indexBuffer:l,indexCount:c.length,drawBuffer:p,bindGroup:g};return this.entries.push(w),this.bundleCache.clear(),w}removeEntries(t){if(!t?.length)return;let a=new Set(t.map(s=>s.id));for(let s of t)s.vertexBuffer?.destroy?.(),s.indexBuffer?.destroy?.(),s.drawBuffer?.destroy?.();this.entries=this.entries.filter(s=>!a.has(s.id)),this.bundleCache.clear()}dispose(){this.removeEntries(this.entries),this.barrels&&(this.barrels.vertexBuffer?.destroy?.(),this.barrels.indexBuffer?.destroy?.(),this.barrels.instanceBuffer?.destroy?.(),this.barrels.drawBuffer?.destroy?.(),this.barrels=null),this.depth?.destroy(),this.pickTexture?.destroy(),this.featureMaskBuffer?.destroy?.(),this.occurrenceBuffer?.destroy?.(),this.barrelRecordBuffer?.destroy?.(),this.depth=null,this.pickTexture=null,this.featureMaskBuffer=null,this.bundleCache.clear()}setBarrels(t){if(!t?.length)return;let a=20,s=[],r=[];for(let f of[0,1]){let d=s.length/7;for(let x=0;x<a;x+=1){let u=Math.PI*2*x/a,h=Math.cos(u),m=Math.sin(u);for(let v of[0,1])s.push(h,m,v,f?-h:h,f?-m:m,0,f)}for(let x=0;x<a;x+=1){let u=(x+1)%a,h=d+x*2,m=d+u*2;r.push(h,m,m+1,h,m+1,h+1)}}let n=new Float32Array(s),i=new Uint16Array(r),o=new ArrayBuffer(t.length*40),c=new DataView(o);t.forEach((f,d)=>{let x=d*40;c.setFloat32(x,f.centerMm[0]/1e3,!0),c.setFloat32(x+4,-f.centerMm[1]/1e3,!0),c.setFloat32(x+8,Math.min(f.drillWidthMm,f.drillHeightMm)/2e3,!0),c.setFloat32(x+12,Math.max(f.outerWidthMm,f.outerHeightMm)/2e3,!0),c.setFloat32(x+16,f.startZMm/1e3,!0),c.setFloat32(x+20,f.endZMm/1e3,!0),c.setUint32(x+24,f.netId||0,!0),c.setUint32(x+28,f.objectFeatureId||0,!0),c.setUint32(x+32,f.startLayerId||0,!0),c.setUint32(x+36,f.endLayerId||0,!0)});let l=this.device.createBuffer({size:n.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),p=this.device.createBuffer({size:i.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST}),g=this.device.createBuffer({size:o.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});this.device.queue.writeBuffer(l,0,n),this.device.queue.writeBuffer(p,0,i),this.device.queue.writeBuffer(g,0,o);let w=xn(t);this.barrelRecordBuffer?.destroy?.(),this.barrelRecordBuffer=this.device.createBuffer({label:"barrel-records",size:w.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.device.queue.writeBuffer(this.barrelRecordBuffer,0,w);let y=this.device.createBuffer({size:Ca,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});this.barrels={records:t,vertexBuffer:l,indexBuffer:p,instanceBuffer:g,indexCount:i.length,instanceCount:t.length,drawBuffer:y,bindGroup:null},this.rebindAll()}render({panels:t,activeNetId:a,selectedFeatureId:s,time:r,layerOffsets:n,visibleLayers:i,showBoard:o,showComponents:c,componentOpacity:l,boardOpacity:p,isolateNet:g,compareMode:w=!1,compareOffsets:y=new Map,layerAlphas:f=null,visibleTileIds:d=null}){this.resize(),this.device.queue.writeBuffer(this.layerOffsetBuffer,0,n);let x=this.context.getCurrentTexture().createView();t.forEach((u,h)=>{let m=this.device.createCommandEncoder(),v=m.beginRenderPass({colorAttachments:[{view:x,clearValue:{r:.91,g:.93,b:.94,a:1},loadOp:h===0?"clear":"load",storeOp:"store"}],depthStencilAttachment:{view:this.depth.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}}),T=Mn(u.viewport,this.canvas.width,this.canvas.height);v.setViewport(T.x,T.y,T.width,T.height,0,1),v.setScissorRect(T.x,T.y,T.width,T.height),this.writeGlobals(u.matrix,a,u.layerId,r,s);let{pipelines:k,instances:I,barrelInstances:M}=this.drawSet(),_=this.entries.filter(A=>this.visible(A,u.layerId,i,o,c,l,w,d));for(let A of _)this.writeDraw(A,a,l,p,g,w,y.get(A.layerId),f?.get(A.layerId)??1);if(_.length>64)v.executeBundles([this.renderBundle(_,u.layerId)]);else{v.setPipeline(k.main);for(let A of _)v.setBindGroup(0,A.bindGroup),v.setVertexBuffer(0,A.vertexBuffer),v.setIndexBuffer(A.indexBuffer,"uint32"),v.drawIndexed(A.indexCount,I)}!w&&this.barrels&&(u.layerId===0||i.has(u.layerId))&&(this.writeBarrelDraw(g),v.setPipeline(k.barrel),v.setBindGroup(0,this.barrels.bindGroup),v.setVertexBuffer(0,this.barrels.vertexBuffer),v.setVertexBuffer(1,this.barrels.instanceBuffer),v.setIndexBuffer(this.barrels.indexBuffer,"uint16"),v.drawIndexed(this.barrels.indexCount,M)),v.end(),this.device.queue.submit([m.finish()])})}visible(t,a,s,r,n,i,o=!1,c=null){return t.kind==="board"&&t.boardRole==="pad"||!o&&t.kind==="copper"&&c&&!c.has(t.tileId)?!1:o?t.kind==="copper"&&s.has(t.layerId):t.kind==="board"?a===0&&r:t.kind==="component"?a===0&&n&&i>.001:a?t.layerId===a:s.has(t.layerId)}writeGlobals(t,a,s,r,n=0){let i=this.globalScratch,o=this.globalScratchF32;o.fill(0),o.set(t,0);let c=this.globalScratchView;c.setUint32(64,a||0,!0),c.setUint32(68,s||0,!0),c.setFloat32(72,r,!0),c.setFloat32(76,a||this.emphasizedNetIds.size?1:0,!0),c.setUint32(80,n||0,!0),o.set([.35,-.5,.8,0],24),this.device.queue.writeBuffer(this.globalBuffer,0,i)}writeDraw(t,a,s,r=1,n=!1,i=!1,o=null,c=1){let l=this.drawScratch;l.fill(0);let p=t.kind==="copper"?t.color:t.material.baseColor;l.set(p,0),l.set([t.material.metallic||0,t.material.roughness??.72,0,0],4);let g=Hl(t);l.set([o?.[0]||0,o?.[1]||0,(i?-(t.baseZ||0):t.layerOffset||0)+g,0],8);let w=Number.isFinite(p?.[3])?p[3]:1,y=t.kind==="component"?s:t.kind==="board"?r*Vl(t,w):c,f=t.kind==="copper"?1:t.kind==="component"?2:0;l.set([f,y,n?1:0,i?1:0],12),this.device.queue.writeBuffer(t.drawBuffer,0,l)}writeBarrelDraw(t=!1){let a=this.barrelDrawScratch;a.fill(0),a.set([.55,.35,.16,.78],0),a.set([.75,.32,0,0],4),a.set([1,1,t?1:0,0],12),this.device.queue.writeBuffer(this.barrels.drawBuffer,0,a)}renderBundle(t,a){let{pipelines:s,instances:r}=this.drawSet(),n=`${a}:${this.identityOnly?"single":r}:${t.map(l=>l.id).join(",")}`,i=this.bundleCache.get(n);if(i)return i;let o=this.device.createRenderBundleEncoder({colorFormats:[this.format],depthStencilFormat:"depth24plus"});o.setPipeline(s.main);for(let l of t)o.setBindGroup(0,l.bindGroup),o.setVertexBuffer(0,l.vertexBuffer),o.setIndexBuffer(l.indexBuffer,"uint32"),o.drawIndexed(l.indexCount,r);let c=o.finish();return this.bundleCache.set(n,c),this.bundleCache.size>32&&this.bundleCache.delete(this.bundleCache.keys().next().value),c}pick(t,a,s,r){let n=this.pickSerial.then(()=>this.performPick(t,a,s,r));return this.pickSerial=n.catch(()=>0),n}async performPick(t,a,s,r){this.resize();let n=Math.max(0,Math.min(this.canvas.width-1,Math.floor(a))),i=Math.max(0,Math.min(this.canvas.height-1,Math.floor(s)));this.writeGlobals(t.matrix,r.activeNetId,t.layerId,performance.now()/1e3,r.selectedFeatureId),this.device.queue.writeBuffer(this.layerOffsetBuffer,0,r.layerOffsets);let o=this.device.createCommandEncoder(),c=o.beginRenderPass({colorAttachments:[{view:this.pickTexture.createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:this.depth.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}}),l=Mn(t.viewport,this.canvas.width,this.canvas.height);c.setViewport(l.x,l.y,l.width,l.height,0,1),c.setScissorRect(l.x,l.y,l.width,l.height);let{pipelines:p,instances:g,barrelInstances:w}=this.drawSet();c.setPipeline(p.pick);for(let f of this.entries)this.visible(f,t.layerId,r.visibleLayers,r.showBoard,r.showComponents,r.componentOpacity,r.compareMode,r.visibleTileIds)&&(f.kind==="board"&&(this.identityOnly||f.boardRole!=="substrate")||(this.writeDraw(f,r.activeNetId,r.componentOpacity,r.boardOpacity,r.isolateNet,r.compareMode,r.compareOffsets?.get(f.layerId)),c.setBindGroup(0,f.bindGroup),c.setVertexBuffer(0,f.vertexBuffer),c.setIndexBuffer(f.indexBuffer,"uint32"),c.drawIndexed(f.indexCount,g)));!r.compareMode&&this.barrels&&(this.writeBarrelDraw(r.isolateNet),c.setPipeline(p.barrelPick),c.setBindGroup(0,this.barrels.bindGroup),c.setVertexBuffer(0,this.barrels.vertexBuffer),c.setVertexBuffer(1,this.barrels.instanceBuffer),c.setIndexBuffer(this.barrels.indexBuffer,"uint16"),c.drawIndexed(this.barrels.indexCount,w)),c.end();let y=this.device.createBuffer({label:"pick-readback",size:256,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});o.copyTextureToBuffer({texture:this.pickTexture,origin:{x:n,y:i}},{buffer:y,bytesPerRow:256},{width:1,height:1}),this.device.queue.submit([o.finish()]);try{await y.mapAsync(GPUMapMode.READ);let f=new DataView(y.getMappedRange()),d=vn(f.getUint32(0,!0),f.getUint32(4,!0));return y.unmap(),{...d,occurrenceKey:d.occurrenceIndex>=0?this.occurrenceKeys[d.occurrenceIndex]??null:null}}finally{y.mapState==="mapped"&&y.unmap(),y.destroy()}}};function Vl(e,t){return e.kind!=="board"||e.boardRole==="substrate"?1:e.boardRole==="soldermask"?Math.min(t,.72):e.boardRole==="silkscreen"?Math.min(t,.92):t}function Hl(e){if(e.kind!=="board"||e.boardRole!=="soldermask"&&e.boardRole!=="silkscreen")return 0;let t=e.bounds,s=(t?(t[2]+t[5])*.5:0)<0?-1:1,r=e.boardRole==="silkscreen"?35e-6:18e-6;return s*r}function Mn(e,t,a){let s=Math.max(0,Math.min(t-1,Math.floor(e.x))),r=Math.max(0,Math.min(a-1,Math.floor(e.y)));return{x:s,y:r,width:Math.max(1,Math.min(t-s,Math.floor(e.width))),height:Math.max(1,Math.min(a-r,Math.floor(e.height)))}}var ql=`
struct Globals {
  camera: vec4f,
  viewport: vec2f,
  activeNet: u32,
  _pad: u32,
};
struct Page {
  originSize: vec4f,
  flags: vec4f,
};
@group(0) @binding(0) var<uniform> globals: Globals;
@group(0) @binding(1) var<uniform> page: Page;
@group(0) @binding(2) var pageSampler: sampler;
@group(0) @binding(3) var pageTexture: texture_2d<f32>;

struct VertexOut {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
};

@vertex fn vs(@builtin(vertex_index) index: u32) -> VertexOut {
  var positions = array<vec2f, 6>(
    vec2f(0.0, 0.0), vec2f(1.0, 0.0), vec2f(0.0, 1.0),
    vec2f(0.0, 1.0), vec2f(1.0, 0.0), vec2f(1.0, 1.0)
  );
  let uv = positions[index];
  let world = page.originSize.xy + uv * page.originSize.zw;
  let halfViewport = globals.viewport * globals.camera.z * 0.5;
  let clip = vec2f(
    (world.x - globals.camera.x) / halfViewport.x,
    -(world.y - globals.camera.y) / halfViewport.y
  );
  var out: VertexOut;
  out.position = vec4f(clip, 0.0, 1.0);
  out.uv = uv;
  return out;
}

@fragment fn fs(input: VertexOut) -> @location(0) vec4f {
  let sampled = textureSample(pageTexture, pageSampler, input.uv);
  let edge = min(min(input.uv.x, 1.0 - input.uv.x), min(input.uv.y, 1.0 - input.uv.y));
  let selected = page.flags.x > 0.5;
  let containsNet = page.flags.y > 0.5;
  let hasActiveNet = page.flags.z > 0.5;
  let nativeDetail = page.flags.w > 0.5;
  if (edge < 0.006) {
    if (containsNet) { return vec4f(0.12, 0.92, 0.35, 1.0); }
    if (selected) { return vec4f(0.12, 0.45, 0.95, 1.0); }
    return vec4f(0.28, 0.32, 0.39, 1.0);
  }
  if (nativeDetail) {
    return vec4f(0.925, 0.918, 0.865, 1.0);
  }
  var dim = 1.0;
  if (hasActiveNet) {
    dim = 0.42;
    if (containsNet) {
      dim = 1.0;
    }
  }
  return vec4f(sampled.rgb * dim, 1.0);
}`,Xl=`
struct Globals {
  camera: vec4f,
  viewport: vec2f,
  activeNet: u32,
  _pad: u32,
};
@group(0) @binding(0) var<uniform> globals: Globals;
struct Out { @builtin(position) position: vec4f };
@vertex fn vs(@location(0) world: vec2f) -> Out {
  let halfViewport = globals.viewport * globals.camera.z * 0.5;
  let clip = vec2f(
    (world.x - globals.camera.x) / halfViewport.x,
    -(world.y - globals.camera.y) / halfViewport.y
  );
  var out: Out;
  out.position = vec4f(clip, 0.4, 1.0);
  return out;
}
@fragment fn fs() -> @location(0) vec4f {
  return vec4f(0.22, 0.48, 0.82, 0.82);
}`,Wl=`
struct Globals {
  camera: vec4f,
  viewport: vec2f,
  activeNet: u32,
  _pad: u32,
};
@group(0) @binding(0) var<uniform> globals: Globals;
struct Out { @builtin(position) position: vec4f };
@vertex fn vs(@location(0) world: vec2f) -> Out {
  let halfViewport = globals.viewport * globals.camera.z * 0.5;
  let clip = vec2f(
    (world.x - globals.camera.x) / halfViewport.x,
    -(world.y - globals.camera.y) / halfViewport.y
  );
  var out: Out;
  out.position = vec4f(clip, 0.2, 1.0);
  return out;
}
@fragment fn fs() -> @location(0) vec4f {
  return vec4f(0.08, 1.0, 0.27, 0.96);
}`,Jl=`
struct Globals {
  camera: vec4f,
  viewport: vec2f,
  activeNet: u32,
  _pad: u32,
};
@group(0) @binding(0) var<uniform> globals: Globals;
struct Out {
  @builtin(position) position: vec4f,
  @location(0) distance: f32,
  @location(1) kind: f32,
};
@vertex fn vs(@location(0) world: vec2f, @location(1) flow: vec2f) -> Out {
  let halfViewport = globals.viewport * globals.camera.z * 0.5;
  let clip = vec2f(
    (world.x - globals.camera.x) / halfViewport.x,
    -(world.y - globals.camera.y) / halfViewport.y
  );
  var out: Out;
  out.position = vec4f(clip, 0.05, 1.0);
  out.distance = flow.x;
  out.kind = flow.y;
  return out;
}
@fragment fn fs(input: Out) -> @location(0) vec4f {
  let selected = input.kind > 1.5;
  let intersheet = input.kind > 0.5 && !selected;
  var speed = 0.62;
  var period = 18.0;
  if (intersheet || selected) {
    speed = 0.88;
    period = 28.0;
  }
  let phase = fract(input.distance / period - globals.camera.w * speed);
  let dash = smoothstep(0.04, 0.13, phase) * (1.0 - smoothstep(0.38, 0.52, phase));
  let intraBase = vec3f(0.94, 0.48, 0.12);
  let intraDash = vec3f(1.0, 0.86, 0.24);
  let interBase = vec3f(0.10, 0.46, 0.92);
  let interDash = vec3f(0.42, 0.82, 1.0);
  let selectedBase = vec3f(0.08, 1.0, 0.34);
  let selectedDash = vec3f(0.86, 1.0, 0.72);
  var base = intraBase;
  var bright = intraDash;
  if (intersheet) {
    base = interBase;
    bright = interDash;
  }
  if (selected) {
    base = selectedBase;
    bright = selectedDash;
  }
  let color = base + (bright - base) * dash;
  var alpha = 0.24 + dash * 0.54;
  if (intersheet) {
    alpha = 0.30 + dash * 0.54;
  }
  if (selected) {
    alpha = 0.44 + dash * 0.50;
  }
  return vec4f(color, alpha);
}`,Yl=`
struct Globals {
  camera: vec4f,
  viewport: vec2f,
  activeNet: u32,
  _pad: u32,
};
@group(0) @binding(0) var<uniform> globals: Globals;
struct Out {
  @builtin(position) position: vec4f,
  @location(0) color: vec4f,
};
@vertex fn vs(@location(0) world: vec2f, @location(1) color: vec4f) -> Out {
  let halfViewport = globals.viewport * globals.camera.z * 0.5;
  let clip = vec2f(
    (world.x - globals.camera.x) / halfViewport.x,
    -(world.y - globals.camera.y) / halfViewport.y
  );
  var out: Out;
  out.position = vec4f(clip, 0.1, 1.0);
  out.color = color;
  return out;
}
@fragment fn fs(input: Out) -> @location(0) vec4f {
  return input.color;
}`,$l=`
struct Globals {
  camera: vec4f,
  viewport: vec2f,
  activeNet: u32,
  _pad: u32,
};
struct ImageQuad {
  originSize: vec4f,
  flags: vec4f,
};
@group(0) @binding(0) var<uniform> globals: Globals;
@group(0) @binding(1) var<uniform> imageQuad: ImageQuad;
@group(0) @binding(2) var imageSampler: sampler;
@group(0) @binding(3) var imageTexture: texture_2d<f32>;

struct Out {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
};

@vertex fn vs(@builtin(vertex_index) index: u32) -> Out {
  var positions = array<vec2f, 6>(
    vec2f(0.0, 0.0), vec2f(1.0, 0.0), vec2f(0.0, 1.0),
    vec2f(0.0, 1.0), vec2f(1.0, 0.0), vec2f(1.0, 1.0)
  );
  let uv = positions[index];
  let world = imageQuad.originSize.xy + uv * imageQuad.originSize.zw;
  let halfViewport = globals.viewport * globals.camera.z * 0.5;
  let clip = vec2f(
    (world.x - globals.camera.x) / halfViewport.x,
    -(world.y - globals.camera.y) / halfViewport.y
  );
  var out: Out;
  out.position = vec4f(clip, 0.08, 1.0);
  out.uv = uv;
  return out;
}

@fragment fn fs(input: Out) -> @location(0) vec4f {
  return textureSample(imageTexture, imageSampler, input.uv);
}`,Ql=`
struct Globals {
  camera: vec4f,
  viewport: vec2f,
  activeNet: u32,
  _pad: u32,
};
@group(0) @binding(0) var<uniform> globals: Globals;
struct Out {
  @builtin(position) position: vec4f,
  @location(0) featureId: u32,
};
@vertex fn vs(@location(0) world: vec2f, @location(1) featureId: u32) -> Out {
  let halfViewport = globals.viewport * globals.camera.z * 0.5;
  let clip = vec2f(
    (world.x - globals.camera.x) / halfViewport.x,
    -(world.y - globals.camera.y) / halfViewport.y
  );
  var out: Out;
  out.position = vec4f(clip, 0.0, 1.0);
  out.featureId = featureId;
  return out;
}
@fragment fn fs(input: Out) -> @location(0) u32 {
  return input.featureId;
}`,Zl=6.2,eu=4.6,tu=3.8,Pa=4*1024*1024,au=Math.floor(Pa/6),Pn=au*6,Oa=512*1024,Dn=512*1024,Un=96,su=96,ru=18,Ln=96*1024*1024,nu=2,La=class e{static async create(t,a){if(!navigator.gpu)throw new Error("WebGPU is unavailable in this browser");let s=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!s)throw new Error("No WebGPU adapter is available");let r=await s.requestDevice(),n=await fetch(a,{cache:"default"});if(!n.ok)throw new Error(`Failed to load schematic manifest: ${n.status}`);let i=await n.json();if(!["prism.schematic_world_a0","prism.schematic_vector_a0"].includes(i.schema))throw new Error(`Unsupported schematic scene schema: ${i.schema}`);let o=i.featureTable||i.features,c=await fetch(new URL(o,a),{cache:"default"});if(!c.ok)throw new Error(`Failed to load schematic features: ${c.status}`);let l=ou(await c.json());return new e(t,r,a,i,l)}constructor(t,a,s,r,n){this.canvas=t,this.device=a,this.manifestUrl=s,this.manifest=r,this.isNativeScene=r.schema==="prism.schematic_vector_a0",this.pages=r.pages||[],this.featuresByPage=n,this.featuresById=new Map;for(let y of Object.values(n))for(let f of y)this.featuresById.set(Number(f.id),f);this.context=t.getContext("webgpu"),this.format=navigator.gpu.getPreferredCanvasFormat(),this.context.configure({device:a,format:this.format,alphaMode:"opaque"}),this.flowCanvas=null,this.flowContext=null,this.globalBuffer=a.createBuffer({size:48,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.bindGroupLayout=a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}},{binding:3,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}}]});let i=a.createShaderModule({code:ql});this.pagePipeline=a.createRenderPipeline({layout:a.createPipelineLayout({bindGroupLayouts:[this.bindGroupLayout]}),vertex:{module:i,entryPoint:"vs"},fragment:{module:i,entryPoint:"fs",targets:[{format:this.format}]},primitive:{topology:"triangle-list"}}),this.edgeLayout=a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]});let o=a.createShaderModule({code:Xl});this.edgePipeline=a.createRenderPipeline({layout:a.createPipelineLayout({bindGroupLayouts:[this.edgeLayout]}),vertex:{module:o,entryPoint:"vs",buffers:[{arrayStride:8,attributes:[{shaderLocation:0,offset:0,format:"float32x2"}]}]},fragment:{module:o,entryPoint:"fs",targets:[{format:this.format,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"line-list"}}),this.edgeBindGroup=a.createBindGroup({layout:this.edgeLayout,entries:[{binding:0,resource:{buffer:this.globalBuffer}}]});let c=a.createShaderModule({code:Wl});this.highlightPipeline=a.createRenderPipeline({layout:a.createPipelineLayout({bindGroupLayouts:[this.edgeLayout]}),vertex:{module:c,entryPoint:"vs",buffers:[{arrayStride:8,attributes:[{shaderLocation:0,offset:0,format:"float32x2"}]}]},fragment:{module:c,entryPoint:"fs",targets:[{format:this.format,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"line-list"}}),this.highlightBufferSize=4*1024*1024,this.highlightBuffer=a.createBuffer({size:this.highlightBufferSize,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});let l=a.createShaderModule({code:Jl});this.netFlowPipeline=a.createRenderPipeline({layout:a.createPipelineLayout({bindGroupLayouts:[this.edgeLayout]}),vertex:{module:l,entryPoint:"vs",buffers:[{arrayStride:16,attributes:[{shaderLocation:0,offset:0,format:"float32x2"},{shaderLocation:1,offset:8,format:"float32x2"}]}]},fragment:{module:l,entryPoint:"fs",targets:[{format:this.format,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-list"}}),this.netFlowBuffer=a.createBuffer({size:Dn*4,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),this.globalUniformScratch=new Float32Array(12),this.pageUniformScratch=new Float32Array(8),this.imageUniformScratch=new Float32Array(8),this.vectorScratch=new Float32Array(Pa),this.highlightScratch=new Float32Array(this.highlightBufferSize/4),this.netFlowScratch=new Float32Array(Dn),this.netTrackingCache=null,this.selectedIntrasheetLinkIndex=-1,this.truncatedHighlightCount=0,this.truncatedVectorCount=0,this.frameSerial=0,this.querySerial=0;let p=a.createShaderModule({code:Yl});this.vectorPipeline=a.createRenderPipeline({layout:a.createPipelineLayout({bindGroupLayouts:[this.edgeLayout]}),vertex:{module:p,entryPoint:"vs",buffers:[{arrayStride:24,attributes:[{shaderLocation:0,offset:0,format:"float32x2"},{shaderLocation:1,offset:8,format:"float32x4"}]}]},fragment:{module:p,entryPoint:"fs",targets:[{format:this.format,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-list"}}),this.vectorBuffer=a.createBuffer({size:Pa*4,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),this.vectorBuffers=[this.vectorBuffer];let g=a.createShaderModule({code:$l});this.imagePipeline=a.createRenderPipeline({layout:a.createPipelineLayout({bindGroupLayouts:[this.bindGroupLayout]}),vertex:{module:g,entryPoint:"vs"},fragment:{module:g,entryPoint:"fs",targets:[{format:this.format,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-list"}});let w=a.createShaderModule({code:Ql});this.pickPipeline=a.createRenderPipeline({layout:a.createPipelineLayout({bindGroupLayouts:[this.edgeLayout]}),vertex:{module:w,entryPoint:"vs",buffers:[{arrayStride:12,attributes:[{shaderLocation:0,offset:0,format:"float32x2"},{shaderLocation:1,offset:8,format:"uint32"}]}]},fragment:{module:w,entryPoint:"fs",targets:[{format:"r32uint"}]},primitive:{topology:"triangle-list"}}),this.pickVertexBuffer=a.createBuffer({size:Oa*12,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),this.pickReadBuffer=a.createBuffer({size:256,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pickTexture=null,this.pickTextureSize=[0,0],this.pickPending=!1,this.vectorChunks=new Map,this.failedVectorChunks=new Map,this.nativeDetailState=new Map,this.domDetailPageIds=new Set,this.nativeDetailThresholds=new Map,this.residentVectorBytes=0,this.sampler=a.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"}),this.placeholder=this.createSolidTexture([245,247,249,255]),this.pageResources=new Map,this.imageResources=new Map,this.loading=new Map,this.selectedPageId="",this.selectedFeatureId=0,this.activeNetUid="",this.showHierarchy=!0,this.downloadedBytes=0,this.world=r.worldBoundsMm,this.center=[(this.world.minX+this.world.maxX)/2,(this.world.minY+this.world.maxY)/2],this.scale=Math.max((this.world.maxX-this.world.minX)/900,(this.world.maxY-this.world.minY)/650,.1)*1.16,this.edgeBuffer=this.createEdgeBuffer();for(let y of this.pages)this.createPageResource(y)}createSolidTexture(t){let a=this.device.createTexture({size:[1,1],format:"rgba8unorm-srgb",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});return this.device.queue.writeTexture({texture:a},new Uint8Array(t),{bytesPerRow:4},[1,1]),a}createPageResource(t){let a=this.device.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),s={page:t,uniform:a,texture:this.placeholder,textureWidth:0,svgBlob:null,bindGroup:null};this.pageResources.set(t.id,s),this.updateBindGroup(s)}createImageResource(t){let a=this.device.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),s={path:t,uniform:a,texture:this.placeholder,loaded:!1,bindGroup:null};return this.imageResources.set(t,s),this.updateBindGroup(s),s}updateBindGroup(t){t.bindGroup=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:{buffer:this.globalBuffer}},{binding:1,resource:{buffer:t.uniform}},{binding:2,resource:this.sampler},{binding:3,resource:t.texture.createView()}]})}async loadImageTexture(t){let a=this.imageResources.get(t)||this.createImageResource(t);if(a.loaded)return a;let s=`image:${t}`;if(this.loading.has(s))return this.loading.get(s);let r=(async()=>{try{let n=await fetch(new URL(t,this.manifestUrl),{cache:"default"});if(!n.ok)throw new Error(`Failed to load schematic image ${t}: ${n.status}`);let i=await n.blob(),o=await createImageBitmap(i),c=this.device.createTexture({size:[o.width,o.height],format:"rgba8unorm-srgb",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});this.device.queue.copyExternalImageToTexture({source:o},{texture:c},[o.width,o.height]),o.close(),a.texture!==this.placeholder&&a.texture.destroy(),a.texture=c,a.loaded=!0,this.updateBindGroup(a)}finally{this.loading.delete(s)}return a})();return this.loading.set(s,r),r}createEdgeBuffer(){let t=new Map(this.pages.map(n=>[n.id,n])),a=[];for(let n of this.manifest.edges||[]){let i=t.get(n.source),o=t.get(n.target);!i||!o||a.push(i.worldX+i.widthMm/2,i.worldY+i.heightMm,o.worldX+o.widthMm/2,o.worldY)}let s=new Float32Array(a);if(!s.length)return null;let r=this.device.createBuffer({size:s.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});return this.device.queue.writeBuffer(r,0,s),{buffer:r,count:s.length/2}}resize(){let t=Math.min(devicePixelRatio||1,2),a=Math.max(1,Math.floor(this.canvas.clientWidth*t)),s=Math.max(1,Math.floor(this.canvas.clientHeight*t));(this.canvas.width!==a||this.canvas.height!==s)&&(this.canvas.width=a,this.canvas.height=s),this.flowCanvas&&(this.flowCanvas.width!==a||this.flowCanvas.height!==s)&&(this.flowCanvas.width=a,this.flowCanvas.height=s)}setFlowOverlayCanvas(t){t&&(this.flowCanvas=t,this.flowContext=t.getContext("webgpu"),this.flowContext.configure({device:this.device,format:this.format,alphaMode:"premultiplied"}))}writeGlobals(){let t=this.globalUniformScratch;t[0]=this.center[0],t[1]=this.center[1],t[2]=this.scale,t[3]=performance.now()*.001,t[4]=this.canvas.width,t[5]=this.canvas.height,this.device.queue.writeBuffer(this.globalBuffer,0,t)}pagePixelWidth(t){return t.widthMm/this.scale}pageSourcePixelsPerMm(t){let a=this.pagePixelWidth(t)/Math.max(1,t.sourceWidthMm||t.widthMm),s=t.heightMm/this.scale/Math.max(1,t.sourceHeightMm||t.heightMm);return Math.min(a,s)}pageNativeDetailThresholds(t){let a=this.nativeDetailThresholds.get(t.id);if(a)return a;let s=Math.max(1,t.sourceWidthMm||t.widthMm),r=Math.max(1,t.sourceHeightMm||t.heightMm),n=s*r,i=Math.max(0,t.featureCount||t.featureIds?.length||0)/Math.max(1,n),o=ie(1-i*72,.84,1.08),c=ie(Math.sqrt(Math.max(s,r)/Math.max(1,Math.min(s,r)))/1.18,.92,1.14),l=ie(Zl*o*c,5,7.4),p={enter:l,exit:ie(Math.min(l-1.2,eu*o),3.8,l-.7),prefetch:ie(Math.min(l-2,tu*o),3,l-1)};return this.nativeDetailThresholds.set(t.id,p),p}pageWantsNativeDetail(t){if(!this.pageHasNativeDetail(t))return!1;let a=this.pageSourcePixelsPerMm(t),s=this.nativeDetailState.get(t.id)===!0,r=this.pageNativeDetailThresholds(t),n=s?r.exit:r.enter,i=a>=n;return i!==s&&this.nativeDetailState.set(t.id,i),i}pageNativeDetailReady(t){if(this.domDetailPageIds.has(t.id)||!this.pageWantsNativeDetail(t))return!1;let a=this.vectorChunks.get(t.id);return!a?.loaded||!a.segments?.length&&!a.fills?.length?!1:this.visibleNativeImagesReady(t,a)}visibleNativeImagesReady(t,a){if(!a?.images?.length)return!0;let s=this.sourceViewportBounds(t,4),r=!0;for(let n of a.images){if(!Ye(n.bounds,s))continue;(this.imageResources.get(n.path)||this.createImageResource(n.path)).loaded||(r=!1,this.loadImageTexture(n.path).catch(()=>{}))}return r}visiblePages(){let t=this.canvas.width*this.scale/2,a=this.canvas.height*this.scale/2,s=this.center[0]-t,r=this.center[0]+t,n=this.center[1]-a,i=this.center[1]+a;return this.pages.filter(o=>o.worldX+o.widthMm>=s&&o.worldX<=r&&o.worldY+o.heightMm>=n&&o.worldY<=i)}worldViewportBounds(t=0){let a=this.canvas.width*this.scale/2,s=this.canvas.height*this.scale/2;return[this.center[0]-a-t,this.center[1]-s-t,this.center[0]+a+t,this.center[1]+s+t]}sourceViewportBounds(t,a=2.5){let s=this.worldViewportBounds(this.scale*8),r=(s[0]-t.worldX)/t.widthMm*t.sourceWidthMm-a,n=(s[1]-t.worldY)/t.heightMm*t.sourceHeightMm-a,i=(s[2]-t.worldX)/t.widthMm*t.sourceWidthMm+a,o=(s[3]-t.worldY)/t.heightMm*t.sourceHeightMm+a;return[Math.max(-a,Math.min(r,i)),Math.max(-a,Math.min(n,o)),Math.min(t.sourceWidthMm+a,Math.max(r,i)),Math.min(t.sourceHeightMm+a,Math.max(n,o))]}render(){this.frameSerial+=1,this.resize(),this.writeGlobals();let t=this.visiblePages(),a=this.device.createCommandEncoder(),s=a.beginRenderPass({colorAttachments:[{view:this.context.getCurrentTexture().createView(),clearValue:{r:.045,g:.055,b:.073,a:1},loadOp:"clear",storeOp:"store"}]});this.showHierarchy&&this.edgeBuffer&&(s.setPipeline(this.edgePipeline),s.setBindGroup(0,this.edgeBindGroup),s.setVertexBuffer(0,this.edgeBuffer.buffer),s.draw(this.edgeBuffer.count)),s.setPipeline(this.pagePipeline);for(let i of t){let o=this.pageResources.get(i.id),c=this.activeNetUid&&i.netUids.includes(this.activeNetUid),l=this.domDetailPageIds.has(i.id),p=!l&&this.pageNativeDetailReady(i),g=this.pageUniformScratch;g[0]=i.worldX,g[1]=i.worldY,g[2]=i.widthMm,g[3]=i.heightMm,g[4]=i.id===this.selectedPageId?1:0,g[5]=c?1:0,g[6]=this.activeNetUid?1:0,g[7]=p||l?1:0,this.device.queue.writeBuffer(o.uniform,0,g),s.setBindGroup(0,o.bindGroup),s.draw(6);let w=ie(Math.ceil(this.pagePixelWidth(i)*1.3/512)*512,512,6144);o.textureWidth<w*.82&&this.loadPageTexture(i,w).catch(()=>{})}this.scheduleVisibleVectorLoads(t),this.drawVisibleImages(s,t),this.drawVisibleVectors(s,t);let r=this.writeNetTrackingOverlay();r&&!this.flowContext&&(s.setPipeline(this.netFlowPipeline),s.setBindGroup(0,this.edgeBindGroup),s.setVertexBuffer(0,this.netFlowBuffer),s.draw(r));let n=this.writeNetHighlights(t);return n&&(s.setPipeline(this.highlightPipeline),s.setBindGroup(0,this.edgeBindGroup),s.setVertexBuffer(0,this.highlightBuffer),s.draw(n)),s.end(),this.device.queue.submit([a.finish()]),this.renderFlowOverlay(r),this.evictVectorChunks(t),t}renderFlowOverlay(t){if(!this.flowContext)return;let a=this.device.createCommandEncoder(),s=a.beginRenderPass({colorAttachments:[{view:this.flowContext.getCurrentTexture().createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}]});t&&(s.setPipeline(this.netFlowPipeline),s.setBindGroup(0,this.edgeBindGroup),s.setVertexBuffer(0,this.netFlowBuffer),s.draw(t)),s.end(),this.device.queue.submit([a.finish()])}drawVisibleImages(t,a){if(!this.isNativeScene)return;let s=!1;for(let r of a){if(this.domDetailPageIds.has(r.id)||!this.pageNativeDetailReady(r))continue;let n=this.vectorChunks.get(r.id);if(!n?.images?.length)continue;let i=this.sourceViewportBounds(r,4);for(let o of n.images){if(!Ye(o.bounds,i))continue;let c=this.imageResources.get(o.path)||this.createImageResource(o.path);c.loaded||this.loadImageTexture(o.path).catch(()=>{});let l=o.worldOrigin||this.sourceToWorld(r,[o.xMm,o.yMm]),p=o.worldSize||this.sourceSizeToWorld(r,o.widthMm,o.heightMm),g=this.imageUniformScratch;g[0]=l[0],g[1]=l[1],g[2]=p[0],g[3]=p[1],g[4]=0,g[5]=0,g[6]=0,g[7]=0,this.device.queue.writeBuffer(c.uniform,0,g),s||(t.setPipeline(this.imagePipeline),s=!0),t.setBindGroup(0,c.bindGroup),t.draw(6)}}}drawVisibleVectors(t,a){if(!this.isNativeScene)return 0;let s=this.vectorScratch,r=0,n=0,i=0,o=0,c=!1,l=()=>{if(!r)return;let g=this.vectorBuffers[o];g||(g=this.device.createBuffer({size:Pa*4,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),this.vectorBuffers.push(g)),this.device.queue.writeBuffer(g,0,s,0,r),c||(t.setPipeline(this.vectorPipeline),t.setBindGroup(0,this.edgeBindGroup),c=!0);let w=Math.floor(r/6);t.setVertexBuffer(0,g),t.draw(w),i+=w,o+=1,r=0},p=g=>g>Pn||g>s.length?(n+=1,!1):((r+g>Pn||r+g>s.length)&&l(),!0);for(let g of a){if(this.domDetailPageIds.has(g.id)||!this.pageHasNativeDetail(g))continue;let w=this.vectorChunks.get(g.id);if(!w?.segments?.length&&!w?.fills?.length||!this.pageNativeDetailReady(g))continue;w.lastUsedFrame=this.frameSerial;let y=this.sourceViewportBounds(g),f=Gn(w.spatial,y);for(let d of f.fills){if(!Ye(d.bounds,y)||!p(18))continue;let x=this.featuresById.get(d.featureId),u=this.activeNetUid&&x?.netUid===this.activeNetUid,m=this.selectedFeatureId===d.featureId?[.24,.58,1,1]:u?[.06,1,.24,1]:this.activeNetUid&&Wt(x)?qn(x,d.kind,d.color):zs(x,d.kind,d.color),v=d.worldPoints||d.points.map(T=>this.sourceToWorld(g,T));r=ku(s,r,v[0],v[1],v[2],m)}for(let d of f.segments){if(!Ye(d.bounds,y))continue;let x=this.featuresById.get(d.featureId),u=this.activeNetUid&&x?.netUid===this.activeNetUid,h=this.selectedFeatureId===d.featureId,m=h?[.24,.58,1,1]:u?[.06,1,.24,1]:this.activeNetUid&&Wt(x)?qn(x,d.kind,d.color):zs(x,d.kind,d.color),v=this.segmentWorldWidth(g,d,x,u||h);for(let T of this.visibleSegmentParts(g,d,x)){if(!p(36))continue;let k=T.worldA||this.sourceToWorld(g,T.a),I=T.worldB||this.sourceToWorld(g,T.b);r=Eu(s,r,k,I,v,m)}}}return l(),this.truncatedVectorCount=n,this.vectorTruncated=n>0,this.lastVectorVertices=i,this.lastVectorChunks=o,i}pageHasNativeDetail(t){return this.isNativeScene?t?.nativeDetail?.enabled!==!1:!1}scheduleVisibleVectorLoads(t){if(!this.isNativeScene)return;let a=[...this.vectorChunks.values()].filter(n=>n?.promise&&!n.loaded).length,s=Math.max(0,nu-a);if(!s)return;let r=t.filter(n=>!this.domDetailPageIds.has(n.id)).filter(n=>this.pageHasNativeDetail(n)&&this.pageSourcePixelsPerMm(n)>=this.pageNativeDetailThresholds(n).prefetch).filter(n=>!this.vectorChunks.get(n.id)?.loaded&&!this.vectorChunks.get(n.id)?.promise).sort((n,i)=>{let o=Math.hypot(n.worldX+n.widthMm/2-this.center[0],n.worldY+n.heightMm/2-this.center[1]),c=Math.hypot(i.worldX+i.widthMm/2-this.center[0],i.worldY+i.heightMm/2-this.center[1]);return o-c});for(let n of r)if(this.loadPageVectors(n).catch(()=>{}),s-=1,!s)break}featurePrimitiveBounds(t,a){let s=this.vectorChunks.get(t.id);if(!s?.segments?.length&&!s?.fills?.length)return null;let r=[],n=[];for(let i of s.segments||[])i.featureId===a&&(r.push(i.a[0],i.b[0]),n.push(i.a[1],i.b[1]));for(let i of s.fills||[])if(i.featureId===a)for(let o of i.points||[])r.push(o[0]),n.push(o[1]);return r.length?[Math.min(...r),Math.min(...n),Math.max(...r),Math.max(...n)]:null}symbolClipBounds(t){if(this._symbolClipBounds||(this._symbolClipBounds=new Map),this._symbolClipBounds.has(t.id))return this._symbolClipBounds.get(t.id);let a=(this.featuresByPage[t.id]||[]).filter(s=>s?.kind==="symbol_body"&&s.boundsMm&&!String(s.sourceId||"").includes(":overplot")).map(s=>{let r=this.featurePrimitiveBounds(t,s.id)||s.boundsMm;return[r[0]-.02,r[1]-.02,r[2]+.02,r[3]+.02]}).filter(s=>{let r=s[2]-s[0],n=s[3]-s[1];return Math.max(r,n)<=12&&r*n<=80});return this._symbolClipBounds.set(t.id,a),a}visibleSegmentParts(t,a,s){if(a._visibleParts)return a._visibleParts;let r=String(s?.kind||""),n=String(s?.semanticRole||"");if(r!=="wire"&&n!=="wire")return a._visibleParts=[a],a._visibleParts;let i=[a];for(let o of this.symbolClipBounds(t)){let c=[];for(let l of i)c.push(...Mu(l,o));if(i=c,!i.length)break}for(let o of i)o.worldA=Ft(t,o.a),o.worldB=Ft(t,o.b);return a._visibleParts=i,a._visibleParts}netTrackingSegments(){if(!this.activeNetUid)return{netUid:"",anchorsByPage:new Map,segments:[],intrasheetSegments:[]};let t=Number(this.selectedFeatureId||0),a=String(this.selectedFeatureKey||""),s=String(this.selectedSourceId||"");if(this.netTrackingCache?.netUid===this.activeNetUid&&this.netTrackingCache?.selectedFeatureId===t&&this.netTrackingCache?.selectedFeatureKey===a&&this.netTrackingCache?.selectedSourceId===s)return this.netTrackingCache;this.selectedIntrasheetLinkIndex=-1;let r=new Map(this.pages.map(f=>[f.id,f])),n=this.manifest.netToPages?.[this.activeNetUid]||[],i=n.length?n.map(f=>r.get(f)).filter(Boolean):this.pages.filter(f=>f.netUids?.includes(this.activeNetUid)),o=new Map;for(let f of i.slice(0,su)){let d=this.netTrackingAnchorsForPage(f);d.length&&o.set(f.id,d)}let c=[],l=[];for(let[f,d]of o){let x=Vn(yu(d),"intrasheet",f);c.push(...x),l.push(...x)}let p=[...o.entries()].map(([f,d])=>vu(r.get(f),d,{featureId:t,stableKey:a,sourceId:s})).filter(Boolean);c.push(...Vn(p,"intersheet",""));let g=l.map((f,d)=>({...f,intrasheetIndex:d})),w=0,y=c.map((f,d)=>{if(f.type!=="intrasheet")return{...f,id:d};let x=w;return w+=1,{...f,id:d,intrasheetIndex:x}});return this.netTrackingCache={netUid:this.activeNetUid,selectedFeatureId:t,selectedFeatureKey:a,selectedSourceId:s,anchorsByPage:o,segments:y,intrasheetSegments:g},this.selectedIntrasheetLinkIndex>=this.netTrackingCache.intrasheetSegments.length&&(this.selectedIntrasheetLinkIndex=-1),this.netTrackingCache}netTrackingAnchorsForPage(t){let a=this.featuresByPage[t.id]||[],s=[];for(let r of a){if(r.netUid!==this.activeNetUid||!r.boundsMm||!mu(r))continue;let n=r.boundsMm,i=[(n[0]+n[2])/2,(n[1]+n[3])/2],o=this.sourceToWorld(t,i);s.push({pageId:t.id,featureId:Number(r.id||0),stableKey:String(r.stableKey||""),sourceId:String(r.sourceId||r.sourceUid||r.objectId||""),kind:r.kind||r.semanticRole||"",source:i,world:o,bounds:n,priority:xu(r)})}return s.sort((r,n)=>n.priority-r.priority||r.source[1]-n.source[1]||r.source[0]-n.source[0]),s}writeNetTrackingOverlay(){let t=this.netTrackingSegments();if(this.lastNetFlowSegments=t.segments.length,this.lastNetFlowIntrasheetSegments=t.intrasheetSegments.length,!t.segments.length)return this.lastNetFlowVertices=0,0;let a=this.worldViewportBounds(this.scale*96),s=this.netFlowScratch,r=0,n=0;for(let i of t.segments){if(!Ye(Hn(i),a))continue;let o=i.type==="intrasheet"&&i.intrasheetIndex===this.selectedIntrasheetLinkIndex,c=o?9.5:i.type==="intersheet"?8:4.8,l=o?2:i.type==="intersheet"?1:0,p=Ru(s,r,i.a,i.b,c*this.scale,l,n,this.scale);if(p!==r&&(r=p,n+=Math.hypot(i.b[0]-i.a[0],i.b[1]-i.a[1])/Math.max(this.scale,1e-6),r+24>s.length))break}return r?(this.device.queue.writeBuffer(this.netFlowBuffer,0,s,0,r),this.lastNetFlowVertices=r/4,r/4):(this.lastNetFlowVertices=0,0)}cycleNetIntrasheetLink(t=1){let a=this.netTrackingSegments();if(!a.intrasheetSegments.length)return null;let s=a.intrasheetSegments.length;this.selectedIntrasheetLinkIndex=(this.selectedIntrasheetLinkIndex+t+s)%s;let r=a.intrasheetSegments[this.selectedIntrasheetLinkIndex];if(!r)return null;let n=Hn(r,14*this.scale);return this.center=[(n[0]+n[2])/2,(n[1]+n[3])/2],this.scale=Math.max((n[2]-n[0])/Math.max(1,this.canvas.width*.36),(n[3]-n[1])/Math.max(1,this.canvas.height*.3),this.scale*.35,.025),{pageId:r.pageId,segment:r}}writeNetHighlights(t){if(!this.activeNetUid)return 0;let a=this.highlightScratch,s=0,r=0;for(let n of t){let i=this.sourceViewportBounds(n,5);for(let o of this.featuresByPage[n.id]||[]){if(o.netUid!==this.activeNetUid||!o.boundsMm||!Ye(o.boundsMm,i))continue;let c=this.featureWorldBounds(n,o.boundsMm);if(s+16>a.length){r+=1;continue}a[s++]=c[0],a[s++]=c[1],a[s++]=c[2],a[s++]=c[1],a[s++]=c[2],a[s++]=c[1],a[s++]=c[2],a[s++]=c[3],a[s++]=c[2],a[s++]=c[3],a[s++]=c[0],a[s++]=c[3],a[s++]=c[0],a[s++]=c[3],a[s++]=c[0],a[s++]=c[1]}}return this.truncatedHighlightCount=r,s?(this.device.queue.writeBuffer(this.highlightBuffer,0,a,0,s),s/2):0}featureWorldBounds(t,a){return[t.worldX+a[0]/t.sourceWidthMm*t.widthMm,t.worldY+a[1]/t.sourceHeightMm*t.heightMm,t.worldX+a[2]/t.sourceWidthMm*t.widthMm,t.worldY+a[3]/t.sourceHeightMm*t.heightMm]}sourceToWorld(t,a){return[t.worldX+a[0]/t.sourceWidthMm*t.widthMm,t.worldY+a[1]/t.sourceHeightMm*t.heightMm]}sourceSizeToWorld(t,a,s){return[a/t.sourceWidthMm*t.widthMm,s/t.sourceHeightMm*t.heightMm]}async loadPageVectors(t){if(!this.pageHasNativeDetail(t)||!t.chunks?.lod2)return null;let a=this.vectorChunks.get(t.id);if(a?.loaded)return a;if(a?.promise)return a.promise;let s=(async()=>{try{let r=await fetch(new URL(t.chunks.lod2,this.manifestUrl));if(!r.ok)throw new Error(`Failed to load schematic vector chunk ${t.id}: ${r.status}`);let n=await r.json(),i=cu(n.primitives||[]);du(t,i);let c=JSON.stringify(n).length,l={loaded:!0,segments:i.segments,fills:i.fills,images:i.images,spatial:pu(i),unsupported:n.unsupported||[],bytes:c,lastUsedFrame:this.frameSerial};return this.vectorChunks.set(t.id,l),this.failedVectorChunks.delete(t.id),this.residentVectorBytes+=c,l}catch(r){let n=this.failedVectorChunks.get(t.id)||{count:0,message:""};throw this.failedVectorChunks.set(t.id,{count:n.count+1,message:r?.message||String(r)}),this.vectorChunks.delete(t.id),r}})();return this.vectorChunks.set(t.id,{loaded:!1,promise:s,segments:[]}),s}evictVectorChunks(t){if(this.residentVectorBytes<=Ln)return;let a=new Set(t.map(r=>r.id)),s=[...this.vectorChunks.entries()].filter(([,r])=>r?.loaded).filter(([r])=>!a.has(r)&&r!==this.selectedPageId).sort((r,n)=>(r[1].lastUsedFrame||0)-(n[1].lastUsedFrame||0));for(let[r,n]of s)if(this.vectorChunks.delete(r),this.residentVectorBytes=Math.max(0,this.residentVectorBytes-(n.bytes||0)),this.residentVectorBytes<=Ln*.82)break}stats(){let t=this.visiblePages(),a=t.map(r=>this.pageSourcePixelsPerMm(r)),s=t.map(r=>this.pageNativeDetailThresholds(r).enter);return{residentVectorBytes:this.residentVectorBytes,vectorChunks:[...this.vectorChunks.values()].filter(r=>r?.loaded).length,vectorLoads:[...this.vectorChunks.values()].filter(r=>r?.promise&&!r.loaded).length,failedVectorChunks:this.failedVectorChunks.size,vectorVertices:this.lastVectorVertices||0,vectorDrawChunks:this.lastVectorChunks||0,truncatedVectors:this.truncatedVectorCount||0,nativeDetailPages:[...this.nativeDetailState.values()].filter(Boolean).length,nativePxPerMm:Number((Math.max(0,...a)||0).toFixed(2)),nativeThresholdPxPerMm:Number((s.length?Math.min(...s):0).toFixed(2)),domDetailPages:this.domDetailPageIds.size,netFlowSegments:this.lastNetFlowSegments||0,netFlowIntrasheetSegments:this.lastNetFlowIntrasheetSegments||0,netFlowVertices:this.lastNetFlowVertices||0}}setDomDetailPageIds(t){this.domDetailPageIds=new Set(t||[])}async loadPageTexture(t,a){let s=`${t.id}:${a}`;if(this.loading.has(s))return this.loading.get(s);let r=this.pageResources.get(t.id);if(!r||r.textureWidth>=a)return;let n=(async()=>{if(!r.svgBlob){let c=await fetch(new URL(iu(t),this.manifestUrl));if(!c.ok)throw new Error(`Failed to load schematic page ${t.name}: ${c.status}`);r.svgBlob=await c.blob(),this.downloadedBytes+=r.svgBlob.size}let i=r.svgBlob,o=URL.createObjectURL(i);try{let c=new Image;if(c.decoding="async",c.src=o,await c.decode(),r.textureWidth>=a)return;let l=Math.max(64,Math.round(a*t.heightMm/t.widthMm)),p=new OffscreenCanvas(a,l),g=p.getContext("2d",{alpha:!1});g.fillStyle="#ffffff",g.fillRect(0,0,a,l),g.drawImage(c,0,0,a,l);let w=await createImageBitmap(p),y=this.device.createTexture({size:[a,l],format:"rgba8unorm-srgb",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});this.device.queue.copyExternalImageToTexture({source:w},{texture:y},[a,l]),w.close(),r.texture!==this.placeholder&&r.texture.destroy(),r.texture=y,r.textureWidth=a,this.updateBindGroup(r)}finally{URL.revokeObjectURL(o),this.loading.delete(s)}})();return this.loading.set(s,n),n}preloadOverview(){let t=[...this.pages],a=async()=>{for(;t.length;){let s=t.shift();await this.loadPageTexture(s,512).catch(()=>{})}};return Promise.all(Array.from({length:Math.min(4,t.length)},a))}screenToWorld(t,a){let s=this.canvas.getBoundingClientRect(),r=(t-s.left)*this.canvas.width/s.width,n=(a-s.top)*this.canvas.height/s.height;return[this.center[0]+(r-this.canvas.width/2)*this.scale,this.center[1]+(n-this.canvas.height/2)*this.scale]}worldToScreen(t,a){let s=this.canvas.clientWidth/this.canvas.width,r=this.canvas.clientHeight/this.canvas.height;return[((t-this.center[0])/this.scale+this.canvas.width/2)*s,((a-this.center[1])/this.scale+this.canvas.height/2)*r]}hitPage(t,a){let[s,r]=this.screenToWorld(t,a);return[...this.pages].reverse().find(n=>s>=n.worldX&&s<=n.worldX+n.widthMm&&r>=n.worldY&&r<=n.worldY+n.heightMm)||null}async pickFeature(t,a){if(!this.isNativeScene)return this.hitFeature(t,a);let s=this.hitPage(t,a);if(!s)return null;if(!this.pageHasNativeDetail(s))return this.hitFeature(t,a);await this.loadPageVectors(s);let r=await this.gpuPickFeature(s,t,a);return r&&!Xt(r)?{page:s,feature:r,source:this.clientToSource(s,t,a),native:!0,gpu:!0}:this.hitFeature(t,a)}hitFeature(t,a){let s=this.hitPage(t,a);if(!s)return null;let[r,n]=this.clientToSource(s,t,a),i=Math.max(.45,5*this.scale*this.canvas.width/Math.max(1,this.canvas.clientWidth)*s.sourceWidthMm/s.widthMm),o=this.hitResidentVectorFeature(s,r,n,i);if(o)return{page:s,feature:o,source:[r,n],native:!0};let c=this.hitSymbolInterior(s,r,n);if(c)return{page:s,feature:c,source:[r,n],native:!0,interior:!0};let l=(this.featuresByPage[s.id]||[]).filter(p=>{if(Xt(p))return!1;let g=p.boundsMm;return g&&r>=g[0]-i&&r<=g[2]+i&&n>=g[1]-i&&n<=g[3]+i}).map(p=>({feature:p,priority:qt(p),area:Math.max(1e-4,(p.boundsMm[2]-p.boundsMm[0])*(p.boundsMm[3]-p.boundsMm[1]))})).sort((p,g)=>g.priority-p.priority||p.area-g.area);return{page:s,feature:l[0]?.feature||null,source:[r,n]}}hitSymbolInterior(t,a,s){let r=null;for(let n of this.featuresByPage[t.id]||[]){let i=String(n?.kind||"");if(i!=="symbol_body"&&i!=="symbol_instance"||String(n?.sourceId||"").includes(":overplot"))continue;let o=n.boundsMm;if(!o||a<o[0]||a>o[2]||s<o[1]||s>o[3])continue;let c=Math.max(1e-4,(o[2]-o[0])*(o[3]-o[1])),l=(i==="symbol_body"?0:1e6)+c;(!r||l<r.score)&&(r={feature:n,score:l})}return r?.feature||null}clientToSource(t,a,s){let[r,n]=this.screenToWorld(a,s);return[(r-t.worldX)/t.widthMm*t.sourceWidthMm,(n-t.worldY)/t.heightMm*t.sourceHeightMm]}ensurePickTexture(){this.pickTexture&&this.pickTextureSize[0]===this.canvas.width&&this.pickTextureSize[1]===this.canvas.height||(this.pickTexture&&this.pickTexture.destroy(),this.pickTexture=this.device.createTexture({size:[this.canvas.width,this.canvas.height],format:"r32uint",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC}),this.pickTextureSize=[this.canvas.width,this.canvas.height])}writePickVectors(t){let a=new ArrayBuffer(Oa*12),s=new DataView(a),r=0,n=[];for(let i of t){let o=this.vectorChunks.get(i.id);if(!o?.segments?.length&&!o?.fills?.length&&!o?.images?.length)continue;let c=this._pickSourcePointByPage?.get(i.id),l=c?[c[0]-2.5,c[1]-2.5,c[0]+2.5,c[1]+2.5]:[0,0,i.sourceWidthMm,i.sourceHeightMm],p=Gn(o.spatial,l);for(let g of p.images){if(!Ye(g.bounds,l))continue;let w=this.featuresById.get(g.featureId);!w||Xt(w)||n.push({page:i,image:g,feature:w,priority:qt(w)-5})}for(let g of p.fills){if(!Ye(g.bounds,l))continue;let w=this.featuresById.get(g.featureId);!w||Xt(w)||n.push({page:i,fill:g,feature:w,priority:qt(w)-2})}for(let g of p.segments){if(!Ye(g.bounds,l))continue;let w=this.featuresById.get(g.featureId);!w||Xt(w)||n.push({page:i,segment:g,feature:w,priority:qt(w)})}}n.sort((i,o)=>i.priority-o.priority);for(let{page:i,segment:o,fill:c,image:l,feature:p}of n){if(r+6>Oa)break;if(l){let g=this.sourceToWorld(i,[l.xMm,l.yMm]),w=this.sourceToWorld(i,[l.xMm+l.widthMm,l.yMm]),y=this.sourceToWorld(i,[l.xMm,l.yMm+l.heightMm]),f=this.sourceToWorld(i,[l.xMm+l.widthMm,l.yMm+l.heightMm]);r=Gs(s,r,g,w,y,l.featureId),r=Gs(s,r,y,w,f,l.featureId)}else if(c){let g=c.worldPoints||c.points.map(w=>this.sourceToWorld(i,w));r=Gs(s,r,g[0],g[1],g[2],c.featureId)}else{let g=Math.max(this.segmentWorldWidth(i,o,p,!1),this.scale*7);for(let w of this.visibleSegmentParts(i,o,p)){if(r+6>Oa)break;let y=w.worldA||this.sourceToWorld(i,w.a),f=w.worldB||this.sourceToWorld(i,w.b);r=Au(s,r,y,f,g,o.featureId)}}}return r?(this.device.queue.writeBuffer(this.pickVertexBuffer,0,a,0,r*12),r):0}async gpuPickFeature(t,a,s){if(this.pickPending)return null;let r=this.clientToSource(t,a,s);this._pickSourcePointByPage=new Map([[t.id,r]]);let n=this.writePickVectors([t]);if(this._pickSourcePointByPage=null,!n)return null;this.resize(),this.writeGlobals(),this.ensurePickTexture();let i=this.canvas.getBoundingClientRect(),o=Math.max(0,Math.min(this.canvas.width-1,Math.floor((a-i.left)*this.canvas.width/i.width))),c=Math.max(0,Math.min(this.canvas.height-1,Math.floor((s-i.top)*this.canvas.height/i.height))),l=this.device.createCommandEncoder(),p=l.beginRenderPass({colorAttachments:[{view:this.pickTexture.createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}]});p.setPipeline(this.pickPipeline),p.setBindGroup(0,this.edgeBindGroup),p.setVertexBuffer(0,this.pickVertexBuffer),p.draw(n),p.end(),l.copyTextureToBuffer({texture:this.pickTexture,origin:{x:o,y:c}},{buffer:this.pickReadBuffer,bytesPerRow:256,rowsPerImage:1},{width:1,height:1,depthOrArrayLayers:1}),this.pickPending=!0,this.device.queue.submit([l.finish()]);try{await this.pickReadBuffer.mapAsync(GPUMapMode.READ);let g=new DataView(this.pickReadBuffer.getMappedRange()).getUint32(0,!0);return this.pickReadBuffer.unmap(),g&&this.featuresById.get(g)||null}finally{this.pickReadBuffer.mapState==="mapped"&&this.pickReadBuffer.unmap(),this.pickPending=!1}}hitResidentVectorFeature(t,a,s,r){if(!this.isNativeScene)return null;let n=this.vectorChunks.get(t.id);if(!n?.loaded)return null;let i=null;for(let o of n.segments){let c=this.featuresById.get(o.featureId),l=Math.max(r,(o.widthMm||0)*.5+r*.45);if(c)for(let p of this.visibleSegmentParts(t,o,c)){let g=Iu([a,s],p.a,p.b);if(g>l)continue;let w=g-qt(c)*.025+(Wt(c)?0:8);(!i||w<i.score)&&(i={feature:c,score:w})}}return i?.feature||null}segmentWorldWidth(t,a,s,r){let n=(a.widthMm||.15)/Math.max(1,t.sourceWidthMm)*t.widthMm;return Math.max(n,this.scale*Tu(s,a.kind,r))}pan(t,a){let s=this.canvas.width/Math.max(1,this.canvas.clientWidth);this.center[0]-=t*this.scale*s,this.center[1]-=a*this.scale*s}zoom(t,a,s){let r=this.screenToWorld(a,s);this.scale=ie(this.scale*Math.exp(t*.0015),.015,16);let n=this.screenToWorld(a,s);this.center[0]+=r[0]-n[0],this.center[1]+=r[1]-n[1]}framePage(t){t&&(this.resize(),this.center=[t.worldX+t.widthMm/2,t.worldY+t.heightMm/2],this.scale=Math.max(t.widthMm/Math.max(1,this.canvas.width*.88),t.heightMm/Math.max(1,this.canvas.height*.84)))}frameWorld(){this.resize(),this.center=[(this.world.minX+this.world.maxX)/2,(this.world.minY+this.world.maxY)/2],this.scale=Math.max((this.world.maxX-this.world.minX)/Math.max(1,this.canvas.width*.9),(this.world.maxY-this.world.minY)/Math.max(1,this.canvas.height*.88),.05)}};function iu(e){return e.thumbnail?.path||e.svg}function ou(e){if(e.schema==="prism.schematic_vector_a0.features"){let t=new Map((e.features||[]).map(s=>[Number(s.id),s])),a={};for(let[s,r]of Object.entries(e.pages||{}))a[s]=r.map(n=>t.get(Number(n))).filter(Boolean);return a}return e.pages||{}}function cu(e){let t=[],a=[],s=[];for(let r of e){let n=Number(r.featureId||0);if(!n)continue;if(r.kind==="plotimage"&&r.image?.path){let h=r.xMm||0,m=r.yMm||0,v=r.widthMm||0,T=r.heightMm||0;s.push({featureId:n,kind:r.kind,xMm:h,yMm:m,widthMm:v,heightMm:T,bounds:[h,m,h+v,m+T],path:r.image.path});continue}let i=String(r.semanticRole||""),o=r.radiusMm||r.diameterMm/2||0,c=String(r.fill||"").toUpperCase()==="FILLED_SHAPE",l=r.widthMm||r.pen_widthMm||(i==="junction"?.08:.15),p=String(r.lineStyle||r.line_style||"DEFAULT").toUpperCase(),g=r.color||r.strokeColor||r.style?.color||"",w=r.fillColor||r.color||r.style?.color||"",y=(h,m)=>bu(t,{featureId:n,kind:r.kind,widthMm:l,lineStyle:p,color:g},h,m),f=r.x1Mm,d=r.y1Mm,x=r.x2Mm,u=r.y2Mm;if(r.trianglesMm?.length){for(let h of r.trianglesMm)Array.isArray(h)&&h.length===3&&a.push({featureId:n,kind:r.kind,color:w,points:h,bounds:Xn(h)});if(r.pointsMm?.length>=2){for(let h=1;h<r.pointsMm.length;h+=1)y(r.pointsMm[h-1],r.pointsMm[h]);zn(r)&&y(r.pointsMm[r.pointsMm.length-1],r.pointsMm[0])}}else if(r.pointsMm?.length>=2){c&&r.pointsMm.length>=3&&hu(a,n,r.kind,r.pointsMm,w);for(let h=1;h<r.pointsMm.length;h+=1)y(r.pointsMm[h-1],r.pointsMm[h]);zn(r)&&y(r.pointsMm[r.pointsMm.length-1],r.pointsMm[0])}else if(r.polylinesMm?.length){for(let h of r.polylinesMm)if(!(!Array.isArray(h)||h.length<2))for(let m=1;m<h.length;m+=1)y(h[m-1],h[m])}else if(Number.isFinite(f)&&Number.isFinite(d)&&Number.isFinite(x)&&Number.isFinite(u))r.kind==="rect"?(c&&uu(a,n,r.kind,[f,d,x,u],w),y([f,d],[x,d]),y([x,d],[x,u]),y([x,u],[f,u]),y([f,u],[f,d])):y([f,d],[x,u]);else if(Number.isFinite(r.cxMm)&&Number.isFinite(r.cyMm)){let h=r.radiusMm||r.diameterMm/2||.4;c&&fu(a,n,r.kind,[r.cxMm,r.cyMm],h,w),gu(t,{featureId:n,kind:r.kind,widthMm:l,lineStyle:p,color:g},[r.cxMm,r.cyMm],h)}else if(r.contoursMm?.length){for(let h of r.contoursMm)if(!(!Array.isArray(h)||h.length<2)){for(let m=1;m<h.length;m+=1)y(h[m-1],h[m]);y(h[h.length-1],h[0])}}else if(Number.isFinite(r.start_xMm)&&Number.isFinite(r.start_yMm)&&Number.isFinite(r.end_xMm)&&Number.isFinite(r.end_yMm))Number.isFinite(r.mid_xMm)&&Number.isFinite(r.mid_yMm)?(y([r.start_xMm,r.start_yMm],[r.mid_xMm,r.mid_yMm]),y([r.mid_xMm,r.mid_yMm],[r.end_xMm,r.end_yMm])):y([r.start_xMm,r.start_yMm],[r.end_xMm,r.end_yMm]);else if(Number.isFinite(r.start_xMm)&&Number.isFinite(r.start_yMm)&&Number.isFinite(r.mid_xMm)&&Number.isFinite(r.mid_yMm)&&Number.isFinite(r.end_xMm)&&Number.isFinite(r.end_yMm))y([r.start_xMm,r.start_yMm],[r.mid_xMm,r.mid_yMm]),y([r.mid_xMm,r.mid_yMm],[r.end_xMm,r.end_yMm]);else if(r.boundsMm&&r.kind!=="text"){let[h,m,v,T]=r.boundsMm;y([h,m],[v,m]),y([v,m],[v,T]),y([v,T],[h,T]),y([h,T],[h,m])}}return{segments:t,fills:a,images:s}}function du(e,t){for(let a of t.segments||[])a.worldA=Ft(e,a.a),a.worldB=Ft(e,a.b);for(let a of t.fills||[])a.worldPoints=a.points.map(s=>Ft(e,s));for(let a of t.images||[])a.worldOrigin=Ft(e,[a.xMm,a.yMm]),a.worldSize=lu(e,a.widthMm,a.heightMm)}function Ft(e,t){return[e.worldX+t[0]/e.sourceWidthMm*e.widthMm,e.worldY+t[1]/e.sourceHeightMm*e.heightMm]}function lu(e,t,a){return[t/e.sourceWidthMm*e.widthMm,a/e.sourceHeightMm*e.heightMm]}function uu(e,t,a,s,r){let[n,i,o,c]=s;e.push({featureId:t,kind:a,color:r,points:[[n,i],[o,i],[n,c]],bounds:[n,i,o,c]},{featureId:t,kind:a,color:r,points:[[n,c],[o,i],[o,c]],bounds:[n,i,o,c]})}function fu(e,t,a,s,r,n){for(let o=0;o<36;o+=1){let c=o/36*Math.PI*2,l=(o+1)/36*Math.PI*2;e.push({featureId:t,kind:a,color:n,points:[s,[s[0]+Math.cos(c)*r,s[1]+Math.sin(c)*r],[s[0]+Math.cos(l)*r,s[1]+Math.sin(l)*r]],bounds:[s[0]-r,s[1]-r,s[0]+r,s[1]+r]})}}function hu(e,t,a,s,r){let n=s[0],i=Xn(s);for(let o=2;o<s.length;o+=1)e.push({featureId:t,kind:a,color:r,points:[n,s[o-1],s[o]],bounds:i})}function bu(e,t,a,s){let r=Kn(a,s,t.widthMm||.15),n=t.lineStyle||"DEFAULT";if(!["DASH","DASHED","DOT","DOTTED","DASHDOT","DASH_DOT"].includes(n)){e.push({...t,a,b:s,bounds:r});return}let i=s[0]-a[0],o=s[1]-a[1],c=Math.hypot(i,o);if(c<1e-6)return;let l=i/c,p=o/c,g=Math.max(t.widthMm*4,.45),w=n.includes("DOT")?[g*.8,g*.75,g*3,g*.75]:[g*3,g*1.5],y=0,f=0;for(;y<c;){let d=Math.min(w[f%w.length],c-y);if(f%2===0){let x=[a[0]+l*y,a[1]+p*y],u=[a[0]+l*(y+d),a[1]+p*(y+d)];e.push({...t,a:x,b:u,bounds:Kn(x,u,t.widthMm||.15)})}y+=d,f+=1}}function gu(e,t,a,s){for(let n=0;n<32;n+=1){let i=n/32*Math.PI*2,o=(n+1)/32*Math.PI*2;e.push({...t,a:[a[0]+Math.cos(i)*s,a[1]+Math.sin(i)*s],b:[a[0]+Math.cos(o)*s,a[1]+Math.sin(o)*s],bounds:[a[0]-s,a[1]-s,a[0]+s,a[1]+s]})}}function Xn(e,t=0){let a=1/0,s=1/0,r=-1/0,n=-1/0;for(let i of e||[])a=Math.min(a,i[0]),s=Math.min(s,i[1]),r=Math.max(r,i[0]),n=Math.max(n,i[1]);return Number.isFinite(a)?[a-t,s-t,r+t,n+t]:[0,0,0,0]}function Kn(e,t,a=0){let s=Math.max(.05,a*.5);return[Math.min(e[0],t[0])-s,Math.min(e[1],t[1])-s,Math.max(e[0],t[0])+s,Math.max(e[1],t[1])+s]}function Ye(e,t){return!e||!t?!0:e[0]<=t[2]&&e[2]>=t[0]&&e[1]<=t[3]&&e[3]>=t[1]}function pu(e){let t={cellSize:ru,cells:new Map,segments:e.segments||[],fills:e.fills||[],images:e.images||[],queryId:0};for(let a of t.segments)Ls(t,"segments",a);for(let a of t.fills)Ls(t,"fills",a);for(let a of t.images)Ls(t,"images",a);return t}function Ls(e,t,a){let s=a.bounds;if(!s)return;let r=Math.floor(s[0]/e.cellSize),n=Math.floor(s[2]/e.cellSize),i=Math.floor(s[1]/e.cellSize),o=Math.floor(s[3]/e.cellSize);for(let c=i;c<=o;c+=1)for(let l=r;l<=n;l+=1){let p=`${l}:${c}`,g=e.cells.get(p);g||(g={segments:[],fills:[],images:[]},e.cells.set(p,g)),g[t].push(a)}}function Gn(e,t){if(!e)return{segments:[],fills:[],images:[]};e.queryId=(e.queryId||0)+1;let a=e.queryId,s={segments:[],fills:[],images:[]},r=Math.floor(t[0]/e.cellSize),n=Math.floor(t[2]/e.cellSize),i=Math.floor(t[1]/e.cellSize),o=Math.floor(t[3]/e.cellSize);for(let c=i;c<=o;c+=1)for(let l=r;l<=n;l+=1){let p=e.cells.get(`${l}:${c}`);p&&(Ks(p.segments,s.segments,a,"segments"),Ks(p.fills,s.fills,a,"fills"),Ks(p.images,s.images,a,"images"))}return s}function Ks(e,t,a,s){let r=`_${s}QueryId`;for(let n of e)n[r]!==a&&(n[r]=a,t.push(n))}function zn(e){let t=String(e.kind||"");if(String(e.fill||"").toUpperCase()==="FILLED_SHAPE"||e.closed===!0||["polygon","fill"].includes(t))return!0;let s=e.pointsMm||[];if(s.length>=3){let r=s[0],n=s[s.length-1];return Math.hypot(r[0]-n[0],r[1]-n[1])<1e-6}return!1}function Wt(e){return!!e?.netUid}function mu(e){let t=String(e?.kind||""),a=String(e?.semanticRole||"");return t==="pin"||t==="pin_body"||t==="label"||t==="global_label"||t==="hierarchical_label"||t==="netclass_flag"||t==="power_symbol"||t==="power_port"||a==="label"||a==="global_label"||a==="hierarchical_label"}function xu(e){let t=String(e?.kind||""),a=String(e?.semanticRole||"");return t==="global_label"||a==="global_label"?130:t==="hierarchical_label"||a==="hierarchical_label"?125:t==="label"||a==="label"?118:t==="pin"||t==="pin_body"?106:t==="power_symbol"||t==="power_port"||t==="netclass_flag"?98:50}function yu(e){if(e.length<=Un)return e;let t=e.slice(0,Un);return t.sort((a,s)=>a.source[1]-s.source[1]||a.source[0]-s.source[0]),t}function vu(e,t,a={}){if(!e||!t?.length)return null;let s=a.featureId||a.stableKey||a.sourceId?t.find(l=>a.featureId&&Number(l.featureId||0)===Number(a.featureId)||a.stableKey&&l.stableKey===a.stableKey||a.sourceId&&l.sourceId===a.sourceId):null;if(s)return{...s,kind:"selected-net-occurrence",priority:200};let r=t.filter(l=>l.priority>=118).slice(0,16),n=r.length?r:t.slice(0,16),i=0,o=0;for(let l of n)i+=l.world[0],o+=l.world[1];let c=[i/n.length,o/n.length];return{pageId:e.id,featureId:n[0]?.featureId||0,kind:"page-net-occurrence",source:[0,0],world:c,bounds:[c[0],c[1],c[0],c[1]],priority:1}}function Vn(e,t,a){if(!e||e.length<2)return[];let s=e.map(i=>({...i})).sort((i,o)=>i.world[1]-o.world[1]||i.world[0]-o.world[0]),r=[],n=s.shift();for(;s.length;){let i=0,o=1/0;for(let l=0;l<s.length;l+=1){let p=s[l],g=Math.hypot(p.world[0]-n.world[0],p.world[1]-n.world[1]);g<o&&(o=g,i=l)}let c=s.splice(i,1)[0];r.push({type:t,pageId:a||n.pageId||c.pageId||"",a:n.world,b:c.world,sourceFeatureIds:[n.featureId,c.featureId].filter(Boolean)}),n=c}return r}function Hn(e,t=0){return[Math.min(e.a[0],e.b[0])-t,Math.min(e.a[1],e.b[1])-t,Math.max(e.a[0],e.b[0])+t,Math.max(e.a[1],e.b[1])+t]}function qt(e){let t=String(e?.kind||""),s=String(e?.semanticRole||"")||t;return s==="pin_number"||s==="pin_name"?120:s==="pin_body"||t==="pin"?110:s==="symbol_reference"||s==="symbol_value"?92:t==="junction"||t==="no_connect"?88:t==="wire"||t==="bus"||t==="bus_entry"?78:s==="symbol_body"||t==="symbol_body"?45:t==="symbol_instance"||t==="symbol_overplot"?30:t==="text"||String(s).includes("text")?24:10}function Xt(e){let t=String(e?.kind||""),a=String(e?.semanticRole||"");if(t==="page"||t==="sheet_header")return!0;if(t==="graphic_rect"&&a==="graphic_rect"&&!e?.netUid&&!e?.componentUid){let s=e.boundsMm||[];return s[2]-s[0]>150&&s[3]-s[1]>120}return!1}function wu(e){if(!e||typeof e!="string")return null;let a=e.trim().match(/^#([0-9a-f]{6})([0-9a-f]{2})?$/i);if(!a)return null;let s=a[1],r=a[2]??"ff";return[parseInt(s.slice(0,2),16)/255,parseInt(s.slice(2,4),16)/255,parseInt(s.slice(4,6),16)/255,parseInt(r,16)/255]}function zs(e,t,a=""){let s=wu(a||e?.color||"");return e?.kind==="dnp_marker"?s||[.86,.04,.05,.85]:e?.dnp&&["symbol_reference","symbol_value","symbol_text"].includes(String(e?.kind||""))?[.5,.52,.54,.56]:s||(e?.dnp?[.5,.52,.54,.56]:Wt(e)?[.12,.56,.2,.96]:e?.kind==="pin_name"?[0,.28,.31,.96]:e?.kind==="pin_number"?[.45,.17,.16,.96]:e?.kind==="pin_body"?[.28,.18,.18,.88]:e?.kind==="symbol_body"||e?.kind==="symbol_instance"?[.42,.18,.18,.72]:e?.kind==="symbol_reference"||e?.kind==="symbol_value"?[.05,.13,.16,.94]:e?.kind==="text"||String(t||"").startsWith("text")?[.05,.13,.16,.94]:[.16,.17,.19,.7])}function qn(e,t,a=""){let s=zs(e,t,a);return[s[0]*.72,s[1]*.72,s[2]*.72,Math.min(s[3],.38)]}function Tu(e,t,a){return a?5.5:e?.kind==="dnp_marker"?3:["pin_name","pin_number"].includes(String(e?.kind||""))?1.5:e?.kind==="pin_body"?1.7:String(t||"").startsWith("text")?1.35:t==="bus"||e?.kind==="bus"?4.2:Wt(e)?2.6:e?.kind==="symbol_body"||e?.kind==="symbol_instance"||e?.kind==="sheet"?1.5:1.25}function Da(e,t,a,s){return e[t++]=a[0],e[t++]=a[1],e[t++]=s[0],e[t++]=s[1],e[t++]=s[2],e[t++]=s[3],t}function Eu(e,t,a,s,r,n){let i=Wn(a,s,r);if(!i)return t;for(let o of i)t=Da(e,t,o,n);return t}function ku(e,t,a,s,r,n){return t=Da(e,t,a,n),t=Da(e,t,s,n),t=Da(e,t,r,n),t}function jt(e,t,a,s,r){return e[t++]=a[0],e[t++]=a[1],e[t++]=s,e[t++]=r,t}function Ru(e,t,a,s,r,n,i,o){let c=s[0]-a[0],l=s[1]-a[1],p=Math.hypot(c,l);if(p<1e-6||t+24>e.length)return t;let g=r*.5,w=c/p,f=-(l/p)*g,d=w*g,x=[a[0]+f,a[1]+d],u=[a[0]-f,a[1]-d],h=[s[0]+f,s[1]+d],m=[s[0]-f,s[1]-d],v=i+p/Math.max(o,1e-6);return t=jt(e,t,x,i,n),t=jt(e,t,u,i,n),t=jt(e,t,h,v,n),t=jt(e,t,h,v,n),t=jt(e,t,u,i,n),t=jt(e,t,m,v,n),t}function Wn(e,t,a){let s=t[0]-e[0],r=t[1]-e[1],n=Math.hypot(s,r);if(n<1e-6)return null;let i=a*.5,o=s/n*i,c=r/n*i,l=-r/n*i,p=s/n*i,g=[e[0]-o,e[1]-c],w=[t[0]+o,t[1]+c],y=[g[0]+l,g[1]+p],f=[g[0]-l,g[1]-p],d=[w[0]+l,w[1]+p],x=[w[0]-l,w[1]-p];return[y,f,d,d,f,x]}function Iu(e,t,a){let s=a[0]-t[0],r=a[1]-t[1],n=s*s+r*r||1,i=ie(((e[0]-t[0])*s+(e[1]-t[1])*r)/n,0,1),o=t[0]+s*i,c=t[1]+r*i;return Math.hypot(e[0]-o,e[1]-c)}function Mu(e,t){let[a,s,r,n]=t,[i,o]=e.a,[c,l]=e.b,p=1e-6,g=(w,y)=>({...e,a:w,b:y});if(Math.abs(o-l)<=p){let w=o;if(w<s-p||w>n+p)return[e];let y=Math.min(i,c),f=Math.max(i,c),d=Math.max(y,a),x=Math.min(f,r);if(x<=d+p)return[e];let u=[],h=i<=c;if(y<d-p){let m=h?[y,w]:[d,w],v=h?[d,w]:[y,w];u.push(g(m,v))}if(x<f-p){let m=h?[x,w]:[f,w],v=h?[f,w]:[x,w];u.push(g(m,v))}return u}if(Math.abs(i-c)<=p){let w=i;if(w<a-p||w>r+p)return[e];let y=Math.min(o,l),f=Math.max(o,l),d=Math.max(y,s),x=Math.min(f,n);if(x<=d+p)return[e];let u=[],h=o<=l;if(y<d-p){let m=h?[w,y]:[w,d],v=h?[w,d]:[w,y];u.push(g(m,v))}if(x<f-p){let m=h?[w,x]:[w,f],v=h?[w,f]:[w,x];u.push(g(m,v))}return u}return[e]}function Ua(e,t,a,s){let r=t*12;e.setFloat32(r,a[0],!0),e.setFloat32(r+4,a[1],!0),e.setUint32(r+8,s,!0)}function Au(e,t,a,s,r,n){let i=Wn(a,s,r);if(!i)return t;for(let o of i)Ua(e,t,o,n),t+=1;return t}function Gs(e,t,a,s,r,n){return Ua(e,t,a,n),Ua(e,t+1,s,n),Ua(e,t+2,r,n),t+3}function Su(e,t){let a=Array.isArray(e?.layerIds)?e.layerIds:[];if(a.length<2&&e?.startLayerId!=null&&e?.endLayerId!=null&&(a=[e.startLayerId,e.endLayerId]),a.length<2&&e?.layerMask!=null)try{let s=BigInt(String(e.layerMask));a=t.filter((r,n)=>(s&1n<<BigInt(n))!==0n).map(r=>r.id)}catch{a=[]}return a}function _u(e){let t=e?.objectFeatureId??e?.id;if(t!=null&&Number.isFinite(Number(t))&&Number(t)!==0)return`feature:${Number(t)}`;let a=String(e?.sourceUid||"");return a?`source:${a}`:""}function Jn(e,t){let a=new Map(e.map((o,c)=>[Number(o.id),c])),s=new Map(e.map(o=>[Number(o.id),o])),r=new Map,n=new Set,i={thru:0,blind:0,buried:0};for(let o of t){let c=_u(o);if(c){if(n.has(c))continue;n.add(c)}let l=[...new Set(Su(o,e).map(Number))].filter(m=>a.has(m)).sort((m,v)=>a.get(m)-a.get(v));if(l.length<2)continue;let p=l[0],g=l[l.length-1],w=a.get(p),y=a.get(g),f=w===0,d=y===e.length-1,x=f&&d?"thru":f||d?"blind":"buried";i[x]+=1;let u=`${p}:${g}:${x}`,h=r.get(u);if(h){h.count+=1;continue}r.set(u,{startId:p,endId:g,startName:s.get(p)?.name||String(p),endName:s.get(g)?.name||String(g),startIndex:w,endIndex:y,type:x,count:1})}return{counts:i,spans:[...r.values()]}}var Jt="http://www.w3.org/2000/svg";var Nu=new Set(["script","foreignobject","iframe","object","embed"]),ju=new Set(["href","xlink:href"]),Fu=1,Cu=18,Bu=8,za=class e{static create(t,a,s,r,n={}){return new e(t,a,s,r,n)}constructor(t,a,s,r,n){this.host=t,this.manifestUrl=a,this.manifest=s,this.featuresByPage=r||{},this.callbacks=n,this.activePage=null,this.activeSvgUrl="",this.container=null,this.svg=null,this.overlay=null,this.mountedPages=new Map,this.loadingPages=new Map,this.svgCache=new Map,this.serial=0,this.maxMountedWorldPages=Fu,this.maxCachedSvgPages=Cu,this.worldHandlersInstalled=!1,this.worldDrag=null,this.view={scale:1,tx:0,ty:0},this.drag=null,this.selected=null,this.highlightedNetUid="",this.index=Zn(),this.lastStats={mountedPages:0,domNodes:0,indexedFeatures:0,indexedNets:0,mountMs:0,coldMounts:0,warmMounts:0,highlightMs:0,selectionMs:0,cachedSvgPages:0,cachedSvgBytes:0,heapMb:null,fallbackReason:""}}get active(){return!!(this.container&&this.activePage)}get worldActive(){return this.mountedPages.size>0}stats(){return{...this.lastStats,activePage:this.activePage?.name||[...this.mountedPages.values()][0]?.page?.name||"-",mountedPages:this.active?1:this.mountedPages.size}}dispose(){this.unmountPage(),this.unmountWorldPages()}unmountPage(){this.container?.remove(),this.container=null,this.svg=null,this.overlay=null,this.activePage=null,this.activeSvgUrl="",this.index=Zn(),this.host.hidden=!0}unmountWorldPages(){for(let t of this.mountedPages.values())t.container.remove();this.mountedPages.clear(),this.loadingPages.clear(),this.active||(this.host.hidden=!0)}async preloadPages(t){let a=performance.now(),s=await Promise.allSettled((t||[]).slice(0,Bu).map(r=>this.loadSvgTemplate(r)));this.lastStats.preloadedPages=s.filter(r=>r.status==="fulfilled"&&r.value).length,this.lastStats.preloadMs=performance.now()-a,this.updateCacheStats()}syncWorldPages(t,a,s={}){if(!a)return;this.installWorldHandlers(a);let r=(t||[]).slice(0,s.maxMountedPages||this.maxMountedWorldPages),n=new Set(r.map(i=>i.id));for(let[i,o]of this.mountedPages)n.has(i)||(o.container.remove(),this.mountedPages.delete(i));for(let i of r){let o=this.mountedPages.get(i.id);if(o)o.lastUsed=++this.serial,this.positionWorldEntry(o,a);else if(!this.loadingPages.has(i.id)){let c=this.mountWorldPage(i).then(l=>{l&&n.has(i.id)?this.positionWorldEntry(l,a):l?.container.remove()}).finally(()=>this.loadingPages.delete(i.id));this.loadingPages.set(i.id,c)}}this.pruneMountedWorldPages(n),this.host.hidden=r.length===0&&!this.active,this.setSelection(this.selected),this.setHighlightedNet(s.activeNetUid??this.highlightedNetUid),this.lastStats.mountedPages=this.mountedPages.size,this.updateCacheStats()}async mountWorldPage(t){let a=performance.now(),s=this.hasCachedSvg(t),r=await this.loadImportedSvg(t);if(!r)return null;let n=document.createElement("div");n.className="svg-dom-page svg-dom-world-page",n.dataset.pageId=t.id,n.append(r),this.host.append(n);let i=$n(r),o=Qn(r),c=Yn(r,t,this.featuresByPage[t.id]||[]),l={page:t,container:n,svg:r,overlay:i,selectionOverlay:o,index:c,mountMs:performance.now()-a,lastUsed:++this.serial,warm:s};return this.mountedPages.set(t.id,l),this.lastStats={...this.lastStats,mountedPages:this.mountedPages.size,domNodes:[...this.mountedPages.values()].reduce((p,g)=>p+g.svg.querySelectorAll("*").length,0),indexedFeatures:[...this.mountedPages.values()].reduce((p,g)=>p+g.index.featureToElements.size,0),indexedNets:new Set([...this.mountedPages.values()].flatMap(p=>[...p.index.netToElements.keys()])).size,mountMs:l.mountMs,coldMounts:this.lastStats.coldMounts+(l.warm?0:1),warmMounts:this.lastStats.warmMounts+(l.warm?1:0),fallbackReason:""},this.updateCacheStats(),l}async loadImportedSvg(t){let a=await this.loadSvgTemplate(t);return a?a.cloneNode(!0):null}async loadSvgTemplate(t){let a=this.svgUrlForPage(t),s=this.svgCache.get(a);if(s?.template)return s.lastUsed=++this.serial,s.template;if(s?.promise)return s.promise;let r=performance.now(),n=(async()=>{let i=await fetch(a,{cache:"default"});if(!i.ok)return this.lastStats.fallbackReason=`Failed to load SVG page ${t.id}: ${i.status}`,this.callbacks.onFallback?.(this.lastStats.fallbackReason),null;let o=await i.text(),l=new DOMParser().parseFromString(o,"image/svg+xml"),p=l.documentElement;if(!p||p.localName.toLowerCase()!=="svg"||l.querySelector("parsererror"))return this.lastStats.fallbackReason=`Invalid SVG for page ${t.id}`,this.callbacks.onFallback?.(this.lastStats.fallbackReason),null;Ou(l,a,t.id);let g=document.importNode(p,!0);g.classList.add("svg-dom-page-svg"),Gu(g);let w=this.svgCache.get(a)||{};return Object.assign(w,{template:g,promise:null,pageId:t.id,byteLength:o.length*2,loadMs:performance.now()-r,lastUsed:++this.serial}),this.svgCache.set(a,w),this.pruneSvgCache(),this.updateCacheStats(),g})();return this.svgCache.set(a,{promise:n,pageId:t.id,byteLength:0,loadMs:0,lastUsed:++this.serial}),n}svgUrlForPage(t){return new URL(t.svg||t.thumbnail?.path,this.manifestUrl).toString()}positionWorldEntry(t,a){let{page:s,container:r}=t,[n,i]=a.worldToScreen(s.worldX,s.worldY),[o,c]=a.worldToScreen(s.worldX+s.widthMm,s.worldY+s.heightMm),l=Math.max(1,o-n),p=Math.max(1,c-i);r.style.transform=`translate3d(${n}px, ${i}px, 0)`,r.style.width=`${l}px`,r.style.height=`${p}px`}installWorldHandlers(t){if(this.worldHandlersInstalled)return;this.worldHandlersInstalled=!0;let a=this.host;a.oncontextmenu=s=>s.preventDefault(),a.onpointerdown=s=>{let r=s.button===0&&!s.shiftKey&&!!s.target.closest?.("text"),i=s.target.closest?.("[data-feature-key]")?null:this.featureAtEvent(s);this.worldDrag={pointerId:s.pointerId,startX:s.clientX,startY:s.clientY,lastX:s.clientX,lastY:s.clientY,button:s.button,moved:!1,pan:!r&&(s.button===0||s.button===1||s.shiftKey),allowTextSelection:r},r||a.setPointerCapture(s.pointerId)},a.onpointermove=s=>{if(!this.worldDrag||this.worldDrag.pointerId!==s.pointerId)return;let r=s.clientX-this.worldDrag.lastX,n=s.clientY-this.worldDrag.lastY;this.worldDrag.lastX=s.clientX,this.worldDrag.lastY=s.clientY,Math.hypot(s.clientX-this.worldDrag.startX,s.clientY-this.worldDrag.startY)>3&&(this.worldDrag.moved=!0),this.worldDrag.pan&&t.pan(r,n)},a.onpointerup=s=>{if(!this.worldDrag||this.worldDrag.pointerId!==s.pointerId)return;let r=this.worldDrag;if(this.worldDrag=null,r.allowTextSelection||a.releasePointerCapture(s.pointerId),r.button!==0||r.moved)return;let n=s.target.closest?.("[data-feature-key]");if(n)this.selectElement(n,s);else{let i=this.featureAtEvent(s);i?this.selectFeature(i.entry,i.feature,s):this.callbacks.onBlank?.()}},a.ondblclick=s=>{let r=s.target.closest?.("[data-feature-key]"),n=r?null:this.featureAtEvent(s),i=n?.entry||this.entryForPoint(s.clientX,s.clientY),o=r?this.selectionFromElement(r):n?this.selectionFromFeature(n.entry,n.feature):this.selected;ei(o)?this.callbacks.onOpenPage?.(o):o?.netUid?this.callbacks.onHighlightNet?.(o.netUid,o):!n&&i?.page&&this.callbacks.onOpenPage?.({kind:"page",pageId:i.page.id,page:i.page})},a.onwheel=s=>{s.preventDefault(),Math.abs(s.deltaX)>Math.abs(s.deltaY)*.65?t.pan(-s.deltaX,-s.deltaY):t.zoom(s.deltaY,s.clientX,s.clientY)}}async focusPage(t,a={}){if(!t)return!1;if(this.activePage?.id===t.id&&this.active)return a.frame!==!1&&this.fitPage(),!0;let s=performance.now(),r=await this.loadImportedSvg(t);if(!r)return!1;let n=document.createElement("div");return n.className="svg-dom-page",n.append(r),this.host.replaceChildren(n),this.host.hidden=!1,this.container=n,this.svg=r,this.activePage=t,this.activeSvgUrl=new URL(t.svg||t.thumbnail?.path,this.manifestUrl).toString(),this.overlay=$n(r),this.selectionOverlay=Qn(r),this.index=Yn(r,t,this.featuresByPage[t.id]||[]),this.installPageHandlers(),this.fitPage(),this.setSelection(this.selected),this.setHighlightedNet(this.highlightedNetUid),this.lastStats={...this.lastStats,mountedPages:1,domNodes:r.querySelectorAll("*").length,indexedFeatures:this.index.featureToElements.size,indexedNets:this.index.netToElements.size,mountMs:performance.now()-s,fallbackReason:""},this.updateCacheStats(),!0}installPageHandlers(){let t=this.host;t.oncontextmenu=a=>a.preventDefault(),t.onpointerdown=a=>{if(!this.active)return;let s=a.button===0&&!a.shiftKey&&!!a.target.closest?.("text"),r=a.target.closest?.("[data-feature-key]"),n=r?null:this.featureAtEvent(a);this.drag={pointerId:a.pointerId,startX:a.clientX,startY:a.clientY,lastX:a.clientX,lastY:a.clientY,button:a.button,moved:!1,pan:!s&&(a.button===0||a.button===1||a.shiftKey),featureElement:r,allowTextSelection:s},s||t.setPointerCapture(a.pointerId)},t.onpointermove=a=>{if(!this.drag||this.drag.pointerId!==a.pointerId)return;let s=a.clientX-this.drag.lastX,r=a.clientY-this.drag.lastY;this.drag.lastX=a.clientX,this.drag.lastY=a.clientY,Math.hypot(a.clientX-this.drag.startX,a.clientY-this.drag.startY)>3&&(this.drag.moved=!0),this.drag.pan&&(this.view.tx+=s,this.view.ty+=r,this.applyTransform())},t.onpointerup=a=>{if(!this.drag||this.drag.pointerId!==a.pointerId)return;let s=this.drag;if(this.drag=null,s.allowTextSelection||t.releasePointerCapture(a.pointerId),s.button!==0||s.moved)return;let r=a.target.closest?.("[data-feature-key]");if(r)this.selectElement(r,a);else{let n=this.featureAtEvent(a);n?this.selectFeature(n.entry,n.feature,a):this.callbacks.onBlank?.()}},t.ondblclick=a=>{let s=a.target.closest?.("[data-feature-key]"),r=s?null:this.featureAtEvent(a),n=s?this.selectionFromElement(s):r?this.selectionFromFeature(r.entry,r.feature):this.selected;ei(n)?this.callbacks.onOpenPage?.(n):n?.netUid?this.callbacks.onHighlightNet?.(n.netUid,n):!r&&this.activePage&&this.callbacks.onOpenPage?.({kind:"page",pageId:this.activePage.id,page:this.activePage})},t.onwheel=a=>{if(a.preventDefault(),!this.active)return;if(Math.abs(a.deltaX)>Math.abs(a.deltaY)*.65){this.view.tx-=a.deltaX,this.view.ty-=a.deltaY,this.applyTransform();return}let s=this.host.getBoundingClientRect(),r=a.clientX-s.left,n=a.clientY-s.top,i=this.screenToSvg(r,n),o=Math.exp(-a.deltaY*.0016);this.view.scale=Ka(this.view.scale*o,.02,80),this.view.tx=r-i[0]*this.view.scale,this.view.ty=n-i[1]*this.view.scale,this.applyTransform()}}selectElement(t,a){let s=performance.now(),r=this.selectionFromElement(t);if(this.setSelection(r),a){let n=this.host.getBoundingClientRect();r.anchor={x:a.clientX-n.left,y:a.clientY-n.top}}this.callbacks.onSelect?.(r),this.lastStats.selectionMs=performance.now()-s}selectFeature(t,a,s){let r=performance.now(),n=this.selectionFromFeature(t,a);if(this.setSelection(n),s){let i=this.host.getBoundingClientRect();n.anchor={x:s.clientX-i.left,y:s.clientY-i.top}}this.callbacks.onSelect?.(n),this.lastStats.selectionMs=performance.now()-r}selectionFromElement(t){let a=t.dataset.featureKey||"",s=this.entryForElement(t),r=s.index.featureByKey.get(a)||{};return this.selectionFromFeature(s,r,t)}selectionFromFeature(t,a,s=null){let r=a?.stableKey||s?.dataset?.featureKey||"",n=t?.page||this.activePage,i=a?.kind||s?.dataset?.role||s?.dataset?.primitive||"feature",o=a?.netUid||s?.dataset?.netUid||"",c=a?.netName||s?.dataset?.netName||"";return i==="sheet"?{kind:"sheet",featureKey:r,sheetInstancePath:a?.sheetInstancePath||n?.sheetInstancePath||"",sourceId:a?.sourceId||s?.dataset?.sourceId||s?.dataset?.objectId||s?.dataset?.uuid||"",sheetName:a?.sheet_name||a?.sheetName||s?.dataset?.sheetName||a?.objectId||"",sheetFile:a?.sheet_file||a?.sheetFile||s?.dataset?.sheetFile||"",feature:a}:i==="pin"||i==="pin_body"||i==="pin_name"||i==="pin_number"||s?.dataset?.pin?{kind:"pin",featureKey:r,sheetInstancePath:a?.sheetInstancePath||n?.sheetInstancePath||"",sourceId:a?.sourceId||s?.dataset?.sourceId||s?.dataset?.objectId||s?.dataset?.uuid||"",symbolUuid:a?.symbolUuid||s?.dataset?.symbolUuid||"",reference:a?.reference||s?.dataset?.designator||s?.dataset?.component||s?.dataset?.ref||"",pinNumber:a?.pinNumber||s?.dataset?.pin||"",pinName:a?.pinName||"",netUid:o,netName:c,feature:a}:i==="symbol_body"||i==="symbol_instance"||i==="component"||s?.dataset?.ref?{kind:"component",featureKey:r,sheetInstancePath:a?.sheetInstancePath||n?.sheetInstancePath||"",sourceId:a?.sourceId||s?.dataset?.sourceId||s?.dataset?.objectId||s?.dataset?.uuid||"",symbolUuid:a?.symbolUuid||s?.dataset?.symbolUuid||"",reference:a?.reference||s?.dataset?.designator||s?.dataset?.component||s?.dataset?.ref||"",netUid:o,netName:c,feature:a}:{kind:o?"feature":i,featureKey:r,sheetInstancePath:a?.sheetInstancePath||n?.sheetInstancePath||"",sourceId:a?.sourceId||s?.dataset?.sourceId||s?.dataset?.objectId||s?.dataset?.uuid||"",role:i,netUid:o,netName:c,feature:a}}setSelection(t){this.selected=t||null;for(let s of this.host.querySelectorAll(".prism-svg-selected"))s.classList.remove("prism-svg-selected");for(let s of this.host.querySelectorAll("[data-prism-overlay='selection']"))s.replaceChildren();let a=t?.featureKey||"";if(a){for(let s of this.entries()){for(let r of s.index.featureToElements.get(a)||[])r.classList.add("prism-svg-selected");this.drawSelectionOverlay(s,t)}for(let s of this.index.featureToElements.get(a)||[])s.classList.add("prism-svg-selected");this.drawSelectionOverlay({page:this.activePage,index:this.index,selectionOverlay:this.selectionOverlay},t)}}setHighlightedNet(t){this.highlightedNetUid=t||"";let a=performance.now();for(let s of this.entries())this.updateEntryHighlight(s);if(!this.svg||!this.overlay){this.lastStats.highlightMs=performance.now()-a;return}this.updateEntryHighlight({svg:this.svg,overlay:this.overlay,index:this.index,page:this.activePage}),this.lastStats.highlightMs=performance.now()-a}updateEntryHighlight(t){if(!t?.svg||!t?.overlay||(t.overlay.replaceChildren(),!this.highlightedNetUid))return;let a=Ga(t.svg,t.page),s=document.createElementNS(Jt,"rect");s.setAttribute("x",String(a[0])),s.setAttribute("y",String(a[1])),s.setAttribute("width",String(a[2])),s.setAttribute("height",String(a[3])),s.setAttribute("class","prism-svg-net-dimmer"),t.overlay.append(s);let n=(t.index.netToElements.get(this.highlightedNetUid)||[]).slice(0,2200);for(let i of n){let o=zu(i);t.overlay.append(o)}}entries(){return[...this.mountedPages.values()]}entryForElement(t){let s=t.closest?.(".svg-dom-page")?.dataset.pageId||"";return this.mountedPages.get(s)||{page:this.activePage,index:this.index,svg:this.svg,overlay:this.overlay,selectionOverlay:this.selectionOverlay}}featureAtEvent(t){let a=this.entryForPoint(t.clientX,t.clientY);if(!a)return null;let s=this.clientToSvg(a,t.clientX,t.clientY);if(!s)return null;let r=Math.max(.18,5*Hu(a)),i=a.index.features.filter(o=>(o?.domBoundsMm||o?.boundsMm)&&si(o)).filter(o=>s[0]>=(o.domBoundsMm||o.boundsMm)[0]-r&&s[0]<=(o.domBoundsMm||o.boundsMm)[2]+r&&s[1]>=(o.domBoundsMm||o.boundsMm)[1]-r&&s[1]<=(o.domBoundsMm||o.boundsMm)[3]+r).map(o=>({feature:o,priority:Xu(o),area:Math.max(1e-4,((o.domBoundsMm||o.boundsMm)[2]-(o.domBoundsMm||o.boundsMm)[0])*((o.domBoundsMm||o.boundsMm)[3]-(o.domBoundsMm||o.boundsMm)[1]))})).sort((o,c)=>c.priority-o.priority||o.area-c.area)[0]?.feature;return i?{entry:a,feature:i,point:s}:null}entryForPoint(t,a){for(let s of[...this.entries()].reverse()){let r=s.container.getBoundingClientRect();if(t>=r.left&&t<=r.right&&a>=r.top&&a<=r.bottom)return s}if(this.container){let s=this.container.getBoundingClientRect();if(t>=s.left&&t<=s.right&&a>=s.top&&a<=s.bottom)return{page:this.activePage,container:this.container,svg:this.svg,index:this.index,selectionOverlay:this.selectionOverlay}}return null}clientToSvg(t,a,s){if(!t?.container||!t?.svg||!t?.page)return null;let r=t.container.getBoundingClientRect();if(!r.width||!r.height)return null;let n=Ga(t.svg,t.page);return[n[0]+(a-r.left)/r.width*n[2],n[1]+(s-r.top)/r.height*n[3]]}drawSelectionOverlay(t,a){if(!t?.selectionOverlay||!a?.featureKey)return;let s=t.index.featureByKey.get(a.featureKey),r=s?.domBoundsMm||s?.boundsMm;if(!r)return;let[n,i,o,c]=r,l=document.createElementNS(Jt,"rect");l.setAttribute("x",String(n)),l.setAttribute("y",String(i)),l.setAttribute("width",String(Math.max(.001,o-n))),l.setAttribute("height",String(Math.max(.001,c-i))),l.setAttribute("rx","0.65"),l.setAttribute("ry","0.65"),l.setAttribute("class","prism-svg-selection-box"),t.selectionOverlay.append(l)}fitPage(){if(!this.svg||!this.activePage)return;let t=Ga(this.svg,this.activePage),a=t[2]||this.activePage.sourceWidthMm||this.activePage.widthMm||1,s=t[3]||this.activePage.sourceHeightMm||this.activePage.heightMm||1,r=this.host.getBoundingClientRect(),n=Math.min(r.width/a,r.height/s)*.92;this.view.scale=Ka(n,.02,80),this.view.tx=(r.width-a*this.view.scale)/2-t[0]*this.view.scale,this.view.ty=(r.height-s*this.view.scale)/2-t[1]*this.view.scale,this.applyTransform()}frameSelection(t=this.selected){if(!t?.featureKey||!this.active){this.fitPage();return}let a=this.index.featureToElements.get(t.featureKey)||[],s=ai(a);if(!s)return;let r=this.host.getBoundingClientRect(),n=Math.max(1,s[2]-s[0]),i=Math.max(1,s[3]-s[1]),o=Math.min(r.width/n,r.height/i)*.36;this.view.scale=Ka(o,.04,80),this.view.tx=r.width/2-(s[0]+s[2])/2*this.view.scale,this.view.ty=r.height/2-(s[1]+s[3])/2*this.view.scale,this.applyTransform()}pan(t,a){this.active&&(this.view.tx+=t,this.view.ty+=a,this.applyTransform())}zoom(t,a,s){if(!this.active)return;let r=this.host.getBoundingClientRect(),n=(a??r.left+r.width/2)-r.left,i=(s??r.top+r.height/2)-r.top,o=this.screenToSvg(n,i),c=Math.exp(-t*.0016);this.view.scale=Ka(this.view.scale*c,.02,80),this.view.tx=n-o[0]*this.view.scale,this.view.ty=i-o[1]*this.view.scale,this.applyTransform()}screenToSvg(t,a){return[(t-this.view.tx)/Math.max(1e-6,this.view.scale),(a-this.view.ty)/Math.max(1e-6,this.view.scale)]}applyTransform(){this.container&&(this.container.style.transform=`translate3d(${this.view.tx}px, ${this.view.ty}px, 0) scale(${this.view.scale})`)}hasCachedSvg(t){return!!this.svgCache.get(this.svgUrlForPage(t))?.template}pruneMountedWorldPages(t=new Set){if(this.mountedPages.size<=this.maxMountedWorldPages)return;let a=[...this.mountedPages.entries()].filter(([s])=>!t.has(s)).sort((s,r)=>(s[1].lastUsed||0)-(r[1].lastUsed||0));for(let[s,r]of a){if(this.mountedPages.size<=this.maxMountedWorldPages)break;r.container.remove(),this.mountedPages.delete(s)}}pruneSvgCache(){let t=[...this.svgCache.entries()].filter(([,r])=>r?.template);if(t.length<=this.maxCachedSvgPages)return;let a=new Set([...this.mountedPages.values()].map(r=>this.svgUrlForPage(r.page)));this.activePage&&a.add(this.svgUrlForPage(this.activePage));let s=t.filter(([r])=>!a.has(r)).sort((r,n)=>(r[1].lastUsed||0)-(n[1].lastUsed||0));for(let[r]of s){if([...this.svgCache.values()].filter(n=>n?.template).length<=this.maxCachedSvgPages)break;this.svgCache.delete(r)}}updateCacheStats(){let t=[...this.svgCache.values()].filter(s=>s?.template);this.lastStats.cachedSvgPages=t.length,this.lastStats.cachedSvgBytes=t.reduce((s,r)=>s+(r.byteLength||0),0);let a=performance?.memory;this.lastStats.heapMb=a?.usedJSHeapSize?a.usedJSHeapSize/1048576:null}};function Ou(e,t,a){for(let n of[...e.querySelectorAll("*")]){if(Nu.has(n.localName.toLowerCase())){n.remove();continue}for(let i of[...n.attributes]){let o=i.name,c=o.toLowerCase(),l=i.value||"";if(c.startsWith("on")){n.removeAttribute(o);continue}if((c==="href"||c==="xlink:href"||c==="src")&&ri(l)){if((c==="href"||c==="xlink:href")&&n.localName.toLowerCase()==="image"&&Ju(l))continue;n.removeAttribute(o);continue}c==="style"&&n.setAttribute(o,$u(l))}}let s=`prism-${Vs(a)}-`,r=new Map;for(let n of e.querySelectorAll("[id]")){let i=n.getAttribute("id"),o=`${s}${Vs(i)}`;r.set(i,o),n.setAttribute("id",o)}for(let n of e.querySelectorAll("*"))for(let i of[...n.attributes]){let o=i.name.toLowerCase(),c=i.value||"";ju.has(o)&&(c.startsWith("#")&&r.has(c.slice(1))?c=`#${r.get(c.slice(1))}`:Yu(c)&&(c=new URL(c,t).toString())),c=Qu(c,r),n.setAttribute(i.name,c)}}function Yn(e,t,a){let s=new Map,r=new Map,n=new Map,i=[];for(let p of a){let g=Uu(p,t);i.push(g),r.set(g.stableKey,g),n.set(Number(g.id||0),g);for(let w of Lu(g))s.has(w)||s.set(w,[]),s.get(w).push(g)}let o=new Map,c=new Map,l=new Map;for(let p of i)l.set(p.stableKey,p);for(let p of e.querySelectorAll("[data-uuid], [data-element-key], [data-primitive], [data-ref], [data-pin], [data-object-id], [data-designator], [data-component]")){let g=Pu(p,s,t);if(g&&!si(g)||!g&&!Wu(p))continue;let w=Ku(p,t),y=g?.stableKey||w,f=g?.netUid||"",d=g?.netName||"";p.classList.add("prism-feature"),p.dataset.featureKey=y,p.dataset.sourceId=g?.sourceId||p.dataset.uuid||p.dataset.elementKey||"",p.dataset.role=g?.kind||p.dataset.primitive||p.dataset.ref||"feature",g?.id&&(p.dataset.featureId=String(g.id)),f&&(p.dataset.netUid=f),d&&(p.dataset.netName=d),p.id||(p.id=`prism-feature-${Vs(y)}`),ti(o,y,p),l.set(y,g||{id:0,stableKey:y,kind:p.dataset.role,sourceId:p.dataset.sourceId,sheetInstancePath:t.sheetInstancePath||""}),f&&ti(c,f,p)}for(let[p,g]of o){let w=l.get(p),y=ai(g);w&&y&&(w.domBoundsMm=Vu(w.boundsMm,y))}return{featureToElements:o,netToElements:c,featureByKey:l,byId:n,bySource:s,features:i}}function Pu(e,t,a){let r=[e.dataset.uuid,e.dataset.elementKey,e.dataset.sourceId,e.dataset.objectId,e.dataset.componentUid,e.dataset.componentUuid,e.dataset.ref&&`${e.dataset.ref}:${e.dataset.pin||""}`].filter(Boolean).flatMap(i=>t.get(i)||[]);if(!r.length)return null;let n=String(e.dataset.primitive||e.dataset.ref||e.dataset.pin||"").toLowerCase();return r.map(i=>({feature:i,score:Du(i,n,a)})).sort((i,o)=>o.score-i.score)[0].feature}function Du(e,t,a){let s=0,r=String(e.kind||"").toLowerCase();return e.sheetInstancePath===a.sheetInstancePath&&(s+=20),e.netUid&&(s+=4),t&&r.includes(t)&&(s+=8),t==="symbol"&&r==="symbol_body"&&(s+=12),(t==="label"||t==="port")&&(r.includes("label")||r.includes("port"))&&(s+=12),t==="sheet"&&r==="sheet"&&(s+=12),r!=="record"&&(s+=2),r.includes("pin")&&(s+=2),s}function Uu(e,t){let a=e.sourceId||e.sourceUid||e.uuid||e.objectId||e.stableKey||"";return{...e,id:Number(e.id||0),sourceId:a,stableKey:e.stableKey||`${t.sheetInstancePath||t.id}|${a}|0|${e.kind||"feature"}|0`,sheetInstancePath:e.sheetInstancePath||t.sheetInstancePath||""}}function Lu(e){let t=new Set([e.sourceId,e.sourceUid,e.uuid,e.objectId,e.stableKey].filter(Boolean).map(String));return e.reference&&e.pinNumber&&t.add(`${e.reference}:${e.pinNumber}`),e.componentDesignator&&t.add(e.componentDesignator),e.reference&&t.add(e.reference),[...t]}function Ku(e,t){let a=e.dataset.uuid||e.dataset.elementKey||e.dataset.objectId||e.dataset.ref||e.id||"svg",s=e.dataset.primitive||e.dataset.role||e.localName||"feature";return`${t.sheetInstancePath||t.id}|${a}|0|${s}|0`}function Gu(e){let t=document.createElementNS(Jt,"style");t.textContent=`
    .prism-feature { cursor: pointer; }
    .prism-svg-selected { outline: none; filter: drop-shadow(0 0 2.4px rgba(59,130,246,0.98)); }
    .prism-svg-selection-box {
      fill: rgba(59, 130, 246, 0.12);
      stroke: #3b82f6;
      stroke-width: 0.38mm;
      stroke-dasharray: 1.4 0.7;
      vector-effect: non-scaling-stroke;
      pointer-events: none;
    }
    .prism-svg-net-dimmer { fill: rgba(10, 14, 22, 0.055); pointer-events: none; }
    .prism-svg-net-overlay { pointer-events: none; }
    .prism-svg-net-overlay * {
      stroke: #18ef52 !important;
      fill: none !important;
      stroke-width: 0.34mm !important;
      vector-effect: non-scaling-stroke;
      opacity: 0.98;
    }
  `,e.prepend(t)}function $n(e){let t=document.createElementNS(Jt,"g");return t.setAttribute("class","prism-svg-net-overlay"),t.setAttribute("data-prism-overlay","net-highlight"),e.append(t),t}function Qn(e){let t=document.createElementNS(Jt,"g");return t.setAttribute("class","prism-svg-selection-overlay"),t.setAttribute("data-prism-overlay","selection"),t.style.pointerEvents="none",e.append(t),t}function zu(e){let t=e.cloneNode(!0);t.removeAttribute("id"),t.removeAttribute("data-feature-key"),t.removeAttribute("data-net-uid"),t.removeAttribute("data-net-name"),t.classList.add("prism-svg-net-overlay-clone");for(let a of[t,...Array.from(t.querySelectorAll?.("*")||[])])a instanceof SVGElement&&(a.removeAttribute("filter"),a.style.pointerEvents="none",a.style.stroke="#18ef52",a.style.fill="none",a.style.opacity="0.98",a.style.vectorEffect="non-scaling-stroke");return t}function ai(e){let t=null;for(let a of e)if(a.getBBox)try{let s=a.getBBox(),r=[s.x,s.y,s.x+s.width,s.y+s.height];t=t?[Math.min(t[0],r[0]),Math.min(t[1],r[1]),Math.max(t[2],r[2]),Math.max(t[3],r[3])]:r}catch{}return t}function Vu(e,t){return e?t?[Math.min(e[0],t[0]),Math.min(e[1],t[1]),Math.max(e[2],t[2]),Math.max(e[3],t[3])]:e:t}function Ga(e,t){let a=e.getAttribute("viewBox");if(a){let s=a.trim().split(/[\s,]+/).map(Number);if(s.length===4&&s.every(Number.isFinite))return s}return[0,0,t.sourceWidthMm||t.widthMm||1,t.sourceHeightMm||t.heightMm||1]}function Zn(){return{featureToElements:new Map,netToElements:new Map,featureByKey:new Map,byId:new Map,bySource:new Map,features:[]}}function Hu(e){let t=e?.container?.getBoundingClientRect?.();if(!e?.svg||!e?.page||!t?.width||!t?.height)return .1;let a=Ga(e.svg,e.page);return Math.max(a[2]/t.width,a[3]/t.height)}function qu(e){let t=String(e?.kind||"").toLowerCase(),a=String(e?.semanticRole||"").toLowerCase(),s=`${e?.sourceId||""} ${e?.objectId||""} ${e?.text||""}`.toLowerCase();return t.includes("page")||a.includes("page")||t.includes("background")||a.includes("background")||s.includes("background")||s.includes("sheet_header")||s.includes("sheet header")||s.includes("drawing-sheet")}function Xu(e){let t=String(e?.kind||e?.semanticRole||"").toLowerCase();return t.includes("pin")?90:t.includes("label")||t.includes("port")?78:t.includes("wire")||t.includes("bus")||t.includes("junction")?70:t.includes("symbol")||t.includes("component")?54:t.includes("image")?30:20}function si(e){if(!e||qu(e))return!1;let t=String(e.kind||e.semanticRole||"").toLowerCase();return["pin","label","port","wire","bus","junction","no_connect","symbol","component","sheet","image","text"].some(a=>t.includes(a))}function Wu(e){let t=`${e?.dataset?.primitive||""} ${e?.dataset?.ref||""} ${e?.dataset?.role||""} ${e?.dataset?.objectId||""} ${e?.dataset?.text||""}`.toLowerCase();return!t||t.includes("background")||t.includes("sheet_header")||t.includes("sheet header")||t.includes("drawing-sheet")?!1:["pin","label","port","wire","bus","junction","no_connect","symbol","component","sheet","image","text"].some(a=>t.includes(a))}function ei(e){return String(e?.kind||e?.feature?.kind||"").toLowerCase()==="sheet"}function ti(e,t,a){e.has(t)||e.set(t,[]),e.get(t).push(a)}function ri(e){let t=String(e||"").trim().toLowerCase();return!t||t.startsWith("#")?!1:t.startsWith("javascript:")||t.startsWith("data:")||t.startsWith("http://")||t.startsWith("https://")}function Ju(e){return/^data:image\/(?:png|jpe?g|gif|webp);base64,[a-z0-9+/=\s]+$/i.test(String(e||"").trim())}function Yu(e){let t=String(e||"").trim();return t&&!t.startsWith("#")&&!/^[a-z][a-z0-9+.-]*:/i.test(t)}function $u(e){return String(e||"").replace(/url\(([^)]+)\)/gi,(t,a)=>{let s=a.trim().replace(/^['"]|['"]$/g,"");return ri(s)?"none":t})}function Qu(e,t){let a=String(e||"");return a=a.replace(/url\(#([^)]+)\)/g,(s,r)=>t.has(r)?`url(#${t.get(r)})`:s),a=a.replace(/^#(.+)$/,(s,r)=>t.has(r)?`#${t.get(r)}`:s),a}function Vs(e){return String(e||"").trim().replace(/[^a-zA-Z0-9_-]+/g,"-").replace(/^-+|-+$/g,"").slice(0,96)||"item"}function Ka(e,t,a){return Math.max(t,Math.min(a,e))}var Zu=512*1024*1024,ef=.65,tf=120,af=12,sf=48,bi=230,rf=40,nf=4,Re=window.__TOPOLOGY__||{},Ae=window.__SEMANTIC_GEOMETRY__||{},Ja={stage:"semantic-ready",progress:100},Xs=document,yt,X,Ee,Ya,$a,Qa,Qt,ns,Xe,Va,Ge,he,xe,Ha,Za,Zt,Te,Q,is,os,Me,Ct,ee=e=>Xs.querySelector(e),It=e=>Xs.querySelectorAll(e);function of(e=document){Xs=e,yt=ee("#app"),X=ee("#viewport"),Ee=ee("#schematic-viewport"),Ya=ee("#schematic-dom-layer"),$a=ee("#schematic-flow-overlay"),Qa=ee("#bom-view"),Qt=ee("#status")||{set textContent(t){}},ns=ee("#viewer-kind")||{set textContent(t){}},Xe=ee("#selection")||{set textContent(t){}},Va=ee("#diagnostics")||{set innerHTML(t){}},Ge=ee("#layers"),he=ee("#search-controls"),xe=ee("#view-controls"),Me=ee("#stackup-workspace-view"),Ha=ee("#fallback"),Za=ee("#panel-labels"),Zt=ee("#schematic-labels"),Te=ee("#axis-gizmo"),Q=ee("#selection-card"),is=ee("#primary-heading"),os=ee("#primary-description"),Ct=ee("#mode-switch"),yt.classList.add("workspace-pcb")}function gi(){return{workspace:"pcb",mode:"3d",cameraTool:"orbit",compareLayers:new Set,desiredCompareLayers:new Set,visible3dLayers:new Set,activeNetId:0,highlightedNetIds:new Set,selectedFeatureId:0,selectedOccurrence:0,selectionAnchor:null,showBoard:!0,showComponents:!0,isolateNet:!1,hiddenComponents:new Set,savedShowBoard:!0,savedShowComponents:!0,preIsolation3dLayers:null,preIsolationCompareLayers:null,preIsolationShowBoard:null,separation:0,dragging:!1,dragMode:"orbit",lastX:0,lastY:0,pointerStartX:0,pointerStartY:0,loadedBytes:0,triangles:0,residentTileBytes:0,residentTileGpuBytes:0,residentTileTriangles:0,tileLoads:0,tileEvictions:0,tileSchedulerMs:0,lastTileScheduleAt:0,visibleTileIds:new Set,frameCpuMs:0,frameCpuP95Ms:0,frameIntervalMs:0,frameIntervalP95Ms:0,frameSamples:[],fps:0,frames:0,fpsAt:performance.now(),activeTab:"layers",selectedPageId:"",selectedSchematicFeature:null,schematicDragging:!1,schematicLastX:0,schematicLastY:0,schematicStartX:0,schematicStartY:0}}function pi(){return{manifest:null,manifestUrl:"",layers:[],copperLayers:[],nets:[],features:new Map,tiles:new Map,loaded:new Set,loading:new Map,failed:new Map,residentTiles:new Map,componentFeatures:new Map,componentModelCounts:new Map,runtimeBounds:null,occurrenceBounds:null,layerZOffsets:new Float32Array(256),layerZOffsetSignature:""}}function mi(){return{key:"",started:0,from:new Map,current:new Map}}function xi(){return{phase:"idle",previous:new Set,target:new Set,previousOffsets:new Map,started:0}}function yi(){return{manifest:null,manifestUrl:"",pages:[],byId:new Map,activeNetUid:"",visiblePages:[],fitted:!1,rendererMode:new URLSearchParams(location.search).get("schematicRenderer")||"svg-dom",domFallbackReason:""}}var b=gi(),R=pi(),ge=mi(),z=xi(),P=yi(),es=[],V,S,Y,ze,J,Ne,Mt=new Map,$t=performance.now(),Se=0,qa=0,Ws=null,Bt=!1,Js=()=>!0,ts=!0;!window.__PRISM_SEMANTIC_VIEWER_MANUAL_BOOT__&&document.getElementById("app")&&Ys().catch(e=>{console.error(e),Qt&&(Qt.textContent="Renderer failed"),Ha&&(Ha.hidden=!1,Ha.textContent=e.stack||e.message||String(e))});function cf(e){let t=new Map((e.components||[]).map(s=>[s.uid,s])),a={};for(let s of e.terminals||[]){let r=s.net_uid;if(!r)continue;let n=t.get(s.component_uid)||{},i={designator:s.designator||n.designator||"",pin:s.pin||"",value:n.value||"",pcb_pad_id:s.pcb_pad_id||""};a[r]||(a[r]={terminals:[]});let o=a[r].terminals;o.some(c=>c.designator===i.designator&&c.pin===i.pin)||o.push(i)}return a}function df(e){if(!e||!Re||!Re.physical_objects)return 0;let t=Re.physical_objects.find(s=>s.uid===e);if(!t||!t.source_ids||!t.source_ids.length)return 0;let a=t.source_ids[0];for(let[s,r]of R.features.entries())if(r.sourceUid===a)return s;return 0}function vi(e){return!e||!Re||!Re.components?null:Re.components.find(t=>t.designator===e)}function Yt(e,t){for(let a of Object.keys(e))delete e[a];Object.assign(e,t)}function wi(){qa&&(cancelAnimationFrame(qa),qa=0),window.removeEventListener("keydown",Vi),V?.dispose?.(),V=null,S=null,Y?.dispose?.(),Y=null,ze=null,Ws=null,Js=()=>!0,ts=!0}function lf(){return Se+=1,wi(),Yt(b,gi()),Yt(R,pi()),Yt(ge,mi()),Yt(z,xi()),Yt(P,yi()),es=[],J=null,Ne=null,Mt=new Map,$t=performance.now(),Se}function uf(e){e===Se&&(Se+=1,wi())}function qs(e){e===Se&&(qa=requestAnimationFrame(t=>jf(t,e)))}function ke(e){return e===Se}async function Ys(e={}){let t=lf(),a={};if(Re=e.topology||window.__TOPOLOGY__||{},Re&&!Re.net_details&&(Re.net_details=cf(Re)),Ae=e.semanticGeometry||window.__SEMANTIC_GEOMETRY__||{},Ja=e.readiness||Ae.readiness||{stage:"semantic-ready",progress:100},Ws=typeof e.onSelectionChange=="function"?e.onSelectionChange:null,Js=typeof e.isActive=="function"?e.isActive:()=>!0,ts=e.workspaceScope!=="3d",of(e.root||document),!yt||!X)throw new Error("Semantic viewer shell is missing required DOM nodes");return await bf(t,a,e.onPerformanceEvent),{performance:a,setSelection(s){Bt=!0;try{if(s?.occurrence!=null&&ff(s.occurrence),!s)wt();else if(s?.netName||s?.netUid){let r=s.netUid&&R.nets.find(n=>n.uid===s.netUid)||s.netName&&Kt(R.nets,s.netName);r&&as(Number(r.id),!0)}else s?.netId?as(Number(s.netId),!0):s?.featureId?Pt(Number(s.featureId),!0):s?.reference&&ar(String(s.reference),!0)}finally{Bt=!1}},resize(){V?.resize(),S?.resize(),b.workspace==="pcb"&&b.mode==="layer"&&tr()},setWorkspace(s){let r=s==="stackup"?"stackup":"pcb";b.workspace!==r&&Ki(r)},setHiddenComponents(s){return Jf(s)},setHighlightedNets(s){return hf(s)},setOccurrences(s){return Sf(s)},pickAt(s,r){return rh(s,r)},projectComponent(s,r){return ih(s,r)},projectPoint(s,r){return zi(s,r)},dispose(){uf(t)}}}function cs(e){if(Bt)return;let t=V&&!V.identityOnly?V.occurrenceKeys[b.selectedOccurrence]:null;Ws?.(e&&t!=null?{...e,occurrence:t}:e)}function ff(e){let t=V?.occurrenceKeys.indexOf(String(e))??-1;t>=0&&(b.selectedOccurrence=t)}function $s(e){if(!e||!V||V.identityOnly)return e;let t=V.occurrenceMatrices[b.selectedOccurrence];return t?Ps(t,e):e}function Ti(e,t=null){return e?{kind:"net",sourceContext:"3D",netName:String(e.name||""),netUid:String(e.uid||"")||void 0,netCode:Number(e.id||0)||void 0,featureId:Number(t?.id||0)||void 0,uuid:String(t?.sourceUid||"")||void 0}:null}function Ei(e){if(!e)return null;let t=ta(e),a=String(e.padNumber||e.pin||e.pinNumber||""),s=R.nets.find(r=>Number(r.id)===Number(e.netId||0));if(t&&a)return{kind:"terminal",sourceContext:"3D",reference:t,pin:a,netUid:s?.uid,netName:s?.name,netCode:s?Number(s.id):void 0,uuid:String(e.sourceUid||"")||void 0,featureId:Number(e.id||0)||void 0};if(t){let r=vi(t);return{kind:"component",sourceContext:"3D",reference:t,componentUid:r?.uid,uuid:String(e.sourceUid||"")||void 0,featureId:Number(e.id||0)||void 0}}return Ti(s,e)}function ki(){b.showBoard=!0,b.showComponents=!0,ra(),typeof Oe=="function"&&Oe()}function vt(){let e=new Set(b.highlightedNetIds);return b.activeNetId&&e.add(Number(b.activeNetId)),e}function hf(e){let t=Array.isArray(e)?e:[],a=gr(R.nets,t),s=vt().size>0;b.highlightedNetIds=a,V?.setEmphasizedNetIds(a);let r=vt().size>0;return r&&!s?Qs():!r&&s&&Ri(),b.isolateNet&&r&&na(),pe(performance.now(),{force:!0}),{applied:a.size,requested:t.length}}function Qs(){(b.showBoard||b.showComponents)&&(b.savedShowBoard=b.showBoard,b.savedShowComponents=b.showComponents),b.showBoard=!1,b.showComponents=!1,ra(),typeof Oe=="function"&&Oe()}function Ri(){b.showBoard=b.savedShowBoard!==!1,b.showComponents=b.savedShowComponents!==!1,ra(),typeof Oe=="function"&&Oe()}async function bf(e,t={},a=null){let s=performance.now(),r=Ae.assets?.scene_manifest||Ae.semantic_gltf?.path,n=performance.now();if(r){if(R.manifestUrl=new URL(r,location.href).toString(),R.manifest=await mf(R.manifestUrl),t.scene_manifest_fetch_parse_ms=performance.now()-n,!ke(e))return;if(R.manifest.schema!=="prism.semantic_gltf_a0")throw new Error(`Unsupported scene schema: ${R.manifest.schema}`)}else R.manifest={schema:"prism.semantic_gltf_partial.a0",bbox:null,layers:[],nets:[],objectFeatures:[],components:[],tiles:[],barrels:[]},t.scene_manifest_fetch_parse_ms=0;n=performance.now(),R.layers=R.manifest.layers||[],R.copperLayers=R.layers.filter(l=>l.role==="copper"||String(l.name).endsWith(".Cu")),R.nets=R.manifest.nets||[];for(let l of R.manifest.objectFeatures||[])R.features.set(Number(l.id),{...l,bounds:Zs(l.boundsMm)});for(let l of R.manifest.components||[])R.componentFeatures.set(l.designator,l),R.features.set(Number(l.featureId),{...l,kind:"component",sourceUid:l.uid,netId:0,bounds:null});for(let l of R.manifest.tiles||[])R.tiles.set(l.id,l);t.scene_manifest_index_ms=performance.now()-n;let i=Mi();for(let l of i)b.compareLayers.add(l),b.desiredCompareLayers.add(l);for(let l of R.copperLayers)b.visible3dLayers.add(Number(l.id));if(n=performance.now(),V=await Ba.create(X),t.webgpu_renderer_create_ms=performance.now()-n,!ke(e)){V?.dispose?.(),V=null;return}V.setBarrels(R.manifest.barrels||[]),n=performance.now();let o=await Mf(e);if(t.board_fetch_parse_upload_ms=performance.now()-n,!ke(e)||(R.runtimeBounds=o||er(R.manifest.bbox),J=new ua(R.runtimeBounds),ts&&(await gf(e),!ke(e)||(await pf(e),!ke(e)))))return;n=performance.now(),Bi(),eh(),ts&&(sh(),ah()),Xf(),ch(),t.controls_and_bindings_ms=performance.now()-n;let c={"board-ready":"Board ready \xB7 components and semantic layers are still generating","components-ready":"Board and components ready \xB7 semantic layers are still generating","semantic-ready":"WebGPU semantic glTF active"};if(Qt.textContent=c[Ja.stage]||"Loading 3D assets",Ae.assets?.components_glb){let l=performance.now();_f(e).then(()=>{ke(e)&&a?.({schema:"prism.semantic_viewer_performance.a0",milestone:"components-loaded",readiness_stage:Ja.stage,elapsed_ms:performance.now()-l,bytes_loaded:b.loadedBytes})})}pe(performance.now(),{force:!0}),qs(e),n=performance.now(),await new Promise(l=>requestAnimationFrame(l)),t.first_frame_wait_ms=performance.now()-n,t.boot_total_ms=performance.now()-s}async function gf(e=Se){let t=Ae.assets?.schematic_native_manifest||Ae.schematic_vector?.path||Ae.schematic_scene?.path,a=Ae.assets?.schematic_manifest||Ae.schematic_world?.path,s=ee("[data-workspace=schematic]");if(!t&&!a){s.disabled=!0,s.title="No schematic world assets are available";return}let r=[t,a].filter(Boolean),n=null;for(let o of r)try{P.manifestUrl=new URL(o,location.href).toString();let c=await La.create(Ee,P.manifestUrl);if(!ke(e))return;S=c,S.setFlowOverlayCanvas($a);break}catch(c){if(n=c,S=null,o===a)throw c}if(!S)throw n||new Error("Failed to load schematic viewer assets");P.manifest=S.manifest,P.pages=S.pages,P.byId=new Map(P.pages.map(o=>[o.id,o])),b.selectedPageId=P.pages[0]?.id||"",S.selectedPageId=b.selectedPageId,!["native","legacy","webgpu"].includes(String(P.rendererMode).toLowerCase())&&(Y=za.create(Ya,P.manifestUrl,P.manifest,S.featuresByPage,{onSelect:Gf,onBlank:sa,onHighlightNet:Pi,onOpenPage:Lf,onFallback:o=>{P.domFallbackReason=o,console.warn(o)}}),Y.preloadPages(P.pages)),S.preloadOverview()}async function pf(e=Se){let t=Ae.assets?.bom||Ae.bom?.path,a=ee("[data-workspace=bom]");if(!t){a&&(a.disabled=!0,a.title="No BoM artifact is available");return}try{let s=await fa.create(Qa,new URL(t,location.href).toString(),{onSelectReference:r=>ar(r,!0)});if(!ke(e))return;ze=s}catch(s){if(!ke(e))return;console.warn(s),a&&(a.disabled=!0,a.title=s?.message||"BoM artifact could not be loaded")}}async function mf(e){let t=await fetch(e,{cache:"default"});if(!t.ok)throw new Error(`Failed to load ${e}: ${t.status}`);return t.json()}async function xf(e,t=Se){if(!ke(t))return;let a=R.residentTiles.get(e.id);if(a){a.lastUsed=performance.now();return}if(R.failed.get(e.id))return;if(R.loading.has(e.id))return R.loading.get(e.id);let r=(async()=>{try{let n=await _a(new URL(e.path,R.manifestUrl).toString(),{fetchCache:"no-store"});if(!ke(t)||!V)return;b.loadedBytes+=n.byteLength;let i=R.layers.find(g=>Number(g.id)===Number(e.layerId)),o=[],c=0,l=0;for(let g of n.primitives){let w=V.addPrimitive(g,{kind:"copper",tileId:e.id,layerId:Number(e.layerId),color:ji(i),baseZ:Number(i?.z_mm||0)/1e3,material:{baseColor:[1,1,1,1],metallic:.78,roughness:.32}});o.push(w),c+=g.indices.length/3,l+=yf(g)}let p={tile:e,entries:o,byteLength:n.byteLength,gpuBytes:l,triangles:c,lastUsed:performance.now(),pinned:!1};R.residentTiles.set(e.id,p),R.loaded.add(e.id),b.tileLoads+=1,b.residentTileBytes+=n.byteLength,b.residentTileGpuBytes+=l,b.residentTileTriangles+=c,b.triangles=b.residentTileTriangles,R.failed.delete(e.id)}catch(n){if(!ke(t))return;let i=R.failed.get(e.id)||{count:0,message:""};R.failed.set(e.id,{count:i.count+1,message:n?.message||String(n)}),i.count||console.warn(`Failed to load tile ${e.id}; suppressing retries until assets are regenerated`,n)}finally{ke(t)&&R.loading.delete(e.id)}})();return R.loading.set(e.id,r),r}function yf(e){return e.position.length/3*rf+e.indices.length*nf}function vf(e){let t=R.residentTiles.get(e);t&&(V.removeEntries(t.entries),R.residentTiles.delete(e),R.loaded.delete(e),b.residentTileBytes=Math.max(0,b.residentTileBytes-t.byteLength),b.residentTileGpuBytes=Math.max(0,b.residentTileGpuBytes-t.gpuBytes),b.residentTileTriangles=Math.max(0,b.residentTileTriangles-t.triangles),b.triangles=b.residentTileTriangles,b.tileEvictions+=1)}function pe(e=performance.now(),t={}){if(!V||!J||b.workspace!=="pcb")return;let a=b.mode==="layer"&&z.phase==="preload";if(!t.force&&!a&&e-b.lastTileScheduleAt<tf)return;let s=performance.now();b.lastTileScheduleAt=e;let r=wf();b.visibleTileIds=r;let n=R.loading.size,o=Math.max(0,(a?sf:af)-n),c=[...r].map(p=>R.tiles.get(p)).filter(p=>p&&!R.residentTiles.has(p.id)&&!R.loading.has(p.id)&&!R.failed.has(p.id)).sort((p,g)=>ii(p)-ii(g)).slice(0,o),l=Se;for(let p of c)xf(p,l);for(let p of r){let g=R.residentTiles.get(p);g&&(g.lastUsed=e)}kf(r),b.tileSchedulerMs=performance.now()-s}function wf(){let e=new Set,t=b.mode==="3d"?b.visible3dLayers:Tf();if(!t.size||!Ne)return e;if(b.mode==="layer"){for(let r of R.tiles.values())t.has(Number(r.layerId))&&e.add(r.id);return e}let a=new Set,s=vt();if(s.size){for(let r of R.tiles.values())if(t.has(Number(r.layerId))){for(let n of s)if(_i(r,n)){a.add(r.id);break}}}for(let r of R.tiles.values()){if(!t.has(Number(r.layerId)))continue;let n=b.mode==="layer"?Mt.get(Number(r.layerId)):null;Rf(r,Ne.matrix,n,ef)&&e.add(r.id)}for(let r of a)e.add(r);return e}function Tf(){return b.mode!=="layer"||z.phase==="idle"?b.compareLayers:Ai(z.previous,z.target)}function Ii(){return b.mode!=="layer"?b.visible3dLayers:z.phase==="reveal"?Ai(z.previous,z.target):b.compareLayers}function Mi(){let e=R.copperLayers.map(t=>Number(t.id)).filter(Number.isFinite);return e.length?e.length===1?new Set([e[0]]):new Set([e[0],e[e.length-1]]):new Set}function Ef(){let e=b.desiredCompareLayers.size?b.desiredCompareLayers:b.compareLayers;return e.size?new Set([...e].map(Number)):Mi()}function Ai(...e){let t=new Set;for(let a of e)for(let s of a||[])t.add(Number(s));return t}function kf(e){if(b.mode==="layer")return;let t=Zu;if(b.residentTileGpuBytes<=t)return;let a=[...R.residentTiles.values()].filter(s=>!e.has(s.tile.id)&&!R.loading.has(s.tile.id)).sort((s,r)=>s.lastUsed-r.lastUsed);for(let s of a){if(b.residentTileGpuBytes<=t)break;vf(s.tile.id)}}function Rf(e,t,a=null,s=0){let r=Si(e);if(!r)return!0;let n=Math.max(r[3]-r[0],r[4]-r[1])*s,i=[r[0]-n+(a?.[0]||0),r[1]-n+(a?.[1]||0),r[2]-.002,r[3]+n+(a?.[0]||0),r[4]+n+(a?.[1]||0),r[5]+.002],o=V?.occurrenceMatrices;return!o||o.length===1&&Ht(o[0])?ni(i,t):o.some(c=>ni(i,la(t,c)))}function Si(e){let t=e.boundsMm;if(!t||t.length!==4)return null;let a=R.layers.find(r=>Number(r.id)===Number(e.layerId)),s=Number(a?.z_mm||0)/1e3;return[t[0]/1e3,-t[3]/1e3,s-4e-4,t[2]/1e3,-t[1]/1e3,s+4e-4]}function ni(e,t){let a=[[e[0],e[1],e[2]],[e[3],e[1],e[2]],[e[0],e[4],e[2]],[e[3],e[4],e[2]],[e[0],e[1],e[5]],[e[3],e[1],e[5]],[e[0],e[4],e[5]],[e[3],e[4],e[5]]].map(r=>If(t,r));return![r=>r[0]<-r[3],r=>r[0]>r[3],r=>r[1]<-r[3],r=>r[1]>r[3],r=>r[2]<0,r=>r[2]>r[3]].some(r=>a.every(r))}function If(e,t){let a=t[0],s=t[1],r=t[2];return[e[0]*a+e[4]*s+e[8]*r+e[12],e[1]*a+e[5]*s+e[9]*r+e[13],e[2]*a+e[6]*s+e[10]*r+e[14],e[3]*a+e[7]*s+e[11]*r+e[15]]}function _i(e,t){return Array.isArray(e.netIds)&&e.netIds.some(a=>Number(a)===Number(t))}function ii(e){let t=Si(e);if(!t||!J)return 0;let a=(t[0]+t[3])*.5-J.focus[0],s=(t[1]+t[4])*.5-J.focus[1];return a*a+s*s}async function Mf(e=Se){let t=Ae.assets?.base_board_glb;if(!t)return null;let a=await _a(new URL(t,location.href).toString(),{defaultFeatureId:0});if(!ke(e)||!V)return null;b.loadedBytes+=a.byteLength;let s=a.primitives.filter(r=>oi(r)!=="pad");for(let r of Ni(s,oi))V.addPrimitive(r,{kind:"board",boardRole:r.groupKey,layerId:0,material:r.material,color:r.material.baseColor});return Af(s.map(r=>r.bounds))}function Af(e){let t=e.filter(a=>Array.isArray(a)&&a.length===6);return t.length?t.reduce((a,s)=>[Math.min(a[0],s[0]),Math.min(a[1],s[1]),Math.min(a[2],s[2]),Math.max(a[3],s[3]),Math.max(a[4],s[4]),Math.max(a[5],s[5])],[...t[0]]):null}function Ot(){return R.occurrenceBounds||R.runtimeBounds||er(R.manifest?.bbox)}function Sf(e){if(!V)return;V.setOccurrences(e),b.selectedOccurrence>=V.occurrenceMatrices.length&&(b.selectedOccurrence=0);let t=R.runtimeBounds||er(R.manifest?.bbox);R.occurrenceBounds=e==null?null:yn(V.occurrenceMatrices,t);let a=Ot();J&&a&&(J.sceneRadius=Lt(a),J.frame(a)),pe(performance.now(),{force:!0})}function oi(e){let t=`${e.nodeName||""} ${e.meshName||""} ${e.material?.name||""}`.toLowerCase();return t.includes("_pad")||t.includes(".pad")||t.endsWith("pad")?"pad":t.includes("silkscreen")?"silkscreen":t.includes("soldermask")?"soldermask":"substrate"}async function _f(e=Se){let t=Ae.assets?.components_glb;if(!t)return;let a=await _a(new URL(t,location.href).toString(),{componentFeatures:R.componentFeatures});if(!(!ke(e)||!V)){b.loadedBytes+=a.byteLength;for(let s of a.primitives){let r=R.componentFeatures.get(s.designator);r&&Nf(r.featureId,s.position)}for(let[s,r]of a.componentNodeCounts||[])R.componentModelCounts.set(s,r);for(let s of Ni(a.primitives))V.addPrimitive(s,{kind:"component",layerId:0,material:s.material,color:s.material.baseColor})}}function Ni(e,t=()=>""){let a=new Map;for(let s of e){let n=`${t(s)}:${JSON.stringify(s.material)}`;a.has(n)||a.set(n,[]),a.get(n).push(s)}return[...a.values()].map(s=>{let r=s.reduce((f,d)=>f+d.position.length/3,0),n=s.reduce((f,d)=>f+d.indices.length,0),i=new Float32Array(r*3),o=new Float32Array(r*3),c=new Uint32Array(r),l=new Uint32Array(r),p=new Uint32Array(n),g=0,w=0,y=[1/0,1/0,1/0,-1/0,-1/0,-1/0];for(let f of s){let d=f.position.length/3;i.set(f.position,g*3),o.set(f.normal,g*3),c.set(f.netId,g),l.set(f.objectFeatureId,g);for(let x=0;x<f.indices.length;x+=1)p[w+x]=Number(f.indices[x])+g;f.bounds&&(y[0]=Math.min(y[0],f.bounds[0]),y[1]=Math.min(y[1],f.bounds[1]),y[2]=Math.min(y[2],f.bounds[2]),y[3]=Math.max(y[3],f.bounds[3]),y[4]=Math.max(y[4],f.bounds[4]),y[5]=Math.max(y[5],f.bounds[5])),g+=d,w+=f.indices.length}return{position:i,normal:o,netId:c,objectFeatureId:l,indices:p,material:s[0].material,groupKey:t(s[0]),bounds:Number.isFinite(y[0])?y:null}})}function Zs(e){return!e||e.length!==6?null:[e[0]/1e3,-e[4]/1e3,e[2]/1e3,e[3]/1e3,-e[1]/1e3,e[5]/1e3]}function er(e){let t=e?.min||[0,0,0],a=e?.max||[.08,.0016,.05];return[t[0],-a[2],t[1],a[0],-t[2],a[1]]}function Nf(e,t){let a=R.features.get(Number(e));if(!a||!t.length)return;let s=[1/0,1/0,1/0,-1/0,-1/0,-1/0];for(let r=0;r<t.length;r+=3)s[0]=Math.min(s[0],t[r]),s[1]=Math.min(s[1],t[r+1]),s[2]=Math.min(s[2],t[r+2]),s[3]=Math.max(s[3],t[r]),s[4]=Math.max(s[4],t[r+1]),s[5]=Math.max(s[5],t[r+2]);a.bounds=a.bounds?[Math.min(a.bounds[0],s[0]),Math.min(a.bounds[1],s[1]),Math.min(a.bounds[2],s[2]),Math.max(a.bounds[3],s[3]),Math.max(a.bounds[4],s[4]),Math.max(a.bounds[5],s[5])]:s}function ji(e){if(typeof e?.color=="string"&&/^#[0-9a-fA-F]{6}$/.test(e.color))return[...ci(e.color),1];let t={"F.Cu":"#a9423c","B.Cu":"#315b9a","In1.Cu":"#477a55","In2.Cu":"#806244","In3.Cu":"#347c86","In4.Cu":"#685889","In5.Cu":"#92793e"},a=["#477a55","#806244","#347c86","#685889","#92793e","#82556e"],s=String(e?.name||""),r=Math.max(0,R.copperLayers.findIndex(n=>n.name===s)-1);return[...ci(t[s]||a[r%a.length]),1]}function ci(e){let t=e.replace("#","");return[0,2,4].map(a=>parseInt(t.slice(a,a+2),16)/255)}function jf(e,t=Se){if(t!==Se||!V||!J)return;let a=performance.now(),s=Math.max(0,e-$t);if(b.workspace==="schematic"&&S){$t=e;let c=S.visiblePages(),l=Y?Cf(c):[];S.setDomDetailPageIds(l.map(p=>p.id)),P.visiblePages=S.render(),Y?.syncWorldPages(l,S,{activeNetUid:P.activeNetUid}),Hi(),ui(s,performance.now()-a),hi(e),qs(t);return}let r=Math.min(.05,(e-$t)/1e3);$t=e,J.update(r),V.resize();let n=Fi();for(let c of V.entries)c.layerOffset=n[c.layerId]||0;Bf(e),Mt=Ci(e);let i=Pf(e);Ne={layerId:0,viewport:{x:0,y:0,width:X.width,height:X.height},matrix:J.matrix(X.width,X.height,b.mode==="layer")},pe(e);let o=b.mode==="3d"?b.visible3dLayers:Ii();V.render({panels:[Ne],activeNetId:b.activeNetId,selectedFeatureId:b.selectedFeatureId,time:e/1e3,layerOffsets:n,visibleLayers:o,showBoard:b.showBoard,showComponents:b.showComponents,componentOpacity:ie(1-b.separation/.1,0,1),boardOpacity:vt().size?.34:1-b.separation*.72,isolateNet:b.isolateNet,compareMode:b.mode==="layer",compareOffsets:Mt,layerAlphas:i,visibleTileIds:b.mode==="3d"?b.visibleTileIds:null}),oh(),dh(),ui(s,performance.now()-a),hi(e),qs(t)}function Ff(e){if(!S||!e)return{widthPx:0,heightPx:0,sourcePxPerMm:0,area:0};let t=S.pagePixelWidth(e),a=e.heightMm/Math.max(1e-6,S.scale),s=S.pageSourcePixelsPerMm(e);return{widthPx:t,heightPx:a,sourcePxPerMm:s,area:t*a}}function Cf(e){if(!Y||!S)return[];let t=e||[],a=Math.max(1,Ee.clientWidth*Ee.clientHeight);return t.map(n=>({page:n,...Ff(n)})).filter(n=>n.widthPx>=760&&n.heightPx>=520&&n.area>=a*.36&&n.sourcePxPerMm>=1.25).sort((n,i)=>i.area-n.area).slice(0,1).map(n=>n.page)}function Fi(){let e=Ot(),t=Math.hypot((e[3]-e[0])*1e3,(e[4]-e[1])*1e3),a=b.separation*b.separation*ie(t*.12,8,25)/1e3,s=`${b.separation}:${a}:${R.copperLayers.length}`;if(R.layerZOffsetSignature===s)return R.layerZOffsets;let r=R.layerZOffsets;r.fill(0);let n=(R.copperLayers.length-1)/2;return R.copperLayers.forEach((i,o)=>{r[Number(i.id)]=(n-o)*a}),R.layerZOffsetSignature=s,r}function Ci(e){if(b.mode!=="layer")return ge.key="3d",ge.current.clear(),new Map;let t=R.copperLayers.filter(x=>b.compareLayers.has(Number(x.id))),a=Math.max(1,t.length),s=X.width/Math.max(1,X.height),r=1;a===2?r=s>=1?2:1:a===3||a===4?r=2:a>4&&(r=Math.ceil(Math.sqrt(a*s)));let n=Math.ceil(a/r),i=Ot(),o=i[3]-i[0],c=i[4]-i[1],l=o*1.18,p=c*1.22,g=t.map((x,u)=>{let h=u%r,m=Math.floor(u/r);return{layer:x,layerId:Number(x.id),column:h,row:m,offset:[(h-(r-1)/2)*l,((n-1)/2-m)*p,0]}}),w=`${r}x${n}:${g.map(x=>x.layerId).join(",")}`;if(w!==ge.key){ge.key=w,ge.started=e,ge.from=new Map(ge.current);let x=r*o+(r-1)*(l-o),u=n*c+(n-1)*(p-c);J.targetFocus=[(i[0]+i[3])/2,(i[1]+i[4])/2,(i[2]+i[5])/2],J.targetOrthoScale=Math.max(u,x/s)*1.08}let y=ie((e-ge.started)/420,0,1),f=1-Math.pow(1-y,3),d=new Map;for(let x of g){let u=ge.from.get(x.layerId)||[0,0,0],h=x.offset.map((m,v)=>u[v]+(m-u[v])*f);d.set(x.layerId,h),ge.current.set(x.layerId,h)}if(z.phase==="reveal")for(let x of z.previous)d.has(Number(x))||d.set(Number(x),z.previousOffsets.get(Number(x))||[0,0,0]);for(let x of[...ge.current.keys()])g.some(u=>u.layerId===x)||ge.current.delete(x);return d}function aa(e){let t=new Set([...e].map(Number));if(!(di(t,b.desiredCompareLayers)&&z.phase!=="idle")){if(b.desiredCompareLayers=t,di(t,b.compareLayers)){z.phase="idle",z.previous.clear(),z.target.clear();return}z.phase="preload",z.previous=new Set(b.compareLayers),z.target=new Set(t),z.previousOffsets=new Map(ge.current),z.started=performance.now(),pe(z.started,{force:!0})}}function tr({snap:e=!0}={}){b.mode="layer";let t=Ef();b.desiredCompareLayers=new Set(t),!b.compareLayers.size&&t.size&&(b.compareLayers=new Set(t)),z.phase="idle",z.previous.clear(),z.target.clear(),ge.key="",J.setAxis("z",!1),V?.resize(),Mt=Ci(performance.now()),e&&J.snap(),pe(performance.now(),{force:!0})}function Bf(e){if(!(b.mode!=="layer"||z.phase==="idle")){if(z.phase==="preload"){if(!Of(z.target)){pe(e,{force:!0});return}z.phase="reveal",z.started=e,z.previousOffsets=new Map(ge.current),b.compareLayers=new Set(z.target),ge.key="";return}z.phase==="reveal"&&e-z.started>=bi&&(b.compareLayers=new Set(z.target),z.phase="idle",z.previous.clear(),z.target.clear(),z.previousOffsets.clear(),pe(e,{force:!0}))}}function Of(e){for(let t of R.tiles.values())if(e.has(Number(t.layerId))&&!R.residentTiles.has(t.id)&&!R.failed.has(t.id))return!1;return!0}function Pf(e){if(b.mode!=="layer"||z.phase!=="reveal")return null;let t=ie((e-z.started)/bi,0,1),a=t*t*(3-2*t),s=new Map;for(let r of z.previous)s.set(Number(r),z.target.has(Number(r))?1:1-a);for(let r of z.target)s.set(Number(r),z.previous.has(Number(r))?1:a);return s}function di(e,t){if(e.size!==t.size)return!1;for(let a of e)if(!t.has(a))return!1;return!0}function Bi(){if(b.workspace==="schematic"){Uf();return}if(b.workspace==="bom"){Df();return}if(b.workspace==="stackup")return;ns.textContent=Ja.stage==="semantic-ready"?"Semantic GLTF A0":"Prism staged 3D",is.textContent="Layers",os.textContent="Visibility and compare",ee('[data-panel="search"] .section-heading span').textContent="Nets, components and pins",ee('[data-panel="view"] .section-heading span').textContent="Camera and stackup";let e=`
    <div class="mode-toolbar">
      <button data-mode="layer">PCB</button>
      <button data-mode="3d">3D</button>
    </div>`;Ct&&(Ct.innerHTML=e),Ge.innerHTML=`
    ${Ct?"":e}
    <div class="layer-presets">
      <button data-preset="all">All</button><button data-preset="none">None</button>
      <button data-preset="outer">Outer</button><button data-preset="inner">Inner</button>
    </div>
    <div class="layer-list"></div>`,he.innerHTML=`
    <label class="control-field"><span>Search</span>
      <input id="entity-search" class="layer-select" type="search" placeholder="Net, component or pin">
      <div id="search-results" class="search-results"></div>
    </label>
    <div class="quick-actions">
      <button id="frame-selection">Frame</button>
      <button id="show-net-layers">Net layers</button>
      <button id="isolate-net" aria-keyshortcuts="I" title="Toggle isolated net view (I)">Isolate</button>
      <button id="clear-selection">Clear</button>
    </div>`,xe.innerHTML=`
    <div class="camera-toolbar mode-toolbar">
      <button data-tool="orbit">Orbit</button><button data-tool="pan">Pan</button>
    </div>
    <div class="toggle-list">
      <label class="toggle-row"><input id="show-board" type="checkbox"><span>Board substrate</span></label>
      <label class="toggle-row"><input id="show-components" type="checkbox"><span>Components</span></label>
    </div>
    <label class="control-field range-field"><span>Stackup separation</span>
      <input id="separation" type="range" min="0" max="1" step="0.002">
    </label>`,Oe(),qf()}function Df(){ns.textContent="BoM A0",is.textContent="Bill of Materials",os.textContent="Grouped procurement view",ee('[data-panel="search"] .section-heading span').textContent="Search inside the BoM table",ee('[data-panel="view"] .section-heading span').textContent="BoM actions";let e=ze?.payload?.counts||{};Ge.innerHTML=`
    <div class="selection-properties">
      <div class="selection-property"><small>Rows</small><strong>${e.rows||0}</strong></div>
      <div class="selection-property"><small>Components</small><strong>${e.components||0}</strong></div>
      <div class="selection-property"><small>DNP</small><strong>${e.dnpComponents||0}</strong></div>
    </div>
    <div class="selection-section">
      <span class="selection-section-title">Columns</span>
      <div class="selection-empty">Primary procurement and thermal columns are shown first. Additional symbol and footprint metadata is available in the row detail panel.</div>
    </div>`,he.innerHTML=`
    <div class="selection-empty">Use the BoM search box in the main view. Reference chips update the shared PCB and schematic selection without changing workspaces.</div>
    <div class="quick-actions">
      <button id="clear-selection">Clear</button>
    </div>`,xe.innerHTML=`
    <div class="selection-section">
      <span class="selection-section-title">Cross-probing</span>
      <div class="selection-table">
        <div class="selection-row"><span><strong>PCB/Schematic</strong></span><span>Select component</span><span>Highlights matching BoM row</span></div>
        <div class="selection-row"><span><strong>BoM reference</strong></span><span>Click chip</span><span>Holds component selection for PCB and schematic</span></div>
      </div>
    </div>`,he.querySelector("#clear-selection")?.addEventListener("click",wt)}function Uf(){ns.textContent=Y?"Schematic SVG DOM":P.manifest?.schema==="prism.schematic_vector_a0"?"Schematic Vector A0":"Schematic World A0",is.textContent="Pages",os.textContent=`${P.pages.length} hierarchy instances`,ee('[data-panel="search"] .section-heading span').textContent="Pages, nets and components",ee('[data-panel="view"] .section-heading span').textContent="World navigation",Ge.innerHTML=`
    <div class="layer-presets">
      <button data-page-action="world">Fit world</button>
      <button data-page-action="parent">Parent</button>
      <button data-page-action="previous">Previous</button>
      <button data-page-action="next">Next</button>
    </div>
    <div class="page-list">${P.pages.map(e=>`
      <button class="page-row ${e.id===b.selectedPageId?"active":""}" data-page="${e.id}">
        <span>${e.sheetNumber}</span>
        <strong>${L(e.name)}</strong>
        <small>L${e.depth}</small>
      </button>`).join("")}</div>`,he.innerHTML=`
    <label class="control-field"><span>Search</span>
      <input id="entity-search" class="layer-select" type="search" placeholder="Page, net or component">
      <div id="search-results" class="search-results"></div>
    </label>
    <div class="quick-actions">
      <button id="frame-selection">Frame</button>
      <button id="clear-selection">Clear</button>
    </div>`,xe.innerHTML=`
    <div class="toggle-list">
      <label class="toggle-row"><input id="show-hierarchy" type="checkbox" checked><span>Hierarchy links</span></label>
    </div>
    <div class="selection-section">
      <span class="selection-section-title">Navigation</span>
      <div class="selection-table">
        <div class="selection-row"><span><strong>Home</strong></span><span>World</span><span>Frame every page</span></div>
        <div class="selection-row"><span><strong>[ / ]</strong></span><span>Pages</span><span>Previous or next instance</span></div>
        <div class="selection-row"><span><strong>Alt+Up</strong></span><span>Parent</span><span>Move up hierarchy</span></div>
      </div>
    </div>`,Ge.querySelectorAll("[data-page]").forEach(e=>{e.addEventListener("click",()=>$e(e.dataset.page,!0))}),Ge.querySelectorAll("[data-page-action]").forEach(e=>{e.addEventListener("click",()=>Xa(e.dataset.pageAction))}),he.querySelector("#entity-search").addEventListener("input",e=>{Kf(e.target.value)}),he.querySelector("#frame-selection").addEventListener("click",Di),he.querySelector("#clear-selection").addEventListener("click",sa),xe.querySelector("#show-hierarchy").checked=S?.showHierarchy??!0,xe.querySelector("#show-hierarchy").addEventListener("change",e=>{S.showHierarchy=e.target.checked})}function $e(e,t){let a=P.byId.get(e);!a||!S||(b.selectedPageId=a.id,b.selectedSchematicFeature=null,S.selectedPageId=a.id,S.selectedFeatureId=0,Xe.textContent=JSON.stringify(a,null,2),t&&S.framePage(a),Ge.querySelectorAll("[data-page]").forEach(s=>{s.classList.toggle("active",s.dataset.page===a.id)}))}function Xa(e){if(!S)return;if(e==="world"){S.frameWorld();return}let t=Math.max(0,P.pages.findIndex(s=>s.id===b.selectedPageId)),a=null;e==="previous"?a=P.pages[(t-1+P.pages.length)%P.pages.length]:e==="next"?a=P.pages[(t+1)%P.pages.length]:e==="parent"&&(a=P.byId.get(P.pages[t]?.parentId)),a&&$e(a.id,!0)}function Lf(e){if(!e||!S)return;if(sa(),e.kind==="page"&&e.pageId){$e(e.pageId,!0);return}if(e.kind!=="sheet")return;let t=P.pages.find(n=>n.sheetInstancePath===e.sheetInstancePath)||P.byId.get(b.selectedPageId),a=String(e.sheetFile||e.feature?.sheet_file||"").replace(/\\/g,"/"),s=String(e.sheetName||e.feature?.sheet_name||e.feature?.objectId||""),r=P.pages.find(n=>{if(t&&n.parentId&&n.parentId!==t.id)return!1;let i=String(n.sourcePath||"").replace(/\\/g,"/");return a&&i.endsWith(a)||s&&n.name===s})||P.pages.find(n=>{let i=String(n.sourcePath||"").replace(/\\/g,"/");return a&&i.endsWith(a)||s&&n.name===s});r&&$e(r.id,!0)}function Kf(e){let t=he.querySelector("#search-results"),a=e.trim().toLowerCase();if(!a){t.innerHTML="";return}let s=P.pages.filter(n=>`${n.name} ${n.sheetPath}`.toLowerCase().includes(a)).slice(0,8),r=R.nets.filter(n=>String(n.name).toLowerCase().includes(a)).slice(0,8);t.innerHTML=[...s.map(n=>`<button data-page="${n.id}"><b>${L(n.name)}</b><span>Page ${n.sheetNumber}</span></button>`),...r.map(n=>`<button data-schematic-net="${n.id}"><b>${L(n.name)}</b><span>${(P.manifest.netToPages?.[n.uid]||[]).length} pages</span></button>`)].join(""),t.querySelectorAll("[data-page]").forEach(n=>{n.addEventListener("click",()=>$e(n.dataset.page,!0))}),t.querySelectorAll("[data-schematic-net]").forEach(n=>{n.addEventListener("click",()=>Oi(Number(n.dataset.schematicNet),!0))})}function Oi(e,t){let a=R.nets.find(r=>Number(r.id)===e);if(!a||!S)return;b.activeNetId=e,b.selectedFeatureId=0,b.selectedSchematicFeature=null,S.selectedFeatureId=0,S.selectedFeatureKey="",S.selectedSourceId="",P.activeNetUid=a.uid,S.activeNetUid=a.uid,Y?.setHighlightedNet(a.uid),Xe.textContent=JSON.stringify(a,null,2),Pe();let s=P.manifest.netToPages?.[a.uid]||[];t&&s.length&&$e(s[0],!0)}function Pi(e,t=null){let a=R.nets.find(s=>s.uid===e);a&&(b.activeNetId=Number(a.id),P.activeNetUid=a.uid,S&&(S.activeNetUid=a.uid,S.selectedFeatureId=Number(t?.feature?.id||t?.featureId||0),S.selectedFeatureKey=t?.feature?.stableKey||t?.featureKey||"",S.selectedSourceId=t?.feature?.sourceId||t?.sourceId||""),Y?.setHighlightedNet(a.uid),t&&(b.selectedSchematicFeature={...t,pageId:b.selectedPageId}),Xe.textContent=JSON.stringify(t?{...t,net:a}:a,null,2),Pe())}function sa(){b.activeNetId=0,b.selectedFeatureId=0,b.selectedSchematicFeature=null,P.activeNetUid="",S&&(S.activeNetUid="",S.selectedFeatureId=0,S.selectedFeatureKey="",S.selectedSourceId=""),Y?.setSelection(null),Y?.setHighlightedNet(""),Xe.textContent="No object selected",Pe()}function Di(){let e=P.byId.get(b.selectedPageId);e?S.framePage(e):S.frameWorld()}function Gf(e){b.selectedPageId=e.sheetInstancePath&&P.pages.find(s=>s.sheetInstancePath===e.sheetInstancePath)?.id||b.selectedPageId,b.selectedFeatureId=0,b.selectedSchematicFeature={...e,pageId:b.selectedPageId},e.anchor&&(b.selectionAnchor=e.anchor),S&&(S.selectedPageId=b.selectedPageId,S.selectedFeatureId=Number(e.feature?.id||0));let t=e.netUid?R.nets.find(s=>s.uid===e.netUid):null,a=e.reference?R.componentFeatures.get(e.reference):null;a&&(b.selectedFeatureId=Number(a.featureId||0),ze?.setSelectionByReference(e.reference,{scroll:b.workspace==="bom"})),Xe.textContent=JSON.stringify({...e,net:t,component:a},null,2),Pe()}function zf(e){let{page:t,feature:a}=e;if(!a){b.selectedSchematicFeature=null,S.selectedFeatureId=0,$e(t.id,!1),Pe();return}let s=Number(a.id||0);if(b.selectedPageId=t.id,S.selectedPageId=t.id,S.selectedFeatureId=s,b.selectedSchematicFeature={...a,pageId:t.id},b.selectionAnchor=null,a.netUid){let r=R.nets.find(n=>n.uid===a.netUid);if(r){Oi(Number(r.id),!1),b.selectedSchematicFeature={...a,pageId:t.id},S.selectedFeatureId=s;return}}if(a.reference){let r=R.componentFeatures.get(a.reference);if(r){Pt(Number(r.featureId),!1),b.selectedSchematicFeature={...a,pageId:t.id},S.selectedFeatureId=s;return}}b.activeNetId=0,b.selectedFeatureId=0,S.activeNetUid="",Xe.textContent=JSON.stringify({page:t.name,...a},null,2),Pe()}function ra(){let e=b.isolateNet,t=he?.querySelector?.("#isolate-net");t?.classList.toggle("active",e),t?.setAttribute("aria-pressed",String(e));let a=Q?.querySelector?.("[data-action=isolate]");a?.classList.toggle("active",e),a?.setAttribute("aria-pressed",String(e));let s=xe?.querySelector?.("#show-board");s&&(s.checked=b.showBoard);let r=xe?.querySelector?.("#show-components");r&&(r.checked=b.showComponents)}function Vf(){let e=new Set;for(let t of vt())for(let a of Hf(t))e.add(a);return e}function Hf(e){let t=new Set,a=R.nets.find(r=>Number(r.id)===Number(e)),s=new Set(R.copperLayers.map(r=>Number(r.id)));for(let r of Object.keys(a?.layerBoundsMm||{})){let n=Number(r);s.has(n)&&t.add(n)}if(!t.size){let r=new Map(R.copperLayers.map(n=>[n.name,Number(n.id)]));for(let n of a?.metrics?.layers||[]){let i=r.get(n);i!=null&&t.add(i)}}if(t.size)return t;for(let r of R.tiles.values())_i(r,e)&&t.add(Number(r.layerId));return t}function na(){let e=Vf();e.size&&(b.visible3dLayers=new Set(e),b.mode==="layer"?aa(e):(b.compareLayers=new Set(e),b.desiredCompareLayers=new Set(e)),pe(performance.now(),{force:!0}))}function ea(e){let t=!!(e&&vt().size),a=b.isolateNet;if(t&&!b.isolateNet&&(b.preIsolation3dLayers=new Set(b.visible3dLayers),b.preIsolationCompareLayers=new Set(b.desiredCompareLayers.size?b.desiredCompareLayers:b.compareLayers)),b.isolateNet=t,b.isolateNet)na();else if(b.preIsolation3dLayers||b.preIsolationCompareLayers){if(b.preIsolation3dLayers&&(b.visible3dLayers=new Set(b.preIsolation3dLayers)),b.preIsolationCompareLayers){let s=new Set(b.preIsolationCompareLayers);b.mode==="layer"?aa(s):(b.compareLayers=s,b.desiredCompareLayers=new Set(s))}b.preIsolation3dLayers=null,b.preIsolationCompareLayers=null,pe(performance.now(),{force:!0})}t&&!a?(b.preIsolationShowBoard=b.showBoard,b.showBoard=!1):!t&&a&&(typeof b.preIsolationShowBoard=="boolean"&&(b.showBoard=b.preIsolationShowBoard),b.preIsolationShowBoard=null),ra(),Oe()}function Oe(){(Ct||Ge).querySelectorAll("[data-mode]").forEach(a=>{let s=a.dataset.mode===b.mode;a.classList.toggle("active",s),a.setAttribute("aria-pressed",String(s))}),xe.querySelectorAll("[data-tool]").forEach(a=>{a.classList.toggle("active",a.dataset.tool===b.cameraTool)}),xe.querySelector("#show-board").checked=b.showBoard,xe.querySelector("#show-components").checked=b.showComponents,xe.querySelector("#separation").value=b.separation;let e=Ge.querySelector(".layer-list"),t=b.mode==="3d"?b.visible3dLayers:b.desiredCompareLayers;e.innerHTML=R.copperLayers.map((a,s)=>`
    <label class="layer-row">
      <input type="checkbox" data-layer="${a.id}" ${t.has(Number(a.id))?"checked":""}>
      <span class="swatch" style="background:${fh(ji(a))}"></span>
      <span>${L(a.name)}</span><small>${s+1}</small>
    </label>`).join(""),e.querySelectorAll("[data-layer]").forEach(a=>a.addEventListener("change",()=>{let s=Number(a.dataset.layer);if(b.mode==="3d")a.checked?b.visible3dLayers.add(s):b.visible3dLayers.delete(s),pe(performance.now(),{force:!0});else{let r=new Set(b.desiredCompareLayers);a.checked?r.add(s):r.delete(s),aa(r)}})),ra()}function qf(){(Ct||Ge).querySelectorAll("[data-mode]").forEach(t=>t.addEventListener("click",()=>{t.dataset.mode==="layer"?tr():(b.mode="3d",J.frame(Ot()),J.snap(),b.visibleTileIds=new Set,pe(performance.now(),{force:!0})),Oe()})),Ge.querySelectorAll("[data-preset]").forEach(t=>t.addEventListener("click",()=>{let a=b.mode==="3d"?b.visible3dLayers:new Set;a.clear();let s=t.dataset.preset;for(let[r,n]of R.copperLayers.entries())(s==="all"||s==="outer"&&(r===0||r===R.copperLayers.length-1)||s==="inner"&&r>0&&r<R.copperLayers.length-1)&&a.add(Number(n.id));b.mode==="3d"?pe(performance.now(),{force:!0}):aa(a),Oe()})),xe.querySelectorAll("[data-tool]").forEach(t=>t.addEventListener("click",()=>{b.cameraTool=t.dataset.tool,Oe()})),xe.querySelector("#show-board").addEventListener("change",t=>{b.showBoard=t.target.checked,b.savedShowBoard=b.showBoard,b.showBoard&&b.isolateNet&&ea(!1)}),xe.querySelector("#show-components").addEventListener("change",t=>{b.showComponents=t.target.checked,b.savedShowComponents=b.showComponents}),xe.querySelector("#separation").addEventListener("input",t=>{b.separation=Number(t.target.value)}),he.querySelector("#clear-selection").addEventListener("click",wt),he.querySelector("#isolate-net").addEventListener("click",()=>{ea(!b.isolateNet)}),he.querySelector("#frame-selection").addEventListener("click",rr),he.querySelector("#show-net-layers").addEventListener("click",Ui);let e=he.querySelector("#entity-search");e.addEventListener("input",()=>Li(e.value))}function Xf(){It(".rail-tab").forEach(e=>e.addEventListener("click",()=>{let t=e.dataset.tab,a=b.activeTab===t&&!yt.classList.contains("panel-collapsed");b.activeTab=t,yt.classList.toggle("panel-collapsed",a),It(".rail-tab").forEach(s=>{s.classList.toggle("active",!a&&s.dataset.tab===t)}),It(".tab-panel").forEach(s=>{s.classList.toggle("active",!a&&s.dataset.panel===t)})}))}function Ui(){let e=R.nets.find(s=>Number(s.id)===b.activeNetId);if(!e)return;let t=new Set(e.metrics?.layers||[]),a=b.mode==="3d"?b.visible3dLayers:new Set;a.clear();for(let s of R.copperLayers)t.has(s.name)&&a.add(Number(s.id));b.mode==="3d"?pe(performance.now(),{force:!0}):aa(a),Oe()}function Li(e){let t=he.querySelector("#search-results"),a=e.trim().toLowerCase();if(!a){t.innerHTML="";return}let s=R.nets.filter(n=>String(n.name).toLowerCase().includes(a)).slice(0,8),r=[...R.componentFeatures.values()].filter(n=>!b.hiddenComponents.has(String(n.designator||""))&&`${n.designator} ${n.value} ${n.footprint}`.toLowerCase().includes(a)).slice(0,6);t.innerHTML=[...s.map(n=>`<button data-net="${n.id}"><b>${L(n.name)}</b><span>${L(n.netClass||"")}</span></button>`),...r.map(n=>`<button data-feature="${n.featureId}"><b>${L(n.designator)}</b><span>${L(n.value)}</span></button>`)].join(""),t.querySelectorAll("[data-net]").forEach(n=>{n.addEventListener("click",()=>as(Number(n.dataset.net),!0))}),t.querySelectorAll("[data-feature]").forEach(n=>{n.addEventListener("click",()=>Pt(Number(n.dataset.feature),!0))})}function as(e,t){t&&(b.selectionAnchor=null),b.activeNetId=e,b.selectedFeatureId=0;let a=R.nets.find(s=>Number(s.id)===e);b.workspace==="schematic"&&a&&S&&(P.activeNetUid=a.uid,S.activeNetUid=a.uid),Qs(),Xe.textContent=JSON.stringify(a||{},null,2),Pe(),b.isolateNet&&na(),t&&a?.boundsMm&&J.frame($s(Zs(a.boundsMm))),pe(performance.now(),{force:!0}),cs(Ti(a))}function Pt(e,t=!1){let a=R.features.get(e);if(a?.kind==="component"&&ha(ta(a),b.hiddenComponents))return;t&&(b.selectionAnchor=null),b.selectedFeatureId=e,b.activeNetId=Number(a?.netId||0);let s=ta(a);s&&ze?.setSelectionByReference(s,{scroll:b.workspace==="bom"});let r=Ei(a);r?.kind==="net"?Qs():ki(),Xe.textContent=a?JSON.stringify(a,null,2):"No object selected",Pe(),b.isolateNet&&b.activeNetId&&na(),t&&a?.bounds&&sr(a),pe(performance.now(),{force:!0}),cs(r)}function ar(e,t=!1){if(ha(e,b.hiddenComponents))return;let a=R.componentFeatures.get(e);if(ze?.setSelectionByReference(e,{scroll:b.workspace==="bom"}),!a?.featureId)return;ki(),Pt(Number(a.featureId),!1);let s=Yf(e);if(s){let{page:r,feature:n}=s;b.selectedPageId=r.id,b.selectedSchematicFeature={...n,pageId:r.id},S&&(S.selectedPageId=r.id,S.selectedFeatureId=Number(n.id||0)),Y?.setSelection?.({kind:"component",featureKey:n.stableKey||"",sheetInstancePath:n.sheetInstancePath||r.sheetInstancePath||"",sourceId:n.sourceId||n.uuid||"",reference:e,feature:n,pageId:r.id}),t&&b.workspace==="schematic"&&($e(r.id,!0),Y?.frameSelection?.())}if(t&&b.workspace==="pcb"){let r=R.features.get(Number(a.featureId));r?.bounds&&sr(r,!0)}Pe()}function ta(e){return e?.designator||e?.reference||e?.componentDesignator||""}function Wf(){return ur(R.manifest?.components||[],R.componentModelCounts)}function Jf(e){let t=fr(e,Wf());b.hiddenComponents=t.hiddenReferences,V?.setHiddenFeatureIds(t.hiddenFeatureIds),t.ambiguous.length&&console.warn(`[prism-semantic-viewer] keeping ambiguous components visible: ${t.ambiguous.join(", ")}`),t.unknown.length&&console.warn(`[prism-semantic-viewer] ignoring unknown components: ${t.unknown.join(", ")}`);let a=ta(R.features.get(b.selectedFeatureId));ha(a,b.hiddenComponents)&&wt();let s=he.querySelector("input");return s?.value&&Li(s.value),t}function sr(e,t=!1){if(!e?.bounds)return;let a=$s(e.bounds);if(t||e.kind==="component"||!!ta(e)){let n=(a[2]+a[5])*.5<0,i=J.targetPolar>Math.PI/2;n!==i&&J.setAxis("z",n)}J.frame(a)}function Yf(e){if(!e||!S?.featuresByPage)return null;let t=P.byId.get(b.selectedPageId),a=[...t?[t]:[],...(P.pages||[]).filter(r=>r.id!==t?.id)],s=r=>{let n=String(r.kind||"").toLowerCase();return n==="component"||n==="symbol_body"||n==="symbol_instance"?0:n==="symbol_reference"?1:n.startsWith("pin")?2:3};for(let r of a){let n=(S.featuresByPage[r.id]||[]).filter(i=>String(i.reference||i.designator||i.componentDesignator||"")===e).sort((i,o)=>s(i)-s(o));if(n.length)return{page:r,feature:n[0]}}return null}function wt(){b.activeNetId=0,b.selectedFeatureId=0,b.selectedSchematicFeature=null,b.selectionAnchor=null;let e=vt().size>0,t=b.isolateNet;t&&!e?ea(!1):e?t&&na():b.isolateNet=!1,e||Ri(),P.activeNetUid="",S&&(S.activeNetUid=""),Y?.setSelection(null),Y?.setHighlightedNet(""),Xe.textContent="No object selected",ze?.clearSelection?.(),Pe(),cs(null)}function Wa(e){return`<div class="selection-properties">${e.map(([t,a])=>`
    <div class="selection-property">
      <small>${L(t)}</small>
      <strong title="${L(String(a))}">${L(String(a))}</strong>
    </div>`).join("")}</div>`}function ss(e,t,a){return`
    <div class="selection-card-head">
      <span class="selection-card-accent" style="background:${a}"></span>
      <div class="selection-card-drag-handle" title="Drag to move card">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <circle cx="2" cy="2" r="1"/>
          <circle cx="6" cy="2" r="1"/>
          <circle cx="10" cy="2" r="1"/>
          <circle cx="2" cy="6" r="1"/>
          <circle cx="6" cy="6" r="1"/>
          <circle cx="10" cy="6" r="1"/>
          <circle cx="2" cy="10" r="1"/>
          <circle cx="6" cy="10" r="1"/>
          <circle cx="10" cy="10" r="1"/>
        </svg>
      </div>
      <div class="selection-card-title"><small>${L(e)}</small><strong>${L(t)}</strong></div>
      <button class="selection-card-close" type="button" aria-label="Clear selection">&times;</button>
    </div>`}function $f(e){let a=(Re.net_details?.[e.uid]||{}).terminals||[],s=e.metrics||{},r=Number(s.traceLengthMm||0).toFixed(2),n=s.objectCounts?.via||0,i=a.length,c=/^(VCC|VDD|GND|3V3|5V|12V|VIN|POWER)/i.test(e.name)?"#10b981":"#8b5cf6",l=e.netClass||"Default",p=a.length?a.map(g=>`
      <div class="selection-row pin-row-interactive" data-ref="${L(g.designator)}" data-pin="${L(g.pin)}">
        <span class="refdes-col"><strong>${L(g.designator)}</strong></span>
        <span class="pin-col">Pin ${L(g.pin)}</span>
        <span class="val-col" title="${L(g.value||"")}">${L(g.value||"-")}</span>
      </div>`).join(""):'<div class="selection-empty">No connected pin metadata is available.</div>';return`
    ${ss("Net",e.name,c)}
    <div class="selection-net-dashboard">
      <div class="net-metric-grid">
        <div class="metric-card">
          <small>Length</small>
          <strong>${r} <span class="unit">mm</span></strong>
        </div>
        <div class="metric-card">
          <small>Vias</small>
          <strong>${n}</strong>
        </div>
        <div class="metric-card">
          <small>Pins</small>
          <strong>${i}</strong>
        </div>
        <div class="metric-card">
          <small>Class</small>
          <strong title="${L(l)}">${L(l)}</strong>
        </div>
      </div>
      
      <div class="selection-section">
        <span class="selection-section-title">Layers</span>
        <div class="net-layers-badges">
          ${(s.layers||[]).length?s.layers.map(g=>`<span class="layer-badge">${L(g)}</span>`).join(""):'<span class="layer-badge unknown">None</span>'}
        </div>
      </div>

      <div class="selection-section">
        <span class="selection-section-title">Connected Pins</span>
        <div class="selection-table compact-scroll" style="max-height: 120px;">
          ${p}
        </div>
      </div>
    </div>`}function Qf(e,t=null){let a=vi(e.designator),s=a?a.value:e.value||"Not specified",r=a?a.footprint:e.footprint||"Not specified",n=a?.parameters||{},i=n.Manufacturer||n.Mfr||"",o=n["Manufacturer Part Number"]||n.MPN||n["Part Number"]||"",c=n.kicad_dnp==="true"||n.DNP==="true"||n.kicad_in_bom==="false",l="";(i||o)&&(l=`
      <div class="selection-section">
        <span class="selection-section-title">Component details</span>
        <div class="selection-table">
          <div class="selection-row">
            <span><strong>Manufacturer</strong></span>
            <span title="${L(i)}">${L(i||"-")}</span>
          </div>
          <div class="selection-row">
            <span><strong>Part Number</strong></span>
            <span title="${L(o)}">${L(o||"-")}</span>
          </div>
        </div>
      </div>`);let p="";return t&&(p=`
      <div class="selection-section">
        <span class="selection-section-title">Selected Pin</span>
        <div class="selection-table">
          <div class="selection-row">
            <span><strong>Pin</strong></span>
            <span>Pin ${L(t.pinNumber||t.pin||"")}</span>
            <span title="${L(t.pinName||"")}">${L(t.pinName||"No name")}</span>
          </div>
          <div class="selection-row">
            <span><strong>Net</strong></span>
            <span class="net-ref-interactive" data-net-name="${L(t.netName||"")}">${L(t.netName||"Not connected")}</span>
          </div>
        </div>
      </div>`),`
    ${ss("Component",e.designator||"Unknown","#3b82f6")}
    <div class="selection-component-dashboard">
      ${c?'<div class="dnp-banner" style="background:#b45309;color:#fff;font-size:9px;font-weight:750;text-align:center;padding:3px;margin-bottom:8px;border-radius:2px;text-transform:uppercase;letter-spacing:0.05em;">DNP (Do Not Populate)</div>':""}
      ${Wa([["Value",s],["Footprint",r.split(":").pop()||r]])}
      ${l}
      ${p}
    </div>`}function Zf(e,t){let a=String(e.kind||"").toLowerCase(),s=a.startsWith("pin");if(a==="component"||a.includes("symbol"))return`
      ${ss("Component",e.reference||e.componentDesignator||"Unknown","#3b82f6")}
      ${Wa([["Value",e.value||e.componentValue||"Not specified"],["Footprint",e.componentFootprint||e.footprint||"Not specified"],["Library",e.libraryRef||"Not specified"],["UID",e.componentUid||e.uuid||e.sourceId||"Not resolved"]])}
      <div class="selection-section">
        <span class="selection-section-title">Schematic placement</span>
        ${Wa([["Page",t?.name||"Unknown"],["Sheet",e.sheetInstancePath||"/"]])}
      </div>`;let n=s?[["Symbol",e.reference||e.designator||"Unknown"],["Value",e.value||e.componentValue||"Not specified"],["Pin",`${e.pinNumber||"-"}${e.pinName?` ${e.pinName}`:""}`],["Net",e.netName||"Not connected"],["PCB Pad",e.pcbPadId||"Not resolved"],["Component UID",e.componentUid||"Not resolved"]]:[["Page",t?.name||"Unknown"],["Kind",e.kind.replaceAll("_"," ")],["Net",e.netName||"Not connected"]];return`
    ${ss(e.kind.replaceAll("_"," "),e.pinName||e.reference||e.designator||e.text||e.netName||"Schematic object","#3b82f6")}
    ${Wa(n)}
    <div class="selection-section">
      <span class="selection-section-title">Source identity</span>
      <div class="selection-table">
        <div class="selection-row">
          <span><strong>${s?"Pin UUID":"UUID"}</strong></span>
          <span title="${L(e.uuid||e.sourceId||"")}">${L(e.uuid||e.sourceId||"-")}</span>
          <span title="${L(e.objectId||"")}">${L(e.objectId||"No object ID")}</span>
        </div>
        <div class="selection-row">
          <span><strong>Sheet</strong></span>
          <span>${L(t?.name||"Unknown")}</span>
          <span title="${L(e.sheetInstancePath||"")}">${L(e.sheetInstancePath||"/")}</span>
        </div>
      </div>
    </div>`}function Pe(){if(b.workspace==="bom"){Q.hidden=!0,Q.innerHTML="";return}let e=R.features.get(b.selectedFeatureId),t=e?.kind==="component"?e:null,a=b.workspace==="schematic"?b.selectedSchematicFeature:null,s=a?P.byId.get(a.pageId):null,r=b.activeNetId?R.nets.find(g=>Number(g.id)===b.activeNetId):null;if(!r&&a&&(a.netUid?r=R.nets.find(g=>g.uid===a.netUid):a.netName&&(r=Kt(R.nets,a.netName))),!t&&a){let g=a.reference||a.componentDesignator||a.designator;g&&(t=R.componentFeatures.get(g)||{designator:g})}if(!t&&!r&&!a){Q.hidden=!0,Q.innerHTML="";return}let n="";if(r)n=$f(r);else if(t){let g=a?.kind?.startsWith("pin")?a:null;n=Qf(t,g)}else a&&(n=Zf(a,s));Q.innerHTML=`
    ${n}
    <div class="selection-card-actions">
      ${r?`
        <button type="button" data-action="isolate" aria-keyshortcuts="I" title="Toggle isolated net view (I)" class="${b.isolateNet?"active":""}">Isolate</button>
        <button type="button" data-action="net-layers">Layers</button>
      `:""}
      <button type="button" data-action="frame">Frame selection</button>
    </div>`,Q.hidden=!1;let i=b.workspace==="schematic"?Ee:X,o=b.selectionAnchor,c=Q.offsetWidth||360,l=Q.offsetHeight||330;if(o){let g=Math.max(16,i.clientWidth-c-24),w=Math.max(16,i.clientHeight-l-24);Q.style.left=`${ie(o.x+18,16,g)}px`,Q.style.top=`${ie(o.y+18,16,w)}px`}else Q.style.left="20px",Q.style.top="20px";if(Q.querySelector(".selection-card-close").addEventListener("click",wt),Q.querySelector("[data-action=frame]").addEventListener("click",rr),r){let g=Q.querySelector("[data-action=isolate]");g&&g.addEventListener("click",()=>{ea(!b.isolateNet)});let w=Q.querySelector("[data-action=net-layers]");w&&w.addEventListener("click",Ui),Q.querySelectorAll(".pin-row-interactive").forEach(y=>{y.addEventListener("click",()=>{let f=y.dataset.ref,d=y.dataset.pin;if(!f)return;let h=((Re.net_details?.[r.uid]||{}).terminals||[]).find(v=>v.designator===f&&v.pin===d),m=h?df(h.pcb_pad_id):0;m?Pt(m,!0):ar(f,!0)})})}let p=Q.querySelector(".net-ref-interactive");p&&p.addEventListener("click",()=>{let g=p.dataset.netName;if(!g)return;let w=Kt(R.nets,g);w&&as(Number(w.id),!0)})}function rr(){if(b.workspace==="schematic"){Di();return}let e=R.features.get(b.selectedFeatureId);if(e?.bounds)sr(e);else{let t=R.nets.find(a=>Number(a.id)===b.activeNetId);t?.boundsMm&&J.frame($s(Zs(t.boundsMm)))}}function eh(){X.addEventListener("contextmenu",e=>e.preventDefault()),X.addEventListener("pointerdown",e=>{b.dragging=!0,b.lastX=e.clientX,b.lastY=e.clientY,b.pointerStartX=e.clientX,b.pointerStartY=e.clientY,b.dragMode=b.mode==="layer"||b.cameraTool==="pan"||e.shiftKey||e.button!==0?"pan":"orbit",X.setPointerCapture(e.pointerId)}),X.addEventListener("pointermove",e=>{if(!b.dragging)return;let t=e.clientX-b.lastX,a=e.clientY-b.lastY;b.lastX=e.clientX,b.lastY=e.clientY,b.dragMode==="pan"?J.pan(t,a,X.clientHeight,b.mode==="layer"):J.orbit(t,a)}),X.addEventListener("pointerup",async e=>{b.dragging=!1,X.releasePointerCapture(e.pointerId),Math.hypot(e.clientX-b.pointerStartX,e.clientY-b.pointerStartY)<3&&await li(e)}),X.addEventListener("dblclick",async e=>{await li(e),rr()}),X.addEventListener("wheel",e=>{e.preventDefault(),Math.abs(e.deltaX)>Math.abs(e.deltaY)*.4?J.pan(-e.deltaX,0,X.clientHeight,b.mode==="layer"):J.dolly(e.deltaY,b.mode==="layer")},{passive:!1}),window.addEventListener("keydown",Vi),th()}function th(){let e=!1,t,a,s=0,r=0;Q.addEventListener("pointerdown",n=>{if(!n.target.closest(".selection-card-head")||n.target.closest(".selection-card-close"))return;e=!0,Q.classList.add("dragging");let o=Q.getBoundingClientRect();s=o.left,r=o.top,t=n.clientX,a=n.clientY,Q.setPointerCapture(n.pointerId),n.stopPropagation()}),Q.addEventListener("pointermove",n=>{if(!e)return;let i=n.clientX-t,o=n.clientY-a,c=b.workspace==="schematic"?Ee:X,l=Q.offsetWidth||360,p=Q.offsetHeight||330,g=Math.max(16,c.clientWidth-l-24),w=Math.max(16,c.clientHeight-p-24),y=ie(s+i,16,g),f=ie(r+o,16,w);Q.style.left=`${y}px`,Q.style.top=`${f}px`,b.selectionAnchor={x:y-18,y:f-18},n.stopPropagation()}),Q.addEventListener("pointerup",n=>{e&&(e=!1,Q.classList.remove("dragging"),Q.releasePointerCapture(n.pointerId),n.stopPropagation())})}function ah(){It("[data-workspace]").forEach(e=>{e.addEventListener("click",()=>Ki(e.dataset.workspace))})}function Ki(e){if(e==="schematic"&&!S||e==="bom"&&!ze)return;b.workspace=e,yt.classList.remove("workspace-pcb","workspace-schematic","workspace-bom","workspace-stackup"),yt.classList.add(`workspace-${e}`),(e==="schematic"&&(b.activeTab==="view"||b.activeTab==="inspect"||b.activeTab==="stats")||e==="bom"||e==="stackup")&&rs("layers");let t=ee('.rail-tab[data-tab="layers"]');t&&(e==="schematic"?(t.textContent="Pages",t.title="Schematic pages"):e==="bom"?(t.textContent="Summary",t.title="BoM summary"):(t.textContent="Layers",t.title="Layers and compare"));let a=e==="schematic",s=e==="bom",r=e==="stackup";if(X.hidden=a||s||r,Ee&&(Ee.hidden=!a),Ya&&(Ya.hidden=!a||!Y),$a&&($a.hidden=!a),Qa&&(Qa.hidden=!s),Me&&(Me.hidden=!r),Te.hidden=a||s||r,Za.hidden=a||s||r,Zt&&(Zt.hidden=!a),It("[data-workspace]").forEach(n=>{n.classList.toggle("active",n.dataset.workspace===e)}),Qt.textContent=s?"Semantic BoM active":a?Y?"SVG DOM + WebGPU schematic world active":"WebGPU schematic world active":r?"Layer Stackup active":"WebGPU semantic glTF active",a&&!P.fitted&&(S.resize(),S.frameWorld(),P.fitted=!0),!a&&!s&&!r&&(V?.resize(),b.mode==="layer"?tr():pe(performance.now(),{force:!0})),r)try{hh()}catch(n){console.error("Failed to render stackup workspace",n),Me&&(Me.innerHTML=`
          <div class="selection-empty" style="padding:40px;text-align:center;">
            Stackup view failed to render. ${L(n?.message||String(n))}
          </div>
        `)}Bi(),Pe()}function sh(){Ee.addEventListener("pointerdown",e=>{Y?.worldActive||Y?.active||(b.schematicDragging=!0,b.schematicLastX=e.clientX,b.schematicLastY=e.clientY,b.schematicStartX=e.clientX,b.schematicStartY=e.clientY,Ee.setPointerCapture(e.pointerId))}),Ee.addEventListener("pointermove",e=>{if(Y?.worldActive||Y?.active||!b.schematicDragging||!S)return;let t=e.clientX-b.schematicLastX,a=e.clientY-b.schematicLastY;b.schematicLastX=e.clientX,b.schematicLastY=e.clientY,S.pan(t,a)}),Ee.addEventListener("pointerup",async e=>{if(!(Y?.worldActive||Y?.active)&&(b.schematicDragging=!1,Ee.releasePointerCapture(e.pointerId),Math.hypot(e.clientX-b.schematicStartX,e.clientY-b.schematicStartY)<3)){let t=await S.pickFeature(e.clientX,e.clientY);t?zf(t):sa()}}),Ee.addEventListener("dblclick",e=>{if(Y?.worldActive||Y?.active)return;let t=S.hitPage(e.clientX,e.clientY);t&&$e(t.id,!0)}),Ee.addEventListener("wheel",e=>{Y?.worldActive||Y?.active||(e.preventDefault(),S.zoom(e.deltaY,e.clientX,e.clientY))},{passive:!1})}async function li(e){if(!Ne)return;let t=X.getBoundingClientRect(),a=(e.clientX-t.left)*X.width/t.width,s=(e.clientY-t.top)*X.height/t.height;b.selectionAnchor={x:e.clientX-t.left,y:e.clientY-t.top};let r=await Gi(a,s);(r.kind==="feature"||r.kind==="board")&&(b.selectedOccurrence=r.occurrenceIndex),r.featureId?Pt(r.featureId,!0):r.kind==="board"&&!V.identityOnly?nh():wt()}function Gi(e,t){return V.pick(Ne,e,t,{activeNetId:b.activeNetId,selectedFeatureId:b.selectedFeatureId,layerOffsets:Fi(),visibleLayers:b.mode==="3d"?b.visible3dLayers:b.compareLayers,showBoard:b.showBoard,showComponents:b.showComponents,componentOpacity:ie(1-b.separation/.1,0,1),boardOpacity:1-b.separation*.72,isolateNet:b.isolateNet,compareMode:b.mode==="layer",compareOffsets:Mt,visibleTileIds:b.mode==="3d"?b.visibleTileIds:null})}async function rh(e,t){if(!Ne||!V)return null;let a=X.getBoundingClientRect(),s=await Gi((e-a.left)*X.width/a.width,(t-a.top)*X.height/a.height),r=s.featureId?Ei(R.features.get(s.featureId)):null;return{...s,selection:r}}function nh(){let e=b.selectedOccurrence,t=Bt;Bt=!0;try{wt()}finally{Bt=t}b.selectedOccurrence=e,cs({kind:"board",sourceContext:"3D"})}function ih(e,t){let a=R.componentFeatures.get(String(e)),s=a?R.features.get(Number(a.featureId))?.bounds:null;if(!s)return null;let r=s[2]+s[5]>=0;return zi([(s[0]+s[3])/2,(s[1]+s[4])/2,r?s[5]:s[2]],t)}function zi(e,t){if(!Ne||!V)return null;let a=t==null?0:V.occurrenceKeys.indexOf(String(t)),s=V.occurrenceMatrices[a];if(!s)return null;let r=Tn(Ne.matrix,Os(s,e),Ne.viewport);if(!r)return null;let n=X.getBoundingClientRect();return{x:n.left+r.x*n.width/X.width,y:n.top+r.y*n.height/X.height}}function Vi(e){if(!Js())return;if(e.target instanceof HTMLInputElement){e.key==="Escape"&&e.target.blur();return}let t=e.key.toLowerCase();if(b.workspace==="schematic"){if(t==="/")e.preventDefault(),rs("search"),he.querySelector("#entity-search")?.focus();else if(t==="escape")P.activeNetUid?(P.activeNetUid="",b.activeNetId=0,S.activeNetUid="",Y?.setHighlightedNet(""),Pe()):sa();else if(t==="~"||e.key==="~"){e.preventDefault();let a=b.selectedSchematicFeature?.netUid;a&&(P.activeNetUid===a?(P.activeNetUid="",b.activeNetId=0,S.activeNetUid="",Y?.setHighlightedNet("")):Pi(a,b.selectedSchematicFeature))}else if(t==="home")S?.frameWorld();else if(t==="[")Xa("previous");else if(t==="]")Xa("next");else if(t==="n"){e.preventDefault();let a=S?.cycleNetIntrasheetLink(e.shiftKey?-1:1);a?.pageId&&(b.selectedPageId=a.pageId,S.selectedPageId=a.pageId,Hi())}else if(e.altKey&&t==="arrowup")Xa("parent");else if(e.key.startsWith("Arrow")){e.preventDefault();let a=e.key==="ArrowRight"?32:e.key==="ArrowLeft"?-32:0,s=e.key==="ArrowDown"?32:e.key==="ArrowUp"?-32:0;S?.pan(a,s)}return}if(t==="/")e.preventDefault(),rs("search"),he.querySelector("#entity-search").focus();else if(t==="escape")wt();else if(t==="i"&&b.workspace==="pcb"&&vt().size)e.preventDefault(),ea(!b.isolateNet);else if(t==="home")J.frame(Ot());else if(["x","y","z"].includes(t))J.setAxis(t,e.shiftKey);else if(t==="f")J.flip();else if(t==="r")J.rotateZ(e.shiftKey?-1:1);else if(t===" "){e.preventDefault();let a=R.features.get(b.selectedFeatureId);a?.bounds&&J.setFocus([(a.bounds[0]+a.bounds[3])/2,(a.bounds[1]+a.bounds[4])/2,(a.bounds[2]+a.bounds[5])/2])}else if(e.key.startsWith("Arrow")){e.preventDefault();let a=e.key==="ArrowRight"?32:e.key==="ArrowLeft"?-32:0,s=e.key==="ArrowDown"?32:e.key==="ArrowUp"?-32:0;J.pan(a,s,X.clientHeight,b.mode==="layer")}}function rs(e){b.activeTab=e,yt.classList.remove("panel-collapsed"),It(".rail-tab").forEach(t=>{t.classList.toggle("active",t.dataset.tab===e)}),It(".tab-panel").forEach(t=>{t.classList.toggle("active",t.dataset.panel===e)})}function oh(){let e=Te.getContext("2d");e.clearRect(0,0,Te.width,Te.height);let t=[Te.width/2,Te.height/2],a=J.basis(),s=[{axis:"x",label:"X",color:"#e23838",vector:[1,0,0]},{axis:"y",label:"Y",color:"#2dbd50",vector:[0,1,0]},{axis:"z",label:"Z",color:"#3157d5",vector:[0,0,1]}],r=[];for(let n of s)for(let i of[-1,1]){let o=n.vector.map(l=>l*i),c=[Hs(o,a.right),-Hs(o,a.up),Hs(o,a.back)];r.push({...n,sign:i,depth:c[2],point:[t[0]+c[0]*34,t[1]+c[1]*34]})}for(let n of s){let i=r.find(o=>o.axis===n.axis&&o.sign===1);e.strokeStyle=n.color,e.lineWidth=2.4,e.beginPath(),e.moveTo(...t),e.lineTo(...i.point),e.stroke()}es=[];for(let n of r.sort((i,o)=>o.depth-i.depth)){let i=n.sign===1,o=i?13:9;e.beginPath(),e.arc(n.point[0],n.point[1],o,0,Math.PI*2),e.fillStyle=i?n.color:`${n.color}66`,e.fill(),e.lineWidth=2,e.strokeStyle=uh(n.color,i?.45:.58),e.stroke(),i&&(e.fillStyle="#07101c",e.font="700 13px system-ui",e.textAlign="center",e.textBaseline="middle",e.fillText(n.label,n.point[0],n.point[1]+.5)),es.push({...n,radius:o+5})}}function ch(){!Te||Te.dataset.bound==="true"||(Te.dataset.bound="true",Te.addEventListener("click",e=>{let t=Te.width/Te.clientWidth,a=Te.height/Te.clientHeight,s=[e.offsetX*t,e.offsetY*a],r=es.map(n=>({item:n,distance:Math.hypot(s[0]-n.point[0],s[1]-n.point[1])})).filter(({item:n,distance:i})=>i<=n.radius).sort((n,i)=>n.distance-i.distance)[0]?.item;r&&J.setAxis(r.axis,r.sign<0)}))}function dh(){if(b.mode!=="layer"||!Ne){Za.innerHTML="";return}let e=Ot(),t=Ii();Za.innerHTML=R.copperLayers.filter(a=>t.has(Number(a.id))).map(a=>{let s=Mt.get(Number(a.id))||[0,0,0],r=lh([e[0]+s[0],e[4]+s[1],0],Ne.matrix,X.clientWidth,X.clientHeight);return!r||r[0]<-100||r[0]>X.clientWidth+100||r[1]<-100||r[1]>X.clientHeight+100?"":`<span style="left:${r[0]}px;top:${r[1]}px">${L(a.name)}</span>`}).join("")}function Hi(){if(b.workspace!=="schematic"||!S){Zt.innerHTML="";return}Zt.innerHTML=P.visiblePages.filter(e=>S.pagePixelWidth(e)>120).map(e=>{let[t,a]=S.worldToScreen(e.worldX+8*S.scale,e.worldY-6*S.scale),s=e.id===b.selectedPageId,n=P.activeNetUid&&e.netUids.includes(P.activeNetUid)?"#18ef52":s?"#3b82f6":"#4b8de8";return`<div class="schematic-page-label" style="left:${t}px;top:${a}px;border-left-color:${n}">
        <strong>${L(e.name)}</strong>
        <small>Page ${e.sheetNumber} &middot; ${e.featureCount.toLocaleString()} features</small>
      </div>`}).join("")}function lh(e,t,a,s){let r=e[0],n=e[1],i=e[2],o=t[0]*r+t[4]*n+t[8]*i+t[12],c=t[1]*r+t[5]*n+t[9]*i+t[13],l=t[3]*r+t[7]*n+t[11]*i+t[15];return Math.abs(l)<1e-8?null:[(o/l*.5+.5)*a,(.5-c/l*.5)*s]}function Hs(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function uh(e,t){let a=e.replace("#","");return`#${[0,2,4].map(s=>Math.round(parseInt(a.slice(s,s+2),16)*t).toString(16).padStart(2,"0")).join("")}`}function ui(e,t){b.frameSamples.push({intervalMs:e,cpuMs:t}),b.frameSamples.length>180&&b.frameSamples.shift()}function fi(e,t){if(!e.length)return 0;let a=[...e].sort((s,r)=>s-r);return a[Math.min(a.length-1,Math.floor((a.length-1)*t))]}function hi(e){if(!Va||(b.frames+=1,e-b.fpsAt<=500))return;b.fps=b.frames*1e3/(e-b.fpsAt);let t=b.frameSamples;if(b.frameIntervalMs=t.length?t.reduce((n,i)=>n+i.intervalMs,0)/t.length:0,b.frameCpuMs=t.length?t.reduce((n,i)=>n+i.cpuMs,0)/t.length:0,b.frameIntervalP95Ms=fi(t.map(n=>n.intervalMs),.95),b.frameCpuP95Ms=fi(t.map(n=>n.cpuMs),.95),b.frames=0,b.fpsAt=e,b.workspace==="bom"){let n=ze?.payload?.counts||{},i=[["Renderer","BoM DOM table"],["Schema",ze?.payload?.schema||"-"],["Grouped rows",n.rows||0],["Components",n.components||0],["DNP components",n.dnpComponents||0],["Extra columns",ze?.payload?.extraColumns?.length||0],["Frame interval",`${b.frameIntervalMs.toFixed(2)} ms avg / ${b.frameIntervalP95Ms.toFixed(2)} p95`],["CPU frame",`${b.frameCpuMs.toFixed(2)} ms avg / ${b.frameCpuP95Ms.toFixed(2)} p95`],["FPS",b.fps.toFixed(1)]];Va.innerHTML=i.map(([o,c])=>`<dt>${o}</dt><dd>${c}</dd>`).join("");return}let a=b.workspace==="schematic"&&S?S.stats():null,s=b.workspace==="schematic"&&Y?Y.stats():null,r=b.workspace==="schematic"&&S?Y?.active?[["Renderer","SVG DOM schematic detail"],["Pages",P.pages.length],["Mounted pages",s.mountedPages],["Active page",s.activePage],["DOM nodes",s.domNodes.toLocaleString()],["Indexed features",s.indexedFeatures.toLocaleString()],["Indexed nets",s.indexedNets.toLocaleString()],["SVG cache",`${s.cachedSvgPages} pages / ${(s.cachedSvgBytes/1048576).toFixed(1)} MB`],["Selection",`${s.selectionMs.toFixed(1)} ms`],["Active net",R.nets.find(n=>n.uid===P.activeNetUid)?.name||"-"],["Tracking links",`${a.netFlowSegments} total / ${a.netFlowIntrasheetSegments} local`],["Tracking verts",a.netFlowVertices.toLocaleString()],["Mount",`${s.mountMs.toFixed(1)} ms`],["Highlight",`${s.highlightMs.toFixed(1)} ms`],["Fallback",s.fallbackReason||"-"],["Frame interval",`${b.frameIntervalMs.toFixed(2)} ms avg / ${b.frameIntervalP95Ms.toFixed(2)} p95`],["CPU frame",`${b.frameCpuMs.toFixed(2)} ms avg / ${b.frameCpuP95Ms.toFixed(2)} p95`],["FPS",b.fps.toFixed(1)]]:[["Renderer",Y?"SVG DOM + WebGPU world":"WebGPU schematic world"],["Pages",P.pages.length],["Visible pages",P.visiblePages.length],["DOM pages",s?s.mountedPages:0],["DOM nodes",s?s.domNodes.toLocaleString():"0"],["Indexed SVG features",s?s.indexedFeatures.toLocaleString():"0"],["SVG cache",s?`${s.cachedSvgPages} pages / ${(s.cachedSvgBytes/1048576).toFixed(1)} MB`:"0 pages"],["JS heap",s?.heapMb?`${s.heapMb.toFixed(1)} MB`:"-"],["Hierarchy links",P.manifest.edges?.length||0],["Selected page",P.byId.get(b.selectedPageId)?.name||"-"],["Active net",R.nets.find(n=>n.uid===P.activeNetUid)?.name||"-"],["Tracking links",`${a.netFlowSegments} total / ${a.netFlowIntrasheetSegments} local`],["Downloaded",`${(S.downloadedBytes/1048576).toFixed(1)} MB`],["Resident vectors",`${(a.residentVectorBytes/1048576).toFixed(1)} MB`],["Vector pages",`${a.vectorChunks} loaded / ${a.vectorLoads} loading`],["Vector draw",`${a.vectorVertices.toLocaleString()} verts / ${a.vectorDrawChunks} chunks`],["Native detail",`${a.nativeDetailPages} pages @ ${a.nativePxPerMm} / ${a.nativeThresholdPxPerMm} px/mm`],["Vector failures",a.failedVectorChunks],["Truncated",a.truncatedVectors],["Frame interval",`${b.frameIntervalMs.toFixed(2)} ms avg / ${b.frameIntervalP95Ms.toFixed(2)} p95`],["CPU frame",`${b.frameCpuMs.toFixed(2)} ms avg / ${b.frameCpuP95Ms.toFixed(2)} p95`],["FPS",b.fps.toFixed(1)]]:[["Renderer","WebGPU semantic glTF"],["Mode",b.mode==="3d"?"3D":"Layer Compare"],["Visible layers",b.mode==="3d"?b.visible3dLayers.size:b.compareLayers.size],["Resident tiles",R.loaded.size],["Loading tiles",R.loading.size],["Failed tiles",R.failed.size],["Triangles",Math.round(b.triangles).toLocaleString()],["Downloaded",`${(b.loadedBytes/1048576).toFixed(1)} MB`],["Resident GLB",`${(b.residentTileBytes/1048576).toFixed(1)} MB`],["Resident GPU",`${(b.residentTileGpuBytes/1048576).toFixed(1)} MB`],["Tile loads",b.tileLoads.toLocaleString()],["Tile evictions",b.tileEvictions.toLocaleString()],["Tile scheduler",`${b.tileSchedulerMs.toFixed(2)} ms`],["Active net",R.nets.find(n=>Number(n.id)===b.activeNetId)?.name||"-"],["Frame interval",`${b.frameIntervalMs.toFixed(2)} ms avg / ${b.frameIntervalP95Ms.toFixed(2)} p95`],["CPU frame",`${b.frameCpuMs.toFixed(2)} ms avg / ${b.frameCpuP95Ms.toFixed(2)} p95`],["FPS",b.fps.toFixed(1)]];Va.innerHTML=r.map(([n,i])=>`<dt>${n}</dt><dd>${i}</dd>`).join("")}function fh(e){return`rgb(${e.slice(0,3).map(t=>Math.round(t*255)).join(" ")})`}function hh(){if(!Me)return;let e=R.layers||[];if(!e.length){Me.innerHTML='<div class="selection-empty" style="padding:40px;text-align:center;">No stackup information available for this board.</div>';return}let t=e.filter(E=>["copper","dielectric","paste","silkscreen","soldermask"].includes(E.role)),a=Re.board?.stackup||{},s=E=>{if(E==null||E==="")return"None";let j=String(E);return L(j.includes(".")?j.split(".").pop():j)},r=(E,j=4)=>{let O=Number(E);return Number.isFinite(O)&&O>0?O.toFixed(j):"-"},n=(E,j=3)=>{let O=Number(E);return Number.isFinite(O)?O.toFixed(j):"-"},i=E=>{if(E==null||E==="")return"No";if(typeof E=="boolean")return E?"Yes":"No";let j=String(E).trim().toLowerCase(),O=j.includes(".")?j.split(".").pop():j;return["0","false","no","n","off","none"].includes(O)?"No":(["1","true","yes","y","on"].includes(O),"Yes")},o=E=>({copper:"Copper",dielectric:"Dielectric",paste:"Paste",silkscreen:"Silkscreen",soldermask:"Solder mask"})[E]||String(E||"Layer"),c=E=>E.role!=="dielectric"?"":E.type==="core"?"Core":E.type==="prepreg"||(E.material||"").toLowerCase().includes("prepreg")?"Prepreg":"Core",l=(E,j=4)=>{let O=Number(E.thickness_mm);return Number.isFinite(O)&&O>0?`${O.toFixed(j)} mm`:"Not specified"},p=E=>{let j=o(E.role),O=String(E.material||"").trim(),W=O&&O.toLowerCase()!==String(E.role||"").toLowerCase();if(E.role==="dielectric"){let oe=[W?O:"",r(E.epsilon_r,3)!=="-"?`\u03B5r ${r(E.epsilon_r,3)}`:"",r(E.loss_tangent,4)!=="-"?`tan \u03B4 ${r(E.loss_tangent,4)}`:""].filter(Boolean).join(" \xB7 ");return{primary:`${E.name} \xB7 ${c(E)}`,secondary:oe}}return{primary:[E.name,j,W?O:""].filter(Boolean).join(" \xB7 "),secondary:""}},g=0,w=0,y=0,f=0;t.forEach(E=>{f+=E.thickness_mm||0,E.role==="copper"?E.name.toLowerCase().includes("gnd")||E.name.toLowerCase().includes("pwr")||E.name.toLowerCase().includes("plane")?w++:g++:E.role==="dielectric"&&y++});let d=R.copperLayers||[],x=0,u=0,h=0,m=[...(R.manifest?.barrels||[]).filter(E=>E.kind==="via"),...[...R.features.values()].filter(E=>E.kind==="via")],v=Jn(d,m);x=v.counts.thru,u=v.counts.blind,h=v.counts.buried;let T=v.spans,k=30,I=k,M=[],_=new Map(t.map((E,j)=>[E,j])),A=bh(t),C=(E,j)=>{let O=A.get(E.name);if(O!==void 0)return O;let W=Number(E.stack_index);return Number.isFinite(W)?W:j+1e5},U=[...t].sort((E,j)=>{let O=C(E,_.get(E)||0),W=C(j,_.get(j)||0);return O!==W?O-W:(j.z_mm||0)-(E.z_mm||0)});U.forEach(E=>{let j=12;E.role==="dielectric"?j=Math.max(160,Math.min(360,(E.thickness_mm||.1)*140)):E.role==="copper"?j=22:E.role==="soldermask"&&(j=14),M.push({...E,svgY:I,svgHeight:j}),I+=j});let B=800,F=130,q=240,te=F+q+16,ne=te+84,je="";M.forEach(E=>{let j=E.color||"#7f7f7f";E.role==="copper"?j=E.color||"#f97316":E.role==="dielectric"?j="#a98d5c":E.role==="paste"?j="#cbd5e1":E.role==="soldermask"?j="#1b4332":E.role==="silkscreen"&&(j="#e2e8f0");let O=d.findIndex($i=>$i.name===E.name),W=p(E),oe=E.svgY+E.svgHeight/2,ye=!!W.secondary&&E.svgHeight>=38,Tt=ye?oe-5:oe+3,ls=L(E.id),oa=L(E.name),He=Number.isFinite(Number(E.thickness_mm))&&Number(E.thickness_mm)>0,Ji=L(He?l(E):"\u2014"),Yi=L([W.primary,W.secondary,`Thickness ${l(E)}`].filter(Boolean).join("; "));je+=`
      <g class="stackup-svg-layer" data-layer-id="${ls}" data-layer-name="${oa}">
        <title>${Yi}</title>
        <rect x="${F}" y="${E.svgY}" width="${q}" height="${E.svgHeight}" fill="${j}" opacity="0.85" rx="1"/>
        <text x="${F-8}" y="${E.svgY+E.svgHeight/2+3}" fill="var(--muted)" font-size="9px" text-anchor="end" font-weight="700">
          ${E.role==="copper"?O+1:""}
        </text>
        <path class="stackup-layer-dimension" d="M ${te+6} ${E.svgY+1} H ${te} V ${E.svgY+E.svgHeight-1} H ${te+6}" />
        <text class="stackup-layer-thickness" x="${te+10}" y="${oe+3}" fill="var(--muted)" font-size="8.5px" font-weight="650">
          ${Ji}
        </text>
        <text class="stackup-layer-name" x="${ne}" y="${Tt}" fill="var(--foreground)" font-size="9px" font-weight="650">
          ${L(W.primary)}
        </text>
        ${ye?`<text class="stackup-layer-metadata" x="${ne}" y="${oe+10}" fill="var(--muted)" font-size="8px">${L(W.secondary)}</text>`:""}
      </g>
    `});let de="",Fe=M.filter(E=>E.role==="copper");T.forEach((E,j)=>{let O=M.find(He=>He.name===E.startName),W=M.find(He=>He.name===E.endName);if(!O||!W)return;let oe=O.svgY,ye=W.svgY+W.svgHeight,Tt=F+(j+1)*q/(T.length+1),ls=E.type==="thru"?"Thru":E.type==="blind"?"Blind":"Buried",oa=`var(--stackup-via-${E.type})`;de+=`
      <g class="stackup-svg-via" data-via-type="${E.type}">
        <title>${ls}: ${E.startName} \u2192 ${E.endName}</title>
        ${Fe.map(He=>He.svgY>=O.svgY&&He.svgY<=W.svgY?`<rect x="${Tt-5}" y="${He.svgY}" width="10" height="${He.svgHeight}" fill="${oa}" rx="0.5" />`:"").join("")}
        <rect x="${Tt-2}" y="${oe}" width="4" height="${ye-oe}" fill="${oa}" opacity="0.95" />
        <rect x="${Tt-.75}" y="${oe-1}" width="1.5" height="${ye-oe+2}" fill="var(--panel)" opacity="0.9" />
      </g>
    `});let De=`
    <svg class="stackup-visual-svg" viewBox="0 0 ${B} ${I+10}" width="${B}" height="${I+10}">
      <g class="stackup-svg-column-headings" aria-hidden="true">
        <text x="${te+10}" y="15">Thickness</text>
        <text x="${ne}" y="15">Layer / material properties</text>
      </g>
      <g class="stackup-total-dimension" aria-label="Total board thickness ${f.toFixed(4)} millimetres">
        <path d="M 76 ${k} H 68 V ${I} H 76" />
        <text x="68" y="15">Total ${f.toFixed(4)} mm</text>
      </g>
      ${je}
      ${de}
    </svg>
    <div class="stackup-via-legend" aria-label="Via span legend">
      <span><i data-via-type="thru"></i>Thru</span>
      <span><i data-via-type="blind"></i>Blind</span>
      <span><i data-via-type="buried"></i>Buried</span>
    </div>
  `,me="";U.forEach(E=>{let j="silk";E.role==="copper"?j="copper":E.role==="dielectric"?j="dielectric":E.role==="paste"?j="paste":E.role==="soldermask"&&(j="mask");let O=c(E),W=L(E.id),oe=L(E.name),ye=p(E);me+=`
      <tr data-layer-id="${W}" data-layer-name="${oe}" tabindex="0" aria-label="${L(`${ye.primary}; thickness ${l(E)}`)}">
        <td><strong>${oe}</strong></td>
        <td><span class="stackup-badge ${j}">${E.role}</span></td>
        <td>${O||"-"}</td>
        <td>${L(E.material||"-")}</td>
        <td>${E.role==="dielectric"?r(E.epsilon_r,3):"-"}</td>
        <td>${E.role==="dielectric"?r(E.loss_tangent,4):"-"}</td>
        <td>${E.thickness_mm?E.thickness_mm.toFixed(4)+" mm":"-"}</td>
      </tr>
    `});let Ve="",Ue=Re.board?.net_classes||[],Qe=E=>{let j=n(E);return j==="-"?j:`${j} mm`};Ue.length?Ue.forEach(E=>{Ve+=`
        <tr>
          <td><strong>${E.name}</strong></td>
          <td>${Qe(E.track_width)}</td>
          <td>${Qe(E.clearance)}</td>
          <td>${Qe(E.diff_pair_width)}</td>
          <td>${Qe(E.diff_pair_gap)}</td>
          <td>${Number.isFinite(Number(E.via_diameter))?`${n(E.via_drill)}/${n(E.via_diameter)} mm`:"-"}</td>
        </tr>
      `}):Ve=`
      <tr>
        <td colspan="6" class="selection-empty" style="text-align: center;">No design rules or impedance classes defined.</td>
      </tr>
    `,Me.innerHTML=`
    <div class="stackup-header">
      <div class="stackup-header-title">
        <h1>Layer Stackup</h1>
        <p>Board cross-section profile, layer properties & design rules</p>
      </div>
    </div>

    <div class="stackup-workspace-body">
      <div class="stackup-diagram-card">
        <span class="stackup-section-title">Cross-Section Profile</span>
        ${De}
      </div>
      <aside class="stackup-side-panel">
      <div class="stackup-summary-grid">
        <div class="stackup-summary-card">
          <label>Total Thickness</label>
          <span>${f.toFixed(4)} mm</span>
        </div>
        <div class="stackup-summary-card">
          <label>Copper Layers</label>
          <span>${d.length} (${g} Sig / ${w} Plane)</span>
        </div>
        <div class="stackup-summary-card">
          <label>Dielectrics</label>
          <span>${y} Layers</span>
        </div>
        <div class="stackup-summary-card">
          <label>Thru Vias</label>
          <span>${x}</span>
        </div>
        <div class="stackup-summary-card">
          <label>Blind Vias</label>
          <span>${u}</span>
        </div>
        <div class="stackup-summary-card">
          <label>Buried Vias</label>
          <span>${h}</span>
        </div>
      </div>
      <span class="stackup-section-title stackup-section-heading">Fabrication</span>
      <div class="stackup-summary-grid">
        <div class="stackup-summary-card">
          <label>Copper Finish</label>
          <span>${s(a.copper_finish)}</span>
        </div>
        <div class="stackup-summary-card">
          <label>Edge Connector</label>
          <span>${i(a.edge_connector)}</span>
        </div>
        <div class="stackup-summary-card">
          <label>Castellated Holes</label>
          <span>${i(a.castellated_pads)}</span>
        </div>
        <div class="stackup-summary-card">
          <label>Edge Plating</label>
          <span>${i(a.edge_plating)}</span>
        </div>
      </div>
      <div class="stackup-tables-container">
        <div class="stackup-table-section">
          <div class="stackup-section-title stackup-section-heading">
            <span>Layers Stackup</span>
            <small>Hover or focus a row to locate it</small>
          </div>
          <div class="stackup-table-wrapper">
            <table class="stackup-table">
              <thead>
                <tr>
                  <th>Layer</th>
                  <th>Type</th>
                  <th>Subtype</th>
                  <th>Material</th>
                  <th>\u03B5r</th>
                  <th>tan \u03B4</th>
                  <th>Thickness</th>
                </tr>
              </thead>
              <tbody>
                ${me}
              </tbody>
            </table>
          </div>
        </div>

        <div class="stackup-table-section">
          <span class="stackup-section-title stackup-section-heading">Impedance Net Classes</span>
          <div class="stackup-table-wrapper">
            <table class="stackup-table">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Width</th>
                  <th>Clearance</th>
                  <th>Diff W</th>
                  <th>Diff Gap</th>
                  <th>Drill/Dia</th>
                </tr>
              </thead>
              <tbody>
                ${Ve}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </aside>
    </div>
  `;let At=(E,j)=>{Me.querySelectorAll(".stackup-svg-layer").forEach(O=>{let W=O.dataset.layerId===E;O.classList.toggle("active",W&&j)}),Me.querySelectorAll(".stackup-table tbody tr[data-layer-id]").forEach(O=>{let W=O.dataset.layerId===E;O.classList.toggle("active",W&&j)})},ds=E=>{let j=Me.querySelector(".stackup-diagram-card"),O=Me.querySelector(`.stackup-svg-layer[data-layer-id="${CSS.escape(E)}"]`);if(!j||!O||j.scrollHeight<=j.clientHeight)return;let W=j.getBoundingClientRect(),oe=O.getBoundingClientRect(),ye=j.scrollTop+oe.top-W.top-(j.clientHeight-oe.height)/2,Tt=window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;j.scrollTo({top:Math.max(0,ye),behavior:Tt?"auto":"smooth"})},ia=(E,{revealDiagram:j=!1}={})=>{E.forEach(O=>{let W=()=>{let ye=O.dataset.layerId;At(ye,!0),j&&ds(ye)},oe=()=>At(null,!1);O.addEventListener("mouseenter",W),O.addEventListener("mouseleave",oe),j&&(O.addEventListener("focus",W),O.addEventListener("blur",oe))})};ia(Me.querySelectorAll(".stackup-svg-layer")),ia(Me.querySelectorAll(".stackup-table tbody tr[data-layer-id]"),{revealDiagram:!0})}function bh(e){let t=e.filter(r=>r.role==="dielectric");if(!(t.length===1&&t[0]?.name==="Board"))return new Map;let s=new Map;return["F.SilkS","F.Paste","F.Mask","F.Cu","Board","B.Cu","B.Mask","B.Paste","B.SilkS"].forEach((r,n)=>s.set(r,n)),s}function qi(){let e=null;return{begin(){return e?.abort(),e=new AbortController,e},owns(t){return t!==null&&t===e&&!t.signal.aborted},cancel(){e?.abort(),e=null}}}async function Xi(e,t,{owner:a,bundleUrl:s,loadBundle:r,now:n=()=>performance.now()}){let i=n(),o={},{signal:c}=t,l=()=>a.owns(t)&&e.isConnected;try{e.renderLoading();let p=n(),{bundle:g,topology:w,semanticGeometry:y}=await r(s,o,c);if(o.bundle_group_total_ms=n()-p,!l())return;e.renderShell();let f=n(),d=await e.mountViewer({topology:w,semanticGeometry:y,readiness:g.readiness,signal:c});if(!l()){d?.dispose?.();return}e.publishController(d),o.mount_and_first_frame_ms=n()-f,Object.assign(o,d?.performance||{}),o.reload_to_visible_ms=n()-i,e.emitReady({schema:"prism.semantic_viewer_performance.a0",milestone:"board-visible",readiness_stage:g.readiness?.stage||"semantic-ready",readiness_progress:g.readiness?.progress??100,timings:o})}catch(p){if(!l())return;e.renderError(p),e.emitError(p)}}var gh="prism.visualizer_bundle.a0";function ph(){return`
    <style>
      ${or}
      #app { grid-template-columns: minmax(0, 1fr) 376px; }
      #app.panel-collapsed { grid-template-columns: minmax(0, 1fr) 46px; }
      #app.workspace-stackup { grid-template-columns: minmax(0, 1fr); }
      #selection-card { display: none !important; }
    </style>
    <main id="app">
      <section class="viewport-shell">
        <canvas id="viewport"></canvas>
        <div id="stackup-workspace-view" hidden></div>
        <div id="panel-labels"></div>
        <div id="selection-card" hidden></div>
        <canvas id="axis-gizmo" width="112" height="112" title="Click an axis to align the camera"></canvas>
        <div id="fallback" hidden></div>
      </section>
      <aside class="panel">
        <nav class="panel-rail" aria-label="Viewer tools">
          <button class="rail-tab active" data-tab="layers" title="Layers">Layers</button>
          <button class="rail-tab" data-tab="search" title="Search and selection">Find</button>
          <button class="rail-tab" data-tab="view" title="View controls">View</button>
        </nav>
        <div class="panel-drawer">
          <header class="panel-mode-header">
            <div id="mode-switch"></div>
          </header>
          <section class="tab-panel active" data-panel="layers">
            <div class="section-heading"><h2 id="primary-heading">Layers</h2><span id="primary-description">Visibility and compare</span></div>
            <div id="layers"></div>
          </section>
          <section class="tab-panel" data-panel="search">
            <div class="section-heading"><h2>Find</h2><span>Nets, components and pins</span></div>
            <div id="search-controls"></div>
          </section>
          <section class="tab-panel" data-panel="view">
            <div class="section-heading"><h2>View</h2><span>Camera and stackup</span></div>
            <div id="view-controls"></div>
          </section>
        </div>
      </aside>
    </main>
  `}function mh(e){return String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}async function nr(e,t=null,a="fetch",s=void 0){let r=performance.now(),n=await fetch(e,{cache:"no-store",signal:s});if(!n.ok)throw new Error(`Failed to load ${e}: ${n.status}`);let i=await n.json();return t&&(t[`${a}_fetch_parse_ms`]=performance.now()-r,t[`${a}_content_length`]=Number(n.headers.get("content-length")||0)),i}function xh(e,t){if(!t)return e;let a=new URL(e);return a.searchParams.set("viewer",t),a.toString()}function yh(e,t,a,s){let r=new URL(a.asset_base||"./",t),n=structuredClone(e||{}),i=o=>!o||typeof o!="string"?o:xh(new URL(o,r).toString(),s);for(let o of["assets","semantic_gltf","schematic_world","schematic_vector","schematic_scene","bom"]){let c=n[o];if(!(!c||typeof c!="object"))for(let[l,p]of Object.entries(c))c[l]=i(p)}return n}async function vh(e,t,a){let s=new URL(e,document.baseURI).toString(),r=new URL(s).searchParams.get("viewer")||"",n=await nr(s,t,"bundle",a);if(n.schema!==gh)throw new Error(`Unsupported visualizer bundle schema: ${n.schema||"missing"}`);let i=new URL(n.topology||"topology.json",s),o=new URL(n.semantic_geometry||"semantic_geometry.json",s),[c,l]=await Promise.all([nr(i,t,"topology",a),nr(o,t,"semantic_geometry",a)]);return{bundle:n,topology:c,semanticGeometry:yh(l,s,n,r)}}var ir=class extends HTMLElement{static get observedAttributes(){return["bundle-url","workspace"]}constructor(){super(),this.attachShadow({mode:"open"}),this.controller=null,this.reloadOwner=qi(),this.pendingSelection=null,this.pendingHiddenComponents=null,this.pendingOccurrences=null,this.reloadQueued=!1,this.reloadSource=null}connectedCallback(){this.queueReload()}disconnectedCallback(){this.reloadOwner.cancel(),this.controller?.dispose?.(),this.controller=null,this.reloadSource=null}attributeChangedCallback(t,a,s){if(!(!this.isConnected||a===s)){if(t==="workspace"){this.controller?.setWorkspace?.(this.workspace);return}this.queueReload()}}get workspace(){return this.getAttribute("workspace")==="stackup"?"stackup":"pcb"}queueReload(){let t=this.getAttribute("bundle-url");!t||t===this.reloadSource||(this.reloadSource=t,!this.reloadQueued&&(this.reloadQueued=!0,queueMicrotask(()=>{this.reloadQueued=!1,this.isConnected&&this.reload()})))}async reload(){let t=this.getAttribute("bundle-url"),a=this.reloadOwner.begin();if(this.controller?.dispose?.(),this.controller=null,!t){this.shadowRoot.innerHTML="<style>:host{display:block;height:100%;font:14px system-ui;color:#94a3b8}</style><div>Semantic bundle URL is missing.</div>";return}await Xi(this,a,{owner:this.reloadOwner,bundleUrl:t,loadBundle:vh})}renderLoading(){this.shadowRoot.innerHTML='<style>:host{display:block;height:100%;background:#020817;color:#e5e7eb;font:14px system-ui}</style><div style="display:grid;place-items:center;height:100%">Loading semantic visualizer...</div>'}renderShell(){this.shadowRoot.innerHTML=ph()}renderError(t){console.error(t),this.shadowRoot.innerHTML=`
      <style>
        :host{display:block;height:100%;background:#020817;color:#e5e7eb;font:14px system-ui}
        .error{height:100%;display:grid;place-items:center;padding:24px}
        pre{max-width:100%;white-space:pre-wrap;color:#fecaca;background:#111827;border:1px solid #374151;padding:16px}
      </style>
      <div class="error"><pre>${mh(t?.stack||t?.message||String(t))}</pre></div>
    `}mountViewer({topology:t,semanticGeometry:a,readiness:s,signal:r}){return Ys({root:this.shadowRoot,topology:t,semanticGeometry:a,readiness:s,workspaceScope:"3d",isActive:()=>this.getAttribute("active")==="true",onSelectionChange:n=>{r.aborted||this.dispatchEvent(new CustomEvent("prism-semantic-viewer:selectionchange",{bubbles:!0,composed:!0,detail:{selection:n}}))},onPerformanceEvent:n=>{r.aborted||(console.info("[prism-3d-perf]",n),this.dispatchEvent(new CustomEvent("prism-semantic-viewer:performance",{bubbles:!0,composed:!0,detail:n})))}})}publishController(t){this.controller=t,this.controller?.setWorkspace?.(this.workspace),this.pendingHiddenComponents&&this.controller?.setHiddenComponents?.(this.pendingHiddenComponents),this.pendingOccurrences&&this.controller?.setOccurrences?.(this.pendingOccurrences),this.pendingSelection&&this.controller?.setSelection?.(this.pendingSelection),this.pendingHighlightedNets?.length&&this.controller?.setHighlightedNets?.(this.pendingHighlightedNets)}emitReady(t){console.info("[prism-3d-perf]",t),this.dispatchEvent(new CustomEvent("prism-semantic-viewer:ready",{bubbles:!0,composed:!0,detail:t}))}emitError(t){this.dispatchEvent(new CustomEvent("prism-semantic-viewer:error",{bubbles:!0,detail:{error:t}}))}setSelection(t){this.pendingSelection=t||null,this.controller?.setSelection?.(this.pendingSelection)}setHighlightedNets(t){this.pendingHighlightedNets=Array.isArray(t)?[...t]:[],this.controller?.setHighlightedNets?.(this.pendingHighlightedNets)}setHiddenComponents(t){this.pendingHiddenComponents=Array.isArray(t)?[...t]:[],this.controller?.setHiddenComponents?.(this.pendingHiddenComponents)}setOccurrences(t){this.pendingOccurrences=t==null?null:Array.from(t,a=>a?.matrix?{matrix:[...a.matrix],key:a.key}:[...a]),this.controller?.setOccurrences?.(this.pendingOccurrences)}pickAt(t,a){return Promise.resolve(this.controller?.pickAt?.(t,a)??null)}projectComponent(t,a){return this.controller?.projectComponent?.(t,a)??null}projectPoint(t,a){return this.controller?.projectPoint?.(t,a)??null}resize(){this.controller?.resize?.()}};function Wi(){customElements.get("prism-semantic-viewer")||customElements.define("prism-semantic-viewer",ir)}window.__PRISM_SEMANTIC_VIEWER_MANUAL_BOOT__=!0;Wi();
