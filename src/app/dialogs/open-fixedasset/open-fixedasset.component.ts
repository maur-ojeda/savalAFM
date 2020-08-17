import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetsService } from 'src/app/services/assets.service';
//import { AssetInterface } from 'src/app/interfaces/asset.interface';
import { MatDialogRef } from '@angular/material/dialog';
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
  url ='/fixedAssets';

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


  /**
   * Muestra error y retorna a pantalla
  */
  /*errorCode() {
    this.estatus = "No se ha encontrado registro.";
    //return this.router.navigateByUrl('/fixedAssets');
  }
*/
  /**
   * Busca AF por código
  */
  search() {
    let ide = this.reactiveForm.value.search
    ide = ide.toString()
    this.assetPorIde(ide);
  }
}



