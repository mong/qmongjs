import db from "../db";

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
}

export const all = (): Promise<Description[]> =>
  db
    .select("ind.*", "registry.name as rname", "registry.full_name")
    .from("ind")
    .leftJoin("registry", "ind.registry_id", "registry.id");
