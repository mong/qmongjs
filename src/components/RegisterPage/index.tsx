export interface RegisterNames {
  id: number;
  rname: string;
  full_name: string;
  registerField?: string;
  caregiver_data: 1 | 0 | null;
  resident_data: 1 | 0 | null;
  dg_data: 1 | 0 | null;
}

export interface StatisticData {
  id: number;
  ind_id: string;
  unit_level: string;
  unit_name: string;
  orgnr: number;
  year: number;
  denominator: number;
  var: number;
  level: string;
  level_direction: number | null;
  dg: number | null;
  include: number | null;
  type: "andel" | string;
  delivery_time: Date;
  delivery_latest_affirm: Date;
}

export interface Description {
  id: string;
  dg_id: string | null;
  include: number | null;
  title: string | null;
  name: string | null;
  type: string | null;
  min_denominator: number | null;
  level_green: number | null;
  level_yellow: number | null;
  level_direction: number;
  short_description: string | null;
  long_description: string | null;
  registry_id: number;
  rname: string | null;
  full_name: string;
  sformat?: string;
  max_value: number | null;
  min_value: number | null;
}

export const API_HOST =
  process.env.REACT_APP_API_HOST ?? "http://localhost:4000"; //"https://qa-mong-api.skde.org";
