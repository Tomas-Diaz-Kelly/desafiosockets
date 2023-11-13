import { io } from 'socket.io-client';

const socket = io();

const ulProductos = document.querySelector('#productos');
const productoForm = document.querySelector('#productoForm');
const productoInput = document.querySelector('#productoInput');

productoForm.addEventListener('submit', event => {
    event.preventDefault();
    if (productoInput.value) {
        socket.emit('nuevoProducto', productoInput.value);
        productoInput.value = '';
  }
});

socket.on('productos', productos => {
    if (ulProductos) {
        ulProductos.innerHTML = '';
    for (const produc of productos) {
        const liProductos = document.createElement('li');
        liProductos.innerHTML = produc;
        ulProductos.appendChild(liProductos);
    }
  }
});
