import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../services/assets.service';
//import {AssetInterface } from '../../interfaces/asset.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
//import { AssetSearchInterface } from 'src/app/interfaces/assetSearch.interface';



@Component({
  selector: 'app-fixedasset',
  templateUrl: './fixedasset.component.html',
  styleUrls: ['./fixedasset.component.scss']
})
export class FixedassetComponent implements OnInit {
  

  panelOpenState = false;
  //assets: AssetSearchInterface[] = [];
  //asset: AssetSearchInterface[] = [];
  assets;
  asset;

  constructor(
    public assetsService: AssetsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,

  ) {  }


  ngOnInit(): void {
    //getcode
    let code = this.activatedRoute.snapshot.paramMap.get('id');

    let codex = this.activatedRoute.snapshot.paramMap.get('code');


    this.assetsService.getAssetsData( code ).then( asset => {
      if ( !asset ) {
      return this.router.navigateByUrl('/');
    }
    this.asset = asset;

    //console.log(JSON.stringify(asset)); 

   // console.log(asset)
 
  });
  //getcode
 
} //end init

  goBack() {
    this.location.back();
  }
 
  refreshPage() {
    window.location.reload();
  }

   parseDate(date) {
  
console.log(date)
    var d = new Date(date); 
    return( d.toLocaleString() ); 

  }
  
  

  

}// end class
