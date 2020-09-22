import { Injectable } from '@angular/core';
import { FloorInterface } from '../interfaces/floor.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FloorService {
  private url = "https://activofijo.saval.cl:443"
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
  
      
      this.http.get(this.url+'/webservice/rest/catalog/locations?all=true&type=3',{ headers })
      
        .subscribe( (floors: any) => {
          this.floors = floors.data;
          resolve( floors.data )
        });
    });
  }








  getfloors(id:number): Promise<FloorInterface[]>{

    let headers = new HttpHeaders()
    .append("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
    .set('Content-Type', 'application/x-www-form-urlencoded')
    return new Promise( resolve => {

      this.http.get(this.url+'/webservice/rest/locations/'+id+'/children' ,{ headers })
        .subscribe( (floors: any) => {
          this.floors = floors['data'];
          resolve( floors['data'] );
          
        });
    });
  }

}
