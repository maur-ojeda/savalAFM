import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../services/assets.service';
//import { AssetInterface } from '../../interfaces/asset.interface';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OpenFixedassetComponent } from 'src/app/dialogs/open-fixedasset/open-fixedasset.component';
import { MoveFixedassetComponent } from 'src/app/dialogs/move-fixedasset/move-fixedasset.component';
import { DownFixedassetComponent } from 'src/app/dialogs/down-fixedasset/down-fixedasset.component';
import { NoRegisterComponent } from 'src/app/dialogs/no-register/no-register.component';
import { AssetSearchInterface } from 'src/app/interfaces/assetSearch.interface';


@Component({
  selector: 'app-fixed-assets',
  templateUrl: './fixed-assets.component.html',
  styleUrls: ['./fixed-assets.component.scss']
})

export class FixedAssetsComponent implements OnInit {
  assets: AssetSearchInterface[] = [];
  asset: AssetSearchInterface[] = [];
  reactiveForm: FormGroup;
  ide;
  hexa;
  element;
  /*desuse*/
  closeResult = '';
  


  constructor(
    private assetsService: AssetsService,
    private modalService: NgbModal,
    private router: Router,
    private builder: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.reactiveForm = this.builder.group({
      search: ['', [Validators.required]]
    });
  }
 

  /** Funcion que busca por numero ingresado*/
  search() {
    let ide = this.reactiveForm.value.search
    ide = ide.toString()
    this.assetPorIde(ide);
  }

/**Funcion que navega a la url correspondiente */
  navigateTo(value) {
    if (value) {
      this.router.navigate([value]);
    }
    return false;
  }


  //Dialogos
  /**
   *Dialog for updatefixed assets
  */
  openDialog() {
    this.dialog.open(OpenFixedassetComponent, {
      width: '98VW'
    });
  }

/**
   *Dialog for move fixed assets
  */
  openDialogMove() {
    this.dialog.open(MoveFixedassetComponent, {
      width: '98VW'
    });
  }

  /**
   *Dialog for down fixed assets
  */
  openDialogDown() {
    this.dialog.open(DownFixedassetComponent, {
      width: '98VW'
    });
  }
  /**
   *Dialog for no find fixed asstes
  */
  openNoRegister() {
    this.dialog.open(NoRegisterComponent, {
      width: '98VW'
    });
  }
  /**
   *get assets
  */
  cargarDatos() {
    this.assetsService.getAssets()
      .then(assets => this.assets = assets);
  }



  assetPorIde(valor: any ) {
    //alert('desde buscador: ' +  valor  )
   if (valor == null) {      
      return this.router.navigateByUrl('/fixedAssets');
    }
    if (valor == '') {
      alert('vacio ingrese un número')
      return this.router.navigateByUrl('/fixedAssets');
    } 

    this.assetsService.getAssetsCode(valor)
      .then( asset => {
        if (!asset) {
          this.openNoRegister();
        } else {
          this.asset = asset
          let route = "fixedAsset/" + asset['data'].code;
         return this.router.navigateByUrl(route);
        }
      }).catch(err => 
        this.openNoRegister()
        )
  }


  
  onClickSubmit(data){


let c = data.code.substring(0, 24);
alert(c)

    alert('Codigo recogido por formulario' + JSON.stringify(data)) 
    //this.assetPorIde(data.code);
    this.assetsService.getAssetsCode(c)
    .then( asset => {
      if (!asset) {
        this.openNoRegister();
      } else {
        this.asset = asset
        let route = "fixedAsset/" + asset['data'].code;
       return this.router.navigateByUrl(route);
      }
    }).catch(err => 
      this.openNoRegister()
      )



     


  }


  /***
   * Buscador principal
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

