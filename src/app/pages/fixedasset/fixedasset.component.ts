import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../services/assets.service';
import {AssetInterface } from '../../interfaces/asset.interface';
import { ActivatedRoute, Router } from '@angular/router';

import { Location } from '@angular/common';



@Component({
  selector: 'app-fixedasset',
  templateUrl: './fixedasset.component.html',
  styleUrls: ['./fixedasset.component.scss']
})
export class FixedassetComponent implements OnInit {
  

  panelOpenState = false;
  
  asset: AssetInterface;
  asseto: AssetInterface;
  

  constructor(
    public assetsService: AssetsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,

  ) {  }


  ngOnInit(): void {
   
this.router.routeReuseStrategy.shouldReuseRoute = () => { 
  return false;
}


    let id = this.activatedRoute.snapshot.paramMap.get('id');
    let ide = Number(id);
 

    this.assetsService.getAssetPorId( ide ).then( asset => {
      if ( !asset ) {
        return this.router.navigateByUrl('/');
      }
      this.asset = asset;
     
    });

  

  }

  goBack() {
    this.location.back();
  }
 

  refreshPage() {
    window.location.reload();

   }

}


  