// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { MaskedIndicator, MaskedIndicatorProps } from "./";

export default {
  title: "Indicator/Masked Indicator Values",
  component: MaskedIndicator,
} as Meta;

const Template: Story<MaskedIndicatorProps> = (args) => (
  <MaskedIndicator {...args} />
);

export const LowCoverage = Template.bind({});
LowCoverage.args = {
  text: "Lav dg",
};

export const NoData = Template.bind({});
NoData.args = {
  text: "Ingen Data",
};
export const LowN = Template.bind({});
LowN.args = {
  text: "Lav N",
};
