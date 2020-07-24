import { axisRight, format } from 'd3'
/** @module src/axis_y_linear_labeled */

/**
 * Creats linear y axis based on y_scale passed to it as part of the props.
 *
 * @func
 * @param { DOM } selection - the selected DOM element to which the axis will be attached to
 * @param { Object } props - an objet that defines the look of the y axis
 */

export const labeled_y_axis_linear = function (selection, props) {
  const {
    y_scale,
    inner_width,
    inner_height,
    y_axis_label = 'Y axis',
    y_axis_label_fill = 'black',
    y_axis_label_offset = inner_width * 1.15,
    y_axis_label_font_size = 7 + inner_width * 0.02 + 'px',
    y_axis_label_font_family = 'arial',
    y_axis_tick_font_size = 8 + inner_height * 0.02 + 'px',
    y_axis_tick_number,
    y_axis_tick_font_fill,
    y_axis_tick_line_stroke,
    y_axis_tick_size = inner_width,
    y_axis_domain_line_stroke,
    transition = false
  } = props

  const y_axis = axisRight(y_scale)
    .ticks(y_axis_tick_number)
    .tickSize(y_axis_tick_size)
    .tickFormat(format(',.0%'))
  let y_axis_g = selection.selectAll('.y-axis').data([null])
  y_axis_g = y_axis_g
    .enter()
    .append('g')
    .attr('class', 'y-axis')
    .merge(y_axis_g)

  // prettier-ignore
  transition ? y_axis_g.transition().delay(2000).duration(2000).call(y_axis).nice : y_axis_g.call(y_axis)

  y_axis_g
    .selectAll('.tick text')
    .style('font-size', y_axis_tick_font_size)
    .attr('fill', y_axis_tick_font_fill)

  y_axis_g.selectAll('.tick line').attr('stroke', y_axis_tick_line_stroke)
  y_axis_g.select('.domain').attr('stroke', y_axis_domain_line_stroke)

  const y_axis_label_text = y_axis_g.selectAll('.axis-label').data([null])
  y_axis_label_text
    .enter()
    .append('text')
    .attr('class', 'axis-label')
    .merge(y_axis_label_text)
    .attr('fill', y_axis_label_fill)
    .text(y_axis_label)
    .attr('transform', 'rotate(-90)')
    .attr('x', -inner_height / 1.5)
    .attr('y', y_axis_label_offset)
    .style('font-size', y_axis_label_font_size)
    .style('font-family', y_axis_label_font_family)
}
