import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DetallePedido } from '../_models/detalle-pedido';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {
  detallesChanged = new Subject<DetallePedido[]>;
  detallesPedidos: DetallePedido[] = []

  constructor() { }

  cargarDetallesPedidos(detallesPedidos: DetallePedido[]) {
    this.detallesPedidos = detallesPedidos
  }

  anhadirProducto(idPedido: number, idProducto: number) {
    this.detallesPedidos.push({
      id: this.detallesPedidos.length + 1,
      idPedido: idPedido,
      idProducto: idProducto,
    })
    this.detallesChanged.next(this.detallesPedidos.slice());
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
        const detalle = this.detallesPedidos.splice(i, 1);
        this.detallesChanged.next(this.detallesPedidos.slice());
        return detalle;
      }
    }
    this.detallesChanged.next(this.detallesPedidos.slice());
    return;
  }
}
