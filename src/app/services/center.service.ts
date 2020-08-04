import { Injectable } from '@angular/core';
import { CenterInterface } from '../interfaces/center.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CenterService {

  private centers: CenterInterface[] = [];
  
  constructor(private http: HttpClient) { }


  getCenters(): Promise<CenterInterface[]>{
    let user ="mobile_user";
    let pass ="testing";
    let headers = new HttpHeaders()
    .set('Authorization',   `Basic ${btoa(user + ":" + pass)}`)
    .set('Content-Type', 'application/x-www-form-urlencoded')
  
    if ( this.centers.length > 0 ) {
      return Promise.resolve( this.centers );
    }
    return new Promise( resolve => {
  

      

      this.http.get('https://afsaval.agenciasur.cl/webservice/rest/location/centers',{ headers })
        .subscribe( (centers: any) => {
          this.centers = centers.data;
          //console.log('ccenters.data');
          //console.log(ccenters.data);
          resolve( centers.data );
          
        });
    });
  }

}
