import { Injectable } from '@angular/core';
import { AreaInterface } from '../interfaces/area.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private url = "https://afsaval.agenciasur.cl"
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
      
      this.http.get(this.url+'/webservice/rest/catalog/locations?all=true&type=4',{ headers })
        .subscribe( (areas: any) => {
          this.areas = areas.data;
          resolve( areas.data )
        });
    });
  }


  

  getareas(id:number): Promise<AreaInterface[]>{

    let headers = new HttpHeaders()
    .append("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
    .set('Content-Type', 'application/x-www-form-urlencoded')
   
    return new Promise( resolve => {


      this.http.get(this.url+'/webservice/rest/locations/'+id+'/children' ,{ headers })
        .subscribe( (areas: any) => {
          this.areas = areas.data;
          console.log('areas.data');
          console.log(areas.data);
          resolve( areas.data );
          
        });
    });
  }






}

