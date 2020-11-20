import { page_colors } from "../charts/page_colors.js";

test("page_colors object has the desired properties", () => {
  expect(page_colors).toHaveProperty("chart_colors");
  expect(page_colors).toHaveProperty("line_color");
  expect(page_colors).toHaveProperty("background_color");
  expect(page_colors).toHaveProperty("primary_text_color");
  expect(page_colors).toHaveProperty("secondary_text_color");
  expect(page_colors).toHaveProperty("primary_color");
  expect(page_colors).toHaveProperty("secondary_color");
  expect(page_colors).toHaveProperty("traffic_light_colors");
});
