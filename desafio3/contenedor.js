class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async save(prod) {
    const fs = require("fs");
    let products = [];
    try {
      const leerArchivo = await fs.promises.readFile(this.archivo, "utf-8");
      products = JSON.parse(leerArchivo);
    } catch (error) {
      console.log(`Error al leer el archivo: ${error} `);
    }

    prod.id = this.maximoID(products) + 1;
    products.push(prod);

    try {
      await fs.promises.writeFile(this.archivo, JSON.stringify(products));
    } catch (error) {
      console.log(`Error al guardar el archivo: ${error} `);
    }
  }

  maximoID(prod) {
    let id = 0;
    const arrID = prod.map((producto) => producto.id);

    if (arrID.length !== 0) {
      return (id = Math.max(...arrID));
    } else {
      return id;
    }
  }

  async getAll() {
    const fs = require("fs");
    try {
      const leerArchivo = await fs.promises.readFile(this.archivo, "utf-8");
      const products = JSON.parse(leerArchivo);
      return products;
    } catch (error) {
      console.log(`Error al leer el archivo`);
      return null;
    }
  }

  async getByID(id) {
    try {
      const products = await this.getAll();
      if (products != null) {
        const prodID = products.find((prod) => prod.id === id);
        return prodID;
      } else {
        console.log(`No hay productos con id ${id}`);
      }
    } catch (error) {
      console.log(`No hay productos con ese ID`);
    }
  }

  async deleteByID(id) {
    const products = await this.getAll();
    const fs = require("fs");
    try {
      const index = products.findIndex((prod) => prod.id === id);
      if (index > -1) {
        products.splice(index, 1);
        await fs.promises.writeFile(this.archivo, JSON.stringify(products));
        console.log(`Producto ${id} eliminado`);
      } else {
        console.log(`No se encontró producto con id ${id}`);
      }
    } catch (error) {
      console.log(`No se encontró producto con id ${id}`);
    }
  }

  async deleteAll() {
    const products = [];
    const fs = require("fs");

    try {
      await fs.promises.writeFile(this.archivo, JSON.stringify(products));
      console.log("Productos eliminados");
    } catch {
      console.log("Error al borrar los productos");
    }
  }
  
}

// async function desafio() {
//   const productos = new Contenedor("productos.json");

//   const toury = {
//     title: "Short Toury",
//     price: 789,
//     thumbnail:
//       "https://res.cloudinary.com/janfis/image/upload/v1645743915/Backend/short_toury_ktyddz.jpg",
//   };
//   await productos.save(toury);

  //const buscarID = await productos.getByID(2);
  //console.log(`El producto buscado es ${buscarID.title}, con precio $ ${buscarID.price}, imagen: ${buscarID.thumbnail}`);
 // const todosProductos = await productos.getAll();
 //console.table(todosProductos);

  //await productos.deleteByID(2);
  //await productos.deleteAll();
//}

module.exports = Contenedor