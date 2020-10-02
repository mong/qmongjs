import React from 'react'


function INDICATOR_DESCRIPTION(props) {
  const {
    title = "This is the title",
    short_description = "This is the short description of the app",
    high_achivment_text = "Høy måloppnåelse: > 80%" 
  } = props
 
  return (
    <td className = "quality_indicator" >
      <div className="quality_indicator_name"><h1>{title}</h1></div>
      <div className="qi_long_description"><p>{short_description}</p></div>
      <div className="desired_target_level">
        <h4>{high_achivment_text}</h4>
      </div>
    </td>
    
  );
}

export default INDICATOR_DESCRIPTION;