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
  update(id: number, producto) {
    return this.carts.update(id, producto);
  }
  delete(id: number) {
    let product = this.carts.getById(id);
    this.carts.deleteById(id);
    return product;
  }
  get(id: number) {
    return this.carts.getById(id);
  }
}
