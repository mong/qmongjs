import React, { useState } from "react";
import { select, selectAll } from "d3";

import { Description } from "../components/RegisterPage";

interface Props {
  svgContainer: React.RefObject<HTMLDivElement>;
  show_level: boolean;
  zoom: boolean;
  update_zoom: React.Dispatch<React.SetStateAction<boolean>>;
  update_show_level: React.Dispatch<React.SetStateAction<boolean>>;
  update_selected_row(row: string | undefined): void;
  description: Description;
  chartType: string;
  treatmentYear: number;
}

const DD_MENU = (props: Props) => {
  const {
    show_level,
    update_show_level,
    zoom,
    update_zoom,
    update_selected_row,
    svgContainer,
    description,
    chartType,
    treatmentYear,
  } = props;

  const [dd_menu_status, set_dd_menu_status] = useState("inactive");

  function getDownloadURL(svgContainer: React.RefObject<HTMLDivElement>) {
    if (!svgContainer.current) return;
    let src = svgContainer.current.getElementsByTagName("svg")[0];

    const height = src.height.baseVal.value;
    const width = src.width.baseVal.value;

    src.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    src.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    src.setAttribute("xml:space", "preserve");

    const image = new Image();
    image.width = width;
    image.height = height;

    image.src = "data:image/svg+xml," + encodeURIComponent(src.outerHTML);

    if (!image) return;

    image.onerror = function (e) {
      console.log(e);
    };
    image.onload = function () {
      const canvasWidth = width + 50;
      const canvasHeight = height + 100;
      const figTitle =
        chartType === "line"
          ? description.title ?? ""
          : `${description.title ?? ""} (${treatmentYear ?? ""})`;
      const canvas = select("body")
        .append("canvas")
        .attr("width", canvasWidth)
        .attr("height", canvasHeight)
        .node()!;

      const ctx = canvas.getContext("2d");
      ctx!.fillStyle = "#fafafa";
      ctx!.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx!.fillStyle = "black";
      ctx!.font = "20px Arial";
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      ctx!.fillText(figTitle, canvasWidth / 2, 25);
      ctx!.font = "12px Arial";
      ctx!.textAlign = "start";
      ctx!.fillText(`Kilde: ${description.full_name}`, 25, 75 + height);

      ctx!.imageSmoothingEnabled = false;

      ctx!.drawImage(image, 50 / 2, 50);

      const url = canvas.toDataURL("image/png");

      selectAll([canvas, image]).remove();

      const element = document.createElement("a");
      element.download = `${description.id}_${
        chartType === "bar" ? treatmentYear : ""
      }.png`;
      element.href = url;
      element.click();
      element.remove();
    };
    image.onerror = function (e) {
      console.log(e);
    };
  }

  const dropdown_entries = [
    {
      label: show_level ? "Skjul målnivå" : "Vis målnivå",
      click: () => update_show_level((showLevel) => !showLevel),
      class: "dd-level",
    },
    {
      label: zoom ? "Zoom ut" : "Zoom inn",
      click: () => update_zoom((zoom) => !zoom),
      class: "dd-zoom",
    },
    {
      label: "Last ned figur",
      click: () => getDownloadURL(svgContainer),
      class: "dd-download",
    },
    {
      label: "Lukk",
      click: () => update_selected_row(undefined),
      class: "dd-close",
    },
  ];

  let mouse_leave_dd_cont_timeout: number;
  const menu_container_mouse_leave = () => {
    mouse_leave_dd_cont_timeout = window.setTimeout(function () {
      set_dd_menu_status("inactive");
    }, 1000);
  };

  const dd_list = dropdown_entries.map((dd) => {
    return (
      <li key={dd.class}>
        <div className={dd.class} onClick={dd.click}>
          {" "}
          {dd.label}{" "}
        </div>
      </li>
    );
  });

  return (
    <div
      className="table_dd_menu_container"
      onMouseLeave={() => menu_container_mouse_leave()}
      onMouseOver={() => clearTimeout(mouse_leave_dd_cont_timeout)}
    >
      <button
        className="table_dd_button"
        onClick={() => set_dd_menu_status("")}
      >
        <i className="fas fa-bars" aria-hidden="true" />
      </button>
      <div
        id="table_dd_container"
        className={`dropdown_container ${dd_menu_status}`}
      >
        <ul className="dropdown_ul">{dd_list}</ul>
      </div>
    </div>
  );
};

export default DD_MENU;
