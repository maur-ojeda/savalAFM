import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Asset } from '../models/asset.model';
import { Observable } from 'rxjs';
import { OnlineOfflineService } from './online-offline.service';
import Dexie from 'dexie'
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedserviceService } from '../services/sharedservice.service'
import { MatDialog } from '@angular/material/dialog';
import { DeleteOkComponent } from '../dialogs/delete-ok/delete-ok.component';
import { DeleteErrorComponent } from '../dialogs/delete-error/delete-error.component';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})

export class AssetsDeleteService {

  private urlAPI = "https://afsaval.agenciasur.cl";
  private db: Dexie;
  private table: Dexie.Table<Asset, any> = null;
  private sharedserviceService: SharedserviceService;




  constructor(
    private http: HttpClient,
    private onlineOfflineService: OnlineOfflineService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,

  ) {
    this.oirStatusConexion();
    this.iniciarIndexDB();
  }


  private iniciarIndexDB() {
    this.db = new Dexie('db-asset')
    this.db.version(1).stores({
      opAsset: 'id'
    });
    this.table = this.db.table('opAsset');
  }


  /*private iniciarIndexDB() {
    this.db = new Dexie('db-asset-delete')
    this.db.version(1).stores({
      deleteAsset: 'id'
    }); 
    this.table = this.db.table('deleteAsset');
  }*/



  

  private oirStatusConexion() {
    this.onlineOfflineService.statusConexion
      .subscribe(
        online => {
          if (online) {
            console.log('online');
            //envia lo grabado en el index a la api
              this.enviarIndexDBaApi();
            this.snackBar.open('Con conexión', 'Aceptar', { panelClass: ['online-snackbar'], duration: 4000 });
          }
          else {
            console.log('estoy offline');
            this.snackBar.open('Sin conexión', 'aceptar', { panelClass:['offline-snackbar'], duration: 4000 });          
          }
        }
      )
  }


  /**
 * Funcion que envia lo de la indexdb a la api
*/
  private async enviarIndexDBaApi() {
    const todosAssets: Asset[] = await this.table.toArray();
    for (const asset of todosAssets) {
      this.deleteAssetApi(asset)
      await this.table.delete(asset.id)
      console.log(`seguro con el id ${asset.id} fue eliminado con exito`)
    }


  }



  delete(formValue: Asset) {
    if (this.onlineOfflineService.isOnline) {
    
     this.deleteAssetApi(formValue)

      //prueba de grabacion local
    }
    else {
      //acción en indexdb
      this.deleteAssetindexDB(formValue)
    }
  }


  ///DELETE ON API
  deleteAssetApi(formValue: Asset) {
  

  



    const options = {
      headers: new HttpHeaders({
        "Authorization": "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==",
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body: {
        "updatedAt": formValue.updatedAt,
        "downDocumentAt": formValue.downDocumentAt,
        "downPostingAt": formValue.downPostingAt,
        "downReferenceAt": formValue.downReferenceAt,
        "downComment": formValue.downComment
      },
    };



    return this.http.delete(this.urlAPI + "/webservice/rest/asset/delete/" + formValue.id, options)
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
          console.log(response)
          this.dialog.open(DeleteErrorComponent, {
            width: '98VW',
            data: {
              anyProperty: response
            }
          });
        }
      );
  }
    
  ///DELETE ON INDEXDB
  private async deleteAssetindexDB(formValue: Asset) {
    try {
      await this.table.add(formValue)
      const todostabla: Asset[] = await this.table.toArray();
      console.log('tabla se guardo en indexDB', todostabla)
      this.dialog.open(DeleteOkComponent, {
        width: '98VW',
        data: {
          textoOffline: 'Se ha guardado este cambio de modo offline, al recuperar la conexión se realizará el cambio definitivo',
          assetCode: todostabla[0].code
        }
      });
    } catch (error) {
      
      this.dialog.open(DeleteErrorComponent, {
        width: '98VW',
        data: {
          textoOffline: 'Este activo fijo posee un cambio no registrado, debe esperar que se realice el cambio definitivo, para hacer uno nuevo'
        }
      });
    }
  }


}




