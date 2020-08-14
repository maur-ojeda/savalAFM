import { Injectable } from '@angular/core';
import { FloorInterface } from '../interfaces/floor.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FloorService {

  private floors: FloorInterface[] = [];
  constructor(private http: HttpClient) { }

  getallFloors(): Promise<FloorInterface[]>{
    let user ="mobile_user";
    let pass ="testing";
    let headers = new HttpHeaders()
    .set('Authorization',   `Basic ${btoa(user + ":" + pass)}`)
    .set('Content-Type', 'application/x-www-form-urlencoded')
  
    if ( this.floors.length > 0 ) {
      return Promise.resolve( this.floors );
    }
    return new Promise( resolve => {
  
      
      this.http.get('https://devactivofijo.saval.cl/webservice/rest/catalog/locations?all=true',{ headers })
      
        .subscribe( (floors: any) => {
          this.floors = floors.data;
          resolve( floors.data )
        });
    });
  }








  getfloors(id:number): Promise<FloorInterface[]>{
    let user ="mobile_user";
    let pass ="testing";
    let headers = new HttpHeaders()
    .set('Authorization',   `Basic ${btoa(user + ":" + pass)}`)
    .set('Content-Type', 'application/x-www-form-urlencoded')
  /*
    if ( this.floors.length > 0 ) {
      return Promise.resolve( this.floors );
    }*/
    return new Promise( resolve => {
  
      this.http.get('https://devactivofijo.saval.cl/webservice/rest/location/floors/'+id ,{ headers })
        .subscribe( (floors: any) => {
          this.floors = floors.data;
          console.log('floors.data');
          console.log(floors.data);
          resolve( floors.data );
          
        });
    });
  }

}
