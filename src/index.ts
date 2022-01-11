import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import ProductsAPI from "./ProductsAPI";

const PORT = process.env.PORT || 3000;
const app = express();

const products = new ProductsAPI("./data/products.json");
const messages = new ProductsAPI("./data/messages.json");

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

const srv = server.listen(PORT, () => {
  const addr = server.address();
  const binding =
    typeof addr === "string" ? `pipe/socket ${addr}` : `port ${addr?.port}`;
  console.log(
    `Servidor Http con Websockets escuchando en el puerto ${binding}`
  );
});
srv.on("error", (error) => console.log(`Error en servidor ${error}`));
