import {
  axisBottom,
  axisLeft,
  format,
  scaleBand,
  scaleLinear,
  select,
} from "d3";
import { useEffect, useRef } from "react";
import useDelayInitial from "../../../utils/useDelayInitial";
import useResizeObserver from "../../utils";
import styles from "./BarChart.module.css";
import { levelColor } from "../utils";
import { Level, Margin } from "../types";

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
  zoom?: boolean;
  margin?: Margin;
}

const MARGIN = { top: 0.05, bottom: 10, right: 0.15, left: 0.2 };

function BarChart(props: Props) {
  const {
    svgContainerRef: wrapperRef,
    data,
    showLevel: displayLevels,
    levels,
    zoom = false,
    margin = {},
  } = props;

  const delayedZoom = useDelayInitial(zoom, false);
  const svgRef = useRef<SVGSVGElement>(null);
  const entry = useResizeObserver(wrapperRef);

  const height = Math.max(data.length * 50, 250);
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
      .padding(0.5);

    const xScaleDomain = getXScaleDomain(data, delayedZoom);

    const xScale = scaleLinear()
      .domain(xScaleDomain)
      .range([0, innerWidth])
      .clamp(true);

    // Y-Axis
    const yAxis = axisLeft(yScale);
    const yAxisElement = svg.select<SVGGElement>(".y-axis");
    yAxisElement.call(yAxis);
    yAxisElement.select(".domain").remove();
    yAxisElement.selectAll(".tick line").remove();
    yAxisElement.selectAll(".tick text").attr("font-size", "0.9rem");

    // X-Axis
    const xAxis = axisBottom(xScale)
      .tickSize(-innerHeight)
      .ticks(6)
      .tickFormat(format(",.0%"));
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

    // Bars
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
  }, [data, displayLevels, levels, delayedZoom, innerHeight, innerWidth]);

  return (
    <div ref={wrapperRef}>
      <svg
        ref={svgRef}
        className={styles.barChart}
        height={marginOffsets.top + height + marginOffsets.bottom}
        width={marginOffsets.left + width + marginOffsets.right}
      >
        <g transform={`translate(${marginOffsets.left}, ${marginOffsets.top})`}>
          <g className="x-axis" />
          <g className="y-axis" />
          <g className="levels" />
          <g className="bars" />
        </g>
      </svg>
    </div>
  );
}

export default BarChart;

function getXScaleDomain(data: Bar[], zoom: boolean): [number, number] {
  if (!zoom) {
    return [0, 1];
  }

  const maxVal = Math.max(...data.map((d) => d.value));
  const additionalMargin = (0.01 + maxVal) * 0.2;
  const xMax = Math.ceil((maxVal + additionalMargin) * 100) / 100;

  return [0, Math.min(xMax, 1)];
}
