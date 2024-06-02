import { Injectable } from '@angular/core';
import { Usuario } from './usuario.model';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    usuarioLogeado: Usuario;
    usuarios: Usuario[] = []

    constructor() { }

    cargarUsuarios(usuarios: Usuario[]) {
        this.usuarios = usuarios;
    }

    getUsuarios() {
        return this.usuarios.slice();
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
