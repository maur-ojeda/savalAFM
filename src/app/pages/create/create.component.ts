import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssetsService } from 'src/app/services/assets.service';



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
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {

	//formbuilder	
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
		public assetsService: AssetsService,
		public cClassService: ClassService,
		public specieService: SpecieService,
		public slCCenterService: CcenterService,
		public slCenterService: CenterService,
		public slBuilding: BuildingService,
		public slFloor: FloorService,
		public slArea: AreaService,
		public slRoom: RoomService,
		private builder: FormBuilder,
		private location: Location

	) { }

	ngOnInit() {
		this.cClassService.getcClass()
			.then(cClasses => this.cClasses = cClasses);

		this.specieService.getSpecies()
			.then(species => this.species = species);

		this.slCCenterService.getCcenters()
			.then(CCenters => this.CCenters = CCenters);

		this.slCenterService.getCenters()
			.then(Centers => this.Centers = Centers);


		this.reactiveForm = this.builder.group({
			catalogClass: ['', []],
			specie: ['', []],
			sociedad: ['LS01', []],
			history_check: ['true', []],
			inventory_check: ['true', []],
			assetCount: ["1", []],
			creditorId: ['', []],
			newAsset: ['true', []],
			assetOrigin: ['', []],
			lifetimeYear: ['', []],
			atributo_0: ['', []],
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
			atributo_id_9: ['', []],
			serieNumber: ['', []],
			costCenter: ['', []],
			lCenter: ['', []],
			lBuilding: ['', []],
			lFloor: ['', []],
			lArea: ['', []],
			lRoom: ['', []],
		});
	}
//////////////////////////////////////////////
checkObj(){

let obj1 = {
	"catalogClass": "22",
	"specie": "8",
	"specieAttributes": [
		{ "value": "especie1", "specieAttribute": "108" },
		{ "value": "especie2", "specieAttribute": "111" },
		{ "value": "", "specieAttribute": "" }
	],
	"assetCount": "1", 
	"assetRequestDetails": [
		{
		"serieNumber": "21312312",
		 "costCenter": "1", 
		 "lCenter": "1", 
		 "lBuilding": "4", 
		 "lFloor": "16", 
		 "lArea": "29", 
		 "lRoom": "147" }
		], 
		"creditorId": "33232", 
		"newAsset": "1", 
		"assetOrigin": "", 
		"lifetimeYear": "2"
}


delete obj1.specieAttributes[2];
console.log("data: " + JSON.stringify(obj1));





}

//////////////////////////////////////////////
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


	saveData() {

		let formValue = {
			"catalogClass": this.reactiveForm.value.catalogClass,
			"specie": this.reactiveForm.value.specie,
			"specieAttributes": [
				{
					"value": this.reactiveForm.value.atributo_0, "specieAttribute": this.reactiveForm.value.atributo_id_0
				},

				{
					"value": this.reactiveForm.value.atributo_1,
					"specieAttribute": this.reactiveForm.value.atributo_id_1
				},
				{
					"value": this.reactiveForm.value.atributo_2,
					"specieAttribute": this.reactiveForm.value.atributo_id_2
				},
				{
					"value": this.reactiveForm.value.atributo_3,
					"specieAttribute": this.reactiveForm.value.atributo_id_3
				},
				{
					"value": this.reactiveForm.value.atributo_4,
					"specieAttribute": this.reactiveForm.value.atributo_id_4
				},
				{
					"value": this.reactiveForm.value.atributo_5,
					"specieAttribute": this.reactiveForm.value.atributo_id_5
				},
				{
					"value": this.reactiveForm.value.atributo_6,
					"specieAttribute": this.reactiveForm.value.atributo_id_6
				},
				{
					"value": this.reactiveForm.value.atributo_7,
					"specieAttribute": this.reactiveForm.value.atributo_id_7
				},
				{
					"value": this.reactiveForm.value.atributo_8,
					"specieAttribute": this.reactiveForm.value.atributo_id_8
				},
				{
					"value": this.reactiveForm.value.atributo_9,
					"specieAttribute": this.reactiveForm.value.atributo_id_9
				},
			],
			"assetCount": this.reactiveForm.value.assetCount,
			"assetRequestDetails": [
				{
					"serieNumber": this.reactiveForm.value.serieNumber,
					"costCenter": this.reactiveForm.value.costCenter,
					"lCenter": this.reactiveForm.value.lCenter,
					"lBuilding": this.reactiveForm.value.lBuilding,
					"lFloor": this.reactiveForm.value.lFloor,
					"lArea": this.reactiveForm.value.lArea,
					"lRoom": this.reactiveForm.value.lRoom,
				}
			],
			"creditorId": this.reactiveForm.value.creditorId,
			"newAsset": this.reactiveForm.value.newAsset,
			"assetOrigin": this.reactiveForm.value.assetOrigin,
			"lifetimeYear": this.reactiveForm.value.lifetimeYear
		}
	
		this.assetsService.InsertAssets(formValue);

	}


	goBack() {
		this.location.back();
	}
}



