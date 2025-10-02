import { render, screen } from "@testing-library/react";
import TermsAndConditions from "../../src/components/TermsAndConditions";
import userEvent from "@testing-library/user-event";

describe("Terms and condition", () => {
  it("should render content on UI", () => {
    render(<TermsAndConditions />);
    const headingElement = screen.getByRole("heading");
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent(/Terms & Conditions/i);

    const checkboxElement = screen.getByRole("checkbox");
    expect(checkboxElement).toBeInTheDocument();
    expect(checkboxElement).not.toBeChecked();

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(/submit/i);
    expect(buttonElement).toBeDisabled();
  });

  it("should enable the button when checkbox is checked", async () => {
    render(<TermsAndConditions />);
    const checkboxElement = screen.getByRole("checkbox");
    const user = userEvent.setup();
    await user.click(checkboxElement);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(/submit/i);
    expect(buttonElement).toBeEnabled();
  });
});
