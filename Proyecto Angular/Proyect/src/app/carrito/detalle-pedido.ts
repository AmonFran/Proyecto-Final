export class DetallePedido {
    id: number;
    idPedido: number;
    idProducto: number;

    constructor(id: number, idPedido: number, idProducto: number) {
        this.id = id;
        this.idPedido = idPedido;
        this.idProducto = idProducto;
    }
}
