import { Injectable, Injector } from '@angular/core';
import { Asset } from '../models/asset.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AssetsDetailsService extends BaseService<Asset> {

  
  constructor(
    protected injector:Injector
  ){
    super(injector, 'asset', 'https://afsaval.agenciasur.cl');
  }
x

}
