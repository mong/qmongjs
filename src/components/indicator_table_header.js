import React, {useEffect, useRef, useState}  from 'react';
import useResizeObserver from './utils'


function TABLE_HEADER(props) {
  const {
    col_nr = 2,
    indicator_header = "Kvalitetsindikator",
    treatment_unit_name = [],
    national = "Nasjonalt"
  } = props

  const thead_ref = useRef()
  const dim = useResizeObserver(thead_ref)
  const [offset_top, update_offset_top] = useState("")
  useEffect(()=>{
    const legend_elem = dim ? dim.target.parentNode.parentNode.parentNode.parentNode.previousSibling: ""
    const top = dim ? `${legend_elem.offsetTop + legend_elem.offsetHeight}px`: ""
    update_offset_top(top)
  },[dim, thead_ref])
  
  
  const width_desc = col_nr === 2 ? 60 :  col_nr === 3 ? 50 : 40 
  const width_tu = (100 - width_desc) /(col_nr - 1) 
  const style_ind_desc= {width: `${width_desc}%`,top: offset_top }
  const style_treatment_units= {width: `${width_tu}%`, top: offset_top}
  
  let treatment_unit_th = treatment_unit_name.map(
    tu => <th className="selected_unit" style = {style_treatment_units}  key = {tu}> {tu}</th>
  ) 

  return (
    <thead >
      <tr ref = {thead_ref} >
        <th key = "kvind_header" className="quality_indicator" style={style_ind_desc}>{indicator_header}</th>
        {treatment_unit_th}
        <th  className="nationally" style = {style_treatment_units} key = "nat_header">{national}</th>
      </tr>
    </thead>
  );
}

export default TABLE_HEADER;