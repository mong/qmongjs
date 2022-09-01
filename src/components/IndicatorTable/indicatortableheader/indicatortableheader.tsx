import React from "react";

export interface IndicatorTableHeaderProps {
  colspan: number;
  descriptionHeader?: string;
  unitNames: string[];
  national?: string;
  selection_bar_height: number | null;
  legend_height: number;
}

export const IndicatorTableHeader: React.FC<IndicatorTableHeaderProps> = (
  props
) => {
  const {
    colspan = 2,
    descriptionHeader = "Kvalitetsindikator",
    unitNames = [],
    selection_bar_height,
    legend_height,
  } = props;

  const offset_top = `${(selection_bar_height ?? 0) + legend_height}px`;
  const width_desc = colspan === 2 ? 60 : colspan === 3 ? 50 : 40;
  const width_tu = (100 - width_desc) / (colspan - 1);
  const style_ind_desc = { width: `${width_desc}%`, top: offset_top };
  const style_treatment_units = { width: `${width_tu}%`, top: offset_top };

  let treatment_unit_th = unitNames.map((tu) => (
    <th
      className={tu !== "nasjonalt" ? "selected_unit" : "nationally "}
      style={style_treatment_units}
      key={tu}
    >
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
          {descriptionHeader}
        </th>
        {treatment_unit_th}
      </tr>
    </thead>
  );
};

export default IndicatorTableHeader;
