import React from "react";
import { Description } from "../../";
import style from "./indicatordescription.module.css";

export interface DescriptionProps {
  description: Description;
}

export const IndicatorDescription: React.FC<DescriptionProps> = (props) => {
  const { description } = props;

  const title = description.title;
  const short_description = description.short_description;
  const level_direction = description.level_direction;
  const level_green =
    description.level_green === null
      ? null
      : `${description.level_green * 100}%`;

  const LEVEL_TEXT =
    level_green === null ? (
      ""
    ) : level_direction === 1 ? (
      <h4>ØNSKET MÅLNIVÅ: &#8805; {level_green} </h4>
    ) : (
      <h4>ØNSKET MÅLNIVÅ: &#8804; {level_green} </h4>
    );

  return (
    <td className={style.quality_indicator}>
      <div className={style.quality_indicator_name}>
        <h1>{title}</h1>
      </div>
      <div className={style.qi_long_description}>
        <p>{short_description}</p>
      </div>
      <div className={style.desired_target_level}>{LEVEL_TEXT}</div>
    </td>
  );
};

export default IndicatorDescription;
