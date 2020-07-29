// indicator description


export const add_tr_indicator_description =  function(description ) {
  const description_text = description.BeskrivelseLang === null ? 
    description.BeskrivelseKort :
    description.BeskrivelseLang
  const desc_title = 'Om kvalitetsindikatoren';
  
  let description_container = document.createElement('div')
  description_container.setAttribute('class', 'description-container')
  const description_title_cointainer = document.createElement('div')
  description_title_cointainer.setAttribute(
    'class',
    'description_title_container'
  )
 
  let description_title = document.createElement('h4')
  description_title.innerText = desc_title;

  let arrow_down_icon = document.createElement('i')
  arrow_down_icon.setAttribute('class', 'fas fa-angle-down')
 
  description_title_cointainer.appendChild(description_title)
  description_title_cointainer.appendChild(arrow_down_icon)
  description_container.appendChild(description_title_cointainer)
  
  let description_content = document.createElement('p')
  description_content.setAttribute('class', 'description_content')
    
  description_content.innerText = description_text

  description_container.appendChild(description_content)
  
  
  description_title_cointainer.addEventListener('click', (e) => {
    let desc_title_icon_class = document.querySelector('.description_title_container i').className
    if (desc_title_icon_class === 'fas fa-angle-down' ) {
      document.querySelector('.description_content').style.maxHeight =
      document.querySelector('.description_content').scrollHeight + 'px'
      document.querySelector('.description_title_container i').className =
      'fas fa-angle-up'
    } else if ( desc_title_icon_class=== 'fas fa-angle-up' ) {
      document.querySelector('.description_content').style.maxHeight = 0
      document.querySelector('.description_title_container i').className =
      'fas fa-angle-down'
    }
  })
  return description_container;
}