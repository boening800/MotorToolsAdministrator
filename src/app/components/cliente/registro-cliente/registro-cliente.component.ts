import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
import { model_registrar_cliente } from '../../../models/model_cliente';
declare var $: any;
@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {

  constructor(public DataApiService:DataApiService) { }
  public model_registrar_cliente:model_registrar_cliente={
    nom_cli:"",
    apepat_cli:"",
    apemat_cli:"",
    dni_cli:"",
    correo_cli:"",
    fec_nacimiento_cli:"",
    licencia_cli:"",
    usuario_cli:"",
    clave_cli:""
  }
  ngOnInit(){
  }

  RegistrarCliente(){
    this.DataApiService.PostRegistrarCliente(this.model_registrar_cliente).subscribe(data=>{
      console.log(data);
      $("#AlertarRegistroCorrectoCliente").modal('show');
    },error=>{
      console.log(error);
    }
    )
  }
}
