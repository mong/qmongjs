import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import INDICATOR_DESCRIPTION from "../components/indicator_description";
import description from "./test_data/description";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders without defined green level", () => {
  const desc = description[0];
  act(() => {
    render(
      <table>
        <tbody>
          <tr>
            <INDICATOR_DESCRIPTION description={desc} />
          </tr>
        </tbody>
      </table>,
      container
    );
  });
  expect(container.querySelector("td").className).toBe("quality_indicator");
  expect(container.querySelector("td h1").textContent).toBe(desc.title);
  expect(container.querySelector("td div").className).toBe(
    "quality_indicator_name"
  );
  expect(container.querySelector(".qi_long_description p").textContent).toBe(
    desc.short_description
  );
  expect(container.querySelector(".desired_target_level").textContent).toBe("");
});

it("renders with defined green level", () => {
  const desc = description[1];
  act(() => {
    render(
      <table>
        <tbody>
          <tr>
            <INDICATOR_DESCRIPTION description={desc} />
          </tr>
        </tbody>
      </table>,
      container
    );
  });
  expect(container.querySelector("td").className).toBe("quality_indicator");
  expect(container.querySelector("td h1").textContent).toBe(desc.title);
  expect(container.querySelector("td div").className).toBe(
    "quality_indicator_name"
  );
  expect(container.querySelector(".qi_long_description p").textContent).toBe(
    desc.short_description
  );
  expect(container.querySelector(".desired_target_level").textContent).not.toBe(
    ""
  );
});
