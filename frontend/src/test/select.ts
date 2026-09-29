import { fireEvent, screen } from "@testing-library/react";

/** Open a Radix Select by its accessible name (keyboard, as jsdom has no pointer events) and pick an option. */
export async function openSelect(trigger: string | RegExp): Promise<void> {
  const element = screen.getByRole("combobox", { name: trigger });
  element.focus();
  fireEvent.keyDown(element, { key: "ArrowDown" });
  await screen.findByRole("listbox");
}

export async function chooseOption(trigger: string | RegExp, option: string | RegExp): Promise<void> {
  await openSelect(trigger);
  fireEvent.click(screen.getByRole("option", { name: option }));
}

/** Open a Radix DropdownMenu by its trigger's accessible name and choose an item. */
export async function chooseMenuItem(trigger: string | RegExp, item: string | RegExp): Promise<void> {
  const element = screen.getByRole("button", { name: trigger });
  element.focus();
  fireEvent.keyDown(element, { key: "Enter" });
  fireEvent.click(await screen.findByRole("menuitem", { name: item }));
}
