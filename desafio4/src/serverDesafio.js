const express = require('express')


const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const Contenedor = require('./contenedor')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./src/public"));

const routerProductos = express.Router()
const productos = new Contenedor('./src/productos.json')

const middle = (req, res, next)=>{
 console.log('Producto agregado a las', new Date().toLocaleString())
 next()
}


routerProductos.get("/", async (req, res)=>{
     const todos = await productos.getAll()
     res.status(200).send(todos)
})

routerProductos.get("/:id", async (req, res)=>{
    const id=parseInt(req.params.id)
    const todos = await productos.getAll()

    if (id>0 && id<= todos.length){
        const prodID = todos[id -1]
        res.status(200).json(prodID)
    
    }else (
        res.status(400).send("Producto no encontrado")
    )

})

routerProductos.post('/', upload.single("thumbnail"), middle, async(req, res)=>{
    const todos = await productos.getAll()
    const {body}=req

    let id = 0
    let arrID = todos.map(prod=>prod.id)
    if (arrID.length !== 0) {
        id = Math.max(...arrID)
    } 
    productos.save( {...body,thumbnail: req.file.path  ,id:id+1})
    res.status(200).json(`Producto agregado con id ${id+1}`)
})

routerProductos.put('/:id', async(req, res)=>{
    const todos = await productos.getAll()
    const id = parseInt(req.params.id)
    const posicion = id -1

    if(todos[posicion]){
        todos[posicion].title = req.body.title;
        todos[posicion].price = req.body.price;
        todos[posicion].thumbnail = req.body.thumbnail;

        productos.guardarProductos(todos)

        res.status(200).json(todos)
    }else {
        res.status(400).send("No hay productos con ese ID")
    }})


    routerProductos.delete('/:id', async(req,res)=>{
        let todos = await productos.getAll()
        const {id}=req.params
        if(todos[id-1]){
            todos = todos.filter(prod=>prod.id != (id))
            productos.guardarProductos(todos)
            res.status(200).send(`Producto:${id} eliminado`)
        }else{
            res.status(400).send(`No existe el producto`)
        }
    
    })
    
    
    


app.use("/api/productos", routerProductos);




const PORT =8080

const server = app.listen(PORT, ()=>{
console.log(`Server started on http://localhost:8080`)
})
server.on('error', (err)=>console.log(err))


