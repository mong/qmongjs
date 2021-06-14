import React from "react";
import { OptsTu } from "../../../select_multi";
import { RegisterNames } from "../../.";

import TableBlock from "../tableblock/tableblock";

export interface IndicatorTableBodyProps {
  context: string;
  tableType: "allRegistries" | "singleRegister";
  optstu: OptsTu[] | [];
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
          context={context}
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
