import React, { useMemo } from "react";
import { useQuery } from "react-query";


import Header from "../Header";
import Footer from "../Footer";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import MainRegister from "./MainRegister";
import SelectedRegister from "./SelectedRegister";

export interface StatisticData {
  ind_id: string;
  unit_level: string;
  unit_name: string;
  orgnr: number;
  year: number;
  denominator: number;
  var: number;
  level: string;
  level_direction: number | null;
  dg?: number;
  include: number | null;
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

export interface TreatmentUnit {
  hospital: string;
  hf: string;
  hf_full: string;
  rhf: string;
}

export interface AggData {
  nation: {
    filtered_by_unit: StatisticData[];
    filtered_by_year: StatisticData[];
  };
  filtered_by_unit: StatisticData[];
  filtered_by_year: StatisticData[];
  all_filtered_by_year: StatisticData[];
}
interface Data {
  indicator_hosp: StatisticData[];
  indicator_hf: StatisticData[];
  indicator_rhf: StatisticData[];
  indicator_nat: StatisticData[];
  description: Description[];
  tu_names: TreatmentUnit[];
}

const API_HOST = process.env.REACT_APP_API_HOST ?? "https://d2mrl4o83i9jyx.cloudfront.net" // "http://localhost:4000";

function DataLoader() {

  const { isLoading, error, data } = useQuery<Data, Error>("repoData", () =>
    fetch(`${API_HOST}/legacy`).then((res) => res.json()),
    { refetchOnWindowFocus: false, cacheTime: 1000 * 60 * 60, staleTime: 1000 * 60 * 60 * 24, notifyOnChangeProps: ['data'] }
  );
  if (error) return <>An error has occurred: {error?.message}</>;

  const dataOrEmpty: Data = data ?? {
    description: [],
    indicator_hf: [],
    indicator_hosp: [],
    indicator_nat: [],
    indicator_rhf: [],
    tu_names: [],
  };

  return <RegisterPage data={dataOrEmpty} isLoading={isLoading} />;
}

interface Props {
  data: Data;
  isLoading: boolean;
}


function RegisterPage({ data, isLoading }: Props) {
  const {
    indicator_hosp,
    indicator_hf,
    indicator_rhf,
    indicator_nat: indicator_nation,
    description,
    tu_names,
  } = data;

  let { path } = useRouteMatch();

  const indicatorSorter = useMemo(() => {
    const descriptionMap: { [key: string]: string } = {};
    for (const d of description) {
      descriptionMap[d.id] = d.name ?? "";
    }
    return (a: StatisticData, b: StatisticData) => {
      const aName = descriptionMap[a.ind_id];
      const bName = descriptionMap[b.ind_id];

      return aName.localeCompare(bName);
    };
  }, [description]);

  const sortedIndicatorHospital = useMemo(
    () => indicator_hosp.sort(indicatorSorter),
    [indicatorSorter, indicator_hosp]
  );

  const sortedIndicatorHf = useMemo(() => indicator_hf.sort(indicatorSorter), [
    indicatorSorter,
    indicator_hf,
  ]);

  const sortedIndicatorRhf = useMemo(
    () => indicator_rhf.sort(indicatorSorter),
    [indicatorSorter, indicator_rhf]
  );

  const sortedIndicatorNation = useMemo(
    () => indicator_nation.sort(indicatorSorter),
    [indicatorSorter, indicator_nation]
  );


  return (
    <>
      <Header />
      <Switch>
        <Route exact path={path}>
          <MainRegister
            isLoading={isLoading}
            tu_names={tu_names}
            sortedIndicatorHospital={sortedIndicatorHospital}
            sortedIndicatorHf={sortedIndicatorHf}
            sortedIndicatorRhf={sortedIndicatorRhf}
            sortedIndicatorNation={sortedIndicatorNation}
            description={description}
          />
        </Route>
        <Route exact path={`${path}/:register`}>
          <SelectedRegister
            isLoading={isLoading}
            tu_names={tu_names}
            sortedIndicatorHospital={sortedIndicatorHospital}
            sortedIndicatorHf={sortedIndicatorHf}
            sortedIndicatorRhf={sortedIndicatorRhf}
            sortedIndicatorNation={sortedIndicatorNation}
            description={description}
          />
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
}

export default DataLoader;