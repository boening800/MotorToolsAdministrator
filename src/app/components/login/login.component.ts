import { Component, OnInit } from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import {usuario_login} from '../../models/model_usuario';

import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService) { }

  public usuario: usuario_login={
    nom_usu:"",
    pass_usu:""
  }
  ngOnInit(){
  }

  onLogin(){

    console.log(this.usuario);
    return this.authService.loginUsuario(this.usuario.nom_usu,this.usuario.pass_usu).subscribe(data=>{
      var decode = data;
      this.authService.setUsuario(decode);
      document.location.href = '/home/dashboard';
      console.log(data);
      console.log(jwt_decode(JSON.parse(localStorage.getItem('data_current'))['token']));
    },
    error=>{
      console.log("SE DETECTÓ UN ERROR: ", error);
    })
  }

}
