import  React from 'react'
import Select from 'react-select'


function SELECT_SINGLE(props) {
  const {
    opts = [],
    select_className = "pick_year",
    update_year
  } = props
  
  let selection_options = opts.map(opt =>({value :opt , label: opt}))
  const customStyles = {
    control: (provided, state)=>({
      ...provided,  
      width: "100%",
      backgroundColor: "#00263d",
      boxShadow:  null,
      fontSize: "1rem",
      border: state.isFocused  
        ? "3px solid #7ebec7" 
        : state.isSelected 
        ? "3px solid #EEF6F7" 
        : "3px solid #EEF6F7",
      minHeight: "2rem",
      cursor: "pointer"
    }), 
    input: (provided) => ({
      ...provided,
      color: "#EEF6F7",
    }),
    singleValue:(provided) => ({
      ...provided,
      color: "#EEF6F7"
    }),
    menu: (provided)=>({
      ...provided,
      zIndex: 3
    }),
    option: (provided) => ({
      ...provided
    })
  }
  const handle_input_change =(e)=>{ 
    update_year(e.value)
  }

  return(
    <form >  
      <Select 
        className = {select_className}
        onChange={(e)=>handle_input_change(e)}
        options = {selection_options}
        defaultValue = {selection_options[0]}
        isSearchable
        styles={customStyles}
      /> 
    </form>
  );
}

export default SELECT_SINGLE;
