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
import { CreateConfirmationComponent } from 'src/app/dialogs/create-confirmation/create-confirmation.component';

import { MatDialog } from '@angular/material/dialog';








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
		private location: Location,
		public dialog: MatDialog

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
			catalogClass: ['', [Validators.required]],
			speciefake: ['', [Validators.required]],
			specie: ['', [Validators.required]],
			sociedad: [{ value: 'LS01', disabled: true }, []],
			history_check: [{ value: 'true', disabled: true }, []],
			inventory_check: [{ value: 'true', disabled: true }, []],
			assetCount: ["1", []],
			creditorId: ['', [Validators.required]],
			newAsset: [{ value: 'true', disabled: true }, []],
			assetOrigin: ['', []],
			lifetimeYear: ['', [Validators.required]],
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
			costCenter: ['', [Validators.required]],
			lCenter: ['', [Validators.required]],
			lFloor: ['', []],
			lBuilding: ['', []],
			lArea: ['', []],
			lRoom: ['', []]
		});
//[null]
/*
	
		this.reactiveForm.controls['lBuilding'].disable();
		this.reactiveForm.controls['lFloor'].disable();
		this.reactiveForm.controls['lArea'].disable();
		this.reactiveForm.controls['lRoom'].disable();
*/

/*
		this.reactiveForm.controls['lCenter'].valueChanges
		.subscribe( value => {		
			if ( this.reactiveForm.controls['lBuilding'].value !== '') {
			
				this.reactiveForm.controls['lBuilding'].enable()
				this.setValidatorRequired('lBuilding', Validators.required);
				
			} else {
				this.setValidatorRequired('lBuilding', null);
				}
		})

		if(this.reactiveForm.controls['lBuilding'].touched){
			this.reactiveForm.controls['lFloor'].enable()
			this.setValidatorRequired('lFloor', Validators.required);
		}
		*/	

	/*	if(this.reactiveForm.controls['lFloor'].touched){
			this.reactiveForm.controls['lArea'].enable()
			this.setValidatorRequired('lArea', Validators.required);
		}
			

		if(this.reactiveForm.controls['lArea'].touched){
			this.reactiveForm.controls['lRoom'].enable()
			this.setValidatorRequired('lRoom', Validators.required);
		}
		*/
		
		/*.subscribe( value =>{		
			if ( this.reactiveForm.controls['lBuilding'].value !== '') {
				this.setValidatorRequired('lBuilding', Validators.required);
				} else {
				this.setValidatorRequired('lBuilding', null);
				}
		})*/

	/*	this.reactiveForm.controls['lBuilding'].valueChanges
		.subscribe( value =>{				
			if ( value !== '') {
				this.setValidatorRequired('lFloor', Validators.required);
				} else {
				this.setValidatorRequired('lFloor', null);
				}
		})

		this.reactiveForm.controls['lFloor'].valueChanges
		.subscribe( value =>{				
			if ( value !== '') {
				this.setValidatorRequired('lArea', Validators.required);
				} else {
				this.setValidatorRequired('lArea', null);
				}
		})

		this.reactiveForm.controls['lArea'].valueChanges
		.subscribe( value =>{				
			if ( value !== '') {
				this.setValidatorRequired('lRoom', Validators.required);
				} else {
				this.setValidatorRequired('lRoom', null);
				}
		})
	*/	

	}

	setValidatorRequired(campo, requerido) {		
		this.reactiveForm.controls[campo].setValidators(requerido);
		this.reactiveForm.controls[campo].updateValueAndValidity();				
		}


	onChangeSpecie(e: string) {
		this.specieService.getSpeciesPorId(e)
			.then(obj => this.obj = obj)
			.then(obj => {
				//console.log(obj.id)
				this.reactiveForm.get("specie").setValue(obj.id);
			})

		this.specieService.getSpeciesPorId(e)
			.then(obj => {
				for (let i = 0; i < obj.attributes.length; i++) {
					if (obj.attributes[i] !== null)
						this.reactiveForm.get("atributo_id_" + i).setValue(obj.attributes[i].id);
				}
			})
	}

	onChangeCenter(e: number) {
		this.lBuildings.length = 0
		this.lFloors.length = 0
		this.lAreas.length = 0
		this.lRooms.length = 0
		this.reactiveForm.get('lBuilding').reset();
		this.reactiveForm.get('lFloor').reset();
		this.reactiveForm.get('lArea').reset();
		this.reactiveForm.get('lRoom').reset();
		this.slBuilding.getbuildings(e)
		.then(lBuildings => this.lBuildings = lBuildings)
	}
	onChangeBuilding(e: number) {	
		this.lFloors.length = 0
		this.lAreas.length = 0
		this.lRooms.length = 0
		this.reactiveForm.get('lFloor').reset();
		this.reactiveForm.get('lArea').reset();
		this.reactiveForm.get('lRoom').reset();
		this.slFloor.getfloors(e)
			.then(lFloors => this.lFloors = lFloors)
	}
	onChangeFloor(e: number) {		
		this.lAreas.length = 0
		this.lRooms.length = 0
		this.reactiveForm.get('lArea').reset();
		this.reactiveForm.get('lRoom').reset();
		this.slArea.getareas(e)
			.then(lAreas => this.lAreas = lAreas)

	}
	onChangeArea(e: number) {
		this.lRooms.length = 0
		this.reactiveForm.get('lRoom').reset();
		this.slRoom.getRooms(e)
			.then(lRooms => this.lRooms = lRooms)
	}

	saveData() {
		let formValue = {
			"catalogClass": this.reactiveForm.value.catalogClass,
			"specie": this.reactiveForm.value.specie,
			"specieAttributes": [
				{
					"value": this.reactiveForm.value.atributo_0,
					"specieAttribute": this.reactiveForm.value.atributo_id_0
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
					"costCenter": this.reactiveForm.value.costCenter,
					"lArea": this.reactiveForm.value.lArea,
					"lBuilding": this.reactiveForm.value.lBuilding,
					"lCenter": this.reactiveForm.value.lCenter,
					"lFloor": this.reactiveForm.value.lFloor,
					"lRoom": this.reactiveForm.value.lRoom,
					"serieNumber": this.reactiveForm.value.serieNumber,
				}
			],
			"creditorId": this.reactiveForm.value.creditorId,
			"newAsset": this.reactiveForm.value.newAsset,
			//"assetOrigin": this.reactiveForm.value.assetOrigin,
			"lifetimeYear": this.reactiveForm.value.lifetimeYear,
		}
		//console.log(JSON.stringify(formValue));
		this.assetsService.InsertAssets(formValue);
		//this.reactiveForm.reset();//todo:mejorar mandar al detalle de asset
	}

	goBack() {
		this.location.back();
	}

	Dialog() {
		const dialogRef = this.dialog.open(CreateConfirmationComponent, {
			width: '98VW'
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.saveData();
			}
		});
	}


}





