import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetsService } from 'src/app/services/assets.service';
import { AssetInterface } from 'src/app/interfaces/asset.interface';
import {MatDialogRef} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-move-fixedasset',
  templateUrl: './move-fixedasset.component.html',
  styleUrls: ['./move-fixedasset.component.scss']
})
export class MoveFixedassetComponent implements OnInit {

  assets: AssetInterface[] = [];
  asset: AssetInterface[] = [];
  reactiveForm: FormGroup;
  ide;
  estatus;


  constructor(
    private router: Router,
    private assetsService: AssetsService,
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<MoveFixedassetComponent>
  ) { }

  ngOnInit(): void {
  
    this.reactiveForm = this.builder.group({
      search: ['', [Validators.required]]
		});
  }

  assetPorIde(valor: any) {
    
    if (valor == "") {
      // alert('vacio');
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
          this.asset = asset;
          this.dialogRef.close();
          let route = "fixedAssetMove/" + asset.code;
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
          let route = "fixedAssetMove/" + asset.code;
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