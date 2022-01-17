import Container from "./Container";

export default class Products {
  products: any;

  constructor(path) {
    this.products = new Container(path);
  }

  create(
    name: string,
    description: string,
    code: string,
    picUrl: string,
    price: number,
    stock: number
  ) {
    let id = this.products.save({
      name: name,
      description: description,
      code: code,
      picUrl: picUrl,
      price: price,
      timestamp: Date.now,
      stock: stock,
    });
    return this.products.getById(id);
  }

  getAll() {
    return this.products.getAll();
  }
  push(producto) {
    let id = this.products.save(producto);
    return this.products.getById(id);
  }
  update(id, producto) {
    return this.products.update(id, producto);
  }
  delete(id) {
    let product = this.products.getById(id);
    this.products.deleteById(id);
    return product;
  }
  get(id) {
    return this.products.getById(id);
  }
}
