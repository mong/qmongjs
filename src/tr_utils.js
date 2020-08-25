import {  selectAll, scaleLinear, line, min, max, scaleTime } from 'd3'
import { labeled_x_axis_linear } from './axis_x_linear_labeled.js'
import { theme_table_chart_bar as theme_bar_chart } from './theme_table_chart_bar.js'
import { theme_table_chart_line as theme_line_chart } from './theme_table_chart_line'
import { labeled_y_axis_linear } from './axis_y_linear_labeled'
import { app_config as config } from './app_config.js'



// function that returns the tr based on a childElement of tr
// can be used to find  tr that was clicked.
export const clicked_tr = function (clicked_element) {
  if (clicked_element.nodeName === 'TR') {
    return clicked_element
  } else if (clicked_element.parentElement.nodeName !== 'BODY') {
    return clicked_tr(clicked_element.parentElement)
  } else {
    return 'BODY'
  }
}

// removes the figure rows when a new tr is checked
export const remove_row = function () {
  let rm_element = document.querySelector('.tr_figure')
  if (rm_element !== null) {
    rm_element.parentNode.removeChild(rm_element)
    window.onresize = function(){}
  }
}

export const level_boundary = function (level_obj)  {
  if (this[config.column.level_direction] === 0) {
    if (level_obj.level === 'high' )  {
      level_obj.start = this[config.column.level_green]
      level_obj.end = 0
    } else if (level_obj.level === 'mid') {
      level_obj.start = this[config.column.level_yellow]
      level_obj.end = this[config.column.level_green]
    } else {
      level_obj.start = 1
      level_obj.end = this[config.column.level_yellow]
    }
  } else if (this[config.column.level_direction]=== 1 ){
      if ( level_obj.level === 'high' )  {
        level_obj.start = 1
        level_obj.end = this[config.column.level_green]
      } else if (level_obj.level === 'mid') { 
        level_obj.start = this[config.column.level_green]
        level_obj.end = this[config.column.level_yellow]
      } else {
        level_obj.start = this[config.column.level_yellow]
        level_obj.end = 0
      }
  } 
}


export const zoom_out_bar = function(){

  let g = selectAll("g.grouped_element");
  let level_rects = document.querySelectorAll("rect.level")
  let inner_width  = Array.from(level_rects).reduce(
    (acc, c_val) => acc +Number(c_val.getAttribute("width")),
    0
  )
  let inner_height = Number(level_rects[0].getAttribute("height"))
  let x_scale = scaleLinear().domain([0, 1]).range([0, inner_width])
  
  labeled_x_axis_linear(
    g,
    Object.assign({}, theme_bar_chart, {
      x_scale,
      inner_width,
      inner_height,
      transition:true,
      duration_val:1000
    })
  )
  let level = g.selectAll("rect.level")
  level
    .merge(level)
      .transition()
      .duration(1000)
      .attr('x', d => x_scale(d.end))
      .attr('width',d => x_scale(d.start - d.end))


  let bars = g.selectAll('rect.bars')
    bars 
        .merge(bars)
        .transition()
        .duration(1000)
        .attr('width', (d) => x_scale(d[config.column.variable]))    
}

export const zoom_in_bar = function () {
  let g = selectAll("g.grouped_element");
  let level_rects = document.querySelectorAll("rect.level")
  let indicator_bars = document.querySelectorAll("rect.bars")
  let indicator_values = []
  Array.from(indicator_bars).forEach(
    val => indicator_values.push(val.__data__[config.column.variable])
  )  
  let inner_width  = Array.from(level_rects).reduce(
    (acc, c_val) => acc +Number(c_val.getAttribute("width")),
    0
  )
  let inner_height = Number(level_rects[0].getAttribute("height"))
  let x_max_val = Math.max.apply(null, indicator_values)  
  let additional_margin = x_max_val * 0.2  
  x_max_val = Math.ceil((x_max_val + additional_margin)*100)/100

  let x_scale = scaleLinear()
    .domain([
      0,
      x_max_val  > 1 ? 1 : x_max_val 
    ])
    .range([0, inner_width])

   
  let bars = g.selectAll('rect.bars')  
  bars 
    .merge(bars)
      .transition()
      .delay(0)
      .duration(1000)
      .attr('width', (d) => x_scale(d[config.column.variable]))

  let level = g.selectAll("rect.level")
  level
    .merge(level)
      .transition()
      .duration(1000)
      .attr('x', d => {
        let end ;
        if ( x_scale(d.end) > inner_width) {
          end = x_scale.invert(inner_width)
        } else if(x_scale(d.end) < 0){
           end = x_scale.invert(0)
        } else {
          end = d.end
        }
        return x_scale(end)
      })
      .attr('width', d => {
        let end ;
        let start ;        
        if ( x_scale(d.end) > inner_width) {
          end = x_scale.invert(inner_width)
        } else if(x_scale(d.end) < 0){
           end = x_scale.invert(0)
        } else {
          end = d.end
        }
        if (x_scale(d.start) <= inner_width && x_scale(d.start) >= 0){
          start = d.start
        } else if (x_scale(d.start) > inner_width) {
          start = x_scale.invert(inner_width) 
        } else if (x_scale(d.start) < 0){
          start = x_scale.invert(0) 
        }
        return x_scale(start) - x_scale(end) 
      })
  let label_format;
  x_max_val < 0.05 ? label_format = ',.1%': ',.0%'
 
  labeled_x_axis_linear(
    g,
    Object.assign({}, theme_bar_chart, {
      x_scale,
      inner_width,
      inner_height,
      transition: true,
      duration_val: 1000,
      axis_label_format: label_format
    })
)

}

export const zoom_out_line = function(){
  let g = selectAll("g.grouped_element");
  let level_rects = document.querySelectorAll("rect.level")
  let inner_height  = Array.from(level_rects).reduce(
    (acc, c_val) => acc +Number(c_val.getAttribute("height")),
    0
  )
  let inner_width = Number(level_rects[0].getAttribute("width"))
  let y_scale = scaleLinear().domain([0, 1]).range([inner_height, 0])
  
  let figure_path = document.querySelectorAll("path.table-line-chart") 
  let figure_data = Array.from(figure_path).flatMap(
    fig_path => fig_path.__data__.values
  )
  
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

  labeled_y_axis_linear(
    g,
    Object.assign({}, theme_line_chart, {
      y_scale,
      inner_width,
      inner_height,
      transition: true,
      delay_val: 0,
      duration_val: 1000
    })
  )

  let level = g.selectAll("rect.level")
  level 
    .merge(level)
      .transition()
      .duration(1000)
      .attr('x', 0)
      .attr('y', d => y_scale(d.start))
      .attr('height',d => inner_height - y_scale((d.start - d.end)))
  const lines = line()
    .x((d) => x_scale(new Date(d[config.column.year] + '')))
    .y((d) => y_scale(d[config.column.variable]))

  let path = g.selectAll('.table-line-chart')
  path 
    .merge(path)
    .transition()
    .duration(1000)
    .attr('d', (d) => lines(d.values))
}

export const zoom_in_line = function () {
  let g = selectAll("g.grouped_element");
  let level_rects = document.querySelectorAll("rect.level")
  let inner_height  = Array.from(level_rects).reduce(
    (acc, c_val) => acc +Number(c_val.getAttribute("height")),
    0
  )
  let inner_width = Number(level_rects[0].getAttribute("width"))
  
  let figure_path = document.querySelectorAll("path.table-line-chart") 
  let figure_data = Array.from(figure_path).flatMap(
    fig_path => fig_path.__data__.values
  )

  let y_min_val =  min(figure_data, (d) => d[config.column.variable]) 
  let y_max_val =  max(figure_data, (d) => d[config.column.variable])
  let additional_margin = (y_max_val - y_min_val) * 0.2  
  y_min_val = Math.floor( (y_min_val - additional_margin) * 100) / 100
  y_max_val = Math.ceil((y_max_val + additional_margin) * 100) / 100

  let y_min;
  let y_max;
  
  y_min_val  < 0 ? y_min = 0 : y_min = y_min_val,
  y_max_val  > 1 ? y_max = 1 : y_max =y_max_val

  let y_scale = scaleLinear()
    .domain([
     y_min,
     y_max
    ])
    .range([inner_height, 0])

  let label_format;
  y_max-y_min < 0.06 ? label_format = ',.1%': ',.0%'  

  
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

  labeled_y_axis_linear(
    g,
    Object.assign({}, theme_line_chart, {
      y_scale,
      inner_width,
      inner_height,
      transition: true,
      delay_val: 0,
      duration_val: 1000,
      axis_label_format: label_format
    })
  )

  let level = g.selectAll("rect.level")
  level 
    .merge(level)
      .transition()
      .duration(1000)
      .attr('x', 0)
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

  const lines = line()
    .x((d) => x_scale(new Date(d[config.column.year] + '')))
    .y((d) => y_scale(d[config.column.variable]))

  let path = g.selectAll('.table-line-chart')
  path 
    .merge(path)
    .transition()
    .duration(1000)
    .attr('d', (d) => lines(d.values))
}

