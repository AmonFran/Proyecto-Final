import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/auth/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../app.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    const alias = form.value.alias;
    const contrasenha = form.value.contrasenha;
    this.usuarioService.iniciarSesion(alias, contrasenha);
  }
  onLogOut() {
    this.usuarioService.logOut();
  }
}
