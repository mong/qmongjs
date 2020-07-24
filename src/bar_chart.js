import { select, scaleBand, scaleLinear } from 'd3'
import { theme_table_chart_bar as theme_bar_chart } from './theme_table_chart_bar.js'
import { labeled_x_axis_linear } from './axis_x_linear_labeled.js'
import { y_axis_band } from './axis_y_band.js'

// the barchart
export const responsiv_bar_chart = function (container, figure_data, props) {
  const { width, height, margin } = props
  const margin_px = {
    top: height * margin.top,
    bottom: height * margin.bottom,
    right: width * margin.right,
    left: width * margin.left
  }

  container = select('.' + container.className)
  const inner_width = width - margin_px.left - margin_px.right
  const inner_height = height - margin_px.top - margin_px.bottom

  let svg = container.selectAll('svg').data([null])
  svg = svg
    .enter()
    .append('svg')
    .merge(svg)
    .attr('width', width - 20)
    .attr('height', height)
    .style('background-color', '#EEF6F7')
    .attr('class', 'table_chart')

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
  const y_scale = scaleBand()
    .domain(figure_data.map((d) => d.treatment_unit))
    .range([0, inner_height])
    .paddingInner(0.1)
    .paddingOuter(0.0)
    .align(0.5)

  y_axis_band(
    g,
    Object.assign({}, theme_bar_chart, {
      y_scale,
      inner_width,
      inner_height,
      margin_px
    })
  )
  const x_scale = scaleLinear().domain([0, 1]).range([0, inner_width])

  labeled_x_axis_linear(
    g,
    Object.assign({}, theme_bar_chart, {
      x_scale,
      inner_width,
      inner_height
    })
  )

  const bars = g.selectAll('rect')
  bars
    .data(figure_data)
    .enter()
    .append('rect')
    .merge(bars)
    .attr('fill', (d) => {
      var fill_color
      if (
        Object.keys(d).some((elem) =>
          ['SykehusNavn', 'Hfkortnavn', 'RHF'].includes(elem)
        )
      ) {
        fill_color = '#7EBEC7'
      } else {
        fill_color = '#00263D'
      }
      return fill_color
    })
    .attr('x', 0) // function(d){return x_scale(d.andel)})
    .attr('y', (d) => y_scale(d.treatment_unit))
    .attr('height', y_scale.bandwidth)
    .transition()
    .duration(1000)
    .attr('width', (d) => x_scale(d.indicator))
}
