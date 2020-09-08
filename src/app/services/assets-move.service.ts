import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Asset } from '../models/asset.model';
import { Observable } from 'rxjs';
import { OnlineOfflineService } from './online-offline.service';
import  Dexie  from 'dexie'
import { MatSnackBar } from '@angular/material/snack-bar';
import {SharedserviceService} from '../services/sharedservice.service'
import { MatDialog } from '@angular/material/dialog';
import { MoveOkComponent } from '../dialogs/move-ok/move-ok.component';
import { MoveErrorComponent } from '../dialogs/move-error/move-error.component';



@Injectable({
  providedIn: 'root'
})
export class AssetsMoveService  {

  private urlAPI = "https://afsaval.agenciasur.cl";
  private db: Dexie;
  private table: Dexie.Table<Asset, any> = null;
  private sharedserviceService: SharedserviceService;
  
  constructor(
    private http:HttpClient,
    private onlineOfflineService: OnlineOfflineService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ){
    this.oirStatusConexion();
    this.iniciarIndexDB();
  }

  private iniciarIndexDB(){
    this.db = new Dexie('db-asset-move')
    this.db.version(1).stores({
      moveAsset: 'id'
    });
    this.table = this.db.table('moveAsset');
  }

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
    this.moveAssetApi(asset)
    await this.table.delete(asset.id)
    console.log(`seguro con el id ${asset.id} fue eliminado con exito`)
  }
}

move(formValue: Asset) {
  if (this.onlineOfflineService.isOnline) {
    //acción en api  
    this.moveAssetApi(formValue)
  }
  else {
    //acción en indexdb
    this.moveAssetindexDB(formValue)
  }
}


///MOVE ON API
moveAssetApi(formValue: Asset) {
  
  let headers = new HttpHeaders()
  .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
  .set("Content-Type", "application/x-www-form-urlencoded");

  let data = {
    "updatedAt": formValue.updatedAt,
    "costCenter": formValue.costCenter,
    "lCenter": formValue.lCenter,
    "lArea": formValue.lArea,
    "lBuilding": formValue.lBuilding,
    "lFloor": formValue.lFloor,
    "lRoom": formValue.lRoom
  }

  console.log(data);
  return this.http.put(this.urlAPI + "/webservice/rest/asset/move/" + formValue.id, data ,{headers})
    .subscribe(
      val => {
        this.dialog.open(MoveOkComponent, {
          width: '98VW',
          data: {
            anyProperty: val
          }
        });
      },
      response => {
        console.log(response);

        this.dialog.open(MoveErrorComponent, {
          width: '98VW',
          data: {
            anyProperty: response
          }
        });
      }
    );
}
///MOVE ON INDEXDB
private async moveAssetindexDB(formValue: Asset) {

  try {
    await this.table.add(formValue)
    const todostabla: Asset[] = await this.table.toArray();
    console.log('tabla se guardo en indexDB', todostabla)
  } catch (error) {
    console.log('error al agregar tabla a la base de datos', error)
  }
}


}
