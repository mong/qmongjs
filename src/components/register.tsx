import React from "react";

import INDICATOR_ROW from "./indicator_row";
import REGISTER_NAME from "./register_name";
import { data_config } from "../app_config";
import { AggData, Description } from "../App";

interface RegisterData {
  agg_data: AggData;
  description: Description[];
}
interface RegisterProps {
  register_sname: string;
  colspan?: number;
  tr_register_name_class?: string;
  data: RegisterData;
  treatment_unit_name: string;
  med_field_filter: string[];
  show_level_filter: string;
  selected_row?: any;
  update_selected_row: string;
}

const Register = (props: RegisterProps) => {
  const {
    register_sname = "hjerte",
    colspan = 4,
    tr_register_name_class = "register-row",
    data,
    treatment_unit_name,
    med_field_filter,
    show_level_filter,
    selected_row,
    update_selected_row,
  } = props;

  console.table(props);
  const med_field_class = med_field_filter.includes(register_sname)
    ? ""
    : "filter_med_field";
  const register_name = Array.of(
    new Set(data.description.map((d) => d.full_name))
  );
  const ind_id = Array.of(
    new Set(data.agg_data.filtered_by_year.map((d) => d.ind_id))
  );

  const IndicatorRow = ind_id.map((indicator) => {
    let agg_data: AggData = {
      nation: {
        filtered_by_unit: [],
        filtered_by_year: [],
      },
      filtered_by_unit: [],
      filtered_by_year: [],
    };
    const nation = {};
    agg_data.filtered_by_year = data.agg_data.filtered_by_year.filter(
      (d) => d.ind_id === indicator
    );
    agg_data.filtered_by_unit = data.agg_data.filtered_by_unit.filter(
      (d) => d[data_config.column.indicator_id] === indicator
    );
    nation.filtered_by_year = data.agg_data.nation.filtered_by_year.filter(
      (d) => d[data_config.column.indicator_id] === indicator
    );
    const description = data.description.filter(
      (d) => d[data_config.column.id] === indicator
    );
    nation.filtered_by_unit = data.agg_data.nation.filtered_by_unit.filter(
      (d) => d[data_config.column.indicator_id] === indicator
    );
    agg_data.nation = nation;
    return (
      <INDICATOR_ROW
        data={{ agg_data, description }}
        key={indicator}
        treatment_unit_name={treatment_unit_name}
        med_field_class={med_field_class}
        show_level_filter={show_level_filter}
        colspan={colspan}
        selected_row={selected_row}
        update_selected_row={update_selected_row}
      />
    );
  });
  console.log(IndicatorRow);
  return (
    <>
      <REGISTER_NAME
        register_name={register_name}
        colspan={colspan}
        tr_register_name_class={`${tr_register_name_class} ${register_sname} ${med_field_class}`}
      />
      {IndicatorRow}
    </>
  );
};

export default Register;
