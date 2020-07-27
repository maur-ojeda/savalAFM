import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../services/assets.service';
import { AssetInterface } from '../../interfaces/asset.interface';


import { Router } from '@angular/router';
import { RequestInterface } from 'src/app/interfaces/request.interface';
import { RequestsService } from 'src/app/services/requests.service';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap' 


@Component({
  selector: 'app-fixed-assets',
  templateUrl: './fixed-assets.component.html',
  styleUrls: ['./fixed-assets.component.scss']
})




export class FixedAssetsComponent implements OnInit {

  assets: AssetInterface[] = [];
  requests: RequestInterface[] = [];

  constructor(
    private assetsService: AssetsService,
    private requestsService: RequestsService,
    private modal:NgbModal,
    private router: Router) { }

  ngOnInit(): void {


    
    this.assetsService.getAssets()
    .then( assets => this.assets = assets );

    this.requestsService.getRequests()
    .then( requests => this.requests = requests )
    
}


navigateTo(value) {
  if (value) {
      this.router.navigate([value]);
  }
  return false;
}

/*
myFunction(): void { 
  alert(this.val); 
   
} 
onOptionsSelected(value:string){
  console.log("the selected value is " + value);
}


*/








  }