import React, {useEffect, useRef, useState} from 'react';

import TF_BUTTON from './tf_button'
import TF_DDMENU from './tf_ddmenu'
import TF_LONG_DESCRIPTION from './tf_description'

import { bar_chart } from '../charts/barchart'
import { line_chart } from '../charts/line_chart'
import { level_boundary } from '../charts/tr_utils'

function TF_FIGURE (props) {
  const {
    colspan = 3,
    data,
    figure_class,
    update_selected_row 
  } = props
  
  const svg_container_ref = useRef()
  if(!data.agg_data.filtered_by_year.some(
    d => d.unit_name ==="Nasjonalt")) {
    data.agg_data.filtered_by_year
      .push(data.agg_data.nation.filtered_by_year[0])
    Array.prototype.push.apply(
      data.agg_data.filtered_by_unit,
      data.agg_data.nation.filtered_by_unit
    )
  }

  
  const [chart_type, update_chart_type] = useState("line")
  const [zoom, update_zoom] = useState("Zoom ut")
  const [show_level, update_show_level] = useState("Vis målnivå")
  const [remove_tf, update_remove_tf] = useState(null)

  useEffect(() => {
    const svg_props = {}
    svg_props.width = svg_container_ref.current.clientWidth 
    svg_props.height =  svg_props.width * 0.5
    svg_props.margin = {top:0.05, bottom: 0.1, right: 0.15, left: 0.2}
    svg_props.zoom = zoom
    const levels = [{level: 'high'}, {level: 'mid'}, {level: 'low'}]
    levels.forEach(level_boundary, data.description[0])
    if (chart_type === "bar" ) {
      const nr_svg_children = svg_container_ref.current.childElementCount
      for(let i = 0; i < nr_svg_children; i++){
        svg_container_ref.current.removeChild(
          svg_container_ref.current.children[0]
        )
      }
      const filtered_barchart_data = data.agg_data.filtered_by_year
      .filter(data_by_year=>{
        if (data_by_year.unit_level !== "nation"){
          return(  
            !(data_by_year.denominator < data.description[0]["min_denominator"] || 
            data_by_year.dg < 0.6 )//|| typeof(data_by_year.dg) === "undefined" )
          )
        } else {
          return true
        }
      })
      bar_chart(
        svg_container_ref.current,
        svg_props,
        filtered_barchart_data,
        levels
      )
    } else if (chart_type === "line") {
      const nr_svg_children = svg_container_ref.current.childElementCount
      for(let i = 0; i < nr_svg_children; i++){
        svg_container_ref.current.removeChild(
          svg_container_ref.current.children[0]
        )
      }
      svg_props.margin = {top:0.05, bottom: 0.2, right: 0.15, left: 0.05}
      const filtered_linechart_data = data.agg_data.filtered_by_unit
      .filter(data_by_year=>{
        if (data_by_year.unit_level !== "nation"){
          return(  
            !(data_by_year.denominator < data.description[0]["min_denominator"] || 
            data_by_year.dg < 0.6 )//|| typeof(data_by_year.dg) === "undefined" )
          )
        } else {
          return true
        }
      })
      line_chart(
        svg_container_ref.current,
        svg_props,
        filtered_linechart_data, levels
      )
    }
  }, [data, chart_type, zoom])
  
  return (
      <tr className = {figure_class}><td colSpan = {colspan}>
        <div className="tr_figure" >
          <div className = "tr_buttons_container">
            <TF_DDMENU
              show_level = {show_level}
              update_show_level = {update_show_level}
              zoom ={zoom}
              update_zoom = {update_zoom}
              remove_tf = {remove_tf}
              update_remove_tf = {update_remove_tf}
              svg_container = {svg_container_ref}
              update_selected_row = {update_selected_row}
            />
            <TF_BUTTON
              chart_type = {chart_type}
              update_chart_type = {update_chart_type}
            />
          </div>
          <div ref = {svg_container_ref} style = {{textAlign: "center"}}>
            
          </div>
          <TF_LONG_DESCRIPTION description_text = {data.description[0].long_description}/>
        </div>
      </td></tr>
  );
}

export default TF_FIGURE;
