import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ContactPage from "./ContactPage";

test("keeps entered contact details when delivery is unavailable", async () => {
  const user = userEvent.setup();
  render(<MemoryRouter><ContactPage /></MemoryRouter>);

  await user.type(screen.getByLabelText(/first name/i), "Ada");
  await user.type(screen.getByLabelText(/^email/i), "ada@example.com");
  await user.selectOptions(screen.getByLabelText(/inquiry category/i), "support");
  await user.type(screen.getByLabelText(/tell us more/i), "Please help with my controller.");
  await user.click(screen.getByRole("button", { name: /submit message/i }));

  expect(screen.getByRole("alert").textContent).toMatch(/delivery is unavailable/i);
  expect((screen.getByLabelText(/first name/i) as HTMLInputElement).value).toBe("Ada");
});
