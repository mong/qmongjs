import { render, waitFor, screen } from "@testing-library/react";
import React from "react";
import { build, fake } from "@jackfranklin/test-data-bot";
import BarChart, { Props, DataPoint, Levels } from "..";
import useResizeObserver from "../../utils";

jest.mock("../../utils");

test("Bar widths are correct", async () => {
  const WIDTH = 500;
  (useResizeObserver as jest.Mock).mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });

  const props = propsBuilder();

  render(<BarChart {...props} />);

  await waitFor(() => {
    for (const dataPoint of props.data) {
      const bar = screen.getByTestId(`bar-${dataPoint.label}`);

      const width = bar.getAttribute("width") ?? "";
      expect(parseFloat(width)).toBeCloseTo(dataPoint.value * WIDTH);
    }
  });
});

test("Level widths are correct", async () => {
  const WIDTH = 500;
  (useResizeObserver as jest.Mock).mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });

  const props = propsBuilder();

  render(<BarChart {...props} />);

  const { low, mid } = props.levels;

  await waitFor(() => {
    // Low
    const lowLevel = screen.getByTestId(`level-low`);

    const lowLevelX = lowLevel.getAttribute("x") ?? "";
    expect(parseFloat(lowLevelX)).toBeCloseTo(0);

    const lowLevelWidth = lowLevel.getAttribute("width") ?? "";
    expect(parseFloat(lowLevelWidth)).toBeCloseTo(low * WIDTH);

    // Mid
    const midLevel = screen.getByTestId(`level-mid`);

    const midLevelX = midLevel.getAttribute("x") ?? "";
    expect(parseFloat(midLevelX)).toBeCloseTo(low * WIDTH);

    const midLevelWidth = midLevel.getAttribute("width") ?? "";
    expect(parseFloat(midLevelWidth)).toBeCloseTo(mid * WIDTH - low * WIDTH);

    // High
    const highLevel = screen.getByTestId(`level-high`);

    const highLevelX = highLevel.getAttribute("x") ?? "";
    expect(parseFloat(highLevelX)).toBeCloseTo(mid * WIDTH);

    const highLevelWidth = highLevel.getAttribute("width") ?? "";
    expect(parseFloat(highLevelWidth)).toBeCloseTo(WIDTH - mid * WIDTH);
  });
});

test("Render without levels @250px", async () => {
  const WIDTH = 250;
  (useResizeObserver as jest.Mock).mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });

  const { container } = render(
    <BarChart
      displayLevels={false}
      data={[
        { label: "a", value: 1 },
        { label: "b", value: 0.15 },
        { label: "c", value: 0.3 },
        { label: "d", value: 0.1 },
      ]}
      levels={{
        mid: 0.9,
        low: 0.5,
      }}
    />
  );

  await waitFor(() => {
    const width = screen.getByTestId("bar-a")?.getAttribute("width");
    expect(width).toBe(`${WIDTH}`);
  });

  expect(container).toMatchSnapshot();
});

test("Render with levels @250px", async () => {
  const WIDTH = 250;
  (useResizeObserver as jest.Mock).mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });

  const { container } = render(
    <BarChart
      displayLevels={true}
      data={[
        { label: "a", value: 1 },
        { label: "b", value: 0.15 },
        { label: "c", value: 0.3 },
        { label: "d", value: 0.1 },
      ]}
      levels={{
        mid: 0.9,
        low: 0.5,
      }}
    />
  );

  await waitFor(() => {
    const width = screen.getByTestId("bar-a")?.getAttribute("width");
    expect(width).toBe(`${WIDTH}`);
  });

  expect(container).toMatchSnapshot();
});

test("Render without levels @500px", async () => {
  const WIDTH = 500;
  (useResizeObserver as jest.Mock).mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });

  const { container } = render(
    <BarChart
      displayLevels={false}
      data={[
        { label: "a", value: 1 },
        { label: "b", value: 0.15 },
        { label: "c", value: 0.3 },
        { label: "d", value: 0.1 },
      ]}
      levels={{
        mid: 0.9,
        low: 0.5,
      }}
    />
  );

  await waitFor(() => {
    const width = screen.getByTestId("bar-a")?.getAttribute("width");
    expect(width).toBe(`${WIDTH}`);
  });

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
    <BarChart
      displayLevels={true}
      data={[
        { label: "a", value: 1 },
        { label: "b", value: 0.15 },
        { label: "c", value: 0.3 },
        { label: "d", value: 0.1 },
      ]}
      levels={{
        mid: 0.9,
        low: 0.5,
      }}
    />
  );

  await waitFor(() => {
    const width = screen.getByTestId("bar-a")?.getAttribute("width");
    expect(width).toBe(`${WIDTH}`);
  });

  expect(container).toMatchSnapshot();
});

// Builders

const dataPointBuilder = build<DataPoint>("DataPoint", {
  fields: {
    label: fake((f) => f.random.uuid()),
    value: fake((f) => f.random.number(100) / 100),
  },
});

const propsBuilder = build<Props>("Props", {
  fields: {
    displayLevels: fake((f) => f.random.boolean()),
    data: fake((f) =>
      Array.from(
        { length: f.random.number({ min: 1, max: 10 }) },
        dataPointBuilder
      )
    ),
    levels: fake(
      (f): Levels => {
        const low = f.random.number({ min: 0, max: 100 });
        const mid = f.random.number({ min: low, max: 100 });

        return {
          low: low / 100,
          mid: mid / 100,
        };
      }
    ),
  },
});
