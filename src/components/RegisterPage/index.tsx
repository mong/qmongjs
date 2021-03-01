import React, { useState, useMemo } from "react";
//import { useQueryParam } from "use-query-params";

//import config/*, { mainQueryParamsConfig, maxYear, minYear }*/ from "../../app_config";
/*import { nest_tu_names } from "../../data/filter_year_unit";
import useResizeObserver from "../../helpers/hooks/useResizeObserver";
import { filter_year_unit } from "../../data/filter_year_unit";
import mathClamp from "../../helpers/functions/mathClamp";
import validateTreatmentUnits from "../../helpers/functions/validateTreatmentUnits";
*/

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

function RegisterPage() {
  let { path } = useRouteMatch();
  //data as state
  const [indicator_hosp, update_hosp] = useState<StatisticData[]>(
    (window as any).indicator_hosp ? (window as any).indicator_hosp : []
  );
  const [indicator_hf, update_hf] = useState<StatisticData[]>(
    (window as any).indicator_hf ? (window as any).indicator_hf : []
  );
  const [indicator_rhf, update_rhf] = useState<StatisticData[]>(
    (window as any).indicator_rhf ? (window as any).indicator_rhf : []
  );
  const [indicator_nation, update_nation] = useState<StatisticData[]>(
    (window as any).indicator_nat ? (window as any).indicator_nat : []
  );
  const [description, update_description] = useState<Description[]>(
    (window as any).description ? (window as any).description : []
  );
  const [tu_names, update_tu_names] = useState<TreatmentUnit[]>(
    (window as any).tu_names ? (window as any).tu_names : []
  );
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

  //update data as it arrives
  if (typeof (window as any).Shiny !== "undefined") {
    (window as any).Shiny.addCustomMessageHandler(
      "tu_names",
      function (message: any) {
        update_tu_names(message);
      }
    );
    (window as any).Shiny.addCustomMessageHandler(
      "description",
      function (message: any) {
        update_description(message);
      }
    );
    (window as any).Shiny.addCustomMessageHandler(
      "nation",
      function (message: any) {
        update_nation(message);
      }
    );
    (window as any).Shiny.addCustomMessageHandler(
      "hospital",
      function (message: any) {
        update_hosp(message);
      }
    );
    (window as any).Shiny.addCustomMessageHandler(
      "hf",
      function (message: any) {
        update_hf(message);
      }
    );
    (window as any).Shiny.addCustomMessageHandler(
      "rhf",
      function (message: any) {
        update_rhf(message);
      }
    );
  }
  console.log(path);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path={path}>
          <MainRegister
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

export default RegisterPage;
