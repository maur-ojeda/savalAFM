import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Asset } from '../models/asset.model';
import { AssetInterface } from '../interfaces/asset.interface';


@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {
  
  private assets: AssetInterface[] = [];
  private assetsCLS = new Asset();
  
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
    return this.http.get<Asset[]>('https://afsaval.agenciasur.cl/webservice/rest/assets/search?code=' + code, { headers })
}



listAllAssest(): Observable<Asset[]> {
  let headers = new HttpHeaders()
    .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
    .set('Content-Type', 'application/x-www-form-urlencoded')
     return this.http.get<Asset[]>('https://afsaval.agenciasur.cl/webservice/rest/assets/?all=true', { headers })
}

findByCodeOffline(code: string) {
  if(this.assets != undefined) {

  let asset = this.assets.find(p => p.code == code);
  return (asset);

  }
  else {
    this.assetsDetailsService.listAllAssest().subscribe(
      (assets) => {
        this.assets = assets          
      },
      (err)=>{console.log(err)},
      ()=>{
        let e = this.assets['data'];
        let a = e.find(p => p.code == code)
        console.log(a)
        return(a)
      }
    )
  }
}




}
