import { Component, OnInit } from '@angular/core';
import { AssetInterface } from 'src/app/interfaces/asset.interface';
import { AssetsService } from 'src/app/services/assets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LocationsService } from 'src/app/services/locations.service';
import { LocationInterface } from 'src/app/interfaces/location.interface';
import { CcenterInterface } from 'src/app/interfaces/ccenter.interface';
import { CcenterService } from 'src/app/services/ccenter.service';
import { SpecieService } from 'src/app/services/specie.service';
import { SpeciesInterface } from 'src/app/interfaces/specie.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-fixedassetmove',
  templateUrl: './fixedassetmove.component.html',
  styleUrls: ['./fixedassetmove.component.scss']
})
export class FixedassetmoveComponent implements OnInit {

  asset: AssetInterface;
  locations: LocationInterface[] = [];
  ccenters: CcenterInterface[] = [];
  species: SpeciesInterface[] = [];
  reactiveForm: FormGroup;

  constructor(
    public assetsService: AssetsService,
    public locationsService: LocationsService,
    public ccentersService: CcenterService,
    public specieService: SpecieService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location ,
    private builder: FormBuilder
    
  ) { }


  ngOnInit(): void {

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    let ide = Number(id);

    this.locationsService.getlocations()
    .then( locations => this.locations = locations );
   

    this.ccentersService.getCcenters()
    .then(ccenters => this.ccenters = ccenters );
   

    this.specieService.getSpecies()
    .then(species => this.species = species );
   


    this.reactiveForm = this.builder.group({

      assetID:['',[]],
      rfidLabelFake: ['', []],
      rfidLabelSap: ['', []],
      serieNumber: ['', []],
      description: ['', []],
      costCenter: ['', []],
      creditorId: ['', []],
      lifetimeYear: ['', []]
		});
  }

  goBack() {
    this.location.back();
  }

}
/*
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

}
*/