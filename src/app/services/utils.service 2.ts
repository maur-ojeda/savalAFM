import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private location: Location,
    private router: Router,
  ) { }

  
/**
 * transforma fecha a formato : 
 * TODO: se debe refactorizar 
*/
formatDate(f) {
  let dateInFormat = moment(f).format('DD-MM-YYYY HH:MM');
  return dateInFormat
}

goBack() {
this.location.back();
}


noContent(){
  return this.router.navigateByUrl('/home')
  //abrir alerta y volver a home
}






}
