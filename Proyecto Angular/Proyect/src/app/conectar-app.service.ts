import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductoService } from './categoria/producto/producto.service';
import { CategoriaService } from './categoria/categoria.service';
import { UsuarioService } from './auth/usuario.service';
import { ImagenesService } from './categoria/producto/producto-imagenes/imagenes.service';
import { PedidoService } from './carrito/pedido/pedido.service';
import { DetallePedidoService } from './carrito/detalle-pedido/detalle-pedido.service';

@Injectable({
  providedIn: 'root'
})
export class ConectarAppService {

  constructor(private http: HttpClient, private productoService: ProductoService, private categoriaService: CategoriaService, private usuarioService: UsuarioService, private imagenesService: ImagenesService, private pedidoService: PedidoService, private detallePedidoService: DetallePedidoService) {
  }

  cargarTodo() {
    return this.http.get(environment.apiUrl + "todo-get").subscribe(
      (response: any) => {
        console.log(response.data.datos);
        this.productoService.cargarProductos(response.data.datos.producto);
        this.categoriaService.cargarCategorias(response.data.datos.categoria);
        this.usuarioService.cargarUsuarios(response.data.datos.usuarios);
        this.imagenesService.cargarImagenes(response.data.datos.imagenes);
        this.pedidoService.cargarPedidos(response.data.datos.pedidos);
        this.detallePedidoService.cargarDetallesPedidos(response.data.datos.detallesPedidos);
      }
    )
  }
}
