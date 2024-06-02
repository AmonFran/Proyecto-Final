import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ImagenesService } from "./imagenes.service";
import { environment } from "src/environments/environment";
import { Imagen } from "./imagen.model";

@Injectable({
    providedIn: 'root'
})
export class ImagenesStorageService {

    constructor(private http: HttpClient, private imagenesService: ImagenesService) {

    }

    guardarImagenes(nuevasImagenes: Imagen[]) {
        return this.http.post(`${environment.apiUrl}imagen-post`, nuevasImagenes).subscribe(
            (response: any) => {
                console.log(response);
            }
        )
    }

    actualizarImagenes(nuevasImagenes: Imagen[], idVino: number) {
        return this.http.put(`${environment.apiUrl}imagen-put`, { nuevasImagenes, idVino }).subscribe(
            (response: any) => {
                console.log(response);
            }
        )
    }

    borrarImagenes(idVino: number) {
        return this.http.delete(`${environment.apiUrl}imagen-delete`, { body: idVino }).subscribe(
            (response: any) => {
                console.log(response);
            }
        );
    }

    guardarArchivo(nuevosArchivos: File) {
        const HttpUploadOptions = {
            headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
        }
        const formData = new FormData();
        formData.append('image', nuevosArchivos);
        return this.http.post(`${environment.apiUrl}archivo-post`, formData).subscribe(
            (response: any) => {
                console.log(response);
            }
        )
    }

    borrarArchivo(archivo: File) {
        const formData = new FormData();
        formData.append('image', archivo);
        console.log(archivo);
        return this.http.delete(`${environment.apiUrl}archivo-delete`).subscribe(
            (response: any) => {
                console.log(response);
            }
        )
    }
}