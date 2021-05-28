import React from "react";
import { OptsTu } from "../../../select_multi";

import TableBlock from "../tableblock/tableblock";

interface RegisterName {
  id: number;
  rname: string;
  full_name: string;
  registerField?: string;
}

export interface IndicatorTableBodyProps {
  tableType: "allRegistries" | "singleRegister";
  optstu: OptsTu[] | [];
  colspan: number;
  registerNames: RegisterName[];
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
    tableType,
    optstu,
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
          tableType={tableType}
          key={`${register.rname}`}
          optstu={optstu}
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

  return <tbody>{register_block}</tbody>;
};
