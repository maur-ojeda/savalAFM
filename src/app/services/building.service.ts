import { Injectable } from '@angular/core';
import { BuildingInterface } from '../interfaces/building.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';






@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  

  private url = "https://activofijo.saval.cl:443"
  private buildings: BuildingInterface[] = [];

  bbuildings: Array<Object>;


  constructor(private http: HttpClient) { }


  
  getallBuildings(): Promise<BuildingInterface[]>{
    
    let headers = new HttpHeaders()
    .append("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
    .set('Content-Type', 'application/x-www-form-urlencoded')
  
    if ( this.buildings.length > 0 ) {
      return Promise.resolve( this.buildings );
    }
    return new Promise( resolve => {
  
      this.http.get(this.url+'/webservice/rest/catalog/locations?all=true&type=2',{ headers })
        .subscribe( (buildings: any) => {
          this.buildings = buildings.data;
          resolve( buildings.data )
        });
    });

  }

 _getbuildings(id:number): Promise<BuildingInterface[]>{    
    let headers = new HttpHeaders()
    .append("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
    .set('Content-Type', 'application/x-www-form-urlencoded')
    
    return new Promise( resolve => {

      this.http.get(this.url+'/webservice/rest/locations/'+id+'/children' ,{ headers })
        .subscribe( (buildings: any) => {
          this.buildings = buildings;
          resolve(buildings);
        });
    });


  }


  getbuildings(id:number): Promise<BuildingInterface[]>{
    let headers = new HttpHeaders()
    .append("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
    .set('Content-Type', 'application/x-www-form-urlencoded')
    return new Promise( resolve => {
      this.http.get(this.url+'/webservice/rest/locations/'+id+'/children' ,{ headers })
        .subscribe( (buildings: any) => {
          this.buildings = buildings['data'];
          resolve( buildings['data'] );
        });
    });


  }







}//class