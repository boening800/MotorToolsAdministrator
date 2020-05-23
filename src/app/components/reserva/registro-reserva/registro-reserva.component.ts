import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
import { model_cliente } from '../../../models/model_cliente';
import { vehiculo_libres } from '../../../models/model_vehiculo';
import { model_registrar_alquiler } from '../../../models/model_alquiler';
declare var $: any;
@Component({
  selector: 'app-registro-reserva',
  templateUrl: './registro-reserva.component.html',
  styleUrls: ['./registro-reserva.component.css']
})
export class RegistroReservaComponent implements OnInit {
  public dni_cli:any;
  public msg_val:any;
  public pnl_fec_res:boolean;
  public pnl_autos:boolean;
  public pnl_tipopago:boolean;
  public pnl_precio:boolean;
  public list_autos: any;
  public id_vehi:any;
  public num_dias:number;
  public pago_total:any;
  public msg_create_alqu:any;
  public precio_vehi:any;
  public precio_adicional:number;
  constructor(public DataApiService:DataApiService) { }

  public model_registrar_alquiler:model_registrar_alquiler={
    id_vehi:"",
    id_cli:"",
    id_tipopago:"",
    fec_ini_alqu:"",
    fec_fin_alqu:"",
    desc_alqu:"",
    tipo_alqu:"",
    estado_alqu:"",
    pago_alqu:""
  }

  public model_cliente:model_cliente={
    nom_cli:"",
    apepat_cli:"",
    apemat_cli:""
  } 
  public vehiculo_libres:vehiculo_libres={
    fec_ini_alqu:"",
    fec_fin_alqu:""
  } 


  ngOnInit(){
    this.pnl_fec_res=false;
    this.pnl_autos=false;
    this.pnl_tipopago=false;
    this.pnl_precio=false;
    this.PostListarAutos();
  }

  PostValidarClientexDNI(){
    this.DataApiService.PostValidarClientexDNI(this.dni_cli).subscribe(
      data=>{

        if(data['estado'] == 1){
          this.model_cliente.nom_cli =data['data']['nom_cli'];
          this.model_cliente.apepat_cli =data['data']['apepat_cli'];
          this.model_cliente.apemat_cli =data['data']['apemat_cli'];
          this.model_registrar_alquiler.id_cli=data['data']['id_cli'];
          this.pnl_fec_res=true;
          
          this.pnl_tipopago=true;
        }
        if(data['estado'] == 2){
          this.msg_val = data['mensaje'];
          $("#AlertaValidar").modal('show');
        }
      },error=>{
        console.log(error);
      }
      );
  }
  
  PostListarAutos(){
    var fechaInicio = new Date(this.vehiculo_libres.fec_ini_alqu).getTime();
    var fechaFin    = new Date(this.vehiculo_libres.fec_fin_alqu).getTime();
    this.model_registrar_alquiler.fec_ini_alqu=this.vehiculo_libres.fec_ini_alqu;
    this.model_registrar_alquiler.fec_fin_alqu=this.vehiculo_libres.fec_fin_alqu;
    var diff = fechaFin - fechaInicio;
    this.num_dias = Math.round(diff/(1000*60*60*24));

    console.log(this.vehiculo_libres)
    this.DataApiService.PostListarVehiLibres(this.vehiculo_libres).subscribe(
      data=>{
        console.log(data);
        this.list_autos=data;
        this.pnl_autos=true;
        this.pnl_precio=true;

      },error=>{
        console.log(error);
      }
    );
  }

  Adicionales(precio_adicional){
    // precio_adicional = 0;
     this.precio_adicional = precio_adicional;
    // this.pago_total = this.pago_total+((this.precio_adicional)*(this.num_dias));
    
  }

  PrecioVehiculo(precio_vehi,id_vehi){
    this.pago_total = null;
    console.log(precio_vehi);
    this.pago_total=this.num_dias*precio_vehi;
    this.precio_vehi = precio_vehi;
    console.log(id_vehi);
    this.model_registrar_alquiler.id_vehi=id_vehi;
    this.model_registrar_alquiler.pago_alqu=this.pago_total;
  }

  RegistrarReserva(){
    
    this.model_registrar_alquiler.tipo_alqu="1";
    this.model_registrar_alquiler.estado_alqu="0";
    this.model_registrar_alquiler.desc_alqu="descrp";
    this.model_registrar_alquiler.id_tipopago="1001";
    if(this.model_registrar_alquiler.id_vehi == "",
      this.model_registrar_alquiler.id_cli == "",
      this.model_registrar_alquiler.id_tipopago == "",
      this.model_registrar_alquiler.fec_ini_alqu == "",
      this.model_registrar_alquiler.fec_fin_alqu == "",
      this.model_registrar_alquiler.desc_alqu == "",
      this.model_registrar_alquiler.tipo_alqu == "",
      this.model_registrar_alquiler.estado_alqu == "",
      this.model_registrar_alquiler.pago_alqu == ""){

      $("#AlertarDatosIncompletos").modal('show');
    }else{
      this.DataApiService.PostRegistrarAlquiler(this.model_registrar_alquiler).subscribe(
        data=>{
          console.log(data);
          console.log(this.model_registrar_alquiler);
          this.msg_create_alqu = data;
          this.pago_total = this.pago_total + (this.precio_adicional * this.num_dias);
          $("#AlertarRegistroCorrecto").modal('show');
        },error=>{
          console.log(error);
        }
      )
    }

  }
}
