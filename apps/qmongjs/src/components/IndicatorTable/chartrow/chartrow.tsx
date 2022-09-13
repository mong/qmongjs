import { useRef, useState } from "react";

import ChartButtons from "./chartrowbuttons";
import ChartRowDescription from "./chartrowdescription";
import Chart from "./Chart";
import { level_boundary } from "./tr_utils";
import { useQueryParam } from "use-query-params";
import { mainQueryParamsConfig } from "../../../app_config";
import { Description, StatisticData } from "../../RegisterPage";

export interface Props {
  context: { context: string; type: string };
  treatmentYear: number;
  colspan?: number;
  description: Description[];
  indicatorData: StatisticData[];
  figure_class?: string;
  selectedTreatmentUnits: string[];
  update_selected_row(row: string): void;
}

export function ChartRow(props: Props) {
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
  let format = description[0].sformat ?? undefined;
  let max_value = description[0].max_value ?? undefined;

  let delivery_time = new Date(indicatorData[0].delivery_time);

  return (
    <tr className={figure_class}>
      <td colSpan={colspan}>
        <div className="tr_figure">
          <div className="tr_buttons_container">
            <ChartButtons
              svgContainer={svgContainerRef}
              show_level={show_level}
              update_show_level={update_show_level}
              zoom={zoom}
              update_zoom={update_zoom}
              update_selected_row={update_selected_row}
              description={description[0]}
              chartType={chart_type}
              treatmentYear={treatmentYear}
              updateChartType={update_chart_type}
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
            tickformat={format}
            treatmentYear={treatmentYear}
            selectedTreatmentUnits={selectedTreatmentUnits}
            indicatorData={indicatorData}
            max_value={max_value}
          />
          <ChartRowDescription
            description_text={description[0].long_description ?? ""}
            delivery_time={delivery_time}
          />
        </div>
      </td>
    </tr>
  );
}
