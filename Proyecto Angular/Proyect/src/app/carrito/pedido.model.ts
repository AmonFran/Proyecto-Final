export class Pedido {
    id: number;
    idUsuario: number;
    enProceso: boolean;

    constructor(id: number, idUsuario: number, enProceso: boolean) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.enProceso = enProceso
    }
}
