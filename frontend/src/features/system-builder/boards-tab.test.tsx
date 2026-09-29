import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import { chooseMenuItem } from "@/test/select";

import { BoardsTab, linkedPortKeys, portState } from "./boards-tab";
import { OverviewTab } from "./overview-tab";
import { instance, link, port, systemDocument } from "./test-fixtures";

vi.mock("@/hooks/use-workspace-data", () => ({
  useWorkspaceData: () => ({ projects: [] }),
  workspaceSessionKey: () => "",
}));

afterEach(() => vi.unstubAllGlobals());

const obc = instance("OBC", { ports: [port("J7"), port("J5", { override: "hidden", exposed: false })] });
const pay = instance("PAY");
const doc = systemDocument([obc, pay, instance("SECRET", { restricted: true, projectId: null, ports: null })],
  [link("L1", obc.id, "J7", pay.id, "J1", 3)]);

function renderTab(props: Partial<Parameters<typeof BoardsTab>[0]> = {}, url = "/systems/sys_1?tab=boards") {
  const reload = vi.fn(async () => undefined);
  render(
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route path="/systems/:systemId" element={
          <BoardsTab systemId="sys_1" document={doc} etag='"sys:sys_1:1"' canEdit user={null} reload={reload}
            onNavigate={vi.fn()} {...props} />
        } />
      </Routes>
    </MemoryRouter>,
  );
  return reload;
}

describe("port helpers", () => {
  it("collects linked port and member keys per board", () => {
    expect([...linkedPortKeys(doc, obc.id)]).toEqual(["key-J7"]);
    expect([...linkedPortKeys(doc, pay.id)]).toEqual(["key-J1"]);
  });

  it("names override and exposure states", () => {
    expect(portState({ override: "promoted", exposed: true })).toBe("promoted");
    expect(portState({ override: "hidden", exposed: false })).toBe("hidden");
    expect(portState({ override: null, exposed: false })).toBe("not exposed");
  });
});

describe("BoardsTab", () => {
  it("selects the first board, and refuses to hide a linked port", () => {
    renderTab();
    expect(screen.getByRole("heading", { name: "OBC" })).toBeTruthy();
    const hide = screen.getByRole("button", { name: /Hide/ }) as HTMLButtonElement;
    expect(hide.disabled).toBe(true);
    expect(hide.title).toBe("A linked port cannot be hidden");
    expect(screen.getByRole("button", { name: /Reset/ })).toBeTruthy();
  });

  it("sends overrides with If-Match and reloads", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify(port("J5")), {
      status: 200, headers: { "Content-Type": "application/json", ETag: '"sys:sys_1:2"' },
    }));
    vi.stubGlobal("fetch", fetchMock);
    const reload = renderTab();
    fireEvent.click(screen.getByRole("button", { name: /Reset/ }));
    await waitFor(() => expect(reload).toHaveBeenCalled());
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("/api/systems/sys_1/instances/sin_OBC/ports/key-J5/override");
    expect(init.method).toBe("PUT");
    expect(JSON.parse(String(init.body))).toEqual({ state: null });
    expect(new Headers(init.headers).get("If-Match")).toBe('"sys:sys_1:1"');
  });

  it("warns that removing a linked board deletes its links", async () => {
    const fetchMock = vi.fn(async () => new Response(null, { status: 204, headers: { ETag: '"sys:sys_1:2"' } }));
    vi.stubGlobal("fetch", fetchMock);
    renderTab();
    await chooseMenuItem("Board actions", /Remove board/);
    expect(await screen.findByText(/an end of 1 link/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Remove board" }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect((fetchMock.mock.calls[0] as unknown as [string])[0]).toBe("/api/systems/sys_1/instances/sin_OBC?cascade=links");
  });

  it("shows a restricted board without its details or actions", () => {
    renderTab({}, "/systems/sys_1?tab=boards&board=sin_SECRET");
    expect(screen.getByText(/in a folder you cannot see/)).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Board actions" })).toBeNull();
  });

  it("edits the label and branch in one dialog", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({}), { status: 200, headers: { ETag: '"sys:sys_1:2"', "Content-Type": "application/json" } }));
    vi.stubGlobal("fetch", fetchMock);
    renderTab();
    await chooseMenuItem("Board actions", /Edit board/);
    fireEvent.change(await screen.findByLabelText("Board label"), { target: { value: "OBC-1" } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect([url, init.method, JSON.parse(String(init.body))]).toEqual(["/api/systems/sys_1/instances/sin_OBC", "PATCH", { label: "OBC-1" }]);
  });

  it("offers no edits to viewers", () => {
    renderTab({ canEdit: false });
    expect(screen.queryByRole("button", { name: /Hide/ })).toBeNull();
    expect(screen.queryByRole("button", { name: "Add" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Board actions" })).toBeNull();
    expect(screen.queryByRole("button", { name: /Check now/ })).toBeNull();
  });
});

describe("OverviewTab", () => {
  it("summarises and navigates", () => {
    const onNavigate = vi.fn();
    render(<OverviewTab systemId="sys_1" document={doc} etag="e" canEdit user={null} reload={vi.fn()} onNavigate={onNavigate} />);
    expect(screen.getByText("OBC/J7 ↔ PAY/J1")).toBeTruthy();
    fireEvent.click(screen.getByText("PAY"));
    expect(onNavigate).toHaveBeenLastCalledWith("boards", { board: "sin_PAY" });
    fireEvent.click(screen.getByRole("button", { name: /L1/ }));
    expect(onNavigate).toHaveBeenLastCalledWith("connectivity", { link: "L1" });
  });
});
