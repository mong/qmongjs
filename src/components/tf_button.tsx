import React from "react";

interface Props {
  chart_type: "bar" | "line";
  update_chart_type: (e: "line" | "bar") => void;
}

const TF_BUTTON = (props: Props) => {
  const { chart_type, update_chart_type } = props;

  const radio_button_prop = [
    {
      class_name_inp: "figure_button figure_button_left",
      type: "Radio",
      id: "table_line",
      name: "table_figure_button",
      value: "line",
      icon: "fas fa-chart-line",
      label: "Linje",
      class_name_label: "figure_button_label",
    },
    {
      class_name_inp: "figure_button figure_button_right",
      type: "Radio",
      id: "table_bar",
      name: "table_figure_button",
      value: "bar",
      icon: "fas fa-chart-bar",
      label: "Søyle",
      class_name_label: "figure_button_label",
    },
  ];

  const radio_buttons = radio_button_prop.map((rb) => {
    return (
      <React.Fragment key={rb.id}>
        <input
          className={rb.class_name_inp}
          type={rb.type}
          id={rb.id}
          name={rb.name}
          value={rb.value}
          checked={rb.value === chart_type}
          onChange={(e) => {
            const chart_value = e.target.value;
            if (!["bar", "line"].includes(chart_value)) {
              throw new Error(`Only "line" and "bar" chart type is supported.`);
            }
            update_chart_type(chart_value as typeof chart_type);
          }}
        ></input>
        <label className={rb.class_name_label} htmlFor={rb.id}>
          {rb.label} <i className={rb.icon}></i>
        </label>
      </React.Fragment>
    );
  });

  return <div className="tr_figure_button">{radio_buttons}</div>;
};

export default TF_BUTTON;
