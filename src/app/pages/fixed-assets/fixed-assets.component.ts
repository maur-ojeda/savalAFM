import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../services/assets.service';
import { AssetInterface } from '../../interfaces/asset.interface';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { OpenFixedassetComponent } from 'src/app/dialogs/open-fixedasset/open-fixedasset.component';
import { MoveFixedassetComponent } from 'src/app/dialogs/move-fixedasset/move-fixedasset.component';
import { DownFixedassetComponent } from 'src/app/dialogs/down-fixedasset/down-fixedasset.component';
import { NoRegisterComponent } from 'src/app/dialogs/no-register/no-register.component';

@Component({
  selector: 'app-fixed-assets',
  templateUrl: './fixed-assets.component.html',
  styleUrls: ['./fixed-assets.component.scss']
})

export class FixedAssetsComponent implements OnInit {
  assets: AssetInterface[] = [];
  asset: AssetInterface;

  //animal: string;
  //name: string;
  reactiveForm: FormGroup;
  ide;


  closeResult = '';

  constructor(
    private assetsService: AssetsService,
    private modalService: NgbModal,
    private router: Router,
    private builder: FormBuilder,
    public dialog: MatDialog
    
    ) { }

  ngOnInit(): void {

    this.assetsService.getAssets()
      .then(assets => this.assets = assets);


      this.reactiveForm = this.builder.group({
        search: ['', [Validators.required]]
      });
  }

 
  openDialog() {
    this.dialog.open(OpenFixedassetComponent,{
      width: '98VW'
    });
    
    }


    openDialogMove() {
      this.dialog.open(MoveFixedassetComponent,{
        width: '98VW'
      });
      }
  
      openDialogDown() {
        this.dialog.open(DownFixedassetComponent,{
          width: '98VW'
        });
        }

        openNoRegister() {
          this.dialog.open(NoRegisterComponent,{
            width: '98VW'
          });
          }
    

  cargarDatos() {
    this.assetsService.getAssets()
      .then(assets => this.assets = assets);
  }

  assetPorIde(valor: any) {
   
    // validacion de vacio
    if(valor==""){
      return this.router.navigateByUrl('/fixedAssets');
    }
    
    // transformación rfid 
    if (valor.length > 20){  
      let last8 = valor.substr(valor.length - 8); 
      let hexa = parseInt(last8, 16);
      console.log(hexa);
      console.log(hexa.toString());
      // busca por rfid
      this.assetsService.getAssetPorRfid(hexa.toString()).then(asset => {
        if (!asset) {
          // abre modal de error
          this.openNoRegister();
        }else{
          // si encuentra devuelve id y dirige hacia el asset
          this.asset = asset;
          let route = "fixedAsset/" + asset.id;
          return this.router.navigateByUrl(route);
        }
        
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
            this.openNoRegister();
            //return this.router.navigateByUrl('/fixedAssets');
          }
          this.asset = asset;
          let route = "fixedAsset/" + asset.id;
          return this.router.navigateByUrl(route);
        });
      }
      if (splitted[0].length > 11){ 
        //alert('code: '+ valor);
        //comparar con code y traer id
           this.assetsService.getAssetPorCode(valor).then(asset => {
            if (!asset) {
              this.openNoRegister();
              //return this.router.navigateByUrl('/fixedAssets');
          
            }
            this.asset = asset;
            let route = "fixedAsset/" + asset.id;
            return this.router.navigateByUrl(route);
          });
      }else{
        this.openNoRegister();
      }
    }





    //let id = Number(ide);
    
    //separo en arreglo si el codigo viene con "-"
     










//por id
   /* this.assetsService.getAssetPorId(id).then(asset => {
      if (!asset) {
        return this.router.navigateByUrl('/fixedAssets');
      }
      this.asset = asset;
      let route = "fixedAsset/" + asset.id;
      return this.router.navigateByUrl(route);
    });
*/
   
  







  

 }


/***
 * Toma el valor ingresado por el usuario en el input de busqueda y lo entrega al servicio
 */
search(){
let ide = this.reactiveForm.value.search
ide = ide.toString()
this.assetPorIde(ide);
}


  navigateTo(value) {
    if (value) {
      this.router.navigate([value]);

    }
    return false;
  }




  //modal 
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }




}