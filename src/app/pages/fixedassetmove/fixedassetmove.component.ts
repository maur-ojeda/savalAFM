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
import { CenterService } from 'src/app/services/center.service';
import { BuildingService } from 'src/app/services/building.service';
import { FloorService } from 'src/app/services/floor.service';
import { AreaService } from 'src/app/services/area.service';
import { RoomService } from 'src/app/services/room.service';
import { CenterInterface } from 'src/app/interfaces/center.interface';
import { BuildingInterface } from 'src/app/interfaces/building.interface';
import { FloorInterface } from 'src/app/interfaces/floor.interface';
import { AreaInterface } from 'src/app/interfaces/area.interface';
import { RoomInterface } from 'src/app/interfaces/room.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AssetSearchInterface } from 'src/app/interfaces/assetSearch.interface';
import { MoveConfirmationComponent } from 'src/app/dialogs/move-confirmation/move-confirmation.component';
import {MatDialog} from '@angular/material/dialog';
import * as moment from 'moment';



@Component({
  selector: 'app-fixedassetmove',
  templateUrl: './fixedassetmove.component.html',
  styleUrls: ['./fixedassetmove.component.scss']
})
export class FixedassetmoveComponent implements OnInit {

 // assets: AssetSearchInterface[] = [];
 // asset: AssetSearchInterface[] = [];

  assets;
  asset;
  locations: LocationInterface[] = [];
  CCenters: CcenterInterface[] = [];
  species: SpeciesInterface[] = [];
  reactiveForm: FormGroup;
	Centers: CenterInterface[] = [];
	lBuildings: BuildingInterface[] = [];
	lFloors: FloorInterface[] = [];
	lAreas: AreaInterface[] = [];
	lRooms: RoomInterface[] = [];


  constructor(
    public assetsService: AssetsService,
    public locationsService: LocationsService,
    public slCCenterService: CcenterService,
    public specieService: SpecieService,
    public slCenterService: CenterService,
		public slBuilding: BuildingService,
		public slFloor: FloorService,
		public slArea: AreaService,
		public slRoom: RoomService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location ,
    private builder: FormBuilder,
    private http: HttpClient,
    public dialog: MatDialog 
  ) { }


  ngOnInit(): void {
 //getcode
 let code = this.activatedRoute.snapshot.paramMap.get('id');
 this.assetsService.getAssetsData( code ).then( asset => {
   if ( !asset ) {
   return this.router.navigateByUrl('/');
 }
 this.asset = asset;
 this.getAssetsData(asset)
});
//getcode



  this.slCCenterService.getCcenters()
  .then(CCenters => this.CCenters = CCenters);

    this.slCenterService.getCenters()
    .then(Centers => this.Centers = Centers);

    this.slBuilding.getallBuildings()
    .then(lBuildings => this.lBuildings = lBuildings);

    this.slFloor.getallFloors()
    .then(lFloors => this.lFloors = lFloors);

    this.slArea.getallAreas()
    .then(lAreas => this.lAreas = lAreas)

    this.slRoom.getallRooms()
    .then(lRooms => this.lRooms = lRooms)
      
    
  

    this.reactiveForm = this.builder.group({
      assetID:['',[]],
      costCenter: ['',[]],
      lCenter: ['', [Validators.required]],
      lBuilding: ['', [Validators.required]],
      lFloor: ['', [Validators.required]],
      lArea: ['', [Validators.required]],
      lRoom: ['', [Validators.required]]
    });




  }


  getAssetsData(e) {
  
    this.reactiveForm.controls['assetID'].setValue(e.id);
    this.reactiveForm.controls['costCenter'].setValue(e.costCenter.id);
    this.reactiveForm.controls['lCenter'].setValue(e.lCenter);
    this.reactiveForm.controls['lBuilding'].setValue(e.lBuilding);
    this.reactiveForm.controls['lFloor'].setValue(e.lFloor);
    this.reactiveForm.controls['lArea'].setValue(e.lArea);
    this.reactiveForm.controls['lRoom'].setValue(e.lRoom);

  }

  moveData(){

    let ide = this.reactiveForm.value.assetID;

    let formValue = {
      "costCenter": this.reactiveForm.value.costCenter,
      "lCenter": this.reactiveForm.value.lCenter,
      "lBuilding": this.reactiveForm.value.lBuilding,
      "lFloor": this.reactiveForm.value.lFloor,
      "lArea": this.reactiveForm.value.lArea,
      "lRoom": this.reactiveForm.value.lRoom
    }


    //console.log(JSON.stringify(formValue));
    this.assetsService.moveAssets(formValue, ide);


  }


  goBack() {
    this.location.back();
  }

 	onChangeCenter() {
    let e = this.reactiveForm.controls['lCenter'].value
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
  
	onChangeBuilding() {	
    let e = this.reactiveForm.controls['lBuilding'].value
		this.lFloors.length = 0
		this.lAreas.length = 0
		this.lRooms.length = 0
		this.reactiveForm.get('lFloor').reset();
		this.reactiveForm.get('lArea').reset();
		this.reactiveForm.get('lRoom').reset();
		this.slFloor.getfloors(e)
			.then(lFloors => this.lFloors = lFloors)
	}
	onChangeFloor() {
    let e = this.reactiveForm.controls['lFloor'].value		
		this.lAreas.length = 0
		this.lRooms.length = 0
		this.reactiveForm.get('lArea').reset();
		this.reactiveForm.get('lRoom').reset();
		this.slArea.getareas(e)
			.then(lAreas => this.lAreas = lAreas)

	}
	onChangeArea() {
    let e = this.reactiveForm.controls['lArea'].value
		this.lRooms.length = 0
		this.reactiveForm.get('lRoom').reset();
		this.slRoom.getRooms(e)
			.then(lRooms => this.lRooms = lRooms)
	}





  Dialog() {
    const dialogRef = this.dialog.open(MoveConfirmationComponent,{
          width: '98VW'
    });
    dialogRef.afterClosed().subscribe(result => {

              if(result){
                this.moveData();
              }

    });
  }
   
/**
 * transforma fecha 
*/
formatDate(f) {
  let dateInFormat = moment(f).format('DD-MM-YYYY HH:MM');
  return dateInFormat
}


refresh(){

  location.reload(true)

}

}
