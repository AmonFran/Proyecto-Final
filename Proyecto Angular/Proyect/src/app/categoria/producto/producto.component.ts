import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Producto } from './producto.model';
import { ProductoService } from './producto.service';
import { ImagenesService } from './producto-imagenes/imagenes.service';
import { UsuarioService } from 'src/app/auth/usuario.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  subscriptionParametros: Subscription | undefined;
  productos: Producto[] = [];
  busqueda: string = '';
  constructor(private route: ActivatedRoute, private router: Router, private usuarioService: UsuarioService, private productoService: ProductoService, private imagenesService: ImagenesService) { }

  ngOnInit(): void {
    this.subscriptionParametros = this.route.params.subscribe(params => {
      this.busqueda = params['busqueda'];
      this.productos = this.productoService.getProductosBusqueda(this.busqueda.toLowerCase());
    });
  }
  getPrimeraImagenProducto(idProducto: number) {
    return this.imagenesService.getImagenesProducto(idProducto)[0];
  }
  enModificar(index: number) {
    if (this.usuarioService.usuarioLogeado && this.usuarioService.getRolLogeado() != "USER") {
      this.router.navigate(['edit/' + index], { relativeTo: this.route.root });
    }
    else {
      this.router.navigate(['producto/' + index], { relativeTo: this.route.root });
    }
  }
}
