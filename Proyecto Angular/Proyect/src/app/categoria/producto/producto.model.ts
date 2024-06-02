import { Categoria } from "../categoria.model";

export class Producto {
    id: number;
    nombre: string;
    precio: number;
    caracteristicas: string;
    descripcion: string;
    idCategoria: number

    constructor(id: number, nombre: string, precio: number, caracteristicas: string, descripcion: string, idCategoria: number) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.caracteristicas = caracteristicas;
        this.descripcion = descripcion;
        this.idCategoria = idCategoria;
    }
}