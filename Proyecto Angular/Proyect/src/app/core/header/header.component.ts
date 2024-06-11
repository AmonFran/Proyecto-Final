import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/auth/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../app.component.css']
})
export class HeaderComponent implements OnInit {
  buscador: NgModel | undefined;
  constructor(private route: ActivatedRoute, private router: Router, public usuarioService: UsuarioService) { }

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

  editarPerfil() {
    this.router.navigate(['editarPerfil/' + this.usuarioService.usuarioLogeado.id], { relativeTo: this.route.root });
  }

  verPedidos() {
    this.router.navigate(['pedidos'], { relativeTo: this.route.root });
  }

  gestionarPedidos() {
    this.router.navigate(['gestionPedidos'], { relativeTo: this.route.root });
  }

  gestionarUsuarios() {
    this.router.navigate(['adminUsers'], { relativeTo: this.route.root });
  }

  buscar(event: any) {
    if (event.buscador == '') {
      this.router.navigate([''], { relativeTo: this.route.root });
    } else {
      this.router.navigate(['productos/' + event.buscador]);
    }
  }
}
