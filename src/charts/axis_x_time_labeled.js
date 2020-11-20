import { axisBottom, timeFormat } from "d3";
/** @module src/axis_x_time_labeled */

/**
 * Creats time formatted x axis based on x_scale passed to it as part of the props.
 *
 * @func
 * @param { DOM } selection - the selected DOM element to which the axis will be attached to
 * @param { Object } props - an objet that defines the look of the x axis
 */

export const labeled_x_axis_time = function (selection, props) {
  const {
    x_scale,
    inner_width,
    inner_height,
    x_axis_tick_values,
    x_axis_label = "",
    x_axis_label_fill = "",
    x_axis_label_offset = 0,
    x_axis_label_font_size = 0,
    x_axis_label_font_family = "arial",
    x_axis_tick_font_size = 10 + inner_width * 0.015 + "px",
    x_axis_tick_distance_from_axis = 5 + inner_height * 0.08,
    x_axis_tick_font_fill,
    x_axis_tick_line_stroke,
    x_axis_domain_line_stroke,
  } = props;

  const x_axis = axisBottom(x_scale)
    .tickValues(x_axis_tick_values)
    .tickFormat(timeFormat("%Y"));
  let x_axis_g = selection.selectAll(".x-axis").data([null]);
  x_axis_g = x_axis_g
    .enter()
    .append("g")
    .attr("class", "x-axis")
    .merge(x_axis_g)
    .attr("transform", `translate(0,${inner_height})`);
  x_axis_g.call(x_axis);
  x_axis_g
    .selectAll(".tick text")
    .style("font-size", x_axis_tick_font_size)
    .attr("fill", x_axis_tick_font_fill)
    .attr("y", x_axis_tick_distance_from_axis);
  x_axis_g.selectAll(".tick line").attr("stroke", x_axis_tick_line_stroke);
  x_axis_g.select(".domain").attr("stroke", x_axis_domain_line_stroke);

  const x_axis_label_text = x_axis_g.selectAll(".axis-label").data([null]);
  x_axis_label_text
    .enter()
    .append("text")
    .attr("class", "axis-label")
    .merge(x_axis_label_text)
    .attr("fill", x_axis_label_fill)
    .text(x_axis_label)
    .attr("x", inner_width / 2)
    .attr("y", x_axis_label_offset)
    .style("font-size", x_axis_label_font_size + "px")
    .style("font-family", x_axis_label_font_family);
};
