import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
  const limit = 255;
  const shortText = "Short Text";
  const longText =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque mollitia architecto, repellendus quos odio ducimus quaerat! Eveniet nesciunt quaerat rerum quasi error earum dolorum ullam, sed voluptas? Ducimus doloribus provident voluptatibus ab, pariatur alias possimus esse soluta unde blanditiis eligendi quidem optio aut. Ipsa consequuntur quam at esse. Esse reiciendis, dicta illo animi at consectetur repellat ipsa. Vel excepturi sint accusamus natus inventore quaerat, qui animi modi repellendus eos, perferendis eligendi. Autem tempora beatae sapiente esse, harum aspernatur sunt accusamus omnis error, porro in provident architecto culpa praesentium repudiandae assumenda nostrum enim nam tenetur! Ratione repellendus odio reprehenderit vitae. Nostrum.";
  const limitText = `${longText.substring(0, limit)}...`;

  it("should render short text on UI", () => {
    render(<ExpandableText text={shortText} />);
    if (shortText.length <= limit) {
      const articleElement = screen.getByText(/short text/i);
      expect(articleElement).toBeInTheDocument();
    }
  });

  it("should render show more button when limit is greater than limit", async () => {
    render(<ExpandableText text={limitText} />);
    const textElement = screen.getByText(limitText);
    expect(textElement).toBeInTheDocument();
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(/show more/i);
  });

  it("should expand text when show more button is clicked", async () => {
    render(<ExpandableText text={longText} />);
    const buttonElement = screen.queryByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(/show more/i);
    const user = userEvent.setup();
    await user.click(buttonElement as HTMLButtonElement);
    expect(buttonElement).toHaveTextContent(/show less/i);
    const articleElement = screen.getByText(longText);
    expect(articleElement).toBeInTheDocument();
  });

  it("should collapse text when show less button is clicked", async () => {
    render(<ExpandableText text={longText} />);
    const showMoreButton = screen.getByRole("button", { name: /more/i });
    const user = userEvent.setup();
    await user.click(showMoreButton as HTMLButtonElement);
    const showLessButton = screen.getByRole("button", { name: /less/i });
    await user.click(showLessButton as HTMLButtonElement);
    expect(showLessButton).toHaveTextContent(/show more/i);
    const articleElement = screen.getByText(limitText);
    expect(articleElement).toBeInTheDocument();
  });
});
