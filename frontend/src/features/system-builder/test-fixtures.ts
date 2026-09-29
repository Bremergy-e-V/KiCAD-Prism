import type { SystemDocument, SystemInstance, SystemLink, SystemPort } from "@/types/system";

export function port(reference: string, patch: Partial<SystemPort> = {}): SystemPort {
  return {
    portKey: `key-${reference}`, memberKeys: [`key-${reference}`], reference, libId: "Connector:Conn", footprint: null,
    value: "Conn", dnp: false, candidate: true, candidateReason: "refdes", override: null, exposed: true, pinCount: 4,
    ...patch,
  };
}

export function instance(label: string, patch: Partial<SystemInstance> = {}): SystemInstance {
  return {
    id: `sin_${label}`, label, restricted: false, projectId: `prj_${label}`, projectName: label.toLowerCase(),
    baselineCommit: "a".repeat(40), trackedRef: "main", pinned: false, resolution: "resolved",
    tipCommit: "a".repeat(40), tipCheckedAt: "2026-09-29T10:00:00Z", updateAvailable: false,
    interface: { status: "ready", digest: "sha256:x", hasPcb: true, jobId: null, errorCode: null },
    ports: [port("J1"), port("J2")],
    ...patch,
  };
}

export function link(id: string, a: string, aRef: string, b: string, bRef: string, rows = 0): SystemLink {
  const end = (instanceId: string, reference: string) => ({
    instanceId, redacted: false, resolved: true, exposed: true,
    port: { portKey: `key-${reference}`, memberKeys: [`key-${reference}`], reference, libId: null, footprint: null, pinCount: 4 },
  });
  return {
    id, name: id, harness: null, updatedAt: "", a: end(a, aRef), b: end(b, bRef),
    rows: Array.from({ length: rows }, (_, i) => ({
      id: `${id}-r${i}`, pinA: String(i + 1), pinB: String(i + 1), signal: `S${i}`, source: "manual" as const,
      netA: [`/N${i}`], netB: [`/N${i}`], observedA: null, observedB: null, redacted: false, redactedEnds: [],
    })),
  };
}

export function systemDocument(instances: SystemInstance[], links: SystemLink[] = []): SystemDocument {
  return {
    system: {
      id: "sys_1", kind: "system", name: "Stack", description: "", folderId: null, version: 1, etag: '"sys:sys_1:1"',
      instanceCount: instances.length, openReviewCount: 0, createdBy: "user:a", createdAt: "", updatedAt: "",
    },
    instances, links, openReviewCount: 0, findingCounts: { error: 0, warning: 1, info: 0, notEvaluated: 0 },
  };
}
