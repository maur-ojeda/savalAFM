/**
 * se factorizaran las funciones
 */

import { Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OnlineOfflineService } from './online-offline.service';
import Dexie from 'dexie';



//puede ser instanciada por cualquier componenete solo se requiere el id
export abstract class BaseService<T extends { id: number }> {
  private db: Dexie;
  private table: Dexie.Table<T, any> = null;
  protected http: HttpClient;
  protected onlineOfflineService: OnlineOfflineService;



  constructor(
    // solo servicios que pasaran los hijos al padre
    protected injector: Injector,
    protected nombreTabla: string,
    protected urlAPI: string,

    
  ) {
    this.http = this.injector.get(HttpClient);
    this.onlineOfflineService = this.injector.get(OnlineOfflineService);
    //llamada a los metodos
    this.oirStatusConexion();
    this.iniciarIndexDB();

  }

  /**
   * funcion que inicia la base de datos indexDB
  */
  private iniciarIndexDB() {
    this.db = new Dexie('db-seguros')
    this.db.version(1).stores({
      [this.nombreTabla]: 'id'
    });
    this.table = this.db.table(this.nombreTabla);
  }


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




insert(tabla: T){}
update(tabla: T){}
move(formValue: T){
  if (this.onlineOfflineService.isOnline){
   this.moveAssetApi(formValue)
  }
  else{
  this.moveAssetindexDB(formValue)
  }


}

  listar(): Observable<T[]> {
    return this.http.get<T[]>(this.urlAPI);
  }
  /////////
  findByCode(code: string): Observable<T[]> {
    let headers = new HttpHeaders()
      .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
      .set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.get<T[]>(this.urlAPI + '/webservice/rest/assets/search?code=' + code, { headers })
  }
  InsertAssetsApi(formValue) {
    let headers = new HttpHeaders()
      .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
      .set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(this.urlAPI + '/webservice/rest/request/add', formValue, { headers })
     /* .subscribe(
        val => {
          this.dialog.open(CreateOkComponent, {
            width: '98VW',
            data: {
              anyProperty: val
            }
          });
        },
        response => {
          this.dialog.open(CreateErrorComponent, {
            width: '98VW',
            data: {
              anyProperty: response
            }
          });
        }
      );*/
  }
  updateAssetsApi(formValue, ide) {

    let headers = new HttpHeaders()
      .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
      .set("Content-Type", "application/x-www-form-urlencoded");
    return this.http.put(this.urlAPI + '/webservice/rest/asset/update/' + ide, formValue, { headers })
    /*  .subscribe(
        val => {
          this.dialog.open(UpdateOkComponent, {
            data: {
              anyProperty: val
            }
          });
        },
        response => {
          this.dialog.open(UpdateErrorComponent, {
            data: {
              anyProperty: response
            }
          });
        }
      );*/
  }


  ///MOVE
  moveAssetApi(formValue) {

    let data = {
      "lCenter": formValue.lCenter,
      "lBuilding": formValue.lBuilding,
      "lFloor": formValue.lFloor,
      "lArea": formValue.lArea,
      "lRoom": formValue.lRoom,
      "costCenter": formValue.costCenter
    }

    let headers = new HttpHeaders()
      .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
      .set("Content-Type", "application/x-www-form-urlencoded");
  
  
  
      return this.http.put(this.urlAPI  + '/webservice/rest/asset/move/' + formValue.id, data, { headers })
      .subscribe(
        val => {
         /* this.dialog.open(MoveOkComponent, {
            data: {
              anyProperty: val
            }
          });*/
        console.log(val);
  
  
        },
        response => {
          /*this.dialog.open(MoveErrorComponent, {
            data: {
              anyProperty: response
            }
          });*/
          console.log(response);
        }
      );
  
      
  
  }
 private async moveAssetindexDB(tabla: T) {
    try {
      await this.table.add(tabla)
      const todostabla: T[] = await this.table.toArray();
      console.log('tabla se guardo en indexDB', todostabla)
    } catch (error) {
      console.log('error al agregar tabla a la base de datos', error)
    }
  }



  delete(tabla: T,  ide: any, formValue: any ){
    if (this.onlineOfflineService.isOnline) {
        //this.salvarAPI(tabla);
      //  this.deleteAssetApi(ide, formValue)

      //prueba de grabacion local
      this.deleteAssetindexDB(tabla)
      }
    else {
      //acción en indexdb
      //this.salvarindexDB(tabla);
      this.deleteAssetindexDB(tabla)
    }
  }


///DELETE
  deleteAssetApi(formValue: any, ide: any ) {
    const options = {
      headers: new HttpHeaders({
        "Authorization": "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==",
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body: {
        "downDocumentAt": formValue.downDocumentAt,
        "downPostingAt": formValue.downPostingAt,
        "downReferenceAt": formValue.downReferenceAt,
        "downComment": formValue.downComment
      },
    };
   return this.http.delete(this.urlAPI + "/webservice/rest/asset/delete/" + ide, options)
    /* 
    .subscribe(
        val => {
          this.dialog.open(DeleteOkComponent, {
            width: '98VW',
            data: {
              anyProperty: val
            }
          });
        },
        response => {
          this.dialog.open(DeleteErrorComponent, {
            width: '98VW',
            data: {
              anyProperty: response
            }
          });
        }
      );
      */
  }
 
  private async deleteAssetindexDB(tabla: T) {
    try {
      await this.table.add(tabla)
      const todostabla: T[] = await this.table.toArray();
      console.log('tabla se guardo en indexDB', todostabla)
    } catch (error) {
      console.log('error al agregar tabla a la base de datos', error)
    }
  }




  /**Funcion que escucha si la aplicacion esta en linea 
   * 
   */
  private oirStatusConexion() {
    this.onlineOfflineService.statusConexion
      .subscribe(
        online => {
          if (online) {
           // alert('online');
            //envia lo grabado en el index a la api
            //deactivado por test: this.enviarIndexDBaApi();
          // this.snackBar.open('Con conexión', 'Aceptar', { panelClass: ['online-snackbar'], duration: 4000 });
          }
          else {
           // alert('estoy offline');
          //this.snackBar.open('Sin conexión', 'aceptar', { panelClass:['offline-snackbar'], duration: 4000 });          
          }
        }

      )
  }




  


}
