require('dotenv').config();
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./src/public"));

const {getProductos, getProductoID, postProducto, putProducto, deleteProducto} = require('../src/routes/productos')
const {postCarrito, deleteCarrito, obtenerProductos, postProductoCarrito, deleteProductoCarrito} = require('./routes/carrito')
const routerProductos = express.Router()
const routerCarrito = express.Router()

//RUTAS PRODUCTOS
routerProductos.get("/", getProductos)
routerProductos.get("/:id", getProductoID)
routerProductos.post('/', postProducto)
routerProductos.put('/:id', putProducto)
routerProductos.delete('/:id', deleteProducto)

//RUTAS CARRITOS
routerCarrito.post("/", postCarrito)
routerCarrito.delete("/:id", deleteCarrito)
routerCarrito.get("/:id/productos", obtenerProductos)
routerCarrito.post("/:id/productos/:id_prod", postProductoCarrito)
routerCarrito.delete("/:id/productos/:id_prod", deleteProductoCarrito)


app.get('*', (req, res) => {
    res.status(400).json({descripcion: "Ruta ${req.originalUrl} Inexistente."});
 });
app.use("/api/productos", routerProductos);
app.use('/api/carrito', routerCarrito)





const port = process.env.PORT || 3000
const server = app.listen(port, ()=>{
console.log(`Server started on http://localhost:${port}`)
})
server.on('error', (err)=>console.log(err))