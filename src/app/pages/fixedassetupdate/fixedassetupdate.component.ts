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

});
//getcode



    this.slCCenterService.getCcenters()
      .then(ccenters => this.ccenters = ccenters);

    this.reactiveForm = this.builder.group({
      assetID: ['', []],
      rfidLabelFake: ['', []],
      //rfidLabelSap: ['',[] ],
      serieNumber: ['', []],
      description: ['', [Validators.required]],
      costCenter: ['', [Validators.required]],
      creditorId: ['', []],
      lifetimeYear: ['', []]
    });





  }


  rfidConvert(n) {
    if (n.length > 20) {
      var last8 = n.substr(n.length - 8);
      var hexa = parseInt(last8, 16);
      this.reactiveForm.controls['rfidLabelFake'].setValue(hexa);
    }
  
  }

  getAssetsData(e) {
   
    console.log(e)
    this.reactiveForm.controls['assetID'].setValue(e.id);
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
      "rfidLabelFake": this.reactiveForm.value.rfidLabelFake,
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



}





