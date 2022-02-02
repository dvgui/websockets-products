import { Schema, Model } from "mongoose";
import Url from "mongoose-type-url";

const productsCollection = "products";

interface Product {
  title: string;
  price: number;
  thumbnail?: string;
}

const ProductSchema = new Schema<Product>({
  title: { type: String, require: true, max: 100 },
  price: { type: Number, require: true },
  thumbnail: { type: Url, require: false },
});

const productModel = new Model(productsCollection, ProductSchema);

export { productModel };
