const socket =io()

function render(data) {
    const html = data.map((elem, index) => {
        return(`<tr>
                <td>${elem.title}</td>
                <td>$ ${elem.price}</td>
                <td><img alt="foto" class="imgProducto" src=${elem.thumbnail}></td>
                </tr>`)
    })
    document.getElementById('productsTable').innerHTML = html;
}


function renderChat(mensaje){
    const html = mensaje.map((elem, index)=>{
        return( `<div>
                <strong class="usuario">${elem.usuario}</strong>
                <b class="fecha">${elem.fecha}:</b>
                <i class="mensaje">${elem.text}</i>
        </div>
        `)
    })
    document.getElementById('mensajes').innerHTML=html
}

socket.on('productosBack', function(data) { render(data); });
socket.on('mensajesPrevios', function(mensaje){renderChat(mensaje)})


const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit',(e)=>{
    e.preventDefault
    socket.emit('productoNuevo', {title:formAgregarProducto[0].value, price:formAgregarProducto[1].value, thumbnail:formAgregarProducto[2].value})
    formAgregarProducto.reset() 
})

const agregarMensaje = document.getElementById('chat')
agregarMensaje.addEventListener('submit',(e)=>{
    e.preventDefault
    socket.emit('mensajeNuevo', {usuario:agregarMensaje[0].value, fecha: '[' + new Date().toLocaleString() + ']', text:agregarMensaje[1].value})
 
   document.getElementById('text').value=''

    
})