import React from "react";

import Register, { RegisterProps } from "./register";

import { med_field } from "../app_config";
import { filter_register } from "../data/filter_year_unit";

function TABLE_BODY(props: RegisterProps) {
  const {
    colspan = 4,
    data,
    treatment_unit_name,
    treatment_year,
    med_field_filter,
    show_level_filter,
    selected_row,
    update_selected_row,
  } = props;

  //if no valid treatment unit loop through the national
  if (treatment_unit_name.length < 1) {
    data.agg_data.filtered_by_year = data.agg_data.nation.filtered_by_year;
    data.agg_data.filtered_by_unit = data.agg_data.nation.filtered_by_unit;
  }
  //loop registry for registry following the seq laid out by the med field list
  const table_body = med_field.map(function (field) {
    const done: string[] = [];
    let register_block = field.key.map((register) => {
      if (!done.includes(register)) {
        done.push(register);
        const register_data = filter_register(data, register);

        if (register_data.agg_data.filtered_by_year.length > 0) {
          return (
            <Register
              key={`${register}`}
              register_sname={register}
              data={register_data}
              colspan={colspan}
              treatment_unit_name={treatment_unit_name}
              treatment_year={treatment_year}
              med_field_filter={med_field_filter}
              show_level_filter={show_level_filter}
              selected_row={selected_row}
              update_selected_row={update_selected_row}
            />
          );
        }
      }
      return null;
    });
    return register_block;
  });

  return <tbody>{table_body}</tbody>;
}

export default TABLE_BODY;
