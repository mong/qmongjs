import React from "react";

import INDICATOR_ROW from "./indicator_row";
import REGISTER_NAME from "./register_name";
import { AggData, Description } from "../components/RegisterPage";
// import { GraphData } from "./main_component";

interface RegisterData {
  agg_data: AggData;
  description: Description[];
}
export interface RegisterProps {
  data: RegisterData;
  register_sname: string;
  treatment_year: number;
  treatment_unit_name: string[];
  tr_register_name_class?: string;
  med_field_filter: string[];
  show_level_filter: string;
  colspan?: number;
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
  } = props;
  const med_field_class = med_field_filter.includes(register_sname)
    ? ""
    : "filter_med_field";
  const register_name = Array.from(
    new Set(data.description.map((d) => d.full_name))
  );
  const ind_id: string[] = Array.from(
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
      all_filtered_by_year: [],
    };
    agg_data.filtered_by_year = data.agg_data.filtered_by_year.filter(
      (d) => d.ind_id === indicator
    );
    agg_data.filtered_by_unit = data.agg_data.filtered_by_unit.filter(
      (d) => d.ind_id === indicator
    );
    agg_data.nation.filtered_by_year =
      data.agg_data.nation.filtered_by_year.filter(
        (d) => d.ind_id === indicator
      );
    agg_data.all_filtered_by_year = data.agg_data.all_filtered_by_year.filter(
      (d) => d.ind_id === indicator
    );
    agg_data.nation.filtered_by_unit =
      data.agg_data.nation.filtered_by_unit.filter(
        (d) => d.ind_id === indicator
      );
    const description = data.description.filter((d) => d.id === indicator);

    return (
      <INDICATOR_ROW
        data={{ agg_data, description }}
        key={indicator}
        treatment_unit_name={treatment_unit_name}
        med_field_class={med_field_class}
        show_level_filter={show_level_filter}
        colspan={colspan}
      />
    );
  });
  return (
    <>
      <REGISTER_NAME
        register_name={register_name[0]}
        colspan={colspan}
        tr_register_name_class={`${tr_register_name_class} ${register_sname} ${med_field_class}`}
      />
      {IndicatorRow}
    </>
  );
};

export default Register;
