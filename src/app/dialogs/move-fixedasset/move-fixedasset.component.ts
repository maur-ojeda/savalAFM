import { Component, OnInit } from '@angular/core';
import { AssetInterface } from 'src/app/interfaces/asset.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AssetsService } from 'src/app/services/assets.service';

@Component({
  selector: 'app-move-fixedasset',
  templateUrl: './move-fixedasset.component.html',
  styleUrls: ['./move-fixedasset.component.scss']
})
export class MoveFixedassetComponent implements OnInit {

  assets: AssetInterface[] = [];
  asset: AssetInterface;

  constructor(
    private router: Router,
    private assetsService: AssetsService,
    public dialogRef: MatDialogRef<MoveFixedassetComponent>
  ) { }

  ngOnInit(): void {
    this.assetsService.getAssets()
    .then(assets => this.assets = assets);
  }
  assetPorIde(ide: any) {   
    if(ide==""){
      this.dialogRef.close();
      return this.router.navigateByUrl('/fixedAssets');
    }
    var splitted = ide.split("-", 3);
    console.log(splitted[0]) //codigo
    console.log(splitted[1]) //guion
    console.log(splitted[2]) //subcodigo

  
    if (splitted[1] != undefined) {
      if (splitted[0].length > 11) {
        this.assetsService.getAssetPorCode(splitted[0]).then(asset => {
          if (!asset) {
            return this.router.navigateByUrl('/fixedAssetMove');
          }
          this.asset = asset;
          let route = "fixedAssetMove/" + asset.code;
          this.dialogRef.close();
          return this.router.navigateByUrl(route);
        });
      }
    }else{
      if(splitted[0].length <= 11){
         this.assetsService.getAssetPorrfid( ide ).then( asset => {
           if ( !asset ) {
             return this.router.navigateByUrl('/fixedAssetMove');
           }
           this.asset = asset;
          let route = "fixedAssetMove/"+asset.code;
          this.dialogRef.close();
         return this.router.navigateByUrl(route);
         });
       }
     
    }
  }
}
