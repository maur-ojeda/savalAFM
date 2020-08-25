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


@Component({
  selector: 'app-asset-update',
  templateUrl: './asset-update.component.html',
  styleUrls: ['./asset-update.component.scss']
})
export class AssetUpdateComponent implements OnInit {
  public asset$:Observable<Asset[]>;
  reactiveForm: FormGroup;
  ccenters: CcenterInterface[] = [];

  constructor(
    public slCCenterService: CcenterService,
    public assetsUpdateService: AssetsUpdateService,
    private activatedRoute: ActivatedRoute,
    public utils: SharedserviceService,
    private builder: FormBuilder,
    public dialog: MatDialog 
  ) { }

  ngOnInit(): void {
    let code = this.activatedRoute.snapshot.paramMap.get('id');
    this.asset$ = this.assetsUpdateService.findByCode(code);
    this.asset$.subscribe(
      (asset)=>{this.getAssetsData(asset) }
    )


    this.slCCenterService.getCcenters()
      .then(ccenters => this.ccenters = ccenters);

    this.reactiveForm = this.builder.group({
      assetID: ['', []],
      rfidLabelSap: ['',[] ],
      serieNumber: ['', []],
      description: ['', [Validators.required]],
      costCenter: ['', [Validators.required]],
      creditorId: ['', []],
      lifetimeYear: ['', []]
    });

  }



  getAssetsData(i) {
   let e = i['data'];
    console.log(e)
    this.reactiveForm.controls['assetID'].setValue(e.id);
    this.reactiveForm.controls['rfidLabelSap'].setValue(e.rfidLabelSap);
    this.reactiveForm.controls['costCenter'].setValue(e.costCenter.id);
    this.reactiveForm.controls['serieNumber'].setValue(e.serieNumber);
    this.reactiveForm.controls['description'].setValue(e.description);
    this.reactiveForm.controls['creditorId'].setValue(e.creditorId);
    this.reactiveForm.controls['lifetimeYear'].setValue(e.lifetimeYear);
  }

  updateData() {
    let ide = this.reactiveForm.value.assetID;
    let formValue = {
      "rfidLabelSap": this.reactiveForm.value.rfidLabelSap,
      "serieNumber": this.reactiveForm.value.serieNumber,
      "description": this.reactiveForm.value.description,
      "costCenter": this.reactiveForm.value.costCenter,
      "creditorId": this.reactiveForm.value.creditorId,
      "lifetimeYear": this.reactiveForm.value.lifetimeYear
    }

   console.log(JSON.stringify(formValue))
   console.log(JSON.stringify(ide))
    //this.assetsService.updateAssets(formValue, ide);
   
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


}
