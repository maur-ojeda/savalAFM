import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../services/assets.service';
import { ActivatedRoute, Router } from '@angular/router';
//import { AssetInterface } from '../../interfaces/asset.interface';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CcenterService } from 'src/app/services/ccenter.service';
import { CcenterInterface } from 'src/app/interfaces/ccenter.interface';
import { UpdateConfirmationComponent } from 'src/app/dialogs/update-confirmation/update-confirmation.component';
//import { AssetSearchInterface } from 'src/app/interfaces/assetSearch.interface';
import {MatDialog} from '@angular/material/dialog';
import { WarningComponent } from 'src/app/dialogs/warning/warning.component';
import * as moment from 'moment';



@Component({
  selector: 'app-fixedassetupdate',
  templateUrl: './fixedassetupdate.component.html',
  styleUrls: ['./fixedassetupdate.component.scss']
})
export class FixedassetupdateComponent implements OnInit {

  //assets: AssetSearchInterface[] = [];
  //asset: AssetSearchInterface[] = [];
  assets;
  asset;
  reactiveForm: FormGroup;
  ccenters: CcenterInterface[] = [];



  constructor(
    public slCCenterService: CcenterService,
    public assetsService: AssetsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private builder: FormBuilder,
    public dialog: MatDialog 
  ) { }

  ngOnInit(): void {


  //getcode
  let code = this.activatedRoute.snapshot.paramMap.get('id');
  this.assetsService.getAssetsData( code ).then( asset => {
    if ( !asset ) {
    return this.router.navigateByUrl('/');
  }
  this.asset = asset;
  this.getAssetsData(asset)





  if(this.reactiveForm.controls['rfidLabelSap'].touched){
    
    var v  = this.reactiveForm.controls['rfidLabelSap'].value;
    var last8 = v.substr(v.length - 8);
    var hexa = parseInt(last8, 16);
    this.reactiveForm.controls['rfidLabelSap'].setValue(hexa);
  }
  

    

    /*value => {		
    if ( this.reactiveForm.controls['lBuilding'].value !== '') {
    
      this.reactiveForm.controls['lBuilding'].enable()
      this.setValidatorRequired('lBuilding', Validators.required);
      
    } else {
      this.setValidatorRequired('lBuilding', null);
      }
  })*/


});
//getcode


    this.slCCenterService.getCcenters()
      .then(ccenters => this.ccenters = ccenters);

    this.reactiveForm = this.builder.group({
      assetID: ['', []],
      //rfidLabelFake: ['', []],
      rfidLabelSap: ['',[] ],
      serieNumber: ['', []],
      description: ['', [Validators.required]],
      costCenter: ['', [Validators.required]],
      creditorId: ['', []],
      lifetimeYear: ['', []]
    });
  }



  toRfid(){
    var n  = this.reactiveForm.controls['rfidLabelSap'].value;
    if (n.length > 20) {
      var last8 = n.substr(n.length - 8);
      var hexa = parseInt(last8, 16);
      this.reactiveForm.controls['rfidLabelSap'].setValue(hexa);
    }
  
  }

  getAssetsData(e) {
   
    console.log(e)
    this.reactiveForm.controls['assetID'].setValue(e.id);
    this.reactiveForm.controls['rfidLabelSap'].setValue(e.rfidLabelSap);
    this.reactiveForm.controls['costCenter'].setValue(e.costCenter.id);
    this.reactiveForm.controls['serieNumber'].setValue(e.serieNumber);
    this.reactiveForm.controls['description'].setValue(e.description);
    this.reactiveForm.controls['creditorId'].setValue(e.creditorId);
    this.reactiveForm.controls['lifetimeYear'].setValue(e.lifetimeYear);
  }


  goBack() {
    this.location.back();
  }

  updateData() {
    let ide = this.reactiveForm.value.assetID;

    let formValue = {
      "rfidLabelSap": this.reactiveForm.value.rfidLabelSap,
      "serieNumber": this.reactiveForm.value.serieNumber,
      "description": this.reactiveForm.value.description,
      "costCenter": this.reactiveForm.value.costCenter,
      "creditorId": this.reactiveForm.value.creditorId,
      "lifetimeYear": this.reactiveForm.value.lifetimeYear
    }

   
    this.assetsService.updateAssets(formValue, ide);
   


  }



  Dialog() {
    const dialogRef = this.dialog.open(UpdateConfirmationComponent,{
          width: '98VW'
    });
    dialogRef.afterClosed().subscribe(result => {

              if(result){
                this.updateData();
              }

    });
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
/**
 * transforma fecha 
*/
formatDate(f) {
  let dateInFormat = moment(f).format('DD-MM-YYYY HH:MM');
  return dateInFormat
}


}





