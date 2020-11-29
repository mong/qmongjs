import React from "react";
import { StatisticData } from "../../App";
import { GraphData } from "../main_component";
import BarChart, { DataPoint } from "../BarChart";
import { LineChart } from "./LineChart";

export interface Level {
  level: string;
  start: number;
  end: number;
}

export interface Props {
  data: GraphData;
  chartType: "bar" | "line";
  zoom: boolean;
  showLevel: boolean;
  levels: Level[];
}

function Chart(props: Props) {
  switch (props.chartType) {
    case "line":
      return <LineChart {...props} />;
    case "bar":
      const barChartData: DataPoint[] = parseBarChartData(props.data).map(
        (d) => ({
          label: d.unit_name,
          value: d.var,
        })
      );
      return (
        <BarChart
          {...props}
          displayLevels={props.showLevel}
          data={barChartData}
        />
      );
  }
}

export default Chart;

export function parseBarChartData(data: GraphData) {
  return data.agg_data.all_filtered_by_year.filter(
    (data_by_year: StatisticData) => {
      if (data_by_year.unit_level !== "nation") {
        return !(
          data_by_year.denominator <
            (data.description[0]["min_denominator"] ?? 0) ||
          (data_by_year.dg ?? 0) < 0.6
        ); //|| typeof(data_by_year.dg) === "undefined" )
      } else {
        return true;
      }
    }
  );
}
