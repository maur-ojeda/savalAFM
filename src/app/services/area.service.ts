import { Injectable } from '@angular/core';
import { AreaInterface } from '../interfaces/area.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private areas: AreaInterface[] = [];
  constructor(private http: HttpClient) { }

  getallAreas(): Promise<AreaInterface[]>{
    let user ="mobile_user";
    let pass ="testing";
    let headers = new HttpHeaders()
    .set('Authorization',   `Basic ${btoa(user + ":" + pass)}`)
    .set('Content-Type', 'application/x-www-form-urlencoded')
  
    if ( this.areas.length > 0 ) {
      return Promise.resolve( this.areas );
    }
    return new Promise( resolve => {
      
      this.http.get('https://devactivofijo.saval.cl:8443/webservice/rest/catalog/locations?all=true',{ headers })
        .subscribe( (areas: any) => {
          this.areas = areas.data;
          resolve( areas.data )
        });
    });
  }


  

  getareas(id:number): Promise<AreaInterface[]>{
    let user ="mobile_user";
    let pass ="testing";
    let headers = new HttpHeaders()
    .set('Authorization',   `Basic ${btoa(user + ":" + pass)}`)
    .set('Content-Type', 'application/x-www-form-urlencoded')
  
    if ( this.areas.length > 0 ) {
      return Promise.resolve( this.areas );
    }
    return new Promise( resolve => {
      this.http.get('https://devactivofijo.saval.cl:8443/webservice/rest/location/areas/'+id ,{ headers })
        .subscribe( (areas: any) => {
          this.areas = areas.data;
          console.log('areas.data');
          console.log(areas.data);
          resolve( areas.data );
          
        });
    });
  }






}

