class Contenedor{
  constructor(archivo) {
    this.archivo = archivo;
  }

  async save(obj) {
    const fs = require("fs");
    let array = [];
    try {
      const leerArchivo = await fs.promises.readFile(this.archivo, "utf-8");
      array = JSON.parse(leerArchivo);
    } catch (error) {
      console.log(`Error al leer el archivo: ${error} `);
    }

    obj.id = this.maximoID(array) + 1;
    array.push(obj);

    try {
      await fs.promises.writeFile(this.archivo, JSON.stringify(array));
    } catch (error) {
      console.log(`Error al guardar el archivo: ${error} `);
    }
  }

  maximoID(obj) {
    let id = 0;
    const arrID = obj.map((objeto) => objeto.id);

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
      const array = JSON.parse(leerArchivo);
      return array;
    } catch (error) {
      console.log(`Error al leer el archivo`);
      return null;
    }
  }

  async getByID(id) {
    try {
      const array = await this.getAll();
      if (array != null) {
        const objID = array.find((obj) => obj.id === id);
        return objID;
      } else {
        console.log(`No hay productos con id ${id}`);
      }
    } catch (error) {
      console.log(`No hay productos con ese ID`);
    }
  }

  async deleteByID(id) {
    const array = await this.getAll();
    const fs = require("fs");
    try {
      const index = array.findIndex((obj) => obj.id === id);
      if (index > -1) {
        array.splice(index, 1);
        await fs.promises.writeFile(this.archivo, JSON.stringify(array));
        console.log(`Elemento ${id} eliminado`);
      } else {
        console.log(`No se encontró elemento con id ${id}`);
      }
    } catch (error) {
      console.log(`No se encontró elemento con id ${id}`);
    }
  }

  async deleteAll() {
    const array = [];
    const fs = require("fs");

    try {
      await fs.promises.writeFile(this.archivo, JSON.stringify(array));
      console.log("Productos eliminados");
    } catch {
      console.log("Error al borrar los productos");
    }
  }
  
  guardarProductos(array) {
    const fs = require("fs");
    fs.writeFile(this.archivo, JSON.stringify(array), error =>{
        if (error) {
            console.log('Error al Guardar el Archivo.');
        } else {
            return true;
        }
    })
}
  
}

module.exports = Contenedor