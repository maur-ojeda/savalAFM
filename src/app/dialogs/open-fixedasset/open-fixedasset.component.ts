import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetsService } from 'src/app/services/assets.service';
import { AssetInterface } from 'src/app/interfaces/asset.interface';
import {MatDialogRef} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-open-fixedasset',
  templateUrl: './open-fixedasset.component.html',
  styleUrls: ['./open-fixedasset.component.scss']
})
export class OpenFixedassetComponent implements OnInit {
  assets: AssetInterface[] = [];
  asset: AssetInterface;
  reactiveForm: FormGroup;
  ide;


  constructor(
    private router: Router,
    private assetsService: AssetsService,
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<OpenFixedassetComponent>


    ) { }
  
    ngOnInit(): void {
    this.assetsService.getAssets()
    .then(assets => this.assets = assets);


    this.reactiveForm = this.builder.group({
      search: ['', [Validators.required]]
		});
  }

  
  assetPorIde(ide: any) {   
   
    let splitted = ide.split("-", 3);
    console.log(splitted[0]) //codigo
    console.log(splitted[1]) //guion
    console.log(splitted[2]) //subcodigo

  
    if (splitted[1] != undefined) {
      if (splitted[0].length > 11) {
        this.assetsService.getAssetPorCode(splitted[0]).then(asset => {
          if (!asset) {
            return this.router.navigateByUrl('/fixedAssetUpdate');
          }
          this.asset = asset;
          let route = "fixedAssetUpdate/" + asset.code;
          this.dialogRef.close();
          return this.router.navigateByUrl(route);
        });
      }
    }else{
      if(splitted[0].length <= 11){
         this.assetsService.getAssetPorrfid( ide ).then( asset => {
           if ( !asset ) {
             return this.router.navigateByUrl('/fixedAssetUpdate');
           }
           this.asset = asset;
          let route = "fixedAssetUpdate/"+asset.code;
          this.dialogRef.close();
         return this.router.navigateByUrl(route);
         });
       }
     
    }
  }


  rfidConvert(n){
    if (n.length > 20){
    var last8 = n.substr(n.length - 8); 
    var hexa = parseInt(last8, 16);
    this.reactiveForm.controls['search'].setValue(hexa);
  }
}


search(){
  //console.log("test");
let ide = this.reactiveForm.value.search
ide = ide.toString()
this.assetPorIde(ide);

}

}
