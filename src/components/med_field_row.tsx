import React, { useEffect } from "react";
import { useQueryParam } from "use-query-params";

function MED_FIELD_ROW(props) {
  const {
    med_field_name = "Hjerte- og karsykdommer",
    nr_indicators = 10,
    update_med_field_filter,
    update_clicked_med_field,
    clicked_med_field,
  } = props;
  const [indicator_query_param, set_indicator_query_param] = useQueryParam(
    "indicator"
  );
  const class_checked =
    med_field_name.react_key === (indicator_query_param || clicked_med_field)
      ? "checked"
      : "";
  const handle_med_field_click = () => {
    set_indicator_query_param(med_field_name.react_key);
    update_clicked_med_field(med_field_name.react_key);
    update_med_field_filter(med_field_name.key);
  };
  useEffect(() => {
    if (med_field_name.react_key === indicator_query_param) {
      update_med_field_filter(med_field_name.key);
    }
  }, [med_field_name, indicator_query_param, update_med_field_filter]);
  return (
    <li
      className={`med_field ${class_checked} med_field_${med_field_name.react_key}`}
    >
      <button
        className="med_field_text"
        onClick={() => handle_med_field_click()}
      >
        {med_field_name.name.toUpperCase()}
        <div className="med_field_nrind">{nr_indicators}</div>
      </button>
    </li>
  );
}

export default MED_FIELD_ROW;
