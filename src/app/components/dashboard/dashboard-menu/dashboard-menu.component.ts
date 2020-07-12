import { Component, OnInit } from '@angular/core';
import * as jwt_decode from "jwt-decode";
@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css']
})
export class DashboardMenuComponent implements OnInit {

  constructor() { }
  public id_rol:any;
  public opt_reserva: boolean;
  public opt_alquiler: boolean;
  public opt_devolucion: boolean;
  public opt_mantenimiento: boolean;
  public opt_cajero: boolean;
  ngOnInit(){
    
    this.id_rol= jwt_decode(JSON.parse(localStorage.getItem('data_current'))['token'])['id_rol'];
    if(this.id_rol == '1000'){
      this.opt_reserva = true;
      this.opt_devolucion = true;
      this.opt_mantenimiento = true;
      this.opt_alquiler = true;
    }
    if(this.id_rol == '1001'){
      this.opt_reserva = true;
      // this.opt_cajero = false;
    }
    if(this.id_rol == '1002'){
      // this.opt_devolucion = true;
      this.opt_cajero = true;
    }
    if(this.id_rol == '1003'){
      this.opt_mantenimiento = true;
    }
    if(this.id_rol == '1004'){
      this.opt_alquiler = true;
    }
  }

}
