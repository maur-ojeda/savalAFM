import { Injectable, Injector } from '@angular/core';
import { Asset } from '../models/asset.model';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class AssetsMoveService extends BaseService<Asset> {

  
  constructor(
    protected injector:Injector
  ){
    super(injector, 'assetMove', 'https://afsaval.agenciasur.cl');
  }

}
