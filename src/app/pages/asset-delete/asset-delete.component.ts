import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedserviceService} from '../../services/sharedservice.service';
import { AssetsDeleteService } from '../../services/assets-delete.service';
import { Asset } from 'src/app/models/asset.model';
import { Observable } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeleteConfirmationComponent } from 'src/app/dialogs/delete-confirmation/delete-confirmation.component';
import { AssetsService } from 'src/app/services/assets.service';
import * as moment from 'moment'
import { WarningComponent } from 'src/app/dialogs/warning/warning.component';
import { AssetSearchInterface } from 'src/app/interfaces/assetSearch.interface';
@Component({
  selector: 'app-asset-delete',
  templateUrl: './asset-delete.component.html',
  styleUrls: ['./asset-delete.component.scss']
})
export class AssetDeleteComponent implements OnInit {
  assets: AssetSearchInterface[] = [];
  public asset$:Observable<Asset[]>;
  public asset = new Asset();
  reactiveForm: FormGroup;
  date;
  assetDate;
  assetCapitalizationDateAt;
  constructor(
    public assetsDeleteService: AssetsDeleteService,
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
        assetID:['',[]],
        downDocumentAt: ['',[Validators.required]],
        downPostingAt: ['', [Validators.required]],
        downReferenceAt: ['', [Validators.required]],
        downComment: ['', [Validators.required]],
      });

      this.dialog.open(WarningComponent, {
        width: '98VW',
        disableClose: true
      })

    }

    inicializacion() {
      let i = this.activatedRoute.snapshot.paramMap.get('id');
      this.assetsService.getAssetPorcode(i).then(asset => {
        this.asset = asset
        this.assetDate = asset['createdAt'].date;
        this.assetCapitalizationDateAt = asset['capitalizationDateAt'].date;
        this.reactiveForm.controls['assetID'].setValue(asset.id);
        this.dialog.closeAll();   
      }).catch(() => console.log('error'))
  
    }
  
    estacargando(){
      let oo = Object.keys(this.asset).length === 0 && this.asset.constructor === Object
      if(oo){
        this.dialog.closeAll();
      }
    }


    deleteAsset(){
      this.date = moment(new Date()).format('YYYY-MM-DD HH:MM:ss');
      this.asset.updatedAt = this.date;
      this.asset.id = this.reactiveForm.value.assetID; 
      this.asset.downDocumentAt = this.reactiveForm.value.downDocumentAt;
      this.asset.downPostingAt = this.reactiveForm.value.downPostingAt;
      this.asset.downReferenceAt = this.reactiveForm.value.downReferenceAt;
      this.asset.downComment = this.reactiveForm.value.downComment;
      
      this.assetsDeleteService.delete(this.asset);
      console.log(this.asset)
    }


    Dialog() {
      const dialogRef = this.dialog.open(DeleteConfirmationComponent,{
            width: '98VW'
      });
      
      dialogRef.afterClosed().subscribe(result => {
                if(result){
                  this.deleteAsset();
                }
  
      });
    }


    refrescar() {
      this.cargarData()
    }
  
  
    cargarData(){

      this.dialog.open(WarningComponent, { width: '98VW', disableClose: true })

      this.assetsService.getAssets().then((assets) => { this.assets = assets }).finally(() => { 
        this.inicializacion();
        this.dialog.closeAll(); 
      })
    }



  }

