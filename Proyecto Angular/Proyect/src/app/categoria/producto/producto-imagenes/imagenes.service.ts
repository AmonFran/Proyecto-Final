import { Subject } from "rxjs";
import { Imagen } from "./imagen.model";

export class ImagenesService {
    imagenesChanged = new Subject<Imagen[]>;
    private imagenes: Imagen[] = [
        new Imagen(1, 1, 'Mochila verde frontal', 'assets/images/productos/mochilas/mochilaVerde.jpg'),
        new Imagen(2, 2, 'Bolso rojo', 'assets/images/productos/bolsos/bolsoRojo.jpg'),
        new Imagen(3, 3, 'Bandolera azul frontal', 'assets/images/productos/bandoleras/sacoAzul.jpg'),
        new Imagen(4, 4, 'Cortina estampada', 'assets/images/productos/cortinas/cortinaEstampada.jpg'),
        new Imagen(5, 5, '', 'assets/images/productos/mochilas/mochilaAzul.png'),
        new Imagen(6, 6, '', 'assets/images/productos/mochilas/mochilaCactus.png'),
        new Imagen(7, 7, '', 'assets/images/productos/mochilas/mochilaDragones.png'),
        new Imagen(8, 8, '', 'assets/images/productos/mochilas/mochilaFlores.png'),
        new Imagen(9, 9, '', 'assets/images/productos/mochilas/mochilaNegra.png'),
        new Imagen(10, 10, '', 'assets/images/productos/mochilas/mochilaStitch.png'),
    ];

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
        // for (let i = 0; i < editImagenes.length; i++) {
        //     let esta = false;
        //     for (let j = 0; j < this.imagenes.length; j++) {
        //         if (this.imagenes[j].Id == editImagenes[i].Id) {
        //             esta = true;
        //         }
        //     }
        //     if (!esta) {
        //         this.imagenes.push(editImagenes[i]);
        //     }
        // }
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