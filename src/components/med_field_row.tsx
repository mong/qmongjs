import React from "react";
import { med_field } from "../app_config";
interface Props {
  med_field: typeof med_field[0];
  nr_indicators: number;
  update_med_field_filter(arr: string[]): void;
  update_clicked_med_field(str: string): void;
  clicked_med_field: string;
}
function MED_FIELD_ROW(props: Props) {
  const {
    med_field,
    nr_indicators = 10,
    update_med_field_filter,
    update_clicked_med_field,
    clicked_med_field,
  } = props;
  const class_checked =
    med_field.react_key === clicked_med_field ? "checked" : "";

  const handle_med_field_click = () => {
    update_clicked_med_field(med_field.react_key);
    update_med_field_filter(med_field.key);
  };

  return (
    <li
      className={`med_field ${class_checked} med_field_${med_field.react_key}`}
    >
      <button
        className="med_field_text"
        onClick={() => handle_med_field_click()}
      >
        {med_field.name.toUpperCase()}
        <div className="med_field_nrind">{nr_indicators}</div>
      </button>
    </li>
  );
}

export default MED_FIELD_ROW;
