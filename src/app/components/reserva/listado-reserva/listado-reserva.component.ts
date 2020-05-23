import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
@Component({
  selector: 'app-listado-reserva',
  templateUrl: './listado-reserva.component.html',
  styleUrls: ['./listado-reserva.component.css']
})
export class ListadoReservaComponent implements OnInit {
  public data:any;
  constructor(public DataApiService:DataApiService) { }

  ngOnInit() {
    this.DataApiService.GetAlquileres().subscribe(
      data=>{
        this.data=data;
      },error=>{

      }
    )
  }

}
