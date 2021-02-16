import React, { useRef, useState } from "react";

import TF_BUTTON from "../tf_button";
import TF_DDMENU from "../tf_ddmenu";
import TF_LONG_DESCRIPTION from "../tf_description";
import { GraphData } from "../main_component";
import Chart from "./Chart";
import { level_boundary } from "./tr_utils";
import { useQueryParam } from "use-query-params";
import { mainQueryParamsConfig } from "../../app_config";

export interface Props {
  colspan?: number;
  data: GraphData;
  figure_class?: string;
  selectedTreatmentUnits: string[];
  update_selected_row(row: string): void;
}

function TF_FIGURE(props: Props) {
  const {
    colspan = 3,
    data,
    figure_class,
    update_selected_row,
    selectedTreatmentUnits,
  } = props;

  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [chart_type = "line", update_chart_type] = useQueryParam<
    string | undefined
  >("chart_type", mainQueryParamsConfig.chart_type);
  const valid_chart_type = chart_type === "bar" ? "bar" : "line";
  const [zoom, update_zoom] = useState(true);
  const [show_level, update_show_level] = useState(false);

  if (
    !data.agg_data.filtered_by_year.some((d) => d.unit_name === "Nasjonalt")
  ) {
    data.agg_data.filtered_by_year.push(
      data.agg_data.nation.filtered_by_year[0]
    );
    Array.prototype.push.apply(
      data.agg_data.filtered_by_unit,
      data.agg_data.nation.filtered_by_unit
    );
  }

  let levels = level_boundary(data.description[0]);

  return (
    <tr className={figure_class}>
      <td colSpan={colspan}>
        <div className="tr_figure">
          <div className="tr_buttons_container">
            <TF_DDMENU
              svgContainer={svgContainerRef}
              show_level={show_level}
              update_show_level={update_show_level}
              zoom={zoom}
              update_zoom={update_zoom}
              update_selected_row={update_selected_row}
              description={data.description[0]}
            />
            <TF_BUTTON
              chart_type={valid_chart_type}
              update_chart_type={update_chart_type}
            />
          </div>
          <Chart
            svgContainerRef={svgContainerRef}
            data={data}
            chartType={valid_chart_type}
            zoom={zoom}
            showLevel={show_level}
            levels={levels}
            selectedTreatmentUnits={selectedTreatmentUnits}
          />
          <TF_LONG_DESCRIPTION
            description_text={data.description[0].long_description ?? ""}
          />
        </div>
      </td>
    </tr>
  );
}

export default TF_FIGURE;
