import React from 'react'
import HEADER_LOGO_SKDE from './header_logo_skde'
import HEADER_TEXT from './header_text'

const HEADER = () => {
  const style = {backgroundImage:"linear-gradient(-270deg, #A2CFD6 0%, #7EBEC7 100%)", padding: "1rem",display:"flex", justifyContent : "space-between", alignItems: "center", color: "#2D3034"}
  return(
    <div style = {style}>
      <div style={{margin: "1rem", flex: 1,opacity: "0.3" }}>
        <HEADER_LOGO_SKDE />
      </div>
      <div style={{margin: "1rem 2rem", flex: 4, textAlign: "justify", fontSize: "1.3rem", lineHeight:"1.5"}}>
        <HEADER_TEXT />
      </div>
    </div>
  )
} 

export default HEADER;