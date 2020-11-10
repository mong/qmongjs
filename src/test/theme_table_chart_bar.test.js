import { theme_table_chart_bar } from '../charts/theme_table_chart_bar'

test('theme_table_chart_line object has the desired properties', () => {
    expect(theme_table_chart_bar).toHaveProperty('x_axis_label_fill')
    expect(theme_table_chart_bar).toHaveProperty('y_axis_label_fill')
    expect(theme_table_chart_bar).toHaveProperty('x_axis_label')
    expect(theme_table_chart_bar).toHaveProperty('y_axis_label')
    expect(theme_table_chart_bar).toHaveProperty('x_axis_label_font_family')
    expect(theme_table_chart_bar).toHaveProperty('y_axis_label_font_family')
    expect(theme_table_chart_bar).toHaveProperty('x_axis_tick_font_fill')
    expect(theme_table_chart_bar).toHaveProperty('y_axis_tick_font_fill')
    expect(theme_table_chart_bar).toHaveProperty('x_axis_tick_line_stroke')
    expect(theme_table_chart_bar).toHaveProperty('y_axis_tick_line_stroke')
    expect(theme_table_chart_bar).toHaveProperty('x_axis_domain_line_stroke')
    expect(theme_table_chart_bar).toHaveProperty('y_axis_domain_line_stroke')
});

