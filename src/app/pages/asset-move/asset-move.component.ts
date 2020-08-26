import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedserviceService} from '../../services/sharedservice.service';
import { AssetsMoveService } from '../../services/assets-Move.service';
import { Asset } from 'src/app/models/asset.model';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocationInterface } from 'src/app/interfaces/location.interface';
import { CcenterInterface } from 'src/app/interfaces/ccenter.interface';
import { SpeciesInterface } from 'src/app/interfaces/specie.interface';
import { CenterInterface } from 'src/app/interfaces/center.interface';
import { BuildingInterface } from 'src/app/interfaces/building.interface';
import { FloorInterface } from 'src/app/interfaces/floor.interface';
import { AreaInterface } from 'src/app/interfaces/area.interface';
import { RoomInterface } from 'src/app/interfaces/room.interface';
import { LocationsService } from 'src/app/services/locations.service';
import { CcenterService } from 'src/app/services/ccenter.service';
import { SpecieService } from 'src/app/services/specie.service';
import { CenterService } from 'src/app/services/center.service';
import { BuildingService } from 'src/app/services/building.service';
import { FloorService } from 'src/app/services/floor.service';
import { AreaService } from 'src/app/services/area.service';
import { RoomService } from 'src/app/services/room.service';
import { MoveConfirmationComponent } from 'src/app/dialogs/move-confirmation/move-confirmation.component';
import {MatDialog} from '@angular/material/dialog';



@Component({
  selector: 'app-asset-move',
  templateUrl: './asset-move.component.html',
  styleUrls: ['./asset-move.component.scss']
})
export class AssetMoveComponent implements OnInit {
  public asset$:Observable<Asset[]>;
  reactiveForm: FormGroup;
  locations: LocationInterface[] = [];
  CCenters: CcenterInterface[] = [];
  species: SpeciesInterface[] = [];
	Centers: CenterInterface[] = [];
	lBuildings: BuildingInterface[] = [];
	lFloors: FloorInterface[] = [];
	lAreas: AreaInterface[] = [];
	lRooms: RoomInterface[] = [];

  constructor(
    public assetsMoveService: AssetsMoveService,
    private activatedRoute: ActivatedRoute,
    public utils: SharedserviceService,
    private builder: FormBuilder,
    public locationsService: LocationsService,
    public slCCenterService: CcenterService,
    public specieService: SpecieService,
    public slCenterService: CenterService,
		public slBuilding: BuildingService,
		public slFloor: FloorService,
		public slArea: AreaService,
    public slRoom: RoomService,
    public dialog: MatDialog 
  ) { }
  ngOnInit(): void {
    let code = this.activatedRoute.snapshot.paramMap.get('id');
    this.asset$ = this.assetsMoveService.findByCode(code);
 
    this.asset$.subscribe(
      (asset)=>{this.getAssetsData(asset) }
    );

    this.slCCenterService.getCcenters()
  .then(CCenters => this.CCenters = CCenters);

    

    this.slBuilding.getallBuildings()
    .then(lBuildings => this.lBuildings = lBuildings);

    this.slFloor.getallFloors()
    .then(lFloors => this.lFloors = lFloors);

    this.slArea.getallAreas()
    .then(lAreas => this.lAreas = lAreas)

    this.slRoom.getallRooms()
    .then(lRooms => this.lRooms = lRooms)

    this.slCenterService.getCenters()
    .then(Centers => this.Centers = Centers);
    


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
  getAssetsData(i) {
    let e = i['data'];
    this.reactiveForm.controls['assetID'].setValue(e.id);
    this.reactiveForm.controls['costCenter'].setValue(e.costCenter.id);
    this.reactiveForm.controls['lCenter'].setValue(e.lCenter.id);
    this.reactiveForm.controls['lBuilding'].setValue(e.lBuilding.id);
    this.reactiveForm.controls['lFloor'].setValue(e.lFloor.id);
    this.reactiveForm.controls['lArea'].setValue(e.lArea.id);
    this.reactiveForm.controls['lRoom'].setValue(e.lRoom.id);
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
   moveData(){
    let ide = this.reactiveForm.value.assetID;
    let formValue = {
      "lCenter": this.reactiveForm.value.lCenter,
      "lBuilding": this.reactiveForm.value.lBuilding,
      "lFloor": this.reactiveForm.value.lFloor,
      "lArea": this.reactiveForm.value.lArea,
      "lRoom": this.reactiveForm.value.lRoom,
      "costCenter": this.reactiveForm.value.costCenter,
      
      
    }
    console.log(JSON.stringify(formValue));
    console.log(JSON.stringify(ide));
    //this.assetsService.moveAssets(formValue, ide);
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
   



}
