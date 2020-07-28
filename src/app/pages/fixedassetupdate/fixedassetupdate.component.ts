import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../services/assets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetInterface } from '../../interfaces/asset.interface';
import { Location } from '@angular/common';

import { NgForm } from '@angular/forms';

//import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-fixedassetupdate',
  templateUrl: './fixedassetupdate.component.html',
  styleUrls: ['./fixedassetupdate.component.scss']
})
export class FixedassetupdateComponent implements OnInit {

  asset: AssetInterface;


  //updateAssetForm: FormGroup;
  submitted = false;



  constructor(
    public assetsService: AssetsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    //private formBuilder: FormBuilder

  ) { }

  ngOnInit(): void {

    /*
    this.updateAssetForm = this.formBuilder.group({
      catalogClass: [{disabled: false},'', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    */

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.assetsService.getAssetPorId(id).then(asset => {
      if (!asset) {
        return this.router.navigateByUrl('/');
      }

      this.asset = asset;


    });

  }

  /*
   get f() { return this.updateAssetForm.controls; }
  
   onSubmit() {
    this.submitted = true;
  
    if (this.updateAssetForm.invalid) {
        return;
    }
  
    alert('SUCCESS!! :-)')
  }
  */
  goBack() {
    this.location.back();
  }


  onSubmit(fixedAssetForm: NgForm){
    this.assetsService.updateAssets(fixedAssetForm.value);
    

}

}






