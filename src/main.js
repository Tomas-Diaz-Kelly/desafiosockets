import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io'; // Cambiado a Server

import { webRouter } from './routers/web.router.js';
import { apiRouter } from './routers/api.router.js';
// Cambiado a productoManagerInstance
import { productoManagerInstance as productManager } from './services/productManager.js';

const app = express();

const server = app.listen(8080, () => {
  console.log('Conectado puerto 8080!');
});

app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

const ioServer = new Server(server);

app.use((req, res, next) => {
  req['io'] = ioServer;
  next();
});

app.use(express.json());
app.use('/static', express.static('./static'));

app.use('/', webRouter);
app.use('/api', apiRouter);

ioServer.on('connection', async (socket) => {
  console.log('nueva conexion: ', socket.id);
  socket.emit('productos', await productManager.obtenerTodos());

  socket.on('nuevoProducto', async (producto) => {
    await productManager.agregar(producto);
    ioServer.sockets.emit('producto', await productManager.obtenerTodos());
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`Internal Server Error: ${err.message}`);
});
