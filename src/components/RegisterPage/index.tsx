import React from "react";
import { UseQueryResult } from "react-query";

import Header from "../Header";
import Footer from "../Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import MainRegister from "./MainRegister";
import SelectedRegister from "./SelectedRegister";
import { useRegisterNamesQuery } from "../../helpers/hooks";

export interface RegisterNames {
  id: number;
  rname: string;
  full_name: string;
  registerField?: string;
  caregiver_data: 1 | 0 | null;
  resident_data: 1 | 0 | null;
  dg_data: 1 | 0 | null;
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
  delivery_time: Date;
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
  process.env.REACT_APP_API_HOST ?? "http://localhost:4000"; //"https://qa-mong-api.skde.org";

export const RegisterPage: React.FC = () => {
  const registryNameQuery: UseQueryResult<any, unknown> =
    useRegisterNamesQuery();
  if (registryNameQuery.isLoading) {
    return null;
  }
  const registerNames = registryNameQuery.data;

  return (
    <>
      <Header />
      <Routes>
        <Route path="/alle/:tab">
          <MainRegister registerNames={registerNames ?? []} />
        </Route>
        <Route path="/:register/:tab">
          <SelectedRegister registerNames={registerNames ?? []} />
        </Route>
        <Route path="/">
          <Navigate to="/alle/sykehus" />
        </Route>
        <Route path="/alle">
          <Navigate to="/alle/sykehus" />
        </Route>

        <Route path="*">
          <div style={{ minHeight: "100vh" }}>
            <h1 style={{ margin: "10%" }}>Page Not Found</h1>
          </div>
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default RegisterPage;
