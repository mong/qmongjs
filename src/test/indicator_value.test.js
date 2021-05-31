import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import INDICATOR_VALUE from "../components/indicator_value";
import national_data from "./test_data/national_data";
import { data_config } from "../app_config";

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

it("renders", () => {
  const data = national_data[1];
  const indicator_value_share =
    data[data_config.column.variable] < 0.1
      ? `${Math.round(data[data_config.column.variable] * 1000) / 10}\u202f%`
      : `${Math.round(data[data_config.column.variable] * 100)}\u202f%`;
  const numerator = Math.round(
    data[data_config.column.variable] * data.denominator
  );

  act(() => {
    render(
      <table>
        <tbody>
          <tr>
            <INDICATOR_VALUE data={data} />
          </tr>
        </tbody>
      </table>,
      container
    );
  });
  expect(container.querySelector("td").className).toBe("selected_unit");
  expect(container.querySelector("td h4").textContent).toBe(
    `${indicator_value_share} `
  );
  expect(container.querySelector("td .summary").textContent).toBe(
    `${numerator} av ${data.denominator}`
  );
});
