import React from "react";
import { Accordion } from "../../../shared/accordion";

interface Props {
  description_title?: string;
  description_text: string;
}

const LONG_DESCRIPTION = (props: Props) => {
  const {
    description_title = "Om kvalitetsindikatoren",
    description_text = "Denne kvalitetsindikatoren er definert som andel pasienter med...",
  } = props;

  return (
    <>
      <Accordion renderHeader={() => <h3>{description_title}</h3>}>
        <div style={{ textAlign: "justify", lineHeight: "1.42" }}>
          {description_text}
        </div>
      </Accordion>
    </>
  );
};

export default LONG_DESCRIPTION;
