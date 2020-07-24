import {
  select,
  scaleTime,
  scaleOrdinal,
  scaleLinear,
  nest,
  line,
  min,
  max
} from 'd3'
import { theme_table_chart_line as theme_line_chart } from './theme_table_chart_line'
import { page_colors as colors } from './page_colors'
import { color_legend_line_chart } from './color_legend_table_line_chart'
import { labeled_y_axis_linear } from './axis_y_linear_labeled'
import { labeled_x_axis_time } from './axis_x_time_labeled'

// line chart
export const responsiv_line_chart = function (container, figure_data, props) {
  var { width, height, margin } = props
  const margin_px = {
    top: height * margin.top,
    bottom: height * margin.bottom,
    right: width * margin.right,
    left: width * margin.left
  }
  const inner_width = width - margin_px.left - margin_px.right
  const inner_height = height - margin_px.top - margin_px.bottom

  container = select('.' + container.className)

  const x_scale = scaleTime()
    .domain([
      min(figure_data, (d) => {
        return new Date(d.Aar + '')
      }),
      max(figure_data, (d) => {
        return new Date(d.Aar + '')
      })
    ])
    .range([0, inner_width])

  let y_scale = scaleLinear().domain([0, 1]).range([inner_height, 0])

  const nested = nest()
    .key((d) => {
      return d.treatment_unit
    })
    .entries(figure_data)

  const line_color_scale = scaleOrdinal()
    .domain(
      nested.map((d) => {
        return d.key
      })
    )
    .range(colors.chart_colors)

  color_legend_line_chart(
    container,
    Object.assign({}, theme_line_chart, {
      line_color_scale,
      inner_width,
      inner_height,
      margin,
      position_left: margin_px.left
    })
  )

  let svg = container.selectAll('svg').data([null])
  svg = svg
    .enter()
    .append('svg')
    .merge(svg)
    .attr('width', width - 20)
    .attr('height', height)
    .style('background-color', colors.background_color)

  let g = svg.selectAll('.grouped_element').data([null])
  g = g
    .enter()
    .append('g')
    .attr('class', 'grouped_element')
    .merge(g)
    .attr(
      'transform',
      'translate(' + margin_px.left + ' ,' + margin_px.top + ')'
    )

  labeled_y_axis_linear(
    g,
    Object.assign({}, theme_line_chart, {
      y_scale,
      inner_width,
      inner_height
    })
  )

  let x_axis_tick_values = [
    ...new Set(
      figure_data.map((d) => {
        return d.Aar + ''
      })
    )
  ]
  x_axis_tick_values = x_axis_tick_values.map((d) => {
    return new Date(d)
  })
  if (x_axis_tick_values.length > 8) {
    x_axis_tick_values =
      x_axis_tick_values.length % 2 === 0
        ? x_axis_tick_values.filter((data, index) => index % 2 != 0)
        : x_axis_tick_values.filter((data, index) => index % 2 === 0)
  }

  labeled_x_axis_time(
    g,
    Object.assign({}, theme_line_chart, {
      x_scale,
      inner_width,
      inner_height,
      x_axis_tick_values
    })
  )

  const lines = line()
    .x((d) => {
      return x_scale(new Date(d.Aar + ''))
    })
    .y((d) => {
      return y_scale(d.indicator)
    })
  // .curve(  curveMonotoneX)

  let path = g.selectAll('.table-line-chart')
  path = path
    .data(nested)
    .enter()
    .append('path')
    .merge(path)
    .attr('class', (d) => `table-line-chart  ${d.key.replace(/\s/g, '')}`)
    .attr('d', (d) => {
      return lines(d.values)
    })
    .attr('stroke', (d) => {
      return line_color_scale(d.key)
    })
    .style('stroke-width', 3)
    .style('stroke-linejoin', 'round')
    .style('stroke-linecap', 'round')
    .attr('fill', 'none')
    .style('mix-blend-mode', 'multiply')

  y_scale = scaleLinear()
    .domain([
      min(figure_data, (d) => {
        return d.indicator
      }),
      max(figure_data, (d) => {
        return d.indicator
      })
    ])
    .range([inner_height, 0])

  path
    .data(nested)
    .enter()
    .append('path')
    .merge(path)
    .transition()
    .delay(2000)
    .duration(3000)
    .attr('d', (d) => lines(d.values))

  labeled_y_axis_linear(
    g,
    Object.assign({}, theme_line_chart, {
      y_scale,
      inner_width,
      inner_height,
      transition: true
    })
  )
}
