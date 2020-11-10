const description = [{
  id: "barnediabetes_hba1c_ge_9","dg_id":"dummy_dg",
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
  full_name: "Nasjonalt medisinsk kvalitetsregister for barne- og ungdomsdiabetes"
  },{
  id: "barnediabetes_hba1c_lt_7",
  dg_id: "dummy_dg",
  include: 1,
  title: "HbA1c < 7,0 %",
  name: "KiC",
  type: "andel",
  min_denominator: 10,
  level_green: 0.4,
  level_yellow: 0.2,
  level_direction: 1,
  short_description: "Andel pasienter med HbA1c < 7,0 %",
  long_description: "Andel pasienter med HbA1c < 7,0 %",
  registry_id: 27,
  rname: "barnediabetes",
  full_name: "Nasjonalt medisinsk kvalitetsregister for barne- og ungdomsdiabetes"
}];

export default description;
