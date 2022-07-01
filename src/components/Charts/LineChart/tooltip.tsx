import { flexbox } from "@mui/system";
import { defaultStyles, Tooltip } from "@visx/tooltip";

import { TooltipInPortalProps } from "@visx/tooltip/lib/hooks/useTooltipInPortal";
import React from "react";
import { DataPoint } from ".";
import { IndicatorData } from "../../IndicatorTable/indicatorvalue";

const tooltipStyles: React.CSSProperties = {
  ...defaultStyles,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  minWidth: 60,
  padding: "10px",
  backgroundColor: "white",
  opacity: 0.8,
  color: "black",
};

type ChartTooltipProps = {
  tooltipOpen: boolean;
  tooltipLeft?: number;
  tooltipTop: number | undefined;
  tooltipData?: DataPoint;
  format?: string;
};

export const LineChartTooltip: React.FC<ChartTooltipProps> = ({
  tooltipData,
  tooltipLeft,
  tooltipOpen,
  tooltipTop,
  format,
}) => {
  return (
    <>
      {tooltipOpen && tooltipData && (
        <Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
          <div
            style={{
              marginBottom: "10px",
              fontSize: "1.3rem",
              fontWeight: 500,
            }}
          >
            {tooltipData.label}
          </div>
          <div>{tooltipData.year}</div>
          <IndicatorData indicatorData={tooltipData} format={format} />
        </Tooltip>
      )}
    </>
  );
};
