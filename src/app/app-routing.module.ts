import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from '../app/components/login/login.component';
import {HomeComponent} from '../app/components/home/home.component';
import {RegistroAlquilerComponent} from '../app/components/alquiler/registro-alquiler/registro-alquiler.component';
import {RegistroReservaComponent} from '../app/components/reserva/registro-reserva/registro-reserva.component';
import {RegistroClienteComponent} from '../app/components/cliente/registro-cliente/registro-cliente.component';
import {ListadoClienteComponent} from '../app/components/cliente/listado-cliente/listado-cliente.component';
import {ListadoReservaComponent} from '../app/components/reserva/listado-reserva/listado-reserva.component';
import {DashboardMenuComponent} from '../app/components/dashboard/dashboard-menu/dashboard-menu.component';
import {PagoComponent} from '../app/components/pago/pago.component';
const routes: Routes = [
  { path:'login', component:LoginComponent},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component:HomeComponent,
    children:[
      {path:'listalquiler', component:RegistroAlquilerComponent},
      {path:'registrarreseva', component:RegistroReservaComponent},
      {path:'registrocliente', component:RegistroClienteComponent},
      {path:'listacliente', component:ListadoClienteComponent},
      {path:'listareserva', component:ListadoReservaComponent},
      {path:'dashboard', component:DashboardMenuComponent},
      {path:'registrarpago',component:PagoComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
