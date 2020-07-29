import { add_tr_indicator_description } from './tr_indicator_description'
import { add_tr_figure } from './tr_figures.js'
import { 
  add_figure_buttons,
  button_object
} from './tr_button.js'

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
    elem.treatment_unit = elem.SykehusNavn;
    return (
      elem.KvalIndID === clicked_indicator &&
      selected_treatment_units.includes(elem.SykehusNavn) &&
      elem.count > 5
    );
  });
  figure_data.push(
    indicator_hf.filter((elem) => {
      elem.treatment_unit = elem.Hfkortnavn
      return (
        elem.KvalIndID === clicked_indicator &&
        selected_treatment_units.includes(elem.Hfkortnavn) &&
        elem.count > 5
      );
    })
  );
  figure_data.push(
    indicator_rhf.filter((elem) => {
      elem.treatment_unit = elem.RHF
      return (
        elem.KvalIndID === clicked_indicator &&
        selected_treatment_units.includes(elem.RHF) &&
        elem.count > 5
      );
    })
  );
  figure_data.push(
    indicator_nat.filter((elem) => {
      elem.treatment_unit = 'Nasjonalt'
      return elem.KvalIndID === clicked_indicator
    })
  );
  figure_data = figure_data.flat();
  // add tr into the table
  const new_row_index = clicked_tr.rowIndex + 1;
  const added_row = clicked_tr.parentElement.parentElement.insertRow(
    new_row_index
  );
  added_row.className = 'tr_figure';
  const added_td = added_row.appendChild(document.createElement('td'));
  added_td.setAttribute('colspan', clicked_tr.childElementCount);
  //add button
  const tr_figure_button = add_figure_buttons('tr_figure_button', button_object);
  added_td.appendChild(tr_figure_button );
  //add figure
  add_tr_figure(added_td, figure_data, selected_year);
  let clicked_ind_description = description.filter((d) => d.IndID === clicked_indicator)[0];
  const tr_description = add_tr_indicator_description(clicked_ind_description);
  // add indicator disctiption
  added_td.appendChild(tr_description);
}