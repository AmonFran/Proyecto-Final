export class Comentario {
    id: number;
    cuerpo: string;
    idProducto: number;
    idUsuario: number;

    constructor(id: number, cuerpo: string, idProducto: number, idUsuario: number) {
        this.id = id;
        this.cuerpo = cuerpo;
        this.idProducto = idProducto;
        this.idUsuario = idUsuario;
    }
}