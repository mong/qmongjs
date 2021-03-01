import React, { useState, useRef, useEffect } from "react";
import { useQueryParam } from "use-query-params";

import MAIN from "../main_component";
import HEADER from "../header_main";
import SELECT_MULTI from "../select_multi";
import SELECT_SINGLE from "../select_single";
import TU_LIST from "../tu_list";

import config, {
  mainQueryParamsConfig,
  maxYear,
  minYear,
} from "../../app_config";
import { nest_tu_names } from "../../data/filter_year_unit";
import { useResizeObserver } from "../../helpers/hooks";
import { filter_year_unit } from "../../data/filter_year_unit";
import { mathClamp, validateTreatmentUnits } from "../../helpers/functions";

import { StatisticData, Description, TreatmentUnit, AggData } from ".";

const { med_field, app_text } = config;

interface MainRegisterProps {
  tu_names: TreatmentUnit[];
  sortedIndicatorHospital: StatisticData[];
  sortedIndicatorHf: StatisticData[];
  sortedIndicatorRhf: StatisticData[];
  sortedIndicatorNation: StatisticData[];
  description: Description[];
}

const MainRegister: React.FC<MainRegisterProps> = ({
  tu_names,
  sortedIndicatorHospital,
  sortedIndicatorHf,
  sortedIndicatorRhf,
  sortedIndicatorNation,
  description,
}) => {
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
    new Set(sortedIndicatorHospital.map((d) => d.unit_name))
  )
    .sort()
    .map((opt) => ({ value: opt, label: opt }));
  const opts_hf = Array.from(new Set(sortedIndicatorHf.map((d) => d.unit_name)))
    .sort()
    .map((opt) => ({ value: opt, label: opt }));
  const opts_rhf = Array.from(
    new Set(sortedIndicatorRhf.map((d) => d.unit_name))
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
  const hospital = filter_year_unit(sortedIndicatorHospital, input_data);
  const hf = filter_year_unit(sortedIndicatorHf, input_data);
  const rhf = filter_year_unit(sortedIndicatorRhf, input_data);
  const nation = filter_year_unit(sortedIndicatorNation, {
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

  const unique_indicators =
    tu_name.length > 0
      ? Array.from(
          new Set(
            agg_data.filtered_by_year.map(
              (d) => d.ind_id // [data_config.column.indicator_id]
            )
          )
        )
      : Array.from(
          new Set(
            agg_data.nation.filtered_by_year.map(
              (d) => d.ind_id // [data_config.column.indicator_id]
            )
          )
        );

  const unique_register = Array.from(
    new Set(med_field.flatMap((entry) => entry.key))
  ).map((registry) => {
    const ind = description.filter(
      (description) =>
        description.rname === registry && // [data_config.column.registry_short_name]
        unique_indicators.includes(description.id) // [data_config.column.id]
    );
    return { registry_name: registry, number_ind: ind.length, indicators: ind };
  });

  const ind_per_reg = unique_register;
  const tu_structure = nest_tu_names(tu_names);
  const valid_years = Array.from(Array(maxYear - minYear + 1).keys()).map(
    (v) => minYear + v
  );

  return (
    <div className="app-container" style={{ minHeight: "100vh" }}>
      <HEADER />
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
        <MAIN
          ind_per_reg={ind_per_reg}
          treatment_units={tu_name}
          selected_year={validated_selected_year}
          med_field={med_field}
          app_text={app_text}
          colspan={colspan}
          data={{ agg_data, description }}
          selection_bar_height={selection_bar_height}
          legend_height={legend_height}
          update_legend_height={update_legend_height}
        />
      </div>
    </div>
  );
};

export default MainRegister;

//https://github.com/mong/arkitektur/blob/master/fig/Bilde1.gif
//https://github.com/sneas/react-nested-routes-example
