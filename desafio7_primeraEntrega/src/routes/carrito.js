const Contenedor = require("../baseDatos/Contenedor");
const dbCarrito = new Contenedor("./src/baseDatos/carrito.json");
const dbProducto = new Contenedor("./src/baseDatos/productos.json");

const postCarrito = async (req, res) => {
  const todos = await dbCarrito.getAll();
  let id = 0;
  let arrID = todos.map((prod) => prod.id);
  if (arrID.length !== 0) {
    id = Math.max(...arrID);
  }
  dbCarrito.save({ id: id + 1, timestamp: Date.now(), productos: [] });
  return res.status(200).json(`Se creó un carrito con id ${id + 1}`);
};

const deleteCarrito = async (req, res) => {
  const id = parseInt(req.params.id);
  await dbCarrito.deleteByID(id);
};

const obtenerProductos = async (req, res) => {
  const id = parseInt(req.params.id);
  const carritos = await dbCarrito.getAll();

  if (id > 0 && id <= carritos.length) {
    const carritoID = carritos[id - 1];
    res.status(200).json(carritoID.productos);
  } else {
    res.status(400).json("No hay carritos con ese id");
  }
};

const postProductoCarrito = async (req, res) => {
  const idCarrito = parseInt(req.params.id);
  const idProducto = parseInt(req.params.id_prod);
  const carritos = await dbCarrito.getAll();

  if (idCarrito > 0 && idCarrito <= carritos.length) {
    const carritoID = carritos[idCarrito - 1];
    const todosProductos = await dbProducto.getAll();
    if (idProducto > 0 && idProducto <= todosProductos.length) {
      const productoID = todosProductos.find((prod) => prod.id === idProducto);
      carritoID.productos.push(productoID);
      carritos[idCarrito - 1] = carritoID;
      dbCarrito.guardarProductos(carritos);
      res
        .status(200)
        .json(`Producto ${idProducto} agregado al carrito ${idCarrito}`);
    } else {
      res
        .status(400)
        .send("Producto no encontrado, imposible de agregar al carrito");
    }
  } else {
    res
      .status(400)
      .send("No hay carritos con ese Id, imposible agregar productos");
  }
};

const deleteProductoCarrito = async(req, res)=>{
    const idCarrito = parseInt(req.params.id);
    const idProducto = parseInt(req.params.id_prod);
    const carritos = await dbCarrito.getAll()
    
    
    if (idCarrito > 0 && idCarrito <= carritos.length){
        const carritoID = carritos[idCarrito-1]
        const index = carritoID.productos.findIndex((prod)=>prod.id===idProducto)
        if(index>-1){
            carritoID.productos.splice(index,1)
            carritos[idCarrito-1]=carritoID
            dbCarrito.guardarProductos(carritos)
            res.status(200).json(`producto ${idProducto} eliminado del carrito ${idCarrito}`)
        }else {
            res.status(400).json(`producto ${idProducto} no se encuentra en el carrito ${idCarrito}, imposible de eliminar`)
        }
    }else {
        res.status(400).send("No hay carritos con ese ID, imposible eliminar productos")
    }

}

module.exports = {
  postCarrito,
  deleteCarrito,
  obtenerProductos,
  postProductoCarrito,
  deleteProductoCarrito
};
