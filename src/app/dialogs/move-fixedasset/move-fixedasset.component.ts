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
  url ='fixedAssetMove/';

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
    if (valor == null) {
      return this.router.navigateByUrl('/fixedAssets');
    }
    if (valor == '') {
      alert('vacio ingrese un número')
      return this.router.navigateByUrl(this.url);
    }
    this.assetsService.getAssetsCode(valor)
      .then(asset => {
          this.asset = asset;
          this.dialogRef.close();
          let route = this.url + asset['data'].code;
          return this.router.navigateByUrl(route);
      }).catch(err =>
        alert("No se ha encontrado registro.")
      )
  }




  search(){
  let ide = this.reactiveForm.value.search
  ide = ide.toString()
  this.assetPorIde(ide);
  }

}