export interface Config {
  level_direction: number | null;
  level_green: number | null;
  level_yellow: number | null;
  max_value: number | null;
  min_value: number | null;
}

export function level_boundary(config: Config) {
  // Set level_direction to 1 if NULL
  const level_direction =
    config.level_direction === null ? 1 : config.level_direction;
  // If level_green is NULL: set level_green to 0 if level_direction is 1, and vice versa
  const level_green =
    config.level_green !== null
      ? config.level_green
      : level_direction === 1
      ? 0
      : 1;
  // If level_yellow is NULL: set to level_green
  const level_yellow =
    config.level_yellow !== null ? config.level_yellow : level_green;

  switch (level_direction) {
    case 0:
      return [
        {
          level: "high",
          start: level_green,
          end: Math.min(0, config.min_value ?? level_green),
        },
        { level: "mid", start: level_yellow, end: level_green },
        {
          level: "low",
          start: Math.max(1, config.max_value ?? level_yellow),
          end: level_yellow,
        },
      ];
    case 1:
      return [
        {
          level: "high",
          start: Math.max(1, config.max_value ?? level_green),
          end: level_green,
        },
        { level: "mid", start: level_green, end: level_yellow },
        {
          level: "low",
          start: level_yellow,
          end: Math.min(0, config.min_value ?? level_yellow),
        },
      ];
    default:
      throw new Error(`${level_direction} is not a valid direction`);
  }
}
