import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedserviceService} from '../../services/sharedservice.service';
import { AssetsDetailsService } from '../../services/assets-details.service';
import { Asset } from 'src/app/models/asset.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss']
})
export class AssetDetailsComponent implements OnInit {
  public asset$:Observable<Asset[]>;

  constructor(
    public assetsDetailsService: AssetsDetailsService,
    private activatedRoute: ActivatedRoute,
    public utils: SharedserviceService
  ) { }

  ngOnInit(): void {
    let code = this.activatedRoute.snapshot.paramMap.get('id');
    this.asset$ = this.assetsDetailsService.findByCode(code);
  }

}
