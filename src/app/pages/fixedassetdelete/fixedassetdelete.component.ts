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
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    let ide = Number(id);

    this.assetsService.getAssetPorId( ide ).then( asset => {
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

