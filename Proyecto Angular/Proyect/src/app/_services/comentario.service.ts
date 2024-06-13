import { Injectable } from '@angular/core';
import { Comentario } from '../_models/comentario.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  comentarios: Comentario[] = [];
  comentariosChanged = new Subject<Comentario[]>;

  constructor() {

  }
  cargarComentarios(comentarios: Comentario[]) {
    this.comentarios = comentarios;
    this.comentariosChanged.next(this.comentarios.slice());
  }

  getComentario() {
    return this.comentarios.slice();
  }

  getComentariosProducto(idProducto: number) {
    let comentariosProducto: Comentario[] = [];
    for (let comentario of this.comentarios) {
      if (comentario.idProducto == idProducto) {
        comentariosProducto.push(comentario);
      }
    }
    return comentariosProducto.slice();
  }

  getComentarioUsuario(idUsuario: number) {
    let comentariosUsuario: Comentario[] = [];
    for (let comentario of this.comentarios) {
      if (comentario.idUsuario == idUsuario) {
        comentariosUsuario.push(comentario);
      }
    }
    return comentariosUsuario.slice();
  }

  anhadirComentario(comentario: Comentario) {
    this.comentarios.push(comentario);
    this.comentariosChanged.next(this.comentarios.slice());
  }

  borrarComentario(idComentario: number) {
    for (let i = 0; i < this.comentarios.length; i++) {
      if (this.comentarios[i].id == idComentario) {
        this.comentarios.splice(i, 1);
      }
    }
    this.comentariosChanged.next(this.comentarios.slice());
  }
}