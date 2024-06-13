import { Component, OnInit } from '@angular/core';
import { ConectarAppService } from './conectar-app.service';
import { UsuarioService } from './_services/usuario.service';
import { Usuario } from './_models/usuario.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Proyect';

  constructor(private conectarService: ConectarAppService, private usuarioService: UsuarioService) {

  }
  ngOnInit(): void {
    this.conectarService.cargarTodo();
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: Usuario = JSON.parse(userString);
    this.usuarioService.setUsuarioLogeado(user);
  }
}
