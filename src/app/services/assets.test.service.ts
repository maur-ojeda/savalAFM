//en des uso
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//interfase
import { AssetsInterface } from '../interfaces/assets.interface';


@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  private assets: AssetsInterface[] = [];
  private api = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  //metodos
  getAllAssets():Promise<AssetsInterface> {

    if ( this.assets.length > 0 ) {
      return Promise.resolve( this.assets );
    }

    return new Promise( resolve => {

      const path = `${this.api}/todos/`;
    
      return this.http.get<any>(path)
      .subscribe( (assets: any[]) => {

        console.log(assets);
        this.assets = assets;
        resolve( assets );
      });
  

    });


/*

    const path = `${this.api}/todos/`;
    return this.http.get<any>(path);
*/ 
 
 
 
  }
/*
  getTask(id: string) {
    const path = `${this.api}/todos/${id}`;
    return this.http.get<any>(path);
  }

  createTask(task: any) {
    const path = `${this.api}/todos`;
    return this.http.post(path, task);
  }

  updateTask(task: any) {
    const path = `${this.api}/todos/${task.id}`;
    return this.http.put<any>(path, task);
  }

  deleteTask(id: any) {
    const path = `${this.api}/todos/${id}`;
    return this.http.delete(path);
  }
*/


}
