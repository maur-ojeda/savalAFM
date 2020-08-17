import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestInterface } from 'src/app/interfaces/request.interface';
import { RequestsService } from 'src/app/services/requests.service';
import * as moment from 'moment';


@Component({
  selector: 'app-fixed-asset-pending',
  templateUrl: './fixed-asset-pending.component.html',
  styleUrls: ['./fixed-asset-pending.component.scss']
})
export class FixedAssetPendingComponent implements OnInit {
  
  request: RequestInterface;
  
  constructor(
   public requestsService: RequestsService,
   private activatedRoute: ActivatedRoute,
   private router: Router,
   private location: Location 
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    let ide = parseInt(id)
    this.requestsService.getRequestsPorId( ide ).then( request => {
      if ( !request ) {
        return this.router.navigateByUrl('/');
      }
      this.request = request;
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

