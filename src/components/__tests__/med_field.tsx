import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { parse } from "querystring";
import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import MAIN from "../main_component";
import { buildGraphData, buildMainProps } from "../test/data_builders";

const props = buildMainProps({ data: buildGraphData({}) });
const AppWithRouterAndQueryParams = () => (
  <BrowserRouter>
    <QueryParamProvider ReactRouterRoute={Route}>
      <MAIN {...props} />
    </QueryParamProvider>
  </BrowserRouter>
);

describe("test list of med fields and setting of query params", () => {
  it("should show a list of minimum 12 med fields", () => {
    render(<AppWithRouterAndQueryParams />);
    const med_field_list = screen.getByTestId(/med_field_list/);
    expect(med_field_list.childElementCount).toBeGreaterThanOrEqual(12);
  });

  it("should by default have the first child selected", () => {
    render(<AppWithRouterAndQueryParams />);
    const med_field_list = screen.getByTestId(/med_field_list/);
    expect(med_field_list.firstChild).toHaveClass("checked");
  });

  it("should select and set matching query param when random list item is clicked", () => {
    render(<AppWithRouterAndQueryParams />);
    const kreft_container = screen.getByText(/KREFT/i);
    expect(kreft_container).toBeInTheDocument();
    expect(kreft_container.parentElement).not.toHaveClass("checked");
    userEvent.click(screen.getByText(/KREFT/i));
    expect(kreft_container.parentElement).toHaveClass(
      "checked med_field_kreft"
    );
    expect(parse(global.window.location.search.replace("?", ""))).toEqual({
      indicator: "kreft",
    });
  });
});

describe("test that correct med field list item is checked, when sending inn query params", () => {
  it("should not have class checked, when there are no query params", () => {
    render(<AppWithRouterAndQueryParams />);
    window.history.replaceState({}, "SKDE-TEST", "/");
    expect(screen.getByText(/DIABETES/i).parentElement).not.toHaveClass(
      "checked"
    );
    expect(screen.getByText(/DIABETES/i).parentElement).toHaveClass(
      "med_field med_field_diabetes"
    );
  });

  it("should have class checked, when matching query param exists", () => {
    window.history.replaceState({}, "SKDE-TEST", "/?indicator=diabetes");
    render(<AppWithRouterAndQueryParams />);
    expect(screen.getByText(/DIABETES/i).parentElement).toHaveClass(
      "med_field checked med_field_diabetes"
    );
  });
});
