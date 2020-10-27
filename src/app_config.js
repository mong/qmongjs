const med_field = [
  {  
    react_key: "hjerte",
    name: "Hjerte- og karsykdommer",
    key: [
      "ablanor",
      "noric",
      "hjerteinfarkt",
      "hjerneslag",
      "hjertestans",
      "hjertesvikt",
      "hjertekirurgi",
      "norkar"
    ]
  },
  {
    react_key: "kreft",
    name: "Kreft",
    key: [
      "barnekreft",
      "brystkreft",
      "gynkreft",
      "lungekreft",
      "lymfoid",
      "melanom",
      "prostata",
      "tarmkreft_colon",
      "tarmkreft_rectum"
    ]
  }/*,
  {
    react_key: "luft",
    name: "Luftveier",
    key: ["mek_vent"]
  }*/,
  {  
    react_key: "diabetes",
    name: "Diabetes",
    key: ["barnediabetes","diabetes_voksne"]
  },
  {  
    react_key: "nerve",
    name: "Nervesystemet",
    key: ["cp","ms","parkinson","norkog"]
  },
  {  
    react_key: "muskel",
    name: "Muskel og skjelett",
    key: [
      "hofte_barn",
      "hoftebrudd",
      "korsband",
      "ryggkir",
      "leddprotese",
      "nnrr",
      "muskel",
      "nkr_nakke",
      "nkr_rygg"
    ]
  },
  {  
    react_key: "tarm",
    name: "Mage og tarm",
    key: ["gastronet","fedmekir","nra","norgast"]
  },
  {  
    react_key: "gyn",
    name: "Gynekologi",
    key: ["nger","kvinl_inkontinens"]
  },
  {  
    react_key: "nyre",
    name: "Nyre",
    key: ["nyre"]
  }, 
  {  
    react_key: "intensiv",
    name: "Skade og intensiv",
    key: ["traume","intensiv","nnk"]
  },
  {  
    react_key: "rehab",
    name:"Rehabilitering",
    key: ["nnrr","norscir"]
  },
  {  
    react_key: "autoimmun",
    name: "Autoimmune sykdommer",
    key: ["roas","norvas"]
  },
  {  
    react_key: "revma",
    name: "Revmatologi",
    key: ["norartritt","norvas"]
  }/*,
  {  
    react_key: "onh", 
    name: "Øre-nese-hals",
    key: ["tonsille"]
  },
  {  
    react_key: "hud",
    name: "Hudsykdommer",
    key: ["hisreg"]
  },
  {  
    react_key: "psyk",
    name: "Psykisk helse og rus",
    key: ["kvarus","norspis"]
  }*/,
  {  
    react_key: "barn",
    name: "Barn",
    key: [
      "cp",
      "hofte_barn",
      "barnekreft",
      "barnediabetes",
      "ganespalt",
      "nnk"
    ]
  }/*,
  {  
    react_key: "annet",
    name: "Andre",
    key:[
      "smerte",
      "porfyri"
    ]
  }  */
]
export const app_text = {
  menus: {
    unit: "Velg behandlingssted",
    year: "År:"
  },
  indicators: {
    high: {text: "Høy måloppnåelse", icon: "fa fa-fas fa-circle"},
    moderate:{ text: "Moderat måloppnåelse", icon: "fa fa-fas fa-adjust"},
    low: {text: "Lav måloppnåelse", icon: "fa fa-circle-o" }
  },
  table:{
    main_column: "Kvalitetsindikator",
    national_column: "Nasjonalt",
    desired_level: "Ønsket målnivå",
  },
  tu_list:{
    header_text: "Velg behandlingsenheter",
    max_nr_tu: 5
  }

}

const data_config = {
  column: {
    indicator_id: "ind_id",
    coverage_id: "dg",
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

export default { med_field, app_text, data_config }