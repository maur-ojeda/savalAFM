/*especies*/
import { Injectable } from '@angular/core';
import { SpeciesInterface } from '../interfaces/specie.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpecieService {
  private url = "https://afsaval.agenciasur.cl"
  private species: SpeciesInterface[] = [];
  constructor(private http: HttpClient) { }

  getSpecies(): Promise<SpeciesInterface[]>{

    let headers = new HttpHeaders()
    .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
    .set('Content-Type', 'application/x-www-form-urlencoded')

    if ( this.species.length > 0 ) {
      return Promise.resolve( this.species );
    }
    return new Promise( resolve => {
      this.http.get(this.url+'/webservice/rest/catalog/species?all=true',{ headers })
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
