import { add_row } from './add_figure_row.js'
import { fixed_header } from './fixed_header.js'
import { clicked_tr as tr_class_name } from './tr_utils.js'

let qi_table = document.querySelector('#quality_overview_ui_1-qi_table');
qi_table.addEventListener('click', function (e) {
  let clicked_tr = tr_class_name(e.target);  
  if (clicked_tr.className === 'indicator') {
    let tr_figure = document.querySelector('.tr_figure'); 
    if (tr_figure === null) {
      add_row(clicked_tr);
    }else if(clicked_tr.id === tr_figure.previousElementSibling.id) {
      tr_figure.parentNode.removeChild(tr_figure);
    } else {
      tr_figure.parentNode.removeChild(tr_figure);
      add_row(clicked_tr);
    }
  }
})

fixed_header();

