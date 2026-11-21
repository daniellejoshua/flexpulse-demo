import "@testing-library/jest-dom";

if (typeof globalThis.IntersectionObserver === "undefined") {
  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
  }
  // @ts-expect-error: jsdom lacks IntersectionObserver
  globalThis.IntersectionObserver = MockIntersectionObserver;
}

// Mock embla carousel in jsdom
import { vi } from "vitest";
vi.mock("embla-carousel-react", () => ({
  default: () => [() => {}, null],
}));

if (typeof window.matchMedia === "undefined") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}
