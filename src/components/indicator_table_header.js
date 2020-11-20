import React from "react";

function TABLE_HEADER(props) {
  const {
    col_nr = 2,
    indicator_header = "Kvalitetsindikator",
    treatment_unit_name = [],
    national = "Nasjonalt",
    selection_bar_height,
    legend_height,
  } = props;

  const offset_top = `${selection_bar_height + legend_height}px`;
  const width_desc = col_nr === 2 ? 60 : col_nr === 3 ? 50 : 40;
  const width_tu = (100 - width_desc) / (col_nr - 1);
  const style_ind_desc = { width: `${width_desc}%`, top: offset_top };
  const style_treatment_units = { width: `${width_tu}%`, top: offset_top };

  let treatment_unit_th = treatment_unit_name.map((tu) => (
    <th className="selected_unit" style={style_treatment_units} key={tu}>
      {tu}
    </th>
  ));

  return (
    <thead>
      <tr>
        <th
          key="kvind_header"
          className="quality_indicator"
          style={style_ind_desc}
        >
          {indicator_header}
        </th>
        {treatment_unit_th}
        <th
          className="nationally"
          style={style_treatment_units}
          key="nat_header"
        >
          {national}
        </th>
      </tr>
    </thead>
  );
}

export default TABLE_HEADER;
