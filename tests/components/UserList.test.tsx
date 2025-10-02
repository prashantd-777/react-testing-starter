import { render, screen } from "@testing-library/react";
import UserList from "../../src/components/UserList";
import { User } from "../../src/entities";

describe("UserList", () => {
  it("should render no users when users array is empty", () => {
    render(<UserList users={[]} />);
    const textElement = screen.getByText(/no users/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render a list of users", () => {
    const users: User[] = [
      {
        id: 1,
        name: "Bruce",
      },
      {
        id: 2,
        name: "Peter",
      },
    ];

    render(<UserList users={users} />);
    users.forEach(user => {
        const linkElement = screen.getByRole('link', {name: user.name});
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', `/users/${user.id}`)
    })
  });
});
