import { sqliteConfig, mysqlConfig } from "./config";
import Knex from "knex";

const myKnex = Knex(mysqlConfig);
const sqliKnex = Knex(sqliteConfig);

/* myKnex.schema
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
  .finally(() => myKnex.destroy()); */

const createTables = () => {
  myKnex.schema
    .dropTableIfExists("products")
    .createTable("products", (table) => {
      table.increments("id");
      table.string("title");
      table.integer("price");
      table.string("thumbnail");
    })
    .then(() => console.log("products table created"))
    .catch((err) => console.log(err));

  sqliKnex.schema
    .dropTableIfExists("messages")
    .createTable("messages", (table) => {
      table.increments("id");
      table.string("author");
      table.string("text");
      table.string("date");
    })
    .then(() => console.log("messages table created"))
    .catch((err) => console.log(err));
};

export default createTables;
