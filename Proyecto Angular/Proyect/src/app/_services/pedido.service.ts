import { Injectable } from '@angular/core';

import { Pedido } from '../_models/pedido.model';
import { Subject } from 'rxjs';
import { DetallePedidoService } from 'src/app/_services/detalle-pedido.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  pedidosChanged = new Subject<Pedido[]>;
  pedidos: Pedido[] = []

  constructor(private detallePedidoService: DetallePedidoService) { }

  getPedido(idPedido: number) {
    for (let pedido of this.pedidos) {
      if (pedido.id == idPedido) {
        return pedido;
      }
    }
    return;
  }
  getAllPedidosHechos() {
    let pedidosHechos: Pedido[] = [];
    for (let pedido of this.pedidos) {
      if (pedido.enProceso == false && pedido.estado != "ENVIADO") {
        pedidosHechos.push(pedido);
      }
    }
    return pedidosHechos;
  }

  cargarPedidos(pedidos: Pedido[]) {
    this.pedidos = pedidos;
    this.pedidosChanged.next(this.pedidos.slice());
  }

  crearPedido(idProducto: number, idUsuario: number) {
    let nuevoPedido = new Pedido(this.pedidos.length + 1, idUsuario, true, null as unknown as Date, null as unknown as string)
    this.pedidos.push(nuevoPedido);
    this.detallePedidoService.anhadirProducto(nuevoPedido.id, idProducto)
    this.pedidosChanged.next(this.pedidos.slice());
    return nuevoPedido;
  }

  buscarPedido(idUsuario: number) {
    let pedido: Pedido | undefined;
    for (let i = 0; i < this.pedidos.length; i++) {
      if (this.pedidos[i].idUsuario == idUsuario && this.pedidos[i].enProceso == true) {
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
  
  obtenerPedidos(idUsuario: number) {
    let pedidos: Pedido[] = [];
    for (let pedido of this.pedidos) {
      if (pedido.idUsuario == idUsuario) {
        pedidos.push(pedido);
      }
    }
    return pedidos;
  }

  obtenerPedidosRealizados(idUsuario: number) {
    let pedidos: Pedido[] = [];
    for (let pedido of this.pedidos) {
      if (pedido.idUsuario == idUsuario && pedido.enProceso == false) {
        pedidos.push(pedido);
      }
    }
    return pedidos;
  }

  actualizarPedido(pedidoId: number) {
    for (let pedido of this.pedidos) {
      if (pedido.id == pedidoId) {
        pedido.enProceso = false;
        pedido.fecha = new Date()
        pedido.estado = 'EN ESPERA'
      }
    }
    this.pedidosChanged.next(this.pedidos.slice());
  }

  cambiarEstado(pedido: Pedido) {
    for (let i = 0; i < this.pedidos.length; i++) {
      if (this.pedidos[i].id == pedido.id) {
        this.pedidos[i] = pedido;
      }
    }
    this.pedidosChanged.next(this.pedidos.slice());
  }

  eliminarDetalles(idDetalle: number) {
    let pedidoViejo;
    let detalle = this.detallePedidoService.eliminarDetallePedido(idDetalle)![0];
    if (this.detallePedidoService.getDetallesPedido(detalle.idPedido).length == 0) {
      for (let i = 0; i < this.pedidos.length; i++) {
        if (this.pedidos[i].id == detalle.idPedido) {
          pedidoViejo = this.pedidos.splice(i, 1);
        }
      }
    }
    this.pedidosChanged.next(this.pedidos.slice());
    return pedidoViejo;
  }
}
