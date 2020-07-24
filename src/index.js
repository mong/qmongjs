import { responsiv_bar_chart } from './bar_chart'
import { responsiv_line_chart } from './line_chart'

// function that returns the tr based on a childElement of tr
// can be used to find  tr that was clicked.
var tr_class_name = function (clicked_element) {
  if (clicked_element.nodeName === 'TR') {
    return clicked_element
  } else if (clicked_element.parentElement.nodeName !== 'BODY') {
    return tr_class_name(clicked_element.parentElement)
  } else {
    return 'BODY'
  }
}

// the Radio buttons that control the type of figure that will be shown in the table
const add_figure_buttons = function (container_class, button_object) {
  let button_container = document.createElement('div')
  button_container.className = container_class
  button_object.forEach(function (array_input) {
    let input = document.createElement('input')
    input.type = array_input.type
    input.value = array_input.value
    input.id = array_input.id
    input.name = array_input.name
    input.className = array_input.class_name_inp
    input.checked = array_input.checked

    let label = document.createElement('label')
    label.setAttribute('for', array_input.id)
    label.textContent = array_input.label
    label.className = array_input.class_name_label
    let icon = document.createElement('i')
    icon.className = array_input.icon
    label.appendChild(icon)
    button_container.appendChild(input)
    button_container.appendChild(label)
  })
  return button_container
}

// removes the figure rows when a new tr is checked
const remove_row = function () {
  let rm_element = document.querySelector('.tr_figure')
  if (rm_element !== null) {
    rm_element.parentNode.removeChild(rm_element)
  }
}

// add a row beneath the clicked tr
const add_row = function (clicked_tr) {
  const clicked_indicator = clicked_tr.id
  let selected_treatment_units_element = document
    .getElementById('quality_overview_ui_1-pick_treatment_units')
    .getElementsByTagName('option')
  let selected_treatment_units = Array.from(
    selected_treatment_units_element
  ).map((elem) => elem.value)
  let selected_year_element = document
    .getElementById('quality_overview_ui_1-pick_year')
    .getElementsByTagName('option')
  let selected_year = Array.from(selected_year_element).map((elem) =>
    Number(elem.value)
  )
  let figure_data = indicator_hosp.filter((elem) => {
    elem.treatment_unit = elem.SykehusNavn
    return (
      elem.KvalIndID === clicked_indicator &&
      selected_treatment_units.includes(elem.SykehusNavn) &&
      elem.count > 5
    )
  })
  figure_data.push(
    indicator_hf.filter((elem) => {
      elem.treatment_unit = elem.Hfkortnavn
      return (
        elem.KvalIndID === clicked_indicator &&
        selected_treatment_units.includes(elem.Hfkortnavn) &&
        elem.count > 5
      )
    })
  )
  figure_data.push(
    indicator_rhf.filter((elem) => {
      elem.treatment_unit = elem.RHF
      return (
        elem.KvalIndID === clicked_indicator &&
        selected_treatment_units.includes(elem.RHF) &&
        elem.count > 5
      )
    })
  )
  figure_data.push(
    indicator_nat.filter((elem) => {
      elem.treatment_unit = 'Nasjonalt'
      return elem.KvalIndID === clicked_indicator
    })
  )
  figure_data = figure_data.flat()

  const render_bar_chart = function () {
    responsiv_bar_chart(
      figure_container,
      figure_data.filter((elem) => selected_year.includes(elem.Aar)),
      {
        width: svg_container.clientWidth,
        height: 0.5 * svg_container.clientWidth,
        margin: { top: 0.05, left: 0.25, bottom: 0.15, right: 0.15 }
      }
    )
  }

  const render_line_chart = function () {
    responsiv_line_chart(figure_container, figure_data, {
      width: document.querySelector('.responsive_svg').clientWidth,
      height: 0.5 * document.querySelector('.responsive_svg').clientWidth,
      margin: { top: 0.05, left: 0.1, bottom: 0.15, right: 0.2 }
    })
  }

  const new_row_index = clicked_tr.rowIndex + 1
  current_fig_row = clicked_tr.id
  const added_row = clicked_tr.parentElement.parentElement.insertRow(
    new_row_index
  )
  added_row.className = 'tr_figure'
  const added_td = added_row.appendChild(document.createElement('td'))
  added_td.setAttribute('colspan', clicked_tr.childElementCount)

  added_td.appendChild(add_figure_buttons('tr_figure_button', button_object))

  let figure_container = document.createElement('div')
  figure_container.setAttribute('class', 'responsive_svg')
  added_td.appendChild(figure_container)

  let bar = document.getElementById('table_bar')
  let line = document.getElementById('table_line')
  let svg_container = document.querySelector('.responsive_svg')

  if (bar.checked) {
    render_bar_chart()
    window.addEventListener('resize', render_bar_chart)
  } else if (line.checked) {
    render_line_chart()
    window.addEventListener('resize', render_line_chart)
  }

  bar.addEventListener('click', (e) => {
    if (document.getElementById('table_bar').checked) {
      var figure_elemnts = svg_container.childElementCount
      
      for (let i = 0; i < figure_elemnts; i++) {
        svg_container.removeChild(svg_container.childNodes[0])
      }
      window.removeEventListener('resize', render_line_chart)
      render_bar_chart()
      window.addEventListener('resize', render_bar_chart)
    }
  })

  line.addEventListener('click', (e) => {
    if (document.getElementById('table_line').checked) {
      let figure_elemnts = svg_container.childElementCount
      for (let i = 0; i < figure_elemnts; i++) {
        svg_container.removeChild(svg_container.childNodes[0])
      }
      window.removeEventListener('resize', render_bar_chart)
      render_line_chart()
      window.addEventListener('resize', render_line_chart)
    }
  })

  // indicator description
  let long_description_container = document.createElement('div')
  long_description_container.setAttribute('style', 'font-family:arial;')
  const long_description_title_cointainer = document.createElement('div')
  long_description_title_cointainer.setAttribute(
    'class',
    'long_description_title'
  )
  long_description_title_cointainer.setAttribute(
    'style',
    'display:flex;align-items:center;justify-content:flex-start;width:80%;cursor:pointer;'
  )
  let long_description_title = document.createElement('h4')
  long_description_title.innerText = 'Om kvalitetsindikatoren'
  long_description_title.setAttribute(
    'style',
    'margin:10px 50px;text-align:start;'
  )
  let arrow_down_icon = document.createElement('i')
  arrow_down_icon.setAttribute('class', 'fas fa-angle-down')

  long_description_title_cointainer.appendChild(long_description_title)
  long_description_title_cointainer.appendChild(arrow_down_icon)
  long_description_container.appendChild(long_description_title_cointainer)

  let long_description = document.createElement('p')
  long_description.setAttribute('class', 'long_description')
  let long_description_text =
    description.filter((d) => d.IndID === clicked_indicator)[0]
      .BeskrivelseLang === null
      ? description.filter((d) => d.IndID === clicked_indicator)[0]
        .BeskrivelseKort
      : description.filter((d) => d.IndID === clicked_indicator)[0]
        .BeskrivelseLang

  long_description.innerText = long_description_text
  long_description.setAttribute(
    'style',
    'transition: max-height  0.2s ease-out ;margin-left:70px; margin-top: 0;width:80%; text-align:justify; max-height:0px; overflow:hidden;'
  )

  long_description_container.appendChild(long_description)
  added_td.appendChild(long_description_container)

  long_description_title_cointainer.addEventListener('click', (e) => {
    if (
      document.querySelector('.long_description_title i').className ===
      'fas fa-angle-down'
    ) {
      document.querySelector('.long_description').style.maxHeight =
        document.querySelector('.long_description').scrollHeight + 'px'
      document.querySelector('.long_description_title i').className =
        'fas fa-angle-up'
    } else if (
      document.querySelector('.long_description_title i').className ===
      'fas fa-angle-up'
    ) {
      document.querySelector('.long_description').style.maxHeight = 0
      document.querySelector('.long_description_title i').className =
        'fas fa-angle-down'
    }
  })
}

let qi_table = document.querySelector('#quality_overview_ui_1-qi_table')
let current_fig_row = ''
let button_object = [
  {
    class_name_inp: 'figure_button figure_button_left',
    type: 'Radio',
    id: 'table_bar',
    name: 'table_figure_button',
    value: 'bar',
    icon: 'fa fa-bar-chart',
    label: 'Søyle',
    class_name_label: 'figure_button_label',
    checked: true
  },
  {
    class_name_inp: 'figure_button figure_button_right',
    type: 'Radio',
    id: 'table_line',
    name: 'table_figure_button',
    value: 'line',
    icon: 'fa fa-line-chart',
    label: 'Linje',
    class_name_label: 'figure_button_label',
    checked: false
  }
]

qi_table.addEventListener('click', function (e) {
  var clicked_tr = tr_class_name(e.target)
  var new_row_index
  var added_row
  var added_td
  if (clicked_tr.className === 'indicator') {
    if (current_fig_row === '') {
      add_row(clicked_tr)
    } else if (current_fig_row === clicked_tr.id) {
      remove_row()
      current_fig_row = ''
    } else {
      remove_row()
      add_row(clicked_tr)
    }
  }
})
