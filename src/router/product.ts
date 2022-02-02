import Products from "../Products";
import express from "express";

const { Router } = express;
const routerProducts = Router();

routerProducts.use(express.json());
routerProducts.use(express.urlencoded({ extended: true }));

const products = new Products("products");

/* ------------------------------ PRODUCT API ------------------------------ */

routerProducts.get("/:id?", (req, res) => {
  req.params.id
    ? res.json(products.get(req.params.id))
    : res.json(products.getAll());
});

routerProducts.post("/", (req, res) => {
  products.push(req.body);
  res.json(req.body);
});

routerProducts.put("/:id", (req, res) => {
  let id = parseInt(req.params.id);
  products.update(id, req.body);
  res.json(req.body);
});

routerProducts.delete("/:id", (req, res) => {
  let id = parseInt(req.params.id);
  products.delete(id);
  res.json(products.get(id));
});

export default routerProducts;
