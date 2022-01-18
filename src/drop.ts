import config from "./config";
import Knex from "knex";

const knex = Knex(config);

console.log(config.connection);
knex.schema
  .dropTable("articulos")
  .then(() => {
    console.log("table dropped");
  })
  .catch((error) => console.log(error))
  .finally(() => knex.destroy());
