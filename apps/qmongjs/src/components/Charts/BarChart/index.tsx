import { axisBottom, axisLeft, scaleBand, scaleLinear, select } from "d3";
import { useEffect, useRef } from "react";
import useDelayInitial from "../../../utils/useDelayInitial";
import { useResizeObserver } from "../../../helpers/hooks";
import styles from "./BarChart.module.css";
import { levelColor } from "../utils";
import { Level, Margin } from "../types";
import { customFormat } from "../../../helpers/functions/localFormater";

export interface BarStyle {
  opacity?: number;
  color?: string;
}

export interface Bar {
  label: string;
  value: number;
  style?: BarStyle;
}
export interface Props {
  svgContainerRef: React.RefObject<HTMLDivElement>;
  showLevel: boolean;
  data: Bar[];
  levels: Level[];
  tickformat?: string;
  zoom?: boolean;
  margin?: Margin;
  max_value?: number;
}

const MARGIN = { top: 0.05, bottom: 10, right: 0.05, left: 0.25 };

function BarChart(props: Props) {
  const {
    svgContainerRef: wrapperRef,
    data,
    showLevel: displayLevels,
    levels,
    tickformat,
    zoom = false,
    margin = {},
    max_value,
  } = props;
  const delayedZoom = useDelayInitial(zoom, false);
  const svgRef = useRef<SVGSVGElement>(null);
  const entry = useResizeObserver(wrapperRef);
  const height = Math.max(data.length * 30, 150);
  const width = entry?.contentRect.width ?? 0;

  const marginOffsets = {
    top: margin.top ?? MARGIN.top,
    right: (margin.right ?? MARGIN.right) * width,
    bottom: margin.bottom ?? MARGIN.bottom,
    left: (margin.left ?? MARGIN.left) * width,
  };
  const innerHeight = height - marginOffsets.top - marginOffsets.bottom;
  const innerWidth = width - marginOffsets.left - marginOffsets.right;
  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const svg = select(svgRef.current).selectChild<SVGGElement>();
    // Scales
    const yScale = scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, innerHeight])
      .padding(0.3);

    // Check if format is percentage
    const percentage: boolean =
      typeof tickformat === "string"
        ? tickformat.substring(tickformat.length - 1) === "%"
          ? true
          : false
        : false;

    const xScaleDomain = getXScaleDomain(
      data,
      delayedZoom,
      percentage,
      max_value
    );
    const xScale = scaleLinear()
      .domain(xScaleDomain)
      .range([0, innerWidth])
      .clamp(true);

    const yAxis = axisLeft(yScale);
    const yAxisElement = svg.select<SVGGElement>(".y-axis");
    yAxisElement.call(yAxis);
    yAxisElement.select(".domain").remove();
    yAxisElement.selectAll(".tick line").remove();
    yAxisElement.selectAll(".tick text").attr("font-size", "1.2rem");

    // X-Axis format, delete trailing zero
    const xAxisFormat = percentage
      ? "~%" // if percentage format -> delete trailing zero
      : "~";

    const barLabelFormat = typeof tickformat === "string" ? tickformat : ",.0f";

    const xAxis = axisBottom(xScale)
      .tickSize(-innerHeight)
      .ticks(6)
      .tickFormat(customFormat(xAxisFormat));
    const xAxisElement = svg.select<SVGGElement>(".x-axis");
    xAxisElement
      .style("transform", `translateY(${innerHeight}px)`)
      .transition()
      .duration(1000)
      .call(xAxis);
    xAxisElement.select(".domain").remove();
    xAxisElement.selectAll(".tick line").attr("stroke", "#D2D3D4");
    xAxisElement
      .selectAll(".tick text")
      .attr("fill", "#828586")
      .attr("font-size", "18.57px");

    // Levels
    svg
      .select(".levels")
      .selectAll(".level")
      .data(displayLevels ? levels : [])
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("class", "level")
            .attr("data-testid", ({ level }) => `level-${level}`)
            .attr("x", ({ end }) => xScale(end))
            .attr("y", 0)
            .attr("width", ({ start, end }) => xScale(start) - xScale(end))
            .attr("height", innerHeight)
            .attr("fill", ({ level }) => levelColor(level))
            .attr("opacity", 0.2),
        (update) =>
          update.call((update) =>
            update
              .transition()
              .duration(1000)
              .attr("x", ({ end }) => xScale(end))
              .attr("width", ({ start, end }) => xScale(start) - xScale(end))
          ),
        (exit) => exit.remove()
      );

    svg
      .select(".bars")
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("data-testid", (d) => `bar-${d.label}`)
      .attr("x", 0)
      .attr("y", (d) => yScale(d.label) ?? 0)
      .attr("height", yScale.bandwidth())
      .attr("fill", (d) => d.style?.color ?? "#7EBEC7")
      .attr("opacity", (d) => d.style?.opacity ?? 1)
      .transition()
      .duration(1000)
      .attr("width", (d) => xScale(d.value));

    svg
      .select(".labels")
      .selectAll(".label")
      .data(data)
      .join("text")
      .attr("class", "label")
      .attr("data-testid", (d) => `bar-label-${d.label}`)
      .attr("opacity", 0.3)
      .attr("x", 0)
      .attr("y", (d) => yScale(d.label)! + yScale.bandwidth() / 2 + 3)
      .text((d) => customFormat(barLabelFormat)(d.value))
      .attr("text-anchor", "middle")
      .attr("font-size", "0.7em")
      .attr("fill", "white")
      .transition()
      .duration(1000)
      .attr("opacity", 0.9)
      .attr("fill", (d) => (d.value > 0.95 ? "white" : "black"))
      .attr("x", (d) =>
        d.value > 0.95 ? xScale(d.value) - 18 : xScale(d.value) + 16
      );
  }, [
    data,
    displayLevels,
    levels,
    tickformat,
    delayedZoom,
    innerHeight,
    innerWidth,
    max_value,
  ]);

  return (
    <div ref={wrapperRef} style={{ width: "90%", margin: "auto" }}>
      <svg
        ref={svgRef}
        className={styles.barChart}
        height={marginOffsets.top + height + marginOffsets.bottom}
        width={width}
        style={{ backgroundColor: "white" }}
      >
        <g transform={`translate(${marginOffsets.left}, ${marginOffsets.top})`}>
          <g className="x-axis" />
          <g className="y-axis" />
          <g className="levels" />
          <g className="bars" />
          <g className="labels" />
        </g>
      </svg>
    </div>
  );
}
export default BarChart;

function getXScaleDomain(
  data: Bar[],
  zoom: boolean,
  percentage: boolean,
  max_value?: number
): [number, number] {
  const maxVal = Math.max(...data.map((d) => d.value));
  const additionalMargin = (0.01 + maxVal) * 0.2;
  const xMax = Math.ceil((maxVal + additionalMargin) * 100) / 100;

  // min is always 0 for barchart
  // If percentage and not zoom: max is 1
  // If not percentage and not zoom: max is max_value if defined
  return [
    0,
    percentage
      ? zoom
        ? Math.min(xMax, 1)
        : 1
      : zoom
      ? xMax
      : Math.max(max_value ?? xMax, xMax),
  ];
}
