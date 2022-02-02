import Cart from "../Cart";
import Products from "../Products";
import express from "express";

const { Router } = express;
const routerCart = Router();

routerCart.use(express.urlencoded({ extended: true }));
routerCart.use(express.json());

const carts = new Cart("./data/cart.json");

const products = new Products("products");

/* ------------------------------ CART API ------------------------------ */

routerCart.post("/", (req, res) => {
  let cartId = carts.push({});
  res.json({ cartId: cartId });
});

routerCart.delete("/:id", (req, res) => {
  let id = parseInt(req.params.id);
  carts.delete(id);
  res.json(carts.get(id));
});

routerCart.post("/:id/products", (req, res) => {
  let id = parseInt(req.params.id);
  carts.update(id, req.body);
  res.json(req.body);
});

routerCart.get("/:id/products", (req, res) => {
  let id = parseInt(req.params.id);
  carts.get(id);
});

routerCart.post("/:id/products/:productId", (req, res) => {
  let id = parseInt(req.params.id);
  let productId = parseInt(req.params.productId);
  if (!carts.get(id)) {
    res.send({ error: "cart not found" });
  }
  if (!products.get(productId)) {
    res.send({ error: "product not found" });
  }
  let cart = carts.get(id);
  let product = products.get(productId);
  let newCart = { ...cart };
  if (!newCart.products) {
    newCart.products = [];
  }
  newCart.products.push(product);
  carts.update(id, newCart);
  res.send(carts.get(id));
});

routerCart.delete("/:id/products/:id_prod", (req, res) => {
  let id = parseInt(req.params.id);
  let productId = parseInt(req.params.id_prod);
  if (!carts.get(id)) {
    res.send({ error: "no cart found" });
    return;
  }
  if (!products.get(productId)) {
    res.send({ error: "product not found" });
    return;
  }
  let cart = carts.get(id);
  let newCart = { ...cart };
  if (!cart.products) {
    res.send({ error: "cart is empty" });
    return;
  }
  newCart.products.forEach((el, i, a) => {
    if (Number(el.id) === Number(productId)) {
      a.splice(i, 1);
      carts.update(id, newCart);
      res.send(carts.get(id));
      return;
    }
  });
  carts.delete(id);
  res.json(carts.get(id));
});

export default routerCart;
