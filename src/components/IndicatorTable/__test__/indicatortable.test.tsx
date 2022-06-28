import { BrowserRouter, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { QueryClient, QueryClientProvider } from "react-query";
import { render, screen, waitFor } from "@testing-library/react";

import opts from "../../../dev-tools/data/unitnames.json";
import { IndicatorTable } from "../";
import { RegisterNames } from "../../RegisterPage";

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
      <BrowserRouter>
        <QueryParamProvider ReactRouterRoute={Route}>
          <IndicatorTable
            context={"sykehus"}
            tableType="singleRegister"
            {...props}
          />
        </QueryParamProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );

  await waitFor(() => screen.findAllByRole("heading"));
  expect(container).toMatchSnapshot();
});
