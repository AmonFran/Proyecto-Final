import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from './producto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConectarProductoService {

  constructor(private http: HttpClient) { }

  guardarProducto(nuevoProducto: Producto) {
    return this.http.post(environment.apiUrl + 'producto-post', {
      body: {
        "producto": nuevoProducto
      }
    }).subscribe(
      (response: any) => {
        console.log(response);
      }
    );
  }
  actualizarProducto(nuevoProducto: Producto) {
    return this.http.put(`${environment.apiUrl}producto-put`, nuevoProducto).subscribe(
      (response: any) => {
        console.log(response);
      }
    );
  }

  borrarProducto(id: number) {
    return this.http.delete(`${environment.apiUrl}producto-delete`, { body: id }).subscribe(
      (response: any) => {
        console.log(response);
      }
    );
  }
}
