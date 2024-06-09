import { Injectable } from '@angular/core';
import { DetallePedido } from './detalle-pedido';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {
  detallesPedidos: DetallePedido[] = [
    {
      id: 1,
      idPedido: 1,
      idProducto: 1,
    },
    {
      id: 2,
      idPedido: 1,
      idProducto: 2,
    },
    {
      id: 3,
      idPedido: 2,
      idProducto: 3,
    }
  ]

  constructor() { }

  anhadirProducto(idPedido: number, idProducto: number) {
    this.detallesPedidos.push({
      id: this.detallesPedidos.length + 1,
      idPedido: idPedido,
      idProducto: idProducto,
    })
  }

  getDetallesPedido(idPedido: number) {
    let detalles: DetallePedido[] = [];
    this.detallesPedidos.forEach(
      (detalle: DetallePedido) => {
        if (detalle.idPedido == idPedido) {
          detalles.push(detalle);
        }
      }
    )
    return detalles;
  }
  eliminarDetallePedido(idDetalle: number) {
    for (let i = 0; i < this.detallesPedidos.length; i++) {
      if (this.detallesPedidos[i].id == idDetalle) {
        return this.detallesPedidos.splice(i, 1);
      }
    }
    return;
  }
}
