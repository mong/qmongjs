/**
 * To view a rendered version of all the snapshots:
 *
 * Copy the contents of ./__snapshots__/index.tsx.snap
 * Got to https://codesandbox.io/s/snapshot-viewer-lqjjsm?file=/src/snapshots.js
 * Replace the contents with what you copied
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
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

test("Render without levels @250px", async () => {
  const WIDTH = 250;
  (useResizeObserver as jest.Mock).mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });
  const { container } = render(
    <LineChartWithRef
      showLevel={false}
      levels={[
        { level: "high", start: 1, end: 0.9 },
        { level: "mid", start: 0.9, end: 0.5 },
        { level: "low", start: 0.5, end: 0 },
      ]}
      tickformat={undefined}
      data={[
        {
          label: "a",
          value: 0.5,
          year: 2020,
          id: 1006,
          ind_id: "barnediabetes_hba1c_ge_9",
          unit_level: "nation",
          unit_name: "Nasjonalt",
          orgnr: 1,
          denominator: 2775,
          var: 0.1081,
          level: "L",
          level_direction: 0,
          dg: null,
          include: 1,
          type: "andel",
          delivery_time: new Date("October 13, 2014 11:13:00"),
          delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
        },
        {
          label: "a",
          value: 0.15,
          year: 2019,
          id: 1006,
          ind_id: "barnediabetes_hba1c_ge_9",
          unit_level: "nation",
          unit_name: "Nasjonalt",
          orgnr: 1,

          denominator: 2775,
          var: 0.1081,
          level: "L",
          level_direction: 0,
          dg: null,
          include: 1,
          type: "andel",
          delivery_time: new Date("October 13, 2014 11:13:00"),
          delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
        },
        {
          label: "a",
          value: 0.3,
          year: 2018,
          id: 1006,
          ind_id: "barnediabetes_hba1c_ge_9",
          unit_level: "nation",
          unit_name: "Nasjonalt",
          orgnr: 1,

          denominator: 2775,
          var: 0.1081,
          level: "L",
          level_direction: 0,
          dg: null,
          include: 1,
          type: "andel",
          delivery_time: new Date("October 13, 2014 11:13:00"),
          delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
        },
        {
          label: "a",
          value: 0.1,
          year: 2017,
          id: 1006,
          ind_id: "barnediabetes_hba1c_ge_9",
          unit_level: "nation",
          unit_name: "Nasjonalt",
          orgnr: 1,

          denominator: 2775,
          var: 0.1081,
          level: "L",
          level_direction: 0,
          dg: null,
          include: 1,
          type: "andel",
          delivery_time: new Date("October 13, 2014 11:13:00"),
          delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
        },
      ]}
    />
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

test("Render with levels @500px", async () => {
  const WIDTH = 500;
  (useResizeObserver as jest.Mock).mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });
  const { container } = render(
    <LineChartWithRef
      showLevel={true}
      levels={[
        { level: "high", start: 1, end: 0.9 },
        { level: "mid", start: 0.9, end: 0.5 },
        { level: "low", start: 0.5, end: 0 },
      ]}
      tickformat=",.0%"
      data={[
        {
          label: "test",
          value: 0.513343,
          year: 2020,
          id: 1006,
          ind_id: "barnediabetes_hba1c_ge_9",
          unit_level: "nation",
          unit_name: "Nasjonalt",
          orgnr: 1,

          denominator: 2775,
          var: 0.1081,
          level: "L",
          level_direction: 0,
          dg: null,
          include: 1,
          type: "andel",
          delivery_time: new Date("October 13, 2014 11:13:00"),
          delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
        },
        {
          label: "test",
          value: 0.15,
          year: 2019,
          id: 1006,
          ind_id: "barnediabetes_hba1c_ge_9",
          unit_level: "nation",
          unit_name: "Nasjonalt",
          orgnr: 1,

          denominator: 2775,
          var: 0.1081,
          level: "L",
          level_direction: 0,
          dg: null,
          include: 1,
          type: "andel",
          delivery_time: new Date("October 13, 2014 11:13:00"),
          delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
        },
        {
          label: "test",
          value: 0.3532,
          year: 2018,
          id: 1006,
          ind_id: "barnediabetes_hba1c_ge_9",
          unit_level: "nation",
          unit_name: "Nasjonalt",
          orgnr: 1,

          denominator: 2775,
          var: 0.1081,
          level: "L",
          level_direction: 0,
          dg: null,
          include: 1,
          type: "andel",
          delivery_time: new Date("October 13, 2014 11:13:00"),
          delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
        },
        {
          label: "test",
          value: 0.124,
          year: 2017,
          id: 1006,
          ind_id: "barnediabetes_hba1c_ge_9",
          unit_level: "nation",
          unit_name: "Nasjonalt",
          orgnr: 1,

          denominator: 2775,
          var: 0.1081,
          level: "L",
          level_direction: 0,
          dg: null,
          include: 1,
          type: "andel",
          delivery_time: new Date("October 13, 2014 11:13:00"),
          delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
        },
      ]}
    />
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

test("Render with levels reversed @500px", async () => {
  const WIDTH = 500;
  (useResizeObserver as jest.Mock).mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });
  const { container } = render(
    <LineChartWithRef
      showLevel={true}
      levels={[
        { level: "high", start: 0.2, end: 0 },
        { level: "mid", start: 0.4, end: 0.2 },
        { level: "low", start: 1, end: 0.4 },
      ]}
      tickformat=",.3f"
      lastCompleteYear={2019}
      data={[
        {
          label: "test",
          value: 0.513343,
          year: 2020,
          id: 1006,
          ind_id: "barnediabetes_hba1c_ge_9",
          unit_level: "nation",
          unit_name: "Nasjonalt",
          orgnr: 1,

          denominator: 2775,
          var: 0.1081,
          level: "L",
          level_direction: 0,
          dg: null,
          include: 1,
          type: "andel",
          delivery_time: new Date("October 13, 2014 11:13:00"),
          delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
        },
        {
          label: "test",
          value: 0.15,
          year: 2019,
          id: 1006,
          ind_id: "barnediabetes_hba1c_ge_9",
          unit_level: "nation",
          unit_name: "Nasjonalt",
          orgnr: 1,

          denominator: 2775,
          var: 0.1081,
          level: "L",
          level_direction: 0,
          dg: null,
          include: 1,
          type: "andel",
          delivery_time: new Date("October 13, 2014 11:13:00"),
          delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
        },
        {
          label: "test",
          value: 0.3532,
          year: 2018,
          id: 1006,
          ind_id: "barnediabetes_hba1c_ge_9",
          unit_level: "nation",
          unit_name: "Nasjonalt",
          orgnr: 1,

          denominator: 2775,
          var: 0.1081,
          level: "L",
          level_direction: 0,
          dg: null,
          include: 1,
          type: "andel",
          delivery_time: new Date("October 13, 2014 11:13:00"),
          delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
        },
        {
          label: "test",
          value: 0.124,
          year: 2017,
          id: 1006,
          ind_id: "barnediabetes_hba1c_ge_9",
          unit_level: "nation",
          unit_name: "Nasjonalt",
          orgnr: 1,

          denominator: 2775,
          var: 0.1081,
          level: "L",
          level_direction: 0,
          dg: null,
          include: 1,
          type: "andel",
          delivery_time: new Date("October 13, 2014 11:13:00"),
          delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
        },
        {
          label: "test2",
          value: 0.13343,
          year: 2020,
          id: 1006,
          ind_id: "barnediabetes_hba1c_ge_9",
          unit_level: "nation",
          unit_name: "Nasjonalt",
          orgnr: 1,

          denominator: 2775,
          var: 0.1081,
          level: "L",
          level_direction: 0,
          dg: null,
          include: 1,
          type: "andel",
          delivery_time: new Date("October 13, 2014 11:13:00"),
          delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
        },
        {
          label: "test2",
          value: 0.5,
          year: 2019,
          id: 1006,
          ind_id: "barnediabetes_hba1c_ge_9",
          unit_level: "nation",
          unit_name: "Nasjonalt",
          orgnr: 1,

          denominator: 2775,
          var: 0.1081,
          level: "L",
          level_direction: 0,
          dg: null,
          include: 1,
          type: "andel",
          delivery_time: new Date("October 13, 2014 11:13:00"),
          delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
        },
        {
          label: "test2",
          value: 0.532,
          year: 2018,
          id: 1006,
          ind_id: "barnediabetes_hba1c_ge_9",
          unit_level: "nation",
          unit_name: "Nasjonalt",
          orgnr: 1,

          denominator: 2775,
          var: 0.1081,
          level: "L",
          level_direction: 0,
          dg: null,
          include: 1,
          type: "andel",
          delivery_time: new Date("October 13, 2014 11:13:00"),
          delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
        },
        {
          label: "test2",
          value: 0.24,
          year: 2017,
          id: 1006,
          ind_id: "barnediabetes_hba1c_ge_9",
          unit_level: "nation",
          unit_name: "Nasjonalt",
          orgnr: 1,

          denominator: 2775,
          var: 0.1081,
          level: "L",
          level_direction: 0,
          dg: null,
          include: 1,
          type: "andel",
          delivery_time: new Date("October 13, 2014 11:13:00"),
          delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
        },
      ]}
    />
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
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
    id: 1006,
    ind_id: "barnediabetes_hba1c_ge_9",
    unit_level: "nation",
    unit_name: "Nasjonalt",
    orgnr: 1,

    denominator: 2775,
    var: 0.1081,
    level: "L",
    level_direction: 0,
    dg: null,
    include: 1,
    type: "andel",
    delivery_time: new Date("October 13, 2014 11:13:00"),
    delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
    ...overrides,
  };
}

function buildProps(overrides: Partial<Props>): Omit<Props, "svgContainerRef"> {
  return {
    data: [],
    levels: buildLevels(),
    showLevel: Math.random() < 0.5 /* Random true or false */,
    tickformat: undefined,
    ...overrides,
  };
}
