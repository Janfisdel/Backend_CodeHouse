class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.name=nombre
        this.lastname=apellido
        this.books = libros
        this.pets = mascotas
    }

    getFullName(){
       return `${this.name} ${this.lastname}`
    }

    addMascota(pet){
        this.pets.push(pet)
    }

    countMascotas(){
        return `${this.pets.length}`
    }

    addBook(book, author){
        this.books.push({nombre:book, autor:author})
    }

    getBookNames(){
       return(this.books.map(libro=>libro.nombre))
    }
}

let usuario = new Usuario("Jana", "Fisdel", [],[])

usuario.addMascota("perro")
usuario.addMascota("pez")
usuario.addMascota("tortuga")
usuario.addBook("El señor de las moscas", "William Golding")
usuario.addBook("Fundacion", "Isaac Asimov")
usuario.addBook("Harry Potter", "J.K. Rowling")

console.log(usuario)

console.log("El nombre del usuario es ", usuario.getFullName())
console.log(usuario.name, "posee", usuario.countMascotas(), "mascotas" )
console.log(usuario.name, "tiene los siguientes libros:", usuario.getBookNames())