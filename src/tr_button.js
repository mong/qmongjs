// the Radio buttons that control the type of figure that will be shown in the table
export const add_figure_buttons = function (container_class, button_object) {
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

//figure button properties
export let button_object = [
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
