import React from "react";
import { StatisticData } from '../../'
import style from './indicatorvalue.module.css'

export interface IndicatorValueProps {
  td_class?: string;
  indicatorData: StatisticData;
  indicator_value?: "65%";
  share_of_total?: number;
  total?: number;
  level_class?: "filtered_level" | ""
}

export const IndicatorValue: React.FC<IndicatorValueProps> = (props) => {
  const {
    td_class = "selected_unit",
    indicatorData,
    indicator_value = "65%",
    share_of_total = 1500,
    total = 2000,
    level_class = ""
  } = props;

  const filter_level = level_class === "" ? "" : style.filtered_level

  const icon_class =
    indicatorData.level === "H"
      ? "fa fa-fas fa-circle"
      : indicatorData.level === "M"
        ? "fa fa-fas fa-adjust"
        : indicatorData.level === "L"
          ? "fa fa-circle-o"
          : "undeined";
  if (indicatorData.type === 'andel') {
    const denominator = indicatorData.denominator;
    const numerator = Math.round(
      indicatorData.var * denominator
    );
    const indicator_value_share =
      indicatorData.var < 0.1
        ? `${Math.round(indicatorData.var * 1000) / 10}%`
        : `${Math.round(indicatorData.var * 100)}%`;

    return (
      <td className={td_class === "selected_unit" ? `${style.selected_unit} ${filter_level}` : `${style.nationally} ${filter_level}`}>
        <div
          className={style.level}
          aria-label={`Achieved level ${indicatorData.level
            }`}
        >
          <h4>
            {`${indicator_value_share} `}
            <i className={icon_class} />
          </h4>
        </div>
        <div className={style.summary}>{`${numerator} av ${denominator}`}</div>
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
          {`${indicator_value} `}
          <i className={icon_class} />
        </h4>
      </div>
      <div className="summary">{`${share_of_total} av ${total}`}</div>
    </td>
  );
}

export default IndicatorValue;
