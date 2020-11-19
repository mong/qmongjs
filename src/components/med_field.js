import React from "react";

import MED_FIELD_ROW from "./med_field_row";

function MED_FIELD(props) {
  const {
    med_field = [],
    ind_per_reg,
    update_med_field_filter,
    clicked_med_field,
    update_clicked_med_field,
    selection_bar_height,
    legend_height,
  } = props;

  const all_reg = ind_per_reg.map((ind) => ind.registry_name);
  const med_field_row = med_field.map((med_field) => {
    const nr_ind = ind_per_reg
      .filter((reg) => med_field.key.includes(reg.registry_name))
      .reduce((acc, cur) => {
        return acc + cur.number_ind;
      }, 0);

    return (
      <MED_FIELD_ROW
        key={med_field.react_key}
        med_field_name={med_field}
        nr_indicators={nr_ind}
        update_med_field_filter={update_med_field_filter}
        clicked_med_field={clicked_med_field}
        update_clicked_med_field={update_clicked_med_field}
      />
    );
  });

  const tot_nr_ind = ind_per_reg.reduce((acc, cur) => {
    return acc + cur.number_ind;
  }, 0);

  const checked_class = "all" === clicked_med_field ? "checked" : "";
  const handle_med_field_click = () => {
    update_clicked_med_field("all");
    update_med_field_filter(all_reg);
  };

  const style = { top: `${legend_height + selection_bar_height}px` };
  return (
    <ul style={style} className="med_field_list">
      <li className={`med_field_title ${checked_class}`}>
        <button onClick={() => handle_med_field_click()}>
          <h4 className="med_field_text">
            ALLE INDIKATORER
            <div className="med_field_nrind">{tot_nr_ind}</div>
          </h4>
        </button>
      </li>
      {med_field_row}
    </ul>
  );
}

export default MED_FIELD;
