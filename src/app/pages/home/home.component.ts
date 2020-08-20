import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { LogoutComponent } from 'src/app/dialogs/logout/logout.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userfullName;
  message="Cargando"

  constructor( 
    public userService: UsersService, 
    private router: Router, 
    public dialog: MatDialog 
    ) { }

  ngOnInit(): void {
    this.userfullName = localStorage.getItem('userfullName');  
}
  logOut(){
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userfirstName');
    localStorage.removeItem('userlastName');
    localStorage.removeItem('userusername');
    localStorage.removeItem('userfullName');

    return this.router.navigateByUrl('/login');
  }


  logOutDialog() {
    const dialogRef = this.dialog.open(LogoutComponent,{
          width: '98VW'
    });
    dialogRef.afterClosed().subscribe(result => {
              if(result){
                this.logOut()
              }
    });
  }


  //carga de recursos



}

