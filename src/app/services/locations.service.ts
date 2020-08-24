/***
 * Locaciones
 * se relacionan 
 */

import { Injectable } from '@angular/core';
import { LocationInterface } from '../interfaces/location.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private locations: LocationInterface[] = [];

  constructor(private http: HttpClient) { }

  getlocations(): Promise<LocationInterface[]> {
    let user = "mobile_user";
    let pass = "testing";
    let headers = new HttpHeaders()
      .set('Authorization', `Basic ${btoa(user + ":" + pass)}`)
      .set('Content-Type', 'application/x-www-form-urlencoded')

    if (this.locations.length > 0) {
      return Promise.resolve(this.locations);
    }

    return new Promise(resolve => {
      //this.http.get('https://afsaval.agenciasur.cl/webservice/rest/catalog/locations?items=1000/', { headers })
      this.http.get('https://afsaval.agenciasur.cl/webservice/rest/catalog/locations', { headers })
        .subscribe((locations: any) => {
          this.locations = locations.data;
          resolve(locations.data);

        });
    });
  }


}
