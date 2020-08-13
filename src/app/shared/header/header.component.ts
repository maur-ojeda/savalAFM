import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { LogoutComponent } from 'src/app/dialogs/logout/logout.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private router: Router,   public dialog: MatDialog ) { }

  ngOnInit(): void {
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
      //console.log(`Dialog result: ${result}`);
              if(result){
                this.logOut()
              }

    });
  }



}
