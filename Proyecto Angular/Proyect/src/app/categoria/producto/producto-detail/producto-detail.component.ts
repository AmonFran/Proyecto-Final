import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/auth/usuario.service';
import { ImagenesService } from '../producto-imagenes/imagenes.service';
import { Producto } from '../producto.model';
import { ProductoService } from '../producto.service';
import { Imagen } from '../producto-imagenes/imagen.model';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.css']
})
export class ProductoDetailComponent implements OnInit {

  subscriptionParametros: Subscription;
  producto: Producto;
  imagenes: Imagen[] = [];
  id: number = 0;
  caracteristicas: string[] = [];
  constructor(private route: ActivatedRoute, private router: Router, public usuarioService: UsuarioService, private productoService: ProductoService, private imagenesService: ImagenesService) { }

  ngOnInit(): void {
    this.subscriptionParametros = this.route.params.subscribe(
      (params: any) => {
        this.id = +params['id'];
        this.producto = this.productoService.getProducto(this.id);
        this.caracteristicas = this.producto.caracteristicas.split(', ');
        console.log(this.caracteristicas);
      });
    this.imagenes = this.imagenesService.getImagenesProducto(this.id);
  }

}
