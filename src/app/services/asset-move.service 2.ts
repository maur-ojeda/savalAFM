import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { Asset } from '../models/asset.model';

@Injectable({
  providedIn: 'root'
})
export class AssetMoveService extends BaseService<Asset> {

  constructor(protected injector:Injector) { 
    super(injector, 'moveAssets', 'https://afsaval.agenciasur.cl');
  }
}
