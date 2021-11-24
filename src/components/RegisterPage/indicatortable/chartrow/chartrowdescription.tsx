import React, { useState } from "react";

interface Props {
  description_title?: string;
  description_text: string;
  delivery_time: Date;
}

const LONG_DESCRIPTION = (props: Props) => {
  const {
    description_title = "Om kvalitetsindikatoren",
    description_text = "Denne kvalitetsindikatoren er definert som andel pasienter med...",
    delivery_time = new Date("1999-12-31T23:59:59.999Z"),
  } = props;
  const [content_status, set_content_status] = useState<string>("inactive");
  const desc_click_handler = (
    content_status: string,
    set_content_status: (e: string) => void
  ) => {
    const cur_status = content_status === "" ? "inactive" : "";
    set_content_status(cur_status);
  };

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
      <div className={`description_content ${content_status}`}>
        <p>{description_text}</p>
        <p>
          Data ble sist oppdatert{" "}
          {delivery_time.toLocaleString("no-NO", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}{" "}
        </p>
      </div>
    </div>
  );
};

export default LONG_DESCRIPTION;
