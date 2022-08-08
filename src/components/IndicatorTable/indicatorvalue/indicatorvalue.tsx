import React from "react";
import { StatisticData } from "../../RegisterPage";
import style from "./indicatorvalue.module.css";
import { customFormat } from "../../../helpers/functions/localFormater";

export interface IndicatorValueProps {
  td_class?: string;
  indicatorData: StatisticData;
  level_class?: "filtered_level" | "";
  format?: string;
  headerStyle?: React.CSSProperties;
}

export const IndicatorValue: React.FC<IndicatorValueProps> = (props) => {
  const {
    td_class = "selected_unit",
    indicatorData,
    level_class = "",
    format,
  } = props;

  const filter_level = level_class === "" ? "" : style.filtered_level;

  return (
    <td
      className={
        td_class === "selected_unit"
          ? `${style.selected_unit} ${filter_level}`
          : `${style.nationally} ${filter_level}`
      }
    >
      <IndicatorData indicatorData={indicatorData} format={format} />
    </td>
  );
};

export const IndicatorData: React.FC<IndicatorValueProps> = ({
  indicatorData,
  format,
  headerStyle,
}) => {
  const numberFormat = format === undefined ? ",.0%" : format;
  const icon_class =
    indicatorData.level === "H"
      ? "fa fa-fas fa-circle"
      : indicatorData.level === "M"
      ? "fa fa-fas fa-adjust"
      : indicatorData.level === "L"
      ? "fa fa-circle-o"
      : "undeined";
  const denominator =
    indicatorData.type === "andel" ? indicatorData.denominator : 0;
  const numerator =
    indicatorData.type === "andel"
      ? Math.round(indicatorData.var * denominator)
      : 0;

  return (
    <>
      <div
        className={style.level}
        aria-label={`Achieved level ${indicatorData.level}`}
      >
        <h4 style={headerStyle}>
          {customFormat(numberFormat)(indicatorData.var)}
          <i className={icon_class} />
        </h4>
      </div>
      {indicatorData.type === "andel" && (
        <div className={style.summary}>{`${numerator} av ${denominator}`}</div>
      )}
    </>
  );
};

export default IndicatorValue;
