import { Component, OnInit } from '@angular/core';
import { FixedAssetStep5 } from 'src/app/models/fixed-asset-step5';
import { FixedAssetDataService } from 'src/app/services/fixed-asset-data.service';

@Component({
  selector: 'app-fixedassetcreate5',
  templateUrl: './fixedassetcreate5.component.html',
  styleUrls: ['./fixedassetcreate5.component.scss']
})
export class Fixedassetcreate5Component implements OnInit {

  
  fixedAssetStep5 : FixedAssetStep5;


  constructor( private fixedAssetDataService : FixedAssetDataService ) { 
    this.fixedAssetStep5 = fixedAssetDataService.fixedAssetStep5;
  }
  ngOnInit(): void {
  }

}
