import React, { useState, useRef, useEffect } from "react";
import { useQueryParam } from "use-query-params";
import { useParams } from "react-router-dom";
import { UseQueryResult } from 'react-query'


import SELECT_MULTI from "../select_multi";
import SELECT_SINGLE from "../select_single";
import TU_LIST from "../tu_list";
import LEGEND from "../legend";
//import Loading from "../Loading.tsx";
import { IndicatorTable } from './indicatortable'
import { RegisterNames } from ".";
import config, {
  mainQueryParamsConfig,
  maxYear,
  minYear,
  defaultYear,
} from "../../app_config";
import {
  mathClamp,
  validateTreatmentUnits,
} from "../../helpers/functions";
import {
  useResizeObserver,
  useUnitNamesQuery
} from "../../helpers/hooks";
import { Header } from "./header";


interface SelectedRegisterProps {
  registerNames: RegisterNames[]
}

export const SelectedRegister: React.FC<SelectedRegisterProps> = ({
  registerNames
}) => {
  const { register }: { register: string } = useParams();

  const [
    nestedUnitNames,
    updateNestedUnitNames
  ] = useState<[]>([])

  const [
    optstu,
    updateOptsTU
  ] = useState<[]>([])

  const unitNamesQuery: UseQueryResult<any, unknown> = useUnitNamesQuery(register)

  useEffect(() => {
    if (unitNamesQuery.isSuccess) {
      updateNestedUnitNames(unitNamesQuery.data.nestedUnitNames)
      updateOptsTU(unitNamesQuery.data.opts_tu)
    }
  }, [unitNamesQuery])



  const [selection_bar_height, update_selection_bar_height] = useState<
    number | null
  >(null);
  const [legend_height, update_legend_height] = useState(null);
  //height of the selection bar
  const selection_bar_ref = useRef<HTMLDivElement | null>(null);
  const selection_bar_dim = useResizeObserver(selection_bar_ref);
  useEffect(() => {
    if (!selection_bar_dim) {
      return;
    }
    const top = (selection_bar_dim.target as HTMLElement).offsetHeight ?? "";
    update_selection_bar_height(top);
  }, [selection_bar_dim]);

  const [treatment_units, update_treatment_units] = useQueryParam(
    "selected_treatment_units",
    mainQueryParamsConfig.selected_treatment_units
  );

  const [selected_year, update_selected_year] = useQueryParam(
    "year",
    mainQueryParamsConfig.year
  );
  const validated_selected_year = mathClamp(
    selected_year || defaultYear,
    minYear,
    maxYear
  );

  const validated_treatment_units = validateTreatmentUnits(
    treatment_units as string[],
    optstu
  );

  const colspan = validated_treatment_units.length + 2;
  const valid_years = Array.from(Array(maxYear - minYear + 1).keys()).map(
    (v) => minYear + v
  );
  const [show_level_filter, update_show_level_filter] = useQueryParam<
    string | undefined
  >("level", mainQueryParamsConfig.level);

  const validReg = registerNames.map(d => d.rname)
  // returns page not found if the register param is not valid
  if (!validReg.includes(register)) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <h1 style={{ margin: "10%" }}>Page Not Found</h1>
      </div>
    );
  }


  return (
    <div className="app-container" style={{ minHeight: "100vh" }}>
      <Header tabNames={["a", "b"]} />
      <div className="app-body">
        <div className="selection-container" ref={selection_bar_ref}>
          <div className="treatment-unit-selection">
            <SELECT_MULTI
              opts={optstu}
              update_tu={update_treatment_units}
              treatment_unit={validated_treatment_units}
            />
            <TU_LIST
              tu_structure={nestedUnitNames}
              treatment_units={validated_treatment_units}
              update_treatment_units={update_treatment_units}
            />
          </div>
          <div className="year-selection">
            <SELECT_SINGLE
              opts={valid_years}
              update_year={update_selected_year}
              selected_year={validated_selected_year}
            />
          </div>
        </div>

        <LEGEND
          app_text={config.app_text}
          update_show_level_filter={update_show_level_filter}
          show_level_filter={show_level_filter}
          selection_bar_height={selection_bar_height}
          update_legend_height={update_legend_height}
          width="100%"
        />

        <div className="content_container">
          <div className="main_table_container">
            <IndicatorTable
              registerNames={[{ id: 1, rname: register, full_name: register }]}
              unitNames={[...validated_treatment_units, "Nasjonalt"]}
              treatmentYear={validated_selected_year}
              colspan={colspan}
              medicalFieldFilter={[register]}
              showLevelFilter={show_level_filter ?? ""}
              selection_bar_height={selection_bar_height ?? 0}
              legend_height={legend_height ?? 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedRegister;
