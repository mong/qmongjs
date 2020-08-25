import {
  remove_row,
  zoom_in_line,
  zoom_out_line,
  zoom_in_bar,
  zoom_out_bar
} from './tr_utils.js'
import {  selectAll } from 'd3'


const level_handler = function (){
  const level_button = document.querySelector(".dropdown_container .dd-level")
  if (level_button.innerText === "Vis målnivå") {
    level_button.innerText = "Skjul målnivå"
    selectAll("svg .level").style("visibility", "visible")
  } else {
    level_button.innerText = "Vis målnivå"
    selectAll("svg .level").style("visibility", "hidden")
  } 
}

const zoom_handler = function (){
  const zoom_button = document.querySelector(".dropdown_container .dd-zoom")
  let bar = document.getElementById('table_bar')
  let line = document.getElementById('table_line')
  if (zoom_button.innerText === "Zoom inn") {
    zoom_button.innerText = "Zoom ut"
    bar.checked ?
    zoom_in_bar() : zoom_in_line()
  } else {
    zoom_button.innerText = "Zoom inn"
    bar.checked ?
    zoom_out_bar() : zoom_out_line()
  } 
}

export const dropdown_menu = function (){
  const dorpdown_entries =  [
    {label : "Vis målnivå", click : () => level_handler(), class : "dd-level"},
    {label : "Zoom ut", click : () => zoom_handler(), class : "dd-zoom"},
    {label : "Lukk", click : () => remove_row(), class : "dd-close"}
  ]
  const menu_container = document.createElement("div")
  menu_container.setAttribute("class","table_dd_menu_container")

  const dropdown_button = document.createElement("button")
  dropdown_button.setAttribute("class","table_dd_button")
  dropdown_button.innerHTML = `<i class='fas fa-bars'></i>`

  dropdown_button.onclick = () => {
    let dd_container = document.querySelector(".dropdown_container") 
    dd_container.style.maxHeight === "" || dd_container.style.maxHeight === "0px" ?
    document.getElementById("table_dd_container").
      setAttribute("style",`max-height:${dd_container.scrollHeight}px;`) :
      document.getElementById("table_dd_container").
      setAttribute("style","max-height:0;")
  }
  let mouse_leave_dd_cont_timeout
  menu_container.onmouseleave = () => {
    mouse_leave_dd_cont_timeout = setTimeout(function(){
      document.getElementById("table_dd_container").
      setAttribute("style","max-height:0;")
    },
    1000
    )
  }

  menu_container.onmouseover = () => {
    let max_height = document.getElementById("table_dd_container").style.maxHeight
    clearTimeout(mouse_leave_dd_cont_timeout) 
    document.getElementById("table_dd_container").
    setAttribute("style",`max-height: ${max_height};`)
  }

  const dropdown_container = document.createElement("div")
  dropdown_container.setAttribute("class", "dropdown_container")
  dropdown_container.setAttribute("id", "table_dd_container")
  const dropdown_ul = document.createElement("ul")
  dropdown_ul.setAttribute("class", "dropdown_ul")
  dropdown_container.appendChild(dropdown_ul)
  dorpdown_entries.forEach(entry => {
    
    let dropdown_li = document.createElement("li")
    dropdown_li.innerHTML = `<div class = ${entry.class}  > ${entry.label} </div>`
    dropdown_li.onclick = entry.click
    dropdown_ul.appendChild(dropdown_li)
  })

  menu_container.appendChild(dropdown_button)
  menu_container.appendChild(dropdown_container)

  return(menu_container);
}