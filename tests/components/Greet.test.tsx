import { render, screen } from "@testing-library/react";
import Greet from "../../src/components/Greet";

describe("Greet component", () => {
  it("should render Hello with the name when name is provided", () => {
    render(<Greet name="Bruce" />);
    // screen.debug();
    const headingElement = screen.getByRole("heading");
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent(/bruce/i);
  });

  it("should render login button when name is not provided", () => {
    render(<Greet />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(/login/i);
  });
});
