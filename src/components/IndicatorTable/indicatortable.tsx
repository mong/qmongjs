import React from "react";

import { IndicatorTableHeader } from "./indicatortableheader";
import { IndicatorTableBody } from "./indicatortablebody";
import { RegisterNames } from "../RegisterPage";

export interface IndicatorTableProps {
  context: string;
  tableType: "allRegistries" | "singleRegister";
  colspan: number;
  descriptionHeader?: string;
  unitNames: string[];
  national?: string;
  selection_bar_height: number | null;
  legend_height: number;
  registerNames: RegisterNames[];
  treatmentYear: number;
  medicalFieldFilter: string[];
  showLevelFilter?: string;
  blockTitle?: string[];
}

export const IndicatorTable: React.FC<IndicatorTableProps> = (props) => {
  const {
    context,
    tableType,
    unitNames = ["Nasjonalt"],
    treatmentYear = 2019,
    colspan,
    medicalFieldFilter,
    showLevelFilter,
    selection_bar_height,
    legend_height,
    registerNames,
    descriptionHeader,
    blockTitle,
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
        context={context}
        tableType={tableType}
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
};

export default IndicatorTable;
