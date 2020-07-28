import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { RequestInterface } from '../interfaces/request.interface';


@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private requests: RequestInterface[] = [];
  
  constructor(private http: HttpClient) { }

    //todo:user y pass dinamico
getRequests(): Promise<RequestInterface[]>{
  let user ="mobile_user";
  let pass ="testing";
  let headers = new HttpHeaders()
  .set('Authorization',   `Basic ${btoa(user + ":" + pass)}`)
  .set('Content-Type', 'application/x-www-form-urlencoded')

  if ( this.requests.length > 0 ) {
    return Promise.resolve( this.requests );
  }

  return new Promise( resolve => {
    this.http.get('https://afsaval.agenciasur.cl/webservice/rest/requests/',{ headers })
      .subscribe( (requests: any) => {
        this.requests = requests.data;
        
        resolve( requests.data );
      });
  });
}

/*getRequestsPorId( id:number ) {
  if ( this.requests.length > 0 ) {
    const request = this.requests.find( p => p.id === id );
    return Promise.resolve( request );
  }
  return this.getRequests().then( requests => {
    const request= this.requests.find( p => p.id === id );
    return Promise.resolve( request );
  });
}*/



}
