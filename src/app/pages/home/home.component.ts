import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userfullName;
  message="Cargando"

  constructor( public userService: UsersService, private router: Router ) { }

  ngOnInit(): void {
    this.userfullName = localStorage.getItem('userfullName');
  //this.userService.getUserDetails().subscribe( data=>{this.message = data.message })
  
}
  logOut(){
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userfirstName');
    localStorage.removeItem('userlastName');
    localStorage.removeItem('userusername');
    localStorage.removeItem('userfullName');

    return this.router.navigateByUrl('/login');
  }

 
}
