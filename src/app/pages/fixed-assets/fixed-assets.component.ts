import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../services/assets.service';
import { AssetInterface } from '../../interfaces/asset.interface';
import { Router } from '@angular/router';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-fixed-assets',
  templateUrl: './fixed-assets.component.html',
  styleUrls: ['./fixed-assets.component.scss']
})




export class FixedAssetsComponent implements OnInit {

  assets: AssetInterface[] = [];
  asset: AssetInterface;


  closeResult = '';

  constructor(
    private assetsService: AssetsService,

    private modalService: NgbModal,
    private router: Router) { }

  ngOnInit(): void {


    this.assetsService.getAssets()
      .then(assets => this.assets = assets);


  }

  cargarDatos() {
    this.assetsService.getAssets()
      .then(assets => this.assets = assets);
  }

  assetPorIde(ide: any) {

    console.log('inicio');
console.log(ide);
    //separo en arreglo si el codigo viene con "-"
    var splitted = ide.split("-", 3);
    console.log(splitted[0]) //codigo
    console.log(splitted[1]) //guion
    console.log(splitted[2]) //subcodigo

    
    if (splitted[1] != undefined) {
      //console.log('code');
      if (splitted[0].length > 11) {
        //console.log('code' + splitted[0]);
        this.assetsService.getAssetPorCode(splitted[0]).then(asset => {
          if (!asset) {
            return this.router.navigateByUrl('/fixedAssets');
          }
          this.asset = asset;
          let route = "fixedAsset/" + asset.code;
          return this.router.navigateByUrl(route);
        });
      }
    }else{
      console.log('rfid');
      if(splitted[0].length <= 11){
         this.assetsService.getAssetPorrfid( ide ).then( asset => {
           if ( !asset ) {
             return this.router.navigateByUrl('/fixedAssets');
           }
           this.asset = asset;
          let route = "fixedAsset/"+asset.code;
         return this.router.navigateByUrl(route);
         });
       }
     
    }



  }

  onSubmit(f ){
console.log(f.value);
}


  /*
  buscador(buscado:any){
  
    this.assetsService.getAssetPorValue(buscado)
  
    /*this.assetsService.getAssetPorId( ide ).then( asset => {
      if ( !asset ) {
        return this.router.navigateByUrl('/');
      }
      this.asset = asset;
      console.log( asset );
    });
  }
  */






  //000005009383



  navigateTo(value) {
    if (value) {
      this.router.navigate([value]);

    }
    return false;
  }


  navigateToUpdate(value) {
    if (value) {
      this.router.navigate([value]);
    }
    return false;
  }

  navigateToMove(value) {
    if (value) {
      this.router.navigate([value]);

    }
    return false;
  }

  navigateToDelete(value) {
    if (value) {
      this.router.navigate([value]);

    }
    return false;
  }




  /*
  myFunction(): void { 
    alert(this.val); 
     
  } 
  onOptionsSelected(value:string){
    console.log("the selected value is " + value);
  }
  
  
  */


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