import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { model_cliente } from '../../models/model_cliente';
import { model_alquiler,model_act_est_alqu } from '../../models/model_alquiler';
import { model_vehiculo } from '../../models/model_vehiculo';
import { Detalle_Adici } from '../../models/model_adicionales';
declare var $: any;
@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  public dni_cli:any;
  public ticket_alquiler:any
  public data_alqu:any;
  public data_cliente:any;
  public data_vehiculo:any;
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
  public model_act_est_alqu:model_act_est_alqu={
    estado_alqu:'1'
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
  constructor(public DataApiService:DataApiService) { }

  ngOnInit() {
  }
  BuscarReserva(){
    this.DataApiService.GetBuscarAlquilerTicket(this.ticket_alquiler).subscribe(data=>{
      console.log(data);
      this.DataApiService.GetBuscarAlquiler(data[0]['id_cli']).subscribe(data=>{
        this.data_alqu=data;
        var fec_ini = new Date(this.data_alqu[0]['fec_ini_alqu']);
        var fec_fin = new Date(this.data_alqu[0]['fec_fin_alqu']);
        this.model_alquiler.fec_ini_alqu=fec_ini.getDate()+'-'+fec_ini.getMonth()+'-'+fec_ini.getFullYear();
        this.model_alquiler.fec_fin_alqu=fec_fin.getDate()+'-'+fec_fin.getMonth()+'-'+fec_fin.getFullYear();
        this.model_alquiler.id_alqu=this.data_alqu[0]['id_alqu'];
        this.model_alquiler.estado_alqu=this.data_alqu[0]['estado_alqu']; //0 - SIN PAGAR // 1 - PAGADO
        this.model_alquiler.pago_alqu=this.data_alqu[0]['pago_alqu'];
        console.log(this.data_alqu[0]['pago_alqu']);
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
      });
    },error=>{
      console.log(error);
    });
  }

  RegistrarPago(){
    this.DataApiService.PostActualizarEstadoAlqu(this.model_alquiler.id_alqu,this.model_act_est_alqu).subscribe(data=>{
      $("#AlertarPagocorrecto").modal('show');
    },error=>{
      console.log(error);
    });
  }
}
