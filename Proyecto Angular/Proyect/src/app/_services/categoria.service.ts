import { Injectable } from '@angular/core';
import { Categoria } from '../_models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  categorias: Categoria[] = []

  constructor() { }

  cargarCategorias(categorias: Categoria[]) {
    this.categorias = categorias;
  }

  getCategoria(index: number) {
    let cat = new Categoria(0, "");
    this.categorias.forEach(
      (categoria) => {
        if (categoria.id == index) {
          cat = categoria
        }
      }
    )
    return cat
  }
  getCategorias() {
    return this.categorias.slice();
  }
}
