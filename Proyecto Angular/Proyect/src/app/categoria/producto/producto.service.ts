import { Injectable } from "@angular/core";
import { Producto } from "./producto.model";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductoService {
    productosChanged = new Subject<Producto[]>;
    productos: Producto[] = []

    constructor() {

    }

    cargarProductos(productos: Producto[]) {
        this.productos = productos;
    }

    getProductos() {
        return this.productos.slice();
    }

    getProducto(idProducto: number) {
        let prod = new Producto(0, '', 0, '', '', 0)
        this.productos.forEach(
            (producto) => {
                if (producto.id == idProducto) {
                    prod = producto;
                }
            }
        )
        return prod;
    }

    getProductosCategoria(idCategoria: number) {
        let productosCategoria: Producto[] = [];
        this.productos.forEach(
            (producto) => {
                if (idCategoria == producto.idCategoria) {

                }
            }
        )
        for (let producto of this.productos) {
            if (producto.idCategoria == idCategoria) {
                productosCategoria.push(producto);
            }
        }
        return productosCategoria.slice();
    }

    getProductosCategoriaYCaracteristicas(idCategoria: number, filtros: string[]) {
        let productosFiltrados: Producto[] = []
        let productosCategoria = this.getProductosCategoria(idCategoria);
        for (let producto of productosCategoria) {
            for (let caracteristica of filtros) {
                if (producto.caracteristicas.indexOf(caracteristica) > -1) {
                    productosFiltrados.push(producto);
                    break;
                }
            }
        }
        return productosFiltrados
    }

    agregarProducto(nuevoProducto: Producto) {
        this.productos.push(nuevoProducto);
        this.productosChanged.next(this.productos.slice())
    }
    actualizarProducto(idEdit: number, editProducto: Producto) {
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == idEdit) {
                this.productos[i] = editProducto;
                break;
            }
        }
        this.productosChanged.next(this.productos.slice())
    }
    borrarProducto(idProducto: number) {
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == idProducto) {
                this.productos.splice(i, 1);
                break;
            }
        }
        this.productosChanged.next(this.productos.slice())
    }
}