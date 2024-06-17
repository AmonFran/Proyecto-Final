import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../../_models/categoria.model';
import { CategoriaService } from '../../../_services/categoria.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductoService } from '../../../_services/producto.service';
import { ImagenesService } from '../../../_services/imagenes.service';
import { Producto } from '../../../_models/producto.model';
import { Imagen } from '../../../_models/imagen.model';
import { ConectarProductoService } from '../../../_services/conexion-api/conectar-producto.service';
import { ImagenesStorageService } from 'src/app/_services/conexion-api/conectar-imagenes.service';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.css']
})
export class ProductoEditComponent implements OnInit {
  productoForm: FormGroup;
  categorias: Categoria[];
  selected: number;
  archivos: File[] = [];
  editMode = false;
  idEdit: number;

  constructor(private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private imagenesService: ImagenesService,
    private imagenesStorageService: ImagenesStorageService,
    private productoStorageService: ConectarProductoService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.idEdit = + params['id'];
        this.editMode = params['id'] != null;
      }
    )
    this.categorias = this.categoriaService.getCategorias();
    this.initForm();
  }

  initForm() {
    let productoId = this.productoService.getProductos().length + 1;
    let productoNombre = '';
    let productoPrecio = 0;
    let productoCategoria = 0;
    let productoDescripcion = '';
    let productoCaracteristicas = '';
    this.selected = 0;
    let productoImagenes = new FormArray<any>([]);
    if (this.editMode) {
      const productoEditado = this.productoService.getProducto(this.idEdit);
      productoId = productoEditado.id;
      productoNombre = productoEditado.nombre;
      productoPrecio = productoEditado.precio;
      productoCategoria = productoEditado.idCategoria;
      productoDescripcion = productoEditado.descripcion;
      productoCaracteristicas = productoEditado.caracteristicas;
      this.selected = productoEditado.idCategoria;
      if (this.imagenesService.getImagenesProducto((productoId))) {
        const imagenes = this.imagenesService.getImagenesProducto((productoId));
        for (let imagen of imagenes) {
          let archivo: File;
          // imagen.imagenPath.split("/")[-1];
          productoImagenes.push(
            new FormGroup({
              'idImagen': new FormControl(imagen.id),
              'idImagenProducto': new FormControl(imagen.idProducto),
              'imgName': new FormControl(imagen.nombre, Validators.required),
              'imgPath': new FormControl(imagen.imagenPath),
              'imagen': new FormControl({ value: null, disabled: true }),
            })
          )
        }
      }
    }
    this.productoForm = new FormGroup({
      'id': new FormControl(productoId),
      "nombre": new FormControl(productoNombre, Validators.required),
      "precio": new FormControl(productoPrecio, Validators.min(1)),
      "categoria": new FormControl(productoCategoria, Validators.min(1)),
      "descripcion": new FormControl(productoDescripcion),
      "caracteristicas": new FormControl(productoCaracteristicas),
      "imagenes": productoImagenes
    })
  }

  onAddImagen() {
    (<FormArray>this.productoForm.get('imagenes')).push(
      new FormGroup({
        'idImagen': new FormControl(null),
        'idImagenProducto': new FormControl(this.productoForm.value['id']),
        'imgName': new FormControl(null, Validators.required),
        'imgPath': new FormControl(null),
        'imagen': new FormControl(null, Validators.required),
      })
    )
  }
  onSubmit() {
    let archivosImagenes: any[] = [];
    let nuevoProducto = new Producto(
      this.productoForm.value['id'],
      this.productoForm.value['nombre'],
      this.productoForm.value['precio'],
      this.productoForm.value['caracteristicas'],
      this.productoForm.value['descripcion'],
      this.productoForm.value['categoria'],
    )
    let nuevasImagenes: Imagen[] = [];
    for (let i = 0; i < this.productoForm.value['imagenes'].length; i++) {
      if (this.productoForm.value['imagenes'][i].imgPath) {
        nuevasImagenes.push(new Imagen(
          this.productoForm.value['imagenes'][i].idImagen,
          this.productoForm.value['imagenes'][i].idImagenProducto,
          this.productoForm.value['imagenes'][i].imgName,
          this.productoForm.value['imagenes'][i].imgPath
        ));
      } else {
        nuevasImagenes.push(new Imagen(
          this.productoForm.value['imagenes'][i].idImagen,
          this.productoForm.value['imagenes'][i].idImagenProducto,
          this.productoForm.value['imagenes'][i].imgName,
          "http://localhost/api/assets/images/productos/" + this.archivos[i].name
        ));
      }

    }
    if (this.editMode) {
      // Actualizar producto
      this.productoStorageService.actualizarProducto(nuevoProducto);
      this.productoService.actualizarProducto(this.idEdit, nuevoProducto);

      // Actualizar Imagenes
      this.imagenesService.actualizarImagenes(nuevasImagenes);
      this.imagenesStorageService.actualizarImagenes(nuevasImagenes, nuevoProducto.id);
      this.archivos.forEach(archivo => {
        if (archivo) {
          this.imagenesStorageService.guardarArchivo(archivo);
        }
      })
      // Ir a la pagina de los productos
      this.router.navigate(['../../' + nuevoProducto.idCategoria], { relativeTo: this.route });
    }
    else {
      if (nuevasImagenes[0]) {
        this.productoStorageService.guardarProducto(nuevoProducto);
        this.productoService.agregarProducto(nuevoProducto)
        this.imagenesStorageService.guardarImagenes(nuevasImagenes);
        this.imagenesService.insertarImagenes(nuevasImagenes);
        this.archivos.forEach(archivo => {
          if (archivo) {
            this.imagenesStorageService.guardarArchivo(archivo);
          }
        })
      }
      else {
        this.productoStorageService.guardarProducto(nuevoProducto);
        this.productoService.agregarProducto(nuevoProducto)
      }
      setTimeout(() => {
        this.router.navigate(['../' + nuevoProducto.idCategoria], { relativeTo: this.route })
      }, 1000);
    }
  }

  onDeleteImagen(index: number) {
    this.archivos.splice(index, 1);
    (<FormArray>this.productoForm.get('imagenes')).removeAt(index);
  }
  onDeleteImagenes() {
    this.imagenesStorageService.borrarImagenes(this.idEdit);
    this.imagenesService.borrarImagenes(this.idEdit);
    this.router.navigate(['../..'], { relativeTo: this.route });
  }
  onFileChange(event: any, field: any, index: number) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.archivos[index] = file;
      // just checking if it is an image, ignore if you want
      if (!file.type.startsWith('image')) {
        this.productoForm.get(field).setErrors({
          required: true
        });
        this.cd.markForCheck();
      } else {
        // unlike most tutorials, i am using the actual Blob/file object instead of the data-url
        this.productoForm.patchValue({
          [file]: file
        });
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      }
    }
  }

  enEliminar() {
    this.onDeleteImagenes();
    this.productoStorageService.borrarProducto(this.idEdit)
    // this.vinosStorageService.borrarVino(this.vinosService.getVino(this.idEdit).Id);
    this.router.navigate(['../../' + this.productoService.getProducto(this.idEdit).idCategoria], { relativeTo: this.route })
    this.productoService.borrarProducto(this.idEdit)
  }
  get retFormImagenes() {
    return this.productoForm.get('imagenes') as FormArray;
  }

}
