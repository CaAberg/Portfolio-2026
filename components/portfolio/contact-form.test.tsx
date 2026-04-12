import { ContactForm } from "@/components/portfolio/contact-form";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

describe("ContactForm", () => {
  it("associates validation errors with fields after submit", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /send message/i }));

    const nameInput = screen.getByRole("textbox", { name: /name/i });
    expect(nameInput).toHaveAttribute("aria-invalid", "true");
    expect(nameInput).toHaveAttribute("aria-describedby", "contact-name-error");
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
  });
});
