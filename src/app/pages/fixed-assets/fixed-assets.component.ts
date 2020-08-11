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
  asset: AssetInterface[] = [];

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

   alert('v8')
   
    /* 
    this.assetsService.getAssets()
       .then(assets => this.assets = assets);
   */

    this.reactiveForm = this.builder.group({
      search: ['', [Validators.required]]
    });
  }

  //Dialogos
  openDialog() {
    this.dialog.open(OpenFixedassetComponent, {
      width: '98VW'
    });

  }
  openDialogMove() {
    this.dialog.open(MoveFixedassetComponent, {
      width: '98VW'
    });
  }
  openDialogDown() {
    this.dialog.open(DownFixedassetComponent, {
      width: '98VW'
    });
  }
  openNoRegister() {
    this.dialog.open(NoRegisterComponent, {
      width: '98VW'
    });
  }


  cargarDatos() {
    this.assetsService.getAssets()
      .then(assets => this.assets = assets);
  }

  assetPorIde(valor: any) {
    if (valor == "") {
      alert('vacio');
      return this.router.navigateByUrl('/fixedAssets');
    }
    if (valor.length > 20) {
      let last8 = valor.substr(valor.length - 8);
      let hexa = parseInt(last8, 16);
      this.assetsService.getAssetsIdSearch(hexa)
      .then( asset => {
        if (!asset) {
          this.openNoRegister();
        } else {
          this.asset = asset
          let route = "fixedAsset/" + asset.data.code;
          return this.router.navigateByUrl(route);
        }
      })
    } else {
      this.assetsService.getAssetsIdSearch(valor)
      .then( asset => {
        if (!asset) {
          this.openNoRegister();
        } else {
          this.asset = asset
          let route = "fixedAsset/" + asset.data.code;
          return this.router.navigateByUrl(route);
        }
      })
    }

  }



  /***
   * Buscador principal
   */
  search() {
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