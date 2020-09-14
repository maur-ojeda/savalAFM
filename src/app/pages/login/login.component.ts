import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/user.service';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginErrorComponent } from 'src/app/dialogs/login-error/login-error.component';
import { SharedserviceService } from '../../services/sharedservice.service';

import { LocationInterface } from 'src/app/interfaces/location.interface';
import { LocationsService } from 'src/app/services/locations.service';


import { CcenterService } from 'src/app/services/ccenter.service';
import { CcenterInterface } from 'src/app/interfaces/ccenter.interface';


import { RequestInterface } from 'src/app/interfaces/request.interface';
import { RequestsService } from 'src/app/services/requests.service';
import { AssetsService } from '../../services/assets.service';
import { AssetSearchInterface } from 'src/app/interfaces/assetSearch.interface';
import { WarningComponent } from 'src/app/dialogs/warning/warning.component';
import { SpecieService } from 'src/app/services/specie.service';
import { CenterService } from 'src/app/services/center.service';
import { BuildingService } from 'src/app/services/building.service';
import { FloorService } from 'src/app/services/floor.service';
import { AreaService } from 'src/app/services/area.service';
import { RoomService } from 'src/app/services/room.service';
import { SpeciesInterface } from 'src/app/interfaces/specie.interface';
import { CenterInterface } from 'src/app/interfaces/center.interface';
import { BuildingInterface } from 'src/app/interfaces/building.interface';
import { FloorInterface } from 'src/app/interfaces/floor.interface';
import { AreaInterface } from 'src/app/interfaces/area.interface';
import { RoomInterface } from 'src/app/interfaces/room.interface';
import { ClassService } from 'src/app/services/class.service';
import { cClassInterface } from 'src/app/interfaces/class.interface';
//import { BuildingInterface } from '../interfaces/building.interface';
//

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  email: string;
  password: string;
  user: UserInterface[] = [];
  reactiveForm: FormGroup;
  requestOptions;
  fieldTextType: boolean;
  showSpinner: boolean;
  assets: AssetSearchInterface[] = [];
  requests: RequestInterface[] = [];
  locations: LocationInterface[] = [];
  CCenters: CcenterInterface[] = [];
  species: SpeciesInterface[] = [];
	Centers: CenterInterface[] = [];
	lBuildings: BuildingInterface[] = [];
	lFloors: FloorInterface[] = [];
	lAreas: AreaInterface[] = [];
	lRooms: RoomInterface[] = [];
  cClasses: cClassInterface[] = [];

  constructor(
    private userService: UsersService,
    private router: Router,
    private builder: FormBuilder,
    public dialog: MatDialog,
    private assetsService: AssetsService,
    private requestsService: RequestsService,
    private locationsService: LocationsService,
    public slCCenterService: CcenterService,
    public utils: SharedserviceService,
    public specieService: SpecieService,
    public slCenterService: CenterService,
		public slBuilding: BuildingService,
		public slFloor: FloorService,
		public slArea: AreaService,
    public slRoom: RoomService,
    public cClassService: ClassService,
    

  ) { }

  ngOnInit(): void {
    const nonWhitespaceRegExp: RegExp = new RegExp("\\S");
    this.showSpinner = false;
    this.reactiveForm = this.builder.group({
      user: ['', [Validators.required, Validators.pattern(nonWhitespaceRegExp)]],
      pass: ['', [Validators.required ,Validators.pattern(nonWhitespaceRegExp)]]
    });
  }

  sendData() {
    const email = this.reactiveForm.value.user;
    const password = this.reactiveForm.value.pass;
    this.showSpinner = true;

    this.userService.login(email, password).subscribe(
      data => {
        if (!data.error) {
          localStorage.setItem('userfirstName', data.data.firstName);
          localStorage.setItem('userlastName', data.data.lastName);
          localStorage.setItem('userusername', data.data.username);
          localStorage.setItem('userfullName', data.data.fullName);

          this.userService.setLoggedIn(true)

          this.dialog.open(WarningComponent, {
            width: '98VW',
            disableClose: true
          })


          this.cClassService.getcClass()
          .then(cClasses => this.cClasses = cClasses);
    
        this.specieService.getSpecies()
          .then(species => this.species = species);

       
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
            

          this.requestsService.getRequests()
            .then(requests => this.requests = requests)

          this.locationsService.getlocations()
            .then(locations => this.locations = locations)


            this.slCCenterService.getCcenters()
            .then(CCenters => this.CCenters = CCenters);

          this.assetsService.getAssets()
            .then((assets) => {
              this.assets = assets
            }).finally(
              () => {
                //this.snackBar.dismiss();
                this.dialog.closeAll();
              }

            )


          this.router.navigate(['home'])
          this.showSpinner = false;


        }
      },
      response => {
        //console.log("PUT call in error", response);


        this.dialog.open(LoginErrorComponent, {
          width: '98VW',
          data: {
            anyProperty: response
          }
        })

      })
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }





}


