import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { MaskedIndicator } from "../";

let container: any = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders Lav dg", () => {
  act(() => {
    render(<MaskedIndicator text="Lav dg" />, container);
  });
  expect(container.textContent).toBe("Lav dg");
});

it("renders Lav N", () => {
  act(() => {
    render(<MaskedIndicator text="Lav N" />, container);
  });
  expect(container.textContent).toBe("Lav N");
});

it("renders Ingen data", () => {
  act(() => {
    render(<MaskedIndicator text="Ingen Data" />, container);
  });
  expect(container.textContent).toBe("Ingen Data");
});
