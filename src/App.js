import React, { useState, useRef, useEffect } from 'react'

import MAIN from './components/main_component';
import HEADER from './components/header_main'
import SELECT_MULTI from './components/select_multi'
import SELECT_SINGLE from './components/select_single'
import  TU_LIST from './components/tu_list'

import config from './app_config'
import { nest_tu_names} from './data/filter_year_unit'
import useResizeObserver from './components/utils'
import { filter_year_unit} from './data/filter_year_unit'

const {med_field, app_text, data_config}= config

function APP(props){
  //data as state
  const [indicator_hosp, update_hosp] =  useState(window.indicator_hosp ? window.indicator_hosp : [] ) 
  const [indicator_hf, update_hf] = useState(window.indicator_hf ? window.indicator_hf : [] ) 
  const [indicator_rhf, update_rhf]= useState(window.indicator_rhf ? window.indicator_rhf : [] ) 
  const [indicator_nation, update_nation] =useState(window.indicator_nat ? window.indicator_nat : [] ) 
  const [description, update_description] = useState(window.description ? window.description : [] ) 
  const [tu_names, update_tu_names] = useState(window.tu_names ? window.tu_names : [] ) 
  //update data as it arrives
  if (typeof(window.Shiny) !== "undefined"){
    window.Shiny.addCustomMessageHandler("tu_names",
      function(message) {update_tu_names((message));
    });
    window.Shiny.addCustomMessageHandler("description",
      function(message) {update_description(message);
    });
    window.Shiny.addCustomMessageHandler("nation",
      function(message) {update_nation(message);
    });
    window.Shiny.addCustomMessageHandler("hospital",
      function(message) {update_hosp(message);
    });
    window.Shiny.addCustomMessageHandler("hf",
      function(message) {update_hf(message);
    });
    window.Shiny.addCustomMessageHandler("rhf",
      function(message) {update_rhf(message);
    });
  } 

  //states
  const [treatment_units, update_treatment_units] = useState([])
  const [selected_year, update_selected_year] = useState(2019)
  const [selected_row, update_selected_row] = useState(null)
  const [selection_bar_height, update_selection_bar_height] = useState(null)
  const [legend_height, update_legend_height] = useState(null)
  
  const opts_hosp = [...new Set ( indicator_hosp.map(d=>d.unit_name))].sort().map(opt =>{ return {value :opt , label: opt}; })
  const opts_hf = [...new Set ( indicator_hf.map(d=>d.unit_name))].sort().map(opt =>{ return {value :opt , label: opt}; })
  const opts_rhf = [...new Set ( indicator_rhf.map(d=>d.unit_name))].sort().map(opt =>{ return {value :opt , label: opt}; })
  const opts_tu = [{label:"Sykehus", options:opts_hosp},{label: "HF", options: opts_hf},{label: "RHF", options: opts_rhf}]
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

  const tu_structure = nest_tu_names(tu_names)

  //height of the selection bar
  const selection_bar_ref = useRef()
  const selection_bar_dim = useResizeObserver(selection_bar_ref)
  useEffect(()=>{
    const top = selection_bar_dim ? selection_bar_dim.target.offsetHeight : ""
    update_selection_bar_height(top)
  },[selection_bar_dim, selection_bar_ref])

  
  return(
    <div className = "app-container">
      <HEADER />
      <div className="app-body">
        <div className = "selection-container" ref = {selection_bar_ref}>
          <div className = "treatment-unit-selection">
            <SELECT_MULTI 
              opts ={opts_tu}
              update_tu = {update_treatment_units}
              treatment_unit={treatment_units}
              selected_row = {selected_row} 
              update_selected_row = {update_selected_row}
            />
            <TU_LIST
              tu_structure  = {tu_structure }
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
          selection_bar_height = {selection_bar_height} 
          legend_height = {legend_height}
          update_legend_height = {update_legend_height}
        />
      </div>
    </div>
  );
}

export default APP;

