import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedserviceService } from '../../services/sharedservice.service';
import { AssetsDetailsService } from '../../services/assets-details.service';
import { Asset } from 'src/app/models/asset.model';
import { Observable } from 'rxjs';
import { AssetsService } from '../../services/assets.service';
import { AssetSearchInterface } from 'src/app/interfaces/assetSearch.interface';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss']
})
export class AssetDetailsComponent implements OnInit {
  public asset$: Observable<Asset[]>;
  asset = new Asset();
  assets: AssetSearchInterface[] = [];
  code;

  constructor(
    public assetsDetailsService: AssetsDetailsService,
    private activatedRoute: ActivatedRoute,
    public utils: SharedserviceService,
    private snackBar: MatSnackBar,
    private assetsService: AssetsService,
  ) { }

  ngOnInit(): void {

    console.log('this.assets');
    console.log(this.assets);


    if (this.assets.length > 0) {
      alert('contenido')
    }


    const code = this.activatedRoute.snapshot.paramMap.get('id');
    this.assetsDetailsService.findByCode(code).subscribe((ele) => {
      ele
      console.log(ele['data'])
    }

    );

    this.assetsService.getAssetPorcode(code).then(asset => {
      this.asset = asset
    }
    )
      .catch(() => console.log('error'))
    //this.asset$ = this.assetsDetailsService.findByCode(code);




    /*  this.assetsService.getAssets()
      .then((assets) => {
        this.assets = assets
        this.snackBar.open('Actualizando datos', '', { panelClass: ['online-snackbar']});
      }).finally(
        () => {
          this.snackBar.dismiss();
        })
      */


    //this.assetsService.getAssetPorCode( code )
    //.then( asset => this.asset['data'] = asset)



  }

  refrescar() {
    this.snackBar.open('Actualizando datos', '', { panelClass: ['online-snackbar'] });
    this.assetsService.getAssets()
      .then((assets) => { this.assets = assets })
      .finally(() => {
        this.snackBar.dismiss();
        // Cargar nuevamente el asset con los cambios
        // this.assetsService.getAssetPorcode(this.code).then( asset => {this.asset = asset }).catch( () => console.log('error'))
      })
  }
}
