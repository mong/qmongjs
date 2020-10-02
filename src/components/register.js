import React from 'react'
import INDICATOR_ROW from './indicator_row'
import REGISTER_NAME from './register_name'
import app_config from '../app_config'

const { data_config } = app_config


function REGISTER(props) {
  const {
    register_sname = "hjerte",
    colspan = 4,
    tr_register_name_class = "register-row",
    data,
    treatment_unit_name,
    med_field_filter,
    show_level_filter,
    selected_row,
    update_selected_row,
  } = props

 
  const med_field_class = med_field_filter.includes(register_sname) ? '' : 'filter_med_field' 
  const register_name =  [...new Set ( 
    data.description.map(d=> d[data_config.column.registry_full_name]) 
  )]
  const ind_id =  [...new Set ( 
    data.agg_data.filtered_by_year.map(d=> d[data_config.column.indicator_id]) 
  )]

  const indicator_row = ind_id.map(
    indicator => {
      const agg_data = {}
      const nation = {}
      agg_data.filtered_by_year = data.agg_data.filtered_by_year.filter(
        d => d[data_config.column.indicator_id] === indicator
      ) 
      agg_data.filtered_by_unit = data.agg_data.filtered_by_unit.filter(
        d => d[data_config.column.indicator_id] === indicator
      ) 
      nation.filtered_by_year = data.agg_data.nation.filtered_by_year.filter(
        d => d[data_config.column.indicator_id] === indicator
      )
      const description = data.description.filter(
        d => d[data_config.column.id] === indicator
      )
      nation.filtered_by_unit = data.agg_data.nation.filtered_by_unit.filter(
        d => d[data_config.column.indicator_id] === indicator
      )
      agg_data.nation = nation
      return <INDICATOR_ROW
        data = {{agg_data, description}}
        key = {indicator} 
        treatment_unit_name = {treatment_unit_name }
        med_field_class = {med_field_class}
        show_level_filter = {show_level_filter}
        colspan = {colspan}
        selected_row = {selected_row} 
        update_selected_row = {update_selected_row}
      />;
    })
   
  return(
    <>
      <REGISTER_NAME
        register_name = {register_name}
        colspan = {colspan}
        tr_register_name_class = {`${tr_register_name_class} ${register_sname} ${med_field_class}`}      
      />
      {indicator_row}
    </>
  )
}

export default REGISTER;