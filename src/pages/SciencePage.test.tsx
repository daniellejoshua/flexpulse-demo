import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import SciencePage from "./SciencePage";

test("collapses and expands the research references", async () => {
  const user = userEvent.setup();
  render(<MemoryRouter><SciencePage /></MemoryRouter>);

  expect(screen.getByText("Sun X, et al. (2022). Efficacy of pulsed electromagnetic field on pain and physical function in patients with low back pain: A systematic review and meta-analysis. Clinical Rehabilitation, 36(5), 636–649. doi:10.1177/02692155221074052.")).not.toBeNull();
  await user.click(screen.getByRole("button", { name: /hide references/i }));
  await waitFor(() => expect(screen.queryByText(/Efficacy of pulsed electromagnetic field on pain and physical function in patients with low back pain/)).toBeNull());
  expect(screen.getByText(/Research Notice:/)).not.toBeNull();
  await user.click(screen.getByRole("button", { name: /show references/i }));
  expect(await screen.findByText(/Efficacy of pulsed electromagnetic field on pain and physical function in patients with low back pain/)).not.toBeNull();
});
