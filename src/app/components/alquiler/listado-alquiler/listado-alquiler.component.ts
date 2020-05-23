import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
@Component({
  selector: 'app-listado-alquiler',
  templateUrl: './listado-alquiler.component.html',
  styleUrls: ['./listado-alquiler.component.css']
})
export class ListadoAlquilerComponent implements OnInit {
  public data: any;
  constructor(public DataApiService:DataApiService) { }

  ngOnInit(){
    this.getAlquiler();
  }
  getAlquiler(){
    this.DataApiService.GetAlquileres().subscribe(
      data=>{
        this.data=data;
      },error=>{

      }
    )
  }

}
