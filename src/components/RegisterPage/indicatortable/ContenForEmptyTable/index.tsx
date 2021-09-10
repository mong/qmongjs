import React, { MutableRefObject, useEffect, useState } from "react";
import { useIsFetching } from "react-query";
import style from "../tableblock/tableblock.module.css";

import { useResizeObserver } from "../../../../helpers/hooks";

interface NoDataAvailibleProps {
  colspan: number;
  tableBodyRef: MutableRefObject<HTMLElement | null>;
}

export const NoDataAvailible: React.FC<NoDataAvailibleProps> = ({
  colspan,
  tableBodyRef,
}) => {
  const isFetching = useIsFetching();
  const dims = useResizeObserver(tableBodyRef);
  const tbodyHeight = dims ? dims.contentRect.height : 0;
  const [isTableEmpty, setIsTableEmpty] = useState(false);
  const filteredClass = style["filterMedField"];

  useEffect(() => {
    if (tableBodyRef.current) {
      const tBody = tableBodyRef.current;
      const indicatorData = tBody.querySelectorAll(
        `.indicator:not(.${filteredClass})`
      ).length;
      setIsTableEmpty(indicatorData === 0);
    }
  }, [tableBodyRef, tbodyHeight, isFetching, setIsTableEmpty, filteredClass]);

  if (isFetching === 0 && isTableEmpty) {
    return (
      <tr>
        <td
          className={"noData"}
          colSpan={colspan}
          style={{ height: "40vh", textAlign: "center" }}
        >
          <h2>Det finnes ikke aktuelle data for dette utvalget</h2>{" "}
        </td>
      </tr>
    );
  }
  return null;
};
