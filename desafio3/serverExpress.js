const express = require('express')
const Contenedor = require('./contenedor')

const app = express()
const PORT = 8080


app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})

app.get("/productos", async (req, res)=>{
    const productos = new Contenedor('productos.json')
    const todos = await productos.getAll()
      
    res.send(todos)
})


app.get("/productosRandom", async (req, res)=>{
    const productos = new Contenedor('productos.json')
    const todos = await productos.getAll()
    const random = todos[Math.floor(Math.random()*todos.length)]
      
    res.send(random)
})

