import { Knex } from "knex";

import dotenv from "dotenv";

const result = dotenv.config({ path: "../.env" });

if (result.error) {
  throw result.error;
}

const mysqlConfig: Knex.Config = {
  client: "mysql",
  connection: {
    database: process.env.DB,
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT),
  },
};

const sqliteConfig: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: "../db/mydb.sqlite",
  },
  useNullAsDefault: true,
};

export { mysqlConfig, sqliteConfig };