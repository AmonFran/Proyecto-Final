import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../_services/usuario.service';
import { ConectarUsuarioService } from '../../_services/conexion-api/conectar-usuario.service';
import { Usuario } from '../../_models/usuario.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  editForm: FormGroup;
  idEdit: number;

  constructor(private route: ActivatedRoute, private router: Router, private usuarioService: UsuarioService, private conectarUsuarioService: ConectarUsuarioService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.idEdit = + params['id'];
        if (this.usuarioService.usuarioLogeado && this.idEdit != this.usuarioService.usuarioLogeado.id) {
          this.router.navigate([''], { relativeTo: this.route.root });
          this.toastrService.error("No puedes editar un perfil que no es tuyo");
        }
      }
    )
    this.initForm()
  }

  initForm() {
    let usuario = this.usuarioService.usuarioLogeado;
    this.editForm = new FormGroup({
      'id': new FormControl(this.idEdit),
      'email': new FormControl(usuario.email),
      'password': new FormControl(null),
      'nombre': new FormControl(usuario.nombre),
      'apellido': new FormControl(usuario.apellido),
      'direccion': new FormControl(usuario.direccion),
    })
  }

  onSubmit() {
    let nuevoUsuario = new Usuario(
      this.editForm.value['id'],
      this.editForm.value['email'],
      this.usuarioService.usuarioLogeado.alias,
      (this.editForm.value['password'] == null || this.editForm.value['password'] == '') ? this.usuarioService.usuarioLogeado.contrasenha : this.editForm.value['password'],
      this.editForm.value['nombre'],
      this.editForm.value['apellido'],
      this.editForm.value['direccion'],
    )
    this.usuarioService.actualizarUsuario(nuevoUsuario);
    this.conectarUsuarioService.actualizarUsuario(nuevoUsuario);
    this.router.navigate([''], { relativeTo: this.route.root });
  }
}