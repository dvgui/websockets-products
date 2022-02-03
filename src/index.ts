import express from "express";
import { createServer } from "http";
import createTables from "./create";

import routerProducts from "./router/product";
import routerCart from "./router/cart";

createTables();

const PORT = process.env.PORT || 3000;
const app = express();

app.use("/api/products", routerProducts);
app.use("/api/cart", routerCart);

const server = createServer(app);

app.use(express.urlencoded({ extended: true }));

app.set("views", "./public");
app.set("view engine", "ejs");

app.use(express.static("public"));

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

/* ------------------------------ SERVER RUNNER ------------------------------ */

const srv = server.listen(PORT, () => {
  const addr = server.address();
  const binding =
    typeof addr === "string" ? `pipe/socket ${addr}` : `port ${addr?.port}`;
  console.log(`Http server listening in ${binding}`);
});
srv.on("error", (error) => console.log(`Error en servidor ${error}`));
