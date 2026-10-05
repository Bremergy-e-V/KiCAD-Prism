import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ fetchApi: vi.fn() }));

vi.mock("@/lib/api", async (importOriginal) => ({
    ...(await importOriginal<typeof import("@/lib/api")>()),
    fetchApi: mocks.fetchApi,
}));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

import { ConfigSyncSettings } from "./config-sync-settings";

const URL_SSH = "ssh://git@gitea.example.com:2222/Electronics/kicad-config.git";

function json(body: unknown, status = 200): Response {
    return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});

it("only allows saving a URL that passed its test", async () => {
    mocks.fetchApi.mockImplementation(async (url: string, init?: RequestInit) => {
        if (url.endsWith("/test")) {
            return json({
                url: URL_SSH, name: "Bremergy PCBs", commit: "abc", folder_count: 2, project_count: 1,
                projects: [{ id: "a1", name: "DIN Extension", repo: "Electronics/din-ext", folder: "BreMo25/LV",
                    clone_url: "x", already_imported: false }],
            });
        }
        if (init?.method === "PUT") {
            return json({ configured: true, url: URL_SSH, name: "Bremergy PCBs", last_status: "pending", pending_imports: 0 });
        }
        return json({ configured: false });
    });

    render(<ConfigSyncSettings />);
    const input = await screen.findByLabelText("Config repository URL");
    const save = screen.getByRole("button", { name: "Save" });
    expect((save as HTMLButtonElement).disabled).toBe(true);

    fireEvent.change(input, { target: { value: URL_SSH } });
    fireEvent.click(screen.getByRole("button", { name: "Test" }));
    expect(await screen.findByText(/Bremergy PCBs: 1 project\(s\) in 2 folder\(s\)/)).toBeTruthy();
    expect((save as HTMLButtonElement).disabled).toBe(false);

    // Editing the URL invalidates the test.
    fireEvent.change(input, { target: { value: `${URL_SSH}x` } });
    expect((save as HTMLButtonElement).disabled).toBe(true);
    fireEvent.change(input, { target: { value: URL_SSH } });
    expect((save as HTMLButtonElement).disabled).toBe(false);

    fireEvent.click(save);
    await waitFor(() => expect(screen.getByText("Syncing")).toBeTruthy());
    expect(mocks.fetchApi).toHaveBeenCalledWith("/api/settings/config-sync", expect.objectContaining({ method: "PUT" }));
});

it("shows why a repository cannot be used", async () => {
    mocks.fetchApi.mockImplementation(async (url: string) => {
        if (url.endsWith("/test")) return json({ detail: "The repository has no kicad-projects.json." }, 400);
        return json({ configured: false });
    });
    render(<ConfigSyncSettings />);
    fireEvent.change(await screen.findByLabelText("Config repository URL"), { target: { value: URL_SSH } });
    fireEvent.click(screen.getByRole("button", { name: "Test" }));
    expect(await screen.findByText("The repository has no kicad-projects.json.")).toBeTruthy();
});

it("lists projects that could not be cloned", async () => {
    mocks.fetchApi.mockResolvedValue(json({
        configured: true, url: URL_SSH, name: "Bremergy PCBs", last_status: "ok", last_message: "1 project(s) in 0 folder(s)",
        managed_folders: 0, managed_projects: 0, pending_imports: 0,
        problems: [{ name: "Old board", url: "ssh://x/old.git", error: "No KiCad projects found" }],
    }));
    render(<ConfigSyncSettings />);
    expect(await screen.findByText("Needs attention")).toBeTruthy();
    expect(screen.getByText("Old board")).toBeTruthy();
});
