export const app_config = {
  column: {
    indicator_id: "ind_id",
    coverage_id: "dg_id",
    year: "year",
    treatment_unit: "unit_name",
    treatment_unit_level: "unit_level",
    organisation_number: "orgnr",
    denominator: "denominator",
    variable: "var",
    achieved_level: "level",
    desired_level: "desired_level",
    registry_id: "registry_id",
    registry_short_name: "rname",
    registry_full_name: "full_name",
    indicator_title: "title",
    indicator_name: "name",
    indicator_type: "type",
    indicator_measurement_unit: "measure_unit",
    indicator_short_description: "short_description",
    indicator_long_description: "long_description",
    level_green: 'level_green',
    level_yellow: 'level_yellow',
    level_direction: 'level_direction',
    min_indicator_value: 'min_value',
    max_indicator_value: 'max_value',
    min_denominator: 'min_denominator',
    id: 'id'
  },
  indicator_type: {
    andel: {
      db: 'andel',
      full_name: 'Andel'
    },
    median: {
      db: 'median',
      full_name: 'Median'
    }
  },
  treatment_unit_level: {
    rhf: "rhf",
    hf: "hf",
    hospital: "hospital",
    nation: "nation"
  },
  achieved_level: {
    high: "H",
    mod: "M",
    low: "L"
  },
  level_direction: {
    high: 1,
    low: 0
  },
  desired_level: {
    high: "Høyt",
    low: "Lavt"
  }
}
