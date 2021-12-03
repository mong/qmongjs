import { useRef } from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import BarChart, { Props } from "../components/Charts/BarChart";

type MainProps = Omit<Props, "svgContainerRef">;

const meta: Meta = {
  title: "Charts/BarChart",
  component: BarChart,
};

const Template: Story<MainProps> = (args) => {
  const ref = useRef<HTMLDivElement>(null);
  return <BarChart {...args} svgContainerRef={ref} />;
};

export const Primary = Template.bind({});
Primary.args = {
  showLevel: false,
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
  showLevel: true,
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

const TemplateWidth500: Story<MainProps> = (args) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div style={{ width: 500 }}>
      <BarChart {...args} svgContainerRef={ref} />
    </div>
  );
};
export const Width500 = TemplateWidth500.bind({});
Width500.args = {
  showLevel: true,
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
