import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AssetInterface } from '../interfaces/asset.interface';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  private assets: AssetInterface[] = [];

 
  constructor(  private http: HttpClient ) { }

//todo:user y pass dinamico
getAssets(): Promise<AssetInterface[]>{
  let user ="mobile_user";
  let pass ="testing";
  let headers = new HttpHeaders()
  .set('Authorization',   `Basic ${btoa(user + ":" + pass)}`)
  .set('Content-Type', 'application/x-www-form-urlencoded')

  if ( this.assets.length > 0 ) {
    return Promise.resolve( this.assets );
  }

  return new Promise( resolve => {
    this.http.get('https://afsaval.agenciasur.cl/webservice/rest/assets',{ headers })
      .subscribe( (assets: any) => {
        //console.log(items.data);
        this.assets = assets.data;
        resolve( assets.data );
      });
  });
}

getAssetPorId( code: string ) {
  if ( this.assets.length > 0 ) {
    const asset = this.assets.find( p => p.code === code );
    return Promise.resolve( asset );
  }
  return this.getAssets().then( assets => {
    const asset = this.assets.find( p => p.code === code );
    return Promise.resolve( asset );
  });


}


}
