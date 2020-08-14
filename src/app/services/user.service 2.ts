import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


interface myData{
  error:boolean,
  message: string,
  data: Data;
}

interface Data {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  isActive: boolean;
}



@Injectable({
  providedIn: "root"
})

export class UsersService {
  

private loggedInStatus = JSON.parse( localStorage.getItem('loggedIn') || 'false' );

    constructor(
      private http: HttpClient,
      private router: Router

    ) {}

    setLoggedIn(value: boolean){
      this.loggedInStatus = value
      localStorage.setItem('loggedIn','true');
    }
    get isLoggedIn(){
      return  JSON.parse( localStorage.getItem('loggedIn') || this.loggedInStatus.toString())
    }

    login(email , password){
    
      //let formValue = {"email":email , "password":password}
      let formdata = new FormData();
      formdata.append("email", email );
      formdata.append("password", password);
      let headers = new HttpHeaders()
        .append("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
        return this.http.post<myData>("https://devactivofijo.saval.cl/webservice/rest/user/login",formdata,{headers})
    }


   
  }


  