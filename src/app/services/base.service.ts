/**
 * se factorizaran las funciones
 */

import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OnlineOfflineService } from './online-offline.service';
import Dexie from 'dexie'
//import { CreateErrorComponent } from '../dialogs/create-error/create-error.component';
//import { CreateOkComponent } from '../dialogs/create-ok/create-ok.component';
//import { UpdateOkComponent } from '../dialogs/update-ok/update-ok.component';
//import { UpdateErrorComponent } from '../dialogs/update-error/update-error.component';
//import { MoveOkComponent } from '../dialogs/move-ok/move-ok.component';
//import { DeleteOkComponent } from '../dialogs/delete-ok/delete-ok.component';
//import { DeleteErrorComponent } from '../dialogs/delete-error/delete-error.component';
//import { MoveErrorComponent } from '../dialogs/move-error/move-error.component';

//import { MatDialog } from '@angular/material/dialog';



//puede ser instanciada por cualquier componenete solo se requiere el id
export abstract class BaseService<T extends { id: string }> {

  private db: Dexie;
  private table: Dexie.Table<T, any> = null;

  //protected, solo accesible en esta clase y en sus clase hijas 
  protected http: HttpClient;
  protected onlineOfflineService: OnlineOfflineService;

  constructor(
    // solo servicios que psaran los hijos al padre
    protected injector: Injector,
    protected nombreTabla: string,
    protected urlAPI: string,
    //public dialog: MatDialog




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



  deleteAsset(formValue, ide) {
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
    this.http.delete(this.urlAPI + "/webservice/rest/asset/delete/" + ide, options)
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
  }
  InsertAssets(formValue) {
    let headers = new HttpHeaders()
      .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
      .set('Content-Type', 'application/x-www-form-urlencoded')
    this.http.post(this.API_URL + '/webservice/rest/request/add', formValue, { headers })
      .subscribe(
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
      );
  }
  updateAssets(formValue, ide) {

    let headers = new HttpHeaders()
      .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
      .set("Content-Type", "application/x-www-form-urlencoded");
    this.http.put(this.API_URL + '/webservice/rest/asset/update/' + ide, formValue, { headers })
      .subscribe(
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
      );
  }
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








  /**Funcion que escucha si la aplicacion esta en linea 
   * 
   */
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
