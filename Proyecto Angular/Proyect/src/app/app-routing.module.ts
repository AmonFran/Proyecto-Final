import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './core/main/main.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductoEditComponent } from './categoria/producto/producto-edit/producto-edit.component';

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
    path: 'registro', component: RegistroComponent
  },
  {
    path: 'login', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
