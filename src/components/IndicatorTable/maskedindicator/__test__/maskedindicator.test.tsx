import { render } from "@testing-library/react";

import { MaskedIndicator } from "../";

let container: any = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
  container = null;
});

it("renders Lav dg", () => {
  const res = render(<MaskedIndicator text="Lav dg" />, container);
  expect(res.container.textContent).toBe("Lav dg");
});

it("renders Lav N", () => {
  const res = render(<MaskedIndicator text="Lav N" />, container);
  expect(res.container.textContent).toBe("Lav N");
});

it("renders Ingen data", () => {
  const res = render(<MaskedIndicator text="Ingen Data" />, container);
  expect(res.container.textContent).toBe("Ingen Data");
});
