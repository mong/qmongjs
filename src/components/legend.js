import React , { useRef, useEffect, useState }from 'react'
import LEGEND_BTN from './legend_btn'
import useResizeObserver from './utils'

function LEGEND(props) {
  const {
    app_text= {indicators: {high: {text: "Høy måloppnåelse", icon: "fa fa-fas fa-circle" }}},
    update_show_level_filter,
    show_level_filter
  } = props
  const legend_ref = useRef()
  const dim = useResizeObserver(legend_ref)
  const [offset_top, update_offset_top] = useState("")
  useEffect(()=>{
    const top = dim ? `${dim.target.previousSibling.offsetHeight}px` : ""
    update_offset_top(top)
  },[dim, legend_ref])

  const legend_btns = Object.keys(app_text.indicators).map(
    function(level){
      return(
        <LEGEND_BTN
          update_show_level_filter = {update_show_level_filter}
          show_level_filter = {show_level_filter}
          key = {`${level}_legend_btn`} 
          icon_class={this[level].icon}
          level = {this[level].text}
          legend_btn_class = {level}
        />
      );
    },
  app_text.indicators)


  const style = {top: offset_top}
  
  return (
    <div 
      className = "table_legend"
      ref = {legend_ref}
      style= {style}
    >
      {legend_btns}
    </div>
  );
}

export default LEGEND;