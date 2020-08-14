import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoomInterface } from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private url = "https://devactivofijo.saval.cl:8443"
  private rooms: RoomInterface[] = [];

  constructor(private http: HttpClient) { }



  getallRooms(): Promise<RoomInterface[]>{
    let headers = new HttpHeaders()
    .append("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
    .set('Content-Type', 'application/x-www-form-urlencoded')
  
    if ( this.rooms.length > 0 ) {
      return Promise.resolve( this.rooms );
    }
    return new Promise( resolve => {
  this.http.get(this.url+'/webservice/rest/catalog/locations?all=true&type=5',{ headers })
        .subscribe( (rooms: any) => {
          this.rooms = rooms.data;
          resolve( rooms.data )
        });
    });
  }

  




  

  getRooms(id:number): Promise<RoomInterface[]>{
    let headers = new HttpHeaders()
    .append("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
    .set('Content-Type', 'application/x-www-form-urlencoded')
  
    if ( this.rooms.length > 0 ) {
      return Promise.resolve( this.rooms );
    }
    return new Promise( resolve => {
  
      this.http.get(this.url+'/webservice/rest/locations/'+id+'/children' ,{ headers })
        .subscribe( (rooms: any) => {
          this.rooms = rooms['data'];

          resolve( rooms['data'] );
          
        });
    });
  }


}
