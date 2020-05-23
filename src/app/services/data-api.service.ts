import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { vehiculo_libres } from '../models/model_vehiculo';
import { model_registrar_alquiler } from '../models/model_alquiler';
import { model_registrar_cliente } from '../models/model_cliente';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(
    protected http:HttpClient,
  ) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  });

  //Listar alquileres
  GetAlquileres():Observable<any>{
    return this.http.get<any>('/api/lista',{headers: this.headers}).pipe(map(data=>data));
  }
  PostValidarClientexDNI(dni_cli):Observable<any>{
    return this.http.get<any>('/api/validarclientexdni/'+dni_cli,{headers: this.headers}).pipe(map(data=>data));
  }
  PostListarVehiLibres(req:model_registrar_alquiler){
    return this.http.post<vehiculo_libres>('/api/listarVehiLibres',req,{headers: this.headers}).pipe(map(data=>data));
  }
  PostRegistrarAlquiler(req:model_registrar_alquiler){
    return this.http.post<model_registrar_alquiler>('/api/registrarAlquiler',req,{headers: this.headers}).pipe(map(data=>data));
  }
  PostRegistrarCliente(req:model_registrar_cliente){
    return this.http.post<model_registrar_cliente>('/api/cliente',req,{headers: this.headers}).pipe(map(data=>data));
  }
  GetListarClientes():Observable<any>{
    return this.http.get<any>('/api/listarClientes',{headers: this.headers}).pipe(map(data=>data));
  }
}
