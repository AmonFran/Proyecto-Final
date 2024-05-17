import { Categoria } from "../categoria.model";

export class Producto {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
    caracteristicas: string[];
    descripcion: string;
    categoria: Categoria

    constructor(id: number, nombre: string, precio: number, imagen: string, caracteristicas: string[], descripcion: string, categoria: Categoria) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.caracteristicas = caracteristicas;
        this.descripcion = descripcion;
        this.categoria = categoria;
    }
}