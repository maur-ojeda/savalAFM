/**
 * Debe ir con el puerto correspondiente
 * Prod:     sla
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

@Injectable({
  providedIn: 'root'
})

export class AssetsService {


  private url = "https://devactivofijo.saval.cl:8443"
  private assets:  AssetSearchInterface[] = [];
  constructor(private http: HttpClient, public dialog: MatDialog) { }

  getAssets(): Promise<AssetSearchInterface[]> {
    let headers = new HttpHeaders()
      .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
      .set('Content-Type', 'application/x-www-form-urlencoded')
    if (this.assets.length > 0) {
      return Promise.resolve(this.assets);
    }
    return new Promise(resolve => {
      this.http.get(this.url+'/webservice/rest/assets/?page=5&items=100', { headers })
        .subscribe((assets: any) => {
          this.assets = assets.data;
          resolve(assets.data);
          console.log(assets.data)
        });
    });
  }


  InsertAssets(formValue) {

    //alert(JSON.stringify(formValue) )

    let headers = new HttpHeaders()
    .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
    .set('Content-Type', 'application/x-www-form-urlencoded')

    this.http.post(this.url+'/webservice/rest/request/add', formValue, { headers })
      .subscribe(
        val => {
          console.log("PUT call successful value returned in body", val);
          this.dialog.open(CreateOkComponent, {
            width: '98VW',
            data: {
              anyProperty: val
            }

          });
        },
        response => {
          console.log("PUT call in error", response);

          this.dialog.open(CreateErrorComponent, {
            width: '98VW',
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
  updateAssets(formValue, ide) {

    let headers = new HttpHeaders()
      .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
      .set("Content-Type", "application/x-www-form-urlencoded");
    this.http.put("https://devactivofijo.saval.cl:8443/webservice/rest/asset/update/" + ide, formValue, { headers })
      .subscribe(
        val => {
          console.log("PUT call successful value returned in body",
            val);
          this.dialog.open(UpdateOkComponent, {
            data: {
              anyProperty: val
            }
          });
        },
        response => {
          console.log("PUT call in error", response);
          this.dialog.open(UpdateErrorComponent, {
            data: {
              anyProperty: "myValue"
            }
          });
        },
        () => {
          console.log("The PUT observable is now completed.");
        }
      );
  }
  moveAssets(formValue, ide) {
    let headers = new HttpHeaders()
      .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
      .set("Content-Type", "application/x-www-form-urlencoded");
      //alert(ide)
      
  this.http.put("https://devactivofijo.saval.cl:8443/webservice/rest/asset/move/" + ide, formValue, { headers }).subscribe(
        val => {
          console.log("PUT call successful value returned in body",
            val);
          this.dialog.open(MoveOkComponent, {
            data: {
              anyProperty: val
            }
          });
        },
        response => {
          console.log("PUT call in error", response);
          this.dialog.open(MoveErrorComponent, {
            data: {
              anyProperty: "myValue"
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

    this.http.delete("https://devactivofijo.saval.cl:8443/webservice/rest/asset/delete/" + ide, options)
      .subscribe(
        val => {
          console.log("PUT call successful value returned in body",
            val);

            this.dialog.open(DeleteOkComponent, {
              width: '98VW',
              data: {
                anyProperty: val
              }
            });
        },
        response => {
          console.log("PUT call in error", response);
          this.dialog.open(DeleteErrorComponent, {
            width: '98VW',
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
  getAssetsCode(code: string): Promise<AssetSearchInterface[]> {
    let headers = new HttpHeaders()
      .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
      .set('Content-Type', 'application/x-www-form-urlencoded')
    if (this.assets.length > 0) {
      return Promise.resolve(this.assets);
    }

    return new Promise(resolve => {
      this.http.get('https://devactivofijo.saval.cl:8443/webservice/rest/assets/search?code='+ code, { headers })
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
      this.http.get('https://devactivofijo.saval.cl:8443/webservice/rest/assets/search?code='+ code, { headers })
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
    console.log('todo');
  }
  getAssetPorValue(buscado: any) {

    alert('desde servicio' + buscado);


  }






}

