import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Producto } from './producto/producto.model';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from './categoria.service';
import { ProductoService } from './producto/producto.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css', '../app.component.css']
})
export class CategoriaComponent implements OnInit {

  @ViewChild('form') filtrosForm: NgForm;

  subscription: Subscription;
  productos: Producto[];
  id: number;

  constructor(private route: ActivatedRoute, private categoriaService: CategoriaService, private productoService: ProductoService) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.productos = this.productoService.getProductosCategoria(this.id);

      // In a real app: dispatch action to load the details here.
    });

  }

  onChange() {
    console.log(this.filtrosForm);
  }
}
