import React from "react";
import { BrowserRouter, Route, Router } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { QueryClient, QueryClientProvider } from "react-query";
import { render, screen, waitFor } from "@testing-library/react";
import opts from "../../../../dev-tools/data/unitnames.json";

import { clockTick } from "../../../../test/clockTick";

import { IndicatorTable } from "../";

it("registry table renders correctly for a single registry", async () => {
  const props = {
    colspan: 2,
    selection_bar_height: 0,
    legend_height: 0,
    optstu: opts.opts_tu,
    unitNames: ["Nasjonalt"],
    registerNames: [
      { id: 1, rname: "hoftebrudd", full_name: "Nasjonalt hoftebruddregister" },
    ],
    treatmentYear: 2019,
    medicalFieldFilter: ["hoftebrudd"],
  };
  const queryClient = new QueryClient();

  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <QueryParamProvider ReactRouterRoute={Route}>
          <IndicatorTable tableType="singleRegister" {...props} />
        </QueryParamProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );

  await waitFor(() => screen.getAllByRole("heading"));
  expect(container).toMatchSnapshot();
});
