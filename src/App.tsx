import React, { useState, useRef, useEffect } from "react";

import MAIN from "./components/main_component";
import HEADER from "./components/header_main";
import SELECT_MULTI from "./components/select_multi";
import SELECT_SINGLE from "./components/select_single";
import TU_LIST from "./components/tu_list";

import config from "./app_config";
import { nest_tu_names } from "./data/filter_year_unit";
import useResizeObserver from "./components/utils";
import { filter_year_unit } from "./data/filter_year_unit";

const { med_field, app_text } = config;

export interface StatisticData {
  ind_id: string;
  unit_level: string;
  unit_name: string;
  orgnr: number;
  year: number;
  denominator: number;
  var: number;
  level: string;
  level_direction: number;
  dg: number;
  include: number;
}

export interface Description {
  id: string;
  dg_id: string;
  include: number;
  title: string;
  name: string;
  type: string;
  min_denominator: number;
  level_green: number;
  level_yellow: number;
  level_direction: number;
  short_description: string;
  long_description: string;
  registry_id: number;
  rname: string;
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
}

function APP() {
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

  //update data as it arrives
  if (typeof (window as any).Shiny !== "undefined") {
    (window as any).Shiny.addCustomMessageHandler("tu_names", function (
      message: any
    ) {
      update_tu_names(message);
    });
    (window as any).Shiny.addCustomMessageHandler("description", function (
      message: any
    ) {
      update_description(message);
    });
    (window as any).Shiny.addCustomMessageHandler("nation", function (
      message: any
    ) {
      update_nation(message);
    });
    (window as any).Shiny.addCustomMessageHandler("hospital", function (
      message: any
    ) {
      update_hosp(message);
    });
    (window as any).Shiny.addCustomMessageHandler("hf", function (
      message: any
    ) {
      update_hf(message);
    });
    (window as any).Shiny.addCustomMessageHandler("rhf", function (
      message: any
    ) {
      update_rhf(message);
    });
  }

  //states
  const [treatment_units, update_treatment_units] = useState<string[]>([]);
  const [selected_year, update_selected_year] = useState(2019);
  const [selected_row, update_selected_row] = useState(null);
  const [selection_bar_height, update_selection_bar_height] = useState<
    number | null
  >(null);
  const [legend_height, update_legend_height] = useState(null);

  const opts_hosp = Array.from(new Set(indicator_hosp.map((d) => d.unit_name)))
    .sort()
    .map((opt) => ({ value: opt, label: opt }));
  const opts_hf = Array.from(new Set(indicator_hf.map((d) => d.unit_name)))
    .sort()
    .map((opt) => ({ value: opt, label: opt }));
  const opts_rhf = Array.from(new Set(indicator_rhf.map((d) => d.unit_name)))
    .sort()
    .map((opt) => ({ value: opt, label: opt }));
  const opts_tu = [
    { label: "Sykehus", options: opts_hosp },
    { label: "HF", options: opts_hf },
    { label: "RHF", options: opts_rhf },
  ];
  let opts_year = [2019, 2018, 2017, 2016];

  const input_data = {
    selected_unit: treatment_units,
    selected_year: selected_year,
  };

  const hospital = filter_year_unit(indicator_hosp, input_data);
  const hf = filter_year_unit(indicator_hf, input_data);
  const rhf = filter_year_unit(indicator_rhf, input_data);
  const nation = filter_year_unit(indicator_nation, {
    selected_unit: "Nasjonalt",
    selected_year: selected_year,
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
    filtered_by_unit: hospital.filtered_by_unit.concat(
      hf.filtered_by_unit,
      rhf.filtered_by_unit
    ),
    filtered_by_year: hospital.filtered_by_year.concat(
      hf.filtered_by_year,
      rhf.filtered_by_year
    ),
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

  //height of the selection bar
  const selection_bar_ref = useRef<HTMLDivElement | null>(null);
  const selection_bar_dim = useResizeObserver(selection_bar_ref);
  useEffect(() => {
    if (!selection_bar_dim) {
      return;
    }
    const top = (selection_bar_dim.target as HTMLElement).offsetHeight ?? "";
    update_selection_bar_height(top);
  }, [selection_bar_dim, selection_bar_ref]);

  return (
    <div className="app-container">
      <HEADER />
      <div className="app-body">
        <div className="selection-container" ref={selection_bar_ref}>
          <div className="treatment-unit-selection">
            <SELECT_MULTI
              opts={opts_tu}
              update_tu={update_treatment_units}
              treatment_unit={treatment_units}
            />
            <TU_LIST
              tu_structure={tu_structure}
              treatment_units={treatment_units}
              update_treatment_units={update_treatment_units}
            />
          </div>
          <div className="year-selection">
            <SELECT_SINGLE
              opts={opts_year}
              update_year={update_selected_year}
              selected_row={selected_row}
              update_selected_row={update_selected_row}
            />
          </div>
        </div>
        <MAIN
          update_selected_year={update_selected_year}
          update_treatment_units={update_treatment_units}
          ind_per_reg={ind_per_reg}
          treatment_units={tu_name}
          selected_year={selected_year}
          med_field={med_field}
          app_text={app_text}
          colspan={colspan}
          data={{ agg_data, description }}
          unique_indicators={unique_indicators}
          selected_row={selected_row}
          update_selected_row={update_selected_row}
          selection_bar_height={selection_bar_height}
          legend_height={legend_height}
          update_legend_height={update_legend_height}
        />
      </div>
    </div>
  );
}

export default APP;
