import React, { useEffect, useRef } from "react";
import { select } from "d3";
import { bar_chart } from "../../charts/barchart";
import { line_chart } from "../../charts/line_chart";
import { level_boundary } from "./tr_utils";
import { StatisticData } from "../../App";
import { GraphData } from "../main_component";

export interface Props {
  data: GraphData;
  chartType: "bar" | "line";
  zoom: string;
  showLevel: boolean;
}

function Chart(props: Props) {
  const { data, chartType, zoom, showLevel } = props;
  const svg_container_ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svg_container_ref.current) {
      return;
    }
    let level_visibility = showLevel ? "visible" : "hidden";
    let level = select(svg_container_ref.current);
    level.selectAll("svg .level").style("visibility", level_visibility);
  }, [showLevel]);

  useEffect(() => {
    if (!svg_container_ref.current) return;
    const clientWidth = svg_container_ref.current.clientWidth;
    const svg_props = {
      width: clientWidth,
      height: clientWidth * 0.5,
      margin: { top: 0.05, bottom: 0.1, right: 0.15, left: 0.2 },
      zoom: zoom,
    };
    let levels = level_boundary(data.description[0]);

    if (chartType === "bar") {
      const nr_svg_children = svg_container_ref.current.childElementCount;
      for (let i = 0; i < nr_svg_children; i++) {
        svg_container_ref.current.removeChild(
          svg_container_ref.current.children[0]
        );
      }
      const filtered_barchart_data = data.agg_data.filtered_by_year.filter(
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
      bar_chart(
        svg_container_ref.current,
        svg_props,
        filtered_barchart_data,
        levels
      );
    } else if (chartType === "line") {
      const nr_svg_children = svg_container_ref.current.childElementCount;
      for (let i = 0; i < nr_svg_children; i++) {
        svg_container_ref.current.removeChild(
          svg_container_ref.current.children[0]
        );
      }
      svg_props.margin = { top: 0.05, bottom: 0.2, right: 0.15, left: 0.05 };
      const filtered_linechart_data: StatisticData[] = data.agg_data.filtered_by_unit.filter(
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

      line_chart({
        svg_container: svg_container_ref.current,
        svg_props: svg_props,
        figure_data: filtered_linechart_data,
        levels: levels,
      });
    }
  }, [data, chartType, zoom]);

  return <div ref={svg_container_ref} style={{ textAlign: "center" }} />;
}

export default Chart;
