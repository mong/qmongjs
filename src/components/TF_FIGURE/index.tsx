import React, { useRef, useState } from "react";

import TF_BUTTON from "../tf_button";
import TF_DDMENU from "../tf_ddmenu";
import TF_LONG_DESCRIPTION from "../tf_description";
import Chart from "./Chart";
import { level_boundary } from "./tr_utils";
import { useQueryParam } from "use-query-params";
import { mainQueryParamsConfig } from "../../app_config";
import { Description, StatisticData } from "../RegisterPage";

export interface Props {
  context: string;
  treatmentYear: number;
  colspan?: number;
  description: Description[];
  indicatorData: StatisticData[];
  figure_class?: string;
  selectedTreatmentUnits: string[];
  update_selected_row(row: string): void;
}

function TF_FIGURE(props: Props) {
  const {
    context,
    treatmentYear,
    colspan = 3,
    description,
    figure_class,
    update_selected_row,
    selectedTreatmentUnits,
    indicatorData,
  } = props;

  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [chart_type = "line", update_chart_type] = useQueryParam<
    string | undefined
  >("chart_type", mainQueryParamsConfig.chart_type);
  const valid_chart_type = chart_type === "bar" ? "bar" : "line";
  const [zoom, update_zoom] = useState(true);
  const [show_level, update_show_level] = useState(false);

  let levels = level_boundary(description[0]);

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
              description={description[0]}
            />
            <TF_BUTTON
              chart_type={valid_chart_type}
              update_chart_type={update_chart_type}
            />
          </div>
          <Chart
            svgContainerRef={svgContainerRef}
            context={context}
            description={description[0]}
            chartType={valid_chart_type}
            zoom={zoom}
            showLevel={show_level}
            levels={levels}
            treatmentYear={treatmentYear}
            selectedTreatmentUnits={selectedTreatmentUnits}
            indicatorData={indicatorData}
          />
          <TF_LONG_DESCRIPTION
            description_text={description[0].long_description ?? ""}
          />
        </div>
      </td>
    </tr>
  );
}

export default TF_FIGURE;
