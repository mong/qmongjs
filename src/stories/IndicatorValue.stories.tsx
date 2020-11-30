import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import INDICATOR_VALUE from "../components/indicator_value";
import { StatisticData } from "../App";
import "../index.css";

interface Props {
  td_class: string;
  ind_type: string;
  data: StatisticData;
  indicator_value: string;
  share_of_total: number;
  total: number;
}

export default {
  title: "Indicator/Values",
  component: INDICATOR_VALUE,
} as Meta;

const Template: Story<Props> = (args) => <INDICATOR_VALUE {...args} />;

export const Green = Template.bind({});
Green.args = {
  td_class: "selected_unit",
  ind_type: "andel",
  indicator_value: "65%",
  share_of_total: 1500,
  total: 2000,
  data: {
    ind_id: "hjerneslag_rapport_3mnd",
    unit_level: "hospital",
    unit_name: "St. Olavs",
    orgnr: 974749025,
    year: 2019,
    denominator: 713,
    var: 0.9201,
    level: "H",
    level_direction: 1,
    dg: 0.9297,
    include: 1,
  },
};

export const Yellow = Template.bind({});
Yellow.args = {
  td_class: "selected_unit",
  ind_type: "andel",
  indicator_value: "65%",
  share_of_total: 1500,
  total: 2000,
  data: {
    ind_id: "hjerneslag_rapport_3mnd",
    unit_level: "hospital",
    unit_name: "Tromsø",
    orgnr: 974795787,
    year: 2019,
    denominator: 369,
    var: 0.7588,
    level: "M",
    level_direction: 1,
    dg: 0.9111,
    include: 1,
  },
};

export const Red = Template.bind({});
Red.args = {
  td_class: "selected_unit",
  ind_type: "andel",
  indicator_value: "65%",
  share_of_total: 1500,
  total: 2000,
  data: {
    ind_id: "hjerneslag_rapport_3mnd",
    unit_level: "hospital",
    unit_name: "Narvik",
    orgnr: 974795396,
    year: 2019,
    denominator: 52,
    var: 0.1538,
    level: "L",
    level_direction: 1,
    dg: 0.8387,
    include: 1,
  },
};
