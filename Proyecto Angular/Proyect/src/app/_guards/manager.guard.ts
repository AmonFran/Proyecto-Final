import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../_services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService, private toastrService: ToastrService) { }

  canActivate(): boolean {
    let usuario = this.usuarioService.usuarioLogeado;
    if (!usuario) return false;
    if (usuario.rol == 'MANAGER') {
      return true;
    } else {
      this.toastrService.error("No tienes permiso para acceder a esa pagina");
      return false;
    }
  }
}
