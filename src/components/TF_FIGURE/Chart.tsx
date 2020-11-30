import React from "react";
import { StatisticData } from "../../App";
import { GraphData } from "../main_component";
import BarChart, { Bar, BarStyle } from "../BarChart";
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
  selectedTreatmentUnits: string[];
}

function Chart(props: Props) {
  switch (props.chartType) {
    case "line":
      return <LineChart {...props} />;
    case "bar":
      const barChartData: Bar[] = parseBarChartData(props.data)
        .map((d) => {
          const style: BarStyle = {};

          if (d.unit_name === "Nasjonalt") {
            style.color = "#00263D";
          } else {
            style.color = "#7EBEC7";
            if (props.selectedTreatmentUnits.length) {
              style.opacity = props.selectedTreatmentUnits.includes(d.unit_name)
                ? 1
                : 0.5;
            }
          }

          return {
            label: d.unit_name,
            value: d.var,
            style,
          };
        })
        .sort((a, b) => b.value - a.value);
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
