import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
//import { WarningComponent } from 'src/app/dialogs/warning/warning.component';
//import * as moment from 'moment';

import { AssetsDetailsService } from '../../services/assets-details.service';


import { AssetsService } from '../../services/assets.service';
//import {AssetInterface } from '../../interfaces/asset.interface';


//import { AssetSearchInterface } from 'src/app/interfaces/assetSearch.interface';




@Component({
  selector: 'app-fixedasset',
  templateUrl: './fixedasset.component.html',
  styleUrls: ['./fixedasset.component.scss']
})
export class FixedassetComponent implements OnInit {
  

  //panelOpenState = false;
  //assets: AssetSearchInterface[] = [];
  //asset: AssetSearchInterface[] = [];
  //assets;
  //asset;

  constructor(
    public assetsDetailsService: AssetsDetailsService,
    public assetService: AssetsService,
    private activatedRoute: ActivatedRoute,
    //private router: Router,
    //
    //public dialog: MatDialog

  ) {  }


  ngOnInit(): void {
    //getcode
    let code = this.activatedRoute.snapshot.paramMap.get('id');

    //this.assetService.getAssetsData( code ).then( asset => {
     // if ( !asset ) {
      //return this.router.navigateByUrl('/');
    //}

/*
    this.assetsService.getAssetsData( code ).then( asset => {
      if ( !asset ) {
      return this.router.navigateByUrl('/');
    }

    this.asset = asset;
 
  
console.log(JSON.stringify(this.asset)); 


    //TODO: revisar el estatus
    //if(this.asset['data'].status == 1){
     // alert(1)
        //this.Warning()
    //}

    

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

   
  Warning() {
		const dialogRef = this.dialog.open(WarningComponent, {
			width: '98VW'
		});
    /*
    dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.saveData();
			}
    });
    */
	}
  

/*refresh(){

  location.reload(true)

}*/


}// end class
