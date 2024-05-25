import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../categoria.model';
import { CategoriaService } from '../../categoria.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductoService } from '../producto.service';
import { ImagenesStorageService } from '../producto-imagenes/conectar-imagenes.service';
import { ImagenesService } from '../producto-imagenes/imagenes.service';
import { Producto } from '../producto.model';
import { Imagen } from '../producto-imagenes/imagen.model';

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
    private imagenesStorageService: ImagenesStorageService,) {
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
    let productoCaracteristicas = [''];
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
          imagen.imagenPath.split("/")[-1];
          productoImagenes.push(
            new FormGroup({
              'idImagen': new FormControl(imagen.id),
              'idImagenVino': new FormControl(imagen.idProducto),
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
      "nombre": new FormControl(productoNombre),
      "precio": new FormControl(productoPrecio),
      "categoria": new FormControl(productoCategoria),
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
        console.log(this.categoriaService.getCategoria(nuevoProducto.idCategoria).nombre.toLowerCase());

        nuevasImagenes.push(new Imagen(
          this.productoForm.value['imagenes'][i].idImagen,
          this.productoForm.value['imagenes'][i].idImagenProducto,
          this.productoForm.value['imagenes'][i].imgName,
          "assets/images/productos/" + this.categoriaService.getCategoria(nuevoProducto.idCategoria).nombre.toLowerCase() + "/" + this.archivos[i].name
          // "http://localhost/api/assets/images/vinos/" + this.archivos[i].name
        ));
      }

    }
    if (this.editMode) {
      // Actualizar Vino
      // this.vinosStorageService.actualizarVino(nuevoProducto);
      this.productoService.actualizarProducto(this.idEdit, nuevoProducto);

      // Actualizar Imagenes
      this.imagenesService.actualizarImagenes(nuevasImagenes);
      // this.imagenesStorageService.actualizarImagenes(nuevasImagenes, nuevoProducto.id);
      this.archivos.forEach(archivo => {
        if (archivo) {
          // this.imagenesStorageService.guardarArchivo(archivo);
        }
      })
      // Ir a la pagina de los productos
      this.router.navigate(['../../' + nuevoProducto.idCategoria], { relativeTo: this.route });
    }
    else {
      if (nuevasImagenes[0]) {
        // this.vinosStorageService.guardarVinoImagenes(nuevoProducto, nuevasImagenes);
        this.productoService.agregarProducto(nuevoProducto)
        this.imagenesService.insertarImagenes(nuevasImagenes);
        this.archivos.forEach(archivo => {
          if (archivo) {
            // this.imagenesStorageService.guardarArchivo(archivo);
          }
        })
      }
      else {
        // this.vinosStorageService.guardarVino(nuevoProducto);
        this.productoService.agregarProducto(nuevoProducto)
      }
      this.router.navigate(['../' + nuevoProducto.idCategoria], { relativeTo: this.route })
    }
  }

  onDeleteImagen(index: number) {
    this.archivos.splice(index, 1);
    (<FormArray>this.productoForm.get('imagenes')).removeAt(index);
  }
  onDeleteImagenes() {
    // this.imagenesStorageService.borrarImagenes(this.productoService.getProductos()[this.idEdit].id);
    this.imagenesService.borrarImagenes(this.productoService.getProductos()[this.idEdit].id);
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
    console.log(this.archivos);
  }

  enEliminar() {
    this.onDeleteImagenes();
    // this.vinosStorageService.borrarVino(this.vinosService.getVino(this.idEdit).Id);
    this.router.navigate(['../../' + this.productoService.getProducto(this.idEdit).idCategoria], { relativeTo: this.route })
    this.productoService.borrarProducto(this.idEdit)
  }
  get retFormImagenes() {
    return this.productoForm.get('imagenes') as FormArray;
  }

}
