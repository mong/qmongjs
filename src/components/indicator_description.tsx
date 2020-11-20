import React from "react";

import { data_config } from "../app_config";

interface Props {
  description: any;
}

function INDICATOR_DESCRIPTION(props: Props) {
  const { description } = props;

  const title = description.title;
  const short_description = description.short_description;
  const level_direction = description[data_config.column.level_direction];
  const level_green =
    description[data_config.column.level_green] === null
      ? null
      : `${description[data_config.column.level_green] * 100}%`;

  const LEVEL_TEXT =
    level_green === null ? (
      ""
    ) : level_direction === 1 ? (
      <h4>ØNSKET MÅLNIVÅ: &#8805; {level_green} </h4>
    ) : (
      <h4>ØNSKET MÅLNIVÅ: &#8804; {level_green} </h4>
    );

  return (
    <td className="quality_indicator">
      <div className="quality_indicator_name">
        <h1>{title}</h1>
      </div>
      <div className="qi_long_description">
        <p>{short_description}</p>
      </div>
      <div className="desired_target_level">{LEVEL_TEXT}</div>
    </td>
  );
}

export default INDICATOR_DESCRIPTION;
