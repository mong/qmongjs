import { add_tr_indicator_description } from './tr_indicator_description'
import {dropdown_menu } from './tr_dd_menu.js'
import { add_tr_figure } from './tr_figures.js'
import { add_figure_buttons, button_object } from './tr_button.js'
import { level_boundary } from './tr_utils'
import { app_config as config } from './app_config.js'

// add a row beneath the clicked tr
export const add_row = function (clicked_tr) {
  // filter data based on selection
  const clicked_indicator = clicked_tr.id;
  let selected_treatment_units_element = document
    .getElementById('quality_overview_ui_1-pick_treatment_units')
    .getElementsByTagName('option');
  let selected_treatment_units = Array.from(
    selected_treatment_units_element
  ).map((elem) => elem.value);
  let selected_year_element = document
    .getElementById('quality_overview_ui_1-pick_year')
    .getElementsByTagName('option');
  let selected_year = Array.from(selected_year_element).map((elem) =>
    Number(elem.value)
  );
  let figure_data = indicator_hosp.filter((elem) => {
    return (
      elem[config.column.indicator_id] === clicked_indicator &&
      selected_treatment_units.includes(elem[config.column.treatment_unit]) &&
      elem[config.column.denominator] > 5
    );
  });
  figure_data.push(
    indicator_hf.filter((elem) => {
      return (
        elem[config.column.indicator_id] === clicked_indicator &&
        selected_treatment_units.includes(elem[config.column.treatment_unit]) &&
        elem[config.column.denominator]  > 5
      );
    })
  );
  figure_data.push(
    indicator_rhf.filter((elem) => {
      return (
        elem[config.column.indicator_id] === clicked_indicator &&
        selected_treatment_units.includes(elem[config.column.treatment_unit]) &&
        elem[config.column.denominator]  > 5
      );
    })
  );
  figure_data.push(
    indicator_nat.filter((elem) => {
      return elem[config.column.indicator_id]  === clicked_indicator
    })
  );
  figure_data = figure_data.flat();

  let clicked_ind_description = description.filter((d) => d[config.column.id] === clicked_indicator)[0];
  const levels = [{level: 'high'},{level: 'mid'}, {level: 'low'}]
  levels.forEach(level_boundary, clicked_ind_description)
  // add tr into the table
  const new_row_index = clicked_tr.rowIndex + 1;
  const added_row = clicked_tr.parentElement.parentElement.insertRow(
    new_row_index
  );
  
  added_row.className = 'tr_figure';
  const added_td = added_row.appendChild(document.createElement('td'));
  added_td.setAttribute('colspan', clicked_tr.childElementCount);
  //add button
  const td_buttons_container = document.createElement("div")
  td_buttons_container.setAttribute("class", "tr_buttons_container") 
  const tr_dropdown_menu = dropdown_menu()
  td_buttons_container.appendChild(tr_dropdown_menu);
  const tr_figure_button = add_figure_buttons('tr_figure_button', button_object);
  td_buttons_container.appendChild(tr_figure_button );
  added_td.appendChild(td_buttons_container)
  //add figure
  add_tr_figure(added_td, figure_data, selected_year, levels);
  
  const tr_description = add_tr_indicator_description(clicked_ind_description);
  // add indicator disctiption
  added_td.appendChild(tr_description);

}