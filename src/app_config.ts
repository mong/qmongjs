import {
  DelimitedArrayParam,
  NumberParam,
  StringParam,
  withDefault,
} from "use-query-params";

export const app_text = {
  menus: {
    unit: "Velg behandlingssted",
    year: "År:",
  },
  indicators: {
    high: { text: "Høy måloppnåelse", icon: "fa fa-fas fa-circle" },
    moderate: { text: "Moderat måloppnåelse", icon: "fa fa-fas fa-adjust" },
    low: { text: "Lav måloppnåelse", icon: "fa fa-circle-o" },
  },
  table: {
    main_column: "Kvalitetsindikator",
    national_column: "Nasjonalt",
    desired_level: "Ønsket målnivå",
  },
  tu_list: {
    header_text: "Velg behandlingsenheter",
    max_nr_tu: 5,
  },
};

export const minYear = 2017;
export const maxYear = 2021;
export const defaultYear = 2021;
export const mainQueryParamsConfig = {
  selected_row: withDefault(StringParam, undefined),
  indicator: withDefault(StringParam, undefined),
  level: withDefault(StringParam, undefined),
  year: withDefault(NumberParam, undefined),
  selected_treatment_units: withDefault(DelimitedArrayParam, undefined),
  chart_type: withDefault(StringParam, undefined),
};

const appConfig = { app_text };

export default appConfig;
