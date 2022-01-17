import config from "./config";
import Knex from "knex";

const knex = Knex(config);

console.log(config.connection);
knex.schema
  .createTable("articulos", (table) => {
    table.string("name");
    table.string("code");
    table.float("price");
    table.integer("stock");
    table.increments("id");
  })
  .then(() => {
    console.log("table created");
  })
  .catch((error) => console.log(error))
  .finally(() => knex.destroy());
