import { Injectable, Injector } from '@angular/core';
import { Asset } from '../models/asset.model';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class AssetsDeleteService extends BaseService<Asset> {

  
  constructor(
    protected injector:Injector
  ){
    super(injector, 'deleteAsset', 'https://afsaval.agenciasur.cl');
  }





}
