import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetsService } from 'src/app/services/assets.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssetSearchInterface } from 'src/app/interfaces/assetSearch.interface';

@Component({
  selector: 'app-down-fixedasset',
  templateUrl: './down-fixedasset.component.html',
  styleUrls: ['./down-fixedasset.component.scss']
})
export class DownFixedassetComponent implements OnInit {

  assets: AssetSearchInterface[] = [];
  asset: AssetSearchInterface[] = [];
  code;
  reactiveForm: FormGroup;
  ide;
  estatus;

  constructor(
    private router: Router,
    private assetsService: AssetsService,
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<DownFixedassetComponent>
  ) { }

  ngOnInit(): void {
 
    this.reactiveForm = this.builder.group({
      search: ['', [Validators.required]]
    });
    
  }

  assetPorIde(valor: any) {

    if (valor == null) {
      return this.router.navigateByUrl('/fixedAssets');
    }

    if (valor.length > 20) {
      let last8 = valor.substr(valor.length - 8);
      let hexa = parseInt(last8, 16);
      let hexaStr = hexa.toString();

      this.assetsService.getAssetsCode(hexaStr)
        .then(asset => {
          if (!asset) {
            this.estatus = "No se ha encontrado registro.";
            return this.router.navigateByUrl('/fixedAssets');
          } else {
            this.asset = asset;
            this.dialogRef.close();
            let route = "fixedAssetDelete/" + asset;
            return this.router.navigateByUrl(route);
          }
        })


    }
    else {

      this.assetsService.getAssetsCode(valor)
        .then(asset => {
          if (!asset) {
            this.estatus = "No se ha encontrado registro.";
            return this.router.navigateByUrl('/fixedAssets');
          } else {


            this.asset = asset;

            //alert(JSON.stringify(asset['data'].code))

            this.dialogRef.close();
            let route = "fixedAssetDelete/" + asset['data'].code;
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
