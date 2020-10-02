import  React from 'react'
import Select from 'react-select'


function SELECT_MULTI(props) {
  const {
    opts = [],
    select_className = "pick_treatment_unit",
    placeholder = <div><i className = "fas fa-search"></i> Behandlingsenheter </div>,
    update_tu,
    treatment_unit
  } = props
  
  let selection_options = opts//.map(opt =>{ return {value :opt , label: opt}; })

  const customStyles = {
    menu: (provided)=>({
      ...provided,
      zIndex: 3
    }),
    option: (provided) => ({
      ...provided,
    }),
    control:(provided)=>({
      ...provided,
    })/*,
    singleValue: (provided) => {
      const transition = 'opacity 300ms';
      return { ...provided, transition };
    }*/
  }
  const value_tu = treatment_unit.map(tu=>{return { value: tu, label: tu }})
  const handle_input_change =(e)=>{
    const tu = e !== null ? e.map(e=>e.value) : []
    update_tu(tu)
  }
 
  return(
    <form >  
      <Select 
        className = {select_className}
        options = {selection_options}
        placeholder = {placeholder}
        closeMenuOnSelect = {false}
        value = {value_tu}
        isSearchable
        isMulti = {true}
        onChange={(e)=>handle_input_change(e)}
        styles={customStyles}
        menuIsOpen = {treatment_unit.length < 4 ? undefined :false}
      /> 
    </form>
  );

}

export default SELECT_MULTI;