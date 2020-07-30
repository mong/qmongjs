import { add_row } from './add_figure_row.js'
import { fixed_header } from './fixed_header'
import {
  clicked_tr as tr_class_name,
  remove_row
} from './tr_utils.js'
import { formatPrefix } from 'd3'

let qi_table = document.querySelector('#quality_overview_ui_1-qi_table')
let current_fig_row = ''
qi_table.addEventListener('click', function (e) {
  var clicked_tr = tr_class_name(e.target)  
  if (clicked_tr.className === 'indicator') {
    if (current_fig_row === '') {
      add_row(clicked_tr)
      current_fig_row = clicked_tr.id
    } else if (current_fig_row === clicked_tr.id) {
      remove_row()
      current_fig_row = ''
    } else {
      remove_row()
      add_row(clicked_tr)
      current_fig_row = clicked_tr.id
    }
  }
})

fixed_header()