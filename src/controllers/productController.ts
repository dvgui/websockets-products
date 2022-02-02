import mongoose from "mongoose";
import { productModel } from "../models/productModel";
import { mongoConfig } from "../config";

mongoose
  .connect(mongoConfig)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

export default class Product {
  async save(object) {
    await productModel
      .insertOne(object)
      .exec()
      .catch((err) => console.log(err));
  }
  async getAll() {
    return await productModel
      .find()
      .exec()
      .catch((err) => console.log(err));
  }
  async deleteById(id) {
    await productModel
      .deleteOne({ _id: id })
      .exec()
      .catch((err) => console.log(err));
  }
  async update(id, product) {
    delete product.id;
    await productModel
      .updateOne({ _id: id }, { $set: product })
      .exec()
      .catch((err) => console.log(err));
  }
  async getById(id) {
    return productModel
      .findOne({ _id: id })
      .exec()
      .catch((err) => console.log(err));
  }
}
