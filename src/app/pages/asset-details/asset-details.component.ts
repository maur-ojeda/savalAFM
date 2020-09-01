import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedserviceService} from '../../services/sharedservice.service';
import { AssetsDetailsService } from '../../services/assets-details.service';
import { Asset } from 'src/app/models/asset.model';
import { Observable } from 'rxjs';
import { AssetInterface } from '../../interfaces/asset.interface';

import { AssetsService } from '../../services/assets.service';



@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss']
})
export class AssetDetailsComponent implements OnInit {
  public asset$:Observable<Asset[]>;
  asset: Asset[] = [];
  constructor(
    public assetsDetailsService: AssetsDetailsService,
    private activatedRoute: ActivatedRoute,
    public utils: SharedserviceService,

    private assetsService: AssetsService,
  ) { }

  ngOnInit(): void {
    let code = this.activatedRoute.snapshot.paramMap.get('id');
    //this.asset$ = this.assetsDetailsService.findByCode(code);

    this.asset$ = this.assetsDetailsService.findByCode(code);


    
    
    this.assetsService.getAssetPorCode( code )
    .then( asset => this.asset['data'] = asset)

    console.log(this.asset['data'])
    
    

    
  }

}
