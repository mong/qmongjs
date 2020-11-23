import React, { useEffect, useState } from "react";
import { select, selectAll } from "d3";

interface Props {
  show_level: string;
  zoom: string;
  svg_container: React.RefObject<HTMLDivElement>;
  update_zoom(xoom: string): void;
  update_show_level(level: string): void;
  update_selected_row(row: string): void;
}

const DD_MENU = (props: Props) => {
  const {
    show_level,
    update_show_level,
    zoom,
    update_zoom,
    svg_container,
    update_selected_row,
  } = props;

  const [dd_menu_status, set_dd_menu_status] = useState("inactive");
  const level_states = ["Vis målnivå", "Skjul målnivå"];
  const zoom_states = ["Zoom inn", "Zoom ut"];

  function getDownloadURL(
    svgContainer: React.RefObject<HTMLDivElement>,
    callback: () => void
  ) {
    if (!svgContainer.current) return;
    console.log("Parent: ", svgContainer.current);

    const src = svgContainer.current.children[0] as SVGSVGElement;
    console.log("Parent: ", src);

    console.log("Parent: ", src);

    // const image = select('body').append('img')
    //   .style('display', 'none')
    //   .attr('width', 960)
    //   .attr('height', 500)
    //   .node();
    // console.log('image: ', image)

    // image.onload = function() {
    //   console.log('LOADING...')
    //   const canvas = select('body').append('canvas')
    //     .style('display', 'none')
    //     .attr('width', 960)
    //     .attr('height', 500)
    //     .node();

    //   const ctx = canvas.getContext('2d');
    //   ctx.drawImage(image, 0, 0);
    //   const url = canvas.toDataURL('image/png');

    //   selectAll([ canvas, image ]).remove();

    //   callback(null, url);
    // };
    // image.src = 'data:image/svg+xml,' + encodeURIComponent(src);
  }

  const handle_click = (
    current_state: string,
    states: string[],
    update_state_function: (level: string) => void
  ) => {
    const new_state = states.filter((state) => state !== current_state);
    update_state_function(new_state[0]);
  };

  useEffect(() => {
    let level_visibility =
      show_level.replace(/\s/g, "") === "Skjulmålnivå" ? "visible" : "hidden";
    let level = select(svg_container.current);
    level.selectAll("svg .level").style("visibility", level_visibility);
  }, [svg_container, show_level]);

  const dorpdown_entries = [
    {
      label: show_level,
      click: () => handle_click(show_level, level_states, update_show_level),
      class: "dd-level",
    },
    {
      label: zoom,
      click: () => handle_click(zoom, zoom_states, update_zoom),
      class: "dd-zoom",
    },
    { label: "Lukk", click: () => update_selected_row(""), class: "dd-close" },
    {
      label: "Last ned",
      click: () => getDownloadURL(svg_container, () => console.log("error")),
      class: "dd-download",
    },
  ];

  let mouse_leave_dd_cont_timeout: number;
  const menu_container_mouse_leave = () => {
    mouse_leave_dd_cont_timeout = window.setTimeout(function () {
      set_dd_menu_status("inactive");
    }, 1000);
  };

  const dd_list = dorpdown_entries.map((dd) => {
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
