import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../services/assets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
//import {AssetInterface } from '../../interfaces/asset.interface';
//import { AssetSearchInterface } from 'src/app/interfaces/assetSearch.interface';
import { MatDialog } from '@angular/material/dialog';
import { WarningComponent } from 'src/app/dialogs/warning/warning.component';
import * as moment from 'moment';



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
    public dialog: MatDialog

  ) {  }


  ngOnInit(): void {
    //getcode
    let code = this.activatedRoute.snapshot.paramMap.get('id');

    //let codex = this.activatedRoute.snapshot.paramMap.get('code');

    this.assetsService.getAssetsData( code ).then( asset => {
      if ( !asset ) {
      return this.router.navigateByUrl('/');
    }

    this.asset = asset;
 
  
   // console.log(JSON.stringify(this.asset)); 
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
 
  //TODO: ver utilidad 
  refreshPage() {
    window.location.reload();
  }

  refresh(){
    location.reload(true)
  }

   
  Warning() {
		const dialogRef = this.dialog.open(WarningComponent, {
			width: '98VW'
		});
	}
  
/**
 * transforma fecha a formato : 
 * TODO: se debe refactorizar 
*/
  formatDate(f) {
    let dateInFormat = moment(f).format('DD-MM-YYYY HH:MM');
    return dateInFormat
}

}// end class
