import { RequestHandler } from "express";
import * as Description from "../models/Description";

export const index: RequestHandler = async (_, res) => {
  const rows = await Description.all();

  res.json(rows);
};
