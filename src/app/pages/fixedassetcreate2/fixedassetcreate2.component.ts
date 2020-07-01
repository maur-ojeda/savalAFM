import { Component, OnInit } from '@angular/core';
import { FixedAssetStep2 } from 'src/app/models/fixed-asset-step2';
import { FixedAssetDataService } from 'src/app/services/fixed-asset-data.service';

@Component({
  selector: 'app-fixedassetcreate2',
  templateUrl: './fixedassetcreate2.component.html',
  styleUrls: ['./fixedassetcreate2.component.scss']
})
export class Fixedassetcreate2Component implements OnInit {

  
  fixedAssetStep2 : FixedAssetStep2;


  constructor( private fixedAssetDataService : FixedAssetDataService ) { 
    this.fixedAssetStep2 = fixedAssetDataService.fixedAssetStep2;
  }
  ngOnInit(): void {
  }

}
