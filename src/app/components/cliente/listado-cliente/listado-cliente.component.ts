import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
@Component({
  selector: 'app-listado-cliente',
  templateUrl: './listado-cliente.component.html',
  styleUrls: ['./listado-cliente.component.css']
})
export class ListadoClienteComponent implements OnInit {
  public data:any;
  constructor(public DataApiService:DataApiService) { }

  ngOnInit(){
    this.DataApiService.GetListarClientes().subscribe(
      data=>{
        this.data = data;
      },error=>{
        console.log(error);
      }
    );
  }

}
