import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { vehiculo_libres } from '../models/model_vehiculo';
import { model_registrar_alquiler,model_act_est_alqu } from '../models/model_alquiler';
import { model_registrar_cliente } from '../models/model_cliente';
import { model_registrar_detale_adicionales ,Detalle_Adici} from '../models/model_adicionales';
import { model_conductor } from '../models/model_conductor';

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
  PostListarVehiLibres():Observable<any>{
    return this.http.get<any>('/api/listarVehiLibres',{headers: this.headers}).pipe(map(data=>data));
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
  GetListarAdicionales():Observable<any>{
    return this.http.get<any>('/api/listaadicionales',{headers: this.headers}).pipe(map(data=>data));
  }
  PostCrearDetalleAdicionales(req:model_registrar_detale_adicionales){
    return this.http.post<model_registrar_detale_adicionales>('/api/creardetalleadicionales',req,{headers:this.headers}).pipe(map(data=>data));
  }
  GetBuscarAlquiler(id_cli):Observable<any>{
    return this.http.get<any>('/api/buscarAlquiler/'+id_cli,{headers: this.headers}).pipe(map(data=>data));
  }
  GetBuscarClientexId(id_cli):Observable<any>{
    return this.http.get<any>('/api/BuscarClienteid/'+id_cli,{headers: this.headers}).pipe(map(data=>data));
  }
  GetBuscarVehiculoxId(id_vehi):Observable<any>{
    return this.http.get<any>('/api/BuscarVehiculoxId/'+id_vehi,{headers: this.headers}).pipe(map(data=>data));
  }
  GetListaDetalleAdicionalesxIdAlqu(id_alqu):Observable<any>{
    return this.http.get<any>('/api/listaDetalleAdicionalesxIdAlqu/'+id_alqu,{headers: this.headers}).pipe(map(data=>data));
  }
  PostRegistrarConductor(req:model_conductor){
    return this.http.post<model_conductor>('/api/registrarConductorCliente',req,{headers:this.headers}).pipe(map(data=>data));
  }
  GetBuscarConductorCliente(id_conduc):Observable<any>{
    return this.http.get<any>('/api/BuscarConductorClientexId/'+id_conduc,{headers:this.headers}).pipe(map(data=>data));
  }
  PostActualizarDetalleAdic(id_detadic,req:Detalle_Adici){
    return this.http.post<Detalle_Adici>('/api/ActualizarDetallerAdic/'+id_detadic,req,{headers:this.headers}).pipe(map(data=>data));
  }
  PostActualizarEstadoAlqu(id_alqu,req:model_act_est_alqu){
    return this.http.post<model_act_est_alqu>('/api/ActualizarEstAlquiler/'+id_alqu,req,{headers:this.headers}).pipe(map(data=>data));
  }
  GetBuscarAlquilerTicket(ticket_alquiler):Observable<any>{
    return this.http.get<any>('/api/BuscarAlquilerxTicke/'+ticket_alquiler,{headers:this.headers}).pipe(map(data=>data));
  }
}
