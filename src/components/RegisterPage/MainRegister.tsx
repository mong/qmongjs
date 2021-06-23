import React, { useState, useRef, useEffect } from "react";
import { UseQueryResult } from "react-query";
import { useQueryParam } from "use-query-params";

import { useParams } from "react-router-dom";

import MAIN from "../main_component";
import { Header } from "./header";
import SELECT_MULTI, { OptsTu } from "../select_multi";
import SELECT_SINGLE from "../select_single";

import config, {
  mainQueryParamsConfig,
  maxYear,
  minYear,
  defaultYear,
} from "../../app_config";

import { useResizeObserver, useUnitNamesQuery } from "../../helpers/hooks";
import { mathClamp, validateTreatmentUnits } from "../../helpers/functions";
import { RegisterNames } from ".";
import { UnitNameList } from "./unitnamelist";
import { NestedTreatmentUnitName } from "./unitnamelist/unitnamelistbody";

const { app_text } = config;

interface MainRegisterProps {
  registerNames: RegisterNames[];
}

const MainRegister: React.FC<MainRegisterProps> = ({ registerNames }) => {
  const { tab }: { tab: string } = useParams();
  const tabNames: { label: string; value: string }[] = [
    { value: "sykehus", label: "Sykehus" },
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
  const activeTab = tab;
  const queryContext =
    context === "coverage"
      ? { context: "caregiver", type: "dg" }
      : { context, type: "ind" };

  const unitNamesQuery: UseQueryResult<any, unknown> = useUnitNamesQuery(
    "all",
    queryContext.context,
    queryContext.type
  );

  const nestedUnitNames: NestedTreatmentUnitName[] | [] =
    unitNamesQuery.data?.nestedUnitNames ?? [];
  const optstu: OptsTu[] | [] = unitNamesQuery.data?.opts_tu ?? [];

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

  if (!tabNames.some((tabName) => tabName.value === tab)) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <h1 style={{ margin: "10%" }}>Page Not Found</h1>
      </div>
    );
  }

  const placeholder =
    tab === "opptaksomraade" ? (
      <div>
        <i className="fas fa-search" /> Søk etter opptaksområder
      </div>
    ) : undefined;
  return (
    <div className="app-container" style={{ minHeight: "100vh" }}>
      <Header
        tabNames={tabNames}
        registerNames={registerNames}
        activeTab={activeTab}
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
              opts={valid_years}
              update_year={update_selected_year}
              selected_year={validated_selected_year}
            />
          </div>
        </div>
        {unitNamesQuery.isLoading ? null : (
          <MAIN
            context={context}
            optstu={optstu}
            registerNames={registerNames}
            treatment_units={validated_treatment_units}
            selected_year={validated_selected_year}
            app_text={app_text}
            colspan={colspan}
            selection_bar_height={selection_bar_height}
            legend_height={legend_height}
            update_legend_height={update_legend_height}
          />
        )}
      </div>
    </div>
  );
};

export default MainRegister;
