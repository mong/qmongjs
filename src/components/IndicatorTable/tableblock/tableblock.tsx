import React, { useMemo } from "react";
import { UseQueryResult } from "react-query";

import style from "./tableblock.module.css";
import { useDescriptionQuery, useIndicatorQuery } from "../../../helpers/hooks";
import { filterOrderIndID } from "../../../helpers/functions";
import { IndicatorRow } from "../indicatorrow";
import { TableBlockTitle } from "./tableblocktitle";
import { Description, StatisticData, RegisterNames } from "../../RegisterPage";

export interface TableBlockProps {
  context: string;
  tableType: "allRegistries" | "singleRegister";
  registerName: RegisterNames;
  blockTitle?: string;
  treatmentYear: number;
  unitNames: string[];
  trRegisterNameClass?: string;
  medicalFieldFilter: string[];
  showLevelFilter: string;
  colspan: number;
}

export const TableBlock: React.FC<TableBlockProps> = (props) => {
  const {
    context,
    tableType,
    registerName,
    colspan,
    trRegisterNameClass = "register-row",
    treatmentYear,
    medicalFieldFilter,
    showLevelFilter,
    blockTitle,
    unitNames,
  } = props;
  const queryContext =
    context === "coverage"
      ? { context: "caregiver", type: "dg" }
      : { context, type: "ind" };

  const indicatorDataQuery: UseQueryResult<any, unknown> = useIndicatorQuery({
    registerShortName: registerName.rname,
    unitNames,
    treatmentYear,
    type: queryContext.type,
    context: queryContext.context,
  });
  const { isFetching } = indicatorDataQuery;

  const descriptionQuery: UseQueryResult<any, unknown> = useDescriptionQuery({
    registerShortName: registerName.rname,
  });

  const uniqueOrderedInd: string[] = useMemo(
    () =>
      filterOrderIndID(
        isFetching ?? false,
        unitNames,
        indicatorDataQuery.data ?? [],
        descriptionQuery.data ?? [],
        showLevelFilter,
        tableType
      ),
    [
      tableType,
      isFetching,
      unitNames,
      descriptionQuery.data,
      indicatorDataQuery.data,
      showLevelFilter,
    ]
  );

  if (descriptionQuery.isLoading || indicatorDataQuery.isLoading) {
    return null;
  }

  if (descriptionQuery.isError || indicatorDataQuery.isError) {
    return null;
  }
  if (
    descriptionQuery.data.length === 0 ||
    indicatorDataQuery.data.length === 0
  ) {
    return null;
  }

  const medicalFieldClass = medicalFieldFilter.includes(registerName.rname)
    ? ""
    : style.filterMedField;

  const indicatorRows = uniqueOrderedInd.map((indicator) => {
    const singleIndicatorData = indicatorDataQuery.data.filter(
      (data: StatisticData) => data.ind_id === indicator
    );
    const singleIndicatorDescription = descriptionQuery.data.filter(
      (data: Description) => data.id === indicator
    );
    return (
      <IndicatorRow
        context={queryContext}
        indicatorData={singleIndicatorData}
        description={singleIndicatorDescription[0]}
        key={indicator}
        unitNames={props.unitNames}
        medicalFieldClass={medicalFieldClass}
        showLevelFilter={showLevelFilter}
        colspan={colspan}
        treatmantYear={treatmentYear}
      />
    );
  });

  const tabName =
    context === "caregiver" && registerName.caregiver_data
      ? "sykehus"
      : context === "resident" && registerName.resident_data
      ? "opptaksomraade"
      : context === "coverage" && registerName.dg_data
      ? "datakvalitet"
      : "sykehus";

  return (
    <>
      {blockTitle && uniqueOrderedInd.length !== 0 ? (
        <TableBlockTitle
          tabName={tabName}
          link={registerName.rname}
          title={blockTitle}
          colspan={colspan}
          tr_register_name_class={`${trRegisterNameClass} ${registerName.rname} ${medicalFieldClass}`}
        />
      ) : null}
      {indicatorRows}
    </>
  );
};

export default TableBlock;
