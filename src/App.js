import React, { useState } from 'react'

import MAIN from './components/main_component';
import SELECT_MULTI from './components/select_multi'
import SELECT_SINGLE from './components/select_single'
import  TU_LIST from './components/tu_list'
import config from './app_config'

import { filter_year_unit} from './data/filter_year_unit'

const {med_field, app_text, data_config  }= config



function APP(props){
  const {
    data 
  } = props
  const {
    indicator_hf, indicator_rhf , indicator_hosp, indicator_nation, description
  } = data

  const [treatment_units, update_treatment_units] = useState([])
  const [selected_year, update_selected_year] = useState(2019)
  const [selected_row, update_selected_row] = useState(null)
  
  
  const opts_hosp = [...new Set ( indicator_hosp.map(d=>d.unit_name))].sort().map(opt =>{ return {value :opt , label: opt}; })
  const opts_hf = [...new Set ( indicator_hf.map(d=>d.unit_name))].sort().map(opt =>{ return {value :opt , label: opt}; })
  const opts_rhf = [...new Set ( indicator_rhf.map(d=>d.unit_name))].sort().map(opt =>{ return {value :opt , label: opt}; })
  const opts_tu = [{label: "RHF", options: opts_rhf},{label: "HF", options: opts_hf},{label:"Sykehus", options:opts_hosp} ]
  let opts_year = [2019,2018,2017,2016]

  const input_data = {
    selected_unit: treatment_units,
    selected_year: selected_year
  }

  const agg_data = {};
  const hospital = filter_year_unit(indicator_hosp, input_data)
  const hf = filter_year_unit(indicator_hf, input_data)
  const rhf = filter_year_unit(indicator_rhf, input_data)
  const nation = filter_year_unit(
    indicator_nation,
     {selected_unit: "Nasjonalt", selected_year: selected_year}
  )
 
  const tu_name_hospital = [...new Set ( 
      hospital.filtered_by_year.map(d=>d[data_config.column.treatment_unit])
  )].sort()
  const tu_name_hf = [...new Set ( 
    hf.filtered_by_year.map(d=>d[data_config.column.treatment_unit])
  )].sort()
  const tu_name_rhf = [...new Set ( 
    rhf.filtered_by_year.map(d=>d[data_config.column.treatment_unit])
  )].sort()
  const tu_name = tu_name_hospital.concat(tu_name_hf,tu_name_rhf)
  const colspan= tu_name.length + 2;
  agg_data.nation = nation
  agg_data.filtered_by_unit = hospital.filtered_by_unit.concat(hf.filtered_by_unit, rhf.filtered_by_unit )
  agg_data.filtered_by_year = hospital.filtered_by_year.concat(hf.filtered_by_year, rhf.filtered_by_year )

  const unique_indicators = tu_name.length > 0 ? 
  [...new Set (agg_data.filtered_by_year.map(d=>d[data_config.column.indicator_id]))] :
  [...new Set (agg_data.nation.filtered_by_year.map(d=>d[data_config.column.indicator_id]))]
  const unique_register = [...new Set(med_field.flatMap(entry => entry.key))].map(
    registry => { 
      const ind = description.filter(
      description => description[data_config.column.registry_short_name] === registry && 
        unique_indicators.includes(description[data_config.column.id])
      )
      return {registry_name: registry, number_ind: ind.length, indicators: ind};
    } 
  )
  const ind_per_reg = unique_register
  
  
  return(
    <div className = "app-container">
      <div className = "selection-container">
        <div className = "treatment-unit-selection">
          <SELECT_MULTI 
            opts ={opts_tu}
            update_tu = {update_treatment_units}
            treatment_unit={treatment_units}
            selected_row = {selected_row} 
            update_selected_row = {update_selected_row}
          />
          <TU_LIST
            tu_names = {data.tu_names}
            treatment_units = {treatment_units}
            update_treatment_units = {update_treatment_units}
          />
        </div>
        <div className ="year-selection">
          <SELECT_SINGLE 
            opts ={opts_year}
            update_year = {update_selected_year}
            selected_row = {selected_row} 
            update_selected_row = {update_selected_row}
          />
        </div>
      </div>
      <MAIN
        update_selected_year = {update_selected_year}
        update_treatment_units ={update_treatment_units}
        ind_per_reg = {ind_per_reg}
        treatment_units ={tu_name}
        selected_year={selected_year}
        med_field = {med_field}
        app_text = {app_text}
        colspan = {colspan}
        data = {{agg_data, description}}
        unique_indicators = {unique_indicators}
        selected_row = {selected_row} 
        update_selected_row = {update_selected_row}
      />
    </div>
  );
}

export default APP;

