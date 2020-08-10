/**
 * Centros de costo
*/
import { Injectable } from '@angular/core';
import { CcenterInterface } from '../interfaces/ccenter.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CcenterService {

  private ccenters: CcenterInterface[] = [];
  
  constructor(private http: HttpClient) { }


  getCcenters(): Promise<CcenterInterface[]>{
    let user ="mobile_user";
    let pass ="testing";
    let headers = new HttpHeaders()
    .set('Authorization',   `Basic ${btoa(user + ":" + pass)}`)
    .set('Content-Type', 'application/x-www-form-urlencoded')
  
    if ( this.ccenters.length > 0 ) {
      return Promise.resolve( this.ccenters );
    }
    return new Promise( resolve => {

      
      this.http.get('https://devactivofijo.saval.cl:8443/webservice/rest/catalog/locations?all=true',{ headers })
        .subscribe( (ccenters: any) => {
          this.ccenters = ccenters.data;
          //console.log('ccenters.data');
          //console.log(ccenters.data);
          resolve( ccenters.data );
          
        });
    });
  }

}
