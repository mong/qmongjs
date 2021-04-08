import React from "react";

interface HEADER_TEXT_PROPS {
  dataFrom: string;
}

const HEADER_TEXT: React.FC<HEADER_TEXT_PROPS> = ({ dataFrom }) => {
  return (
    <div style={{ width: "80%", paddingBottom: "20px" }}>
      <h1 className="header_text" style={{ fontSize: "2rem" }}>
        {`Resultater fra ${dataFrom}`}
      </h1>
    </div>
  );
};

export default HEADER_TEXT;
