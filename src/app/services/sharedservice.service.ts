import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Asset } from '../models/asset.model';
import { AssetSearchInterface } from '../interfaces/assetSearch.interface';


@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {
  
  API_URL ="https://afsaval.agenciasur.cl"

  constructor(
    private location: Location,
    private router: Router,
    private http: HttpClient,
  ) { }


formatDate(f) {
  let dateInFormat = moment(f).format('DD-MM-YYYY HH:MM');
  return dateInFormat
}

goBack() {
  this.location.back();
}

toHome(){
  return this.router.navigateByUrl('/home');
}

findByCode(code: string): Observable<Asset[]> {
  let cod = code
    if (cod.length > 23) {
      let last8 = cod.substr(code.length - 8);
      let hexa = parseInt(last8, 16);
      let hexaStr = hexa.toString();
      code = hexaStr;
    }
  let headers = new HttpHeaders()
    .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
    .set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.get<Asset[]>(this.API_URL + '/webservice/rest/assets/search?code=' + code, { headers })
}

listarAssets(): Observable<Asset[]> {
  let headers = new HttpHeaders()
    .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
    .set('Content-Type', 'application/x-www-form-urlencoded')
  return this.http.get<Asset[]>(this.API_URL + '/webservice/rest/assets?all=true',{headers})
}

}
