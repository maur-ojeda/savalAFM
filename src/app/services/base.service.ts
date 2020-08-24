import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OnlineOfflineService } from './online-offline.service';
import Dexie from 'dexie'


import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T extends {id: string}> {


  private db: Dexie;
  private table: Dexie.Table<T, any> = null;
  protected http: HttpClient;
  protected onlineOfflineService: OnlineOfflineService;


  constructor(
    protected injector: Injector,
    protected nombreTabla: string,
    protected urlAPI: string,
    private snackBar: MatSnackBar,
  ) { 

    this.http = this.injector.get(HttpClient);
    this.onlineOfflineService = this.injector.get(OnlineOfflineService);
    this.oirStatusConexion();
    this.iniciarIndexDB();
  }


/**
 * funcion que inicia la base de datos indexDB
*/
private iniciarIndexDB() {
  this.db = new Dexie('db-assets')
  this.db.version(1).stores({
    [this.nombreTabla]: 'id'
  });
  this.table = this.db.table(this.nombreTabla);
}

listar(): Observable<T[]> {
  return this.http.get<T[]>(this.urlAPI);
}

/**AssetsDetails
 * toma los datos desde la API 
*/
AssetsDetails(code: string): Observable<T[]> {
  let headers = new HttpHeaders()
  .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
  .set('Content-Type', 'application/x-www-form-urlencoded')
  return this.http.get<T[]>(this.urlAPI + '/webservice/rest/assets/search?code=' + code, { headers })
}







//grabar en db post
private salvarAPI(tabla: T) {
  this.http.post(this.urlAPI, tabla)
    .subscribe(
      () => alert('tabla ingresado correctamente'),
      (err) => console.log('error en registro')
    );
}
// grabar en indexdb
private async salvarindexDB(tabla: T) {
    try {
      // await espera la resolucion de esta linea, como una promesa
      await this.table.add(tabla)
      // resultado de la promesa
      const todostabla: T[] = await this.table.toArray();
      console.log('tabla se guardo en indexDB', todostabla)
    } catch (error) {
      console.log('error al agregar tabla a la base de datos', error)
    }
  }
//revision que pasa con el resto de metodos
private async enviarIndexDBaApi() {
    const todostabla: T[] = await this.table.toArray();
    for (const tabla of todostabla) {
      //por cada uno de los seguros en todosSeguros los grabo en la API
      this.salvarAPI(tabla)
      //espera el borrado en labase de datos local
      await this.table.delete(tabla.id)
      console.log(`tabla con el id ${tabla.id} fue eliminado con éxito`)
    }
  }


   /**Funcion que escucha si la aplicacion esta en linea 
   */
  private oirStatusConexion() {
    this.onlineOfflineService.statusConexion
      .subscribe(
        online => {
          if (online) {
            //envia lo grabado desde indexDB a la api
            //this.enviarIndexDBaApi();
            this.snackBar.open('Con conexión', 'Aceptar', { panelClass: ['online-snackbar'], duration: 4000 });
            
          }
          else {
            //console.log('estoy offline')
            this.snackBar.open('Sin conexión', 'aceptar', { panelClass:['offline-snackbar'], duration: 4000 });          
          }
        })
  }




}
