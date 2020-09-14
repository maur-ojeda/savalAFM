import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedserviceService } from '../../services/sharedservice.service';
import { AssetsDetailsService } from '../../services/assets-details.service';
import { Asset } from 'src/app/models/asset.model';
import { Observable } from 'rxjs';
import { AssetsService } from '../../services/assets.service';
import { AssetSearchInterface } from 'src/app/interfaces/assetSearch.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WarningComponent } from 'src/app/dialogs/warning/warning.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss']
})
export class AssetDetailsComponent implements OnInit {
  public asset$: Observable<Asset[]>;
  asset = new Asset();
  assets: AssetSearchInterface[] = [];
  assetDate;
  assetCapitalizationDateAt;

  constructor(
    public assetsDetailsService: AssetsDetailsService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public utils: SharedserviceService,
    private snackBar: MatSnackBar,
    private assetsService: AssetsService,
   
  ) { }

  ngOnInit(): void {
    this.inicializacion();
    this.estacargando()

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
      this.dialog.closeAll();
    }).catch(() => console.log('error'))

  }

cargarData(){
  this.snackBar.open('Actualizando datos', '', { panelClass: ['online-snackbar'] });
  this.assetsService.getAssets().then((assets) => { this.assets = assets })
    .finally(() => {
      this.inicializacion();
      this.snackBar.dismiss();
    })
}

  refrescar() {
   this.inicializacion();
  }

  estacargando(){
    let oo = Object.keys(this.asset).length === 0 && this.asset.constructor === Object
    if(oo){
      this.dialog.closeAll();
    }
  }

}
