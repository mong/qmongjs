// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { IndicatorValue, IndicatorValueProps } from "./";

//import "../index.css";

export default {
  title: "Indicator/Indicator Values",
  component: IndicatorValue,
} as Meta;

const Template: Story<IndicatorValueProps> = (args) => (
  <IndicatorValue {...args} />
);

export const GreenLevel = Template.bind({});
GreenLevel.args = {
  td_class: "selected_unit",
  indicatorData: {
    id: 1001,
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
    type: "andel",
    delivery_time: new Date("October 13, 2014 11:13:00"),
    delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
  },
};

export const YellowLevel = Template.bind({});
YellowLevel.args = {
  indicatorData: {
    id: 1002,
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
    type: "andel",
    delivery_time: new Date("October 13, 2014 11:13:00"),
    delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
  },
};

export const RedLevel = Template.bind({});
RedLevel.args = {
  indicatorData: {
    id: 1003,
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
    type: "andel",
    delivery_time: new Date("October 13, 2014 11:13:00"),
    delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
  },
};

export const National = Template.bind({});
National.args = {
  td_class: "nationally",
  indicatorData: {
    id: 1003,
    ind_id: "hjerneslag_rapport_3mnd",
    unit_level: "nation",
    unit_name: "Nasjonalt",
    orgnr: 974795396,
    year: 2019,
    denominator: 52,
    var: 0.1538,
    level: "L",
    level_direction: 1,
    dg: 0.8387,
    include: 1,
    type: "andel",
    delivery_time: new Date("October 13, 2014 11:13:00"),
    delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
  },
};
