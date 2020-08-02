/**
 * clases
*/
import { Injectable } from '@angular/core';
import { cClassInterface } from '../interfaces/class.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ClassService {

  private cClasses: cClassInterface[] = [];

  constructor(private http: HttpClient) { }

  getcClass(): Promise<cClassInterface[]> {

    let user = "mobile_user";
    let pass = "testing";
    let headers = new HttpHeaders()
      .set('Authorization', `Basic ${btoa(user + ":" + pass)}`)
      .set('Content-Type', 'application/x-www-form-urlencoded')

    if (this.cClasses.length > 0) {
      return Promise.resolve(this.cClasses);
    }
    return new Promise(resolve => {
      this.http.get('https://afsaval.agenciasur.cl/webservice/rest/catalog/class/', { headers })
        .subscribe((cClasses: any) => {
          this.cClasses = cClasses.data;
          //console.log('cClasses.data');
          //console.log(cClasses.data);
          resolve(cClasses.data);

        });
    });
  }


}
