import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { act } from "react-dom/test-utils";
import TU_LIST, { Props } from "../tu_list";

describe("test open and close of tu_list", () => {
  const props: Props = {
    treatment_units: [""],
    update_treatment_units: () => {},
    tu_structure: [{ rhf: "", hf: [{ hf: "", hf_full: "", hospital: [""] }] }],
  };
  it("should initialy be hidden", () => {
    const { container } = render(<TU_LIST {...props} />);
    expect(container.getElementsByClassName("tu_list")[0]).toHaveStyle(
      "display: none"
    );
  });
  it("should show list of TUs when button 'Vis alle' is clicked", () => {
    const { container } = render(<TU_LIST {...props} />);
    act(() => {
      userEvent.click(screen.getByText(/Vis alle/i));
    });
    expect(container.getElementsByClassName("tu_list")[0]).not.toHaveStyle(
      "display: none"
    );
  });
  it("should close the list of TUs when ESC/ESCAPE is clicked", () => {
    const { container } = render(<TU_LIST {...props} />);
    act(() => {
      userEvent.click(screen.getByText(/Vis alle/i));
    });
    expect(container.getElementsByClassName("tu_list")[0]).not.toHaveStyle(
      "display: none"
    );
    act(() => {
      var event = new KeyboardEvent("keydown", { key: "Esc" });
      global.dispatchEvent(event);
    });
    expect(container.getElementsByClassName("tu_list")[0]).toHaveStyle(
      "display: none"
    );
  });
});
