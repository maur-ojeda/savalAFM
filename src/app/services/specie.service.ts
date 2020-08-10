/*especies*/
import { Injectable } from '@angular/core';
import { SpeciesInterface } from '../interfaces/specie.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpecieService {

  private species: SpeciesInterface[] = [];

  constructor(private http: HttpClient) { }

  getSpecies(): Promise<SpeciesInterface[]>{
    let user ="mobile_user";
    let pass ="testing";
    let headers = new HttpHeaders()
    .set('Authorization',   `Basic ${btoa(user + ":" + pass)}`)
    .set('Content-Type', 'application/x-www-form-urlencoded')
  
    if ( this.species.length > 0 ) {
      return Promise.resolve( this.species );
    }
    return new Promise( resolve => {
      this.http.get('https://afsaval.agenciasur.cl/webservice/rest/catalog/species',{ headers })
        .subscribe( (species: any) => {
          this.species = species.data;
          resolve( species.data );
          
        });
    });
  }

  getSpeciesPorId( code: string ) {
    if ( this.species.length > 0 ) {
      
      const specie = this.species.find( p => p.code === code );
      return Promise.resolve( specie );
    }
    return this.getSpecies().then( species => {
    const specie = this.species.find( p => p.code === code );
    return Promise.resolve( specie );
    });
  }


}
