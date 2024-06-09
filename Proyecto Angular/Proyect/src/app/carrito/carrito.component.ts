import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../auth/usuario.model';
import { UsuarioService } from '../auth/usuario.service';
import { DetallePedido } from './detalle-pedido';
import { DetallePedidoService } from './detalle-pedido.service';
import { Pedido } from './pedido.model';
import { PedidoService } from './pedido.service';
import { ProductoService } from '../categoria/producto/producto.service';
import { ImagenesService } from '../categoria/producto/producto-imagenes/imagenes.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  usuario: Usuario | undefined;
  pedido: Pedido | boolean | undefined;
  detallesPedido: DetallePedido[] = [];

  constructor(private usuarioService: UsuarioService, private pedidoService: PedidoService, private detallePedidoService: DetallePedidoService, private router: Router, private route: ActivatedRoute, public productoService: ProductoService, public imagenesService: ImagenesService) { }

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuarioLogeado;
    if (!this.usuario) {
      this.volver();
    }
    this.pedido = this.pedidoService.buscarPedido(this.usuario.id);
    if (this.pedido) {
      this.detallesPedido = this.detallePedidoService.getDetallesPedido(this.pedido.id);
    } else {
      this.volver();
    }
  }

  volver() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
  eliminar(detallePedido: DetallePedido) {
    this.pedidoService.eliminarDetalles(detallePedido.id);

  }
}
