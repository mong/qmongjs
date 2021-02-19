import Knex from "knex";
import connections from "./knexfile";

const db = Knex(connections[process.env.NODE_ENV || "development"]);

export default db;
