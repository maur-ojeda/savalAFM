import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../services/assets.service';
import { ActivatedRoute, Router } from '@angular/router';
import {AssetInterface } from '../../interfaces/asset.interface';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssetSearchInterface } from 'src/app/interfaces/assetSearch.interface';
import { DeleteConfirmationComponent } from 'src/app/dialogs/delete-confirmation/delete-confirmation.component';
//import { DatePipe } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import * as moment from 'moment';


@Component({
  selector: 'app-fixedassetdelete',
  templateUrl: './fixedassetdelete.component.html',
  styleUrls: ['./fixedassetdelete.component.scss']
})
export class FixedassetdeleteComponent implements OnInit {
  // assets: AssetSearchInterface[] = [];
  // asset: AssetSearchInterface[] = [];
  assets;
  asset;
  reactiveForm: FormGroup;

  constructor(
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
  
    this.reactiveForm = this.builder.group({
      assetID:['',[]],
      downDocumentAt: ['',[Validators.required]],
      downPostingAt: ['', [Validators.required]],
      downReferenceAt: ['', [Validators.required]],
      downComment: ['', [Validators.required]],
    });
    
  }


  getAssetsData(e) {
    this.reactiveForm.controls['assetID'].setValue(e.id);
   
  }



  goBack() {
    this.location.back();
  }

  transformDate(date) {
   // this.datePipe.transform(date, 'dd/MM/aaaa');
  }

  deleteAsset(){

    let ide = this.reactiveForm.value.assetID;

    let formValue = {
      "downDocumentAt": this.reactiveForm.value.downDocumentAt,
      "downPostingAt": this.reactiveForm.value.downPostingAt,
      "downReferenceAt": this.reactiveForm.value.downReferenceAt,
      "downComment": this.reactiveForm.value.downComment
    }

    //console.log(JSON.stringify(formValue, ide));
    this.assetsService.downAssets(formValue, ide);



  }



  Dialog() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent,{
          width: '98VW'
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
              if(result){
                this.deleteAsset();
              }

    });
  }

/**
 * transforma fecha 
*/
formatDate(f) {
  let dateInFormat = moment(f).format('DD-MM-YYYY HH:MM');
  return dateInFormat
}


refresh(){

  location.reload(true)

}

}

