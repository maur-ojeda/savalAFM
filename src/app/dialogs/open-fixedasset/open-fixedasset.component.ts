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
  estatus;

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

  
  assetPorIde(valor: any) {
   
    //vacio
    if(valor==""){
      return this.router.navigateByUrl('/fixedAssets');
    }
    
    if (valor.length > 20){
  
      let last8 = valor.substr(valor.length - 8); 
      let hexa = parseInt(last8, 16);
      //console.log(hexa);
      //console.log(hexa.toString());
      this.assetsService.getAssetPorRfid(hexa.toString()).then(asset => {
        if (!asset) {
          this.estatus="No se ha encontrado registro.";
          return this.router.navigateByUrl('/fixedAssets');
        }
        this.asset = asset;
        this.dialogRef.close();
        let route = "fixedAssetUpdate/" + asset.id;
        return this.router.navigateByUrl(route);
      });

      //this.reactiveForm.controls['search'].setValue(hexa);
      //convertir a rfid y comparar por rfidLabelSap y devolver el id para navegar
    }else{

      var splitted = valor.split("-", 3);
      //console.log(splitted[0]) //codigo
      //console.log(splitted[1]) //guion
      //console.log(splitted[2]) //subcodigo

      if (splitted[1] != undefined) { 
        //alert('referalCode: '+ valor);
        //comparar con referalCode y trae id
        this.assetsService.getAssetPorReferalCode(valor).then(asset => {
          if (!asset) {
            //this.openNoRegister();
            this.estatus="No se ha encontrado registro.";
            return this.router.navigateByUrl('/fixedAssets');
          }

          this.asset = asset;
          //console.log('here x referal'+ asset)
          this.dialogRef.close();
          let route = "fixedAssetUpdate/" + asset.id;
          return this.router.navigateByUrl(route);
        });
      }
      if (splitted[0].length > 11){ 
        //alert('code: '+ valor);
        //comparar con code y traer id
           this.assetsService.getAssetPorCode(valor).then(asset => {
            if (!asset) {
              //this.openNoRegister();
              this.estatus="No se ha encontrado registro.";
              return this.router.navigateByUrl('/fixedAssets');
          
            }
            
            this.asset = asset;
            //console.log('here x code'+ asset)
            this.dialogRef.close();
            let route = "fixedAssetUpdate/" + asset.id;
            return this.router.navigateByUrl(route);
          });
      }else{
        this.estatus="No se ha encontrado registro.";
      }

      
    }
 }
search(){
  //console.log("test");
  let ide = this.reactiveForm.value.search
  ide = ide.toString()
  this.assetPorIde(ide);
  }

}
