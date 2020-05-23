import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { ContentComponent } from './components/shared/content/content.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SettingComponent } from './components/shared/setting/setting.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegistroAlquilerComponent } from './components/alquiler/registro-alquiler/registro-alquiler.component';
import { ListadoAlquilerComponent } from './components/alquiler/listado-alquiler/listado-alquiler.component';
import { RegistroReservaComponent } from './components/reserva/registro-reserva/registro-reserva.component';
import { RegistroClienteComponent } from './components/cliente/registro-cliente/registro-cliente.component';
import { ListadoClienteComponent } from './components/cliente/listado-cliente/listado-cliente.component';
import { ListadoReservaComponent } from './components/reserva/listado-reserva/listado-reserva.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    ContentComponent,
    FooterComponent,
    SettingComponent,
    LoginComponent,
    HomeComponent,
    RegistroAlquilerComponent,
    ListadoAlquilerComponent,
    RegistroReservaComponent,
    RegistroClienteComponent,
    ListadoClienteComponent,
    ListadoReservaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
