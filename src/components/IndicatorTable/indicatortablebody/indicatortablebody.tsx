import React from "react";

import { RegisterNames } from "../../RegisterPage";
import TableBlock from "../tableblock/tableblock";
import { NoDataAvailible } from "../ContenForEmptyTable";

export interface IndicatorTableBodyProps {
  context: string;
  tableType: "allRegistries" | "singleRegister";
  colspan: number;
  registerNames: RegisterNames[];
  unitNames: string[];
  treatmentYear: number;
  medicalFieldFilter: string[];
  showLevelFilter: string;
  blockTitle?: string[];
}

export const IndicatorTableBody: React.FC<IndicatorTableBodyProps> = (
  props
) => {
  const {
    context,
    tableType,
    colspan,
    registerNames,
    unitNames,
    treatmentYear,
    medicalFieldFilter,
    showLevelFilter,
    blockTitle,
  } = props;

  const done: string[] = [];
  let register_block = registerNames.map((register, i) => {
    if (!done.includes(register.rname)) {
      done.push(register.rname);

      return (
        <TableBlock
          context={context}
          tableType={tableType}
          key={`${register.rname}`}
          registerName={register}
          colspan={colspan}
          unitNames={unitNames}
          treatmentYear={treatmentYear}
          medicalFieldFilter={medicalFieldFilter}
          showLevelFilter={showLevelFilter}
          blockTitle={blockTitle ? blockTitle[i] : undefined}
        />
      );
    } else {
      return null;
    }
  });
  const isEmpty = !done.length;

  return (
    <tbody>
      {isEmpty && <NoDataAvailible colspan={colspan} />}
      {register_block}
    </tbody>
  );
};
