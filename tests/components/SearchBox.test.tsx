import { render, screen } from "@testing-library/react";
import SearchBox from "../../src/components/SearchBox";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

describe("SearchBox", () => {
  const renderSearchbox = () => {
    const onChange = vi.fn();
    render(<SearchBox onChange={vi.fn()} />);
    return {
      inputElement: screen.getByPlaceholderText(/search/i),
      onChange: onChange,
      user: userEvent.setup(),
    };
  };

  it("should render an input field for searching", () => {
    const { inputElement } = renderSearchbox();
    expect(inputElement).toBeInTheDocument();
  });

  it.skip("should call onChange when Enter is pressed", async () => {
    vi.spyOn(console, 'warn');
    const { inputElement, onChange } = renderSearchbox();
    const user = userEvent.setup();
    const searchTerm = "SearchTerm";

    await user.type(inputElement, searchTerm);

    // wait for React state update
    await new Promise((r) => setTimeout(r, 100));

    // Press Enter
    await user.keyboard("{Enter}");

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(searchTerm);
  });

  it("should not call onChanges if input field is empty", async () => {
    const { inputElement, onChange, user } = renderSearchbox();
    await user.type(inputElement, "{enter}");
    expect(onChange).not.toHaveBeenCalled();
  });
});
