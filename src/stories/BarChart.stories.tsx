import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import BarChart, { Props } from "../components/BarChart";

const meta: Meta = {
  title: "Charts/BarChart",
  component: BarChart,
};

const Template: Story<Props> = (args) => <BarChart {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  displayLevels: false,
  data: [
    { label: "a", value: 1 },
    { label: "b", value: 0.15 },
    { label: "c", value: 0.3 },
    { label: "d", value: 0.1 },
  ],
  levels: [
    { level: "high", start: 1, end: 0.9 },
    { level: "mid", start: 0.9, end: 0.5 },
    { level: "low", start: 0.5, end: 0 },
  ],
};

export const Reversed = Template.bind({});
Reversed.args = {
  displayLevels: true,
  data: [
    { label: "a", value: 1 },
    { label: "b", value: 0.15 },
    { label: "c", value: 0.3 },
    { label: "d", value: 0.1 },
  ],
  levels: [
    { level: "high", start: 0.5, end: 0 },
    { level: "mid", start: 0.9, end: 0.5 },
    { level: "low", start: 1, end: 0.9 },
  ],
};

const TemplateWidth500: Story<Props> = (args) => (
  <div style={{ width: 500 }}>
    <BarChart {...args} />
  </div>
);
export const Width500 = TemplateWidth500.bind({});
Width500.args = {
  displayLevels: true,
  data: [
    { label: "a", value: 1 },
    { label: "b", value: 0.15 },
    { label: "c", value: 0.3 },
    { label: "d", value: 0.1 },
  ],
  levels: [
    { level: "high", start: 0.5, end: 0 },
    { level: "mid", start: 0.9, end: 0.5 },
    { level: "low", start: 1, end: 0.9 },
  ],
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
};

export default meta;
