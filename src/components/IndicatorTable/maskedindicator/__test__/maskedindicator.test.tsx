import { render, unmountComponentAtNode } from "react-dom";

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
  render(<MaskedIndicator text="Lav dg" />, container);
  expect(container.textContent).toBe("Lav dg");
});

it("renders Lav N", () => {
  render(<MaskedIndicator text="Lav N" />, container);
  expect(container.textContent).toBe("Lav N");
});

it("renders Ingen data", () => {
  render(<MaskedIndicator text="Ingen Data" />, container);
  expect(container.textContent).toBe("Ingen Data");
});
