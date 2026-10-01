// <prism-system-scene>: a system's boards in one WebGPU view (SB2-27).
//
// The host page passes the `prism.system_scene.a0` descriptor with
// `setScene(descriptor)` (again whenever it re-reads it, e.g. while bundles
// build). Events: `prism-system-scene:ready`, `…:selectionchange`
// ({ selection }), `…:status` ({ status }) and `…:error`.

import { SystemScene } from "./system-scene.js";

const SHELL = `
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
`;

export function definePrismSystemScene() {
  if (customElements.get("prism-system-scene")) return;

  class PrismSystemScene extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.controller = null;
      this.pendingScene = null;
      this.pendingStats = null;
      this.pendingBudget = null;
      this.starting = null;
    }

    connectedCallback() {
      if (this.starting || this.controller) return;
      this.shadowRoot.innerHTML = SHELL;
      this.starting = this.start();
    }

    disconnectedCallback() {
      this.controller?.dispose();
      this.controller = null;
      this.starting = null;
    }

    async start() {
      const root = this.shadowRoot;
      const fallback = root.getElementById("fallback");
      if (!navigator.gpu) {
        fallback.hidden = false;
        fallback.textContent = "The 3D view needs WebGPU, which this browser does not provide.";
        this.emit("error", { error: "webgpu-unavailable" });
        return;
      }
      const controller = new SystemScene({
        canvas: root.getElementById("viewport"),
        labelsEl: root.getElementById("labels"),
        statsEl: root.getElementById("stats"),
        onSelectionChange: (selection) => this.emit("selectionchange", { selection }),
        onStatus: (status) => this.emit("status", { status }),
      });
      try {
        await controller.init();
      } catch (error) {
        controller.dispose();
        fallback.hidden = false;
        fallback.textContent = `The 3D view could not start: ${error?.message || error}`;
        this.emit("error", { error: error?.message || String(error) });
        return;
      }
      if (!this.isConnected) {
        controller.dispose();
        return;
      }
      this.controller = controller;
      if (this.pendingBudget != null) controller.setGpuBudget(this.pendingBudget);
      if (this.pendingStats != null) controller.setStatsOverlay(this.pendingStats);
      if (this.pendingScene) this.applyScene(this.pendingScene);
      this.emit("ready", {});
    }

    emit(name, detail) {
      this.dispatchEvent(new CustomEvent(`prism-system-scene:${name}`, { detail, bubbles: true, composed: true }));
    }

    applyScene(descriptor) {
      try {
        this.controller.setDescriptor(descriptor);
      } catch (error) {
        this.emit("error", { error: error?.message || String(error) });
      }
    }

    /** Show (or update) the `prism.system_scene.a0` descriptor. */
    setScene(descriptor) {
      this.pendingScene = descriptor;
      if (this.controller) this.applyScene(descriptor);
    }

    /** Select an occurrence by path (and optionally a feature id of it); null clears. */
    select(path, featureId = 0) {
      return this.controller?.select(path, featureId) ?? null;
    }

    frameAll() {
      this.controller?.frameAll();
    }

    frameOccurrence(path) {
      this.controller?.frameOccurrence(path);
    }

    pickAt(clientX, clientY) {
      return this.controller ? this.controller.pickAt(clientX, clientY) : Promise.resolve(null);
    }

    projectOccurrence(path) {
      return this.controller?.projectOccurrence(path) ?? null;
    }

    setStatsOverlay(visible) {
      this.pendingStats = Boolean(visible);
      this.controller?.setStatsOverlay(visible);
    }

    setLabelsVisible(visible) {
      if (this.controller) this.controller.showLabels = Boolean(visible);
    }

    setGpuBudget(bytes) {
      this.pendingBudget = bytes;
      this.controller?.setGpuBudget(bytes);
    }

    getStats() {
      return this.controller?.stats() ?? null;
    }
  }

  customElements.define("prism-system-scene", PrismSystemScene);
}
