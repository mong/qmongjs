import { QueryParamProvider } from "use-query-params";
import { QueryClient, QueryClientProvider } from "react-query";
import { render, screen, waitFor } from "@testing-library/react";

import opts from "../../../dev-tools/data/unitnames.json";
import { IndicatorTable } from "../";
import { RegisterNames } from "../../RegisterPage";

import mockRouter from "next-router-mock";
import { NextAdapter } from "next-query-params";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";

jest.mock("next/router", () => require("next-router-mock"));
// This is needed for mocking 'next/link':
jest.mock("next/dist/client/router", () => require("next-router-mock"));

mockRouter.useParser(
  createDynamicRouteParser([
    // These paths should match those found in the `/pages` folder:
    "/alle/[tab].js",
    "/[register]/[tab].js",
  ])
);
beforeEach(() => {
  mockRouter.setCurrentUrl("/alle/sykehus");
});

const registerInfo: RegisterNames[] = [
  {
    id: 1,
    rname: "hoftebrudd",
    full_name: "Nasjonalt hoftebruddregister",
    caregiver_data: 1,
    resident_data: 0,
    dg_data: 1,
  },
];
it("registry table renders correctly for a single registry", async () => {
  const props = {
    colspan: 2,
    selection_bar_height: 0,
    legend_height: 0,
    optstu: opts.opts_tu,
    unitNames: ["Nasjonalt"],
    registerNames: registerInfo,
    treatmentYear: 2019,
    medicalFieldFilter: ["hoftebrudd"],
  };
  const queryClient = new QueryClient();

  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <QueryParamProvider adapter={NextAdapter}>
        <IndicatorTable
          context={"sykehus"}
          tableType="singleRegister"
          {...props}
        />
      </QueryParamProvider>
    </QueryClientProvider>
  );

  await waitFor(() => screen.findAllByText(props.unitNames[0]));
  expect(container).toMatchSnapshot();
});
