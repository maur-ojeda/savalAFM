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
@Component({
  selector: 'app-asset-delete',
  templateUrl: './asset-delete.component.html',
  styleUrls: ['./asset-delete.component.scss']
})
export class AssetDeleteComponent implements OnInit {
  public asset$:Observable<Asset[]>;
  public asset = new Asset();
  reactiveForm: FormGroup;
  date;
  constructor(
    public assetsDeleteService: AssetsDeleteService,
    private activatedRoute: ActivatedRoute,
    public utils: SharedserviceService,
    private builder: FormBuilder,
    public dialog: MatDialog ,
    private assetsService: AssetsService,

  ) { }

  ngOnInit(): void {

    let code = this.activatedRoute.snapshot.paramMap.get('id');

//checkear si esta online o offline


//offline  
      this.assetsService.getAssetPorcode(code).then( asset => {
        this.asset = asset
        this.reactiveForm.controls['assetID'].setValue(asset.id);
      } )
      .catch( () => console.log('error') )
      
//online
      //this.asset$ = this.utils.findByCode(code);



   
      this.reactiveForm = this.builder.group({
        assetID:['',[]],
        downDocumentAt: ['',[Validators.required]],
        downPostingAt: ['', [Validators.required]],
        downReferenceAt: ['', [Validators.required]],
        downComment: ['', [Validators.required]],
      });

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


  }

