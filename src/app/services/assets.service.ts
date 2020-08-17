/**
 * Debe ir con el puerto correspondiente
 * Prod: sla
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { AssetInterface } from '../interfaces/asset.interface';
import { MatDialog } from '@angular/material/dialog';
import { CreateErrorComponent } from '../dialogs/create-error/create-error.component';
import { CreateOkComponent } from '../dialogs/create-ok/create-ok.component';
import { UpdateOkComponent } from '../dialogs/update-ok/update-ok.component';
import { UpdateErrorComponent } from '../dialogs/update-error/update-error.component';
import { MoveOkComponent } from '../dialogs/move-ok/move-ok.component';
import { DeleteOkComponent } from '../dialogs/delete-ok/delete-ok.component';
import { DeleteErrorComponent } from '../dialogs/delete-error/delete-error.component';
import { AssetSearchInterface } from '../interfaces/assetSearch.interface';
import { MoveErrorComponent } from '../dialogs/move-error/move-error.component';
import { Asset } from '../models/asset.model'
import { OnlineOfflineService } from './online-offline.service';
import  Dexie  from 'dexie'

@Injectable({
  providedIn: 'root'
})

export class AssetsService {


  private API_URL = "https://afsaval.agenciasur.cl"
  private db: Dexie;
  private table: Dexie.Table<Asset, any> = null;


  private assets:  AssetSearchInterface[] = [];
  constructor(
    private http: HttpClient, 
    public dialog: MatDialog,
    private onlineOfflineService: OnlineOfflineService
    ) {
      this.oirStatusConexion();
      this.iniciarIndexDB();
     }

     private iniciarIndexDB(){
      this.db = new Dexie('db-assets')
      this.db.version(1).stores({
        asset: 'fakeid'
      });
      this.table = this.db.table('asset');
    }
    



  getAssets(): Promise<AssetSearchInterface[]> {
    let headers = new HttpHeaders()
      .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
      .set('Content-Type', 'application/x-www-form-urlencoded')
    if (this.assets.length > 0) {
      return Promise.resolve(this.assets);
    }
    return new Promise(resolve => {
      this.http.get(this.API_URL+'/webservice/rest/assets/?page=5&items=100', { headers })
        .subscribe((assets: any) => {
          this.assets = assets.data;
          resolve(assets.data);
          console.log(assets.data)
        });
    });
  }

//test
  InsertAssets(formValue) {
    let headers = new HttpHeaders()
    .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
    .set('Content-Type', 'application/x-www-form-urlencoded')
    this.http.post(this.API_URL+'/webservice/rest/request/add', formValue, { headers })
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
        },
       
      );


      

      

  }

  private async InsertAssetIndexDB(asset){
    try{
        // await espera la resolucion de esta linea, como una promesa
      await this.table.add(asset)
      // resultado de la promesa
      const todosAssets: Asset[] = await this.table.toArray();
      console.log('asset se guardo en indexDB', todosAssets)
    } catch(error) {
      console.log('error al agregar asset a la base de datos', error)
    }
  }

  private async enviarIndexDBaApi(){
    const todosAssets: Asset[] = await this.table.toArray();
    for (const asset of todosAssets){
      this.InsertAssets(asset)
      await this.table.delete(asset.id)
      console.log(`asset con el id ${asset.id} fue eliminnado con exito`)
    }
  }

  InsertarAsset(asset){
    if(this.onlineOfflineService.isOnline ){
        this.InsertAssets(asset)
    }
    else{
        this.InsertAssetIndexDB(asset);
    }  
  }
  



  updateAssets(formValue, ide) {

    let headers = new HttpHeaders()
      .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
      .set("Content-Type", "application/x-www-form-urlencoded");
    this.http.put(this.API_URL+'/webservice/rest/asset/update/' + ide, formValue, { headers })
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
    
      this.http.put(this.API_URL+'/webservice/rest/asset/move/' + ide, formValue, { headers }).subscribe(
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
        },
        () => {
          console.log("The PUT observable is now completed.");
        }
      );
  }

  downAssets(formValue, ide) {
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
    console.log(options)

    this.http.delete(this.API_URL+"/webservice/rest/asset/delete/" + ide, options)
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








getAssetsCode(code: string): Promise<AssetSearchInterface[]> {

  
    let cod = code
    if (cod.length > 23) {
      let last8 = cod.substr(code.length - 8);
      let hexa = parseInt(last8, 16);
      let hexaStr = hexa.toString();
      code = hexaStr 
      alert('codigo transformado: ' +  code  )
    }
    
    let headers = new HttpHeaders()
      .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
      .set('Content-Type', 'application/x-www-form-urlencoded')
    return new Promise(resolve => {
      this.http.get(this.API_URL+'/webservice/rest/assets/search?code='+ code, { headers })
        .subscribe((assets: any) => {
          this.assets = assets;
          resolve(assets);
        });
    });
  }



  getAssetsData(code: string): Promise<AssetSearchInterface[]> {
    let headers = new HttpHeaders()
      .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
      .set('Content-Type', 'application/x-www-form-urlencoded')

    if (this.assets.length > 0) {
      return Promise.resolve(this.assets);
    }

    return new Promise(resolve => {
      this.http.get(this.API_URL+'/webservice/rest/assets/search?code='+ code, { headers })
        .subscribe((assets: any) => {
          this.assets = assets;
          resolve(assets.data);
        });
    });
  }






  ////DEPRECRED
  getAssetPorId(id: number) {

   /* if (this.assets.length > 0) {
      const asset = this.assets.find(p => p.id === id);
      return Promise.resolve(asset);
    }
    return this.getAssets().then(assets => {
      const asset = this.assets.find(p => p.id === id);
      return Promise.resolve(asset);
    });*/
    console.log('todo');
  }
  getAssetPorCode(code: string) {
   /*
    if (this.assets.length > 0) {
      const asset = this.assets.find(p => p.code === code);
      return Promise.resolve(asset);
    }
    return this.getAssets().then(assets => {
      const asset = this.assets.find(p => p.code === code);
      return Promise.resolve(asset);
    });
    */
   console.log('todo');
  }
  getAssetPorReferalCode(referalCode: string) {
  /*  if (this.assets.length > 0) {
      const asset = this.assets.find(p => p.referalCode === referalCode);
      return Promise.resolve(asset);

    }
    return this.getAssets().then(assets => {
      const asset = this.assets.find(p => p.referalCode === referalCode);
      return Promise.resolve(asset);
    });
    */
   console.log('todo');
  }
  getAssetPorRfid(rfidLabelSap: string) {
   /* if (this.assets.length > 0) {
      const asset = this.assets.find(p => p.rfidLabelSap === rfidLabelSap);
      return Promise.resolve(asset)
    }
    return this.getAssets().then(assets => {
      const asset = this.assets.find(p => p.rfidLabelSap === rfidLabelSap);
      return Promise.resolve(asset);
    });*/
    console.log('todo');
  }
  getAssetPorrfid(rfidLabelSap: string) {
    /*if (this.assets.length > 0) {
      const asset = this.assets.find(p => p.rfidLabelSap === rfidLabelSap);
      return Promise.resolve(asset)
    }
    return this.getAssets().then(assets => {
      const asset = this.assets.find(p => p.rfidLabelSap === rfidLabelSap);
      return Promise.resolve(asset);
    });*/
    
  }
  getAssetPorValue(buscado: any) {

    


  }


/**Funcion que escucha si la aplicacion esta en linea 
 * 
 */
private oirStatusConexion(){
  this.onlineOfflineService.statusConexion
  .subscribe(

  online =>{
    if(online){
      //envia lo grabado desde indexDB a la api
      this.enviarIndexDBaApi();
      console.log('Grabarbacion aqui')
    }
    else{
      console.log('estoy offline')
    }
  }
  
  )
  }



}

