import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {

  constructor(
    private location: Location,
  ) { }



/**
 * transforma fecha 
*/
formatDate(f) {
  let dateInFormat = moment(f).format('DD-MM-YYYY HH:MM');
  return dateInFormat
}

goBack() {
  this.location.back();
}

}
