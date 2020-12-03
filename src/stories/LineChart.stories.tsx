import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import LineChart, { Props } from "../components/LineChart";

const meta: Meta = {
  title: "Charts/LineChart",
  component: LineChart,
};

const Template: Story<Props> = (args) => <LineChart {...args} />;

export const Primary = Template.bind({});
const props: Props = {
  showLevel: false,
  data: [
    { label: "Nasjonalt", year: 2017, value: 0.35 },
    { label: "Nasjonalt", year: 2018, value: 0.5 },
    { label: "Nasjonalt", year: 2019, value: 0.75 },
    { label: "Nasjonalt", year: 2020, value: 0.4 },

    { label: "Ahus", year: 2017, value: 0.45 },
    { label: "Ahus", year: 2018, value: 0.8 },
    { label: "Ahus", year: 2019, value: 0.6 },
    { label: "Ahus", year: 2020, value: 0.7 },

    { label: "UNN", year: 2017, value: 0.45 },
    { label: "UNN", year: 2018, value: 0.7 },
    { label: "UNN", year: 2019, value: 0.6 },
    { label: "UNN", year: 2020, value: 0.8 },
  ],
  levels: [
    { level: "high", start: 1, end: 0.9 },
    { level: "mid", start: 0.9, end: 0.5 },
    { level: "low", start: 0.5, end: 0 },
  ],
};
Primary.args = props;

export default meta;
