import React, { useState, useRef, useEffect, useMemo } from "react";

import MAIN from "./components/main_component";
import HEADER from "./components/header_main";
import SELECT_MULTI from "./components/select_multi";
import SELECT_SINGLE from "./components/select_single";
import TU_LIST from "./components/tu_list";

import config from "./app_config";
import { nest_tu_names } from "./data/filter_year_unit";
import useResizeObserver from "./components/utils";
import { filter_year_unit } from "./data/filter_year_unit";
import { useParams } from "react-router-dom";

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

  //states
  const [treatment_units, update_treatment_units] = useState<string[]>([]);
  const [selected_year, update_selected_year] = useState(2019);
  const [selected_row, update_selected_row] = useState(null);
  const [selection_bar_height, update_selection_bar_height] = useState<
    number | null
  >(null);
  const [legend_height, update_legend_height] = useState(null);

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
  let opts_year = [2019, 2018, 2017, 2016];

  const input_data = {
    selected_unit: treatment_units,
    selected_year: selected_year,
  };

  const hospital = filter_year_unit(sortedIndicatorHospital, input_data);
  const hf = filter_year_unit(sortedIndicatorHf, input_data);
  const rhf = filter_year_unit(sortedIndicatorRhf, input_data);
  const nation = filter_year_unit(sortedIndicatorNation, {
    selected_unit: ["Nasjonalt"],
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
      ...indicator_hosp.filter(
        (d) => d.year === selected_year // [data_config.column.year]
      ),
      ...indicator_nation.filter(
        (d) => d.year === selected_year // [data_config.column.year]
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
  interface skdeParams {
    indicator?: string;
    level?: string;
    year?: string;
    tus?: string;
    graph?: "bar" | "line";
  }
  const params = useParams<skdeParams>();
  //localhost:3000/test//lala:lala:lala/bar
  // {indicator: "test", level: undefined, year: undefined, tus: undefined, module: undefined}

  // { indicator, level, year, tus, graph }
  console.log("parameters:", params); //, indicator, level, year, tus, graph);
  // Tenkte router:
  // / => .
  // /:indicator/:?*level/:=sisteår|year/treatment_unit(s):treatment_unit:treatment_unit
  // => /hjerneslag/*/2018/tromsø:harstad:bergen/linjegraf

  // /:indicator/:?*level<H|M|L>/:=selected_year || opts_year[0]/tu_names.join(':')
  // /tba/:level?/:year?
  //const input_data = {
  //   selected_unit: treatment_units,
  //   selected_year: selected_year,
  // };
  // :indicator?/:level?/:year?/:tus?/:module?

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
          ind_per_reg={ind_per_reg}
          treatment_units={tu_name}
          selected_year={selected_year}
          med_field={med_field}
          app_text={app_text}
          colspan={colspan}
          data={{ agg_data, description }}
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
