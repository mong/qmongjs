// function that returns the tr based on a childElement of tr
// can be used to find  tr that was clicked.
export const clicked_tr = function (clicked_element) {
  if (clicked_element.nodeName === 'TR') {
    return clicked_element
  } else if (clicked_element.parentElement.nodeName !== 'BODY') {
    return clicked_tr(clicked_element.parentElement)
  } else {
    return 'BODY'
  }
}

// removes the figure rows when a new tr is checked
export const remove_row = function () {
  let rm_element = document.querySelector('.tr_figure')
  if (rm_element !== null) {
    rm_element.parentNode.removeChild(rm_element)
  }
}


