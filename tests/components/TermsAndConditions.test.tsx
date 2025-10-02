import { render, screen } from "@testing-library/react";
import TermsAndConditions from "../../src/components/TermsAndConditions";
import userEvent from "@testing-library/user-event";

describe("Terms and condition", () => {
  const renderComponent = () => {
    render(<TermsAndConditions />);

    return {
      headingElement: screen.getByRole("heading"),
      checkboxElement: screen.getByRole("checkbox"),
      buttonElement: screen.getByRole("button"),
    };
  };

  it("should render content on UI", () => {
    const { headingElement, checkboxElement, buttonElement } =
      renderComponent();
    expect(headingElement).toHaveTextContent(/Terms & Conditions/i);
    expect(checkboxElement).not.toBeChecked();
    expect(buttonElement).toHaveTextContent(/submit/i);
    expect(buttonElement).toBeDisabled();
  });

  it("should enable the button when checkbox is checked", async () => {
    const { checkboxElement, buttonElement } = renderComponent();
    const user = userEvent.setup();
    await user.click(checkboxElement);
    expect(buttonElement).toHaveTextContent(/submit/i);
    expect(buttonElement).toBeEnabled();
  });
});
