import fs from 'fs/promises';

export class ProductoManager {
  constructor(ruta) {
    this.ruta = ruta;
    this.products = [];
  }

  async agregar(nuevoProducto) {
    const productos = JSON.parse(await fs.readFile(this.ruta, 'utf-8'));
    productos.push(nuevoProducto);
    await fs.writeFile(this.ruta, JSON.stringify(productos, null, 2));
  }

  async obtenerTodos() {
    return JSON.parse(await fs.readFile(this.ruta, 'utf-8'));
  }

  async borrarTodos() {
    await fs.writeFile(this.ruta, '[]');
  }
}

export const productoManagerInstance = new ProductoManager('./db/productos.json');
