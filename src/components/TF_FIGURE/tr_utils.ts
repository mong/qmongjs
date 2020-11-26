export interface Config {
  level_direction: number;
  level_green: number | null;
  level_yellow: number | null;
}

export function level_boundary(config: Config) {
  const level_direction = config.level_direction;
  const level_yellow = config.level_yellow ?? 0;
  const level_green = config.level_green ?? 0;

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
