import { responsiv_bar_chart } from './bar_chart.js'
import { responsiv_line_chart } from './line_chart.js'
import { app_config as config } from './app_config.js'

const render_bar_chart = function (figure_container, figure_data, selected_year, levels) {
  responsiv_bar_chart(
    figure_container,
    figure_data.filter((elem) => selected_year.includes(elem[config.column.year])),
    {
      width: figure_container.clientWidth,
      height: 0.5 * figure_container.clientWidth,
      margin: { top: 0.05, left: 0.25, bottom: 0.15, right: 0.15 }
    },
    levels
  )
}

const render_line_chart = function (figure_container, figure_data, levels) {
  responsiv_line_chart(figure_container, figure_data, {
      width: figure_container.clientWidth,
      height: 0.5 * figure_container.clientWidth,
      margin: { top: 0.05, left: 0.1, bottom: 0.15, right: 0.2 }
    },
    levels
  )
}

export const add_tr_figure = function(added_td, figure_data, selected_year, levels) {
  let svg_container = document.createElement('div')
  svg_container.setAttribute('class', 'responsive_svg')
  added_td.appendChild(svg_container);
  
  let bar = document.getElementById('table_bar')
  let line = document.getElementById('table_line')

  if (bar.checked) {
    render_bar_chart(svg_container, figure_data, selected_year, levels);
    window.onresize =function(){
       render_bar_chart(svg_container, figure_data, selected_year, levels);
    }
  } else if (line.checked){
    render_line_chart(svg_container, figure_data, levels);
    window.onresize = function(){
      render_line_chart(svg_container, figure_data, levels);
    }
  }
  let figure_elemnts;
  bar.addEventListener("click",e => {
    if (document.getElementById("table_bar").checked ) {
      figure_elemnts = svg_container.childElementCount;
      for (let i = 0; i < figure_elemnts; i++){ 
      svg_container.removeChild(svg_container.childNodes[0]);
    }
      render_bar_chart(svg_container, figure_data, selected_year, levels);
      window.onresize = function () {
        render_bar_chart(svg_container, figure_data, selected_year, levels);
      } 
    }
  });
  line.addEventListener("click",e => {
    if (document.getElementById("table_line").checked ) {
      figure_elemnts = svg_container.childElementCount;
      for (let i = 0; i < figure_elemnts; i++){ 
        svg_container.removeChild(svg_container.childNodes[0]);
      }
      render_line_chart(svg_container, figure_data, levels);
      window.onresize = function () {
        render_line_chart(svg_container, figure_data, levels)
      }
    }
  });
}