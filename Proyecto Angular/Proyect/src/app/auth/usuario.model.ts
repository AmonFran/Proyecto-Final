export class Usuario {
    id: number;
    email: string;
    alias: string;
    contrasenha: string;
    nombre: string;
    apellido: string;
    direccion: string;
    rol: Rol = Rol.USER;

    constructor(id: number, email: string, alias: string, contrasenha: string, nombre: string, apellido: string, direccion: string) {
        this.id = id;
        this.email = email;
        this.alias = alias;
        this.contrasenha = contrasenha;
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
    }
}
export enum Rol {
    USER, MANAGER, ADMIN
}