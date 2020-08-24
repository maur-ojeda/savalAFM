import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { Asset } from '../models/asset.model';

@Injectable({
  providedIn: 'root'
})
export class AssetDetailService extends BaseService<Asset> {

  constructor(
    protected injector:Injector
    ) {
    super(injector, 'assets', 'https://afsaval.agenciasur.cl');
  }
}
