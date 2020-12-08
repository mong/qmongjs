import db from "../db";

export interface TuName {
  hospital: string;
  hf: string;
  hf_full: string;
  rhf: string;
}

export const all = (): Promise<TuName[]> =>
  db
    .distinct(
      "hospital.short_name as hospital",
      "hf.short_name as hf",
      "hf.full_name as hf_full",
      "rhf.short_name as rhf"
    )
    .from("hospital")
    .leftJoin("hf", "hospital.hf_orgnr", "hf.orgnr")
    .leftJoin("rhf", "hf.rhf_orgnr", "rhf.orgnr");
