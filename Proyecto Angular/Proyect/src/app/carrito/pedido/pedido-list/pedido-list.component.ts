import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../pedido.service';
import { DetallePedidoService } from '../../detalle-pedido/detalle-pedido.service';
import { Pedido } from '../pedido.model';
import { UsuarioService } from 'src/app/auth/usuario.service';
import { ImagenesService } from 'src/app/categoria/producto/producto-imagenes/imagenes.service';
import { ProductoService } from 'src/app/categoria/producto/producto.service';
import { Subscription } from 'rxjs';


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
  }

  getDetalles(idPedido: number) {
    return this.detallePedidoService.getDetallesPedido(idPedido);
  }
}
