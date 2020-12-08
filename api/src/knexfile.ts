// Update with your config settings.

import Knex from "knex";

const connections: { [env: string]: Knex.Config } = {
  test: {
    client: "sqlite3",
    connection: {
      filename: "./dev.sqlite3",
    },
  },
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "imongr",
      password: "imongr",
      database: "imongr",
    },
  },
  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

export default connections;
