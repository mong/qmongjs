import { RequestHandler } from "express";
import * as TuName from "../models/TuName";

export const index: RequestHandler = async (_, res) => {
  const rows = await TuName.all();

  res.json(rows);
};
