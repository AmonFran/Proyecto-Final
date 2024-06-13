import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comentario } from 'src/app/_models/comentario.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConectarComentarioService {

  constructor(private http: HttpClient) { }

  guardarComentario(nuevoComentario: Comentario) {
    return this.http.post(`${environment.apiUrl}comentario-post`, nuevoComentario).subscribe({
      next: (response: any) => console.log(response)
    }
    )
  }

  actualizarComentario(nuevoComentario: Comentario) {
    return this.http.put(`${environment.apiUrl}comentario-put`, nuevoComentario).subscribe({
      next: (response: any) => console.log(response)
    })
  }

  borrarComentario(id: number) {
    return this.http.delete(`${environment.apiUrl}comentario-delete`, { body: id }).subscribe({
      next: (response: any) => console.log(response)
    })
  }
}