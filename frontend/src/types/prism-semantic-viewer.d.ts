import type React from "react";
import type { PrismSelection } from "@/types/prism-selection";

export interface PrismSemanticViewerSelectionDetail {
    selection: PrismSelection | null;
}

export interface PrismRendererSelection {
    reference?: string;
    pin?: string;
    netName?: string;
    netUid?: string;
    netCode?: number;
    featureId?: number;
}

/** One placement of the loaded board; `key` (the occurrence path) returns on picks and selections. */
export interface PrismViewerOccurrence {
    matrix: readonly number[];
    key: string;
}

export interface PrismViewerPick {
    kind: "none" | "feature" | "board" | "gizmo";
    occurrenceIndex: number;
    occurrenceKey: string | null;
    featureId: number;
    /** What a click there would select (reference, pin, net), when it hits a feature. */
    selection: Record<string, unknown> | null;
}

export interface PrismViewerStats {
    occurrences: number;
    /** Occurrences per level of detail in the last culled frame. */
    lod: { full: number; board: number; box: number; culled: number };
    triangles: number;
    draws: number;
    gpuMemoryBytes: number;
    /** SB2-26: the GPU budget, the component tier and the browser asset cache. */
    gpuBudgetBytes: number;
    componentTier: "idle" | "loading" | "loaded";
    componentEvictions: number;
    tileEvictions: number;
    cache: {
        enabled: boolean;
        files?: number;
        bytes?: number;
        hits?: number;
        misses?: number;
        networkBytes?: number;
        cachedBytes?: number;
    };
    frameIntervalMs: number;
    frameIntervalP95Ms: number;
    frameCpuMs: number;
    frameCpuP95Ms: number;
    fps: number;
}

export interface PrismSemanticViewerElement extends HTMLElement {
    setSelection: (selection: PrismRendererSelection | null) => void;
    /**
     * Replace the highlighted nets: every listed net renders emphasised
     * alongside the inspected selection. Safe before ready and after reloads.
     */
    setHighlightedNets?: (nets: readonly PrismRendererSelection[]) => void;
    /**
     * Replaces the hidden component set (VAR-18). Safe before ready and after
     * reloads; ambiguous or unknown references stay visible.
     */
    setHiddenComponents: (references: string[]) => void;
    /**
     * Draw the loaded board once per occurrence (System Builder SB2-23):
     * column-major 4×4 model matrices in the bundle's runtime units (metres).
     * Geometry uploads once; `null` restores the one-board view exactly.
     * Safe before ready and after reloads.
     */
    setOccurrences?: (
        occurrences: readonly (readonly number[] | PrismViewerOccurrence)[] | null,
    ) => void;
    /** What is under a client point, without selecting it (SB2-24). Null before ready. */
    pickAt?: (clientX: number, clientY: number) => Promise<PrismViewerPick | null>;
    /** Client coordinates of a component's centre on one occurrence, or null off screen. */
    projectComponent?: (reference: string, occurrenceKey?: string) => { x: number; y: number } | null;
    /** Client coordinates of a board-local runtime point (metres) on one occurrence. */
    projectPoint?: (point: readonly [number, number, number], occurrenceKey?: string) => { x: number; y: number } | null;
    /** Show the scene stats overlay (SB2-25); the backquote key toggles it. */
    setStatsOverlay?: (visible: boolean) => void;
    /** The numbers behind the stats overlay, or null before ready. */
    getStats?: () => PrismViewerStats | null;
    /** Force a level of detail on every occurrence (0 full, 1 board, 2 box), or null for automatic. */
    setLodOverride?: (lod: 0 | 1 | 2 | null) => void;
    /** GPU memory budget in bytes (default 1.5 GB); over it, tiers no occurrence needs are evicted. */
    setGpuBudget?: (bytes: number) => void;
    resize: () => void;
}

declare global {
    interface HTMLElementTagNameMap {
        "prism-semantic-viewer": PrismSemanticViewerElement;
    }

    namespace JSX {
        interface IntrinsicElements {
            "prism-semantic-viewer": React.DetailedHTMLProps<
                React.HTMLAttributes<PrismSemanticViewerElement> & {
                    "bundle-url"?: string;
                    workspace?: "pcb" | "stackup";
                    active?: string;
                },
                PrismSemanticViewerElement
            >;
        }
    }
}

export {};
