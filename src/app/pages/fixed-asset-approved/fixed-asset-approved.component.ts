import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestInterface } from 'src/app/interfaces/request.interface';
import { RequestsService } from 'src/app/services/requests.service';
import * as moment from 'moment';

@Component({
  selector: 'app-fixed-asset-approved',
  templateUrl: './fixed-asset-approved.component.html',
  styleUrls: ['./fixed-asset-approved.component.scss']
})

export class FixedAssetApprovedComponent implements OnInit {

  request: RequestInterface;

  constructor(  
    public requestsService: RequestsService,
    private location: Location ,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    let ide = parseInt(id)
    this.requestsService.getRequestsPorId( ide ).then( request => {
      if ( !request ) {
        return this.router.navigateByUrl('/');
      }
    
      this.request = request;
      //console.log( request );
    });
    
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

