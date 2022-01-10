import Container from './Container';

export default class ProductsAPI{
    products: any;

    constructor(path){
        this.products = new Container(path);
    }
    getAll(){
        return this.products.getAll();
    }
    push(producto){
        let id = this.products.save(producto);
        return this.products.getById(id);
    }
    update(id,producto){
        return this.products.update(id,producto);
    }
    delete(id){
        let product = this.products.getById(id)
        this.products.deleteById(id);
        return product;
    }
    get(id){
        return this.products.getById(id)
    }
}
