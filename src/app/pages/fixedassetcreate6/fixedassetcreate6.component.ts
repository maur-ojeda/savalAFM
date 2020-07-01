import { Component, OnInit } from '@angular/core';
import { FixedAssetStep6 } from 'src/app/models/fixed-asset-step6';
import { FixedAssetDataService } from 'src/app/services/fixed-asset-data.service';

@Component({
  selector: 'app-fixedassetcreate6',
  templateUrl: './fixedassetcreate6.component.html',
  styleUrls: ['./fixedassetcreate6.component.scss']
})
export class Fixedassetcreate6Component implements OnInit {

  
  fixedAssetStep6 : FixedAssetStep6;


  constructor( private fixedAssetDataService : FixedAssetDataService ) { 
    this.fixedAssetStep6 = fixedAssetDataService.fixedAssetStep6;
  }
  ngOnInit(): void {
  }
  submit(){
    this.fixedAssetDataService.postData();
  }

}
