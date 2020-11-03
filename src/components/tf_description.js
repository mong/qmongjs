import React, { useState } from 'react'

const LONG_DESCRIPTION= (props) => {
  const {
    description_title = "Om kvalitetsindikatoren",
    description_text = "Denne kvalitetsindikatoren er definert som andel pasienter med akutt hoftebrudd som ble operert innen 24 timer etter bruddtidspunktet. "
  } = props
  const [content_status, set_content_status] = useState("inactive")
  const desc_click_handler = (content_status, set_content_status) => {
    const cur_status = content_status === "" ? "inactive" : ""
    set_content_status(cur_status)
  }

  return(
    <div className="description-container" >
      <div className = {`description_title_container`} onClick={() => desc_click_handler(content_status, set_content_status) }>
        <h4>{description_title}</h4>
        <i className = {`fa ${content_status ==="" ? "fa-angle-up" : "fa-angle-down"} `}></i>
      </div>
      <p className= {`description_content ${content_status}`}>{description_text}</p>
    </div>
  );
}

export default LONG_DESCRIPTION;
