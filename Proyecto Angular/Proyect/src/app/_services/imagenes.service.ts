import { Subject } from "rxjs";
import { Imagen } from "../_models/imagen.model";

export class ImagenesService {
    imagenesChanged = new Subject<Imagen[]>;
    private imagenes: Imagen[] = [];

    cargarImagenes(imagenes: Imagen[]) {
        this.imagenes = imagenes.slice();
        this.imagenesChanged.next(this.imagenes.slice());
    }

    getImagenes() {
        return this.imagenes.slice();
    }

    getImagenesProducto(idProducto: number) {
        let imagenesVino: Imagen[] = [];
        for (let imagen of this.imagenes) {
            if (idProducto == imagen.idProducto) {
                imagenesVino.push(imagen);
            }
        }
        return imagenesVino
    }

    insertarImagenes(nuevasImagenes: Imagen[]) {
        nuevasImagenes.forEach(imagen => this.imagenes.push(imagen))
        this.imagenesChanged.next(this.imagenes.slice());
    }

    actualizarImagenes(editImagenes: Imagen[]) {
        this.borrarImagenes(editImagenes[0].idProducto);
        editImagenes.forEach((imagen: Imagen) => {
            this.imagenes.push(imagen);
        });
        this.imagenesChanged.next(this.imagenes.slice());
    }

    borrarImagenes(idProducto: number) {
        for (let i = 0; i < this.imagenes.length;) {
            if (this.imagenes[i].idProducto == idProducto) {
                this.imagenes.splice(i, 1);
            } else {
                i++;
            }
        }
        this.imagenesChanged.next(this.imagenes.slice());
    }

}