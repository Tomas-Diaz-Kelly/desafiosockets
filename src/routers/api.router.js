import { Router } from 'express';
import { productManager } from '../services/productManager.js';

export const apiRouter = Router();

apiRouter.post('/productos', async (req, res) => {
  try {
      await productManager.agregar(req.body.product);
        req['io'].sockets.emit('productos', await productManager.obtenerTodos());
        res.json({ status: 'success', message: 'Producto agregado exitosamente' });
  } catch (error) {
    console.error('Error al agregar producto:', error);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
  }
});
