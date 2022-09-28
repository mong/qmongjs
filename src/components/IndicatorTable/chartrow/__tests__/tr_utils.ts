import { level_boundary, Config } from "../tr_utils";

test("level_direction 1", () => {
  const config: Config = {
    level_direction: 1,
    level_green: 0.9,
    level_yellow: 0.8,
    max_value: null,
    min_value: null,
  };

  const levels = level_boundary(config);

  expect(levels).toMatchInlineSnapshot(`
    [
      {
        "end": 0.9,
        "level": "high",
        "start": 1,
      },
      {
        "end": 0.8,
        "level": "mid",
        "start": 0.9,
      },
      {
        "end": 0,
        "level": "low",
        "start": 0.8,
      },
    ]
  `);
});

test("level_direction null will set it to 1", () => {
  const config: Config = {
    level_direction: null,
    level_green: 0.9,
    level_yellow: 0.8,
    max_value: null,
    min_value: null,
  };

  const levels = level_boundary(config);

  expect(levels).toMatchInlineSnapshot(`
    [
      {
        "end": 0.9,
        "level": "high",
        "start": 1,
      },
      {
        "end": 0.8,
        "level": "mid",
        "start": 0.9,
      },
      {
        "end": 0,
        "level": "low",
        "start": 0.8,
      },
    ]
  `);
});

test("level_green 0", () => {
  const config: Config = {
    level_direction: 0,
    level_green: 0,
    level_yellow: 0.1,
    max_value: null,
    min_value: null,
  };

  const levels = level_boundary(config);

  expect(levels).toMatchInlineSnapshot(`
    [
      {
        "end": 0,
        "level": "high",
        "start": 0,
      },
      {
        "end": 0,
        "level": "mid",
        "start": 0.1,
      },
      {
        "end": 0.1,
        "level": "low",
        "start": 1,
      },
    ]
  `);
});

test("level_green null, level_direction 0", () => {
  // level_green should ideally have been set to level_yellow
  // Perfect case for test driven development ...
  const config: Config = {
    level_direction: 0,
    level_green: null,
    level_yellow: 0.1,
    max_value: null,
    min_value: null,
  };

  const levels = level_boundary(config);

  expect(levels).toMatchInlineSnapshot(`
    [
      {
        "end": 0,
        "level": "high",
        "start": 1,
      },
      {
        "end": 1,
        "level": "mid",
        "start": 0.1,
      },
      {
        "end": 0.1,
        "level": "low",
        "start": 1,
      },
    ]
  `);
});

test("level_green null, level_direction 1", () => {
  // level_green should ideally have been set to level_yellow
  // Perfect case for test driven development ...
  const config: Config = {
    level_direction: 1,
    level_green: null,
    level_yellow: 0.1,
    max_value: null,
    min_value: null,
  };

  const levels = level_boundary(config);

  expect(levels).toMatchInlineSnapshot(`
    [
      {
        "end": 0,
        "level": "high",
        "start": 1,
      },
      {
        "end": 0.1,
        "level": "mid",
        "start": 0,
      },
      {
        "end": 0,
        "level": "low",
        "start": 0.1,
      },
    ]
  `);
});

test("level_green null, level_yellow null, level_direction 1", () => {
  const config: Config = {
    level_direction: 1,
    level_green: null,
    level_yellow: null,
    max_value: null,
    min_value: null,
  };

  const levels = level_boundary(config);

  expect(levels).toMatchInlineSnapshot(`
    [
      {
        "end": 0,
        "level": "high",
        "start": 1,
      },
      {
        "end": 0,
        "level": "mid",
        "start": 0,
      },
      {
        "end": 0,
        "level": "low",
        "start": 0,
      },
    ]
  `);
});

test("level_yellow null", () => {
  const config: Config = {
    level_direction: 1,
    level_green: 0.5,
    level_yellow: null,
    max_value: null,
    min_value: null,
  };

  const levels = level_boundary(config);

  expect(levels).toMatchInlineSnapshot(`
    [
      {
        "end": 0.5,
        "level": "high",
        "start": 1,
      },
      {
        "end": 0.5,
        "level": "mid",
        "start": 0.5,
      },
      {
        "end": 0,
        "level": "low",
        "start": 0.5,
      },
    ]
  `);
});

test("level_direction 0", () => {
  const config: Config = {
    level_direction: 0,
    level_green: 0.75,
    level_yellow: 0.5,
    max_value: null,
    min_value: null,
  };

  const levels = level_boundary(config);

  expect(levels).toMatchInlineSnapshot(`
    [
      {
        "end": 0,
        "level": "high",
        "start": 0.75,
      },
      {
        "end": 0.75,
        "level": "mid",
        "start": 0.5,
      },
      {
        "end": 0.5,
        "level": "low",
        "start": 1,
      },
    ]
  `);
});

test("level_direction error", () => {
  const config: Config = {
    level_direction: 100,
    level_green: 0.75,
    level_yellow: 0.5,
    max_value: null,
    min_value: null,
  };

  expect(() => {
    level_boundary(config);
  }).toThrowError("100 is not a valid direction");
});
