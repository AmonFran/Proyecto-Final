import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriaService } from './categoria.service';
import { Producto } from './producto/producto.model';
import { ProductoService } from './producto/producto.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css', '../app.component.css']
})
export class CategoriaComponent implements OnInit {

  filtrosForm: FormGroup;
  filtros: string[] = [];

  subscription: Subscription;
  productos: Producto[];
  id: number;

  constructor(private route: ActivatedRoute, private categoriaService: CategoriaService, private productoService: ProductoService) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.productos = this.productoService.getProductosCategoria(this.id);
    });
    this.initForm()
  }

  initForm() {

    this.filtrosForm = new FormGroup({
      'Algodon': new FormControl(false),
      'Plastico': new FormControl(false),
      'Poliester': new FormControl(false),
      'Tela': new FormControl(false),
    });
  }

  onChange() {
    if (this.filtrosForm.value['Algodon'] == true && this.filtros.indexOf('Algodon') == -1) {
      this.filtros.push("Algodon")
    } else if (this.filtrosForm.value['Algodon'] == false) {
      if (this.filtros.indexOf('Algodon') > -1) {
        this.filtros.splice(
          this.filtros.indexOf('Algodon')
          , 1
        )
      }
    }
    if (this.filtrosForm.value['Plastico'] == true && this.filtros.indexOf('Plastico') == -1) {
      this.filtros.push("Plastico")
    } else if (this.filtrosForm.value['Plastico'] == false) {
      if (this.filtros.indexOf('Plastico') > -1) {
        this.filtros.splice(
          this.filtros.indexOf('Plastico')
          , 1
        )
      }
    }
    if (this.filtrosForm.value['Poliester'] == true && this.filtros.indexOf('Poliester') == -1) {
      this.filtros.push("Poliester")
    } else if (this.filtrosForm.value['Poliester'] == false) {
      if (this.filtros.indexOf('Poliester') > -1) {
        this.filtros.splice(
          this.filtros.indexOf('Poliester')
          , 1
        )
      }
    }
    if (this.filtrosForm.value['Tela'] == true && this.filtros.indexOf('Tela') == -1) {
      this.filtros.push("Tela")
    } else if (this.filtrosForm.value['Tela'] == false) {
      if (this.filtros.indexOf('Tela') > -1) {
        this.filtros.splice(
          this.filtros.indexOf('Tela')
          , 1
        )
      }
    }
    if (this.filtros.length > 0) {
      this.filtrar()
    }
    else {
      this.productos = this.productoService.getProductosCategoria(this.id)
    }
  }

  borrar() {
    this.initForm();
    this.onChange()
  }
  filtrar() {
    this.productos = this.productoService.getProductosCategoriaYCaracteristicas(this.id, this.filtros)
  }
}
