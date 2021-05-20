import React from "react";

import { IndicatorTableHeader } from "./indicatortableheader";
import { IndicatorTableBody } from "./indicatortablebody";

export interface IndicatorTableProps {
  tableType: "allRegistries" | "singleRegister";
  optstu: [];
  colspan: number;
  descriptionHeader?: string;
  unitNames: string[];
  national?: string;
  selection_bar_height: number | null;
  legend_height: number;
  registerNames: {
    id: number;
    rname: string;
    full_name: string;
    registerField?: string;
  }[],
  treatmentYear: number,
  medicalFieldFilter: string[],
  showLevelFilter?: string,
  blockTitle?: string[]
}

export const IndicatorTable: React.FC<IndicatorTableProps> = (props) => {
  const {
    tableType,
    optstu,
    unitNames = ["Nasjonalt"],
    treatmentYear = 2019,
    colspan,
    medicalFieldFilter,
    showLevelFilter,
    selection_bar_height,
    legend_height,
    registerNames,
    descriptionHeader,
    blockTitle
  } = props;

  return (
    <table>
      <IndicatorTableHeader
        colspan={colspan}
        unitNames={unitNames}
        selection_bar_height={selection_bar_height}
        legend_height={legend_height}
        descriptionHeader={descriptionHeader}
      />
      <IndicatorTableBody
        tableType={tableType}
        optstu={optstu}
        colspan={colspan}
        registerNames={registerNames}
        unitNames={unitNames}
        treatmentYear={treatmentYear}
        medicalFieldFilter={medicalFieldFilter}
        showLevelFilter={showLevelFilter ?? ""}
        blockTitle={blockTitle}
      />
    </table>
  );
}

export default IndicatorTable;
