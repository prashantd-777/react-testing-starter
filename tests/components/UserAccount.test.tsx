import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";

describe("User Account", () => {
  const user = { id: 1, name: "Bruce", isAdmin: false };

  it("should render username on UI", () => {
    render(<UserAccount user={user} />);
    const textElement = screen.getByText("Bruce");
    expect(textElement).toBeInTheDocument();
  });

  it("should render Edit button on UI when user is admin", () => {
    render(<UserAccount user={{ ...user, isAdmin: true }} />);
    const buttonElement = screen.queryByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(/edit/i)
  });

  it("should not render Edit button on UI when user is not admin", () => {
    render(<UserAccount user={user} />);
    const buttonElement = screen.queryByRole("button");
    expect(buttonElement).not.toBeInTheDocument();
  });
});
