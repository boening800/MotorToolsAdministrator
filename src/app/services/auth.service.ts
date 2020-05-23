import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';

import { usuario_login } from '../models/model_usuario';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  //conexion de logueo 
  loginUsuario(nom_usu:string, pass_usu:string):Observable<any>{
    const url_api='/api/login_empleado';
    return this.http.post<usuario_login>(url_api,
        {nom_usu:nom_usu, pass_usu:pass_usu},
        {headers:this.headers}).pipe(map(data=>data));
  }

  setUsuario(usuario:usuario_login):void{
    localStorage.setItem('data_current', JSON.stringify(usuario));
  }

  getToken(){
    return localStorage.getItem('data_current').replace(/["']/g, "");
  }


  getCurrentUser(): usuario_login{
    let usuario_s = localStorage.getItem("data_current");
    if(!isNullOrUndefined(usuario_s)){
      let usuario: usuario_login = JSON.parse(usuario_s);
      return usuario
    }else{
      return null;
    }
  }
}
