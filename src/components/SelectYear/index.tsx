import Select from "react-select";
interface Props {
  opts: number[];
  select_className?: string;
  update_year(int: number): void;
  selected_year: number;
}
function SelectYear(props: Props) {
  const {
    opts = [],
    select_className = "pick_year",
    update_year,
    selected_year,
  } = props;
  const selection_options = opts.map((opt) => ({ value: opt, label: opt }));
  const selected_option =
    selection_options[
      selection_options.findIndex((v) => v.value === selected_year) | 0
    ];
  const defaultValue = selected_option;
  const handle_input_change = (e: any) => {
    update_year(e.value);
  };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      width: "100%",
      backgroundColor: "white",
      boxShadow: null,
      fontSize: "1.1rem",
      border: state.isFocused
        ? "3px solid #7ebec7"
        : state.isSelected
        ? "3px solid #EEF6F7"
        : "3px solid #EEF6F7",
      minHeight: "2rem",
      cursor: "pointer",
    }),
    input: (provided: any) => ({
      ...provided,
      //color: "#EEF6F7",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "black",
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 3,
    }),
    option: (provided: any) => ({
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
        value={selected_option}
        isSearchable
        styles={customStyles}
      />
    </form>
  );
}

export default SelectYear;
