import { Component, OnInit } from '@angular/core';
import { FixedAssetStep3 } from 'src/app/models/fixed-asset-step3';
import { FixedAssetDataService } from 'src/app/services/fixed-asset-data.service';

@Component({
  selector: 'app-fixedassetcreate3',
  templateUrl: './fixedassetcreate3.component.html',
  styleUrls: ['./fixedassetcreate3.component.scss']
})
export class Fixedassetcreate3Component implements OnInit {

  
  fixedAssetStep3 : FixedAssetStep3;


  constructor( private fixedAssetDataService : FixedAssetDataService ) { 
    this.fixedAssetStep3 = fixedAssetDataService.fixedAssetStep3;
  }
  ngOnInit(): void {
  }

}
