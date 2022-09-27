import React from "react";
import { useIsFetching } from "react-query";

interface NoDataAvailibleProps {
  colspan: number;
}

export const NoDataAvailible: React.FC<NoDataAvailibleProps> = ({
  colspan,
}) => {
  const isFetching = useIsFetching();

  if (isFetching === 0) {
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
