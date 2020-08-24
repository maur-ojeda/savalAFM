
import Dexie from 'dexie';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OnlineOfflineService } from './online-offline.service';
import { Injector } from '@angular/core';
import * as moment from 'moment';


export abstract class BaseService<T extends {id: string}> {

  private db: Dexie;
  private table: Dexie.Table<T, any> = null;
  protected http: HttpClient;
  protected onlineOfflineService: OnlineOfflineService;


  constructor(
    protected injector: Injector,
    protected nombreTabla: string,
    protected urlAPI: string
  ) {

    this.http = this.injector.get(HttpClient);
    this.onlineOfflineService = this.injector.get(OnlineOfflineService);
    //llamada a los metodos
    this.oirStatusConexion();
    this.iniciarIndexDB();

   }

/**
 * funcion que inicia una tabla la base de datos indexDB
*/
   private iniciarIndexDB() {
    this.db = new Dexie('db-seguros')
    this.db.version(1).stores({
      [this.nombreTabla]: 'id'
    });
    this.table = this.db.table(this.nombreTabla);
  }


////aquo
  moveAssets(formValue, ide) {
    let headers = new HttpHeaders()
      .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
      .set("Content-Type", "application/x-www-form-urlencoded");
    this.http.put(this.API_URL + '/webservice/rest/asset/move/' + ide, formValue, { headers }).subscribe(
      val => {
        this.dialog.open(MoveOkComponent, {
          data: {
            anyProperty: val
          }
        });
      },
      response => {
        this.dialog.open(MoveErrorComponent, {
          data: {
            anyProperty: response
          }
        });
      }
    );
  }







/**grabar en api (cambiar) */
  private salvarAPI(tabla: T) {
    this.http.post(this.urlAPI, tabla)
      .subscribe(
        () => alert('tabla ingresado correctamente'),
        (err) => console.log('error en registro')
      );
  }

  /**
   * funcion asincrona que graba en indexDB
   * */
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


  /**
   * Funcion que envia lo de la indexdb a la api
  */
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

grabar(tabla: T) {
  if (this.onlineOfflineService.isOnline) {
    this.salvarAPI(tabla);
  }
  else {
    this.salvarindexDB(tabla);
  }
}
//TODO: revisar 
listar(): Observable<T[]> {
  return this.http.get<T[]>(this.urlAPI);
}

/** */
listarPorCode(code: string): Observable<T[]>{
  let cod = code
  if (cod.length > 23) {
    let last8 = cod.substr(code.length - 8);
    let hexa = parseInt(last8, 16);
    let hexaStr = hexa.toString();
    code = hexaStr
  }
  let headers = new HttpHeaders()
  .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
  .set('Content-Type', 'application/x-www-form-urlencoded')
 return this.http.get<T[]>(this.urlAPI +'/webservice/rest/assets/search?code=' + code ,{headers})
}


/***/
private formatDate(f) {
  let dateInFormat = moment(f).format('DD-MM-YYYY HH:MM');
  return dateInFormat
}






   private oirStatusConexion() {
    this.onlineOfflineService.statusConexion
      .subscribe(
        online => {
          if (online) {
            //envia lo grabado en el index a la api
            this.enviarIndexDBaApi();
          }
          else {
            console.log('estoy offline')
          }
        }

      )
  }



}
