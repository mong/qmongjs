import { render, waitFor, screen } from "@testing-library/react";
import React from "react";
import { build, fake, bool } from "@jackfranklin/test-data-bot";
import BarChart, { Props, DataPoint } from "..";
import useResizeObserver from "../../utils";
import { Level } from "../../TF_FIGURE/Chart";

jest.mock("../../utils");

/**
 * Move all d3 transitions a specified amount of milliseconds forward in time.
 * @param milliseconds Milliseconds to move transitions forward in time
 */
function clockTick(milliseconds: number) {
  const currentNow = performance.now();

  const now = performance.now;
  performance.now = () => currentNow + milliseconds;
  // The new animation frame means d3's timers will check performance.now() again
  return new Promise((resolve) =>
    requestAnimationFrame((time) => {
      performance.now = now;
      resolve(time);
    })
  );
}

test("Bar widths are correct", async () => {
  const WIDTH = 500;
  (useResizeObserver as jest.Mock).mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });

  const props = propsBuilder();

  render(
    <BarChart
      {...props}
      zoom={false}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    />
  );

  await clockTick(1500);

  for (const dataPoint of props.data) {
    const bar = screen.getByTestId(`bar-${dataPoint.label}`);

    const width = bar.getAttribute("width") ?? "";
    expect(parseFloat(width)).toBeCloseTo(dataPoint.value * WIDTH);
  }
});

test("Level widths are correct", async () => {
  const WIDTH = 500;
  (useResizeObserver as jest.Mock).mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });

  const props = propsBuilder();

  render(
    <BarChart
      {...props}
      zoom={false}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    />
  );

  await clockTick(1500);

  for (const l of props.levels) {
    const level = screen.getByTestId(`level-${l.level}`);

    const levelX = level.getAttribute("x") ?? "";
    expect(parseFloat(levelX)).toBeCloseTo(l.end * WIDTH);

    const levelWidth = level.getAttribute("width") ?? "";
    expect(parseFloat(levelWidth)).toBeCloseTo(l.start * WIDTH - l.end * WIDTH);
  }
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
      levels={[
        { level: "high", start: 1, end: 0.09 },
        { level: "mid", start: 0.9, end: 0.5 },
        { level: "low", start: 0.5, end: 0 },
      ]}
      zoom={false}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    />
  );

  await clockTick(1500);

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
      levels={[
        { level: "high", start: 1, end: 0.09 },
        { level: "mid", start: 0.9, end: 0.5 },
        { level: "low", start: 0.5, end: 0 },
      ]}
      zoom={false}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    />
  );

  await clockTick(1500);

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
      levels={[
        { level: "high", start: 1, end: 0.09 },
        { level: "mid", start: 0.9, end: 0.5 },
        { level: "low", start: 0.5, end: 0 },
      ]}
      zoom={false}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
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
    <BarChart
      displayLevels={true}
      data={[
        { label: "a", value: 1 },
        { label: "b", value: 0.15 },
        { label: "c", value: 0.3 },
        { label: "d", value: 0.1 },
      ]}
      levels={[
        { level: "high", start: 1, end: 0.09 },
        { level: "mid", start: 0.9, end: 0.5 },
        { level: "low", start: 0.5, end: 0 },
      ]}
      zoom={false}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
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
    <BarChart
      displayLevels={true}
      data={[
        { label: "a", value: 1 },
        { label: "b", value: 0.15 },
        { label: "c", value: 0.3 },
        { label: "d", value: 0.1 },
      ]}
      levels={[
        { level: "high", start: 0.5, end: 0 },
        { level: "mid", start: 0.9, end: 0.5 },
        { level: "low", start: 1, end: 0.9 },
      ]}
      zoom={false}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    />
  );

  await clockTick(1500);

  expect(container).toMatchSnapshot();
});

test("Render zoomed with levels @500px", async () => {
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
      levels={[
        { level: "high", start: 1, end: 0.09 },
        { level: "mid", start: 0.9, end: 0.5 },
        { level: "low", start: 0.5, end: 0 },
      ]}
      zoom
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    />
  );

  await clockTick(1500);

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
    displayLevels: bool(),
    data: fake((f) =>
      Array.from(
        { length: f.random.number({ min: 1, max: 10 }) },
        dataPointBuilder
      )
    ),
    levels: fake((f): Level[] => {
      const low = f.random.number({ min: 0, max: 100 }) / 100;
      const mid = f.random.number({ min: low * 100, max: 100 }) / 100;

      return [
        { level: "high", start: mid, end: 1 },
        { level: "mid", start: low, end: mid },
        { level: "low", start: 0, end: low },
      ];
    }),
    zoom: bool(),
  },
});
