import { Level } from "./Chart";

export interface Config {
  level_direction: number;
  level_green: number | null;
  level_yellow: number | null;
}

export const level_boundary = function (this: Config, level_obj: Level) {
  if (this.level_direction === 0) {
    if (level_obj.level === "high") {
      level_obj.start = this.level_green ?? 0;
      level_obj.end = 0;
    } else if (level_obj.level === "mid") {
      level_obj.start = this.level_yellow ?? 0;
      level_obj.end = this.level_green ?? 0;
    } else {
      level_obj.start = 1;
      level_obj.end = this.level_yellow ?? 0;
    }
  } else if (this.level_direction === 1) {
    if (level_obj.level === "high") {
      level_obj.start = 1;
      level_obj.end = this.level_green ?? 0;
    } else if (level_obj.level === "mid") {
      level_obj.start = this.level_green ?? 0;
      level_obj.end = this.level_yellow ?? 0;
    } else {
      level_obj.start = this.level_yellow ?? 0;
      level_obj.end = 0;
    }
  }
};
