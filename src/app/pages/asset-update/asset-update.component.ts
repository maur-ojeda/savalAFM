import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedserviceService} from '../../services/sharedservice.service';
import { AssetsUpdateService } from '../../services/assets-Update.service';
import { Asset } from 'src/app/models/asset.model';
import { Observable } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { WarningComponent } from 'src/app/dialogs/warning/warning.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CcenterService } from 'src/app/services/ccenter.service';
import { CcenterInterface } from 'src/app/interfaces/ccenter.interface';
import { UpdateConfirmationComponent } from 'src/app/dialogs/update-confirmation/update-confirmation.component';
import { AssetsService } from 'src/app/services/assets.service';
import * as moment from 'moment'
import { AssetSearchInterface } from 'src/app/interfaces/assetSearch.interface';



@Component({
  selector: 'app-asset-update',
  templateUrl: './asset-update.component.html',
  styleUrls: ['./asset-update.component.scss']
})
export class AssetUpdateComponent implements OnInit {
  public asset$:Observable<Asset[]>;
  public asset = new Asset();
  assetDate;
  assetCapitalizationDateAt;
  date;
  reactiveForm: FormGroup;
  ccenters: CcenterInterface[] = [];
  assets: AssetSearchInterface[] = [];

  constructor(
    public slCCenterService: CcenterService,
    public assetsUpdateService: AssetsUpdateService,
    private activatedRoute: ActivatedRoute,
    public utils: SharedserviceService,
    private builder: FormBuilder,
    public dialog: MatDialog,
    private assetsService: AssetsService, 

  ) { }

  ngOnInit(): void {

    this.inicializacion();
    this.estacargando()

  
  this.reactiveForm = this.builder.group({
    assetID: ['', []],
    rfidLabelSap: ['',[] ],
    serieNumber: ['', []],
    description: ['', [Validators.required]],
    costCenter: ['', [Validators.required]],
    creditorId: ['', []],
    lifetimeYear: ['', []]
  });



    this.dialog.open(WarningComponent, {
      width: '98VW',
      disableClose: true
    })

  }

  getAssetsData(e) {
   // console.log('getAssetsData:') 
   // console.log(e)
    this.reactiveForm.controls['assetID'].setValue(e.id);
    this.reactiveForm.controls['rfidLabelSap'].setValue(e.rfidLabelSap);
    this.reactiveForm.controls['costCenter'].setValue(e.costCenter.id);
    this.reactiveForm.controls['serieNumber'].setValue(e.serieNumber);
    this.reactiveForm.controls['description'].setValue(e.description);
    this.reactiveForm.controls['creditorId'].setValue(e.creditorId);
    this.reactiveForm.controls['lifetimeYear'].setValue(e.lifetimeYear);
  }

  updateData() {
    this.date = moment(new Date()).format('YYYY-MM-DD HH:MM:ss');
    let rfid = this.reactiveForm.value.rfidLabelSap;

    this.asset.updatedAt = this.date;
    this.asset.id = this.reactiveForm.value.assetID;
    this.asset.rfidLabelSap = this.toRfid(rfid);
    this.asset.serieNumber = this.reactiveForm.value.serieNumber;
    this.asset.description = this.reactiveForm.value.description;
    this.asset.costCenter = this.reactiveForm.value.costCenter;
    this.asset.creditorId = this.reactiveForm.value.creditorId;
    this.asset.lifetimeYear = this.reactiveForm.value.lifetimeYear;
   
    
    
    this.assetsUpdateService.update(this.asset)
  }

  Dialog() {
    const dialogRef = this.dialog.open(UpdateConfirmationComponent,{
          width: '98VW'
    });
    dialogRef.afterClosed().subscribe(result => {
              if(result){
             this.updateData();
              }
    });
  }

  inicializacion() {
    let i = this.activatedRoute.snapshot.paramMap.get('id');
    
    this.assetsService.getAssetPorcode(i).then(asset => {

      this.asset = asset
      this.assetDate = asset['createdAt'].date;
      

  
      
      this.dialog.closeAll();
      this.getAssetsData(this.asset)

      this.slCCenterService.getCcenters()
      .then(ccenters => this.ccenters = ccenters);
  
    }).catch((error) => console.log(error))

  }

  estacargando(){
    let oo = Object.keys(this.asset).length === 0 && this.asset.constructor === Object
    if(oo){
      this.dialog.closeAll();
    }
  }


  refrescar() {
    window.location.reload(false); 
    this.cargarData()
  }


  cargarData(){

    this.dialog.open(WarningComponent, { width: '98VW', disableClose: true })

    this.assetsService.getAssets().then((assets) => { this.assets = assets }).finally(() => { 
      this.inicializacion();
      this.dialog.closeAll(); 
    })

  }

toRfid(val){
    let cod = val
    if (cod.length === 24 ) {
      let last8 = cod.substr(val.length - 8);
      let hexa = parseInt(last8, 16);
      let hexaStr = hexa.toString();
      val = hexaStr
      val = val.toString().padStart(10, "0");
      return val
    }else{
      return 'No es un rfid válido'
    }
  
}


}
