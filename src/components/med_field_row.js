import React  from 'react';

function MED_FIELD_ROW(props) {
  const {
    med_field_name= "Hjerte- og karsykdommer",
    nr_indicators = 10,
    update_med_field_filter,
    update_clicked_med_field,
    clicked_med_field
  } = props
 
  const class_checked = clicked_med_field === med_field_name.react_key ? "checked" : ""
  const handle_med_field_click =()=>{
    update_clicked_med_field(med_field_name.react_key)
    update_med_field_filter(med_field_name.key)
  }

  return (
  <li className = {`med_field ${class_checked} med_field_${med_field_name.react_key}`} >
    <button className = "med_field_text" onClick = {()=> handle_med_field_click() } >
      {med_field_name.name.toUpperCase()}
      <div className="med_field_nrind">{nr_indicators}</div>
    </button>
  </li>
  );
}

export default MED_FIELD_ROW;
