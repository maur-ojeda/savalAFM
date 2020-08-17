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
  private url = "https://afsaval.agenciasur.cl"

  private ccenters: CcenterInterface[] = [];

  constructor(private http: HttpClient) { }


  getCcenters(): Promise<CcenterInterface[]> {
    let headers = new HttpHeaders()
      .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
      .set('Content-Type', 'application/x-www-form-urlencoded')
    if (this.ccenters.length > 0) {
      return Promise.resolve(this.ccenters);
    }
    return new Promise(resolve => {
      this.http.get(this.url + '/webservice/rest/catalog/costcenters?all=true', { headers })
        .subscribe((ccenters: any) => {
          this.ccenters = ccenters.data;
          resolve(ccenters.data);
        });
    });
  }

}
