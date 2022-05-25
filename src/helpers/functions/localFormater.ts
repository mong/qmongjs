import { formatLocale, FormatLocaleDefinition } from "d3-format";

const formatDefinition: FormatLocaleDefinition = {
  decimal: ",",
  thousands: "\u202f",
  grouping: [3],
  currency: ["NOK", ""],
  percent: "\u202f%",
};

export const customFormat = formatLocale(formatDefinition).format;
