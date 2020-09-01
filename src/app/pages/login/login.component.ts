import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/user.service';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginErrorComponent } from 'src/app/dialogs/login-error/login-error.component';
import { SharedserviceService} from '../../services/sharedservice.service';



import { RequestInterface } from 'src/app/interfaces/request.interface';
import { RequestsService } from 'src/app/services/requests.service';
import { AssetsService } from '../../services/assets.service';
import { AssetSearchInterface } from 'src/app/interfaces/assetSearch.interface';
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

  constructor(
    private userService: UsersService,
    private router: Router,
    private builder: FormBuilder,
    public dialog: MatDialog,
    private assetsService: AssetsService,
    private requestsService: RequestsService,
    public utils: SharedserviceService

  ) { }

  ngOnInit(): void {
    this.showSpinner = false;
    this.reactiveForm = this.builder.group({
      user: ['', [Validators.required]],
      pass: ['', [Validators.required]],
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
          this.router.navigate(['home'])
          this.userService.setLoggedIn(true)
          this.showSpinner = false;
          this.requestsService.getRequests()
          .then( requests => this.requests = requests )

          this.assetsService.getAssets()
          .then( assets => this.assets = assets)
          

          
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
