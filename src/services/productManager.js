import fs from 'fs/promises'

export class productManager {
  constructor(ruta) {
    this.ruta = ruta,
    this.products = []
  }

  async agregar(producto) {
    const products= JSON.parse(await fs.readFile(this.ruta, 'utf-8'))
    producto.push(producto)
    await fs.writeFile(this.ruta, JSON.stringify(producto, null, 2))
  }

  async obtenerTodos() {
    return JSON.parse(await fs.readFile(this.ruta, 'utf-8'))
  }

  async borrarTodos() {
    await fs.writeFile(this.ruta, '[]')
  }

}

export const productoManager = new productManager('./db/productos.json')