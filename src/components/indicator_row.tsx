import React from "react";

import INDICATOR_VALUE from "./indicator_value";
import INDICATOR_DESCRIPTION from "./indicator_description";
import TF_FIGURE from "./TF_FIGURE";

import NO_DATA from "./no_data";
import LOW_COV from "./low_cov";
import LOW_N from "./low_n";
import { Description } from "../App";
import { GraphData } from "./main_component";
import { useQueryParam } from "use-query-params";
import { mainQueryParamsConfig } from "../app_config";

export const format_indicator_values = (
  treatment_unit_name: string[],
  data: GraphData,
  ind_id: string,
  description: Description,
  show_level_filter: string
) => {
  if (treatment_unit_name.length === 0) return null;
  return treatment_unit_name.map((tr_unit, index) => {
    const ind_per_unit = data.agg_data.filtered_by_year.filter(
      (data) => data.unit_name === tr_unit // [data_config.column.treatment_unit]
    );
    if (ind_per_unit.length < 1) {
      return (
        <td key={`${ind_id}_${tr_unit}_${index}_su`} className="selected_unit">
          <NO_DATA />
        </td>
      );
    } else if ((ind_per_unit[0].dg ?? 1) < 0.6) {
      // [data_config.column.coverage_id as keyof StatisticData]
      //|| typeof(ind_per_unit[0][data_config.column.coverage_id]) === "undefined") {
      return (
        <td key={`${ind_id}_${tr_unit}_${index}_su`} className="selected_unit">
          <LOW_COV />
        </td>
      );
    } else if (
      ind_per_unit[0].denominator < (description.min_denominator ?? 0) //[data_config.column.denominator as keyof StatisticData] [data_config.column.min_denominator as keyof Description]
    ) {
      return (
        <td key={`${ind_id}_${tr_unit}_${index}_su`} className="selected_unit">
          <LOW_N />
        </td>
      );
    } else {
      const ind_type = description.type; // [data_config.column.indicator_type as keyof Description];
      const level_class =
        ind_per_unit[0].level !== show_level_filter && // [data_config.column.achieved_level as keyof StatisticData]
        !!show_level_filter
          ? "filtered_level"
          : "";
      return (
        <INDICATOR_VALUE
          key={`${ind_id}_${tr_unit}_${index}_su`}
          ind_type={ind_type}
          data={ind_per_unit[0]}
          td_class={`selected_unit ${level_class}`}
          filtered={!!level_class}
        />
      );
    }
  });
};

interface Props {
  data: GraphData;
  treatment_unit_name?: string[];
  med_field_class?: string;
  show_level_filter?: string;
  colspan?: number;
}

function INDICATOR_ROW(props: Props) {
  const {
    data,
    treatment_unit_name = [],
    med_field_class = "",
    show_level_filter = "",
    colspan,
  } = props;

  const [selected_row, update_selected_row] = useQueryParam(
    "selected_row",
    mainQueryParamsConfig.selected_row
  );
  const description = data.description[0];
  const ind_id = description.id; // [data_config.column.id as keyof Description];
  const tr_indicator_class = `${ind_id}  ${
    description.rname // [data_config.column.registry_short_name as keyof Description]
  }`;
  const indicator_val = format_indicator_values(
    treatment_unit_name,
    data,
    ind_id,
    description,
    show_level_filter
  );

  const level_class =
    data.agg_data.nation.filtered_by_year[0].level !== show_level_filter &&
    !!show_level_filter
      ? "filtered_level"
      : "";
  const tr_fig =
    selected_row === ind_id ? (
      <TF_FIGURE
        colspan={colspan}
        data={data}
        figure_class={med_field_class}
        selectedTreatmentUnits={treatment_unit_name}
        update_selected_row={update_selected_row}
      />
    ) : null;

  const tr_click_handler = () => {
    update_selected_row(selected_row === ind_id ? undefined : ind_id);
  };

  return (
    <>
      <tr
        onClick={() => tr_click_handler()}
        id={`${tr_indicator_class}`}
        className={`${tr_indicator_class} ${med_field_class} indicator`}
      >
        <INDICATOR_DESCRIPTION description={description} />
        {indicator_val}
        <INDICATOR_VALUE
          data={data.agg_data.nation.filtered_by_year[0]}
          td_class={`nationally ${level_class}`}
        />
      </tr>
      {tr_fig}
    </>
  );
}

export default INDICATOR_ROW;
