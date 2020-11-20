import { axisBottom, format } from "d3";
/** @module src/axis_x_linear_labeled */

/**
 * Creats linear x axis based on x_scale passed to it as part of the props.
 *
 * @func
 * @param { DOM } selection - the selected DOM element to which the axis will be attached to
 * @param { Object } props - an objet that defines the look of the x axis
 */
export const labeled_x_axis_linear = function (selection, props) {
  const {
    x_scale,
    inner_width,
    inner_height,
    x_axis_label,
    x_axis_label_fill,
    x_axis_label_offset = inner_height / 6,
    x_axis_label_font_size = 9 + inner_width * 0.04 + "px",
    x_axis_tick_font_size = 7 + inner_width * 0.02 + "px",
    x_axis_tick_font_fill,
    x_axis_tick_line_stroke,
    x_axis_tick_number = 6,
    x_axis_tick_size = inner_height,
    //x_axis_tick_offset = inner_height * 0.05,
    x_axis_domain_line_stroke,
    x_axis_label_font_family,
    transition = false,
    delay_val = 0,
    duration_val = 0,
    axis_label_format = ",.0%",
  } = props;

  const x_axis = axisBottom(x_scale)
    .tickSize(-x_axis_tick_size)
    .ticks(x_axis_tick_number)
    .tickFormat(format(axis_label_format));

  let x_axis_g = selection.selectAll(".x-axis").data([null]);
  x_axis_g = x_axis_g
    .enter()
    .append("g")
    .attr("class", "x-axis")
    .merge(x_axis_g)
    .attr("transform", `translate(0,${inner_height})`);

  if (transition) {
    x_axis_g.transition().delay(delay_val).duration(duration_val).call(x_axis);
  } else {
    x_axis_g.call(x_axis);
  }

  x_axis_g
    .selectAll(".tick text")
    .style("font-size", x_axis_tick_font_size)
    .attr("fill", x_axis_tick_font_fill);
  //.attr('y', x_axis_tick_offset)

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
    .style("font-size", x_axis_label_font_size)
    .style("font-family", x_axis_label_font_family);
};
