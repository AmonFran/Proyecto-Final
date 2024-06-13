import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../_services/usuario.service';
import { Usuario } from '../../_models/usuario.model';
import { NgModel } from '@angular/forms';
import { ConectarUsuarioService } from '../../_services/conexion-api/conectar-usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  subscriptionUsuarios: Subscription | undefined;
  usuarios: Usuario[] = []
  rol: NgModel;

  constructor(private usuarioService: UsuarioService, private conectarUsuarioService: ConectarUsuarioService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.subscriptionUsuarios = this.usuarioService.usuarioChanged.subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      }
    )
    this.usuarios = this.usuarioService.getUsuarios();
  }

  cambiarPermisos(idUsuario: number, event: any) {
    let usuario = this.usuarioService.getUsuario(idUsuario)
    if (usuario) {
      if (usuario.alias.toLowerCase() != 'sirmurloc1' && usuario.alias.toLowerCase() != 'admin') {
        switch (true) {
          case event.target[0].selected: {
            usuario.rol = "USER";
            break;
          }
          case event.target[1].selected: {
            usuario.rol = "MANAGER";
            break;
          }
          case event.target[2].selected: {
            usuario.rol = "ADMIN";
            break;
          }
        }
        this.usuarioService.actualizarUsuario(usuario);
        this.conectarUsuarioService.actualizarUsuario(usuario);
      } else {
        this.toastrService.error("No puedes quitarle los permisos de administrador al administrador")
      }
    }
    else {
      this.toastrService.error("Ha habido algun error")
    }
  }
}
