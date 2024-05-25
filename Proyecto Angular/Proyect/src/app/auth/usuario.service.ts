import { Injectable } from '@angular/core';
import { Rol, Usuario } from './usuario.model';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    usuarioLogeado: Usuario;
    usuarios: Usuario[] = [
        {
            id: 1,
            email: "murky@test.com",
            alias: "SirMurloc1",
            contrasenha: "Mrrrgll",
            nombre: "Sir Finley",
            apellido: "Mrrgglton",
            direccion: "Uldum",
            rol: Rol.ADMIN
        },
        {
            id: 2,
            email: "corzocelada@test.com",
            alias: "fuegoLover",
            contrasenha: "cata",
            nombre: "Ragnaros",
            apellido: "Fire",
            direccion: "FireLand",
            rol: Rol.USER
        },
        {
            id: 3,
            email: "malfurion@test.com",
            alias: "elune02",
            contrasenha: "fgfdgfdg",
            nombre: "Tyrande",
            apellido: "Susurravientos",
            direccion: "Darnassus",
            rol: Rol.MANAGER
        }
    ]


    constructor() { }

    getUsuarios() {
        return this.usuarios.slice();
    }

    iniciarSesion(alias: string, contrasenha: string) {
        this.usuarios.forEach(
            (usuario) => {
                if (alias == usuario.alias && contrasenha == usuario.contrasenha) {
                    this.usuarioLogeado = usuario;
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
        this.usuarioLogeado = null as unknown as Usuario
    }

    getRolLogeado(): string {
        let user = this.usuarioLogeado;
        if (user.rol == Rol.ADMIN) {
            return "ADMIN";
        } else if (user.rol == Rol.MANAGER) {
            return "MANAGER"
        }
        else {
            return "USER"
        }
    }
}
