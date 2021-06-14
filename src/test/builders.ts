import faker from "faker";
import { Level } from "../components/Charts/types";

export function buildLevels(): Level[] {
  const low = faker.datatype.number({ min: 0, max: 100 }) / 100;
  const mid = faker.datatype.number({ min: low * 100, max: 100 }) / 100;

  return [
    { level: "high", start: mid, end: 1 },
    { level: "mid", start: low, end: mid },
    { level: "low", start: 0, end: low },
  ];
}
