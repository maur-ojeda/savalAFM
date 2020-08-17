import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestInterface } from 'src/app/interfaces/request.interface';
import { RequestsService } from 'src/app/services/requests.service';



import { SpeciesInterface } from 'src/app/interfaces/specie.interface';
import { SpecieService } from 'src/app/services/specie.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-fixed-asset-closed',
  templateUrl: './fixed-asset-closed.component.html',
  styleUrls: ['./fixed-asset-closed.component.scss']
})
export class FixedAssetClosedComponent implements OnInit {
  reactiveForm: FormGroup;
  request: RequestInterface;
  species: SpeciesInterface[] = [];
  obj: SpeciesInterface;
  
  constructor(
   public requestsService: RequestsService,
   private activatedRoute: ActivatedRoute,
   public specieService: SpecieService,
   private router: Router,
   private location: Location,
   private builder: FormBuilder, 
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    let ide = parseInt(id)
    this.requestsService.getRequestsPorId( ide ).then( request => {
      if ( !request ) {
        return this.router.navigateByUrl('/');
      }
      this.request = request;
    });

    this.specieService.getSpecies()
    .then(species => this.species = species);
    

    this.reactiveForm = this.builder.group({
			catalogClass: ['', []],
      specie: ['', []],
      description: ['', []],
			//sociedad: ['LS01', []],
			//history_check: ['true', []],
			//inventory_check: ['true', []],
			//assetCount: ["1", []],
      
      creditorId: ['', []],
      newAsset: ['true', []],
      
			assetOrigin: ['', []],
      lifetimeYear: ['', []],
      lifetimeYear15: ['',[]],
			/*atributo_0: ['', []],
			atributo_id_0: ['', []],
			atributo_1: ['', []],
			atributo_id_1: ['', []],
			atributo_2: ['', []],
			atributo_id_2: ['', []],
			atributo_3: ['', []],
			atributo_id_3: ['', []],
			atributo_4: ['', []],
			atributo_id_4: ['', []],
			atributo_5: ['', []],
			atributo_id_5: ['', []],
			atributo_6: ['', []],
			atributo_id_6: ['', []],
			atributo_7: ['', []],
			atributo_id_7: ['', []],
			atributo_8: ['', []],
			atributo_id_8: ['', []],
			atributo_9: ['', []],
      atributo_id_9: ['', []],*/
      
			serieNumber: ['', []],
			costCenter: ['', []],
			lCenter: ['', []],
			lBuilding: ['', []],
			lFloor: ['', []],
			lArea: ['', []],
			lRoom: ['', []],
		});



  }

  goBack() {
    this.location.back();
  }


	onChangeSpecie(e: string) {
		this.specieService.getSpeciesPorId(e)
			.then(obj => this.obj = obj)
		this.specieService.getSpeciesPorId(e)
			.then(obj => {
				for (let i = 0; i < obj.attributes.length; i++) {
					if (obj.attributes[i] !== null)
						this.reactiveForm.get("atributo_id_" + i).setValue(obj.attributes[i].id);
				}
			})
	}




  updateData() {

		let formValue = {
			
		}
	
		//this.assetsService.InsertAssets(formValue);

    alert('ok');

	}

    /**
 * transforma fecha 
*/
formatDate(f) {
	let dateInFormat = moment(f).format('DD-MM-YYYY HH:MM');
	return dateInFormat
  }



}

