import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './core/main/main.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { ProductoEditComponent } from './categoria/producto/producto-edit/producto-edit.component';
import { ProductoDetailComponent } from './categoria/producto/producto-detail/producto-detail.component';
import { AboutUsComponent } from './informacion/about-us/about-us.component';
import { ContactComponent } from './informacion/contact/contact.component';
import { PrivacyComponent } from './informacion/privacy/privacy.component';
import { CookiesComponent } from './informacion/cookies/cookies.component';
import { LegalComponent } from './informacion/legal/legal.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ProductoComponent } from './categoria/producto/producto.component';
import { EditarPerfilComponent } from './auth/editar-perfil/editar-perfil.component';
import { PedidoListComponent } from './carrito/pedido/pedido-list/pedido-list.component';
import { AdminUsersComponent } from './auth/admin-users/admin-users.component';
import { GestionPedidosComponent } from './carrito/pedido/gestion-pedidos/gestion-pedidos.component';
import { AuthGuard } from './_guards/auth.guard';
import { AdminGuard } from './_guards/admin.guard';
import { ManagerGuard } from './_guards/manager.guard';

const routes: Routes = [
  {
    path: '', component: MainComponent
  },
  {
    path: 'categoria/new', component: ProductoEditComponent, canActivate: [AdminGuard]
  },
  {
    path: 'categoria/edit/:id', component: ProductoEditComponent, canActivate: [AdminGuard]
  },
  {
    path: 'categoria/:id', component: CategoriaComponent
  },
  {
    path: 'productos/:busqueda', component: ProductoComponent
  },
  {
    path: 'producto/:id', component: ProductoDetailComponent
  },
  {
    path: 'editarPerfil/:id', component: EditarPerfilComponent, canActivate: [AuthGuard]
  },
  {
    path: 'pedidos', component: PedidoListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'gestionPedidos', component: GestionPedidosComponent, canActivate: [ManagerGuard]
  },
  {
    path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard]
  },
  {
    path: 'registro', component: RegistroComponent
  },
  {
    path: 'adminUsers', component: AdminUsersComponent, canActivate: [AdminGuard]
  },
  {
    path: 'aboutUs', component: AboutUsComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
  {
    path: 'privacy', component: PrivacyComponent
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
