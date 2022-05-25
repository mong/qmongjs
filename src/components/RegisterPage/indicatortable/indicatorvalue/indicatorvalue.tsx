import React from "react";
import { StatisticData } from "../../";
import style from "./indicatorvalue.module.css";
import { customFormat } from "../../../../helpers/functions/localFormater";

export interface IndicatorValueProps {
  td_class?: string;
  indicatorData: StatisticData;
  level_class?: "filtered_level" | "";
  format?: null | string;
}

export const IndicatorValue: React.FC<IndicatorValueProps> = (props) => {
  const { td_class = "selected_unit", indicatorData, level_class = "" } = props;

  const filter_level = level_class === "" ? "" : style.filtered_level;

  const icon_class =
    indicatorData.level === "H"
      ? "fa fa-fas fa-circle"
      : indicatorData.level === "M"
      ? "fa fa-fas fa-adjust"
      : indicatorData.level === "L"
      ? "fa fa-circle-o"
      : "undeined";
  if (
    indicatorData.type === "dg_andel" ||
    indicatorData.type === "beregnet_andel" ||
    indicatorData.type === "andel"
  ) {
    const denominator =
      indicatorData.type === "andel" ? indicatorData.denominator : 0;
    const numerator =
      indicatorData.type === "andel"
        ? Math.round(indicatorData.var * denominator)
        : 0;

    return (
      <td
        className={
          td_class === "selected_unit"
            ? `${style.selected_unit} ${filter_level}`
            : `${style.nationally} ${filter_level}`
        }
      >
        <div
          className={style.level}
          aria-label={`Achieved level ${indicatorData.level}`}
        >
          <h4>
            {`${customFormat(",.0%")(indicatorData.var)} `}
            <i className={icon_class} />
          </h4>
        </div>
        {indicatorData.type === "andel" && (
          <div
            className={style.summary}
          >{`${numerator} av ${denominator}`}</div>
        )}
      </td>
    );
  }

  return (
    <td className={td_class}>
      <div
        className="level"
        aria-label={`Achieved level ${indicatorData.level}`}
      >
        <h4>
          {`${indicatorData.var} `}
          <i className={icon_class} />
        </h4>
      </div>
    </td>
  );
};

export default IndicatorValue;
