import React from 'react'
import HEADER_LOGO_NSM from './header_logo_nsm'
import HEADER_LOGO_SKDE from './header_logo_skde'
import HEADER_TEXT from './header_text'

const HEADER = () => {
  const style = {
    backgroundImage:"linear-gradient(-270deg, #A2CFD6 0%, #7EBEC7 100%)",
    padding: "1rem 0 0 1rem", 
    color: "#2D3034",
    display: "flex",
    flexDirection: "column"
  }
  return(
    <div style = {style}>
      <div style= {{display:"flex", justifyContent: "space-between"}}>
        <div style={{ width: "230px" }}>
          <a href= "http://skde.no/"> <HEADER_LOGO_SKDE /></a> 
        </div>
        <div style={{width: "230px"}}> 
          <a href= "https://www.kvalitetsregistre.no/"> <HEADER_LOGO_NSM /></a>
        </div>
      </div>
      <div style={{color:"white", fontSize:"2.8rem", padding: "0 0 10px 17%"}}>
        <HEADER_TEXT />
      </div>
    </div>    
  )
} 

export default HEADER;