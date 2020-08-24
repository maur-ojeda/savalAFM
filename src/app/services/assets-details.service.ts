import { Injectable, Injector } from '@angular/core';
import { Asset } from '../models/asset.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AssetsDetailsService extends BaseService<Asset> {

  constructor(
    protected injctor:Injector
  ) { }
}
