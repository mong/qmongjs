import React from 'react'


function INDICATOR_DESCRIPTION(props) {
  const {
    title = "This is the title",
    short_description = "This is the short description of the app",
    level_direction = 0,
    level_green = "",
  } = props
  const LEVEL_TEXT = level_green === null ? "" :
    level_direction === 1 ? <h4>ØNSKET MÅLNIVÅ: &#8805; {level_green} </h4> :
    <h4>ØNSKET MÅLNIVÅ: &#8804; {level_green} </h4>
    
  return (
    <td className = "quality_indicator" >
      <div className="quality_indicator_name"><h1>{title}</h1></div>
      <div className="qi_long_description"><p>{short_description}</p></div>
      <div className="desired_target_level">
        {LEVEL_TEXT}
      </div>
    </td>
    
  );
}

export default INDICATOR_DESCRIPTION;