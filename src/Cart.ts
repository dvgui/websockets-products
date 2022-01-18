import Container from "./Container";

export default class Cart {
  carts: any;

  constructor(path) {
    this.carts = new Container(path);
  }

  getAll() {
    return this.carts.getAll();
  }
  push(producto) {
    let id = this.carts.save(producto);
    return this.carts.getById(id);
  }
  update(id: number, products) {
    return this.carts.update(id, products);
  }
  delete(id: number) {
    let cart = this.carts.getById(id);
    this.carts.deleteById(id);
    return cart;
  }
  deleteProduct(id: number, product: number) {
    let cart = this.carts.getById(id);
    cart.find();
  }
  get(id: number) {
    return this.carts.getById(id);
  }
}
