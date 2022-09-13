import { render, unmountComponentAtNode } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

import { IndicatorRow } from "../";
import national_data from "../../../../test/test_data/national_data";
import description from "../../../../test/test_data/description";

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
      ? `${Math.round(data.var * 1000) / 10}\u202f%`
      : `${Math.round(data.var * 100)}\u202f%`;
  const numerator = Math.round(data.var * data.denominator);

  render(
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <table>
          <tbody>
            <IndicatorRow
              context={{ context: "caregiver", type: "ind" }}
              description={description[0]}
              indicatorData={[data]}
              treatmantYear={2019}
            />
          </tbody>
        </table>
      </QueryParamProvider>
    </Router>,
    container
  );
  expect(container.querySelector("td h1").textContent).toBe(
    description[0].title
  );
  expect(container.querySelector("td div").className).toBe(
    "quality_indicator_name"
  );
  expect(container.querySelector(".qi_long_description p").textContent).toBe(
    description[0].short_description
  );
  expect(container.querySelector("td h4").textContent).toBe(
    `${indicator_value_share}`
  );
  expect(container.querySelector("td .summary").textContent).toBe(
    `${numerator} av ${data.denominator}`
  );
});
