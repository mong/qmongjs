import { BrowserRouter, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Header } from "../";
import { RegisterNames } from "../../.";

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
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Header
          activeTab={"sykehus"}
          registerNames={registerNames}
          tabNames={tabNames}
          dataFrom={dataFrom}
        />
      </QueryParamProvider>
    </BrowserRouter>
  );

  expect(screen.getByText(tabNames[0].label)).toBeInTheDocument();
  expect(screen.getByText(dataFrom)).toBeInTheDocument();
  expect(screen.getByText(registerNames[0].full_name)).toBeInTheDocument();
  expect(container).toMatchSnapshot();

  userEvent.click(screen.getByText(tabNames[1].label));
  expect(container).toMatchSnapshot();
});
