import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../services/assets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetInterfase } from '../../interfaces/asset.interface';

@Component({
  selector: 'app-fixedasset',
  templateUrl: './fixedasset.component.html',
  styleUrls: ['./fixedasset.component.scss']
})
export class FixedassetComponent implements OnInit {
  
  asset: AssetInterfase;

  constructor(
    public assetsService: AssetsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

 
//debe ser el mismo parametro usado para buscar
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    
    //console.log( id );
  
    this.assetsService.getAssetPorId( id ).then( asset => {

      if ( !asset ) {
        return this.router.navigateByUrl('/');
      }

      this.asset = asset;
      console.log( asset );

    });

  }

}
