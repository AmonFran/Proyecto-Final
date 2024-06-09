import { Injectable } from '@angular/core';
import { DetallePedidoService } from './detalle-pedido.service';
import { Pedido } from './pedido.model';
import { DetallePedido } from './detalle-pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  pedidos: Pedido[] = [
    {
      id: 1,
      idUsuario: 3,
      enProceso: true,
    },
    {
      id: 2,
      idUsuario: 2,
      enProceso: true,
    }
  ]

  constructor(private detallePedidoService: DetallePedidoService) { }

  crearPedido(idProducto: number, idUsuario: number) {
    let nuevoPedido = new Pedido(this.pedidos.length + 1, idUsuario, true)
    this.pedidos.push(nuevoPedido);
    this.detallePedidoService.anhadirProducto(nuevoPedido.id, idProducto)
  }

  buscarPedido(idUsuario: number) {
    let pedido: Pedido | undefined;
    for (let i = 0; i < this.pedidos.length; i++) {
      if (this.pedidos[i].idUsuario == idUsuario && this.pedidos[i].enProceso) {
        pedido = this.pedidos[i];
      }
    }
    if (pedido) {
      return pedido;
    }
    else {
      return false
    }
  }
  eliminarDetalles(idDetalle: number) {
    let detalle = this.detallePedidoService.eliminarDetallePedido(idDetalle)![0];
    if (this.detallePedidoService.getDetallesPedido(detalle.idPedido).length == 0) {
      for (let i = 0; i < this.pedidos.length; i++) {
        if (this.pedidos[i].id == detalle.idPedido) {
          this.pedidos.splice(i, 1);
        }
      }
    }
  }
}
