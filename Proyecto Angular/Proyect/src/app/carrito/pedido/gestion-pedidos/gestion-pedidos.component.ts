import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { ProductoService } from 'src/app/_services/producto.service';

import { Pedido } from '../../../_models/pedido.model';
import { PedidoService } from '../../../_services/pedido.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DetallePedidoService } from 'src/app/_services/detalle-pedido.service';
import { ConectarPedidoService } from 'src/app/_services/conexion-api/conectar-pedido.service';

@Component({
  selector: 'app-gestion-pedidos',
  templateUrl: './gestion-pedidos.component.html',
  styleUrls: ['./gestion-pedidos.component.css']
})
export class GestionPedidosComponent implements OnInit {

  pedidos: Pedido[] = [];
  subscriptionPedidos: Subscription | undefined;

  constructor(private pedidoService: PedidoService, private detallePedido: DetallePedidoService, public productoService: ProductoService, public usuarioService: UsuarioService, private conectarPedidoService: ConectarPedidoService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.subscriptionPedidos = this.pedidoService.pedidosChanged.subscribe(
      (pedidos: Pedido[]) => {
        this.pedidos = [];
        for (let pedido of pedidos) {
          if (pedido.enProceso == false && pedido.estado != "ENVIADO") {
            this.pedidos.push(pedido);
          }
        }
      }
    )
    this.pedidos = this.pedidoService.getAllPedidosHechos();
  }

  getDetalles(idPedido: number) {
    return this.detallePedido.getDetallesPedido(idPedido);
  }
  cambiarEstado(idPedido: number, event: any) {
    let actualizarPedido = this.pedidoService.getPedido(idPedido);
    if (actualizarPedido) {
      switch (true) {
        case event.target[0].selected: {
          actualizarPedido.estado = "EN ESPERA";
          break;
        }
        case event.target[1].selected: {
          actualizarPedido.estado = "COSIENDOSE";
          break;
        }
        case event.target[2].selected: {
          actualizarPedido.estado = "ENVIADO";
          break;
        }
      }
      this.pedidoService.cambiarEstado(actualizarPedido);
      this.conectarPedidoService.actualizarPedido(actualizarPedido);
    }
    else {
      this.toastrService.error("Ha habido algun error")
    }
  }
}
