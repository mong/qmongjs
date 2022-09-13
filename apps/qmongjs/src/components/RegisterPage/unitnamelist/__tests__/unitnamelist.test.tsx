import { BrowserRouter, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { UnitNameList } from "../";
import namesData from "../../../../dev-tools/data/unitnames.json";

it("unit name selection renders", async () => {
  const { container } = render(
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
        <UnitNameList
          nestedUnitNames={namesData.nestedUnitNames}
          treatment_units={[""]}
          update_treatment_units={() => {}}
        />
      </QueryParamProvider>
    </BrowserRouter>
  );
  // Avoid using container to query for elements!
  // eslint-disable-next-line
  expect(container.getElementsByClassName("tu_list")[0]).toHaveStyle(
    "display: none"
  );
  expect(container).toMatchSnapshot();

  const user = userEvent.setup();
  await user.click(screen.getByText(/Vis alle/i));
  // Avoid using container to query for elements!
  // eslint-disable-next-line
  expect(container.getElementsByClassName("tu_list")[0]).not.toHaveStyle(
    "display: none"
  );
});

it("should close the list of TUs when ESC/ESCAPE is clicked", async () => {
  const { container } = render(
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
        <UnitNameList
          nestedUnitNames={namesData.nestedUnitNames}
          treatment_units={[""]}
          update_treatment_units={() => {}}
        />
      </QueryParamProvider>
    </BrowserRouter>
  );

  const user = userEvent.setup();
  await user.click(screen.getByText(/Vis alle/i));
  // Avoid using container to query for elements!
  // eslint-disable-next-line
  expect(container.getElementsByClassName("tu_list")[0]).not.toHaveStyle(
    "display: none"
  );
  act(() => {
    var event = new KeyboardEvent("keydown", { key: "Esc" });
    global.dispatchEvent(event);
  });
  // Avoid using container to query for elements!
  // eslint-disable-next-line
  expect(container.getElementsByClassName("tu_list")[0]).toHaveStyle(
    "display: none"
  );
});
