import { Component, OnInit } from '@angular/core';
import { AssetInterface } from 'src/app/interfaces/asset.interface';
import { AssetsService } from 'src/app/services/assets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-fixedassetmove',
  templateUrl: './fixedassetmove.component.html',
  styleUrls: ['./fixedassetmove.component.scss']
})
export class FixedassetmoveComponent implements OnInit {

  asset: AssetInterface;

  constructor(
    public assetsService: AssetsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location 
    
  ) { }


  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.assetsService.getAssetPorId( id ).then( asset => {
      if ( !asset ) {
        return this.router.navigateByUrl('/');
      }
    
      this.asset = asset;
      console.log( asset );
    });

  }
  goBack() {
    this.location.back();
  }

}
