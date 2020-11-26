import { Level } from "../Chart";
import { level_boundary, Config } from "../tr_utils";

test("level_direction 1", () => {
  const config: Config = {
    level_direction: 1,
    level_green: 0.9,
    level_yellow: 0.8,
  };
  let levels: Level[] = [
    { level: "high", start: 0, end: 0 },
    { level: "mid", start: 0, end: 0 },
    { level: "low", start: 0, end: 0 },
  ];
  levels.forEach(level_boundary, config);

  expect(levels).toMatchInlineSnapshot(`
    Array [
      Object {
        "end": 0.9,
        "level": "high",
        "start": 1,
      },
      Object {
        "end": 0.8,
        "level": "mid",
        "start": 0.9,
      },
      Object {
        "end": 0,
        "level": "low",
        "start": 0.8,
      },
    ]
  `);
});

test("level_direction 0", () => {
  const config: Config = {
    level_direction: 0,
    level_green: 0.75,
    level_yellow: 0.5,
  };
  let levels: Level[] = [
    { level: "high", start: 0, end: 0 },
    { level: "mid", start: 0, end: 0 },
    { level: "low", start: 0, end: 0 },
  ];
  levels.forEach(level_boundary, config);

  expect(levels).toMatchInlineSnapshot(`
    Array [
      Object {
        "end": 0,
        "level": "high",
        "start": 0.75,
      },
      Object {
        "end": 0.75,
        "level": "mid",
        "start": 0.5,
      },
      Object {
        "end": 0.5,
        "level": "low",
        "start": 1,
      },
    ]
  `);
});
