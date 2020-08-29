import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlineOfflineService {
  private statusConexion$ = new Subject<boolean>();

  constructor() { 
    window.addEventListener('online', () => this.actualizaStatusConexion())
    window.addEventListener('offline', () => this.actualizaStatusConexion())
  }

  get isOnline():boolean{
    return !!window.navigator.onLine;
  
  }
  
  get statusConexion(): Observable<boolean> {
    return this.statusConexion$.asObservable();
  }
  
  actualizaStatusConexion(){
    this.statusConexion$.next(this.isOnline)
  }
}
