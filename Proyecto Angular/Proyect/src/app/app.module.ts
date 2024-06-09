import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { UsuarioService } from './auth/usuario.service';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaService } from './categoria/categoria.service';
import { ProductoEditComponent } from './categoria/producto/producto-edit/producto-edit.component';
import { ImagenesService } from './categoria/producto/producto-imagenes/imagenes.service';
import { ProductoComponent } from './categoria/producto/producto.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { MainComponent } from './core/main/main.component';
import { ProductoDetailComponent } from './categoria/producto/producto-detail/producto-detail.component';
import { AboutUsComponent } from './informacion/about-us/about-us.component';
import { CookiesComponent } from './informacion/cookies/cookies.component';
import { ContactComponent } from './informacion/contact/contact.component';
import { LegalComponent } from './informacion/legal/legal.component';
import { PrivacyComponent } from './informacion/privacy/privacy.component';
import { CarritoComponent } from './carrito/carrito.component';

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
    ProductoDetailComponent,
    AboutUsComponent,
    CookiesComponent,
    ContactComponent,
    LegalComponent,
    PrivacyComponent,
    CarritoComponent,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
