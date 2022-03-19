const express = require('express')
const { engine } = require("express-handlebars")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"))


app.set('views' , 'src/views')
app.set('view engine' , 'hbs')

app.engine('hbs', 
    engine({
      extname: '.hbs',
      defaultLayout: 'index.hbs',
      layoutsDir: __dirname + '/views/layouts',
      partialsDir: __dirname + '/views/partials'
    }) )


const Contenedor = require('./contenedor')
const baseProductos = new Contenedor('./src/productos.json')


app.get('/', async(req, res)=>{
    const  productos = await baseProductos.getAll()
    res.render('main', {
        productos,
        vacio:false,
        existe: true

    }
    )
})

app.get('/productos', async (req, res)=>{
    const productos = await baseProductos.getAll()
    if (productos.length === 0){
        res.render('main', {
           vacio :true,
           existe:false     
           })
    }else {
         res.render('main',{ 
          productos,
    vacio:false,
    existe: false 
})}})


app.post('/productos', async(req, res)=>{
    const productos = await baseProductos.getAll()
    const {body} = req
    let id = 0
    let arrID = productos.map(prod=>prod.id)
    if (arrID.length !== 0) {
        id = Math.max(...arrID)
    } 
    baseProductos.save({...body, id:id+1})
    res.redirect('/productos')
})



const PORT =8082

const server = app.listen(PORT, ()=>{
console.log(`Server started on http://localhost:8082`)
})
server.on('error', (err)=>console.log(err))