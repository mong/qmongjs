// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { withQuery } from "@storybook/addon-queryparams";

import { IndicatorRow, IndicatorRowProps } from "./indicatorrow";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

export default {
  title: "Indicator/Indicator row",
  component: IndicatorRow,
  decorators: [withQuery],
  parameters: {
    query: {
      selected_row: "",
    },
  },
} as Meta;

const Template: Story<IndicatorRowProps> = (args) => {
  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <table>
          <IndicatorRow {...args} />
        </table>
      </QueryParamProvider>
    </Router>
  );
};
export const Nation = Template.bind({});
Nation.args = {
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
  indicatorData: [
    {
      id: 935463,
      ind_id: "noric_bilde_diag",
      unit_level: "nation",
      unit_name: "Nasjonalt",
      orgnr: 1,
      year: 2017,
      denominator: 517,
      var: 0.33269,
      level: "M",
      level_direction: 1,
      dg: 1,
      type: "andel",
      include: 1,
      delivery_time: new Date("October 13, 2014 11:13:00"),
      delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
    },
  ],
};

export const WithUnits = Template.bind({});
WithUnits.args = {
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
  indicatorData: [
    {
      id: 93563,
      ind_id: "noric_bilde_diag",
      unit_level: "HF",
      unit_name: "UNN HF",
      orgnr: 1,
      year: 2017,
      denominator: 517,
      var: 0.76269,
      level: "H",
      level_direction: 1,
      dg: 1,
      type: "andel",
      include: 1,
      delivery_time: new Date("October 13, 2014 11:13:00"),
      delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
    },
    {
      id: 935463,
      ind_id: "noric_bilde_diag",
      unit_level: "hospital",
      unit_name: "UNN Tromsø",
      orgnr: 1,
      year: 2017,
      denominator: 517,
      var: 0.17269,
      level: "L",
      level_direction: 1,
      dg: 1,
      type: "andel",
      include: 1,
      delivery_time: new Date("October 13, 2014 11:13:00"),
      delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
    },
    {
      id: 935463,
      ind_id: "noric_bilde_diag",
      unit_level: "nation",
      unit_name: "Nasjonalt",
      orgnr: 1,
      year: 2017,
      denominator: 517,
      var: 0.33269,
      level: "M",
      level_direction: 1,
      dg: 1,
      type: "andel",
      include: 1,
      delivery_time: new Date("October 13, 2014 11:13:00"),
      delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
    },
  ],
  unitNames: ["UNN Tromsø", "UNN HF", "Nasjonalt"],
};

export const WithMaskedValues = Template.bind({});
WithMaskedValues.args = {
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
  indicatorData: [
    {
      id: 93563,
      ind_id: "noric_bilde_diag",
      unit_level: "HF",
      unit_name: "UNN HF",
      orgnr: 1,
      year: 2017,
      denominator: 3,
      var: 0.76269,
      level: "H",
      level_direction: 1,
      dg: 1,
      type: "andel",
      include: 1,
      delivery_time: new Date("October 13, 2014 11:13:00"),
      delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
    },
    {
      id: 935463,
      ind_id: "noric_bilde_diag",
      unit_level: "hospital",
      unit_name: "UNN Tromsø",
      orgnr: 1,
      year: 2017,
      denominator: 517,
      var: 0.17269,
      level: "L",
      level_direction: 1,
      dg: 0.4,
      type: "andel",
      include: 1,
      delivery_time: new Date("October 13, 2014 11:13:00"),
      delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
    },
    {
      id: 935463,
      ind_id: "noric_bilde_diag",
      unit_level: "nation",
      unit_name: "Nasjonalt",
      orgnr: 1,
      year: 2017,
      denominator: 1,
      var: 0.33269,
      level: "M",
      level_direction: 1,
      dg: 1,
      type: "andel",
      include: 1,
      delivery_time: new Date("October 13, 2014 11:13:00"),
      delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
    },
  ],
  unitNames: ["UNN Tromsø", "UIO", "UNN HF", "Nasjonalt"],
};
