import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../_models/usuario.model';
import { UsuarioService } from '../_services/usuario.service';
import { ImagenesService } from '../_services/imagenes.service';
import { ProductoService } from '../_services/producto.service';

import { Pedido } from '../_models/pedido.model';
import { PedidoService } from '../_services/pedido.service';

import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ConectarDetallePedidoService } from '../_services/conexion-api/conectar-detalle-pedido.service';
import { DetallePedido } from '../_models/detalle-pedido';
import { DetallePedidoService } from '../_services/detalle-pedido.service';
import { ConectarPedidoService } from '../_services/conexion-api/conectar-pedido.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  usuario: Usuario | undefined;
  pedido: Pedido | false | undefined;
  detallesPedido: DetallePedido[] = [];
  subscriptionDetalles: Subscription | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private toastrService: ToastrService, private usuarioService: UsuarioService, private pedidoService: PedidoService, private detallePedidoService: DetallePedidoService, public productoService: ProductoService, public imagenesService: ImagenesService, private conectarPedidoService: ConectarPedidoService, private conectarDetallePedido: ConectarDetallePedidoService) { }

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuarioLogeado;
    // if (!this.usuario) {
    //   this.volver();
    // }
    this.pedido = this.pedidoService.buscarPedido(this.usuario.id);
    if (this.pedido) {
      const pedidoId = this.pedido.id;
      this.subscriptionDetalles = this.detallePedidoService.detallesChanged.subscribe(
        (detalles: DetallePedido[]) => {
          this.detallesPedido = [];
          for (let detalle of detalles) {
            if (detalle.idPedido == pedidoId) {
              this.detallesPedido.push(detalle);
            }
          }
        }
      )
      this.detallesPedido = this.detallePedidoService.getDetallesPedido(this.pedido.id);
    } else {
      this.volver();
    }
  }

  volver() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  eliminar(detallePedido: DetallePedido) {
    const pedidoViejo = this.pedidoService.eliminarDetalles(detallePedido.id);
    this.conectarDetallePedido.borrarDetallePedido(detallePedido.id);
    if (pedidoViejo) {
      this.conectarPedidoService.borrarPedido(pedidoViejo[0].id);
    }
  }

  finalizarPedido() {
    if (this.pedido) {
      let finalPedido = this.pedido;
      finalPedido.enProceso = false;
      finalPedido.fecha = new Date();
      finalPedido.estado = 'EN ESPERA'
      this.pedidoService.actualizarPedido(finalPedido.id);
      this.conectarPedidoService.actualizarPedido(finalPedido);
      this.toastrService.success("Pedido recibido");
      this.router.navigate([''], { relativeTo: this.route.root });
    }
  }
}
