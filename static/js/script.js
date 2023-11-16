const socket = io();

const ulProductos = document.querySelector('#productos');

socket.on('productos', productos => {
    if (ulProductos) {
        ulProductos.innerHTML = '';
        for (const produc of productos) {
            const liProductos = document.createElement('li');
            liProductos.innerHTML = JSON.stringify(produc);
            ulProductos.appendChild(liProductos);
        }
    }
});


const ulRealTimeProductos = document.querySelector('#realTimeProductos');
const realTimeProductoForm = document.querySelector('#realTimeProductoForm');
const realTimeProductoInput = document.querySelector('#realTimeProductoInput');

realTimeProductoForm.addEventListener('submit', event => {
    event.preventDefault();
    if (realTimeProductoInput.value) {
        socket.emit('nuevoRealTimeProducto', realTimeProductoInput.value);
        realTimeProductoInput.value = '';
    }
});

socket.on('productos', productos => {
    if (ulRealTimeProductos) {
        ulRealTimeProductos.innerHTML = '';
        for (const produc of productos) {
            const liRealTimeProductos = document.createElement('li');
            liRealTimeProductos.innerHTML = produc;
            ulRealTimeProductos.appendChild(liRealTimeProductos);
        }
    }
});
