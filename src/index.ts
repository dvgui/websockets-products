import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import Products from "./Products";
import Cart from "./Cart";

const PORT = process.env.PORT || 3000;
const app = express();
const { Router } = express;

const routerProducts = Router();
const routerCart = Router();

app.use("/api/products", routerProducts);
app.use("/api/cart", routerCart);

routerProducts.use(express.json());
routerProducts.use(express.urlencoded({ extended: true }));
routerCart.use(express.urlencoded({ extended: true }));
routerCart.use(express.json());

const products = new Products("./data/products.json");
const carts = new Cart("./data/cart.json");
const messages = new Products("./data/messages.json");

const server = createServer(app);
const io = new Server(server, {
  path: "/socket.io",
});

app.use(express.urlencoded({ extended: true }));

app.set("views", "./public");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { messages });
});

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

app.get("*", function (req, res) {
  res.send({
    error: -2,
    descripcion: `route ${req.path} method 'get' not implemented`,
  });
});
app.post("*", function (req, res) {
  res.send({
    error: -2,
    descripcion: `route ${req.path} method 'post' not implemented`,
  });
});
app.delete("*", function (req, res) {
  res.send({
    error: -2,
    descripcion: `route ${req.path} method 'delete' not implemented`,
  });
});
app.put("*", function (req, res) {
  res.send({
    error: -2,
    descripcion: `route ${req.path} method 'put' not implemented`,
  });
});

/* ------------------------------ CHAT & SOCKETS ------------------------------ */

io.on("connection", (socket: Socket) => {
  console.log("Un cliente se ha conectado");
  socket.emit("messages", messages.getAll()); // emitir todos los mensajes a un cliente nuevo
  socket.emit("products", products.getAll());
  socket.on("new-message", function (data: string) {
    messages.push(data);
    io.sockets.emit("messages", messages.getAll()); //emitir a todos los clientes
  });
  socket.on("new-product", (data: string) => {
    products.push(data);
    io.sockets.emit("products", products.getAll()); //emitir a todos los clientes
  });
});

/* ------------------------------ SERVER RUNNER ------------------------------ */

const srv = server.listen(PORT, () => {
  const addr = server.address();
  const binding =
    typeof addr === "string" ? `pipe/socket ${addr}` : `port ${addr?.port}`;
  console.log(
    `Servidor Http con Websockets escuchando en el puerto ${binding}`
  );
});
srv.on("error", (error) => console.log(`Error en servidor ${error}`));
