import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/auth/usuario.service';
import { ImagenesService } from '../producto-imagenes/imagenes.service';
import { Producto } from '../producto.model';
import { ProductoService } from '../producto.service';
import { Imagen } from '../producto-imagenes/imagen.model';
import { DetallePedidoService } from '../../../carrito/detalle-pedido/detalle-pedido.service';
import { PedidoService } from '../../../carrito/pedido/pedido.service';
import { ConectarPedidoService } from 'src/app/carrito/pedido/conectar-pedido.service';
import { ConectarDetallePedidoService } from 'src/app/carrito/detalle-pedido/conectar-detalle-pedido.service';
import { DetallePedido } from 'src/app/carrito/detalle-pedido/detalle-pedido';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.css']
})
export class ProductoDetailComponent implements OnInit {

  subscriptionParametros: Subscription | undefined;
  producto: Producto = {} as Producto;
  imagenes: Imagen[] = [];
  id: number = 0;
  caracteristicas: string[] = [];
  constructor(private route: ActivatedRoute, private router: Router, public usuarioService: UsuarioService, private productoService: ProductoService, private imagenesService: ImagenesService, private pedidoService: PedidoService, private detallePedidoService: DetallePedidoService, private conectarPedidoService: ConectarPedidoService, private conectarDetallePedidoService: ConectarDetallePedidoService) { }

  ngOnInit(): void {
    this.subscriptionParametros = this.route.params.subscribe(
      (params: any) => {
        this.id = +params['id'];
        this.producto = this.productoService.getProducto(this.id);
        if (this.producto.caracteristicas) {
          this.caracteristicas = this.producto.caracteristicas.split(', ');
        }
      });
    this.imagenes = this.imagenesService.getImagenesProducto(this.id);
  }

  anhadir() {
    const pedido = this.pedidoService.buscarPedido(this.usuarioService.usuarioLogeado.id);
    if (typeof (pedido) != 'boolean') {
      this.detallePedidoService.anhadirProducto(pedido.id, this.producto.id);
      this.conectarDetallePedidoService.guardarDetallePedido(new DetallePedido(this.detallePedidoService.detallesPedidos.length, pedido.id, this.producto.id));
    }
    else {
      const nuevoPedido = this.pedidoService.crearPedido(this.producto.id, this.usuarioService.usuarioLogeado.id);
      this.conectarPedidoService.guardarPedido(nuevoPedido);
      this.conectarDetallePedidoService.guardarDetallePedido(new DetallePedido(this.detallePedidoService.detallesPedidos.length, nuevoPedido.id, this.producto.id))
    }
    this.router.navigate([''], { relativeTo: this.route.root });
  }

}
