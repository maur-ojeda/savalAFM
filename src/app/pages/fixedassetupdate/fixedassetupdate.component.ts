import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../services/assets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetInterface } from '../../interfaces/asset.interface';
import { Location } from '@angular/common';


import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { CcenterService } from 'src/app/services/ccenter.service';
import { CcenterInterface } from 'src/app/interfaces/ccenter.interface';




@Component({
  selector: 'app-fixedassetupdate',
  templateUrl: './fixedassetupdate.component.html',
  styleUrls: ['./fixedassetupdate.component.scss']
})
export class FixedassetupdateComponent implements OnInit {

  asset: AssetInterface;
  reactiveForm: FormGroup;
  CCenters: CcenterInterface[] = [];
  
  

  constructor(
    public slCCenterService: CcenterService,
    public assetsService: AssetsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private builder: FormBuilder

    

  ) { }

  ngOnInit(): void {

   
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.assetsService.getAssetPorId(id).then(asset => {
      if (!asset) {
        return this.router.navigateByUrl('/');
      }
      this.asset = asset;
      this.getAssetsData(asset);
    });

    this.slCCenterService.getCcenters()
    .then(CCenters => this.CCenters = CCenters);

    this.reactiveForm = this.builder.group({
      rfidLabelFake: ['', []],
      rfidLabelSap: ['', []],
      serieNumber: ['', []],
      description: ['', []],
      costCenter: ['', []],
      creditorId: ['', []],
      lifetimeYear: ['', []]
		});
  }


rfidConvert(n){
    if (n.length > 0){
    var last8 = n.substr(n.length - 8); 
    var hexa = parseInt(last8, 16);
    //return hexa
    this.reactiveForm.controls['rfidLabelFake'].setValue(hexa);
    //alert(hexa)
  }
}

  getAssetsData(e){
    this.reactiveForm.controls['costCenter'].setValue(e.costCenter.id);
    this.reactiveForm.controls['rfidLabelSap'].setValue(e.rfidLabelSap);
    this.reactiveForm.controls['serieNumber'].setValue(e.serieNumber);
    this.reactiveForm.controls['description'].setValue(e.description);
    this.reactiveForm.controls['creditorId'].setValue(e.creditorId);
    this.reactiveForm.controls['lifetimeYear'].setValue(e.lifetimeYear);
  }


  goBack() {
    this.location.back();
  }

  updateData(){
    let formValue = {
      "rfidLabelFake": this.reactiveForm.value.rfidLabelFake,
      "rfidLabelSap": this.reactiveForm.value.rfidLabelSap,
      "serieNumber": this.reactiveForm.value.serieNumber,
      "description": this.reactiveForm.value.description,
      "costCenter": this.reactiveForm.value.costCenter,
      "creditorId": this.reactiveForm.value.creditorId,
      "lifetimeYear": this.reactiveForm.value.lifetimeYear,
    }

      //this.assetsService.updateAssets(fixedAssetForm.value);
    alert(JSON.stringify(formValue));

}

}





