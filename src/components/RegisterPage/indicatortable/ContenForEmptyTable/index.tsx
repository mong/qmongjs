import React, { MutableRefObject } from "react";
import { useIsFetching } from "react-query"

import { useResizeObserver } from "../../../../helpers/hooks";

interface NoDataAvailibleProps {
  colspan: number;
  tableBodyRef: MutableRefObject<HTMLElement | null>;
}


export const NoDataAvailible: React.FC<NoDataAvailibleProps> = ({ colspan, tableBodyRef }) => {

  const isFetching = useIsFetching()
  const dims = useResizeObserver(tableBodyRef)
  const tbodyHeight = dims ? dims.contentRect.height : 0


  if (isFetching === 0 && tbodyHeight < 50) {

    return <tr><td colSpan={colspan}>Ingen data</td></tr>
  }
  //else return null
  return (null)
}