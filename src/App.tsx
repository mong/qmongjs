import React, { useState, useRef, useEffect, useMemo } from "react";

import MAIN from "./components/main_component";
import HEADER from "./components/header_main";
import SELECT_MULTI from "./components/select_multi";
import SELECT_SINGLE from "./components/select_single";
import TU_LIST from "./components/tu_list";

import config, {
  mainQueryParamsConfig,
  maxYear,
  minYear,
  defaultYear,
} from "./app_config";
import { nest_tu_names } from "./data/filter_year_unit";
import useResizeObserver from "./components/utils";
import { filter_year_unit } from "./data/filter_year_unit";
import { useQuery } from "react-query";
import { useQueryParam } from "use-query-params";
import mathClamp from "./helpers/functions/mathClamp";

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

interface Data {
  indicator_hosp: StatisticData[];
  indicator_hf: StatisticData[];
  indicator_rhf: StatisticData[];
  indicator_nat: StatisticData[];
  description: Description[];
  tu_names: TreatmentUnit[];
}

const API_HOST = process.env.REACT_APP_API_HOST ?? "http://localhost:4000";

function DataLoader() {
  const { isLoading, error, data } = useQuery<Data, Error>("repoData", () =>
    fetch(`${API_HOST}/legacy`).then((res) => res.json())
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

  return <APP data={dataOrEmpty} isLoading={isLoading} />;
}

interface Props {
  data: Data;
  isLoading: boolean;
}

function validate_treatment_units(
  treatment_units: string[],
  valid_treatment_units: TreatmentUnit[]
) {
  return (
    (treatment_units
      ?.filter((x) =>
        valid_treatment_units.some(
          (tu) => [tu.hospital, tu.hf, tu.rhf].indexOf(x) !== -1
        )
      )
      .slice(0, 5) as string[]) || []
  );
}

function APP({ data, isLoading }: Props) {
  const {
    indicator_hosp,
    indicator_hf,
    indicator_rhf,
    indicator_nat: indicator_nation,
    description,
    tu_names,
  } = data;

  const indicatorSorter = useMemo(() => {
    const descriptionMap: { [key: string]: string } = {};
    for (const d of description) {
      descriptionMap[d.id] = d.name ?? "";
    }
    return (a: StatisticData, b: StatisticData) => {
      const aName = descriptionMap[a.ind_id] ?? "";
      const bName = descriptionMap[b.ind_id] ?? "";

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

  const [treatment_units, update_treatment_units] = useQueryParam(
    "selected_treatment_units",
    mainQueryParamsConfig.selected_treatment_units
  );
  const validated_treatment_units = validate_treatment_units(
    treatment_units as string[],
    tu_names
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
      ...indicator_hosp.filter(
        (d) => d.year === validated_selected_year // [data_config.column.year]
      ),
      ...indicator_nation.filter(
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
  return (
    <div className="app-container">
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
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default DataLoader;
