import { Injectable } from '@angular/core';
import { Categoria } from './categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  categorias: Categoria[] = [
    {
      id: 1,
      nombre: 'Mochilas',
    },
    {
      id: 2,
      nombre: 'Bolsos',
    },
    {
      id: 3,
      nombre: 'Bandoleras',
    },
    {
      id: 4,
      nombre: 'Cortinas',
    },
  ]

  constructor() { }

  getCategoria(index: number) {
    return this.categorias.slice()[index];
  }
}
