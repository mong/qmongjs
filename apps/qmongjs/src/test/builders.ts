import { Level } from "../components/Charts/types";

export function buildLevels(): Level[] {
  const low = Math.random();
  const mid = Math.random() * (1.0 - low) + low;

  return [
    { level: "high", start: mid, end: 1 },
    { level: "mid", start: low, end: mid },
    { level: "low", start: 0, end: low },
  ];
}
