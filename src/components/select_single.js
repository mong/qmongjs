import  React from 'react'
import Select from 'react-select'


function SELECT_SINGLE(props) {
  const {
    opts = [],
    select_className = "pick_year",
    update_year
  } = props
  
  let selection_options = opts.map(opt =>{ return {value :opt , label: opt}; })
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