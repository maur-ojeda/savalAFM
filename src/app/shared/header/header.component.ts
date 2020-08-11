import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private router: Router) { }

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


}
