import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedserviceService} from '../../services/sharedservice.service';
import { AssetsDeleteService } from '../../services/assets-delete.service';
import { Asset } from 'src/app/models/asset.model';
import { Observable } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeleteConfirmationComponent } from 'src/app/dialogs/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-asset-delete',
  templateUrl: './asset-delete.component.html',
  styleUrls: ['./asset-delete.component.scss']
})
export class AssetDeleteComponent implements OnInit {
  public asset$:Observable<Asset[]>;
  public asset = new Asset();
  reactiveForm: FormGroup;

  constructor(
    public assetsDeleteService: AssetsDeleteService,
    private activatedRoute: ActivatedRoute,
    public utils: SharedserviceService,
    private builder: FormBuilder,
    public dialog: MatDialog 

  ) { }

  ngOnInit(): void {
      let code = this.activatedRoute.snapshot.paramMap.get('id');
      this.asset$ = this.utils.findByCode(code);
      this.asset$.subscribe((e)=>{
        this.reactiveForm.controls['assetID'].setValue(e['data'].id);
      });
   
      this.reactiveForm = this.builder.group({
        assetID:['',[]],
        downDocumentAt: ['',[Validators.required]],
        downPostingAt: ['', [Validators.required]],
        downReferenceAt: ['', [Validators.required]],
        downComment: ['', [Validators.required]],
      });

    }



    deleteAsset(){
      /*let ide = ; 
      let formValue = {
        "downDocumentAt": this.reactiveForm.value.downDocumentAt,
        "downPostingAt": this.reactiveForm.value.downPostingAt,
        "downReferenceAt": this.reactiveForm.value.downReferenceAt,
        "downComment": this.reactiveForm.value.downComment
      }*/
 
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

