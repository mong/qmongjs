import React, { useState } from "react";
import { AggData, Description, StatisticData } from "../App";

import INDICATOR_TABLE from "./indicator_table";
import LEGEND from "./legend";
import MED_FIELD from "./med_field";

export interface GraphData {
  agg_data: AggData;
  description: Description[];
}

export interface IndPerReg {
  registry_name: string;
  number_ind: number;
  indicators: Description[];
}

const apply_filters = ({
  tr_unit,
  tr_unit_by_year,
  description,
  show_level_filter,
}: {
  tr_unit: string;
  tr_unit_by_year: StatisticData[];
  description: Description[];
  show_level_filter: string;
}): StatisticData[] => {
  const ind_per_unit = tr_unit_by_year.filter(
    (data) => data.unit_name === tr_unit // [data_config.column.treatment_unit]
  );
  // Fix/investigate: StatisticData does not have a .dg attrib
  const low_cov_filter = ind_per_unit.filter((u) => (u.dg ?? 0) < 0.6);
  const low_n_filter = low_cov_filter.filter(
    (u) =>
      u.denominator >
      (description[description.findIndex((d) => d.id === u.ind_id)]
        .min_denominator ?? 0)
  );
  const level_filter = low_n_filter.filter(
    (u) => u.level === show_level_filter
  );
  return level_filter;
};

const filter_indicators = (
  treatment_unit_name: string[],
  data: GraphData,
  show_level_filter: string | null
): GraphData => {
  if (show_level_filter === null) {
    return data;
  }
  const data_filtered = treatment_unit_name
    .map((tr_unit) =>
      apply_filters({
        tr_unit,
        tr_unit_by_year: data.agg_data.filtered_by_year,
        description: data.description,
        show_level_filter,
      })
    )
    .concat([
      apply_filters({
        tr_unit: "Nasjonalt",
        tr_unit_by_year: data.agg_data.nation.filtered_by_year,
        description: data.description,
        show_level_filter,
      }),
    ])
    .sort((a, b) => b.length - a.length);

  const ind_ids_remaining = data_filtered
    .map((a) => a.map((u) => u.ind_id))
    .flat(1)
    .filter((v, i, a) => a.indexOf(v) === i);
  return {
    agg_data: {
      filtered_by_year: data.agg_data.filtered_by_year.filter((u) =>
        ind_ids_remaining.includes(u.ind_id)
      ),
      filtered_by_unit: data.agg_data.filtered_by_unit.filter((u) =>
        ind_ids_remaining.includes(u.ind_id)
      ),
      nation: {
        filtered_by_year: data.agg_data.nation.filtered_by_year.filter((u) =>
          ind_ids_remaining.includes(u.ind_id)
        ),
        filtered_by_unit: data.agg_data.nation.filtered_by_unit.filter((u) =>
          ind_ids_remaining.includes(u.ind_id)
        ),
      },
    },
    description: data.description.filter((d) =>
      ind_ids_remaining.includes(d.id)
    ),
  };
};

interface Props {
  data: GraphData;
  med_field: any;
  app_text: any;
  ind_per_reg: IndPerReg[];
  treatment_units: string[];
  selected_year: number;
  colspan: number;
  selected_row: any;
  update_selected_row(row: any): void;
  selection_bar_height: number | null;
  legend_height: any;
  update_legend_height(height: any): void;
}
const Main = (props: Props) => {
  const {
    data,
    med_field,
    app_text,
    ind_per_reg,
    treatment_units,
    selected_year,
    colspan,
    selected_row,
    update_selected_row,
    selection_bar_height,
    legend_height,
    update_legend_height,
  } = props;
  const all_reg = ind_per_reg.map((reg) => reg.registry_name);
  const [show_level_filter, update_show_level_filter] = useState(null);
  const [med_field_filter, update_med_field_filter] = useState(all_reg);
  const [clicked_med_field, update_clicked_med_field] = useState("all");
  const filtered_data = filter_indicators(
    treatment_units,
    data,
    show_level_filter
  );
  return (
    <>
      <LEGEND
        app_text={app_text}
        update_show_level_filter={update_show_level_filter}
        show_level_filter={show_level_filter}
        selected_row={selected_row}
        update_selected_row={update_selected_row}
        selection_bar_height={selection_bar_height}
        update_legend_height={update_legend_height}
      />
      <div className="content_container">
        <div className="med_field_container">
          <MED_FIELD
            ind_per_reg={ind_per_reg}
            med_field={med_field}
            update_med_field_filter={update_med_field_filter}
            clicked_med_field={clicked_med_field}
            update_clicked_med_field={update_clicked_med_field}
            selected_row={selected_row}
            update_selected_row={update_selected_row}
            selection_bar_height={selection_bar_height}
            legend_height={legend_height}
          />
        </div>
        <div className="main_table_container">
          <INDICATOR_TABLE
            data={filtered_data}
            treatment_unit_name={treatment_units}
            treatment_year={selected_year}
            ind_per_reg={ind_per_reg}
            colspan={colspan}
            med_field_filter={med_field_filter}
            show_level_filter={show_level_filter}
            selected_row={selected_row}
            update_selected_row={update_selected_row}
            selection_bar_height={selection_bar_height}
            legend_height={legend_height}
          />
        </div>
      </div>
    </>
  );
};

export default Main;
