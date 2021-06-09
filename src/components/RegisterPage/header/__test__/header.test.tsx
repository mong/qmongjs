import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Header } from "../";

it("register page header renders correctly", () => {
  const registerNames = [
    { id: 1, rname: "hjerneslag", full_name: "Norsk hjerneslagregister" },
    { id: 2, rname: "norgast", full_name: "Norsk register for gastrokirurgi" },
    {
      id: 3,
      rname: "barnekreft",
      full_name: "Nasjonalt kvalitetsregister for barnekreft",
    },
  ];
  const tabNames = [
    { value: "sykehus", label: "Sykehus" },
    { value: "boomraade", label: "Boområde" },
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
