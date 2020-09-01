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
import { AssetSearchInterface } from 'src/app/interfaces/assetSearch.interface';


import { SharedserviceService} from '../../services/sharedservice.service';
import { Asset } from 'src/app/models/asset.model';



@Component({
  selector: 'app-fixed-assets',
  templateUrl: './fixed-assets.component.html',
  styleUrls: ['./fixed-assets.component.scss']
})

export class FixedAssetsComponent implements OnInit {
  assets: AssetSearchInterface[] = [];
  asset: Asset[] = [];
  
  
  reactiveForm: FormGroup;
  
  AssetsService
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
    public dialog: MatDialog,
    public utils: SharedserviceService

  ) { }

  ngOnInit(): void {
    const nonWhitespaceRegExp: RegExp = new RegExp("\\S");
    this.reactiveForm = this.builder.group({
      search: ['', [Validators.required,  Validators.pattern(nonWhitespaceRegExp)]]
    });

    this.assetsService.getAssets()
    .then( assets => this.assets = assets)
  }
 
  // cargar todos los assest

  /** Funcion que busca por numero ingresado **/
  searcho() {
    //alert('buscando')
    let url ="fixedAsset/"
    let valor = this.reactiveForm.value.search
    
    valor  =  valor.replace(/\s/g, "")
    //console.log(valor)

    var splitted = valor.split("-", 2);
    let codigo = splitted[0]
    let subCodigo = splitted[1]

    if( isNaN(codigo) ){

     console.log('buscar por rfid')

    }else if(!isNaN(subCodigo)){
      this.assetsService.getAssetPorreferalCode(valor)
      .then( res => {
        let route = url + res.code;
        return this.router.navigateByUrl(route)
      });
      


   
      


    } else if( !isNaN(codigo) ){
      console.log('buscar codigo sin subcodigo')

    }
    else{      
      alert("No se ha encontrado registro.")
      return this.router.navigateByUrl('/fixedAssets');
    }

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





}

