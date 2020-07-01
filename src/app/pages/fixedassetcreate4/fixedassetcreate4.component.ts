import { Component, OnInit } from '@angular/core';
import { FixedAssetStep4 } from 'src/app/models/fixed-asset-step4';
import { FixedAssetDataService } from 'src/app/services/fixed-asset-data.service';

@Component({
  selector: 'app-fixedassetcreate4',
  templateUrl: './fixedassetcreate4.component.html',
  styleUrls: ['./fixedassetcreate4.component.scss']
})
export class Fixedassetcreate4Component implements OnInit {

  
  fixedAssetStep4 : FixedAssetStep4;


  constructor( private fixedAssetDataService : FixedAssetDataService ) { 
    this.fixedAssetStep4 = fixedAssetDataService.fixedAssetStep4;
  }
  ngOnInit(): void {
  }

}
