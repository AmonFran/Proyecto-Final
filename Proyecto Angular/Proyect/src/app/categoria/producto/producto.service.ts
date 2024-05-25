import { Injectable } from "@angular/core";
import { CategoriaService } from "../categoria.service";
import { Producto } from "./producto.model";

@Injectable({
    providedIn: 'root'
})
export class ProductoService {
    productos: Producto[] = [
        {
            id: 1,
            nombre: 'Mochila verde',
            precio: 24,
            caracteristicas: ['Verde', 'Plastico'],
            descripcion: '',
            idCategoria: 1,
        },
        {
            id: 2,
            nombre: 'Bolso rojo',
            precio: 50,
            caracteristicas: [''],
            descripcion: '',
            idCategoria: 2,
        },
        {
            id: 3,
            nombre: 'Bandolera azul',
            precio: 12,
            caracteristicas: [''],
            descripcion: '',
            idCategoria: 3,
        },
        {
            id: 4,
            nombre: 'Cortina estampada',
            precio: 100,
            caracteristicas: [''],
            descripcion: '',
            idCategoria: 4,
        },
        {
            id: 5,
            nombre: 'Mochila azul',
            precio: 50,
            caracteristicas: ['Azul', 'Plastico'],
            descripcion: '',
            idCategoria: 1,
        },
        {
            id: 6,
            nombre: 'Mochila cactus',
            precio: 50,
            caracteristicas: ['Cactus', 'Algodon'],
            descripcion: '',
            idCategoria: 1,
        },
        {
            id: 7,
            nombre: 'Mochila dragones',
            precio: 50,
            caracteristicas: ['Dragon', 'Tela'],
            descripcion: '',
            idCategoria: 1,
        },
        {
            id: 8,
            nombre: 'Mochila flores',
            precio: 50,
            caracteristicas: ['Flores', 'Plastico'],
            descripcion: '',
            idCategoria: 1,
        },
        {
            id: 9,
            nombre: 'Mochila negra',
            precio: 50,
            caracteristicas: ['Negra', 'Plastico'],
            descripcion: '',
            idCategoria: 1,
        },
        {
            id: 10,
            nombre: 'Mochila Stich',
            precio: 50,
            caracteristicas: ['Rosa', 'Dibujo', 'Stitch'],
            descripcion: '',
            idCategoria: 1,
        }
    ]

    constructor(private categoriaservice: CategoriaService) {

    }

    getProductos() {
        return this.productos.slice();
    }

    getProducto(idProducto: number) {
        let prod = new Producto(0, '', 0, [''], '', 0)
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
    }
    actualizarProducto(idEdit: number, editProducto: Producto) {
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == idEdit) {
                this.productos[i] = editProducto;
                break;
            }
        }
    }
    borrarProducto(idProducto: number) {
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == idProducto) {
                this.productos.splice(i, 1);
                break;
            }
        }
    }
}