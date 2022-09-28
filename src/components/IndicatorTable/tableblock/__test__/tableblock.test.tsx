import { screen, waitFor, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NextAdapter } from "next-query-params";
import { QueryClient, QueryClientProvider } from "react-query";
import { QueryParamProvider } from "use-query-params";
import { TableBlock, TableBlockProps } from "..";
import mockRouter from "next-router-mock";
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
  container.remove();
  container = null;
});

it.skip("renders with national data", async () => {
  const queryClient = new QueryClient();
  const res = render(
    <QueryClientProvider client={queryClient}>
      <QueryParamProvider adapter={NextAdapter}>
        <table>
          <tbody>
            <TableBlock {...props} />
          </tbody>
        </table>
      </QueryParamProvider>
    </QueryClientProvider>,
    container
  );

  await waitFor(() => screen.findAllByText("Nasjonalt"));
  expect(res.container).toMatchSnapshot();
});
