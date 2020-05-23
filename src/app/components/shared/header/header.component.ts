import { Component, OnInit } from '@angular/core';
import * as jwt_decode from "jwt-decode";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor() { }
  public date: any;
  public nom_emp:any;
  public apepat_emp:any;
  ngOnInit() {
    this.date = new Date();
    this.nom_emp= jwt_decode(JSON.parse(localStorage.getItem('data_current'))['token'])['nom_emp'];
    this.apepat_emp= jwt_decode(JSON.parse(localStorage.getItem('data_current'))['token'])['apepat_emp'];
  }

}
