import { render, screen } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CheckoutPage from "./CheckoutPage";
import { useCartStore } from "@/stores/cartStore";
import { flexPulseG2 } from "@/data/products";

beforeEach(() => useCartStore.setState({ items: [] }));

test("shows an empty-cart call to action", () => {
  render(<MemoryRouter><CheckoutPage /></MemoryRouter>);

  expect(screen.getByRole("heading", { name: "Your cart is empty" })).toBeTruthy();
  expect(screen.getByRole("link", { name: "Continue Shopping" }).getAttribute("href")).toBe("/shop");
});

test("shows cart quantities and the demo order action", () => {
  useCartStore.getState().addItem(flexPulseG2, 2);
  render(<MemoryRouter><CheckoutPage /></MemoryRouter>);

  expect(screen.getAllByText("FlexPulse G2").length).toBeGreaterThan(0);
  expect(screen.getAllByRole("button", { name: "Place Demo Order" }).length).toBeGreaterThan(0);
  expect(screen.getAllByLabelText("Quantity 2").length).toBeGreaterThan(0);
});
