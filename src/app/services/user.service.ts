import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

private url = "https://afsaval.agenciasur.cl"
private loggedInStatus = JSON.parse( localStorage.getItem('loggedIn') || 'false' );

    constructor(
      private http: HttpClient
    ) {}

    setLoggedIn(value: boolean){
      this.loggedInStatus = value
      localStorage.setItem('loggedIn','true');
    }
    get isLoggedIn(){
      return  JSON.parse( localStorage.getItem('loggedIn') || this.loggedInStatus.toString())
    }

    login(email, password){
      let formdata = new FormData();
      formdata.append("email", email );
      formdata.append("password", password);
      let headers = new HttpHeaders()
        .append("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
        return this.http.post<myData>(this.url+"/webservice/rest/user/login",formdata,{headers})
    }
   


    
  }


