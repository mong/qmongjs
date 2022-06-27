import React, { useState, useRef, useEffect } from "react";
import { useQueryParam } from "use-query-params";
import { useParams } from "react-router-dom";
import { UseQueryResult } from "react-query";

import SELECT_MULTI from "../select_multi";
import SELECT_SINGLE from "../select_single";
import LEGEND from "../TargetLevels";
import { IndicatorTable } from "../IndicatorTable";
import { RegisterNames } from ".";
import { OptsTu } from "../select_multi";
import config, {
  mainQueryParamsConfig,
  maxYear,
  minYear,
  defaultYear,
} from "../../app_config";
import { mathClamp, validateTreatmentUnits } from "../../helpers/functions";
import {
  useResizeObserver,
  useUnitNamesQuery,
  useSelectionYearsQuery,
} from "../../helpers/hooks";
import { Header } from "./header";
import { UnitNameList } from "./unitnamelist";
import { NestedTreatmentUnitName } from "./unitnamelist/unitnamelistbody";

interface SelectedRegisterProps {
  registerNames: RegisterNames[];
}

export const SelectedRegister: React.FC<SelectedRegisterProps> = ({
  registerNames,
}) => {
  const { register } = useParams();
  const { tab } = useParams();
  const tabNames: { label: string; value: string }[] = [
    { value: "sykehus", label: "Sykehus" },
    { value: "opptaksomraade", label: "Opptaksområde" },
    { value: "datakvalitet", label: "Datakvalitet" },
  ];
  const context =
    tab === "sykehus"
      ? "caregiver"
      : tab === "opptaksomraade"
      ? "resident"
      : tab === "datakvalitet"
      ? "coverage"
      : "caregiver";
  const registerInfo = registerNames.filter((reg) => reg.rname === register);

  const queryContext =
    context === "coverage"
      ? { context: "caregiver", type: "dg" }
      : { context, type: "ind" };

  const unitNamesQuery: UseQueryResult<any, unknown> = useUnitNamesQuery(
    register as string,
    queryContext.context,
    queryContext.type
  );
  const nestedUnitNames: NestedTreatmentUnitName[] | [] =
    unitNamesQuery.data?.nestedUnitNames ?? [];
  const optstu: OptsTu[] | [] = unitNamesQuery.data?.opts_tu ?? [];

  const selectionYearQuery: UseQueryResult<any, unknown> =
    useSelectionYearsQuery(
      register as string,
      queryContext.context,
      queryContext.type
    );

  const valid_years =
    selectionYearQuery.data ??
    Array.from(Array(maxYear - minYear + 1).keys()).map((v) => minYear + v);

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
  const min = valid_years.length === 0 ? minYear : Math.min(...valid_years);
  const max = valid_years.length === 0 ? maxYear : Math.max(...valid_years);
  const validated_selected_year = mathClamp(
    selected_year || defaultYear,
    min,
    max
  );

  const validated_treatment_units = validateTreatmentUnits(
    treatment_units as string[],
    optstu
  );

  const colspan = validated_treatment_units.length + 2;

  const [show_level_filter, update_show_level_filter] = useQueryParam<
    string | undefined
  >("level", mainQueryParamsConfig.level);

  const validReg = registerNames.map((d) => d.rname);
  // returns page not found if the register param or tab param is not valid
  if (
    !validReg.includes(register as string) ||
    !tabNames.some((tabName) => tabName.value === tab) ||
    (!registerInfo[0].caregiver_data && tab === "sykehus") ||
    (!registerInfo[0].resident_data && tab === "opptaksomraade") ||
    (!registerInfo[0].dg_data && tab === "datakvalitet")
  ) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <h1 style={{ margin: "10%" }}>Page Not Found</h1>
      </div>
    );
  }
  const registerFullName = registerNames.filter((d) => d.rname === register)[0]
    .full_name;

  const registerTabs = tabNames.filter((tabs) => {
    if (registerInfo[0].caregiver_data && tabs.label === "Sykehus") {
      return true;
    }
    if (registerInfo[0].resident_data && tabs.label === "Opptaksområde") {
      return true;
    }
    if (registerInfo[0].dg_data && tabs.label === "Datakvalitet") {
      return true;
    }
    return false;
  });

  const placeholder =
    tab === "opptaksomraade" ? (
      <div>
        <i className="fas fa-search" /> Søk etter opptaksområder
      </div>
    ) : undefined;

  return (
    <div className="app-container" style={{ minHeight: "100vh" }}>
      <Header
        registerNames={registerNames}
        dataFrom={registerFullName}
        tabNames={registerTabs}
        activeTab={tab as string}
      />
      <div className="app-body">
        <div className="selection-container" ref={selection_bar_ref}>
          <div className="treatment-unit-selection">
            <SELECT_MULTI
              opts={optstu}
              update_tu={update_treatment_units}
              treatment_unit={validated_treatment_units}
              placeholder={placeholder}
            />
            <UnitNameList
              nestedUnitNames={nestedUnitNames}
              treatment_units={validated_treatment_units}
              update_treatment_units={update_treatment_units}
            />
          </div>
          <div className="year-selection">
            <SELECT_SINGLE
              opts={valid_years.sort()}
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
              context={context}
              tableType={"singleRegister"}
              registerNames={registerInfo}
              unitNames={[...validated_treatment_units, "Nasjonalt"]}
              treatmentYear={validated_selected_year}
              colspan={colspan}
              medicalFieldFilter={[register as string]}
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
