import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedserviceService} from '../../services/sharedservice.service';
import { AssetsDeleteService } from '../../services/assets-delete.service';
import { Asset } from 'src/app/models/asset.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-asset-delete',
  templateUrl: './asset-delete.component.html',
  styleUrls: ['./asset-delete.component.scss']
})
export class AssetDeleteComponent implements OnInit {
  public asset$:Observable<Asset[]>;
  

  constructor(
    public assetsDeleteService: AssetsDeleteService,
    private activatedRoute: ActivatedRoute,
    public utils: SharedserviceService
  ) { }

  ngOnInit(): void {
      let code = this.activatedRoute.snapshot.paramMap.get('id');
      this.asset$ = this.assetsDeleteService.findByCode(code);
    }
  }

