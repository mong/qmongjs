import Select from "react-select";

import { app_text } from "../../app_config";

export interface OptsTu {
  label: string;
  options: {
    value: string;
    label: string;
  }[];
}

interface Props {
  opts: OptsTu[];
  select_className?: string;
  placeholder?: JSX.Element;
  update_tu(x: string[] | undefined): void;
  treatment_unit: string[];
}

function SelectTreatmentUnits(props: Props) {
  const {
    opts = [],
    select_className = "pick_treatment_unit",
    placeholder = (
      <div>
        <i className="fas fa-search" /> Søk etter behandlingsenheter
      </div>
    ),
    update_tu,
    treatment_unit,
  } = props;
  let selection_options = opts;
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      width: "100%",
      backgroundColor: "white",
      boxShadow: state.isFocused ? undefined : undefined,
      fontSize: "1rem",
      border: "none",
      borderRadius: state.isFocused ? 0 : 0,
      borderBottom: state.isFocused
        ? "3px solid #7ebec7"
        : // @ts-ignore
        state.isSelected
        ? "3px solid #EEF6F7"
        : "3px solid #EEF6F7",
      cursor: "text",
    }),
    input: (provided: any) => ({
      ...provided,
      //color: "#EEF6F7",
      paddingLeft: "1.3rem",
    }),
    multiValue: (provided: any) => ({
      ...provided,
      color: "#00263d",
      backgroundColor: "#EEF6F7",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "black",
      fontSize: "1.2rem",
    }),
    // @ts-ignore
    crossIcon: (provided: any) => ({
      ...provided,
      // color: "white",
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      display: "none",
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: "none",
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 3,
    }),
    option: (provided: any) => ({
      ...provided,
    }),
  };
  const value_tu = treatment_unit.map((tu) => ({ value: tu, label: tu }));
  const handle_input_change = (e: { value: string }[]) => {
    const tu = e?.length > 0 ? e.map((e) => e.value) : undefined;
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
        onChange={(e: any) => handle_input_change(e)}
        styles={customStyles}
        menuIsOpen={
          treatment_unit.length < app_text.tu_list.max_nr_tu ? undefined : false
        }
      />
    </form>
  );
}

export default SelectTreatmentUnits;
