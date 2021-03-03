import React, { useMemo, useState, useRef, useEffect } from "react";
import { useQueryParam } from "use-query-params";
import { useParams } from "react-router-dom";

import HEADER from "../header_main";
import SELECT_MULTI from "../select_multi";
import SELECT_SINGLE from "../select_single";
import TU_LIST from "../tu_list";
import INDICATOR_TABLE from "../indicator_table";
import LEGEND from "../legend";
import Loading from "../Loading.tsx";

import { StatisticData, Description, TreatmentUnit, AggData } from ".";
import config, {
  mainQueryParamsConfig,
  maxYear,
  minYear,
} from "../../app_config";

import { nest_tu_names } from "../../data/filter_year_unit";
import { filter_year_unit } from "../../data/filter_year_unit";
import {
  mathClamp,
  validateTreatmentUnits,
  filter_data,
} from "../../helpers/functions";
import { useResizeObserver } from "../../helpers/hooks";

interface SelectedRegisterProps {
  tu_names: TreatmentUnit[];
  sortedIndicatorHospital: StatisticData[];
  sortedIndicatorHf: StatisticData[];
  sortedIndicatorRhf: StatisticData[];
  sortedIndicatorNation: StatisticData[];
  description: Description[];
  isLoading: boolean
}

const SelectedRegister: React.FC<SelectedRegisterProps> = ({
  tu_names,
  isLoading,
  sortedIndicatorHospital,
  sortedIndicatorHf,
  sortedIndicatorRhf,
  sortedIndicatorNation,
  description,
}) => {
  const { register }: { register: string } = useParams();

  const regDescription: (Description | null)[] = useMemo(() => {
    return description.filter((desc: Description) => desc.rname === register);
  }, [register, description]);

  const regName: { sName: string | null; lName: string | null } = {
    sName: regDescription[0]?.rname || null,
    lName: regDescription[0]?.full_name || null,
  };

  const regIndicators: (string | null)[] = useMemo(() => {
    return Array.from(
      new Set(regDescription.map((d: Description | null) => d?.id || null))
    );
  }, [regDescription]);

  const regSortedIndicatorHospital: StatisticData[] = useMemo(() => {
    return sortedIndicatorHospital.filter((ind: StatisticData) =>
      regIndicators.includes(ind.ind_id)
    );
  }, [regIndicators, sortedIndicatorHospital]);

  const regSortedIndicatorHf = useMemo(() => {
    return sortedIndicatorHf.filter((ind: StatisticData) =>
      regIndicators.includes(ind.ind_id)
    );
  }, [regIndicators, sortedIndicatorHf]);

  const regSortedIndicatorRhf = useMemo(() => {
    return sortedIndicatorRhf.filter((ind: StatisticData) =>
      regIndicators.includes(ind.ind_id)
    );
  }, [regIndicators, sortedIndicatorRhf]);

  const regSortedIndicatorNation = useMemo(() => {
    return sortedIndicatorNation.filter((ind: StatisticData) => {
      return regIndicators.includes(ind.ind_id);
    });
  }, [regIndicators, sortedIndicatorNation]);

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
    selected_year || maxYear,
    minYear,
    maxYear
  );

  const opts_hosp = Array.from(
    new Set(regSortedIndicatorHospital.map((d) => d.unit_name))
  )
    .sort()
    .map((opt) => ({ value: opt, label: opt }));
  const opts_hf = Array.from(
    new Set(regSortedIndicatorHf.map((d) => d.unit_name))
  )
    .sort()
    .map((opt) => ({ value: opt, label: opt }));
  const opts_rhf = Array.from(
    new Set(regSortedIndicatorRhf.map((d) => d.unit_name))
  )
    .sort()
    .map((opt) => ({ value: opt, label: opt }));
  const opts_tu = [
    { label: "Sykehus", options: opts_hosp },
    { label: "HF", options: opts_hf },
    { label: "RHF", options: opts_rhf },
  ];
  const validated_treatment_units = validateTreatmentUnits(
    treatment_units as string[],
    opts_tu
  );
  const input_data = {
    selected_unit: validated_treatment_units,
    selected_year: validated_selected_year,
  };

  const hospital = filter_year_unit(regSortedIndicatorHospital, input_data);
  const hf = filter_year_unit(regSortedIndicatorHf, input_data);
  const rhf = filter_year_unit(regSortedIndicatorRhf, input_data);
  const nation = filter_year_unit(regSortedIndicatorNation, {
    selected_unit: ["Nasjonalt"],
    selected_year: validated_selected_year,
  });

  const tu_name_hospital = Array.from(
    new Set(
      hospital.filtered_by_year.map((d) => d.unit_name) // [data_config.column.treatment_unit]
    )
  ).sort();

  const tu_name_hf = Array.from(
    new Set(
      hf.filtered_by_year.map((d) => d.unit_name) // [data_config.column.treatment_unit]
    )
  ).sort();

  const tu_name_rhf = Array.from(
    new Set(
      rhf.filtered_by_year.map((d) => d.unit_name) // [data_config.column.treatment_unit]
    )
  ).sort();

  const tu_name = tu_name_hospital.concat(tu_name_hf, tu_name_rhf);

  const colspan = tu_name.length + 2;

  const agg_data: AggData = {
    nation,
    filtered_by_unit: [
      ...hospital.filtered_by_unit,
      ...hf.filtered_by_unit,
      ...rhf.filtered_by_unit,
    ],
    filtered_by_year: [
      ...hospital.filtered_by_year,
      ...hf.filtered_by_year,
      ...rhf.filtered_by_year,
    ],
    all_filtered_by_year: [
      ...sortedIndicatorHospital.filter(
        (d) => d.year === validated_selected_year // [data_config.column.year]
      ),
      ...sortedIndicatorNation.filter(
        (d) => d.year === validated_selected_year // [data_config.column.year]
      ),
    ],
  };

  const tu_structure = nest_tu_names(tu_names);
  const valid_years = Array.from(Array(maxYear - minYear + 1).keys()).map(
    (v) => minYear + v
  );

  //
  for (let iRhf = tu_structure.length - 1; iRhf > -1; iRhf--) {
    if (opts_rhf.every((rhf) => rhf.value !== tu_structure[iRhf].rhf)) {
      tu_structure.splice(iRhf, 1);
    }

    const hfArray = tu_structure[iRhf] ? tu_structure[iRhf].hf : [];
    for (let iHf = hfArray.length - 1; iHf > -1; iHf--) {
      if (opts_hf.every((hf) => hf.value !== hfArray[iHf].hf)) {
        hfArray.splice(iHf, 1);
      }

      const hospArray = hfArray[iHf] ? hfArray[iHf].hospital : [];
      for (let iHosp = hospArray.length - 1; iHosp > -1; iHosp--) {
        if (opts_hosp.every((hosp) => hosp.value !== hospArray[iHosp])) {
          hospArray.splice(iHosp, 1);
        }
      }
    }
  }

  const [show_level_filter, update_show_level_filter] = useQueryParam<
    string | undefined
  >("level", mainQueryParamsConfig.level);

  const data = {
    agg_data,
    description: description.filter((d) => d.rname === register),
  };

  const filtered_data = filter_data(data, show_level_filter);

  // returns page not found if the register param is not valid
  if (!isLoading && regName.sName !== register) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <h1 style={{ margin: "10%" }}>Page Not Found</h1>
      </div>
    );
  }

  return (
    <div className="app-container" style={{ minHeight: "100vh" }}>
      <HEADER dataFrom={regName.lName ?? undefined} />
      <div className="app-body">
        <div className="selection-container" ref={selection_bar_ref}>
          <div className="treatment-unit-selection">
            <SELECT_MULTI
              opts={opts_tu}
              update_tu={update_treatment_units}
              treatment_unit={validated_treatment_units}
            />
            <TU_LIST
              tu_structure={tu_structure}
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
            {isLoading ? (
              <Loading />
            ) : (
                <INDICATOR_TABLE
                  data={filtered_data}
                  treatment_unit_name={tu_name}
                  treatment_year={validated_selected_year}
                  colspan={colspan}
                  med_field_filter={[register]}
                  show_level_filter={show_level_filter}
                  selection_bar_height={selection_bar_height}
                  legend_height={legend_height}
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedRegister;
