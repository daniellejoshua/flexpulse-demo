import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, test } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ProductPage from "./ProductPage";
import { useCartStore } from "@/stores/cartStore";

beforeEach(() => useCartStore.setState({ items: [] }));

test("adds the selected FlexPulse G2 quantity and reveals specifications", async () => {
  const user = userEvent.setup();
  render(<MemoryRouter><ProductPage /></MemoryRouter>);

  await user.click(screen.getByRole("button", { name: "Increase quantity" }));
  await user.click(screen.getAllByRole("button", { name: "Add to Cart" })[0]);
  await user.click(screen.getByRole("button", { name: /Specifications/ }));

  expect(useCartStore.getState().items[0]?.quantity).toBe(2);
  expect(screen.getByText("Frequency Range")).toBeTruthy();
  expect(screen.getByText("3 – 1,000 Hz")).toBeTruthy();
});
