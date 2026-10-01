var Ar=`:host,
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
`;var Ko=/\/api\/projects\/([^/]+)\/webgpu-3d\/assets\/([^/]+)\/([^/]+)\/(.+)$/,Go="prism-bundle-cache-a0",js="manifest.json";function Fs(t){let e;try{e=new URL(t,"http://cache.invalid/")}catch{return null}let a=Ko.exec(e.pathname);if(!a)return null;let[,s,r,n,i]=a.map(decodeURIComponent);if(i.split("/").some(c=>!c||c==="."||c===".."))return null;let o=e.searchParams.get("viewer")||"";return`${s}/${r}/${n}/${i}${o?`?viewer=${o}`:""}`}function Ra(t){return`a_${encodeURIComponent(t)}`}function zo(t,e,{maxAgeMs:a=2592e6,maxBytes:s=2147483648}={}){let r=new Set,n=[];for(let[o,c]of Object.entries(t))e-Number(c.lastUsed||0)<=a?n.push([o,c]):r.add(o);n.sort((o,c)=>Number(c[1].lastUsed)-Number(o[1].lastUsed));let i=0;for(let[o,c]of n)i+=Number(c.bytes||0),i>s&&r.add(o);return[...r]}var Ct=class t{static open(e={}){return t.shared||(t.shared=new t(e)),t.shared}constructor({maxAgeMs:e=2592e6,maxBytes:a=2147483648}={}){this.maxAgeMs=e,this.maxBytes=a,this.stats={hits:0,misses:0,bypassed:0,cachedBytes:0,networkBytes:0,writeErrors:0},this.ready=this.init(),this.flushTimer=null}async init(){try{let e=globalThis.navigator?.storage;if(!e?.getDirectory)return null;let s=await(await e.getDirectory()).getDirectoryHandle(Go,{create:!0}),r=await s.getFileHandle(js,{create:!0});if(typeof r.createWritable!="function")return null;let n={};try{let i=await(await r.getFile()).text();n=i?JSON.parse(i).entries||{}:{}}catch{n={}}return this.directory=s,this.entries=n,await this.prune(),globalThis.addEventListener?.("pagehide",()=>void this.flush()),s}catch{return null}}get enabled(){return!!this.directory}async fetchBytes(e,{store:a=!0,signal:s}={}){let r=Fs(e);if(await this.ready,r&&this.directory){let c=await this.read(r);if(c)return this.stats.hits+=1,this.stats.cachedBytes+=c.byteLength,c;this.stats.misses+=1}else this.stats.bypassed+=1;let n=await fetch(e,{cache:"no-store",signal:s});if(!n.ok)throw new Error(`Failed to load ${e}: ${n.status}`);let i=await n.arrayBuffer(),o=Number(n.headers.get("content-length")||0);return this.stats.networkBytes+=i.byteLength,a&&r&&this.directory&&(!o||o===i.byteLength)&&this.write(r,i),i}async fetchJson(e,a={}){let s=await this.fetchBytes(e,a);return JSON.parse(new TextDecoder().decode(s))}async peekJson(e){let a=Fs(e);if(await this.ready,!a||!this.directory)return null;let s=await this.read(a);return s?(this.stats.hits+=1,this.stats.cachedBytes+=s.byteLength,JSON.parse(new TextDecoder().decode(s))):null}async store(e,a){let s=Fs(e);await this.ready,s&&this.directory&&await this.write(s,a)}async read(e){let a=this.entries[e];if(!a)return null;try{let s=await(await this.directory.getFileHandle(Ra(e))).getFile();return s.size!==a.bytes?null:(a.lastUsed=Date.now(),this.scheduleFlush(),await s.arrayBuffer())}catch{return delete this.entries[e],null}}async write(e,a){try{let r=await(await this.directory.getFileHandle(Ra(e),{create:!0})).createWritable();await r.write(a),await r.close(),this.entries[e]={bytes:a.byteLength,lastUsed:Date.now()},this.scheduleFlush()}catch{this.stats.writeErrors+=1}}async prune(e=Date.now()){if(!this.directory)return[];let a=zo(this.entries,e,{maxAgeMs:this.maxAgeMs,maxBytes:this.maxBytes});for(let r of a)delete this.entries[r],await this.directory.removeEntry(Ra(r)).catch(()=>{});let s=new Set(Object.keys(this.entries).map(Ra));for await(let r of this.directory.keys())r!==js&&!s.has(r)&&await this.directory.removeEntry(r).catch(()=>{});return a.length&&await this.flush(),a}async clear(){await this.ready,this.directory&&(this.entries={},await this.prune(),await this.flush())}summary(){let e=Object.values(this.entries||{});return{enabled:this.enabled,files:e.length,bytes:e.reduce((a,s)=>a+Number(s.bytes||0),0),...this.stats}}scheduleFlush(){this.flushTimer||(this.flushTimer=setTimeout(()=>{this.flushTimer=null,this.flush()},1e3))}async flush(){if(this.directory)try{let a=await(await this.directory.getFileHandle(js,{create:!0})).createWritable();await a.write(JSON.stringify({schema:"prism.bundle_cache_manifest.a0",entries:this.entries})),await a.close()}catch{this.stats.writeErrors+=1}}};function Vo(t,e){if(!e)return t;let a=new URL(t);return a.searchParams.set("viewer",e),a.toString()}function Sa(t,e,a,s){let r=new URL(a.asset_base||"./",e),n=structuredClone(t||{}),i=o=>!o||typeof o!="string"?o:Vo(new URL(o,r).toString(),s);for(let o of["assets","semantic_gltf","schematic_world","schematic_vector","schematic_scene","bom"]){let c=n[o];if(!(!c||typeof c!="object"))for(let[d,f]of Object.entries(c))c[d]=i(f)}return n}function Zt(t){return(t?.readiness?.stage||"semantic-ready")==="semantic-ready"&&(t?.readiness?.progress??100)>=100}var ie=(t,e,a)=>Math.max(e,Math.min(a,t)),ea=(t,e,a)=>t+(e-t)*a;function at(t,e){return[t[0]+e[0],t[1]+e[1],t[2]+e[2]]}function Ho(t,e){return[t[0]-e[0],t[1]-e[1],t[2]-e[2]]}function We(t,e){return[t[0]*e,t[1]*e,t[2]*e]}function qo(t){return Math.hypot(t[0],t[1],t[2])}function Ot(t){let e=qo(t)||1;return We(t,1/e)}function Aa(t,e){return[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]]}function Bs(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]}function _a(t,e){let a=new Float32Array(16);for(let s=0;s<4;s+=1)for(let r=0;r<4;r+=1)a[s*4+r]=t[r]*e[s*4]+t[4+r]*e[s*4+1]+t[8+r]*e[s*4+2]+t[12+r]*e[s*4+3];return a}function _r(t,e,a){let s=Ot(Ho(t,e)),r=Ot(Aa(a,s)),n=Aa(s,r);return new Float32Array([r[0],n[0],s[0],0,r[1],n[1],s[1],0,r[2],n[2],s[2],0,-Bs(r,t),-Bs(n,t),-Bs(s,t),1])}function Nr(t,e,a,s){let r=1/Math.tan(t/2);return new Float32Array([r/e,0,0,0,0,r,0,0,0,0,s/(a-s),-1,0,0,a*s/(a-s),0])}function jr(t,e,a,s){return new Float32Array([2/t,0,0,0,0,2/e,0,0,0,0,1/(a-s),0,0,0,0,1])}function Cs(t){return[(t[0]+t[3])/2,(t[1]+t[4])/2,(t[2]+t[5])/2]}function Rt(t){return Math.max(.001,Math.hypot(t[3]-t[0],t[4]-t[1],t[5]-t[2])/2)}var Pt=class{constructor(e){let a=Cs(e),s=Rt(e);this.focus=[...a],this.targetFocus=[...a],this.azimuth=-.62,this.targetAzimuth=this.azimuth,this.polar=.72,this.targetPolar=this.polar,this.distance=s*2.8,this.targetDistance=this.distance,this.orthoScale=s*2.15,this.targetOrthoScale=this.orthoScale,this.sceneRadius=s,this.fov=Math.PI/4}update(e){let a=1-Math.exp(-e*14);this.focus=this.focus.map((s,r)=>ea(s,this.targetFocus[r],a)),this.azimuth=Xo(this.azimuth,this.targetAzimuth,a),this.polar=ea(this.polar,this.targetPolar,a),this.distance=ea(this.distance,this.targetDistance,a),this.orthoScale=ea(this.orthoScale,this.targetOrthoScale,a)}snap(){this.focus=[...this.targetFocus],this.azimuth=this.targetAzimuth,this.polar=this.targetPolar,this.distance=this.targetDistance,this.orthoScale=this.targetOrthoScale}basis(){let e=Math.sin(this.polar),a=Math.cos(this.polar),s=Ot([e*Math.sin(this.azimuth),-e*Math.cos(this.azimuth),a]),r=Ot([Math.cos(this.azimuth),Math.sin(this.azimuth),0]),n=Ot(Aa(s,r));return{right:r,up:n,back:s}}matrix(e,a,s=!1,r=1){let n=Math.max(.01,e/Math.max(1,a)),{up:i,back:o}=this.basis(),c=at(this.focus,We(o,this.distance)),d=_r(c,this.focus,i),f=s?jr(this.orthoScale*r*n,this.orthoScale*r,-this.sceneRadius*40,this.sceneRadius*40):Nr(this.fov,n,Math.max(this.sceneRadius*5e-4,this.distance-this.sceneRadius*3.5),this.distance+this.sceneRadius*4.5);return _a(f,d)}orbit(e,a){this.targetAzimuth-=e*.006,this.targetPolar=ie(this.targetPolar-a*.006,.015,Math.PI-.015)}pan(e,a,s,r=!1){let{right:n,up:i}=this.basis(),o=r?this.targetOrthoScale/Math.max(1,s):2*this.targetDistance*Math.tan(this.fov/2)/Math.max(1,s),c=at(We(n,-e*o),We(i,a*o));this.targetFocus=at(this.targetFocus,c)}dolly(e,a=!1){let s=Math.exp(e*.0032);a?this.targetOrthoScale=ie(this.targetOrthoScale*s,this.sceneRadius*.008,this.sceneRadius*24):this.targetDistance=ie(this.targetDistance*s,this.sceneRadius*.01,this.sceneRadius*48)}frame(e){if(!e)return;let a=Rt(e);this.targetFocus=Cs(e),this.targetDistance=Math.max(a*2.8,this.sceneRadius*.02),this.targetOrthoScale=Math.max(a*2.15,this.sceneRadius*.02)}setFocus(e){this.targetFocus=[...e]}setAxis(e,a=!1){e==="z"?(this.targetAzimuth=0,this.targetPolar=a?Math.PI-.015:.015):e==="x"?(this.targetAzimuth=a?-Math.PI/2:Math.PI/2,this.targetPolar=Math.PI/2):(this.targetAzimuth=a?0:Math.PI,this.targetPolar=Math.PI/2)}rotateZ(e=1){this.targetAzimuth+=e*Math.PI/2}flip(){this.targetPolar=Math.PI-this.targetPolar}};function Xo(t,e,a){let s=Math.atan2(Math.sin(e-t),Math.cos(e-t));return t+s*a}var Na=class t{static async create(e,a,s={}){let r=await fetch(a,{cache:"default"});if(!r.ok)throw new Error(`Failed to load BoM ${a}: ${r.status}`);let n=await r.json();if(n.schema!=="prism.bom_a0")throw new Error(`Unsupported BoM schema: ${n.schema||"missing"}`);let i=new t(e,n,s);return i.render(),i}constructor(e,a,s){this.container=e,this.payload=a,this.callbacks=s,this.query="",this.selectedRowId="",this.selectedReference="",this.rowsById=new Map((a.rows||[]).map(r=>[r.id,r])),this.componentIndex=new Map(Object.entries(a.componentIndex||{}))}setSelectionByReference(e,a={}){let s=this.componentIndex.get(e);s&&(this.selectedReference=e,this.selectedRowId=s.rowId,this.renderContent(),a.scroll&&this.container.querySelector(`[data-row-id="${Yo(s.rowId)}"]`)?.scrollIntoView({block:"center",behavior:"smooth"}))}clearSelection(){this.selectedReference="",this.selectedRowId="",this.renderContent()}render(){let e=this.filteredRows();this.container.innerHTML=`
      <section class="bom-workspace">
        <header class="bom-toolbar">
          <div>
            <p class="eyebrow">Prism BoM A0</p>
            <h2>Bill of Materials</h2>
            <span data-bom-count>${e.length} of ${(this.payload.rows||[]).length} grouped rows \xB7 ${(this.payload.components||[]).length} components</span>
          </div>
          <label class="bom-search">
            <span>Search</span>
            <input id="bom-search" type="search" value="${Be(this.query)}" placeholder="Reference, value, footprint, manufacturer..." />
          </label>
        </header>
        <div class="bom-content" data-bom-content>
          ${this.contentHtml(e,this.payload.displayColumns||[])}
        </div>
      </section>
    `,this.bind()}renderContent(){let e=this.container.querySelector("[data-bom-content]");if(!e){this.render();return}let a=this.filteredRows();e.innerHTML=this.contentHtml(a,this.payload.displayColumns||[]);let s=this.container.querySelector("[data-bom-count]");s&&(s.textContent=`${a.length} of ${(this.payload.rows||[]).length} grouped rows \xB7 ${(this.payload.components||[]).length} components`),this.bindContent(e)}contentHtml(e,a){let s=this.rowsById.get(this.selectedRowId);return`
      <div class="bom-table-wrap">
        <table class="bom-table">
          <thead>
            <tr>${a.map(r=>`<th>${Be(r)}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${e.map(r=>this.rowHtml(r,a)).join("")}
          </tbody>
        </table>
      </div>
      ${s?`<aside class="bom-detail">${this.detailHtml(s)}</aside>`:""}
    `}filteredRows(){let e=this.query.trim().toLowerCase(),a=this.payload.rows||[];return e?a.filter(s=>JSON.stringify(s).toLowerCase().includes(e)):a}rowHtml(e,a){return`
      <tr class="${e.id===this.selectedRowId?"selected":""}" data-row-id="${Be(e.id)}">
        ${a.map(r=>{let n=e.fields?.[r]||"";return r==="Reference"?`<td class="bom-reference-cell">${(e.references||[]).map(i=>`
              <button class="bom-ref-chip ${i===this.selectedReference?"active":""}" data-reference="${Be(i)}">${Be(i)}</button>
            `).join("")}</td>`:!n&&Jo(r)?'<td><span class="bom-missing">Missing</span></td>':`<td title="${Be(n)}">${Be(n)}</td>`}).join("")}
      </tr>
    `}detailHtml(e){let a=Wo(e,this.payload.displayColumns||[],this.payload.extraColumns||[]);return`
      <div class="bom-detail-head">
        <p class="eyebrow">Line item</p>
        <h3>${Be((e.references||[]).join(", "))}</h3>
        <span>${e.qty} component${e.qty===1?"":"s"}${e.dnp?" \xB7 DNP":""}</span>
      </div>
      <div class="bom-ref-list">
        ${(e.references||[]).map(s=>`
          <button class="bom-ref-chip detail ${s===this.selectedReference?"active":""}" data-reference="${Be(s)}">${Be(s)}</button>
        `).join("")}
      </div>
      <dl class="bom-field-list">
        ${a.map(([s,r])=>`
          <div>
            <dt>${Be(s)}</dt>
            <dd>${Be(r)}</dd>
          </div>
        `).join("")}
      </dl>
    `}bind(){let e=this.container.querySelector("#bom-search");e?.addEventListener("input",()=>{this.query=e.value,this.renderContent()}),this.bindContent(this.container)}bindContent(e){e.querySelectorAll("[data-row-id]").forEach(a=>{a.addEventListener("click",s=>{s.target.closest("[data-reference]")||(this.selectedRowId=a.dataset.rowId,this.selectedReference="",this.renderContent())})}),e.querySelectorAll("[data-reference]").forEach(a=>{a.addEventListener("click",s=>{s.stopPropagation();let r=a.dataset.reference;this.setSelectionByReference(r),this.callbacks.onSelectReference?.(r)})})}};function Wo(t,e,a){let s=[],r=new Set(["Reference","Qty"].map(Os));for(let i of e){if(i==="Reference"||i==="Qty")continue;let o=t.fields?.[i]||"";o&&(s.push([i,o]),r.add(Os(i)))}let n=t.canonicalFields||{};for(let i of a){let o=n[i]||"";if(!o)continue;let c=Os(i);r.has(c)||(r.add(c),s.push([i,o]))}return s}function Os(t){return String(t||"").toLowerCase().replace(/[\s_\-()[\]/]+/g,"")}function Jo(t){return["Manufacturer Part Number","Vendor Part Number","Datasheet","Footprint","Value"].includes(t)}function Be(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function Yo(t){return String(t).replace(/["\\]/g,"\\$&")}function Dt(t){let e=`${t.nodeName||""} ${t.meshName||""} ${t.material?.name||""}`.toLowerCase();return e.includes("_pad")||e.includes(".pad")||e.endsWith("pad")?"pad":e.includes("silkscreen")?"silkscreen":e.includes("soldermask")?"soldermask":"substrate"}function Ut(t,e=()=>""){let a=new Map;for(let s of t){let n=`${e(s)}:${JSON.stringify(s.material)}`;a.has(n)||a.set(n,[]),a.get(n).push(s)}return[...a.values()].map(s=>{let r=s.reduce((b,l)=>b+l.position.length/3,0),n=s.reduce((b,l)=>b+l.indices.length,0),i=new Float32Array(r*3),o=new Float32Array(r*3),c=new Uint32Array(r),d=new Uint32Array(r),f=new Uint32Array(n),p=0,v=0,x=[1/0,1/0,1/0,-1/0,-1/0,-1/0];for(let b of s){let l=b.position.length/3;i.set(b.position,p*3),o.set(b.normal,p*3),c.set(b.netId,p),d.set(b.objectFeatureId,p);for(let m=0;m<b.indices.length;m+=1)f[v+m]=Number(b.indices[m])+p;b.bounds&&(x[0]=Math.min(x[0],b.bounds[0]),x[1]=Math.min(x[1],b.bounds[1]),x[2]=Math.min(x[2],b.bounds[2]),x[3]=Math.max(x[3],b.bounds[3]),x[4]=Math.max(x[4],b.bounds[4]),x[5]=Math.max(x[5],b.bounds[5])),p+=l,v+=b.indices.length}return{position:i,normal:o,netId:c,objectFeatureId:d,indices:f,material:s[0].material,groupKey:e(s[0]),bounds:Number.isFinite(x[0])?x:null}})}function ja(t){return!t||t.length!==6?null:[t[0]/1e3,-t[4]/1e3,t[2]/1e3,t[3]/1e3,-t[1]/1e3,t[5]/1e3]}function Lt(t){let e=t?.min||[0,0,0],a=t?.max||[.08,.0016,.05];return[e[0],-a[2],e[1],a[0],-e[2],a[1]]}function ta(t){let e=t.filter(a=>Array.isArray(a)&&a.length===6);return e.length?e.reduce((a,s)=>[Math.min(a[0],s[0]),Math.min(a[1],s[1]),Math.min(a[2],s[2]),Math.max(a[3],s[3]),Math.max(a[4],s[4]),Math.max(a[5],s[5])],[...e[0]]):null}function Fr(t){let e=t.replace("#","");return[0,2,4].map(a=>parseInt(e.slice(a,a+2),16)/255)}function Fa(t,e){if(typeof t?.color=="string"&&/^#[0-9a-fA-F]{6}$/.test(t.color))return[...Fr(t.color),1];let a={"F.Cu":"#a9423c","B.Cu":"#315b9a","In1.Cu":"#477a55","In2.Cu":"#806244","In3.Cu":"#347c86","In4.Cu":"#685889","In5.Cu":"#92793e"},s=["#477a55","#806244","#347c86","#685889","#92793e","#82556e"],r=String(t?.name||""),n=Math.max(0,e.findIndex(i=>i.name===r)-1);return[...Fr(a[r]||s[n%s.length]),1]}function Ba(t,e){let a=e.map(s=>[Number(s.id),Number(s.z_mm||0)]);return a.length<3?!1:(a.sort((s,r)=>s[1]-r[1]),t!==a[0][0]&&t!==a[a.length-1][0])}function Br(t,e=new Map){let a=new Map;for(let r of t||[]){let n=String(r?.designator||"");if(!n)continue;let i=a.get(n)||{reference:n,featureIds:new Set,modelCount:0},o=Number(r?.featureId)||0;o>0&&i.featureIds.add(o),a.set(n,i)}for(let[r,n]of e||[]){let i=a.get(String(r));i&&(i.modelCount=Math.max(i.modelCount,Number(n)||0))}let s=new Map;for(let[r,n]of a)s.set(r,{reference:r,featureIds:[...n.featureIds].sort((i,o)=>i-o),ambiguous:n.featureIds.size>1||n.modelCount>1});return s}function Cr(t,e){let a=[...new Set((Array.isArray(t)?t:[]).map(c=>String(c||"")).filter(Boolean))],s=[],r=[],n=[],i=new Set,o=new Set;for(let c of a){let d=e.get(c);if(!d){n.push(c);continue}if(d.ambiguous){r.push(c);continue}s.push(c),o.add(c);for(let f of d.featureIds)i.add(f)}return{requested:a,applied:s,ambiguous:r,unknown:n,hiddenFeatureIds:i,hiddenReferences:o}}function Ca(t,e){return!!t&&e.has(String(t))}var $o={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function L(t){return String(t??"").replace(/[&<>"']/g,e=>$o[e])}var Ps=`
fn netEmphasized(id: u32) -> bool {
  return id != 0u && id < arrayLength(&netMask) && netMask[id] != 0u;
}
`;function Oa(t){let e=new Set;if(t==null)return e;for(let a of t){let s=Number(a);!Number.isInteger(s)||s<=0||s>4294967295||e.add(s)}return e}function Or(t,e=0){let a=0;for(let r of Oa(t))a=Math.max(a,r);let s=64;for(;s<a+1;)s*=2;return Math.max(s,Math.floor(e)||0)}function Pr(t,e){let a=Math.max(64,Math.floor(e)||0),s=new Uint32Array(a);s.fill(0);for(let r of Oa(t))r<a&&(s[r]=1);return s}function aa(t,e){return!Array.isArray(t)||!e?null:t.find(a=>a.name===e||Array.isArray(a.aliases)&&a.aliases.includes(e))||null}function Dr(t,e){let a=new Set;if(!Array.isArray(t)||!Array.isArray(e))return a;for(let s of e){if(!s)continue;let r=s.netUid&&t.find(i=>i.uid===s.netUid)||s.netName&&aa(t,s.netName),n=Number(r?.id);Number.isInteger(n)&&n>0&&a.add(n)}return a}var Ur=class{_listeners={};addEventListener(t,e){let a=this._listeners;return a[t]===void 0&&(a[t]=[]),a[t].indexOf(e)===-1&&a[t].push(e),this}removeEventListener(t,e){let a=this._listeners[t];if(a!==void 0){let s=a.indexOf(e);s!==-1&&a.splice(s,1)}return this}dispatchEvent(t){let e=this._listeners[t.type];if(e!==void 0){let a=e.slice(0);for(let s=0,r=a.length;s<r;s++)a[s].call(this,t)}return this}dispose(){for(let t in this._listeners)delete this._listeners[t]}},rt=class{_disposed=!1;_name;_parent;_child;_attributes;constructor(t,e,a,s={}){if(this._name=t,this._parent=e,this._child=a,this._attributes=s,!e.isOnGraph(a))throw new Error("Cannot connect disconnected graphs.")}getName(){return this._name}getParent(){return this._parent}getChild(){return this._child}setChild(t){return this._child=t,this}getAttributes(){return this._attributes}dispose(){this._disposed||(this._parent._destroyRef(this),this._disposed=!0)}isDisposed(){return this._disposed}},Ds=class extends Ur{_emptySet=new Set;_edges=new Set;_parentEdges=new Map;_childEdges=new Map;listEdges(){return Array.from(this._edges)}listParentEdges(t){return Array.from(this._childEdges.get(t)||this._emptySet)}listParents(t){let e=new Set;for(let a of this.listParentEdges(t))e.add(a.getParent());return Array.from(e)}listChildEdges(t){return Array.from(this._parentEdges.get(t)||this._emptySet)}listChildren(t){let e=new Set;for(let a of this.listChildEdges(t))e.add(a.getChild());return Array.from(e)}disconnectParents(t,e){for(let a of this.listParentEdges(t))(!e||e(a.getParent()))&&a.dispose();return this}_createEdge(t,e,a,s){let r=new rt(t,e,a,s);this._edges.add(r);let n=r.getParent();this._parentEdges.has(n)||this._parentEdges.set(n,new Set),this._parentEdges.get(n).add(r);let i=r.getChild();return this._childEdges.has(i)||this._childEdges.set(i,new Set),this._childEdges.get(i).add(r),r}_destroyEdge(t){return this._edges.delete(t),this._parentEdges.get(t.getParent()).delete(t),this._childEdges.get(t.getChild()).delete(t),this}},be=class{list=[];constructor(t){if(t)for(let e of t)this.list.push(e)}add(t){this.list.push(t)}remove(t){let e=this.list.indexOf(t);e>=0&&this.list.splice(e,1)}removeChild(t){let e=[];for(let a of this.list)a.getChild()===t&&e.push(a);for(let a of e)this.remove(a);return e}listRefsByChild(t){let e=[];for(let a of this.list)a.getChild()===t&&e.push(a);return e}values(){return this.list}},ae=class{set=new Set;map=new Map;constructor(t){if(t)for(let e of t)this.add(e)}add(t){let e=t.getChild();this.removeChild(e),this.set.add(t),this.map.set(e,t)}remove(t){this.set.delete(t),this.map.delete(t.getChild())}removeChild(t){let e=this.map.get(t)||null;return e&&this.remove(e),e}getRefByChild(t){return this.map.get(t)||null}values(){return Array.from(this.set)}},de=class{map={};constructor(t){t&&Object.assign(this.map,t)}set(t,e){this.map[t]=e}delete(t){delete this.map[t]}get(t){return this.map[t]||null}keys(){return Object.keys(this.map)}values(){return Object.values(this.map)}},$=Symbol("attributes"),st=Symbol("immutableKeys"),Lr=class Kr extends Ur{_disposed=!1;graph;[$];[st];constructor(e){super(),this.graph=e,this[st]=new Set,this[$]=this._createAttributes()}getDefaults(){return{}}_createAttributes(){let e=this.getDefaults(),a={};for(let s in e){let r=e[s];if(r instanceof Kr){let n=this.graph._createEdge(s,this,r);this[st].add(s),a[s]=n}else a[s]=r}return a}isOnGraph(e){return this.graph===e.graph}isDisposed(){return this._disposed}dispose(){this._disposed||(this.graph.listChildEdges(this).forEach(e=>e.dispose()),this.graph.disconnectParents(this),this._disposed=!0,this.dispatchEvent({type:"dispose"}))}detach(){return this.graph.disconnectParents(this),this}swap(e,a){for(let s in this[$]){let r=this[$][s];if(r instanceof rt){let n=r;n.getChild()===e&&this.setRef(s,a,n.getAttributes())}else if(r instanceof be)for(let n of r.listRefsByChild(e)){let i=n.getAttributes();this.removeRef(s,e),this.addRef(s,a,i)}else if(r instanceof ae){let n=r.getRefByChild(e);if(n){let i=n.getAttributes();this.removeRef(s,e),this.addRef(s,a,i)}}else if(r instanceof de)for(let n of r.keys()){let i=r.get(n);i.getChild()===e&&this.setRefMap(s,n,a,i.getAttributes())}}return this}get(e){return this[$][e]}set(e,a){return this[$][e]=a,this.dispatchEvent({type:"change",attribute:e})}getRef(e){let a=this[$][e];return a?a.getChild():null}setRef(e,a,s){if(this[st].has(e))throw new Error(`Cannot overwrite immutable attribute, "${e}".`);let r=this[$][e];if(r&&r.dispose(),!a)return this;let n=this.graph._createEdge(e,this,a,s);return this[$][e]=n,this.dispatchEvent({type:"change",attribute:e})}listRefs(e){return this.assertRefList(e).values().map(a=>a.getChild())}addRef(e,a,s){let r=this.graph._createEdge(e,this,a,s);return this.assertRefList(e).add(r),this.dispatchEvent({type:"change",attribute:e})}removeRef(e,a){let s=this.assertRefList(e);if(s instanceof be)for(let r of s.listRefsByChild(a))r.dispose();else{let r=s.getRefByChild(a);r&&r.dispose()}return this}assertRefList(e){let a=this[$][e];if(a instanceof be||a instanceof ae)return a;throw new Error(`Expected RefList or RefSet for attribute "${e}"`)}listRefMapKeys(e){return this.assertRefMap(e).keys()}listRefMapValues(e){return this.assertRefMap(e).values().map(a=>a.getChild())}getRefMap(e,a){let s=this.assertRefMap(e).get(a);return s?s.getChild():null}setRefMap(e,a,s,r){let n=this.assertRefMap(e),i=n.get(a);if(i&&i.dispose(),!s)return this;r=Object.assign(r||{},{key:a});let o=this.graph._createEdge(e,this,s,{...r,key:a});return n.set(a,o),this.dispatchEvent({type:"change",attribute:e,key:a})}assertRefMap(e){let a=this[$][e];if(a instanceof de)return a;throw new Error(`Expected RefMap for attribute "${e}"`)}dispatchEvent(e){return super.dispatchEvent({...e,target:this}),this.graph.dispatchEvent({...e,target:this,type:`node:${e.type}`}),this}_destroyRef(e){let a=e.getName();if(this[$][a]===e)this[$][a]=null,this[st].has(a)&&e.getChild().dispose();else if(this[$][a]instanceof be)this[$][a].remove(e);else if(this[$][a]instanceof ae)this[$][a].remove(e);else if(this[$][a]instanceof de){let s=this[$][a];for(let r of s.keys())s.get(r)===e&&s.delete(r)}else return;this.graph._destroyEdge(e),this.dispatchEvent({type:"change",attribute:a})}};var Wr="v4.4.2",it="@glb.bin",_=(function(t){return t.ACCESSOR="Accessor",t.ANIMATION="Animation",t.ANIMATION_CHANNEL="AnimationChannel",t.ANIMATION_SAMPLER="AnimationSampler",t.BUFFER="Buffer",t.CAMERA="Camera",t.MATERIAL="Material",t.MESH="Mesh",t.PRIMITIVE="Primitive",t.PRIMITIVE_TARGET="PrimitiveTarget",t.NODE="Node",t.ROOT="Root",t.SCENE="Scene",t.SKIN="Skin",t.TEXTURE="Texture",t.TEXTURE_INFO="TextureInfo",t})({});var Qo=(function(t){return t.ARRAY_BUFFER="ARRAY_BUFFER",t.ELEMENT_ARRAY_BUFFER="ELEMENT_ARRAY_BUFFER",t.INVERSE_BIND_MATRICES="INVERSE_BIND_MATRICES",t.OTHER="OTHER",t.SPARSE="SPARSE",t})({}),Le=(function(t){return t[t.R=4096]="R",t[t.G=256]="G",t[t.B=16]="B",t[t.A=1]="A",t})({});var Zo=class extends Float32Array{constructor(){throw super(),new Error("Unsupported typed array instantiation.")}},Va={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5131:typeof Float16Array<"u"?Float16Array:Zo,5126:Float32Array,5130:Float64Array},z=class{static createBufferFromDataURI(t){if(typeof Buffer>"u"){let e=atob(t.split(",")[1]),a=new Uint8Array(e.length);for(let s=0;s<e.length;s++)a[s]=e.charCodeAt(s);return a}else{let e=t.split(",")[1],a=t.indexOf("base64")>=0;return Buffer.from(e,a?"base64":"utf8")}}static encodeText(t){return new TextEncoder().encode(t)}static decodeText(t){return new TextDecoder().decode(t)}static concat(t){let e=0;for(let r of t)e+=r.byteLength;let a=new Uint8Array(e),s=0;for(let r of t)a.set(r,s),s+=r.byteLength;return a}static pad(t,e=0){let a=this.padNumber(t.byteLength);if(a===t.byteLength)return t;let s=new Uint8Array(a);if(s.set(t),e!==0)for(let r=t.byteLength;r<a;r++)s[r]=e;return s}static padNumber(t){return Math.ceil(t/4)*4}static equals(t,e){if(t===e)return!0;if(t.byteLength!==e.byteLength)return!1;let a=t.byteLength;for(;a--;)if(t[a]!==e[a])return!1;return!0}static toView(t,e=0,a=1/0){return new Uint8Array(t.buffer,t.byteOffset+e,Math.min(t.byteLength,a))}static assertView(t){if(t&&!ArrayBuffer.isView(t))throw new Error(`Method requires Uint8Array parameter; received "${typeof t}".`);return t}};var ec=class{match(t){return t.length>=3&&t[0]===255&&t[1]===216&&t[2]===255}getSize(t){let e=new DataView(t.buffer,t.byteOffset+4),a,s;for(;e.byteLength;){if(a=e.getUint16(0,!1),ac(e,a),s=e.getUint8(a+1),s===192||s===193||s===194)return[e.getUint16(a+7,!1),e.getUint16(a+5,!1)];e=new DataView(t.buffer,e.byteOffset+a+2)}throw new TypeError("Invalid JPG, no size found")}getChannels(t){return 3}},tc=class Jr{static PNG_FRIED_CHUNK_NAME="CgBI";match(e){return e.length>=8&&e[0]===137&&e[1]===80&&e[2]===78&&e[3]===71&&e[4]===13&&e[5]===10&&e[6]===26&&e[7]===10}getSize(e){let a=new DataView(e.buffer,e.byteOffset);return z.decodeText(e.slice(12,16))===Jr.PNG_FRIED_CHUNK_NAME?[a.getUint32(32,!1),a.getUint32(36,!1)]:[a.getUint32(16,!1),a.getUint32(20,!1)]}getChannels(e){return 4}},qe=class{static impls={"image/jpeg":new ec,"image/png":new tc};static registerFormat(t,e){this.impls[t]=e}static getMimeType(t){for(let e in this.impls)if(this.impls[e].match(t))return e;return null}static getSize(t,e){return this.impls[e]?this.impls[e].getSize(t):null}static getChannels(t,e){return this.impls[e]?this.impls[e].getChannels(t):null}static getVRAMByteLength(t,e){if(!this.impls[e])return null;if(this.impls[e].getVRAMByteLength)return this.impls[e].getVRAMByteLength(t);let a=0,s=4,r=this.getSize(t,e);if(!r)return null;for(;r[0]>1||r[1]>1;)a+=r[0]*r[1]*s,r[0]=Math.max(Math.floor(r[0]/2),1),r[1]=Math.max(Math.floor(r[1]/2),1);return a+=1*s,a}static mimeTypeToExtension(t){return t==="image/jpeg"?"jpg":t.split("/").pop()}static extensionToMimeType(t){return t==="jpg"?"image/jpeg":t?`image/${t}`:""}};function ac(t,e){if(e>t.byteLength)throw new TypeError("Corrupt JPG, exceeded buffer limits");if(t.getUint8(e)!==255)throw new TypeError("Invalid JPG, marker table corrupted");return t}var Kt=class{static basename(t){let e=t.split(/[\\/]/).pop();return e.substring(0,e.lastIndexOf("."))}static extension(t){if(t.startsWith("data:image/")){let e=t.match(/data:(image\/\w+)/)[1];return qe.mimeTypeToExtension(e)}else{if(t.startsWith("data:model/gltf+json"))return"gltf";if(t.startsWith("data:model/gltf-binary"))return"glb";if(t.startsWith("data:application/"))return"bin"}return t.split(/[\\/]/).pop().split(/[.]/).pop()}},Ks=typeof Float32Array<"u"?Float32Array:Array;Math.PI/180;180/Math.PI;function sc(){var t=new Ks(3);return Ks!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t}function Us(t){var e=t[0],a=t[1],s=t[2];return Math.sqrt(e*e+a*a+s*s)}function rc(t,e,a){var s=e[0],r=e[1],n=e[2],i=a[3]*s+a[7]*r+a[11]*n+a[15];return i=i||1,t[0]=(a[0]*s+a[4]*r+a[8]*n+a[12])/i,t[1]=(a[1]*s+a[5]*r+a[9]*n+a[13])/i,t[2]=(a[2]*s+a[6]*r+a[10]*n+a[14])/i,t}(function(){var t=sc();return function(e,a,s,r,n,i){var o,c;for(a||(a=3),s||(s=0),r?c=Math.min(r*a+s,e.length):c=e.length,o=s;o<c;o+=a)t[0]=e[o],t[1]=e[o+1],t[2]=e[o+2],n(t,t,i),e[o]=t[0],e[o+1]=t[1],e[o+2]=t[2];return e}})();function Yr(t){let e=$r(),a=t.propertyType==="Node"?[t]:t.listChildren();for(let s of a)s.traverse(r=>{let n=r.getMesh();if(!n)return;let i=nc(n,r.getWorldMatrix());i.min.every(isFinite)&&i.max.every(isFinite)&&(Gs(i.min,e),Gs(i.max,e))});return e}function nc(t,e){let a=$r();for(let s of t.listPrimitives()){let r=s.getAttribute("POSITION"),n=s.getIndices();if(!r)continue;let i=[0,0,0],o=[0,0,0];for(let c=0,d=n?n.getCount():r.getCount();c<d;c++){let f=n?n.getScalar(c):c;i=r.getElement(f,i),o=rc(o,i,e),Gs(o,a)}}return a}function Gs(t,e){for(let a=0;a<3;a++)e.min[a]=Math.min(t[a],e.min[a]),e.max[a]=Math.max(t[a],e.max[a])}function $r(){return{min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]}}var Gr="https://null.example",Ls=class{static DEFAULT_INIT={};static PROTOCOL_REGEXP=/^[a-zA-Z]+:\/\//;static dirname(t){let e=t.lastIndexOf("/");return e===-1?"./":t.substring(0,e+1)}static basename(t){return Kt.basename(new URL(t,Gr).pathname)}static extension(t){return Kt.extension(new URL(t,Gr).pathname)}static resolve(t,e){if(!this.isRelativePath(e))return e;let a=t.split("/"),s=e.split("/");a.pop();for(let r=0;r<s.length;r++)s[r]!=="."&&(s[r]===".."?a.pop():a.push(s[r]));return a.join("/")}static isAbsoluteURL(t){return this.PROTOCOL_REGEXP.test(t)}static isRelativePath(t){return!/^(?:[a-zA-Z]+:)?\//.test(t)}};function zr(t){return Object.prototype.toString.call(t)==="[object Object]"}function St(t){if(zr(t)===!1)return!1;let e=t.constructor;if(e===void 0)return!0;let a=e.prototype;return!(zr(a)===!1||Object.hasOwn(a,"isPrototypeOf")===!1)}var ic=(function(t){return t[t.SILENT=4]="SILENT",t[t.ERROR=3]="ERROR",t[t.WARN=2]="WARN",t[t.INFO=1]="INFO",t[t.DEBUG=0]="DEBUG",t})({}),Ha=class Qr{verbosity;static Verbosity=ic;static DEFAULT_INSTANCE=new Qr(1);constructor(e){this.verbosity=e}debug(e){this.verbosity<=0&&console.debug(e)}info(e){this.verbosity<=1&&console.info(e)}warn(e){this.verbosity<=2&&console.warn(e)}error(e){this.verbosity<=3&&console.error(e)}};function oc(t){var e=t[0],a=t[1],s=t[2],r=t[3],n=t[4],i=t[5],o=t[6],c=t[7],d=t[8],f=t[9],p=t[10],v=t[11],x=t[12],b=t[13],l=t[14],m=t[15],u=e*i-a*n,g=e*o-s*n,y=a*o-s*i,w=d*b-f*x,T=d*l-p*x,I=f*l-p*b,M=e*I-a*T+s*w,R=n*I-i*T+o*w,S=d*y-f*g+p*u,N=x*y-b*g+l*u;return c*M-r*R+m*S-v*N}function cc(t,e,a){var s=e[0],r=e[1],n=e[2],i=e[3],o=e[4],c=e[5],d=e[6],f=e[7],p=e[8],v=e[9],x=e[10],b=e[11],l=e[12],m=e[13],u=e[14],g=e[15],y=a[0],w=a[1],T=a[2],I=a[3];return t[0]=y*s+w*o+T*p+I*l,t[1]=y*r+w*c+T*v+I*m,t[2]=y*n+w*d+T*x+I*u,t[3]=y*i+w*f+T*b+I*g,y=a[4],w=a[5],T=a[6],I=a[7],t[4]=y*s+w*o+T*p+I*l,t[5]=y*r+w*c+T*v+I*m,t[6]=y*n+w*d+T*x+I*u,t[7]=y*i+w*f+T*b+I*g,y=a[8],w=a[9],T=a[10],I=a[11],t[8]=y*s+w*o+T*p+I*l,t[9]=y*r+w*c+T*v+I*m,t[10]=y*n+w*d+T*x+I*u,t[11]=y*i+w*f+T*b+I*g,y=a[12],w=a[13],T=a[14],I=a[15],t[12]=y*s+w*o+T*p+I*l,t[13]=y*r+w*c+T*v+I*m,t[14]=y*n+w*d+T*x+I*u,t[15]=y*i+w*f+T*b+I*g,t}function lc(t,e){var a=e[0],s=e[1],r=e[2],n=e[4],i=e[5],o=e[6],c=e[8],d=e[9],f=e[10];return t[0]=Math.sqrt(a*a+s*s+r*r),t[1]=Math.sqrt(n*n+i*i+o*o),t[2]=Math.sqrt(c*c+d*d+f*f),t}function dc(t,e){var a=new Ks(3);lc(a,e);var s=1/a[0],r=1/a[1],n=1/a[2],i=e[0]*s,o=e[1]*r,c=e[2]*n,d=e[4]*s,f=e[5]*r,p=e[6]*n,v=e[8]*s,x=e[9]*r,b=e[10]*n,l=i+f+b,m=0;return l>0?(m=Math.sqrt(l+1)*2,t[3]=.25*m,t[0]=(p-x)/m,t[1]=(v-c)/m,t[2]=(o-d)/m):i>f&&i>b?(m=Math.sqrt(1+i-f-b)*2,t[3]=(p-x)/m,t[0]=.25*m,t[1]=(o+d)/m,t[2]=(v+c)/m):f>b?(m=Math.sqrt(1+f-i-b)*2,t[3]=(v-c)/m,t[0]=(o+d)/m,t[1]=.25*m,t[2]=(p+x)/m):(m=Math.sqrt(1+b-i-f)*2,t[3]=(o-d)/m,t[0]=(v+c)/m,t[1]=(p+x)/m,t[2]=.25*m),t}var re=class sa{static identity(e){return e}static eq(e,a,s=1e-5){if(e.length!==a.length)return!1;for(let r=0;r<e.length;r++)if(Math.abs(e[r]-a[r])>s)return!1;return!0}static clamp(e,a,s){return e<a?a:e>s?s:e}static decodeNormalizedInt(e,a){switch(a){case 5126:return e;case 5123:return e/65535;case 5121:return e/255;case 5122:return Math.max(e/32767,-1);case 5120:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}static encodeNormalizedInt(e,a){switch(a){case 5126:return e;case 5123:return Math.round(sa.clamp(e,0,1)*65535);case 5121:return Math.round(sa.clamp(e,0,1)*255);case 5122:return Math.round(sa.clamp(e,-1,1)*32767);case 5120:return Math.round(sa.clamp(e,-1,1)*127);default:throw new Error("Invalid component type.")}}static decompose(e,a,s,r){let n=Us([e[0],e[1],e[2]]),i=Us([e[4],e[5],e[6]]),o=Us([e[8],e[9],e[10]]);oc(e)<0&&(n=-n),a[0]=e[12],a[1]=e[13],a[2]=e[14];let c=e.slice(),d=1/n,f=1/i,p=1/o;c[0]*=d,c[1]*=d,c[2]*=d,c[4]*=f,c[5]*=f,c[6]*=f,c[8]*=p,c[9]*=p,c[10]*=p,dc(s,c),r[0]=n,r[1]=i,r[2]=o}static compose(e,a,s,r){let n=r,i=a[0],o=a[1],c=a[2],d=a[3],f=i+i,p=o+o,v=c+c,x=i*f,b=i*p,l=i*v,m=o*p,u=o*v,g=c*v,y=d*f,w=d*p,T=d*v,I=s[0],M=s[1],R=s[2];return n[0]=(1-(m+g))*I,n[1]=(b+T)*I,n[2]=(l-w)*I,n[3]=0,n[4]=(b-T)*M,n[5]=(1-(x+g))*M,n[6]=(u+y)*M,n[7]=0,n[8]=(l+w)*R,n[9]=(u-y)*R,n[10]=(1-(x+m))*R,n[11]=0,n[12]=e[0],n[13]=e[1],n[14]=e[2],n[15]=1,n}};function uc(t,e){if(!!t!=!!e)return!1;let a=t.getChild(),s=e.getChild();return a===s||a.equals(s)}function fc(t,e){if(!!t!=!!e)return!1;let a=t.values(),s=e.values();if(a.length!==s.length)return!1;for(let r=0;r<a.length;r++){let n=a[r],i=s[r];if(n.getChild()!==i.getChild()&&!n.getChild().equals(i.getChild()))return!1}return!0}function hc(t,e){if(!!t!=!!e)return!1;let a=t.keys(),s=e.keys();if(a.length!==s.length)return!1;for(let r of a){let n=t.get(r),i=e.get(r);if(!!n!=!!i)return!1;let o=n.getChild(),c=i.getChild();if(o!==c&&!o.equals(c))return!1}return!0}function Zr(t,e){if(t===e)return!0;if(!!t!=!!e||!t||!e||t.length!==e.length)return!1;for(let a=0;a<t.length;a++)if(t[a]!==e[a])return!1;return!0}function en(t,e){if(t===e)return!0;if(!!t!=!!e)return!1;if(!St(t)||!St(e))return t===e;let a=t,s=e,r=0,n=0,i;for(i in a)r++;for(i in s)n++;if(r!==n)return!1;for(i in a){let o=a[i],c=s[i];if(Ga(o)&&Ga(c)){if(!Zr(o,c))return!1}else if(St(o)&&St(c)){if(!en(o,c))return!1}else if(o!==c)return!1}return!0}function Ga(t){return Array.isArray(t)||ArrayBuffer.isView(t)}var bc="23456789abdegjkmnpqrvwxyzABDEGJKMNPQRVWXYZ",pc=999,gc=6,Vr=new Set,mc=function(){let t="";for(let e=0;e<gc;e++)t+=bc.charAt(Math.floor(Math.random()*42));return t},yc=function(){for(let t=0;t<pc;t++){let e=mc();if(!Vr.has(e))return Vr.add(e),e}return""},ot=t=>t,xc=new Set,Hs=class extends Lr{constructor(t,e=""){super(t),this[$].name=e,this.init(),this.dispatchEvent({type:"create"})}getGraph(){return this.graph}getDefaults(){return Object.assign(super.getDefaults(),{name:"",extras:{}})}set(t,e){return Array.isArray(e)&&(e=e.slice()),super.set(t,e)}getName(){return this.get("name")}setName(t){return this.set("name",t)}getExtras(){return this.get("extras")}setExtras(t){return this.set("extras",t)}clone(){let t=this.constructor;return new t(this.graph).copy(this,ot)}copy(t,e=ot){for(let a in this[$]){let s=this[$][a];if(s instanceof rt)this[st].has(a)||s.dispose();else if(s instanceof be||s instanceof ae)for(let r of s.values())r.dispose();else if(s instanceof de)for(let r of s.values())r.dispose()}for(let a in t[$]){let s=this[$][a],r=t[$][a];if(r instanceof rt)this[st].has(a)?s.getChild().copy(e(r.getChild()),e):this.setRef(a,e(r.getChild()),r.getAttributes());else if(r instanceof ae||r instanceof be)for(let n of r.values())this.addRef(a,e(n.getChild()),n.getAttributes());else if(r instanceof de)for(let n of r.keys()){let i=r.get(n);this.setRefMap(a,n,e(i.getChild()),i.getAttributes())}else St(r)?this[$][a]=JSON.parse(JSON.stringify(r)):Array.isArray(r)||r instanceof ArrayBuffer||ArrayBuffer.isView(r)?this[$][a]=r.slice():this[$][a]=r}return this}equals(t,e=xc){if(this===t)return!0;if(this.propertyType!==t.propertyType)return!1;for(let a in this[$]){if(e.has(a))continue;let s=this[$][a],r=t[$][a];if(s instanceof rt||r instanceof rt){if(!uc(s,r))return!1}else if(s instanceof ae||r instanceof ae||s instanceof be||r instanceof be){if(!fc(s,r))return!1}else if(s instanceof de||r instanceof de){if(!hc(s,r))return!1}else if(St(s)||St(r)){if(!en(s,r))return!1}else if(Ga(s)||Ga(r)){if(!Zr(s,r))return!1}else if(s!==r)return!1}return!0}detach(){return this.graph.disconnectParents(this,t=>t.propertyType!=="Root"),this}listParents(){return this.graph.listParents(this)}},we=class extends Hs{getDefaults(){return Object.assign(super.getDefaults(),{extensions:new de})}getExtension(t){return this.getRefMap("extensions",t)}setExtension(t,e){return e&&e._validateParent(this),this.setRefMap("extensions",t,e)}listExtensions(){return this.listRefMapValues("extensions")}},U=class ue extends we{static Type={SCALAR:"SCALAR",VEC2:"VEC2",VEC3:"VEC3",VEC4:"VEC4",MAT2:"MAT2",MAT3:"MAT3",MAT4:"MAT4"};static ComponentType={BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,UNSIGNED_INT:5125,FLOAT:5126,FLOAT16:5131,FLOAT64:5130};init(){this.propertyType="Accessor"}getDefaults(){return Object.assign(super.getDefaults(),{array:null,type:ue.Type.SCALAR,componentType:ue.ComponentType.FLOAT,normalized:!1,sparse:!1,buffer:null})}static getElementSize(e){switch(e){case ue.Type.SCALAR:return 1;case ue.Type.VEC2:return 2;case ue.Type.VEC3:return 3;case ue.Type.VEC4:return 4;case ue.Type.MAT2:return 4;case ue.Type.MAT3:return 9;case ue.Type.MAT4:return 16;default:throw new Error("Unexpected type: "+e)}}static getComponentSize(e){switch(e){case ue.ComponentType.BYTE:case ue.ComponentType.UNSIGNED_BYTE:return 1;case ue.ComponentType.SHORT:case ue.ComponentType.UNSIGNED_SHORT:return 2;case ue.ComponentType.UNSIGNED_INT:case ue.ComponentType.FLOAT:return 4;case ue.ComponentType.FLOAT16:return 2;case ue.ComponentType.FLOAT64:return 8;default:throw new Error("Unexpected component type: "+e)}}getMinNormalized(e){let a=this.getNormalized(),s=this.getElementSize(),r=this.getComponentType();if(this.getMin(e),a)for(let n=0;n<s;n++)e[n]=re.decodeNormalizedInt(e[n],r);return e}getMin(e){let a=this.getArray(),s=this.getCount(),r=this.getElementSize();for(let n=0;n<r;n++)e[n]=1/0;for(let n=0;n<s*r;n+=r)for(let i=0;i<r;i++){let o=a[n+i];Number.isFinite(o)&&(e[i]=Math.min(e[i],o))}return e}getMaxNormalized(e){let a=this.getNormalized(),s=this.getElementSize(),r=this.getComponentType();if(this.getMax(e),a)for(let n=0;n<s;n++)e[n]=re.decodeNormalizedInt(e[n],r);return e}getMax(e){let a=this.get("array"),s=this.getCount(),r=this.getElementSize();for(let n=0;n<r;n++)e[n]=-1/0;for(let n=0;n<s*r;n+=r)for(let i=0;i<r;i++){let o=a[n+i];Number.isFinite(o)&&(e[i]=Math.max(e[i],o))}return e}getCount(){let e=this.get("array");return e?e.length/this.getElementSize():0}getType(){return this.get("type")}setType(e){return this.set("type",e)}getElementSize(){return ue.getElementSize(this.get("type"))}getComponentSize(){return this.get("array").BYTES_PER_ELEMENT}getComponentType(){return this.get("componentType")}getNormalized(){return this.get("normalized")}setNormalized(e){return this.set("normalized",e)}getScalar(e){let a=this.getElementSize(),s=this.getComponentType(),r=this.getArray();return this.getNormalized()?re.decodeNormalizedInt(r[e*a],s):r[e*a]}setScalar(e,a){let s=this.getElementSize(),r=this.getComponentType(),n=this.getArray();return this.getNormalized()?n[e*s]=re.encodeNormalizedInt(a,r):n[e*s]=a,this}getElement(e,a){let s=this.getNormalized(),r=this.getElementSize(),n=this.getComponentType(),i=this.getArray();for(let o=0;o<r;o++)s?a[o]=re.decodeNormalizedInt(i[e*r+o],n):a[o]=i[e*r+o];return a}setElement(e,a){let s=this.getNormalized(),r=this.getElementSize(),n=this.getComponentType(),i=this.getArray();for(let o=0;o<r;o++)s?i[e*r+o]=re.encodeNormalizedInt(a[o],n):i[e*r+o]=a[o];return this}getSparse(){return this.get("sparse")}setSparse(e){return this.set("sparse",e)}getBuffer(){return this.getRef("buffer")}setBuffer(e){return this.setRef("buffer",e)}getArray(){return this.get("array")}setArray(e){return this.set("componentType",e?vc(e):ue.ComponentType.FLOAT),this.set("array",e),this}getByteLength(){let e=this.get("array");return e?e.byteLength:0}};function vc(t){switch(t.constructor){case Float32Array:return U.ComponentType.FLOAT;case Uint32Array:return U.ComponentType.UNSIGNED_INT;case Uint16Array:return U.ComponentType.UNSIGNED_SHORT;case Uint8Array:return U.ComponentType.UNSIGNED_BYTE;case Int16Array:return U.ComponentType.SHORT;case Int8Array:return U.ComponentType.BYTE;case Float64Array:return U.ComponentType.FLOAT64}if(typeof Float16Array<"u"&&t.constructor===Float16Array)return U.ComponentType.FLOAT16;throw new Error("Unknown accessor componentType.")}var tn=class extends we{init(){this.propertyType="Animation"}getDefaults(){return Object.assign(super.getDefaults(),{channels:new ae,samplers:new ae})}addChannel(t){return this.addRef("channels",t)}removeChannel(t){return this.removeRef("channels",t)}listChannels(){return this.listRefs("channels")}addSampler(t){return this.addRef("samplers",t)}removeSampler(t){return this.removeRef("samplers",t)}listSamplers(){return this.listRefs("samplers")}},qs=class extends we{static TargetPath={TRANSLATION:"translation",ROTATION:"rotation",SCALE:"scale",WEIGHTS:"weights"};init(){this.propertyType="AnimationChannel"}getDefaults(){return Object.assign(super.getDefaults(),{targetPath:null,targetNode:null,sampler:null})}getTargetPath(){return this.get("targetPath")}setTargetPath(t){return this.set("targetPath",t)}getTargetNode(){return this.getRef("targetNode")}setTargetNode(t){return this.setRef("targetNode",t)}getSampler(){return this.getRef("sampler")}setSampler(t){return this.setRef("sampler",t)}},qa=class an extends we{static Interpolation={LINEAR:"LINEAR",STEP:"STEP",CUBICSPLINE:"CUBICSPLINE"};init(){this.propertyType="AnimationSampler"}getDefaultAttributes(){return Object.assign(super.getDefaults(),{interpolation:an.Interpolation.LINEAR,input:null,output:null})}getInterpolation(){return this.get("interpolation")}setInterpolation(e){return this.set("interpolation",e)}getInput(){return this.getRef("input")}setInput(e){return this.setRef("input",e,{usage:"OTHER"})}getOutput(){return this.getRef("output")}setOutput(e){return this.setRef("output",e,{usage:"OTHER"})}},sn=class extends we{init(){this.propertyType="Buffer"}getDefaults(){return Object.assign(super.getDefaults(),{uri:""})}getURI(){return this.get("uri")}setURI(t){return this.set("uri",t)}},Xa=class rn extends we{static Type={PERSPECTIVE:"perspective",ORTHOGRAPHIC:"orthographic"};init(){this.propertyType="Camera"}getDefaults(){return Object.assign(super.getDefaults(),{type:rn.Type.PERSPECTIVE,znear:.1,zfar:100,aspectRatio:null,yfov:Math.PI*2*50/360,xmag:1,ymag:1})}getType(){return this.get("type")}setType(e){return this.set("type",e)}getZNear(){return this.get("znear")}setZNear(e){return this.set("znear",e)}getZFar(){return this.get("zfar")}setZFar(e){return this.set("zfar",e)}getAspectRatio(){return this.get("aspectRatio")}setAspectRatio(e){return this.set("aspectRatio",e)}getYFov(){return this.get("yfov")}setYFov(e){return this.set("yfov",e)}getXMag(){return this.get("xmag")}setXMag(e){return this.set("xmag",e)}getYMag(){return this.get("ymag")}setYMag(e){return this.set("ymag",e)}},q=class extends Hs{static EXTENSION_NAME;_validateParent(t){if(!this.parentTypes.includes(t.propertyType))throw new Error(`Parent "${t.propertyType}" invalid for child "${this.propertyType}".`)}},se=class zs extends we{static WrapMode={CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,REPEAT:10497};static MagFilter={NEAREST:9728,LINEAR:9729};static MinFilter={NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987};init(){this.propertyType="TextureInfo"}getDefaults(){return Object.assign(super.getDefaults(),{texCoord:0,magFilter:null,minFilter:null,wrapS:zs.WrapMode.REPEAT,wrapT:zs.WrapMode.REPEAT})}getTexCoord(){return this.get("texCoord")}setTexCoord(e){return this.set("texCoord",e)}getMagFilter(){return this.get("magFilter")}setMagFilter(e){return this.set("magFilter",e)}getMinFilter(){return this.get("minFilter")}setMinFilter(e){return this.set("minFilter",e)}getWrapS(){return this.get("wrapS")}setWrapS(e){return this.set("wrapS",e)}getWrapT(){return this.get("wrapT")}setWrapT(e){return this.set("wrapT",e)}},{R:Pa,G:Da,B:Ua,A:wc}=Le,za=class nn extends we{static AlphaMode={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};init(){this.propertyType="Material"}getDefaults(){return Object.assign(super.getDefaults(),{alphaMode:nn.AlphaMode.OPAQUE,alphaCutoff:.5,doubleSided:!1,baseColorFactor:[1,1,1,1],baseColorTexture:null,baseColorTextureInfo:new se(this.graph,"baseColorTextureInfo"),emissiveFactor:[0,0,0],emissiveTexture:null,emissiveTextureInfo:new se(this.graph,"emissiveTextureInfo"),normalScale:1,normalTexture:null,normalTextureInfo:new se(this.graph,"normalTextureInfo"),occlusionStrength:1,occlusionTexture:null,occlusionTextureInfo:new se(this.graph,"occlusionTextureInfo"),roughnessFactor:1,metallicFactor:1,metallicRoughnessTexture:null,metallicRoughnessTextureInfo:new se(this.graph,"metallicRoughnessTextureInfo")})}getDoubleSided(){return this.get("doubleSided")}setDoubleSided(e){return this.set("doubleSided",e)}getAlpha(){return this.get("baseColorFactor")[3]}setAlpha(e){let a=this.get("baseColorFactor").slice();return a[3]=e,this.set("baseColorFactor",a)}getAlphaMode(){return this.get("alphaMode")}setAlphaMode(e){return this.set("alphaMode",e)}getAlphaCutoff(){return this.get("alphaCutoff")}setAlphaCutoff(e){return this.set("alphaCutoff",e)}getBaseColorFactor(){return this.get("baseColorFactor")}setBaseColorFactor(e){return this.set("baseColorFactor",e)}getBaseColorTexture(){return this.getRef("baseColorTexture")}getBaseColorTextureInfo(){return this.getRef("baseColorTexture")?this.getRef("baseColorTextureInfo"):null}setBaseColorTexture(e){return this.setRef("baseColorTexture",e,{channels:Pa|Da|Ua|wc,isColor:!0})}getEmissiveFactor(){return this.get("emissiveFactor")}setEmissiveFactor(e){return this.set("emissiveFactor",e)}getEmissiveTexture(){return this.getRef("emissiveTexture")}getEmissiveTextureInfo(){return this.getRef("emissiveTexture")?this.getRef("emissiveTextureInfo"):null}setEmissiveTexture(e){return this.setRef("emissiveTexture",e,{channels:Pa|Da|Ua,isColor:!0})}getNormalScale(){return this.get("normalScale")}setNormalScale(e){return this.set("normalScale",e)}getNormalTexture(){return this.getRef("normalTexture")}getNormalTextureInfo(){return this.getRef("normalTexture")?this.getRef("normalTextureInfo"):null}setNormalTexture(e){return this.setRef("normalTexture",e,{channels:Pa|Da|Ua})}getOcclusionStrength(){return this.get("occlusionStrength")}setOcclusionStrength(e){return this.set("occlusionStrength",e)}getOcclusionTexture(){return this.getRef("occlusionTexture")}getOcclusionTextureInfo(){return this.getRef("occlusionTexture")?this.getRef("occlusionTextureInfo"):null}setOcclusionTexture(e){return this.setRef("occlusionTexture",e,{channels:Pa})}getRoughnessFactor(){return this.get("roughnessFactor")}setRoughnessFactor(e){return this.set("roughnessFactor",e)}getMetallicFactor(){return this.get("metallicFactor")}setMetallicFactor(e){return this.set("metallicFactor",e)}getMetallicRoughnessTexture(){return this.getRef("metallicRoughnessTexture")}getMetallicRoughnessTextureInfo(){return this.getRef("metallicRoughnessTexture")?this.getRef("metallicRoughnessTextureInfo"):null}setMetallicRoughnessTexture(e){return this.setRef("metallicRoughnessTexture",e,{channels:Da|Ua})}},on=class extends we{init(){this.propertyType="Mesh"}getDefaults(){return Object.assign(super.getDefaults(),{weights:[],primitives:new ae})}addPrimitive(t){return this.addRef("primitives",t)}removePrimitive(t){return this.removeRef("primitives",t)}listPrimitives(){return this.listRefs("primitives")}getWeights(){return this.get("weights")}setWeights(t){return this.set("weights",t)}},cn=class extends we{init(){this.propertyType="Node"}getDefaults(){return Object.assign(super.getDefaults(),{translation:[0,0,0],rotation:[0,0,0,1],scale:[1,1,1],weights:[],camera:null,mesh:null,skin:null,children:new ae})}copy(t,e=ot){if(e===ot)throw new Error("Node cannot be copied.");return super.copy(t,e)}getTranslation(){return this.get("translation")}getRotation(){return this.get("rotation")}getScale(){return this.get("scale")}setTranslation(t){return this.set("translation",t)}setRotation(t){return this.set("rotation",t)}setScale(t){return this.set("scale",t)}getMatrix(){return re.compose(this.get("translation"),this.get("rotation"),this.get("scale"),[])}setMatrix(t){let e=this.get("translation").slice(),a=this.get("rotation").slice(),s=this.get("scale").slice();return re.decompose(t,e,a,s),this.set("translation",e).set("rotation",a).set("scale",s)}getWorldTranslation(){let t=[0,0,0];return re.decompose(this.getWorldMatrix(),t,[0,0,0,1],[1,1,1]),t}getWorldRotation(){let t=[0,0,0,1];return re.decompose(this.getWorldMatrix(),[0,0,0],t,[1,1,1]),t}getWorldScale(){let t=[1,1,1];return re.decompose(this.getWorldMatrix(),[0,0,0],[0,0,0,1],t),t}getWorldMatrix(){let t=[];for(let s=this;s!=null;s=s.getParentNode())t.push(s);let e,a=t.pop().getMatrix();for(;e=t.pop();)cc(a,a,e.getMatrix());return a}addChild(t){let e=t.getParentNode();e&&e.removeChild(t);for(let a of t.listParents())a.propertyType==="Scene"&&a.removeChild(t);return this.addRef("children",t)}removeChild(t){return this.removeRef("children",t)}listChildren(){return this.listRefs("children")}getParentNode(){for(let t of this.listParents())if(t.propertyType==="Node")return t;return null}getMesh(){return this.getRef("mesh")}setMesh(t){return this.setRef("mesh",t)}getCamera(){return this.getRef("camera")}setCamera(t){return this.setRef("camera",t)}getSkin(){return this.getRef("skin")}setSkin(t){return this.setRef("skin",t)}getWeights(){return this.get("weights")}setWeights(t){return this.set("weights",t)}traverse(t){t(this);for(let e of this.listChildren())e.traverse(t);return this}},ra=class ln extends we{static Mode={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6};init(){this.propertyType="Primitive"}getDefaults(){return Object.assign(super.getDefaults(),{mode:ln.Mode.TRIANGLES,material:null,indices:null,attributes:new de,targets:new ae})}getIndices(){return this.getRef("indices")}setIndices(e){return this.setRef("indices",e,{usage:"ELEMENT_ARRAY_BUFFER"})}getAttribute(e){return this.getRefMap("attributes",e)}setAttribute(e,a){return this.setRefMap("attributes",e,a,{usage:"ARRAY_BUFFER"})}listAttributes(){return this.listRefMapValues("attributes")}listSemantics(){return this.listRefMapKeys("attributes")}getMaterial(){return this.getRef("material")}setMaterial(e){return this.setRef("material",e)}getMode(){return this.get("mode")}setMode(e){return this.set("mode",e)}listTargets(){return this.listRefs("targets")}addTarget(e){return this.addRef("targets",e)}removeTarget(e){return this.removeRef("targets",e)}},Tc=class extends Hs{init(){this.propertyType="PrimitiveTarget"}getDefaults(){return Object.assign(super.getDefaults(),{attributes:new de})}getAttribute(t){return this.getRefMap("attributes",t)}setAttribute(t,e){return this.setRefMap("attributes",t,e,{usage:"ARRAY_BUFFER"})}listAttributes(){return this.listRefMapValues("attributes")}listSemantics(){return this.listRefMapKeys("attributes")}},dn=class extends we{init(){this.propertyType="Scene"}getDefaults(){return Object.assign(super.getDefaults(),{children:new ae})}copy(t,e=ot){if(e===ot)throw new Error("Scene cannot be copied.");return super.copy(t,e)}addChild(t){let e=t.getParentNode();return e&&e.removeChild(t),this.addRef("children",t)}removeChild(t){return this.removeRef("children",t)}listChildren(){return this.listRefs("children")}traverse(t){for(let e of this.listChildren())e.traverse(t);return this}},un=class extends we{init(){this.propertyType="Skin"}getDefaults(){return Object.assign(super.getDefaults(),{skeleton:null,inverseBindMatrices:null,joints:new ae})}getSkeleton(){return this.getRef("skeleton")}setSkeleton(t){return this.setRef("skeleton",t)}getInverseBindMatrices(){return this.getRef("inverseBindMatrices")}setInverseBindMatrices(t){return this.setRef("inverseBindMatrices",t,{usage:"INVERSE_BIND_MATRICES"})}addJoint(t){return this.addRef("joints",t)}removeJoint(t){return this.removeRef("joints",t)}listJoints(){return this.listRefs("joints")}},fn=class extends we{init(){this.propertyType="Texture"}getDefaults(){return Object.assign(super.getDefaults(),{image:null,mimeType:"",uri:""})}getMimeType(){return this.get("mimeType")||qe.extensionToMimeType(Kt.extension(this.get("uri")))}setMimeType(t){return this.set("mimeType",t)}getURI(){return this.get("uri")}setURI(t){this.set("uri",t);let e=qe.extensionToMimeType(Kt.extension(t));return e&&this.set("mimeType",e),this}getImage(){return this.get("image")}setImage(t){return this.set("image",z.assertView(t))}getSize(){let t=this.get("image");return t?qe.getSize(t,this.getMimeType()):null}},Xs=class extends we{_extensions=new Set;init(){this.propertyType="Root"}getDefaults(){return Object.assign(super.getDefaults(),{asset:{generator:`glTF-Transform ${Wr}`,version:"2.0"},defaultScene:null,accessors:new ae,animations:new ae,buffers:new ae,cameras:new ae,materials:new ae,meshes:new ae,nodes:new ae,scenes:new ae,skins:new ae,textures:new ae})}constructor(t){super(t),t.addEventListener("node:create",e=>{this._addChildOfRoot(e.target)})}clone(){throw new Error("Root cannot be cloned.")}copy(t,e=ot){if(e===ot)throw new Error("Root cannot be copied.");this.set("asset",{...t.get("asset")}),this.setName(t.getName()),this.setExtras({...t.getExtras()}),this.setDefaultScene(t.getDefaultScene()?e(t.getDefaultScene()):null);for(let a of t.listRefMapKeys("extensions")){let s=t.getExtension(a);this.setExtension(a,e(s))}return this}_addChildOfRoot(t){return t instanceof dn?this.addRef("scenes",t):t instanceof cn?this.addRef("nodes",t):t instanceof Xa?this.addRef("cameras",t):t instanceof un?this.addRef("skins",t):t instanceof on?this.addRef("meshes",t):t instanceof za?this.addRef("materials",t):t instanceof fn?this.addRef("textures",t):t instanceof tn?this.addRef("animations",t):t instanceof U?this.addRef("accessors",t):t instanceof sn&&this.addRef("buffers",t),this}getAsset(){return this.get("asset")}listExtensionsUsed(){return Array.from(this._extensions)}listExtensionsRequired(){return this.listExtensionsUsed().filter(t=>t.isRequired())}_enableExtension(t){return this._extensions.add(t),this}_disableExtension(t){return this._extensions.delete(t),this}listScenes(){return this.listRefs("scenes")}setDefaultScene(t){return this.setRef("defaultScene",t)}getDefaultScene(){return this.getRef("defaultScene")}listNodes(){return this.listRefs("nodes")}listCameras(){return this.listRefs("cameras")}listSkins(){return this.listRefs("skins")}listMeshes(){return this.listRefs("meshes")}listMaterials(){return this.listRefs("materials")}listTextures(){return this.listRefs("textures")}listAnimations(){return this.listRefs("animations")}listAccessors(){return this.listRefs("accessors")}listBuffers(){return this.listRefs("buffers")}},Ec=class Vs{_graph=new Ds;_root=new Xs(this._graph);_logger=Ha.DEFAULT_INSTANCE;static _GRAPH_DOCUMENTS=new WeakMap;static fromGraph(e){return Vs._GRAPH_DOCUMENTS.get(e)||null}constructor(){Vs._GRAPH_DOCUMENTS.set(this._graph,this)}getRoot(){return this._root}getGraph(){return this._graph}getLogger(){return this._logger}setLogger(e){return this._logger=e,this}clone(){throw new Error("Use 'cloneDocument(source)' from '@gltf-transform/functions'.")}merge(e){throw new Error("Use 'mergeDocuments(target, source)' from '@gltf-transform/functions'.")}async transform(...e){let a=e.map(s=>s.name);for(let s of e)await s(this,{stack:a});return this}hasExtension(e){return this.getRoot().listExtensionsUsed().some(a=>a.extensionName===e)}createExtension(e){let a=e.EXTENSION_NAME;return this.getRoot().listExtensionsUsed().find(s=>s.extensionName===a)||new e(this)}disposeExtension(e){let a=this.getRoot().listExtensionsUsed().find(s=>s.extensionName===e);a&&a.dispose()}createScene(e=""){return new dn(this._graph,e)}createNode(e=""){return new cn(this._graph,e)}createCamera(e=""){return new Xa(this._graph,e)}createSkin(e=""){return new un(this._graph,e)}createMesh(e=""){return new on(this._graph,e)}createPrimitive(){return new ra(this._graph)}createPrimitiveTarget(e=""){return new Tc(this._graph,e)}createMaterial(e=""){return new za(this._graph,e)}createTexture(e=""){return new fn(this._graph,e)}createAnimation(e=""){return new tn(this._graph,e)}createAnimationChannel(e=""){return new qs(this._graph,e)}createAnimationSampler(e=""){return new qa(this._graph,e)}createAccessor(e="",a=null){return a||(a=this.getRoot().listBuffers()[0]),new U(this._graph,e).setBuffer(a)}createBuffer(e=""){return new sn(this._graph,e)}},ee=class{static EXTENSION_NAME;extensionName="";prereadTypes=[];prewriteTypes=[];readDependencies=[];writeDependencies=[];document;required=!1;properties=new Set;_listener;constructor(t){this.document=t,t.getRoot()._enableExtension(this),this._listener=a=>{let s=a,r=s.target;r instanceof q&&r.extensionName===this.extensionName&&(s.type==="node:create"&&this._addExtensionProperty(r),s.type==="node:dispose"&&this._removeExtensionProperty(r))};let e=t.getGraph();e.addEventListener("node:create",this._listener),e.addEventListener("node:dispose",this._listener)}dispose(){this.document.getRoot()._disableExtension(this);let t=this.document.getGraph();t.removeEventListener("node:create",this._listener),t.removeEventListener("node:dispose",this._listener);for(let e of this.properties)e.dispose()}static register(){}isRequired(){return this.required}setRequired(t){return this.required=t,this}listProperties(){return Array.from(this.properties)}_addExtensionProperty(t){return this.properties.add(t),this}_removeExtensionProperty(t){return this.properties.delete(t),this}install(t,e){return this}preread(t,e){return this}prewrite(t,e){return this}},kc=class{jsonDoc;buffers=[];bufferViews=[];bufferViewBuffers=[];accessors=[];textures=[];textureInfos=new Map;materials=[];meshes=[];cameras=[];nodes=[];skins=[];animations=[];scenes=[];constructor(t){this.jsonDoc=t}setTextureInfo(t,e){this.textureInfos.set(t,e),e.texCoord!==void 0&&t.setTexCoord(e.texCoord),e.extras!==void 0&&t.setExtras(e.extras);let a=this.jsonDoc.json.textures[e.index];if(a.sampler===void 0)return;let s=this.jsonDoc.json.samplers[a.sampler];s.magFilter!==void 0&&t.setMagFilter(s.magFilter),s.minFilter!==void 0&&t.setMinFilter(s.minFilter),s.wrapS!==void 0&&t.setWrapS(s.wrapS),s.wrapT!==void 0&&t.setWrapT(s.wrapT)}},Hr={logger:Ha.DEFAULT_INSTANCE,extensions:[],dependencies:{}},Ic=new Set(["Buffer","Texture","Material","Mesh","Primitive","Node","Scene"]),Mc=class{static read(t,e=Hr){let a={...Hr,...e},{json:s}=t,r=new Ec().setLogger(a.logger);this.validate(t,a);let n=new kc(t),i=s.asset,o=r.getRoot().getAsset();i.copyright&&(o.copyright=i.copyright),i.extras&&(o.extras=i.extras),s.extras!==void 0&&r.getRoot().setExtras({...s.extras});let c=s.extensionsUsed||[],d=s.extensionsRequired||[];a.extensions.sort((u,g)=>u.EXTENSION_NAME>g.EXTENSION_NAME?1:-1);for(let u of a.extensions)if(c.includes(u.EXTENSION_NAME)){let g=r.createExtension(u).setRequired(d.includes(u.EXTENSION_NAME)),y=g.prereadTypes.filter(w=>!Ic.has(w));y.length&&a.logger.warn(`Preread hooks for some types (${y.join()}), requested by extension ${g.extensionName}, are unsupported. Please file an issue or a PR.`);for(let w of g.readDependencies)g.install(w,a.dependencies[w])}let f=s.buffers||[];r.getRoot().listExtensionsUsed().filter(u=>u.prereadTypes.includes("Buffer")).forEach(u=>u.preread(n,"Buffer")),n.buffers=f.map(u=>{let g=r.createBuffer(u.name);return u.extras&&g.setExtras(u.extras),u.uri&&u.uri.indexOf("__")!==0&&g.setURI(u.uri),g}),n.bufferViewBuffers=(s.bufferViews||[]).map((u,g)=>{if(!n.bufferViews[g]){let y=t.json.buffers[u.buffer],w=y.uri?t.resources[y.uri]:t.resources[it],T=u.byteOffset||0;n.bufferViews[g]=z.toView(w,T,u.byteLength)}return n.buffers[u.buffer]});let p=s.accessors||[];n.accessors=p.map(u=>{let g=n.bufferViewBuffers[u.bufferView],y=r.createAccessor(u.name,g).setType(u.type);return u.extras&&y.setExtras(u.extras),u.normalized!==void 0&&y.setNormalized(u.normalized),u.bufferView===void 0||y.setArray(Ka(u,n)),y});let v=s.images||[],x=s.textures||[];r.getRoot().listExtensionsUsed().filter(u=>u.prereadTypes.includes("Texture")).forEach(u=>u.preread(n,"Texture")),n.textures=v.map(u=>{let g=r.createTexture(u.name);if(u.extras&&g.setExtras(u.extras),u.bufferView!==void 0){let y=s.bufferViews[u.bufferView],w=t.json.buffers[y.buffer],T=w.uri?t.resources[w.uri]:t.resources[it],I=y.byteOffset||0,M=y.byteLength,R=T.slice(I,I+M);g.setImage(R)}else u.uri!==void 0&&(g.setImage(t.resources[u.uri]),u.uri.indexOf("__")!==0&&g.setURI(u.uri));if(u.mimeType!==void 0)g.setMimeType(u.mimeType);else if(u.uri){let y=Kt.extension(u.uri);g.setMimeType(qe.extensionToMimeType(y))}return g}),r.getRoot().listExtensionsUsed().filter(u=>u.prereadTypes.includes("Material")).forEach(u=>u.preread(n,"Material")),n.materials=(s.materials||[]).map(u=>{let g=r.createMaterial(u.name);u.extras&&g.setExtras(u.extras),u.alphaMode!==void 0&&g.setAlphaMode(u.alphaMode),u.alphaCutoff!==void 0&&g.setAlphaCutoff(u.alphaCutoff),u.doubleSided!==void 0&&g.setDoubleSided(u.doubleSided);let y=u.pbrMetallicRoughness||{};if(y.baseColorFactor!==void 0&&g.setBaseColorFactor(y.baseColorFactor),u.emissiveFactor!==void 0&&g.setEmissiveFactor(u.emissiveFactor),y.metallicFactor!==void 0&&g.setMetallicFactor(y.metallicFactor),y.roughnessFactor!==void 0&&g.setRoughnessFactor(y.roughnessFactor),y.baseColorTexture!==void 0){let w=y.baseColorTexture,T=n.textures[x[w.index].source];g.setBaseColorTexture(T),n.setTextureInfo(g.getBaseColorTextureInfo(),w)}if(u.emissiveTexture!==void 0){let w=u.emissiveTexture,T=n.textures[x[w.index].source];g.setEmissiveTexture(T),n.setTextureInfo(g.getEmissiveTextureInfo(),w)}if(u.normalTexture!==void 0){let w=u.normalTexture,T=n.textures[x[w.index].source];g.setNormalTexture(T),n.setTextureInfo(g.getNormalTextureInfo(),w),u.normalTexture.scale!==void 0&&g.setNormalScale(u.normalTexture.scale)}if(u.occlusionTexture!==void 0){let w=u.occlusionTexture,T=n.textures[x[w.index].source];g.setOcclusionTexture(T),n.setTextureInfo(g.getOcclusionTextureInfo(),w),u.occlusionTexture.strength!==void 0&&g.setOcclusionStrength(u.occlusionTexture.strength)}if(y.metallicRoughnessTexture!==void 0){let w=y.metallicRoughnessTexture,T=n.textures[x[w.index].source];g.setMetallicRoughnessTexture(T),n.setTextureInfo(g.getMetallicRoughnessTextureInfo(),w)}return g}),r.getRoot().listExtensionsUsed().filter(u=>u.prereadTypes.includes("Mesh")).forEach(u=>u.preread(n,"Mesh"));let b=s.meshes||[];r.getRoot().listExtensionsUsed().filter(u=>u.prereadTypes.includes("Primitive")).forEach(u=>u.preread(n,"Primitive")),n.meshes=b.map(u=>{let g=r.createMesh(u.name);return u.extras&&g.setExtras(u.extras),u.weights!==void 0&&g.setWeights(u.weights),(u.primitives||[]).forEach(y=>{let w=r.createPrimitive();y.extras&&w.setExtras(y.extras),y.material!==void 0&&w.setMaterial(n.materials[y.material]),y.mode!==void 0&&w.setMode(y.mode);for(let[I,M]of Object.entries(y.attributes||{}))w.setAttribute(I,n.accessors[M]);y.indices!==void 0&&w.setIndices(n.accessors[y.indices]);let T=u.extras&&u.extras.targetNames||[];(y.targets||[]).forEach((I,M)=>{let R=T[M]||M.toString(),S=r.createPrimitiveTarget(R);for(let[N,B]of Object.entries(I))S.setAttribute(N,n.accessors[B]);w.addTarget(S)}),g.addPrimitive(w)}),g}),n.cameras=(s.cameras||[]).map(u=>{let g=r.createCamera(u.name).setType(u.type);if(u.extras&&g.setExtras(u.extras),u.type===Xa.Type.PERSPECTIVE){let y=u.perspective;g.setYFov(y.yfov),g.setZNear(y.znear),y.zfar!==void 0&&g.setZFar(y.zfar),y.aspectRatio!==void 0&&g.setAspectRatio(y.aspectRatio)}else{let y=u.orthographic;g.setZNear(y.znear).setZFar(y.zfar).setXMag(y.xmag).setYMag(y.ymag)}return g});let l=s.nodes||[];r.getRoot().listExtensionsUsed().filter(u=>u.prereadTypes.includes("Node")).forEach(u=>u.preread(n,"Node")),n.nodes=l.map(u=>{let g=r.createNode(u.name);if(u.extras&&g.setExtras(u.extras),u.translation!==void 0&&g.setTranslation(u.translation),u.rotation!==void 0&&g.setRotation(u.rotation),u.scale!==void 0&&g.setScale(u.scale),u.matrix!==void 0){let y=[0,0,0],w=[0,0,0,1],T=[1,1,1];re.decompose(u.matrix,y,w,T),g.setTranslation(y),g.setRotation(w),g.setScale(T)}return u.weights!==void 0&&g.setWeights(u.weights),g}),n.skins=(s.skins||[]).map(u=>{let g=r.createSkin(u.name);u.extras&&g.setExtras(u.extras),u.inverseBindMatrices!==void 0&&g.setInverseBindMatrices(n.accessors[u.inverseBindMatrices]),u.skeleton!==void 0&&g.setSkeleton(n.nodes[u.skeleton]);for(let y of u.joints)g.addJoint(n.nodes[y]);return g}),l.map((u,g)=>{let y=n.nodes[g];(u.children||[]).forEach(w=>y.addChild(n.nodes[w])),u.mesh!==void 0&&y.setMesh(n.meshes[u.mesh]),u.camera!==void 0&&y.setCamera(n.cameras[u.camera]),u.skin!==void 0&&y.setSkin(n.skins[u.skin])}),n.animations=(s.animations||[]).map(u=>{let g=r.createAnimation(u.name);u.extras&&g.setExtras(u.extras);let y=(u.samplers||[]).map(w=>{let T=r.createAnimationSampler().setInput(n.accessors[w.input]).setOutput(n.accessors[w.output]).setInterpolation(w.interpolation||qa.Interpolation.LINEAR);return w.extras&&T.setExtras(w.extras),g.addSampler(T),T});return(u.channels||[]).forEach(w=>{let T=r.createAnimationChannel().setSampler(y[w.sampler]).setTargetPath(w.target.path);w.target.node!==void 0&&T.setTargetNode(n.nodes[w.target.node]),w.extras&&T.setExtras(w.extras),g.addChannel(T)}),g});let m=s.scenes||[];return r.getRoot().listExtensionsUsed().filter(u=>u.prereadTypes.includes("Scene")).forEach(u=>u.preread(n,"Scene")),n.scenes=m.map(u=>{let g=r.createScene(u.name);return u.extras&&g.setExtras(u.extras),(u.nodes||[]).map(y=>n.nodes[y]).forEach(y=>g.addChild(y)),g}),s.scene!==void 0&&r.getRoot().setDefaultScene(n.scenes[s.scene]),r.getRoot().listExtensionsUsed().forEach(u=>u.read(n)),p.forEach((u,g)=>{let y=n.accessors[g],w=!!u.sparse,T=!u.bufferView&&!y.getArray();(w||T)&&y.setSparse(!0).setArray(Sc(u,n))}),r}static validate(t,e){let a=t.json;if(a.asset.version!=="2.0")throw new Error(`Unsupported glTF version, "${a.asset.version}".`);if(a.extensionsRequired){for(let s of a.extensionsRequired)if(!e.extensions.find(r=>r.EXTENSION_NAME===s))throw new Error(`Missing required extension, "${s}".`)}if(a.extensionsUsed)for(let s of a.extensionsUsed)e.extensions.find(r=>r.EXTENSION_NAME===s)||e.logger.warn(`Missing optional extension, "${s}".`)}};function Rc(t,e){let a=e.jsonDoc,s=e.bufferViews[t.bufferView],r=a.json.bufferViews[t.bufferView],n=Va[t.componentType],i=U.getElementSize(t.type),o=n.BYTES_PER_ELEMENT,c=t.byteOffset||0,d=new n(t.count*i),f=new DataView(s.buffer,s.byteOffset,s.byteLength),p=r.byteStride;for(let v=0;v<t.count;v++)for(let x=0;x<i;x++){let b=c+v*p+x*o,l;switch(t.componentType){case U.ComponentType.FLOAT:l=f.getFloat32(b,!0);break;case U.ComponentType.UNSIGNED_INT:l=f.getUint32(b,!0);break;case U.ComponentType.UNSIGNED_SHORT:l=f.getUint16(b,!0);break;case U.ComponentType.UNSIGNED_BYTE:l=f.getUint8(b);break;case U.ComponentType.SHORT:l=f.getInt16(b,!0);break;case U.ComponentType.BYTE:l=f.getInt8(b);break;case U.ComponentType.FLOAT16:l=f.getFloat16(b,!0);break;case U.ComponentType.FLOAT64:l=f.getFloat64(b,!0);break;default:throw new Error(`Unexpected componentType "${t.componentType}".`)}d[v*i+x]=l}return d}function Ka(t,e){let a=e.jsonDoc,s=e.bufferViews[t.bufferView],r=a.json.bufferViews[t.bufferView],n=Va[t.componentType],i=U.getElementSize(t.type),o=n.BYTES_PER_ELEMENT,c=i*o;if(r.byteStride!==void 0&&r.byteStride!==c)return Rc(t,e);let d=s.byteOffset+(t.byteOffset||0),f=t.count*i*o;return new n(s.buffer.slice(d,d+f))}function Sc(t,e){let a=Va[t.componentType],s=U.getElementSize(t.type),r;t.bufferView!==void 0?r=Ka(t,e):r=new a(t.count*s);let n=t.sparse;if(!n)return r;let i=n.count,o={...t,...n.indices,count:i,type:"SCALAR"},c={...t,...n.values,count:i},d=Ka(o,e),f=Ka(c,e);for(let p=0;p<o.count;p++)for(let v=0;v<s;v++)r[d[p]*s+v]=f[p*s+v];return r}var hn=(function(t){return t[t.ARRAY_BUFFER=34962]="ARRAY_BUFFER",t[t.ELEMENT_ARRAY_BUFFER=34963]="ELEMENT_ARRAY_BUFFER",t})(hn||{}),nt=class{_doc;jsonDoc;options;static BufferViewTarget=hn;static BufferViewUsage=Qo;static USAGE_TO_TARGET={ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963};accessorIndexMap=new Map;animationIndexMap=new Map;bufferIndexMap=new Map;cameraIndexMap=new Map;skinIndexMap=new Map;materialIndexMap=new Map;meshIndexMap=new Map;nodeIndexMap=new Map;imageIndexMap=new Map;textureDefIndexMap=new Map;textureInfoDefMap=new Map;samplerDefIndexMap=new Map;sceneIndexMap=new Map;imageBufferViews=[];otherBufferViews=new Map;otherBufferViewsIndexMap=new Map;extensionData={};bufferURIGenerator;imageURIGenerator;logger;_accessorUsageMap=new Map;accessorUsageGroupedByParent=new Set(["ARRAY_BUFFER"]);accessorParents=new Map;constructor(t,e,a){this._doc=t,this.jsonDoc=e,this.options=a;let s=t.getRoot(),r=s.listBuffers().length,n=s.listTextures().length;this.bufferURIGenerator=new qr(r>1,()=>a.basename||"buffer"),this.imageURIGenerator=new qr(n>1,i=>Ac(t,i)||a.basename||"texture"),this.logger=t.getLogger()}createTextureInfoDef(t,e){let a={magFilter:e.getMagFilter()||void 0,minFilter:e.getMinFilter()||void 0,wrapS:e.getWrapS(),wrapT:e.getWrapT()},s=JSON.stringify(a);this.samplerDefIndexMap.has(s)||(this.samplerDefIndexMap.set(s,this.jsonDoc.json.samplers.length),this.jsonDoc.json.samplers.push(a));let r={source:this.imageIndexMap.get(t),sampler:this.samplerDefIndexMap.get(s)},n=JSON.stringify(r);this.textureDefIndexMap.has(n)||(this.textureDefIndexMap.set(n,this.jsonDoc.json.textures.length),this.jsonDoc.json.textures.push(r));let i={index:this.textureDefIndexMap.get(n)};return e.getTexCoord()!==0&&(i.texCoord=e.getTexCoord()),Object.keys(e.getExtras()).length>0&&(i.extras=e.getExtras()),this.textureInfoDefMap.set(e,i),i}createPropertyDef(t){let e={};return t.getName()&&(e.name=t.getName()),Object.keys(t.getExtras()).length>0&&(e.extras=t.getExtras()),e}createAccessorDef(t){let e=this.createPropertyDef(t);return e.type=t.getType(),e.componentType=t.getComponentType(),e.count=t.getCount(),this._doc.getGraph().listParentEdges(t).some(a=>a.getName()==="attributes"&&a.getAttributes().key==="POSITION"||a.getName()==="input")&&(e.max=t.getMax([]).map(Math.fround),e.min=t.getMin([]).map(Math.fround)),t.getNormalized()&&(e.normalized=t.getNormalized()),e}createImageData(t,e,a){if(this.options.format==="GLB")this.imageBufferViews.push(e),t.bufferView=this.jsonDoc.json.bufferViews.length,this.jsonDoc.json.bufferViews.push({buffer:0,byteOffset:-1,byteLength:e.byteLength});else{let s=qe.mimeTypeToExtension(a.getMimeType());t.uri=this.imageURIGenerator.createURI(a,s),this.assignResourceURI(t.uri,e,!1)}}assignResourceURI(t,e,a){let s=this.jsonDoc.resources;if(!(t in s)){s[t]=e;return}if(e===s[t]){this.logger.warn(`Duplicate resource URI, "${t}".`);return}let r=`Resource URI "${t}" already assigned to different data.`;if(!a){this.logger.warn(r);return}throw new Error(r)}getAccessorUsage(t){let e=this._accessorUsageMap.get(t);if(e)return e;if(t.getSparse())return"SPARSE";for(let a of this._doc.getGraph().listParentEdges(t)){let{usage:s}=a.getAttributes();if(s)return s;a.getParent().propertyType!=="Root"&&this.logger.warn(`Missing attribute ".usage" on edge, "${a.getName()}".`)}return"OTHER"}addAccessorToUsageGroup(t,e){let a=this._accessorUsageMap.get(t);if(a&&a!==e)throw new Error(`Accessor with usage "${a}" cannot be reused as "${e}".`);return this._accessorUsageMap.set(t,e),this}},qr=class{multiple;basename;counter={};constructor(t,e){this.multiple=t,this.basename=e}createURI(t,e){if(t.getURI())return t.getURI();if(this.multiple){let a=this.basename(t);return this.counter[a]=this.counter[a]||1,`${a}_${this.counter[a]++}.${e}`}else return`${this.basename(t)}.${e}`}};function Ac(t,e){let a=t.getGraph().listParentEdges(e).find(s=>s.getParent()!==t.getRoot());return a?a.getName().replace(/texture$/i,""):""}var{BufferViewUsage:La}=nt,{UNSIGNED_INT:_c,UNSIGNED_SHORT:Nc,UNSIGNED_BYTE:jc}=U.ComponentType,Fc=new Set(["Accessor","Buffer","Material","Mesh"]),Bc=class{static write(t,e){let a=t.getGraph(),s=t.getRoot(),r={asset:{generator:`glTF-Transform ${Wr}`,...s.getAsset()},extras:{...s.getExtras()}},n={json:r,resources:{}},i=new nt(t,n,e),o=e.logger||Ha.DEFAULT_INSTANCE,c=new Set(e.extensions.map(l=>l.EXTENSION_NAME)),d=t.getRoot().listExtensionsUsed().filter(l=>c.has(l.extensionName)).sort((l,m)=>l.extensionName>m.extensionName?1:-1),f=t.getRoot().listExtensionsRequired().filter(l=>c.has(l.extensionName)).sort((l,m)=>l.extensionName>m.extensionName?1:-1);d.length<t.getRoot().listExtensionsUsed().length&&o.warn("Some extensions were not registered for I/O, and will not be written.");for(let l of d){let m=l.prewriteTypes.filter(u=>!Fc.has(u));m.length&&o.warn(`Prewrite hooks for some types (${m.join()}), requested by extension ${l.extensionName}, are unsupported. Please file an issue or a PR.`);for(let u of l.writeDependencies)l.install(u,e.dependencies[u])}function p(l,m,u,g){let y=[],w=0;for(let I of l){let M=i.createAccessorDef(I);M.bufferView=r.bufferViews.length;let R=I.getArray(),S=z.pad(z.toView(R));M.byteOffset=w,w+=S.byteLength,y.push(S),i.accessorIndexMap.set(I,r.accessors.length),r.accessors.push(M)}let T={buffer:m,byteOffset:u,byteLength:z.concat(y).byteLength};return g&&(T.target=g),r.bufferViews.push(T),{buffers:y,byteLength:w}}function v(l,m,u){let g=l[0].getCount(),y=0;for(let R of l){let S=i.createAccessorDef(R);S.bufferView=r.bufferViews.length,S.byteOffset=y;let N=R.getElementSize(),B=R.getComponentSize();y+=z.padNumber(N*B),i.accessorIndexMap.set(R,r.accessors.length),r.accessors.push(S)}let w=g*y,T=new ArrayBuffer(w),I=new DataView(T);for(let R=0;R<g;R++){let S=0;for(let N of l){let B=N.getElementSize(),P=N.getComponentSize(),j=N.getComponentType(),K=N.getArray();for(let X=0;X<B;X++){let te=R*y+S+X*P,ne=K[R*B+X];switch(j){case U.ComponentType.FLOAT:I.setFloat32(te,ne,!0);break;case U.ComponentType.BYTE:I.setInt8(te,ne);break;case U.ComponentType.SHORT:I.setInt16(te,ne,!0);break;case U.ComponentType.UNSIGNED_BYTE:I.setUint8(te,ne);break;case U.ComponentType.UNSIGNED_SHORT:I.setUint16(te,ne,!0);break;case U.ComponentType.UNSIGNED_INT:I.setUint32(te,ne,!0);break;case U.ComponentType.FLOAT16:I.setFloat16(te,ne,!0);break;case U.ComponentType.FLOAT64:I.setFloat64(te,ne,!0);break;default:throw new Error("Unexpected component type: "+j)}}S+=z.padNumber(B*P)}}let M={buffer:m,byteOffset:u,byteLength:w,byteStride:y,target:nt.BufferViewTarget.ARRAY_BUFFER};return r.bufferViews.push(M),{byteLength:w,buffers:[new Uint8Array(T)]}}function x(l,m,u){let g=[],y=0,w=new Map,T=-1/0,I=!1;for(let j of l){let K=i.createAccessorDef(j);r.accessors.push(K),i.accessorIndexMap.set(j,r.accessors.length-1);let X=[],te=[],ne=[],je=new Array(j.getElementSize()).fill(0);for(let me=0,Ve=j.getCount();me<Ve;me++)if(j.getElement(me,ne),!re.eq(ne,je,0)){T=Math.max(me,T),X.push(me);for(let Ue=0;Ue<ne.length;Ue++)te.push(ne[Ue])}let le=X.length,Fe={accessorDef:K,count:le};if(w.set(j,Fe),le===0)continue;le>j.getCount()/2&&(I=!0);let De=Va[j.getComponentType()];Fe.indices=X,Fe.values=new De(te)}if(!Number.isFinite(T))return{buffers:g,byteLength:y};I&&o.warn("Some sparse accessors have >50% non-zero elements, which may increase file size.");let M=T<255?Uint8Array:T<65535?Uint16Array:Uint32Array,R=T<255?jc:T<65535?Nc:_c,S={buffer:m,byteOffset:u+y,byteLength:0};for(let j of l){let K=w.get(j);if(K.count===0)continue;K.indicesByteOffset=S.byteLength;let X=z.pad(z.toView(new M(K.indices)));g.push(X),y+=X.byteLength,S.byteLength+=X.byteLength}r.bufferViews.push(S);let N=r.bufferViews.length-1,B={buffer:m,byteOffset:u+y,byteLength:0};for(let j of l){let K=w.get(j);if(K.count===0)continue;K.valuesByteOffset=B.byteLength;let X=z.pad(z.toView(K.values));g.push(X),y+=X.byteLength,B.byteLength+=X.byteLength}r.bufferViews.push(B);let P=r.bufferViews.length-1;for(let j of l){let K=w.get(j);K.count!==0&&(K.accessorDef.sparse={count:K.count,indices:{bufferView:N,byteOffset:K.indicesByteOffset,componentType:R},values:{bufferView:P,byteOffset:K.valuesByteOffset}})}return{buffers:g,byteLength:y}}if(r.accessors=[],r.bufferViews=[],r.samplers=[],r.textures=[],r.images=s.listTextures().map((l,m)=>{let u=i.createPropertyDef(l);l.getMimeType()&&(u.mimeType=l.getMimeType());let g=l.getImage();return g&&i.createImageData(u,g,l),i.imageIndexMap.set(l,m),u}),d.filter(l=>l.prewriteTypes.includes("Accessor")).forEach(l=>l.prewrite(i,"Accessor")),s.listAccessors().forEach(l=>{let m=i.accessorUsageGroupedByParent,u=i.accessorParents;if(i.accessorIndexMap.has(l))return;let g=i.getAccessorUsage(l);if(i.addAccessorToUsageGroup(l,g),m.has(g)){let y=a.listParents(l).find(w=>w.propertyType!=="Root");u.set(l,y)}}),d.filter(l=>l.prewriteTypes.includes("Buffer")).forEach(l=>l.prewrite(i,"Buffer")),(s.listAccessors().length>0||i.otherBufferViews.size>0||s.listTextures().length>0&&e.format==="GLB")&&s.listBuffers().length===0)throw new Error("Buffer required for Document resources, but none was found.");r.buffers=[],s.listBuffers().forEach((l,m)=>{let u=i.createPropertyDef(l),g=i.accessorUsageGroupedByParent,y=l.listParents().filter(N=>N instanceof U),w=new Set(y.map(N=>i.accessorParents.get(N))),T=new Map(Array.from(w).map((N,B)=>[N,B])),I={};for(let N of y){if(i.accessorIndexMap.has(N))continue;let B=i.getAccessorUsage(N),P=B;if(g.has(B)){let j=i.accessorParents.get(N);P+=`:${T.get(j)}`}I[P]||={usage:B,accessors:[]},I[P].accessors.push(N)}let M=[],R=r.buffers.length,S=0;for(let{usage:N,accessors:B}of Object.values(I))if(N===La.ARRAY_BUFFER&&e.vertexLayout==="interleaved"){let P=v(B,R,S);S+=P.byteLength;for(let j of P.buffers)M.push(j)}else if(N===La.ARRAY_BUFFER)for(let P of B){let j=v([P],R,S);S+=j.byteLength;for(let K of j.buffers)M.push(K)}else if(N===La.SPARSE){let P=x(B,R,S);S+=P.byteLength;for(let j of P.buffers)M.push(j)}else if(N===La.ELEMENT_ARRAY_BUFFER){let P=nt.BufferViewTarget.ELEMENT_ARRAY_BUFFER,j=p(B,R,S,P);S+=j.byteLength;for(let K of j.buffers)M.push(K)}else{let P=p(B,R,S);S+=P.byteLength;for(let j of P.buffers)M.push(j)}if(i.imageBufferViews.length&&m===0){for(let N=0;N<i.imageBufferViews.length;N++)if(r.bufferViews[r.images[N].bufferView].byteOffset=S,S+=i.imageBufferViews[N].byteLength,M.push(i.imageBufferViews[N]),S%8){let B=8-S%8;S+=B,M.push(new Uint8Array(B))}}if(i.otherBufferViews.has(l))for(let N of i.otherBufferViews.get(l))r.bufferViews.push({buffer:R,byteOffset:S,byteLength:N.byteLength}),i.otherBufferViewsIndexMap.set(N,r.bufferViews.length-1),S+=N.byteLength,M.push(N);if(S){let N;e.format==="GLB"?N=it:(N=i.bufferURIGenerator.createURI(l,"bin"),u.uri=N),u.byteLength=S,i.assignResourceURI(N,z.concat(M),!0)}r.buffers.push(u),i.bufferIndexMap.set(l,m)}),s.listAccessors().find(l=>!l.getBuffer())&&o.warn("Skipped writing one or more Accessors: no Buffer assigned."),d.filter(l=>l.prewriteTypes.includes("Material")).forEach(l=>l.prewrite(i,"Material")),r.materials=s.listMaterials().map((l,m)=>{let u=i.createPropertyDef(l);if(l.getAlphaMode()!==za.AlphaMode.OPAQUE&&(u.alphaMode=l.getAlphaMode()),l.getAlphaMode()===za.AlphaMode.MASK&&(u.alphaCutoff=l.getAlphaCutoff()),l.getDoubleSided()&&(u.doubleSided=!0),u.pbrMetallicRoughness={},re.eq(l.getBaseColorFactor(),[1,1,1,1])||(u.pbrMetallicRoughness.baseColorFactor=l.getBaseColorFactor()),re.eq(l.getEmissiveFactor(),[0,0,0])||(u.emissiveFactor=l.getEmissiveFactor()),l.getRoughnessFactor()!==1&&(u.pbrMetallicRoughness.roughnessFactor=l.getRoughnessFactor()),l.getMetallicFactor()!==1&&(u.pbrMetallicRoughness.metallicFactor=l.getMetallicFactor()),l.getBaseColorTexture()){let g=l.getBaseColorTexture(),y=l.getBaseColorTextureInfo();u.pbrMetallicRoughness.baseColorTexture=i.createTextureInfoDef(g,y)}if(l.getEmissiveTexture()){let g=l.getEmissiveTexture(),y=l.getEmissiveTextureInfo();u.emissiveTexture=i.createTextureInfoDef(g,y)}if(l.getNormalTexture()){let g=l.getNormalTexture(),y=l.getNormalTextureInfo(),w=i.createTextureInfoDef(g,y);l.getNormalScale()!==1&&(w.scale=l.getNormalScale()),u.normalTexture=w}if(l.getOcclusionTexture()){let g=l.getOcclusionTexture(),y=l.getOcclusionTextureInfo(),w=i.createTextureInfoDef(g,y);l.getOcclusionStrength()!==1&&(w.strength=l.getOcclusionStrength()),u.occlusionTexture=w}if(l.getMetallicRoughnessTexture()){let g=l.getMetallicRoughnessTexture(),y=l.getMetallicRoughnessTextureInfo();u.pbrMetallicRoughness.metallicRoughnessTexture=i.createTextureInfoDef(g,y)}return i.materialIndexMap.set(l,m),u}),d.filter(l=>l.prewriteTypes.includes("Mesh")).forEach(l=>l.prewrite(i,"Mesh")),r.meshes=s.listMeshes().map((l,m)=>{let u=i.createPropertyDef(l),g=null;return u.primitives=l.listPrimitives().map(y=>{let w={attributes:{}};w.mode=y.getMode();let T=y.getMaterial();T&&(w.material=i.materialIndexMap.get(T)),Object.keys(y.getExtras()).length&&(w.extras=y.getExtras());let I=y.getIndices();I&&(w.indices=i.accessorIndexMap.get(I));for(let M of y.listSemantics())w.attributes[M]=i.accessorIndexMap.get(y.getAttribute(M));for(let M of y.listTargets()){let R={};for(let S of M.listSemantics())R[S]=i.accessorIndexMap.get(M.getAttribute(S));w.targets=w.targets||[],w.targets.push(R)}return y.listTargets().length&&!g&&(g=y.listTargets().map(M=>M.getName())),w}),l.getWeights().length&&(u.weights=l.getWeights()),g&&(u.extras=u.extras||{},u.extras.targetNames=g),i.meshIndexMap.set(l,m),u}),r.cameras=s.listCameras().map((l,m)=>{let u=i.createPropertyDef(l);if(u.type=l.getType(),u.type===Xa.Type.PERSPECTIVE){u.perspective={znear:l.getZNear(),zfar:l.getZFar(),yfov:l.getYFov()};let g=l.getAspectRatio();g!==null&&(u.perspective.aspectRatio=g)}else u.orthographic={znear:l.getZNear(),zfar:l.getZFar(),xmag:l.getXMag(),ymag:l.getYMag()};return i.cameraIndexMap.set(l,m),u}),r.nodes=s.listNodes().map((l,m)=>{let u=i.createPropertyDef(l);return re.eq(l.getTranslation(),[0,0,0])||(u.translation=l.getTranslation()),re.eq(l.getRotation(),[0,0,0,1])||(u.rotation=l.getRotation()),re.eq(l.getScale(),[1,1,1])||(u.scale=l.getScale()),l.getWeights().length&&(u.weights=l.getWeights()),i.nodeIndexMap.set(l,m),u}),r.skins=s.listSkins().map((l,m)=>{let u=i.createPropertyDef(l),g=l.getInverseBindMatrices();g&&(u.inverseBindMatrices=i.accessorIndexMap.get(g));let y=l.getSkeleton();return y&&(u.skeleton=i.nodeIndexMap.get(y)),u.joints=l.listJoints().map(w=>i.nodeIndexMap.get(w)),i.skinIndexMap.set(l,m),u}),s.listNodes().forEach((l,m)=>{let u=r.nodes[m],g=l.getMesh();g&&(u.mesh=i.meshIndexMap.get(g));let y=l.getCamera();y&&(u.camera=i.cameraIndexMap.get(y));let w=l.getSkin();w&&(u.skin=i.skinIndexMap.get(w)),l.listChildren().length>0&&(u.children=l.listChildren().map(T=>i.nodeIndexMap.get(T)))}),r.animations=s.listAnimations().map((l,m)=>{let u=i.createPropertyDef(l),g=new Map;return u.samplers=l.listSamplers().map((y,w)=>{let T=i.createPropertyDef(y);return T.input=i.accessorIndexMap.get(y.getInput()),T.output=i.accessorIndexMap.get(y.getOutput()),T.interpolation=y.getInterpolation(),g.set(y,w),T}),u.channels=l.listChannels().map(y=>{let w=i.createPropertyDef(y);return w.sampler=g.get(y.getSampler()),w.target={node:i.nodeIndexMap.get(y.getTargetNode()),path:y.getTargetPath()},w}),i.animationIndexMap.set(l,m),u}),r.scenes=s.listScenes().map((l,m)=>{let u=i.createPropertyDef(l);return u.nodes=l.listChildren().map(g=>i.nodeIndexMap.get(g)),i.sceneIndexMap.set(l,m),u});let b=s.getDefaultScene();return b&&(r.scene=s.listScenes().indexOf(b)),r.extensionsUsed=d.map(l=>l.extensionName),r.extensionsRequired=f.map(l=>l.extensionName),d.forEach(l=>l.write(i)),Cc(r),n}};function Cc(t){let e=[];for(let a in t){let s=t[a];(Array.isArray(s)&&s.length===0||s===null||s===""||s&&typeof s=="object"&&Object.keys(s).length===0)&&e.push(a)}for(let a of e)delete t[a]}var Oc=class{_logger=Ha.DEFAULT_INSTANCE;_extensions=new Set;_dependencies={};_vertexLayout="interleaved";_strictResources=!0;lastReadBytes=0;lastWriteBytes=0;setLogger(t){return this._logger=t,this}registerExtensions(t){for(let e of t)this._extensions.add(e),e.register();return this}registerDependencies(t){return Object.assign(this._dependencies,t),this}setVertexLayout(t){return this._vertexLayout=t,this}setStrictResources(t){return this._strictResources=t,this}async read(t){return await this.readJSON(await this.readAsJSON(t))}async readAsJSON(t){let e=await this.readURI(t,"view");this.lastReadBytes=e.byteLength;let a=Xr(e)?this._binaryToJSON(e):{json:JSON.parse(z.decodeText(e)),resources:{}};return await this._readResourcesExternal(a,this.dirname(t)),this._readResourcesInternal(a),a}async readJSON(t){return t=this._copyJSON(t),this._readResourcesInternal(t),Mc.read(t,{extensions:Array.from(this._extensions),dependencies:this._dependencies,logger:this._logger})}async binaryToJSON(t){let e=this._binaryToJSON(z.assertView(t));this._readResourcesInternal(e);let a=e.json;if(a.buffers&&a.buffers.some(s=>Pc(e,s)))throw new Error("Cannot resolve external buffers with binaryToJSON().");if(a.images&&a.images.some(s=>Dc(e,s)))throw new Error("Cannot resolve external images with binaryToJSON().");return e}async readBinary(t){return this.readJSON(await this.binaryToJSON(z.assertView(t)))}async writeJSON(t,e={}){if(e.format==="GLB"&&t.getRoot().listBuffers().length>1)throw new Error("GLB must have 0\u20131 buffers.");return Bc.write(t,{format:e.format||"GLTF",basename:e.basename||"",logger:this._logger,vertexLayout:this._vertexLayout,dependencies:{...this._dependencies},extensions:Array.from(this._extensions)})}async writeBinary(t){let{json:e,resources:a}=await this.writeJSON(t,{format:"GLB"}),s=new Uint32Array([1179937895,2,12]),r=JSON.stringify(e),n=z.pad(z.encodeText(r),32),i=z.toView(new Uint32Array([n.byteLength,1313821514])),o=z.concat([i,n]);s[s.length-1]+=o.byteLength;let c=Object.values(a)[0];if(!c||!c.byteLength)return z.concat([z.toView(s),o]);let d=z.pad(c,0),f=z.toView(new Uint32Array([d.byteLength,5130562])),p=z.concat([f,d]);return s[s.length-1]+=p.byteLength,z.concat([z.toView(s),o,p])}async _readResourcesExternal(t,e){let a=t.json.images||[],s=t.json.buffers||[],r=[...a,...s].map(async n=>{let i=n.uri;if(!i||i.match(/data:/))return Promise.resolve();try{t.resources[i]=await this.readURI(this.resolve(e,i),"view"),this.lastReadBytes+=t.resources[i].byteLength}catch(o){if(!this._strictResources&&a.includes(n))this._logger.warn(`Failed to load image URI, "${i}". ${o}`),t.resources[i]=null;else throw o}});await Promise.all(r)}_readResourcesInternal(t){function e(a){if(a.uri){if(a.uri in t.resources){z.assertView(t.resources[a.uri]);return}if(a.uri.match(/data:/)){let s=`__${yc()}.${Kt.extension(a.uri)}`;t.resources[s]=z.createBufferFromDataURI(a.uri),a.uri=s}}}(t.json.images||[]).forEach(a=>{if(a.bufferView===void 0&&a.uri===void 0)throw new Error("Missing resource URI or buffer view.");e(a)}),(t.json.buffers||[]).forEach(e)}_copyJSON(t){let{images:e,buffers:a}=t.json;return t={json:{...t.json},resources:{...t.resources}},e&&(t.json.images=e.map(s=>({...s}))),a&&(t.json.buffers=a.map(s=>({...s}))),t}_binaryToJSON(t){if(!Xr(t))throw new Error("Invalid glTF 2.0 binary.");let e=new Uint32Array(t.buffer,t.byteOffset+12,2);if(e[1]!==1313821514)throw new Error("Missing required GLB JSON chunk.");let a=20,s=e[0],r=z.decodeText(z.toView(t,a,s)),n=JSON.parse(r),i=a+s;if(t.byteLength<=i)return{json:n,resources:{}};let o=new Uint32Array(t.buffer,t.byteOffset+i,2);if(o[1]!==5130562)return{json:n,resources:{}};let c=o[0],d=z.toView(t,i+8,c);return{json:n,resources:{[it]:d}}}};function Pc(t,e){return e.uri!==void 0&&!(e.uri in t.resources)}function Dc(t,e){return e.uri!==void 0&&!(e.uri in t.resources)&&e.bufferView===void 0}function Xr(t){if(t.byteLength<3*Uint32Array.BYTES_PER_ELEMENT)return!1;let e=new Uint32Array(t.buffer,t.byteOffset,3);return e[0]===1179937895&&e[1]===2}var bn=class extends Oc{_fetchConfig;constructor(t=Ls.DEFAULT_INIT){super(),this._fetchConfig=t}async readURI(t,e){let a=await fetch(t,this._fetchConfig);switch(e){case"view":return new Uint8Array(await a.arrayBuffer());case"text":return a.text()}}resolve(t,e){return Ls.resolve(t,e)}dirname(t){return Ls.dirname(t)}};function Uc(){return{vkFormat:0,typeSize:1,pixelWidth:0,pixelHeight:0,pixelDepth:0,layerCount:0,faceCount:1,levelCount:0,supercompressionScheme:0,levels:[],dataFormatDescriptor:[{vendorId:0,descriptorType:0,versionNumber:2,colorModel:0,colorPrimaries:1,transferFunction:2,flags:0,texelBlockDimension:[0,0,0,0],bytesPlane:[0,0,0,0,0,0,0,0],samples:[]}],keyValue:{},globalData:null}}var At=class{constructor(e,a,s,r){this._dataView=void 0,this._littleEndian=void 0,this._offset=void 0,this._dataView=new DataView(e.buffer,e.byteOffset+a,s),this._littleEndian=r,this._offset=0}_nextUint8(){let e=this._dataView.getUint8(this._offset);return this._offset+=1,e}_nextUint16(){let e=this._dataView.getUint16(this._offset,this._littleEndian);return this._offset+=2,e}_nextUint32(){let e=this._dataView.getUint32(this._offset,this._littleEndian);return this._offset+=4,e}_nextUint64(){let e=this._dataView.getUint32(this._offset,this._littleEndian),a=this._dataView.getUint32(this._offset+4,this._littleEndian),s=e+2**32*a;return this._offset+=8,s}_nextInt32(){let e=this._dataView.getInt32(this._offset,this._littleEndian);return this._offset+=4,e}_nextUint8Array(e){let a=new Uint8Array(this._dataView.buffer,this._dataView.byteOffset+this._offset,e);return this._offset+=e,a}_skip(e){return this._offset+=e,this}_scan(e,a=0){let s=this._offset,r=0;for(;this._dataView.getUint8(this._offset)!==a&&r<e;)r++,this._offset++;return r<e&&this._offset++,new Uint8Array(this._dataView.buffer,this._dataView.byteOffset+s,r)}};var fp=new Uint8Array([0]),Te=[171,75,84,88,32,50,48,187,13,10,26,10];function pn(t){return new TextDecoder().decode(t)}function Wa(t){let e=new Uint8Array(t.buffer,t.byteOffset,Te.length);if(e[0]!==Te[0]||e[1]!==Te[1]||e[2]!==Te[2]||e[3]!==Te[3]||e[4]!==Te[4]||e[5]!==Te[5]||e[6]!==Te[6]||e[7]!==Te[7]||e[8]!==Te[8]||e[9]!==Te[9]||e[10]!==Te[10]||e[11]!==Te[11])throw new Error("Missing KTX 2.0 identifier.");let a=Uc(),s=17*Uint32Array.BYTES_PER_ELEMENT,r=new At(t,Te.length,s,!0);a.vkFormat=r._nextUint32(),a.typeSize=r._nextUint32(),a.pixelWidth=r._nextUint32(),a.pixelHeight=r._nextUint32(),a.pixelDepth=r._nextUint32(),a.layerCount=r._nextUint32(),a.faceCount=r._nextUint32(),a.levelCount=r._nextUint32(),a.supercompressionScheme=r._nextUint32();let n=r._nextUint32(),i=r._nextUint32(),o=r._nextUint32(),c=r._nextUint32(),d=r._nextUint64(),f=r._nextUint64(),p=Math.max(a.levelCount,1)*3*8,v=new At(t,Te.length+s,p,!0);for(let F=0,C=Math.max(a.levelCount,1);F<C;F++)a.levels.push({levelData:new Uint8Array(t.buffer,t.byteOffset+v._nextUint64(),v._nextUint64()),uncompressedByteLength:v._nextUint64()});let x=new At(t,n,i,!0);x._skip(4);let b=x._nextUint16(),l=x._nextUint16(),m=x._nextUint16(),u=x._nextUint16(),g=x._nextUint8(),y=x._nextUint8(),w=x._nextUint8(),T=x._nextUint8(),I=[x._nextUint8(),x._nextUint8(),x._nextUint8(),x._nextUint8()],M=[x._nextUint8(),x._nextUint8(),x._nextUint8(),x._nextUint8(),x._nextUint8(),x._nextUint8(),x._nextUint8(),x._nextUint8()],S={vendorId:b,descriptorType:l,versionNumber:m,colorModel:g,colorPrimaries:y,transferFunction:w,flags:T,texelBlockDimension:I,bytesPlane:M,samples:[]},P=(u/4-6)/4;for(let F=0;F<P;F++){let C={bitOffset:x._nextUint16(),bitLength:x._nextUint8(),channelType:x._nextUint8(),samplePosition:[x._nextUint8(),x._nextUint8(),x._nextUint8(),x._nextUint8()],sampleLower:Number.NEGATIVE_INFINITY,sampleUpper:Number.POSITIVE_INFINITY};C.channelType&64?(C.sampleLower=x._nextInt32(),C.sampleUpper=x._nextInt32()):(C.sampleLower=x._nextUint32(),C.sampleUpper=x._nextUint32()),S.samples[F]=C}a.dataFormatDescriptor.length=0,a.dataFormatDescriptor.push(S);let j=new At(t,o,c,!0);for(;j._offset<c;){let F=j._nextUint32(),C=j._scan(F),J=pn(C);if(a.keyValue[J]=j._nextUint8Array(F-C.byteLength-1),J.match(/^ktx/i)){let ve=pn(a.keyValue[J]);a.keyValue[J]=ve.substring(0,ve.lastIndexOf("\0"))}let oe=F%4?4-F%4:0;j._skip(oe)}if(f<=0)return a;let K=new At(t,d,f,!0),X=K._nextUint16(),te=K._nextUint16(),ne=K._nextUint32(),je=K._nextUint32(),le=K._nextUint32(),Fe=K._nextUint32(),De=[];for(let F=0,C=Math.max(a.levelCount,1);F<C;F++)De.push({imageFlags:K._nextUint32(),rgbSliceByteOffset:K._nextUint32(),rgbSliceByteLength:K._nextUint32(),alphaSliceByteOffset:K._nextUint32(),alphaSliceByteLength:K._nextUint32()});let me=d+K._offset,Ve=me+ne,Ue=Ve+je,tt=Ue+le,Bt=new Uint8Array(t.buffer,t.byteOffset+me,ne),_s=new Uint8Array(t.buffer,t.byteOffset+Ve,je),Ia=new Uint8Array(t.buffer,t.byteOffset+Ue,le),k=new Uint8Array(t.buffer,t.byteOffset+tt,Fe);return a.globalData={endpointCount:X,selectorCount:te,imageDescs:De,endpointsData:Bt,selectorsData:_s,tablesData:Ia,extendedData:k},a}var ct="EXT_mesh_gpu_instancing",Ye="EXT_mesh_features",Se="EXT_meshopt_compression",G="EXT_structural_metadata",Ja="EXT_texture_webp",Ya="EXT_texture_avif",Hc="KHR_accessor_float16",qc="KHR_accessor_float64",ce="KHR_draco_mesh_compression",Je="KHR_lights_punctual",lt="KHR_materials_anisotropy",dt="KHR_materials_clearcoat",ut="KHR_materials_diffuse_transmission",ft="KHR_materials_dispersion",ht="KHR_materials_emissive_strength",bt="KHR_materials_ior",pt="KHR_materials_iridescence",gt="KHR_materials_pbrSpecularGlossiness",mt="KHR_materials_sheen",yt="KHR_materials_specular",xt="KHR_materials_transmission",Gt="KHR_materials_unlit",vt="KHR_materials_volume",_e="KHR_materials_variants",gn="KHR_mesh_primitive_restart",mn="KHR_mesh_quantization",wt="KHR_node_visibility",$a="KHR_texture_basisu",Tt="KHR_texture_transform",Ke="KHR_xmp_json_ld",Xc=class extends q{static EXTENSION_NAME=Ye;init(){this.extensionName=Ye,this.propertyType="FeatureID",this.parentTypes=["Features"]}getDefaults(){return Object.assign(super.getDefaults(),{nullFeatureId:null,label:"",attribute:null,texture:null,propertyTable:null})}getFeatureCount(){return this.get("featureCount")}setFeatureCount(t){return this.set("featureCount",t)}getNullFeatureID(){return this.get("nullFeatureId")}setNullFeatureID(t){return this.set("nullFeatureId",t)}getLabel(){return this.get("label")}setLabel(t){return this.set("label",t)}getAttribute(){return this.get("attribute")}setAttribute(t){return this.set("attribute",t)}getTexture(){return this.getRef("texture")}setTexture(t){return this.setRef("texture",t)}getPropertyTable(){return this.getRef("propertyTable")}setPropertyTable(t){return this.setRef("propertyTable",t)}},Wc=class extends q{static EXTENSION_NAME=Ye;init(){this.extensionName=Ye,this.propertyType="FeatureIDTexture",this.parentTypes=["FeatureID"]}getDefaults(){let t=new se(this.graph,"textureInfo");return t.setMinFilter(se.MagFilter.NEAREST),t.setMagFilter(se.MagFilter.NEAREST),Object.assign(super.getDefaults(),{channels:[0],texture:null,textureInfo:t})}getChannels(){return this.get("channels")}setChannels(t){return this.set("channels",t)}getTexture(){return this.getRef("texture")}setTexture(t){return this.setRef("texture",t)}getTextureInfo(){return this.getRef("texture")?this.getRef("textureInfo"):null}},Jc=class extends q{static EXTENSION_NAME=Ye;init(){this.extensionName=Ye,this.propertyType="Features",this.parentTypes=[_.PRIMITIVE]}getDefaults(){return Object.assign(super.getDefaults(),{featureIds:new ae([])})}listFeatureIDs(){return this.listRefs("featureIds")}addFeatureID(t){return this.addRef("featureIds",t)}removeFeatureID(t){return this.removeRef("featureIds",t)}},na=Ye,Zs=class extends ee{extensionName=Ye;static EXTENSION_NAME=Ye;createFeatures(){return new Jc(this.document.getGraph())}createFeatureID(){return new Xc(this.document.getGraph())}createFeatureIDTexture(){return new Wc(this.document.getGraph())}read(t){return(t.jsonDoc.json.meshes||[]).forEach((e,a)=>{(e.primitives||[]).forEach((s,r)=>{this._readPrimitive(t,a,s,r)})}),this}_readPrimitive(t,e,a,s){if(!a.extensions||!a.extensions[na])return;let r=this.createFeatures(),n=a.extensions[na];for(let i of n.featureIds){let o=Yc(this.document,this,t,i);r.addFeatureID(o)}t.meshes[e].listPrimitives()[s].setExtension(na,r)}write(t){let e=t.jsonDoc.json.meshes;if(!e)return this;for(let a of this.document.getRoot().listMeshes()){let s=e[t.meshIndexMap.get(a)];a.listPrimitives().forEach((r,n)=>{let i=s.primitives[n];this._writePrimitive(t,r,i)})}return this}_writePrimitive(t,e,a){let s=e.getExtension(na);if(!s)return;let r={featureIds:[]};s.listFeatureIDs().forEach(n=>{r.featureIds.push(Qc(this.document,t,n))}),a.extensions=a.extensions||{},a.extensions[na]=r}};function Yc(t,e,a,s){let r=e.createFeatureID().setFeatureCount(s.featureCount);s.nullFeatureId!==void 0&&r.setNullFeatureID(s.nullFeatureId),s.label!==void 0&&r.setLabel(s.label),s.attribute!==void 0&&r.setAttribute(s.attribute);let n=s.texture;if(n!==void 0){let i=$c(e,a,n);r.setTexture(i)}if(s.propertyTable!==void 0){let i=t.getRoot().getExtension(G).listPropertyTables();r.setPropertyTable(i[s.propertyTable])}return r}function $c(t,e,a){let s=t.createFeatureIDTexture(),{json:r}=e.jsonDoc;if(a.channels&&s.setChannels(a.channels),a.index!==void 0){let n=r.textures[a.index].source;s.setTexture(e.textures[n]),e.setTextureInfo(s.getTextureInfo(),a)}return s}function Qc(t,e,a){let s=t.getRoot(),r={featureCount:a.getFeatureCount()};if(a.getNullFeatureID()!=null&&(r.nullFeatureId=a.getNullFeatureID()),a.getLabel()&&(r.label=a.getLabel()),a.getAttribute()!=null&&(r.attribute=a.getAttribute()),a.getTexture()){let n=a.getTexture(),i=n.getTexture(),o=n.getTextureInfo();r.texture=e.createTextureInfoDef(i,o);let c=n.getChannels();re.eq(c,[0])||(r.texture.channels=c)}if(a.getPropertyTable()){let n=s.getExtension(G),i=a.getPropertyTable();r.propertyTable=n.listPropertyTables().indexOf(i)}return r}var Ys="INSTANCE_ATTRIBUTE",Zc=class extends q{static EXTENSION_NAME=ct;init(){this.extensionName=ct,this.propertyType="InstancedMesh",this.parentTypes=[_.NODE]}getDefaults(){return Object.assign(super.getDefaults(),{attributes:new de})}getAttribute(t){return this.getRefMap("attributes",t)}setAttribute(t,e){return this.setRefMap("attributes",t,e,{usage:Ys})}listAttributes(){return this.listRefMapValues("attributes")}listSemantics(){return this.listRefMapKeys("attributes")}},el=class extends ee{static EXTENSION_NAME=ct;extensionName=ct;prewriteTypes=[_.ACCESSOR];createInstancedMesh(){return new Zc(this.document.getGraph())}read(t){return(t.jsonDoc.json.nodes||[]).forEach((e,a)=>{if(!e.extensions||!e.extensions.EXT_mesh_gpu_instancing)return;let s=e.extensions[ct],r=this.createInstancedMesh();for(let n in s.attributes)r.setAttribute(n,t.accessors[s.attributes[n]]);t.nodes[a].setExtension(ct,r)}),this}prewrite(t){t.accessorUsageGroupedByParent.add(Ys);for(let e of this.properties)for(let a of e.listAttributes())t.addAccessorToUsageGroup(a,Ys);return this}write(t){let e=t.jsonDoc;return this.document.getRoot().listNodes().forEach(a=>{let s=a.getExtension(ct);if(s){let r=t.nodeIndexMap.get(a),n=e.json.nodes[r],i={attributes:{}};s.listSemantics().forEach(o=>{let c=s.getAttribute(o);i.attributes[o]=t.accessorIndexMap.get(c)}),n.extensions=n.extensions||{},n.extensions[ct]=i}}),this}},tl=(function(t){return t.QUANTIZE="quantize",t.FILTER="filter",t})({});function al(t){return!t.extensions||!t.extensions.EXT_meshopt_compression?!1:!!t.extensions[Se].fallback}var{BYTE:sl,SHORT:yn,FLOAT:rl}=U.ComponentType,{encodeNormalizedInt:xn,decodeNormalizedInt:$s}=re;function nl(t,e,a,s){let{filter:r,bits:n}=s,i={array:t.getArray(),byteStride:t.getElementSize()*t.getComponentSize(),componentType:t.getComponentType(),normalized:t.getNormalized()};if(a!=="ATTRIBUTES")return i;if(r!=="NONE"){let o=t.getNormalized()?il(t):new Float32Array(i.array);switch(r){case"EXPONENTIAL":i.byteStride=t.getElementSize()*4,i.componentType=rl,i.normalized=!1,i.array=e.encodeFilterExp(o,t.getCount(),i.byteStride,n);break;case"OCTAHEDRAL":i.byteStride=n>8?8:4,i.componentType=n>8?yn:sl,i.normalized=!0,o=t.getElementSize()===3?cl(o):o,i.array=e.encodeFilterOct(o,t.getCount(),i.byteStride,n);break;case"QUATERNION":i.byteStride=8,i.componentType=yn,i.normalized=!0,i.array=e.encodeFilterQuat(o,t.getCount(),i.byteStride,n);break;default:throw new Error("Invalid filter.")}i.min=t.getMin([]),i.max=t.getMax([]),t.getNormalized()&&(i.min=i.min.map(c=>$s(c,t.getComponentType())),i.max=i.max.map(c=>$s(c,t.getComponentType()))),i.normalized&&(i.min=i.min.map(c=>xn(c,i.componentType)),i.max=i.max.map(c=>xn(c,i.componentType)))}else i.byteStride%4&&(i.array=ol(i.array,t.getElementSize()),i.byteStride=i.array.byteLength/t.getCount());return i}function il(t){let e=t.getComponentType(),a=t.getArray(),s=new Float32Array(a.length);for(let r=0;r<a.length;r++)s[r]=$s(a[r],e);return s}function ol(t,e){let a=z.padNumber(t.BYTES_PER_ELEMENT*e)/t.BYTES_PER_ELEMENT,s=t.length/e,r=new t.constructor(s*a);for(let n=0;n*e<t.length;n++)for(let i=0;i<e;i++)r[n*a+i]=t[n*e+i];return r}function cl(t){let e=new Float32Array(t.length*4/3);for(let a=0,s=t.length/3;a<s;a++)e[a*4]=t[a*3],e[a*4+1]=t[a*3+1],e[a*4+2]=t[a*3+2];return e}function ll(t,e){return e===nt.BufferViewUsage.ELEMENT_ARRAY_BUFFER?t.listParents().some(a=>a instanceof ra&&a.getMode()===ra.Mode.TRIANGLES)?"TRIANGLES":"INDICES":"ATTRIBUTES"}function dl(t,e){let a=e.getGraph().listParentEdges(t).filter(s=>!(s.getParent()instanceof Xs));for(let s of a){let r=s.getName(),n=s.getAttributes().key||"",i=s.getParent().propertyType===_.PRIMITIVE_TARGET;if(r==="indices")return{filter:"NONE"};if(r==="attributes"){if(n==="POSITION")return{filter:"NONE"};if(n==="TEXCOORD_0")return{filter:"NONE"};if(n.startsWith("JOINTS_"))return{filter:"NONE"};if(n.startsWith("WEIGHTS_"))return{filter:"NONE"};if(n==="NORMAL"||n==="TANGENT")return i?{filter:"NONE"}:{filter:"OCTAHEDRAL",bits:8}}if(r==="output"){let o=On(t);return o==="rotation"?{filter:"QUATERNION",bits:16}:o==="translation"?{filter:"EXPONENTIAL",bits:12}:o==="scale"?{filter:"EXPONENTIAL",bits:12}:{filter:"NONE"}}if(r==="input")return{filter:"NONE"};if(r==="inverseBindMatrices")return{filter:"NONE"}}return{filter:"NONE"}}function On(t){for(let e of t.listParents())if(e instanceof qa){for(let a of e.listParents())if(a instanceof qs)return a.getTargetPath()}return null}var vn={method:"quantize"},er=class extends ee{extensionName=Se;prereadTypes=[_.BUFFER,_.PRIMITIVE];prewriteTypes=[_.BUFFER,_.ACCESSOR];readDependencies=["meshopt.decoder"];writeDependencies=["meshopt.encoder"];static EXTENSION_NAME=Se;static EncoderMethod=tl;_decoder=null;_decoderFallbackBufferMap=new Map;_encoder=null;_encoderOptions=vn;_encoderFallbackBuffer=null;_encoderBufferViews={};_encoderBufferViewData={};_encoderBufferViewAccessors={};install(t,e){return t==="meshopt.decoder"&&(this._decoder=e),t==="meshopt.encoder"&&(this._encoder=e),this}setEncoderOptions(t){return this._encoderOptions={...vn,...t},this}preread(t,e){if(!this._decoder){if(!this.isRequired())return this;throw new Error(`[${Se}] Please install extension dependency, "meshopt.decoder".`)}if(!this._decoder.supported){if(!this.isRequired())return this;throw new Error(`[${Se}]: Missing WASM support.`)}return e===_.BUFFER?this._prereadBuffers(t):e===_.PRIMITIVE&&this._prereadPrimitives(t),this}_prereadBuffers(t){let e=t.jsonDoc;(e.json.bufferViews||[]).forEach((a,s)=>{if(!a.extensions||!a.extensions.EXT_meshopt_compression)return;let r=a.extensions[Se],n=r.byteOffset||0,i=r.byteLength||0,o=r.count,c=r.byteStride,d=new Uint8Array(o*c),f=e.json.buffers[r.buffer],p=f.uri?e.resources[f.uri]:e.resources[it],v=z.toView(p,n,i);this._decoder.decodeGltfBuffer(d,o,c,v,r.mode,r.filter),t.bufferViews[s]=d})}_prereadPrimitives(t){let e=t.jsonDoc;(e.json.bufferViews||[]).forEach(a=>{if(!a.extensions||!a.extensions.EXT_meshopt_compression)return;let s=a.extensions[Se],r=t.buffers[s.buffer],n=t.buffers[a.buffer],i=e.json.buffers[a.buffer];al(i)&&this._decoderFallbackBufferMap.set(n,r)})}read(t){if(!this.isRequired())return this;for(let[e,a]of this._decoderFallbackBufferMap){for(let s of e.listParents())s instanceof U&&s.swap(e,a);e.dispose()}return this}prewrite(t,e){return e===_.ACCESSOR?this._prewriteAccessors(t):e===_.BUFFER&&this._prewriteBuffers(t),this}_prewriteAccessors(t){let e=t.jsonDoc.json,a=this._encoder,s=this._encoderOptions,r=this.document.getGraph(),n=this.document.createBuffer(),i=this.document.getRoot().listBuffers().indexOf(n),o=1,c=new Map,d=f=>{for(let p of r.listParents(f)){if(p.propertyType===_.ROOT)continue;let v=c.get(f);return v===void 0&&c.set(f,v=o++),v}return-1};this._encoderFallbackBuffer=n,this._encoderBufferViews={},this._encoderBufferViewData={},this._encoderBufferViewAccessors={};for(let f of this.document.getRoot().listAccessors()){if(On(f)==="weights"||f.getSparse())continue;let p=t.getAccessorUsage(f),v=t.accessorUsageGroupedByParent.has(p)?d(f):null,x=ll(f,p),b=s.method==="filter"?dl(f,this.document):{filter:"NONE"},l=nl(f,a,x,b),{array:m,byteStride:u}=l,g=f.getBuffer();if(!g)throw new Error(`${Se}: Missing buffer for accessor.`);let y=this.document.getRoot().listBuffers().indexOf(g),w=[p,v,x,b.filter,u,y].join(":"),T=this._encoderBufferViews[w],I=this._encoderBufferViewData[w],M=this._encoderBufferViewAccessors[w];(!T||!I)&&(M=this._encoderBufferViewAccessors[w]=[],I=this._encoderBufferViewData[w]=[],T=this._encoderBufferViews[w]={buffer:i,target:nt.USAGE_TO_TARGET[p],byteOffset:0,byteLength:0,byteStride:p===nt.BufferViewUsage.ARRAY_BUFFER?u:void 0,extensions:{[Se]:{buffer:y,byteOffset:0,byteLength:0,mode:x,filter:b.filter!=="NONE"?b.filter:void 0,byteStride:u,count:0}}});let R=t.createAccessorDef(f);R.componentType=l.componentType,R.normalized=l.normalized,R.byteOffset=T.byteLength,R.min&&l.min&&(R.min=l.min),R.max&&l.max&&(R.max=l.max),t.accessorIndexMap.set(f,e.accessors.length),e.accessors.push(R),M.push(R),I.push(new Uint8Array(m.buffer,m.byteOffset,m.byteLength)),T.byteLength+=m.byteLength,T.extensions.EXT_meshopt_compression.count+=f.getCount()}}_prewriteBuffers(t){let e=this._encoder;for(let a in this._encoderBufferViews){let s=this._encoderBufferViews[a],r=this._encoderBufferViewData[a],n=this.document.getRoot().listBuffers()[s.extensions[Se].buffer],i=t.otherBufferViews.get(n)||[],{count:o,byteStride:c,mode:d}=s.extensions[Se],f=z.concat(r),p=e.encodeGltfBuffer(f,o,c,d),v=z.pad(p);s.extensions[Se].byteLength=p.byteLength,r.length=0,r.push(v),i.push(v),t.otherBufferViews.set(n,i)}}write(t){let e=0;for(let n in this._encoderBufferViews){let i=this._encoderBufferViews[n],o=this._encoderBufferViewData[n][0],c=t.otherBufferViewsIndexMap.get(o),d=this._encoderBufferViewAccessors[n];for(let x of d)x.bufferView=c;let f=t.jsonDoc.json.bufferViews[c],p=f.byteOffset||0;Object.assign(f,i),f.byteOffset=e;let v=f.extensions[Se];v.byteOffset=p,e+=z.padNumber(i.byteLength)}let a=this._encoderFallbackBuffer,s=t.bufferIndexMap.get(a),r=t.jsonDoc.json.buffers[s];return r.byteLength=e,r.extensions={[Se]:{fallback:!0}},a.dispose(),this}},ul=class extends q{static EXTENSION_NAME=G;init(){this.extensionName=G,this.propertyType="StructuralMetadata",this.parentTypes=[_.ROOT]}getDefaults(){return Object.assign(super.getDefaults(),{schema:null,schemaUri:"",propertyTables:new be,propertyTextures:new be,propertyAttributes:new be})}getSchema(){return this.getRef("schema")}setSchema(t){return this.setRef("schema",t)}getSchemaUri(){return this.get("schemaUri")}setSchemaUri(t){return this.set("schemaUri",t)}listPropertyTables(){return this.listRefs("propertyTables")}addPropertyTable(t){return this.addRef("propertyTables",t)}removePropertyTable(t){return this.removeRef("propertyTables",t)}listPropertyTextures(){return this.listRefs("propertyTextures")}addPropertyTexture(t){return this.addRef("propertyTextures",t)}removePropertyTexture(t){return this.removeRef("propertyTextures",t)}listPropertyAttributes(){return this.listRefs("propertyAttributes")}addPropertyAttribute(t){return this.addRef("propertyAttributes",t)}removePropertyAttribute(t){return this.removeRef("propertyAttributes",t)}},fl=class extends q{static EXTENSION_NAME=G;init(){this.extensionName=G,this.propertyType="Schema",this.parentTypes=["StructuralMetadata"]}getDefaults(){return Object.assign(super.getDefaults(),{description:"",version:"",classes:new de,enums:new de})}getId(){return this.get("id")}setId(t){return this.set("id",t)}getDescription(){return this.get("description")}setDescription(t){return this.set("description",t)}getVersion(){return this.get("version")}setVersion(t){return this.set("version",t)}setClass(t,e){return this.setRefMap("classes",t,e)}getClass(t){return this.getRefMap("classes",t)}listClassKeys(){return this.listRefMapKeys("classes")}listClassValues(){return this.listRefMapValues("classes")}setEnum(t,e){return this.setRefMap("enums",t,e)}getEnum(t){return this.getRefMap("enums",t)}listEnumKeys(){return this.listRefMapKeys("enums")}listEnumValues(){return this.listRefMapValues("enums")}},hl=class extends q{static EXTENSION_NAME=G;init(){this.extensionName=G,this.propertyType="Class",this.parentTypes=["Schema"]}getDefaults(){return Object.assign(super.getDefaults(),{description:"",properties:new de})}getDescription(){return this.get("description")}setDescription(t){return this.set("description",t)}setProperty(t,e){return this.setRefMap("properties",t,e)}getProperty(t){return this.getRefMap("properties",t)}listPropertyKeys(){return this.listRefMapKeys("properties")}listPropertyValues(){return this.listRefMapValues("properties")}},bl=class extends q{static EXTENSION_NAME=G;init(){this.extensionName=G,this.propertyType="ClassProperty",this.parentTypes=["Class"]}getDefaults(){return Object.assign(super.getDefaults(),{description:"",componentType:null,enumType:null,array:null,count:null,normalized:null,offset:null,scale:null,max:null,min:null,required:null,noData:null,default:null})}getDescription(){return this.get("description")}setDescription(t){return this.set("description",t)}getType(){return this.get("type")}setType(t){return this.set("type",t)}getComponentType(){return this.get("componentType")}setComponentType(t){return this.set("componentType",t)}getEnumType(){return this.get("enumType")}setEnumType(t){return this.set("enumType",t)}getArray(){return this.get("array")}setArray(t){return this.set("array",t)}getCount(){return this.get("count")}setCount(t){return this.set("count",t)}getNormalized(){return this.get("normalized")}setNormalized(t){return this.set("normalized",t)}getOffset(){return this.get("offset")}setOffset(t){return this.set("offset",t)}getScale(){return this.get("scale")}setScale(t){return this.set("scale",t)}getMax(){return this.get("max")}setMax(t){return this.set("max",t)}getMin(){return this.get("min")}setMin(t){return this.set("min",t)}getRequired(){return this.get("required")}setRequired(t){return this.set("required",t)}getNoData(){return this.get("noData")}setNoData(t){return this.set("noData",t)}getDefault(){return this.get("default")}setDefault(t){return this.set("default",t)}},pl=class extends q{static EXTENSION_NAME=G;init(){this.extensionName=G,this.propertyType="Enum",this.parentTypes=["Schema"]}getDefaults(){return Object.assign(super.getDefaults(),{description:"",valueType:"UINT16",values:new be})}getDescription(){return this.get("description")}setDescription(t){return this.set("description",t)}getValueType(){return this.get("valueType")}setValueType(t){return this.set("valueType",t)}listValues(){return this.listRefs("values")}addEnumValue(t){return this.addRef("values",t)}removeEnumValue(t){return this.removeRef("values",t)}},gl=class extends q{static EXTENSION_NAME=G;init(){this.extensionName=G,this.propertyType="EnumValue",this.parentTypes=["Enum"]}getDefaults(){return Object.assign(super.getDefaults(),{description:null})}getDescription(){return this.get("description")}setDescription(t){return this.set("description",t)}getValue(){return this.get("value")}setValue(t){return this.set("value",t)}},ml=class extends q{static EXTENSION_NAME=G;init(){this.extensionName=G,this.propertyType="PropertyTable",this.parentTypes=["StructuralMetadata"]}getDefaults(){return Object.assign(super.getDefaults(),{properties:new de})}getClass(){return this.get("class")}setClass(t){return this.set("class",t)}getCount(){return this.get("count")}setCount(t){return this.set("count",t)}setProperty(t,e){return this.setRefMap("properties",t,e)}getProperty(t){return this.getRefMap("properties",t)}listPropertyKeys(){return this.listRefMapKeys("properties")}listPropertyValues(){return this.listRefMapValues("properties")}},yl=class extends q{static EXTENSION_NAME=G;init(){this.extensionName=G,this.propertyType="PropertyTableProperty",this.parentTypes=["PropertyTable"]}getDefaults(){return Object.assign(super.getDefaults(),{arrayOffsets:null,stringOffsets:null,arrayOffsetType:null,stringOffsetType:null,offset:null,scale:null,max:null,min:null})}getValues(){return this.get("values")}setValues(t){return this.set("values",t)}getArrayOffsets(){return this.get("arrayOffsets")}setArrayOffsets(t){return this.set("arrayOffsets",t)}getStringOffsets(){return this.get("stringOffsets")}setStringOffsets(t){return this.set("stringOffsets",t)}getArrayOffsetType(){return this.get("arrayOffsetType")}setArrayOffsetType(t){return this.set("arrayOffsetType",t)}getStringOffsetType(){return this.get("stringOffsetType")}setStringOffsetType(t){return this.set("stringOffsetType",t)}getOffset(){return this.get("offset")}setOffset(t){return this.set("offset",t)}getScale(){return this.get("scale")}setScale(t){return this.set("scale",t)}getMax(){return this.get("max")}setMax(t){return this.set("max",t)}getMin(){return this.get("min")}setMin(t){return this.set("min",t)}},xl=class extends q{static EXTENSION_NAME=G;init(){this.extensionName=G,this.propertyType="PropertyTexture",this.parentTypes=["StructuralMetadata"]}getDefaults(){return Object.assign(super.getDefaults(),{properties:new de})}getClass(){return this.get("class")}setClass(t){return this.set("class",t)}setProperty(t,e){return this.setRefMap("properties",t,e)}getProperty(t){return this.getRefMap("properties",t)}listPropertyKeys(){return this.listRefMapKeys("properties")}listPropertyValues(){return this.listRefMapValues("properties")}},vl=class extends q{static EXTENSION_NAME=G;init(){this.extensionName=G,this.propertyType="PropertyTextureProperty",this.parentTypes=["PropertyTexture"]}getDefaults(){let t=new se(this.graph,"textureInfo");return t.setMinFilter(se.MagFilter.NEAREST),t.setMagFilter(se.MagFilter.NEAREST),Object.assign(super.getDefaults(),{channels:[0],texture:null,textureInfo:t,offset:null,scale:null,max:null,min:null})}getChannels(){return this.get("channels")}setChannels(t){return this.set("channels",t)}getTexture(){return this.getRef("texture")}setTexture(t){return this.setRef("texture",t)}getTextureInfo(){return this.getRef("texture")?this.getRef("textureInfo"):null}getOffset(){return this.get("offset")}setOffset(t){return this.set("offset",t)}getScale(){return this.get("scale")}setScale(t){return this.set("scale",t)}getMax(){return this.get("max")}setMax(t){return this.set("max",t)}getMin(){return this.get("min")}setMin(t){return this.set("min",t)}},wl=class extends q{static EXTENSION_NAME=G;init(){this.extensionName=G,this.propertyType="PropertyAttribute",this.parentTypes=["StructuralMetadata"]}getDefaults(){return Object.assign(super.getDefaults(),{properties:new de})}getClass(){return this.get("class")}setClass(t){return this.set("class",t)}setProperty(t,e){return this.setRefMap("properties",t,e)}getProperty(t){return this.getRefMap("properties",t)}listPropertyKeys(){return this.listRefMapKeys("properties")}listPropertyValues(){return this.listRefMapValues("properties")}},Tl=class extends q{static EXTENSION_NAME=G;init(){this.extensionName=G,this.propertyType="PropertyAttributeProperty",this.parentTypes=["PropertyAttribute"]}getDefaults(){return Object.assign(super.getDefaults(),{offset:null,scale:null,max:null,min:null})}getAttribute(){return this.get("attribute")}setAttribute(t){return this.set("attribute",t)}getOffset(){return this.get("offset")}setOffset(t){return this.set("offset",t)}getScale(){return this.get("scale")}setScale(t){return this.set("scale",t)}getMax(){return this.get("max")}setMax(t){return this.set("max",t)}getMin(){return this.get("min")}setMin(t){return this.set("min",t)}},El=class extends q{static EXTENSION_NAME=G;init(){this.extensionName=G,this.propertyType="NodeStructuralMetadata",this.parentTypes=[_.NODE]}getDefaults(){return Object.assign(super.getDefaults(),{class:"",properties:{}})}getClass(){return this.get("class")}setClass(t){return this.set("class",t)}getProperties(){return this.get("properties")}setProperties(t){return this.set("properties",t)}},kl=class extends q{static EXTENSION_NAME=G;init(){this.extensionName=G,this.propertyType="MeshPrimitiveStructuralMetadata",this.parentTypes=[_.PRIMITIVE]}getDefaults(){return Object.assign(super.getDefaults(),{propertyTextures:new be,propertyAttributes:new be})}listPropertyTextures(){return this.listRefs("propertyTextures")}addPropertyTexture(t){return this.addRef("propertyTextures",t)}removePropertyTexture(t){return this.removeRef("propertyTextures",t)}listPropertyAttributes(){return this.listRefs("propertyAttributes")}addPropertyAttribute(t){return this.addRef("propertyAttributes",t)}removePropertyAttribute(t){return this.removeRef("propertyAttributes",t)}},Il=class extends ee{extensionName=G;static EXTENSION_NAME=G;prewriteTypes=[_.BUFFER];prereadTypes=[_.SCENE];createStructuralMetadata(){return new ul(this.document.getGraph())}createSchema(){return new fl(this.document.getGraph())}createClass(){return new hl(this.document.getGraph())}createClassProperty(){return new bl(this.document.getGraph())}createEnum(){return new pl(this.document.getGraph())}createEnumValue(){return new gl(this.document.getGraph())}createPropertyTable(){return new ml(this.document.getGraph())}createPropertyTableProperty(){return new yl(this.document.getGraph())}createPropertyTexture(){return new xl(this.document.getGraph())}createPropertyTextureProperty(){return new vl(this.document.getGraph())}createPropertyAttribute(){return new wl(this.document.getGraph())}createPropertyAttributeProperty(){return new Tl(this.document.getGraph())}createNodeStructuralMetadata(){return new El(this.document.getGraph())}createMeshPrimitiveStructuralMetadata(){return new kl(this.document.getGraph())}read(t){return this}preread(t){let e=this.document.getRoot(),{json:a}=t.jsonDoc,s=a.extensions[G],r=Ml(this,t,s);return e.setExtension(G,r),(a.meshes||[]).forEach((n,i)=>{let o=t.meshes[i].listPrimitives();(n.primitives||[]).forEach((c,d)=>{let f=o[d];this._readPrimitive(r,f,c)})}),(a.nodes||[]).forEach((n,i)=>{this._readNode(t.nodes[i],n)}),this}_readPrimitive(t,e,a){if(!a.extensions||!a.extensions.EXT_structural_metadata)return;let s=this.createMeshPrimitiveStructuralMetadata(),r=a.extensions[G],n=t.listPropertyTextures(),i=r.propertyTextures||[];for(let d of i){let f=n[d];s.addPropertyTexture(f)}let o=t.listPropertyAttributes(),c=r.propertyAttributes||[];for(let d of c){let f=o[d];s.addPropertyAttribute(f)}e.setExtension(G,s)}_readNode(t,e){if(!e.extensions||!e.extensions.EXT_structural_metadata)return;let a=e.extensions[G],s=this.createNodeStructuralMetadata().setClass(a.class).setProperties(a.properties);t.setExtension(G,s)}write(t){let e=this.document.getRoot(),a=e.getExtension(G);if(!a)return this;let s=t.jsonDoc.json,r=Dl(t,a);s.extensions=s.extensions||{},s.extensions[G]=r;let n=e.listMeshes(),i=s.meshes;if(i)for(let d of n){let f=i[t.meshIndexMap.get(d)];d.listPrimitives().forEach((p,v)=>{let x=f.primitives[v];this._writePrimitive(a,p,x)})}let o=e.listNodes(),c=s.nodes;if(c)for(let d of o){let f=t.nodeIndexMap.get(d);this._writeNode(d,c[f])}return this}_writePrimitive(t,e,a){let s=e.getExtension(G);if(!s)return;let r=t.listPropertyTextures(),n=t.listPropertyAttributes(),i,o,c=s.listPropertyTextures();if(c.length>0){i=[];for(let p of c){let v=r.indexOf(p);if(v>=0)i.push(v);else throw new Error(`${G}: Invalid property texture in mesh primitive`)}}let d=s.listPropertyAttributes();if(d.length>0){o=[];for(let p of d){let v=n.indexOf(p);if(v>=0)o.push(v);else throw new Error(`${G}: Invalid property attribute in mesh primitive`)}}let f={propertyTextures:i,propertyAttributes:o};a.extensions=a.extensions||{},a.extensions[G]=f}_writeNode(t,e){let a=t.getExtension("EXT_structural_metadata");a&&(e.extensions=e.extensions||{},e.extensions[G]={class:a.getClass(),properties:a.getProperties()})}prewrite(t,e){return e===_.BUFFER&&this._prewriteBuffers(t),this}_prewriteBuffers(t){let e=this.document,a=e.getRoot().getExtension(G);t.jsonDoc.json.bufferViews||=[];for(let s of a.listPropertyTables())for(let r of s.listPropertyValues()){let n=Yl(e,t);n.push(r.getValues());let i=r.getArrayOffsets();i&&n.push(i);let o=r.getStringOffsets();o&&n.push(o)}}};function Ml(t,e,a){let s=t.createStructuralMetadata();if(a.schema!==void 0){let o=Rl(t,a.schema);s.setSchema(o)}else if(a.schemaUri){let o=a.schemaUri;s.setSchemaUri(o)}let r=a.propertyTextures||[];for(let o of r){let c=jl(t,e,o);s.addPropertyTexture(c)}let n=a.propertyTables||[];for(let o of n){let c=Bl(t,e,o);s.addPropertyTable(c)}let i=a.propertyAttributes||[];for(let o of i){let c=Ol(t,o);s.addPropertyAttribute(c)}return s}function Rl(t,e){let a=t.createSchema().setId(e.id);e.name!==void 0&&a.setName(e.name),e.description!==void 0&&a.setDescription(e.description),e.version!==void 0&&a.setVersion(e.version);let s=e.classes||{};for(let n of Object.keys(s)){let i=s[n];a.setClass(n,Sl(t,i))}let r=e.enums||{};for(let n of Object.keys(r))a.setEnum(n,_l(t,r[n]));return a}function Sl(t,e){let a=t.createClass();e.name!==void 0&&a.setName(e.name),e.description!==void 0&&a.setDescription(e.description);let s=e.properties||{};for(let r of Object.keys(s)){let n=Al(t,s[r]);a.setProperty(r,n)}return a}function Al(t,e){let a=t.createClassProperty().setType(e.type);return e.name!==void 0&&a.setName(e.name),e.description!==void 0&&a.setDescription(e.description),e.componentType!==void 0&&a.setComponentType(e.componentType),e.enumType!==void 0&&a.setEnumType(e.enumType),e.array!==void 0&&a.setArray(e.array),e.count!==void 0&&a.setCount(e.count),e.normalized!==void 0&&a.setNormalized(e.normalized),e.offset!==void 0&&a.setOffset(e.offset),e.scale!==void 0&&a.setScale(e.scale),e.max!==void 0&&a.setMax(e.max),e.min!==void 0&&a.setMin(e.min),e.required!==void 0&&a.setRequired(e.required),e.noData!==void 0&&a.setNoData(e.noData),e.default!==void 0&&a.setDefault(e.default),a}function _l(t,e){let a=t.createEnum();e.name!==void 0&&a.setName(e.name),e.description!==void 0&&a.setDescription(e.description),e.valueType!==void 0&&a.setValueType(e.valueType);let s=e.values||{};for(let r of s)a.addEnumValue(Nl(t,r));return a}function Nl(t,e){let a=t.createEnumValue();return e.name!==void 0&&a.setName(e.name),e.description!==void 0&&a.setDescription(e.description),e.value!==void 0&&a.setValue(e.value),a}function jl(t,e,a){let s=t.createPropertyTexture();s.setClass(a.class),a.name!==void 0&&s.setName(a.name);let r=a.properties||{};for(let n of Object.keys(r)){let i=Fl(t,e,r[n]);s.setProperty(n,i)}return s}function Fl(t,e,a){let s=t.createPropertyTextureProperty(),r=e.jsonDoc.json.textures||[];a.channels&&s.setChannels(a.channels);let n=r[a.index].source;if(n!==void 0){let i=e.textures[n];s.setTexture(i);let o=s.getTextureInfo();o&&e.setTextureInfo(o,a)}return a.offset!==void 0&&s.setOffset(a.offset),a.scale!==void 0&&s.setScale(a.scale),a.max!==void 0&&s.setMax(a.max),a.min!==void 0&&s.setMin(a.min),s}function Bl(t,e,a){let s=t.createPropertyTable().setClass(a.class).setCount(a.count);a.name!==void 0&&s.setName(a.name);let r=a.properties||{};for(let n of Object.keys(r)){let i=Cl(t,e,r[n]);s.setProperty(n,i)}return s}function Cl(t,e,a){let s=t.createPropertyTableProperty(),r=Ws(e,a.values);if(s.setValues(r),a.arrayOffsets!==void 0){let n=Ws(e,a.arrayOffsets);s.setArrayOffsets(n)}if(a.stringOffsets!==void 0){let n=Ws(e,a.stringOffsets);s.setStringOffsets(n)}return a.arrayOffsetType!==void 0&&s.setArrayOffsetType(a.arrayOffsetType),a.stringOffsetType!==void 0&&s.setStringOffsetType(a.stringOffsetType),a.offset!==void 0&&s.setOffset(a.offset),a.scale!==void 0&&s.setScale(a.scale),a.max!==void 0&&s.setMax(a.max),a.min!==void 0&&s.setMin(a.min),s}function Ol(t,e){let a=t.createPropertyAttribute();a.setClass(e.class),e.name!==void 0&&a.setName(e.name);let s=e.properties||{};for(let r of Object.keys(s)){let n=Pl(t,s[r]);a.setProperty(r,n)}return a}function Pl(t,e){let a=t.createPropertyAttributeProperty();return a.setAttribute(e.attribute),e.offset!==void 0&&a.setOffset(e.offset),e.scale!==void 0&&a.setScale(e.scale),e.max!==void 0&&a.setMax(e.max),e.min!==void 0&&a.setMin(e.min),a}function Dl(t,e){let a={},s=e.getSchema();s&&(a.schema=Ul(s));let r=e.getSchemaUri();r&&(a.schemaUri=r);let n=e.listPropertyTables();if(n.length>0){let c=[];for(let d of n){let f=Vl(t,d);c.push(f)}a.propertyTables=c}let i=e.listPropertyTextures();if(i.length>0){let c=[];for(let d of i){let f=Wl(t,d);c.push(f)}a.propertyTextures=c}let o=e.listPropertyAttributes();if(o.length>0){let c=[];for(let d of o){let f=ql(d);c.push(f)}a.propertyAttributes=c}return a}function Ul(t){let e={id:t.getId()},a=t.listClassKeys();if(a.length>0){e.classes={};for(let r of a){let n=Ll(t.getClass(r));e.classes[r]=n}}let s=t.listEnumKeys();if(s.length>0){e.enums={};for(let r of s){let n=Gl(t.getEnum(r));e.enums[r]=n}}return t.getName()&&(e.name=t.getName()),t.getDescription()&&(e.description=t.getDescription()),t.getVersion()&&(e.version=t.getVersion()),e}function Ll(t){let e={},a=t.listPropertyKeys();if(a.length>0){e.properties={};for(let s of a){let r=t.getProperty(s);e.properties[s]=Kl(r)}}return t.getName()&&(e.name=t.getName()),t.getDescription()&&(e.description=t.getDescription()),e}function Kl(t){let e={type:t.getType()};return t.getArray()&&(e.array=t.getArray()),t.getNormalized()&&(e.normalized=t.getNormalized()),t.getRequired()&&(e.required=t.getRequired()),t.getName()&&(e.name=t.getName()),t.getDescription()&&(e.description=t.getDescription()),t.getComponentType()!=null&&(e.componentType=t.getComponentType()),t.getEnumType()!=null&&(e.enumType=t.getEnumType()),t.getCount()!=null&&(e.count=t.getCount()),t.getOffset()!=null&&(e.offset=t.getOffset()),t.getScale()!=null&&(e.scale=t.getScale()),t.getMax()!=null&&(e.max=t.getMax()),t.getMin()!=null&&(e.min=t.getMin()),t.getNoData()!=null&&(e.noData=t.getNoData()),t.getDefault()!=null&&(e.default=t.getDefault()),e}function Gl(t){let e={values:t.listValues().map(zl)};return t.getName()&&(e.name=t.getName()),t.getDescription()&&(e.description=t.getDescription()),t.getValueType()!=="UINT16"&&(e.valueType=t.getValueType()),e}function zl(t){let e={name:t.getName(),value:t.getValue()};return t.getDescription()&&(e.description=t.getDescription()),e}function Vl(t,e){let a={class:e.getClass(),count:e.getCount()};e.getName()&&(a.name=e.getName());let s=e.listPropertyKeys();if(s.length>0){a.properties={};for(let r of s){let n=Hl(t,e.getProperty(r));a.properties[r]=n}}return a}function Hl(t,e){let a=e.getValues(),s={values:t.otherBufferViewsIndexMap.get(a)};if(e.getArrayOffsets()){let r=e.getArrayOffsets();s.arrayOffsets=t.otherBufferViewsIndexMap.get(r)}if(e.getStringOffsets()){let r=e.getStringOffsets();s.stringOffsets=t.otherBufferViewsIndexMap.get(r)}return e.getArrayOffsetType()!=null&&(s.arrayOffsetType=e.getArrayOffsetType()),e.getStringOffsetType()!=null&&(s.stringOffsetType=e.getStringOffsetType()),e.getOffset()!=null&&(s.offset=e.getOffset()),e.getScale()!=null&&(s.scale=e.getScale()),e.getMax()!=null&&(s.max=e.getMax()),e.getMin()!=null&&(s.min=e.getMin()),s}function ql(t){let e={class:t.getClass()};t.getName()&&(e.name=t.getName());let a=t.listPropertyKeys();if(a.length>0){e.properties={};for(let s of a){let r=Xl(t.getProperty(s));e.properties[s]=r}}return e}function Xl(t){let e={attribute:t.getAttribute()};return t.getOffset()!=null&&(e.offset=t.getOffset()),t.getScale()!=null&&(e.scale=t.getScale()),t.getMax()!=null&&(e.max=t.getMax()),t.getMin()!=null&&(e.min=t.getMin()),e}function Wl(t,e){let a={class:e.getClass()};e.getName()&&(a.name=e.getName());let s=e.listPropertyKeys();if(s.length>0){a.properties={};for(let r of s){let n=Jl(t,e.getProperty(r));a.properties[r]=n}}return a}function Jl(t,e){let a=e.getTexture(),s=e.getTextureInfo(),r=e.getChannels(),n=t.createTextureInfoDef(a,s);return re.eq(r,[0])||(n.channels=r),e.getOffset()!=null&&(n.offset=e.getOffset()),e.getScale()!=null&&(n.scale=e.getScale()),e.getMax()!=null&&(n.max=e.getMax()),e.getMin()!=null&&(n.min=e.getMin()),n}function Ws(t,e){let a=t.jsonDoc,s=a.json.buffers||[],r=(a.json.bufferViews||[])[e],n=s[r.buffer],i=n.uri?a.resources[n.uri]:a.resources[it],o=r.byteOffset||0,c=r.byteLength;return i.slice(o,o+c)}function Yl(t,e){let a=t.getRoot().listBuffers()[0],s=e.otherBufferViews.get(a);return s||(s=[],e.otherBufferViews.set(a,s)),s}var $l=class{match(t){return t.length>=12&&z.decodeText(t.slice(4,12))==="ftypavif"}getSize(t){if(!this.match(t))return null;let e=new DataView(t.buffer,t.byteOffset,t.byteLength),a=wn(e,0);if(!a)return null;let s=a.end;for(;a=wn(e,s);)if(a.type==="meta")s=a.start+4;else if(a.type==="iprp"||a.type==="ipco")s=a.start;else{if(a.type==="ispe")return[e.getUint32(a.start+4),e.getUint32(a.start+8)];if(a.type==="mdat")break;s=a.end}return null}getChannels(t){return 4}},Ql=class extends ee{extensionName=Ya;prereadTypes=[_.TEXTURE];static EXTENSION_NAME=Ya;static register(){qe.registerFormat("image/avif",new $l)}preread(t){return(t.jsonDoc.json.textures||[]).forEach(e=>{e.extensions&&e.extensions.EXT_texture_avif&&(e.source=e.extensions[Ya].source)}),this}read(t){return this}write(t){let e=t.jsonDoc;return this.document.getRoot().listTextures().forEach(a=>{if(a.getMimeType()==="image/avif"){let s=t.imageIndexMap.get(a);(e.json.textures||[]).forEach(r=>{r.source===s&&(r.extensions=r.extensions||{},r.extensions[Ya]={source:r.source},delete r.source)})}}),this}};function wn(t,e){if(t.byteLength<4+e)return null;let a=t.getUint32(e);return t.byteLength<a+e||a<8?null:{type:z.decodeText(new Uint8Array(t.buffer,t.byteOffset+e+4,4)),start:e+8,end:e+a}}var Zl=class{match(t){return t.length>=12&&t[8]===87&&t[9]===69&&t[10]===66&&t[11]===80}getSize(t){let e=z.decodeText(t.slice(0,4)),a=z.decodeText(t.slice(8,12));if(e!=="RIFF"||a!=="WEBP")return null;let s=new DataView(t.buffer,t.byteOffset),r=12;for(;r<s.byteLength;){let n=z.decodeText(new Uint8Array([s.getUint8(r),s.getUint8(r+1),s.getUint8(r+2),s.getUint8(r+3)])),i=s.getUint32(r+4,!0);if(n==="VP8 ")return[s.getInt16(r+14,!0)&16383,s.getInt16(r+16,!0)&16383];if(n==="VP8L"){let o=s.getUint8(r+9),c=s.getUint8(r+10),d=s.getUint8(r+11),f=s.getUint8(r+12);return[1+((c&63)<<8|o),1+((f&15)<<10|d<<2|(c&192)>>6)]}r+=8+i+i%2}return null}getChannels(t){return 4}},ed=class extends ee{extensionName=Ja;prereadTypes=[_.TEXTURE];static EXTENSION_NAME=Ja;static register(){qe.registerFormat("image/webp",new Zl)}preread(t){return(t.jsonDoc.json.textures||[]).forEach(e=>{e.extensions&&e.extensions.EXT_texture_webp&&(e.source=e.extensions[Ja].source)}),this}read(t){return this}write(t){let e=t.jsonDoc;return this.document.getRoot().listTextures().forEach(a=>{if(a.getMimeType()==="image/webp"){let s=t.imageIndexMap.get(a);(e.json.textures||[]).forEach(r=>{r.source===s&&(r.extensions=r.extensions||{},r.extensions[Ja]={source:r.source},delete r.source)})}}),this}},Tn=Hc,td=class extends ee{extensionName=Tn;static EXTENSION_NAME=Tn;read(t){return this}write(t){return this}},En=qc,ad=class extends ee{extensionName=En;static EXTENSION_NAME=En;read(t){return this}write(t){return this}},fe,Pn,Dn;function sd(t,e){let a=new fe.DecoderBuffer;try{if(a.Init(e,e.length),t.GetEncodedGeometryType(a)!==fe.TRIANGULAR_MESH)throw new Error(`[${ce}] Unknown geometry type.`);let s=new fe.Mesh;if(!t.DecodeBufferToMesh(a,s).ok()||s.ptr===0)throw new Error(`[${ce}] Decoding failure.`);return s}finally{fe.destroy(a)}}function rd(t,e){let a=e.num_faces()*3,s,r;if(e.num_points()<=65534){let n=a*Uint16Array.BYTES_PER_ELEMENT;s=fe._malloc(n),t.GetTrianglesUInt16Array(e,n,s),r=new Uint16Array(fe.HEAPU16.buffer,s,a).slice()}else{let n=a*Uint32Array.BYTES_PER_ELEMENT;s=fe._malloc(n),t.GetTrianglesUInt32Array(e,n,s),r=new Uint32Array(fe.HEAPU32.buffer,s,a).slice()}return fe._free(s),r}function nd(t,e,a,s){let r=Dn[s.componentType],n=Pn[s.componentType],i=a.num_components(),o=e.num_points()*i,c=o*n.BYTES_PER_ELEMENT,d=fe._malloc(c);t.GetAttributeDataArrayForAllPoints(e,a,r,c,d);let f=new n(fe.HEAPF32.buffer,d,o).slice();return fe._free(d),f}function id(t){fe=t,Pn={[U.ComponentType.FLOAT]:Float32Array,[U.ComponentType.UNSIGNED_INT]:Uint32Array,[U.ComponentType.UNSIGNED_SHORT]:Uint16Array,[U.ComponentType.UNSIGNED_BYTE]:Uint8Array,[U.ComponentType.SHORT]:Int16Array,[U.ComponentType.BYTE]:Int8Array},Dn={[U.ComponentType.FLOAT]:fe.DT_FLOAT32,[U.ComponentType.UNSIGNED_INT]:fe.DT_UINT32,[U.ComponentType.UNSIGNED_SHORT]:fe.DT_UINT16,[U.ComponentType.UNSIGNED_BYTE]:fe.DT_UINT8,[U.ComponentType.SHORT]:fe.DT_INT16,[U.ComponentType.BYTE]:fe.DT_INT8}}var Ce,od=(function(t){return t[t.EDGEBREAKER=1]="EDGEBREAKER",t[t.SEQUENTIAL=0]="SEQUENTIAL",t})({}),Un={POSITION:14,NORMAL:10,COLOR:8,TEX_COORD:12,GENERIC:12},kn={decodeSpeed:5,encodeSpeed:5,method:1,quantizationBits:Un,quantizationVolume:"mesh"};function cd(t){Ce=t}function ld(t,e=kn){let a={...kn,...e};a.quantizationBits={...Un,...e.quantizationBits};let s=new Ce.MeshBuilder,r=new Ce.Mesh,n=new Ce.ExpertEncoder(r),i={},o=new Ce.DracoInt8Array,c=t.listTargets().length>0,d=!1;for(let l of t.listSemantics()){let m=t.getAttribute(l);if(m.getSparse()){d=!0;continue}let u=dd(l),g=ud(s,m.getComponentType(),r,Ce[u],m.getCount(),m.getElementSize(),m.getArray());if(g===-1)throw new Error(`Error compressing "${l}" attribute.`);if(i[l]=g,a.quantizationVolume==="mesh"||l!=="POSITION")n.SetAttributeQuantization(g,a.quantizationBits[u]);else if(typeof a.quantizationVolume=="object"){let{quantizationVolume:y}=a,w=Math.max(y.max[0]-y.min[0],y.max[1]-y.min[1],y.max[2]-y.min[2]);n.SetAttributeExplicitQuantization(g,a.quantizationBits[u],m.getElementSize(),y.min,w)}else throw new Error("Invalid quantization volume state.")}let f=t.getIndices();if(!f)throw new Qs("Primitive must have indices.");s.AddFacesToMesh(r,f.getCount()/3,f.getArray()),n.SetSpeedOptions(a.encodeSpeed,a.decodeSpeed),n.SetTrackEncodedProperties(!0),a.method===0||c||d?n.SetEncodingMethod(Ce.MESH_SEQUENTIAL_ENCODING):n.SetEncodingMethod(Ce.MESH_EDGEBREAKER_ENCODING);let p=n.EncodeToDracoBuffer(!(c||d),o);if(p<=0)throw new Qs("Error applying Draco compression.");let v=new Uint8Array(p);for(let l=0;l<p;++l)v[l]=o.GetValue(l);let x=n.GetNumberOfEncodedPoints(),b=n.GetNumberOfEncodedFaces()*3;return Ce.destroy(o),Ce.destroy(r),Ce.destroy(s),Ce.destroy(n),{numVertices:x,numIndices:b,data:v,attributeIDs:i}}function dd(t){return t==="POSITION"?"POSITION":t==="NORMAL"?"NORMAL":t.startsWith("COLOR_")?"COLOR":t.startsWith("TEXCOORD_")?"TEX_COORD":"GENERIC"}function ud(t,e,a,s,r,n,i){switch(e){case U.ComponentType.UNSIGNED_BYTE:return t.AddUInt8Attribute(a,s,r,n,i);case U.ComponentType.BYTE:return t.AddInt8Attribute(a,s,r,n,i);case U.ComponentType.UNSIGNED_SHORT:return t.AddUInt16Attribute(a,s,r,n,i);case U.ComponentType.SHORT:return t.AddInt16Attribute(a,s,r,n,i);case U.ComponentType.UNSIGNED_INT:return t.AddUInt32Attribute(a,s,r,n,i);case U.ComponentType.FLOAT:return t.AddFloatAttribute(a,s,r,n,i);default:throw new Error(`Unexpected component type, "${e}".`)}}var Qs=class extends Error{},fd=class extends ee{extensionName=ce;prereadTypes=[_.PRIMITIVE];prewriteTypes=[_.ACCESSOR];readDependencies=["draco3d.decoder"];writeDependencies=["draco3d.encoder"];static EXTENSION_NAME=ce;static EncoderMethod=od;_decoderModule=null;_encoderModule=null;_encoderOptions={};install(t,e){return t==="draco3d.decoder"&&(this._decoderModule=e,id(this._decoderModule)),t==="draco3d.encoder"&&(this._encoderModule=e,cd(this._encoderModule)),this}setEncoderOptions(t){return this._encoderOptions=t,this}preread(t){if(!this._decoderModule)throw new Error(`[${ce}] Please install extension dependency, "draco3d.decoder".`);let e=this.document.getLogger(),a=t.jsonDoc,s=new Map;try{let r=a.json.meshes||[];for(let n of r)for(let i of n.primitives){if(!i.extensions||!i.extensions.KHR_draco_mesh_compression)continue;let o=i.extensions[ce],[c,d]=s.get(o.bufferView)||[];if(!d||!c){let f=a.json.bufferViews[o.bufferView],p=a.json.buffers[f.buffer],v=p.uri?a.resources[p.uri]:a.resources[it],x=f.byteOffset||0,b=f.byteLength,l=z.toView(v,x,b);c=new this._decoderModule.Decoder,d=sd(c,l),s.set(o.bufferView,[c,d]),e.debug(`[${ce}] Decompressed ${l.byteLength} bytes.`)}for(let f in o.attributes){let p=t.jsonDoc.json.accessors[i.attributes[f]],v=c.GetAttributeByUniqueId(d,o.attributes[f]),x=nd(c,d,v,p);t.accessors[i.attributes[f]].setArray(x)}i.indices!==void 0&&t.accessors[i.indices].setArray(rd(c,d))}}finally{for(let[r,n]of Array.from(s.values()))this._decoderModule.destroy(r),this._decoderModule.destroy(n)}return this}read(t){return this}prewrite(t,e){if(!this._encoderModule)throw new Error(`[${ce}] Please install extension dependency, "draco3d.encoder".`);let a=this.document.getLogger();a.debug(`[${ce}] Compression options: ${JSON.stringify(this._encoderOptions)}`);let s=hd(this.document),r=new Map,n="mesh";this._encoderOptions.quantizationVolume==="scene"&&(this.document.getRoot().listScenes().length!==1?a.warn(`[${ce}]: quantizationVolume=scene requires exactly 1 scene.`):n=Yr(this.document.getRoot().listScenes().pop()));for(let i of Array.from(s.keys())){let o=s.get(i);if(!o)throw new Error("Unexpected primitive.");if(r.has(o)){r.set(o,r.get(o));continue}let c=i.getIndices(),d=t.jsonDoc.json.accessors,f;try{f=ld(i,{...this._encoderOptions,quantizationVolume:n})}catch(x){if(x instanceof Qs){a.warn(`[${ce}]: ${x.message} Skipping primitive compression.`);continue}throw x}r.set(o,f);let p=t.createAccessorDef(c);p.count=f.numIndices,t.accessorIndexMap.set(c,d.length),d.push(p),f.numVertices>65534&&U.getComponentSize(p.componentType)<=2?p.componentType=U.ComponentType.UNSIGNED_INT:f.numVertices>254&&U.getComponentSize(p.componentType)<=1&&(p.componentType=U.ComponentType.UNSIGNED_SHORT);for(let x of i.listSemantics()){let b=i.getAttribute(x);if(f.attributeIDs[x]===void 0)continue;let l=t.createAccessorDef(b);l.count=f.numVertices,t.accessorIndexMap.set(b,d.length),d.push(l)}let v=i.getAttribute("POSITION").getBuffer()||this.document.getRoot().listBuffers()[0];t.otherBufferViews.has(v)||t.otherBufferViews.set(v,[]),t.otherBufferViews.get(v).push(f.data)}return a.debug(`[${ce}] Compressed ${s.size} primitives.`),t.extensionData[ce]={primitiveHashMap:s,primitiveEncodingMap:r},this}write(t){let e=t.extensionData[ce];for(let a of this.document.getRoot().listMeshes()){let s=t.jsonDoc.json.meshes[t.meshIndexMap.get(a)];for(let r=0;r<a.listPrimitives().length;r++){let n=a.listPrimitives()[r],i=s.primitives[r],o=e.primitiveHashMap.get(n);if(!o)continue;let c=e.primitiveEncodingMap.get(o);c&&(i.extensions=i.extensions||{},i.extensions[ce]={bufferView:t.otherBufferViewsIndexMap.get(c.data),attributes:c.attributeIDs})}}if(!e.primitiveHashMap.size){let a=t.jsonDoc.json;a.extensionsUsed=(a.extensionsUsed||[]).filter(s=>s!==ce),a.extensionsRequired=(a.extensionsRequired||[]).filter(s=>s!==ce)}return this}};function hd(t){let e=t.getLogger(),a=new Set,s=new Set,r=0,n=0;for(let p of t.getRoot().listMeshes())for(let v of p.listPrimitives())v.getIndices()?v.getMode()!==ra.Mode.TRIANGLES?(s.add(v),n++):a.add(v):(s.add(v),r++);r>0&&e.warn(`[${ce}] Skipping Draco compression of ${r} non-indexed primitives.`),n>0&&e.warn(`[${ce}] Skipping Draco compression of ${n} non-TRIANGLES primitives.`);let i=t.getRoot().listAccessors(),o=new Map;for(let p=0;p<i.length;p++)o.set(i[p],p);let c=new Map,d=new Set,f=new Map;for(let p of Array.from(a)){let v=In(p,o);if(d.has(v)){f.set(p,v);continue}if(c.has(p.getIndices())){let x=p.getIndices(),b=x.clone();o.set(b,t.getRoot().listAccessors().length-1),p.swap(x,b)}for(let x of p.listAttributes())if(c.has(x)){let b=x.clone();o.set(b,t.getRoot().listAccessors().length-1),p.swap(x,b)}v=In(p,o),d.add(v),f.set(p,v),c.set(p.getIndices(),v);for(let x of p.listAttributes())c.set(x,v)}for(let p of Array.from(c.keys())){let v=new Set(p.listParents().map(x=>x.propertyType));if(v.size!==2||!v.has(_.PRIMITIVE)||!v.has(_.ROOT))throw new Error(`[${ce}] Compressed accessors must only be used as indices or vertex attributes.`)}for(let p of Array.from(a)){let v=f.get(p),x=p.getIndices();if(c.get(x)!==v||p.listAttributes().some(b=>c.get(b)!==v))throw new Error(`[${ce}] Draco primitives must share all, or no, accessors.`)}for(let p of Array.from(s)){let v=p.getIndices();if(c.has(v)||p.listAttributes().some(x=>c.has(x)))throw new Error(`[${ce}] Accessor cannot be shared by compressed and uncompressed primitives.`)}return f}function In(t,e){let a=[],s=t.getIndices();a.push(e.get(s));for(let r of t.listAttributes())a.push(e.get(r));return a.sort().join("|")}var Mn=class Ln extends q{static EXTENSION_NAME=Je;static Type={POINT:"point",SPOT:"spot",DIRECTIONAL:"directional"};init(){this.extensionName=Je,this.propertyType="Light",this.parentTypes=[_.NODE]}getDefaults(){return Object.assign(super.getDefaults(),{color:[1,1,1],intensity:1,type:Ln.Type.POINT,range:null,innerConeAngle:0,outerConeAngle:Math.PI/4})}getColor(){return this.get("color")}setColor(e){return this.set("color",e)}getIntensity(){return this.get("intensity")}setIntensity(e){return this.set("intensity",e)}getType(){return this.get("type")}setType(e){return this.set("type",e)}getRange(){return this.get("range")}setRange(e){return this.set("range",e)}getInnerConeAngle(){return this.get("innerConeAngle")}setInnerConeAngle(e){return this.set("innerConeAngle",e)}getOuterConeAngle(){return this.get("outerConeAngle")}setOuterConeAngle(e){return this.set("outerConeAngle",e)}},bd=class extends ee{extensionName=Je;static EXTENSION_NAME=Je;createLight(t=""){return new Mn(this.document.getGraph(),t)}read(t){let e=t.jsonDoc;if(!e.json.extensions||!e.json.extensions.KHR_lights_punctual)return this;let a=(e.json.extensions.KHR_lights_punctual.lights||[]).map(s=>{let r=this.createLight().setName(s.name||"").setType(s.type);return s.extras&&r.setExtras(s.extras),s.color!==void 0&&r.setColor(s.color),s.intensity!==void 0&&r.setIntensity(s.intensity),s.range!==void 0&&r.setRange(s.range),s.spot?.innerConeAngle!==void 0&&r.setInnerConeAngle(s.spot.innerConeAngle),s.spot?.outerConeAngle!==void 0&&r.setOuterConeAngle(s.spot.outerConeAngle),r});return e.json.nodes.forEach((s,r)=>{if(!s.extensions||!s.extensions.KHR_lights_punctual)return;let n=s.extensions[Je];t.nodes[r].setExtension(Je,a[n.light])}),this}write(t){let e=t.jsonDoc;if(this.properties.size===0)return this;let a=[],s=new Map;for(let r of this.properties){let n=r,i=t.createPropertyDef(r);i.type=n.getType(),re.eq(n.getColor(),[1,1,1])||(i.color=n.getColor()),n.getIntensity()!==1&&(i.intensity=n.getIntensity()),n.getRange()!=null&&(i.range=n.getRange()),n.getName()&&(i.name=n.getName()),n.getType()===Mn.Type.SPOT&&(i.spot={innerConeAngle:n.getInnerConeAngle(),outerConeAngle:n.getOuterConeAngle()}),a.push(i),s.set(n,a.length-1)}return this.document.getRoot().listNodes().forEach(r=>{let n=r.getExtension(Je);if(n){let i=t.nodeIndexMap.get(r),o=e.json.nodes[i];o.extensions=o.extensions||{},o.extensions[Je]={light:s.get(n)}}}),e.json.extensions=e.json.extensions||{},e.json.extensions[Je]={lights:a},this}},{R:pd,G:gd,B:md}=Le,yd=class extends q{static EXTENSION_NAME=lt;init(){this.extensionName=lt,this.propertyType="Anisotropy",this.parentTypes=[_.MATERIAL]}getDefaults(){return Object.assign(super.getDefaults(),{anisotropyStrength:0,anisotropyRotation:0,anisotropyTexture:null,anisotropyTextureInfo:new se(this.graph,"anisotropyTextureInfo")})}getAnisotropyStrength(){return this.get("anisotropyStrength")}setAnisotropyStrength(t){return this.set("anisotropyStrength",t)}getAnisotropyRotation(){return this.get("anisotropyRotation")}setAnisotropyRotation(t){return this.set("anisotropyRotation",t)}getAnisotropyTexture(){return this.getRef("anisotropyTexture")}getAnisotropyTextureInfo(){return this.getRef("anisotropyTexture")?this.getRef("anisotropyTextureInfo"):null}setAnisotropyTexture(t){return this.setRef("anisotropyTexture",t,{channels:pd|gd|md})}},xd=class extends ee{static EXTENSION_NAME=lt;extensionName=lt;prereadTypes=[_.MESH];prewriteTypes=[_.MESH];createAnisotropy(){return new yd(this.document.getGraph())}read(t){return this}write(t){return this}preread(t){let e=t.jsonDoc,a=e.json.materials||[],s=e.json.textures||[];return a.forEach((r,n)=>{if(r.extensions&&r.extensions.KHR_materials_anisotropy){let i=this.createAnisotropy();t.materials[n].setExtension(lt,i);let o=r.extensions[lt];if(o.extras&&i.setExtras(o.extras),o.anisotropyStrength!==void 0&&i.setAnisotropyStrength(o.anisotropyStrength),o.anisotropyRotation!==void 0&&i.setAnisotropyRotation(o.anisotropyRotation),o.anisotropyTexture!==void 0){let c=o.anisotropyTexture,d=t.textures[s[c.index].source];i.setAnisotropyTexture(d),t.setTextureInfo(i.getAnisotropyTextureInfo(),c)}}}),this}prewrite(t){let e=t.jsonDoc;return this.document.getRoot().listMaterials().forEach(a=>{let s=a.getExtension(lt);if(s){let r=t.materialIndexMap.get(a),n=e.json.materials[r],i=t.createPropertyDef(s);if(n.extensions=n.extensions||{},n.extensions[lt]=i,s.getAnisotropyStrength()>0&&(i.anisotropyStrength=s.getAnisotropyStrength()),s.getAnisotropyRotation()!==0&&(i.anisotropyRotation=s.getAnisotropyRotation()),s.getAnisotropyTexture()){let o=s.getAnisotropyTexture(),c=s.getAnisotropyTextureInfo();i.anisotropyTexture=t.createTextureInfoDef(o,c)}}}),this}},{R:Rn,G:Sn,B:vd}=Le,wd=class extends q{static EXTENSION_NAME=dt;init(){this.extensionName=dt,this.propertyType="Clearcoat",this.parentTypes=[_.MATERIAL]}getDefaults(){return Object.assign(super.getDefaults(),{clearcoatFactor:0,clearcoatTexture:null,clearcoatTextureInfo:new se(this.graph,"clearcoatTextureInfo"),clearcoatRoughnessFactor:0,clearcoatRoughnessTexture:null,clearcoatRoughnessTextureInfo:new se(this.graph,"clearcoatRoughnessTextureInfo"),clearcoatNormalScale:1,clearcoatNormalTexture:null,clearcoatNormalTextureInfo:new se(this.graph,"clearcoatNormalTextureInfo")})}getClearcoatFactor(){return this.get("clearcoatFactor")}setClearcoatFactor(t){return this.set("clearcoatFactor",t)}getClearcoatTexture(){return this.getRef("clearcoatTexture")}getClearcoatTextureInfo(){return this.getRef("clearcoatTexture")?this.getRef("clearcoatTextureInfo"):null}setClearcoatTexture(t){return this.setRef("clearcoatTexture",t,{channels:Rn})}getClearcoatRoughnessFactor(){return this.get("clearcoatRoughnessFactor")}setClearcoatRoughnessFactor(t){return this.set("clearcoatRoughnessFactor",t)}getClearcoatRoughnessTexture(){return this.getRef("clearcoatRoughnessTexture")}getClearcoatRoughnessTextureInfo(){return this.getRef("clearcoatRoughnessTexture")?this.getRef("clearcoatRoughnessTextureInfo"):null}setClearcoatRoughnessTexture(t){return this.setRef("clearcoatRoughnessTexture",t,{channels:Sn})}getClearcoatNormalScale(){return this.get("clearcoatNormalScale")}setClearcoatNormalScale(t){return this.set("clearcoatNormalScale",t)}getClearcoatNormalTexture(){return this.getRef("clearcoatNormalTexture")}getClearcoatNormalTextureInfo(){return this.getRef("clearcoatNormalTexture")?this.getRef("clearcoatNormalTextureInfo"):null}setClearcoatNormalTexture(t){return this.setRef("clearcoatNormalTexture",t,{channels:Rn|Sn|vd})}},Td=class extends ee{static EXTENSION_NAME=dt;extensionName=dt;prereadTypes=[_.MESH];prewriteTypes=[_.MESH];createClearcoat(){return new wd(this.document.getGraph())}read(t){return this}write(t){return this}preread(t){let e=t.jsonDoc,a=e.json.materials||[],s=e.json.textures||[];return a.forEach((r,n)=>{if(r.extensions&&r.extensions.KHR_materials_clearcoat){let i=this.createClearcoat();t.materials[n].setExtension(dt,i);let o=r.extensions[dt];if(o.extras&&i.setExtras(o.extras),o.clearcoatFactor!==void 0&&i.setClearcoatFactor(o.clearcoatFactor),o.clearcoatRoughnessFactor!==void 0&&i.setClearcoatRoughnessFactor(o.clearcoatRoughnessFactor),o.clearcoatTexture!==void 0){let c=o.clearcoatTexture,d=t.textures[s[c.index].source];i.setClearcoatTexture(d),t.setTextureInfo(i.getClearcoatTextureInfo(),c)}if(o.clearcoatRoughnessTexture!==void 0){let c=o.clearcoatRoughnessTexture,d=t.textures[s[c.index].source];i.setClearcoatRoughnessTexture(d),t.setTextureInfo(i.getClearcoatRoughnessTextureInfo(),c)}if(o.clearcoatNormalTexture!==void 0){let c=o.clearcoatNormalTexture,d=t.textures[s[c.index].source];i.setClearcoatNormalTexture(d),t.setTextureInfo(i.getClearcoatNormalTextureInfo(),c),c.scale!==void 0&&i.setClearcoatNormalScale(c.scale)}}}),this}prewrite(t){let e=t.jsonDoc;return this.document.getRoot().listMaterials().forEach(a=>{let s=a.getExtension(dt);if(s){let r=t.materialIndexMap.get(a),n=e.json.materials[r],i=t.createPropertyDef(s);if(n.extensions=n.extensions||{},n.extensions[dt]=i,i.clearcoatFactor=s.getClearcoatFactor(),i.clearcoatRoughnessFactor=s.getClearcoatRoughnessFactor(),s.getClearcoatTexture()){let o=s.getClearcoatTexture(),c=s.getClearcoatTextureInfo();i.clearcoatTexture=t.createTextureInfoDef(o,c)}if(s.getClearcoatRoughnessTexture()){let o=s.getClearcoatRoughnessTexture(),c=s.getClearcoatRoughnessTextureInfo();i.clearcoatRoughnessTexture=t.createTextureInfoDef(o,c)}if(s.getClearcoatNormalTexture()){let o=s.getClearcoatNormalTexture(),c=s.getClearcoatNormalTextureInfo();i.clearcoatNormalTexture=t.createTextureInfoDef(o,c),s.getClearcoatNormalScale()!==1&&(i.clearcoatNormalTexture.scale=s.getClearcoatNormalScale())}}}),this}},{R:Ed,G:kd,B:Id,A:Md}=Le,Rd=class extends q{static EXTENSION_NAME=ut;init(){this.extensionName=ut,this.propertyType="DiffuseTransmission",this.parentTypes=[_.MATERIAL]}getDefaults(){return Object.assign(super.getDefaults(),{diffuseTransmissionFactor:0,diffuseTransmissionTexture:null,diffuseTransmissionTextureInfo:new se(this.graph,"diffuseTransmissionTextureInfo"),diffuseTransmissionColorFactor:[1,1,1],diffuseTransmissionColorTexture:null,diffuseTransmissionColorTextureInfo:new se(this.graph,"diffuseTransmissionColorTextureInfo")})}getDiffuseTransmissionFactor(){return this.get("diffuseTransmissionFactor")}setDiffuseTransmissionFactor(t){return this.set("diffuseTransmissionFactor",t)}getDiffuseTransmissionTexture(){return this.getRef("diffuseTransmissionTexture")}getDiffuseTransmissionTextureInfo(){return this.getRef("diffuseTransmissionTexture")?this.getRef("diffuseTransmissionTextureInfo"):null}setDiffuseTransmissionTexture(t){return this.setRef("diffuseTransmissionTexture",t,{channels:Md})}getDiffuseTransmissionColorFactor(){return this.get("diffuseTransmissionColorFactor")}setDiffuseTransmissionColorFactor(t){return this.set("diffuseTransmissionColorFactor",t)}getDiffuseTransmissionColorTexture(){return this.getRef("diffuseTransmissionColorTexture")}getDiffuseTransmissionColorTextureInfo(){return this.getRef("diffuseTransmissionColorTexture")?this.getRef("diffuseTransmissionColorTextureInfo"):null}setDiffuseTransmissionColorTexture(t){return this.setRef("diffuseTransmissionColorTexture",t,{channels:Ed|kd|Id})}},Sd=class extends ee{extensionName=ut;static EXTENSION_NAME=ut;createDiffuseTransmission(){return new Rd(this.document.getGraph())}read(t){let e=t.jsonDoc,a=e.json.materials||[],s=e.json.textures||[];return a.forEach((r,n)=>{if(r.extensions&&r.extensions.KHR_materials_diffuse_transmission){let i=this.createDiffuseTransmission();t.materials[n].setExtension(ut,i);let o=r.extensions[ut];if(o.extras&&i.setExtras(o.extras),o.diffuseTransmissionFactor!==void 0&&i.setDiffuseTransmissionFactor(o.diffuseTransmissionFactor),o.diffuseTransmissionColorFactor!==void 0&&i.setDiffuseTransmissionColorFactor(o.diffuseTransmissionColorFactor),o.diffuseTransmissionTexture!==void 0){let c=o.diffuseTransmissionTexture,d=t.textures[s[c.index].source];i.setDiffuseTransmissionTexture(d),t.setTextureInfo(i.getDiffuseTransmissionTextureInfo(),c)}if(o.diffuseTransmissionColorTexture!==void 0){let c=o.diffuseTransmissionColorTexture,d=t.textures[s[c.index].source];i.setDiffuseTransmissionColorTexture(d),t.setTextureInfo(i.getDiffuseTransmissionColorTextureInfo(),c)}}}),this}write(t){let e=t.jsonDoc;for(let a of this.document.getRoot().listMaterials()){let s=a.getExtension(ut);if(!s)continue;let r=t.materialIndexMap.get(a),n=e.json.materials[r],i=t.createPropertyDef(s);if(n.extensions=n.extensions||{},n.extensions[ut]=i,i.diffuseTransmissionFactor=s.getDiffuseTransmissionFactor(),i.diffuseTransmissionColorFactor=s.getDiffuseTransmissionColorFactor(),s.getDiffuseTransmissionTexture()){let o=s.getDiffuseTransmissionTexture(),c=s.getDiffuseTransmissionTextureInfo();i.diffuseTransmissionTexture=t.createTextureInfoDef(o,c)}if(s.getDiffuseTransmissionColorTexture()){let o=s.getDiffuseTransmissionColorTexture(),c=s.getDiffuseTransmissionColorTextureInfo();i.diffuseTransmissionColorTexture=t.createTextureInfoDef(o,c)}}return this}},Ad=class extends q{static EXTENSION_NAME=ft;init(){this.extensionName=ft,this.propertyType="Dispersion",this.parentTypes=[_.MATERIAL]}getDefaults(){return Object.assign(super.getDefaults(),{dispersion:0})}getDispersion(){return this.get("dispersion")}setDispersion(t){return this.set("dispersion",t)}},_d=class extends ee{static EXTENSION_NAME=ft;extensionName=ft;prereadTypes=[_.MESH];prewriteTypes=[_.MESH];createDispersion(){return new Ad(this.document.getGraph())}read(t){return this}write(t){return this}preread(t){return(t.jsonDoc.json.materials||[]).forEach((e,a)=>{if(e.extensions&&e.extensions.KHR_materials_dispersion){let s=this.createDispersion();t.materials[a].setExtension(ft,s);let r=e.extensions[ft];r.extras&&s.setExtras(r.extras),r.dispersion!==void 0&&s.setDispersion(r.dispersion)}}),this}prewrite(t){let e=t.jsonDoc;return this.document.getRoot().listMaterials().forEach(a=>{let s=a.getExtension(ft);if(s){let r=t.materialIndexMap.get(a),n=e.json.materials[r],i=t.createPropertyDef(s);n.extensions=n.extensions||{},n.extensions[ft]=i,i.dispersion=s.getDispersion()}}),this}},Nd=class extends q{static EXTENSION_NAME=ht;init(){this.extensionName=ht,this.propertyType="EmissiveStrength",this.parentTypes=[_.MATERIAL]}getDefaults(){return Object.assign(super.getDefaults(),{emissiveStrength:1})}getEmissiveStrength(){return this.get("emissiveStrength")}setEmissiveStrength(t){return this.set("emissiveStrength",t)}},jd=class extends ee{static EXTENSION_NAME=ht;extensionName=ht;prereadTypes=[_.MESH];prewriteTypes=[_.MESH];createEmissiveStrength(){return new Nd(this.document.getGraph())}read(t){return this}write(t){return this}preread(t){return(t.jsonDoc.json.materials||[]).forEach((e,a)=>{if(e.extensions&&e.extensions.KHR_materials_emissive_strength){let s=this.createEmissiveStrength();t.materials[a].setExtension(ht,s);let r=e.extensions[ht];r.extras&&s.setExtras(r.extras),r.emissiveStrength!==void 0&&s.setEmissiveStrength(r.emissiveStrength)}}),this}prewrite(t){let e=t.jsonDoc;return this.document.getRoot().listMaterials().forEach(a=>{let s=a.getExtension(ht);if(s){let r=t.materialIndexMap.get(a),n=e.json.materials[r],i=t.createPropertyDef(s);n.extensions=n.extensions||{},n.extensions[ht]=i,i.emissiveStrength=s.getEmissiveStrength()}}),this}},Fd=class extends q{static EXTENSION_NAME=bt;init(){this.extensionName=bt,this.propertyType="IOR",this.parentTypes=[_.MATERIAL]}getDefaults(){return Object.assign(super.getDefaults(),{ior:1.5})}getIOR(){return this.get("ior")}setIOR(t){return this.set("ior",t)}},Bd=class extends ee{static EXTENSION_NAME=bt;extensionName=bt;prereadTypes=[_.MESH];prewriteTypes=[_.MESH];createIOR(){return new Fd(this.document.getGraph())}read(t){return this}write(t){return this}preread(t){return(t.jsonDoc.json.materials||[]).forEach((e,a)=>{if(e.extensions&&e.extensions.KHR_materials_ior){let s=this.createIOR();t.materials[a].setExtension(bt,s);let r=e.extensions[bt];r.extras&&s.setExtras(r.extras),r.ior!==void 0&&s.setIOR(r.ior)}}),this}prewrite(t){let e=t.jsonDoc;return this.document.getRoot().listMaterials().forEach(a=>{let s=a.getExtension(bt);if(s){let r=t.materialIndexMap.get(a),n=e.json.materials[r],i=t.createPropertyDef(s);n.extensions=n.extensions||{},n.extensions[bt]=i,i.ior=s.getIOR()}}),this}},{R:Cd,G:Od}=Le,Pd=class extends q{static EXTENSION_NAME=pt;init(){this.extensionName=pt,this.propertyType="Iridescence",this.parentTypes=[_.MATERIAL]}getDefaults(){return Object.assign(super.getDefaults(),{iridescenceFactor:0,iridescenceTexture:null,iridescenceTextureInfo:new se(this.graph,"iridescenceTextureInfo"),iridescenceIOR:1.3,iridescenceThicknessMinimum:100,iridescenceThicknessMaximum:400,iridescenceThicknessTexture:null,iridescenceThicknessTextureInfo:new se(this.graph,"iridescenceThicknessTextureInfo")})}getIridescenceFactor(){return this.get("iridescenceFactor")}setIridescenceFactor(t){return this.set("iridescenceFactor",t)}getIridescenceTexture(){return this.getRef("iridescenceTexture")}getIridescenceTextureInfo(){return this.getRef("iridescenceTexture")?this.getRef("iridescenceTextureInfo"):null}setIridescenceTexture(t){return this.setRef("iridescenceTexture",t,{channels:Cd})}getIridescenceIOR(){return this.get("iridescenceIOR")}setIridescenceIOR(t){return this.set("iridescenceIOR",t)}getIridescenceThicknessMinimum(){return this.get("iridescenceThicknessMinimum")}setIridescenceThicknessMinimum(t){return this.set("iridescenceThicknessMinimum",t)}getIridescenceThicknessMaximum(){return this.get("iridescenceThicknessMaximum")}setIridescenceThicknessMaximum(t){return this.set("iridescenceThicknessMaximum",t)}getIridescenceThicknessTexture(){return this.getRef("iridescenceThicknessTexture")}getIridescenceThicknessTextureInfo(){return this.getRef("iridescenceThicknessTexture")?this.getRef("iridescenceThicknessTextureInfo"):null}setIridescenceThicknessTexture(t){return this.setRef("iridescenceThicknessTexture",t,{channels:Od})}},Dd=class extends ee{static EXTENSION_NAME=pt;extensionName=pt;prereadTypes=[_.MESH];prewriteTypes=[_.MESH];createIridescence(){return new Pd(this.document.getGraph())}read(t){return this}write(t){return this}preread(t){let e=t.jsonDoc,a=e.json.materials||[],s=e.json.textures||[];return a.forEach((r,n)=>{if(r.extensions&&r.extensions.KHR_materials_iridescence){let i=this.createIridescence();t.materials[n].setExtension(pt,i);let o=r.extensions[pt];if(o.extras&&i.setExtras(o.extras),o.iridescenceFactor!==void 0&&i.setIridescenceFactor(o.iridescenceFactor),o.iridescenceIor!==void 0&&i.setIridescenceIOR(o.iridescenceIor),o.iridescenceThicknessMinimum!==void 0&&i.setIridescenceThicknessMinimum(o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&i.setIridescenceThicknessMaximum(o.iridescenceThicknessMaximum),o.iridescenceTexture!==void 0){let c=o.iridescenceTexture,d=t.textures[s[c.index].source];i.setIridescenceTexture(d),t.setTextureInfo(i.getIridescenceTextureInfo(),c)}if(o.iridescenceThicknessTexture!==void 0){let c=o.iridescenceThicknessTexture,d=t.textures[s[c.index].source];i.setIridescenceThicknessTexture(d),t.setTextureInfo(i.getIridescenceThicknessTextureInfo(),c)}}}),this}prewrite(t){let e=t.jsonDoc;return this.document.getRoot().listMaterials().forEach(a=>{let s=a.getExtension(pt);if(s){let r=t.materialIndexMap.get(a),n=e.json.materials[r],i=t.createPropertyDef(s);if(n.extensions=n.extensions||{},n.extensions[pt]=i,s.getIridescenceFactor()>0&&(i.iridescenceFactor=s.getIridescenceFactor()),s.getIridescenceIOR()!==1.3&&(i.iridescenceIor=s.getIridescenceIOR()),s.getIridescenceThicknessMinimum()!==100&&(i.iridescenceThicknessMinimum=s.getIridescenceThicknessMinimum()),s.getIridescenceThicknessMaximum()!==400&&(i.iridescenceThicknessMaximum=s.getIridescenceThicknessMaximum()),s.getIridescenceTexture()){let o=s.getIridescenceTexture(),c=s.getIridescenceTextureInfo();i.iridescenceTexture=t.createTextureInfoDef(o,c)}if(s.getIridescenceThicknessTexture()){let o=s.getIridescenceThicknessTexture(),c=s.getIridescenceThicknessTextureInfo();i.iridescenceThicknessTexture=t.createTextureInfoDef(o,c)}}}),this}},{R:An,G:_n,B:Nn,A:jn}=Le,Ud=class extends q{static EXTENSION_NAME=gt;init(){this.extensionName=gt,this.propertyType="PBRSpecularGlossiness",this.parentTypes=[_.MATERIAL]}getDefaults(){return Object.assign(super.getDefaults(),{diffuseFactor:[1,1,1,1],diffuseTexture:null,diffuseTextureInfo:new se(this.graph,"diffuseTextureInfo"),specularFactor:[1,1,1],glossinessFactor:1,specularGlossinessTexture:null,specularGlossinessTextureInfo:new se(this.graph,"specularGlossinessTextureInfo")})}getDiffuseFactor(){return this.get("diffuseFactor")}setDiffuseFactor(t){return this.set("diffuseFactor",t)}getDiffuseTexture(){return this.getRef("diffuseTexture")}getDiffuseTextureInfo(){return this.getRef("diffuseTexture")?this.getRef("diffuseTextureInfo"):null}setDiffuseTexture(t){return this.setRef("diffuseTexture",t,{channels:An|_n|Nn|jn,isColor:!0})}getSpecularFactor(){return this.get("specularFactor")}setSpecularFactor(t){return this.set("specularFactor",t)}getGlossinessFactor(){return this.get("glossinessFactor")}setGlossinessFactor(t){return this.set("glossinessFactor",t)}getSpecularGlossinessTexture(){return this.getRef("specularGlossinessTexture")}getSpecularGlossinessTextureInfo(){return this.getRef("specularGlossinessTexture")?this.getRef("specularGlossinessTextureInfo"):null}setSpecularGlossinessTexture(t){return this.setRef("specularGlossinessTexture",t,{channels:An|_n|Nn|jn})}},Ld=class extends ee{static EXTENSION_NAME=gt;extensionName=gt;prereadTypes=[_.MESH];prewriteTypes=[_.MESH];createPBRSpecularGlossiness(){return new Ud(this.document.getGraph())}read(t){return this}write(t){return this}preread(t){let e=t.jsonDoc,a=e.json.materials||[],s=e.json.textures||[];return a.forEach((r,n)=>{if(r.extensions&&r.extensions.KHR_materials_pbrSpecularGlossiness){let i=this.createPBRSpecularGlossiness();t.materials[n].setExtension(gt,i);let o=r.extensions[gt];if(o.extras&&i.setExtras(o.extras),o.diffuseFactor!==void 0&&i.setDiffuseFactor(o.diffuseFactor),o.specularFactor!==void 0&&i.setSpecularFactor(o.specularFactor),o.glossinessFactor!==void 0&&i.setGlossinessFactor(o.glossinessFactor),o.diffuseTexture!==void 0){let c=o.diffuseTexture,d=t.textures[s[c.index].source];i.setDiffuseTexture(d),t.setTextureInfo(i.getDiffuseTextureInfo(),c)}if(o.specularGlossinessTexture!==void 0){let c=o.specularGlossinessTexture,d=t.textures[s[c.index].source];i.setSpecularGlossinessTexture(d),t.setTextureInfo(i.getSpecularGlossinessTextureInfo(),c)}}}),this}prewrite(t){let e=t.jsonDoc;return this.document.getRoot().listMaterials().forEach(a=>{let s=a.getExtension(gt);if(s){let r=t.materialIndexMap.get(a),n=e.json.materials[r],i=t.createPropertyDef(s);if(n.extensions=n.extensions||{},n.extensions[gt]=i,i.diffuseFactor=s.getDiffuseFactor(),i.specularFactor=s.getSpecularFactor(),i.glossinessFactor=s.getGlossinessFactor(),s.getDiffuseTexture()){let o=s.getDiffuseTexture(),c=s.getDiffuseTextureInfo();i.diffuseTexture=t.createTextureInfoDef(o,c)}if(s.getSpecularGlossinessTexture()){let o=s.getSpecularGlossinessTexture(),c=s.getSpecularGlossinessTextureInfo();i.specularGlossinessTexture=t.createTextureInfoDef(o,c)}}}),this}},{R:Kd,G:Gd,B:zd,A:Vd}=Le,Hd=class extends q{static EXTENSION_NAME=mt;init(){this.extensionName=mt,this.propertyType="Sheen",this.parentTypes=[_.MATERIAL]}getDefaults(){return Object.assign(super.getDefaults(),{sheenColorFactor:[0,0,0],sheenColorTexture:null,sheenColorTextureInfo:new se(this.graph,"sheenColorTextureInfo"),sheenRoughnessFactor:0,sheenRoughnessTexture:null,sheenRoughnessTextureInfo:new se(this.graph,"sheenRoughnessTextureInfo")})}getSheenColorFactor(){return this.get("sheenColorFactor")}setSheenColorFactor(t){return this.set("sheenColorFactor",t)}getSheenColorTexture(){return this.getRef("sheenColorTexture")}getSheenColorTextureInfo(){return this.getRef("sheenColorTexture")?this.getRef("sheenColorTextureInfo"):null}setSheenColorTexture(t){return this.setRef("sheenColorTexture",t,{channels:Kd|Gd|zd,isColor:!0})}getSheenRoughnessFactor(){return this.get("sheenRoughnessFactor")}setSheenRoughnessFactor(t){return this.set("sheenRoughnessFactor",t)}getSheenRoughnessTexture(){return this.getRef("sheenRoughnessTexture")}getSheenRoughnessTextureInfo(){return this.getRef("sheenRoughnessTexture")?this.getRef("sheenRoughnessTextureInfo"):null}setSheenRoughnessTexture(t){return this.setRef("sheenRoughnessTexture",t,{channels:Vd})}},qd=class extends ee{static EXTENSION_NAME=mt;extensionName=mt;prereadTypes=[_.MESH];prewriteTypes=[_.MESH];createSheen(){return new Hd(this.document.getGraph())}read(t){return this}write(t){return this}preread(t){let e=t.jsonDoc,a=e.json.materials||[],s=e.json.textures||[];return a.forEach((r,n)=>{if(r.extensions&&r.extensions.KHR_materials_sheen){let i=this.createSheen();t.materials[n].setExtension(mt,i);let o=r.extensions[mt];if(o.extras&&i.setExtras(o.extras),o.sheenColorFactor!==void 0&&i.setSheenColorFactor(o.sheenColorFactor),o.sheenRoughnessFactor!==void 0&&i.setSheenRoughnessFactor(o.sheenRoughnessFactor),o.sheenColorTexture!==void 0){let c=o.sheenColorTexture,d=t.textures[s[c.index].source];i.setSheenColorTexture(d),t.setTextureInfo(i.getSheenColorTextureInfo(),c)}if(o.sheenRoughnessTexture!==void 0){let c=o.sheenRoughnessTexture,d=t.textures[s[c.index].source];i.setSheenRoughnessTexture(d),t.setTextureInfo(i.getSheenRoughnessTextureInfo(),c)}}}),this}prewrite(t){let e=t.jsonDoc;return this.document.getRoot().listMaterials().forEach(a=>{let s=a.getExtension(mt);if(s){let r=t.materialIndexMap.get(a),n=e.json.materials[r],i=t.createPropertyDef(s);if(n.extensions=n.extensions||{},n.extensions[mt]=i,i.sheenColorFactor=s.getSheenColorFactor(),i.sheenRoughnessFactor=s.getSheenRoughnessFactor(),s.getSheenColorTexture()){let o=s.getSheenColorTexture(),c=s.getSheenColorTextureInfo();i.sheenColorTexture=t.createTextureInfoDef(o,c)}if(s.getSheenRoughnessTexture()){let o=s.getSheenRoughnessTexture(),c=s.getSheenRoughnessTextureInfo();i.sheenRoughnessTexture=t.createTextureInfoDef(o,c)}}}),this}},{R:Xd,G:Wd,B:Jd,A:Yd}=Le,$d=class extends q{static EXTENSION_NAME=yt;init(){this.extensionName=yt,this.propertyType="Specular",this.parentTypes=[_.MATERIAL]}getDefaults(){return Object.assign(super.getDefaults(),{specularFactor:1,specularTexture:null,specularTextureInfo:new se(this.graph,"specularTextureInfo"),specularColorFactor:[1,1,1],specularColorTexture:null,specularColorTextureInfo:new se(this.graph,"specularColorTextureInfo")})}getSpecularFactor(){return this.get("specularFactor")}setSpecularFactor(t){return this.set("specularFactor",t)}getSpecularColorFactor(){return this.get("specularColorFactor")}setSpecularColorFactor(t){return this.set("specularColorFactor",t)}getSpecularTexture(){return this.getRef("specularTexture")}getSpecularTextureInfo(){return this.getRef("specularTexture")?this.getRef("specularTextureInfo"):null}setSpecularTexture(t){return this.setRef("specularTexture",t,{channels:Yd})}getSpecularColorTexture(){return this.getRef("specularColorTexture")}getSpecularColorTextureInfo(){return this.getRef("specularColorTexture")?this.getRef("specularColorTextureInfo"):null}setSpecularColorTexture(t){return this.setRef("specularColorTexture",t,{channels:Xd|Wd|Jd,isColor:!0})}},Qd=class extends ee{static EXTENSION_NAME=yt;extensionName=yt;prereadTypes=[_.MESH];prewriteTypes=[_.MESH];createSpecular(){return new $d(this.document.getGraph())}read(t){return this}write(t){return this}preread(t){let e=t.jsonDoc,a=e.json.materials||[],s=e.json.textures||[];return a.forEach((r,n)=>{if(r.extensions&&r.extensions.KHR_materials_specular){let i=this.createSpecular();t.materials[n].setExtension(yt,i);let o=r.extensions[yt];if(o.extras&&i.setExtras(o.extras),o.specularFactor!==void 0&&i.setSpecularFactor(o.specularFactor),o.specularColorFactor!==void 0&&i.setSpecularColorFactor(o.specularColorFactor),o.specularTexture!==void 0){let c=o.specularTexture,d=t.textures[s[c.index].source];i.setSpecularTexture(d),t.setTextureInfo(i.getSpecularTextureInfo(),c)}if(o.specularColorTexture!==void 0){let c=o.specularColorTexture,d=t.textures[s[c.index].source];i.setSpecularColorTexture(d),t.setTextureInfo(i.getSpecularColorTextureInfo(),c)}}}),this}prewrite(t){let e=t.jsonDoc;return this.document.getRoot().listMaterials().forEach(a=>{let s=a.getExtension(yt);if(s){let r=t.materialIndexMap.get(a),n=e.json.materials[r],i=t.createPropertyDef(s);if(n.extensions=n.extensions||{},n.extensions[yt]=i,s.getSpecularFactor()!==1&&(i.specularFactor=s.getSpecularFactor()),re.eq(s.getSpecularColorFactor(),[1,1,1])||(i.specularColorFactor=s.getSpecularColorFactor()),s.getSpecularTexture()){let o=s.getSpecularTexture(),c=s.getSpecularTextureInfo();i.specularTexture=t.createTextureInfoDef(o,c)}if(s.getSpecularColorTexture()){let o=s.getSpecularColorTexture(),c=s.getSpecularColorTextureInfo();i.specularColorTexture=t.createTextureInfoDef(o,c)}}}),this}},{R:Zd}=Le,eu=class extends q{static EXTENSION_NAME=xt;init(){this.extensionName=xt,this.propertyType="Transmission",this.parentTypes=[_.MATERIAL]}getDefaults(){return Object.assign(super.getDefaults(),{transmissionFactor:0,transmissionTexture:null,transmissionTextureInfo:new se(this.graph,"transmissionTextureInfo")})}getTransmissionFactor(){return this.get("transmissionFactor")}setTransmissionFactor(t){return this.set("transmissionFactor",t)}getTransmissionTexture(){return this.getRef("transmissionTexture")}getTransmissionTextureInfo(){return this.getRef("transmissionTexture")?this.getRef("transmissionTextureInfo"):null}setTransmissionTexture(t){return this.setRef("transmissionTexture",t,{channels:Zd})}},tu=class extends ee{static EXTENSION_NAME=xt;extensionName=xt;prereadTypes=[_.MESH];prewriteTypes=[_.MESH];createTransmission(){return new eu(this.document.getGraph())}read(t){return this}write(t){return this}preread(t){let e=t.jsonDoc,a=e.json.materials||[],s=e.json.textures||[];return a.forEach((r,n)=>{if(r.extensions&&r.extensions.KHR_materials_transmission){let i=this.createTransmission();t.materials[n].setExtension(xt,i);let o=r.extensions[xt];if(o.extras&&i.setExtras(o.extras),o.transmissionFactor!==void 0&&i.setTransmissionFactor(o.transmissionFactor),o.transmissionTexture!==void 0){let c=o.transmissionTexture,d=t.textures[s[c.index].source];i.setTransmissionTexture(d),t.setTextureInfo(i.getTransmissionTextureInfo(),c)}}}),this}prewrite(t){let e=t.jsonDoc;return this.document.getRoot().listMaterials().forEach(a=>{let s=a.getExtension(xt);if(s){let r=t.materialIndexMap.get(a),n=e.json.materials[r],i=t.createPropertyDef(s);if(n.extensions=n.extensions||{},n.extensions[xt]=i,i.transmissionFactor=s.getTransmissionFactor(),s.getTransmissionTexture()){let o=s.getTransmissionTexture(),c=s.getTransmissionTextureInfo();i.transmissionTexture=t.createTextureInfoDef(o,c)}}}),this}},au=class extends q{static EXTENSION_NAME=Gt;init(){this.extensionName=Gt,this.propertyType="Unlit",this.parentTypes=[_.MATERIAL]}},su=class extends ee{static EXTENSION_NAME=Gt;extensionName=Gt;prereadTypes=[_.MESH];prewriteTypes=[_.MESH];createUnlit(){return new au(this.document.getGraph())}read(t){return this}write(t){return this}preread(t){return(t.jsonDoc.json.materials||[]).forEach((e,a)=>{e.extensions&&e.extensions.KHR_materials_unlit&&t.materials[a].setExtension(Gt,this.createUnlit())}),this}prewrite(t){let e=t.jsonDoc;return this.document.getRoot().listMaterials().forEach(a=>{if(a.getExtension("KHR_materials_unlit")){let s=t.materialIndexMap.get(a),r=e.json.materials[s];r.extensions=r.extensions||{},r.extensions[Gt]={}}}),this}},ru=class extends q{static EXTENSION_NAME=_e;init(){this.extensionName=_e,this.propertyType="Mapping",this.parentTypes=["MappingList"]}getDefaults(){return Object.assign(super.getDefaults(),{material:null,variants:new ae})}getMaterial(){return this.getRef("material")}setMaterial(t){return this.setRef("material",t)}addVariant(t){return this.addRef("variants",t)}removeVariant(t){return this.removeRef("variants",t)}listVariants(){return this.listRefs("variants")}},nu=class extends q{static EXTENSION_NAME=_e;init(){this.extensionName=_e,this.propertyType="MappingList",this.parentTypes=[_.PRIMITIVE]}getDefaults(){return Object.assign(super.getDefaults(),{mappings:new ae})}addMapping(t){return this.addRef("mappings",t)}removeMapping(t){return this.removeRef("mappings",t)}listMappings(){return this.listRefs("mappings")}},Fn=class extends q{static EXTENSION_NAME=_e;init(){this.extensionName=_e,this.propertyType="Variant",this.parentTypes=["MappingList"]}},iu=class extends ee{extensionName=_e;static EXTENSION_NAME=_e;createMappingList(){return new nu(this.document.getGraph())}createVariant(t=""){return new Fn(this.document.getGraph(),t)}createMapping(){return new ru(this.document.getGraph())}listVariants(){return Array.from(this.properties).filter(t=>t instanceof Fn)}read(t){let e=t.jsonDoc;if(!e.json.extensions||!e.json.extensions.KHR_materials_variants)return this;let a=(e.json.extensions.KHR_materials_variants.variants||[]).map(s=>this.createVariant().setName(s.name||""));return(e.json.meshes||[]).forEach((s,r)=>{let n=t.meshes[r];(s.primitives||[]).forEach((i,o)=>{if(!i.extensions||!i.extensions.KHR_materials_variants)return;let c=this.createMappingList(),d=i.extensions[_e];for(let f of d.mappings){let p=this.createMapping();f.material!==void 0&&p.setMaterial(t.materials[f.material]);for(let v of f.variants||[])p.addVariant(a[v]);c.addMapping(p)}n.listPrimitives()[o].setExtension(_e,c)})}),this}write(t){let e=t.jsonDoc,a=this.listVariants();if(!a.length)return this;let s=[],r=new Map;for(let n of a)r.set(n,s.length),s.push(t.createPropertyDef(n));for(let n of this.document.getRoot().listMeshes()){let i=t.meshIndexMap.get(n);n.listPrimitives().forEach((o,c)=>{let d=o.getExtension(_e);if(!d)return;let f=t.jsonDoc.json.meshes[i].primitives[c],p=d.listMappings().map(v=>{let x=t.createPropertyDef(v),b=v.getMaterial();return b&&(x.material=t.materialIndexMap.get(b)),x.variants=v.listVariants().map(l=>r.get(l)),x});f.extensions=f.extensions||{},f.extensions[_e]={mappings:p}})}return e.json.extensions=e.json.extensions||{},e.json.extensions[_e]={variants:s},this}},{G:ou}=Le,cu=class extends q{static EXTENSION_NAME=vt;init(){this.extensionName=vt,this.propertyType="Volume",this.parentTypes=[_.MATERIAL]}getDefaults(){return Object.assign(super.getDefaults(),{thicknessFactor:0,thicknessTexture:null,thicknessTextureInfo:new se(this.graph,"thicknessTexture"),attenuationDistance:1/0,attenuationColor:[1,1,1]})}getThicknessFactor(){return this.get("thicknessFactor")}setThicknessFactor(t){return this.set("thicknessFactor",t)}getThicknessTexture(){return this.getRef("thicknessTexture")}getThicknessTextureInfo(){return this.getRef("thicknessTexture")?this.getRef("thicknessTextureInfo"):null}setThicknessTexture(t){return this.setRef("thicknessTexture",t,{channels:ou})}getAttenuationDistance(){return this.get("attenuationDistance")}setAttenuationDistance(t){return this.set("attenuationDistance",t)}getAttenuationColor(){return this.get("attenuationColor")}setAttenuationColor(t){return this.set("attenuationColor",t)}},lu=class extends ee{static EXTENSION_NAME=vt;extensionName=vt;prereadTypes=[_.MESH];prewriteTypes=[_.MESH];createVolume(){return new cu(this.document.getGraph())}read(t){return this}write(t){return this}preread(t){let e=t.jsonDoc,a=e.json.materials||[],s=e.json.textures||[];return a.forEach((r,n)=>{if(r.extensions&&r.extensions.KHR_materials_volume){let i=this.createVolume();t.materials[n].setExtension(vt,i);let o=r.extensions[vt];if(o.extras&&i.setExtras(o.extras),o.thicknessFactor!==void 0&&i.setThicknessFactor(o.thicknessFactor),o.attenuationDistance!==void 0&&i.setAttenuationDistance(o.attenuationDistance),o.attenuationColor!==void 0&&i.setAttenuationColor(o.attenuationColor),o.thicknessTexture!==void 0){let c=o.thicknessTexture,d=t.textures[s[c.index].source];i.setThicknessTexture(d),t.setTextureInfo(i.getThicknessTextureInfo(),c)}}}),this}prewrite(t){let e=t.jsonDoc;return this.document.getRoot().listMaterials().forEach(a=>{let s=a.getExtension(vt);if(s){let r=t.materialIndexMap.get(a),n=e.json.materials[r],i=t.createPropertyDef(s);if(n.extensions=n.extensions||{},n.extensions[vt]=i,s.getThicknessFactor()>0&&(i.thicknessFactor=s.getThicknessFactor()),Number.isFinite(s.getAttenuationDistance())&&(i.attenuationDistance=s.getAttenuationDistance()),re.eq(s.getAttenuationColor(),[1,1,1])||(i.attenuationColor=s.getAttenuationColor()),s.getThicknessTexture()){let o=s.getThicknessTexture(),c=s.getThicknessTextureInfo();i.thicknessTexture=t.createTextureInfoDef(o,c)}}}),this}},du=class extends ee{extensionName=gn;static EXTENSION_NAME=gn;read(t){return this}write(t){return this}},tr=class extends ee{extensionName=mn;static EXTENSION_NAME=mn;read(t){return this}write(t){return this}},uu=class extends q{static EXTENSION_NAME=wt;init(){this.extensionName=wt,this.propertyType="Visibility",this.parentTypes=[_.NODE]}getDefaults(){return Object.assign(super.getDefaults(),{visible:!0})}getVisible(){return this.get("visible")}setVisible(t){return this.set("visible",t)}},fu=class extends ee{static EXTENSION_NAME=wt;extensionName=wt;createVisibility(){return new uu(this.document.getGraph())}read(t){return(t.jsonDoc.json.nodes||[]).forEach((e,a)=>{if(e.extensions&&e.extensions.KHR_node_visibility){let s=this.createVisibility();t.nodes[a].setExtension(wt,s);let r=e.extensions[wt];r.visible!==void 0&&s.setVisible(r.visible)}}),this}write(t){let e=t.jsonDoc;for(let a of this.document.getRoot().listNodes()){let s=a.getExtension(wt);if(!s)continue;let r=t.nodeIndexMap.get(a),n=e.json.nodes[r];n.extensions=n.extensions||{},n.extensions[wt]={visible:s.getVisible()}}return this}};function hu(t){return t.vkFormat>0&&t.vkFormat<=123}function Bn(t){let e=t.vkFormat===1000066e3&&t.dataFormatDescriptor[0].colorModel===167;return t.vkFormat===0||e}var bu=class{match(t){return t[0]===171&&t[1]===75&&t[2]===84&&t[3]===88&&t[4]===32&&t[5]===50&&t[6]===48&&t[7]===187&&t[8]===13&&t[9]===10&&t[10]===26&&t[11]===10}getSize(t){let e=Wa(t);return[e.pixelWidth,e.pixelHeight]}getChannels(t){let e=Wa(t),a=e.dataFormatDescriptor[0];if(hu(e))return a.samples.length;if(Bn(e))switch(a.colorModel){case 163:return a.samples.length===2&&(a.samples[1].channelType&15)===15?4:3;case 166:return(a.samples[0].channelType&15)===3?4:3;default:throw new Error(`Unexpected KTX2 colorModel, "${a.colorModel}".`)}throw new Error(`Unexpected KTX2 vkFormat, "${e.vkFormat}".`)}getVRAMByteLength(t){let e=Wa(t),a=0;if(Bn(e)){let s=this.getChannels(t)>3;for(let r=0;r<e.levels.length;r++){let n=e.levels[r];if(n.uncompressedByteLength)a+=n.uncompressedByteLength;else{let i=Math.max(1,Math.floor(e.pixelWidth/Math.pow(2,r))),o=Math.max(1,Math.floor(e.pixelHeight/Math.pow(2,r))),c=s?16:8;a+=i/4*(o/4)*c}}}else for(let s of e.levels)e.supercompressionScheme===0?a+=s.levelData.byteLength:a+=s.uncompressedByteLength;return a}},pu=class extends ee{static EXTENSION_NAME=$a;extensionName=$a;prereadTypes=[_.TEXTURE];static register(){qe.registerFormat("image/ktx2",new bu)}preread(t){return t.jsonDoc.json.textures&&t.jsonDoc.json.textures.forEach(e=>{e.extensions&&e.extensions.KHR_texture_basisu&&(e.source=e.extensions[$a].source)}),this}read(t){return this}write(t){let e=t.jsonDoc;return this.document.getRoot().listTextures().forEach(a=>{if(a.getMimeType()==="image/ktx2"){let s=t.imageIndexMap.get(a);e.json.textures.forEach(r=>{r.source===s&&(r.extensions=r.extensions||{},r.extensions[$a]={source:r.source},delete r.source)})}}),this}},gu=class extends q{static EXTENSION_NAME=Tt;init(){this.extensionName=Tt,this.propertyType="Transform",this.parentTypes=[_.TEXTURE_INFO]}getDefaults(){return Object.assign(super.getDefaults(),{offset:[0,0],rotation:0,scale:[1,1],texCoord:null})}getOffset(){return this.get("offset")}setOffset(t){return this.set("offset",t)}getRotation(){return this.get("rotation")}setRotation(t){return this.set("rotation",t)}getScale(){return this.get("scale")}setScale(t){return this.set("scale",t)}getTexCoord(){return this.get("texCoord")}setTexCoord(t){return this.set("texCoord",t)}},mu=class extends ee{extensionName=Tt;static EXTENSION_NAME=Tt;createTransform(){return new gu(this.document.getGraph())}read(t){for(let[e,a]of Array.from(t.textureInfos.entries())){if(!a.extensions||!a.extensions.KHR_texture_transform)continue;let s=this.createTransform(),r=a.extensions[Tt];r.offset!==void 0&&s.setOffset(r.offset),r.rotation!==void 0&&s.setRotation(r.rotation),r.scale!==void 0&&s.setScale(r.scale),r.texCoord!==void 0&&s.setTexCoord(r.texCoord),e.setExtension(Tt,s)}return this}write(t){let e=Array.from(t.textureInfoDefMap.entries());for(let[a,s]of e){let r=a.getExtension(Tt);if(!r)continue;s.extensions=s.extensions||{};let n={},i=re.eq;i(r.getOffset(),[0,0])||(n.offset=r.getOffset()),r.getRotation()!==0&&(n.rotation=r.getRotation()),i(r.getScale(),[1,1])||(n.scale=r.getScale()),r.getTexCoord()!=null&&(n.texCoord=r.getTexCoord()),s.extensions[Tt]=n}return this}},yu=[_.ROOT,_.SCENE,_.NODE,_.MESH,_.MATERIAL,_.TEXTURE,_.ANIMATION],xu=class extends q{static EXTENSION_NAME=Ke;init(){this.extensionName=Ke,this.propertyType="Packet",this.parentTypes=yu}getDefaults(){return Object.assign(super.getDefaults(),{context:{},properties:{}})}getContext(){return this.get("context")}setContext(t){return this.set("context",{...t})}listProperties(){return Object.keys(this.get("properties"))}getProperty(t){let e=this.get("properties");return t in e?e[t]:null}setProperty(t,e){this._assertContext(t);let a={...this.get("properties")};return e?a[t]=e:delete a[t],this.set("properties",a)}toJSONLD(){return{"@context":Js(this.get("context")),...Js(this.get("properties"))}}fromJSONLD(t){t=Js(t);let e=t["@context"];return e&&this.set("context",e),delete t["@context"],this.set("properties",t)}_assertContext(t){if(!(t.split(":")[0]in this.get("context")))throw new Error(`${Ke}: Missing context for term, "${t}".`)}};function Js(t){return JSON.parse(JSON.stringify(t))}var vu=class extends ee{extensionName=Ke;static EXTENSION_NAME=Ke;createPacket(){return new xu(this.document.getGraph())}listPackets(){return Array.from(this.properties)}read(t){let e=t.jsonDoc.json.extensions?.[Ke];if(!e||!e.packets)return this;let a=t.jsonDoc.json,s=this.document.getRoot(),r=e.packets.map(o=>this.createPacket().fromJSONLD(o)),n=[[a.asset],a.scenes,a.nodes,a.meshes,a.materials,a.images,a.animations],i=[[s],s.listScenes(),s.listNodes(),s.listMeshes(),s.listMaterials(),s.listTextures(),s.listAnimations()];for(let o=0;o<n.length;o++){let c=n[o]||[];for(let d=0;d<c.length;d++){let f=c[d];if(f.extensions&&f.extensions.KHR_xmp_json_ld){let p=f.extensions[Ke];i[o][d].setExtension(Ke,r[p.packet])}}}return this}write(t){let{json:e}=t.jsonDoc,a=[];for(let s of this.properties){a.push(s.toJSONLD());for(let r of s.listParents()){let n;switch(r.propertyType){case _.ROOT:n=e.asset;break;case _.SCENE:n=e.scenes[t.sceneIndexMap.get(r)];break;case _.NODE:n=e.nodes[t.nodeIndexMap.get(r)];break;case _.MESH:n=e.meshes[t.meshIndexMap.get(r)];break;case _.MATERIAL:n=e.materials[t.materialIndexMap.get(r)];break;case _.TEXTURE:n=e.images[t.imageIndexMap.get(r)];break;case _.ANIMATION:n=e.animations[t.animationIndexMap.get(r)];break;default:n=null,this.document.getLogger().warn(`[${Ke}]: Unsupported parent property, "${r.propertyType}"`);break}n&&(n.extensions=n.extensions||{},n.extensions[Ke]={packet:a.length-1})}}return a.length>0&&(e.extensions=e.extensions||{},e.extensions[Ke]={packets:a}),this}},wu=[td,ad,fd,bd,xd,Td,Sd,_d,jd,Bd,Dd,Ld,Qd,qd,tu,su,iu,lu,du,tr,fu,pu,mu,vu],gp=[el,Zs,er,Il,Ql,ed,...wu];var Cg=(function(){var t="b9H79Tebbbe9ok9Geueu9Geub9Gbb9Gruuuuuuueu9Gvuuuuueu9Gduueu9Gluuuueu9Gvuuuuub9Gouuuuuub9Gluuuub9Giuuueui8AYdilveoveovrrwrrDDoDrbqqbelve9Weiiviebeoweuec;G:Qdkr:nlAo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8F9TW79O9V9Wt9FW9U9J9V9KW9wWVtW949c919M9MWV9mW4W2be8A9TW79O9V9Wt9FW9U9J9V9KW9wWVtW949c919M9MWVbd8F9TW79O9V9Wt9FW9U9J9V9KW9wWVtW949c919M9MWV9c9V919U9KbiE9TW79O9V9Wt9FW9U9J9V9KW9wWVtW949wWV79P9V9UblY9TW79O9V9Wt9FW9U9J9V9KW69U9KW949c919M9MWVbv8E9TW79O9V9Wt9FW9U9J9V9KW69U9KW949c919M9MWV9c9V919U9Kbo8A9TW79O9V9Wt9FW9U9J9V9KW69U9KW949wWV79P9V9UbrE9TW79O9V9Wt9FW9U9J9V9KW69U9KW949tWG91W9U9JWbwa9TW79O9V9Wt9FW9U9J9V9KW69U9KW949tWG91W9U9JW9c9V919U9KbDL9TW79O9V9Wt9FW9U9J9V9KWS9P2tWV9p9JtbqK9TW79O9V9Wt9FW9U9J9V9KWS9P2tWV9r919HtbkL9TW79O9V9Wt9FW9U9J9V9KWS9P2tWVT949WbxE9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94J9H9J9OWbsa9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94J9H9J9OW9ttV9P9Wbza9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94SWt9J9O9sW9T9H9WbHK9TW79O9V9Wt9F79W9Ht9P9H29t9VVt9sW9T9H9WbOl79IV9RbCDwebcekdKLqN9OYdbk:Bhdhud9:8Jjjjjbc;qw9Rgr8KjjjjbcbhwdnaeTmbabcbyd;C:kjjbaoaocb9iEgDc:GeV86bbarc;adfcbcjdz:wjjjb8AdnaiTmbarc;adfadalz:vjjjb8Akarc;abfalfcbcbcjdal9RalcFe0Ez:wjjjb8Aarc;abfarc;adfalz:vjjjb8AarcUf9cb83ibarc8Wf9cb83ibarcyf9cb83ibarcaf9cb83ibarcKf9cb83ibarczf9cb83ibar9cb83iwar9cb83ibcj;abal9Uc;WFbGcjdalca0Ehqdnaicd6mbavcd9imbaDTmbadcefhkaqci2gxal2hmarc;alfclfhParc;qlfceVhsarc;qofclVhzarc;qofcKfhHarc;qofczfhOcbhAincdhCcbhodnavci6mbaH9cb83ibaO9cb83ibar9cb83i;yoar9cb83i;qoadaAfgoybbhXcbhQincbhwcbhLdninaoalfhKaoybbgYaX7aLVhLawcP0meaKhoaYhXawcefgwaQfai6mbkkcbhXarc;qofhwincwh8AcwhEdnaLaX93gocFeGg3cs0mbclhEa3ci0mba3cb9hcethEkdnaocw4cFeGg3cs0mbclh8Aa3ci0mba3cb9hceth8Aka8AaEfh3awydbh5cwh8AcwhEdnaocz4cFeGg8Ecs0mbclhEa8Eci0mba8Ecb9hcethEka3a5fh3dnaocFFFFb0mbclh8AaocFFF8F0mbaocFFFr0ceth8Akawa3aEfa8AfBdbawclfhwaXcefgXcw9hmbkaKhoaYhXaQczfgQai6mbkcbhocehwazhLinawaoaLydbarc;qofaocdtfydb6EhoaLclfhLawcefgwcw9hmbkcihCkcbh3arc;qlfcbcjdz:wjjjb8Aarc;alfcwfcbBdbar9cb83i;alaoclth8Fadhaaqhhakh5inarc;qlfadcba3cufgoaoa30Eal2falz:vjjjb8Aaiahaiah6Ehgdnaqaia39Ra3aqfai6EgYcsfc9WGgoaY9nmbarc;qofaYfcbaoaY9Rz:wjjjb8Akada3al2fh8Jcbh8Kina8Ka8FVcl4hQarc;alfa8Kcdtfh8LaAh8Mcbh8Nina8NaAfhwdndndndndndna8KPldebidkasa8Mc98GgLfhoa5aLfh8Aarc;qlfawc98GgLfRbbhXcwhwinaoRbbawtaXVhXaocefhoawcwfgwca9hmbkaYTmla8Ncith8Ea8JaLfhEcbhKinaERbbhLcwhoa8AhwinawRbbaotaLVhLawcefhwaocwfgoca9hmbkarc;qofaKfaLaX7aQ93a8E486bba8Aalfh8AaEalfhEaLhXaKcefgKaY9hmbxlkkaYTmia8Mc9:Ghoa8NcitcwGhEarc;qlfawceVfRbbcwtarc;qlfawc9:GfRbbVhLarc;qofhwaghXinawa5aofRbbcwtaaaofRbbVg8AaL9RgLcetaLcztcz91cs47cFFiGaE486bbaoalfhoawcefhwa8AhLa3aXcufgX9hmbxikkaYTmda8Jawfhoarc;qlfawfRbbhLarc;qofhwaghXinawaoRbbg8AaL9RgLcetaLcKtcK91cr4786bbawcefhwaoalfhoa8AhLa3aXcufgX9hmbxdkkaYTmeka8LydbhEcbhKarc;qofhoincdhLcbhwinaLaoawfRbbcb9hfhLawcefgwcz9hmbkclhXcbhwinaXaoawfRbbcd0fhXawcefgwcz9hmbkcwh8Acbhwina8AaoawfRbbcP0fh8Aawcefgwcz9hmbkaLaXaLaX6Egwa8Aawa8A6Egwczawcz6EaEfhEaoczfhoaKczfgKaY6mbka8LaEBdbka8Mcefh8Ma8Ncefg8Ncl9hmbka8Kcefg8KaC9hmbkaaamfhaahaxfhha5amfh5a3axfg3ai6mbkcbhocehwaPhLinawaoaLydbarc;alfaocdtfydb6EhoaLclfhLawcefgXhwaCaX9hmbkaraAcd4fa8FcdVaoaocdSE86bbaAclfgAal6mbkkabaefh8Kabcefhoalcd4gecbaDEhkadcefhOarc;abfceVhHcbhmdndninaiam9nmearc;qofcbcjdz:wjjjb8Aa8Kao9Rak6mdadamal2gwfhxcbh8JaOawfhzaocbakz:wjjjbghakfh5aqaiam9Ramaqfai6Egscsfgocl4cifcd4hCaoc9WGg8LThPindndndndndndndndndndnaDTmbara8Jcd4fRbbgLciGPlbedlbkasTmdaxa8Jfhoarc;abfa8JfRbbhLarc;qofhwashXinawaoRbbg8AaL9RgLcetaLcKtcK91cr4786bbawcefhwaoalfhoa8AhLaXcufgXmbxikkasTmia8JcitcwGhEarc;abfa8JceVfRbbcwtarc;abfa8Jc9:GgofRbbVhLaxaofhoarc;qofhwashXinawao8Vbbg8AaL9RgLcetaLcztcz91cs47cFFiGaE486bbawcefhwaoalfhoa8AhLaXcufgXmbxdkkaHa8Jc98GgEfhoazaEfh8Aarc;abfaEfRbbhXcwhwinaoRbbawtaXVhXaocefhoawcwfgwca9hmbkasTmbaLcl4hYa8JcitcKGh3axaEfhEcbhKinaERbbhLcwhoa8AhwinawRbbaotaLVhLawcefhwaocwfgoca9hmbkarc;qofaKfaLaX7aY93a3486bba8Aalfh8AaEalfhEaLhXaKcefgKas9hmbkkaDmbcbhoxlka8LTmbcbhodninarc;qofaofgwcwf8Pibaw8Pib:e9qTmeaoczfgoa8L9pmdxbkkdnavmbcehoxikcbhEaChKaChYinarc;qofaEfgocwf8Pibhyao8Pibh8PcdhLcbhwinaLaoawfRbbcb9hfhLawcefgwcz9hmbkclhXcbhwinaXaoawfRbbcd0fhXawcefgwcz9hmbkcwh8Acbhwina8AaoawfRbbcP0fh8Aawcefgwcz9hmbkaLaXaLaX6Egoa8Aaoa8A6Egoczaocz6EaYfhYaocucbaya8P:e9cb9sEgwaoaw6EaKfhKaEczfgEa8L9pmdxbkkaha8Jcd4fgoaoRbbcda8JcetcoGtV86bbxikdnaKas6mbaYas6mbaha8Jcd4fgoaoRbbcia8JcetcoGtV86bba8Ka59Ras6mra5arc;qofasz:vjjjbasfh5xikaKaY9phokaha8Jcd4fgwawRbbaoa8JcetcoGtV86bbka8Ka59RaC6mla5cbaCz:wjjjbgAaCfhYdndna8LmbaPhoxekdna8KaY9RcK9pmbaPhoxekaocdtc:q1jjbfcj1jjbaDEg5ydxggcetc;:FFFeGh8Fcuh3cuagtcu7cFeGhacbh8Marc;qofhLinarc;qofa8MfhQczhEdndndnagPDbeeeeeeedekcucbaQcwf8PibaQ8Pib:e9cb9sEhExekcbhoa8FhEinaEaaaLaofRbb9nfhEaocefgocz9hmbkkcih8Ecbh8Ainczhwdndndna5a8AcdtfydbgKPDbeeeeeeedekcucbaQcwf8PibaQ8Pib:e9cb9sEhwxekaKcetc;:FFFeGhwcuaKtcu7cFeGhXcbhoinawaXaLaofRbb9nfhwaocefgocz9hmbkkdndnawaE6mbaKa39hmeawaE9hmea5a8EcdtfydbcwSmeka8Ah8EawhEka8Acefg8Aci9hmbkaAa8Mco4fgoaoRbba8Ea8Mci4coGtV86bbdndndna5a8Ecdtfydbg3PDdbbbbbbbebkdncwa39Tg8ETmbcua3tcu7hwdndna3ceSmbcbh8NaLhQinaQhoa8Eh8AcbhXinaoRbbgEawcFeGgKaEaK6EaXa3tVhXaocefhoa8Acufg8AmbkaYaX86bbaQa8EfhQaYcefhYa8Na8Efg8Ncz6mbxdkkcbh8NaLhQinaQhoa8Eh8AcbhXinaoRbbgEawcFeGgKaEaK6EaXcetVhXaocefhoa8Acufg8AmbkaYaX:T9cFe:d9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:9ca188bbaQa8EfhQaYcefhYa8Na8Efg8Ncz6mbkkcbhoinaYaLaofRbbgX86bbaYaXawcFeG9pfhYaocefgocz9hmbxikkdna3ceSmbinaYcb86bbaYcefhYxbkkinaYcb86bbaYcefhYxbkkaYaQ8Pbb83bbaYcwfaQcwf8Pbb83bbaYczfhYka8Mczfg8Ma8L9pgomeaLczfhLa8KaY9RcK9pmbkkaoTmlaYh5aYTmlka8Jcefg8Jal9hmbkarc;abfaxascufal2falz:vjjjb8Aasamfhma5hoa5mbkcbhwxdkdna8Kao9RakalfgwcKcaaDEgLawaL0EgX9pmbcbhwxdkdnawaL9pmbaocbaXaw9Rgwz:wjjjbawfhokaoarc;adfalz:vjjjbalfhodnaDTmbaoaraez:vjjjbaefhokaoab9Rhwxekcbhwkarc;qwf8Kjjjjbawk5babaeadaialcdcbyd;C:kjjbz:bjjjbk9reduaecd4gdaefgicaaica0Eabcj;abae9Uc;WFbGcjdaeca0Egifcufai9Uae2aiadfaicl4cifcd4f2fcefkmbcbabBd;C:kjjbk:Ese5u8Jjjjjbc;ae9Rgl8Kjjjjbcbhvdnaici9UgocHfae0mbabcbyd;m:kjjbgrc;GeV86bbalc;abfcFecjez:wjjjb8AalcUfgw9cu83ibalc8WfgD9cu83ibalcyfgq9cu83ibalcafgk9cu83ibalcKfgx9cu83ibalczfgm9cu83ibal9cu83iwal9cu83ibabaefc9WfhPabcefgsaofhednaiTmbcmcsarcb9kgzEhHcbhOcbhAcbhCcbhXcbhQindnaeaP9nmbcbhvxikaQcufhvadaCcdtfgLydbhKaLcwfydbhYaLclfydbh8AcbhEdndndninalc;abfavcsGcitfgoydlh3dndndnaoydbgoaK9hmba3a8ASmekdnaoa8A9hmba3aY9hmbaEcefhExekaoaY9hmea3aK9hmeaEcdfhEkaEc870mdaXcufhvaLaEciGcx2goc;i1jjbfydbcdtfydbh3aLaoc;e1jjbfydbcdtfydbh8AaLaoc;a1jjbfydbcdtfydbhKcbhodnindnalavcsGcdtfydba39hmbaohYxdkcuhYavcufhvaocefgocz9hmbkkaOa3aOSgvaYce9iaYaH9oVgoGfhOdndndncbcsavEaYaoEgvcs9hmbarce9imba3a3aAa3cefaASgvEgAcefSmecmcsavEhvkasavaEcdtc;WeGV86bbavcs9hmea3aA9Rgvcetavc8F917hvinaeavcFb0crtavcFbGV86bbaecefheavcje6hoavcr4hvaoTmbka3hAxvkcPhvasaEcdtcPV86bba3hAkavTmiavaH9omicdhocehEaQhYxlkavcufhvaEclfgEc;ab9hmbkkdnaLceaYaOSceta8AaOSEcx2gvc;a1jjbfydbcdtfydbgKTaLavc;e1jjbfydbcdtfydbg8AceSGaLavc;i1jjbfydbcdtfydbg3cdSGaOcb9hGazGg5ce9hmbaw9cu83ibaD9cu83ibaq9cu83ibak9cu83ibax9cu83ibam9cu83ibal9cu83iwal9cu83ibcbhOkcbhEaXcufgvhodnindnalaocsGcdtfydba8A9hmbaEhYxdkcuhYaocufhoaEcefgEcz9hmbkkcbhodnindnalavcsGcdtfydba39hmbaohExdkcuhEavcufhvaocefgocz9hmbkkaOaKaOSg8EfhLdndnaYcm0mbaYcefhYxekcbcsa8AaLSgvEhYaLavfhLkdndnaEcm0mbaEcefhExekcbcsa3aLSgvEhEaLavfhLkc9:cua8EEh8FcbhvaEaYcltVgacFeGhodndndninavc:W1jjbfRbbaoSmeavcefgvcz9hmbxdkka5aKaO9havcm0VVmbasavc;WeV86bbxekasa8F86bbaeaa86bbaecefhekdna8EmbaKaA9Rgvcetavc8F917hvinaeavcFb0gocrtavcFbGV86bbavcr4hvaecefheaombkaKhAkdnaYcs9hmba8AaA9Rgvcetavc8F917hvinaeavcFb0gocrtavcFbGV86bbavcr4hvaecefheaombka8AhAkdnaEcs9hmba3aA9Rgvcetavc8F917hvinaeavcFb0gocrtavcFbGV86bbavcr4hvaecefheaombka3hAkalaXcdtfaKBdbaXcefcsGhvdndnaYPzbeeeeeeeeeeeeeebekalavcdtfa8ABdbaXcdfcsGhvkdndnaEPzbeeeeeeeeeeeeeebekalavcdtfa3BdbavcefcsGhvkcihoalc;abfaQcitfgEaKBdlaEa8ABdbaQcefcsGhYcdhEavhXaLhOxekcdhoalaXcdtfa3BdbcehEaXcefcsGhXaQhYkalc;abfaYcitfgva8ABdlava3Bdbalc;abfaQaEfcsGcitfgva3BdlavaKBdbascefhsaQaofcsGhQaCcifgCai6mbkkdnaeaP9nmbcbhvxekcbhvinaeavfavc:W1jjbfRbb86bbavcefgvcz9hmbkaeab9Ravfhvkalc;aef8KjjjjbavkZeeucbhddninadcefgdc8F0meceadtae6mbkkadcrfcFeGcr9Uci2cdfabci9U2cHfkmbcbabBd;m:kjjbk:Adewu8Jjjjjbcz9Rhlcbhvdnaicvfae0mbcbhvabcbRb;m:kjjbc;qeV86bbal9cb83iwabcefhoabaefc98fhrdnaiTmbcbhwcbhDindnaoar6mbcbskadaDcdtfydbgqalcwfawaqav9Rgvavc8F91gv7av9Rc507gwcdtfgkydb9Rgvc8E91c9:Gavcdt7awVhvinaoavcFb0gecrtavcFbGV86bbavcr4hvaocefhoaembkakaqBdbaqhvaDcefgDai9hmbkkdnaoar9nmbcbskaocbBbbaoab9RclfhvkavkBeeucbhddninadcefgdc8F0meceadtae6mbkkadcwfcFeGcr9Uab2cvfk:bvli99dui99ludnaeTmbcuadcetcuftcu7:Zhvdndncuaicuftcu7:ZgoJbbbZMgr:lJbbb9p9DTmbar:Ohwxekcjjjj94hwkcbhicbhDinalclfIdbgrJbbbbJbbjZalIdbgq:lar:lMalcwfIdbgk:lMgr:varJbbbb9BEgrNhxaqarNhrdndnakJbbbb9GTmbaxhqxekJbbjZar:l:tgqaq:maxJbbbb9GEhqJbbjZax:l:tgxax:marJbbbb9GEhrkdndnalcxfIdbgxJbbj:;axJbbj:;9GEgkJbbjZakJbbjZ9FEavNJbbbZJbbb:;axJbbbb9GEMgx:lJbbb9p9DTmbax:Ohmxekcjjjj94hmkdndnaqJbbj:;aqJbbj:;9GEgxJbbjZaxJbbjZ9FEaoNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:OhPxekcjjjj94hPkdndnarJbbj:;arJbbj:;9GEgqJbbjZaqJbbjZ9FEaoNJbbbZJbbb:;arJbbbb9GEMgr:lJbbb9p9DTmbar:Ohsxekcjjjj94hskdndnadcl9hmbabaifgzas86bbazcifam86bbazcdfaw86bbazcefaP86bbxekabaDfgzas87ebazcofam87ebazclfaw87ebazcdfaP87ebkalczfhlaiclfhiaDcwfhDaecufgembkkk;hlld99eud99eudnaeTmbdndncuaicuftcu7:ZgvJbbbZMgo:lJbbb9p9DTmbao:Ohixekcjjjj94hikaic;8FiGhrinabcofcicdalclfIdb:lalIdb:l9EgialcwfIdb:lalaicdtfIdb:l9EEgialcxfIdb:lalaicdtfIdb:l9EEgiarV87ebdndnJbbj:;JbbjZalaicdtfIdbJbbbb9DEgoalaicd7cdtfIdbJ;Zl:1ZNNgwJbbj:;awJbbj:;9GEgDJbbjZaDJbbjZ9FEavNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohqxekcjjjj94hqkabcdfaq87ebdndnalaicefciGcdtfIdbJ;Zl:1ZNaoNgwJbbj:;awJbbj:;9GEgDJbbjZaDJbbjZ9FEavNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohqxekcjjjj94hqkabaq87ebdndnaoalaicufciGcdtfIdbJ;Zl:1ZNNgoJbbj:;aoJbbj:;9GEgwJbbjZawJbbjZ9FEavNJbbbZJbbb:;aoJbbbb9GEMgo:lJbbb9p9DTmbao:Ohixekcjjjj94hikabclfai87ebabcwfhbalczfhlaecufgembkkk;3viDue99eu8Jjjjjbcjd9Rgo8Kjjjjbadcd4hrdndndndnavcd9hmbadcl6meaohwarhDinawc:CuBdbawclfhwaDcufgDmbkaeTmiadcl6mdarcdthqalhkcbhxinaohwakhDarhminawawydbgPcbaDIdbgs:8cL4cFeGc:cufasJbbbb9BEgzaPaz9kEBdbaDclfhDawclfhwamcufgmmbkakaqfhkaxcefgxaeSmixbkkaeTmdxekaeTmekarcdthkavce9hhqadcl6hdcbhxindndndnaqmbadmdc:CuhDalhwarhminaDcbawIdbgs:8cL4cFeGc:cufasJbbbb9BEgPaDaP9kEhDawclfhwamcufgmmbxdkkc:CuhDdndnavPleddbdkadmdaohwalhmarhPinawcbamIdbgs:8cL4cFeGgzc;:bazc;:b0Ec:cufasJbbbb9BEBdbamclfhmawclfhwaPcufgPmbxdkkadmecbhwarhminaoawfcbalawfIdbgs:8cL4cFeGgPc8AaPc8A0Ec:cufasJbbbb9BEBdbawclfhwamcufgmmbkkadmbcbhwarhPinaDhmdnavceSmbaoawfydbhmkdndnalawfIdbgscjjj;8iamai9RcefgmcLt9R::NJbbbZJbbb:;asJbbbb9GEMgs:lJbbb9p9DTmbas:Ohzxekcjjjj94hzkabawfazcFFFrGamcKtVBdbawclfhwaPcufgPmbkkabakfhbalakfhlaxcefgxae9hmbkkaocjdf8Kjjjjbk;YqdXui998Jjjjjbc:qd9Rgv8Kjjjjbavc:Sefcbc;Kbz:wjjjb8AcbhodnadTmbcbhoaiTmbdndnabaeSmbaehrxekavcuadcdtgwadcFFFFi0Ecbyd;u:kjjbHjjjjbbgrBd:SeavceBd:mdaraeawz:vjjjb8Akavc:GefcwfcbBdbav9cb83i:Geavc:Gefaradaiavc:Sefz:ojjjbavyd:GehDadci9Ugqcbyd;u:kjjbHjjjjbbheavc:Sefavyd:mdgkcdtfaeBdbavakcefgwBd:mdaecbaqz:wjjjbhxavc:SefawcdtfcuaicdtaicFFFFi0Ecbyd;u:kjjbHjjjjbbgmBdbavakcdfgPBd:mdalc;ebfhsaDheamhwinawalIdbasaeydbgzcwazcw6EcdtfIdbMUdbaeclfheawclfhwaicufgimbkavc:SefaPcdtfcuaqcdtadcFFFF970Ecbyd;u:kjjbHjjjjbbgPBdbdnadci6mbarheaPhwaqhiinawamaeydbcdtfIdbamaeclfydbcdtfIdbMamaecwfydbcdtfIdbMUdbaecxfheawclfhwaicufgimbkkakcifhoalc;ebfhHavc;qbfhOavheavyd:KehAavyd:OehCcbhzcbhwcbhXcehQinaehLcihkarawci2gKcdtfgeydbhsaeclfydbhdabaXcx2fgicwfaecwfydbgYBdbaiclfadBdbaiasBdbaxawfce86bbaOaYBdwaOadBdlaOasBdbaPawcdtfcbBdbdnazTmbcihkaLhiinaOakcdtfaiydbgeBdbakaeaY9haeas9haead9hGGfhkaiclfhiazcufgzmbkkaXcefhXcbhzinaCaAarazaKfcdtfydbcdtgifydbcdtfgYheaDaifgdydbgshidnasTmbdninaeydbawSmeaeclfheaicufgiTmdxbkkaeaYascdtfc98fydbBdbadadydbcufBdbkazcefgzci9hmbkdndnakTmbcuhwJbbbbh8Acbhdavyd:KehYavyd:OehKindndnaDaOadcdtfydbcdtgzfydbgembadcefhdxekadcs0hiamazfgsIdbhEasalcbadcefgdaiEcdtfIdbaHaecwaecw6EcdtfIdbMg3Udba3aE:th3aecdthiaKaYazfydbcdtfheinaPaeydbgzcdtfgsa3asIdbMgEUdbaEa8Aa8AaE9DgsEh8AazawasEhwaeclfheaic98fgimbkkadak9hmbkawcu9hmekaQaq9pmdindnaxaQfRbbmbaQhwxdkaqaQcefgQ9hmbxikkakczakcz6EhzaOheaLhOawcu9hmbkkaocdtavc:Seffc98fhedninaoTmeaeydbcbyd;q:kjjbH:bjjjbbaec98fheaocufhoxbkkavc:qdf8Kjjjjbk;IlevucuaicdtgvaicFFFFi0Egocbyd;u:kjjbHjjjjbbhralalyd9GgwcdtfarBdbalawcefBd9GabarBdbaocbyd;u:kjjbHjjjjbbhralalyd9GgocdtfarBdbalaocefBd9GabarBdlcuadcdtadcFFFFi0Ecbyd;u:kjjbHjjjjbbhralalyd9GgocdtfarBdbalaocefBd9GabarBdwabydbcbavz:wjjjb8Aadci9UhDdnadTmbabydbhoaehladhrinaoalydbcdtfgvavydbcefBdbalclfhlarcufgrmbkkdnaiTmbabydbhlabydlhrcbhvaihoinaravBdbarclfhralydbavfhvalclfhlaocufgombkkdnadci6mbabydlhrabydwhvcbhlinaecwfydbhoaeclfydbhdaraeydbcdtfgwawydbgwcefBdbavawcdtfalBdbaradcdtfgdadydbgdcefBdbavadcdtfalBdbaraocdtfgoaoydbgocefBdbavaocdtfalBdbaecxfheaDalcefgl9hmbkkdnaiTmbabydlheabydbhlinaeaeydbalydb9RBdbalclfhlaeclfheaicufgimbkkkQbabaeadaic;K1jjbz:njjjbkQbabaeadaic;m:jjjbz:njjjbk9DeeuabcFeaicdtz:wjjjbhlcbhbdnadTmbindnalaeydbcdtfgiydbcu9hmbaiabBdbabcefhbkaeclfheadcufgdmbkkabk:Vvioud9:du8Jjjjjbc;Wa9Rgl8Kjjjjbcbhvalcxfcbc;Kbz:wjjjb8AalcuadcitgoadcFFFFe0Ecbyd;u:kjjbHjjjjbbgrBdxalceBd2araeadaicez:tjjjbalcuaoadcjjjjoGEcbyd;u:kjjbHjjjjbbgwBdzadcdthednadTmbabhiinaiavBdbaiclfhiadavcefgv9hmbkkawaefhDalabBdwalawBdl9cbhqindnadTmbaq9cq9:hkarhvaDhiadheinaiav8Pibak1:NcFrG87ebavcwfhvaicdfhiaecufgembkkalclfaq:NceGcdtfydbhxalclfaq9ce98gq:NceGcdtfydbhmalc;Wbfcbcjaz:wjjjb8AaDhvadhidnadTmbinalc;Wbfav8VebcdtfgeaeydbcefBdbavcdfhvaicufgimbkkcbhvcbhiinalc;WbfavfgeydbhoaeaiBdbaoaifhiavclfgvcja9hmbkadhvdndnadTmbinalc;WbfaDamydbgicetf8VebcdtfgeaeydbgecefBdbaxaecdtfaiBdbamclfhmavcufgvmbkaq9cv9smdcbhvinabawydbcdtfavBdbawclfhwadavcefgv9hmbxdkkaq9cv9smekkclhvdninavc98Smealcxfavfydbcbyd;q:kjjbH:bjjjbbavc98fhvxbkkalc;Waf8Kjjjjbk:Jwliuo99iud9:cbhv8Jjjjjbca9Rgoczfcwfcbyd:8:kjjbBdbaocb8Pd:0:kjjb83izaocwfcbyd;i:kjjbBdbaocb8Pd;a:kjjb83ibaicd4hrdndnadmbJFFuFhwJFFuuhDJFFuuhqJFFuFhkJFFuuhxJFFuFhmxekarcdthPaehsincbhiinaoczfaifgzasaifIdbgwazIdbgDaDaw9EEUdbaoaifgzawazIdbgDaDaw9DEUdbaiclfgicx9hmbkasaPfhsavcefgvad9hmbkaoIdKhDaoIdwhwaoIdChqaoIdlhkaoIdzhxaoIdbhmkdnadTmbJbbbbJbFu9hJbbbbamax:tgmamJbbbb9DEgmakaq:tgkakam9DEgkawaD:tgwawak9DEgw:vawJbbbb9BEhwdnalmbarcdthoindndnaeclfIdbaq:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikai:S9cC:ghHdndnaeIdbax:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikaHai:S:ehHdndnaecwfIdbaD:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabaHai:T9cy:g:e83ibaeaofheabcwfhbadcufgdmbxdkkarcdthoindndnaeIdbax:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikai:SgH9ca:gaH9cz:g9cjjj;4s:d:eaH9cFe:d:e9cF:bj;4:pj;ar:d9c:bd9:9c:p;G:d;4j:E;ar:d9cH9:9c;d;H:W:y:m:g;d;Hb:d9cv9:9c;j:KM;j:KM;j:Kd:dhOdndnaeclfIdbaq:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikai:SgH9ca:gaH9cz:g9cjjj;4s:d:eaH9cFe:d:e9cF:bj;4:pj;ar:d9c:bd9:9c:p;G:d;4j:E;ar:d9cH9:9c;d;H:W:y:m:g;d;Hb:d9cq9:9cM;j:KM;j:KM;jl:daO:ehOdndnaecwfIdbaD:tawNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabaOai:SgH9ca:gaH9cz:g9cjjj;4s:d:eaH9cFe:d:e9cF:bj;4:pj;ar:d9c:bd9:9c:p;G:d;4j:E;ar:d9cH9:9c;d;H:W:y:m:g;d;Hb:d9cC9:9c:KM;j:KM;j:KMD:d:e83ibaeaofheabcwfhbadcufgdmbkkk9teiucbcbyd;y:kjjbgeabcifc98GfgbBd;y:kjjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;teeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiaeydlBdlaiaeydwBdwaiaeydxBdxaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk:3eedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdxaialBdwaialBdlaialBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabk9teiucbcbyd;y:kjjbgeabcrfc94GfgbBd;y:kjjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik9:eiuZbhedndncbyd;y:kjjbgdaecztgi9nmbcuheadai9RcFFifcz4nbcuSmekadhekcbabae9Rcifc98Gcbyd;y:kjjbfgdBd;y:kjjbdnadZbcztge9nmbadae9RcFFifcz4nb8Akkk;Qddbcjwk;mdbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbbbbbbbbbbbbb4:h9w9N94:P:gW:j9O:ye9Pbbbbbbebbbdbbbebbbdbbbbbbbdbbbbbbbebbbbbbb:l29hZ;69:9kZ;N;76Z;rg97Z;z;o9xZ8J;B85Z;:;u9yZ;b;k9HZ:2;Z9DZ9e:l9mZ59A8KZ:r;T3Z:A:zYZ79OHZ;j4::8::Y:D9V8:bbbb9s:49:Z8R:hBZ9M9M;M8:L;z;o8:;8:PG89q;x:J878R:hQ8::M:B;e87bbbbbbjZbbjZbbjZ:E;V;N8::Y:DsZ9i;H;68:xd;R8:;h0838:;W:NoZbbbb:WV9O8:uf888:9i;H;68:9c9G;L89;n;m9m89;D8Ko8:bbbbf:8tZ9m836ZS:2AZL;zPZZ818EZ9e:lxZ;U98F8:819E;68:FFuuFFuuFFuuFFuFFFuFFFuFbc;mqkzebbbebbbdbbb9G:vbb",e=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var a,s=WebAssembly.instantiate(r(t),{}).then(function(x){a=x.instance,a.exports.__wasm_call_ctors(),a.exports.meshopt_encodeVertexVersion(0),a.exports.meshopt_encodeIndexVersion(1)});function r(x){for(var b=new Uint8Array(x.length),l=0;l<x.length;++l){var m=x.charCodeAt(l);b[l]=m>96?m-97:m>64?m-39:m+4}for(var u=0,l=0;l<x.length;++l)b[u++]=b[l]<60?e[b[l]]:(b[l]-60)*64+b[++l];return b.buffer.slice(0,u)}function n(x){if(!x)throw new Error("Assertion failed")}function i(x){return new Uint8Array(x.buffer,x.byteOffset,x.byteLength)}function o(x,b,l,m){var u=a.exports.sbrk,g=u(b.length*4),y=u(l*4),w=new Uint8Array(a.exports.memory.buffer),T=i(b);w.set(T,g),m&&m(g,g,b.length,l);var I=x(y,g,b.length,l);w=new Uint8Array(a.exports.memory.buffer);var M=new Uint32Array(l);new Uint8Array(M.buffer).set(w.subarray(y,y+l*4)),T.set(w.subarray(g,g+b.length*4)),u(g-u(0));for(var R=0;R<b.length;++R)b[R]=M[b[R]];return[M,I]}function c(x,b,l,m){var u=a.exports.sbrk,g=u(l*4),y=u(l*m),w=new Uint8Array(a.exports.memory.buffer);w.set(i(b),y),x(g,y,l,m),w=new Uint8Array(a.exports.memory.buffer);var T=new Uint32Array(l);return new Uint8Array(T.buffer).set(w.subarray(g,g+l*4)),u(g-u(0)),T}function d(x,b,l,m,u){var g=a.exports.sbrk,y=g(b),w=g(m*u),T=new Uint8Array(a.exports.memory.buffer);T.set(i(l),w);var I=x(y,b,w,m,u),M=new Uint8Array(I);return M.set(T.subarray(y,y+I)),g(y-g(0)),M}function f(x){for(var b=0,l=0;l<x.length;++l){var m=x[l];b=b<m?m:b}return b}function p(x,b){if(n(b==2||b==4),b==4)return new Uint32Array(x.buffer,x.byteOffset,x.byteLength/4);var l=new Uint16Array(x.buffer,x.byteOffset,x.byteLength/2);return new Uint32Array(l)}function v(x,b,l,m,u,g,y){var w=a.exports.sbrk,T=w(l*m),I=w(l*g),M=new Uint8Array(a.exports.memory.buffer);M.set(i(b),I),x(T,l,m,u,I,y);var R=new Uint8Array(l*m);return R.set(M.subarray(T,T+l*m)),w(T-w(0)),R}return{ready:s,supported:!0,reorderMesh:function(x,b,l){var m=b?l?a.exports.meshopt_optimizeVertexCacheStrip:a.exports.meshopt_optimizeVertexCache:void 0;return o(a.exports.meshopt_optimizeVertexFetchRemap,x,f(x)+1,m)},reorderPoints:function(x,b){return n(x instanceof Float32Array),n(x.length%b==0),n(b>=3),c(a.exports.meshopt_spatialSortRemap,x,x.length/b,b*4)},encodeVertexBuffer:function(x,b,l){n(l>0&&l<=256),n(l%4==0);var m=a.exports.meshopt_encodeVertexBufferBound(b,l);return d(a.exports.meshopt_encodeVertexBuffer,m,x,b,l)},encodeIndexBuffer:function(x,b,l){n(l==2||l==4),n(b%3==0);var m=p(x,l),u=a.exports.meshopt_encodeIndexBufferBound(b,f(m)+1);return d(a.exports.meshopt_encodeIndexBuffer,u,m,b,4)},encodeIndexSequence:function(x,b,l){n(l==2||l==4);var m=p(x,l),u=a.exports.meshopt_encodeIndexSequenceBound(b,f(m)+1);return d(a.exports.meshopt_encodeIndexSequence,u,m,b,4)},encodeGltfBuffer:function(x,b,l,m){var u={ATTRIBUTES:this.encodeVertexBuffer,TRIANGLES:this.encodeIndexBuffer,INDICES:this.encodeIndexSequence};return n(u[m]),u[m](x,b,l)},encodeFilterOct:function(x,b,l,m){return n(l==4||l==8),n(m>=1&&m<=16),v(a.exports.meshopt_encodeFilterOct,x,b,l,m,16)},encodeFilterQuat:function(x,b,l,m){return n(l==8),n(m>=4&&m<=16),v(a.exports.meshopt_encodeFilterQuat,x,b,l,m,16)},encodeFilterExp:function(x,b,l,m,u){n(l>0&&l%4==0),n(m>=1&&m<=24);var g={Separate:0,SharedVector:1,SharedComponent:2,Clamped:3};return v(a.exports.meshopt_encodeFilterExp,x,b,l,m,l,u?g[u]:1)}}})();var ar=(function(){var t="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:W:Odkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:S86qdbk;jYi5ud9:du8Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxcj;abad9Uc;WFbGcjdadca0EhmaialfgPar9Rgoadfhsavaoadz1jjjbgzceVhHcbhOdndninaeaO9nmeaPax9RaD6mdamaeaO9RaOamfgoae6EgAcsfglc9WGhCabaOad2fhXaAcethQaxaDfhiaOaeaoaeao6E9RhLalcl4cifcd4hKazcj;cbfaAfhYcbh8AazcjdfhEaHh3incbhodnawTmbaxa8Acd4fRbbhokaocFeGh5cbh8Eazcj;cbfhqinaih8Fdndndndna5a8Ecet4ciGgoc9:fPdebdkaPa8F9RaA6mrazcj;cbfa8EaA2fa8FaAz1jjjb8Aa8FaAfhixdkazcj;cbfa8EaA2fcbaAz:jjjjb8Aa8FhixekaPa8F9RaK6mva8FaKfhidnaCTmbaPai9RcK6mbaocdtc:q1jjbfcj1jjbawEhaczhrcbhlinargoc9Wfghaqfhrdndndndndndnaaa8Fahco4fRbbalcoG4ciGcdtfydbPDbedvivvvlvkar9cb83bbarcwf9cb83bbxlkarcbaiRbdai8Xbb9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbaqaofgrcGfag9c8F1:NghcKtc8F91aicdfa8J9c8N1:Nfg8KRbbG86bbarcVfcba8KahcjeGcr4fghRbbag9cjjjjjl:dg8J9qE86bbarc7fcbaha8J9c8L1:NfghRbbag9cjjjjjd:dg8J9qE86bbarctfcbaha8J9c8K1:NfghRbbag9cjjjjje:dg8J9qE86bbarc91fcbaha8J9c8J1:NfghRbbag9cjjjj;ab:dg8J9qE86bbarc4fcbaha8J9cg1:NfghRbbag9cjjjja:dg8J9qE86bbarc93fcbaha8J9ch1:NfghRbbag9cjjjjz:dgg9qE86bbarc94fcbahag9ca1:NfghRbbai8Xbe9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbarc95fag9c8F1:NgicKtc8F91aha8J9c8N1:NfghRbbG86bbarc96fcbahaicjeGcr4fgiRbbag9cjjjjjl:dg8J9qE86bbarc97fcbaia8J9c8L1:NfgiRbbag9cjjjjjd:dg8J9qE86bbarc98fcbaia8J9c8K1:NfgiRbbag9cjjjjje:dg8J9qE86bbarc99fcbaia8J9c8J1:NfgiRbbag9cjjjj;ab:dg8J9qE86bbarc9:fcbaia8J9cg1:NfgiRbbag9cjjjja:dg8J9qE86bbarcufcbaia8J9ch1:NfgiRbbag9cjjjjz:dgg9qE86bbaiag9ca1:NfhixikaraiRblaiRbbghco4g8Ka8KciSg8KE86bbaqaofgrcGfaiclfa8Kfg8KRbbahcl4ciGg8La8LciSg8LE86bbarcVfa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc7fa8Ka8Lfg8KRbbahciGghahciSghE86bbarctfa8Kahfg8KRbbaiRbeghco4g8La8LciSg8LE86bbarc91fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc4fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc93fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc94fa8Kahfg8KRbbaiRbdghco4g8La8LciSg8LE86bbarc95fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc96fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc97fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc98fa8KahfghRbbaiRbigico4g8Ka8KciSg8KE86bbarc99faha8KfghRbbaicl4ciGg8Ka8KciSg8KE86bbarc9:faha8KfghRbbaicd4ciGg8Ka8KciSg8KE86bbarcufaha8KfgrRbbaiciGgiaiciSgiE86bbaraifhixdkaraiRbwaiRbbghcl4g8Ka8KcsSg8KE86bbaqaofgrcGfaicwfa8Kfg8KRbbahcsGghahcsSghE86bbarcVfa8KahfghRbbaiRbeg8Kcl4g8La8LcsSg8LE86bbarc7faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarctfaha8KfghRbbaiRbdg8Kcl4g8La8LcsSg8LE86bbarc91faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc4faha8KfghRbbaiRbig8Kcl4g8La8LcsSg8LE86bbarc93faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc94faha8KfghRbbaiRblg8Kcl4g8La8LcsSg8LE86bbarc95faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc96faha8KfghRbbaiRbvg8Kcl4g8La8LcsSg8LE86bbarc97faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc98faha8KfghRbbaiRbog8Kcl4g8La8LcsSg8LE86bbarc99faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc9:faha8KfghRbbaiRbrgicl4g8Ka8KcsSg8KE86bbarcufaha8KfgrRbbaicsGgiaicsSgiE86bbaraifhixekarai8Pbb83bbarcwfaicwf8Pbb83bbaiczfhikdnaoaC9pmbalcdfhlaoczfhraPai9RcL0mekkaoaC6moaimexokaCmva8FTmvkaqaAfhqa8Ecefg8Ecl9hmbkdndndndnawTmbasa8Acd4fRbbgociGPlbedrbkaATmdaza8Afh8Fazcj;cbfhhcbh8EaEhaina8FRbbhraahocbhlinaoahalfRbbgqce4cbaqceG9R7arfgr86bbaoadfhoaAalcefgl9hmbkaacefhaa8Fcefh8FahaAfhha8Ecefg8Ecl9hmbxikkaATmeaza8Afhaazcj;cbfhhcbhoceh8EaYh8FinaEaofhlaa8Vbbhrcbhoinala8FaofRbbcwtahaofRbbgqVc;:FiGce4cbaqceG9R7arfgr87bbaladfhlaLaocefgofmbka8FaQfh8FcdhoaacdfhaahaQfhha8EceGhlcbh8EalmbxdkkaATmbcbaocl49Rh8Eaza8AfRbbhqcwhoa3hlinalRbbaotaqVhqalcefhlaocwfgoca9hmbkcbhhaEh8FaYhainazcj;cbfahfRbbhrcwhoaahlinalRbbaotarVhralaAfhlaocwfgoca9hmbkara8E93aq7hqcbhoa8Fhlinalaqao486bbalcefhlaocwfgoca9hmbka8Fadfh8FaacefhaahcefghaA9hmbkkaEclfhEa3clfh3a8Aclfg8Aad6mbkaXazcjdfaAad2z1jjjb8AazazcjdfaAcufad2fadz1jjjb8AaAaOfhOaihxaimbkc9:hoxdkcbc99aPax9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaok:XseHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbaxcefgOavaiaqaDcsGfRbbgscl49RcsGcdtfydbascz6gPEhDavaias9RcsGcdtfydbaOaPfgzascsGgOEhsaOThOdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiaPfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaOfhiazaOfhxxekaxcbalRbbgHEgAaDc;:eSgDfhzaHcsGhCaHcl4hXdndnaHcs0mbazcefhOxekazhOavaiaX9RcsGcdtfydbhzkdndnaCmbaOcefhxxekaOhxavaiaH9RcsGcdtfydbhOkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhAascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaAhDxekaDcefhDkasce4cbasceG9R7amfgmhAkdndnaXcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhzaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkazhsxekascefhskaPce4cbaPceG9R7amfgmhzkdndnaCcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhOaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkaOhlxekalcefhlkaPce4cbaPceG9R7amfgmhOkdndnadcd9hmbabarcetfgDaA87ebaDclfaO87ebaDcdfaz87ebxekabarcdtfgDaABdbaDcwfaOBdbaDclfazBdbkavc;abfaocitfgDazBdbaDaABdlavaicdtfaABdbavc;abfaocefcsGcitfgDaOBdbaDazBdlavaicefgicsGcdtfazBdbavc;abfaocdfcsGcitfgDaABdbaDaOBdlavaiaHcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnaecvfal9nmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;oiliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabaiavcefciGfcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavciGfgkcd7cetfaD87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavcufciGfcetfaD87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohvxekcjjjj94hvkabakcetfav87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk9teiucbcbyd:K1jjbgeabcifc98GfgbBd:K1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;teeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiaeydlBdlaiaeydwBdwaiaeydxBdxaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk:3eedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdxaialBdwaialBdlaialBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkk81dbcjwk8Kbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbc:Kwkl8WNbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q:6dkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;G9Mqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk:183lYud97dur978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxavaialfgmar9Rgoad;8qbbcj;abad9Uc;WFbGcjdadca0EhPdndndnadTmbaoadfhscbhzinaeaz9nmdamax9RaD6miabazad2fhHaxaDfhOaPaeaz9RazaPfae6EgAcsfgocl4cifcd4hCavcj;cbfaoc9WGgXcetfhQavcj;cbfaXci2fhLavcj;cbfaXfhKcbhYaoc;ab6h8AincbhodnawTmbaxaYcd4fRbbhokaocFeGhEcbh3avcj;cbfh5indndndndnaEa3cet4ciGgoc9:fPdebdkamaO9RaX6mwavcj;cbfa3aX2faOaX;8qbbaOaAfhOxdkavcj;cbfa3aX2fcbaX;8kbxekamaO9RaC6moaoclVcbawEhraOaCfhocbhidna8Ambamao9Rc;Gb6mbcbhlina5alfhidndndndndndnaOalco4fRbbgqciGarfPDbedibledibkaipxbbbbbbbbbbbbbbbbpklbxlkaiaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaoclffahc:q:yjjbfRbbfhoxikaiaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaocwffahc:q:yjjbfRbbfhoxdkaiaopbbbpklbaoczfhoxekaiaopbbdaoRbbgacitc:q1jjbfpbibaac:q:yjjbfRbbgapsaoRbeghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpklbaaaocdffahc:q:yjjbfRbbfhokdndndndndndnaqcd4ciGarfPDbedibledibkaiczfpxbbbbbbbbbbbbbbbbpklbxlkaiczfaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaoclffahc:q:yjjbfRbbfhoxikaiczfaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaocwffahc:q:yjjbfRbbfhoxdkaiczfaopbbbpklbaoczfhoxekaiczfaopbbdaoRbbgacitc:q1jjbfpbibaac:q:yjjbfRbbgapsaoRbeghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpklbaaaocdffahc:q:yjjbfRbbfhokdndndndndndnaqcl4ciGarfPDbedibledibkaicafpxbbbbbbbbbbbbbbbbpklbxlkaicafaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaoclffahc:q:yjjbfRbbfhoxikaicafaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaocwffahc:q:yjjbfRbbfhoxdkaicafaopbbbpklbaoczfhoxekaicafaopbbdaoRbbgacitc:q1jjbfpbibaac:q:yjjbfRbbgapsaoRbeghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpklbaaaocdffahc:q:yjjbfRbbfhokdndndndndndnaqco4arfPDbedibledibkaic8Wfpxbbbbbbbbbbbbbbbbpklbxlkaic8Wfaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngicitc:q1jjbfpbibaic:q:yjjbfRbbgipsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaiaoclffaqc:q:yjjbfRbbfhoxikaic8Wfaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngicitc:q1jjbfpbibaic:q:yjjbfRbbgipsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaiaocwffaqc:q:yjjbfRbbfhoxdkaic8Wfaopbbbpklbaoczfhoxekaic8WfaopbbdaoRbbgicitc:q1jjbfpbibaic:q:yjjbfRbbgipsaoRbegqcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpklbaiaocdffaqc:q:yjjbfRbbfhokalc;abfhialcjefaX0meaihlamao9Rc;Fb0mbkkdnaiaX9pmbaici4hlinamao9RcK6mwa5aifhqdndndndndndnaOaico4fRbbalcoG4ciGarfPDbedibledibkaqpxbbbbbbbbbbbbbbbbpkbbxlkaqaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spkbbaaaoclffahc:q:yjjbfRbbfhoxikaqaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spkbbaaaocwffahc:q:yjjbfRbbfhoxdkaqaopbbbpkbbaoczfhoxekaqaopbbdaoRbbgacitc:q1jjbfpbibaac:q:yjjbfRbbgapsaoRbeghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpkbbaaaocdffahc:q:yjjbfRbbfhokalcdfhlaiczfgiaX6mbkkaohOaoTmoka5aXfh5a3cefg3cl9hmbkdndndndnawTmbasaYcd4fRbbglciGPlbedwbkaXTmdavcjdfaYfhlavaYfpbdbhgcbhoinalavcj;cbfaofpblbg8JaKaofpblbg8KpmbzeHdOiAlCvXoQrLg8LaQaofpblbg8MaLaofpblbg8NpmbzeHdOiAlCvXoQrLgypmbezHdiOAlvCXorQLg8Ecep9Ta8Epxeeeeeeeeeeeeeeeeg8Fp9op9Hp9rg8Eagp9Uggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp9Uggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp9Uggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp9Uggp9Abbbaladfglaga8LaypmwDKYqk8AExm35Ps8E8Fg8Ecep9Ta8Ea8Fp9op9Hp9rg8Ep9Uggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp9Uggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp9Uggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp9Uggp9Abbbaladfglaga8Ja8KpmwKDYq8AkEx3m5P8Es8Fg8Ja8Ma8NpmwKDYq8AkEx3m5P8Es8Fg8KpmbezHdiOAlvCXorQLg8Ecep9Ta8Ea8Fp9op9Hp9rg8Ep9Uggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp9Uggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp9Uggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp9Uggp9Abbbaladfglaga8Ja8KpmwDKYqk8AExm35Ps8E8Fg8Ecep9Ta8Ea8Fp9op9Hp9rg8Ep9Ug8Fp9Abbbaladfgla8Fa8Ea8Epmlvorlvorlvorlvorp9Ug8Fp9Abbbaladfgla8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9Ug8Fp9Abbbaladfgla8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9Uggp9AbbbaladfhlaoczfgoaX6mbxikkaXTmeavcjdfaYfhlavaYfpbdbhgcbhoinalavcj;cbfaofpblbg8JaKaofpblbg8KpmbzeHdOiAlCvXoQrLg8LaQaofpblbg8MaLaofpblbg8NpmbzeHdOiAlCvXoQrLgypmbezHdiOAlvCXorQLg8Ecep:nea8Epxebebebebebebebebg8Fp9op:bep9rg8Eagp:oeggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp:oeggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp:oeggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp:oeggp9Abbbaladfglaga8LaypmwDKYqk8AExm35Ps8E8Fg8Ecep:nea8Ea8Fp9op:bep9rg8Ep:oeggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp:oeggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp:oeggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp:oeggp9Abbbaladfglaga8Ja8KpmwKDYq8AkEx3m5P8Es8Fg8Ja8Ma8NpmwKDYq8AkEx3m5P8Es8Fg8KpmbezHdiOAlvCXorQLg8Ecep:nea8Ea8Fp9op:bep9rg8Ep:oeggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp:oeggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp:oeggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp:oeggp9Abbbaladfglaga8Ja8KpmwDKYqk8AExm35Ps8E8Fg8Ecep:nea8Ea8Fp9op:bep9rg8Ep:oeg8Fp9Abbbaladfgla8Fa8Ea8Epmlvorlvorlvorlvorp:oeg8Fp9Abbbaladfgla8Fa8Ea8EpmwDqkwDqkwDqkwDqkp:oeg8Fp9Abbbaladfgla8Fa8Ea8EpmxmPsxmPsxmPsxmPsp:oeggp9AbbbaladfhlaoczfgoaX6mbxdkkaXTmbcbhocbalcl4gl9Rc8FGhiavcjdfaYfhravaYfpbdbh8Finaravcj;cbfaofpblbggaKaofpblbg8JpmbzeHdOiAlCvXoQrLg8KaQaofpblbg8LaLaofpblbg8MpmbzeHdOiAlCvXoQrLg8NpmbezHdiOAlvCXorQLg8Eaip:Rea8Ealp:Sep9qg8Ea8Fp9rg8Fp9Abbbaradfgra8Fa8Ea8Epmlvorlvorlvorlvorp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9rg8Fp9Abbbaradfgra8Fa8Ka8NpmwDKYqk8AExm35Ps8E8Fg8Eaip:Rea8Ealp:Sep9qg8Ep9rg8Fp9Abbbaradfgra8Fa8Ea8Epmlvorlvorlvorlvorp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9rg8Fp9Abbbaradfgra8Faga8JpmwKDYq8AkEx3m5P8Es8Fgga8La8MpmwKDYq8AkEx3m5P8Es8Fg8JpmbezHdiOAlvCXorQLg8Eaip:Rea8Ealp:Sep9qg8Ep9rg8Fp9Abbbaradfgra8Fa8Ea8Epmlvorlvorlvorlvorp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9rg8Fp9Abbbaradfgra8Faga8JpmwDKYqk8AExm35Ps8E8Fg8Eaip:Rea8Ealp:Sep9qg8Ep9rg8Fp9Abbbaradfgra8Fa8Ea8Epmlvorlvorlvorlvorp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9rg8Fp9AbbbaradfhraoczfgoaX6mbkkaYclfgYad6mbkaHavcjdfaAad2;8qbbavavcjdfaAcufad2fad;8qbbaAazfhzc9:hoaOhxaOmbxlkkaeTmbaDalfhrcbhocuhlinaralaD9RglfaD6mdaPaeao9RaoaPfae6Eaofgoae6mbkaial9Rhxkcbc99amax9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaokwbz:bjjjbk:TseHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbaxcefgOavaiaqaDcsGfRbbgscl49RcsGcdtfydbascz6gPEhDavaias9RcsGcdtfydbaOaPfgzascsGgOEhsaOThOdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiaPfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaOfhiazaOfhxxekaxcbalRbbgHEgAaDc;:eSgDfhzaHcsGhCaHcl4hXdndnaHcs0mbazcefhOxekazhOavaiaX9RcsGcdtfydbhzkdndnaCmbaOcefhxxekaOhxavaiaH9RcsGcdtfydbhOkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhAascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaAhDxekaDcefhDkasce4cbasceG9R7amfgmhAkdndnaXcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhzaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkazhsxekascefhskaPce4cbaPceG9R7amfgmhzkdndnaCcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhOaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkaOhlxekalcefhlkaPce4cbaPceG9R7amfgmhOkdndnadcd9hmbabarcetfgDaA87ebaDclfaO87ebaDcdfaz87ebxekabarcdtfgDaABdbaDcwfaOBdbaDclfazBdbkavc;abfaocitfgDazBdbaDaABdlavaicdtfaABdbavc;abfaocefcsGcitfgDaOBdbaDazBdlavaicefgicsGcdtfazBdbavc;abfaocdfcsGcitfgDaABdbaDaOBdlavaiaHcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnaecvfal9nmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:SPliuo97eue978Jjjjjbca9Rhiaec98Ghldndnadcl9hmbdnalTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalaeSmeaipxbbbbbbbbbbbbbbbbgqpklbaiabalcdtfgdaeciGglcdtgv;8qbbdnalTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDaqp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkadaiav;8qbbskdnalTmbcbhvabhdinadczfgxaxpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;7eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oaoarpmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgval6mbkkalaeSmbaiczfpxbbbbbbbbbbbbbbbbgopklbaiaopklbaiabalcitfgdaeciGglcitgv;8qbbdnalTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;7eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oaoarpmbezHdiOAlvCXorQLp9qpklbkadaiav;8qbbkk:oDllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalaeSmbaiczfpxbbbbbbbbbbbbbbbbgkpklbaiakpklbaiabalcitfgoaeciGgvcitgw;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkaoaiaw;8qbbkk;uddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbheabhdinadadpbbbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbadczfhdaeclfgeav6mbkkdnavalSmbaic8WfpxbbbbbbbbbbbbbbbbgopklbaicafaopklbaiczfaopklbaiaopklbaiabavcdtfgdalciGgecdtgv;8qbbdnaeTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepklbkadaiav;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz:Dbb",a=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),s=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var r=WebAssembly.validate(a)?o(e):o(t),n,i=WebAssembly.instantiate(r,{}).then(function(u){n=u.instance,n.exports.__wasm_call_ctors()});function o(u){for(var g=new Uint8Array(u.length),y=0;y<u.length;++y){var w=u.charCodeAt(y);g[y]=w>96?w-97:w>64?w-39:w+4}for(var T=0,y=0;y<u.length;++y)g[T++]=g[y]<60?s[g[y]]:(g[y]-60)*64+g[++y];return g.buffer.slice(0,T)}function c(u,g,y,w,T,I,M){var R=u.exports.sbrk,S=w+3&-4,N=R(S*T),B=R(I.length),P=new Uint8Array(u.exports.memory.buffer);P.set(I,B);var j=g(N,w,T,B,I.length);if(j==0&&M&&M(N,S,T),y.set(P.subarray(N,N+w*T)),R(N-R(0)),j!=0)throw new Error("Malformed buffer data: "+j)}var d={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},f={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},p=[],v=0;function x(u){var g={object:new Worker(u),pending:0,requests:{}};return g.object.onmessage=function(y){var w=y.data;g.pending-=w.count,g.requests[w.id][w.action](w.value),delete g.requests[w.id]},g}function b(u){for(var g="self.ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(r)+"]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = "+m.name+";"+c.toString()+m.toString(),y=new Blob([g],{type:"text/javascript"}),w=URL.createObjectURL(y),T=p.length;T<u;++T)p[T]=x(w);for(var T=u;T<p.length;++T)p[T].object.postMessage({});p.length=u,URL.revokeObjectURL(w)}function l(u,g,y,w,T){for(var I=p[0],M=1;M<p.length;++M)p[M].pending<I.pending&&(I=p[M]);return new Promise(function(R,S){var N=new Uint8Array(y),B=++v;I.pending+=u,I.requests[B]={resolve:R,reject:S},I.object.postMessage({id:B,count:u,size:g,source:N,mode:w,filter:T},[N.buffer])})}function m(u){var g=u.data;if(!g.id)return self.close();self.ready.then(function(y){try{var w=new Uint8Array(g.count*g.size);c(y,y.exports[g.mode],w,g.count,g.size,g.source,y.exports[g.filter]),self.postMessage({id:g.id,count:g.count,action:"resolve",value:w},[w.buffer])}catch(T){self.postMessage({id:g.id,count:g.count,action:"reject",value:T})}})}return{ready:i,supported:!0,useWorkers:function(u){b(u)},decodeVertexBuffer:function(u,g,y,w,T){c(n,n.exports.meshopt_decodeVertexBuffer,u,g,y,w,n.exports[d[T]])},decodeIndexBuffer:function(u,g,y,w){c(n,n.exports.meshopt_decodeIndexBuffer,u,g,y,w)},decodeIndexSequence:function(u,g,y,w){c(n,n.exports.meshopt_decodeIndexSequence,u,g,y,w)},decodeGltfBuffer:function(u,g,y,w,T,I){c(n,n.exports[f[T]],u,g,y,w,n.exports[d[I]])},decodeGltfBufferAsync:function(u,g,y,w,T){return p.length>0?l(u,g,y,f[w],d[T]):i.then(function(){var I=new Uint8Array(u*g);return c(n,n.exports[f[w]],I,u,g,y,n.exports[d[T]]),I})}}})();var Dg=(function(){var t="b9H79Tebbbetm9Geueu9Geub9Gbb9Gsuuuuuuuuuuuu99uueu9Gvuuuuub9Gruuuuuuub9Gvuuuuue999Gvuuuuueu9Gquuuuuuu99uueu9Gwuuuuuu99ueu9Giuuue999Gluuuueu9GiuuueuiOHdilvorlwiDqkbxxbelve9Weiiviebeoweuec:G:Pdkr:Tewo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bbz9TW79O9V9Wt9F79P9T9W29P9M95br8E9TW79O9V9Wt9F79P9T9W29P9M959x9Pt9OcttV9P9I91tW7bwQ9TW79O9V9Wt9F79P9T9W29P9M959q9V9P9Ut7bDX9TW79O9V9Wt9F79P9T9W29P9M959t9J9H2Wbqa9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94SWt9J9O9sW9T9H9Wbkl79IV9RbxDwebcekdzsq;B:xeHdbkM9Hi8Au8A99Au8Jjjjjbc;W;qb9Rgs8Kjjjjbcbhzascxfcbc;Kbz:ojjjb8AdnabaeSmbabaeadcdtz:njjjb8AkdndnamcdGmbascxfhHcbhOxekasalcrfci4gecbyd:m:jjjbHjjjjbbgABdxasceBd2aAcbaez:ojjjbhCcbhlcbhednadTmbcbhlabheadhAinaCaeydbgXci4fgQaQRbbgQceaXcrGgXtV86bbaQcu7aX4ceGalfhlaeclfheaAcufgAmbkcualcdtalcFFFFi0EhekascCfhHasaecbyd:m:jjjbHjjjjbbgOBdzascdBd2alcd4alfhXcehAinaAgecethAaeaX6mbkcdhzcbhLascuaecdtgAaecFFFFi0Ecbyd:m:jjjbHjjjjbbgXBdCasciBd2aXcFeaAz:ojjjbhKdnadTmbaecufhYcbh8AindndnaKabaLcdtfgEydbgQc:v;t;h;Ev2aYGgXcdtfgCydbgAcuSmbceheinaOaAcdtfydbaQSmdaXaefhAaecefheaKaAaYGgXcdtfgCydbgAcu9hmbkkaOa8AcdtfaQBdbaCa8ABdba8AhAa8Acefh8AkaEaABdbaLcefgLad9hmbkkaKcbyd1:jjjbH:bjjjbbascdBd2kcbh3aHcualcefgecdtaecFFFFi0Ecbyd:m:jjjbHjjjjbbg5Bdbasa5BdlasazceVgeBd2ascxfaecdtfcuadcitadcFFFFe0Ecbyd:m:jjjbHjjjjbbg8EBdbasa8EBdwasazcdfgeBd2asclfabadalcbz:cjjjbascxfaecdtfcualcdtgealcFFFFi0Eg8Fcbyd:m:jjjbHjjjjbbgABdbasazcifgXBd2ascxfaXcdtfa8Fcbyd:m:jjjbHjjjjbbgaBdbasazclVBd2aAaaaialavaOascxfz:djjjbalcbyd:m:jjjbHjjjjbbhCascxfasyd2ghcdtfaCBdbasahcefgXBd2ascxfaXcdtfa8Fcbyd:m:jjjbHjjjjbbgXBdbasahcdfgQBd2ascxfaQcdtfa8Fcbyd:m:jjjbHjjjjbbgQBdbasahcifggBd2aXcFeaez:ojjjbh8JaQcFeaez:ojjjbh8KdnalTmba8Ecwfh8Lindna5a3gQcefg3cdtfydbgKa5aQcdtgefydbgXSmbaKaX9Rhza8EaXcitfhHa8Kaefh8Ma8JaefhEcbhYindndnaHaYcitfydbg8AaQ9hmbaEaQBdba8MaQBdbxekdna5a8Acdtg8NfgeclfydbgXaeydbgeSmba8EaecitgKfydbaQSmeaXae9Rhyaecu7aXfhLa8LaKfhXcbheinaLaeSmeaecefheaXydbhKaXcwfhXaKaQ9hmbkaeay6meka8Ka8NfgeaQa8AaeydbcuSEBdbaEa8AaQaEydbcuSEBdbkaYcefgYaz9hmbkka3al9hmbkaAhXaahQa8KhKa8JhYcbheindndnaeaXydbg8A9hmbdnaeaQydbg8A9hmbaYydbh8AdnaKydbgLcu9hmba8Acu9hmbaCaefcb86bbxikaCaefhEdnaeaLSmbaea8ASmbaEce86bbxikaEcl86bbxdkdnaeaaa8AcdtgLfydb9hmbdnaKydbgEcuSmbaeaESmbaYydbgzcuSmbaeazSmba8KaLfydbgHcuSmbaHa8ASmba8JaLfydbgLcuSmbaLa8ASmbdnaAaEcdtfydbg8AaAaLcdtfydb9hmba8AaAazcdtfydbgLSmbaLaAaHcdtfydb9hmbaCaefcd86bbxlkaCaefcl86bbxikaCaefcl86bbxdkaCaefcl86bbxekaCaefaCa8AfRbb86bbkaXclfhXaQclfhQaKclfhKaYclfhYalaecefge9hmbkdnaqTmbdndnaOTmbaOheaAhXalhQindnaqaeydbfRbbTmbaCaXydbfcl86bbkaeclfheaXclfhXaQcufgQmbxdkkaAhealhXindnaqRbbTmbaCaeydbfcl86bbkaqcefhqaeclfheaXcufgXmbkkaAhealhQaChXindnaCaeydbfRbbcl9hmbaXcl86bbkaeclfheaXcefhXaQcufgQmbkkamceGTmbaChealhXindnaeRbbce9hmbaecl86bbkaecefheaXcufgXmbkkascxfagcdtfcualcx2alc;v:Q;v:Qe0Ecbyd:m:jjjbHjjjjbbg3BdbasahclfgHBd2a3aialavaOz:ejjjbh8PdndnaDmbcbhgcbh8Lxekcbh8LawhecbhXindnaeIdbJbbbb9ETmbasc;Wbfa8LcdtfaXBdba8Lcefh8LkaeclfheaDaXcefgX9hmbkascxfaHcdtfcua8Lal2gecdtaecFFFFi0Ecbyd:m:jjjbHjjjjbbggBdbasahcvfgHBd2alTmba8LTmbarcd4hEdnaOTmba8Lcdthzcbh8AaghLinaoaOa8AcdtfydbaE2cdtfhYasc;WbfheaLhXa8LhQinaXaYaeydbcdtgKfIdbawaKfIdbNUdbaeclfheaXclfhXaQcufgQmbkaLazfhLa8Acefg8Aal9hmbxdkka8Lcdthzcbh8AaghLinaoa8AaE2cdtfhYasc;WbfheaLhXa8LhQinaXaYaeydbcdtgKfIdbawaKfIdbNUdbaeclfheaXclfhXaQcufgQmbkaLazfhLa8Acefg8Aal9hmbkkascxfaHcdtfcualc8S2gealc;D;O;f8U0EgQcbyd:m:jjjbHjjjjbbgXBdbasaHcefgKBd2aXcbaez:ojjjbhqdndndna8LTmbascxfaKcdtfaQcbyd:m:jjjbHjjjjbbgvBdbasaHcdfgXBd2avcbaez:ojjjb8AascxfaXcdtfcua8Lal2gecltgXaecFFFFb0Ecbyd:m:jjjbHjjjjbbgiBdbasaHcifBd2aicbaXz:ojjjb8AadmexdkcbhvcbhiadTmekcbhYabhXindna3aXclfydbg8Acx2fgeIdba3aXydbgLcx2fgQIdbgI:tg8Ra3aXcwfydbgEcx2fgKIdlaQIdlg8S:tgRNaKIdbaI:tg8UaeIdla8S:tg8VN:tg8Wa8WNa8VaKIdwaQIdwg8X:tg8YNaRaeIdwa8X:tg8VN:tgRaRNa8Va8UNa8Ya8RN:tg8Ra8RNMM:rg8UJbbbb9ETmba8Wa8U:vh8Wa8Ra8U:vh8RaRa8U:vhRkaqaAaLcdtfydbc8S2fgeaRa8U:rg8UaRNNg8VaeIdbMUdbaea8Ra8Ua8RNg8ZNg8YaeIdlMUdlaea8Wa8Ua8WNg80Ng81aeIdwMUdwaea8ZaRNg8ZaeIdxMUdxaea80aRNgBaeIdzMUdzaea80a8RNg80aeIdCMUdCaeaRa8Ua8Wa8XNaRaINa8Sa8RNMM:mg8SNgINgRaeIdKMUdKaea8RaINg8RaeId3MUd3aea8WaINg8WaeIdaMUdaaeaIa8SNgIaeId8KMUd8Kaea8UaeIdyMUdyaqaAa8Acdtfydbc8S2fgea8VaeIdbMUdbaea8YaeIdlMUdlaea81aeIdwMUdwaea8ZaeIdxMUdxaeaBaeIdzMUdzaea80aeIdCMUdCaeaRaeIdKMUdKaea8RaeId3MUd3aea8WaeIdaMUdaaeaIaeId8KMUd8Kaea8UaeIdyMUdyaqaAaEcdtfydbc8S2fgea8VaeIdbMUdbaea8YaeIdlMUdlaea81aeIdwMUdwaea8ZaeIdxMUdxaeaBaeIdzMUdzaea80aeIdCMUdCaeaRaeIdKMUdKaea8RaeId3MUd3aea8WaeIdaMUdaaeaIaeId8KMUd8Kaea8UaeIdyMUdyaXcxfhXaYcifgYad6mbkcbhzabhLinabazcdtfh8AcbhXinaCa8AaXc;a1jjbfydbcdtfydbgQfRbbhedndnaCaLaXfydbgKfRbbgYc99fcFeGcpe0mbaec99fcFeGc;:e6mekdnaYcufcFeGce0mba8JaKcdtfydbaQ9hmekdnaecufcFeGce0mba8KaQcdtfydbaK9hmekdnaYcv2aefc:G1jjbfRbbTmbaAaQcdtfydbaAaKcdtfydb0mekJbbacJbbacJbbjZaecFeGceSEaYceSEh80dna3a8AaXc;e1jjbfydbcdtfydbcx2fgeIdwa3aKcx2fgYIdwg8S:tg8Wa3aQcx2fgEIdwa8S:tgRaRNaEIdbaYIdbg8X:tg8Ra8RNaEIdlaYIdlg8V:tg8Ua8UNMMgINa8WaRNaeIdba8X:tg81a8RNa8UaeIdla8V:tg8ZNMMg8YaRN:tg8Wa8WNa81aINa8Ya8RN:tgRaRNa8ZaINa8Ya8UN:tg8Ra8RNMM:rg8UJbbbb9ETmba8Wa8U:vh8Wa8Ra8U:vh8RaRa8U:vhRkaqaAaKcdtfydbc8S2fgeaRa80aI:rNg8UaRNNg8YaeIdbMUdbaea8Ra8Ua8RNg80Ng81aeIdlMUdlaea8Wa8Ua8WNgINg8ZaeIdwMUdwaea80aRNg80aeIdxMUdxaeaIaRNgBaeIdzMUdzaeaIa8RNg83aeIdCMUdCaeaRa8Ua8Wa8SNaRa8XNa8Va8RNMM:mg8SNgINgRaeIdKMUdKaea8RaINg8RaeId3MUd3aea8WaINg8WaeIdaMUdaaeaIa8SNgIaeId8KMUd8Kaea8UaeIdyMUdyaqaAaQcdtfydbc8S2fgea8YaeIdbMUdbaea81aeIdlMUdlaea8ZaeIdwMUdwaea80aeIdxMUdxaeaBaeIdzMUdzaea83aeIdCMUdCaeaRaeIdKMUdKaea8RaeId3MUd3aea8WaeIdaMUdaaeaIaeId8KMUd8Kaea8UaeIdyMUdykaXclfgXcx9hmbkaLcxfhLazcifgzad6mbka8LTmbcbhLinJbbbbh8Xa3abaLcdtfgeclfydbgEcx2fgXIdwa3aeydbgzcx2fgQIdwg8Z:tg8Ra8RNaXIdbaQIdbgB:tg8Wa8WNaXIdlaQIdlg83:tg8Ua8UNMMg80a3aecwfydbgHcx2fgeIdwa8Z:tgINa8Ra8RaINa8WaeIdbaB:tg8SNa8UaeIdla83:tg8VNMMgRN:tJbbbbJbbjZa80aIaINa8Sa8SNa8Va8VNMMg81NaRaRN:tg8Y:va8YJbbbb9BEg8YNhUa81a8RNaIaRN:ta8YNh85a80a8VNa8UaRN:ta8YNh86a81a8UNa8VaRN:ta8YNh87a80a8SNa8WaRN:ta8YNh88a81a8WNa8SaRN:ta8YNh89a8Wa8VNa8Sa8UN:tgRaRNa8UaINa8Va8RN:tgRaRNa8Ra8SNaIa8WN:tgRaRNMM:rJbbbZNhRagaza8L2gwcdtfhXagaHa8L2g8NcdtfhQagaEa8L2g5cdtfhKa8Z:mh8:a83:mhZaB:mhncbhYa8Lh8AJbbbbh8VJbbbbh8YJbbbbh80Jbbbbh81Jbbbbh8ZJbbbbhBJbbbbh83JbbbbhcJbbbbh9cinasc;WbfaYfgecwfaRa85aKIdbaXIdbgI:tg8UNaUaQIdbaI:tg8SNMg8RNUdbaeclfaRa87a8UNa86a8SNMg8WNUdbaeaRa89a8UNa88a8SNMg8UNUdbaecxfaRa8:a8RNaZa8WNaIana8UNMMMgINUdbaRa8Ra8WNNa81Mh81aRa8Ra8UNNa8ZMh8ZaRa8Wa8UNNaBMhBaRaIaINNa8XMh8XaRa8RaINNa8VMh8VaRa8WaINNa8YMh8YaRa8UaINNa80Mh80aRa8Ra8RNNa83Mh83aRa8Wa8WNNacMhcaRa8Ua8UNNa9cMh9caXclfhXaKclfhKaQclfhQaYczfhYa8Acufg8Ambkavazc8S2fgea9caeIdbMUdbaeacaeIdlMUdlaea83aeIdwMUdwaeaBaeIdxMUdxaea8ZaeIdzMUdzaea81aeIdCMUdCaea80aeIdKMUdKaea8YaeId3MUd3aea8VaeIdaMUdaaea8XaeId8KMUd8KaeaRaeIdyMUdyavaEc8S2fgea9caeIdbMUdbaeacaeIdlMUdlaea83aeIdwMUdwaeaBaeIdxMUdxaea8ZaeIdzMUdzaea81aeIdCMUdCaea80aeIdKMUdKaea8YaeId3MUd3aea8VaeIdaMUdaaea8XaeId8KMUd8KaeaRaeIdyMUdyavaHc8S2fgea9caeIdbMUdbaeacaeIdlMUdlaea83aeIdwMUdwaeaBaeIdxMUdxaea8ZaeIdzMUdzaea81aeIdCMUdCaea80aeIdKMUdKaea8YaeId3MUd3aea8VaeIdaMUdaaea8XaeId8KMUd8KaeaRaeIdyMUdyaiawcltfh8AcbhXa8LhKina8AaXfgeasc;WbfaXfgQIdbaeIdbMUdbaeclfgYaQclfIdbaYIdbMUdbaecwfgYaQcwfIdbaYIdbMUdbaecxfgeaQcxfIdbaeIdbMUdbaXczfhXaKcufgKmbkaia5cltfh8AcbhXa8LhKina8AaXfgeasc;WbfaXfgQIdbaeIdbMUdbaeclfgYaQclfIdbaYIdbMUdbaecwfgYaQcwfIdbaYIdbMUdbaecxfgeaQcxfIdbaeIdbMUdbaXczfhXaKcufgKmbkaia8Ncltfh8AcbhXa8LhKina8AaXfgeasc;WbfaXfgQIdbaeIdbMUdbaeclfgYaQclfIdbaYIdbMUdbaecwfgYaQcwfIdbaYIdbMUdbaecxfgeaQcxfIdbaeIdbMUdbaXczfhXaKcufgKmbkaLcifgLad6mbkkcbhQdndnamcwGgJmbJbbbbh8Vcbh9ecbhocbhhxekcbh9ea8Fcbyd:m:jjjbHjjjjbbhhascxfasyd2gecdtfahBdbasaecefgXBd2ascxfaXcdtfcuahalabadaAz:fjjjbgKcltaKcjjjjiGEcbyd:m:jjjbHjjjjbbgoBdbasaecdfBd2aoaKaha3alz:gjjjbJFFuuh8VaKTmbaoheaKhXinaeIdbgRa8Va8VaR9EEh8VaeclfheaXcufgXmbkaKh9ekasydlhTdnalTmbaTclfheaTydbhKaChXalhYcbhQincbaeydbg8AaK9RaXRbbcpeGEaQfhQaXcefhXaeclfhea8AhKaYcufgYmbkaQce4hQkcuadaQ9RcifgScx2aSc;v:Q;v:Qe0Ecbyd:m:jjjbHjjjjbbhDascxfasyd2g9hcdtfaDBdbasa9hcefgeBd2ascxfaecdtfcuaScdtaScFFFFi0Ecbyd:m:jjjbHjjjjbbgrBdbasa9hcdfgeBd2ascxfaecdtfa8Fcbyd:m:jjjbHjjjjbbgyBdbasa9hcifgeBd2ascxfaecdtfalcbyd:m:jjjbHjjjjbbg9iBdbasa9hclfg6Bd2axaxNa8PJbbjZamclGEgUaUN:vh9cJbbbbhcdnadak9nmbdnaSci6mba8Lclth9kaDcwfh0Jbbbbh83JbbbbhcinasclfabadalaAz:cjjjbabhzcbh8Ecbh8Finaba8FcdtfhHcbheindnaAazaefydbgQcdtgEfydbgYaAaHaec;q1jjbfydbcdtfydbgXcdtgwfydbg8ASmbaCaXfRbbgLcv2aCaQfRbbgKfc;G1jjbfRbbg5aKcv2aLfg8Nc;G1jjbfRbbg8MVcFeGTmbdna8AaY9nmba8Nc:G1jjbfRbbcFeGmekaKcufhYdnaKaL9hmbaYcFeGce0mba8JaEfydbaX9hmekdndnaKclSmbaLcl9hmekdnaYcFeGce0mba8JaEfydbaX9hmdkaLcufcFeGce0mba8KawfydbaQ9hmekaDa8Ecx2fgKaXaQa8McFeGgYEBdlaKaQaXaYEBdbaKaYa5Gcb9hBdwa8Ecefh8Ekaeclfgecx9hmbkdna8Fcifg8Fad9pmbazcxfhza8EcifaS9nmekka8ETmdcbhLinaqaAaDaLcx2fgKydbgYcdtgzfydbc8S2fgeIdwa3aKydlg8Acx2fgXIdwg8WNaeIdzaXIdbg8UNaeIdaMgRaRMMa8WNaeIdlaXIdlgINaeIdCa8WNaeId3MgRaRMMaINaeIdba8UNaeIdxaINaeIdKMgRaRMMa8UNaeId8KMMM:lhRJbbbbJbbjZaeIdyg8R:va8RJbbbb9BEh8RdndnaKydwgEmbJFFuuh8YxekJbbbbJbbjZaqaAa8Acdtfydbc8S2fgeIdyg8S:va8SJbbbb9BEaeIdwa3aYcx2fgXIdwg8SNaeIdzaXIdbg8XNaeIdaMg8Ya8YMMa8SNaeIdlaXIdlg8YNaeIdCa8SNaeId3Mg8Sa8SMMa8YNaeIdba8XNaeIdxa8YNaeIdKMg8Sa8SMMa8XNaeId8KMMM:lNh8Yka8RaRNh80dna8LTmbavaYc8S2fgQIdwa8WNaQIdza8UNaQIdaMgRaRMMa8WNaQIdlaINaQIdCa8WNaQId3MgRaRMMaINaQIdba8UNaQIdxaINaQIdKMgRaRMMa8UNaQId8KMMMhRaga8Aa8L2gHcdtfhXaiaYa8L2gwcltfheaQIdyh8Sa8LhQinaXIdbg8Ra8Ra8SNaecxfIdba8WaecwfIdbNa8UaeIdbNaIaeclfIdbNMMMg8Ra8RM:tNaRMhRaXclfhXaeczfheaQcufgQmbkdndnaEmbJbbbbh8Rxekava8Ac8S2fgQIdwa3aYcx2fgeIdwg8UNaQIdzaeIdbgINaQIdaMg8Ra8RMMa8UNaQIdlaeIdlg8SNaQIdCa8UNaQId3Mg8Ra8RMMa8SNaQIdbaINaQIdxa8SNaQIdKMg8Ra8RMMaINaQId8KMMMh8RagawcdtfhXaiaHcltfheaQIdyh8Xa8LhQinaXIdbg8Wa8Wa8XNaecxfIdba8UaecwfIdbNaIaeIdbNa8SaeclfIdbNMMMg8Wa8WM:tNa8RMh8RaXclfhXaeczfheaQcufgQmbka8R:lh8Rka80aR:lMh80a8Ya8RMh8YaCaYfRbbcd9hmbdna8Ka8Ja8Jazfydba8ASEaaazfydbgHcdtfydbgzcu9hmbaaa8AcdtfydbhzkavaHc8S2fgQIdwa3azcx2fgeIdwg8WNaQIdzaeIdbg8UNaQIdaMgRaRMMa8WNaQIdlaeIdlgINaQIdCa8WNaQId3MgRaRMMaINaQIdba8UNaQIdxaINaQIdKMgRaRMMa8UNaQId8KMMMhRagaza8L2gwcdtfhXaiaHa8L2g8NcltfheaQIdyh8Sa8LhQinaXIdbg8Ra8Ra8SNaecxfIdba8WaecwfIdbNa8UaeIdbNaIaeclfIdbNMMMg8Ra8RM:tNaRMhRaXclfhXaeczfheaQcufgQmbkdndnaEmbJbbbbh8Rxekavazc8S2fgQIdwa3aHcx2fgeIdwg8UNaQIdzaeIdbgINaQIdaMg8Ra8RMMa8UNaQIdlaeIdlg8SNaQIdCa8UNaQId3Mg8Ra8RMMa8SNaQIdbaINaQIdxa8SNaQIdKMg8Ra8RMMaINaQId8KMMMh8Raga8NcdtfhXaiawcltfheaQIdyh8Xa8LhQinaXIdbg8Wa8Wa8XNaecxfIdba8UaecwfIdbNaIaeIdbNa8SaeclfIdbNMMMg8Wa8WM:tNa8RMh8RaXclfhXaeczfheaQcufgQmbka8R:lh8Rka80aR:lMh80a8Ya8RMh8YkaKa80a8Ya80a8Y9FgeEUdwaKa8AaYaeaETVgeEBdlaKaYa8AaeEBdbaLcefgLa8E9hmbkasc;Wbfcbcj;qbz:ojjjb8Aa0hea8EhXinasc;WbfaeydbcA4cF8FGgQcFAaQcFA6EcdtfgQaQydbcefBdbaecxfheaXcufgXmbkcbhecbhXinasc;WbfaefgQydbhKaQaXBdbaKaXfhXaeclfgecj;qb9hmbkcbhea0hXinasc;WbfaXydbcA4cF8FGgQcFAaQcFA6EcdtfgQaQydbgQcefBdbaraQcdtfaeBdbaXcxfhXa8Eaecefge9hmbkadak9RgQci9Uh9mdnalTmbcbheayhXinaXaeBdbaXclfhXalaecefge9hmbkkcbh9na9icbalz:ojjjbh8FaQcO9Uh9oa9mce4h9pasydwh9qcbh8Mcbh5dninaDara5cdtfydbcx2fg8NIdwgRa9c9Emea8Ma9m9pmeJFFuuh8Rdna9pa8E9pmbaDara9pcdtfydbcx2fIdwJbb;aZNh8RkdnaRa8R9ETmbaRac9ETmba8Ma9o0mdkdna8FaAa8NydlgHcdtg9rfydbgKfg9sRbba8FaAa8Nydbgzcdtg9tfydbgefg9uRbbVmbaCazfRbbh9vdnaTaecdtfgXclfydbgQaXydbgXSmbaQaX9RhYa3aKcx2fhLa3aecx2fhEa9qaXcitfhecbhXcehwdnindnayaeydbcdtfydbgQaKSmbayaeclfydbcdtfydbg8AaKSmbaQa8ASmba3a8Acx2fg8AIdba3aQcx2fgQIdbg8W:tgRaEIdlaQIdlg8U:tg8XNaEIdba8W:tg8Ya8AIdla8U:tg8RN:tgIaRaLIdla8U:tg80NaLIdba8W:tg81a8RN:tg8UNa8RaEIdwaQIdwg8S:tg8ZNa8Xa8AIdwa8S:tg8WN:tg8Xa8RaLIdwa8S:tgBNa80a8WN:tg8RNa8Wa8YNa8ZaRN:tg8Sa8Wa81NaBaRN:tgRNMMaIaINa8Xa8XNa8Sa8SNMMa8Ua8UNa8Ra8RNaRaRNMMN:rJbbj8:N9FmdkaecwfheaXcefgXaY6hwaYaX9hmbkkawceGTmba9pcefh9pxekdndndndna9vc9:fPdebdkazheinayaecdtgefaHBdbaaaefydbgeaz9hmbxikkdna8Ka8Ja8Ja9tfydbaHSEaaa9tfydbgzcdtfydbgecu9hmbaaa9rfydbhekaya9tfaHBdbaehHkayazcdtfaHBdbka9uce86bba9sce86bba8NIdwgRacacaR9DEhca9ncefh9ncecda9vceSEa8Mfh8Mka5cefg5a8E9hmbkka9nTmddnalTmbcbh8AcbhEindnayaEcdtgefydbgQaESmbaAaQcdtfydbhzdnaEaAaefydb9hgHmbaqazc8S2fgeaqaEc8S2fgXIdbaeIdbMUdbaeaXIdlaeIdlMUdlaeaXIdwaeIdwMUdwaeaXIdxaeIdxMUdxaeaXIdzaeIdzMUdzaeaXIdCaeIdCMUdCaeaXIdKaeIdKMUdKaeaXId3aeId3MUd3aeaXIdaaeIdaMUdaaeaXId8KaeId8KMUd8KaeaXIdyaeIdyMUdyka8LTmbavaQc8S2fgeavaEc8S2gwfgXIdbaeIdbMUdbaeaXIdlaeIdlMUdlaeaXIdwaeIdwMUdwaeaXIdxaeIdxMUdxaeaXIdzaeIdzMUdzaeaXIdCaeIdCMUdCaeaXIdKaeIdKMUdKaeaXId3aeId3MUd3aeaXIdaaeIdaMUdaaeaXId8KaeId8KMUd8KaeaXIdyaeIdyMUdya9kaQ2hLaihXa8LhKinaXaLfgeaXa8AfgQIdbaeIdbMUdbaeclfgYaQclfIdbaYIdbMUdbaecwfgYaQcwfIdbaYIdbMUdbaecxfgeaQcxfIdbaeIdbMUdbaXczfhXaKcufgKmbkaHmbJbbbbJbbjZaqawfgeIdygR:vaRJbbbb9BEaeIdwa3azcx2fgXIdwgRNaeIdzaXIdbg8RNaeIdaMg8Wa8WMMaRNaeIdlaXIdlg8WNaeIdCaRNaeId3MgRaRMMa8WNaeIdba8RNaeIdxa8WNaeIdKMgRaRMMa8RNaeId8KMMM:lNgRa83a83aR9DEh83ka8Aa9kfh8AaEcefgEal9hmbkcbhXa8JheindnaeydbgQcuSmbdnaXayaQcdtgKfydbgQ9hmbcuhQa8JaKfydbgKcuSmbayaKcdtfydbhQkaeaQBdbkaeclfhealaXcefgX9hmbkcbhXa8KheindnaeydbgQcuSmbdnaXayaQcdtgKfydbgQ9hmbcuhQa8KaKfydbgKcuSmbayaKcdtfydbhQkaeaQBdbkaeclfhealaXcefgX9hmbkka83aca8LEh83cbhKabhecbhYindnayaeydbcdtfydbgXayaeclfydbcdtfydbgQSmbaXayaecwfydbcdtfydbg8ASmbaQa8ASmbabaKcdtfgLaXBdbaLcwfa8ABdbaLclfaQBdbaKcifhKkaecxfheaYcifgYad6mbkdndnaJTmbaKak9nmba8Va839FTmbcbhdabhecbhXindnaoahaeydbgQcdtfydbcdtfIdba839ETmbabadcdtfgYaQBdbaYclfaeclfydbBdbaYcwfaecwfydbBdbadcifhdkaecxfheaXcifgXaK6mbkJFFuuh8Va9eTmeaohea9ehXJFFuuhRinaeIdbg8RaRaRa8R9EEg8WaRa8Ra839EgQEhRa8Wa8VaQEh8VaeclfheaXcufgXmbxdkkaKhdkadak0mbxdkkasclfabadalaAz:cjjjbkdndnadak0mbadhXxekdnaJmbadhXxekdna8Va9c9FmbadhXxekina8VJbb;aZNgRa9caRa9c9DEh8WJbbbbhRdna9eTmbaohea9ehAinaeIdbg8RaRa8Ra8W9FEaRa8RaR9EEhRaeclfheaAcufgAmbkkcbhXabhecbhAindnaoahaeydbgQcdtfydbcdtfIdba8W9ETmbabaXcdtfgKaQBdbaKclfaeclfydbBdbaKcwfaecwfydbBdbaXcifhXkaecxfheaAcifgAad6mbkJFFuuh8Vdna9eTmbaohea9ehAJFFuuh8RinaeIdbg8Ua8Ra8Ra8U9EEgIa8Ra8Ua8W9EgQEh8RaIa8VaQEh8VaeclfheaAcufgAmbkkdnaXad9hmbadhXxdkaRacacaR9DEhcaXak9nmeaXhda8Va9c9FmbkkdnamcjjjjlGTmbaOmbaXTmbcbh8AabheinaCaeydbgKfRbbc3thLaecwfgEydbhAdndna8JaKcdtgHfydbaeclfgzydbgQSmbcbhYa8KaQcdtfydbaK9hmekcjjjj94hYkaeaLaYVaKVBdbaCaQfRbbc3thLdndna8JaQcdtfydbaASmbcbhYa8KaAcdtfydbaQ9hmekcjjjj94hYkazaLaYVaQVBdbaCaAfRbbc3thYdndna8JaAcdtfydbaKSmbcbhQa8KaHfydbaA9hmekcjjjj94hQkaEaYaQVaAVBdbaecxfhea8Acifg8AaX6mbkkdnaOTmbaXTmbaXheinabaOabydbcdtfydbBdbabclfhbaecufgembkkdnaPTmbaPaUac:rNUdbka9hcdtascxffcxfhednina6Tmeaeydbcbyd1:jjjbH:bjjjbbaec98fhea6cufh6xbkkasc;W;qbf8KjjjjbaXk;Yieouabydlhvabydbclfcbaicdtz:ojjjbhoadci9UhrdnadTmbdnalTmbaehwadhDinaoalawydbcdtfydbcdtfgqaqydbcefBdbawclfhwaDcufgDmbxdkkaehwadhDinaoawydbcdtfgqaqydbcefBdbawclfhwaDcufgDmbkkdnaiTmbcbhDaohwinawydbhqawaDBdbawclfhwaqaDfhDaicufgimbkkdnadci6mbinaecwfydbhwaeclfydbhDaeydbhidnalTmbalawcdtfydbhwalaDcdtfydbhDalaicdtfydbhikavaoaicdtfgqydbcitfaDBdbavaqydbcitfawBdlaqaqydbcefBdbavaoaDcdtfgqydbcitfawBdbavaqydbcitfaiBdlaqaqydbcefBdbavaoawcdtfgwydbcitfaiBdbavawydbcitfaDBdlawawydbcefBdbaecxfhearcufgrmbkkabydbcbBdbk:todDue99aicd4aifhrcehwinawgDcethwaDar6mbkcuaDcdtgraDcFFFFi0Ecbyd:m:jjjbHjjjjbbhwaoaoyd9GgqcefBd9GaoaqcdtfawBdbawcFearz:ojjjbhkdnaiTmbalcd4hlaDcufhxcbhminamhDdnavTmbavamcdtfydbhDkcbadaDal2cdtfgDydlgwawcjjjj94SEgwcH4aw7c:F:b:DD2cbaDydbgwawcjjjj94SEgwcH4aw7c;D;O:B8J27cbaDydwgDaDcjjjj94SEgDcH4aD7c:3F;N8N27axGhwamcdthPdndndnavTmbakawcdtfgrydbgDcuSmeadavaPfydbal2cdtfgsIdbhzcehqinaqhrdnadavaDcdtfydbal2cdtfgqIdbaz9CmbaqIdlasIdl9CmbaqIdwasIdw9BmlkarcefhqakawarfaxGgwcdtfgrydbgDcu9hmbxdkkakawcdtfgrydbgDcuSmbadamal2cdtfgsIdbhzcehqinaqhrdnadaDal2cdtfgqIdbaz9CmbaqIdlasIdl9CmbaqIdwasIdw9BmikarcefhqakawarfaxGgwcdtfgrydbgDcu9hmbkkaramBdbamhDkabaPfaDBdbamcefgmai9hmbkkakcbyd1:jjjbH:bjjjbbaoaoyd9GcufBd9GdnaeTmbaiTmbcbhDaehwinawaDBdbawclfhwaiaDcefgD9hmbkcbhDaehwindnaDabydbgrSmbawaearcdtfgrydbBdbaraDBdbkawclfhwabclfhbaiaDcefgD9hmbkkk;Qodvuv998Jjjjjbca9Rgvczfcwfcbyd11jjbBdbavcb8Pdj1jjb83izavcwfcbydN1jjbBdbavcb8Pd:m1jjb83ibdnadTmbaicd4hodnabmbdnalTmbcbhrinaealarcdtfydbao2cdtfhwcbhiinavczfaifgDawaifIdbgqaDIdbgkakaq9EEUdbavaifgDaqaDIdbgkakaq9DEUdbaiclfgicx9hmbkarcefgrad9hmbxikkaocdthrcbhwincbhiinavczfaifgDaeaifIdbgqaDIdbgkakaq9EEUdbavaifgDaqaDIdbgkakaq9DEUdbaiclfgicx9hmbkaearfheawcefgwad9hmbxdkkdnalTmbcbhrinabarcx2fgiaealarcdtfydbao2cdtfgwIdbUdbaiawIdlUdlaiawIdwUdwcbhiinavczfaifgDawaifIdbgqaDIdbgkakaq9EEUdbavaifgDaqaDIdbgkakaq9DEUdbaiclfgicx9hmbkarcefgrad9hmbxdkkaocdthlcbhraehwinabarcx2fgiaearao2cdtfgDIdbUdbaiaDIdlUdlaiaDIdwUdwcbhiinavczfaifgDawaifIdbgqaDIdbgkakaq9EEUdbavaifgDaqaDIdbgkakaq9DEUdbaiclfgicx9hmbkawalfhwarcefgrad9hmbkkJbbbbavIdbavIdzgk:tgqaqJbbbb9DEgqavIdlavIdCgx:tgmamaq9DEgqavIdwavIdKgm:tgPaPaq9DEhPdnabTmbadTmbJbbbbJbbjZaP:vaPJbbbb9BEhqinabaqabIdbak:tNUdbabclfgvaqavIdbax:tNUdbabcwfgvaqavIdbam:tNUdbabcxfhbadcufgdmbkkaPk:ZlewudnaeTmbcbhvabhoinaoavBdbaoclfhoaeavcefgv9hmbkkdnaiTmbcbhrinadarcdtfhwcbhDinalawaDcdtgvc;a1jjbfydbcdtfydbcdtfydbhodnabalawavfydbcdtfydbgqcdtfgkydbgvaqSmbinakabavgqcdtfgxydbgvBdbaxhkaqav9hmbkkdnabaocdtfgkydbgvaoSmbinakabavgocdtfgxydbgvBdbaxhkaoav9hmbkkdnaqaoSmbabaqaoaqao0Ecdtfaqaoaqao6EBdbkaDcefgDci9hmbkarcifgrai6mbkkdnaembcbskcbhxindnalaxcdtgvfydbax9hmbaxhodnabavfgDydbgvaxSmbaDhqinaqabavgocdtfgkydbgvBdbakhqaoav9hmbkkaDaoBdbkaxcefgxae9hmbkcbhvabhocbhkindndnavalydbgq9hmbdnavaoydbgq9hmbaoakBdbakcefhkxdkaoabaqcdtfydbBdbxekaoabaqcdtfydbBdbkaoclfhoalclfhlaeavcefgv9hmbkakk;Jiilud99duabcbaecltz:ojjjbhvdnalTmbadhoaihralhwinarcwfIdbhDarclfIdbhqavaoydbcltfgkarIdbakIdbMUdbakclfgxaqaxIdbMUdbakcwfgxaDaxIdbMUdbakcxfgkakIdbJbbjZMUdbaoclfhoarcxfhrawcufgwmbkkdnaeTmbavhraehkinarcxfgoIdbhDaocbBdbararIdbJbbbbJbbjZaD:vaDJbbbb9BEgDNUdbarclfgoaDaoIdbNUdbarcwfgoaDaoIdbNUdbarczfhrakcufgkmbkkdnalTmbinavadydbcltfgrcxfgkaicwfIdbarcwfIdb:tgDaDNaiIdbarIdb:tgDaDNaiclfIdbarclfIdb:tgDaDNMMgDakIdbgqaqaD9DEUdbadclfhdaicxfhialcufglmbkkdnaeTmbavcxfhrinabarIdbUdbarczfhrabclfhbaecufgembkkk8MbabaeadaialavcbcbcbcbcbaoarawaDz:bjjjbk8MbabaeadaialavaoarawaDaqakaxamaPz:bjjjbk:DCoDud99rue99iul998Jjjjjbc;Wb9Rgw8KjjjjbdndnarmbcbhDxekawcxfcbc;Kbz:ojjjb8Aawcuadcx2adc;v:Q;v:Qe0Ecbyd:m:jjjbHjjjjbbgqBdxawceBd2aqaeadaicbz:ejjjb8AawcuadcdtadcFFFFi0Egkcbyd:m:jjjbHjjjjbbgxBdzawcdBd2adcd4adfhmceheinaegicetheaiam6mbkcbhPawcuaicdtgsaicFFFFi0Ecbyd:m:jjjbHjjjjbbgzBdCawciBd2dndnar:ZgH:rJbbbZMgO:lJbbb9p9DTmbaO:Ohexekcjjjj94hekaicufhAc:bwhmcbhCadhXcbhQinaChLaeamgKcufaeaK9iEaPgDcefaeaD9kEhYdndnadTmbaYcuf:YhOaqhiaxheadhmindndnaiIdbaONJbbbZMg8A:lJbbb9p9DTmba8A:OhCxekcjjjj94hCkaCcCthCdndnaiclfIdbaONJbbbZMg8A:lJbbb9p9DTmba8A:OhExekcjjjj94hEkaEcqtaCVhCdndnaicwfIdbaONJbbbZMg8A:lJbbb9p9DTmba8A:OhExekcjjjj94hEkaeaCaEVBdbaicxfhiaeclfheamcufgmmbkazcFeasz:ojjjbh3cbh5cbhPindna3axaPcdtfydbgCcm4aC7c:v;t;h;Ev2gics4ai7aAGgmcdtfgEydbgecuSmbaeaCSmbcehiina3amaifaAGgmcdtfgEydbgecuSmeaicefhiaeaC9hmbkkaEaCBdba5aecuSfh5aPcefgPad9hmbxdkkazcFeasz:ojjjb8Acbh5kaDaYa5ar0giEhPaLa5aiEhCdna5arSmbaYaKaiEgmaP9Rcd9imbdndnaQcl0mbdnaX:ZgOaL:Zg8A:taY:Yg8EaD:Y:tg8Fa8EaK:Y:tgaa5:ZghaH:tNNNaOaH:taaNa8Aah:tNa8AaH:ta8FNahaO:tNM:va8EMJbbbZMgO:lJbbb9p9DTmbaO:Ohexdkcjjjj94hexekaPamfcd9Theka5aXaiEhXaQcefgQcs9hmekkdndnaCmbcihicbhDxekcbhiawakcbyd:m:jjjbHjjjjbbg5BdKawclBd2aPcuf:Yh8AdndnadTmbaqhiaxheadhmindndnaiIdba8ANJbbbZMgO:lJbbb9p9DTmbaO:OhCxekcjjjj94hCkaCcCthCdndnaiclfIdba8ANJbbbZMgO:lJbbb9p9DTmbaO:OhExekcjjjj94hEkaEcqtaCVhCdndnaicwfIdba8ANJbbbZMgO:lJbbb9p9DTmbaO:OhExekcjjjj94hEkaeaCaEVBdbaicxfhiaeclfheamcufgmmbkazcFeasz:ojjjbh3cbhDcbhYindndndna3axaYcdtgKfydbgCcm4aC7c:v;t;h;Ev2gics4ai7aAGgmcdtfgEydbgecuSmbcehiinaxaecdtgefydbaCSmdamaifheaicefhia3aeaAGgmcdtfgEydbgecu9hmbkkaEaYBdbaDhiaDcefhDxeka5aefydbhika5aKfaiBdbaYcefgYad9hmbkcuaDc32giaDc;j:KM;jb0EhexekazcFeasz:ojjjb8AcbhDcbhekawaecbyd:m:jjjbHjjjjbbgeBd3awcvBd2aecbaiz:ojjjbhEavcd4hKdnadTmbdnalTmbaKcdth3a5hCaqhealhmadhAinaEaCydbc32fgiaeIdbaiIdbMUdbaiaeclfIdbaiIdlMUdlaiaecwfIdbaiIdwMUdwaiamIdbaiIdxMUdxaiamclfIdbaiIdzMUdzaiamcwfIdbaiIdCMUdCaiaiIdKJbbjZMUdKaCclfhCaecxfheama3fhmaAcufgAmbxdkka5hmaqheadhCinaEamydbc32fgiaeIdbaiIdbMUdbaiaeclfIdbaiIdlMUdlaiaecwfIdbaiIdwMUdwaiaiIdxJbbbbMUdxaiaiIdzJbbbbMUdzaiaiIdCJbbbbMUdCaiaiIdKJbbjZMUdKamclfhmaecxfheaCcufgCmbkkdnaDTmbaEhiaDheinaiaiIdbJbbbbJbbjZaicKfIdbgO:vaOJbbbb9BEgONUdbaiclfgmaOamIdbNUdbaicwfgmaOamIdbNUdbaicxfgmaOamIdbNUdbaiczfgmaOamIdbNUdbaicCfgmaOamIdbNUdbaic3fhiaecufgembkkcbhCawcuaDcdtgYaDcFFFFi0Egicbyd:m:jjjbHjjjjbbgeBdaawcoBd2awaicbyd:m:jjjbHjjjjbbg3Bd8KaecFeaYz:ojjjbhxdnadTmbJbbjZJbbjZa8A:vaPceSEaoNgOaONh8AaKcdthPalheina8Aaec;81jjbalEgmIdwaEa5ydbgAc32fgiIdC:tgOaONamIdbaiIdx:tgOaONamIdlaiIdz:tgOaONMMNaqcwfIdbaiIdw:tgOaONaqIdbaiIdb:tgOaONaqclfIdbaiIdl:tgOaONMMMhOdndnaxaAcdtgifgmydbcuSmba3aifIdbaO9ETmekamaCBdba3aifaOUdbka5clfh5aqcxfhqaeaPfheadaCcefgC9hmbkkabaxaYz:njjjb8AcrhikaicdthiinaiTmeaic98fgiawcxffydbcbyd1:jjjbH:bjjjbbxbkkawc;Wbf8KjjjjbaDk:Ydidui99ducbhi8Jjjjjbca9Rglczfcwfcbyd11jjbBdbalcb8Pdj1jjb83izalcwfcbydN1jjbBdbalcb8Pd:m1jjb83ibdndnaembJbbjFhvJbbjFhoJbbjFhrxekadcd4cdthwincbhdinalczfadfgDabadfIdbgvaDIdbgoaoav9EEUdbaladfgDavaDIdbgoaoav9DEUdbadclfgdcx9hmbkabawfhbaicefgiae9hmbkalIdwalIdK:thralIdlalIdC:thoalIdbalIdz:thvkJbbbbavavJbbbb9DEgvaoaoav9DEgvararav9DEk9DeeuabcFeaicdtz:ojjjbhlcbhbdnadTmbindnalaeydbcdtfgiydbcu9hmbaiabBdbabcefhbkaeclfheadcufgdmbkkabk9teiucbcbyd:q:jjjbgeabcifc98GfgbBd:q:jjjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;teeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiaeydlBdlaiaeydwBdwaiaeydxBdxaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk:3eedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdxaialBdwaialBdlaialBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabk9teiucbcbyd:q:jjjbgeabcrfc94GfgbBd:q:jjjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik9:eiuZbhedndncbyd:q:jjjbgdaecztgi9nmbcuheadai9RcFFifcz4nbcuSmekadhekcbabae9Rcifc98Gcbyd:q:jjjbfgdBd:q:jjjbdnadZbcztge9nmbadae9RcFFifcz4nb8Akkk:Iedbcjwk1eFFuuFFuuFFuuFFuFFFuFFFuFbbbbbbbbeeebeebebbeeebebbbbbebebbbbbbbbbebbbdbbbbbbbebbbebbbdbbbbbbbbbbbeeeeebebbebbebebbbeebbbbbbbbbbbbbbbbbbbbbc1Dkxebbbdbbb:GNbb",e=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var a,s=WebAssembly.instantiate(r(t),{}).then(function(b){a=b.instance,a.exports.__wasm_call_ctors()});function r(b){for(var l=new Uint8Array(b.length),m=0;m<b.length;++m){var u=b.charCodeAt(m);l[m]=u>96?u-97:u>64?u-39:u+4}for(var g=0,m=0;m<b.length;++m)l[g++]=l[m]<60?e[l[m]]:(l[m]-60)*64+l[++m];return l.buffer.slice(0,g)}function n(b){if(!b)throw new Error("Assertion failed")}function i(b){return new Uint8Array(b.buffer,b.byteOffset,b.byteLength)}function o(b,l,m){var u=a.exports.sbrk,g=u(l.length*4),y=u(m*4),w=new Uint8Array(a.exports.memory.buffer),T=i(l);w.set(T,g);var I=b(y,g,l.length,m);w=new Uint8Array(a.exports.memory.buffer);var M=new Uint32Array(m);new Uint8Array(M.buffer).set(w.subarray(y,y+m*4)),T.set(w.subarray(g,g+l.length*4)),u(g-u(0));for(var R=0;R<l.length;++R)l[R]=M[l[R]];return[M,I]}function c(b){for(var l=0,m=0;m<b.length;++m){var u=b[m];l=l<u?u:l}return l}function d(b,l,m,u,g,y,w,T,I){var M=a.exports.sbrk,R=M(4),S=M(m*4),N=M(g*y),B=M(m*4),P=new Uint8Array(a.exports.memory.buffer);P.set(i(u),N),P.set(i(l),B);var j=b(S,B,m,N,g,y,w,T,I,R);P=new Uint8Array(a.exports.memory.buffer);var K=new Uint32Array(j);i(K).set(P.subarray(S,S+j*4));var X=new Float32Array(1);return i(X).set(P.subarray(R,R+4)),M(R-M(0)),[K,X[0]]}function f(b,l,m,u,g,y,w,T,I,M,R,S,N){var B=a.exports.sbrk,P=B(4),j=B(m*4),K=B(g*y),X=B(g*T),te=B(I.length*4),ne=B(m*4),je=M?B(g):0,le=new Uint8Array(a.exports.memory.buffer);le.set(i(u),K),le.set(i(w),X),le.set(i(I),te),le.set(i(l),ne),M&&le.set(i(M),je);var Fe=b(j,ne,m,K,g,y,X,T,te,I.length,je,R,S,N,P);le=new Uint8Array(a.exports.memory.buffer);var De=new Uint32Array(Fe);i(De).set(le.subarray(j,j+Fe*4));var me=new Float32Array(1);return i(me).set(le.subarray(P,P+4)),B(P-B(0)),[De,me[0]]}function p(b,l,m,u){var g=a.exports.sbrk,y=g(m*u),w=new Uint8Array(a.exports.memory.buffer);w.set(i(l),y);var T=b(y,m,u);return g(y-g(0)),T}function v(b,l,m,u,g,y,w,T){var I=a.exports.sbrk,M=I(T*4),R=I(m*u),S=I(m*y),N=new Uint8Array(a.exports.memory.buffer);N.set(i(l),R),g&&N.set(i(g),S);var B=b(M,R,m,u,S,y,w,T);N=new Uint8Array(a.exports.memory.buffer);var P=new Uint32Array(B);return i(P).set(N.subarray(M,M+B*4)),I(M-I(0)),P}var x={LockBorder:1,Sparse:2,ErrorAbsolute:4,Prune:8,_InternalDebug:1<<30};return{ready:s,supported:!0,compactMesh:function(b){n(b instanceof Uint32Array||b instanceof Int32Array||b instanceof Uint16Array||b instanceof Int16Array),n(b.length%3==0);var l=b.BYTES_PER_ELEMENT==4?b:new Uint32Array(b);return o(a.exports.meshopt_optimizeVertexFetchRemap,l,c(b)+1)},simplify:function(b,l,m,u,g,y){n(b instanceof Uint32Array||b instanceof Int32Array||b instanceof Uint16Array||b instanceof Int16Array),n(b.length%3==0),n(l instanceof Float32Array),n(l.length%m==0),n(m>=3),n(u>=0&&u<=b.length),n(u%3==0),n(g>=0);for(var w=0,T=0;T<(y?y.length:0);++T)n(y[T]in x),w|=x[y[T]];var I=b.BYTES_PER_ELEMENT==4?b:new Uint32Array(b),M=d(a.exports.meshopt_simplify,I,b.length,l,l.length/m,m*4,u,g,w);return M[0]=b instanceof Uint32Array?M[0]:new b.constructor(M[0]),M},simplifyWithAttributes:function(b,l,m,u,g,y,w,T,I,M){n(b instanceof Uint32Array||b instanceof Int32Array||b instanceof Uint16Array||b instanceof Int16Array),n(b.length%3==0),n(l instanceof Float32Array),n(l.length%m==0),n(m>=3),n(u instanceof Float32Array),n(u.length%g==0),n(g>=0),n(w==null||w instanceof Uint8Array),n(w==null||w.length==l.length/m),n(T>=0&&T<=b.length),n(T%3==0),n(I>=0),n(Array.isArray(y)),n(g>=y.length),n(y.length<=32);for(var R=0;R<y.length;++R)n(y[R]>=0);for(var S=0,R=0;R<(M?M.length:0);++R)n(M[R]in x),S|=x[M[R]];var N=b.BYTES_PER_ELEMENT==4?b:new Uint32Array(b),B=f(a.exports.meshopt_simplifyWithAttributes,N,b.length,l,l.length/m,m*4,u,g*4,new Float32Array(y),w?new Uint8Array(w):null,T,I,S);return B[0]=b instanceof Uint32Array?B[0]:new b.constructor(B[0]),B},getScale:function(b,l){return n(b instanceof Float32Array),n(b.length%l==0),n(l>=3),p(a.exports.meshopt_simplifyScale,b,b.length/l,l*4)},simplifyPoints:function(b,l,m,u,g,y){return n(b instanceof Float32Array),n(b.length%l==0),n(l>=3),n(m>=0&&m<=b.length/l),u?(n(u instanceof Float32Array),n(u.length%g==0),n(g>=3),n(b.length/l==u.length/g),v(a.exports.meshopt_simplifyPoints,b,b.length/l,l*4,u,g*4,y,m)):v(a.exports.meshopt_simplifyPoints,b,b.length/l,l*4,void 0,0,0,m)}}})();var Lg=(function(){var t="b9H79TebbbeVx9Geueu9Geub9Gbb9Giuuueu9Gmuuuuuuuuuuu9999eu9Gvuuuuueu9Gwuuuuuuuub9Gxuuuuuuuuuuuueu9Gkuuuuuuuuuu99eu9Gouuuuuub9Gruuuuuuub9GluuuubiOHdilvorwDqqkbiibeilve9Weiiviebeoweuec;G:Odkr:Yewo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9I919P29K9nW79O2Wt79c9V919U9KbeX9TW79O9V9Wt9F9I919P29K9nW79O2Wt7bo39TW79O9V9Wt9F9J9V9T9W91tWJ2917tWV9c9V919U9K7br39TW79O9V9Wt9F9J9V9T9W91tW9nW79O2Wt9c9V919U9K7bDL9TW79O9V9Wt9F9V9Wt9P9T9P96W9nW79O2Wtbql79IV9RbkDwebcekdsPq;Q9BHdbkIbabaec9:fgefcufae9Ugeabci9Uadfcufad9Ugbaeab0Ek:w8KDPue99eux99dui99euo99iu8Jjjjjbc:WD9Rgm8KjjjjbdndnalmbcbhPxekamc:Cwfcbc;Kbz:njjjb8Adndnalcb9imbaoal9nmbamcuaocdtaocFFFFi0Egscbyd;y1jjbHjjjjbbgzBd:CwamceBd;8wamascbyd;y1jjbHjjjjbbgHBd:GwamcdBd;8wamcualcdtalcFFFFi0Ecbyd;y1jjbHjjjjbbgOBd:KwamciBd;8waihsalhAinazasydbcdtfcbBdbasclfhsaAcufgAmbkaihsalhAinazasydbcdtfgCaCydbcefBdbasclfhsaAcufgAmbkaihsalhCcbhXindnazasydbcdtgQfgAydbcb9imbaHaQfaXBdbaAaAydbgQcjjjj94VBdbaQaXfhXkasclfhsaCcufgCmbkalci9UhLdnalci6mbcbhsaihAinaAcwfydbhCaAclfydbhXaHaAydbcdtfgQaQydbgQcefBdbaOaQcdtfasBdbaHaXcdtfgXaXydbgXcefBdbaOaXcdtfasBdbaHaCcdtfgCaCydbgCcefBdbaOaCcdtfasBdbaAcxfhAaLascefgs9hmbkkaihsalhAindnazasydbcdtgCfgXydbgQcu9kmbaXaQcFFFFrGgQBdbaHaCfgCaCydbaQ9RBdbkasclfhsaAcufgAmbxdkkamcuaocdtgsaocFFFFi0EgAcbyd;y1jjbHjjjjbbgzBd:CwamceBd;8wamaAcbyd;y1jjbHjjjjbbgHBd:GwamcdBd;8wamcualcdtalcFFFFi0Ecbyd;y1jjbHjjjjbbgOBd:KwamciBd;8wazcbasz:njjjbhXalci9UhLaihsalhAinaXasydbcdtfgCaCydbcefBdbasclfhsaAcufgAmbkdnaoTmbcbhsaHhAaXhCaohQinaAasBdbaAclfhAaCydbasfhsaCclfhCaQcufgQmbkkdnalci6mbcbhsaihAinaAcwfydbhCaAclfydbhQaHaAydbcdtfgKaKydbgKcefBdbaOaKcdtfasBdbaHaQcdtfgQaQydbgQcefBdbaOaQcdtfasBdbaHaCcdtfgCaCydbgCcefBdbaOaCcdtfasBdbaAcxfhAaLascefgs9hmbkkaoTmbcbhsaohAinaHasfgCaCydbaXasfydb9RBdbasclfhsaAcufgAmbkkamaLcbyd;y1jjbHjjjjbbgsBd:OwamclBd;8wascbaLz:njjjbhYamcuaLcK2alcjjjjd0Ecbyd;y1jjbHjjjjbbg8ABd:SwamcvBd;8wJbbbbhEdnalci6g3mbarcd4hKaihAa8AhsaLhrJbbbbh5inavaAclfydbaK2cdtfgCIdlh8EavaAydbaK2cdtfgXIdlhEavaAcwfydbaK2cdtfgQIdlh8FaCIdwhaaXIdwhhaQIdwhgasaCIdbg8JaXIdbg8KMaQIdbg8LMJbbnn:vUdbasclfaXIdlaCIdlMaQIdlMJbbnn:vUdbaQIdwh8MaCIdwh8NaXIdwhyascxfa8EaE:tg8Eagah:tggNa8FaE:tg8Faaah:tgaN:tgEJbbbbJbbjZa8Ja8K:tg8Ja8FNa8La8K:tg8Ka8EN:tghahNaEaENaaa8KNaga8JN:tgEaENMM:rg8K:va8KJbbbb9BEg8ENUdbasczfaEa8ENUdbascCfaha8ENUdbascwfa8Maya8NMMJbbnn:vUdba5a8KMh5aAcxfhAascKfhsarcufgrmbka5aL:Z:vJbbbZNhEkamcuaLcdtalcFFFF970Ecbyd;y1jjbHjjjjbbgCBd:WwamcoBd;8waEaq:ZNhEdna3mbcbhsaChAinaAasBdbaAclfhAaLascefgs9hmbkkaE:rhhcuh8PamcuaLcltalcFFFFd0Ecbyd;y1jjbHjjjjbbgIBd:0wamcrBd;8wcbaIa8AaCaLz:djjjb8AJFFuuhyJFFuuh8RJFFuuh8Sdnalci6gXmbJFFuuh8Sa8AhsaLhAJFFuuh8RJFFuuhyinascwfIdbgEayayaE9EEhyasclfIdbgEa8Ra8RaE9EEh8RasIdbgEa8Sa8SaE9EEh8SascKfhsaAcufgAmbkkahJbbbZNhgamaocetgscuaocu9kEcbyd;y1jjbHjjjjbbgABd:4waAcFeasz:njjjbhCdnaXmbcbhAJFFuuhEa8Ahscuh8PinascwfIdbay:tghahNasIdba8S:tghahNasclfIdba8R:tghahNMM:rghaEa8PcuSahaE9DVgXEhEaAa8PaXEh8PascKfhsaLaAcefgA9hmbkkamczfcbcjwz:njjjb8Aamcwf9cb83ibam9cb83ibagaxNhRJbbjZak:th8Ncbh8UJbbbbh8VJbbbbh8WJbbbbh8XJbbbbh8YJbbbbh8ZJbbbbh80cbh81cbhPinJbbbbhEdna8UTmbJbbjZa8U:Z:vhEkJbbbbhhdna80a80Na8Ya8YNa8Za8ZNMMg8KJbbbb9BmbJbbjZa8K:r:vhhka8XaENh5a8WaENh8Fa8VaENhaa8PhQdndndndndna8UaPVTmbamydwgBTmea80ahNh8Ja8ZahNh8La8YahNh8Maeamydbcdtfh83cbh3JFFuuhEcvhXcuhQindnaza83a3cdtfydbcdtgsfydbgvTmbaOaHasfydbcdtfhAindndnaCaiaAydbgKcx2fgsclfydbgrcetf8Vebcs4aCasydbgLcetf8Vebcs4faCascwfydbglcetf8Vebcs4fgombcbhsxekcehsazaLcdtfydbgLceSmbcehsazarcdtfydbgrceSmbcehsazalcdtfydbglceSmbdnarcdSaLcdSfalcdSfcd6mbaocefhsxekaocdfhskdnasaX9kmba8AaKcK2fgLIdwa5:thhaLIdla8F:th8KaLIdbaa:th8EdndnakJbbbb9DTmba8E:lg8Ea8K:lg8Ka8Ea8K9EEg8Kah:lgha8Kah9EEag:vJbbjZMhhxekahahNa8Ea8ENa8Ka8KNMM:rag:va8NNJbbjZMJ9VO:d86JbbjZaLIdCa8JNaLIdxa8MNa8LaLIdzNMMakN:tghahJ9VO:d869DENhhkaKaQasaX6ahaE9DVgLEhQasaXaLEhXahaEaLEhEkaAclfhAavcufgvmbkka3cefg3aB9hmbkkaQcu9hmekama5Ud:ODama8FUd:KDamaaUd:GDamcuBd:qDamcFFF;7rBdjDaIcba8AaYamc:GDfakJbbbb9Damc:qDfamcjDfz:ejjjbamyd:qDhQdndnaxJbbbb9ETmba8UaD6mbaQcuSmeceh3amIdjDaR9EmixdkaQcu9hmekdna8UTmbdnamydlgza8Uci2fgsciGTmbadasfcba8Uazcu7fciGcefz:njjjb8AkabaPcltfgzam8Pib83dbazcwfamcwf8Pib83dbaPcefhPkc3hzinazc98Smvamc:Cwfazfydbcbyd;u1jjbH:bjjjbbazc98fhzxbkkcbh3a8Uaq9pmbamydwaCaiaQcx2fgsydbcetf8Vebcs4aCascwfydbcetf8Vebcs4faCasclfydbcetf8Vebcs4ffaw9nmekcbhscbhAdna81TmbcbhAamczfhXinamczfaAcdtfaXydbgLBdbaXclfhXaAaYaLfRbbTfhAa81cufg81mbkkamydwhlamydbhXam9cu83i:GDam9cu83i:ODam9cu83i:qDam9cu83i:yDaAc;8eaAclfc:bd6Eh81inamcjDfasfcFFF;7rBdbasclfgscz9hmbka81cdthBdnalTmbaeaXcdtfhocbhrindnazaoarcdtfydbcdtgsfydbgvTmbaOaHasfydbcdtfhAcuhLcuhsinazaiaAydbgKcx2fgXclfydbcdtfydbazaXydbcdtfydbfazaXcwfydbcdtfydbfgXasaXas6gXEhsaKaLaXEhLaAclfhAavcufgvmbkaLcuSmba8AaLcK2fgAIdway:tgEaENaAIdba8S:tgEaENaAIdla8R:tgEaENMM:rhEcbhAindndnasamc:qDfaAfgvydbgX6mbasaX9hmeaEamcjDfaAfIdb9FTmekavasBdbamc:GDfaAfaLBdbamcjDfaAfaEUdbxdkaAclfgAcz9hmbkkarcefgral9hmbkkamczfaBfhLcbhscbhAindnamc:GDfasfydbgXcuSmbaLaAcdtfaXBdbaAcefhAkasclfgscz9hmbkaAa81fg81TmbJFFuuhhcuhKamczfhsa81hvcuhLina8AasydbgXcK2fgAIdway:tgEaENaAIdba8S:tgEaENaAIdla8R:tgEaENMM:rhEdndnazaiaXcx2fgAclfydbcdtfydbazaAydbcdtfydbfazaAcwfydbcdtfydbfgAaL6mbaAaL9hmeaEah9DTmekaEhhaAhLaXhKkasclfhsavcufgvmbkaKcuSmbaKhQkdnamaiaQcx2fgrydbarclfydbarcwfydbaCabaeadaPawaqa3z:fjjjbTmbaPcefhPJbbbbh8VJbbbbh8WJbbbbh8XJbbbbh8YJbbbbh8ZJbbbbh80kcbhXinaOaHaraXcdtfydbcdtgAfydbcdtfgKhsazaAfgvydbgLhAdnaLTmbdninasydbaQSmeasclfhsaAcufgATmdxbkkasaKaLcdtfc98fydbBdbavavydbcufBdbkaXcefgXci9hmbka8AaQcK2fgsIdbhEasIdlhhasIdwh8KasIdxh8EasIdzh5asIdCh8FaYaQfce86bba80a8FMh80a8Za5Mh8Za8Ya8EMh8Ya8Xa8KMh8Xa8WahMh8Wa8VaEMh8Vamydxh8Uxbkkamc:WDf8KjjjjbaPk;Vvivuv99lu8Jjjjjbca9Rgv8Kjjjjbdndnalcw0mbaiydbhoaeabcitfgralcdtcufBdlaraoBdbdnalcd6mbaiclfhoalcufhwarcxfhrinaoydbhDarcuBdbarc98faDBdbarcwfhraoclfhoawcufgwmbkkalabfhrxekcbhDavczfcwfcbBdbav9cb83izavcwfcbBdbav9cb83ibJbbjZhqJbbjZhkinadaiaDcdtfydbcK2fhwcbhrinavczfarfgoawarfIdbgxaoIdbgm:tgPakNamMgmUdbavarfgoaPaxam:tNaoIdbMUdbarclfgrcx9hmbkJbbjZaqJbbjZMgq:vhkaDcefgDal9hmbkcbhoadcbcecdavIdlgxavIdwgm9GEgravIdbgPam9GEaraPax9GEgscdtgrfhzavczfarfIdbhxaihralhwinaiaocdtfgDydbhHaDarydbgOBdbaraHBdbarclfhraoazaOcK2fIdbax9Dfhoawcufgwmbkaeabcitfhrdndnaocv6mbaoalc98f6mekaraiydbBdbaralcdtcufBdlaiclfhoalcufhwarcxfhrinaoydbhDarcuBdbarc98faDBdbarcwfhraoclfhoawcufgwmbkalabfhrxekaraxUdbararydlc98GasVBdlabcefaeadaiaoz:djjjbhwararydlciGawabcu7fcdtVBdlawaeadaiaocdtfalao9Rz:djjjbhrkavcaf8Kjjjjbark:;idiud99dndnabaecitfgwydlgDciGgqciSmbinabcbaDcd4gDalaqcdtfIdbawIdb:tgkJbbbb9FEgwaecefgefadaialavaoarz:ejjjbak:larIdb9FTmdabawaD7aefgecitfgwydlgDciGgqci9hmbkkabaecitfgeclfhbdnavmbcuhwindnaiaeydbgDfRbbmbadaDcK2fgqIdwalIdw:tgkakNaqIdbalIdb:tgkakNaqIdlalIdl:tgkakNMM:rgkarIdb9DTmbarakUdbaoaDBdbkaecwfheawcefgwabydbcd46mbxdkkcuhwindnaiaeydbgDfRbbmbadaDcK2fgqIdbalIdb:t:lgkaqIdlalIdl:t:lgxakax9EEgkaqIdwalIdw:t:lgxakax9EEgkarIdb9DTmbarakUdbaoaDBdbkaecwfheawcefgwabydbcd46mbkkk;llevudnabydwgxaladcetfgm8Vebcs4alaecetfgP8Vebgscs4falaicetfgz8Vebcs4ffaD0abydxaq9pVakVgDce9hmbavawcltfgxab8Pdb83dbaxcwfabcwfgx8Pdb83dbdnaxydbgqTmbaoabydbcdtfhxaqhsinalaxydbcetfcFFi87ebaxclfhxascufgsmbkkdnabydxglci2gsabydlgxfgkciGTmbarakfcbalaxcu7fciGcefz:njjjb8Aabydxci2hsabydlhxabydwhqkab9cb83dwababydbaqfBdbabascifc98GaxfBdlaP8Vebhscbhxkdnascztcz91cu9kmbabaxcefBdwaPax87ebaoabydbcdtfaxcdtfaeBdbkdnam8Uebcu9kmbababydwgxcefBdwamax87ebaoabydbcdtfaxcdtfadBdbkdnaz8Uebcu9kmbababydwgxcefBdwazax87ebaoabydbcdtfaxcdtfaiBdbkarabydlfabydxci2faPRbb86bbarabydlfabydxci2fcefamRbb86bbarabydlfabydxci2fcdfazRbb86bbababydxcefBdxaDk8LbabaeadaialavaoarawaDaDaqJbbbbz:cjjjbk;Nkovud99euv99eul998Jjjjjbc:W;ae9Rgo8KjjjjbdndnadTmbavcd4hrcbhwcbhDindnaiaeclfydbar2cdtfgvIdbaiaeydbar2cdtfgqIdbgk:tgxaiaecwfydbar2cdtfgmIdlaqIdlgP:tgsNamIdbak:tgzavIdlaP:tgPN:tgkakNaPamIdwaqIdwgH:tgONasavIdwaH:tgHN:tgPaPNaHazNaOaxN:tgxaxNMM:rgsJbbbb9Bmbaoc:W:qefawcx2fgAakas:vUdwaAaxas:vUdlaAaPas:vUdbaoc8Wfawc8K2fgAaq8Pdb83dbaAav8Pdb83dxaAam8Pdb83dKaAcwfaqcwfydbBdbaAcCfavcwfydbBdbaAcafamcwfydbBdbawcefhwkaecxfheaDcifgDad6mbkab9cb83dbabcyf9cb83dbabcaf9cb83dbabcKf9cb83dbabczf9cb83dbabcwf9cb83dbawTmeaocbBd8Sao9cb83iKao9cb83izaoczfaoc8Wfawci2cxaoc8Sfcbcrz1jjjbaoIdKhCaoIdChXaoIdzhQao9cb83iwao9cb83ibaoaoc:W:qefawcxaoc8Sfcbciz1jjjbJbbjZhkaoIdwgPJbbbbJbbjZaPaPNaoIdbgPaPNaoIdlgsasNMM:rgx:vaxJbbbb9BEgzNhxasazNhsaPazNhzaoc:W:qefheawhvinaecwfIdbaxNaeIdbazNasaeclfIdbNMMgPakaPak9DEhkaecxfheavcufgvmbkabaCUdwabaXUdlabaQUdbabaoId3UdxdndnakJ;n;m;m899FmbJbbbbhPaoc:W:qefheaoc8WfhvinaCavcwfIdb:taecwfIdbgHNaQavIdb:taeIdbgONaXavclfIdb:taeclfIdbgLNMMaxaHNazaONasaLNMM:vgHaPaHaP9EEhPavc8KfhvaecxfheawcufgwmbkabaxUd8KabasUdaabazUd3abaCaxaPN:tUdKabaXasaPN:tUdCabaQazaPN:tUdzabJbbjZakakN:t:rgkUdydndnaxJbbj:;axJbbj:;9GEgPJbbjZaPJbbjZ9FEJbb;:9cNJbbbZJbbb:;axJbbbb9GEMgP:lJbbb9p9DTmbaP:Ohexekcjjjj94hekabae86b8UdndnasJbbj:;asJbbj:;9GEgPJbbjZaPJbbjZ9FEJbb;:9cNJbbbZJbbb:;asJbbbb9GEMgP:lJbbb9p9DTmbaP:Ohvxekcjjjj94hvkabav86bRdndnazJbbj:;azJbbj:;9GEgPJbbjZaPJbbjZ9FEJbb;:9cNJbbbZJbbb:;azJbbbb9GEMgP:lJbbb9p9DTmbaP:Ohqxekcjjjj94hqkabaq86b8SdndnaecKtcK91:YJbb;:9c:vax:t:lavcKtcK91:YJbb;:9c:vas:t:laqcKtcK91:YJbb;:9c:vaz:t:lakMMMJbb;:9cNJbbjZMgk:lJbbb9p9DTmbak:Ohexekcjjjj94hekaecFbaecFb9iEhexekabcjjj;8iBdycFbhekabae86b8Vxekab9cb83dbabcyf9cb83dbabcaf9cb83dbabcKf9cb83dbabczf9cb83dbabcwf9cb83dbkaoc:W;aef8Kjjjjbk;Iwwvul99iud99eue99eul998Jjjjjbcje9Rgr8Kjjjjbavcd4hwaicd4hDdndnaoTmbarc;abfcbaocdtgvz:njjjb8Aarc;Gbfcbavz:njjjb8AarhvarcafhiaohqinavcFFF97BdbaicFFF;7rBdbaiclfhiavclfhvaqcufgqmbkdnadTmbcbhkinaeakaD2cdtfgvIdwhxavIdlhmavIdbhPalakaw2cdtfIdbhsarc;abfhzarhiarc;GbfhHarcafhqcj1jjbhvaohOinasavcwfIdbaxNavIdbaPNavclfIdbamNMMgAMhCakhXdnaAas:tgAaqIdbgQ9DgLmbaHydbhXkaHaXBdbakhXdnaCaiIdbgK9EmbazydbhXaKhCkazaXBdbaiaCUdbaqaAaQaLEUdbavcxfhvaqclfhqaHclfhHaiclfhiazclfhzaOcufgOmbkakcefgkad9hmbkkadThkJbbbbhCcbhXarc;abfhvarc;Gbfhicbhqinalavydbgzaw2cdtfIdbalaiydbgHaw2cdtfIdbaeazaD2cdtfgzIdwaeaHaD2cdtfgHIdw:tgsasNazIdbaHIdb:tgsasNazIdlaHIdl:tgsasNMM:rMMgsaCasaC9EgzEhCaqaXazEhXaiclfhiavclfhvaoaqcefgq9hmbkaCJbbbZNhKxekadThkcbhXJbbbbhKkJbbbbhCdnaearc;abfaXcdtgifydbgqaD2cdtfgvIdwaearc;GbfaifydbgzaD2cdtfgiIdwgm:tgsasNavIdbaiIdbgY:tgAaANavIdlaiIdlgP:tgQaQNMM:rgxJbbbb9ETmbaxalaqaw2cdtfIdbMalazaw2cdtfIdb:taxaxM:vhCkasaCNamMhmaQaCNaPMhPaAaCNaYMhYdnakmbaDcdthvawcdthiindnalIdbg8AaecwfIdbam:tgCaCNaeIdbaY:tgsasNaeclfIdbaP:tgAaANMM:rgQMgEaK9ETmbJbbbbhxdnaQJbbbb9ETmbaEaK:taQaQM:vhxkaxaCNamMhmaxaANaPMhPaxasNaYMhYa8AaKaQMMJbbbZNhKkaeavfhealaifhladcufgdmbkkabaKUdxabamUdwabaPUdlabaYUdbarcjef8Kjjjjbkjeeiu8Jjjjjbcj8W9Rgr8Kjjjjbaici2hwdnaiTmbawceawce0EhDarhiinaiaeadRbbcdtfydbBdbadcefhdaiclfhiaDcufgDmbkkabarawaladaoz:hjjjbarcj8Wf8Kjjjjbk:3lequ8JjjjjbcjP9Rgl8Kjjjjbcbhvalcjxfcbaiz:njjjb8AdndnadTmbcjehoaehrincuhwarhDcuhqavhkdninawakaoalcjxfaDcefRbbfRbb9RcFeGci6aoalcjxfaDRbbfRbb9RcFeGci6faoalcjxfaDcdfRbbfRbb9RcFeGci6fgxaq9mgmEhwdnammbaxce0mdkaxaqaxaq9kEhqaDcifhDadakcefgk9hmbkkaeawci2fgDcdfRbbhqaDcefRbbhxaDRbbhkaeavci2fgDcifaDawav9Rci2z:qjjjb8Aakalcjxffaocefgo86bbaxalcjxffao86bbaDcdfaq86bbaDcefax86bbaDak86bbaqalcjxffao86bbarcifhravcefgvad9hmbkalcFeaicetz:njjjbhoadci2gDceaDce0EhqcbhxindnaoaeRbbgkcetfgw8UebgDcu9kmbawax87ebaocjlfaxcdtfabakcdtfydbBdbaxhDaxcefhxkaeaD86bbaecefheaqcufgqmbkaxcdthDxekcbhDkabalcjlfaDz:mjjjb8AalcjPf8Kjjjjbk9teiucbcbyd;C1jjbgeabcifc98GfgbBd;C1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;teeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiaeydlBdlaiaeydwBdwaiaeydxBdxaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk:3eedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdxaialBdwaialBdlaialBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabk9teiucbcbyd;C1jjbgeabcrfc94GfgbBd;C1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik9:eiuZbhedndncbyd;C1jjbgdaecztgi9nmbcuheadai9RcFFifcz4nbcuSmekadhekcbabae9Rcifc98Gcbyd;C1jjbfgdBd;C1jjbdnadZbcztge9nmbadae9RcFFifcz4nb8Akk:;Deludndndnadch9pmbabaeSmdaeabadfgi9Rcbadcet9R0mekabaead;8qbbxekaeab7ciGhldndndnabae9pmbdnalTmbadhvabhixikdnabciGmbadhvabhixdkadTmiabaeRbb86bbadcufhvdnabcefgiciGmbaecefhexdkavTmiabaeRbe86beadc9:fhvdnabcdfgiciGmbaecdfhexdkavTmiabaeRbd86bdadc99fhvdnabcifgiciGmbaecifhexdkavTmiabaeRbi86biabclfhiaeclfheadc98fhvxekdnalmbdnaiciGTmbadTmlabadcufgifglaeaifRbb86bbdnalciGmbaihdxekaiTmlabadc9:fgifglaeaifRbb86bbdnalciGmbaihdxekaiTmlabadc99fgifglaeaifRbb86bbdnalciGmbaihdxekaiTmlabadc98fgdfaeadfRbb86bbkadcl6mbdnadc98fgocd4cefciGgiTmbaec98fhlabc98fhvinavadfaladfydbBdbadc98fhdaicufgimbkkaocx6mbaec9Wfhvabc9WfhoinaoadfgicxfavadfglcxfydbBdbaicwfalcwfydbBdbaiclfalclfydbBdbaialydbBdbadc9Wfgdci0mbkkadTmdadhidnadciGglTmbaecufhvabcufhoadhiinaoaifavaifRbb86bbaicufhialcufglmbkkadcl6mdaec98fhlabc98fhvinavaifgecifalaifgdcifRbb86bbaecdfadcdfRbb86bbaecefadcefRbb86bbaeadRbb86bbaic98fgimbxikkavcl6mbdnavc98fglcd4cefcrGgdTmbavadcdt9RhvinaiaeydbBdbaeclfheaiclfhiadcufgdmbkkalc36mbinaiaeydbBdbaiaeydlBdlaiaeydwBdwaiaeydxBdxaiaeydzBdzaiaeydCBdCaiaeydKBdKaiaeyd3Bd3aecafheaicafhiavc9Gfgvci0mbkkavTmbdndnavcrGgdmbavhlxekavc94GhlinaiaeRbb86bbaicefhiaecefheadcufgdmbkkavcw6mbinaiaeRbb86bbaiaeRbe86beaiaeRbd86bdaiaeRbi86biaiaeRbl86blaiaeRbv86bvaiaeRbo86boaiaeRbr86braicwfhiaecwfhealc94fglmbkkabkk9Tdbcjwk9ubbjZbbbbbbbbbbbbbbjZbbbbbbbbbbbbbbjZ86;nAZ86;nAZ86;nAZ86;nA:;86;nAZ86;nAZ86;nAZ86;nA:;86;nAZ86;nAZ86;nAZ86;nA:;bc;uwkxebbbdbbb9GNbb",e=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var a,s=WebAssembly.instantiate(r(t),{}).then(function(b){a=b.instance,a.exports.__wasm_call_ctors()});function r(b){for(var l=new Uint8Array(b.length),m=0;m<b.length;++m){var u=b.charCodeAt(m);l[m]=u>96?u-97:u>64?u-39:u+4}for(var g=0,m=0;m<b.length;++m)l[g++]=l[m]<60?e[l[m]]:(l[m]-60)*64+l[++m];return l.buffer.slice(0,g)}function n(b){if(!b)throw new Error("Assertion failed")}function i(b){return new Uint8Array(b.buffer,b.byteOffset,b.byteLength)}var o=48,c=16;function d(b,l){var m=b.meshlets[l*4+0],u=b.meshlets[l*4+1],g=b.meshlets[l*4+2],y=b.meshlets[l*4+3];return{vertices:b.vertices.subarray(m,m+g),triangles:b.triangles.subarray(u,u+y*3)}}function f(b,l,m,u,g,y,w){var T=a.exports.sbrk,I=a.exports.meshopt_buildMeshletsBound(b.length,g,y),M=T(I*c),R=T(I*g*4),S=T(I*y*3),N=T(b.byteLength),B=T(l.byteLength),P=new Uint8Array(a.exports.memory.buffer);P.set(i(b),N),P.set(i(l),B);var j=a.exports.meshopt_buildMeshlets(M,R,S,N,b.length,B,m,u,g,y,w);P=new Uint8Array(a.exports.memory.buffer);for(var K=P.subarray(M,M+j*c),X=new Uint32Array(K.buffer,K.byteOffset,K.byteLength/4).slice(),te=0;te<j;++te){var ne=X[te*4+0],je=X[te*4+1],m=X[te*4+2],le=X[te*4+3];a.exports.meshopt_optimizeMeshlet(R+ne*4,S+je,le,m)}var Fe=X[(j-1)*4+0],De=X[(j-1)*4+1],me=X[(j-1)*4+2],Ve=X[(j-1)*4+3],Ue=Fe+me,tt=De+(Ve*3+3&-4),Bt={meshlets:X,vertices:new Uint32Array(P.buffer,R,Ue).slice(),triangles:new Uint8Array(P.buffer,S,tt*3).slice(),meshletCount:j};return T(M-T(0)),Bt}function p(b){var l=new Float32Array(a.exports.memory.buffer,b,o/4);return{centerX:l[0],centerY:l[1],centerZ:l[2],radius:l[3],coneApexX:l[4],coneApexY:l[5],coneApexZ:l[6],coneAxisX:l[7],coneAxisY:l[8],coneAxisZ:l[9],coneCutoff:l[10]}}function v(b,l,m,u){var g=a.exports.sbrk,y=[],w=g(l.byteLength),T=g(b.vertices.byteLength),I=g(b.triangles.byteLength),M=g(o),R=new Uint8Array(a.exports.memory.buffer);R.set(i(l),w),R.set(i(b.vertices),T),R.set(i(b.triangles),I);for(var S=0;S<b.meshletCount;++S){var N=b.meshlets[S*4+0],B=b.meshlets[S*4+0+1],P=b.meshlets[S*4+0+3];a.exports.meshopt_computeMeshletBounds(M,T+N*4,I+B,P,w,m,u),y.push(p(M))}return g(w-g(0)),y}function x(b,l,m,u){var g=a.exports.sbrk,y=g(o),w=g(b.byteLength),T=g(l.byteLength),I=new Uint8Array(a.exports.memory.buffer);I.set(i(b),w),I.set(i(l),T),a.exports.meshopt_computeClusterBounds(y,w,b.length,T,m,u);var M=p(y);return g(y-g(0)),M}return{ready:s,supported:!0,buildMeshlets:function(b,l,m,u,g,y){n(b.length%3==0),n(l instanceof Float32Array),n(l.length%m==0),n(m>=3),n(u<=256||u>0),n(g<=512),n(g%4==0),y=y||0;var w=b.BYTES_PER_ELEMENT==4?b:new Uint32Array(b);return f(w,l,l.length/m,m*4,u,g,y)},computeClusterBounds:function(b,l,m){n(b.length%3==0),n(b.length/3<=512),n(l instanceof Float32Array),n(l.length%m==0),n(m>=3);var u=b.BYTES_PER_ELEMENT==4?b:new Uint32Array(b);return x(u,l,l.length/m,m*4)},computeMeshletBounds:function(b,l,m){return n(b.meshletCount!=0),n(l instanceof Float32Array),n(l.length%m==0),n(m>=3),v(b,l,l.length/m,m*4)},extractMeshlet:function(b,l){return n(l>=0&&l<b.meshletCount),d(b,l)}}})();var Tu=new bn().registerExtensions([Zs,er,tr]).registerDependencies({"meshopt.decoder":ar});async function $e(t,e={}){await ar.ready;let a;if(e.fetchBytes)a=new Uint8Array(await e.fetchBytes(t));else{let c=await fetch(t,{cache:e.fetchCache||"no-store"});if(!c.ok)throw new Error(`Failed to load ${t}: ${c.status}`);a=new Uint8Array(await c.arrayBuffer())}let s=await Tu.readBinary(a),r=[],n=e.componentFeatures||new Map,i=new Map;function o(c,d=""){let f=n.has(c.getName());f&&i.set(c.getName(),(i.get(c.getName())||0)+1);let p=f?c.getName():d,v=c.getMesh();if(v){let x=c.getWorldMatrix();for(let b of v.listPrimitives()){let l=b.getAttribute("POSITION"),m=b.getAttribute("NORMAL"),u=b.getAttribute("_FEATURE_ID_0"),g=b.getAttribute("_FEATURE_ID_1"),y=b.getIndices()?.getArray();if(!l||!y)continue;let w=l.getCount(),T=new Float32Array(w*3),I=new Float32Array(w*3),M=new Uint32Array(w),R=new Uint32Array(w),S=[1/0,1/0,1/0,-1/0,-1/0,-1/0],N=[],B=n.get(p)?.featureId||e.defaultFeatureId||0;for(let j=0;j<w;j+=1)l.getElement(j,N),Eu(T,j*3,N,x),S[0]=Math.min(S[0],T[j*3]),S[1]=Math.min(S[1],T[j*3+1]),S[2]=Math.min(S[2],T[j*3+2]),S[3]=Math.max(S[3],T[j*3]),S[4]=Math.max(S[4],T[j*3+1]),S[5]=Math.max(S[5],T[j*3+2]),m?(m.getElement(j,N),ku(I,j*3,N,x)):I.set([0,0,1],j*3),M[j]=Number(u?.getScalar(j)||0),R[j]=Number(g?g.getScalar(j)||0:B);let P=b.getMaterial();r.push({position:T,normal:I,netId:M,objectFeatureId:R,indices:y,designator:p,nodeName:c.getName(),meshName:v.getName(),bounds:S,material:P?{name:P.getName(),baseColor:P.getBaseColorFactor(),metallic:P.getMetallicFactor(),roughness:P.getRoughnessFactor(),emissive:P.getEmissiveFactor()}:{baseColor:e.baseColor||[.55,.58,.64,1],metallic:.05,roughness:.72,emissive:[0,0,0]}})}}for(let x of c.listChildren())o(x,p)}for(let c of s.getRoot().listScenes())for(let d of c.listChildren())o(d);return{byteLength:a.byteLength,primitives:r,componentNodeCounts:i}}function Eu(t,e,a,s){let r=s[0]*a[0]+s[4]*a[1]+s[8]*a[2]+s[12],n=s[1]*a[0]+s[5]*a[1]+s[9]*a[2]+s[13],i=s[2]*a[0]+s[6]*a[1]+s[10]*a[2]+s[14];t[e]=r,t[e+1]=-i,t[e+2]=n}function ku(t,e,a,s){let r=s[0]*a[0]+s[4]*a[1]+s[8]*a[2],n=s[1]*a[0]+s[5]*a[1]+s[9]*a[2],i=s[2]*a[0]+s[6]*a[1]+s[10]*a[2],o=Math.hypot(r,n,i)||1;t[e]=r/o,t[e+1]=-i/o,t[e+2]=n/o}var ia=`
struct Occurrence {
  model: mat4x4f,
  normal: mat4x4f,
};
@group(0) @binding(5) var<storage, read> occurrences: array<Occurrence>;
// The cull pass (SB2-25) lists the occurrences to draw, interleaved by level of
// detail: slot * 3 + list. Components draw for LIST_FULL; board, copper and
// barrels for LIST_BOARD (full or board); the stand-in box for LIST_BOX.
@group(0) @binding(7) var<storage, read> visibleOccurrences: array<u32>;
const LIST_FULL = 0u;
const LIST_BOARD = 1u;
const LIST_BOX = 2u;
fn listedOccurrence(list: u32, instance: u32) -> u32 { return visibleOccurrences[instance * 3u + list]; }
`,zt=Object.freeze([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);function Iu(t){let e=t?.matrix??t;if(!e||typeof e.length!="number"||e.length!==16)throw new TypeError("An occurrence matrix must have 16 numbers (column-major)");let a=Array.from(e,Number);if(!a.every(Number.isFinite))throw new TypeError("An occurrence matrix must be finite");if(a[3]!==0||a[7]!==0||a[11]!==0||a[15]!==1)throw new TypeError("An occurrence matrix must be affine (last row 0 0 0 1)");return a}function Mu(t){let[e,a,s,,r,n,i,,o,c,d]=t,f=n*d-c*i,p=c*s-a*d,v=a*i-n*s,x=o*i-r*d,b=e*d-o*s,l=r*s-e*i,m=r*c-o*n,u=o*a-e*c,g=e*n-r*a,y=e*f+r*p+o*v;if(y===0)throw new TypeError("An occurrence matrix must be invertible");let w=y<0?-1:1;return[w*f,w*x,w*m,0,w*p,w*b,w*u,0,w*v,w*l,w*g,0,0,0,0,1]}function rr(t){let e=new Float32Array(Math.max(1,t.length)*32);return t.forEach((a,s)=>{let r=s*32;e.set(a,r),e.set(Mu(a),r+16)}),e}function Kn(t){let e=new ArrayBuffer(Math.max(1,t.length)*48),a=new DataView(e);return t.forEach((s,r)=>{let n=r*48;a.setFloat32(n,s.centerMm[0]/1e3,!0),a.setFloat32(n+4,-s.centerMm[1]/1e3,!0),a.setFloat32(n+8,Math.min(s.drillWidthMm,s.drillHeightMm)/2e3,!0),a.setFloat32(n+12,Math.max(s.outerWidthMm,s.outerHeightMm)/2e3,!0),a.setFloat32(n+16,s.startZMm/1e3,!0),a.setFloat32(n+20,s.endZMm/1e3,!0),a.setUint32(n+32,s.netId||0,!0),a.setUint32(n+36,s.objectFeatureId||0,!0),a.setUint32(n+40,s.startLayerId||0,!0),a.setUint32(n+44,s.endLayerId||0,!0)}),e}function oa(t,e){let[a,s,r]=e;return[t[0]*a+t[4]*s+t[8]*r+t[12],t[1]*a+t[5]*s+t[9]*r+t[13],t[2]*a+t[6]*s+t[10]*r+t[14]]}function Vt(t,e){if(!e)return null;let a=[1/0,1/0,1/0,-1/0,-1/0,-1/0];for(let s=0;s<8;s+=1){let r=oa(t,[e[s&1?3:0],e[s&2?4:1],e[s&4?5:2]]);for(let n=0;n<3;n+=1)a[n]=Math.min(a[n],r[n]),a[n+3]=Math.max(a[n+3],r[n])}return a}function Gn(t,e){if(!e||!t.length)return e||null;if(t.length===1&&ca(t[0]))return e;let a=t.map(s=>Vt(s,e));return[0,1,2,3,4,5].map(s=>s<3?Math.min(...a.map(r=>r[s])):Math.max(...a.map(r=>r[s])))}function ca(t){return t.every((e,a)=>e===zt[a])}var Ru=0,sr=4294901760,Su=sr-1;function zn(t,e){let a=t>>>0,s=e>>>0;return a===Ru?{kind:"none",occurrenceIndex:-1,featureId:0}:a>=sr?{kind:"gizmo",occurrenceIndex:-1,featureId:0,gizmoPart:a-sr,gizmoValue:s}:{kind:s?"feature":"board",occurrenceIndex:a-1,featureId:s}}function Vn(t){let e=Array.from(t);if(e.length>Su)throw new RangeError("Too many occurrences for the pick target");let a=e.map(Iu),s=e.map((r,n)=>r&&!Array.isArray(r)&&!ArrayBuffer.isView(r)&&r.key!=null?String(r.key):String(n));if(new Set(s).size!==s.length)throw new TypeError("Occurrence keys must be unique");return{matrices:a,keys:s}}function Ht(t,e,a){let[s,r,n]=e,i=t[0]*s+t[4]*r+t[8]*n+t[12],o=t[1]*s+t[5]*r+t[9]*n+t[13],c=t[2]*s+t[6]*r+t[10]*n+t[14],d=t[3]*s+t[7]*r+t[11]*n+t[15];return!(d>0)||c<0||c>d?null:{x:a.x+(i/d*.5+.5)*a.width,y:a.y+(.5-o/d*.5)*a.height}}var Hn=0;var qn=2;var Qa=Object.freeze({fullPx:140,boxPx:18,keep:.8});function Xn(t){let e=c=>[t[c],t[4+c],t[8+c],t[12+c]],[a,s,r,n]=[e(0),e(1),e(2),e(3)],i=(c,d)=>c.map((f,p)=>f+d[p]),o=(c,d)=>c.map((f,p)=>f-d[p]);return[i(n,a),o(n,a),i(n,s),o(n,s),r,o(n,r)]}var nr=`
fn featureHidden(id: u32) -> bool {
  return id < arrayLength(&hiddenMask) && hiddenMask[id] == 0u;
}
`;function Za(t){let e=new Set;if(t==null)return e;for(let a of t){let s=Number(a);!Number.isInteger(s)||s<=0||s>4294967295||e.add(s)}return e}function Wn(t,e=0){let a=0;for(let n of Za(t))a=Math.max(a,n);let s=64,r=a+1;for(;s<r;)s*=2;return Math.max(s,Math.floor(e)||0)}function Jn(t,e){let a=Math.max(64,Math.floor(e)||0),s=new Uint32Array(a);s.fill(1);for(let r of Za(t))r<a&&(s[r]=0);return s}var Yn=40,qt=256,$n=112,Et="rg32uint",ei=`
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
${nr}
${Ps}

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
`,ti=`
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
${nr}
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
`,ai=`
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
${Ps}
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
`,si=`
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
`;function ir(t,e){return e.reduce((a,[s,r])=>{if(a.split(s).length!==2)throw new Error(`Shader variant anchor not found once: ${s.slice(0,60)}`);return a.replace(s,()=>r)},t)}var or=[`  padding0: u32,
  padding1: u32,`,`  selectedOccurrence: u32,
  occurrenceBase: u32,`],ri=ir(ei,[or,[`  @location(3) world: vec3f,
};`,`  @location(3) world: vec3f,
  @location(4) @interpolate(flat) occurrence: u32,
};`],[`@vertex fn vs(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;
  output.world = input.position + draw.offset.xyz;
  output.position = globals.viewProjection * vec4f(output.world, 1.0);
  output.normal = normalize(input.normal);`,`${ia}
@vertex fn vs(input: VertexInput, @builtin(instance_index) instance: u32) -> VertexOutput {
  // Full-detail draws (components; inner copper behind an opaque board) list only
  // occurrences at full detail (draw.material.z = 1); the rest list full or board.
  let index = listedOccurrence(select(LIST_BOARD, LIST_FULL, draw.material.z > 0.5), instance);
  let occurrence = occurrences[index];
  var output: VertexOutput;
  output.world = (occurrence.model * vec4f(input.position + draw.offset.xyz, 1.0)).xyz;
  output.position = globals.viewProjection * vec4f(output.world, 1.0);
  output.normal = normalize((occurrence.normal * vec4f(input.normal, 0.0)).xyz);
  output.occurrence = index + 1u + globals.occurrenceBase;`],[`  let selected = netEmphasized(input.netId) || (globals.activeNet != 0u && input.netId == globals.activeNet);
  let selectedComponent = component && globals.selectedFeature != 0u && input.objectId == globals.selectedFeature;`,`  // The inspected selection lights its own copy; host-highlighted nets light every copy.
  let here = input.occurrence == globals.selectedOccurrence;
  let selected = netEmphasized(input.netId) || (here && globals.activeNet != 0u && input.netId == globals.activeNet);
  let selectedComponent = here && component && globals.selectedFeature != 0u && input.objectId == globals.selectedFeature;`]]),ni=ir(ti,[or,[`  @location(0) @interpolate(flat) objectId: u32,
};`,`  @location(0) @interpolate(flat) objectId: u32,
  @location(1) @interpolate(flat) occurrence: u32,
};`],[`@vertex fn vs(input: Input) -> Output {
  var output: Output;
  output.position = globals.viewProjection * vec4f(input.position + draw.offset.xyz, 1.0);`,`${ia}
@vertex fn vs(input: Input, @builtin(instance_index) instance: u32) -> Output {
  let index = listedOccurrence(select(LIST_BOARD, LIST_FULL, draw.material.z > 0.5), instance);
  let world = (occurrences[index].model * vec4f(input.position + draw.offset.xyz, 1.0)).xyz;
  var output: Output;
  output.position = globals.viewProjection * vec4f(world, 1.0);
  output.occurrence = index + 1u + globals.occurrenceBase;`],["  return vec2u(1u, input.objectId);",`  let kind = u32(draw.flags.x);
  return vec2u(input.occurrence, select(input.objectId, 0u, kind == 0u));`]]),Fu=`struct Input {
  @location(0) unit: vec3f,
  @location(1) normal: vec3f,
  @location(2) radiusMix: f32,
  @location(3) dimensions: vec4f,
  @location(4) span: vec2f,
  @location(5) ids: vec4u,
};`,Bu=`struct Barrel {
  dimensions: vec4f,
  span: vec2f,
  ids: vec4u,
};
@group(0) @binding(6) var<storage, read> barrels: array<Barrel>;
${ia}
struct Input {
  @location(0) unit: vec3f,
  @location(1) normal: vec3f,
  @location(2) radiusMix: f32,
};`;function ii(t,e,a=[]){return ir(t,[or,[Fu,Bu],["@vertex fn vs(input: Input) -> Output {",`struct Record {
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
  let index = listedOccurrence(LIST_BOARD, instance / count);
  let occurrence = occurrences[index];
  let input = Record(vertex.unit, vertex.normal, vertex.radiusMix, barrel.dimensions, barrel.span, barrel.ids);`],[e,e.replace("vec4f(world, 1.0)","vec4f((occurrence.model * vec4f(world, 1.0)).xyz, 1.0)")],["  output.objectId = input.ids.y;",`  output.objectId = input.ids.y;
  output.occurrence = index + 1u + globals.occurrenceBase;`],...a])}var oi=ii(ai,`  output.position = globals.viewProjection * vec4f(world, 1.0);
  output.normal = input.normal;`,[[`  output.normal = input.normal;
  output.netId`,`  output.normal = (occurrence.normal * vec4f(input.normal, 0.0)).xyz;
  output.netId`],[`  @location(3) @interpolate(flat) visible: u32,
};`,`  @location(3) @interpolate(flat) visible: u32,
  @location(4) @interpolate(flat) occurrence: u32,
};`],["  let selected = netEmphasized(input.netId) || (globals.activeNet != 0u && input.netId == globals.activeNet);",`  let selected = netEmphasized(input.netId)
    || (input.occurrence == globals.selectedOccurrence && globals.activeNet != 0u && input.netId == globals.activeNet);`]]),ci=ii(si,`  output.position = globals.viewProjection * vec4f(world, 1.0);
  output.objectId`,[[`  @location(1) @interpolate(flat) visible: u32,
};`,`  @location(1) @interpolate(flat) visible: u32,
  @location(2) @interpolate(flat) occurrence: u32,
};`],["  return vec2u(1u, input.objectId);","  return vec2u(input.occurrence, input.objectId);"]]),li=`
struct Globals {
  viewProjection: mat4x4f,
  activeNet: u32,
  selectedLayer: u32,
  time: f32,
  hasHighlight: f32,
  selectedFeature: u32,
  selectedOccurrence: u32,
  occurrenceBase: u32,
  padding2: u32,
  lightDirection: vec4f,
};
struct Draw { color: vec4f, material: vec4f, offset: vec4f, flags: vec4f };
@group(0) @binding(0) var<uniform> globals: Globals;
@group(0) @binding(1) var<uniform> draw: Draw;
${ia}
struct Input {
  @location(0) corner: vec3f,
  @location(1) normal: vec3f,
};
struct Output {
  @builtin(position) position: vec4f,
  @location(0) normal: vec3f,
  @location(1) @interpolate(flat) occurrence: u32,
};
@vertex fn vs(input: Input, @builtin(instance_index) instance: u32) -> Output {
  let index = listedOccurrence(LIST_BOX, instance);
  let occurrence = occurrences[index];
  let local = draw.offset.xyz + input.corner * draw.material.xyz;
  var output: Output;
  output.position = globals.viewProjection * vec4f((occurrence.model * vec4f(local, 1.0)).xyz, 1.0);
  output.normal = (occurrence.normal * vec4f(input.normal, 0.0)).xyz;
  output.occurrence = index + 1u + globals.occurrenceBase;
  return output;
}
`,di=`${li}
@fragment fn fs(input: Output) -> @location(0) vec4f {
  let light = normalize(globals.lightDirection.xyz);
  return vec4f(draw.color.rgb * (0.45 + max(dot(normalize(input.normal), light), 0.0) * 0.55), 1.0);
}
`,ui=`${li}
@fragment fn fs(input: Output) -> @location(0) vec2u {
  return vec2u(input.occurrence, 0u);
}
`,fi=`
struct Occurrence {
  model: mat4x4f,
  normal: mat4x4f,
};
struct Cull {
  planes: array<vec4f, 6>,
  eye: vec4f,
  boundsMin: vec4f,
  boundsMax: vec4f,
  lod: vec4f,
  info: vec4u,
  extra: vec4u,
};
@group(0) @binding(0) var<uniform> cull: Cull;
@group(0) @binding(1) var<storage, read> occurrences: array<Occurrence>;
@group(0) @binding(2) var<storage, read_write> lods: array<u32>;
@group(0) @binding(3) var<storage, read_write> lists: array<u32>;
@group(0) @binding(4) var<storage, read_write> counters: array<atomic<u32>, 4>;
@group(0) @binding(5) var<storage, read_write> args: array<u32>;
@group(0) @binding(6) var<storage, read> classes: array<u32>;

fn chooseLod(previous: u32, pixels: f32) -> u32 {
  let fullPx = cull.lod.y;
  let boxPx = cull.lod.z;
  let keep = cull.lod.w;
  var lod = 2u;
  if (pixels >= fullPx) { lod = 0u; } else if (pixels >= boxPx) { lod = 1u; }
  if (previous == 0u && lod > 0u && pixels >= fullPx * keep) { lod = 0u; }
  if (previous <= 1u && lod == 2u && pixels >= boxPx * keep) { lod = 1u; }
  return lod;
}

@compute @workgroup_size(64) fn classify(@builtin(global_invocation_id) id: vec3u) {
  let i = id.x;
  if (i >= cull.info.x) { return; }
  let model = occurrences[i].model;
  var lo = vec3f(3.0e38);
  var hi = vec3f(-3.0e38);
  for (var corner = 0u; corner < 8u; corner += 1u) {
    let local = vec3f(
      select(cull.boundsMin.x, cull.boundsMax.x, (corner & 1u) != 0u),
      select(cull.boundsMin.y, cull.boundsMax.y, (corner & 2u) != 0u),
      select(cull.boundsMin.z, cull.boundsMax.z, (corner & 4u) != 0u));
    let point = (model * vec4f(local, 1.0)).xyz;
    lo = min(lo, point);
    hi = max(hi, point);
  }
  var inside = true;
  for (var k = 0u; k < 6u; k += 1u) {
    let plane = cull.planes[k];
    let far = select(lo, hi, plane.xyz >= vec3f(0.0));
    if (dot(plane.xyz, far) + plane.w < 0.0) { inside = false; }
  }
  var lod = 3u;
  if (inside) {
    let center = (lo + hi) * 0.5;
    let radius = length(hi - lo) * 0.5;
    // Perspective: pixels per unit at unit distance over the distance; orthographic: per unit.
    let distance = select(1.0, max(length(center - cull.eye.xyz), 1.0e-6), cull.eye.w > 0.5);
    lod = chooseLod(lods[i], radius * cull.lod.x / distance);
    if (cull.info.z != 0u) { lod = cull.info.z - 1u; }
    if (i + 1u == cull.info.y) { lod = 0u; }
  }
  lods[i] = lod;
  if (lod == 0u) { lists[atomicAdd(&counters[0], 1u) * 3u] = i; }
  if (lod <= 1u) { lists[atomicAdd(&counters[1], 1u) * 3u + 1u] = i; }
  if (lod == 2u) { lists[atomicAdd(&counters[2], 1u) * 3u + 2u] = i; }
}

@compute @workgroup_size(64) fn writeArgs(@builtin(global_invocation_id) id: vec3u) {
  let slot = id.x;
  if (slot >= cull.info.w) { return; }
  let full = atomicLoad(&counters[0]);
  let board = atomicLoad(&counters[1]);
  let box = atomicLoad(&counters[2]);
  let kind = classes[slot];
  var count = 0u;
  if (kind == 0u) { count = board; }
  else if (kind == 1u) { count = full; }
  else if (kind == 2u) { count = board * cull.extra.x; }
  else if (kind == 3u) { count = box; }
  args[slot * 5u + 1u] = count;
}
`,Qn=[{arrayStride:24,attributes:[{shaderLocation:0,offset:0,format:"float32x3"},{shaderLocation:1,offset:12,format:"float32x3"}]}],am=Object.freeze({main:ri,pick:ni,barrel:oi,barrelPick:ci,box:di,boxPick:ui,cull:fi}),_t=class t{static async create(e){if(!navigator.gpu)throw new Error("WebGPU is unavailable in this browser");let a=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!a)throw new Error("No WebGPU adapter is available");let s=await a.requestDevice();return new t(e,s)}constructor(e,a,{shareFrom:s=null}={}){if(this.canvas=e,this.device=a,this.shareFrom=s,this.alwaysInstanced=!!s,this.occurrenceBase=0,s?(this.context=s.context,this.format=s.format):(a.addEventListener("uncapturederror",r=>{console.error(`Uncaptured WebGPU error: ${r.error?.message||r.error}`)}),a.lost.then(r=>{r.reason!=="destroyed"&&console.error(`WebGPU device lost: ${r.reason}`,r.message)}),this.context=e.getContext("webgpu"),this.format=navigator.gpu.getPreferredCanvasFormat(),this.context.configure({device:a,format:this.format,alphaMode:"opaque"})),this.entries=[],this.barrels=null,this.globalBuffer=a.createBuffer({size:$n,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.layerOffsetBuffer=a.createBuffer({size:1024,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.occurrenceMatrices=[[...zt]],this.occurrenceKeys=["0"],this.identityOnly=!0,this.occurrenceCapacity=1,this.occurrenceBuffer=this.createOccurrenceBuffer(this.occurrenceCapacity),this.device.queue.writeBuffer(this.occurrenceBuffer,0,rr(this.occurrenceMatrices)),this.barrelRecordBuffer=a.createBuffer({label:"barrel-records",size:48,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.instancedPipelines=null,this.listBuffer=this.createListBuffer(this.occurrenceCapacity),this.slotCapacity=0,this.slotArgs=new Uint32Array(0),this.slotClasses=new Uint32Array(0),this.freeSlots=[],this.nextSlot=2,this.argsBuffer=null,this.classesBuffer=null,this.growSlots(256),this.setSlot(0,0,4),this.setSlot(1,0,4),this.cull=null,this.box=null,this.boardBounds=null,this.selectedOccurrence=-1,this.lodOverride=null,this.lodThresholds={...Qa},this.innerCopperAtFull=!0,this.cullCounts={full:0,board:0,box:0,culled:0},this.frameStats={triangles:0,draws:0},this.boxColor=[.24,.36,.28,1],s)for(let r of["bindGroupLayout","pipelineLayout","vertexBuffers","pipeline","pickPipeline","barrelPipeline","barrelPickPipeline","singlePipelines"])this[r]=s[r];else this.createSinglePipelines();this.depth=null,this.pickTexture=null,this.pickSerial=Promise.resolve(),this.bundleCache=new Map,this.globalScratch=new ArrayBuffer($n),this.globalScratchF32=new Float32Array(this.globalScratch),this.globalScratchView=new DataView(this.globalScratch),this.drawScratch=new Float32Array(qt/4),this.barrelDrawScratch=new Float32Array(qt/4),this.nextEntryId=1,this.hiddenFeatureIds=new Set,this.featureMaskCapacity=64,this.featureMaskBuffer=this.createFeatureMaskBuffer(this.featureMaskCapacity),this.uploadFeatureMask(),this.emphasizedNetIds=new Set,this.netMaskCapacity=64,this.netMaskBuffer=this.createNetMaskBuffer(this.netMaskCapacity),this.uploadNetMask(),s&&this.setOccurrences([])}createSinglePipelines(){let e=this.device;this.bindGroupLayout=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:2,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}},{binding:3,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:4,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:5,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}},{binding:6,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}},{binding:7,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}}]});let a=e.createPipelineLayout({bindGroupLayouts:[this.bindGroupLayout]});this.pipelineLayout=a;let s=this.vertexBuffers=[{arrayStride:Yn,attributes:[{shaderLocation:0,offset:0,format:"float32x3"},{shaderLocation:1,offset:12,format:"float32x3"},{shaderLocation:2,offset:24,format:"uint32"},{shaderLocation:3,offset:28,format:"uint32"},{shaderLocation:4,offset:32,format:"uint32"},{shaderLocation:5,offset:36,format:"uint32"}]}];this.pipeline=this.makePipeline(a,ei,this.format,s,"main"),this.pickPipeline=this.makePipeline(a,ti,Et,s,"pick"),this.barrelPipeline=this.makeBarrelPipeline(a,ai,this.format,"barrel"),this.barrelPickPipeline=this.makeBarrelPipeline(a,si,Et,"barrel-pick"),this.singlePipelines={main:this.pipeline,pick:this.pickPipeline,barrel:this.barrelPipeline,barrelPick:this.barrelPickPipeline}}createOccurrenceBuffer(e){return this.device.createBuffer({label:"occurrences",size:e*128,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST})}createListBuffer(e){return this.device.createBuffer({label:"visible-occurrences",size:e*3*Uint32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST})}growSlots(e){let a=new Uint32Array(e*5);a.set(this.slotArgs);let s=new Uint32Array(e).fill(4);s.set(this.slotClasses),this.slotArgs=a,this.slotClasses=s,this.slotCapacity=e,this.argsBuffer?.destroy?.(),this.classesBuffer?.destroy?.(),this.argsBuffer=this.device.createBuffer({label:"indirect-args",size:a.byteLength,usage:GPUBufferUsage.INDIRECT|GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.classesBuffer=this.device.createBuffer({label:"draw-classes",size:s.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.device.queue.writeBuffer(this.argsBuffer,0,a),this.device.queue.writeBuffer(this.classesBuffer,0,s),this.cull&&(this.cull.bindGroup=this.makeCullBindGroup()),this.bundleCache?.clear()}setSlot(e,a,s){this.slotArgs.fill(0,e*5,e*5+5),this.slotArgs[e*5]=a,this.slotClasses[e]=s,this.device.queue.writeBuffer(this.argsBuffer,e*20,this.slotArgs,e*5,5),this.device.queue.writeBuffer(this.classesBuffer,e*4,this.slotClasses,e,1)}allocSlot(e,a){let s=this.freeSlots.length?this.freeSlots.pop():this.nextSlot++;return s>=this.slotCapacity&&this.growSlots(this.slotCapacity*2),this.setSlot(s,e,a),s}get occurrenceCount(){return this.occurrenceMatrices.length}setOccurrences(e){let{matrices:a,keys:s}=Vn(e??[zt]);this.occurrenceMatrices=a,this.occurrenceKeys=s,this.identityOnly=!this.alwaysInstanced&&a.length===1&&ca(a[0]),this.identityOnly||this.ensureInstancedPipelines(),a.length>this.occurrenceCapacity&&(this.occurrenceBuffer?.destroy?.(),this.listBuffer?.destroy?.(),this.occurrenceCapacity=Math.max(a.length,this.occurrenceCapacity*2),this.occurrenceBuffer=this.createOccurrenceBuffer(this.occurrenceCapacity),this.listBuffer=this.createListBuffer(this.occurrenceCapacity),this.cull&&(this.cull.lods.destroy(),this.cull.lods=this.createLodBuffer(this.occurrenceCapacity)),this.rebindAll()),a.length&&this.device.queue.writeBuffer(this.occurrenceBuffer,0,rr(a)),this.cull&&this.device.queue.writeBuffer(this.cull.lods,0,new Uint32Array(this.occurrenceCapacity).fill(3)),this.selectedOccurrence>=a.length&&(this.selectedOccurrence=-1),this.bundleCache.clear()}setInnerCopperAtFull(e){if(this.innerCopperAtFull!==e){this.innerCopperAtFull=e;for(let a of this.entries)a.innerCopper&&(a.drawClass=e?1:0,this.setSlot(a.slot,a.indexCount,a.drawClass))}}setBoardBounds(e){this.boardBounds=e?[...e]:null}setLodOverride(e){this.lodOverride=e==null?null:Number(e)}createLodBuffer(e){return this.device.createBuffer({label:"occurrence-lods",size:e*Uint32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST})}createCull(){let e=this.device,a=this.shareFrom?.cull,s=i=>({visibility:GPUShaderStage.COMPUTE,buffer:{type:i}}),r=a?.layout||e.createBindGroupLayout({label:"cull",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,...s("read-only-storage")},{binding:2,...s("storage")},{binding:3,...s("storage")},{binding:4,...s("storage")},{binding:5,...s("storage")},{binding:6,...s("read-only-storage")}]}),n=a&&{layout:r,classify:a.classify,writeArgs:a.writeArgs};if(!n){let i=this.createShaderModule(fi,"cull"),o=e.createPipelineLayout({bindGroupLayouts:[r]});n={layout:r,classify:e.createComputePipeline({layout:o,compute:{module:i,entryPoint:"classify"}}),writeArgs:e.createComputePipeline({layout:o,compute:{module:i,entryPoint:"writeArgs"}})}}this.cull={...n,uniform:e.createBuffer({label:"cull-params",size:192,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),lods:this.createLodBuffer(this.occurrenceCapacity),counters:e.createBuffer({label:"cull-counters",size:16,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),readback:e.createBuffer({label:"cull-readback",size:16,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),scratch:new ArrayBuffer(192),reading:!1,readAt:0,bindGroup:null},e.queue.writeBuffer(this.cull.lods,0,new Uint32Array(this.occurrenceCapacity).fill(3)),this.cull.bindGroup=this.makeCullBindGroup()}makeCullBindGroup(){return this.device.createBindGroup({layout:this.cull.layout,entries:[{binding:0,resource:{buffer:this.cull.uniform}},{binding:1,resource:{buffer:this.occurrenceBuffer}},{binding:2,resource:{buffer:this.cull.lods}},{binding:3,resource:{buffer:this.listBuffer}},{binding:4,resource:{buffer:this.cull.counters}},{binding:5,resource:{buffer:this.argsBuffer}},{binding:6,resource:{buffer:this.classesBuffer}}]})}createBox(){let e=[[[1,0,0],[[1,0,0],[1,1,0],[1,1,1],[1,0,1]]],[[-1,0,0],[[0,0,0],[0,0,1],[0,1,1],[0,1,0]]],[[0,1,0],[[0,1,0],[0,1,1],[1,1,1],[1,1,0]]],[[0,-1,0],[[0,0,0],[1,0,0],[1,0,1],[0,0,1]]],[[0,0,1],[[0,0,1],[1,0,1],[1,1,1],[0,1,1]]],[[0,0,-1],[[0,0,0],[0,1,0],[1,1,0],[1,0,0]]]],a=[],s=[];e.forEach(([d,f],p)=>{for(let x of f)a.push(...x,...d);let v=p*4;s.push(v,v+1,v+2,v,v+2,v+3)});let r=new Float32Array(a),n=new Uint16Array(s),i=this.device.createBuffer({label:"box-vertices",size:r.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),o=this.device.createBuffer({label:"box-indices",size:n.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST});this.device.queue.writeBuffer(i,0,r),this.device.queue.writeBuffer(o,0,n);let c=this.device.createBuffer({size:qt,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});this.box={vertexBuffer:i,indexBuffer:o,indexCount:n.length,drawBuffer:c,bindGroup:this.makeBindGroup(c),scratch:new Float32Array(qt/4)},this.setSlot(1,n.length,3)}writeBoxDraw(){let e=this.box.scratch,[a,s,r,n,i,o]=this.boardBounds;e.fill(0),e.set(this.boxColor,0),e.set([n-a,i-s,o-r,0],4),e.set([a,s,r,0],8),this.device.queue.writeBuffer(this.box.drawBuffer,0,e)}encodeCull(e,a){let s=this.cull,r=new Float32Array(s.scratch),n=new Uint32Array(s.scratch);r.fill(0),Xn(a.matrix).forEach((b,l)=>r.set(b,l*4));let i=a.lod;i&&r.set([...i.eye,i.orthographic?0:1],24);let o=this.boardBounds||[-1e6,-1e6,-1e6,1e6,1e6,1e6];r.set([o[0],o[1],o[2],0,o[3],o[4],o[5],0],28);let{fullPx:c,boxPx:d,keep:f}=this.lodThresholds;r.set([i?.pixelScale||0,c,d,f],36);let p=this.lodOverride!=null?this.lodOverride+1:!i||!this.boardBounds?Hn+1:0;n.set([this.occurrenceMatrices.length,this.selectedOccurrence+1,p,this.nextSlot],40),n[44]=this.barrels?.instanceCount||0,this.device.queue.writeBuffer(s.uniform,0,s.scratch),e.clearBuffer(s.counters);let v=e.beginComputePass({label:"cull"});v.setBindGroup(0,s.bindGroup),v.setPipeline(s.classify),v.dispatchWorkgroups(Math.ceil(this.occurrenceMatrices.length/64)),v.setPipeline(s.writeArgs),v.dispatchWorkgroups(Math.ceil(this.nextSlot/64)),v.end();let x=performance.now();return!s.reading&&x-s.readAt>250?(e.copyBufferToBuffer(s.counters,0,s.readback,0,16),s.readAt=x,!0):!1}readCullCounts(){let e=this.cull;e.reading=!0;let a=this.occurrenceMatrices.length;e.readback.mapAsync(GPUMapMode.READ).then(()=>{let[s,r,n]=new Uint32Array(e.readback.getMappedRange().slice(0));e.readback.unmap(),this.cullCounts={full:s,board:r-s,box:n,culled:Math.max(0,a-r-n)}}).catch(()=>{}).finally(()=>{e.reading=!1})}countFor(e){if(this.identityOnly)return e===2?this.barrels?.instanceCount||0:e===3?0:1;let{full:a,board:s,box:r}=this.cullCounts;return e===0?a+s:e===1?a:e===2?(a+s)*(this.barrels?.instanceCount||0):r}gpuMemoryBytes(){let e=0;for(let a of this.entries)e+=(a.vertexBuffer?.size||0)+(a.indexBuffer?.size||0);for(let a of[this.barrels?.vertexBuffer,this.barrels?.indexBuffer,this.barrels?.instanceBuffer,this.barrelRecordBuffer,this.occurrenceBuffer,this.listBuffer,this.argsBuffer,this.classesBuffer,this.featureMaskBuffer,this.netMaskBuffer,this.cull?.lods])e+=a?.size||0;return e+=this.canvas.width*this.canvas.height*12,e}ensureInstancedPipelines(){if(this.instancedPipelines)return;if(this.shareFrom){this.shareFrom.ensureInstancedPipelines(),this.instancedPipelines=this.shareFrom.instancedPipelines,this.createBox(),this.createCull();return}let e=this.pipelineLayout;this.instancedPipelines={main:this.makePipeline(e,ri,this.format,this.vertexBuffers,"main-instanced"),pick:this.makePipeline(e,ni,Et,this.vertexBuffers,"pick-instanced"),barrel:this.makeBarrelPipeline(e,oi,this.format,"barrel-instanced",!1),barrelPick:this.makeBarrelPipeline(e,ci,Et,"barrel-pick-instanced",!1),box:this.makePipeline(e,di,this.format,Qn,"box"),boxPick:this.makePipeline(e,ui,Et,Qn,"box-pick")},this.createBox(),this.createCull()}drawSet(){return this.identityOnly?{pipelines:this.singlePipelines,indirect:!1,barrelInstances:this.barrels?.instanceCount||0}:{pipelines:this.instancedPipelines,indirect:!0,barrelInstances:0}}drawEntry(e,a,s){e.setBindGroup(0,a.bindGroup),e.setVertexBuffer(0,a.vertexBuffer),e.setIndexBuffer(a.indexBuffer,"uint32"),s?e.drawIndexedIndirect(this.argsBuffer,a.slot*20):e.drawIndexed(a.indexCount)}drawBarrels(e,a,s,r){e.setPipeline(a),e.setBindGroup(0,this.barrels.bindGroup),e.setVertexBuffer(0,this.barrels.vertexBuffer),e.setVertexBuffer(1,this.barrels.instanceBuffer),e.setIndexBuffer(this.barrels.indexBuffer,"uint16"),s?e.drawIndexedIndirect(this.argsBuffer,0):e.drawIndexed(this.barrels.indexCount,r)}drawBox(e,a){!this.box||!this.boardBounds||(this.writeBoxDraw(),e.setPipeline(a),e.setBindGroup(0,this.box.bindGroup),e.setVertexBuffer(0,this.box.vertexBuffer),e.setIndexBuffer(this.box.indexBuffer,"uint16"),e.drawIndexedIndirect(this.argsBuffer,20))}createNetMaskBuffer(e){return this.device.createBuffer({label:"net-emphasis-mask",size:e*Uint32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST})}uploadNetMask(){let e=Pr(this.emphasizedNetIds,this.netMaskCapacity);this.device.queue.writeBuffer(this.netMaskBuffer,0,e)}setEmphasizedNetIds(e){this.emphasizedNetIds=Oa(e);let a=Or(this.emphasizedNetIds,this.netMaskCapacity);a!==this.netMaskCapacity&&(this.netMaskBuffer?.destroy?.(),this.netMaskCapacity=a,this.netMaskBuffer=this.createNetMaskBuffer(a),this.rebindAll()),this.uploadNetMask()}rebindAll(){for(let e of this.entries)e.bindGroup=this.makeBindGroup(e.drawBuffer);this.barrels&&(this.barrels.bindGroup=this.makeBindGroup(this.barrels.drawBuffer)),this.box&&(this.box.bindGroup=this.makeBindGroup(this.box.drawBuffer)),this.cull&&(this.cull.bindGroup=this.makeCullBindGroup()),this.bundleCache.clear()}createFeatureMaskBuffer(e){return this.device.createBuffer({label:"feature-visibility-mask",size:e*Uint32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST})}makeBindGroup(e){return this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:{buffer:this.globalBuffer}},{binding:1,resource:{buffer:e}},{binding:2,resource:{buffer:this.layerOffsetBuffer}},{binding:3,resource:{buffer:this.featureMaskBuffer}},{binding:4,resource:{buffer:this.netMaskBuffer}},{binding:5,resource:{buffer:this.occurrenceBuffer}},{binding:6,resource:{buffer:this.barrelRecordBuffer}},{binding:7,resource:{buffer:this.listBuffer}}]})}uploadFeatureMask(){let e=Jn(this.hiddenFeatureIds,this.featureMaskCapacity);this.device.queue.writeBuffer(this.featureMaskBuffer,0,e)}setHiddenFeatureIds(e){this.hiddenFeatureIds=Za(e);let a=Wn(this.hiddenFeatureIds,this.featureMaskCapacity);a!==this.featureMaskCapacity&&(this.featureMaskBuffer?.destroy?.(),this.featureMaskCapacity=a,this.featureMaskBuffer=this.createFeatureMaskBuffer(a),this.rebindAll()),this.uploadFeatureMask(),this.bundleCache.clear()}makePipeline(e,a,s,r,n){let i=this.createShaderModule(a,n);return this.device.createRenderPipeline({layout:e,vertex:{module:i,entryPoint:"vs",buffers:r},fragment:{module:i,entryPoint:"fs",targets:[{format:s,blend:s===Et?void 0:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-list",cullMode:"none"},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"},multisample:{count:1}})}makeBarrelPipeline(e,a,s,r,n=!0){let i=this.createShaderModule(a,r);return this.device.createRenderPipeline({layout:e,vertex:{module:i,entryPoint:"vs",buffers:[{arrayStride:28,attributes:[{shaderLocation:0,offset:0,format:"float32x3"},{shaderLocation:1,offset:12,format:"float32x3"},{shaderLocation:2,offset:24,format:"float32"}]},...n?[{arrayStride:40,stepMode:"instance",attributes:[{shaderLocation:3,offset:0,format:"float32x4"},{shaderLocation:4,offset:16,format:"float32x2"},{shaderLocation:5,offset:24,format:"uint32x4"}]}]:[]]},fragment:{module:i,entryPoint:"fs",targets:[{format:s,blend:s===Et?void 0:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-list",cullMode:"none"},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"}})}createShaderModule(e,a){let s=this.device.createShaderModule({label:`pcb-${a}`,code:e});return typeof s.getCompilationInfo=="function"&&s.getCompilationInfo().then(r=>{let n=[...r.messages||[]];if(n.length){console.groupCollapsed(`WebGPU shader compilation info: pcb-${a}`);for(let i of n)console[i.type==="error"?"error":"warn"](`${i.type} ${i.lineNum}:${i.linePos} ${i.message}`);console.groupEnd()}}),s}resize(){let e=Math.min(devicePixelRatio||1,2),a=Math.max(1,Math.floor(this.canvas.clientWidth*e)),s=Math.max(1,Math.floor(this.canvas.clientHeight*e));this.canvas.width===a&&this.canvas.height===s||(this.canvas.width=a,this.canvas.height=s,this.depth?.destroy(),this.pickTexture?.destroy(),this.depth=this.device.createTexture({size:[a,s],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),this.pickTexture=this.device.createTexture({size:[a,s],format:Et,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC}))}addPrimitive(e,a){let s=e.position.length/3,r=new ArrayBuffer(s*Yn),n=new Float32Array(r),i=new Uint32Array(r);for(let b=0;b<s;b+=1){let l=b*10,m=b*3;n[l]=e.position[m],n[l+1]=e.position[m+1],n[l+2]=e.position[m+2],n[l+3]=e.normal[m],n[l+4]=e.normal[m+1],n[l+5]=e.normal[m+2],i[l+6]=e.netId[b]||0,i[l+7]=e.objectFeatureId[b]||0,i[l+8]=a.layerId||0,i[l+9]=a.materialId||0}let o=this.device.createBuffer({size:r.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});this.device.queue.writeBuffer(o,0,r);let c=e.indices instanceof Uint32Array?e.indices:new Uint32Array(e.indices),d=this.device.createBuffer({size:c.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST});this.device.queue.writeBuffer(d,0,c);let f=this.device.createBuffer({size:qt,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),p=this.makeBindGroup(f),v=a.kind==="component"||a.innerCopper&&this.innerCopperAtFull?1:0,x={...a,drawClass:v,slot:this.allocSlot(c.length,v),bounds:e.bounds||a.bounds||null,id:this.nextEntryId++,vertexBuffer:o,indexBuffer:d,indexCount:c.length,drawBuffer:f,bindGroup:p};return this.entries.push(x),this.bundleCache.clear(),x}removeEntries(e){if(!e?.length)return;let a=new Set(e.map(s=>s.id));for(let s of e)s.vertexBuffer?.destroy?.(),s.indexBuffer?.destroy?.(),s.drawBuffer?.destroy?.(),s.slot!=null&&(this.setSlot(s.slot,0,4),this.freeSlots.push(s.slot));this.entries=this.entries.filter(s=>!a.has(s.id)),this.bundleCache.clear()}dispose(){this.removeEntries(this.entries),this.barrels&&(this.barrels.vertexBuffer?.destroy?.(),this.barrels.indexBuffer?.destroy?.(),this.barrels.instanceBuffer?.destroy?.(),this.barrels.drawBuffer?.destroy?.(),this.barrels=null),this.depth?.destroy(),this.pickTexture?.destroy(),this.featureMaskBuffer?.destroy?.(),this.occurrenceBuffer?.destroy?.(),this.barrelRecordBuffer?.destroy?.(),this.listBuffer?.destroy?.(),this.argsBuffer?.destroy?.(),this.classesBuffer?.destroy?.();for(let e of[this.box?.vertexBuffer,this.box?.indexBuffer,this.box?.drawBuffer,this.cull?.uniform,this.cull?.lods,this.cull?.counters,this.cull?.readback])e?.destroy?.();this.box=null,this.cull=null,this.depth=null,this.pickTexture=null,this.featureMaskBuffer=null,this.bundleCache.clear()}setBarrels(e){if(!e?.length)return;let a=20,s=[],r=[];for(let b of[0,1]){let l=s.length/7;for(let m=0;m<a;m+=1){let u=Math.PI*2*m/a,g=Math.cos(u),y=Math.sin(u);for(let w of[0,1])s.push(g,y,w,b?-g:g,b?-y:y,0,b)}for(let m=0;m<a;m+=1){let u=(m+1)%a,g=l+m*2,y=l+u*2;r.push(g,y,y+1,g,y+1,g+1)}}let n=new Float32Array(s),i=new Uint16Array(r),o=new ArrayBuffer(e.length*40),c=new DataView(o);e.forEach((b,l)=>{let m=l*40;c.setFloat32(m,b.centerMm[0]/1e3,!0),c.setFloat32(m+4,-b.centerMm[1]/1e3,!0),c.setFloat32(m+8,Math.min(b.drillWidthMm,b.drillHeightMm)/2e3,!0),c.setFloat32(m+12,Math.max(b.outerWidthMm,b.outerHeightMm)/2e3,!0),c.setFloat32(m+16,b.startZMm/1e3,!0),c.setFloat32(m+20,b.endZMm/1e3,!0),c.setUint32(m+24,b.netId||0,!0),c.setUint32(m+28,b.objectFeatureId||0,!0),c.setUint32(m+32,b.startLayerId||0,!0),c.setUint32(m+36,b.endLayerId||0,!0)});let d=this.device.createBuffer({size:n.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),f=this.device.createBuffer({size:i.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST}),p=this.device.createBuffer({size:o.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});this.device.queue.writeBuffer(d,0,n),this.device.queue.writeBuffer(f,0,i),this.device.queue.writeBuffer(p,0,o);let v=Kn(e);this.barrelRecordBuffer?.destroy?.(),this.barrelRecordBuffer=this.device.createBuffer({label:"barrel-records",size:v.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.device.queue.writeBuffer(this.barrelRecordBuffer,0,v);let x=this.device.createBuffer({size:qt,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});this.barrels={records:e,vertexBuffer:d,indexBuffer:f,instanceBuffer:p,indexCount:i.length,instanceCount:e.length,drawBuffer:x,bindGroup:null},this.setSlot(0,i.length,2),this.rebindAll()}render(e){let{panels:a,layerOffsets:s}=e;this.resize(),this.device.queue.writeBuffer(this.layerOffsetBuffer,0,s);let r=this.context.getCurrentTexture().createView(),n=0,i=0;a.forEach((o,c)=>{let d=this.device.createCommandEncoder(),f=!this.identityOnly&&this.encodeCull(d,o),p=d.beginRenderPass({colorAttachments:[{view:r,clearValue:{r:.91,g:.93,b:.94,a:1},loadOp:c===0?"clear":"load",storeOp:"store"}],depthStencilAttachment:{view:this.depth.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}}),v=Zn(o.viewport,this.canvas.width,this.canvas.height);p.setViewport(v.x,v.y,v.width,v.height,0,1),p.setScissorRect(v.x,v.y,v.width,v.height);let x=this.encodeDraws(p,o,e);n+=x.triangles,i+=x.draws,p.end(),this.device.queue.submit([d.finish()]),f&&this.readCullCounts()}),this.frameStats={triangles:Math.round(n),draws:i}}encodeDraws(e,a,{activeNetId:s,selectedFeatureId:r,time:n,visibleLayers:i,showBoard:o,showComponents:c,componentOpacity:d,boardOpacity:f,isolateNet:p,compareMode:v=!1,compareOffsets:x=new Map,layerAlphas:b=null,visibleTileIds:l=null}){let m=0,u=0;this.writeGlobals(a.matrix,s,a.layerId,n,r);let{pipelines:g,indirect:y,barrelInstances:w}=this.drawSet(),T=this.entries.filter(I=>this.visible(I,a.layerId,i,o,c,d,v,l));for(let I of T)this.writeDraw(I,s,d,f,p,v,x.get(I.layerId),b?.get(I.layerId)??1);if(T.length>64)e.executeBundles([this.renderBundle(T,a.layerId)]);else{e.setPipeline(g.main);for(let I of T)this.drawEntry(e,I,y)}for(let I of T)m+=I.indexCount/3*this.countFor(I.drawClass);return u+=T.length,!v&&this.barrels&&(a.layerId===0||i.has(a.layerId))&&(this.writeBarrelDraw(p),this.drawBarrels(e,g.barrel,y,w),m+=this.barrels.indexCount/3*this.countFor(2),u+=1),y&&!v&&(this.drawBox(e,g.box),m+=12*this.countFor(3),u+=1),{triangles:m,draws:u}}visible(e,a,s,r,n,i,o=!1,c=null){return e.kind==="board"&&e.boardRole==="pad"||!o&&e.kind==="copper"&&c&&!c.has(e.tileId)?!1:o?e.kind==="copper"&&s.has(e.layerId):e.kind==="board"?a===0&&r:e.kind==="component"?a===0&&n&&i>.001:a?e.layerId===a:s.has(e.layerId)}writeGlobals(e,a,s,r,n=0){let i=this.globalScratch,o=this.globalScratchF32;o.fill(0),o.set(e,0);let c=this.globalScratchView;c.setUint32(64,a||0,!0),c.setUint32(68,s||0,!0),c.setFloat32(72,r,!0),c.setFloat32(76,a||this.emphasizedNetIds.size?1:0,!0),c.setUint32(80,n||0,!0),c.setUint32(84,this.selectedOccurrence>=0?this.selectedOccurrence+1+this.occurrenceBase:0,!0),c.setUint32(88,this.occurrenceBase,!0),o.set([.35,-.5,.8,0],24),this.device.queue.writeBuffer(this.globalBuffer,0,i)}writeDraw(e,a,s,r=1,n=!1,i=!1,o=null,c=1){let d=this.drawScratch;d.fill(0);let f=e.kind==="copper"?e.color:e.material.baseColor;d.set(f,0),d.set([e.material.metallic||0,e.material.roughness??.72,e.drawClass===1?1:0,0],4);let p=Ou(e);d.set([o?.[0]||0,o?.[1]||0,(i?-(e.baseZ||0):e.layerOffset||0)+p,0],8);let v=Number.isFinite(f?.[3])?f[3]:1,x=e.kind==="component"?s:e.kind==="board"?r*Cu(e,v):c,b=e.kind==="copper"?1:e.kind==="component"?2:0;d.set([b,x,n?1:0,i?1:0],12),this.device.queue.writeBuffer(e.drawBuffer,0,d)}writeBarrelDraw(e=!1){let a=this.barrelDrawScratch;a.fill(0),a.set([.55,.35,.16,.78],0),a.set([.75,.32,0,0],4),a.set([1,1,e?1:0,0],12),this.device.queue.writeBuffer(this.barrels.drawBuffer,0,a)}renderBundle(e,a){let{pipelines:s,indirect:r}=this.drawSet(),n=`${a}:${r?"indirect":"single"}:${e.map(d=>d.id).join(",")}`,i=this.bundleCache.get(n);if(i)return i;let o=this.device.createRenderBundleEncoder({colorFormats:[this.format],depthStencilFormat:"depth24plus"});o.setPipeline(s.main);for(let d of e)this.drawEntry(o,d,r);let c=o.finish();return this.bundleCache.set(n,c),this.bundleCache.size>32&&this.bundleCache.delete(this.bundleCache.keys().next().value),c}pick(e,a,s,r){let n=this.pickSerial.then(()=>this.performPick(e,a,s,r));return this.pickSerial=n.catch(()=>0),n}async performPick(e,a,s,r){this.resize();let n=Math.max(0,Math.min(this.canvas.width-1,Math.floor(a))),i=Math.max(0,Math.min(this.canvas.height-1,Math.floor(s)));this.device.queue.writeBuffer(this.layerOffsetBuffer,0,r.layerOffsets);let o=this.device.createCommandEncoder(),c=o.beginRenderPass({colorAttachments:[{view:this.pickTexture.createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:this.depth.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}}),d=Zn(e.viewport,this.canvas.width,this.canvas.height);return c.setViewport(d.x,d.y,d.width,d.height,0,1),c.setScissorRect(d.x,d.y,d.width,d.height),this.encodePick(c,e,r),c.end(),this.readPick(o,n,i)}encodePick(e,a,s){this.writeGlobals(a.matrix,s.activeNetId,a.layerId,performance.now()/1e3,s.selectedFeatureId);let{pipelines:r,indirect:n,barrelInstances:i}=this.drawSet();e.setPipeline(r.pick);for(let o of this.entries)this.visible(o,a.layerId,s.visibleLayers,s.showBoard,s.showComponents,s.componentOpacity,s.compareMode,s.visibleTileIds)&&(o.kind==="board"&&(this.identityOnly||o.boardRole!=="substrate")||(this.writeDraw(o,s.activeNetId,s.componentOpacity,s.boardOpacity,s.isolateNet,s.compareMode,s.compareOffsets?.get(o.layerId)),this.drawEntry(e,o,n)));!s.compareMode&&this.barrels&&(this.writeBarrelDraw(s.isolateNet),this.drawBarrels(e,r.barrelPick,n,i)),n&&!s.compareMode&&this.drawBox(e,r.boxPick)}async readPick(e,a,s){let r=this.device.createBuffer({label:"pick-readback",size:256,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});e.copyTextureToBuffer({texture:this.pickTexture,origin:{x:a,y:s}},{buffer:r,bytesPerRow:256},{width:1,height:1}),this.device.queue.submit([e.finish()]);try{await r.mapAsync(GPUMapMode.READ);let n=new DataView(r.getMappedRange()),i=zn(n.getUint32(0,!0),n.getUint32(4,!0));return r.unmap(),{...i,occurrenceKey:i.occurrenceIndex>=0?this.occurrenceKeys[i.occurrenceIndex]??null:null}}finally{r.mapState==="mapped"&&r.unmap(),r.destroy()}}};function Cu(t,e){return t.kind!=="board"||t.boardRole==="substrate"?1:t.boardRole==="soldermask"?Math.min(e,.72):t.boardRole==="silkscreen"?Math.min(e,.92):e}function Ou(t){if(t.kind!=="board"||t.boardRole!=="soldermask"&&t.boardRole!=="silkscreen")return 0;let e=t.bounds,s=(e?(e[2]+e[5])*.5:0)<0?-1:1,r=t.boardRole==="silkscreen"?35e-6:18e-6;return s*r}function Zn(t,e,a){let s=Math.max(0,Math.min(e-1,Math.floor(t.x))),r=Math.max(0,Math.min(a-1,Math.floor(t.y)));return{x:s,y:r,width:Math.max(1,Math.min(e-s,Math.floor(t.width))),height:Math.max(1,Math.min(a-r,Math.floor(t.height)))}}var Pu=`
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
}`,Du=`
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
}`,Uu=`
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
}`,Lu=`
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
}`,Ku=`
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
}`,Gu=`
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
}`,zu=`
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
}`,Vu=6.2,Hu=4.6,qu=3.8,ts=4*1024*1024,Xu=Math.floor(ts/6),hi=Xu*6,es=512*1024,bi=512*1024,pi=96,Wu=96,Ju=18,gi=96*1024*1024,Yu=2,rs=class t{static async create(e,a){if(!navigator.gpu)throw new Error("WebGPU is unavailable in this browser");let s=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!s)throw new Error("No WebGPU adapter is available");let r=await s.requestDevice(),n=await fetch(a,{cache:"default"});if(!n.ok)throw new Error(`Failed to load schematic manifest: ${n.status}`);let i=await n.json();if(!["prism.schematic_world_a0","prism.schematic_vector_a0"].includes(i.schema))throw new Error(`Unsupported schematic scene schema: ${i.schema}`);let o=i.featureTable||i.features,c=await fetch(new URL(o,a),{cache:"default"});if(!c.ok)throw new Error(`Failed to load schematic features: ${c.status}`);let d=Qu(await c.json());return new t(e,r,a,i,d)}constructor(e,a,s,r,n){this.canvas=e,this.device=a,this.manifestUrl=s,this.manifest=r,this.isNativeScene=r.schema==="prism.schematic_vector_a0",this.pages=r.pages||[],this.featuresByPage=n,this.featuresById=new Map;for(let x of Object.values(n))for(let b of x)this.featuresById.set(Number(b.id),b);this.context=e.getContext("webgpu"),this.format=navigator.gpu.getPreferredCanvasFormat(),this.context.configure({device:a,format:this.format,alphaMode:"opaque"}),this.flowCanvas=null,this.flowContext=null,this.globalBuffer=a.createBuffer({size:48,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.bindGroupLayout=a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}},{binding:3,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}}]});let i=a.createShaderModule({code:Pu});this.pagePipeline=a.createRenderPipeline({layout:a.createPipelineLayout({bindGroupLayouts:[this.bindGroupLayout]}),vertex:{module:i,entryPoint:"vs"},fragment:{module:i,entryPoint:"fs",targets:[{format:this.format}]},primitive:{topology:"triangle-list"}}),this.edgeLayout=a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]});let o=a.createShaderModule({code:Du});this.edgePipeline=a.createRenderPipeline({layout:a.createPipelineLayout({bindGroupLayouts:[this.edgeLayout]}),vertex:{module:o,entryPoint:"vs",buffers:[{arrayStride:8,attributes:[{shaderLocation:0,offset:0,format:"float32x2"}]}]},fragment:{module:o,entryPoint:"fs",targets:[{format:this.format,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"line-list"}}),this.edgeBindGroup=a.createBindGroup({layout:this.edgeLayout,entries:[{binding:0,resource:{buffer:this.globalBuffer}}]});let c=a.createShaderModule({code:Uu});this.highlightPipeline=a.createRenderPipeline({layout:a.createPipelineLayout({bindGroupLayouts:[this.edgeLayout]}),vertex:{module:c,entryPoint:"vs",buffers:[{arrayStride:8,attributes:[{shaderLocation:0,offset:0,format:"float32x2"}]}]},fragment:{module:c,entryPoint:"fs",targets:[{format:this.format,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"line-list"}}),this.highlightBufferSize=4*1024*1024,this.highlightBuffer=a.createBuffer({size:this.highlightBufferSize,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});let d=a.createShaderModule({code:Lu});this.netFlowPipeline=a.createRenderPipeline({layout:a.createPipelineLayout({bindGroupLayouts:[this.edgeLayout]}),vertex:{module:d,entryPoint:"vs",buffers:[{arrayStride:16,attributes:[{shaderLocation:0,offset:0,format:"float32x2"},{shaderLocation:1,offset:8,format:"float32x2"}]}]},fragment:{module:d,entryPoint:"fs",targets:[{format:this.format,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-list"}}),this.netFlowBuffer=a.createBuffer({size:bi*4,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),this.globalUniformScratch=new Float32Array(12),this.pageUniformScratch=new Float32Array(8),this.imageUniformScratch=new Float32Array(8),this.vectorScratch=new Float32Array(ts),this.highlightScratch=new Float32Array(this.highlightBufferSize/4),this.netFlowScratch=new Float32Array(bi),this.netTrackingCache=null,this.selectedIntrasheetLinkIndex=-1,this.truncatedHighlightCount=0,this.truncatedVectorCount=0,this.frameSerial=0,this.querySerial=0;let f=a.createShaderModule({code:Ku});this.vectorPipeline=a.createRenderPipeline({layout:a.createPipelineLayout({bindGroupLayouts:[this.edgeLayout]}),vertex:{module:f,entryPoint:"vs",buffers:[{arrayStride:24,attributes:[{shaderLocation:0,offset:0,format:"float32x2"},{shaderLocation:1,offset:8,format:"float32x4"}]}]},fragment:{module:f,entryPoint:"fs",targets:[{format:this.format,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-list"}}),this.vectorBuffer=a.createBuffer({size:ts*4,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),this.vectorBuffers=[this.vectorBuffer];let p=a.createShaderModule({code:Gu});this.imagePipeline=a.createRenderPipeline({layout:a.createPipelineLayout({bindGroupLayouts:[this.bindGroupLayout]}),vertex:{module:p,entryPoint:"vs"},fragment:{module:p,entryPoint:"fs",targets:[{format:this.format,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-list"}});let v=a.createShaderModule({code:zu});this.pickPipeline=a.createRenderPipeline({layout:a.createPipelineLayout({bindGroupLayouts:[this.edgeLayout]}),vertex:{module:v,entryPoint:"vs",buffers:[{arrayStride:12,attributes:[{shaderLocation:0,offset:0,format:"float32x2"},{shaderLocation:1,offset:8,format:"uint32"}]}]},fragment:{module:v,entryPoint:"fs",targets:[{format:"r32uint"}]},primitive:{topology:"triangle-list"}}),this.pickVertexBuffer=a.createBuffer({size:es*12,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),this.pickReadBuffer=a.createBuffer({size:256,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pickTexture=null,this.pickTextureSize=[0,0],this.pickPending=!1,this.vectorChunks=new Map,this.failedVectorChunks=new Map,this.nativeDetailState=new Map,this.domDetailPageIds=new Set,this.nativeDetailThresholds=new Map,this.residentVectorBytes=0,this.sampler=a.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"}),this.placeholder=this.createSolidTexture([245,247,249,255]),this.pageResources=new Map,this.imageResources=new Map,this.loading=new Map,this.selectedPageId="",this.selectedFeatureId=0,this.activeNetUid="",this.showHierarchy=!0,this.downloadedBytes=0,this.world=r.worldBoundsMm,this.center=[(this.world.minX+this.world.maxX)/2,(this.world.minY+this.world.maxY)/2],this.scale=Math.max((this.world.maxX-this.world.minX)/900,(this.world.maxY-this.world.minY)/650,.1)*1.16,this.edgeBuffer=this.createEdgeBuffer();for(let x of this.pages)this.createPageResource(x)}createSolidTexture(e){let a=this.device.createTexture({size:[1,1],format:"rgba8unorm-srgb",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});return this.device.queue.writeTexture({texture:a},new Uint8Array(e),{bytesPerRow:4},[1,1]),a}createPageResource(e){let a=this.device.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),s={page:e,uniform:a,texture:this.placeholder,textureWidth:0,svgBlob:null,bindGroup:null};this.pageResources.set(e.id,s),this.updateBindGroup(s)}createImageResource(e){let a=this.device.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),s={path:e,uniform:a,texture:this.placeholder,loaded:!1,bindGroup:null};return this.imageResources.set(e,s),this.updateBindGroup(s),s}updateBindGroup(e){e.bindGroup=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:{buffer:this.globalBuffer}},{binding:1,resource:{buffer:e.uniform}},{binding:2,resource:this.sampler},{binding:3,resource:e.texture.createView()}]})}async loadImageTexture(e){let a=this.imageResources.get(e)||this.createImageResource(e);if(a.loaded)return a;let s=`image:${e}`;if(this.loading.has(s))return this.loading.get(s);let r=(async()=>{try{let n=await fetch(new URL(e,this.manifestUrl),{cache:"default"});if(!n.ok)throw new Error(`Failed to load schematic image ${e}: ${n.status}`);let i=await n.blob(),o=await createImageBitmap(i),c=this.device.createTexture({size:[o.width,o.height],format:"rgba8unorm-srgb",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});this.device.queue.copyExternalImageToTexture({source:o},{texture:c},[o.width,o.height]),o.close(),a.texture!==this.placeholder&&a.texture.destroy(),a.texture=c,a.loaded=!0,this.updateBindGroup(a)}finally{this.loading.delete(s)}return a})();return this.loading.set(s,r),r}createEdgeBuffer(){let e=new Map(this.pages.map(n=>[n.id,n])),a=[];for(let n of this.manifest.edges||[]){let i=e.get(n.source),o=e.get(n.target);!i||!o||a.push(i.worldX+i.widthMm/2,i.worldY+i.heightMm,o.worldX+o.widthMm/2,o.worldY)}let s=new Float32Array(a);if(!s.length)return null;let r=this.device.createBuffer({size:s.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});return this.device.queue.writeBuffer(r,0,s),{buffer:r,count:s.length/2}}resize(){let e=Math.min(devicePixelRatio||1,2),a=Math.max(1,Math.floor(this.canvas.clientWidth*e)),s=Math.max(1,Math.floor(this.canvas.clientHeight*e));(this.canvas.width!==a||this.canvas.height!==s)&&(this.canvas.width=a,this.canvas.height=s),this.flowCanvas&&(this.flowCanvas.width!==a||this.flowCanvas.height!==s)&&(this.flowCanvas.width=a,this.flowCanvas.height=s)}setFlowOverlayCanvas(e){e&&(this.flowCanvas=e,this.flowContext=e.getContext("webgpu"),this.flowContext.configure({device:this.device,format:this.format,alphaMode:"premultiplied"}))}writeGlobals(){let e=this.globalUniformScratch;e[0]=this.center[0],e[1]=this.center[1],e[2]=this.scale,e[3]=performance.now()*.001,e[4]=this.canvas.width,e[5]=this.canvas.height,this.device.queue.writeBuffer(this.globalBuffer,0,e)}pagePixelWidth(e){return e.widthMm/this.scale}pageSourcePixelsPerMm(e){let a=this.pagePixelWidth(e)/Math.max(1,e.sourceWidthMm||e.widthMm),s=e.heightMm/this.scale/Math.max(1,e.sourceHeightMm||e.heightMm);return Math.min(a,s)}pageNativeDetailThresholds(e){let a=this.nativeDetailThresholds.get(e.id);if(a)return a;let s=Math.max(1,e.sourceWidthMm||e.widthMm),r=Math.max(1,e.sourceHeightMm||e.heightMm),n=s*r,i=Math.max(0,e.featureCount||e.featureIds?.length||0)/Math.max(1,n),o=ie(1-i*72,.84,1.08),c=ie(Math.sqrt(Math.max(s,r)/Math.max(1,Math.min(s,r)))/1.18,.92,1.14),d=ie(Vu*o*c,5,7.4),f={enter:d,exit:ie(Math.min(d-1.2,Hu*o),3.8,d-.7),prefetch:ie(Math.min(d-2,qu*o),3,d-1)};return this.nativeDetailThresholds.set(e.id,f),f}pageWantsNativeDetail(e){if(!this.pageHasNativeDetail(e))return!1;let a=this.pageSourcePixelsPerMm(e),s=this.nativeDetailState.get(e.id)===!0,r=this.pageNativeDetailThresholds(e),n=s?r.exit:r.enter,i=a>=n;return i!==s&&this.nativeDetailState.set(e.id,i),i}pageNativeDetailReady(e){if(this.domDetailPageIds.has(e.id)||!this.pageWantsNativeDetail(e))return!1;let a=this.vectorChunks.get(e.id);return!a?.loaded||!a.segments?.length&&!a.fills?.length?!1:this.visibleNativeImagesReady(e,a)}visibleNativeImagesReady(e,a){if(!a?.images?.length)return!0;let s=this.sourceViewportBounds(e,4),r=!0;for(let n of a.images){if(!Qe(n.bounds,s))continue;(this.imageResources.get(n.path)||this.createImageResource(n.path)).loaded||(r=!1,this.loadImageTexture(n.path).catch(()=>{}))}return r}visiblePages(){let e=this.canvas.width*this.scale/2,a=this.canvas.height*this.scale/2,s=this.center[0]-e,r=this.center[0]+e,n=this.center[1]-a,i=this.center[1]+a;return this.pages.filter(o=>o.worldX+o.widthMm>=s&&o.worldX<=r&&o.worldY+o.heightMm>=n&&o.worldY<=i)}worldViewportBounds(e=0){let a=this.canvas.width*this.scale/2,s=this.canvas.height*this.scale/2;return[this.center[0]-a-e,this.center[1]-s-e,this.center[0]+a+e,this.center[1]+s+e]}sourceViewportBounds(e,a=2.5){let s=this.worldViewportBounds(this.scale*8),r=(s[0]-e.worldX)/e.widthMm*e.sourceWidthMm-a,n=(s[1]-e.worldY)/e.heightMm*e.sourceHeightMm-a,i=(s[2]-e.worldX)/e.widthMm*e.sourceWidthMm+a,o=(s[3]-e.worldY)/e.heightMm*e.sourceHeightMm+a;return[Math.max(-a,Math.min(r,i)),Math.max(-a,Math.min(n,o)),Math.min(e.sourceWidthMm+a,Math.max(r,i)),Math.min(e.sourceHeightMm+a,Math.max(n,o))]}render(){this.frameSerial+=1,this.resize(),this.writeGlobals();let e=this.visiblePages(),a=this.device.createCommandEncoder(),s=a.beginRenderPass({colorAttachments:[{view:this.context.getCurrentTexture().createView(),clearValue:{r:.045,g:.055,b:.073,a:1},loadOp:"clear",storeOp:"store"}]});this.showHierarchy&&this.edgeBuffer&&(s.setPipeline(this.edgePipeline),s.setBindGroup(0,this.edgeBindGroup),s.setVertexBuffer(0,this.edgeBuffer.buffer),s.draw(this.edgeBuffer.count)),s.setPipeline(this.pagePipeline);for(let i of e){let o=this.pageResources.get(i.id),c=this.activeNetUid&&i.netUids.includes(this.activeNetUid),d=this.domDetailPageIds.has(i.id),f=!d&&this.pageNativeDetailReady(i),p=this.pageUniformScratch;p[0]=i.worldX,p[1]=i.worldY,p[2]=i.widthMm,p[3]=i.heightMm,p[4]=i.id===this.selectedPageId?1:0,p[5]=c?1:0,p[6]=this.activeNetUid?1:0,p[7]=f||d?1:0,this.device.queue.writeBuffer(o.uniform,0,p),s.setBindGroup(0,o.bindGroup),s.draw(6);let v=ie(Math.ceil(this.pagePixelWidth(i)*1.3/512)*512,512,6144);o.textureWidth<v*.82&&this.loadPageTexture(i,v).catch(()=>{})}this.scheduleVisibleVectorLoads(e),this.drawVisibleImages(s,e),this.drawVisibleVectors(s,e);let r=this.writeNetTrackingOverlay();r&&!this.flowContext&&(s.setPipeline(this.netFlowPipeline),s.setBindGroup(0,this.edgeBindGroup),s.setVertexBuffer(0,this.netFlowBuffer),s.draw(r));let n=this.writeNetHighlights(e);return n&&(s.setPipeline(this.highlightPipeline),s.setBindGroup(0,this.edgeBindGroup),s.setVertexBuffer(0,this.highlightBuffer),s.draw(n)),s.end(),this.device.queue.submit([a.finish()]),this.renderFlowOverlay(r),this.evictVectorChunks(e),e}renderFlowOverlay(e){if(!this.flowContext)return;let a=this.device.createCommandEncoder(),s=a.beginRenderPass({colorAttachments:[{view:this.flowContext.getCurrentTexture().createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}]});e&&(s.setPipeline(this.netFlowPipeline),s.setBindGroup(0,this.edgeBindGroup),s.setVertexBuffer(0,this.netFlowBuffer),s.draw(e)),s.end(),this.device.queue.submit([a.finish()])}drawVisibleImages(e,a){if(!this.isNativeScene)return;let s=!1;for(let r of a){if(this.domDetailPageIds.has(r.id)||!this.pageNativeDetailReady(r))continue;let n=this.vectorChunks.get(r.id);if(!n?.images?.length)continue;let i=this.sourceViewportBounds(r,4);for(let o of n.images){if(!Qe(o.bounds,i))continue;let c=this.imageResources.get(o.path)||this.createImageResource(o.path);c.loaded||this.loadImageTexture(o.path).catch(()=>{});let d=o.worldOrigin||this.sourceToWorld(r,[o.xMm,o.yMm]),f=o.worldSize||this.sourceSizeToWorld(r,o.widthMm,o.heightMm),p=this.imageUniformScratch;p[0]=d[0],p[1]=d[1],p[2]=f[0],p[3]=f[1],p[4]=0,p[5]=0,p[6]=0,p[7]=0,this.device.queue.writeBuffer(c.uniform,0,p),s||(e.setPipeline(this.imagePipeline),s=!0),e.setBindGroup(0,c.bindGroup),e.draw(6)}}}drawVisibleVectors(e,a){if(!this.isNativeScene)return 0;let s=this.vectorScratch,r=0,n=0,i=0,o=0,c=!1,d=()=>{if(!r)return;let p=this.vectorBuffers[o];p||(p=this.device.createBuffer({size:ts*4,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),this.vectorBuffers.push(p)),this.device.queue.writeBuffer(p,0,s,0,r),c||(e.setPipeline(this.vectorPipeline),e.setBindGroup(0,this.edgeBindGroup),c=!0);let v=Math.floor(r/6);e.setVertexBuffer(0,p),e.draw(v),i+=v,o+=1,r=0},f=p=>p>hi||p>s.length?(n+=1,!1):((r+p>hi||r+p>s.length)&&d(),!0);for(let p of a){if(this.domDetailPageIds.has(p.id)||!this.pageHasNativeDetail(p))continue;let v=this.vectorChunks.get(p.id);if(!v?.segments?.length&&!v?.fills?.length||!this.pageNativeDetailReady(p))continue;v.lastUsedFrame=this.frameSerial;let x=this.sourceViewportBounds(p),b=yi(v.spatial,x);for(let l of b.fills){if(!Qe(l.bounds,x)||!f(18))continue;let m=this.featuresById.get(l.featureId),u=this.activeNetUid&&m?.netUid===this.activeNetUid,y=this.selectedFeatureId===l.featureId?[.24,.58,1,1]:u?[.06,1,.24,1]:this.activeNetUid&&ua(m)?Ti(m,l.kind,l.color):ur(m,l.kind,l.color),w=l.worldPoints||l.points.map(T=>this.sourceToWorld(p,T));r=gf(s,r,w[0],w[1],w[2],y)}for(let l of b.segments){if(!Qe(l.bounds,x))continue;let m=this.featuresById.get(l.featureId),u=this.activeNetUid&&m?.netUid===this.activeNetUid,g=this.selectedFeatureId===l.featureId,y=g?[.24,.58,1,1]:u?[.06,1,.24,1]:this.activeNetUid&&ua(m)?Ti(m,l.kind,l.color):ur(m,l.kind,l.color),w=this.segmentWorldWidth(p,l,m,u||g);for(let T of this.visibleSegmentParts(p,l,m)){if(!f(36))continue;let I=T.worldA||this.sourceToWorld(p,T.a),M=T.worldB||this.sourceToWorld(p,T.b);r=pf(s,r,I,M,w,y)}}}return d(),this.truncatedVectorCount=n,this.vectorTruncated=n>0,this.lastVectorVertices=i,this.lastVectorChunks=o,i}pageHasNativeDetail(e){return this.isNativeScene?e?.nativeDetail?.enabled!==!1:!1}scheduleVisibleVectorLoads(e){if(!this.isNativeScene)return;let a=[...this.vectorChunks.values()].filter(n=>n?.promise&&!n.loaded).length,s=Math.max(0,Yu-a);if(!s)return;let r=e.filter(n=>!this.domDetailPageIds.has(n.id)).filter(n=>this.pageHasNativeDetail(n)&&this.pageSourcePixelsPerMm(n)>=this.pageNativeDetailThresholds(n).prefetch).filter(n=>!this.vectorChunks.get(n.id)?.loaded&&!this.vectorChunks.get(n.id)?.promise).sort((n,i)=>{let o=Math.hypot(n.worldX+n.widthMm/2-this.center[0],n.worldY+n.heightMm/2-this.center[1]),c=Math.hypot(i.worldX+i.widthMm/2-this.center[0],i.worldY+i.heightMm/2-this.center[1]);return o-c});for(let n of r)if(this.loadPageVectors(n).catch(()=>{}),s-=1,!s)break}featurePrimitiveBounds(e,a){let s=this.vectorChunks.get(e.id);if(!s?.segments?.length&&!s?.fills?.length)return null;let r=[],n=[];for(let i of s.segments||[])i.featureId===a&&(r.push(i.a[0],i.b[0]),n.push(i.a[1],i.b[1]));for(let i of s.fills||[])if(i.featureId===a)for(let o of i.points||[])r.push(o[0]),n.push(o[1]);return r.length?[Math.min(...r),Math.min(...n),Math.max(...r),Math.max(...n)]:null}symbolClipBounds(e){if(this._symbolClipBounds||(this._symbolClipBounds=new Map),this._symbolClipBounds.has(e.id))return this._symbolClipBounds.get(e.id);let a=(this.featuresByPage[e.id]||[]).filter(s=>s?.kind==="symbol_body"&&s.boundsMm&&!String(s.sourceId||"").includes(":overplot")).map(s=>{let r=this.featurePrimitiveBounds(e,s.id)||s.boundsMm;return[r[0]-.02,r[1]-.02,r[2]+.02,r[3]+.02]}).filter(s=>{let r=s[2]-s[0],n=s[3]-s[1];return Math.max(r,n)<=12&&r*n<=80});return this._symbolClipBounds.set(e.id,a),a}visibleSegmentParts(e,a,s){if(a._visibleParts)return a._visibleParts;let r=String(s?.kind||""),n=String(s?.semanticRole||"");if(r!=="wire"&&n!=="wire")return a._visibleParts=[a],a._visibleParts;let i=[a];for(let o of this.symbolClipBounds(e)){let c=[];for(let d of i)c.push(...xf(d,o));if(i=c,!i.length)break}for(let o of i)o.worldA=Wt(e,o.a),o.worldB=Wt(e,o.b);return a._visibleParts=i,a._visibleParts}netTrackingSegments(){if(!this.activeNetUid)return{netUid:"",anchorsByPage:new Map,segments:[],intrasheetSegments:[]};let e=Number(this.selectedFeatureId||0),a=String(this.selectedFeatureKey||""),s=String(this.selectedSourceId||"");if(this.netTrackingCache?.netUid===this.activeNetUid&&this.netTrackingCache?.selectedFeatureId===e&&this.netTrackingCache?.selectedFeatureKey===a&&this.netTrackingCache?.selectedSourceId===s)return this.netTrackingCache;this.selectedIntrasheetLinkIndex=-1;let r=new Map(this.pages.map(b=>[b.id,b])),n=this.manifest.netToPages?.[this.activeNetUid]||[],i=n.length?n.map(b=>r.get(b)).filter(Boolean):this.pages.filter(b=>b.netUids?.includes(this.activeNetUid)),o=new Map;for(let b of i.slice(0,Wu)){let l=this.netTrackingAnchorsForPage(b);l.length&&o.set(b.id,l)}let c=[],d=[];for(let[b,l]of o){let m=vi(uf(l),"intrasheet",b);c.push(...m),d.push(...m)}let f=[...o.entries()].map(([b,l])=>ff(r.get(b),l,{featureId:e,stableKey:a,sourceId:s})).filter(Boolean);c.push(...vi(f,"intersheet",""));let p=d.map((b,l)=>({...b,intrasheetIndex:l})),v=0,x=c.map((b,l)=>{if(b.type!=="intrasheet")return{...b,id:l};let m=v;return v+=1,{...b,id:l,intrasheetIndex:m}});return this.netTrackingCache={netUid:this.activeNetUid,selectedFeatureId:e,selectedFeatureKey:a,selectedSourceId:s,anchorsByPage:o,segments:x,intrasheetSegments:p},this.selectedIntrasheetLinkIndex>=this.netTrackingCache.intrasheetSegments.length&&(this.selectedIntrasheetLinkIndex=-1),this.netTrackingCache}netTrackingAnchorsForPage(e){let a=this.featuresByPage[e.id]||[],s=[];for(let r of a){if(r.netUid!==this.activeNetUid||!r.boundsMm||!lf(r))continue;let n=r.boundsMm,i=[(n[0]+n[2])/2,(n[1]+n[3])/2],o=this.sourceToWorld(e,i);s.push({pageId:e.id,featureId:Number(r.id||0),stableKey:String(r.stableKey||""),sourceId:String(r.sourceId||r.sourceUid||r.objectId||""),kind:r.kind||r.semanticRole||"",source:i,world:o,bounds:n,priority:df(r)})}return s.sort((r,n)=>n.priority-r.priority||r.source[1]-n.source[1]||r.source[0]-n.source[0]),s}writeNetTrackingOverlay(){let e=this.netTrackingSegments();if(this.lastNetFlowSegments=e.segments.length,this.lastNetFlowIntrasheetSegments=e.intrasheetSegments.length,!e.segments.length)return this.lastNetFlowVertices=0,0;let a=this.worldViewportBounds(this.scale*96),s=this.netFlowScratch,r=0,n=0;for(let i of e.segments){if(!Qe(wi(i),a))continue;let o=i.type==="intrasheet"&&i.intrasheetIndex===this.selectedIntrasheetLinkIndex,c=o?9.5:i.type==="intersheet"?8:4.8,d=o?2:i.type==="intersheet"?1:0,f=mf(s,r,i.a,i.b,c*this.scale,d,n,this.scale);if(f!==r&&(r=f,n+=Math.hypot(i.b[0]-i.a[0],i.b[1]-i.a[1])/Math.max(this.scale,1e-6),r+24>s.length))break}return r?(this.device.queue.writeBuffer(this.netFlowBuffer,0,s,0,r),this.lastNetFlowVertices=r/4,r/4):(this.lastNetFlowVertices=0,0)}cycleNetIntrasheetLink(e=1){let a=this.netTrackingSegments();if(!a.intrasheetSegments.length)return null;let s=a.intrasheetSegments.length;this.selectedIntrasheetLinkIndex=(this.selectedIntrasheetLinkIndex+e+s)%s;let r=a.intrasheetSegments[this.selectedIntrasheetLinkIndex];if(!r)return null;let n=wi(r,14*this.scale);return this.center=[(n[0]+n[2])/2,(n[1]+n[3])/2],this.scale=Math.max((n[2]-n[0])/Math.max(1,this.canvas.width*.36),(n[3]-n[1])/Math.max(1,this.canvas.height*.3),this.scale*.35,.025),{pageId:r.pageId,segment:r}}writeNetHighlights(e){if(!this.activeNetUid)return 0;let a=this.highlightScratch,s=0,r=0;for(let n of e){let i=this.sourceViewportBounds(n,5);for(let o of this.featuresByPage[n.id]||[]){if(o.netUid!==this.activeNetUid||!o.boundsMm||!Qe(o.boundsMm,i))continue;let c=this.featureWorldBounds(n,o.boundsMm);if(s+16>a.length){r+=1;continue}a[s++]=c[0],a[s++]=c[1],a[s++]=c[2],a[s++]=c[1],a[s++]=c[2],a[s++]=c[1],a[s++]=c[2],a[s++]=c[3],a[s++]=c[2],a[s++]=c[3],a[s++]=c[0],a[s++]=c[3],a[s++]=c[0],a[s++]=c[3],a[s++]=c[0],a[s++]=c[1]}}return this.truncatedHighlightCount=r,s?(this.device.queue.writeBuffer(this.highlightBuffer,0,a,0,s),s/2):0}featureWorldBounds(e,a){return[e.worldX+a[0]/e.sourceWidthMm*e.widthMm,e.worldY+a[1]/e.sourceHeightMm*e.heightMm,e.worldX+a[2]/e.sourceWidthMm*e.widthMm,e.worldY+a[3]/e.sourceHeightMm*e.heightMm]}sourceToWorld(e,a){return[e.worldX+a[0]/e.sourceWidthMm*e.widthMm,e.worldY+a[1]/e.sourceHeightMm*e.heightMm]}sourceSizeToWorld(e,a,s){return[a/e.sourceWidthMm*e.widthMm,s/e.sourceHeightMm*e.heightMm]}async loadPageVectors(e){if(!this.pageHasNativeDetail(e)||!e.chunks?.lod2)return null;let a=this.vectorChunks.get(e.id);if(a?.loaded)return a;if(a?.promise)return a.promise;let s=(async()=>{try{let r=await fetch(new URL(e.chunks.lod2,this.manifestUrl));if(!r.ok)throw new Error(`Failed to load schematic vector chunk ${e.id}: ${r.status}`);let n=await r.json(),i=Zu(n.primitives||[]);ef(e,i);let c=JSON.stringify(n).length,d={loaded:!0,segments:i.segments,fills:i.fills,images:i.images,spatial:cf(i),unsupported:n.unsupported||[],bytes:c,lastUsedFrame:this.frameSerial};return this.vectorChunks.set(e.id,d),this.failedVectorChunks.delete(e.id),this.residentVectorBytes+=c,d}catch(r){let n=this.failedVectorChunks.get(e.id)||{count:0,message:""};throw this.failedVectorChunks.set(e.id,{count:n.count+1,message:r?.message||String(r)}),this.vectorChunks.delete(e.id),r}})();return this.vectorChunks.set(e.id,{loaded:!1,promise:s,segments:[]}),s}evictVectorChunks(e){if(this.residentVectorBytes<=gi)return;let a=new Set(e.map(r=>r.id)),s=[...this.vectorChunks.entries()].filter(([,r])=>r?.loaded).filter(([r])=>!a.has(r)&&r!==this.selectedPageId).sort((r,n)=>(r[1].lastUsedFrame||0)-(n[1].lastUsedFrame||0));for(let[r,n]of s)if(this.vectorChunks.delete(r),this.residentVectorBytes=Math.max(0,this.residentVectorBytes-(n.bytes||0)),this.residentVectorBytes<=gi*.82)break}stats(){let e=this.visiblePages(),a=e.map(r=>this.pageSourcePixelsPerMm(r)),s=e.map(r=>this.pageNativeDetailThresholds(r).enter);return{residentVectorBytes:this.residentVectorBytes,vectorChunks:[...this.vectorChunks.values()].filter(r=>r?.loaded).length,vectorLoads:[...this.vectorChunks.values()].filter(r=>r?.promise&&!r.loaded).length,failedVectorChunks:this.failedVectorChunks.size,vectorVertices:this.lastVectorVertices||0,vectorDrawChunks:this.lastVectorChunks||0,truncatedVectors:this.truncatedVectorCount||0,nativeDetailPages:[...this.nativeDetailState.values()].filter(Boolean).length,nativePxPerMm:Number((Math.max(0,...a)||0).toFixed(2)),nativeThresholdPxPerMm:Number((s.length?Math.min(...s):0).toFixed(2)),domDetailPages:this.domDetailPageIds.size,netFlowSegments:this.lastNetFlowSegments||0,netFlowIntrasheetSegments:this.lastNetFlowIntrasheetSegments||0,netFlowVertices:this.lastNetFlowVertices||0}}setDomDetailPageIds(e){this.domDetailPageIds=new Set(e||[])}async loadPageTexture(e,a){let s=`${e.id}:${a}`;if(this.loading.has(s))return this.loading.get(s);let r=this.pageResources.get(e.id);if(!r||r.textureWidth>=a)return;let n=(async()=>{if(!r.svgBlob){let c=await fetch(new URL($u(e),this.manifestUrl));if(!c.ok)throw new Error(`Failed to load schematic page ${e.name}: ${c.status}`);r.svgBlob=await c.blob(),this.downloadedBytes+=r.svgBlob.size}let i=r.svgBlob,o=URL.createObjectURL(i);try{let c=new Image;if(c.decoding="async",c.src=o,await c.decode(),r.textureWidth>=a)return;let d=Math.max(64,Math.round(a*e.heightMm/e.widthMm)),f=new OffscreenCanvas(a,d),p=f.getContext("2d",{alpha:!1});p.fillStyle="#ffffff",p.fillRect(0,0,a,d),p.drawImage(c,0,0,a,d);let v=await createImageBitmap(f),x=this.device.createTexture({size:[a,d],format:"rgba8unorm-srgb",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});this.device.queue.copyExternalImageToTexture({source:v},{texture:x},[a,d]),v.close(),r.texture!==this.placeholder&&r.texture.destroy(),r.texture=x,r.textureWidth=a,this.updateBindGroup(r)}finally{URL.revokeObjectURL(o),this.loading.delete(s)}})();return this.loading.set(s,n),n}preloadOverview(){let e=[...this.pages],a=async()=>{for(;e.length;){let s=e.shift();await this.loadPageTexture(s,512).catch(()=>{})}};return Promise.all(Array.from({length:Math.min(4,e.length)},a))}screenToWorld(e,a){let s=this.canvas.getBoundingClientRect(),r=(e-s.left)*this.canvas.width/s.width,n=(a-s.top)*this.canvas.height/s.height;return[this.center[0]+(r-this.canvas.width/2)*this.scale,this.center[1]+(n-this.canvas.height/2)*this.scale]}worldToScreen(e,a){let s=this.canvas.clientWidth/this.canvas.width,r=this.canvas.clientHeight/this.canvas.height;return[((e-this.center[0])/this.scale+this.canvas.width/2)*s,((a-this.center[1])/this.scale+this.canvas.height/2)*r]}hitPage(e,a){let[s,r]=this.screenToWorld(e,a);return[...this.pages].reverse().find(n=>s>=n.worldX&&s<=n.worldX+n.widthMm&&r>=n.worldY&&r<=n.worldY+n.heightMm)||null}async pickFeature(e,a){if(!this.isNativeScene)return this.hitFeature(e,a);let s=this.hitPage(e,a);if(!s)return null;if(!this.pageHasNativeDetail(s))return this.hitFeature(e,a);await this.loadPageVectors(s);let r=await this.gpuPickFeature(s,e,a);return r&&!da(r)?{page:s,feature:r,source:this.clientToSource(s,e,a),native:!0,gpu:!0}:this.hitFeature(e,a)}hitFeature(e,a){let s=this.hitPage(e,a);if(!s)return null;let[r,n]=this.clientToSource(s,e,a),i=Math.max(.45,5*this.scale*this.canvas.width/Math.max(1,this.canvas.clientWidth)*s.sourceWidthMm/s.widthMm),o=this.hitResidentVectorFeature(s,r,n,i);if(o)return{page:s,feature:o,source:[r,n],native:!0};let c=this.hitSymbolInterior(s,r,n);if(c)return{page:s,feature:c,source:[r,n],native:!0,interior:!0};let d=(this.featuresByPage[s.id]||[]).filter(f=>{if(da(f))return!1;let p=f.boundsMm;return p&&r>=p[0]-i&&r<=p[2]+i&&n>=p[1]-i&&n<=p[3]+i}).map(f=>({feature:f,priority:la(f),area:Math.max(1e-4,(f.boundsMm[2]-f.boundsMm[0])*(f.boundsMm[3]-f.boundsMm[1]))})).sort((f,p)=>p.priority-f.priority||f.area-p.area);return{page:s,feature:d[0]?.feature||null,source:[r,n]}}hitSymbolInterior(e,a,s){let r=null;for(let n of this.featuresByPage[e.id]||[]){let i=String(n?.kind||"");if(i!=="symbol_body"&&i!=="symbol_instance"||String(n?.sourceId||"").includes(":overplot"))continue;let o=n.boundsMm;if(!o||a<o[0]||a>o[2]||s<o[1]||s>o[3])continue;let c=Math.max(1e-4,(o[2]-o[0])*(o[3]-o[1])),d=(i==="symbol_body"?0:1e6)+c;(!r||d<r.score)&&(r={feature:n,score:d})}return r?.feature||null}clientToSource(e,a,s){let[r,n]=this.screenToWorld(a,s);return[(r-e.worldX)/e.widthMm*e.sourceWidthMm,(n-e.worldY)/e.heightMm*e.sourceHeightMm]}ensurePickTexture(){this.pickTexture&&this.pickTextureSize[0]===this.canvas.width&&this.pickTextureSize[1]===this.canvas.height||(this.pickTexture&&this.pickTexture.destroy(),this.pickTexture=this.device.createTexture({size:[this.canvas.width,this.canvas.height],format:"r32uint",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC}),this.pickTextureSize=[this.canvas.width,this.canvas.height])}writePickVectors(e){let a=new ArrayBuffer(es*12),s=new DataView(a),r=0,n=[];for(let i of e){let o=this.vectorChunks.get(i.id);if(!o?.segments?.length&&!o?.fills?.length&&!o?.images?.length)continue;let c=this._pickSourcePointByPage?.get(i.id),d=c?[c[0]-2.5,c[1]-2.5,c[0]+2.5,c[1]+2.5]:[0,0,i.sourceWidthMm,i.sourceHeightMm],f=yi(o.spatial,d);for(let p of f.images){if(!Qe(p.bounds,d))continue;let v=this.featuresById.get(p.featureId);!v||da(v)||n.push({page:i,image:p,feature:v,priority:la(v)-5})}for(let p of f.fills){if(!Qe(p.bounds,d))continue;let v=this.featuresById.get(p.featureId);!v||da(v)||n.push({page:i,fill:p,feature:v,priority:la(v)-2})}for(let p of f.segments){if(!Qe(p.bounds,d))continue;let v=this.featuresById.get(p.featureId);!v||da(v)||n.push({page:i,segment:p,feature:v,priority:la(v)})}}n.sort((i,o)=>i.priority-o.priority);for(let{page:i,segment:o,fill:c,image:d,feature:f}of n){if(r+6>es)break;if(d){let p=this.sourceToWorld(i,[d.xMm,d.yMm]),v=this.sourceToWorld(i,[d.xMm+d.widthMm,d.yMm]),x=this.sourceToWorld(i,[d.xMm,d.yMm+d.heightMm]),b=this.sourceToWorld(i,[d.xMm+d.widthMm,d.yMm+d.heightMm]);r=dr(s,r,p,v,x,d.featureId),r=dr(s,r,x,v,b,d.featureId)}else if(c){let p=c.worldPoints||c.points.map(v=>this.sourceToWorld(i,v));r=dr(s,r,p[0],p[1],p[2],c.featureId)}else{let p=Math.max(this.segmentWorldWidth(i,o,f,!1),this.scale*7);for(let v of this.visibleSegmentParts(i,o,f)){if(r+6>es)break;let x=v.worldA||this.sourceToWorld(i,v.a),b=v.worldB||this.sourceToWorld(i,v.b);r=vf(s,r,x,b,p,o.featureId)}}}return r?(this.device.queue.writeBuffer(this.pickVertexBuffer,0,a,0,r*12),r):0}async gpuPickFeature(e,a,s){if(this.pickPending)return null;let r=this.clientToSource(e,a,s);this._pickSourcePointByPage=new Map([[e.id,r]]);let n=this.writePickVectors([e]);if(this._pickSourcePointByPage=null,!n)return null;this.resize(),this.writeGlobals(),this.ensurePickTexture();let i=this.canvas.getBoundingClientRect(),o=Math.max(0,Math.min(this.canvas.width-1,Math.floor((a-i.left)*this.canvas.width/i.width))),c=Math.max(0,Math.min(this.canvas.height-1,Math.floor((s-i.top)*this.canvas.height/i.height))),d=this.device.createCommandEncoder(),f=d.beginRenderPass({colorAttachments:[{view:this.pickTexture.createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}]});f.setPipeline(this.pickPipeline),f.setBindGroup(0,this.edgeBindGroup),f.setVertexBuffer(0,this.pickVertexBuffer),f.draw(n),f.end(),d.copyTextureToBuffer({texture:this.pickTexture,origin:{x:o,y:c}},{buffer:this.pickReadBuffer,bytesPerRow:256,rowsPerImage:1},{width:1,height:1,depthOrArrayLayers:1}),this.pickPending=!0,this.device.queue.submit([d.finish()]);try{await this.pickReadBuffer.mapAsync(GPUMapMode.READ);let p=new DataView(this.pickReadBuffer.getMappedRange()).getUint32(0,!0);return this.pickReadBuffer.unmap(),p&&this.featuresById.get(p)||null}finally{this.pickReadBuffer.mapState==="mapped"&&this.pickReadBuffer.unmap(),this.pickPending=!1}}hitResidentVectorFeature(e,a,s,r){if(!this.isNativeScene)return null;let n=this.vectorChunks.get(e.id);if(!n?.loaded)return null;let i=null;for(let o of n.segments){let c=this.featuresById.get(o.featureId),d=Math.max(r,(o.widthMm||0)*.5+r*.45);if(c)for(let f of this.visibleSegmentParts(e,o,c)){let p=yf([a,s],f.a,f.b);if(p>d)continue;let v=p-la(c)*.025+(ua(c)?0:8);(!i||v<i.score)&&(i={feature:c,score:v})}}return i?.feature||null}segmentWorldWidth(e,a,s,r){let n=(a.widthMm||.15)/Math.max(1,e.sourceWidthMm)*e.widthMm;return Math.max(n,this.scale*bf(s,a.kind,r))}pan(e,a){let s=this.canvas.width/Math.max(1,this.canvas.clientWidth);this.center[0]-=e*this.scale*s,this.center[1]-=a*this.scale*s}zoom(e,a,s){let r=this.screenToWorld(a,s);this.scale=ie(this.scale*Math.exp(e*.0015),.015,16);let n=this.screenToWorld(a,s);this.center[0]+=r[0]-n[0],this.center[1]+=r[1]-n[1]}framePage(e){e&&(this.resize(),this.center=[e.worldX+e.widthMm/2,e.worldY+e.heightMm/2],this.scale=Math.max(e.widthMm/Math.max(1,this.canvas.width*.88),e.heightMm/Math.max(1,this.canvas.height*.84)))}frameWorld(){this.resize(),this.center=[(this.world.minX+this.world.maxX)/2,(this.world.minY+this.world.maxY)/2],this.scale=Math.max((this.world.maxX-this.world.minX)/Math.max(1,this.canvas.width*.9),(this.world.maxY-this.world.minY)/Math.max(1,this.canvas.height*.88),.05)}};function $u(t){return t.thumbnail?.path||t.svg}function Qu(t){if(t.schema==="prism.schematic_vector_a0.features"){let e=new Map((t.features||[]).map(s=>[Number(s.id),s])),a={};for(let[s,r]of Object.entries(t.pages||{}))a[s]=r.map(n=>e.get(Number(n))).filter(Boolean);return a}return t.pages||{}}function Zu(t){let e=[],a=[],s=[];for(let r of t){let n=Number(r.featureId||0);if(!n)continue;if(r.kind==="plotimage"&&r.image?.path){let g=r.xMm||0,y=r.yMm||0,w=r.widthMm||0,T=r.heightMm||0;s.push({featureId:n,kind:r.kind,xMm:g,yMm:y,widthMm:w,heightMm:T,bounds:[g,y,g+w,y+T],path:r.image.path});continue}let i=String(r.semanticRole||""),o=r.radiusMm||r.diameterMm/2||0,c=String(r.fill||"").toUpperCase()==="FILLED_SHAPE",d=r.widthMm||r.pen_widthMm||(i==="junction"?.08:.15),f=String(r.lineStyle||r.line_style||"DEFAULT").toUpperCase(),p=r.color||r.strokeColor||r.style?.color||"",v=r.fillColor||r.color||r.style?.color||"",x=(g,y)=>nf(e,{featureId:n,kind:r.kind,widthMm:d,lineStyle:f,color:p},g,y),b=r.x1Mm,l=r.y1Mm,m=r.x2Mm,u=r.y2Mm;if(r.trianglesMm?.length){for(let g of r.trianglesMm)Array.isArray(g)&&g.length===3&&a.push({featureId:n,kind:r.kind,color:v,points:g,bounds:Ei(g)});if(r.pointsMm?.length>=2){for(let g=1;g<r.pointsMm.length;g+=1)x(r.pointsMm[g-1],r.pointsMm[g]);xi(r)&&x(r.pointsMm[r.pointsMm.length-1],r.pointsMm[0])}}else if(r.pointsMm?.length>=2){c&&r.pointsMm.length>=3&&rf(a,n,r.kind,r.pointsMm,v);for(let g=1;g<r.pointsMm.length;g+=1)x(r.pointsMm[g-1],r.pointsMm[g]);xi(r)&&x(r.pointsMm[r.pointsMm.length-1],r.pointsMm[0])}else if(r.polylinesMm?.length){for(let g of r.polylinesMm)if(!(!Array.isArray(g)||g.length<2))for(let y=1;y<g.length;y+=1)x(g[y-1],g[y])}else if(Number.isFinite(b)&&Number.isFinite(l)&&Number.isFinite(m)&&Number.isFinite(u))r.kind==="rect"?(c&&af(a,n,r.kind,[b,l,m,u],v),x([b,l],[m,l]),x([m,l],[m,u]),x([m,u],[b,u]),x([b,u],[b,l])):x([b,l],[m,u]);else if(Number.isFinite(r.cxMm)&&Number.isFinite(r.cyMm)){let g=r.radiusMm||r.diameterMm/2||.4;c&&sf(a,n,r.kind,[r.cxMm,r.cyMm],g,v),of(e,{featureId:n,kind:r.kind,widthMm:d,lineStyle:f,color:p},[r.cxMm,r.cyMm],g)}else if(r.contoursMm?.length){for(let g of r.contoursMm)if(!(!Array.isArray(g)||g.length<2)){for(let y=1;y<g.length;y+=1)x(g[y-1],g[y]);x(g[g.length-1],g[0])}}else if(Number.isFinite(r.start_xMm)&&Number.isFinite(r.start_yMm)&&Number.isFinite(r.end_xMm)&&Number.isFinite(r.end_yMm))Number.isFinite(r.mid_xMm)&&Number.isFinite(r.mid_yMm)?(x([r.start_xMm,r.start_yMm],[r.mid_xMm,r.mid_yMm]),x([r.mid_xMm,r.mid_yMm],[r.end_xMm,r.end_yMm])):x([r.start_xMm,r.start_yMm],[r.end_xMm,r.end_yMm]);else if(Number.isFinite(r.start_xMm)&&Number.isFinite(r.start_yMm)&&Number.isFinite(r.mid_xMm)&&Number.isFinite(r.mid_yMm)&&Number.isFinite(r.end_xMm)&&Number.isFinite(r.end_yMm))x([r.start_xMm,r.start_yMm],[r.mid_xMm,r.mid_yMm]),x([r.mid_xMm,r.mid_yMm],[r.end_xMm,r.end_yMm]);else if(r.boundsMm&&r.kind!=="text"){let[g,y,w,T]=r.boundsMm;x([g,y],[w,y]),x([w,y],[w,T]),x([w,T],[g,T]),x([g,T],[g,y])}}return{segments:e,fills:a,images:s}}function ef(t,e){for(let a of e.segments||[])a.worldA=Wt(t,a.a),a.worldB=Wt(t,a.b);for(let a of e.fills||[])a.worldPoints=a.points.map(s=>Wt(t,s));for(let a of e.images||[])a.worldOrigin=Wt(t,[a.xMm,a.yMm]),a.worldSize=tf(t,a.widthMm,a.heightMm)}function Wt(t,e){return[t.worldX+e[0]/t.sourceWidthMm*t.widthMm,t.worldY+e[1]/t.sourceHeightMm*t.heightMm]}function tf(t,e,a){return[e/t.sourceWidthMm*t.widthMm,a/t.sourceHeightMm*t.heightMm]}function af(t,e,a,s,r){let[n,i,o,c]=s;t.push({featureId:e,kind:a,color:r,points:[[n,i],[o,i],[n,c]],bounds:[n,i,o,c]},{featureId:e,kind:a,color:r,points:[[n,c],[o,i],[o,c]],bounds:[n,i,o,c]})}function sf(t,e,a,s,r,n){for(let o=0;o<36;o+=1){let c=o/36*Math.PI*2,d=(o+1)/36*Math.PI*2;t.push({featureId:e,kind:a,color:n,points:[s,[s[0]+Math.cos(c)*r,s[1]+Math.sin(c)*r],[s[0]+Math.cos(d)*r,s[1]+Math.sin(d)*r]],bounds:[s[0]-r,s[1]-r,s[0]+r,s[1]+r]})}}function rf(t,e,a,s,r){let n=s[0],i=Ei(s);for(let o=2;o<s.length;o+=1)t.push({featureId:e,kind:a,color:r,points:[n,s[o-1],s[o]],bounds:i})}function nf(t,e,a,s){let r=mi(a,s,e.widthMm||.15),n=e.lineStyle||"DEFAULT";if(!["DASH","DASHED","DOT","DOTTED","DASHDOT","DASH_DOT"].includes(n)){t.push({...e,a,b:s,bounds:r});return}let i=s[0]-a[0],o=s[1]-a[1],c=Math.hypot(i,o);if(c<1e-6)return;let d=i/c,f=o/c,p=Math.max(e.widthMm*4,.45),v=n.includes("DOT")?[p*.8,p*.75,p*3,p*.75]:[p*3,p*1.5],x=0,b=0;for(;x<c;){let l=Math.min(v[b%v.length],c-x);if(b%2===0){let m=[a[0]+d*x,a[1]+f*x],u=[a[0]+d*(x+l),a[1]+f*(x+l)];t.push({...e,a:m,b:u,bounds:mi(m,u,e.widthMm||.15)})}x+=l,b+=1}}function of(t,e,a,s){for(let n=0;n<32;n+=1){let i=n/32*Math.PI*2,o=(n+1)/32*Math.PI*2;t.push({...e,a:[a[0]+Math.cos(i)*s,a[1]+Math.sin(i)*s],b:[a[0]+Math.cos(o)*s,a[1]+Math.sin(o)*s],bounds:[a[0]-s,a[1]-s,a[0]+s,a[1]+s]})}}function Ei(t,e=0){let a=1/0,s=1/0,r=-1/0,n=-1/0;for(let i of t||[])a=Math.min(a,i[0]),s=Math.min(s,i[1]),r=Math.max(r,i[0]),n=Math.max(n,i[1]);return Number.isFinite(a)?[a-e,s-e,r+e,n+e]:[0,0,0,0]}function mi(t,e,a=0){let s=Math.max(.05,a*.5);return[Math.min(t[0],e[0])-s,Math.min(t[1],e[1])-s,Math.max(t[0],e[0])+s,Math.max(t[1],e[1])+s]}function Qe(t,e){return!t||!e?!0:t[0]<=e[2]&&t[2]>=e[0]&&t[1]<=e[3]&&t[3]>=e[1]}function cf(t){let e={cellSize:Ju,cells:new Map,segments:t.segments||[],fills:t.fills||[],images:t.images||[],queryId:0};for(let a of e.segments)cr(e,"segments",a);for(let a of e.fills)cr(e,"fills",a);for(let a of e.images)cr(e,"images",a);return e}function cr(t,e,a){let s=a.bounds;if(!s)return;let r=Math.floor(s[0]/t.cellSize),n=Math.floor(s[2]/t.cellSize),i=Math.floor(s[1]/t.cellSize),o=Math.floor(s[3]/t.cellSize);for(let c=i;c<=o;c+=1)for(let d=r;d<=n;d+=1){let f=`${d}:${c}`,p=t.cells.get(f);p||(p={segments:[],fills:[],images:[]},t.cells.set(f,p)),p[e].push(a)}}function yi(t,e){if(!t)return{segments:[],fills:[],images:[]};t.queryId=(t.queryId||0)+1;let a=t.queryId,s={segments:[],fills:[],images:[]},r=Math.floor(e[0]/t.cellSize),n=Math.floor(e[2]/t.cellSize),i=Math.floor(e[1]/t.cellSize),o=Math.floor(e[3]/t.cellSize);for(let c=i;c<=o;c+=1)for(let d=r;d<=n;d+=1){let f=t.cells.get(`${d}:${c}`);f&&(lr(f.segments,s.segments,a,"segments"),lr(f.fills,s.fills,a,"fills"),lr(f.images,s.images,a,"images"))}return s}function lr(t,e,a,s){let r=`_${s}QueryId`;for(let n of t)n[r]!==a&&(n[r]=a,e.push(n))}function xi(t){let e=String(t.kind||"");if(String(t.fill||"").toUpperCase()==="FILLED_SHAPE"||t.closed===!0||["polygon","fill"].includes(e))return!0;let s=t.pointsMm||[];if(s.length>=3){let r=s[0],n=s[s.length-1];return Math.hypot(r[0]-n[0],r[1]-n[1])<1e-6}return!1}function ua(t){return!!t?.netUid}function lf(t){let e=String(t?.kind||""),a=String(t?.semanticRole||"");return e==="pin"||e==="pin_body"||e==="label"||e==="global_label"||e==="hierarchical_label"||e==="netclass_flag"||e==="power_symbol"||e==="power_port"||a==="label"||a==="global_label"||a==="hierarchical_label"}function df(t){let e=String(t?.kind||""),a=String(t?.semanticRole||"");return e==="global_label"||a==="global_label"?130:e==="hierarchical_label"||a==="hierarchical_label"?125:e==="label"||a==="label"?118:e==="pin"||e==="pin_body"?106:e==="power_symbol"||e==="power_port"||e==="netclass_flag"?98:50}function uf(t){if(t.length<=pi)return t;let e=t.slice(0,pi);return e.sort((a,s)=>a.source[1]-s.source[1]||a.source[0]-s.source[0]),e}function ff(t,e,a={}){if(!t||!e?.length)return null;let s=a.featureId||a.stableKey||a.sourceId?e.find(d=>a.featureId&&Number(d.featureId||0)===Number(a.featureId)||a.stableKey&&d.stableKey===a.stableKey||a.sourceId&&d.sourceId===a.sourceId):null;if(s)return{...s,kind:"selected-net-occurrence",priority:200};let r=e.filter(d=>d.priority>=118).slice(0,16),n=r.length?r:e.slice(0,16),i=0,o=0;for(let d of n)i+=d.world[0],o+=d.world[1];let c=[i/n.length,o/n.length];return{pageId:t.id,featureId:n[0]?.featureId||0,kind:"page-net-occurrence",source:[0,0],world:c,bounds:[c[0],c[1],c[0],c[1]],priority:1}}function vi(t,e,a){if(!t||t.length<2)return[];let s=t.map(i=>({...i})).sort((i,o)=>i.world[1]-o.world[1]||i.world[0]-o.world[0]),r=[],n=s.shift();for(;s.length;){let i=0,o=1/0;for(let d=0;d<s.length;d+=1){let f=s[d],p=Math.hypot(f.world[0]-n.world[0],f.world[1]-n.world[1]);p<o&&(o=p,i=d)}let c=s.splice(i,1)[0];r.push({type:e,pageId:a||n.pageId||c.pageId||"",a:n.world,b:c.world,sourceFeatureIds:[n.featureId,c.featureId].filter(Boolean)}),n=c}return r}function wi(t,e=0){return[Math.min(t.a[0],t.b[0])-e,Math.min(t.a[1],t.b[1])-e,Math.max(t.a[0],t.b[0])+e,Math.max(t.a[1],t.b[1])+e]}function la(t){let e=String(t?.kind||""),s=String(t?.semanticRole||"")||e;return s==="pin_number"||s==="pin_name"?120:s==="pin_body"||e==="pin"?110:s==="symbol_reference"||s==="symbol_value"?92:e==="junction"||e==="no_connect"?88:e==="wire"||e==="bus"||e==="bus_entry"?78:s==="symbol_body"||e==="symbol_body"?45:e==="symbol_instance"||e==="symbol_overplot"?30:e==="text"||String(s).includes("text")?24:10}function da(t){let e=String(t?.kind||""),a=String(t?.semanticRole||"");if(e==="page"||e==="sheet_header")return!0;if(e==="graphic_rect"&&a==="graphic_rect"&&!t?.netUid&&!t?.componentUid){let s=t.boundsMm||[];return s[2]-s[0]>150&&s[3]-s[1]>120}return!1}function hf(t){if(!t||typeof t!="string")return null;let a=t.trim().match(/^#([0-9a-f]{6})([0-9a-f]{2})?$/i);if(!a)return null;let s=a[1],r=a[2]??"ff";return[parseInt(s.slice(0,2),16)/255,parseInt(s.slice(2,4),16)/255,parseInt(s.slice(4,6),16)/255,parseInt(r,16)/255]}function ur(t,e,a=""){let s=hf(a||t?.color||"");return t?.kind==="dnp_marker"?s||[.86,.04,.05,.85]:t?.dnp&&["symbol_reference","symbol_value","symbol_text"].includes(String(t?.kind||""))?[.5,.52,.54,.56]:s||(t?.dnp?[.5,.52,.54,.56]:ua(t)?[.12,.56,.2,.96]:t?.kind==="pin_name"?[0,.28,.31,.96]:t?.kind==="pin_number"?[.45,.17,.16,.96]:t?.kind==="pin_body"?[.28,.18,.18,.88]:t?.kind==="symbol_body"||t?.kind==="symbol_instance"?[.42,.18,.18,.72]:t?.kind==="symbol_reference"||t?.kind==="symbol_value"?[.05,.13,.16,.94]:t?.kind==="text"||String(e||"").startsWith("text")?[.05,.13,.16,.94]:[.16,.17,.19,.7])}function Ti(t,e,a=""){let s=ur(t,e,a);return[s[0]*.72,s[1]*.72,s[2]*.72,Math.min(s[3],.38)]}function bf(t,e,a){return a?5.5:t?.kind==="dnp_marker"?3:["pin_name","pin_number"].includes(String(t?.kind||""))?1.5:t?.kind==="pin_body"?1.7:String(e||"").startsWith("text")?1.35:e==="bus"||t?.kind==="bus"?4.2:ua(t)?2.6:t?.kind==="symbol_body"||t?.kind==="symbol_instance"||t?.kind==="sheet"?1.5:1.25}function as(t,e,a,s){return t[e++]=a[0],t[e++]=a[1],t[e++]=s[0],t[e++]=s[1],t[e++]=s[2],t[e++]=s[3],e}function pf(t,e,a,s,r,n){let i=ki(a,s,r);if(!i)return e;for(let o of i)e=as(t,e,o,n);return e}function gf(t,e,a,s,r,n){return e=as(t,e,a,n),e=as(t,e,s,n),e=as(t,e,r,n),e}function Xt(t,e,a,s,r){return t[e++]=a[0],t[e++]=a[1],t[e++]=s,t[e++]=r,e}function mf(t,e,a,s,r,n,i,o){let c=s[0]-a[0],d=s[1]-a[1],f=Math.hypot(c,d);if(f<1e-6||e+24>t.length)return e;let p=r*.5,v=c/f,b=-(d/f)*p,l=v*p,m=[a[0]+b,a[1]+l],u=[a[0]-b,a[1]-l],g=[s[0]+b,s[1]+l],y=[s[0]-b,s[1]-l],w=i+f/Math.max(o,1e-6);return e=Xt(t,e,m,i,n),e=Xt(t,e,u,i,n),e=Xt(t,e,g,w,n),e=Xt(t,e,g,w,n),e=Xt(t,e,u,i,n),e=Xt(t,e,y,w,n),e}function ki(t,e,a){let s=e[0]-t[0],r=e[1]-t[1],n=Math.hypot(s,r);if(n<1e-6)return null;let i=a*.5,o=s/n*i,c=r/n*i,d=-r/n*i,f=s/n*i,p=[t[0]-o,t[1]-c],v=[e[0]+o,e[1]+c],x=[p[0]+d,p[1]+f],b=[p[0]-d,p[1]-f],l=[v[0]+d,v[1]+f],m=[v[0]-d,v[1]-f];return[x,b,l,l,b,m]}function yf(t,e,a){let s=a[0]-e[0],r=a[1]-e[1],n=s*s+r*r||1,i=ie(((t[0]-e[0])*s+(t[1]-e[1])*r)/n,0,1),o=e[0]+s*i,c=e[1]+r*i;return Math.hypot(t[0]-o,t[1]-c)}function xf(t,e){let[a,s,r,n]=e,[i,o]=t.a,[c,d]=t.b,f=1e-6,p=(v,x)=>({...t,a:v,b:x});if(Math.abs(o-d)<=f){let v=o;if(v<s-f||v>n+f)return[t];let x=Math.min(i,c),b=Math.max(i,c),l=Math.max(x,a),m=Math.min(b,r);if(m<=l+f)return[t];let u=[],g=i<=c;if(x<l-f){let y=g?[x,v]:[l,v],w=g?[l,v]:[x,v];u.push(p(y,w))}if(m<b-f){let y=g?[m,v]:[b,v],w=g?[b,v]:[m,v];u.push(p(y,w))}return u}if(Math.abs(i-c)<=f){let v=i;if(v<a-f||v>r+f)return[t];let x=Math.min(o,d),b=Math.max(o,d),l=Math.max(x,s),m=Math.min(b,n);if(m<=l+f)return[t];let u=[],g=o<=d;if(x<l-f){let y=g?[v,x]:[v,l],w=g?[v,l]:[v,x];u.push(p(y,w))}if(m<b-f){let y=g?[v,m]:[v,b],w=g?[v,b]:[v,m];u.push(p(y,w))}return u}return[t]}function ss(t,e,a,s){let r=e*12;t.setFloat32(r,a[0],!0),t.setFloat32(r+4,a[1],!0),t.setUint32(r+8,s,!0)}function vf(t,e,a,s,r,n){let i=ki(a,s,r);if(!i)return e;for(let o of i)ss(t,e,o,n),e+=1;return e}function dr(t,e,a,s,r,n){return ss(t,e,a,n),ss(t,e+1,s,n),ss(t,e+2,r,n),e+3}function wf(t,e){let a=Array.isArray(t?.layerIds)?t.layerIds:[];if(a.length<2&&t?.startLayerId!=null&&t?.endLayerId!=null&&(a=[t.startLayerId,t.endLayerId]),a.length<2&&t?.layerMask!=null)try{let s=BigInt(String(t.layerMask));a=e.filter((r,n)=>(s&1n<<BigInt(n))!==0n).map(r=>r.id)}catch{a=[]}return a}function Tf(t){let e=t?.objectFeatureId??t?.id;if(e!=null&&Number.isFinite(Number(e))&&Number(e)!==0)return`feature:${Number(e)}`;let a=String(t?.sourceUid||"");return a?`source:${a}`:""}function Ii(t,e){let a=new Map(t.map((o,c)=>[Number(o.id),c])),s=new Map(t.map(o=>[Number(o.id),o])),r=new Map,n=new Set,i={thru:0,blind:0,buried:0};for(let o of e){let c=Tf(o);if(c){if(n.has(c))continue;n.add(c)}let d=[...new Set(wf(o,t).map(Number))].filter(y=>a.has(y)).sort((y,w)=>a.get(y)-a.get(w));if(d.length<2)continue;let f=d[0],p=d[d.length-1],v=a.get(f),x=a.get(p),b=v===0,l=x===t.length-1,m=b&&l?"thru":b||l?"blind":"buried";i[m]+=1;let u=`${f}:${p}:${m}`,g=r.get(u);if(g){g.count+=1;continue}r.set(u,{startId:f,endId:p,startName:s.get(f)?.name||String(f),endName:s.get(p)?.name||String(p),startIndex:v,endIndex:x,type:m,count:1})}return{counts:i,spans:[...r.values()]}}var fa="http://www.w3.org/2000/svg";var Ef=new Set(["script","foreignobject","iframe","object","embed"]),kf=new Set(["href","xlink:href"]),If=1,Mf=18,Rf=8,os=class t{static create(e,a,s,r,n={}){return new t(e,a,s,r,n)}constructor(e,a,s,r,n){this.host=e,this.manifestUrl=a,this.manifest=s,this.featuresByPage=r||{},this.callbacks=n,this.activePage=null,this.activeSvgUrl="",this.container=null,this.svg=null,this.overlay=null,this.mountedPages=new Map,this.loadingPages=new Map,this.svgCache=new Map,this.serial=0,this.maxMountedWorldPages=If,this.maxCachedSvgPages=Mf,this.worldHandlersInstalled=!1,this.worldDrag=null,this.view={scale:1,tx:0,ty:0},this.drag=null,this.selected=null,this.highlightedNetUid="",this.index=Ai(),this.lastStats={mountedPages:0,domNodes:0,indexedFeatures:0,indexedNets:0,mountMs:0,coldMounts:0,warmMounts:0,highlightMs:0,selectionMs:0,cachedSvgPages:0,cachedSvgBytes:0,heapMb:null,fallbackReason:""}}get active(){return!!(this.container&&this.activePage)}get worldActive(){return this.mountedPages.size>0}stats(){return{...this.lastStats,activePage:this.activePage?.name||[...this.mountedPages.values()][0]?.page?.name||"-",mountedPages:this.active?1:this.mountedPages.size}}dispose(){this.unmountPage(),this.unmountWorldPages()}unmountPage(){this.container?.remove(),this.container=null,this.svg=null,this.overlay=null,this.activePage=null,this.activeSvgUrl="",this.index=Ai(),this.host.hidden=!0}unmountWorldPages(){for(let e of this.mountedPages.values())e.container.remove();this.mountedPages.clear(),this.loadingPages.clear(),this.active||(this.host.hidden=!0)}async preloadPages(e){let a=performance.now(),s=await Promise.allSettled((e||[]).slice(0,Rf).map(r=>this.loadSvgTemplate(r)));this.lastStats.preloadedPages=s.filter(r=>r.status==="fulfilled"&&r.value).length,this.lastStats.preloadMs=performance.now()-a,this.updateCacheStats()}syncWorldPages(e,a,s={}){if(!a)return;this.installWorldHandlers(a);let r=(e||[]).slice(0,s.maxMountedPages||this.maxMountedWorldPages),n=new Set(r.map(i=>i.id));for(let[i,o]of this.mountedPages)n.has(i)||(o.container.remove(),this.mountedPages.delete(i));for(let i of r){let o=this.mountedPages.get(i.id);if(o)o.lastUsed=++this.serial,this.positionWorldEntry(o,a);else if(!this.loadingPages.has(i.id)){let c=this.mountWorldPage(i).then(d=>{d&&n.has(i.id)?this.positionWorldEntry(d,a):d?.container.remove()}).finally(()=>this.loadingPages.delete(i.id));this.loadingPages.set(i.id,c)}}this.pruneMountedWorldPages(n),this.host.hidden=r.length===0&&!this.active,this.setSelection(this.selected),this.setHighlightedNet(s.activeNetUid??this.highlightedNetUid),this.lastStats.mountedPages=this.mountedPages.size,this.updateCacheStats()}async mountWorldPage(e){let a=performance.now(),s=this.hasCachedSvg(e),r=await this.loadImportedSvg(e);if(!r)return null;let n=document.createElement("div");n.className="svg-dom-page svg-dom-world-page",n.dataset.pageId=e.id,n.append(r),this.host.append(n);let i=Ri(r),o=Si(r),c=Mi(r,e,this.featuresByPage[e.id]||[]),d={page:e,container:n,svg:r,overlay:i,selectionOverlay:o,index:c,mountMs:performance.now()-a,lastUsed:++this.serial,warm:s};return this.mountedPages.set(e.id,d),this.lastStats={...this.lastStats,mountedPages:this.mountedPages.size,domNodes:[...this.mountedPages.values()].reduce((f,p)=>f+p.svg.querySelectorAll("*").length,0),indexedFeatures:[...this.mountedPages.values()].reduce((f,p)=>f+p.index.featureToElements.size,0),indexedNets:new Set([...this.mountedPages.values()].flatMap(f=>[...f.index.netToElements.keys()])).size,mountMs:d.mountMs,coldMounts:this.lastStats.coldMounts+(d.warm?0:1),warmMounts:this.lastStats.warmMounts+(d.warm?1:0),fallbackReason:""},this.updateCacheStats(),d}async loadImportedSvg(e){let a=await this.loadSvgTemplate(e);return a?a.cloneNode(!0):null}async loadSvgTemplate(e){let a=this.svgUrlForPage(e),s=this.svgCache.get(a);if(s?.template)return s.lastUsed=++this.serial,s.template;if(s?.promise)return s.promise;let r=performance.now(),n=(async()=>{let i=await fetch(a,{cache:"default"});if(!i.ok)return this.lastStats.fallbackReason=`Failed to load SVG page ${e.id}: ${i.status}`,this.callbacks.onFallback?.(this.lastStats.fallbackReason),null;let o=await i.text(),d=new DOMParser().parseFromString(o,"image/svg+xml"),f=d.documentElement;if(!f||f.localName.toLowerCase()!=="svg"||d.querySelector("parsererror"))return this.lastStats.fallbackReason=`Invalid SVG for page ${e.id}`,this.callbacks.onFallback?.(this.lastStats.fallbackReason),null;Sf(d,a,e.id);let p=document.importNode(f,!0);p.classList.add("svg-dom-page-svg"),Bf(p);let v=this.svgCache.get(a)||{};return Object.assign(v,{template:p,promise:null,pageId:e.id,byteLength:o.length*2,loadMs:performance.now()-r,lastUsed:++this.serial}),this.svgCache.set(a,v),this.pruneSvgCache(),this.updateCacheStats(),p})();return this.svgCache.set(a,{promise:n,pageId:e.id,byteLength:0,loadMs:0,lastUsed:++this.serial}),n}svgUrlForPage(e){return new URL(e.svg||e.thumbnail?.path,this.manifestUrl).toString()}positionWorldEntry(e,a){let{page:s,container:r}=e,[n,i]=a.worldToScreen(s.worldX,s.worldY),[o,c]=a.worldToScreen(s.worldX+s.widthMm,s.worldY+s.heightMm),d=Math.max(1,o-n),f=Math.max(1,c-i);r.style.transform=`translate3d(${n}px, ${i}px, 0)`,r.style.width=`${d}px`,r.style.height=`${f}px`}installWorldHandlers(e){if(this.worldHandlersInstalled)return;this.worldHandlersInstalled=!0;let a=this.host;a.oncontextmenu=s=>s.preventDefault(),a.onpointerdown=s=>{let r=s.button===0&&!s.shiftKey&&!!s.target.closest?.("text"),i=s.target.closest?.("[data-feature-key]")?null:this.featureAtEvent(s);this.worldDrag={pointerId:s.pointerId,startX:s.clientX,startY:s.clientY,lastX:s.clientX,lastY:s.clientY,button:s.button,moved:!1,pan:!r&&(s.button===0||s.button===1||s.shiftKey),allowTextSelection:r},r||a.setPointerCapture(s.pointerId)},a.onpointermove=s=>{if(!this.worldDrag||this.worldDrag.pointerId!==s.pointerId)return;let r=s.clientX-this.worldDrag.lastX,n=s.clientY-this.worldDrag.lastY;this.worldDrag.lastX=s.clientX,this.worldDrag.lastY=s.clientY,Math.hypot(s.clientX-this.worldDrag.startX,s.clientY-this.worldDrag.startY)>3&&(this.worldDrag.moved=!0),this.worldDrag.pan&&e.pan(r,n)},a.onpointerup=s=>{if(!this.worldDrag||this.worldDrag.pointerId!==s.pointerId)return;let r=this.worldDrag;if(this.worldDrag=null,r.allowTextSelection||a.releasePointerCapture(s.pointerId),r.button!==0||r.moved)return;let n=s.target.closest?.("[data-feature-key]");if(n)this.selectElement(n,s);else{let i=this.featureAtEvent(s);i?this.selectFeature(i.entry,i.feature,s):this.callbacks.onBlank?.()}},a.ondblclick=s=>{let r=s.target.closest?.("[data-feature-key]"),n=r?null:this.featureAtEvent(s),i=n?.entry||this.entryForPoint(s.clientX,s.clientY),o=r?this.selectionFromElement(r):n?this.selectionFromFeature(n.entry,n.feature):this.selected;_i(o)?this.callbacks.onOpenPage?.(o):o?.netUid?this.callbacks.onHighlightNet?.(o.netUid,o):!n&&i?.page&&this.callbacks.onOpenPage?.({kind:"page",pageId:i.page.id,page:i.page})},a.onwheel=s=>{s.preventDefault(),Math.abs(s.deltaX)>Math.abs(s.deltaY)*.65?e.pan(-s.deltaX,-s.deltaY):e.zoom(s.deltaY,s.clientX,s.clientY)}}async focusPage(e,a={}){if(!e)return!1;if(this.activePage?.id===e.id&&this.active)return a.frame!==!1&&this.fitPage(),!0;let s=performance.now(),r=await this.loadImportedSvg(e);if(!r)return!1;let n=document.createElement("div");return n.className="svg-dom-page",n.append(r),this.host.replaceChildren(n),this.host.hidden=!1,this.container=n,this.svg=r,this.activePage=e,this.activeSvgUrl=new URL(e.svg||e.thumbnail?.path,this.manifestUrl).toString(),this.overlay=Ri(r),this.selectionOverlay=Si(r),this.index=Mi(r,e,this.featuresByPage[e.id]||[]),this.installPageHandlers(),this.fitPage(),this.setSelection(this.selected),this.setHighlightedNet(this.highlightedNetUid),this.lastStats={...this.lastStats,mountedPages:1,domNodes:r.querySelectorAll("*").length,indexedFeatures:this.index.featureToElements.size,indexedNets:this.index.netToElements.size,mountMs:performance.now()-s,fallbackReason:""},this.updateCacheStats(),!0}installPageHandlers(){let e=this.host;e.oncontextmenu=a=>a.preventDefault(),e.onpointerdown=a=>{if(!this.active)return;let s=a.button===0&&!a.shiftKey&&!!a.target.closest?.("text"),r=a.target.closest?.("[data-feature-key]"),n=r?null:this.featureAtEvent(a);this.drag={pointerId:a.pointerId,startX:a.clientX,startY:a.clientY,lastX:a.clientX,lastY:a.clientY,button:a.button,moved:!1,pan:!s&&(a.button===0||a.button===1||a.shiftKey),featureElement:r,allowTextSelection:s},s||e.setPointerCapture(a.pointerId)},e.onpointermove=a=>{if(!this.drag||this.drag.pointerId!==a.pointerId)return;let s=a.clientX-this.drag.lastX,r=a.clientY-this.drag.lastY;this.drag.lastX=a.clientX,this.drag.lastY=a.clientY,Math.hypot(a.clientX-this.drag.startX,a.clientY-this.drag.startY)>3&&(this.drag.moved=!0),this.drag.pan&&(this.view.tx+=s,this.view.ty+=r,this.applyTransform())},e.onpointerup=a=>{if(!this.drag||this.drag.pointerId!==a.pointerId)return;let s=this.drag;if(this.drag=null,s.allowTextSelection||e.releasePointerCapture(a.pointerId),s.button!==0||s.moved)return;let r=a.target.closest?.("[data-feature-key]");if(r)this.selectElement(r,a);else{let n=this.featureAtEvent(a);n?this.selectFeature(n.entry,n.feature,a):this.callbacks.onBlank?.()}},e.ondblclick=a=>{let s=a.target.closest?.("[data-feature-key]"),r=s?null:this.featureAtEvent(a),n=s?this.selectionFromElement(s):r?this.selectionFromFeature(r.entry,r.feature):this.selected;_i(n)?this.callbacks.onOpenPage?.(n):n?.netUid?this.callbacks.onHighlightNet?.(n.netUid,n):!r&&this.activePage&&this.callbacks.onOpenPage?.({kind:"page",pageId:this.activePage.id,page:this.activePage})},e.onwheel=a=>{if(a.preventDefault(),!this.active)return;if(Math.abs(a.deltaX)>Math.abs(a.deltaY)*.65){this.view.tx-=a.deltaX,this.view.ty-=a.deltaY,this.applyTransform();return}let s=this.host.getBoundingClientRect(),r=a.clientX-s.left,n=a.clientY-s.top,i=this.screenToSvg(r,n),o=Math.exp(-a.deltaY*.0016);this.view.scale=ns(this.view.scale*o,.02,80),this.view.tx=r-i[0]*this.view.scale,this.view.ty=n-i[1]*this.view.scale,this.applyTransform()}}selectElement(e,a){let s=performance.now(),r=this.selectionFromElement(e);if(this.setSelection(r),a){let n=this.host.getBoundingClientRect();r.anchor={x:a.clientX-n.left,y:a.clientY-n.top}}this.callbacks.onSelect?.(r),this.lastStats.selectionMs=performance.now()-s}selectFeature(e,a,s){let r=performance.now(),n=this.selectionFromFeature(e,a);if(this.setSelection(n),s){let i=this.host.getBoundingClientRect();n.anchor={x:s.clientX-i.left,y:s.clientY-i.top}}this.callbacks.onSelect?.(n),this.lastStats.selectionMs=performance.now()-r}selectionFromElement(e){let a=e.dataset.featureKey||"",s=this.entryForElement(e),r=s.index.featureByKey.get(a)||{};return this.selectionFromFeature(s,r,e)}selectionFromFeature(e,a,s=null){let r=a?.stableKey||s?.dataset?.featureKey||"",n=e?.page||this.activePage,i=a?.kind||s?.dataset?.role||s?.dataset?.primitive||"feature",o=a?.netUid||s?.dataset?.netUid||"",c=a?.netName||s?.dataset?.netName||"";return i==="sheet"?{kind:"sheet",featureKey:r,sheetInstancePath:a?.sheetInstancePath||n?.sheetInstancePath||"",sourceId:a?.sourceId||s?.dataset?.sourceId||s?.dataset?.objectId||s?.dataset?.uuid||"",sheetName:a?.sheet_name||a?.sheetName||s?.dataset?.sheetName||a?.objectId||"",sheetFile:a?.sheet_file||a?.sheetFile||s?.dataset?.sheetFile||"",feature:a}:i==="pin"||i==="pin_body"||i==="pin_name"||i==="pin_number"||s?.dataset?.pin?{kind:"pin",featureKey:r,sheetInstancePath:a?.sheetInstancePath||n?.sheetInstancePath||"",sourceId:a?.sourceId||s?.dataset?.sourceId||s?.dataset?.objectId||s?.dataset?.uuid||"",symbolUuid:a?.symbolUuid||s?.dataset?.symbolUuid||"",reference:a?.reference||s?.dataset?.designator||s?.dataset?.component||s?.dataset?.ref||"",pinNumber:a?.pinNumber||s?.dataset?.pin||"",pinName:a?.pinName||"",netUid:o,netName:c,feature:a}:i==="symbol_body"||i==="symbol_instance"||i==="component"||s?.dataset?.ref?{kind:"component",featureKey:r,sheetInstancePath:a?.sheetInstancePath||n?.sheetInstancePath||"",sourceId:a?.sourceId||s?.dataset?.sourceId||s?.dataset?.objectId||s?.dataset?.uuid||"",symbolUuid:a?.symbolUuid||s?.dataset?.symbolUuid||"",reference:a?.reference||s?.dataset?.designator||s?.dataset?.component||s?.dataset?.ref||"",netUid:o,netName:c,feature:a}:{kind:o?"feature":i,featureKey:r,sheetInstancePath:a?.sheetInstancePath||n?.sheetInstancePath||"",sourceId:a?.sourceId||s?.dataset?.sourceId||s?.dataset?.objectId||s?.dataset?.uuid||"",role:i,netUid:o,netName:c,feature:a}}setSelection(e){this.selected=e||null;for(let s of this.host.querySelectorAll(".prism-svg-selected"))s.classList.remove("prism-svg-selected");for(let s of this.host.querySelectorAll("[data-prism-overlay='selection']"))s.replaceChildren();let a=e?.featureKey||"";if(a){for(let s of this.entries()){for(let r of s.index.featureToElements.get(a)||[])r.classList.add("prism-svg-selected");this.drawSelectionOverlay(s,e)}for(let s of this.index.featureToElements.get(a)||[])s.classList.add("prism-svg-selected");this.drawSelectionOverlay({page:this.activePage,index:this.index,selectionOverlay:this.selectionOverlay},e)}}setHighlightedNet(e){this.highlightedNetUid=e||"";let a=performance.now();for(let s of this.entries())this.updateEntryHighlight(s);if(!this.svg||!this.overlay){this.lastStats.highlightMs=performance.now()-a;return}this.updateEntryHighlight({svg:this.svg,overlay:this.overlay,index:this.index,page:this.activePage}),this.lastStats.highlightMs=performance.now()-a}updateEntryHighlight(e){if(!e?.svg||!e?.overlay||(e.overlay.replaceChildren(),!this.highlightedNetUid))return;let a=is(e.svg,e.page),s=document.createElementNS(fa,"rect");s.setAttribute("x",String(a[0])),s.setAttribute("y",String(a[1])),s.setAttribute("width",String(a[2])),s.setAttribute("height",String(a[3])),s.setAttribute("class","prism-svg-net-dimmer"),e.overlay.append(s);let n=(e.index.netToElements.get(this.highlightedNetUid)||[]).slice(0,2200);for(let i of n){let o=Cf(i);e.overlay.append(o)}}entries(){return[...this.mountedPages.values()]}entryForElement(e){let s=e.closest?.(".svg-dom-page")?.dataset.pageId||"";return this.mountedPages.get(s)||{page:this.activePage,index:this.index,svg:this.svg,overlay:this.overlay,selectionOverlay:this.selectionOverlay}}featureAtEvent(e){let a=this.entryForPoint(e.clientX,e.clientY);if(!a)return null;let s=this.clientToSvg(a,e.clientX,e.clientY);if(!s)return null;let r=Math.max(.18,5*Pf(a)),i=a.index.features.filter(o=>(o?.domBoundsMm||o?.boundsMm)&&Fi(o)).filter(o=>s[0]>=(o.domBoundsMm||o.boundsMm)[0]-r&&s[0]<=(o.domBoundsMm||o.boundsMm)[2]+r&&s[1]>=(o.domBoundsMm||o.boundsMm)[1]-r&&s[1]<=(o.domBoundsMm||o.boundsMm)[3]+r).map(o=>({feature:o,priority:Uf(o),area:Math.max(1e-4,((o.domBoundsMm||o.boundsMm)[2]-(o.domBoundsMm||o.boundsMm)[0])*((o.domBoundsMm||o.boundsMm)[3]-(o.domBoundsMm||o.boundsMm)[1]))})).sort((o,c)=>c.priority-o.priority||o.area-c.area)[0]?.feature;return i?{entry:a,feature:i,point:s}:null}entryForPoint(e,a){for(let s of[...this.entries()].reverse()){let r=s.container.getBoundingClientRect();if(e>=r.left&&e<=r.right&&a>=r.top&&a<=r.bottom)return s}if(this.container){let s=this.container.getBoundingClientRect();if(e>=s.left&&e<=s.right&&a>=s.top&&a<=s.bottom)return{page:this.activePage,container:this.container,svg:this.svg,index:this.index,selectionOverlay:this.selectionOverlay}}return null}clientToSvg(e,a,s){if(!e?.container||!e?.svg||!e?.page)return null;let r=e.container.getBoundingClientRect();if(!r.width||!r.height)return null;let n=is(e.svg,e.page);return[n[0]+(a-r.left)/r.width*n[2],n[1]+(s-r.top)/r.height*n[3]]}drawSelectionOverlay(e,a){if(!e?.selectionOverlay||!a?.featureKey)return;let s=e.index.featureByKey.get(a.featureKey),r=s?.domBoundsMm||s?.boundsMm;if(!r)return;let[n,i,o,c]=r,d=document.createElementNS(fa,"rect");d.setAttribute("x",String(n)),d.setAttribute("y",String(i)),d.setAttribute("width",String(Math.max(.001,o-n))),d.setAttribute("height",String(Math.max(.001,c-i))),d.setAttribute("rx","0.65"),d.setAttribute("ry","0.65"),d.setAttribute("class","prism-svg-selection-box"),e.selectionOverlay.append(d)}fitPage(){if(!this.svg||!this.activePage)return;let e=is(this.svg,this.activePage),a=e[2]||this.activePage.sourceWidthMm||this.activePage.widthMm||1,s=e[3]||this.activePage.sourceHeightMm||this.activePage.heightMm||1,r=this.host.getBoundingClientRect(),n=Math.min(r.width/a,r.height/s)*.92;this.view.scale=ns(n,.02,80),this.view.tx=(r.width-a*this.view.scale)/2-e[0]*this.view.scale,this.view.ty=(r.height-s*this.view.scale)/2-e[1]*this.view.scale,this.applyTransform()}frameSelection(e=this.selected){if(!e?.featureKey||!this.active){this.fitPage();return}let a=this.index.featureToElements.get(e.featureKey)||[],s=ji(a);if(!s)return;let r=this.host.getBoundingClientRect(),n=Math.max(1,s[2]-s[0]),i=Math.max(1,s[3]-s[1]),o=Math.min(r.width/n,r.height/i)*.36;this.view.scale=ns(o,.04,80),this.view.tx=r.width/2-(s[0]+s[2])/2*this.view.scale,this.view.ty=r.height/2-(s[1]+s[3])/2*this.view.scale,this.applyTransform()}pan(e,a){this.active&&(this.view.tx+=e,this.view.ty+=a,this.applyTransform())}zoom(e,a,s){if(!this.active)return;let r=this.host.getBoundingClientRect(),n=(a??r.left+r.width/2)-r.left,i=(s??r.top+r.height/2)-r.top,o=this.screenToSvg(n,i),c=Math.exp(-e*.0016);this.view.scale=ns(this.view.scale*c,.02,80),this.view.tx=n-o[0]*this.view.scale,this.view.ty=i-o[1]*this.view.scale,this.applyTransform()}screenToSvg(e,a){return[(e-this.view.tx)/Math.max(1e-6,this.view.scale),(a-this.view.ty)/Math.max(1e-6,this.view.scale)]}applyTransform(){this.container&&(this.container.style.transform=`translate3d(${this.view.tx}px, ${this.view.ty}px, 0) scale(${this.view.scale})`)}hasCachedSvg(e){return!!this.svgCache.get(this.svgUrlForPage(e))?.template}pruneMountedWorldPages(e=new Set){if(this.mountedPages.size<=this.maxMountedWorldPages)return;let a=[...this.mountedPages.entries()].filter(([s])=>!e.has(s)).sort((s,r)=>(s[1].lastUsed||0)-(r[1].lastUsed||0));for(let[s,r]of a){if(this.mountedPages.size<=this.maxMountedWorldPages)break;r.container.remove(),this.mountedPages.delete(s)}}pruneSvgCache(){let e=[...this.svgCache.entries()].filter(([,r])=>r?.template);if(e.length<=this.maxCachedSvgPages)return;let a=new Set([...this.mountedPages.values()].map(r=>this.svgUrlForPage(r.page)));this.activePage&&a.add(this.svgUrlForPage(this.activePage));let s=e.filter(([r])=>!a.has(r)).sort((r,n)=>(r[1].lastUsed||0)-(n[1].lastUsed||0));for(let[r]of s){if([...this.svgCache.values()].filter(n=>n?.template).length<=this.maxCachedSvgPages)break;this.svgCache.delete(r)}}updateCacheStats(){let e=[...this.svgCache.values()].filter(s=>s?.template);this.lastStats.cachedSvgPages=e.length,this.lastStats.cachedSvgBytes=e.reduce((s,r)=>s+(r.byteLength||0),0);let a=performance?.memory;this.lastStats.heapMb=a?.usedJSHeapSize?a.usedJSHeapSize/1048576:null}};function Sf(t,e,a){for(let n of[...t.querySelectorAll("*")]){if(Ef.has(n.localName.toLowerCase())){n.remove();continue}for(let i of[...n.attributes]){let o=i.name,c=o.toLowerCase(),d=i.value||"";if(c.startsWith("on")){n.removeAttribute(o);continue}if((c==="href"||c==="xlink:href"||c==="src")&&Bi(d)){if((c==="href"||c==="xlink:href")&&n.localName.toLowerCase()==="image"&&Kf(d))continue;n.removeAttribute(o);continue}c==="style"&&n.setAttribute(o,zf(d))}}let s=`prism-${fr(a)}-`,r=new Map;for(let n of t.querySelectorAll("[id]")){let i=n.getAttribute("id"),o=`${s}${fr(i)}`;r.set(i,o),n.setAttribute("id",o)}for(let n of t.querySelectorAll("*"))for(let i of[...n.attributes]){let o=i.name.toLowerCase(),c=i.value||"";kf.has(o)&&(c.startsWith("#")&&r.has(c.slice(1))?c=`#${r.get(c.slice(1))}`:Gf(c)&&(c=new URL(c,e).toString())),c=Vf(c,r),n.setAttribute(i.name,c)}}function Mi(t,e,a){let s=new Map,r=new Map,n=new Map,i=[];for(let f of a){let p=Nf(f,e);i.push(p),r.set(p.stableKey,p),n.set(Number(p.id||0),p);for(let v of jf(p))s.has(v)||s.set(v,[]),s.get(v).push(p)}let o=new Map,c=new Map,d=new Map;for(let f of i)d.set(f.stableKey,f);for(let f of t.querySelectorAll("[data-uuid], [data-element-key], [data-primitive], [data-ref], [data-pin], [data-object-id], [data-designator], [data-component]")){let p=Af(f,s,e);if(p&&!Fi(p)||!p&&!Lf(f))continue;let v=Ff(f,e),x=p?.stableKey||v,b=p?.netUid||"",l=p?.netName||"";f.classList.add("prism-feature"),f.dataset.featureKey=x,f.dataset.sourceId=p?.sourceId||f.dataset.uuid||f.dataset.elementKey||"",f.dataset.role=p?.kind||f.dataset.primitive||f.dataset.ref||"feature",p?.id&&(f.dataset.featureId=String(p.id)),b&&(f.dataset.netUid=b),l&&(f.dataset.netName=l),f.id||(f.id=`prism-feature-${fr(x)}`),Ni(o,x,f),d.set(x,p||{id:0,stableKey:x,kind:f.dataset.role,sourceId:f.dataset.sourceId,sheetInstancePath:e.sheetInstancePath||""}),b&&Ni(c,b,f)}for(let[f,p]of o){let v=d.get(f),x=ji(p);v&&x&&(v.domBoundsMm=Of(v.boundsMm,x))}return{featureToElements:o,netToElements:c,featureByKey:d,byId:n,bySource:s,features:i}}function Af(t,e,a){let r=[t.dataset.uuid,t.dataset.elementKey,t.dataset.sourceId,t.dataset.objectId,t.dataset.componentUid,t.dataset.componentUuid,t.dataset.ref&&`${t.dataset.ref}:${t.dataset.pin||""}`].filter(Boolean).flatMap(i=>e.get(i)||[]);if(!r.length)return null;let n=String(t.dataset.primitive||t.dataset.ref||t.dataset.pin||"").toLowerCase();return r.map(i=>({feature:i,score:_f(i,n,a)})).sort((i,o)=>o.score-i.score)[0].feature}function _f(t,e,a){let s=0,r=String(t.kind||"").toLowerCase();return t.sheetInstancePath===a.sheetInstancePath&&(s+=20),t.netUid&&(s+=4),e&&r.includes(e)&&(s+=8),e==="symbol"&&r==="symbol_body"&&(s+=12),(e==="label"||e==="port")&&(r.includes("label")||r.includes("port"))&&(s+=12),e==="sheet"&&r==="sheet"&&(s+=12),r!=="record"&&(s+=2),r.includes("pin")&&(s+=2),s}function Nf(t,e){let a=t.sourceId||t.sourceUid||t.uuid||t.objectId||t.stableKey||"";return{...t,id:Number(t.id||0),sourceId:a,stableKey:t.stableKey||`${e.sheetInstancePath||e.id}|${a}|0|${t.kind||"feature"}|0`,sheetInstancePath:t.sheetInstancePath||e.sheetInstancePath||""}}function jf(t){let e=new Set([t.sourceId,t.sourceUid,t.uuid,t.objectId,t.stableKey].filter(Boolean).map(String));return t.reference&&t.pinNumber&&e.add(`${t.reference}:${t.pinNumber}`),t.componentDesignator&&e.add(t.componentDesignator),t.reference&&e.add(t.reference),[...e]}function Ff(t,e){let a=t.dataset.uuid||t.dataset.elementKey||t.dataset.objectId||t.dataset.ref||t.id||"svg",s=t.dataset.primitive||t.dataset.role||t.localName||"feature";return`${e.sheetInstancePath||e.id}|${a}|0|${s}|0`}function Bf(t){let e=document.createElementNS(fa,"style");e.textContent=`
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
  `,t.prepend(e)}function Ri(t){let e=document.createElementNS(fa,"g");return e.setAttribute("class","prism-svg-net-overlay"),e.setAttribute("data-prism-overlay","net-highlight"),t.append(e),e}function Si(t){let e=document.createElementNS(fa,"g");return e.setAttribute("class","prism-svg-selection-overlay"),e.setAttribute("data-prism-overlay","selection"),e.style.pointerEvents="none",t.append(e),e}function Cf(t){let e=t.cloneNode(!0);e.removeAttribute("id"),e.removeAttribute("data-feature-key"),e.removeAttribute("data-net-uid"),e.removeAttribute("data-net-name"),e.classList.add("prism-svg-net-overlay-clone");for(let a of[e,...Array.from(e.querySelectorAll?.("*")||[])])a instanceof SVGElement&&(a.removeAttribute("filter"),a.style.pointerEvents="none",a.style.stroke="#18ef52",a.style.fill="none",a.style.opacity="0.98",a.style.vectorEffect="non-scaling-stroke");return e}function ji(t){let e=null;for(let a of t)if(a.getBBox)try{let s=a.getBBox(),r=[s.x,s.y,s.x+s.width,s.y+s.height];e=e?[Math.min(e[0],r[0]),Math.min(e[1],r[1]),Math.max(e[2],r[2]),Math.max(e[3],r[3])]:r}catch{}return e}function Of(t,e){return t?e?[Math.min(t[0],e[0]),Math.min(t[1],e[1]),Math.max(t[2],e[2]),Math.max(t[3],e[3])]:t:e}function is(t,e){let a=t.getAttribute("viewBox");if(a){let s=a.trim().split(/[\s,]+/).map(Number);if(s.length===4&&s.every(Number.isFinite))return s}return[0,0,e.sourceWidthMm||e.widthMm||1,e.sourceHeightMm||e.heightMm||1]}function Ai(){return{featureToElements:new Map,netToElements:new Map,featureByKey:new Map,byId:new Map,bySource:new Map,features:[]}}function Pf(t){let e=t?.container?.getBoundingClientRect?.();if(!t?.svg||!t?.page||!e?.width||!e?.height)return .1;let a=is(t.svg,t.page);return Math.max(a[2]/e.width,a[3]/e.height)}function Df(t){let e=String(t?.kind||"").toLowerCase(),a=String(t?.semanticRole||"").toLowerCase(),s=`${t?.sourceId||""} ${t?.objectId||""} ${t?.text||""}`.toLowerCase();return e.includes("page")||a.includes("page")||e.includes("background")||a.includes("background")||s.includes("background")||s.includes("sheet_header")||s.includes("sheet header")||s.includes("drawing-sheet")}function Uf(t){let e=String(t?.kind||t?.semanticRole||"").toLowerCase();return e.includes("pin")?90:e.includes("label")||e.includes("port")?78:e.includes("wire")||e.includes("bus")||e.includes("junction")?70:e.includes("symbol")||e.includes("component")?54:e.includes("image")?30:20}function Fi(t){if(!t||Df(t))return!1;let e=String(t.kind||t.semanticRole||"").toLowerCase();return["pin","label","port","wire","bus","junction","no_connect","symbol","component","sheet","image","text"].some(a=>e.includes(a))}function Lf(t){let e=`${t?.dataset?.primitive||""} ${t?.dataset?.ref||""} ${t?.dataset?.role||""} ${t?.dataset?.objectId||""} ${t?.dataset?.text||""}`.toLowerCase();return!e||e.includes("background")||e.includes("sheet_header")||e.includes("sheet header")||e.includes("drawing-sheet")?!1:["pin","label","port","wire","bus","junction","no_connect","symbol","component","sheet","image","text"].some(a=>e.includes(a))}function _i(t){return String(t?.kind||t?.feature?.kind||"").toLowerCase()==="sheet"}function Ni(t,e,a){t.has(e)||t.set(e,[]),t.get(e).push(a)}function Bi(t){let e=String(t||"").trim().toLowerCase();return!e||e.startsWith("#")?!1:e.startsWith("javascript:")||e.startsWith("data:")||e.startsWith("http://")||e.startsWith("https://")}function Kf(t){return/^data:image\/(?:png|jpe?g|gif|webp);base64,[a-z0-9+/=\s]+$/i.test(String(t||"").trim())}function Gf(t){let e=String(t||"").trim();return e&&!e.startsWith("#")&&!/^[a-z][a-z0-9+.-]*:/i.test(e)}function zf(t){return String(t||"").replace(/url\(([^)]+)\)/gi,(e,a)=>{let s=a.trim().replace(/^['"]|['"]$/g,"");return Bi(s)?"none":e})}function Vf(t,e){let a=String(t||"");return a=a.replace(/url\(#([^)]+)\)/g,(s,r)=>e.has(r)?`url(#${e.get(r)})`:s),a=a.replace(/^#(.+)$/,(s,r)=>e.has(r)?`#${e.get(r)}`:s),a}function fr(t){return String(t||"").trim().replace(/[^a-zA-Z0-9_-]+/g,"-").replace(/^-+|-+$/g,"").slice(0,96)||"item"}function ns(t,e,a){return Math.max(e,Math.min(a,t))}var Ci=512*1024*1024,Hf=.65,qf=120,Xf=12,Wf=48,Vi=230,Jf=40,Yf=4,Ie=window.__TOPOLOGY__||{},Me=window.__SEMANTIC_GEOMETRY__||{},hs={stage:"semantic-ready",progress:100},pr=document,kt,W,ke,bs,ps,gs,pa,Es,Xe,cs,ga,Ge,he,xe,ls,ms,ma,Ee,Z,ks,Is,Ae,Jt,Q=t=>pr.querySelector(t),Nt=t=>pr.querySelectorAll(t);function $f(t=document){pr=t,kt=Q("#app"),W=Q("#viewport"),ke=Q("#schematic-viewport"),bs=Q("#schematic-dom-layer"),ps=Q("#schematic-flow-overlay"),gs=Q("#bom-view"),pa=Q("#status")||{set textContent(e){}},Es=Q("#viewer-kind")||{set textContent(e){}},Xe=Q("#selection")||{set textContent(e){}},cs=Q("#diagnostics")||{set innerHTML(e){}},ga=Q("#scene-stats"),Ge=Q("#layers"),he=Q("#search-controls"),xe=Q("#view-controls"),Ae=Q("#stackup-workspace-view"),ls=Q("#fallback"),ms=Q("#panel-labels"),ma=Q("#schematic-labels"),Ee=Q("#axis-gizmo"),Z=Q("#selection-card"),ks=Q("#primary-heading"),Is=Q("#primary-description"),Jt=Q("#mode-switch"),kt.classList.add("workspace-pcb")}function Hi(){return{workspace:"pcb",mode:"3d",cameraTool:"orbit",compareLayers:new Set,desiredCompareLayers:new Set,visible3dLayers:new Set,activeNetId:0,highlightedNetIds:new Set,selectedFeatureId:0,selectedOccurrence:0,selectionAnchor:null,showBoard:!0,showComponents:!0,isolateNet:!1,hiddenComponents:new Set,savedShowBoard:!0,savedShowComponents:!0,preIsolation3dLayers:null,preIsolationCompareLayers:null,preIsolationShowBoard:null,separation:0,dragging:!1,dragMode:"orbit",lastX:0,lastY:0,pointerStartX:0,pointerStartY:0,loadedBytes:0,triangles:0,residentTileBytes:0,residentTileGpuBytes:0,residentTileTriangles:0,tileLoads:0,tileEvictions:0,tileSchedulerMs:0,lastTileScheduleAt:0,visibleTileIds:new Set,frameCpuMs:0,frameCpuP95Ms:0,frameIntervalMs:0,frameIntervalP95Ms:0,frameSamples:[],fps:0,frames:0,fpsAt:performance.now(),activeTab:"layers",selectedPageId:"",selectedSchematicFeature:null,schematicDragging:!1,schematicLastX:0,schematicLastY:0,schematicStartX:0,schematicStartY:0}}function qi(){return{manifest:null,manifestUrl:"",layers:[],copperLayers:[],nets:[],features:new Map,tiles:new Map,loaded:new Set,loading:new Map,failed:new Map,residentTiles:new Map,componentFeatures:new Map,componentModelCounts:new Map,componentTier:"idle",componentEntries:[],componentsWantedAt:0,componentEvictions:0,runtimeBounds:null,occurrenceBounds:null,layerZOffsets:new Float32Array(256),layerZOffsetSignature:""}}function Xi(){return{key:"",started:0,from:new Map,current:new Map}}function Wi(){return{phase:"idle",previous:new Set,target:new Set,previousOffsets:new Map,started:0}}function Ji(){return{manifest:null,manifestUrl:"",pages:[],byId:new Map,activeNetUid:"",visiblePages:[],fitted:!1,rendererMode:new URLSearchParams(location.search).get("schematicRenderer")||"svg-dom",domFallbackReason:""}}var h=Hi(),E=qi(),pe=Xi(),V=Wi(),O=Ji(),ys=[],jt=null,Ms=!1,Oi=1.5*1024*1024*1024,Qf=5e3,D,A,Y,ze,H,Ne,Ft=new Map,ba=performance.now(),Re=0,ds=0,gr=null,Yt=!1,mr=()=>!0,xs=!0;!window.__PRISM_SEMANTIC_VIEWER_MANUAL_BOOT__&&document.getElementById("app")&&yr().catch(t=>{console.error(t),pa&&(pa.textContent="Renderer failed"),ls&&(ls.hidden=!1,ls.textContent=t.stack||t.message||String(t))});function Zf(t){let e=new Map((t.components||[]).map(s=>[s.uid,s])),a={};for(let s of t.terminals||[]){let r=s.net_uid;if(!r)continue;let n=e.get(s.component_uid)||{},i={designator:s.designator||n.designator||"",pin:s.pin||"",value:n.value||"",pcb_pad_id:s.pcb_pad_id||""};a[r]||(a[r]={terminals:[]});let o=a[r].terminals;o.some(c=>c.designator===i.designator&&c.pin===i.pin)||o.push(i)}return a}function eh(t){if(!t||!Ie||!Ie.physical_objects)return 0;let e=Ie.physical_objects.find(s=>s.uid===t);if(!e||!e.source_ids||!e.source_ids.length)return 0;let a=e.source_ids[0];for(let[s,r]of E.features.entries())if(r.sourceUid===a)return s;return 0}function Yi(t){return!t||!Ie||!Ie.components?null:Ie.components.find(e=>e.designator===t)}function ha(t,e){for(let a of Object.keys(t))delete t[a];Object.assign(t,e)}function $i(){ds&&(cancelAnimationFrame(ds),ds=0),window.removeEventListener("keydown",Mo),D?.dispose?.(),D=null,A=null,Y?.dispose?.(),Y=null,ze=null,gr=null,mr=()=>!0,xs=!0}function th(){return Re+=1,$i(),ha(h,Hi()),ha(E,qi()),ha(pe,Xi()),ha(V,Wi()),ha(O,Ji()),ys=[],H=null,Ne=null,Ft=new Map,ba=performance.now(),Re}function ah(t){t===Re&&(Re+=1,$i())}function br(t){t===Re&&(ds=requestAnimationFrame(e=>Eh(e,t)))}function ye(t){return t===Re}async function yr(t={}){let e=th(),a={};if(Ie=t.topology||window.__TOPOLOGY__||{},Ie&&!Ie.net_details&&(Ie.net_details=Zf(Ie)),Me=t.semanticGeometry||window.__SEMANTIC_GEOMETRY__||{},hs=t.readiness||Me.readiness||{stage:"semantic-ready",progress:100},gr=typeof t.onSelectionChange=="function"?t.onSelectionChange:null,mr=typeof t.isActive=="function"?t.isActive:()=>!0,xs=t.workspaceScope!=="3d",jt=t.assetCache||null,Ms=!!t.deferComponents,h.gpuBudgetBytes=Oi,$f(t.root||document),!kt||!W)throw new Error("Semantic viewer shell is missing required DOM nodes");return await nh(e,a,t.onPerformanceEvent),{performance:a,setSelection(s){Yt=!0;try{if(s?.occurrence!=null&&sh(s.occurrence),!s)It();else if(s?.netName||s?.netUid){let r=s.netUid&&E.nets.find(n=>n.uid===s.netUid)||s.netName&&aa(E.nets,s.netName);r&&vs(Number(r.id),!0)}else s?.netId?vs(Number(s.netId),!0):s?.featureId?Qt(Number(s.featureId),!0):s?.reference&&Er(String(s.reference),!0)}finally{Yt=!1}},resize(){D?.resize(),A?.resize(),h.workspace==="pcb"&&h.mode==="layer"&&Tr()},setWorkspace(s){let r=s==="stackup"?"stackup":"pcb";h.workspace!==r&&Eo(r)},setHiddenComponents(s){return To(s)},setHighlightedNets(s){return rh(s)},setOccurrences(s){return vh(s)},setStatsOverlay(s){lo(s)},stats(){return co()},setLodOverride(s){D?.setLodOverride(s)},setGpuBudget(s){let r=Number(s);h.gpuBudgetBytes=Number.isFinite(r)&&r>0?r:Oi,h.tiersCheckedAt=0},pickAt(s,r){return Wh(s,r)},projectComponent(s,r){return Yh(s,r)},projectPoint(s,r){return Io(s,r)},dispose(){ah(e)}}}function Rs(t){if(Yt)return;let e=D&&!D.identityOnly?D.occurrenceKeys[h.selectedOccurrence]:null;gr?.(t&&e!=null?{...t,occurrence:e}:t)}function sh(t){let e=D?.occurrenceKeys.indexOf(String(t))??-1;e>=0&&(h.selectedOccurrence=e)}function xr(t){if(!t||!D||D.identityOnly)return t;let e=D.occurrenceMatrices[h.selectedOccurrence];return e?Vt(e,t):t}function Qi(t,e=null){return t?{kind:"net",sourceContext:"3D",netName:String(t.name||""),netUid:String(t.uid||"")||void 0,netCode:Number(t.id||0)||void 0,featureId:Number(e?.id||0)||void 0,uuid:String(e?.sourceUid||"")||void 0}:null}function Zi(t){if(!t)return null;let e=xa(t),a=String(t.padNumber||t.pin||t.pinNumber||""),s=E.nets.find(r=>Number(r.id)===Number(t.netId||0));if(e&&a)return{kind:"terminal",sourceContext:"3D",reference:e,pin:a,netUid:s?.uid,netName:s?.name,netCode:s?Number(s.id):void 0,uuid:String(t.sourceUid||"")||void 0,featureId:Number(t.id||0)||void 0};if(e){let r=Yi(e);return{kind:"component",sourceContext:"3D",reference:e,componentUid:r?.uid,uuid:String(t.sourceUid||"")||void 0,featureId:Number(t.id||0)||void 0}}return Qi(s,t)}function eo(){h.showBoard=!0,h.showComponents=!0,Ta(),typeof Oe=="function"&&Oe()}function Ze(){let t=new Set(h.highlightedNetIds);return h.activeNetId&&t.add(Number(h.activeNetId)),t}function rh(t){let e=Array.isArray(t)?t:[],a=Dr(E.nets,e),s=Ze().size>0;h.highlightedNetIds=a,D?.setEmphasizedNetIds(a);let r=Ze().size>0;return r&&!s?vr():!r&&s&&to(),h.isolateNet&&r&&Ea(),ge(performance.now(),{force:!0}),{applied:a.size,requested:e.length}}function vr(){(h.showBoard||h.showComponents)&&(h.savedShowBoard=h.showBoard,h.savedShowComponents=h.showComponents),h.showBoard=!1,h.showComponents=!1,Ta(),typeof Oe=="function"&&Oe()}function to(){h.showBoard=h.savedShowBoard!==!1,h.showComponents=h.savedShowComponents!==!1,Ta(),typeof Oe=="function"&&Oe()}async function nh(t,e={},a=null){let s=performance.now(),r=Me.assets?.scene_manifest||Me.semantic_gltf?.path,n=performance.now();if(r){if(E.manifestUrl=new URL(r,location.href).toString(),E.manifest=await ch(E.manifestUrl),e.scene_manifest_fetch_parse_ms=performance.now()-n,!ye(t))return;if(E.manifest.schema!=="prism.semantic_gltf_a0")throw new Error(`Unsupported scene schema: ${E.manifest.schema}`)}else E.manifest={schema:"prism.semantic_gltf_partial.a0",bbox:null,layers:[],nets:[],objectFeatures:[],components:[],tiles:[],barrels:[]},e.scene_manifest_fetch_parse_ms=0;n=performance.now(),E.layers=E.manifest.layers||[],E.copperLayers=E.layers.filter(d=>d.role==="copper"||String(d.name).endsWith(".Cu")),E.nets=E.manifest.nets||[];for(let d of E.manifest.objectFeatures||[])E.features.set(Number(d.id),{...d,bounds:ja(d.boundsMm)});for(let d of E.manifest.components||[])E.componentFeatures.set(d.designator,d),E.features.set(Number(d.featureId),{...d,kind:"component",sourceUid:d.uid,netId:0,bounds:null});for(let d of E.manifest.tiles||[])E.tiles.set(d.id,d);e.scene_manifest_index_ms=performance.now()-n;let i=so();for(let d of i)h.compareLayers.add(d),h.desiredCompareLayers.add(d);for(let d of E.copperLayers)h.visible3dLayers.add(Number(d.id));if(n=performance.now(),D=await _t.create(W),e.webgpu_renderer_create_ms=performance.now()-n,!ye(t)){D?.dispose?.(),D=null;return}D.setBarrels(E.manifest.barrels||[]),n=performance.now();let o=await mh(t);if(e.board_fetch_parse_upload_ms=performance.now()-n,!ye(t)||(E.runtimeBounds=o||Lt(E.manifest.bbox),H=new Pt(E.runtimeBounds),xs&&(await ih(t),!ye(t)||(await oh(t),!ye(t)))))return;n=performance.now(),go(),Vh(),xs&&(Xh(),qh()),Dh(),Qh(),e.controls_and_bindings_ms=performance.now()-n;let c={"board-ready":"Board ready \xB7 components and semantic layers are still generating","components-ready":"Board and components ready \xB7 semantic layers are still generating","semantic-ready":"WebGPU semantic glTF active"};if(pa.textContent=c[hs.stage]||"Loading 3D assets",Me.assets?.components_glb&&!Ms){let d=performance.now();fo(t).then(()=>{ye(t)&&a?.({schema:"prism.semantic_viewer_performance.a0",milestone:"components-loaded",readiness_stage:hs.stage,elapsed_ms:performance.now()-d,bytes_loaded:h.loadedBytes})})}ge(performance.now(),{force:!0}),br(t),n=performance.now(),await new Promise(d=>requestAnimationFrame(d)),e.first_frame_wait_ms=performance.now()-n,e.boot_total_ms=performance.now()-s}async function ih(t=Re){let e=Me.assets?.schematic_native_manifest||Me.schematic_vector?.path||Me.schematic_scene?.path,a=Me.assets?.schematic_manifest||Me.schematic_world?.path,s=Q("[data-workspace=schematic]");if(!e&&!a){s.disabled=!0,s.title="No schematic world assets are available";return}let r=[e,a].filter(Boolean),n=null;for(let o of r)try{O.manifestUrl=new URL(o,location.href).toString();let c=await rs.create(ke,O.manifestUrl);if(!ye(t))return;A=c,A.setFlowOverlayCanvas(ps);break}catch(c){if(n=c,A=null,o===a)throw c}if(!A)throw n||new Error("Failed to load schematic viewer assets");O.manifest=A.manifest,O.pages=A.pages,O.byId=new Map(O.pages.map(o=>[o.id,o])),h.selectedPageId=O.pages[0]?.id||"",A.selectedPageId=h.selectedPageId,!["native","legacy","webgpu"].includes(String(O.rendererMode).toLowerCase())&&(Y=os.create(bs,O.manifestUrl,O.manifest,A.featuresByPage,{onSelect:Fh,onBlank:wa,onHighlightNet:yo,onOpenPage:Nh,onFallback:o=>{O.domFallbackReason=o,console.warn(o)}}),Y.preloadPages(O.pages)),A.preloadOverview()}async function oh(t=Re){let e=Me.assets?.bom||Me.bom?.path,a=Q("[data-workspace=bom]");if(!e){a&&(a.disabled=!0,a.title="No BoM artifact is available");return}try{let s=await Na.create(gs,new URL(e,location.href).toString(),{onSelectReference:r=>Er(r,!0)});if(!ye(t))return;ze=s}catch(s){if(!ye(t))return;console.warn(s),a&&(a.disabled=!0,a.title=s?.message||"BoM artifact could not be loaded")}}async function ch(t){if(jt)return jt.fetchJson(String(t));let e=await fetch(t,{cache:"default"});if(!e.ok)throw new Error(`Failed to load ${t}: ${e.status}`);return e.json()}async function lh(t,e=Re){if(!ye(e))return;let a=E.residentTiles.get(t.id);if(a){a.lastUsed=performance.now();return}if(E.failed.get(t.id))return;if(E.loading.has(t.id))return E.loading.get(t.id);let r=(async()=>{try{let n=await $e(new URL(t.path,E.manifestUrl).toString(),{fetchBytes:wr(),fetchCache:"no-store"});if(!ye(e)||!D)return;h.loadedBytes+=n.byteLength;let i=E.layers.find(p=>Number(p.id)===Number(t.layerId)),o=[],c=0,d=0;for(let p of n.primitives){let v=D.addPrimitive(p,{kind:"copper",tileId:t.id,layerId:Number(t.layerId),innerCopper:yh(Number(t.layerId)),color:ho(i),baseZ:Number(i?.z_mm||0)/1e3,material:{baseColor:[1,1,1,1],metallic:.78,roughness:.32}});o.push(v),c+=p.indices.length/3,d+=dh(p)}let f={tile:t,entries:o,byteLength:n.byteLength,gpuBytes:d,triangles:c,lastUsed:performance.now(),pinned:!1};E.residentTiles.set(t.id,f),E.loaded.add(t.id),h.tileLoads+=1,h.residentTileBytes+=n.byteLength,h.residentTileGpuBytes+=d,h.residentTileTriangles+=c,h.triangles=h.residentTileTriangles,E.failed.delete(t.id)}catch(n){if(!ye(e))return;let i=E.failed.get(t.id)||{count:0,message:""};E.failed.set(t.id,{count:i.count+1,message:n?.message||String(n)}),i.count||console.warn(`Failed to load tile ${t.id}; suppressing retries until assets are regenerated`,n)}finally{ye(e)&&E.loading.delete(t.id)}})();return E.loading.set(t.id,r),r}function dh(t){return t.position.length/3*Jf+t.indices.length*Yf}function uh(t){let e=E.residentTiles.get(t);e&&(D.removeEntries(e.entries),E.residentTiles.delete(t),E.loaded.delete(t),h.residentTileBytes=Math.max(0,h.residentTileBytes-e.byteLength),h.residentTileGpuBytes=Math.max(0,h.residentTileGpuBytes-e.gpuBytes),h.residentTileTriangles=Math.max(0,h.residentTileTriangles-e.triangles),h.triangles=h.residentTileTriangles,h.tileEvictions+=1)}function ge(t=performance.now(),e={}){if(!D||!H||h.workspace!=="pcb")return;let a=h.mode==="layer"&&V.phase==="preload";if(!e.force&&!a&&t-h.lastTileScheduleAt<qf)return;let s=performance.now();h.lastTileScheduleAt=t;let r=fh();h.visibleTileIds=r;let n=E.loading.size,o=Math.max(0,(a?Wf:Xf)-n),c=[...r].map(f=>E.tiles.get(f)).filter(f=>f&&!E.residentTiles.has(f.id)&&!E.loading.has(f.id)&&!E.failed.has(f.id)).sort((f,p)=>Di(f)-Di(p)).slice(0,o),d=Re;for(let f of c)lh(f,d);for(let f of r){let p=E.residentTiles.get(f);p&&(p.lastUsed=t)}no(r),h.tileSchedulerMs=performance.now()-s}function fh(){let t=new Set,e=h.mode==="3d"?h.visible3dLayers:hh();if(!e.size||!Ne)return t;if(h.mode==="layer"){for(let r of E.tiles.values())e.has(Number(r.layerId))&&t.add(r.id);return t}let a=new Set,s=Ze();if(s.size){for(let r of E.tiles.values())if(e.has(Number(r.layerId))){for(let n of s)if(oo(r,n)){a.add(r.id);break}}}for(let r of E.tiles.values()){if(!e.has(Number(r.layerId)))continue;let n=h.mode==="layer"?Ft.get(Number(r.layerId)):null;ph(r,Ne.matrix,n,Hf)&&t.add(r.id)}for(let r of a)t.add(r);return t}function hh(){return h.mode!=="layer"||V.phase==="idle"?h.compareLayers:ro(V.previous,V.target)}function ao(){return h.mode!=="layer"?h.visible3dLayers:V.phase==="reveal"?ro(V.previous,V.target):h.compareLayers}function so(){let t=E.copperLayers.map(e=>Number(e.id)).filter(Number.isFinite);return t.length?t.length===1?new Set([t[0]]):new Set([t[0],t[t.length-1]]):new Set}function bh(){let t=h.desiredCompareLayers.size?h.desiredCompareLayers:h.compareLayers;return t.size?new Set([...t].map(Number)):so()}function ro(...t){let e=new Set;for(let a of t)for(let s of a||[])e.add(Number(s));return e}function no(t,e=Ci){if(h.mode==="layer")return;let a=Math.min(Ci,e);if(h.residentTileGpuBytes<=a)return;let s=[...E.residentTiles.values()].filter(r=>!t.has(r.tile.id)&&!E.loading.has(r.tile.id)).sort((r,n)=>r.lastUsed-n.lastUsed);for(let r of s){if(h.residentTileGpuBytes<=a)break;uh(r.tile.id)}}function ph(t,e,a=null,s=0){let r=io(t);if(!r)return!0;let n=Math.max(r[3]-r[0],r[4]-r[1])*s,i=[r[0]-n+(a?.[0]||0),r[1]-n+(a?.[1]||0),r[2]-.002,r[3]+n+(a?.[0]||0),r[4]+n+(a?.[1]||0),r[5]+.002],o=D?.occurrenceMatrices;return!o||o.length===1&&ca(o[0])?Pi(i,e):o.some(c=>Pi(i,_a(e,c)))}function io(t){let e=t.boundsMm;if(!e||e.length!==4)return null;let a=E.layers.find(r=>Number(r.id)===Number(t.layerId)),s=Number(a?.z_mm||0)/1e3;return[e[0]/1e3,-e[3]/1e3,s-4e-4,e[2]/1e3,-e[1]/1e3,s+4e-4]}function Pi(t,e){let a=[[t[0],t[1],t[2]],[t[3],t[1],t[2]],[t[0],t[4],t[2]],[t[3],t[4],t[2]],[t[0],t[1],t[5]],[t[3],t[1],t[5]],[t[0],t[4],t[5]],[t[3],t[4],t[5]]].map(r=>gh(e,r));return![r=>r[0]<-r[3],r=>r[0]>r[3],r=>r[1]<-r[3],r=>r[1]>r[3],r=>r[2]<0,r=>r[2]>r[3]].some(r=>a.every(r))}function gh(t,e){let a=e[0],s=e[1],r=e[2];return[t[0]*a+t[4]*s+t[8]*r+t[12],t[1]*a+t[5]*s+t[9]*r+t[13],t[2]*a+t[6]*s+t[10]*r+t[14],t[3]*a+t[7]*s+t[11]*r+t[15]]}function oo(t,e){return Array.isArray(t.netIds)&&t.netIds.some(a=>Number(a)===Number(e))}function Di(t){let e=io(t);if(!e||!H)return 0;let a=(e[0]+e[3])*.5-H.focus[0],s=(e[1]+e[4])*.5-H.focus[1];return a*a+s*s}async function mh(t=Re){let e=Me.assets?.base_board_glb;if(!e)return null;let a=await $e(new URL(e,location.href).toString(),{defaultFeatureId:0,fetchBytes:wr()});if(!ye(t)||!D)return null;h.loadedBytes+=a.byteLength;let s=a.primitives.filter(r=>Dt(r)!=="pad");for(let r of Ut(s,Dt))D.addPrimitive(r,{kind:"board",boardRole:r.groupKey,layerId:0,material:r.material,color:r.material.baseColor});return ta(s.map(r=>r.bounds))}function $t(){return E.occurrenceBounds||E.runtimeBounds||Lt(E.manifest?.bbox)}function yh(t){return Ba(t,E.copperLayers)}function xh(t,e){let{back:a}=H.basis();return{eye:at(H.focus,We(a,H.distance)),orthographic:e,pixelScale:e?t/Math.max(1e-9,H.orthoScale):t/2/Math.tan(H.fov/2)}}function co(){let t=D?.cullCounts||{full:0,board:0,box:0,culled:0},e=!D||D.identityOnly;return{occurrences:D?.occurrenceMatrices.length||0,lod:e?{full:1,board:0,box:0,culled:0}:{...t},triangles:D?.frameStats.triangles||0,draws:D?.frameStats.draws||0,gpuMemoryBytes:D?.gpuMemoryBytes()||0,gpuBudgetBytes:h.gpuBudgetBytes,componentTier:E.componentTier,componentEvictions:E.componentEvictions,tileEvictions:h.tileEvictions,cache:jt?jt.summary():{enabled:!1},frameIntervalMs:h.frameIntervalMs,frameIntervalP95Ms:h.frameIntervalP95Ms,frameCpuMs:h.frameCpuMs,frameCpuP95Ms:h.frameCpuP95Ms,fps:h.fps}}function lo(t){h.showStats=!!t,ga&&(ga.hidden=!h.showStats),uo()}function uo(){if(!ga||!h.showStats)return;let t=co(),{full:e,board:a,box:s,culled:r}=t.lod,n=[["Occurrences",`${t.occurrences} (${e+a+s} visible)`],["Detail",`${e} full \xB7 ${a} board \xB7 ${s} box \xB7 ${r} culled`],["Triangles",t.triangles.toLocaleString()],["Draws",t.draws.toLocaleString()],["GPU memory",`${(t.gpuMemoryBytes/1048576).toFixed(1)} / ${(t.gpuBudgetBytes/1048576).toFixed(0)} MB`],["Components",`${t.componentTier}${t.componentEvictions?` \xB7 ${t.componentEvictions} evicted`:""}`],["Cache",t.cache.enabled?`${t.cache.hits} hits \xB7 ${t.cache.misses} misses \xB7 ${(t.cache.bytes/1048576).toFixed(0)} MB`:"off"],["Frame",`${t.frameIntervalMs.toFixed(1)} ms \xB7 p95 ${t.frameIntervalP95Ms.toFixed(1)}`],["CPU",`${t.frameCpuMs.toFixed(2)} ms \xB7 p95 ${t.frameCpuP95Ms.toFixed(2)}`],["FPS",t.fps.toFixed(0)]];ga.innerHTML=n.map(([i,o])=>`<dt>${i}</dt><dd>${o}</dd>`).join("")}function vh(t){if(!D)return;D.setOccurrences(t),t==null&&(Ms=!1),h.selectedOccurrence>=D.occurrenceMatrices.length&&(h.selectedOccurrence=0);let e=E.runtimeBounds||Lt(E.manifest?.bbox);D.setBoardBounds(e),E.occurrenceBounds=t==null?null:Gn(D.occurrenceMatrices,e);let a=$t();H&&a&&(H.sceneRadius=Rt(a),H.frame(a),!h.occurrencesFramed&&t!=null&&(H.snap(),h.occurrencesFramed=!0)),ge(performance.now(),{force:!0})}async function fo(t=Re){let e=Me.assets?.components_glb;if(!e||E.componentTier!=="idle")return;E.componentTier="loading";let a;try{a=await $e(new URL(e,location.href).toString(),{componentFeatures:E.componentFeatures,fetchBytes:wr()})}catch(s){throw ye(t)&&(E.componentTier="idle"),s}if(!(!ye(t)||!D)){E.componentTier="loaded",h.loadedBytes+=a.byteLength;for(let s of a.primitives){let r=E.componentFeatures.get(s.designator);r&&Th(r.featureId,s.position)}for(let[s,r]of a.componentNodeCounts||[])E.componentModelCounts.set(s,r);h.hiddenComponentRequest&&To(h.hiddenComponentRequest),E.componentEntries=Ut(a.primitives).map(s=>D.addPrimitive(s,{kind:"component",layerId:0,material:s.material,color:s.material.baseColor}))}}function wr(){return jt?t=>jt.fetchBytes(t):void 0}function wh(t){if(!D||t-(h.tiersCheckedAt||0)<250)return;h.tiersCheckedAt=t;let e=D.identityOnly&&!Ms||!D.identityOnly&&D.cullCounts.full>0;e&&(E.componentsWantedAt=t),e&&E.componentTier==="idle"&&Me.assets?.components_glb&&fo(Re).catch(a=>console.warn("Failed to load components",a)),h.gpuBytes=D.gpuMemoryBytes(),!(h.gpuBytes<=h.gpuBudgetBytes)&&(E.componentTier==="loaded"&&t-E.componentsWantedAt>Qf&&(D.removeEntries(E.componentEntries),E.componentEntries=[],E.componentTier="idle",E.componentEvictions+=1,h.gpuBytes=D.gpuMemoryBytes()),h.gpuBytes>h.gpuBudgetBytes&&no(h.visibleTileIds||new Set,Math.max(0,h.residentTileGpuBytes-(h.gpuBytes-h.gpuBudgetBytes))))}function Th(t,e){let a=E.features.get(Number(t));if(!a||!e.length)return;let s=[1/0,1/0,1/0,-1/0,-1/0,-1/0];for(let r=0;r<e.length;r+=3)s[0]=Math.min(s[0],e[r]),s[1]=Math.min(s[1],e[r+1]),s[2]=Math.min(s[2],e[r+2]),s[3]=Math.max(s[3],e[r]),s[4]=Math.max(s[4],e[r+1]),s[5]=Math.max(s[5],e[r+2]);a.bounds=a.bounds?[Math.min(a.bounds[0],s[0]),Math.min(a.bounds[1],s[1]),Math.min(a.bounds[2],s[2]),Math.max(a.bounds[3],s[3]),Math.max(a.bounds[4],s[4]),Math.max(a.bounds[5],s[5])]:s}function ho(t){return Fa(t,E.copperLayers)}function Eh(t,e=Re){if(e!==Re||!D||!H)return;let a=performance.now(),s=Math.max(0,t-ba);if(h.workspace==="schematic"&&A){ba=t;let c=A.visiblePages(),d=Y?Ih(c):[];A.setDomDetailPageIds(d.map(f=>f.id)),O.visiblePages=A.render(),Y?.syncWorldPages(d,A,{activeNetUid:O.activeNetUid}),Ro(),Ki(s,performance.now()-a),zi(t),br(e);return}let r=Math.min(.05,(t-ba)/1e3);ba=t,H.update(r),D.resize();let n=bo();for(let c of D.entries)c.layerOffset=n[c.layerId]||0;Mh(t),Ft=po(t);let i=Sh(t);Ne={layerId:0,viewport:{x:0,y:0,width:W.width,height:W.height},matrix:H.matrix(W.width,W.height,h.mode==="layer"),lod:xh(W.height,h.mode==="layer")},D.selectedOccurrence=h.selectedFeatureId||h.activeNetId?h.selectedOccurrence:-1,D.setInnerCopperAtFull(h.showBoard&&h.separation<=.001&&!Ze().size),ge(t);let o=h.mode==="3d"?h.visible3dLayers:ao();D.render({panels:[Ne],activeNetId:h.activeNetId,selectedFeatureId:h.selectedFeatureId,time:t/1e3,layerOffsets:n,visibleLayers:o,showBoard:h.showBoard,showComponents:h.showComponents,componentOpacity:ie(1-h.separation/.1,0,1),boardOpacity:Ze().size?.34:1-h.separation*.72,isolateNet:h.isolateNet,compareMode:h.mode==="layer",compareOffsets:Ft,layerAlphas:i,visibleTileIds:h.mode==="3d"?h.visibleTileIds:null}),$h(),wh(t),Zh(),Ki(s,performance.now()-a),zi(t),br(e)}function kh(t){if(!A||!t)return{widthPx:0,heightPx:0,sourcePxPerMm:0,area:0};let e=A.pagePixelWidth(t),a=t.heightMm/Math.max(1e-6,A.scale),s=A.pageSourcePixelsPerMm(t);return{widthPx:e,heightPx:a,sourcePxPerMm:s,area:e*a}}function Ih(t){if(!Y||!A)return[];let e=t||[],a=Math.max(1,ke.clientWidth*ke.clientHeight);return e.map(n=>({page:n,...kh(n)})).filter(n=>n.widthPx>=760&&n.heightPx>=520&&n.area>=a*.36&&n.sourcePxPerMm>=1.25).sort((n,i)=>i.area-n.area).slice(0,1).map(n=>n.page)}function bo(){let t=$t(),e=Math.hypot((t[3]-t[0])*1e3,(t[4]-t[1])*1e3),a=h.separation*h.separation*ie(e*.12,8,25)/1e3,s=`${h.separation}:${a}:${E.copperLayers.length}`;if(E.layerZOffsetSignature===s)return E.layerZOffsets;let r=E.layerZOffsets;r.fill(0);let n=(E.copperLayers.length-1)/2;return E.copperLayers.forEach((i,o)=>{r[Number(i.id)]=(n-o)*a}),E.layerZOffsetSignature=s,r}function po(t){if(h.mode!=="layer")return pe.key="3d",pe.current.clear(),new Map;let e=E.copperLayers.filter(m=>h.compareLayers.has(Number(m.id))),a=Math.max(1,e.length),s=W.width/Math.max(1,W.height),r=1;a===2?r=s>=1?2:1:a===3||a===4?r=2:a>4&&(r=Math.ceil(Math.sqrt(a*s)));let n=Math.ceil(a/r),i=$t(),o=i[3]-i[0],c=i[4]-i[1],d=o*1.18,f=c*1.22,p=e.map((m,u)=>{let g=u%r,y=Math.floor(u/r);return{layer:m,layerId:Number(m.id),column:g,row:y,offset:[(g-(r-1)/2)*d,((n-1)/2-y)*f,0]}}),v=`${r}x${n}:${p.map(m=>m.layerId).join(",")}`;if(v!==pe.key){pe.key=v,pe.started=t,pe.from=new Map(pe.current);let m=r*o+(r-1)*(d-o),u=n*c+(n-1)*(f-c);H.targetFocus=[(i[0]+i[3])/2,(i[1]+i[4])/2,(i[2]+i[5])/2],H.targetOrthoScale=Math.max(u,m/s)*1.08}let x=ie((t-pe.started)/420,0,1),b=1-Math.pow(1-x,3),l=new Map;for(let m of p){let u=pe.from.get(m.layerId)||[0,0,0],g=m.offset.map((y,w)=>u[w]+(y-u[w])*b);l.set(m.layerId,g),pe.current.set(m.layerId,g)}if(V.phase==="reveal")for(let m of V.previous)l.has(Number(m))||l.set(Number(m),V.previousOffsets.get(Number(m))||[0,0,0]);for(let m of[...pe.current.keys()])p.some(u=>u.layerId===m)||pe.current.delete(m);return l}function va(t){let e=new Set([...t].map(Number));if(!(Ui(e,h.desiredCompareLayers)&&V.phase!=="idle")){if(h.desiredCompareLayers=e,Ui(e,h.compareLayers)){V.phase="idle",V.previous.clear(),V.target.clear();return}V.phase="preload",V.previous=new Set(h.compareLayers),V.target=new Set(e),V.previousOffsets=new Map(pe.current),V.started=performance.now(),ge(V.started,{force:!0})}}function Tr({snap:t=!0}={}){h.mode="layer";let e=bh();h.desiredCompareLayers=new Set(e),!h.compareLayers.size&&e.size&&(h.compareLayers=new Set(e)),V.phase="idle",V.previous.clear(),V.target.clear(),pe.key="",H.setAxis("z",!1),D?.resize(),Ft=po(performance.now()),t&&H.snap(),ge(performance.now(),{force:!0})}function Mh(t){if(!(h.mode!=="layer"||V.phase==="idle")){if(V.phase==="preload"){if(!Rh(V.target)){ge(t,{force:!0});return}V.phase="reveal",V.started=t,V.previousOffsets=new Map(pe.current),h.compareLayers=new Set(V.target),pe.key="";return}V.phase==="reveal"&&t-V.started>=Vi&&(h.compareLayers=new Set(V.target),V.phase="idle",V.previous.clear(),V.target.clear(),V.previousOffsets.clear(),ge(t,{force:!0}))}}function Rh(t){for(let e of E.tiles.values())if(t.has(Number(e.layerId))&&!E.residentTiles.has(e.id)&&!E.failed.has(e.id))return!1;return!0}function Sh(t){if(h.mode!=="layer"||V.phase!=="reveal")return null;let e=ie((t-V.started)/Vi,0,1),a=e*e*(3-2*e),s=new Map;for(let r of V.previous)s.set(Number(r),V.target.has(Number(r))?1:1-a);for(let r of V.target)s.set(Number(r),V.previous.has(Number(r))?1:a);return s}function Ui(t,e){if(t.size!==e.size)return!1;for(let a of t)if(!e.has(a))return!1;return!0}function go(){if(h.workspace==="schematic"){_h();return}if(h.workspace==="bom"){Ah();return}if(h.workspace==="stackup")return;Es.textContent=hs.stage==="semantic-ready"?"Semantic GLTF A0":"Prism staged 3D",ks.textContent="Layers",Is.textContent="Visibility and compare",Q('[data-panel="search"] .section-heading span').textContent="Nets, components and pins",Q('[data-panel="view"] .section-heading span').textContent="Camera and stackup";let t=`
    <div class="mode-toolbar">
      <button data-mode="layer">PCB</button>
      <button data-mode="3d">3D</button>
    </div>`;Jt&&(Jt.innerHTML=t),Ge.innerHTML=`
    ${Jt?"":t}
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
    </label>`,Oe(),Ph()}function Ah(){Es.textContent="BoM A0",ks.textContent="Bill of Materials",Is.textContent="Grouped procurement view",Q('[data-panel="search"] .section-heading span').textContent="Search inside the BoM table",Q('[data-panel="view"] .section-heading span').textContent="BoM actions";let t=ze?.payload?.counts||{};Ge.innerHTML=`
    <div class="selection-properties">
      <div class="selection-property"><small>Rows</small><strong>${t.rows||0}</strong></div>
      <div class="selection-property"><small>Components</small><strong>${t.components||0}</strong></div>
      <div class="selection-property"><small>DNP</small><strong>${t.dnpComponents||0}</strong></div>
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
    </div>`,he.querySelector("#clear-selection")?.addEventListener("click",It)}function _h(){Es.textContent=Y?"Schematic SVG DOM":O.manifest?.schema==="prism.schematic_vector_a0"?"Schematic Vector A0":"Schematic World A0",ks.textContent="Pages",Is.textContent=`${O.pages.length} hierarchy instances`,Q('[data-panel="search"] .section-heading span').textContent="Pages, nets and components",Q('[data-panel="view"] .section-heading span').textContent="World navigation",Ge.innerHTML=`
    <div class="layer-presets">
      <button data-page-action="world">Fit world</button>
      <button data-page-action="parent">Parent</button>
      <button data-page-action="previous">Previous</button>
      <button data-page-action="next">Next</button>
    </div>
    <div class="page-list">${O.pages.map(t=>`
      <button class="page-row ${t.id===h.selectedPageId?"active":""}" data-page="${t.id}">
        <span>${t.sheetNumber}</span>
        <strong>${L(t.name)}</strong>
        <small>L${t.depth}</small>
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
    </div>`,Ge.querySelectorAll("[data-page]").forEach(t=>{t.addEventListener("click",()=>et(t.dataset.page,!0))}),Ge.querySelectorAll("[data-page-action]").forEach(t=>{t.addEventListener("click",()=>us(t.dataset.pageAction))}),he.querySelector("#entity-search").addEventListener("input",t=>{jh(t.target.value)}),he.querySelector("#frame-selection").addEventListener("click",xo),he.querySelector("#clear-selection").addEventListener("click",wa),xe.querySelector("#show-hierarchy").checked=A?.showHierarchy??!0,xe.querySelector("#show-hierarchy").addEventListener("change",t=>{A.showHierarchy=t.target.checked})}function et(t,e){let a=O.byId.get(t);!a||!A||(h.selectedPageId=a.id,h.selectedSchematicFeature=null,A.selectedPageId=a.id,A.selectedFeatureId=0,Xe.textContent=JSON.stringify(a,null,2),e&&A.framePage(a),Ge.querySelectorAll("[data-page]").forEach(s=>{s.classList.toggle("active",s.dataset.page===a.id)}))}function us(t){if(!A)return;if(t==="world"){A.frameWorld();return}let e=Math.max(0,O.pages.findIndex(s=>s.id===h.selectedPageId)),a=null;t==="previous"?a=O.pages[(e-1+O.pages.length)%O.pages.length]:t==="next"?a=O.pages[(e+1)%O.pages.length]:t==="parent"&&(a=O.byId.get(O.pages[e]?.parentId)),a&&et(a.id,!0)}function Nh(t){if(!t||!A)return;if(wa(),t.kind==="page"&&t.pageId){et(t.pageId,!0);return}if(t.kind!=="sheet")return;let e=O.pages.find(n=>n.sheetInstancePath===t.sheetInstancePath)||O.byId.get(h.selectedPageId),a=String(t.sheetFile||t.feature?.sheet_file||"").replace(/\\/g,"/"),s=String(t.sheetName||t.feature?.sheet_name||t.feature?.objectId||""),r=O.pages.find(n=>{if(e&&n.parentId&&n.parentId!==e.id)return!1;let i=String(n.sourcePath||"").replace(/\\/g,"/");return a&&i.endsWith(a)||s&&n.name===s})||O.pages.find(n=>{let i=String(n.sourcePath||"").replace(/\\/g,"/");return a&&i.endsWith(a)||s&&n.name===s});r&&et(r.id,!0)}function jh(t){let e=he.querySelector("#search-results"),a=t.trim().toLowerCase();if(!a){e.innerHTML="";return}let s=O.pages.filter(n=>`${n.name} ${n.sheetPath}`.toLowerCase().includes(a)).slice(0,8),r=E.nets.filter(n=>String(n.name).toLowerCase().includes(a)).slice(0,8);e.innerHTML=[...s.map(n=>`<button data-page="${n.id}"><b>${L(n.name)}</b><span>Page ${n.sheetNumber}</span></button>`),...r.map(n=>`<button data-schematic-net="${n.id}"><b>${L(n.name)}</b><span>${(O.manifest.netToPages?.[n.uid]||[]).length} pages</span></button>`)].join(""),e.querySelectorAll("[data-page]").forEach(n=>{n.addEventListener("click",()=>et(n.dataset.page,!0))}),e.querySelectorAll("[data-schematic-net]").forEach(n=>{n.addEventListener("click",()=>mo(Number(n.dataset.schematicNet),!0))})}function mo(t,e){let a=E.nets.find(r=>Number(r.id)===t);if(!a||!A)return;h.activeNetId=t,h.selectedFeatureId=0,h.selectedSchematicFeature=null,A.selectedFeatureId=0,A.selectedFeatureKey="",A.selectedSourceId="",O.activeNetUid=a.uid,A.activeNetUid=a.uid,Y?.setHighlightedNet(a.uid),Xe.textContent=JSON.stringify(a,null,2),Pe();let s=O.manifest.netToPages?.[a.uid]||[];e&&s.length&&et(s[0],!0)}function yo(t,e=null){let a=E.nets.find(s=>s.uid===t);a&&(h.activeNetId=Number(a.id),O.activeNetUid=a.uid,A&&(A.activeNetUid=a.uid,A.selectedFeatureId=Number(e?.feature?.id||e?.featureId||0),A.selectedFeatureKey=e?.feature?.stableKey||e?.featureKey||"",A.selectedSourceId=e?.feature?.sourceId||e?.sourceId||""),Y?.setHighlightedNet(a.uid),e&&(h.selectedSchematicFeature={...e,pageId:h.selectedPageId}),Xe.textContent=JSON.stringify(e?{...e,net:a}:a,null,2),Pe())}function wa(){h.activeNetId=0,h.selectedFeatureId=0,h.selectedSchematicFeature=null,O.activeNetUid="",A&&(A.activeNetUid="",A.selectedFeatureId=0,A.selectedFeatureKey="",A.selectedSourceId=""),Y?.setSelection(null),Y?.setHighlightedNet(""),Xe.textContent="No object selected",Pe()}function xo(){let t=O.byId.get(h.selectedPageId);t?A.framePage(t):A.frameWorld()}function Fh(t){h.selectedPageId=t.sheetInstancePath&&O.pages.find(s=>s.sheetInstancePath===t.sheetInstancePath)?.id||h.selectedPageId,h.selectedFeatureId=0,h.selectedSchematicFeature={...t,pageId:h.selectedPageId},t.anchor&&(h.selectionAnchor=t.anchor),A&&(A.selectedPageId=h.selectedPageId,A.selectedFeatureId=Number(t.feature?.id||0));let e=t.netUid?E.nets.find(s=>s.uid===t.netUid):null,a=t.reference?E.componentFeatures.get(t.reference):null;a&&(h.selectedFeatureId=Number(a.featureId||0),ze?.setSelectionByReference(t.reference,{scroll:h.workspace==="bom"})),Xe.textContent=JSON.stringify({...t,net:e,component:a},null,2),Pe()}function Bh(t){let{page:e,feature:a}=t;if(!a){h.selectedSchematicFeature=null,A.selectedFeatureId=0,et(e.id,!1),Pe();return}let s=Number(a.id||0);if(h.selectedPageId=e.id,A.selectedPageId=e.id,A.selectedFeatureId=s,h.selectedSchematicFeature={...a,pageId:e.id},h.selectionAnchor=null,a.netUid){let r=E.nets.find(n=>n.uid===a.netUid);if(r){mo(Number(r.id),!1),h.selectedSchematicFeature={...a,pageId:e.id},A.selectedFeatureId=s;return}}if(a.reference){let r=E.componentFeatures.get(a.reference);if(r){Qt(Number(r.featureId),!1),h.selectedSchematicFeature={...a,pageId:e.id},A.selectedFeatureId=s;return}}h.activeNetId=0,h.selectedFeatureId=0,A.activeNetUid="",Xe.textContent=JSON.stringify({page:e.name,...a},null,2),Pe()}function Ta(){let t=h.isolateNet,e=he?.querySelector?.("#isolate-net");e?.classList.toggle("active",t),e?.setAttribute("aria-pressed",String(t));let a=Z?.querySelector?.("[data-action=isolate]");a?.classList.toggle("active",t),a?.setAttribute("aria-pressed",String(t));let s=xe?.querySelector?.("#show-board");s&&(s.checked=h.showBoard);let r=xe?.querySelector?.("#show-components");r&&(r.checked=h.showComponents)}function Ch(){let t=new Set;for(let e of Ze())for(let a of Oh(e))t.add(a);return t}function Oh(t){let e=new Set,a=E.nets.find(r=>Number(r.id)===Number(t)),s=new Set(E.copperLayers.map(r=>Number(r.id)));for(let r of Object.keys(a?.layerBoundsMm||{})){let n=Number(r);s.has(n)&&e.add(n)}if(!e.size){let r=new Map(E.copperLayers.map(n=>[n.name,Number(n.id)]));for(let n of a?.metrics?.layers||[]){let i=r.get(n);i!=null&&e.add(i)}}if(e.size)return e;for(let r of E.tiles.values())oo(r,t)&&e.add(Number(r.layerId));return e}function Ea(){let t=Ch();t.size&&(h.visible3dLayers=new Set(t),h.mode==="layer"?va(t):(h.compareLayers=new Set(t),h.desiredCompareLayers=new Set(t)),ge(performance.now(),{force:!0}))}function ya(t){let e=!!(t&&Ze().size),a=h.isolateNet;if(e&&!h.isolateNet&&(h.preIsolation3dLayers=new Set(h.visible3dLayers),h.preIsolationCompareLayers=new Set(h.desiredCompareLayers.size?h.desiredCompareLayers:h.compareLayers)),h.isolateNet=e,h.isolateNet)Ea();else if(h.preIsolation3dLayers||h.preIsolationCompareLayers){if(h.preIsolation3dLayers&&(h.visible3dLayers=new Set(h.preIsolation3dLayers)),h.preIsolationCompareLayers){let s=new Set(h.preIsolationCompareLayers);h.mode==="layer"?va(s):(h.compareLayers=s,h.desiredCompareLayers=new Set(s))}h.preIsolation3dLayers=null,h.preIsolationCompareLayers=null,ge(performance.now(),{force:!0})}e&&!a?(h.preIsolationShowBoard=h.showBoard,h.showBoard=!1):!e&&a&&(typeof h.preIsolationShowBoard=="boolean"&&(h.showBoard=h.preIsolationShowBoard),h.preIsolationShowBoard=null),Ta(),Oe()}function Oe(){(Jt||Ge).querySelectorAll("[data-mode]").forEach(a=>{let s=a.dataset.mode===h.mode;a.classList.toggle("active",s),a.setAttribute("aria-pressed",String(s))}),xe.querySelectorAll("[data-tool]").forEach(a=>{a.classList.toggle("active",a.dataset.tool===h.cameraTool)}),xe.querySelector("#show-board").checked=h.showBoard,xe.querySelector("#show-components").checked=h.showComponents,xe.querySelector("#separation").value=h.separation;let t=Ge.querySelector(".layer-list"),e=h.mode==="3d"?h.visible3dLayers:h.desiredCompareLayers;t.innerHTML=E.copperLayers.map((a,s)=>`
    <label class="layer-row">
      <input type="checkbox" data-layer="${a.id}" ${e.has(Number(a.id))?"checked":""}>
      <span class="swatch" style="background:${ab(ho(a))}"></span>
      <span>${L(a.name)}</span><small>${s+1}</small>
    </label>`).join(""),t.querySelectorAll("[data-layer]").forEach(a=>a.addEventListener("change",()=>{let s=Number(a.dataset.layer);if(h.mode==="3d")a.checked?h.visible3dLayers.add(s):h.visible3dLayers.delete(s),ge(performance.now(),{force:!0});else{let r=new Set(h.desiredCompareLayers);a.checked?r.add(s):r.delete(s),va(r)}})),Ta()}function Ph(){(Jt||Ge).querySelectorAll("[data-mode]").forEach(e=>e.addEventListener("click",()=>{e.dataset.mode==="layer"?Tr():(h.mode="3d",H.frame($t()),H.snap(),h.visibleTileIds=new Set,ge(performance.now(),{force:!0})),Oe()})),Ge.querySelectorAll("[data-preset]").forEach(e=>e.addEventListener("click",()=>{let a=h.mode==="3d"?h.visible3dLayers:new Set;a.clear();let s=e.dataset.preset;for(let[r,n]of E.copperLayers.entries())(s==="all"||s==="outer"&&(r===0||r===E.copperLayers.length-1)||s==="inner"&&r>0&&r<E.copperLayers.length-1)&&a.add(Number(n.id));h.mode==="3d"?ge(performance.now(),{force:!0}):va(a),Oe()})),xe.querySelectorAll("[data-tool]").forEach(e=>e.addEventListener("click",()=>{h.cameraTool=e.dataset.tool,Oe()})),xe.querySelector("#show-board").addEventListener("change",e=>{h.showBoard=e.target.checked,h.savedShowBoard=h.showBoard,h.showBoard&&h.isolateNet&&ya(!1)}),xe.querySelector("#show-components").addEventListener("change",e=>{h.showComponents=e.target.checked,h.savedShowComponents=h.showComponents}),xe.querySelector("#separation").addEventListener("input",e=>{h.separation=Number(e.target.value)}),he.querySelector("#clear-selection").addEventListener("click",It),he.querySelector("#isolate-net").addEventListener("click",()=>{ya(!h.isolateNet)}),he.querySelector("#frame-selection").addEventListener("click",Ir),he.querySelector("#show-net-layers").addEventListener("click",vo);let t=he.querySelector("#entity-search");t.addEventListener("input",()=>wo(t.value))}function Dh(){Nt(".rail-tab").forEach(t=>t.addEventListener("click",()=>{let e=t.dataset.tab,a=h.activeTab===e&&!kt.classList.contains("panel-collapsed");h.activeTab=e,kt.classList.toggle("panel-collapsed",a),Nt(".rail-tab").forEach(s=>{s.classList.toggle("active",!a&&s.dataset.tab===e)}),Nt(".tab-panel").forEach(s=>{s.classList.toggle("active",!a&&s.dataset.panel===e)})}))}function vo(){let t=E.nets.find(s=>Number(s.id)===h.activeNetId);if(!t)return;let e=new Set(t.metrics?.layers||[]),a=h.mode==="3d"?h.visible3dLayers:new Set;a.clear();for(let s of E.copperLayers)e.has(s.name)&&a.add(Number(s.id));h.mode==="3d"?ge(performance.now(),{force:!0}):va(a),Oe()}function wo(t){let e=he.querySelector("#search-results"),a=t.trim().toLowerCase();if(!a){e.innerHTML="";return}let s=E.nets.filter(n=>String(n.name).toLowerCase().includes(a)).slice(0,8),r=[...E.componentFeatures.values()].filter(n=>!h.hiddenComponents.has(String(n.designator||""))&&`${n.designator} ${n.value} ${n.footprint}`.toLowerCase().includes(a)).slice(0,6);e.innerHTML=[...s.map(n=>`<button data-net="${n.id}"><b>${L(n.name)}</b><span>${L(n.netClass||"")}</span></button>`),...r.map(n=>`<button data-feature="${n.featureId}"><b>${L(n.designator)}</b><span>${L(n.value)}</span></button>`)].join(""),e.querySelectorAll("[data-net]").forEach(n=>{n.addEventListener("click",()=>vs(Number(n.dataset.net),!0))}),e.querySelectorAll("[data-feature]").forEach(n=>{n.addEventListener("click",()=>Qt(Number(n.dataset.feature),!0))})}function vs(t,e){e&&(h.selectionAnchor=null),h.activeNetId=t,h.selectedFeatureId=0;let a=E.nets.find(s=>Number(s.id)===t);h.workspace==="schematic"&&a&&A&&(O.activeNetUid=a.uid,A.activeNetUid=a.uid),vr(),Xe.textContent=JSON.stringify(a||{},null,2),Pe(),h.isolateNet&&Ea(),e&&a?.boundsMm&&H.frame(xr(ja(a.boundsMm))),ge(performance.now(),{force:!0}),Rs(Qi(a))}function Qt(t,e=!1){let a=E.features.get(t);if(a?.kind==="component"&&Ca(xa(a),h.hiddenComponents))return;e&&(h.selectionAnchor=null),h.selectedFeatureId=t,h.activeNetId=Number(a?.netId||0);let s=xa(a);s&&ze?.setSelectionByReference(s,{scroll:h.workspace==="bom"});let r=Zi(a);r?.kind==="net"?vr():eo(),Xe.textContent=a?JSON.stringify(a,null,2):"No object selected",Pe(),h.isolateNet&&h.activeNetId&&Ea(),e&&a?.bounds&&kr(a),ge(performance.now(),{force:!0}),Rs(r)}function Er(t,e=!1){if(Ca(t,h.hiddenComponents))return;let a=E.componentFeatures.get(t);if(ze?.setSelectionByReference(t,{scroll:h.workspace==="bom"}),!a?.featureId)return;eo(),Qt(Number(a.featureId),!1);let s=Lh(t);if(s){let{page:r,feature:n}=s;h.selectedPageId=r.id,h.selectedSchematicFeature={...n,pageId:r.id},A&&(A.selectedPageId=r.id,A.selectedFeatureId=Number(n.id||0)),Y?.setSelection?.({kind:"component",featureKey:n.stableKey||"",sheetInstancePath:n.sheetInstancePath||r.sheetInstancePath||"",sourceId:n.sourceId||n.uuid||"",reference:t,feature:n,pageId:r.id}),e&&h.workspace==="schematic"&&(et(r.id,!0),Y?.frameSelection?.())}if(e&&h.workspace==="pcb"){let r=E.features.get(Number(a.featureId));r?.bounds&&kr(r,!0)}Pe()}function xa(t){return t?.designator||t?.reference||t?.componentDesignator||""}function Uh(){return Br(E.manifest?.components||[],E.componentModelCounts)}function To(t){h.hiddenComponentRequest=t;let e=Cr(t,Uh());h.hiddenComponents=e.hiddenReferences,D?.setHiddenFeatureIds(e.hiddenFeatureIds),e.ambiguous.length&&console.warn(`[prism-semantic-viewer] keeping ambiguous components visible: ${e.ambiguous.join(", ")}`),e.unknown.length&&console.warn(`[prism-semantic-viewer] ignoring unknown components: ${e.unknown.join(", ")}`);let a=xa(E.features.get(h.selectedFeatureId));Ca(a,h.hiddenComponents)&&It();let s=he.querySelector("input");return s?.value&&wo(s.value),e}function kr(t,e=!1){if(!t?.bounds)return;let a=xr(t.bounds);if(e||t.kind==="component"||!!xa(t)){let n=(a[2]+a[5])*.5<0,i=H.targetPolar>Math.PI/2;n!==i&&H.setAxis("z",n)}H.frame(a)}function Lh(t){if(!t||!A?.featuresByPage)return null;let e=O.byId.get(h.selectedPageId),a=[...e?[e]:[],...(O.pages||[]).filter(r=>r.id!==e?.id)],s=r=>{let n=String(r.kind||"").toLowerCase();return n==="component"||n==="symbol_body"||n==="symbol_instance"?0:n==="symbol_reference"?1:n.startsWith("pin")?2:3};for(let r of a){let n=(A.featuresByPage[r.id]||[]).filter(i=>String(i.reference||i.designator||i.componentDesignator||"")===t).sort((i,o)=>s(i)-s(o));if(n.length)return{page:r,feature:n[0]}}return null}function It(){h.activeNetId=0,h.selectedFeatureId=0,h.selectedSchematicFeature=null,h.selectionAnchor=null;let t=Ze().size>0,e=h.isolateNet;e&&!t?ya(!1):t?e&&Ea():h.isolateNet=!1,t||to(),O.activeNetUid="",A&&(A.activeNetUid=""),Y?.setSelection(null),Y?.setHighlightedNet(""),Xe.textContent="No object selected",ze?.clearSelection?.(),Pe(),Rs(null)}function fs(t){return`<div class="selection-properties">${t.map(([e,a])=>`
    <div class="selection-property">
      <small>${L(e)}</small>
      <strong title="${L(String(a))}">${L(String(a))}</strong>
    </div>`).join("")}</div>`}function ws(t,e,a){return`
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
      <div class="selection-card-title"><small>${L(t)}</small><strong>${L(e)}</strong></div>
      <button class="selection-card-close" type="button" aria-label="Clear selection">&times;</button>
    </div>`}function Kh(t){let a=(Ie.net_details?.[t.uid]||{}).terminals||[],s=t.metrics||{},r=Number(s.traceLengthMm||0).toFixed(2),n=s.objectCounts?.via||0,i=a.length,c=/^(VCC|VDD|GND|3V3|5V|12V|VIN|POWER)/i.test(t.name)?"#10b981":"#8b5cf6",d=t.netClass||"Default",f=a.length?a.map(p=>`
      <div class="selection-row pin-row-interactive" data-ref="${L(p.designator)}" data-pin="${L(p.pin)}">
        <span class="refdes-col"><strong>${L(p.designator)}</strong></span>
        <span class="pin-col">Pin ${L(p.pin)}</span>
        <span class="val-col" title="${L(p.value||"")}">${L(p.value||"-")}</span>
      </div>`).join(""):'<div class="selection-empty">No connected pin metadata is available.</div>';return`
    ${ws("Net",t.name,c)}
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
          <strong title="${L(d)}">${L(d)}</strong>
        </div>
      </div>
      
      <div class="selection-section">
        <span class="selection-section-title">Layers</span>
        <div class="net-layers-badges">
          ${(s.layers||[]).length?s.layers.map(p=>`<span class="layer-badge">${L(p)}</span>`).join(""):'<span class="layer-badge unknown">None</span>'}
        </div>
      </div>

      <div class="selection-section">
        <span class="selection-section-title">Connected Pins</span>
        <div class="selection-table compact-scroll" style="max-height: 120px;">
          ${f}
        </div>
      </div>
    </div>`}function Gh(t,e=null){let a=Yi(t.designator),s=a?a.value:t.value||"Not specified",r=a?a.footprint:t.footprint||"Not specified",n=a?.parameters||{},i=n.Manufacturer||n.Mfr||"",o=n["Manufacturer Part Number"]||n.MPN||n["Part Number"]||"",c=n.kicad_dnp==="true"||n.DNP==="true"||n.kicad_in_bom==="false",d="";(i||o)&&(d=`
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
      </div>`);let f="";return e&&(f=`
      <div class="selection-section">
        <span class="selection-section-title">Selected Pin</span>
        <div class="selection-table">
          <div class="selection-row">
            <span><strong>Pin</strong></span>
            <span>Pin ${L(e.pinNumber||e.pin||"")}</span>
            <span title="${L(e.pinName||"")}">${L(e.pinName||"No name")}</span>
          </div>
          <div class="selection-row">
            <span><strong>Net</strong></span>
            <span class="net-ref-interactive" data-net-name="${L(e.netName||"")}">${L(e.netName||"Not connected")}</span>
          </div>
        </div>
      </div>`),`
    ${ws("Component",t.designator||"Unknown","#3b82f6")}
    <div class="selection-component-dashboard">
      ${c?'<div class="dnp-banner" style="background:#b45309;color:#fff;font-size:9px;font-weight:750;text-align:center;padding:3px;margin-bottom:8px;border-radius:2px;text-transform:uppercase;letter-spacing:0.05em;">DNP (Do Not Populate)</div>':""}
      ${fs([["Value",s],["Footprint",r.split(":").pop()||r]])}
      ${d}
      ${f}
    </div>`}function zh(t,e){let a=String(t.kind||"").toLowerCase(),s=a.startsWith("pin");if(a==="component"||a.includes("symbol"))return`
      ${ws("Component",t.reference||t.componentDesignator||"Unknown","#3b82f6")}
      ${fs([["Value",t.value||t.componentValue||"Not specified"],["Footprint",t.componentFootprint||t.footprint||"Not specified"],["Library",t.libraryRef||"Not specified"],["UID",t.componentUid||t.uuid||t.sourceId||"Not resolved"]])}
      <div class="selection-section">
        <span class="selection-section-title">Schematic placement</span>
        ${fs([["Page",e?.name||"Unknown"],["Sheet",t.sheetInstancePath||"/"]])}
      </div>`;let n=s?[["Symbol",t.reference||t.designator||"Unknown"],["Value",t.value||t.componentValue||"Not specified"],["Pin",`${t.pinNumber||"-"}${t.pinName?` ${t.pinName}`:""}`],["Net",t.netName||"Not connected"],["PCB Pad",t.pcbPadId||"Not resolved"],["Component UID",t.componentUid||"Not resolved"]]:[["Page",e?.name||"Unknown"],["Kind",t.kind.replaceAll("_"," ")],["Net",t.netName||"Not connected"]];return`
    ${ws(t.kind.replaceAll("_"," "),t.pinName||t.reference||t.designator||t.text||t.netName||"Schematic object","#3b82f6")}
    ${fs(n)}
    <div class="selection-section">
      <span class="selection-section-title">Source identity</span>
      <div class="selection-table">
        <div class="selection-row">
          <span><strong>${s?"Pin UUID":"UUID"}</strong></span>
          <span title="${L(t.uuid||t.sourceId||"")}">${L(t.uuid||t.sourceId||"-")}</span>
          <span title="${L(t.objectId||"")}">${L(t.objectId||"No object ID")}</span>
        </div>
        <div class="selection-row">
          <span><strong>Sheet</strong></span>
          <span>${L(e?.name||"Unknown")}</span>
          <span title="${L(t.sheetInstancePath||"")}">${L(t.sheetInstancePath||"/")}</span>
        </div>
      </div>
    </div>`}function Pe(){if(h.workspace==="bom"){Z.hidden=!0,Z.innerHTML="";return}let t=E.features.get(h.selectedFeatureId),e=t?.kind==="component"?t:null,a=h.workspace==="schematic"?h.selectedSchematicFeature:null,s=a?O.byId.get(a.pageId):null,r=h.activeNetId?E.nets.find(p=>Number(p.id)===h.activeNetId):null;if(!r&&a&&(a.netUid?r=E.nets.find(p=>p.uid===a.netUid):a.netName&&(r=aa(E.nets,a.netName))),!e&&a){let p=a.reference||a.componentDesignator||a.designator;p&&(e=E.componentFeatures.get(p)||{designator:p})}if(!e&&!r&&!a){Z.hidden=!0,Z.innerHTML="";return}let n="";if(r)n=Kh(r);else if(e){let p=a?.kind?.startsWith("pin")?a:null;n=Gh(e,p)}else a&&(n=zh(a,s));Z.innerHTML=`
    ${n}
    <div class="selection-card-actions">
      ${r?`
        <button type="button" data-action="isolate" aria-keyshortcuts="I" title="Toggle isolated net view (I)" class="${h.isolateNet?"active":""}">Isolate</button>
        <button type="button" data-action="net-layers">Layers</button>
      `:""}
      <button type="button" data-action="frame">Frame selection</button>
    </div>`,Z.hidden=!1;let i=h.workspace==="schematic"?ke:W,o=h.selectionAnchor,c=Z.offsetWidth||360,d=Z.offsetHeight||330;if(o){let p=Math.max(16,i.clientWidth-c-24),v=Math.max(16,i.clientHeight-d-24);Z.style.left=`${ie(o.x+18,16,p)}px`,Z.style.top=`${ie(o.y+18,16,v)}px`}else Z.style.left="20px",Z.style.top="20px";if(Z.querySelector(".selection-card-close").addEventListener("click",It),Z.querySelector("[data-action=frame]").addEventListener("click",Ir),r){let p=Z.querySelector("[data-action=isolate]");p&&p.addEventListener("click",()=>{ya(!h.isolateNet)});let v=Z.querySelector("[data-action=net-layers]");v&&v.addEventListener("click",vo),Z.querySelectorAll(".pin-row-interactive").forEach(x=>{x.addEventListener("click",()=>{let b=x.dataset.ref,l=x.dataset.pin;if(!b)return;let g=((Ie.net_details?.[r.uid]||{}).terminals||[]).find(w=>w.designator===b&&w.pin===l),y=g?eh(g.pcb_pad_id):0;y?Qt(y,!0):Er(b,!0)})})}let f=Z.querySelector(".net-ref-interactive");f&&f.addEventListener("click",()=>{let p=f.dataset.netName;if(!p)return;let v=aa(E.nets,p);v&&vs(Number(v.id),!0)})}function Ir(){if(h.workspace==="schematic"){xo();return}let t=E.features.get(h.selectedFeatureId);if(t?.bounds)kr(t);else{let e=E.nets.find(a=>Number(a.id)===h.activeNetId);e?.boundsMm&&H.frame(xr(ja(e.boundsMm)))}}function Vh(){W.addEventListener("contextmenu",t=>t.preventDefault()),W.addEventListener("pointerdown",t=>{h.dragging=!0,h.lastX=t.clientX,h.lastY=t.clientY,h.pointerStartX=t.clientX,h.pointerStartY=t.clientY,h.dragMode=h.mode==="layer"||h.cameraTool==="pan"||t.shiftKey||t.button!==0?"pan":"orbit",W.setPointerCapture(t.pointerId)}),W.addEventListener("pointermove",t=>{if(!h.dragging)return;let e=t.clientX-h.lastX,a=t.clientY-h.lastY;h.lastX=t.clientX,h.lastY=t.clientY,h.dragMode==="pan"?H.pan(e,a,W.clientHeight,h.mode==="layer"):H.orbit(e,a)}),W.addEventListener("pointerup",async t=>{h.dragging=!1,W.releasePointerCapture(t.pointerId),Math.hypot(t.clientX-h.pointerStartX,t.clientY-h.pointerStartY)<3&&await Li(t)}),W.addEventListener("dblclick",async t=>{await Li(t),Ir()}),W.addEventListener("wheel",t=>{t.preventDefault(),Math.abs(t.deltaX)>Math.abs(t.deltaY)*.4?H.pan(-t.deltaX,0,W.clientHeight,h.mode==="layer"):H.dolly(t.deltaY,h.mode==="layer")},{passive:!1}),window.addEventListener("keydown",Mo),Hh()}function Hh(){let t=!1,e,a,s=0,r=0;Z.addEventListener("pointerdown",n=>{if(!n.target.closest(".selection-card-head")||n.target.closest(".selection-card-close"))return;t=!0,Z.classList.add("dragging");let o=Z.getBoundingClientRect();s=o.left,r=o.top,e=n.clientX,a=n.clientY,Z.setPointerCapture(n.pointerId),n.stopPropagation()}),Z.addEventListener("pointermove",n=>{if(!t)return;let i=n.clientX-e,o=n.clientY-a,c=h.workspace==="schematic"?ke:W,d=Z.offsetWidth||360,f=Z.offsetHeight||330,p=Math.max(16,c.clientWidth-d-24),v=Math.max(16,c.clientHeight-f-24),x=ie(s+i,16,p),b=ie(r+o,16,v);Z.style.left=`${x}px`,Z.style.top=`${b}px`,h.selectionAnchor={x:x-18,y:b-18},n.stopPropagation()}),Z.addEventListener("pointerup",n=>{t&&(t=!1,Z.classList.remove("dragging"),Z.releasePointerCapture(n.pointerId),n.stopPropagation())})}function qh(){Nt("[data-workspace]").forEach(t=>{t.addEventListener("click",()=>Eo(t.dataset.workspace))})}function Eo(t){if(t==="schematic"&&!A||t==="bom"&&!ze)return;h.workspace=t,kt.classList.remove("workspace-pcb","workspace-schematic","workspace-bom","workspace-stackup"),kt.classList.add(`workspace-${t}`),(t==="schematic"&&(h.activeTab==="view"||h.activeTab==="inspect"||h.activeTab==="stats")||t==="bom"||t==="stackup")&&Ts("layers");let e=Q('.rail-tab[data-tab="layers"]');e&&(t==="schematic"?(e.textContent="Pages",e.title="Schematic pages"):t==="bom"?(e.textContent="Summary",e.title="BoM summary"):(e.textContent="Layers",e.title="Layers and compare"));let a=t==="schematic",s=t==="bom",r=t==="stackup";if(W.hidden=a||s||r,ke&&(ke.hidden=!a),bs&&(bs.hidden=!a||!Y),ps&&(ps.hidden=!a),gs&&(gs.hidden=!s),Ae&&(Ae.hidden=!r),Ee.hidden=a||s||r,ms.hidden=a||s||r,ma&&(ma.hidden=!a),Nt("[data-workspace]").forEach(n=>{n.classList.toggle("active",n.dataset.workspace===t)}),pa.textContent=s?"Semantic BoM active":a?Y?"SVG DOM + WebGPU schematic world active":"WebGPU schematic world active":r?"Layer Stackup active":"WebGPU semantic glTF active",a&&!O.fitted&&(A.resize(),A.frameWorld(),O.fitted=!0),!a&&!s&&!r&&(D?.resize(),h.mode==="layer"?Tr():ge(performance.now(),{force:!0})),r)try{sb()}catch(n){console.error("Failed to render stackup workspace",n),Ae&&(Ae.innerHTML=`
          <div class="selection-empty" style="padding:40px;text-align:center;">
            Stackup view failed to render. ${L(n?.message||String(n))}
          </div>
        `)}go(),Pe()}function Xh(){ke.addEventListener("pointerdown",t=>{Y?.worldActive||Y?.active||(h.schematicDragging=!0,h.schematicLastX=t.clientX,h.schematicLastY=t.clientY,h.schematicStartX=t.clientX,h.schematicStartY=t.clientY,ke.setPointerCapture(t.pointerId))}),ke.addEventListener("pointermove",t=>{if(Y?.worldActive||Y?.active||!h.schematicDragging||!A)return;let e=t.clientX-h.schematicLastX,a=t.clientY-h.schematicLastY;h.schematicLastX=t.clientX,h.schematicLastY=t.clientY,A.pan(e,a)}),ke.addEventListener("pointerup",async t=>{if(!(Y?.worldActive||Y?.active)&&(h.schematicDragging=!1,ke.releasePointerCapture(t.pointerId),Math.hypot(t.clientX-h.schematicStartX,t.clientY-h.schematicStartY)<3)){let e=await A.pickFeature(t.clientX,t.clientY);e?Bh(e):wa()}}),ke.addEventListener("dblclick",t=>{if(Y?.worldActive||Y?.active)return;let e=A.hitPage(t.clientX,t.clientY);e&&et(e.id,!0)}),ke.addEventListener("wheel",t=>{Y?.worldActive||Y?.active||(t.preventDefault(),A.zoom(t.deltaY,t.clientX,t.clientY))},{passive:!1})}async function Li(t){if(!Ne)return;let e=W.getBoundingClientRect(),a=(t.clientX-e.left)*W.width/e.width,s=(t.clientY-e.top)*W.height/e.height;h.selectionAnchor={x:t.clientX-e.left,y:t.clientY-e.top};let r=await ko(a,s);(r.kind==="feature"||r.kind==="board")&&(h.selectedOccurrence=r.occurrenceIndex),r.featureId?Qt(r.featureId,!0):r.kind==="board"&&!D.identityOnly?Jh():It()}function ko(t,e){return D.pick(Ne,t,e,{activeNetId:h.activeNetId,selectedFeatureId:h.selectedFeatureId,layerOffsets:bo(),visibleLayers:h.mode==="3d"?h.visible3dLayers:h.compareLayers,showBoard:h.showBoard,showComponents:h.showComponents,componentOpacity:ie(1-h.separation/.1,0,1),boardOpacity:1-h.separation*.72,isolateNet:h.isolateNet,compareMode:h.mode==="layer",compareOffsets:Ft,visibleTileIds:h.mode==="3d"?h.visibleTileIds:null})}async function Wh(t,e){if(!Ne||!D)return null;let a=W.getBoundingClientRect(),s=await ko((t-a.left)*W.width/a.width,(e-a.top)*W.height/a.height),r=s.featureId?Zi(E.features.get(s.featureId)):null;return{...s,selection:r}}function Jh(){let t=h.selectedOccurrence,e=Yt;Yt=!0;try{It()}finally{Yt=e}h.selectedOccurrence=t,Rs({kind:"board",sourceContext:"3D"})}function Yh(t,e){let a=E.componentFeatures.get(String(t)),s=a?E.features.get(Number(a.featureId))?.bounds:null;if(!s)return null;let r=s[2]+s[5]>=0;return Io([(s[0]+s[3])/2,(s[1]+s[4])/2,r?s[5]:s[2]],e)}function Io(t,e){if(!Ne||!D)return null;let a=e==null?0:D.occurrenceKeys.indexOf(String(e)),s=D.occurrenceMatrices[a];if(!s)return null;let r=Ht(Ne.matrix,oa(s,t),Ne.viewport);if(!r)return null;let n=W.getBoundingClientRect();return{x:n.left+r.x*n.width/W.width,y:n.top+r.y*n.height/W.height}}function Mo(t){if(!mr())return;if(t.target instanceof HTMLInputElement){t.key==="Escape"&&t.target.blur();return}let e=t.key.toLowerCase();if(h.workspace==="schematic"){if(e==="/")t.preventDefault(),Ts("search"),he.querySelector("#entity-search")?.focus();else if(e==="escape")O.activeNetUid?(O.activeNetUid="",h.activeNetId=0,A.activeNetUid="",Y?.setHighlightedNet(""),Pe()):wa();else if(e==="~"||t.key==="~"){t.preventDefault();let a=h.selectedSchematicFeature?.netUid;a&&(O.activeNetUid===a?(O.activeNetUid="",h.activeNetId=0,A.activeNetUid="",Y?.setHighlightedNet("")):yo(a,h.selectedSchematicFeature))}else if(e==="home")A?.frameWorld();else if(e==="[")us("previous");else if(e==="]")us("next");else if(e==="n"){t.preventDefault();let a=A?.cycleNetIntrasheetLink(t.shiftKey?-1:1);a?.pageId&&(h.selectedPageId=a.pageId,A.selectedPageId=a.pageId,Ro())}else if(t.altKey&&e==="arrowup")us("parent");else if(t.key.startsWith("Arrow")){t.preventDefault();let a=t.key==="ArrowRight"?32:t.key==="ArrowLeft"?-32:0,s=t.key==="ArrowDown"?32:t.key==="ArrowUp"?-32:0;A?.pan(a,s)}return}if(e==="/")t.preventDefault(),Ts("search"),he.querySelector("#entity-search").focus();else if(e==="escape")It();else if(e==="i"&&h.workspace==="pcb"&&Ze().size)t.preventDefault(),ya(!h.isolateNet);else if(e==="home")H.frame($t());else if(e==="`")lo(!h.showStats);else if(["x","y","z"].includes(e))H.setAxis(e,t.shiftKey);else if(e==="f")H.flip();else if(e==="r")H.rotateZ(t.shiftKey?-1:1);else if(e===" "){t.preventDefault();let a=E.features.get(h.selectedFeatureId);a?.bounds&&H.setFocus([(a.bounds[0]+a.bounds[3])/2,(a.bounds[1]+a.bounds[4])/2,(a.bounds[2]+a.bounds[5])/2])}else if(t.key.startsWith("Arrow")){t.preventDefault();let a=t.key==="ArrowRight"?32:t.key==="ArrowLeft"?-32:0,s=t.key==="ArrowDown"?32:t.key==="ArrowUp"?-32:0;H.pan(a,s,W.clientHeight,h.mode==="layer")}}function Ts(t){h.activeTab=t,kt.classList.remove("panel-collapsed"),Nt(".rail-tab").forEach(e=>{e.classList.toggle("active",e.dataset.tab===t)}),Nt(".tab-panel").forEach(e=>{e.classList.toggle("active",e.dataset.panel===t)})}function $h(){let t=Ee.getContext("2d");t.clearRect(0,0,Ee.width,Ee.height);let e=[Ee.width/2,Ee.height/2],a=H.basis(),s=[{axis:"x",label:"X",color:"#e23838",vector:[1,0,0]},{axis:"y",label:"Y",color:"#2dbd50",vector:[0,1,0]},{axis:"z",label:"Z",color:"#3157d5",vector:[0,0,1]}],r=[];for(let n of s)for(let i of[-1,1]){let o=n.vector.map(d=>d*i),c=[hr(o,a.right),-hr(o,a.up),hr(o,a.back)];r.push({...n,sign:i,depth:c[2],point:[e[0]+c[0]*34,e[1]+c[1]*34]})}for(let n of s){let i=r.find(o=>o.axis===n.axis&&o.sign===1);t.strokeStyle=n.color,t.lineWidth=2.4,t.beginPath(),t.moveTo(...e),t.lineTo(...i.point),t.stroke()}ys=[];for(let n of r.sort((i,o)=>o.depth-i.depth)){let i=n.sign===1,o=i?13:9;t.beginPath(),t.arc(n.point[0],n.point[1],o,0,Math.PI*2),t.fillStyle=i?n.color:`${n.color}66`,t.fill(),t.lineWidth=2,t.strokeStyle=tb(n.color,i?.45:.58),t.stroke(),i&&(t.fillStyle="#07101c",t.font="700 13px system-ui",t.textAlign="center",t.textBaseline="middle",t.fillText(n.label,n.point[0],n.point[1]+.5)),ys.push({...n,radius:o+5})}}function Qh(){!Ee||Ee.dataset.bound==="true"||(Ee.dataset.bound="true",Ee.addEventListener("click",t=>{let e=Ee.width/Ee.clientWidth,a=Ee.height/Ee.clientHeight,s=[t.offsetX*e,t.offsetY*a],r=ys.map(n=>({item:n,distance:Math.hypot(s[0]-n.point[0],s[1]-n.point[1])})).filter(({item:n,distance:i})=>i<=n.radius).sort((n,i)=>n.distance-i.distance)[0]?.item;r&&H.setAxis(r.axis,r.sign<0)}))}function Zh(){if(h.mode!=="layer"||!Ne){ms.innerHTML="";return}let t=$t(),e=ao();ms.innerHTML=E.copperLayers.filter(a=>e.has(Number(a.id))).map(a=>{let s=Ft.get(Number(a.id))||[0,0,0],r=eb([t[0]+s[0],t[4]+s[1],0],Ne.matrix,W.clientWidth,W.clientHeight);return!r||r[0]<-100||r[0]>W.clientWidth+100||r[1]<-100||r[1]>W.clientHeight+100?"":`<span style="left:${r[0]}px;top:${r[1]}px">${L(a.name)}</span>`}).join("")}function Ro(){if(h.workspace!=="schematic"||!A){ma.innerHTML="";return}ma.innerHTML=O.visiblePages.filter(t=>A.pagePixelWidth(t)>120).map(t=>{let[e,a]=A.worldToScreen(t.worldX+8*A.scale,t.worldY-6*A.scale),s=t.id===h.selectedPageId,n=O.activeNetUid&&t.netUids.includes(O.activeNetUid)?"#18ef52":s?"#3b82f6":"#4b8de8";return`<div class="schematic-page-label" style="left:${e}px;top:${a}px;border-left-color:${n}">
        <strong>${L(t.name)}</strong>
        <small>Page ${t.sheetNumber} &middot; ${t.featureCount.toLocaleString()} features</small>
      </div>`}).join("")}function eb(t,e,a,s){let r=t[0],n=t[1],i=t[2],o=e[0]*r+e[4]*n+e[8]*i+e[12],c=e[1]*r+e[5]*n+e[9]*i+e[13],d=e[3]*r+e[7]*n+e[11]*i+e[15];return Math.abs(d)<1e-8?null:[(o/d*.5+.5)*a,(.5-c/d*.5)*s]}function hr(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]}function tb(t,e){let a=t.replace("#","");return`#${[0,2,4].map(s=>Math.round(parseInt(a.slice(s,s+2),16)*e).toString(16).padStart(2,"0")).join("")}`}function Ki(t,e){h.frameSamples.push({intervalMs:t,cpuMs:e}),h.frameSamples.length>180&&h.frameSamples.shift()}function Gi(t,e){if(!t.length)return 0;let a=[...t].sort((s,r)=>s-r);return a[Math.min(a.length-1,Math.floor((a.length-1)*e))]}function zi(t){if(!cs||(h.frames+=1,t-h.fpsAt<=500))return;h.fps=h.frames*1e3/(t-h.fpsAt);let e=h.frameSamples;if(h.frameIntervalMs=e.length?e.reduce((n,i)=>n+i.intervalMs,0)/e.length:0,h.frameCpuMs=e.length?e.reduce((n,i)=>n+i.cpuMs,0)/e.length:0,h.frameIntervalP95Ms=Gi(e.map(n=>n.intervalMs),.95),h.frameCpuP95Ms=Gi(e.map(n=>n.cpuMs),.95),h.frames=0,h.fpsAt=t,uo(),h.workspace==="bom"){let n=ze?.payload?.counts||{},i=[["Renderer","BoM DOM table"],["Schema",ze?.payload?.schema||"-"],["Grouped rows",n.rows||0],["Components",n.components||0],["DNP components",n.dnpComponents||0],["Extra columns",ze?.payload?.extraColumns?.length||0],["Frame interval",`${h.frameIntervalMs.toFixed(2)} ms avg / ${h.frameIntervalP95Ms.toFixed(2)} p95`],["CPU frame",`${h.frameCpuMs.toFixed(2)} ms avg / ${h.frameCpuP95Ms.toFixed(2)} p95`],["FPS",h.fps.toFixed(1)]];cs.innerHTML=i.map(([o,c])=>`<dt>${o}</dt><dd>${c}</dd>`).join("");return}let a=h.workspace==="schematic"&&A?A.stats():null,s=h.workspace==="schematic"&&Y?Y.stats():null,r=h.workspace==="schematic"&&A?Y?.active?[["Renderer","SVG DOM schematic detail"],["Pages",O.pages.length],["Mounted pages",s.mountedPages],["Active page",s.activePage],["DOM nodes",s.domNodes.toLocaleString()],["Indexed features",s.indexedFeatures.toLocaleString()],["Indexed nets",s.indexedNets.toLocaleString()],["SVG cache",`${s.cachedSvgPages} pages / ${(s.cachedSvgBytes/1048576).toFixed(1)} MB`],["Selection",`${s.selectionMs.toFixed(1)} ms`],["Active net",E.nets.find(n=>n.uid===O.activeNetUid)?.name||"-"],["Tracking links",`${a.netFlowSegments} total / ${a.netFlowIntrasheetSegments} local`],["Tracking verts",a.netFlowVertices.toLocaleString()],["Mount",`${s.mountMs.toFixed(1)} ms`],["Highlight",`${s.highlightMs.toFixed(1)} ms`],["Fallback",s.fallbackReason||"-"],["Frame interval",`${h.frameIntervalMs.toFixed(2)} ms avg / ${h.frameIntervalP95Ms.toFixed(2)} p95`],["CPU frame",`${h.frameCpuMs.toFixed(2)} ms avg / ${h.frameCpuP95Ms.toFixed(2)} p95`],["FPS",h.fps.toFixed(1)]]:[["Renderer",Y?"SVG DOM + WebGPU world":"WebGPU schematic world"],["Pages",O.pages.length],["Visible pages",O.visiblePages.length],["DOM pages",s?s.mountedPages:0],["DOM nodes",s?s.domNodes.toLocaleString():"0"],["Indexed SVG features",s?s.indexedFeatures.toLocaleString():"0"],["SVG cache",s?`${s.cachedSvgPages} pages / ${(s.cachedSvgBytes/1048576).toFixed(1)} MB`:"0 pages"],["JS heap",s?.heapMb?`${s.heapMb.toFixed(1)} MB`:"-"],["Hierarchy links",O.manifest.edges?.length||0],["Selected page",O.byId.get(h.selectedPageId)?.name||"-"],["Active net",E.nets.find(n=>n.uid===O.activeNetUid)?.name||"-"],["Tracking links",`${a.netFlowSegments} total / ${a.netFlowIntrasheetSegments} local`],["Downloaded",`${(A.downloadedBytes/1048576).toFixed(1)} MB`],["Resident vectors",`${(a.residentVectorBytes/1048576).toFixed(1)} MB`],["Vector pages",`${a.vectorChunks} loaded / ${a.vectorLoads} loading`],["Vector draw",`${a.vectorVertices.toLocaleString()} verts / ${a.vectorDrawChunks} chunks`],["Native detail",`${a.nativeDetailPages} pages @ ${a.nativePxPerMm} / ${a.nativeThresholdPxPerMm} px/mm`],["Vector failures",a.failedVectorChunks],["Truncated",a.truncatedVectors],["Frame interval",`${h.frameIntervalMs.toFixed(2)} ms avg / ${h.frameIntervalP95Ms.toFixed(2)} p95`],["CPU frame",`${h.frameCpuMs.toFixed(2)} ms avg / ${h.frameCpuP95Ms.toFixed(2)} p95`],["FPS",h.fps.toFixed(1)]]:[["Renderer","WebGPU semantic glTF"],["Mode",h.mode==="3d"?"3D":"Layer Compare"],["Visible layers",h.mode==="3d"?h.visible3dLayers.size:h.compareLayers.size],["Resident tiles",E.loaded.size],["Loading tiles",E.loading.size],["Failed tiles",E.failed.size],["Triangles",Math.round(h.triangles).toLocaleString()],["Downloaded",`${(h.loadedBytes/1048576).toFixed(1)} MB`],["Resident GLB",`${(h.residentTileBytes/1048576).toFixed(1)} MB`],["Resident GPU",`${(h.residentTileGpuBytes/1048576).toFixed(1)} MB`],["Tile loads",h.tileLoads.toLocaleString()],["Tile evictions",h.tileEvictions.toLocaleString()],["Tile scheduler",`${h.tileSchedulerMs.toFixed(2)} ms`],["Active net",E.nets.find(n=>Number(n.id)===h.activeNetId)?.name||"-"],["Frame interval",`${h.frameIntervalMs.toFixed(2)} ms avg / ${h.frameIntervalP95Ms.toFixed(2)} p95`],["CPU frame",`${h.frameCpuMs.toFixed(2)} ms avg / ${h.frameCpuP95Ms.toFixed(2)} p95`],["FPS",h.fps.toFixed(1)]];cs.innerHTML=r.map(([n,i])=>`<dt>${n}</dt><dd>${i}</dd>`).join("")}function ab(t){return`rgb(${t.slice(0,3).map(e=>Math.round(e*255)).join(" ")})`}function sb(){if(!Ae)return;let t=E.layers||[];if(!t.length){Ae.innerHTML='<div class="selection-empty" style="padding:40px;text-align:center;">No stackup information available for this board.</div>';return}let e=t.filter(k=>["copper","dielectric","paste","silkscreen","soldermask"].includes(k.role)),a=Ie.board?.stackup||{},s=k=>{if(k==null||k==="")return"None";let F=String(k);return L(F.includes(".")?F.split(".").pop():F)},r=(k,F=4)=>{let C=Number(k);return Number.isFinite(C)&&C>0?C.toFixed(F):"-"},n=(k,F=3)=>{let C=Number(k);return Number.isFinite(C)?C.toFixed(F):"-"},i=k=>{if(k==null||k==="")return"No";if(typeof k=="boolean")return k?"Yes":"No";let F=String(k).trim().toLowerCase(),C=F.includes(".")?F.split(".").pop():F;return["0","false","no","n","off","none"].includes(C)?"No":(["1","true","yes","y","on"].includes(C),"Yes")},o=k=>({copper:"Copper",dielectric:"Dielectric",paste:"Paste",silkscreen:"Silkscreen",soldermask:"Solder mask"})[k]||String(k||"Layer"),c=k=>k.role!=="dielectric"?"":k.type==="core"?"Core":k.type==="prepreg"||(k.material||"").toLowerCase().includes("prepreg")?"Prepreg":"Core",d=(k,F=4)=>{let C=Number(k.thickness_mm);return Number.isFinite(C)&&C>0?`${C.toFixed(F)} mm`:"Not specified"},f=k=>{let F=o(k.role),C=String(k.material||"").trim(),J=C&&C.toLowerCase()!==String(k.role||"").toLowerCase();if(k.role==="dielectric"){let oe=[J?C:"",r(k.epsilon_r,3)!=="-"?`\u03B5r ${r(k.epsilon_r,3)}`:"",r(k.loss_tangent,4)!=="-"?`tan \u03B4 ${r(k.loss_tangent,4)}`:""].filter(Boolean).join(" \xB7 ");return{primary:`${k.name} \xB7 ${c(k)}`,secondary:oe}}return{primary:[k.name,F,J?C:""].filter(Boolean).join(" \xB7 "),secondary:""}},p=0,v=0,x=0,b=0;e.forEach(k=>{b+=k.thickness_mm||0,k.role==="copper"?k.name.toLowerCase().includes("gnd")||k.name.toLowerCase().includes("pwr")||k.name.toLowerCase().includes("plane")?v++:p++:k.role==="dielectric"&&x++});let l=E.copperLayers||[],m=0,u=0,g=0,y=[...(E.manifest?.barrels||[]).filter(k=>k.kind==="via"),...[...E.features.values()].filter(k=>k.kind==="via")],w=Ii(l,y);m=w.counts.thru,u=w.counts.blind,g=w.counts.buried;let T=w.spans,I=30,M=I,R=[],S=new Map(e.map((k,F)=>[k,F])),N=rb(e),B=(k,F)=>{let C=N.get(k.name);if(C!==void 0)return C;let J=Number(k.stack_index);return Number.isFinite(J)?J:F+1e5},P=[...e].sort((k,F)=>{let C=B(k,S.get(k)||0),J=B(F,S.get(F)||0);return C!==J?C-J:(F.z_mm||0)-(k.z_mm||0)});P.forEach(k=>{let F=12;k.role==="dielectric"?F=Math.max(160,Math.min(360,(k.thickness_mm||.1)*140)):k.role==="copper"?F=22:k.role==="soldermask"&&(F=14),R.push({...k,svgY:M,svgHeight:F}),M+=F});let j=800,K=130,X=240,te=K+X+16,ne=te+84,je="";R.forEach(k=>{let F=k.color||"#7f7f7f";k.role==="copper"?F=k.color||"#f97316":k.role==="dielectric"?F="#a98d5c":k.role==="paste"?F="#cbd5e1":k.role==="soldermask"?F="#1b4332":k.role==="silkscreen"&&(F="#e2e8f0");let C=l.findIndex(Uo=>Uo.name===k.name),J=f(k),oe=k.svgY+k.svgHeight/2,ve=!!J.secondary&&k.svgHeight>=38,Mt=ve?oe-5:oe+3,Ns=L(k.id),Ma=L(k.name),He=Number.isFinite(Number(k.thickness_mm))&&Number(k.thickness_mm)>0,Po=L(He?d(k):"\u2014"),Do=L([J.primary,J.secondary,`Thickness ${d(k)}`].filter(Boolean).join("; "));je+=`
      <g class="stackup-svg-layer" data-layer-id="${Ns}" data-layer-name="${Ma}">
        <title>${Do}</title>
        <rect x="${K}" y="${k.svgY}" width="${X}" height="${k.svgHeight}" fill="${F}" opacity="0.85" rx="1"/>
        <text x="${K-8}" y="${k.svgY+k.svgHeight/2+3}" fill="var(--muted)" font-size="9px" text-anchor="end" font-weight="700">
          ${k.role==="copper"?C+1:""}
        </text>
        <path class="stackup-layer-dimension" d="M ${te+6} ${k.svgY+1} H ${te} V ${k.svgY+k.svgHeight-1} H ${te+6}" />
        <text class="stackup-layer-thickness" x="${te+10}" y="${oe+3}" fill="var(--muted)" font-size="8.5px" font-weight="650">
          ${Po}
        </text>
        <text class="stackup-layer-name" x="${ne}" y="${Mt}" fill="var(--foreground)" font-size="9px" font-weight="650">
          ${L(J.primary)}
        </text>
        ${ve?`<text class="stackup-layer-metadata" x="${ne}" y="${oe+10}" fill="var(--muted)" font-size="8px">${L(J.secondary)}</text>`:""}
      </g>
    `});let le="",Fe=R.filter(k=>k.role==="copper");T.forEach((k,F)=>{let C=R.find(He=>He.name===k.startName),J=R.find(He=>He.name===k.endName);if(!C||!J)return;let oe=C.svgY,ve=J.svgY+J.svgHeight,Mt=K+(F+1)*X/(T.length+1),Ns=k.type==="thru"?"Thru":k.type==="blind"?"Blind":"Buried",Ma=`var(--stackup-via-${k.type})`;le+=`
      <g class="stackup-svg-via" data-via-type="${k.type}">
        <title>${Ns}: ${k.startName} \u2192 ${k.endName}</title>
        ${Fe.map(He=>He.svgY>=C.svgY&&He.svgY<=J.svgY?`<rect x="${Mt-5}" y="${He.svgY}" width="10" height="${He.svgHeight}" fill="${Ma}" rx="0.5" />`:"").join("")}
        <rect x="${Mt-2}" y="${oe}" width="4" height="${ve-oe}" fill="${Ma}" opacity="0.95" />
        <rect x="${Mt-.75}" y="${oe-1}" width="1.5" height="${ve-oe+2}" fill="var(--panel)" opacity="0.9" />
      </g>
    `});let De=`
    <svg class="stackup-visual-svg" viewBox="0 0 ${j} ${M+10}" width="${j}" height="${M+10}">
      <g class="stackup-svg-column-headings" aria-hidden="true">
        <text x="${te+10}" y="15">Thickness</text>
        <text x="${ne}" y="15">Layer / material properties</text>
      </g>
      <g class="stackup-total-dimension" aria-label="Total board thickness ${b.toFixed(4)} millimetres">
        <path d="M 76 ${I} H 68 V ${M} H 76" />
        <text x="68" y="15">Total ${b.toFixed(4)} mm</text>
      </g>
      ${je}
      ${le}
    </svg>
    <div class="stackup-via-legend" aria-label="Via span legend">
      <span><i data-via-type="thru"></i>Thru</span>
      <span><i data-via-type="blind"></i>Blind</span>
      <span><i data-via-type="buried"></i>Buried</span>
    </div>
  `,me="";P.forEach(k=>{let F="silk";k.role==="copper"?F="copper":k.role==="dielectric"?F="dielectric":k.role==="paste"?F="paste":k.role==="soldermask"&&(F="mask");let C=c(k),J=L(k.id),oe=L(k.name),ve=f(k);me+=`
      <tr data-layer-id="${J}" data-layer-name="${oe}" tabindex="0" aria-label="${L(`${ve.primary}; thickness ${d(k)}`)}">
        <td><strong>${oe}</strong></td>
        <td><span class="stackup-badge ${F}">${k.role}</span></td>
        <td>${C||"-"}</td>
        <td>${L(k.material||"-")}</td>
        <td>${k.role==="dielectric"?r(k.epsilon_r,3):"-"}</td>
        <td>${k.role==="dielectric"?r(k.loss_tangent,4):"-"}</td>
        <td>${k.thickness_mm?k.thickness_mm.toFixed(4)+" mm":"-"}</td>
      </tr>
    `});let Ve="",Ue=Ie.board?.net_classes||[],tt=k=>{let F=n(k);return F==="-"?F:`${F} mm`};Ue.length?Ue.forEach(k=>{Ve+=`
        <tr>
          <td><strong>${k.name}</strong></td>
          <td>${tt(k.track_width)}</td>
          <td>${tt(k.clearance)}</td>
          <td>${tt(k.diff_pair_width)}</td>
          <td>${tt(k.diff_pair_gap)}</td>
          <td>${Number.isFinite(Number(k.via_diameter))?`${n(k.via_drill)}/${n(k.via_diameter)} mm`:"-"}</td>
        </tr>
      `}):Ve=`
      <tr>
        <td colspan="6" class="selection-empty" style="text-align: center;">No design rules or impedance classes defined.</td>
      </tr>
    `,Ae.innerHTML=`
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
          <span>${b.toFixed(4)} mm</span>
        </div>
        <div class="stackup-summary-card">
          <label>Copper Layers</label>
          <span>${l.length} (${p} Sig / ${v} Plane)</span>
        </div>
        <div class="stackup-summary-card">
          <label>Dielectrics</label>
          <span>${x} Layers</span>
        </div>
        <div class="stackup-summary-card">
          <label>Thru Vias</label>
          <span>${m}</span>
        </div>
        <div class="stackup-summary-card">
          <label>Blind Vias</label>
          <span>${u}</span>
        </div>
        <div class="stackup-summary-card">
          <label>Buried Vias</label>
          <span>${g}</span>
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
  `;let Bt=(k,F)=>{Ae.querySelectorAll(".stackup-svg-layer").forEach(C=>{let J=C.dataset.layerId===k;C.classList.toggle("active",J&&F)}),Ae.querySelectorAll(".stackup-table tbody tr[data-layer-id]").forEach(C=>{let J=C.dataset.layerId===k;C.classList.toggle("active",J&&F)})},_s=k=>{let F=Ae.querySelector(".stackup-diagram-card"),C=Ae.querySelector(`.stackup-svg-layer[data-layer-id="${CSS.escape(k)}"]`);if(!F||!C||F.scrollHeight<=F.clientHeight)return;let J=F.getBoundingClientRect(),oe=C.getBoundingClientRect(),ve=F.scrollTop+oe.top-J.top-(F.clientHeight-oe.height)/2,Mt=window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;F.scrollTo({top:Math.max(0,ve),behavior:Mt?"auto":"smooth"})},Ia=(k,{revealDiagram:F=!1}={})=>{k.forEach(C=>{let J=()=>{let ve=C.dataset.layerId;Bt(ve,!0),F&&_s(ve)},oe=()=>Bt(null,!1);C.addEventListener("mouseenter",J),C.addEventListener("mouseleave",oe),F&&(C.addEventListener("focus",J),C.addEventListener("blur",oe))})};Ia(Ae.querySelectorAll(".stackup-svg-layer")),Ia(Ae.querySelectorAll(".stackup-table tbody tr[data-layer-id]"),{revealDiagram:!0})}function rb(t){let e=t.filter(r=>r.role==="dielectric");if(!(e.length===1&&e[0]?.name==="Board"))return new Map;let s=new Map;return["F.SilkS","F.Paste","F.Mask","F.Cu","Board","B.Cu","B.Mask","B.Paste","B.SilkS"].forEach((r,n)=>s.set(r,n)),s}function So(){let t=null;return{begin(){return t?.abort(),t=new AbortController,t},owns(e){return e!==null&&e===t&&!e.signal.aborted},cancel(){t?.abort(),t=null}}}async function Ao(t,e,{owner:a,bundleUrl:s,loadBundle:r,now:n=()=>performance.now()}){let i=n(),o={},{signal:c}=e,d=()=>a.owns(e)&&t.isConnected;try{t.renderLoading();let f=n(),{bundle:p,topology:v,semanticGeometry:x,assetCache:b}=await r(s,o,c);if(o.bundle_group_total_ms=n()-f,!d())return;t.renderShell();let l=n(),m=await t.mountViewer({topology:v,semanticGeometry:x,readiness:p.readiness,assetCache:b,signal:c});if(!d()){m?.dispose?.();return}t.publishController(m),o.mount_and_first_frame_ms=n()-l,Object.assign(o,m?.performance||{}),o.reload_to_visible_ms=n()-i,t.emitReady({schema:"prism.semantic_viewer_performance.a0",milestone:"board-visible",readiness_stage:p.readiness?.stage||"semantic-ready",readiness_progress:p.readiness?.progress??100,timings:o})}catch(f){if(!d())return;t.renderError(f),t.emitError(f)}}var nb="prism.visualizer_bundle.a0";function ib(){return`
    <style>
      ${Ar}
      #app { grid-template-columns: minmax(0, 1fr) 376px; }
      #app.panel-collapsed { grid-template-columns: minmax(0, 1fr) 46px; }
      #app.workspace-stackup { grid-template-columns: minmax(0, 1fr); }
      #selection-card { display: none !important; }
      #scene-stats {
        position: absolute; top: 12px; right: 12px; z-index: 4; margin: 0; padding: 8px 10px;
        display: grid; grid-template-columns: auto auto; gap: 2px 12px;
        background: rgb(15 20 28 / 0.82); color: #dbe4f0; border-radius: 6px;
        font: 11px/1.4 "SFMono-Regular", Consolas, monospace; font-variant-numeric: tabular-nums;
        pointer-events: none;
      }
      #scene-stats[hidden] { display: none; }
      #scene-stats dt { color: #8a97a8; }
      #scene-stats dd { margin: 0; text-align: right; }
    </style>
    <main id="app">
      <section class="viewport-shell">
        <canvas id="viewport"></canvas>
        <div id="stackup-workspace-view" hidden></div>
        <div id="panel-labels"></div>
        <div id="selection-card" hidden></div>
        <canvas id="axis-gizmo" width="112" height="112" title="Click an axis to align the camera"></canvas>
        <dl id="scene-stats" hidden></dl>
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
  `}function ob(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}async function _o(t,e=null,a="fetch",s=void 0){let r=performance.now(),n=await fetch(t,{cache:"no-store",signal:s});if(!n.ok)throw new Error(`Failed to load ${t}: ${n.status}`);let i=await n.json();return e&&(e[`${a}_fetch_parse_ms`]=performance.now()-r,e[`${a}_content_length`]=Number(n.headers.get("content-length")||0)),i}async function cb(t,e,a){let s=new URL(t,document.baseURI).toString(),r=new URL(s).searchParams.get("viewer")||"",n=Ct.open(),i=await n.peekJson(s).catch(()=>null),o=!!i;i||(i=await _o(s,e,"bundle",a),Zt(i)&&n.store(s,new TextEncoder().encode(JSON.stringify(i)))),e&&(e.bundle_from_cache=o);let c=Zt(i)&&n.enabled?n:null;if(i.schema!==nb)throw new Error(`Unsupported visualizer bundle schema: ${i.schema||"missing"}`);let d=new URL(i.topology||"topology.json",s),f=new URL(i.semantic_geometry||"semantic_geometry.json",s),p=(b,l)=>c?c.fetchJson(b.toString(),{signal:a}):_o(b,e,l,a),[v,x]=await Promise.all([p(d,"topology"),p(f,"semantic_geometry")]);return{bundle:i,topology:v,semanticGeometry:Sa(x,s,i,r),assetCache:c}}var Mr=class extends HTMLElement{static get observedAttributes(){return["bundle-url","workspace"]}constructor(){super(),this.attachShadow({mode:"open"}),this.controller=null,this.reloadOwner=So(),this.pendingSelection=null,this.pendingHiddenComponents=null,this.pendingOccurrences=null,this.reloadQueued=!1,this.reloadSource=null}connectedCallback(){this.queueReload()}disconnectedCallback(){this.reloadOwner.cancel(),this.controller?.dispose?.(),this.controller=null,this.reloadSource=null}attributeChangedCallback(e,a,s){if(!(!this.isConnected||a===s)){if(e==="workspace"){this.controller?.setWorkspace?.(this.workspace);return}this.queueReload()}}get workspace(){return this.getAttribute("workspace")==="stackup"?"stackup":"pcb"}queueReload(){let e=this.getAttribute("bundle-url");!e||e===this.reloadSource||(this.reloadSource=e,!this.reloadQueued&&(this.reloadQueued=!0,queueMicrotask(()=>{this.reloadQueued=!1,this.isConnected&&this.reload()})))}async reload(){let e=this.getAttribute("bundle-url"),a=this.reloadOwner.begin();if(this.controller?.dispose?.(),this.controller=null,!e){this.shadowRoot.innerHTML="<style>:host{display:block;height:100%;font:14px system-ui;color:#94a3b8}</style><div>Semantic bundle URL is missing.</div>";return}await Ao(this,a,{owner:this.reloadOwner,bundleUrl:e,loadBundle:cb})}renderLoading(){this.shadowRoot.innerHTML='<style>:host{display:block;height:100%;background:#020817;color:#e5e7eb;font:14px system-ui}</style><div style="display:grid;place-items:center;height:100%">Loading semantic visualizer...</div>'}renderShell(){this.shadowRoot.innerHTML=ib()}renderError(e){console.error(e),this.shadowRoot.innerHTML=`
      <style>
        :host{display:block;height:100%;background:#020817;color:#e5e7eb;font:14px system-ui}
        .error{height:100%;display:grid;place-items:center;padding:24px}
        pre{max-width:100%;white-space:pre-wrap;color:#fecaca;background:#111827;border:1px solid #374151;padding:16px}
      </style>
      <div class="error"><pre>${ob(e?.stack||e?.message||String(e))}</pre></div>
    `}mountViewer({topology:e,semanticGeometry:a,readiness:s,assetCache:r=null,signal:n}){return yr({root:this.shadowRoot,topology:e,semanticGeometry:a,readiness:s,workspaceScope:"3d",assetCache:r,deferComponents:!!this.pendingOccurrences,isActive:()=>this.getAttribute("active")==="true",onSelectionChange:i=>{n.aborted||this.dispatchEvent(new CustomEvent("prism-semantic-viewer:selectionchange",{bubbles:!0,composed:!0,detail:{selection:i}}))},onPerformanceEvent:i=>{n.aborted||(console.info("[prism-3d-perf]",i),this.dispatchEvent(new CustomEvent("prism-semantic-viewer:performance",{bubbles:!0,composed:!0,detail:i})))}})}publishController(e){this.controller=e,this.controller?.setWorkspace?.(this.workspace),this.pendingHiddenComponents&&this.controller?.setHiddenComponents?.(this.pendingHiddenComponents),this.pendingOccurrences&&this.controller?.setOccurrences?.(this.pendingOccurrences),this.pendingGpuBudget!=null&&this.controller?.setGpuBudget?.(this.pendingGpuBudget),this.pendingSelection&&this.controller?.setSelection?.(this.pendingSelection),this.pendingHighlightedNets?.length&&this.controller?.setHighlightedNets?.(this.pendingHighlightedNets)}emitReady(e){console.info("[prism-3d-perf]",e),this.dispatchEvent(new CustomEvent("prism-semantic-viewer:ready",{bubbles:!0,composed:!0,detail:e}))}emitError(e){this.dispatchEvent(new CustomEvent("prism-semantic-viewer:error",{bubbles:!0,detail:{error:e}}))}setSelection(e){this.pendingSelection=e||null,this.controller?.setSelection?.(this.pendingSelection)}setHighlightedNets(e){this.pendingHighlightedNets=Array.isArray(e)?[...e]:[],this.controller?.setHighlightedNets?.(this.pendingHighlightedNets)}setHiddenComponents(e){this.pendingHiddenComponents=Array.isArray(e)?[...e]:[],this.controller?.setHiddenComponents?.(this.pendingHiddenComponents)}setOccurrences(e){this.pendingOccurrences=e==null?null:Array.from(e,a=>a?.matrix?{matrix:[...a.matrix],key:a.key}:[...a]),this.controller?.setOccurrences?.(this.pendingOccurrences)}pickAt(e,a){return Promise.resolve(this.controller?.pickAt?.(e,a)??null)}projectComponent(e,a){return this.controller?.projectComponent?.(e,a)??null}setStatsOverlay(e){this.controller?.setStatsOverlay?.(e)}getStats(){return this.controller?.stats?.()??null}setLodOverride(e){this.controller?.setLodOverride?.(e)}setGpuBudget(e){this.pendingGpuBudget=e,this.controller?.setGpuBudget?.(e)}projectPoint(e,a){return this.controller?.projectPoint?.(e,a)??null}resize(){this.controller?.resize?.()}};function No(){customElements.get("prism-semantic-viewer")||customElements.define("prism-semantic-viewer",Mr)}var lb=[0,0,0,1,1,1],Ss=class t{static async create(e){return new t(await _t.create(e))}constructor(e){this.host=e,this.canvas=e.canvas,this.device=e.device,e.alwaysInstanced=!0,e.setOccurrences([]),this.assets=new Map,this.order=[],this.frameStats={triangles:0,draws:0}}asset(e){let a=this.assets.get(e);return a||(a=new _t(this.canvas,this.device,{shareFrom:this.host}),this.assets.set(e,a)),a}standIn(e,a){let s=this.asset(e);return s.standIn||(s.standIn=!0,s.setBoardBounds(lb),s.setLodOverride(qn)),s.boxColor=[...a],s}removeAsset(e){let a=this.assets.get(e);a&&(a.dispose(),this.assets.delete(e))}get renderers(){return this.order.map(e=>this.assets.get(e)).filter(Boolean)}setOccurrences(e){this.order=[...e.keys()].filter(s=>this.assets.has(s));for(let[s,r]of this.assets)e.has(s)||r.setOccurrences([]);for(let s of this.order)this.assets.get(s).setOccurrences(e.get(s));let a=0;for(let s of this.renderers)s.occurrenceBase=a,a+=s.occurrenceCount;this.occurrenceCount=a}locate(e){for(let a of this.renderers){let s=e-a.occurrenceBase;if(s>=0&&s<a.occurrenceCount)return{renderer:a,local:s}}return null}keyOf(e){let a=this.locate(e);return a?a.renderer.occurrenceKeys[a.local]??null:null}setSelectedOccurrence(e){let a=e>=0?this.locate(e):null;for(let s of this.renderers)s.selectedOccurrence=!s.standIn&&a?.renderer===s?a.local:-1}resize(){this.host.resize()}render(e,a){let s=this.host;s.resize();let r=this.renderers.filter(f=>f.occurrenceCount>0),n=this.device.createCommandEncoder(),i=r.filter(f=>f.encodeCull(n,e)),o=n.beginRenderPass({colorAttachments:[{view:s.context.getCurrentTexture().createView(),clearValue:{r:.91,g:.93,b:.94,a:1},loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:s.depth.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}});jo(o,e.viewport,this.canvas);let c=0,d=0;for(let f of r){let p=f.encodeDraws(o,e,a(f));c+=p.triangles,d+=p.draws}o.end(),this.device.queue.submit([n.finish()]);for(let f of i)f.readCullCounts();this.frameStats={triangles:Math.round(c),draws:d}}pick(e,a,s,r){let n=this.host.pickSerial.then(()=>this.performPick(e,a,s,r));return this.host.pickSerial=n.catch(()=>0),n}async performPick(e,a,s,r){let n=this.host;n.resize();let i=Math.max(0,Math.min(this.canvas.width-1,Math.floor(a))),o=Math.max(0,Math.min(this.canvas.height-1,Math.floor(s))),c=this.device.createCommandEncoder(),d=c.beginRenderPass({colorAttachments:[{view:n.pickTexture.createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:n.depth.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}});jo(d,e.viewport,this.canvas);for(let v of this.renderers)v.occurrenceCount>0&&v.encodePick(d,e,r(v));d.end();let f=await n.readPick(c,i,o),p=f.occurrenceIndex>=0?this.locate(f.occurrenceIndex):null;return{...f,occurrenceKey:p?p.renderer.occurrenceKeys[p.local]??null:null,renderer:p?.renderer||null,standIn:!!p?.renderer?.standIn}}gpuMemoryBytes(){let e=0;for(let a of this.renderers)e+=a.gpuMemoryBytes();return e-Math.max(0,this.renderers.length-1)*this.canvas.width*this.canvas.height*12}cullCounts(){let e={full:0,board:0,box:0,culled:0};for(let a of this.renderers)if(a.occurrenceCount)for(let s of Object.keys(e))e[s]+=a.cullCounts[s]||0;return e}dispose(){for(let e of[...this.assets.keys()])this.removeAsset(e);this.host.dispose(),this.host.context?.unconfigure?.(),this.device.destroy?.()}};function jo(t,e,a){let s=Math.max(0,Math.min(a.width-1,Math.floor(e.x))),r=Math.max(0,Math.min(a.height-1,Math.floor(e.y))),n=Math.max(1,Math.min(a.width-s,Math.floor(e.width))),i=Math.max(1,Math.min(a.height-r,Math.floor(e.height)));t.setViewport(s,r,n,i,0,1),t.setScissorRect(s,r,n,i)}var db="prism.system_scene.a0",Rr=.001,ub=6,fb=5e3,Fo=1.5*1024*1024*1024,Sr=Object.freeze({restricted:{color:[.55,.57,.6,1],label:"Restricted"},loading:{color:[.7,.76,.82,1],label:"Loading\u2026"},building:{color:[.62,.72,.84,1],label:"Building 3D view\u2026"},missing:{color:[.78,.76,.7,1],label:"No 3D view"},failed:{color:[.86,.6,.56,1],label:"3D view failed"},unknown:{color:[.78,.76,.7,1],label:""}}),Co=Object.freeze([Rr,0,0,0,0,Rr,0,0,0,0,Rr,0,0,0,0,1]);function ka(t,e){let a=new Array(16);for(let s=0;s<4;s+=1)for(let r=0;r<4;r+=1)a[s*4+r]=t[r]*e[s*4]+t[4+r]*e[s*4+1]+t[8+r]*e[s*4+2]+t[12+r]*e[s*4+3];return a}function hb([t,e,a]){return[1,0,0,0,0,1,0,0,0,0,1,0,t,e,a,1]}function bb([t,e,a]){return[t,0,0,0,0,e,0,0,0,0,a,0,0,0,0,1]}function pb(t,e){return ka(Co,ka(t,e))}function gb(t,e){let a=e.minMm,s=e.maxMm.map((r,n)=>Math.max(r-a[n],.2));return ka(Co,ka(t,ka(hb(a),bb(s))))}function mb(t,e,a){return t.restricted?"restricted":!t.assetId||!e?"missing":a==="loaded"?null:a==="failed"?"failed":e.status==="ready"?e.bundleUrl&&e.bundleToBoard?"loading":"building":Sr[e.status]?e.status:"unknown"}function Bo(t){return(t?.occurrences||[]).filter(e=>e.kind==="board"||e.restricted)}var As=class{constructor({canvas:e,labelsEl:a,statsEl:s,onSelectionChange:r=()=>{},onStatus:n=()=>{}}){this.canvas=e,this.labelsEl=a,this.statsEl=s,this.onSelectionChange=r,this.onStatus=n,this.descriptor=null,this.assets=new Map,this.placed=[],this.selection=null,this.gpuBudgetBytes=Fo,this.showStats=!1,this.showLabels=!0,this.disposed=!1,this.framed=!1,this.frameSamples=[],this.lastFrame=performance.now(),this.cache=Ct.open()}async init(){this.scene=await Ss.create(this.canvas),this.camera=new Pt([-.1,-.1,-.01,.1,.1,.01]),this.bindInteractions(),this.loop=e=>{this.disposed||(this.frame(e),this.frameId=requestAnimationFrame(this.loop))},this.frameId=requestAnimationFrame(this.loop)}dispose(){this.disposed=!0,cancelAnimationFrame(this.frameId),this.unbind?.(),this.scene?.dispose(),this.scene=null}setDescriptor(e){if(e?.schema!==db)throw new Error(`Unsupported system scene schema: ${e?.schema||"missing"}`);this.descriptor=e;let a=new Set;for(let s of e.assets||[]){a.add(s.assetId);let r=this.assets.get(s.assetId);if(r&&r.bundleUrl===s.bundleUrl&&r.state!=="failed"){r.descriptor=s;continue}r&&this.dropAsset(s.assetId);let n={descriptor:s,bundleUrl:s.bundleUrl,state:"waiting",componentTier:"idle",componentEntries:[],componentsWantedAt:0};this.assets.set(s.assetId,n),s.status==="ready"&&s.bundleUrl&&s.bundleToBoard&&this.loadAsset(s.assetId,n)}for(let s of[...this.assets.keys()])a.has(s)||this.dropAsset(s);this.place()}dropAsset(e){this.assets.get(e)?.abort?.abort(),this.assets.delete(e),this.scene?.removeAsset(e)}async loadAsset(e,a){a.state="loading",a.abort=new AbortController;let s=a.abort.signal,r=()=>!this.disposed&&this.assets.get(e)===a&&!s.aborted;try{let n=new URL(a.bundleUrl,document.baseURI).toString(),i=await fetch(n,{cache:"no-store",signal:s});if(!i.ok)throw new Error(`Failed to load ${n}: ${i.status}`);let o=await i.json();if(!r())return;let c=o.readiness?.revision||a.descriptor.sourceRevisionKey||"",d=Zt(o)&&this.cache.enabled?this.cache:null;a.cache=d;let f=async u=>{if(d)return d.fetchJson(u,{signal:s});let g=await fetch(u,{cache:"no-store",signal:s});if(!g.ok)throw new Error(`Failed to load ${u}: ${g.status}`);return g.json()},p=new URL(o.semantic_geometry||"semantic_geometry.json",n).toString(),v=Sa(await f(p),n,o,c),x=v.assets?.scene_manifest||v.semantic_gltf?.path;if(!x)throw new Error("The bundle has no scene manifest");a.manifestUrl=new URL(x,n).toString();let b=await f(a.manifestUrl);if(!r())return;a.geometry=v,a.manifest=b,a.copperLayers=(b.layers||[]).filter(u=>u.role==="copper"||String(u.name).endsWith(".Cu")),a.visibleLayers=new Set(a.copperLayers.map(u=>Number(u.id))),a.componentFeatures=new Map((b.components||[]).map(u=>[u.designator,u])),a.features=new Map;for(let u of b.objectFeatures||[])a.features.set(Number(u.id),u);for(let u of b.components||[])a.features.set(Number(u.featureId),{...u,kind:"component"});a.fetchBytes=d?u=>d.fetchBytes(u,{signal:s}):void 0;let l=this.scene.asset(e);l.setBarrels(b.barrels||[]);let m=null;if(v.assets?.base_board_glb){let u=await $e(v.assets.base_board_glb,{defaultFeatureId:0,fetchBytes:a.fetchBytes});if(!r())return;let g=u.primitives.filter(y=>Dt(y)!=="pad");for(let y of Ut(g,Dt))l.addPrimitive(y,{kind:"board",boardRole:y.groupKey,layerId:0,material:y.material,color:y.material.baseColor});m=ta(g.map(y=>y.bounds))}a.boardBounds=m||Lt(b.bbox),l.setBoardBounds(a.boardBounds),a.state="loaded",this.place(),await this.loadTiles(a,l,r),r()&&this.emitStatus()}catch(n){if(!r())return;console.warn(`System scene: asset ${e} failed to load`,n),a.state="failed",a.error=n?.message||String(n),this.scene.removeAsset(e),this.place()}}async loadTiles(e,a,s){let r=[...e.manifest.tiles||[]],n=new Map((e.manifest.layers||[]).map(o=>[Number(o.id),o])),i=async()=>{for(;r.length&&s();){let o=r.shift();try{let c=new URL(o.path,e.manifestUrl).toString(),d=await $e(c,{fetchBytes:e.fetchBytes,fetchCache:"no-store"}).catch(()=>$e(c,{fetchBytes:e.fetchBytes,fetchCache:"no-store"}));if(!s())return;let f=Number(o.layerId),p=n.get(f);for(let v of d.primitives)a.addPrimitive(v,{kind:"copper",tileId:o.id,layerId:f,innerCopper:Ba(f,e.copperLayers),color:Fa(p,e.copperLayers),baseZ:Number(p?.z_mm||0)/1e3,material:{baseColor:[1,1,1,1],metallic:.78,roughness:.32}})}catch(c){s()&&console.warn(`System scene: tile ${o.id} failed to load`,c)}}};await Promise.all(Array.from({length:ub},i))}async loadComponents(e,a){let s=a.geometry?.assets?.components_glb;if(!(!s||a.componentTier!=="idle")){a.componentTier="loading";try{let r=await $e(s,{componentFeatures:a.componentFeatures,fetchBytes:a.fetchBytes});if(this.disposed||this.assets.get(e)!==a||!this.scene?.assets.has(e))return;let n=this.scene.asset(e);a.componentEntries=Ut(r.primitives).map(i=>n.addPrimitive(i,{kind:"component",layerId:0,material:i.material,color:i.material.baseColor})),a.componentTier="loaded"}catch(r){a.componentTier="idle",console.warn(`System scene: components of ${e} failed to load`,r)}}}place(){if(!this.scene||!this.descriptor)return;let e=new Map((this.descriptor.assets||[]).map(r=>[r.assetId,r])),a=new Map,s=[];for(let r of Bo(this.descriptor)){let n=r.assetId?e.get(r.assetId):null,i=r.assetId?this.assets.get(r.assetId):null,o=mb(r,n,i?.state),c,d,f;if(!o)c=r.assetId,d=pb(r.worldMatrix,n.bundleToBoard),f=Vt(d,i.boardBounds);else{if(!r.boundsMm)continue;c=`stand-in:${o}`,this.scene.standIn(c,Sr[o].color),d=gb(r.worldMatrix,r.boundsMm),f=Vt(d,[0,0,0,1,1,1])}a.has(c)||a.set(c,[]),a.get(c).push({matrix:d,key:r.path}),s.push({occurrence:r,rendererId:c,matrix:d,worldBounds:f,standIn:o})}for(let r of this.scene.assets.keys())a.has(r)||a.set(r,[]);this.scene.setOccurrences(a),this.placed=s,this.placedByKey=new Map(s.map(r=>[r.occurrence.path,r])),this.renderLabels(),this.sceneBounds=ta(s.map(r=>r.worldBounds)),this.sceneBounds&&(this.camera.sceneRadius=Rt(this.sceneBounds),this.framed||(this.camera.frame(this.sceneBounds),this.camera.snap(),this.framed=!0)),this.selection&&!this.placedByKey.has(this.selection.key)?this.select(null):this.selection&&this.select(this.selection.key,this.selection.featureId,{quiet:!0}),this.emitStatus()}status(){let e={boards:0,loaded:0,loading:0,restricted:0,building:0,missing:0,failed:0,unknown:0,unplaced:0};for(let a of Bo(this.descriptor)){e.boards+=1;let s=this.placedByKey?.get(a.path);s?s.standIn?e[s.standIn]!==void 0&&(e[s.standIn]+=1):e.loaded+=1:e.unplaced+=1}return e}emitStatus(){this.onStatus(this.status())}frameAll(){this.sceneBounds&&this.camera.frame(this.sceneBounds)}frameOccurrence(e){let a=this.placedByKey?.get(String(e));a&&this.camera.frame(a.worldBounds)}panel(){return{layerId:0,viewport:{x:0,y:0,width:this.canvas.width,height:this.canvas.height},matrix:this.camera.matrix(this.canvas.width,this.canvas.height,!1),lod:this.cameraLod()}}cameraLod(){let{back:e}=this.camera.basis();return{eye:at(this.camera.focus,We(e,this.camera.distance)),orthographic:!1,pixelScale:this.canvas.height/2/Math.tan(this.camera.fov/2)}}optionsFor(e){return{activeNetId:0,selectedFeatureId:this.selection&&this.selection.renderer===e&&this.selection.featureId||0,time:performance.now()/1e3,visibleLayers:this.assetFor(e)?.visibleLayers||new Set,showBoard:!0,showComponents:!0,componentOpacity:1,boardOpacity:1,isolateNet:!1}}assetFor(e){for(let[a,s]of this.assets)if(this.scene.assets.get(a)===e)return s;return null}frame(e){let a=performance.now(),s=Math.min(.05,(e-this.lastFrame)/1e3),r=e-this.lastFrame;this.lastFrame=e,this.camera.update(s),this.scene.resize(),this.currentPanel=this.panel(),this.scene.render(this.currentPanel,n=>this.optionsFor(n)),this.manageTiers(e),this.updateLabels(),this.frameSamples.push([r,performance.now()-a]),this.frameSamples.length>240&&this.frameSamples.shift(),this.showStats&&e-(this.statsAt||0)>250&&(this.statsAt=e,this.renderStats())}manageTiers(e){if(e-(this.tiersAt||0)<250)return;this.tiersAt=e;for(let[s,r]of this.assets){let n=this.scene.assets.get(s);r.state!=="loaded"||!n||n.cullCounts.full>0&&(r.componentsWantedAt=e,r.componentTier==="idle"&&this.loadComponents(s,r))}let a=this.scene.gpuMemoryBytes();if(!(a<=this.gpuBudgetBytes)){for(let[s,r]of this.assets)if(!(r.componentTier!=="loaded"||e-r.componentsWantedAt<=fb)&&(this.scene.assets.get(s)?.removeEntries(r.componentEntries),r.componentEntries=[],r.componentTier="idle",r.componentEvictions=(r.componentEvictions||0)+1,a=this.scene.gpuMemoryBytes(),a<=this.gpuBudgetBytes))break}}renderLabels(){this.labelsEl&&this.labelsEl.replaceChildren(...this.placed.map(e=>{let a=document.createElement("div");a.className=`scene-label${e.standIn?` stand-in ${e.standIn}`:""}`;let s=document.createElement("strong");s.textContent=e.occurrence.displayPath||e.occurrence.labels?.join(" / ")||e.occurrence.path,a.append(s);let r=e.standIn?Sr[e.standIn]?.label:"";if(r){let n=document.createElement("span");n.textContent=r,a.append(n)}return a.dataset.key=e.occurrence.path,e.label=a,a}))}updateLabels(){if(!this.labelsEl||!this.currentPanel||(this.labelsEl.hidden=!this.showLabels,!this.showLabels))return;let e=this.canvas.getBoundingClientRect(),a=e.width/Math.max(1,this.canvas.width),s=e.height/Math.max(1,this.canvas.height);for(let r of this.placed){if(!r.label)continue;let[n,i,,o,c,d]=r.worldBounds,f=Ht(this.currentPanel.matrix,[(n+o)/2,(i+c)/2,d],this.currentPanel.viewport),p=f&&f.x>=0&&f.y>=0&&f.x<=this.canvas.width&&f.y<=this.canvas.height;r.label.hidden=!p,p&&(r.label.style.transform=`translate(${(f.x*a).toFixed(1)}px, ${(f.y*s).toFixed(1)}px) translate(-50%, -100%)`),r.label.classList.toggle("selected",this.selection?.key===r.occurrence.path)}}async pickAt(e,a){if(!this.currentPanel||!this.scene)return null;let s=this.canvas.getBoundingClientRect(),r=await this.scene.pick(this.currentPanel,(e-s.left)*this.canvas.width/s.width,(a-s.top)*this.canvas.height/s.height,i=>this.optionsFor(i)),n=r.occurrenceKey!=null?this.placedByKey.get(r.occurrenceKey):null;return{...r,renderer:void 0,occurrence:n?.occurrence||null,selection:n?this.describe(n,r.featureId):null}}describe(e,a){let s=e.occurrence,r={occurrence:s.path,displayPath:s.displayPath,instanceId:s.instanceId,restricted:!!s.restricted,standIn:e.standIn||null},n=e.standIn?null:this.assets.get(s.assetId),i=a&&n?n.features.get(Number(a)):null;if(!i)return{kind:"board",...r};let o=i.designator||i.reference||i.componentRef||null;return{kind:i.kind==="component"?"component":"feature",...r,featureId:Number(a),reference:o}}select(e,a=0,{quiet:s=!1}={}){let r=e!=null?this.placedByKey?.get(String(e)):null;if(!r){let d=!!this.selection;return this.selection=null,this.scene?.setSelectedOccurrence(-1),d&&!s&&this.onSelectionChange(null),null}let n=this.scene.assets.get(r.rendererId),i=n.occurrenceKeys.indexOf(r.occurrence.path),o=n.occurrenceBase+i;this.selection={key:r.occurrence.path,featureId:r.standIn?0:a,renderer:n,index:o},this.scene.setSelectedOccurrence(r.standIn?-1:o);let c=this.describe(r,this.selection.featureId);return s||this.onSelectionChange(c),c}async clickAt(e,a){let s=await this.pickAt(e,a);if(!s?.occurrence)return this.select(null);let r=s.selection?.kind==="component"?s.featureId:0;return this.select(s.occurrence.path,r)}projectPoint(e,a){let s=this.placedByKey?.get(String(e));if(!s||!this.currentPanel)return null;let r=Ht(this.currentPanel.matrix,oa(s.matrix??zt,a),this.currentPanel.viewport);if(!r)return null;let n=this.canvas.getBoundingClientRect();return{x:n.left+r.x*n.width/this.canvas.width,y:n.top+r.y*n.height/this.canvas.height}}projectOccurrence(e){let a=this.placedByKey?.get(String(e));if(!a||!this.currentPanel)return null;let[s,r,,n,i,o]=a.worldBounds,c=Ht(this.currentPanel.matrix,[(s+n)/2,(r+i)/2,o],this.currentPanel.viewport);if(!c)return null;let d=this.canvas.getBoundingClientRect();return{x:d.left+c.x*d.width/this.canvas.width,y:d.top+c.y*d.height/this.canvas.height}}bindInteractions(){let e=this.canvas,a={active:!1,x:0,y:0,startX:0,startY:0,mode:"orbit"},s=f=>{a.active=!0,a.x=a.startX=f.clientX,a.y=a.startY=f.clientY,a.mode=f.shiftKey||f.button!==0?"pan":"orbit";try{e.setPointerCapture(f.pointerId)}catch{}},r=f=>{if(!a.active)return;let p=f.clientX-a.x,v=f.clientY-a.y;a.x=f.clientX,a.y=f.clientY,a.mode==="pan"?this.camera.pan(p,v,e.clientHeight,!1):this.camera.orbit(p,v)},n=f=>{a.active=!1,e.hasPointerCapture(f.pointerId)&&e.releasePointerCapture(f.pointerId),Math.hypot(f.clientX-a.startX,f.clientY-a.startY)<3&&this.clickAt(f.clientX,f.clientY)},i=async f=>{let p=await this.clickAt(f.clientX,f.clientY);p&&this.frameOccurrence(p.occurrence)},o=f=>{f.preventDefault(),Math.abs(f.deltaX)>Math.abs(f.deltaY)*.4?this.camera.pan(-f.deltaX,0,e.clientHeight,!1):this.camera.dolly(f.deltaY,!1)},c=f=>{if(f.target===e){if(f.key==="Escape")this.select(null);else if(f.key==="f"||f.key==="F")this.selection?this.frameOccurrence(this.selection.key):this.frameAll();else if(f.key==="a"||f.key==="A")this.frameAll();else if(f.key==="`")this.setStatsOverlay(!this.showStats);else return;f.preventDefault()}},d=f=>f.preventDefault();e.tabIndex=0,e.addEventListener("contextmenu",d),e.addEventListener("pointerdown",s),e.addEventListener("pointermove",r),e.addEventListener("pointerup",n),e.addEventListener("dblclick",i),e.addEventListener("wheel",o,{passive:!1}),e.addEventListener("keydown",c),this.unbind=()=>{e.removeEventListener("contextmenu",d),e.removeEventListener("pointerdown",s),e.removeEventListener("pointermove",r),e.removeEventListener("pointerup",n),e.removeEventListener("dblclick",i),e.removeEventListener("wheel",o),e.removeEventListener("keydown",c)}}setStatsOverlay(e){this.showStats=!!e,this.statsEl&&(this.statsEl.hidden=!this.showStats),this.showStats&&this.renderStats()}setGpuBudget(e){let a=Number(e);this.gpuBudgetBytes=Number.isFinite(a)&&a>0?a:Fo}stats(){let e=this.frameSamples.map(([i])=>i).sort((i,o)=>i-o),a=this.frameSamples.map(([,i])=>i).sort((i,o)=>i-o),s=i=>i.reduce((o,c)=>o+c,0)/Math.max(1,i.length),r=i=>i[Math.min(i.length-1,Math.floor(i.length*.95))]||0,n=[...this.assets.entries()].map(([i,o])=>({assetId:i,state:o.state,componentTier:o.componentTier||"idle",occurrences:this.scene?.assets.get(i)?.occurrenceCount||0,error:o.error||null}));return{occurrences:this.placed.length,lod:this.scene?this.scene.cullCounts():{full:0,board:0,box:0,culled:0},triangles:this.scene?.frameStats.triangles||0,draws:this.scene?.frameStats.draws||0,gpuMemoryBytes:this.scene?.gpuMemoryBytes()||0,gpuBudgetBytes:this.gpuBudgetBytes,assets:n,status:this.status(),cache:this.cache.summary(),frameIntervalMs:s(e),frameIntervalP95Ms:r(e),frameCpuMs:s(a),frameCpuP95Ms:r(a),fps:e.length?1e3/Math.max(1e-6,s(e)):0,lodThresholds:{...Qa}}}renderStats(){if(!this.statsEl)return;let e=this.stats(),{full:a,board:s,box:r,culled:n}=e.lod,i=e.assets.filter(c=>c.state==="loaded").length,o=[["Boards",`${e.occurrences} placed \xB7 ${i}/${e.assets.length} designs loaded`],["Detail",`${a} full \xB7 ${s} board \xB7 ${r} box \xB7 ${n} culled`],["Triangles",e.triangles.toLocaleString()],["Draws",e.draws.toLocaleString()],["GPU memory",`${(e.gpuMemoryBytes/1048576).toFixed(1)} / ${(e.gpuBudgetBytes/1048576).toFixed(0)} MB`],["Cache",e.cache.enabled?`${e.cache.hits} hits \xB7 ${e.cache.misses} misses`:"off"],["Frame",`${e.frameIntervalMs.toFixed(1)} ms \xB7 p95 ${e.frameIntervalP95Ms.toFixed(1)}`],["CPU",`${e.frameCpuMs.toFixed(2)} ms \xB7 p95 ${e.frameCpuP95Ms.toFixed(2)}`],["FPS",e.fps.toFixed(0)]];this.statsEl.innerHTML=o.map(([c,d])=>`<dt>${c}</dt><dd>${d}</dd>`).join("")}};var yb=`
  <style>
    :host { display: block; position: relative; overflow: hidden; background: #e8edf0; contain: strict; }
    canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; outline: none; touch-action: none; }
    canvas:focus-visible { box-shadow: inset 0 0 0 2px rgb(59 130 246 / 0.6); }
    #labels { position: absolute; inset: 0; pointer-events: none; }
    #labels[hidden] { display: none; }
    .scene-label {
      position: absolute; left: 0; top: 0; display: flex; flex-direction: column; align-items: center;
      padding: 2px 7px; border-radius: 5px; background: rgb(15 20 28 / 0.72); color: #f1f5f9;
      font: 500 11px/1.35 system-ui, -apple-system, "Segoe UI", sans-serif; white-space: nowrap;
      margin-top: -6px;
    }
    .scene-label[hidden] { display: none; }
    .scene-label span { font-weight: 400; color: #cbd5e1; font-size: 10px; }
    .scene-label.stand-in { background: rgb(71 85 105 / 0.78); }
    .scene-label.restricted { background: rgb(55 65 81 / 0.85); }
    .scene-label.failed { background: rgb(153 27 27 / 0.8); }
    .scene-label.selected { background: rgb(37 99 235 / 0.92); }
    #stats {
      position: absolute; top: 12px; right: 12px; margin: 0; padding: 8px 10px;
      display: grid; grid-template-columns: auto auto; gap: 2px 12px;
      background: rgb(15 20 28 / 0.82); color: #dbe4f0; border-radius: 6px;
      font: 11px/1.4 "SFMono-Regular", Consolas, monospace; font-variant-numeric: tabular-nums; pointer-events: none;
    }
    #stats[hidden] { display: none; }
    #stats dt { color: #8a97a8; }
    #stats dd { margin: 0; text-align: right; }
    #fallback { position: absolute; inset: 0; display: grid; place-items: center; padding: 24px; text-align: center;
      font: 13px/1.5 system-ui, -apple-system, "Segoe UI", sans-serif; color: #475569; }
    #fallback[hidden] { display: none; }
  </style>
  <canvas id="viewport" aria-label="System 3D view"></canvas>
  <div id="labels"></div>
  <dl id="stats" hidden></dl>
  <div id="fallback" hidden></div>
`;function Oo(){if(customElements.get("prism-system-scene"))return;class t extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.controller=null,this.pendingScene=null,this.pendingStats=null,this.pendingBudget=null,this.starting=null}connectedCallback(){this.starting||this.controller||(this.shadowRoot.innerHTML=yb,this.starting=this.start())}disconnectedCallback(){this.controller?.dispose(),this.controller=null,this.starting=null}async start(){let a=this.shadowRoot,s=a.getElementById("fallback");if(!navigator.gpu){s.hidden=!1,s.textContent="The 3D view needs WebGPU, which this browser does not provide.",this.emit("error",{error:"webgpu-unavailable"});return}let r=new As({canvas:a.getElementById("viewport"),labelsEl:a.getElementById("labels"),statsEl:a.getElementById("stats"),onSelectionChange:n=>this.emit("selectionchange",{selection:n}),onStatus:n=>this.emit("status",{status:n})});try{await r.init()}catch(n){r.dispose(),s.hidden=!1,s.textContent=`The 3D view could not start: ${n?.message||n}`,this.emit("error",{error:n?.message||String(n)});return}if(!this.isConnected){r.dispose();return}this.controller=r,this.pendingBudget!=null&&r.setGpuBudget(this.pendingBudget),this.pendingStats!=null&&r.setStatsOverlay(this.pendingStats),this.pendingScene&&this.applyScene(this.pendingScene),this.emit("ready",{})}emit(a,s){this.dispatchEvent(new CustomEvent(`prism-system-scene:${a}`,{detail:s,bubbles:!0,composed:!0}))}applyScene(a){try{this.controller.setDescriptor(a)}catch(s){this.emit("error",{error:s?.message||String(s)})}}setScene(a){this.pendingScene=a,this.controller&&this.applyScene(a)}select(a,s=0){return this.controller?.select(a,s)??null}frameAll(){this.controller?.frameAll()}frameOccurrence(a){this.controller?.frameOccurrence(a)}pickAt(a,s){return this.controller?this.controller.pickAt(a,s):Promise.resolve(null)}projectOccurrence(a){return this.controller?.projectOccurrence(a)??null}setStatsOverlay(a){this.pendingStats=!!a,this.controller?.setStatsOverlay(a)}setLabelsVisible(a){this.controller&&(this.controller.showLabels=!!a)}setGpuBudget(a){this.pendingBudget=a,this.controller?.setGpuBudget(a)}getStats(){return this.controller?.stats()??null}}customElements.define("prism-system-scene",t)}window.__PRISM_SEMANTIC_VIEWER_MANUAL_BOOT__=!0;No();Oo();
