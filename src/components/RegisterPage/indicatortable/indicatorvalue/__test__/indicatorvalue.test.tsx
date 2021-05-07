import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { IndicatorValue } from "../";
import national_data from "../../../../../test/test_data/national_data";


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

it("renders", () => {
  const data = national_data[1];
  const indicator_value_share =
    data.var < 0.1
      ? `${Math.round(data.var * 1000) / 10}%`
      : `${Math.round(data.var * 100)}%`;
  const numerator = Math.round(
    data.var * data.denominator
  );

  act(() => {
    render(
      <table>
        <tbody>
          <tr>
            <IndicatorValue indicatorData={data} />
          </tr>
        </tbody>
      </table>,
      container
    );
  });
  expect(container.querySelector("td h4").textContent).toBe(
    `${indicator_value_share} `
  );
  expect(container.querySelector("td .summary").textContent).toBe(
    `${numerator} av ${data.denominator}`
  );
});
