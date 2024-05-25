import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ProductoComponent } from './categoria/producto/producto.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { MainComponent } from './core/main/main.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriaService } from './categoria/categoria.service';
import { CommonModule } from '@angular/common';
import { UsuarioService } from './auth/usuario.service';
import { ProductoEditComponent } from './categoria/producto/producto-edit/producto-edit.component';
import { ImagenesService } from './categoria/producto/producto-imagenes/imagenes.service';
import { ImagenesStorageService } from './categoria/producto/producto-imagenes/conectar-imagenes.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    CategoriaComponent,
    ProductoComponent,
    RegistroComponent,
    LoginComponent,
    ProductoEditComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CategoriaService,
    UsuarioService,
    ImagenesService,
    ImagenesStorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
