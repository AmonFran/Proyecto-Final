import { Injectable } from '@angular/core';
import { DetallePedido } from './detalle-pedido';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ConectarDetallePedidoService {

  constructor(private http: HttpClient, private toastrService: ToastrService) { }

  guardarDetallePedido(nuevoDetallePedido: DetallePedido) {
    return this.http.post(`${environment.apiUrl}detalle-post`, {
      body: {
        "detallePedido": nuevoDetallePedido
      }
    }).subscribe({
      next: (response: any) => {
        this.toastrService.success('Se ha añadido el producto al carrito');
        console.log(response);
      }
    });
  }

  actualizarDetallePedido(nuevoDetallePedido: DetallePedido) {
    return this.http.put(`${environment.apiUrl}detalle-put`, nuevoDetallePedido).subscribe(
      (response: any) => {
        console.log(response);
      }
    );
  }

  borrarDetallePedido(id: number) {
    return this.http.delete(`${environment.apiUrl}detalle-delete`, { body: id }).subscribe(
      (response: any) => {
        console.log(response);
      }
    )
  }
}
