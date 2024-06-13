import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConectarDetallePedidoService } from 'src/app/_services/conexion-api/conectar-detalle-pedido.service';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { DetallePedido } from 'src/app/_models/detalle-pedido';

import { PedidoService } from '../../../_services/pedido.service';
import { Imagen } from '../../../_models/imagen.model';
import { ImagenesService } from '../../../_services/imagenes.service';
import { Producto } from '../../../_models/producto.model';
import { ProductoService } from '../../../_services/producto.service';
import { DetallePedidoService } from 'src/app/_services/detalle-pedido.service';
import { ConectarPedidoService } from 'src/app/_services/conexion-api/conectar-pedido.service';
import { ToastrService } from 'ngx-toastr';
import { Comentario } from 'src/app/_models/comentario.model';
import { ComentarioService } from 'src/app/_services/comentario.service';
import { ConectarComentarioService } from 'src/app/_services/conexion-api/conectar-comentario.service';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.css']
})
export class ProductoDetailComponent implements OnInit {

  subscriptionParametros: Subscription | undefined;
  subscriptionProductos: Subscription | undefined;
  subscriptionImagenes: Subscription | undefined;
  subscriptionComentario: Subscription | undefined;

  producto: Producto = {} as Producto;
  imagenes: Imagen[] = [];
  id: number = 0;
  caracteristicas: string[] = [];
  comentarios: Comentario[] = [];

  constructor(private route: ActivatedRoute, private router: Router, public usuarioService: UsuarioService, private productoService: ProductoService, private imagenesService: ImagenesService, private pedidoService: PedidoService, private detallePedidoService: DetallePedidoService, private comentarioService: ComentarioService, private conectarPedidoService: ConectarPedidoService, private conectarDetallePedidoService: ConectarDetallePedidoService, private conectarComentarioService: ConectarComentarioService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.subscriptionParametros = this.route.params.subscribe(
      (params: any) => {
        this.id = +params['id'];
        this.producto = this.productoService.getProducto(this.id);
        if (this.producto.caracteristicas) {
          this.caracteristicas = this.producto.caracteristicas.split(', ');
        }
      });
    this.subscriptionProductos = this.productoService.productosChanged.subscribe(
      () => {
        this.producto = this.productoService.getProducto(this.id);
        if (this.producto.caracteristicas) {
          this.caracteristicas = this.producto.caracteristicas.split(', ');
        }
      }
    )
    this.subscriptionImagenes = this.imagenesService.imagenesChanged.subscribe(
      () => {
        this.imagenes = this.imagenesService.getImagenesProducto(this.id);
      }
    )
    this.imagenes = this.imagenesService.getImagenesProducto(this.id);
    this.subscriptionComentario = this.comentarioService.comentariosChanged.subscribe(
      () => {
        this.comentarios = this.comentarioService.getComentariosProducto(this.id);
      }
    )
    this.comentarios = this.comentarioService.getComentariosProducto(this.id);
  }

  anhadir() {
    if (this.usuarioService.usuarioLogeado) {
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
    } else {
      this.toastrService.error("Debes estar logueado para añadir el producto");
    }
  }

  getUsuario(idUsuario: number) {
    return this.usuarioService.getUsuario(idUsuario)?.alias;
  }
  eliminarComentario(idComentario: number) {
    this.comentarioService.borrarComentario(idComentario);
    this.conectarComentarioService.borrarComentario(idComentario);
  }
}
