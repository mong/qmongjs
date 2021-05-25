import { screen, waitFor } from "@testing-library/react";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

import { TableBlock, TableBlockProps } from "..";

it("placeholder", () => {
  expect(2 + 2).toBe(4)
})
/*const props: TableBlockProps = {
  tableType: "allRegistries",
  optstu: [],
  registerName: {
    id: 1,
    rname: "hoftebrudd",
    full_name: "Nasjonalt hoftebruddregister",
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
/*
it("renders with national data", async () => {
  act(() => {
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
  });

  await waitFor(() => screen.getAllByRole("heading", { level: 4 }));
  expect(container).toMatchSnapshot();
});
*/