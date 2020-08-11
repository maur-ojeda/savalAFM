import { Component, OnInit } from '@angular/core';
import { AssetInterface } from 'src/app/interfaces/asset.interface';
import { Router } from '@angular/router';
import { AssetsService } from 'src/app/services/assets.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-down-fixedasset',
  templateUrl: './down-fixedasset.component.html',
  styleUrls: ['./down-fixedasset.component.scss']
})
export class DownFixedassetComponent implements OnInit {

  assets: AssetInterface[] = [];
  asset: AssetInterface[] = [];
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
    
    if (valor == "") {
      // alert('vacio');
      return this.router.navigateByUrl('/fixedAssets');
    }
    if (valor.length > 20) {
      let last8 = valor.substr(valor.length - 8);
      let hexa = parseInt(last8, 16);
      this.assetsService.getAssetsIdSearch(hexa)
      .then( asset => {
        if (!asset) {
          this.estatus="No se ha encontrado registro.";
          return this.router.navigateByUrl('/fixedAssets');
        } else {
          this.asset = asset;
          this.dialogRef.close();
          let route = "fixedAssetDelete/" + asset.data.code;
          return this.router.navigateByUrl(route);
        }
      })
    } else {
      this.assetsService.getAssetsIdSearch(valor)
      .then( asset => {
        if (!asset) {
          this.estatus="No se ha encontrado registro.";
          return this.router.navigateByUrl('/fixedAssets');
        } else {
         
          this.asset = asset;
          this.dialogRef.close();
          let route = "fixedAssetDelete/" + asset.data.code;
          return this.router.navigateByUrl(route);



        }
      })
    }
  }

  


search(){
  //console.log("test");
let ide = this.reactiveForm.value.search
ide = ide.toString()
this.assetPorIde(ide);
}

}
