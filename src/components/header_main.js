import React from 'react'
import HEADER_LOGO_NSM from './header_logo_nsm'
import HEADER_LOGO_SKDE from './header_logo_skde'
import HEADER_TEXT from './header_text'

const HEADER = () => {
  const style = {backgroundImage:"linear-gradient(-270deg, #A2CFD6 0%, #7EBEC7 100%)", padding: "1rem",  color: "#2D3034"}
  return(
  
    <div style = {style}>
      <div style= {{display:"flex", justifyContent: "space-between"}}>
        <div style={{ width: "250px" }}> <HEADER_LOGO_SKDE /> </div>
        <div style={{maxWidth: "200px"}}> <HEADER_LOGO_NSM /> </div>
      </div>
      <div style={{fontSize: "1.3rem", color:"white", fontSize:"2.8rem", lineHeight:"1.5", position: "relative", top: "-120px", padding: "0 0 0 25%", maxHeight:"20px"}}>
          <HEADER_TEXT />
      </div>
    </div>
     
    
  )
} 

export default HEADER;