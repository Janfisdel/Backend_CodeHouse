//FUNCIONES PARA CADA RUTA DE LOS PRODUCTOS
require("dotenv").config();
const Productos = require("../baseDatos/Contenedor");
const dbProductos = new Productos("./src/baseDatos/productos.json");
const admin = process.env.ADMIN;

const getProductos = async (req, res) => {
  const todos = await dbProductos.getAll();
  res.status(200).send(todos);
};

const getProductoID = async (req, res) => {
  const id = parseInt(req.params.id);
  const todos = await dbProductos.getAll();

  if (id > 0 && id <= todos.length) {
    const prodID = todos[id - 1];
    res.status(200).json(prodID);
  } else {res.status(400).json("Producto no encontrado")};
};

const postProducto = async (req, res) => {
  if (!admin) {
    return res.status(401).json({error:401, descripcion: "Ruta /api/productos, metodo POST no autorizado"});
  } else {
    const todos = await dbProductos.getAll();
    const { body } = req;

    let id = 0;
    let arrID = todos.map((prod) => prod.id);
    if (arrID.length !== 0) {
      id = Math.max(...arrID);
    }
    dbProductos.save({ ...body, timestamp: Date.now(), id: id + 1 });
    return res.status(200).json(`Producto agregado con id ${id + 1}`);
  }
};

const putProducto = async (req, res) => {
  if (!admin) {
    return res.status(401).json({error:401, descripcion: "Ruta /api/productos, metodo PUT no autorizado"});
  } else {
    const todos = await dbProductos.getAll();
    const id = parseInt(req.params.id);
    const posicion = id - 1;

    if (todos[posicion]) {
      todos[posicion].nombre = req.body.nombre;
      todos[posicion].descripcion = req.body.descripcion;
      todos[posicion].codigo = req.body.codigo;
      todos[posicion].foto = req.body.foto;
      todos[posicion].precio = req.body.precio;
      todos[posicion].stock = req.body.stock;
      todos[posicion].timestamp = Date.now();

      dbProductos.guardarProductos(todos);

      res.status(200).json(todos);
    } else {
      res.status(400).json("No hay productos con ese ID");
    }
  }
};

const deleteProducto = async (req, res) => {
  if (!admin) {
    return res.status(401).json({error:401, descripcion: "Ruta /api/productos, metodo DELETE no autorizado"});
  } else {
    const id = parseInt(req.params.id);
    await dbProductos.deleteByID(id);
  }
};

module.exports = {
  getProductos,
  getProductoID,
  postProducto,
  putProducto,
  deleteProducto,
};
