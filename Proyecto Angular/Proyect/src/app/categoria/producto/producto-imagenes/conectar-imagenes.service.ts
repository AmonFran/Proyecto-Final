import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ImagenesService } from "./imagenes.service";
import { environment } from "src/environments/environment";
import { Imagen } from "./imagen.model";

@Injectable()
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
        // console.log("sdfadsfsdaf");
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
        // return this.http.delete(`${environment.apiUrl}archivo-delete`).subscribe(
        //     (response: any) => {
        //         console.log(response);
        //     }
        // )
    }

    // guardarImageness(mFormData: any, mImage: File) {
    //     const HttpUploadOptions = {
    //         headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
    //     }
    //     const formData = new FormData();
    //     formData.append('data', mFormData);
    //     formData.append('image', mImage);
    //     return this.http.post(`${environment.apiUrl}upload-post`, formData, HttpUploadOptions).subscribe(
    //         (response: any) => {
    //             console.log(response);
    //         }
    //     )
    // }


    // guardarImagenes(nuevasImagenes: Imagen[], nuevosArchivos: File[]) {
    //     const HttpUploadOptions = {
    //         headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
    //     }
    //     console.log(nuevasImagenes);
    //     console.log("------------------------------");
    //     console.log(nuevosArchivos);
    //     const formData = new FormData();
    //     for (let i = 0; i < nuevasImagenes.length; i++) {
    //         formData.append('data' + i, nuevasImagenes[i]);
    //     }
    //     for (let i = 0; i < nuevosArchivos.length; i++) {
    //         formData.append('image' + i, nuevosArchivos[i]);

    //     }
    //     return this.http.post(`${environment.apiUrl}imagen-post`, {
    //         body: {
    //             'imagenes': nuevasImagenes,
    //             'archivos': nuevosArchivos,
    //         }
    //     }).subscribe(
    //         (response: any) => {
    //             console.log(response);
    //         }
    //     )
    //     formData.append('data', mFormData);
    //     formData.append('image', mImage);
    //     return this.http.post(`${environment.apiUrl}upload-post`, formData).subscribe(
    //         (response: any) => {
    //             console.log(response);
    //         }
    //     )
    // }
}