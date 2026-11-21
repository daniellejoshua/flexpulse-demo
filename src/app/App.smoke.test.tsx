import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders home", async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const els = await screen.findAllByText(/Recover Smarter/i); expect(els.length).toBeGreaterThan(0);
});
