import { RequestHandler, Request } from "express";
import * as Indicator from "../models/Indicator";

export const index: RequestHandler = async (req, res) => {
  const query = parseQuery(req);

  const rows = await Indicator.all(query.filter);

  res.json(rows);
};

interface Query {
  filter?: Indicator.Filter;
}

function parseQuery(req: Request): Query {
  const query: Query = {};

  if (
    typeof req.query.filter === "object" &&
    !Array.isArray(req.query.filter)
  ) {
    query.filter = {};

    if (typeof req.query.filter.unit_level === "string") {
      query.filter.unit_level = req.query.filter.unit_level;
    }
  }

  return query;
}
