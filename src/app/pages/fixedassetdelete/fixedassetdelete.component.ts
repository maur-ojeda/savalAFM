import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../services/assets.service';
import { ActivatedRoute, Router } from '@angular/router';
import {AssetInterface } from '../../interfaces/asset.interface';
import { Location } from '@angular/common';


@Component({
  selector: 'app-fixedassetdelete',
  templateUrl: './fixedassetdelete.component.html',
  styleUrls: ['./fixedassetdelete.component.scss']
})
export class FixedassetdeleteComponent implements OnInit {

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

