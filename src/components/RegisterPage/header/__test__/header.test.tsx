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
  const tabNames = ["Sykehus", "Boområde", "Datakvalitet"];
  const dataFrom = "Norsk hjerneslagregister";

  const { container } = render(
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Header
          registerNames={registerNames}
          tabNames={tabNames}
          dataFrom={dataFrom}
        />
      </QueryParamProvider>
    </BrowserRouter>
  );

  expect(screen.getByText(tabNames[0])).toBeInTheDocument();
  expect(screen.getByText(dataFrom)).toBeInTheDocument();
  expect(screen.getByText(registerNames[0].full_name)).toBeInTheDocument();
  expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
    tabNames[0]
  );
  expect(container).toMatchSnapshot();

  userEvent.click(screen.getByText(tabNames[1]));
  expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
    tabNames[1]
  );
});
