import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ChatWidget from "./ChatWidget";

afterEach(() => vi.unstubAllGlobals());

test("opens with the welcome prompts and closes back to its launcher", async () => {
  const user = userEvent.setup();
  render(<MemoryRouter><ChatWidget /></MemoryRouter>);

  await user.click(screen.getByRole("button", { name: "Open FlexPulse Assistant" }));
  expect(screen.getByText("Welcome to FlexPulse. I can help you explore our products, understand PEMF technology, or find support.")).toBeTruthy();
  expect(screen.getByText("For product information only — not medical advice.")).toBeTruthy();

  await user.click(screen.getByRole("button", { name: "Close chat" }));
  expect(screen.getByRole("button", { name: "Open FlexPulse Assistant" })).toBeTruthy();
});

test("sends a suggested question through the existing chat request", async () => {
  const user = userEvent.setup();
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ message: "PEMF uses pulsed electromagnetic fields." }) });
  vi.stubGlobal("fetch", fetchMock);
  render(<MemoryRouter><ChatWidget /></MemoryRouter>);

  await user.click(screen.getByRole("button", { name: "Open FlexPulse Assistant" }));
  await user.click(screen.getByRole("button", { name: "What is PEMF therapy?" }));

  await waitFor(() => expect(screen.getByText("PEMF uses pulsed electromagnetic fields.")).toBeTruthy());
  expect(fetchMock).toHaveBeenCalledOnce();
});

test("renders Markdown and verified product details without raw syntax", async () => {
  const user = userEvent.setup();
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ message: "**FlexPulse G2** has 10 programs." }) }));
  render(<MemoryRouter><ChatWidget /></MemoryRouter>);

  await user.click(screen.getByRole("button", { name: "Open FlexPulse Assistant" }));
  await user.click(screen.getByRole("button", { name: "Explore FlexPulse G2" }));

  await waitFor(() => expect(screen.getByText("PRODUCT OVERVIEW")).toBeTruthy());
  expect(screen.getByText("10 Pre-Set Programs")).toBeTruthy();
  expect(screen.queryByText("**FlexPulse G2** has 10 programs.")).toBeNull();
});

test("presents numbered instructions as visual steps", async () => {
  const user = userEvent.setup();
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ message: "To get started:\n1. Charge the controller.\n2. Place the coils." }) }));
  render(<MemoryRouter><ChatWidget /></MemoryRouter>);

  await user.click(screen.getByRole("button", { name: "Open FlexPulse Assistant" }));
  await user.click(screen.getByRole("button", { name: "How do I use FlexPulse?" }));

  await waitFor(() => expect(screen.getByText("Steps")).toBeTruthy());
  expect(screen.getByText("Charge the controller.")).toBeTruthy();
  expect(screen.getByText("Place the coils.")).toBeTruthy();
});
