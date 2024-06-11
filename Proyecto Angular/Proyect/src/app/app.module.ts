import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminUsersComponent } from './auth/admin-users/admin-users.component';
import { EditarPerfilComponent } from './auth/editar-perfil/editar-perfil.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { UsuarioService } from './auth/usuario.service';
import { CarritoComponent } from './carrito/carrito.component';
import { PedidoListComponent } from './carrito/pedido/pedido-list/pedido-list.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaService } from './categoria/categoria.service';
import { ProductoDetailComponent } from './categoria/producto/producto-detail/producto-detail.component';
import { ProductoEditComponent } from './categoria/producto/producto-edit/producto-edit.component';
import { ImagenesService } from './categoria/producto/producto-imagenes/imagenes.service';
import { ProductoComponent } from './categoria/producto/producto.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { MainComponent } from './core/main/main.component';
import { AboutUsComponent } from './informacion/about-us/about-us.component';
import { ContactComponent } from './informacion/contact/contact.component';
import { CookiesComponent } from './informacion/cookies/cookies.component';
import { LegalComponent } from './informacion/legal/legal.component';
import { PrivacyComponent } from './informacion/privacy/privacy.component';
import { GestionPedidosComponent } from './carrito/pedido/gestion-pedidos/gestion-pedidos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    CategoriaComponent,
    ProductoComponent,
    RegistroComponent,
    ProductoEditComponent,
    ProductoDetailComponent,
    AboutUsComponent,
    CookiesComponent,
    ContactComponent,
    LegalComponent,
    PrivacyComponent,
    CarritoComponent,
    EditarPerfilComponent,
    PedidoListComponent,
    AdminUsersComponent,
    GestionPedidosComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],
  providers: [
    CategoriaService,
    UsuarioService,
    ImagenesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
