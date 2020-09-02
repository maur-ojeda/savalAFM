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
  url ='fixedAssetDelete/';
  constructor(
    private router: Router,
    private assetsService: AssetsService,
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<DownFixedassetComponent>
  ) { }

  ngOnInit(): void {
    const nonWhitespaceRegExp: RegExp = new RegExp("\\S");
    this.reactiveForm = this.builder.group({
      search: ['', [Validators.required, Validators.pattern(nonWhitespaceRegExp)]]
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

  


searchno(){
let ide = this.reactiveForm.value.search
ide = ide.toString()
this.assetPorIde(ide);
}

 /** Funcion que busca por numero ingresado **/
 search() {
  let url ="fixedAssetDelete/"
  let valor = this.reactiveForm.value.search
  valor  =  valor.replace(/\s/g, "")
  var splitted = valor.split("-", 2);
  let codigo = splitted[0]
  let subCodigo = splitted[1]
  if( isNaN(codigo) ){
    console.log('buscar rfid')
   this.assetsService.getAssetPorrfidLabelSap(valor).then( res => {
    this.dialogRef.close();
    let route = url + res.code;
    return this.router.navigateByUrl(route)
  }).catch(
    () => {
      alert("No se ha encontrado registro.")
});
  }else if(!isNaN(subCodigo)){
    console.log('buscar subcodigo')
    this.assetsService.getAssetPorreferalCode(valor)
    .then( res => {
      this.dialogRef.close();
      let route = url + res.code;
      return this.router.navigateByUrl(route)  
    }
    ).catch(
      () => {
        alert("No se ha encontrado registro.")
  });

  } else if( !isNaN(codigo) ){
    console.log('buscar codigo sin subcodigo')
    codigo = codigo.toString().padStart(12, "0");
    console.log(codigo)
    this.assetsService.getAssetPorcode(codigo)
    .then( res => {
      this.dialogRef.close();
      let route = url + res.code;
      return this.router.navigateByUrl(route)  
    }
    ).catch(
      () => {
        alert("No se ha encontrado registro.")
  });
  }
  else{      
    alert("No se ha encontrado registro.")
    return this.router.navigateByUrl('/fixedAssets');
  }

}

}
