import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {


  userfirstName;
  userlastName;
  userusername;
  
  
  constructor( private location: Location) { }

  ngOnInit(): void {
    this.userusername = localStorage.getItem('userusername');
    this.userfirstName = localStorage.getItem('userfirstName');
    this.userlastName = localStorage.getItem('userlastName');
    

  }
  goBack() { 
    this.location.back();
  }



}
