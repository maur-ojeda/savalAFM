import { Component, OnInit } from '@angular/core';
import { AssetInterface } from 'src/app/interfaces/asset.interface';
import { AssetsService } from 'src/app/services/assets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LocationsService } from 'src/app/services/locations.service';
import { LocationInterface } from 'src/app/interfaces/location.interface';

@Component({
  selector: 'app-fixedassetmove',
  templateUrl: './fixedassetmove.component.html',
  styleUrls: ['./fixedassetmove.component.scss']
})
export class FixedassetmoveComponent implements OnInit {

  asset: AssetInterface;
  locations: LocationInterface[] = [];

  constructor(
    public assetsService: AssetsService,
    public locationsService: LocationsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location 
    
  ) { }


  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.locationsService.getlocations()
    .then( locations => this.locations = locations );
   

    this.assetsService.getAssetPorId( id ).then( asset => {
      if ( !asset ) {
        return this.router.navigateByUrl('/');
      }
    
      this.asset = asset;
    });

  }
  goBack() {
    this.location.back();
  }

}
