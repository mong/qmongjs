import React from "react";
import { UseQueryResult } from "react-query";

import Header from "../Header";
import Footer from "../Footer";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import MainRegister from "./MainRegister";
import SelectedRegister from "./SelectedRegister";
import { useRegisterNamesQuery } from "../../helpers/hooks";

export interface RegisterNames {
  id: number;
  rname: string;
  full_name: string;
  registerField?: string;
}

export interface StatisticData {
  id: number;
  ind_id: string;
  unit_level: string;
  unit_name: string;
  orgnr: number;
  year: number;
  denominator: number;
  var: number;
  level: string;
  level_direction: number | null;
  dg: number | null;
  include: number | null;
  type: "andel" | string;
}

export interface Description {
  id: string;
  dg_id: string | null;
  include: number | null;
  title: string | null;
  name: string | null;
  type: string | null;
  min_denominator: number | null;
  level_green: number | null;
  level_yellow: number | null;
  level_direction: number;
  short_description: string | null;
  long_description: string | null;
  registry_id: number;
  rname: string | null;
  full_name: string;
}

export const API_HOST =
  process.env.REACT_APP_API_HOST ??
  "https://qa-mong-api.skde.org";

export const RegisterPage: React.FC = () => {
  let { path } = useRouteMatch();
  const registryNameQuery: UseQueryResult<
    any,
    unknown
  > = useRegisterNamesQuery();
  if (registryNameQuery.isLoading) {
    return null;
  }
  const registerNames = registryNameQuery.data;

  return (
    <>
      <Header />
      <Switch>
        <Route exact path={path}>
          <MainRegister registerNames={registerNames ?? []} />
        </Route>
        <Route exact path={`${path}/:register`}>
          <SelectedRegister registerNames={registerNames ?? []} />
        </Route>
        <Route path="/">
          <div style={{ minHeight: "100vh" }}>
            <h1 style={{ margin: "10%" }}>Page Not Found</h1>
          </div>
        </Route>
      </Switch>
      <Footer />
    </>
  );
};

export default RegisterPage;
