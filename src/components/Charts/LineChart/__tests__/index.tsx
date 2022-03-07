import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import LineChart, { DataPoint, Props } from "..";
import { buildLevels } from "../../../../test/builders";
import { clockTick } from "../../../../test/clockTick";
import {
  useResizeObserver,
  useLegendItemPosition,
  useTextWidth,
} from "../../../../helpers/hooks";

jest.mock("../../../../helpers/hooks");
jest.mock("../../../../utils/useDelayInitial");

beforeEach(() => {
  const WIDTH = 500;
  (useResizeObserver as jest.Mock).mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });
  (useLegendItemPosition as jest.Mock).mockReturnValue({ x: 0, y: 0 });
  (useTextWidth as jest.Mock).mockReturnValue(15);
});

test("shows legend", async () => {
  const d1 = buildDataPoint({ label: "Nasjonalt" });
  const d2 = buildDataPoint({ label: "Ahus" });
  const props = buildProps({ data: [d1, d2] });

  render(<LineChartWithRef {...props} />);

  await clockTick(1500);

  expect(screen.getByText("Nasjonalt")).toBeInTheDocument();
  expect(screen.getByText("Ahus")).toBeInTheDocument();
});

test("shows only one legend item per label", async () => {
  const d1 = buildDataPoint({ label: "Nasjonalt" });
  const d2 = buildDataPoint({ label: "Nasjonalt" });
  const props = buildProps({ data: [d1, d2] });

  render(<LineChartWithRef {...props} />);

  await clockTick(1500);

  expect(screen.getAllByText("Nasjonalt").length).toBe(1);
});

// Helpers
function LineChartWithRef(props: Omit<Props, "svgContainerRef">) {
  const ref = createRef<HTMLDivElement>();
  const WIDTH = 500;
  (useResizeObserver as jest.Mock).mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });
  (useLegendItemPosition as jest.Mock).mockReturnValue({ x: 0, y: 0 });

  return <LineChart {...props} svgContainerRef={ref} />;
}

// Builders
function buildDataPoint(overrides: Partial<DataPoint>): DataPoint {
  return {
    label: (Math.random() + 1).toString(36).substring(7),
    year: Math.floor(
      Math.random() * 6 + 2015
    ) /* Random year between 2015 and 2020 */,
    value: Math.random(),
    ...overrides,
  };
}

function buildProps(overrides: Partial<Props>): Omit<Props, "svgContainerRef"> {
  return {
    data: [],
    levels: buildLevels(),
    showLevel: Math.random() < 0.5 /* Random true or false */,
    ...overrides,
  };
}
