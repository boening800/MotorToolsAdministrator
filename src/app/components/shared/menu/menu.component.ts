import { Component, OnInit } from '@angular/core';
import * as jwt_decode from "jwt-decode";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {

  constructor() { }
  public id_rol:any;
  public nom_emp:any;
  public apepat_emp:any;
  public nom_rol:any;
  public opt_reserva: boolean;
  public opt_alquiler: boolean;
  public opt_devolucion: boolean;
  public opt_mantenimiento: boolean;
  ngOnInit() {

    // console.log(jwt_decode(JSON.parse(localStorage.getItem('data_current'))['token'])['id_rol']);
    this.id_rol= jwt_decode(JSON.parse(localStorage.getItem('data_current'))['token'])['id_rol'];
    this.nom_emp= jwt_decode(JSON.parse(localStorage.getItem('data_current'))['token'])['nom_emp'];
    this.apepat_emp= jwt_decode(JSON.parse(localStorage.getItem('data_current'))['token'])['apepat_emp'];
    this.nom_rol= jwt_decode(JSON.parse(localStorage.getItem('data_current'))['token'])['nom_rol'];
    if(this.id_rol == '1000'){
      this.opt_reserva = true;
      this.opt_devolucion = true;
      this.opt_mantenimiento = true;
      this.opt_alquiler = true;
    }
    if(this.id_rol == '1001'){
      this.opt_reserva = true;
    }
    if(this.id_rol == '1002'){
      this.opt_devolucion = true;
    }
    if(this.id_rol == '1003'){
      this.opt_mantenimiento = true;
    }
    if(this.id_rol == '1004'){
      this.opt_alquiler = true;
    }
  }

}
