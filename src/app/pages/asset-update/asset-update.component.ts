import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedserviceService} from '../../services/sharedservice.service';
import { AssetsUpdateService } from '../../services/assets-Update.service';
import { Asset } from 'src/app/models/asset.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-asset-update',
  templateUrl: './asset-update.component.html',
  styleUrls: ['./asset-update.component.scss']
})
export class AssetUpdateComponent implements OnInit {
  public asset$:Observable<Asset[]>;

  constructor(
    public assetsUpdateService: AssetsUpdateService,
    private activatedRoute: ActivatedRoute,
    public utils: SharedserviceService
  ) { }

  ngOnInit(): void {
    let code = this.activatedRoute.snapshot.paramMap.get('id');
    this.asset$ = this.assetsUpdateService.findByCode(code);
  }

}
