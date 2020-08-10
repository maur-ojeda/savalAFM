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




  getallBuildings(): Promise<BuildingInterface[]>{
    let user ="mobile_user";
    let pass ="testing";
    let headers = new HttpHeaders()
    .set('Authorization',   `Basic ${btoa(user + ":" + pass)}`)
    .set('Content-Type', 'application/x-www-form-urlencoded')
  
    if ( this.buildings.length > 0 ) {
      return Promise.resolve( this.buildings );
    }
    return new Promise( resolve => {
  
      this.http.get('https://afsaval.agenciasur.cl/webservice/rest/catalog/locations?all=true',{ headers })
        .subscribe( (buildings: any) => {
          this.buildings = buildings.data;
          resolve( buildings.data )
        });
    });



  }




  getbuildings(id:number): Promise<BuildingInterface[]>{
    let user ="mobile_user";
    let pass ="testing";
    let headers = new HttpHeaders()
    .set('Authorization',   `Basic ${btoa(user + ":" + pass)}`)
    .set('Content-Type', 'application/x-www-form-urlencoded')
  

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
