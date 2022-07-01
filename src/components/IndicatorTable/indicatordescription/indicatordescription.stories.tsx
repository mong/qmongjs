// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { DescriptionProps, IndicatorDescription } from "./indicatordescription";

export default {
  title: "Indicator/Indicator description",
  component: IndicatorDescription,
} as Meta;

const Template: Story<DescriptionProps> = (args) => (
  <table>
    <tr>
      <IndicatorDescription {...args} />
    </tr>
  </table>
);

export const fullDescription = Template.bind({});
fullDescription.args = {
  description: {
    id: "noric_bilde_diag",
    dg_id: "noric_dummy_dg",
    include: 1,
    title: "Bildediagnostikk i venstre hovedstamme",
    name: "d",
    type: "andel",
    min_denominator: 5,
    level_green: 0.4,
    level_yellow: 0,
    level_direction: 1,
    short_description:
      "Andel prosedyrer der det er brukt supplerende bildediagnostiske metoder (IVUS / OCT) for å bedømme grad av innsnevring i venstre hovedstamme ved innsetting av stent.",
    long_description:
      "Europeiske retningslinjer anbefaler bruk av tilleggsundersøkelser for å gi supplerende bildeframstilling i tilknytning til utblokking av venstre hovedstamme. Intrakoronar ultralyd (IVUS) og optical coherence tomography (OCT) er metoder som brukes til dette formål. Pasienter som tidligere har fått utført bypass-operasjon og pasienter som blir behandlet for akutt hjerteinfarkt av typen STEMI er ikke medregnet i analysene.  ",
    registry_id: 11,
    rname: "noric",
    full_name: "Norsk register for invasiv kardiologi",
    sformat: ",.0%",
    max_value: null,
    min_value: null,
  },
};

export const missingLevelGreen = Template.bind({});
missingLevelGreen.args = {
  description: {
    id: "noric_bilde_diag",
    dg_id: "noric_dummy_dg",
    include: 1,
    title: "Bildediagnostikk i venstre hovedstamme",
    name: "d",
    type: "andel",
    min_denominator: 5,
    level_green: null,
    level_yellow: 0,
    level_direction: 0,
    short_description:
      "Andel prosedyrer der det er brukt supplerende bildediagnostiske metoder (IVUS / OCT) for å bedømme grad av innsnevring i venstre hovedstamme ved innsetting av stent.",
    long_description:
      "Europeiske retningslinjer anbefaler bruk av tilleggsundersøkelser for å gi supplerende bildeframstilling i tilknytning til utblokking av venstre hovedstamme. Intrakoronar ultralyd (IVUS) og optical coherence tomography (OCT) er metoder som brukes til dette formål. Pasienter som tidligere har fått utført bypass-operasjon og pasienter som blir behandlet for akutt hjerteinfarkt av typen STEMI er ikke medregnet i analysene.  ",
    registry_id: 11,
    rname: "noric",
    full_name: "Norsk register for invasiv kardiologi",
    sformat: ",.0%",
    max_value: null,
    min_value: null,
  },
};

export const levelDirection0 = Template.bind({});
levelDirection0.args = {
  description: {
    id: "noric_bilde_diag",
    dg_id: "noric_dummy_dg",
    include: 1,
    title: "Bildediagnostikk i venstre hovedstamme",
    name: "d",
    type: "andel",
    min_denominator: 5,
    level_green: 0.5,
    level_yellow: 0,
    level_direction: 0,
    short_description:
      "Andel prosedyrer der det er brukt supplerende bildediagnostiske metoder (IVUS / OCT) for å bedømme grad av innsnevring i venstre hovedstamme ved innsetting av stent.",
    long_description:
      "Europeiske retningslinjer anbefaler bruk av tilleggsundersøkelser for å gi supplerende bildeframstilling i tilknytning til utblokking av venstre hovedstamme. Intrakoronar ultralyd (IVUS) og optical coherence tomography (OCT) er metoder som brukes til dette formål. Pasienter som tidligere har fått utført bypass-operasjon og pasienter som blir behandlet for akutt hjerteinfarkt av typen STEMI er ikke medregnet i analysene.  ",
    registry_id: 11,
    rname: "noric",
    full_name: "Norsk register for invasiv kardiologi",
    sformat: ",.0%",
    max_value: null,
    min_value: null,
  },
};
