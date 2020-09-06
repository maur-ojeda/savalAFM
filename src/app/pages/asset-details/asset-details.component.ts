import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedserviceService} from '../../services/sharedservice.service';
import { AssetsDetailsService } from '../../services/assets-details.service';
import { Asset } from 'src/app/models/asset.model';
import { Observable } from 'rxjs';
import { AssetsService } from '../../services/assets.service';


@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss']
})
export class AssetDetailsComponent implements OnInit {
  public asset$:Observable<Asset[]>;
  public asset  = new Asset();

  constructor(
    public assetsDetailsService: AssetsDetailsService,
    private activatedRoute: ActivatedRoute,
    public utils: SharedserviceService,
    private assetsService: AssetsService
  ) { }

  ngOnInit(): void {

    
    //Se obtiene el code del asstet
    let code = this.activatedRoute.snapshot.paramMap.get('id');

    // si esta online busqueda api
   
   this.assetsDetailsService.findByCodeIn(code).subscribe(
      (asseto)=>{ this.asset$  =  asseto['data']
      console.log('online')
      console.log(this.asset$) }
      )    

  //si esta ofline busqueda cache
    this.assetsService.getAssetPorcode(code).then( asset => {
      this.asset = asset
      console.log('offline')
      console.log(asset)
    } 
    )
    .catch( () => console.log('error') ) 


  }




}





   
