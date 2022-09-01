import React from "react";
import { useQueryParam } from "use-query-params";

import { IndicatorValue } from "../indicatorvalue";
import { IndicatorDescription } from "../indicatordescription";
import { MaskedIndicator } from "../maskedindicator";
import { ChartRow } from "../chartrow";
import style from "./indicatorrow.module.css";

import { Description, StatisticData } from "../../RegisterPage";
import { mainQueryParamsConfig } from "../../../app_config";

const formatIndicatorValues = (
  description: Description,
  indicator: StatisticData[],
  showLevelFilter: string,
  unitName: string
) => {
  if (!indicator[0]) {
    return (
      <td
        key={`${description.id}_${unitName}__su`}
        className={`${
          unitName !== "Nasjonalt" ? style.selected_unit : style.nationally
        }`}
      >
        <MaskedIndicator text="Ingen Data" />
      </td>
    );
  } else if (
    description.type === "dg_andel" ||
    description.type === "dg" ||
    description.type === "dg_beregnet_andel"
  ) {
    const level_class =
      indicator[0].level !== showLevelFilter && !!showLevelFilter
        ? "filtered_level"
        : "";
    return (
      <IndicatorValue
        key={`${indicator[0].ind_id}_${indicator[0].unit_name}_${indicator[0].id}_su`}
        indicatorData={indicator[0]}
        format={description.sformat !== null ? description.sformat : ",.0%"}
        td_class={`${
          indicator[0].unit_level !== "nation" ? "selected_unit" : "nationally"
        }`}
        level_class={level_class}
      />
    );
  } else if (
    (indicator[0].dg ?? 1) < 0.6 &&
    indicator[0].unit_name !== "Nasjonalt"
  ) {
    return (
      <td
        key={`${indicator[0].ind_id}_${indicator[0].unit_name}_${indicator[0].id}_su`}
        className={`${
          indicator[0].unit_level !== "nation"
            ? style.selected_unit
            : style.nationally
        }`}
      >
        <MaskedIndicator text="Lav dg" />
      </td>
    );
  } else if (indicator[0].denominator < (description.min_denominator ?? 5)) {
    return (
      <td
        key={`${indicator[0].ind_id}_${indicator[0].unit_name}_${indicator[0].id}_su`}
        className={`${
          indicator[0].unit_level !== "nation"
            ? style.selected_unit
            : style.nationally
        }`}
      >
        <MaskedIndicator text="Lav N" />
      </td>
    );
  } else {
    const level_class =
      indicator[0].level !== showLevelFilter && !!showLevelFilter
        ? "filtered_level"
        : "";
    return (
      <IndicatorValue
        key={`${indicator[0].ind_id}_${indicator[0].unit_name}_${indicator[0].id}_su`}
        indicatorData={indicator[0]}
        format={description.sformat !== null ? description.sformat : ",.0%"}
        td_class={`${
          indicator[0].unit_level !== "nation" ? "selected_unit" : "nationally"
        }`}
        level_class={level_class}
      />
    );
  }
};

export interface IndicatorRowProps {
  context: { context: string; type: string };
  treatmantYear: number;
  description: Description;
  indicatorData: StatisticData[];
  unitNames?: string[];
  medicalFieldClass?: string;
  showLevelFilter?: string;
  colspan?: number;
}

export const IndicatorRow: React.FC<IndicatorRowProps> = (props) => {
  const {
    context,
    treatmantYear,
    description,
    indicatorData,
    unitNames = ["Nasjonalt"],
    medicalFieldClass = "",
    showLevelFilter = "",
    colspan,
  } = props;

  const [selected_row, update_selected_row] = useQueryParam(
    "selected_row",
    mainQueryParamsConfig.selected_row
  );

  if (!(description && indicatorData)) {
    return null;
  }
  const ind_id = description.id;
  const tr_indicator_class = `${description.id}  ${description.rname}`;

  const indPerUnit =
    unitNames.length === 0
      ? null
      : unitNames.map((name) => {
          const filteredIndicator = indicatorData.filter(
            (ind) => ind.unit_name === name
          );
          return formatIndicatorValues(
            description,
            filteredIndicator,
            showLevelFilter,
            name
          );
        });

  const tr_fig =
    selected_row === ind_id ? (
      <ChartRow
        context={context}
        treatmentYear={treatmantYear}
        colspan={colspan}
        description={[description]}
        figure_class={medicalFieldClass}
        selectedTreatmentUnits={unitNames}
        indicatorData={indicatorData}
        update_selected_row={update_selected_row}
      />
    ) : null;

  const tr_click_handler = () => {
    update_selected_row(selected_row === ind_id ? undefined : ind_id);
  };

  return (
    <>
      <tr
        onClick={() => tr_click_handler()}
        id={`${tr_indicator_class}`}
        className={`${tr_indicator_class} ${medicalFieldClass}  indicator`}
      >
        <IndicatorDescription description={description} />
        {indPerUnit}
      </tr>
      {tr_fig}
    </>
  );
};

export default IndicatorRow;
