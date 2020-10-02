import { axisLeft } from 'd3'
/** @module src/axis_y_band */

/**
 * Creats y axis for a bar chart based on band scale passed to it as part of the props.
 *
 * @func
 * @param { DOM } selection - the selected DOM element to which the axis will be attached to
 * @param { Object } props - an objet that defines the look of the y axis
 */

export const y_axis_band = function (selection, props) {
  const {
    y_scale,
    inner_width,
    inner_height,
    y_axis_label_font_family = 'arial',
    y_axis_tick_font_size = 3 + inner_height * 0.03 + 'px',
    y_axis_tick_distance_from_axis = inner_width * 0.03,
    y_axis_tick_font_fill,
    y_axis_tick_line_stroke,
    y_axis_domain_line_stroke
  } = props

  const y_axis = axisLeft(y_scale)

  let y_axis_g = selection.selectAll('.y-axis').data([null])
  y_axis_g = y_axis_g
    .enter()
    .append('g')
    .attr('class', 'y-axis')
    .merge(y_axis_g)

  y_axis_g.call(y_axis).attr('text-anchor', 'end')
  y_axis_g
    .selectAll('.tick text')
    .attr('x', -y_axis_tick_distance_from_axis)
    .style('font-size', y_axis_tick_font_size)
    .style('font-family', y_axis_label_font_family)
    .attr('fill', y_axis_tick_font_fill)
  y_axis_g.selectAll('.tick line').attr('stroke', y_axis_tick_line_stroke)
  y_axis_g.select('.domain').attr('stroke', y_axis_domain_line_stroke)
}
