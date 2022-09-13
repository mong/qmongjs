import {
  axisBottom,
  axisRight,
  group,
  line,
  scaleLinear,
  scaleOrdinal,
  scaleTime,
  select,
} from "d3";
import React, { useEffect, useState } from "react";
import { localPoint } from "@visx/event";
import { useTooltip } from "@visx/tooltip";

import { themeTableChartLine as theme } from "./themeTableChartLine";
import useDelayInitial from "../../../utils/useDelayInitial";
import { Level, Margin } from "../types";
import { useResizeObserver } from "../../../helpers/hooks";
import styles from "./LineChart.module.css";
import { levelColor } from "../utils";
import { Legend } from "./legend";
import { customFormat } from "../../../helpers/functions/localFormater";
import { LineChartTooltip } from "./tooltip";
import { StatisticData } from "../../RegisterPage";

const chart_colors = [
  "#4F9A94",
  "#90CAF9",
  "#B0BEC5",
  "#FFE082",
  "#2962FF",
  "#CE93D8",
  "#9C786C",
  "#BCAAA4",
  "#F8BBD0",
  "#9FA8DA",
  "#80DEEA",
  "#A5D6A7",
  "#E6EE9C",
  "#FFAB91",
  "#78909C",
];

export type DataPoint = {
  label: string;
  value: number;
} & StatisticData;

export interface Props {
  svgContainerRef: React.RefObject<HTMLDivElement>;
  showLevel: boolean;
  data: DataPoint[];
  levels: Level[];
  tickformat?: string;
  zoom?: boolean;
  margin?: Margin;
  lastCompleteYear?: number;
}

const MARGIN = { top: 8, bottom: 34, right: 0.14, left: 0.05 };

const LineChart = (props: Props) => {
  const {
    svgContainerRef,
    data,
    showLevel: displayLevels,
    levels,
    tickformat,
    zoom = false,
    margin = {},
    lastCompleteYear,
  } = props;
  //tooltip boundary detector

  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<DataPoint>();

  const handleTooltip = React.useCallback(
    (event: React.PointerEvent<SVGSVGElement>, data?: DataPoint) => {
      // coordinates should be relative to the container in which Tooltip is rendered
      const eventSvgCoords = localPoint(event) ?? { x: 0, y: 0 };
      showTooltip({
        tooltipLeft: eventSvgCoords.x,
        tooltipTop: eventSvgCoords.y,
        tooltipData: data,
      });
    },
    [showTooltip]
  );

  const [hoveredLegend, setHoveredLegend] = useState<string | null>(null);
  const [selectedLegends, setSelectedLegends] = useState<string[]>([]);
  const [legendHeight, setLegendHeight] = useState<number>(0);
  const delayedZoom = useDelayInitial(zoom, false);

  const entry = useResizeObserver(svgContainerRef);

  const width = entry?.contentRect.width ?? 0;
  const height = width / 2;

  const marginOffsets = {
    top: margin.top ?? MARGIN.top,
    right: (margin.right ?? MARGIN.right) * width,
    bottom: margin.bottom ?? MARGIN.bottom,
    left: (margin.left ?? MARGIN.left) * width,
  };

  const innerHeight = height - marginOffsets.top - marginOffsets.bottom;
  const innerWidth = width - marginOffsets.left - marginOffsets.right;
  const pathLabels = Array.from(new Set(data.map((d) => d.label)));
  const lineColorScale = scaleOrdinal<string>()
    .domain(pathLabels)
    .range(chart_colors);

  const percentage: boolean =
    typeof tickformat === "string"
      ? tickformat.substring(tickformat.length - 1) === "%"
        ? true
        : false
      : false;

  // Y-Axis format, delete trailing zero
  const yAxisFormat = percentage ? "~%" : "~";
  const yaxisLabel = percentage ? "Andel" : "Antall";

  useEffect(() => {
    if (innerWidth === 0) {
      return;
    }

    const container = select(svgContainerRef.current);

    // Scales
    const minYear = Math.min(...data.map((d) => d.year));
    const maxYear = Math.max(...data.map((d) => d.year));
    const xScale = scaleTime()
      .domain([minYear, maxYear])
      .range([0, innerWidth]);

    const yScaleDomain = getYScaleDomain(data, delayedZoom, percentage);
    const yScale = scaleLinear()
      .domain(yScaleDomain)
      .range([innerHeight, 0])
      .clamp(true);

    // Legend
    let highlightedLegends = selectedLegends;

    if (hoveredLegend) {
      highlightedLegends = Array.from(
        new Set([...selectedLegends, hoveredLegend])
      );
    }

    const yAxis = axisRight(yScale)
      .ticks(theme.y_axis_tick_number)
      .tickSize(innerWidth)
      .tickFormat(customFormat(yAxisFormat));
    const yAxisElement = container.select<SVGGElement>(".y-axis");
    yAxisElement.transition().duration(1000).call(yAxis);
    yAxisElement.select(".domain").remove();
    yAxisElement
      .selectAll(".tick line")
      .attr("stroke", theme.y_axis_tick_line_stroke);
    yAxisElement
      .selectAll(".tick text")
      .style("font-size", `${8 + innerHeight * 0.02}px`)
      .attr("fill", theme.y_axis_tick_font_fill);

    // X-Axis
    let years = Array.from(new Set(data.map((d) => d.year)));
    if (years.length > 8) {
      years =
        years.length % 2 === 0
          ? years.filter((_, i) => i % 2 !== 0)
          : years.filter((_, i) => i % 2 === 0);
    }

    const xAxis = axisBottom(xScale)
      .tickValues(years)
      .tickFormat((d) => `${d}`);
    const xAxisElement = container.select<SVGGElement>(".x-axis");
    xAxisElement.call(xAxis);
    xAxisElement.select(".domain").remove();
    xAxisElement.selectAll(".tick line").remove();
    xAxisElement
      .selectAll(".tick text")
      .style("font-size", `${10 + innerWidth * 0.015}px`)
      .attr("fill", theme.x_axis_tick_font_fill)
      .attr("y", 5 + innerHeight * 0.08);

    // Levels
    container
      .select(".levels")
      .selectAll(".level")
      .data(displayLevels ? levels : [])
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("class", "level")
            .attr("data-testid", ({ level }) => `level-${level}`)
            .attr("x", 0)
            .attr("y", (d) => yScale(d.start))
            .attr("width", innerWidth)
            .attr(
              "height",
              ({ start, end }) =>
                innerHeight - yScale(start) - (innerHeight - yScale(end))
            )
            .attr("fill", ({ level }) => levelColor(level))
            .attr("opacity", 0.2),
        (update) =>
          update.call((update) =>
            update
              .transition()
              .duration(1000)
              .attr("y", (d) => yScale(d.start))
              .attr("width", innerWidth)
              .attr(
                "height",
                ({ start, end }) =>
                  innerHeight - yScale(start) - (innerHeight - yScale(end))
              )
          ),
        (exit) => exit.remove()
      );

    // Paths
    const lines = line<DataPoint>()
      .x((d) => xScale(d.year))
      .y((d) => yScale(d.value));

    const dataComplete = lastCompleteYear
      ? data.filter(function (datapoint) {
          return datapoint.year <= lastCompleteYear;
        })
      : data;

    const dataIncomplete = lastCompleteYear
      ? data.filter(function (datapoint) {
          return datapoint.year >= lastCompleteYear;
        })
      : [];

    container
      .select(".linesComplete")
      .selectAll(".line")
      .data(group(dataComplete, (d) => d.label))
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("class", "line")
            .attr("stroke", ([label]) => lineColorScale(label))
            .style("stroke-width", 3)
            .style("stroke-linejoin", "round")
            .style("stroke-linecap", "round")
            .attr("fill", "none")
            .style("mix-blend-mode", "multiply")
            .attr("d", ([, d]) => lines(d)),
        (update) =>
          update.call((update) =>
            update
              .attr("opacity", ([label]) => {
                if (highlightedLegends.length === 0) {
                  return 1;
                }
                return highlightedLegends.includes(label) ? 1 : 0.4;
              })
              .transition()
              .duration(1000)
              .attr("d", ([, d]) => lines(d))
          ),
        (exit) => exit.remove()
      );

    container
      .select(".linesIncomplete")
      .selectAll(".line")
      .data(group(dataIncomplete, (d) => d.label))
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("class", "line")
            .attr("stroke", ([label]) => lineColorScale(label))
            .style("stroke-width", 3)
            .style("stroke-dasharray", "10, 10")
            .style("stroke-linejoin", "round")
            .style("stroke-linecap", "round")
            .attr("fill", "none")
            .style("mix-blend-mode", "multiply")
            .attr("d", ([, d]) => lines(d)),
        (update) =>
          update.call((update) =>
            update
              .attr("opacity", ([label]) => {
                if (highlightedLegends.length === 0) {
                  return 1;
                }
                return highlightedLegends.includes(label) ? 1 : 0.4;
              })
              .transition()
              .duration(1000)
              .attr("d", ([, d]) => lines(d))
          ),
        (exit) => exit.remove()
      );

    container
      .select(".dots")
      .selectAll(".dot")
      .data(data)
      .join(
        (enter) =>
          enter
            .append("circle")
            .attr("class", "dot")
            .attr("stroke", (d) => lineColorScale(d.label))
            .attr("fill", (d) => lineColorScale(d.label))
            .style("mix-blend-mode", "multiply")
            .attr("cx", (d) => xScale(d.year))
            .attr("cy", (d) => yScale(d.value)),
        (update) =>
          update.call((update) =>
            update
              .attr("opacity", (d) => {
                if (highlightedLegends.length === 0) {
                  return 1;
                }
                return highlightedLegends.includes(d.label) ? 1 : 0.4;
              })
              .transition()
              .duration(1000)
              .attr("cx", (d) => xScale(d.year))
              .attr("cy", (d) => yScale(d.value))

              .attr("stroke", (d) => lineColorScale(d.label))
              .attr("fill", (d) => lineColorScale(d.label))
          ),
        (exit) => exit.remove()
      )
      .attr("r", (d) =>
        tooltipData?.year === d.year && tooltipData?.label === d.label ? 6 : 4
      )
      .on("pointerenter", (e, d) => handleTooltip(e, d))
      .on("pointermove", (e, d) => handleTooltip(e, d))
      .on("pointerleave", () => hideTooltip());
  }, [
    data,
    delayedZoom,
    displayLevels,
    hoveredLegend,
    innerHeight,
    innerWidth,
    levels,
    tickformat,
    selectedLegends,
    svgContainerRef,
    lineColorScale,
    pathLabels,
    percentage,
    yAxisFormat,
    lastCompleteYear,
    handleTooltip,
    hideTooltip,
    tooltipData,
  ]);

  return (
    <div>
      <div
        ref={svgContainerRef}
        style={{ width: "90%", margin: "auto", position: "relative" }}
      >
        <svg
          className={styles.lineChart}
          height={
            marginOffsets.top + height + marginOffsets.bottom + legendHeight
          }
          width={marginOffsets.left + innerWidth + marginOffsets.right}
          style={{ backgroundColor: "white" }}
        >
          <Legend
            offsetLeft={marginOffsets.left}
            offsetTop={marginOffsets.top}
            legendHeight={legendHeight}
            legendWidth={innerWidth}
            setLegendHeight={setLegendHeight}
            lineColorScale={lineColorScale}
            legendLabels={pathLabels}
            setHoveredLegend={setHoveredLegend}
            selectedLegends={selectedLegends}
            setSelectedLegends={setSelectedLegends}
          />
          <g
            transform={`translate(${marginOffsets.left}, ${
              marginOffsets.top + legendHeight
            })`}
          >
            <g className="x-axis" transform={`translate(0, ${innerHeight})`} />
            <g className="y-axis">
              <text
                fill={theme.y_axis_label_fill}
                transform="rotate(-90)"
                x={-innerHeight / 1.5}
                y={innerWidth * 1.15}
                style={{
                  fontSize: `${7 + innerWidth * 0.02}px`,
                  fontFamily: theme.y_axis_label_font_family,
                }}
              >
                {yaxisLabel}
              </text>
            </g>
            <g className="levels" />
            <g className="linesComplete" />
            <g className="linesIncomplete" />
            <g className="dots" />
          </g>
        </svg>
        <LineChartTooltip
          tooltipData={tooltipData}
          tooltipLeft={tooltipLeft}
          tooltipOpen={tooltipOpen}
          tooltipTop={tooltipTop}
          format={tickformat}
        />
      </div>
    </div>
  );
};

export default LineChart;

function getYScaleDomain(
  data: DataPoint[],
  zoom: boolean,
  percentage: boolean
): [number, number] {
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));

  const additionalMargin = (maxValue - minValue) * 0.2;
  const yMin = Math.floor((minValue - additionalMargin) * 100) / 100;
  const yMax = Math.ceil((maxValue + additionalMargin) * 100) / 100;

  // yaxis max is maximum 1 (100 %) if percentage
  return [
    zoom ? Math.max(yMin, 0) : 0,
    percentage ? (zoom ? Math.min(yMax, 1) : 1) : yMax,
  ];
}
