import {
  axisBottom,
  axisLeft,
  format,
  scaleBand,
  scaleLinear,
  select,
  max,
} from "d3";
import React, { useEffect, useRef } from "react";
import { Level } from "../TF_FIGURE/Chart";
import useResizeObserver from "../utils";
import styles from "./BarChart.module.css";

export interface DataPoint {
  label: string;
  value: number;
}

export interface Props {
  displayLevels: boolean;
  data: DataPoint[];
  levels: Level[];
  zoom?: boolean;
}

function levelColor(level: string) {
  switch (level) {
    case "high":
      return "#3baa34";
    case "mid":
      return "#fd9c00";
    case "low":
      return "#e30713";
    default:
      throw new Error(`${level} is not a valid level`);
  }
}

function BarChart({ data, displayLevels, levels, zoom = false }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const entry = useResizeObserver(wrapperRef);

  const height = data.length * 50;
  const width = entry?.contentRect.width ?? 0;

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const svg = select(svgRef.current);

    // Scales
    const yScale = scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, height])
      .padding(0.5);

    const xScaleDomain = getXScaleDomain(data, zoom);

    const xScale = scaleLinear().domain(xScaleDomain).range([0, width]);

    // Y-Axis
    const yAxis = axisLeft(yScale);
    const yAxisElement = svg.select<SVGGElement>(".y-axis");
    yAxisElement.call(yAxis);
    yAxisElement.select(".domain").remove();
    yAxisElement.selectAll(".tick line").remove();

    // X-Axis
    const xAxis = axisBottom(xScale)
      .tickSize(-height)
      .ticks(6)
      .tickFormat(format(",.0%"));
    const xAxisElement = svg.select<SVGGElement>(".x-axis");
    xAxisElement.style("transform", `translateY(${height}px)`).call(xAxis);
    xAxisElement.select(".domain").remove();
    xAxisElement.selectAll(".tick line").attr("stroke", "#D2D3D4");
    xAxisElement
      .selectAll(".tick text")
      .attr("fill", "#828586")
      .attr("font-size", "18.57px");

    // Levels
    svg
      .selectAll(".level")
      .data(levels)
      .join("rect")
      .attr("class", "level")
      .attr("data-testid", ({ level }) => `level-${level}`)
      .attr("y", 0)
      .attr("x", ({ end }) => xScale(end))
      .attr("width", ({ start, end }) => xScale(start - end))
      .attr("height", height)
      .attr("fill", ({ level }) => levelColor(level))
      .attr("opacity", "0.2")
      .attr("visibility", displayLevels ? "visible" : "hidden");

    // Bars
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("data-testid", (d) => `bar-${d.label}`)
      .attr("x", 0)
      .attr("y", (d) => yScale(d.label) ?? 0)
      .attr("height", yScale.bandwidth())
      .attr("fill", "#00263d")
      .transition()
      .attr("width", (d) => xScale(d.value));
  }, [data, width, height, displayLevels, levels, zoom]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <svg ref={svgRef} className={styles.barChart} height={height}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
}

export default BarChart;

function getXScaleDomain(data: DataPoint[], zoom: boolean): [number, number] {
  if (!zoom) {
    return [0, 1];
  }

  const xMaxVal = max(data, (d) => d.value) ?? 0;
  const additionalMargin = (0.01 + xMaxVal) * 0.2;
  const domainWidth = Math.ceil((xMaxVal + additionalMargin) * 100) / 100;

  return [0, Math.min(domainWidth, 1)];
}
