import React, {useState} from 'react'

import TU_LIST_HEADER from './tu_list_header'
import TU_LIST_BODY from './tu_list_body'


const TU_LIST = (props) => {
  const {
    tu_structure,
    treatment_units,
    update_treatment_units 
  } = props
  
  const [tu_list_display, update_tu_list_display] = useState("none")
  const style_tu_list = {display: tu_list_display}
  const tu_str_elm = tu_structure.map(element =>{
  
    return(
     <TU_LIST_BODY
      key = {`rhf_${element.rhf}`}
      treatment_units = {treatment_units}
      update_treatment_units = {update_treatment_units}
      tu_names = {element}/>
     );
  })

  return(
    <>
      <div className = "hospital_list_btn_container">
        <button
         className = "hospital_list_btn"
          onClick = {()=>update_tu_list_display("")}
        >
          Vis alle
        </button>
      </div>
      <div style = { style_tu_list } className = "tu_list">
        <TU_LIST_HEADER />
        <div className ="all_tu"> 
          {tu_str_elm}
        </div>
        <button
          onClick = {()=>update_tu_list_display("none")}
          className="tu_list_close_btn"
           >
          <i className="far fa-times-circle"></i>
        </button>

      </div>
    </>
  );
}

export default TU_LIST;
