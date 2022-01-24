import { sqliteConfig, mysqlConfig } from "./config";
import Knex from "knex";

const knex = Knex(sqliteConfig);

console.log(sqliteConfig.connection);
knex.schema
  .dropTable("articulos")
  .then(() => {
    console.log("table dropped");
  })
  .catch((error) => console.log(error))
  .finally(() => knex.destroy());
