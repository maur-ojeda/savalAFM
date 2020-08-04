import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../services/assets.service';
import { AssetInterface } from '../../interfaces/asset.interface';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';




import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OpenFixedassetComponent } from 'src/app/dialogs/open-fixedasset/open-fixedasset.component';
import { MoveFixedassetComponent } from 'src/app/dialogs/move-fixedasset/move-fixedasset.component';
import { DownFixedassetComponent } from 'src/app/dialogs/down-fixedasset/down-fixedasset.component';



@Component({
  selector: 'app-fixed-assets',
  templateUrl: './fixed-assets.component.html',
  styleUrls: ['./fixed-assets.component.scss']
})




export class FixedAssetsComponent implements OnInit {
  assets: AssetInterface[] = [];
  asset: AssetInterface;
  
  animal: string;
  name: string;
  
  closeResult = '';

  constructor(
    private assetsService: AssetsService,
    private modalService: NgbModal,
    private router: Router,
    public dialog: MatDialog
    
    ) { }

  ngOnInit(): void {


    this.assetsService.getAssets()
      .then(assets => this.assets = assets);
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
    




  cargarDatos() {
    this.assetsService.getAssets()
      .then(assets => this.assets = assets);
  }

  assetPorIde(ide: any) {
   
    if(ide==""){
      return this.router.navigateByUrl('/fixedAssets');
    }
    
    
    
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