import { render, waitFor, screen } from "@testing-library/react";
import React from "react";
import { build, fake } from "@jackfranklin/test-data-bot";
import BarChart, { DataPoint } from "..";
import useResizeObserver from "../../utils";

jest.mock("../../utils");

const dataPointBuilder = build<DataPoint>("DataPoint", {
  fields: {
    label: fake((f) => f.random.uuid()),
    value: fake((f) => f.random.number(100) / 100),
  },
});

test("Bars widths are correct", async () => {
  const WIDTH = 500;
  (useResizeObserver as jest.Mock).mockReturnValue({
    contentRect: {
      width: WIDTH,
    },
  });

  const data: DataPoint[] = [
    dataPointBuilder(),
    dataPointBuilder(),
    dataPointBuilder(),
  ];

  render(
    <BarChart
      displayLevels={false}
      data={data}
      levels={{
        high: { start: 0.9, end: 1 },
        mid: { start: 0.5, end: 0.9 },
        low: { start: 0, end: 0.5 },
      }}
    />
  );

  await waitFor(() => {
    for (const dataPoint of data) {
      const width = screen
        .getByTestId(`bar-${dataPoint.label}`)
        ?.getAttribute("width");
      expect(width).toBe(`${dataPoint.value * WIDTH}`);
    }
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
        high: { start: 0.9, end: 1 },
        mid: { start: 0.5, end: 0.9 },
        low: { start: 0, end: 0.5 },
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
        high: { start: 0.9, end: 1 },
        mid: { start: 0.5, end: 0.9 },
        low: { start: 0, end: 0.5 },
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
        high: { start: 0.9, end: 1 },
        mid: { start: 0.5, end: 0.9 },
        low: { start: 0, end: 0.5 },
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
        high: { start: 0.9, end: 1 },
        mid: { start: 0.5, end: 0.9 },
        low: { start: 0, end: 0.5 },
      }}
    />
  );

  await waitFor(() => {
    const width = screen.getByTestId("bar-a")?.getAttribute("width");
    expect(width).toBe(`${WIDTH}`);
  });

  expect(container).toMatchSnapshot();
});
