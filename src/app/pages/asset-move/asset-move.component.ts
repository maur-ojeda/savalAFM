import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedserviceService } from '../../services/sharedservice.service';
import { AssetsMoveService } from '../../services/assets-Move.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpeciesInterface } from 'src/app/interfaces/specie.interface';
import { LocationsService } from 'src/app/services/locations.service';
import { SpecieService } from 'src/app/services/specie.service';
import { LocationInterface } from 'src/app/interfaces/location.interface';
import { CcenterInterface } from 'src/app/interfaces/ccenter.interface';
import { CcenterService } from 'src/app/services/ccenter.service';
import { CenterInterface } from 'src/app/interfaces/center.interface';
import { CenterService } from 'src/app/services/center.service';
import { BuildingInterface } from 'src/app/interfaces/building.interface';
import { BuildingService } from 'src/app/services/building.service';
import { FloorInterface } from 'src/app/interfaces/floor.interface';
import { FloorService } from 'src/app/services/floor.service';
import { AreaInterface } from 'src/app/interfaces/area.interface';
import { AreaService } from 'src/app/services/area.service';
import { RoomInterface } from 'src/app/interfaces/room.interface';
import { RoomService } from 'src/app/services/room.service';
import { MoveConfirmationComponent } from 'src/app/dialogs/move-confirmation/move-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { Asset } from 'src/app/models/asset.model';
import { AssetsService } from 'src/app/services/assets.service';
import * as moment from 'moment'
import { AssetSearchInterface } from 'src/app/interfaces/assetSearch.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WarningComponent } from 'src/app/dialogs/warning/warning.component';

@Component({
  selector: 'app-asset-move',
  templateUrl: './asset-move.component.html',
  styleUrls: ['./asset-move.component.scss']
})
export class AssetMoveComponent implements OnInit {

  public asset$: Observable<Asset[]>;
  public asset = new Asset();
  update;

  assetDate;
  assetCapitalizationDateAt;
  assetlCenterId;
  assetlCenterCode;
  assetlCenterName;

  assetlBuildingId;
  assetlBuildingCode;
  assetlBuildingName;

  assetlFloorId;
  assetlFloorCode;
  assetlFloorName;

  assetlAreaId;
  assetlAreaCode;
  assetlAreaName;

  assetlRoomId;
  assetlRoomCode;
  assetlRoomName;

  reactiveForm: FormGroup;
  locations: LocationInterface[] = [];
  species: SpeciesInterface[] = [];

  CCenters: CcenterInterface[] = [];
  Centers: CenterInterface[] = [];
  lBuildings: BuildingInterface[] = [];
  lFloors: FloorInterface[] = [];
  lAreas: AreaInterface[] = [];
  lRooms: RoomInterface[] = [];
  assets: AssetSearchInterface[] = [];
  code;
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
    public dialog: MatDialog,
    private assetsService: AssetsService,
    private snackBar: MatSnackBar,
  ) { }
  ngOnInit(): void {
    this.inicializacion();
    this.estacargando()
    
    this.reactiveForm = this.builder.group({
      assetID: ['', []],
      costCenter: ['', []],
      lCenter: ['', [Validators.required]],
      lBuilding: ['', [Validators.required]],
      lFloor: ['', [Validators.required]],
      lArea: ['', [Validators.required]],
      lRoom: ['', [Validators.required]]
    });
    this.dialog.open(WarningComponent, {
      width: '98VW',
      disableClose: true
    })
  }
  getAssetsData(e) {
    console.log('aqui')
    this.reactiveForm.get('costCenter').patchValue(e.costCenter.id);
    console.log('costCenter: ' + e.costCenter.id)
    console.log('lCenter: ' + e.lCenter.id)
    console.log('lBuilding: '+ e.lBuilding.id)
    console.log('lFloor: '+ e.lFloor.id)
    console.log('lArea: '+ e.lArea.id)
    console.log('lRoom: '+ e.lRoom.id)

    this.reactiveForm.controls['assetID'].setValue(e.id);

    this.reactiveForm.get('lCenter').patchValue(e.lCenter.id);
    this.reactiveForm.get('lBuilding').patchValue(e.lBuilding.id);
    this.reactiveForm.get('lFloor').patchValue(e.lFloor.id_location);
    this.reactiveForm.get('lArea').patchValue(e.lArea.id_location);
    this.reactiveForm.get('lRoom').patchValue(e.lRoom.id_location);





    

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
    this.lBuildings = this.locationsService.getchild('parent', e)
    //console.log(this.lBuildings);
  }
  onChangeBuilding() {
    let e = this.reactiveForm.controls['lBuilding'].value
    this.lFloors.length = 0
    this.lAreas.length = 0
    this.lRooms.length = 0
    this.reactiveForm.get('lFloor').reset();
    this.reactiveForm.get('lArea').reset();
    this.reactiveForm.get('lRoom').reset();
    this.lFloors = this.locationsService.getchild('parent', e)
    //console.log(this.lFloors);
  }
  onChangeFloor() {
    let e = this.reactiveForm.controls['lFloor'].value
    this.lAreas.length = 0
    this.lRooms.length = 0
    this.reactiveForm.get('lArea').reset();
    this.reactiveForm.get('lRoom').reset();
    this.lAreas = this.locationsService.getchild('parent', e)
    //console.log(this.lAreas);
  }
  onChangeArea() {
    let e = this.reactiveForm.controls['lArea'].value
    this.lRooms.length = 0
    this.reactiveForm.get('lRoom').reset();
    this.lRooms = this.locationsService.getchild('parent', e)
    //console.log(this.lRooms);
  }
  moveData() {
    this.update = moment(new Date()).format('YYYY-MM-DD HH:MM:ss');
    this.asset.updatedAt = this.update;
    this.asset.id = this.reactiveForm.value.assetID;
    this.asset.lCenter = this.reactiveForm.value.lCenter,
    this.asset.lBuilding = this.reactiveForm.value.lBuilding,
    this.asset.lFloor = this.reactiveForm.value.lFloor,
    this.asset.lArea = this.reactiveForm.value.lArea,
    this.asset.lRoom = this.reactiveForm.value.lRoom,
    this.asset.costCenter = this.reactiveForm.value.costCenter
    this.assetsMoveService.move(this.asset);
  }
  Dialog() {
    const dialogRef = this.dialog.open(MoveConfirmationComponent, {
      width: '98VW'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.moveData();
      }
    });
  }

  refrescar() {
  
    this.cargarData()
  }

  inicializacion() {

    let i = this.activatedRoute.snapshot.paramMap.get('id');
    this.assetsService.getAssetPorcode(i).then(asset => {
      this.asset = asset
      this.assetDate = asset['createdAt'].date
      this.assetlCenterId = asset['lCenter'].id
      this.assetlCenterCode = asset['lCenter'].code
      this.assetlCenterName = asset['lCenter'].name
      this.assetlFloorId = asset['lFloor'].id
      this.assetlFloorCode = asset['lFloor'].code
      this.assetlFloorName = asset['lFloor'].name
      this.assetlBuildingId = asset['lBuilding'].id
      this.assetlBuildingCode = asset['lBuilding'].code
      this.assetlBuildingName = asset['lBuilding'].name
      this.assetlAreaId = asset['lArea'].id
      this.assetlAreaCode = asset['lArea'].code
      this.assetlAreaName = asset['lArea'].name
      this.assetlRoomId = asset['lRoom'].id
      this.assetlRoomCode = asset['lRoom'].code
      this.assetlRoomName = asset['lRoom'].name

      this.getAssetsData( this.asset )

      this.locationsService.getlocations().then(locations => {
        this.locations = locations
      //  console.log('locations')
      //  console.log(locations)
      })    
      this.slCCenterService.getCcenters().then(CCenters => {
        this.CCenters = CCenters
      //  console.log('CCenters')
      //  console.log(CCenters)
      });
      this.slCenterService.getCenters().then(Centers => {this.Centers = Centers 
      //  console.log('Centers')
      //  console.log(Centers)
      });
      this.slBuilding.getallBuildings().then(lBuildings => {this.lBuildings = lBuildings 
      //  console.log('lBuildings')
      //  console.log(lBuildings)
      });
      this.slFloor.getallFloors().then(lFloors => {
        this.lFloors = lFloors
      //  console.log('lFloors')
      //  console.log(lFloors)
      });
      this.slArea.getallAreas().then(lAreas => {this.lAreas = lAreas
      //  console.log('lAreas')
      //  console.log(lAreas)
      })
      this.slRoom.getallRooms().then(lRooms => {this.lRooms = lRooms
      //  console.log('lRooms')
      //  console.log(lRooms)
      })
  
      this.assetsService.getAssets().then((assets) => { this.assets = assets }).finally(() => { 
        this.dialog.closeAll(); 
      })


    }).catch(() => console.log('error'))
  }
  

  estacargando(){
    let oo = Object.keys(this.asset).length === 0 && this.asset.constructor === Object
    if(oo){
      this.dialog.closeAll();
    }
  }

  cargarData() {
    this.dialog.open(WarningComponent, { width: '98VW', disableClose: true })

    this.locationsService.getlocations().then(locations => this.locations = locations)    

    this.slCCenterService.getCcenters().then(CCenters => this.CCenters = CCenters);

    this.slCenterService.getCenters().then(Centers => this.Centers = Centers);
    this.slBuilding.getallBuildings().then(lBuildings => this.lBuildings = lBuildings);
    this.slFloor.getallFloors().then(lFloors => this.lFloors = lFloors);
    this.slArea.getallAreas().then(lAreas => this.lAreas = lAreas)
    this.slRoom.getallRooms().then(lRooms => this.lRooms = lRooms)

    this.assetsService.getAssets().then((assets) => { this.assets = assets }).finally(() => { 
      this.inicializacion();
      this.dialog.closeAll(); 
    })
  }

}
