import { render } from "@testing-library/react";
import faker from "faker";
import { useRef } from "react";
import LineChart, { DataPoint, Props } from "..";
import { buildLevels } from "../../../../test/builders";
import { clockTick } from "../../../../test/clockTick";
import { useResizeObserver } from "../../../../helpers/hooks";

jest.mock("../../../../helpers/hooks");
jest.mock("../../../../utils/useDelayInitial");

beforeEach(() => {
  const WIDTH = 500;
  (useResizeObserver as jest.Mock).mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });
});

test("shows legend", async () => {
  const d1 = buildDataPoint({ label: "Nasjonalt" });
  const d2 = buildDataPoint({ label: "Ahus" });
  const props = buildProps({ data: [d1, d2] });

  render(<LineChartWithRef {...props} />);

  await clockTick(1500);

  //expect(screen.getByText("Nasjonalt")).toBeInTheDocument();
  //expect(screen.getByText("Ahus")).toBeInTheDocument();
});

test("shows only one legend item per label", async () => {
  const d1 = buildDataPoint({ label: "Nasjonalt" });
  const d2 = buildDataPoint({ label: "Nasjonalt" });
  const props = buildProps({ data: [d1, d2] });

  render(<LineChartWithRef {...props} />);

  await clockTick(1500);

  //expect(screen.getAllByText("Nasjonalt").length).toBe(1);
});

// Helpers
function LineChartWithRef(props: Omit<Props, "svgContainerRef">) {
  const ref = useRef<HTMLDivElement>(null);
  const WIDTH = 500;
  (useResizeObserver as jest.Mock).mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });
  return <LineChart {...props} svgContainerRef={ref} />;
}

// Builders
function buildDataPoint(overrides: Partial<DataPoint>): DataPoint {
  return {
    label: faker.datatype.uuid(),
    year: faker.datatype.number({ min: 2015, max: 2020 }),
    value: faker.datatype.number({ min: 0, max: 100 }) / 100,
    ...overrides,
  };
}

function buildProps(overrides: Partial<Props>): Omit<Props, "svgContainerRef"> {
  return {
    data: [],
    levels: buildLevels(),
    showLevel: faker.datatype.boolean(),
    ...overrides,
  };
}
