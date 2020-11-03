import React from 'react';

import TABLE_HEADER from './indicator_table_header'
import TABLE_BODY from './indicator_table_body'

function INDICATOR_TABLE(props) {
  const {
    treatment_unit_name = [],
    treatment_year = 2019,
    data,
    colspan,
    med_field_filter, 
    show_level_filter,
    selected_row, 
    update_selected_row,
    selection_bar_height, 
    legend_height
  } = props

  return (
    <table>
      <TABLE_HEADER
        col_nr = {colspan}
        treatment_unit_name = {treatment_unit_name}
        selection_bar_height = {selection_bar_height} 
        legend_height = {legend_height}
        />
      <TABLE_BODY 
        colspan = {colspan}
        data = {data}
        treatment_unit_name = {treatment_unit_name} 
        treatment_year = {treatment_year}
        med_field_filter = {med_field_filter}
        show_level_filter = {show_level_filter}
        selected_row = {selected_row} 
        update_selected_row = {update_selected_row}
      />
    </table>
  );
}

export default INDICATOR_TABLE;
