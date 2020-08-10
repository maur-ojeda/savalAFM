import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../services/assets.service';
import { ActivatedRoute, Router } from '@angular/router';
import {AssetInterface } from '../../interfaces/asset.interface';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-fixedassetdelete',
  templateUrl: './fixedassetdelete.component.html',
  styleUrls: ['./fixedassetdelete.component.scss']
})
export class FixedassetdeleteComponent implements OnInit {

  asset: AssetInterface;
  reactiveForm: FormGroup;

  constructor(
    public assetsService: AssetsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location, 
    private builder: FormBuilder,
    //private datePipe: DatePipe
  ) { }

  
  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    let ide = Number(id);

    this.assetsService.getAssetPorId( ide ).then( asset => {
      if ( !asset ) {
        return this.router.navigateByUrl('/');
      }   
      this.asset = asset;
      this.getAssetsData(asset);
    });

    
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




  /**
   * Fecha documento
   * fecha de referencia
   * fecha de contabilizacion
   * glosa de baja
   * 
   * clase movimiento
   * clase documento
   * baja total
   * 
   * 
   * 
   */

}

