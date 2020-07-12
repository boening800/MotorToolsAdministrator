import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
import { model_cliente } from '../../../models/model_cliente';
import { vehiculo_libres } from '../../../models/model_vehiculo';
import { model_registrar_alquiler } from '../../../models/model_alquiler';
import { model_registrar_detale_adicionales } from '../../../models/model_adicionales';
import { model_conductor } from '../../../models/model_conductor';

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
  public date_desde_min:any;
  public date_hasta_min:any;
  public date_hasta_max:any;
  public adicionales:any;

  constructor(public DataApiService:DataApiService) { }

  public model_conductor:model_conductor={
    nombre_conduc:"",
    apellidos_conduc:"",
    licencia_conduc:"",
    fec_vencimiento_lic:"",
    estado_conduc:""
  }

  public model_registrar_alquiler:model_registrar_alquiler={
    id_vehi:"",
    id_cli:"",
    id_tipopago:"",
    fec_ini_alqu:"",
    fec_fin_alqu:"",
    desc_alqu:"",
    tipo_alqu:"",
    estado_alqu:"",
    pago_alqu:"",
    id_conduc:""
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
  public colection_adicionales=[];

  public model_registrar_detale_adicionales:model_registrar_detale_adicionales={
    id_adc:'',
    id_alqu:''
  }

  ngOnInit(){
    this.pnl_fec_res=false;
    this.pnl_autos=false;
    this.pnl_tipopago=false;
    this.pnl_precio=false;
    // this.PostListarAutos();
    // $('#desde').val(new Date());
    this.date_desde_min=new Date();

    this.DataApiService.GetListarAdicionales().subscribe(data=>{
      this.adicionales=data;
      for (let i = 0; i < this.adicionales.length; i++) {
        this.colection_adicionales.push({
          id_adc:this.adicionales[i]['id_adc'],
          nom_adic:this.adicionales[i]['nom_adic'],
          codigo_adic:this.adicionales[i]['codigo_adic'],
          precio:this.adicionales[i]['precio'],
          stock:this.adicionales[i]['stock'],
          value_check:false
        });      
      }
      
    },error=>{
      console.log(error);
    });
  }
  fechainicio(){
    var fechaInicio = new Date(this.vehiculo_libres.fec_ini_alqu);

    //  this.vehiculo_libres.fec_ini_alqu =this.date_desde_min;
 
     var fec = new Date(fechaInicio);
     fec.setDate(fec.getDate() + 2) ;
     this.date_hasta_min =fec.getFullYear()+'-'+(fec.getMonth()+1)+'-'+fec.getDate();
     console.log(this.date_hasta_min);

     fec.setDate(fec.getDate() + 6) ;
     this.date_hasta_max =fec.getFullYear()+'-'+(fec.getMonth()+1)+'-'+fec.getDate();
     console.log(this.date_hasta_max);
  }
  // fechafin(){


  // }
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
    this.DataApiService.PostListarVehiLibres().subscribe(
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
     this.pago_total = this.pago_total+((this.precio_adicional)*(this.num_dias));
     setTimeout(()=>{
      if(this.colection_adicionales[3]['value_check']==true){
        console.log("check");
        var nom_conduc = document.querySelector('#nom_conduc');
        nom_conduc.setAttribute("disabled", "disabled");
        var ape_conduc = document.querySelector('#ape_conduc');
        ape_conduc.setAttribute("disabled", "disabled");
        var lic_conduc = document.querySelector('#lic_conduc');
        lic_conduc.setAttribute("disabled", "disabled");
        var fec_conduc = document.querySelector('#fec_conduc');
        fec_conduc.setAttribute("disabled", "disabled");
        
      }else if(this.colection_adicionales[3]['value_check']==false){
        console.log("no check");
        var nom_conduc2 = document.querySelector('#nom_conduc');
        nom_conduc2.removeAttribute("disabled");
        var ape_conduc2 = document.querySelector('#ape_conduc');
        ape_conduc2.removeAttribute("disabled");
        var lic_conduc2 = document.querySelector('#lic_conduc');
        lic_conduc2.removeAttribute("disabled");
        var fec_conduc2 = document.querySelector('#fec_conduc');
        fec_conduc2.removeAttribute("disabled");
      } 
     },1000)
 

     console.log(this.colection_adicionales);
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
    
    this.model_registrar_alquiler.tipo_alqu="1"; //por web
    this.model_registrar_alquiler.estado_alqu="0";//no pagado
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
      if(this.colection_adicionales[3]['value_check']==false){
        this.model_conductor.estado_conduc='1';
        this.DataApiService.PostRegistrarConductor(this.model_conductor).subscribe(data=>{
          console.log(data[0]['id_conduc']);
          this.model_registrar_alquiler.id_conduc=data[0]['id_conduc'];
        },error=>{
          console.log(error);
        });
      }else if(this.colection_adicionales[3]['value_check']==true){
        this.model_registrar_alquiler.id_conduc=null;
      }

      this.DataApiService.PostRegistrarAlquiler(this.model_registrar_alquiler).subscribe(
        data=>{
          // console.log(data[0]);
          console.log(this.model_registrar_alquiler);
          this.msg_create_alqu = data[0]['ticket_alquiler'];
          this.pago_total = this.pago_total + (this.precio_adicional * this.num_dias);
          // console.log(this.colection_adicionales.length);
          for (let i = 0; i < this.colection_adicionales.length; i++) {
            if(this.colection_adicionales[i]['value_check']==true){
              this.model_registrar_detale_adicionales.id_adc = this.colection_adicionales[i]['id_adc']
              this.model_registrar_detale_adicionales.id_alqu =  data[0]['id_alqu'];
              this.DataApiService.PostCrearDetalleAdicionales(this.model_registrar_detale_adicionales).subscribe(data=>{
                console.log(data);
              },error=>{
                console.log(error);
              });
            }
          }
          
          $("#AlertarRegistroCorrecto").modal('show');
        },error=>{
          console.log(error);
        }
      )
    }

  }
}
