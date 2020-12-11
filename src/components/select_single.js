import React, { useEffect } from "react";
import { useQueryParam } from "use-query-params";
import Select from "react-select";

function SELECT_SINGLE(props) {
  const {
    opts = [],
    select_className = "pick_year",
    update_year,
    selected_year,
  } = props;
  const selection_options = opts.map((opt) => ({ value: opt, label: opt }));
  const selected_option =
    selection_options[
      selection_options.findIndex((v) => v.value === parseInt(selected_year)) |
        0
    ];
  const [, setYearQP] = useQueryParam("year");
  const defaultValue = selected_option;
  const handle_input_change = (e) => {
    update_year(e.value);
    setYearQP(e.value);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      backgroundColor: "#00263d",
      boxShadow: null,
      fontSize: "1rem",
      border: state.isFocused
        ? "3px solid #7ebec7"
        : state.isSelected
        ? "3px solid #EEF6F7"
        : "3px solid #EEF6F7",
      minHeight: "2rem",
      cursor: "pointer",
    }),
    input: (provided) => ({
      ...provided,
      color: "#EEF6F7",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#EEF6F7",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 3,
    }),
    option: (provided) => ({
      ...provided,
    }),
  };

  return (
    <form>
      <Select
        className={select_className}
        onChange={(e) => handle_input_change(e)}
        options={selection_options}
        defaultValue={defaultValue}
        isSearchable
        styles={customStyles}
      />
    </form>
  );
}

export default SELECT_SINGLE;
