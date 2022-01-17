import { Knex } from "knex";

import "dotenv/config";

export const config: Knex.Config = {
  client: "mysql",
  connection: {
    database: process.env.DB,
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT),
  },
};
