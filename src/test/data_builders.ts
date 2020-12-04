import { AggData, Description, StatisticData } from "../App";
import { med_field, app_text } from "../app_config";
import { GraphData, Props } from "../components/main_component";

export function buildMainProps(overrides: Partial<Props>): Props {
  return {
    ind_per_reg: [],
    treatment_units: [],
    selected_year: 2019,
    med_field,
    app_text,
    colspan: 1,
    data: buildGraphData({}),
    selected_row: null,
    update_selected_row: (row: any) => {},
    selection_bar_height: null,
    legend_height: null,
    update_legend_height: (height: any) => {},
    ...overrides,
  };
}
export function buildAggData(overrides: Partial<AggData>): AggData {
  return {
    filtered_by_unit: [],
    filtered_by_year: [],
    nation: {
      filtered_by_unit: [],
      filtered_by_year: [],
    },
    ...overrides,
  };
}
export function buildGraphData(overrides: Partial<GraphData>): GraphData {
  return {
    agg_data: buildAggData({}),
    description: [buildDescriptionData({})],
    ...overrides,
  };
}
export function buildStatisticData(
  overrides: Partial<StatisticData>
): StatisticData {
  return {
    ind_id: "hjerneslag_beh_enhet",
    unit_level: "nation",
    unit_name: "faker",
    orgnr: 1,
    year: 2019,
    denominator: 9022,
    var: 0.9396,
    level: "H",
    level_direction: 1,
    dg: 0.8677,
    include: 1,
    ...overrides,
  };
}
export function buildDescriptionData(
  overrides: Partial<Description>
): Description {
  return {
    id: "ind1",
    dg_id: "dummy_dg",
    include: 1,
    title: "HbA1c ≥ 9,0 %",
    name: "KiE",
    type: "andel",
    min_denominator: 10,
    level_green: null,
    level_yellow: 0.1,
    level_direction: 0,
    short_description: "Andel pasienter med HbA1c > 9,0",
    long_description: "Andel pasienter med HbA1c > 9,0",
    registry_id: 27,
    rname: "barnediabetes",
    full_name:
      "Nasjonalt medisinsk kvalitetsregister for barne- og ungdomsdiabetes",
    ...overrides,
  };
}
