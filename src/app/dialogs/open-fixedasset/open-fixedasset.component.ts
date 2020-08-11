import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetsService } from 'src/app/services/assets.service';
//import { AssetInterface } from 'src/app/interfaces/asset.interface';
import {MatDialogRef} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssetSearchInterface } from 'src/app/interfaces/assetSearch.interface';


@Component({
  selector: 'app-open-fixedasset',
  templateUrl: './open-fixedasset.component.html',
  styleUrls: ['./open-fixedasset.component.scss']
})
export class OpenFixedassetComponent implements OnInit {
  assets: AssetSearchInterface[] = [];
  asset: AssetSearchInterface[] = [];
  reactiveForm: FormGroup;
  ide;
  estatus;

  constructor(
    private router: Router,
    private assetsService: AssetsService,
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<OpenFixedassetComponent>
    ) { }
  
    ngOnInit(): void {
    this.reactiveForm = this.builder.group({
      search: ['', [Validators.required]]
    });
  }
  
  assetPorIde(valor: any) {
    
    if (valor == "") {
      
      return this.router.navigateByUrl('/fixedAssets');
    }
    if (valor.length > 20) {
      let last8 = valor.substr(valor.length - 8);
      let hexa = parseInt(last8, 16);
      let hexaStr = hexa.toString();
      this.assetsService.getAssetsIdSearch(hexaStr)
      .then( asset => {
        if (!asset) {
          this.estatus="No se ha encontrado registro.";
          return this.router.navigateByUrl('/fixedAssets');
        } else {
          this.asset = asset
          
          this.dialogRef.close();
          let route = "fixedAssetUpdate/" + asset.code;
          return this.router.navigateByUrl(route);
        }
      })
    } else {
      var splitted = valor.split("-", 3);
      //console.log(splitted[0]) //codigo
      this.assetsService.getAssetsIdSearch(splitted[0])
      .then( asset => {
        if (!asset) {
          this.estatus="No se ha encontrado registro.";
          return this.router.navigateByUrl('/fixedAssets');
        } else {
         
          this.asset = asset;
          this.dialogRef.close();
          let route = "fixedAssetUpdate/" + asset.code;
          return this.router.navigateByUrl(route);
        }
      })
    }
  }
  
search(){
  let ide = this.reactiveForm.value.search
  ide = ide.toString()
  this.assetPorIde(ide);
  }

}
