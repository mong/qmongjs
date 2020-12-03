import React from "react";
import { StatisticData } from "../../App";
import { GraphData } from "../main_component";
import BarChart, { Bar, BarStyle } from "../BarChart";
import LineChart, { DataPoint } from "../LineChart";

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
      const lineChartData = getLineChartData(props.data);
      return <LineChart {...props} data={lineChartData} />;
    case "bar":
      const barChartData: Bar[] = getBarChartData(props);
      return <BarChart {...props} data={barChartData} />;
  }
}

export default Chart;

const getBarChartData = (props: Props): Bar[] =>
  parseBarChartData(props.data)
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

function parseBarChartData(data: GraphData) {
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

const getLineChartData = (data: GraphData): DataPoint[] =>
  parseLineChartData(data).map((d) => ({
    label: d.unit_name,
    year: d.year,
    value: d.var,
  }));

function parseLineChartData(data: GraphData): StatisticData[] {
  return data.agg_data.filtered_by_unit.filter(
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
