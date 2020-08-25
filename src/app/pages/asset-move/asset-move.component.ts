import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedserviceService} from '../../services/sharedservice.service';
import { AssetsMoveService } from '../../services/assets-Move.service';
import { Asset } from 'src/app/models/asset.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-asset-move',
  templateUrl: './asset-move.component.html',
  styleUrls: ['./asset-move.component.scss']
})
export class AssetMoveComponent implements OnInit {
  public asset$:Observable<Asset[]>;

  constructor(
    public assetsMoveService: AssetsMoveService,
    private activatedRoute: ActivatedRoute,
    public utils: SharedserviceService
  ) { }

  ngOnInit(): void {
    let code = this.activatedRoute.snapshot.paramMap.get('id');
    this.asset$ = this.assetsMoveService.findByCode(code);
  }

}
