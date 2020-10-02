import React from 'react'


function INDICATOR_VALUE(props) {
  const {
    td_class = "selected_unit",
    indicator_value = "65%", 
    icon_class = "fa fa-circle-o",
    share_of_totla = 1500,
    mid_text = "av",
    total = 2000
  } = props

  return (
    <td className = {td_class}>
      <div className="level">
        <h4 >{`${indicator_value} `}<i className={icon_class}></i></h4>
      </div>
      <div className="summary">{`${share_of_totla} ${mid_text} ${total}`}</div>
    </td>
    
  );
}

export default INDICATOR_VALUE;