import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../_models/usuario.model';
import { UsuarioService } from '../../_services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConectarUsuarioService } from '../../_services/conexion-api/conectar-usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css',]
})
export class RegistroComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private usuarioService: UsuarioService, private conectarUsuarioService: ConectarUsuarioService) { }

  ngOnInit(): void {
  }

  onRegistro(form: NgForm) {
    let valores = form.value;
    let user = new Usuario(this.usuarioService.getUsuarios().length + 1, valores.email, valores.alias, valores.contrasenha, valores.nombre, valores.apellido, valores.direccion)
    this.usuarioService.anhadirUsuario(user);
    this.conectarUsuarioService.guardarUsuario(user);
    this.usuarioService.iniciarSesion(user.alias, user.contrasenha)
    this.router.navigate(['..'], { relativeTo: this.route })
  }
}
