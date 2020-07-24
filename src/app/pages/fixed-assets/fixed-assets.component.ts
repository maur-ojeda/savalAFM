import { Component, OnInit } from '@angular/core';
import { AssetsService } from 'src/app/services/assets.service';
import { AssetInterfase } from 'src/app/interfaces/asset.interface';


@Component({
  selector: 'app-fixed-assets',
  templateUrl: './fixed-assets.component.html',
  styleUrls: ['./fixed-assets.component.scss']
})
export class FixedAssetsComponent implements OnInit {

  assets: AssetInterfase[] = [];
  
  constructor(
    public assetsService: AssetsService

  ) { }

  ngOnInit(): void {

    this.assetsService.getAssets()
    .then( assets => this.assets = assets );
}

  }