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
            imagen: 'assets/images/productos/mochilas/mochilaVerde.jpg',
            caracteristicas: ['Verde', 'Plastico'],
            descripcion: '',
            categoria: this.categoriaservice.getCategoria(0),
        },
        {
            id: 2,
            nombre: 'Bolso rojo',
            precio: 50,
            imagen: 'assets/images/productos/bolsos/bolsoRojo.jpg',
            caracteristicas: [''],
            descripcion: '',
            categoria: this.categoriaservice.getCategoria(1),
        },
        {
            id: 3,
            nombre: 'Bandolera azul',
            precio: 12,
            imagen: 'assets/images/productos/bandoleras/sacoAzul.jpg',
            caracteristicas: [''],
            descripcion: '',
            categoria: this.categoriaservice.getCategoria(2),
        },
        {
            id: 4,
            nombre: 'Cortina estampada',
            precio: 100,
            imagen: 'assets/images/productos/cortinas/cortinaEstampada.png',
            caracteristicas: [''],
            descripcion: '',
            categoria: this.categoriaservice.getCategoria(3),
        },
        {
            id: 5,
            nombre: 'Mochila azul',
            precio: 50,
            imagen: 'assets/images/productos/mochilas/mochilaAzul.png',
            caracteristicas: ['Azul', 'Plastico'],
            descripcion: '',
            categoria: this.categoriaservice.getCategoria(0),
        },
        {
            id: 6,
            nombre: 'Mochila cactus',
            precio: 50,
            imagen: 'assets/images/productos/mochilas/mochilaCactus.png',
            caracteristicas: ['Cactus', 'Algodon'],
            descripcion: '',
            categoria: this.categoriaservice.getCategoria(0),
        },
        {
            id: 7,
            nombre: 'Mochila dragones',
            precio: 50,
            imagen: 'assets/images/productos/mochilas/mochilaDragones.png',
            caracteristicas: ['Dragon', 'Tela'],
            descripcion: '',
            categoria: this.categoriaservice.getCategoria(0),
        },
        {
            id: 8,
            nombre: 'Mochila flores',
            precio: 50,
            imagen: 'assets/images/productos/mochilas/mochilaFlores.png',
            caracteristicas: ['Flores', 'Plastico'],
            descripcion: '',
            categoria: this.categoriaservice.getCategoria(0),
        },
        {
            id: 9,
            nombre: 'Mochila negra',
            precio: 50,
            imagen: 'assets/images/productos/mochilas/mochilaNegra.png',
            caracteristicas: ['Negra', 'Plastico'],
            descripcion: '',
            categoria: this.categoriaservice.getCategoria(0),
        },
        {
            id: 10,
            nombre: 'Mochila Stich',
            precio: 50,
            imagen: 'assets/images/productos/mochilas/mochilaStitch.png',
            caracteristicas: ['Rosa', 'Dibujo', 'Stitch'],
            descripcion: '',
            categoria: this.categoriaservice.getCategoria(0),
        }
    ]

    constructor(private categoriaservice: CategoriaService) {

    }

    getProductos() {
        return this.productos.slice();
    }

    getProductosCategoria(idCategoria: number) {
        let productosCategoria: Producto[] = [];
        for (let producto of this.productos) {
            if (producto.categoria.id == idCategoria) {
                productosCategoria.push(producto);
            }
        }
        return productosCategoria.slice();
    }


}