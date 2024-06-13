import { Component, Input, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Comentario } from 'src/app/_models/comentario.model';
import { ComentarioService } from 'src/app/_services/comentario.service';
import { ConectarComentarioService } from 'src/app/_services/conexion-api/conectar-comentario.service';
import { UsuarioService } from 'src/app/_services/usuario.service';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {

  comentario: NgModel | undefined;
  @Input() idProducto: number | undefined;

  constructor(private comentarioService: ComentarioService, private conectarComentarioService: ConectarComentarioService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {

  }

  enviarComentario(event: any) {
    if (this.comentario && this.idProducto) {
      let nuevoComentario = new Comentario(this.comentarioService.comentarios.length + 1, event.comentario, this.idProducto, this.usuarioService.usuarioLogeado.id)
      this.comentarioService.anhadirComentario(nuevoComentario);
      this.conectarComentarioService.guardarComentario(nuevoComentario);
    }
  }
}