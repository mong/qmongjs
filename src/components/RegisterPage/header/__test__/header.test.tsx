import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { Header } from "../";
import { RegisterNames } from "../../.";
import { NextAdapter } from "next-query-params";
import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import { QueryParamProvider } from "use-query-params";

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
    rname: "hjerneslag",
    full_name: "Norsk hjerneslagregister",
    caregiver_data: 1,
    resident_data: 1,
    dg_data: 1,
  },
  {
    id: 2,
    rname: "norgast",
    full_name: "Norsk register for gastrokirurgi",
    caregiver_data: 1,
    resident_data: 1,
    dg_data: 1,
  },
  {
    id: 3,
    rname: "barnekreft",
    full_name: "Nasjonalt kvalitetsregister for barnekreft",
    caregiver_data: 1,
    resident_data: 1,
    dg_data: 1,
  },
];
it("register page header renders correctly", () => {
  const registerNames = registerInfo;
  const tabNames = [
    { value: "sykehus", label: "Sykehus" },
    { value: "opptaksomraade", label: "Opptaksområde" },
    { value: "datakvalitet", label: "Datakvalitit" },
  ];
  const dataFrom = "Norsk hjerneslagregister";

  const { container } = render(
    <QueryParamProvider adapter={NextAdapter}>
      <Header
        activeTab={"sykehus"}
        registerNames={registerNames}
        tabNames={tabNames}
        dataFrom={dataFrom}
      />
    </QueryParamProvider>
  );

  expect(screen.getByText(tabNames[0].label)).toBeInTheDocument();
  expect(screen.getByText(dataFrom)).toBeInTheDocument();
  expect(screen.getByText(registerNames[0].full_name)).toBeInTheDocument();
  expect(container).toMatchSnapshot();

  userEvent.click(screen.getByText(tabNames[1].label));
  expect(container).toMatchSnapshot();
});
