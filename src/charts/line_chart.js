import {
  select,
  scaleTime,
  scaleOrdinal,
  scaleLinear,
  group,
  line,
  min,
  max
} from 'd3'

import { theme_table_chart_line as theme_line_chart } from './theme_table_chart_line'
import { page_colors as colors } from './page_colors'
import { color_legend_line_chart } from './color_legend_table_line_chart'
import { labeled_y_axis_linear } from './axis_y_linear_labeled'
import { labeled_x_axis_time } from './axis_x_time_labeled'
import { page_colors } from './page_colors.js'
import  app_config  from '../app_config'
const config = app_config.data_config

// line chart
export const line_chart = function (container, props, figure_data, levels) {
  const { width, height, margin, zoom } = props
  const margin_px = {
    top: height * margin.top,
    bottom: height * margin.bottom,
    right: width * margin.right,
    left: width * margin.left
  }
  const inner_width = width - margin_px.left - margin_px.right
  const inner_height = height - margin_px.top - margin_px.bottom

  container = select( container)

  const x_scale = scaleTime()
    .domain([
      min(figure_data, (d) => {
        return new Date(d[config.column.year] + '')
      }),
      max(figure_data, (d) => {
        return new Date(d[config.column.year] + '')
      })
    ])
    .range([0, inner_width])
  let y_scale = scaleLinear().domain([0, 1]).range([inner_height, 0])

  
  const nested = Array.from(group(figure_data, d=>d.unit_name), ([key, value]) => ({key, value}) )
    

  const line_color_scale = scaleOrdinal()
    .domain(nested.map((d) => d.key))
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
        return d[config.column.year] + ''
      })
    )
  ]
  x_axis_tick_values = x_axis_tick_values.map((d) => {
    return new Date(d)
  })
  if (x_axis_tick_values.length > 8) {
    x_axis_tick_values =
      x_axis_tick_values.length % 2 === 0
        ? x_axis_tick_values.filter((data, index) => index % 2 !== 0)
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
    .x((d) => x_scale(new Date(d[config.column.year] + '')))
    .y((d) => y_scale(d[config.column.variable]))


  let show_level = document.querySelector('.dropdown_ul .dd-level').innerHTML
  let level_visibility = show_level.replace(/\s/g, '') === "Skjulmålnivå" ?  "visible" : "hidden"
  const level_colors = page_colors.traffic_light_colors

  let level = g.selectAll("rect.level")
  level = level
    .data(levels)
    .enter().append("rect")
    .merge(level)
      .attr("class", "level")
      .attr('x', 0)
      .attr('y', d => y_scale(d.start))
      .attr('height',d => inner_height - y_scale((d.start - d.end)))
      .attr("width", inner_width)
      .attr('fill', d => level_colors[d.level])
      .style("opacity","0.2")
      .style("visibility", level_visibility)

  
  let path = g.selectAll('.table-line-chart')
  .data(group(figure_data, d=> d[config.column.treatment_unit]))

  path.exit().transition().style('opacity', 0).remove()
    
  path = path
    .enter()
    .append('path')
    .merge(path)
    .attr('class', (d) =>  `table-line-chart  ${d[0].replace(/\s/g, '')}`)
    .attr('d', (d) => lines(d[1]))
    .attr('stroke', (d) => line_color_scale(d[0]))
    .style('stroke-width', 3)
    .style('stroke-linejoin', 'round')
    .style('stroke-linecap', 'round')
    .attr('fill', 'none')
    .style('mix-blend-mode', 'multiply')
  

  
  if (zoom.replace(/\s/g, '') === 'Zoomut' ){
    let y_min_val =  min(figure_data, (d) => d[config.column.variable]) 
    let y_max_val =  max(figure_data, (d) => d[config.column.variable])
    let additional_margin = (y_max_val - y_min_val) * 0.2  
    y_min_val = Math.floor( (y_min_val - additional_margin) * 100) / 100
    y_max_val = Math.ceil((y_max_val + additional_margin) * 100) / 100
    
    let y_min;
    let y_max;
    
    y_min_val  < 0 ? y_min = 0 : y_min = y_min_val
    y_max_val  > 1 ? y_max = 1 : y_max =y_max_val

    y_scale = scaleLinear()
      .domain([
      y_min,
      y_max
      ])
      .range([inner_height, 0])
    
    let label_format =  y_max-y_min < 0.06 ? ',.1%': ',.0%'  
    
    path
      .data(group(figure_data, d=> d[config.column.treatment_unit]))
      .enter()
      .append('path')
      .merge(path)
      .transition()
      .delay(1000)
      .duration(1000)
      .attr('d', (d) => lines(d[1]))
    
    level
      .data(levels)
      .enter().append("rect")
      .merge(level)
        .transition()
        .delay(1000)
        .duration(1000)
        .attr('y', d => {
          let start ;
          if ( y_scale(d.start) > inner_height) {
            start = y_scale.invert(inner_height)
          } else if(y_scale(d.start) < 0){
            start = y_scale.invert(0)
          } else {
            start = d.start
          }
          return y_scale(start)
        })
        .attr('height',d => {
          let end ;
          let start ;        
          if ( y_scale(d.start) > inner_height) {
            start = y_scale.invert(inner_height)
          } else if(y_scale(d.start) < 0){
            start = y_scale.invert(0)
          } else {
            start = d.start
          }
          
          if (y_scale(d.end) <= inner_height && y_scale(d.end) >= 0){
            end = d.end
          } else if (y_scale(d.end) > inner_height) {
            end = y_scale.invert(inner_height) 
          } else if (y_scale(d.end) < 0){
            end = y_scale.invert(0) 
          }
          return y_scale(end) - y_scale(start)
        })
    
    labeled_y_axis_linear(
      g,
      Object.assign({}, theme_line_chart, {
        y_scale,
        inner_width,
        inner_height,
        transition: true,
        delay_val: 1000,
        duration_val: 1000,
        axis_label_format: label_format
      })
    )
  }
}
