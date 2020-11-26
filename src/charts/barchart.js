import { select, scaleBand, scaleLinear, max } from "d3";

import { theme_table_chart_bar as theme_bar_chart } from "./theme_table_chart_bar.js";
import { labeled_x_axis_linear } from "./axis_x_linear_labeled.js";
import { y_axis_band } from "./axis_y_band.js";
import { page_colors } from "./page_colors.js";
import app_config from "../app_config";
const config = app_config.data_config;

// the barchart
export const bar_chart = function (container, props, figure_data, levels) {
  const {
    width,
    height,
    margin,
    zoom,
    delay_value = 1000,
    duration_value = 1000,
  } = props;
  const margin_px = {
    top: height * margin.top,
    bottom: height * margin.bottom,
    right: width * margin.right,
    left: width * margin.left,
  };
  container = select(container);
  const inner_width = width - margin_px.left - margin_px.right;
  const inner_height = height - margin_px.top - margin_px.bottom;

  let svg = container.selectAll("svg").data([null]);
  svg = svg
    .enter()
    .append("svg")
    .merge(svg)
    .attr("width", width - 20)
    .attr("height", height)
    .style("background-color", "#EEF6F7")
    .attr("class", "table_chart");

  let g = svg.selectAll(".grouped_element").data([null]);
  g = g
    .enter()
    .append("g")
    .attr("class", "grouped_element")
    .merge(g)
    .attr(
      "transform",
      "translate(" + margin_px.left + " ," + margin_px.top + ")"
    );
  const y_scale = scaleBand()
    .domain(figure_data.map((d) => d[config.column.treatment_unit]))
    .range([0, inner_height])
    .paddingInner(0.5)
    .paddingOuter(0.5)
    .align(0.5);

  y_axis_band(
    g,
    Object.assign({}, theme_bar_chart, {
      y_scale,
      inner_width,
      inner_height,
      margin_px,
    })
  );
  let x_scale = scaleLinear().domain([0, 1]).range([0, inner_width]);

  labeled_x_axis_linear(
    g,
    Object.assign({}, theme_bar_chart, {
      x_scale,
      inner_width,
      inner_height,
      transition: false,
    })
  );

  const level_colors = page_colors.traffic_light_colors;

  let show_level = document.querySelector(".dropdown_ul .dd-level").innerHTML;
  let level_visibility =
    show_level.replace(/\s/g, "") === "Skjulmålnivå" ? "visible" : "hidden";

  let level = g.selectAll("rect.level");
  level = level
    .data(levels)
    .enter()
    .append("rect")
    .merge(level)
    .attr("class", "level")
    .attr("y", 0)
    .attr("x", (d) => x_scale(d.end))
    .attr("width", (d) => x_scale(d.start - d.end))
    .attr("height", inner_height)
    .attr("fill", (d) => level_colors[d.level])
    .style("opacity", "0.2")
    .style("visibility", level_visibility);

  let bars = g
    .selectAll("rect.bars")
    .data(figure_data, (d) => d[config.column.treatment_unit]);

  bars.exit().transition().style("opacity", 0).remove();

  bars = bars
    .enter()
    .append("rect")
    .attr("class", "bars")
    .merge(bars)
    .attr("fill", (d) => {
      let fill_color;
      if (d[config.column.treatment_unit] === "Nasjonalt") {
        fill_color = "#00263D";
      } else {
        fill_color = "#7EBEC7";
      }
      return fill_color;
    })
    .attr("x", 0)
    .attr("y", (d) => y_scale(d[config.column.treatment_unit]))
    .attr("height", y_scale.bandwidth)
    .transition()
    .duration(delay_value)
    .attr("width", (d) => x_scale(d[config.column.variable]));

  if (zoom) {
    let x_max_val = max(figure_data, (d) => d[config.column.variable]);
    let additional_margin = (0.01 + x_max_val) * 0.2;
    x_max_val = Math.ceil((x_max_val + additional_margin) * 100) / 100;

    x_scale = scaleLinear()
      .domain([0, x_max_val > 1 ? 1 : x_max_val])
      .range([0, inner_width]);

    bars
      .merge(bars)
      .transition()
      .delay(0)
      .duration(duration_value)
      .attr("width", (d) => x_scale(d[config.column.variable]));

    level
      .data(levels)
      .merge(level)
      .transition()
      .delay(delay_value)
      .duration(duration_value)
      .attr("x", (d) => {
        let end;
        if (x_scale(d.end) > inner_width) {
          end = x_scale.invert(inner_width);
        } else if (x_scale(d.end) < 0) {
          end = x_scale.invert(0);
        } else {
          end = d.end;
        }
        return x_scale(end);
      })
      .attr("width", (d) => {
        let end;
        let start;
        if (x_scale(d.end) > inner_width) {
          end = x_scale.invert(inner_width);
        } else if (x_scale(d.end) < 0) {
          end = x_scale.invert(0);
        } else {
          end = d.end;
        }

        if (x_scale(d.start) <= inner_width && x_scale(d.start) >= 0) {
          start = d.start;
        } else if (x_scale(d.start) > inner_width) {
          start = x_scale.invert(inner_width);
        } else if (x_scale(d.start) < 0) {
          start = x_scale.invert(0);
        }
        return x_scale(start) - x_scale(end);
      });

    let label_format;
    label_format = x_max_val < 0.05 ? ",.1%" : ",.0%";

    labeled_x_axis_linear(
      g,
      Object.assign({}, theme_bar_chart, {
        x_scale,
        inner_width,
        inner_height,
        transition: true,
        delay_val: delay_value,
        duration_val: duration_value,
        axis_label_format: label_format,
      })
    );
  }
};
