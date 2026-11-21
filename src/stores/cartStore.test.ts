import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore } from "./cartStore";
import { flexPulseG2 } from "@/data/products";

describe("cart store", () => {
  beforeEach(() => useCartStore.getState().clear());

  it("adds and counts", () => {
    useCartStore.getState().addItem(flexPulseG2, 2);
    expect(useCartStore.getState().count()).toBe(2);
  });

  it("removes", () => {
    useCartStore.getState().addItem(flexPulseG2);
    useCartStore.getState().removeItem(flexPulseG2.id);
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
