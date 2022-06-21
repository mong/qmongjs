export interface Config {
  level_direction: number | null;
  level_green: number | null;
  level_yellow: number | null;
}

export function level_boundary(config: Config) {
  // Set level_direction to 1 if NULL
  const level_direction = config.level_direction ?? 1;
  // If level_green is NULL: set to 0 if level_direction is 1, and vice versa
  const level_green = config.level_green
    ? config.level_green
    : level_direction === 1
    ? 0
    : 1;
  // If level_yellow is NULL: set to level_green
  const level_yellow = config.level_yellow ? config.level_yellow : level_green;

  switch (level_direction) {
    case 0:
      return [
        { level: "high", start: level_green, end: 0 },
        { level: "mid", start: level_yellow, end: level_green },
        { level: "low", start: 1, end: level_yellow },
      ];
    case 1:
      return [
        { level: "high", start: 1, end: level_green },
        { level: "mid", start: level_green, end: level_yellow },
        { level: "low", start: level_yellow, end: 0 },
      ];
    default:
      throw new Error(`${level_direction} is not a valid direction`);
  }
}
