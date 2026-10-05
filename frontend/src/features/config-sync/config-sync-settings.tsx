import { useCallback, useEffect, useState } from "react";
import { CheckCircle2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchApi, readApiError } from "@/lib/api";

const ENDPOINT = "/api/settings/config-sync";
// While a sync or clone is in flight the page refreshes itself.
const POLL_MS = 4000;

interface ConfigSyncProblem {
    name: string;
    url: string;
    error: string;
}

interface ConfigSyncStatus {
    configured: boolean;
    url?: string;
    enabled?: boolean;
    name?: string | null;
    commit?: string | null;
    last_synced_at?: string | null;
    last_status?: string;
    last_message?: string;
    updated_by?: string;
    managed_folders?: number;
    managed_projects?: number;
    pending_imports?: number;
    problems?: ConfigSyncProblem[];
}

export interface ConfigTestResult {
    url: string;
    name: string;
    commit: string;
    folder_count: number;
    project_count: number;
    projects: { id: string; name: string; repo: string; folder: string; clone_url: string; already_imported: boolean }[];
}

function statusBadge(status: ConfigSyncStatus): { label: string; variant: "success" | "warning" | "destructive" | "info" } {
    if (status.last_status === "error") return { label: "Sync failed", variant: "destructive" };
    if (status.last_status === "pending" || status.last_status === "running") return { label: "Syncing", variant: "info" };
    if (status.pending_imports) return { label: "Cloning projects", variant: "info" };
    if (status.problems?.length) return { label: "Needs attention", variant: "warning" };
    return { label: "In sync", variant: "success" };
}

function isBusy(status: ConfigSyncStatus | null): boolean {
    if (!status?.configured) return false;
    return status.last_status === "pending" || status.last_status === "running" || Boolean(status.pending_imports);
}

/**
 * Mirror the folder structure and project list kept by KiCad Project Manager
 * in its config repository. Paste the URL, test it, save it.
 */
// react-doctor-disable-next-line prefer-useReducer - the form, the test result and the loaded status are independent
export function ConfigSyncSettings() {
    const [status, setStatus] = useState<ConfigSyncStatus | null>(null);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [url, setUrl] = useState("");
    const [tested, setTested] = useState<ConfigTestResult | null>(null);
    const [testError, setTestError] = useState<string | null>(null);
    const [busy, setBusy] = useState<"test" | "save" | "sync" | "disconnect" | null>(null);
    const [confirmDisconnect, setConfirmDisconnect] = useState(false);

    const load = useCallback(async (signal?: AbortSignal) => {
        try {
            const res = await fetchApi(ENDPOINT, { signal });
            if (!res.ok) {
                setLoadError(await readApiError(res, "The config repository settings could not be loaded."));
                return;
            }
            const next: ConfigSyncStatus = await res.json();
            setLoadError(null);
            setStatus(next);
        } catch (err) {
            if (err instanceof DOMException && err.name === "AbortError") return;
            setLoadError("The config repository settings could not be loaded.");
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        void load(controller.signal);
        return () => controller.abort();
    }, [load]);

    const polling = isBusy(status);
    useEffect(() => {
        if (!polling) return;
        const timer = window.setInterval(() => void load(), POLL_MS);
        return () => window.clearInterval(timer);
    }, [polling, load]);

    // A test result belongs to the URL it was run against.
    const testedCurrent = tested !== null && tested.url === url.trim();

    const runTest = async () => {
        setBusy("test");
        setTestError(null);
        setTested(null);
        try {
            const res = await fetchApi(`${ENDPOINT}/test`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: url.trim() }),
            });
            if (!res.ok) {
                setTestError(await readApiError(res, "The repository could not be read."));
                return;
            }
            setTested(await res.json());
        } catch {
            setTestError("An error occurred while connecting to the backend.");
        } finally {
            setBusy(null);
        }
    };

    const save = async () => {
        setBusy("save");
        try {
            const res = await fetchApi(ENDPOINT, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: url.trim() }),
            });
            if (!res.ok) {
                toast.error(await readApiError(res, "The config repository could not be saved."));
                return;
            }
            setStatus(await res.json());
            setUrl("");
            setTested(null);
            toast.success("Config repository saved. Syncing now.");
        } catch {
            toast.error("An error occurred while connecting to the backend.");
        } finally {
            setBusy(null);
        }
    };

    const syncNow = async () => {
        setBusy("sync");
        try {
            const res = await fetchApi(`${ENDPOINT}/sync`, { method: "POST" });
            if (!res.ok) {
                toast.error(await readApiError(res, "The sync could not be started."));
                return;
            }
            toast.success("Sync started");
            setStatus((current) => (current ? { ...current, last_status: "pending" } : current));
        } catch {
            toast.error("An error occurred while connecting to the backend.");
        } finally {
            setBusy(null);
        }
    };

    const disconnect = async () => {
        setConfirmDisconnect(false);
        setBusy("disconnect");
        try {
            const res = await fetchApi(ENDPOINT, { method: "DELETE" });
            if (!res.ok) {
                toast.error(await readApiError(res, "The config repository could not be disconnected."));
                return;
            }
            toast.success("Disconnected. Folders and projects stay in the workspace.");
            setStatus({ configured: false });
        } catch {
            toast.error("An error occurred while connecting to the backend.");
        } finally {
            setBusy(null);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Project config</h3>
                <p className="text-sm text-muted-foreground">
                    Mirror the folders and projects from a KiCad Project Manager config repository.
                </p>
            </div>

            <div className="rounded-lg border bg-muted/30 p-4 text-sm space-y-2">
                <p className="font-medium">Prism follows the Project Manager's list.</p>
                <p className="text-muted-foreground">
                    Every few minutes Prism reads <code className="font-mono">kicad-projects.json</code>, creates
                    the same folders, clones every listed repository into its folder and removes repositories
                    that were taken off the list. Projects you import by hand are left alone.
                </p>
                <p className="text-muted-foreground">
                    Prism reaches the projects the same way it reaches the config repository, so use the SSH
                    URL if the workspace key is registered on your Git server.
                </p>
            </div>

            {status === null && !loadError && (
                <div className="space-y-2" aria-busy="true" aria-label="Loading config repository settings">
                    <Skeleton className="h-24 w-full" />
                </div>
            )}

            {loadError && (
                <div className="flex items-center justify-between gap-3 rounded-lg border p-4 text-sm" role="alert">
                    <span className="text-destructive">{loadError}</span>
                    <Button variant="outline" size="sm" onClick={() => void load()}>
                        <RefreshCw className="mr-1.5 size-4" aria-hidden="true" /> Retry
                    </Button>
                </div>
            )}

            {status?.configured && <CurrentRepository status={status} busy={busy} onSync={syncNow} onDisconnect={() => setConfirmDisconnect(true)} />}

            {status !== null && (
                <div className="space-y-4 rounded-lg border bg-card p-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="config-repo-url" className="text-base">
                            {status.configured ? "Use a different config repository" : "Config repository URL"}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                            The repository KiCad Project Manager created, for example{" "}
                            <code className="font-mono">ssh://git@gitea.example.com:2222/Team/kicad-config.git</code>.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Input
                            id="config-repo-url"
                            value={url}
                            placeholder="ssh://git@host/owner/config.git"
                            spellCheck={false}
                            autoComplete="off"
                            onChange={(event) => setUrl(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" && url.trim() && !busy) void runTest();
                            }}
                        />
                        <Button variant="outline" onClick={() => void runTest()} disabled={!url.trim() || busy !== null}>
                            {busy === "test" ? "Testing..." : "Test"}
                        </Button>
                        <Button onClick={() => void save()} disabled={!testedCurrent || busy !== null}>
                            {busy === "save" ? "Saving..." : "Save"}
                        </Button>
                    </div>

                    {testError && (
                        <p className="text-sm text-destructive" role="alert">{testError}</p>
                    )}

                    {testedCurrent && tested && <TestResult result={tested} />}
                </div>
            )}

            <ConfirmDialog
                open={confirmDisconnect}
                onOpenChange={setConfirmDisconnect}
                title="Disconnect the config repository?"
                description="Prism stops following the Project Manager. Folders and projects already in the workspace stay where they are."
                confirmLabel="Disconnect"
                onConfirm={() => void disconnect()}
            />
        </div>
    );
}

function CurrentRepository({
    status,
    busy,
    onSync,
    onDisconnect,
}: {
    status: ConfigSyncStatus;
    busy: string | null;
    onSync: () => void;
    onDisconnect: () => void;
}) {
    const badge = statusBadge(status);
    return (
        <div className="space-y-3 rounded-lg border bg-card p-4">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                        <p className="font-medium truncate">{status.name || "Config repository"}</p>
                        <Badge variant={badge.variant}>{badge.label}</Badge>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground break-all">{status.url}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                    <Button variant="outline" size="sm" onClick={onSync} disabled={busy !== null}>
                        <RefreshCw className="mr-1.5 size-4" aria-hidden="true" />
                        {busy === "sync" ? "Starting..." : "Sync now"}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={onDisconnect} disabled={busy !== null}>
                        Disconnect
                    </Button>
                </div>
            </div>
            <dl className="grid grid-cols-3 gap-3 text-sm">
                <div>
                    <dt className="text-muted-foreground">Folders</dt>
                    <dd className="font-medium">{status.managed_folders ?? 0}</dd>
                </div>
                <div>
                    <dt className="text-muted-foreground">Projects</dt>
                    <dd className="font-medium">{status.managed_projects ?? 0}</dd>
                </div>
                <div>
                    <dt className="text-muted-foreground">Cloning</dt>
                    <dd className="font-medium">{status.pending_imports ?? 0}</dd>
                </div>
            </dl>
            {status.last_message && (
                <p className={status.last_status === "error" ? "text-sm text-destructive" : "text-sm text-muted-foreground"}>
                    {status.last_message}
                    {status.last_synced_at && ` · ${new Date(status.last_synced_at).toLocaleString()}`}
                </p>
            )}
            {status.problems && status.problems.length > 0 && (
                <ul className="space-y-1 rounded-md border border-warning/30 bg-warning/5 p-3 text-sm" aria-label="Projects that could not be cloned">
                    {status.problems.map((problem) => (
                        <li key={problem.url}>
                            <span className="font-medium">{problem.name}</span>
                            <span className="text-muted-foreground"> — {problem.error}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export function TestResult({ result }: { result: ConfigTestResult }) {
    return (
        <div className="space-y-2 rounded-md border border-success/30 bg-success/5 p-3 text-sm">
            <p className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="size-4 text-success" aria-hidden="true" />
                {result.name}: {result.project_count} project(s) in {result.folder_count} folder(s)
            </p>
            {result.projects.length > 0 && (
                <ul className="max-h-48 space-y-0.5 overflow-y-auto text-muted-foreground" aria-label="Projects in the config">
                    {result.projects.map((project) => (
                        <li key={project.id} className="flex justify-between gap-3">
                            <span className="truncate">
                                {project.folder ? `${project.folder} / ` : ""}
                                <span className="text-foreground">{project.name}</span>
                            </span>
                            <span className="shrink-0 font-mono text-xs">
                                {project.repo}
                                {project.already_imported ? " · imported" : ""}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
