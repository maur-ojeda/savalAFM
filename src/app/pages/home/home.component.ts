import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  message="Cargando"

  constructor( public userService: UsersService, private router: Router ) { }

  ngOnInit(): void {

  //this.userService.getUserDetails().subscribe( data=>{this.message = data.message })
  
}
  logOut(){
    localStorage.removeItem('loggedIn');
    return this.router.navigateByUrl('/login');
  }

 
}
