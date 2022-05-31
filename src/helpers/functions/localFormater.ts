import { formatLocale, FormatLocaleDefinition } from "d3-format";

const formatDefinition: FormatLocaleDefinition = {
  decimal: ",",
  thousands: "\u202f",
  grouping: [3],
  currency: ["NOK", ""],
  percent: "\u202f%",
};

export function customFormat(numberFormat: string) {
  try {
    return formatLocale(formatDefinition).format(numberFormat);
  } catch (error) {
    return formatLocale(formatDefinition).format(".0f");
  }
}
