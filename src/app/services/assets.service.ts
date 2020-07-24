import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssetInterfase } from '../interfaces/asset.interface';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

private assets: AssetInterfase[] = [];


  constructor(  private http: HttpClient ) { }

//metodos
 getAssets(): Promise<AssetInterfase[]> {


  if ( this.assets.length > 0 ) {
    return Promise.resolve( this.assets );
  }

  return new Promise( resolve => {
   this.http.get('https://restcountries.eu/rest/v2/lang/es').
   subscribe(( assets:AssetInterfase[] ) => {
     console.log(assets);
     this.assets = assets;
     resolve( assets );
   });
  });

 }



 getAssetPorId( id: string ) {
/*
  if ( this.assets.length > 0 ) {
    // hay paises en el arreglo
    const asset = this.assets.find( a => a.id === id );
    return Promise.resolve( asset );
  }

  return this.getAssets().then( assets => {

    const asset = this.assets.find( q => q.id === id );
    return Promise.resolve( asset );

  });
*/
console.log('ok');
}




}
