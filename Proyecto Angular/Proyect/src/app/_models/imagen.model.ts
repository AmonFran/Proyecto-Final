export class Imagen {
    id: number;
    idProducto: number;
    nombre: string;
    imagenPath: string;

    constructor(id: number, idProducto: number, nombre: string, imagenPath: string) {
        this.id = id;
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.imagenPath = imagenPath;
    }
}