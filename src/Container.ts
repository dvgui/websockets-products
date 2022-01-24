//import fs from "fs";
import Knex from "knex";
import { sqliteConfig } from "./config";
/* const read = async (path: fs.PathLike | fs.promises.FileHandle) => {
  try {
    const content = await fs.promises.readFile(path, "utf-8");
    return content;
  } catch (err) {
    throw new Error("Error de lectura " + err);
  }
};
const write = async (
  path: fs.PathLike | fs.promises.FileHandle,
  value: string
) => {
  try {
    const content = await fs.promises.writeFile(path, value);
    return content;
  } catch (err) {
    console.log("Error de escritura " + err);
  }
}; */

export default class Container {
  knex: any;
  tableName: string;

  constructor(tableName) {
    this.knex = Knex(sqliteConfig);
    this.tableName = tableName;
  }

  save(object) {
    this.knex(this.tableName).insert(object).then();
  }
  getAll() {
    return this.knex.select().table(this.tableName).then();
  }
  deleteById(id) {
    this.knex(this.tableName).where({ id: id }).del();
  }
  deleteAll() {
    this.knex(this.tableName).del().where("id", "!=", "null");
  }
  update(id, product) {
    this.knex(this.tableName).where({ id: id }).update(product);
  }
  getById(id) {
    return this.knex(this.tableName).where({ id: id });
  }
}
