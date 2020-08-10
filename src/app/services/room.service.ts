import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoomInterface } from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private rooms: RoomInterface[] = [];

  constructor(private http: HttpClient) { }



  getallRooms(): Promise<RoomInterface[]>{
    let user ="mobile_user";
    let pass ="testing";
    let headers = new HttpHeaders()
    .set('Authorization',   `Basic ${btoa(user + ":" + pass)}`)
    .set('Content-Type', 'application/x-www-form-urlencoded')
  
    if ( this.rooms.length > 0 ) {
      return Promise.resolve( this.rooms );
    }
    return new Promise( resolve => {
  this.http.get('https://afsaval.agenciasur.cl/webservice/rest/catalog/locations?all=true',{ headers })
        .subscribe( (rooms: any) => {
          this.rooms = rooms.data;
          resolve( rooms.data )
        });
    });
  }


  

  getRooms(id:number): Promise<RoomInterface[]>{
    let user ="mobile_user";
    let pass ="testing";
    let headers = new HttpHeaders()
    .set('Authorization',   `Basic ${btoa(user + ":" + pass)}`)
    .set('Content-Type', 'application/x-www-form-urlencoded')
  
    if ( this.rooms.length > 0 ) {
      return Promise.resolve( this.rooms );
    }
    return new Promise( resolve => {
  
      this.http.get('https://afsaval.agenciasur.cl/webservice/rest/location/rooms/'+id ,{ headers })
        .subscribe( (rooms: any) => {
          this.rooms = rooms.data;
          //console.log('rooms.data');
          //console.log(rooms.data);
          resolve( rooms.data );
          
        });
    });
  }


}
