import { RequestHandler } from "express";
import * as Description from "../models/Description";
import * as Indicator from "../models/Indicator";
import * as TuName from "../models/TuName";

export const index: RequestHandler = async (req, res) => {
  const data = {
    indicator_hosp: await Indicator.all({ unit_level: "hospital" }),
    indicator_hf: await Indicator.all({ unit_level: "hf" }),
    indicator_rhf: await Indicator.all({ unit_level: "rhf" }),
    indicator_nat: await Indicator.all({ unit_level: "nation" }),
    description: await Description.all(),
    tu_names: await TuName.all(),
  };

  res.json(data);
};
