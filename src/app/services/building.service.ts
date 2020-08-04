import { Injectable } from '@angular/core';
import { BuildingInterface } from '../interfaces/building.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoomInterface } from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  private buildings: BuildingInterface[] = [];

  constructor(private http: HttpClient) { }

  getbuildings(id:number): Promise<RoomInterface[]>{
    let user ="mobile_user";
    let pass ="testing";
    let headers = new HttpHeaders()
    .set('Authorization',   `Basic ${btoa(user + ":" + pass)}`)
    .set('Content-Type', 'application/x-www-form-urlencoded')
  
    /*if ( this.buildings.length > 0 ) {
      
      console.log( this.buildings)
      return Promise.resolve( this.buildings );
      
    }*/
    return new Promise( resolve => {
      this.http.get('https://afsaval.agenciasur.cl/webservice/rest/location/buildings/'+id ,{ headers })
        .subscribe( (buildings: any) => {
          this.buildings = buildings.data;
          //console.log('buildings.data');
         console.log(buildings.data);
          resolve( buildings.data );
          
        });
    });
  }

}
