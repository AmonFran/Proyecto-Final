import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsuarioService } from '../auth/usuario.service';
import { Producto } from './producto/producto.model';
import { ProductoService } from './producto/producto.service';
import { ImagenesService } from './producto/producto-imagenes/imagenes.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css', '../app.component.css']
})
export class CategoriaComponent implements OnInit {

  filtrosForm: FormGroup;
  filtros: string[] = [];

  subscriptionParametros: Subscription;
  subscriptionProductos: Subscription;
  productos: Producto[];
  id: number;

  constructor(private route: ActivatedRoute, private router: Router, public usuarioService: UsuarioService, private productoService: ProductoService, private imagenesService: ImagenesService) { }

  ngOnInit(): void {
    this.subscriptionParametros = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.productos = this.productoService.getProductosCategoria(this.id);
    });
    this.subscriptionProductos = this.productoService.productosChanged.subscribe(
      (productos: Producto[]) => {
        if (this.id) {
          this.productos = [];
          for (let producto of productos) {
            if (producto.idCategoria == this.id) {
              this.productos.push(producto);
            }
          }
        }
      }
    );
    // this.productos = this.productoService.getProductosCategoria(this.id);
    this.initForm();
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
    // Es bastante engorroso, pero no hay otra forma
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

  getPrimeraImagenProducto(idProducto: number) {
    return this.imagenesService.getImagenesProducto(idProducto)[0];
  }

  enModificar(index: number) {
    if (this.usuarioService.usuarioLogeado && this.usuarioService.getRolLogeado() != "USER") {
      this.router.navigate(['../edit/' + index], { relativeTo: this.route });
    }
    else {
      this.router.navigate(['../../producto/' + index], { relativeTo: this.route });
    }
  }
}
