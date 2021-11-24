import React, { useState } from "react";

interface Props {
  description_title?: string;
  description_text: string;
  description_date: Date | undefined;
}

const LONG_DESCRIPTION = (props: Props) => {
  const {
    description_title = "Om kvalitetsindikatoren",
    description_text = "Denne kvalitetsindikatoren er definert som andel pasienter med...",
    description_date = new Date("1999-12-31T23:59:59.999Z"),
  } = props;
  const [content_status, set_content_status] = useState<string>("inactive");
  const desc_click_handler = (
    content_status: string,
    set_content_status: (e: string) => void
  ) => {
    const cur_status = content_status === "" ? "inactive" : "";
    set_content_status(cur_status);
  };

  let new_descr_date = new Date(description_date);

  return (
    <div className="description-container">
      <div
        className={`description_title_container`}
        onClick={() => desc_click_handler(content_status, set_content_status)}
      >
        <h4>{description_title}</h4>
        <i
          className={`fa ${
            content_status === "" ? "fa-angle-up" : "fa-angle-down"
          }`}
        />
      </div>
      <p className={`description_content ${content_status}`}>
        {description_text}
      </p>
      <p className={`description_content ${content_status}`}>
        Indikatoren ble sist oppdatert{" "}
        {new_descr_date.toLocaleString("no-NO", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}{" "}
      </p>
    </div>
  );
};

export default LONG_DESCRIPTION;
