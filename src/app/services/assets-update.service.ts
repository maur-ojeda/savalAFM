import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Asset } from '../models/asset.model';
import { Observable } from 'rxjs';
import { OnlineOfflineService } from './online-offline.service';
import Dexie from 'dexie'
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedserviceService } from '../services/sharedservice.service'
import { MatDialog } from '@angular/material/dialog';
import { UpdateOkComponent } from '../dialogs/update-ok/update-ok.component';
import { UpdateErrorComponent } from '../dialogs/update-error/update-error.component';

@Injectable({
  providedIn: 'root'
})
export class AssetsUpdateService  {

  private urlAPI = "https://afsaval.agenciasur.cl";
  private db: Dexie;
  private table: Dexie.Table<Asset, any> = null;
  private util: SharedserviceService;
  
  constructor(
    private http: HttpClient,
    private onlineOfflineService: OnlineOfflineService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ){
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
    this.db = new Dexie('db-asset-update')
    this.db.version(1).stores({
      updateAsset: 'id'
    }); 
    this.table = this.db.table('updateAsset');
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
    this.updateAssetApi(asset)
    await this.table.delete(asset.id)
    console.log(`seguro con el id ${asset.id} fue eliminado con exito`)
  }
}

update(formValue: Asset) {
  if (this.onlineOfflineService.isOnline) {
    
    this.updateAssetApi(formValue)
    //prueba de grabacion local
  }
  else {
    //acción en indexdb
    this.updateAssetindexDB(formValue)
    
  }
}
///UPDATE ON API
updateAssetApi(formValue: Asset) {
  let headers = new HttpHeaders()
      .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
      .set("Content-Type", "application/x-www-form-urlencoded");
    
   let data ={
    "updatedAt": formValue.updatedAt,
    "rfidLabelSap" : formValue.rfidLabelSap,
    "serieNumber" : formValue.serieNumber,
    "description": formValue.description,
    "costCenter": formValue.costCenter,
    "creditorId": formValue.creditorId,
    "lifetimeYear": formValue.lifetimeYear
   }
  
   // console.log('updateAssetApi')
   // console.log(headers)
   // console.log("comentado para pruebas :101")


    this.http.put(this.urlAPI + '/webservice/rest/asset/update/' + formValue.id, data, { headers })
    .subscribe(
      val => {
        this.dialog.open(UpdateOkComponent, {
          width: '98VW',
          data: {
            anyProperty: val
          }
        });
      },
      response => {
        this.dialog.open(UpdateErrorComponent, {
          width: '98VW',
          data: {
            anyProperty: response
          }
        });
      }
    );


}
///UPDATE ON INDEXDB
private async updateAssetindexDB(formValue: Asset) {
  try {
    await this.table.add(formValue)
    const todostabla: Asset[] = await this.table.toArray();
    console.log('tabla se guardo en indexDB', todostabla)

    this.dialog.open(UpdateOkComponent, {
      width: '98VW',
      data: {
        textoOffline: 'Se ha guardado este cambio de modo offline, al recuperar la conexión se realizará el cambio definitivo',
        assetCode: todostabla[0].code
      }
    });
  } catch (error) {
    this.dialog.open(UpdateErrorComponent, {
      width: '98VW',
      data: {
        textoOffline: 'Este activo fijo posee un cambio no registrado, debe esperar que se realice el cambio definitivo, para hacer uno nuevo'
      }
    });
  
  }
}


}
