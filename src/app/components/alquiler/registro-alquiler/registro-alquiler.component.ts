import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
import { model_cliente } from '../../../models/model_cliente';
import { model_alquiler,model_act_est_alqu } from '../../../models/model_alquiler';
import { model_vehiculo } from '../../../models/model_vehiculo';
import { Detalle_Adici } from '../../../models/model_adicionales';
declare var $: any;
@Component({
  selector: 'app-registro-alquiler',
  templateUrl: './registro-alquiler.component.html',
  styleUrls: ['./registro-alquiler.component.css']
})
export class RegistroAlquilerComponent implements OnInit {
  public id_alqu:any;
  public dni_cli:any;
  public data_alqu:any;
  public data_cliente:any;
  public data_vehiculo:any;
  public data_detalle_adicionales:any;
  public data_adicionales:any;
  public data_conductor:any;
  public panel_conduc1:boolean;
  public panel_conduc2:boolean;
  public adic1:boolean;
  public adic2:boolean;
  public gps:any;
  public sill_ni:any;
  public colection_detalle_adicionales=[];

  public Detalle_Adici:Detalle_Adici={
    cod_adicional:''
  }
  
  public model_act_est_alqu:model_act_est_alqu={
    estado_alqu:'3'
  }

  public model_cliente:model_cliente={
    nom_cli:'',
    apepat_cli:'',
    apemat_cli:'',
    dni_cli:'',
    correo_cli:'',
    fec_nacimiento_cli:'',
    licencia_cli:'',
    usuario_cli:'',
    clave_cli:'',
    estado_cli:'',
  }
  public model_alquiler:model_alquiler={
    desc_alqu:'',
    estado_alqu:'',
    fec_fin_alqu:'',
    fec_ini_alqu:'',
    fec_registr_reserva:'',
    id_alqu:'',
    id_cli:'',
    id_detusu:'',
    id_tipopago:'',
    id_vehi:'',
    pago_alqu:'',
    ticket_alquiler:'',
    tipo_alqu:'',
  }
  public model_vehiculo:model_vehiculo={
    estado_vehi:'',
    id_vehi:'',
    img_vechi:'',
    marca_vehi:'',
    modelo_vehi:'',
    num_garage_vehi:'',
    num_kilom_vehi:'',
    placa_vehi:'',
    precio_vehi:'',
  }
  // public model_adicionales2:model_adicionales2={
  //   adic1:'',
  //   adic2:''
  // }
  constructor(public DataApiService:DataApiService) { }

  ngOnInit(){

  }
  BuscarReserva(){
    this.DataApiService.PostValidarClientexDNI(this.dni_cli).subscribe(data=>{
      // console.log(data);
      // data['data']['id_cli'];
      this.DataApiService.GetBuscarAlquiler(data['data']['id_cli']).subscribe(data=>{
        console.log(data);
        this.data_alqu=data;
        
        if(this.data_alqu[0]['id_conduc']==null){
          this.panel_conduc1=true;
          this.panel_conduc2=false;
        }else if(this.data_alqu[0]['id_conduc'] != null){
          this.panel_conduc1=false;
          this.panel_conduc2=true;
          this.DataApiService.GetBuscarConductorCliente(this.data_alqu[0]['id_conduc']).subscribe(data=>{
            this.data_conductor=data;
            console.log(data);
          },error=>{
            console.log(error);
          });
        }
        
        var fec_ini = new Date(this.data_alqu[0]['fec_ini_alqu']);
        var fec_fin = new Date(this.data_alqu[0]['fec_fin_alqu']);
        this.model_alquiler.fec_ini_alqu=fec_ini.getDate()+'-'+fec_ini.getMonth()+'-'+fec_ini.getFullYear();
        this.model_alquiler.fec_fin_alqu=fec_fin.getDate()+'-'+fec_fin.getMonth()+'-'+fec_fin.getFullYear();
        this.model_alquiler.id_alqu=this.data_alqu[0]['id_alqu'];
        this.model_alquiler.estado_alqu=this.data_alqu[0]['estado_alqu']; //0 - SIN PAGAR // 1 - PAGADO
        
        
        this.DataApiService.GetListaDetalleAdicionalesxIdAlqu(this.data_alqu[0]['id_alqu']).subscribe(data=>{
          this.data_detalle_adicionales=data
          for (let i = 0; i < this.data_detalle_adicionales.length; i++) {
              this.DataApiService.GetListarAdicionales().subscribe(data=>{
                this.data_adicionales=data;
                for (let j = 0; j < this.data_adicionales.length; j++) {
                    if(this.data_adicionales[j]['id_adc'] == this.data_detalle_adicionales[i]['id_adc']){
                      this.colection_detalle_adicionales.push({
                        id_detadic:this.data_detalle_adicionales[i]['id_detadic'],
                        id_adc:this.data_detalle_adicionales[i]['id_adc'],
                        id_alqu:this.data_detalle_adicionales[i]['id_alqu'],
                        nom_adic:this.data_adicionales[j]['nom_adic']
                      });
                    }
                }

              },error=>{
                console.log(error);
              });
          }

          setTimeout(()=>{
            console.log(this.colection_detalle_adicionales);
            for (let i = 0; i < this.colection_detalle_adicionales.length; i++) {
              if(this.colection_detalle_adicionales[i]['id_adc']=='1001'){
                this.adic1=true;
              }else if(this.colection_detalle_adicionales[i]['id_adc']=='1002'){
                this.adic2=true;
              }
            }
          },1000);
          
        },error=>{
          console.log(error);
        });
        this.DataApiService.GetBuscarVehiculoxId(this.data_alqu[0]['id_vehi']).subscribe(data=>{
          console.log(data[0]);
          this.data_vehiculo=data;
          this.model_vehiculo.marca_vehi = data[0]['marca_vehi'];
          this.model_vehiculo.modelo_vehi = data[0]['modelo_vehi'];
        },error=>{
          console.log(error);
        });
        this.DataApiService.GetBuscarClientexId(this.data_alqu[0]['id_cli']).subscribe(data=>{
          this.data_cliente=data;
          this.model_cliente.dni_cli=this.data_cliente[0]['dni_cli'];
          this.model_cliente.nom_cli=this.data_cliente[0]['nom_cli'];
          this.model_cliente.apepat_cli=this.data_cliente[0]['apepat_cli'];
          this.model_cliente.apemat_cli=this.data_cliente[0]['apemat_cli'];
        },error=>{
          console.log(error);
        });
      },error=>{
        console.log(error);
      });
    },error=>{
      console.log(error)
    });

  }

  RegistrarAlquiler(){
    // setTimeout(()=>{

    // },1000);

    if(this.model_alquiler.estado_alqu=='0'){
      $("#AlertarRegistroAlquilerIncorrecto").modal('show');
    }
    else if(this.model_alquiler.estado_alqu=='1'){

      this.DataApiService.PostActualizarEstadoAlqu(this.model_alquiler.id_alqu,this.model_act_est_alqu).subscribe(data=>{
        console.log(data);
        for (let i = 0; i < this.colection_detalle_adicionales.length; i++) {
          if(this.colection_detalle_adicionales[i]['id_adc']=='1001'){
            this.Detalle_Adici.cod_adicional=this.gps;
            this.DataApiService.PostActualizarDetalleAdic(this.colection_detalle_adicionales[i]['id_detadic'],this.Detalle_Adici).subscribe(data=>{
              console.log(data);
            });
          }else if(this.colection_detalle_adicionales[i]['id_adc']=='1002'){
            this.Detalle_Adici.cod_adicional=this.sill_ni;
            this.DataApiService.PostActualizarDetalleAdic(this.colection_detalle_adicionales[i]['id_detadic'],this.Detalle_Adici).subscribe(data=>{
              console.log(data);
            });
          }     
        }
        $("#AlertarRegistroAlquilerCorrecto").modal('show');
      },error=>{
        console.log(error);
      });
    }

    
  }

}
