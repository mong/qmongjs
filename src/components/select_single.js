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
      //borderBottom: '1px dotted pink',
      //width: "50%",
      zIndex: 50
    }),
    option: (provided) => ({
      ...provided,
      //borderBottom: '1px dotted pink',
      //color: 'black'
    }),
    control:(provided)=>({
      ...provided,
      //width: "50%"
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