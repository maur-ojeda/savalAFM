import { Component, OnInit } from '@angular/core';
import { RequestInterface } from 'src/app/interfaces/request.interface';
import { RequestsService } from 'src/app/services/requests.service';
import { Location } from '@angular/common';

import * as moment from 'moment';


@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})

export class RequestsComponent implements OnInit {
  
  requests: RequestInterface[] = [];

  constructor( 
      private requestsService: RequestsService,
      private location: Location 
    ) { }

  ngOnInit(): void {

    this.requestsService.getRequests()
    .then( requests => this.requests = requests )

    

  }



  goBack() {
    this.location.back();
  }


  /**
 * transforma fecha 
*/
formatDate(f) {
  let dateInFormat = moment(f).format('DD-MM-YYYY HH:MM');
  return dateInFormat
}

}

