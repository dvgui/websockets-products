import { Schema, Model } from "mongoose";
import Url from "mongoose-type-url";

const cartsCollection = "carts";

interface Cart {
  title: string;
  price: number;
  thumbnail?: string;
}

const CartSchema = new Schema<Cart>({
  title: { type: String, require: true, max: 100 },
  price: { type: Number, require: true },
  thumbnail: { type: Url, require: false },
});

const cartModel = new Model(cartsCollection, CartSchema);

export { cartModel };
