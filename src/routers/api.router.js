import { Router } from 'express';
import { productoManagerInstance } from '../services/productManager.js';

export const apiRouter = Router();

apiRouter.post('/productos', async (req, res) => {
  try {
      await productoManagerInstance.agregar(req.body.product);
          req['io'].sockets.emit('productos', await productoManagerInstance.obtenerTodos());
          res.json({ status: 'success', message: 'Producto agregado exitosamente' });
  } catch (error) {
          console.error('Error al agregar producto:', error);
          res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
  }
});
