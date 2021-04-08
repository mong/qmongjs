import React from "react";

import HEADER_TEXT from "./header_text";

interface HEADER_PROPS {
  dataFrom?: string;
}
const HEADER: React.FC<HEADER_PROPS> = (props) => {
  const { dataFrom = "medisinske kvalitetsregistre" } = props;
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(-270deg, #A2CFD6 0%, #7EBEC7 100%)",
        padding: "1rem 0 0 1rem",
        color: "#2D3034",
        minHeight: "10rem",
      }}
    >
      <div
        style={{ color: "white", fontSize: "2.8rem", padding: "0 0 10px 10%" }}
      >
        <HEADER_TEXT dataFrom={dataFrom} />
      </div>
    </div>
  );
};

export default HEADER;
