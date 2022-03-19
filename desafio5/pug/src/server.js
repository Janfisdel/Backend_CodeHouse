const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'));

app.set('views', './src/views')
app.set('view engine' , 'pug')

const Contenedor = require('./contenedor')
const baseProductos = new Contenedor('./src/productos.json')

app.get('/', (req, res)=>{
    res.render('formProductos')
})


app.get('/productos', async(req, res)=>{
    const  productos = await baseProductos.getAll()
    if (productos.length === 0) {
        res.render('sinProductos',{})
    }else {
          res.render('tableProductos',{productos})
    }
  
})

app.post('/productos', async(req, res)=>{
    const  productos = await baseProductos.getAll()
    const {body} = req
     let id = 0
     let arrID = productos.map(prod=>prod.id)
     if (arrID.length !== 0) {
       id = Math.max(...arrID)
     } 
     baseProductos.save({...body, id:id+1})
    res.redirect('/productos')
   
})
const PORT =8080

const server = app.listen(PORT, ()=>{
console.log(`Server started on http://localhost:8080`)
})
server.on('error', (err)=>console.log(err))