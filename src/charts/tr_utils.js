import app_config from "../app_config";

const config = app_config.data_config;

export const level_boundary = function (level_obj) {
  if (this[config.column.level_direction] === 0) {
    if (level_obj.level === "high") {
      level_obj.start = this[config.column.level_green];
      level_obj.end = 0;
    } else if (level_obj.level === "mid") {
      level_obj.start = this[config.column.level_yellow];
      level_obj.end = this[config.column.level_green];
    } else {
      level_obj.start = 1;
      level_obj.end = this[config.column.level_yellow];
    }
  } else if (this[config.column.level_direction] === 1) {
    if (level_obj.level === "high") {
      level_obj.start = 1;
      level_obj.end = this[config.column.level_green];
    } else if (level_obj.level === "mid") {
      level_obj.start = this[config.column.level_green];
      level_obj.end = this[config.column.level_yellow];
    } else {
      level_obj.start = this[config.column.level_yellow];
      level_obj.end = 0;
    }
  }
};
