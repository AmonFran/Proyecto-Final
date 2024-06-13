export class Pedido {
    id: number;
    idUsuario: number;
    enProceso: boolean;
    fecha: Date;
    estado: string;

    constructor(id: number, idUsuario: number, enProceso: boolean, fecha: Date, estado: string) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.enProceso = enProceso;
        this.fecha = fecha;
        this.estado = estado
    }
}
