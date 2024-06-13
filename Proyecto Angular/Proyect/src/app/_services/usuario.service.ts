import { Injectable } from '@angular/core';
import { Usuario } from '../_models/usuario.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    usuarioChanged = new Subject<Usuario[]>;
    usuarioLogeado: Usuario;
    usuarios: Usuario[] = []

    constructor() { }

    cargarUsuarios(usuarios: Usuario[]) {
        this.usuarios = usuarios;
        this.usuarioChanged.next(this.usuarios.slice());
    }

    getUsuarios() {
        return this.usuarios.slice();
    }

    getUsuario(idUsuario: number) {
        let usuarioBuscado;
        for (let usuario of this.usuarios) {
            if (usuario.id == idUsuario) {
                usuarioBuscado = usuario;
            }
        }
        return usuarioBuscado;
    }

    iniciarSesion(alias: string, contrasenha: string) {
        this.usuarios.forEach(
            (usuario) => {
                if (alias == usuario.alias && contrasenha == usuario.contrasenha) {
                    this.usuarioLogeado = usuario;
                    localStorage.setItem('user', JSON.stringify(this.usuarioLogeado));
                }
            }
        )
        if (this.usuarioLogeado) {
            return true;
        } else {
            return false
        }
    }

    anhadirUsuario(usuario: Usuario) {
        this.usuarios.push(usuario);
        this.usuarioChanged.next(this.usuarios.slice());
    }

    actualizarUsuario(usuario: Usuario) {
        for (let i = 0; i < this.usuarios.length; i++) {
            if (this.usuarios[i].id == usuario.id) {
                this.usuarios[i] = usuario;
            }
        }
        if (this.usuarioLogeado.id == usuario.id) {
            this.usuarioLogeado = usuario;
        }
        this.usuarioChanged.next(this.usuarios.slice());
    }

    logOut() {
        localStorage.removeItem('user');
        this.usuarioLogeado = null as unknown as Usuario
    }

    getRolLogeado(): string {
        if (this.usuarioLogeado) {
            return this.usuarioLogeado.rol
        }
        else return "USER"
    }

    setUsuarioLogeado(usuario: Usuario) {
        this.usuarioLogeado = usuario;
    }
}
