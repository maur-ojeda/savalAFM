import { Component, OnInit } from '@angular/core';
import { FixedAssetStep1 } from 'src/app/models/fixed-asset-step1';
import { FixedAssetDataService } from 'src/app/services/fixed-asset-data.service';

@Component({
  selector: 'app-fixedassetcreate',
  templateUrl: './fixedassetcreate.component.html',
  styleUrls: ['./fixedassetcreate.component.scss']
})
export class FixedassetcreateComponent implements OnInit {

  fixedAssetStep1 : FixedAssetStep1;


  constructor( private fixedAssetDataService : FixedAssetDataService ) { 
    this.fixedAssetStep1 = fixedAssetDataService.fixedAssetStep1;
  }

  ngOnInit(): void {
  }

}
