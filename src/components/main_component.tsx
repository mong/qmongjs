import React, { useState } from "react";
import { useQueryParam } from "use-query-params";
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
  agg_data,
  description,
  show_level_filter,
  filter_level_only = false,
}: {
  agg_data: StatisticData[];
  description: Description[];
  show_level_filter: string;
  filter_level_only?: boolean;
}): StatisticData[] => {
  const filtered_by_threshold =
    filter_level_only ?? false
      ? agg_data
      : agg_data
          .filter((u) => {
            return (u.dg ?? 0) > 0.6;
          })
          .filter((u) => {
            return (
              u.denominator >
              (description[description.findIndex((d) => d.id === u.ind_id)]
                .min_denominator ?? 0)
            );
          });
  const filter_by_level = filtered_by_threshold.filter(
    (u) => u.level === show_level_filter
  );
  return filter_by_level;
};

const filter_data = (
  data: GraphData,
  show_level_filter: string | undefined
): GraphData => {
  if (!show_level_filter) {
    return data;
  }

  const data_filtered = [
    apply_filters({
      agg_data: data.agg_data.filtered_by_year,
      description: data.description,
      show_level_filter,
    }),
    apply_filters({
      agg_data: data.agg_data.nation.filtered_by_year,
      description: data.description,
      show_level_filter,
      filter_level_only: true,
    }),
  ].sort((a, b) => b.length - a.length);

  const ind_ids_remaining = data_filtered
    .map((a) => Array.isArray(a) && a.map((u) => u.ind_id))
    .reduce((acc: string[], val) => acc.concat(val || []), [])
    .filter((v, i, a) => a.indexOf(v) === i);

  return {
    agg_data: {
      filtered_by_year: data.agg_data.filtered_by_year.filter((u) =>
        ind_ids_remaining.includes(u.ind_id)
      ),
      filtered_by_unit: data.agg_data.filtered_by_unit.filter((u) =>
        ind_ids_remaining.includes(u.ind_id)
      ),
      all_filtered_by_year: data.agg_data.all_filtered_by_year.filter((u) =>
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

export interface Props {
  data: GraphData;
  med_field: any;
  app_text: any;
  ind_per_reg: IndPerReg[];
  treatment_units: string[];
  selected_year: number;
  colspan: number;
  selected_row: string | null;
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
  const [level_query_param] = useQueryParam<string | undefined>("level");
  const [show_level_filter, update_show_level_filter] = useState(
    level_query_param
  );
  const [med_field_filter, update_med_field_filter] = useState(all_reg);
  const [
    indicator_query_param,
    update_indicator_query_param,
  ] = useQueryParam<string>("indicator");
  const filtered_data = filter_data(data, show_level_filter);
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
            clicked_med_field={indicator_query_param}
            update_clicked_med_field={update_indicator_query_param}
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
