import React, { useEffect, useRef, useState } from "react";

import TF_BUTTON from "./tf_button";
import TF_DDMENU from "./tf_ddmenu";
import TF_LONG_DESCRIPTION from "./tf_description";

import { bar_chart } from "../charts/barchart";
import { line_chart } from "../charts/line_chart";
import { level_boundary } from "../charts/tr_utils";
import { StatisticData } from "../App";
import { GraphData } from "./main_component";

interface Props {
  colspan?: number;
  data: GraphData;
  figure_class?: string;
  update_selected_row(row: string): void;
}

function TF_FIGURE(props: Props) {
  const { colspan = 3, data, figure_class, update_selected_row } = props;
  const svg_container_ref = useRef<HTMLDivElement>(null);
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

  const [chart_type, update_chart_type] = useState<"line" | "bar">("line");
  const [zoom, update_zoom] = useState("Zoom ut");
  const [show_level, update_show_level] = useState("Vis målnivå");
  const [remove_tf, update_remove_tf] = useState(null);

  useEffect(() => {
    if (!svg_container_ref.current) return;
    const clientWidth = svg_container_ref.current.clientWidth;
    const svg_props = {
      width: clientWidth,
      height: clientWidth * 0.5,
      margin: { top: 0.05, bottom: 0.1, right: 0.15, left: 0.2 },
      zoom: zoom,
    };
    let levels = [
      { level: "high", start: 0, end: 0 },
      { level: "mid", start: 0, end: 0 },
      { level: "low", start: 0, end: 0 },
    ];
    levels.forEach(level_boundary, data.description[0]);

    if (chart_type === "bar") {
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
    } else if (chart_type === "line") {
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
  }, [data, chart_type, zoom]);

  return (
    <tr className={figure_class}>
      <td colSpan={colspan}>
        <div className="tr_figure">
          <div className="tr_buttons_container">
            <TF_DDMENU
              show_level={show_level}
              update_show_level={update_show_level}
              zoom={zoom}
              update_zoom={update_zoom}
              remove_tf={remove_tf}
              update_remove_tf={update_remove_tf}
              svg_container={svg_container_ref}
              update_selected_row={update_selected_row}
            />
            <TF_BUTTON
              chart_type={chart_type}
              update_chart_type={update_chart_type}
            />
          </div>
          <div ref={svg_container_ref} style={{ textAlign: "center" }} />
          <TF_LONG_DESCRIPTION
            description_text={data.description[0].long_description ?? ""}
          />
        </div>
      </td>
    </tr>
  );
}

export default TF_FIGURE;
