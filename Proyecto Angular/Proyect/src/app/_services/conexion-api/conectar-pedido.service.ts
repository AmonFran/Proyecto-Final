import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from 'src/app/_models/pedido.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConectarPedidoService {

  constructor(private http: HttpClient) { }

  guardarPedido(nuevoPedido: Pedido) {
    return this.http.post(`${environment.apiUrl}pedido-post`, {
      body: {
        "pedido": nuevoPedido
      }
    }).subscribe(
      (response: any) => {
        console.log(response);
      }
    )
  }

  actualizarPedido(nuevoPedido: Pedido) {
    return this.http.put(`${environment.apiUrl}pedido-put`, nuevoPedido).subscribe(
      (response: any) => {
        console.log(response);
      }
    );
  }

  borrarPedido(id: number) {
    return this.http.delete(`${environment.apiUrl}pedido-delete`, { body: id }).subscribe(
      (response: any) => {
        console.log(response);
      }
    )
  }
}
