import React from "react";
import Select from "react-select";

import { app_text } from "../app_config";

function SELECT_MULTI(props) {
  const {
    opts = [],
    select_className = "pick_treatment_unit",
    placeholder = (
      <div>
        <i className="fas fa-search"></i> Søk etter behandlingsenheter
      </div>
    ),
    update_tu,
    treatment_unit,
  } = props;

  let selection_options = opts;
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      backgroundColor: "#00263d",
      boxShadow: state.isFocused ? null : null,
      fontSize: "1rem",
      border: "none",
      borderRadius: state.isFocused ? 0 : 0,
      borderBottom: state.isFocused
        ? "3px solid #7ebec7"
        : state.isSelected
        ? "3px solid #EEF6F7"
        : "3px solid #EEF6F7",
      cursor: "text",
    }),
    input: (provided) => ({
      ...provided,
      color: "#EEF6F7",
      paddingLeft: "1.3rem",
    }),
    multiValue: (provided) => ({
      ...provided,
      color: "#00263d",
      backgroundColor: "#EEF6F7",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#EEF6F7",
      fontSize: "1.2rem",
    }),
    crossIcon: (provided) => ({
      ...provided,
      color: "white",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: "none",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 3,
    }),
    option: (provided) => ({
      ...provided,
    }),
  };
  const value_tu = treatment_unit.map((tu) => ({ value: tu, label: tu }));
  const handle_input_change = (e) => {
    const tu = e !== null ? e.map((e) => e.value) : [];
    update_tu(tu);
  };

  return (
    <form>
      <Select
        className={select_className}
        options={selection_options}
        placeholder={placeholder}
        closeMenuOnSelect={true}
        value={value_tu}
        openMenuOnClick={false}
        isSearchable
        isMulti={true}
        onChange={(e) => handle_input_change(e)}
        styles={customStyles}
        menuIsOpen={
          treatment_unit.length < app_text.tu_list.max_nr_tu ? undefined : false
        }
      />
    </form>
  );
}

export default SELECT_MULTI;
