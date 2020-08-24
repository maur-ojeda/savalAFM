import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedserviceService} from '../../services/sharedservice.service';

import { AssetsDetailsService } from '../../services/assets-details.service';
//import { AssetsService } from '../../services/assets.service';
import { Asset } from 'src/app/models/asset.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fixedasset',
  templateUrl: './fixedasset.component.html',
  styleUrls: ['./fixedasset.component.scss']
})

export class FixedassetComponent implements OnInit {
  public asset$:Observable<Asset[]>;

  constructor(
    public assetsDetailsService: AssetsDetailsService,
    private activatedRoute: ActivatedRoute,
    public utils: SharedserviceService
  ) {  }


  ngOnInit(): void {
    let code = this.activatedRoute.snapshot.paramMap.get('id');
    this.asset$ = this.assetsDetailsService.findByCode(code);
	}
}
