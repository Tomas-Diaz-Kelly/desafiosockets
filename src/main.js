import express from 'express'
import { engine } from 'express-handlebars'
import { Server as IOServer } from 'socket.io'

import { webRouter } from './routers/web.router.js'
import { apiRouter } from './routers/api.router.js'
import { productManager } from './services/productManager.js'

const app = express()

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')


const server = app.listen(8080, () => {
  console.log('Conectado puerto 8080!')
})

const ioServer = new IOServer(server)

ioServer.on('conexion', async socket => {
  console.log('nueva conexion: ', socket.id)
  socket.emit('productos', await productManager.obtenerTodos())

  socket.on('nuevoProducto', async producto => {
    await productManager.agregar(producto)
    ioServer.sockets.emit('producto', await productManager.obtenerTodos())
  })
})

app.use((req, res, next) => {
  req['io'] = ioServer
  next()
})

app.use(express.json())
app.use('/static', express.static('./static'))

app.use('/', webRouter)
app.use('/api', apiRouter)
