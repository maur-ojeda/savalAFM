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
import { Network } from '@ngx-pwa/offline';
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
  assetlCenterSelected;

  assetlBuildingId;
  assetlBuildingCode;
  assetlBuildingName;
  assetlBuildingSelected;

  assetlFloorId;
  assetlFloorCode;
  assetlFloorName;
  assetlFloorSelected;

  assetlAreaId;
  assetlAreaCode;
  assetlAreaName;
  assetlAreaSelected;

  assetlRoomId;
  assetlRoomCode;
  assetlRoomName;
  assetlRoomSelected;

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
  online$;
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
    protected network: Network,
  ) {this.online$ = this.network.onlineChanges;}
  
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

    
    //  console.log('costCenter: ' + e.costCenter.id)
    //  console.log('lCenter: ' + e.lCenter.id)
    //  console.log('lBuilding: '+ e.lBuilding.id)
    // console.log('lFloor: '+ e.lFloor.id)
    // console.log('lArea: '+ e.lArea.id)
    // console.log('lRoom: '+ e.lRoom.id)
    this.reactiveForm.get('costCenter').patchValue(e.costCenter.id);
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
    this.lRooms = this.locationsService.getchild('parent', e)

    setTimeout(function(){ 
      this.lRooms.length = 0
      this.reactiveForm.get('lRoom').reset();
     }, 150);


  }
  onChangeRoom() {
    this.lRooms.length = 0
    this.reactiveForm.get('lRoom').reset()
    let e = this.reactiveForm.controls['lRoom'].value
    this.lRooms = this.locationsService.getchild('parent', e)
  }
  


  moveData() {
    this.update = moment(new Date()).format('YYYY-MM-DD HH:MM:ss');
    this.asset.updatedAt = this.update;
    this.asset.id = this.reactiveForm.value.assetID;
    this.asset.costCenter = this.reactiveForm.value.costCenter

    let c:any = this.locationsService.getLocationid(this.reactiveForm.value.lCenter)
    let b:any = this.locationsService.getLocationid(this.reactiveForm.value.lBuilding)
    let f:any = this.locationsService.getLocationid(this.reactiveForm.value.lFloor)
    let a:any = this.locationsService.getLocationid(this.reactiveForm.value.lArea)
    let r:any = this.locationsService.getLocationid(this.reactiveForm.value.lRoom)

this.asset.lCenter = c,
this.asset.lBuilding = b,
this.asset.lFloor = f,
this.asset.lArea = a,
this.asset.lRoom = r,
/*
    this.asset.lCenter = this.reactiveForm.value.lCenter,
    this.asset.lBuilding = this.reactiveForm.value.lBuilding,
    this.asset.lFloor = this.reactiveForm.value.lFloor,
    this.asset.lArea = this.reactiveForm.value.lArea,
    this.asset.lRoom = this.reactiveForm.value.lRoom,
  */  



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
    window.location.reload(false); 
    this.cargarData()
  }

  inicializacion() {

    let i = this.activatedRoute.snapshot.paramMap.get('id');

    this.assetsService.getAssetPorcode(i).then(asset => {
      this.asset = asset
      this.assetDate = asset['createdAt'].date


      // this.reactiveForm.get('lCenter').patchValue(lcenterl[0].id);
      // this.reactiveForm.get('lCenter').patchValue(lbuildingl[0].id);

      /*
      let lcenter = this.locationsService.getchildrens( lcenterl, null )
      let lbuilding = this.locationsService.getchildrens( lbuildingl, lcenter[0].id )
      let lfloor = this.locationsService.getchildrens( lfloorl, lbuilding[0].id )
      */

      //let larea = this.locationsService.getchildrens(lareal,  lbuilding[0].id )
      // 
      // let lroom = this.locationsService.getchildrens( lrooml, lfloor[0].id )


      //console.table(lcenterl[0].id)

      //console.log('lbuilding')
      //console.table(lbuildingl)

      /*  
            console.log('lfloor')
            console.table(lfloorl)
            
            console.log('larea')
            console.table(lareal)
      
            console.log('lroom')
            console.table(lrooml)
      
      */


      this.getAssetsData(this.asset)

      this.locationsService.getlocations().then(locations => {
        this.locations = locations
      }).finally(() => {

        let lcenterll = this.locationsService.getLocation(asset['lCenter'])
        let lcenterl = this.locationsService.getchildrens(lcenterll, null)
        let lcenterlid = lcenterl[0]['id']
        let lbuildingll = this.locationsService.getLocation(asset['lBuilding'])
        let lbuildingl = this.locationsService.getchildrens(lbuildingll, lcenterlid)
        let lbuildinglid = lbuildingl[0]['id']
        let lfloorll = this.locationsService.getLocation(asset['lFloor'])
        let lfloorl = this.locationsService.getchildrens(lfloorll, lbuildinglid)
        let lfloorlid = lfloorl[0]['id'];
        let lareall = this.locationsService.getLocation(asset['lArea'])
        let lareal = this.locationsService.getchildrens(lareall, lfloorlid)
        let larealid = lareal[0]['id']
        let lroomll = this.locationsService.getLocation(asset['lRoom'])
        let lrooml = this.locationsService.getchildrens(lroomll, larealid)
        let lroomlid = lrooml[0]['id']





        let cType = lcenterl[0]['type']
        let cParent = lcenterl[0]['parent']
        let c = this.locationsService.getAllLocation(cType,cParent)
        //console.log(c)  


        let bType = lbuildingl[0]['type']
        let bParent = lbuildingl[0]['parent']
        let b = this.locationsService.getAllLocation(bType,bParent)
        //console.log(b)   




        let fType = lfloorl[0]['type']
        let fParent = lfloorl[0]['parent']
        let f = this.locationsService.getAllLocation(fType,fParent)
        //console.log(f)   


        let aType = lareal[0]['type']
        let aParent = lareal[0]['parent']
        let a = this.locationsService.getAllLocation(aType,aParent)
        //console.log(a)   

      let rType = lrooml[0]['type']
      let rParent = lrooml[0]['parent']
      let r = this.locationsService.getAllLocation(rType,rParent)
      //console.log(r) 

       this.Centers = c
       this.lBuildings = b
       this.lFloors = f
       this.lAreas = a
      this.lRooms = r
        
/*
        this.getAssetsData(this.asset)
        console.dir('lcenterl')
        console.table(lcenterl)
        console.table('lbuildingl')
        console.table(lbuildingl)
        console.table('lfloorl')
        console.table(lfloorl)
        console.table('lareal')
        console.table(lareal)
        console.table('lrooml')
        console.table(lrooml)
*/

    this.reactiveForm.get('costCenter').patchValue(asset.costCenter.id);
    this.reactiveForm.controls['assetID'].setValue(asset.id);

    this.reactiveForm.get('lCenter').patchValue(lcenterlid);
    this.reactiveForm.get('lBuilding').patchValue(lbuildinglid);
    this.reactiveForm.get('lFloor').patchValue(lfloorlid);
    this.reactiveForm.get('lArea').patchValue(larealid);
    this.reactiveForm.get('lRoom').patchValue(lroomlid);
      })

      this.slCCenterService.getCcenters().then(CCenters => {
        this.CCenters = CCenters
      });
     
     
      /*
      this.slCenterService.getCenters().then(Centers => {
        this.Centers = Centers
      });
      this.slBuilding.getallBuildings().then(lBuildings => {
        this.lBuildings = lBuildings
      });
      this.slFloor.getallFloors().then(lFloors => {
        this.lFloors = lFloors
      });
      this.slArea.getallAreas().then(lAreas => {
        this.lAreas = lAreas
      })
     
      this.slRoom.getallRooms().then(lRooms => {
        this.lRooms = lRooms
      })
*/


      this.assetsService.getAssets().then((assets) => { this.assets = assets }).finally(() => {
        this.dialog.closeAll();
      })

    }).catch((rr) => console.log(rr))
  }

  estacargando() {
    let oo = Object.keys(this.asset).length === 0 && this.asset.constructor === Object
    if (oo) {
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
