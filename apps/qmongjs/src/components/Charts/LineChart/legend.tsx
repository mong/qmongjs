import React, { Dispatch, useRef, SetStateAction, useEffect } from "react";
import { ScaleOrdinal } from "d3";
import style from "./legend.module.css";
import {
  useResizeObserver,
  useLegendItemPosition,
  useTextWidth,
} from "../../../helpers/hooks";

interface LegendProps {
  offsetLeft: number;
  offsetTop: number;
  legendWidth: number;
  legendHeight: number;
  setLegendHeight: Dispatch<SetStateAction<number>>;
  lineColorScale: ScaleOrdinal<string, string, never>;
  legendLabels: string[];
  setHoveredLegend: Dispatch<SetStateAction<string | null>>;
  selectedLegends: string[] | [];
  setSelectedLegends: Dispatch<SetStateAction<string[] | []>>;
}
export const Legend: React.FC<LegendProps> = ({
  offsetLeft,
  offsetTop,
  legendWidth,
  legendLabels,
  lineColorScale,
  legendHeight,
  setLegendHeight,
  setHoveredLegend,
  selectedLegends,
  setSelectedLegends,
}) => {
  const legendRef = useRef<SVGGElement | null>(null);

  const legendH = Math.ceil(
    useResizeObserver(legendRef)?.contentRect.height ?? 0
  );
  const legendLabelsString = legendLabels.toString();

  useEffect(() => {
    if (legendRef.current) {
      setLegendHeight(30 + legendH);
    }
  }, [legendHeight, legendH, legendLabelsString, setLegendHeight]);

  const LI = legendLabels.map((d, i) => {
    return (
      <LegendItem
        key={`${d} ${lineColorScale(d)}${i}`}
        label={d}
        legendLabelsString={legendLabelsString}
        color={lineColorScale(d)}
        legendWidth={legendWidth}
        setHoveredLegend={setHoveredLegend}
        selectedLegends={selectedLegends}
        setSelectedLegends={setSelectedLegends}
      />
    );
  });

  return (
    <g ref={legendRef} transform={`translate(${offsetLeft}, ${offsetTop})`}>
      {LI}
    </g>
  );
};

interface LegendItemProps {
  label: string;
  color: string;
  legendWidth: number;
  setHoveredLegend: Dispatch<SetStateAction<string | null>>;
  selectedLegends: string[];
  setSelectedLegends: Dispatch<SetStateAction<string[] | []>>;
  legendLabelsString: string;
}

const LegendItem: React.FC<LegendItemProps> = ({
  label,
  color,
  legendWidth,
  setHoveredLegend,
  selectedLegends,
  setSelectedLegends,
  legendLabelsString,
}) => {
  const legendRef = useRef<SVGGElement | null>(null);
  const textRef = useRef<SVGTextElement | null>(null);
  const textWidth = useTextWidth(textRef.current, label, color, legendWidth);

  const vMargin = 30;
  const hMargin = 10;

  const { x, y } = useLegendItemPosition(
    legendRef.current,
    legendWidth,
    vMargin,
    hMargin,
    legendLabelsString,
    textWidth
  );

  return (
    <g
      onMouseOver={() => setHoveredLegend(label)}
      onMouseOut={() =>
        setHoveredLegend((current: string | null) =>
          current === label ? null : current
        )
      }
      onClick={() => {
        setHoveredLegend((current) => (current === label ? null : current));
        setSelectedLegends((selected: string[]) => {
          if (selected.includes(label)) {
            return selected.filter((s) => s !== label);
          }
          return [...selected, label];
        });
      }}
      opacity={
        selectedLegends.length === 0
          ? 1
          : selectedLegends.includes(label)
          ? 1
          : 0.4
      }
      className={`${style.legendItem} ${label.replace(/\s/g, "")}`}
      ref={legendRef}
      transform={`translate(${x},${y})`}
    >
      <text
        ref={textRef}
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="0.9rem"
        textAnchor="start"
        fill="#2D3034"
        dy={"0.35em"}
        x={0}
        y={0}
      >
        {" "}
        {label}
      </text>
      <line
        x1={0}
        y1={15}
        x2={textWidth}
        y2={15}
        strokeWidth={4}
        stroke={color}
        strokeLinecap="round"
      />
    </g>
  );
};
