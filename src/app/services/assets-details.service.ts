import { Injectable, Injector } from '@angular/core';
import { Asset } from '../models/asset.model';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetsDetailsService extends BaseService<Asset> {

  public asset$: Observable<Asset[]>;

  public assets;


  constructor(
    protected injector: Injector
  ) {
    super(injector, 'asset', 'https://afsaval.agenciasur.cl');
  }

  listAllAssest(): Observable<Asset[]> {
    let headers = new HttpHeaders()
      .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
      .set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.get<Asset[]>(this.urlAPI + '/webservice/rest/assets/?all=true', { headers })
  }

 
  findByCodeIn(code: string): Observable<Asset[]> {
    let headers = new HttpHeaders()
      .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
      .set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.get<Asset[]>(this.urlAPI + '/webservice/rest/assets/search?code=' + code, { headers })
  }
 
/**
 *  findByCodeOffline(code: string) {

    if(this.assets != undefined) {
      const asset = this.assets.find(p => p.code == code);
    return (asset);
    }else {
      this.listAllAssest().subscribe(
        (assets) => {
          this.assets = assets          
        },
        (err)=>{console.log(err)},
        ()=>{
          let e = this.assets;
          return(e.find(p => p.code == code))
        }
      )
      

    }
   
    
  }

 */

}


