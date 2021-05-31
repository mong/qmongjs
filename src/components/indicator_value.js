import React from "react";

import { data_config } from "../app_config";

function INDICATOR_VALUE(props) {
  const {
    td_class = "selected_unit",
    ind_type = "andel",
    data,
    indicator_value = "65%",
    share_of_total = 1500,
    total = 2000,
  } = props;

  const icon_class =
    data[data_config.column.achieved_level] === "H"
      ? "fa fa-fas fa-circle"
      : data[data_config.column.achieved_level] === "M"
      ? "fa fa-fas fa-adjust"
      : data[data_config.column.achieved_level] === "L"
      ? "fa fa-circle-o"
      : null;
  if (ind_type === data_config.indicator_type.andel.db) {
    const denominator = data[data_config.column.denominator];
    const numerator = Math.round(
      data[data_config.column.variable] * denominator
    );
    const indicator_value_share =
      data[data_config.column.variable] < 0.1
        ? `${Math.round(data[data_config.column.variable] * 1000) / 10}\u202f%`
        : `${Math.round(data[data_config.column.variable] * 100)}\u202f%`;

    return (
      <td className={td_class}>
        <div
          className="level"
          aria-label={`Achieved level ${
            data[data_config.column.achieved_level]
          }`}
        >
          <h4>
            {`${indicator_value_share} `}
            <i className={icon_class} />
          </h4>
        </div>
        <div className="summary">{`${numerator} av ${denominator}`}</div>
      </td>
    );
  }

  return (
    <td className={td_class}>
      <div
        className="level"
        aria-label={`Achieved level ${data[data_config.column.achieved_level]}`}
      >
        <h4>
          {`${indicator_value} `}
          <i className={icon_class} />
        </h4>
      </div>
      <div className="summary">{`${share_of_total} av ${total}`}</div>
    </td>
  );
}

export default INDICATOR_VALUE;
