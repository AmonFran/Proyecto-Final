import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductoService } from './_services/producto.service';
import { CategoriaService } from './_services/categoria.service';
import { UsuarioService } from './_services/usuario.service';
import { ImagenesService } from './_services/imagenes.service';
import { PedidoService } from './_services/pedido.service';
import { DetallePedidoService } from './_services/detalle-pedido.service';
import { ComentarioService } from './_services/comentario.service';


@Injectable({
  providedIn: 'root'
})
export class ConectarAppService {

  constructor(private http: HttpClient, private productoService: ProductoService, private categoriaService: CategoriaService, private usuarioService: UsuarioService, private imagenesService: ImagenesService, private pedidoService: PedidoService, private detallePedidoService: DetallePedidoService, private comentarioService: ComentarioService) {
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
        this.comentarioService.cargarComentarios(response.data.datos.comentarios);
      }
    )
  }
}
