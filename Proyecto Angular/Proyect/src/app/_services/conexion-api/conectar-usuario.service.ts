import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../_models/usuario.model';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ConectarUsuarioService {

  constructor(private http: HttpClient, private toastrService: ToastrService) { }

  guardarUsuario(nuevoUsuario: Usuario) {
    return this.http.post(`${environment.apiUrl}usuario-post`, {
      body: {
        "usuario": nuevoUsuario
      }
    }).subscribe(
      (response: any) => {
        console.log(response);
      }
    )
  }

  actualizarUsuario(nuevoUsuario: Usuario) {
    return this.http.put(`${environment.apiUrl}usuario-put`, nuevoUsuario).subscribe({
      next: (response: any) => {
        this.toastrService.success('Se han cambiado los datos correctamente');
        console.log(response);
      }
    });
  }

  borrarUsuario(id: number) {
    return this.http.delete(`${environment.apiUrl}usuario-delete`, { body: id }).subscribe(
      (response: any) => {
        console.log(response);
      }
    )
  }
}
