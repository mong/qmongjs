import React from "react";
import style from "./chartrowbuttons.module.css";
import { FiDownload } from "react-icons/fi";
import { UrlUpdateType } from "use-query-params";
import { VscChromeClose, VscZoomOut, VscZoomIn } from "react-icons/vsc";
import { BiBarChart, BiLineChart } from "react-icons/bi";
import { select, selectAll } from "d3";

import { Description } from "../../RegisterPage";

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
  updateChartType: (
    newValue: "line" | "bar",
    updateType?: UrlUpdateType | undefined
  ) => void;
}

const FigureButtons = (props: Props) => {
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
    updateChartType,
  } = props;

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

  const buttonValues = [
    {
      label:
        chartType === "line" ? (
          <>
            <BiBarChart style={{ transform: "rotate(90deg)" }} />{" "}
            <span>Søyle</span>
          </>
        ) : (
          <>
            <BiLineChart /> Linje
          </>
        ),
      click: () => updateChartType(chartType === "line" ? "bar" : "line"),
      class: "btn-charttype",
      //style: { border: "2px solid rgba(0, 0, 0, 0.1)" },
      title: chartType === "line" ? "Søyle" : "Linje",
    },
    {
      label: show_level ? "Skjul målnivå" : "Vis målnivå",
      click: () => update_show_level((showLevel) => !showLevel),
      class: "btn-level",
      //style: { border: "2px solid rgba(0, 0, 0, 0.1)" },
      title: show_level ? "Skjul målnivå" : "Vis målnivå",
    },
    {
      label: zoom ? <VscZoomOut /> : <VscZoomIn />,
      click: () => update_zoom((zoom) => !zoom),
      class: "btn-zoom",
      style: {},
      title: zoom ? "zoom ut" : "zoom in",
    },
    {
      label: <FiDownload />,
      click: () => getDownloadURL(svgContainer),
      class: "btn-download",
      style: {},
      title: "Last ned figur",
    },
    {
      label: <VscChromeClose />,
      click: () => update_selected_row(undefined),
      class: "btn-close",
      style: {},
      title: "Lukk",
    },
  ];

  const buttons = buttonValues
    .filter(
      (btn) => description.level_green !== null || btn.class !== "btn-level"
    )
    .map((btn) => {
      return (
        <button
          key={btn.class}
          aria-pressed={false}
          aria-label={btn.title}
          className={style[btn.class]}
          onClick={btn.click}
          title={btn.title ?? undefined}
          style={{ ...btn.style }}
        >
          {" "}
          {btn.label}{" "}
        </button>
      );
    });
  return <div className={style["btn-container"]}>{buttons}</div>;
};

export default FigureButtons;
