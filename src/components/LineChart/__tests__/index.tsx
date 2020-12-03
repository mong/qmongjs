import { render, screen } from "@testing-library/react";
import faker from "faker";
import LineChart, { DataPoint, Props } from "..";
import { buildLevels } from "../../../test/builders";
import { clockTick } from "../../../test/clockTick";
import useResizeObserver from "../../utils";

jest.mock("../../utils");
jest.mock("../../../utils/useDelayInitial");

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

  render(<LineChart {...props} />);

  await clockTick(1500);

  expect(screen.getByText("Nasjonalt")).toBeInTheDocument();
  expect(screen.getByText("Ahus")).toBeInTheDocument();
});

test("shows only one legend item per label", async () => {
  const d1 = buildDataPoint({ label: "Nasjonalt" });
  const d2 = buildDataPoint({ label: "Nasjonalt" });
  const props = buildProps({ data: [d1, d2] });

  render(<LineChart {...props} />);

  await clockTick(1500);

  expect(screen.getAllByText("Nasjonalt").length).toBe(1);
});

// Builders
function buildDataPoint(overrides: Partial<DataPoint>): DataPoint {
  return {
    label: faker.random.uuid(),
    year: faker.random.number({ min: 2015, max: 2020 }),
    value: faker.random.number({ min: 0, max: 100 }) / 100,
    ...overrides,
  };
}

function buildProps(overrides: Partial<Props>): Props {
  return {
    data: [],
    levels: buildLevels(),
    showLevel: faker.random.boolean(),
    ...overrides,
  };
}
