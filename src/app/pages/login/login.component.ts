import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/user.service';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  email: string;
  password: string;
  user: UserInterface[]=[];
  reactiveForm: FormGroup;
  requestOptions;

  constructor( 
    private  userService: UsersService,
     private router: Router,
     private builder: FormBuilder
     ) { }


  ngOnInit(): void {

    this.reactiveForm = this.builder.group({
			user: ['', [Validators.required]],
			pass: ['', [Validators.required]],
		});
	}

	sendData(){



const email = this.reactiveForm.value.user;
const password = this.reactiveForm.value.pass;


   this.userService.login( email ,password).subscribe(
    data => {
if(!data.error){

  localStorage.setItem('userfirstName',data.data.firstName);
  localStorage.setItem('userlastName',data.data.lastName);
  localStorage.setItem('userusername',data.data.username);
  localStorage.setItem('userfullName',data.data.fullName);


  

  this.router.navigate(['home'])
  this.userService.setLoggedIn(true)
}else{

  window.alert(data.message);
  //this.router.navigate(['home'])
}
})



}


  }


