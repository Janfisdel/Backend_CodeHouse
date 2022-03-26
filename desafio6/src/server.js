const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.set('views', './src/views')
app.set('view engine', 'ejs')

const Contenedor = require('./contenedor')
const baseProductos = new Contenedor('./src/productos.json')
const baseMensajes =new Contenedor('./src/mensajes.json')

io.on('connection', async(socket) => {
    const  productos = await baseProductos.getAll()
    const mensajes = await baseMensajes.getAll()
    console.log("💻 Nuevo usuario conectado!");
    socket.emit('productosBack', productos)
    socket.emit('mensajesPrevios', mensajes)

    socket.on('productoNuevo', async(data) => {
        await baseProductos.save(data)
        io.sockets.emit('productosBack', await baseProductos.getAll()) 
    });
    
    socket.on('mensajeNuevo', async(mensaje) =>{
        await baseMensajes.save(mensaje)
        io.sockets.emit('mensajesPrevios', await baseMensajes.getAll())
    })
})



app.get('/', (req, res)=>{
    res.render('pages/index',{})
})


const PORT =8080

server.listen(PORT, ()=>{
console.log(`Server started on http://localhost:8080`)
})
server.on('error', (err)=>console.log(err))

