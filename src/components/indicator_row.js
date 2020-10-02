import React from 'react'

import INDICATOR_VALUE from './indicator_value'
import INDICATOR_DESCRIPTION from './indicator_description'
//import TR_FIGURE from './tf_figure'

import app_config from '../app_config'

const { data_config } = app_config

function INDICATOR_ROW(props) {
  const {
    mid_text = "av",
    data,
    treatment_unit_name = [],
    med_field_class = "",
    show_level_filter = "",
    selected_row, 
    update_selected_row ,
    colspan 
  } = props
 
  const description = data.description[0]
  const indcator_title = description.title
  const indicator_drescription = description.short_description
  const level_direction = description[data_config.column.level_direction] === 0 ?
    "<" :">"
  const level_green = description[data_config.column.level_green]
  const high_achivment_text = level_green !== null ?
    `Høy måloppnåelse: ${level_direction} ${level_green*100}%` :  ""
  const tr_indicator_class = `${description[data_config.column.id]} 
    ${description[data_config.column.registry_short_name]}`
  
  const indicator_val = treatment_unit_name.map((tr_unit, index) => {
    const ind_per_unit =data.agg_data.filtered_by_year.filter(
      data => data[data_config.column.treatment_unit] === tr_unit
    ) 
    if (ind_per_unit.length < 1){
      return <td
        key = {`${description[data_config.column.id]}_${tr_unit}_${index}_su`}
        className = "selected_unit">
      </td>
    } else {
      
      const indicator_value =
        description[data_config.column.indicator_type] === data_config.indicator_type.andel.db ?
        `${Math.round(ind_per_unit[0][data_config.column.variable] * 100)}%` :
        `${ind_per_unit[0][data_config.column.variable]}`
      const denominator = ind_per_unit[0][data_config.column.denominator]
      const numerator = Math.round(ind_per_unit[0][data_config.column.variable] * denominator)

      const icon_class = ind_per_unit[0][data_config.column.achieved_level] === "H" ?
       "fa fa-fas fa-circle": 
        ind_per_unit[0][data_config.column.achieved_level] === "M" ? 
        "fa fa-fas fa-adjust":
        ind_per_unit[0][data_config.column.achieved_level] === "L" ?
         "fa fa-circle-o" :
        ""
      const level_class =  ind_per_unit[0][data_config.column.achieved_level] !== show_level_filter && show_level_filter !== null?
        "filtered_level":""
     return <INDICATOR_VALUE
      key = {`${description[data_config.column.id]}_${tr_unit}_${index}_su`}
        td_class = {`selected_unit ${level_class}`}
        indicator_value = {indicator_value} 
        icon_class = {icon_class}
        share_of_totla = {numerator}
        mid_text = {mid_text}
        total = {denominator}
      />;
    }
  })
  
  const indicator_value_nation =
    description[data_config.column.indicator_type] === data_config.indicator_type.andel.db ?
    `${Math.round(data.agg_data.nation.filtered_by_year[0][data_config.column.variable] * 100)}%` :
    `${data.agg_data.nation.filtered_by_year[0][data_config.column.variable]}`
  const denominator_nation = data.agg_data.nation.filtered_by_year[0][data_config.column.denominator]
  const numerator_nation = Math.round(data.agg_data.nation.filtered_by_year[0][data_config.column.variable] * denominator_nation)

      const icon_class_nation = data.agg_data.nation.filtered_by_year[0][data_config.column.achieved_level] === "H" ?
       "fa fa-fas fa-circle": 
        data.agg_data.nation.filtered_by_year[0][data_config.column.achieved_level] === "M" ? 
        "fa fa-fas fa-adjust":
        data.agg_data.nation.filtered_by_year[0][data_config.column.achieved_level] === "L" ?
         "fa fa-circle-o" :
      ""
  const level_class =  data.agg_data.nation.filtered_by_year[0][data_config.column.achieved_level] !==
    show_level_filter && show_level_filter !== null ?
    "filtered_level":""
  
  const tr_fig = null/* selected_row === description[data_config.column.id] ?
   <TR_FIGURE
    colspan = {colspan}
    data ={data}
    figure_class = {med_field_class}
    update_selected_row = {update_selected_row}
  /> : null*/

  const tr_click_handler = ()=> {
    if (selected_row === description[data_config.column.id] ){
      update_selected_row("")
    }else{
      update_selected_row(description[data_config.column.id])
    }
  }

  return(
    <>
      <tr
        onClick = {()=>tr_click_handler()} 
        id= {`${tr_indicator_class}`} 
        className = {`${tr_indicator_class} ${med_field_class} indicator`}
      >
        <INDICATOR_DESCRIPTION
          title = {indcator_title}
          short_description = {indicator_drescription} 
          high_achivment_text = {high_achivment_text}
        />
        {indicator_val}
        <INDICATOR_VALUE
          key = {``}
          td_class = {`nationally ${level_class}`}
          indicator_value = {indicator_value_nation} 
          icon_class = {icon_class_nation}
          share_of_totla = {numerator_nation}
          mid_text = {mid_text}
          total = {denominator_nation}
        />
      </tr>
      {tr_fig}
    </>
  )
}

export default INDICATOR_ROW;