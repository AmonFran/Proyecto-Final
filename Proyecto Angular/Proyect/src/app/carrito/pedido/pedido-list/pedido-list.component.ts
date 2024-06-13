import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../_services/pedido.service';

import { Pedido } from '../../../_models/pedido.model';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { ImagenesService } from 'src/app/_services/imagenes.service';
import { ProductoService } from 'src/app/_services/producto.service';
import { Subscription } from 'rxjs';
import { DetallePedidoService } from 'src/app/_services/detalle-pedido.service';


@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.css']
})
export class PedidoListComponent implements OnInit {

  pedidos: Pedido[]
  subscriptionPedidos: Subscription | undefined;

  constructor(private pedidoService: PedidoService, private detallePedidoService: DetallePedidoService, private usuarioService: UsuarioService, public productoService: ProductoService, public imagenesService: ImagenesService) { }

  ngOnInit(): void {
    this.subscriptionPedidos = this.pedidoService.pedidosChanged.subscribe(
      (pedidos: Pedido[]) => {
        this.pedidos = [];
        for (let pedido of pedidos) {
          if (pedido.idUsuario == this.usuarioService.usuarioLogeado.id && pedido.enProceso == false) {
            this.pedidos.push(pedido);
          }
        }
        this.pedidos.reverse();
      }
    )
    this.pedidos = this.pedidoService.obtenerPedidosRealizados(this.usuarioService.usuarioLogeado.id);
    this.pedidos.reverse();
  }

  getDetalles(idPedido: number) {
    return this.detallePedidoService.getDetallesPedido(idPedido);
  }
}
