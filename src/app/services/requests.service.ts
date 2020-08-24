import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { RequestInterface } from '../interfaces/request.interface';


@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private API_URL = "https://afsaval.agenciasur.cl/"


  private requests: RequestInterface[] = [];

  constructor(private http: HttpClient) { }
getRequests(): Promise<RequestInterface[]>{
  let headers = new HttpHeaders()
  .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
  .set('Content-Type', 'application/x-www-form-urlencoded')

  if ( this.requests.length > 0 ) {
    return Promise.resolve( this.requests );
  }

  return new Promise( resolve => {

    
    this.http.get(this.API_URL + 'webservice/rest/requests?all=true',{ headers })
      .subscribe( (requests: any) => {
        this.requests = requests.data;
        resolve( requests.data );
      });
  });
}

getRequestsPorId( number:number ) {
  if ( this.requests.length > 0 ) {
    const request = this.requests.find( p => p.number === number );
    return Promise.resolve( request );
  }
  return this.getRequests().then( requests => {
    const request= this.requests.find( p => p.number === number );
    return Promise.resolve( request );
  });
}



}
