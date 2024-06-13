import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../_services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService, private toastrService: ToastrService) { }

  canActivate(): boolean {
    let usuario = this.usuarioService.usuarioLogeado;
    if (usuario) {
      return true
    }
    else {
      this.toastrService.error('You shall not pass!');
      return false;
    }
  }
}