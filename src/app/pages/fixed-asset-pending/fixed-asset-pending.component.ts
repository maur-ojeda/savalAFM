import { Component, OnInit } from '@angular/core';
//import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
//import { RequestsService } from 'src/app/services/requests.service';
//import { RequestInterface } from 'src/app/interfaces/request.interface';


@Component({
  selector: 'app-fixed-asset-pending',
  templateUrl: './fixed-asset-pending.component.html',
  styleUrls: ['./fixed-asset-pending.component.scss']
})
export class FixedAssetPendingComponent implements OnInit {

  //request: RequestInterface;
  constructor(
   // public requestsService: RequestsService,
   // private activatedRoute: ActivatedRoute,
  // private router: Router,
    private location: Location 

  ) { }

  ngOnInit(): void {
    //const id = this.activatedRoute.snapshot.paramMap.get('id');
    /*this.requestsService.getRequestsPorId( id ).then( request => {
      if ( !request ) {
        return this.router.navigateByUrl('/');
      }
      this.request = request;
      console.log( request );
    });*/
  }

  goBack() {
    this.location.back();
  }

}

