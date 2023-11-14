import { Router } from 'express'

export const webRouter = Router()

webRouter.get('/', (req, res) => {
    res.render('home', { titulo: 'Inicio' });
  });
  

  webRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { titulo: 'RealTime' });
  });