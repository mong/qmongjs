import React, { useState } from "react";
import { select, selectAll } from "d3";

import { Description } from "../App";

interface Props {
  svgContainer: React.RefObject<HTMLDivElement>;
  show_level: boolean;
  zoom: boolean;
  update_zoom: React.Dispatch<React.SetStateAction<boolean>>;
  update_show_level: React.Dispatch<React.SetStateAction<boolean>>;
  update_selected_row(row: string): void;
  description: Description;
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

    const image = select("body")
      .append("img")
      .style("display", "none")
      .attr("width", width)
      .attr("height", height)
      .node();

    if (!image) return;

    image.onerror = function (e) {
      console.log(e);
    };
    image.onload = function () {
      const canvas = select("body")
        .append("canvas")
        .attr("width", width)
        .attr("height", height)
        .node()!;

      const ctx = canvas.getContext("2d");
      ctx!.drawImage(image, 0, 0);
      const url = canvas.toDataURL("image/png");
      selectAll([canvas, image]).remove();
      const element = document.createElement("a");
      element.download = `${description.id}.png`;
      element.href = url;
      element.click();
      element.remove();
    };
    image.onerror = function (e) {
      console.log(e);
    };

    image.src = "data:image/svg+xml," + encodeURIComponent(src.outerHTML);
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
    { label: "Lukk", click: () => update_selected_row(""), class: "dd-close" },
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
