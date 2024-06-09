import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './core/main/main.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductoEditComponent } from './categoria/producto/producto-edit/producto-edit.component';
import { ProductoDetailComponent } from './categoria/producto/producto-detail/producto-detail.component';
import { AboutUsComponent } from './informacion/about-us/about-us.component';
import { ContactComponent } from './informacion/contact/contact.component';
import { PrivacyComponent } from './informacion/privacy/privacy.component';
import { CookiesComponent } from './informacion/cookies/cookies.component';
import { LegalComponent } from './informacion/legal/legal.component';
import { CarritoComponent } from './carrito/carrito.component';

const routes: Routes = [
  {
    path: '', component: MainComponent
  },
  {
    path: 'categoria/new', component: ProductoEditComponent
  },
  {
    path: 'categoria/edit/:id', component: ProductoEditComponent
  },
  {
    path: 'categoria/:id', component: CategoriaComponent
  },
  {
    path: 'producto/:id', component: ProductoDetailComponent
  },
  {
    path: 'carrito', component: CarritoComponent
  },
  {
    path: 'registro', component: RegistroComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'aboutUs', component: AboutUsComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
  {
    path: 'privacity', component: PrivacyComponent
  },
  {
    path: 'cookies', component: CookiesComponent
  },
  {
    path: 'legal', component: LegalComponent
  },
  {
    path: '**', component: MainComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
