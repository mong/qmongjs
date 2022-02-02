import { screen, waitFor } from "@testing-library/react";
import { render, unmountComponentAtNode } from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

import { TableBlock, TableBlockProps } from "..";
const props: TableBlockProps = {
  context: "sykehus",
  tableType: "allRegistries",
  registerName: {
    id: 1,
    rname: "hoftebrudd",
    full_name: "Nasjonalt hoftebruddregister",
    caregiver_data: 1,
    resident_data: 1,
    dg_data: 1,
  },
  blockTitle: "Nasjonalt hoftebruddregister",
  treatmentYear: 2019,
  unitNames: ["Nasjonalt"],
  medicalFieldFilter: ["hoftebrudd"],
  showLevelFilter: "",
  colspan: 3,
};

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

it("renders with national data", async () => {
  const queryClient = new QueryClient();
  render(
    <Router>
      <QueryClientProvider client={queryClient}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <table>
            <tbody>
              <TableBlock {...props} />
            </tbody>
          </table>
        </QueryParamProvider>
      </QueryClientProvider>
    </Router>,
    container
  );

  await waitFor(() => screen.findAllByRole("heading", { level: 4 }));
  expect(container).toMatchSnapshot();
});
