import { describe, expect, it } from "vitest";
import { search } from "./searchService";

describe("search", () => {
  it("finds product specifications, page content, and FAQs with one shared query", () => {
    const response = search({ query: "battery" });

    expect(response.results.some((result) => result.id === "flexpulse-g2")).toBe(true);
    expect(response.results.some((result) => result.type === "page" || result.type === "guide")).toBe(true);
  });

  it("supports case-insensitive partial matching and type filtering", () => {
    const response = search({ query: "pem", type: "article" });

    expect(response.total).toBeGreaterThan(0);
    expect(response.results.every((result) => result.type === "article")).toBe(true);
  });

  it("returns no results safely for punctuation-only queries", () => {
    expect(search({ query: "@@@@" }).total).toBe(0);
  });
});
