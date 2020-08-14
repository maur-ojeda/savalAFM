/*import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestInterface } from 'src/app/interfaces/request.interface';
import { RequestsService } from 'src/app/services/requests.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { cClassInterface } from 'src/app/interfaces/class.interface';
import { ClassService } from 'src/app/services/class.service';

import { SpeciesInterface } from 'src/app/interfaces/specie.interface';
import { SpecieService } from 'src/app/services/specie.service';


import { CcenterService } from 'src/app/services/ccenter.service';
import { CcenterInterface } from 'src/app/interfaces/ccenter.interface';


import { RoomService } from 'src/app/services/room.service';
import { RoomInterface } from 'src/app/interfaces/room.interface';


import { AreaService } from 'src/app/services/area.service';
import { AreaInterface } from 'src/app/interfaces/area.interface';

import { FloorService } from 'src/app/services/floor.service';
import { FloorInterface } from 'src/app/interfaces/floor.interface';


import { BuildingService } from 'src/app/services/building.service';
import { BuildingInterface } from 'src/app/interfaces/building.interface';


import { CenterInterface } from 'src/app/interfaces/center.interface';
import { CenterService } from 'src/app/services/center.service';


@Component({
  selector: 'app-fixed-asset-rejected',
  templateUrl: './fixed-asset-rejected.component.html',
  styleUrls: ['./fixed-asset-rejected.component.scss']
})
export class FixedAssetRejectedComponent implements OnInit {

  request: RequestInterface;
  reactiveForm: FormGroup;
  cClasses: cClassInterface[] = [];
  species: SpeciesInterface[] = [];
  obj: SpeciesInterface;
  CCenters: CcenterInterface[] = [];
  Centers: CenterInterface[] = [];
  lBuildings: BuildingInterface[] = [];
  lFloors: FloorInterface[] = [];
  lAreas: AreaInterface[] = [];
  lRooms: RoomInterface[] = [];
  


  constructor(
   public requestsService: RequestsService,
   private activatedRoute: ActivatedRoute,
   private router: Router,
   private location: Location,
   private builder: FormBuilder,
   public cClassService: ClassService,
		public specieService: SpecieService,
		public slCCenterService: CcenterService,
		public slCenterService: CenterService,
		public slBuilding: BuildingService,
		public slFloor: FloorService,
		public slArea: AreaService,
		public slRoom: RoomService,
	



  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
	let ide = parseInt(id)
	
    this.requestsService.getRequestsPorId( ide ).then( request => {
      if ( !request ) {
        return this.router.navigateByUrl('/');
      }
	  this.request = request;

	  this.getRequestData(request);

	
    });

	this.cClassService.getcClass()
			.then(cClasses => this.cClasses = cClasses);

		this.specieService.getSpecies()
			.then(species => this.species = species);

		this.slCCenterService.getCcenters()
			.then(CCenters => this.CCenters = CCenters);

		this.slCenterService.getCenters()
			.then(Centers => this.Centers = Centers);

    this.reactiveForm = this.builder.group({
			specie: ['', []],
			catalogClass: ['', []],
      		description: ['', []],
			creditorId: ['', []],
			newAsset: ['true', []],
			assetOrigin: ['', []],
			lifetimeYear: ['', []],
			lifetimeYear15: ['',[]],
			serieNumber: ['', []],
			costCenter: ['', []],
			lCenter: ['', []],
			lBuilding: ['', []],
			lFloor: ['', []],
			lArea: ['', []],
			lRoom: ['', []],
		});
  }

/**
 *  selecciona las opciones por defecto en los selects
*/
/*
getRequestData(e){

	this.onChangeCenter(e.assetRequestDetails[0].lCenter.id);
	this.onChangeBuilding(e.assetRequestDetails[0].lBuilding.id) 
	this.onChangeFloor(e.assetRequestDetails[0].lFloor.id) 
	this.onChangeArea(e.assetRequestDetails[0].lArea.id)

	this.reactiveForm.controls['catalogClass'].setValue(e.catalogClass.id);
	this.reactiveForm.controls['specie'].setValue(e.specie.id);
	this.reactiveForm.controls['costCenter'].setValue(e.assetRequestDetails[0].costCenter.id);
	this.reactiveForm.controls['lCenter'].setValue(e.assetRequestDetails[0].lCenter.id);
	this.reactiveForm.controls['lBuilding'].setValue(e.assetRequestDetails[0].lBuilding.id);
	this.reactiveForm.controls['lFloor'].setValue(e.assetRequestDetails[0].lFloor.id);
	this.reactiveForm.controls['lArea'].setValue(e.assetRequestDetails[0].lArea.id);
	this.reactiveForm.controls['lRoom'].setValue(e.assetRequestDetails[0].lRoom.id);
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
	onChangeCenter(e: number) {
		this.reactiveForm.get('lBuilding').reset();
		this.reactiveForm.get('lFloor').reset();
		this.reactiveForm.get('lArea').reset();
		this.reactiveForm.get('lRoom').reset();
		this.slBuilding.getbuildings(e)
			.then(lBuildings => this.lBuildings = lBuildings)
			.then(la => { console.log(la) });
	}
	onChangeBuilding(e: number) {
		this.reactiveForm.get('lFloor').reset();
		this.reactiveForm.get('lArea').reset();
		this.reactiveForm.get('lRoom').reset();
		this.slFloor.getfloors(e)
			.then(lFloors => this.lFloors = lFloors)
			.then(la => { console.log(la) });
	}
	onChangeFloor(e: number) {
		this.reactiveForm.get('lArea').reset();
		this.reactiveForm.get('lRoom').reset();
		this.slArea.getareas(e)
			.then(lAreas => this.lAreas = lAreas)
			.then(la => { console.log(la) });
	}
	onChangeArea(e: number) {
		this.reactiveForm.get('lRoom').reset();
		this.slRoom.getRooms(e)
			.then(lRooms => this.lRooms = lRooms)
			.then(la => { console.log(la) });
	}






  updateData() {

		let formValue = {
			
		}
	
		//this.assetsService.InsertAssets(formValue);

    alert('ok');

	}



}

*/
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestInterface } from 'src/app/interfaces/request.interface';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
	selector: 'app-fixed-asset-rejected',
	templateUrl: './fixed-asset-rejected.component.html',
	styleUrls: ['./fixed-asset-rejected.component.scss']
  })
  export class FixedAssetRejectedComponent implements OnInit {

  request: RequestInterface;

  constructor(  
    public requestsService: RequestsService,
    private location: Location ,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    let ide = parseInt(id)
    this.requestsService.getRequestsPorId( ide ).then( request => {
      if ( !request ) {
        return this.router.navigateByUrl('/');
      }
    
      this.request = request;
      //console.log( request );
    });
    
  }

  goBack() {
    this.location.back();
  }

}

