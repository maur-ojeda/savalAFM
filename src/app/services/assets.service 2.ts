import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AssetInterface } from '../interfaces/asset.interface';

import { MatDialog } from '@angular/material/dialog';

import { CreateErrorComponent } from '../dialogs/create-error/create-error.component';
import { CreateOkComponent } from '../dialogs/create-ok/create-ok.component';
import { UpdateOkComponent } from '../dialogs/update-ok/update-ok.component';
import { UpdateErrorComponent } from '../dialogs/update-error/update-error.component';
import { MoveOkComponent } from '../dialogs/move-ok/move-ok.component';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  private assets: AssetInterface[] = [];


  constructor(private http: HttpClient, public dialog: MatDialog) { }

  //todo:user y pass dinamico
  getAssets(): Promise<AssetInterface[]> {
    let user = "mobile_user";
    let pass = "testing";
    let headers = new HttpHeaders()
      .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
      .set('Content-Type', 'application/x-www-form-urlencoded')

    if (this.assets.length > 0) {
      return Promise.resolve(this.assets);
    }
    
    return new Promise(resolve => {
      this.http.get('https://devactivofijo.saval.cl/webservice/rest/assets/', { headers })
        .subscribe((assets: any) => {
          //console.log(items.data);
          this.assets = assets.data;
          resolve(assets.data);
        });
    });
  }


  getAssetPorId(id: number) {
    if (this.assets.length > 0) {
      const asset = this.assets.find(p => p.id === id);
      return Promise.resolve(asset);
    }
    return this.getAssets().then(assets => {
      const asset = this.assets.find(p => p.id === id);
      return Promise.resolve(asset);
    });
  }

  getAssetPorCode(code: string) {
    if (this.assets.length > 0) {
      const asset = this.assets.find(p => p.code === code);
      return Promise.resolve(asset);
    }
    return this.getAssets().then(assets => {
      const asset = this.assets.find(p => p.code === code);
      return Promise.resolve(asset);
    });
  }

  getAssetPorReferalCode(referalCode: string) {
    if (this.assets.length > 0) {
      const asset = this.assets.find(p => p.referalCode === referalCode);
      return Promise.resolve(asset);

    }
    return this.getAssets().then(assets => {
      const asset = this.assets.find(p => p.referalCode === referalCode);
      return Promise.resolve(asset);
    });
  }

  getAssetPorRfid(rfidLabelSap: string) {
    if (this.assets.length > 0) {
      const asset = this.assets.find(p => p.rfidLabelSap === rfidLabelSap);
      return Promise.resolve(asset)
    }
    return this.getAssets().then(assets => {
      const asset = this.assets.find(p => p.rfidLabelSap === rfidLabelSap);
      return Promise.resolve(asset);
    });
  }

  getAssetPorrfid(rfidLabelSap: string) {
    if (this.assets.length > 0) {
      const asset = this.assets.find(p => p.rfidLabelSap === rfidLabelSap);
      return Promise.resolve(asset)
    }
    return this.getAssets().then(assets => {
      const asset = this.assets.find(p => p.rfidLabelSap === rfidLabelSap);
      return Promise.resolve(asset);
    });
  }





  getAssetPorValue(buscado: any) {

    alert('desde servicio' + buscado);


  }


  InsertAssets(formValue) {

    console.table(formValue);

    let user = "mobile_user";
    let pass = "testing";
    let headers = new HttpHeaders()
      .set('Authorization', `Basic ${btoa(user + ":" + pass)}`)
      .set("Content-Type", "text/plain")
    //.set("Content-Type", "application/json");
    //.set('Content-Type', 'application/x-www-form-urlencoded')//<--funciona desde servidor

    this.http.post("https://devactivofijo.saval.cl/webservice/rest/request/add", formValue, { headers })
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
              anyProperty: response.error
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
      //.set("Content-Type", "application/json");
      .set("Content-Type", "application/x-www-form-urlencoded");
    this.http.put("https://devactivofijo.saval.cl/webservice/rest/asset/update/" + ide, formValue, { headers })
      .subscribe(
        val => {
          console.log("PUT call successful value returned in body",
            val);
          this.dialog.open(UpdateOkComponent, {
            data: {
              anyProperty: ide
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
        this.http.put("https://devactivofijo.saval.cl/webservice/rest/asset/move/" + ide, formValue, { headers })
          .subscribe(
            val => {
              console.log("PUT call successful value returned in body",
                val);
                this.dialog.open(UpdateOkComponent, {
                  data: {
                    anyProperty: ide
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
    




      downAssets(formValue, ide) {



        const options = {
          headers: new HttpHeaders({
            "Authorization": "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==",
            "Content-Type": "application/x-www-form-urlencoded",
          }),
          body: {
            formValue
          },
        };
        
        this.http
          .delete("https://devactivofijo.saval.cl/webservice/rest/asset/delete/" + ide, options)
          .subscribe(
            val => {
              console.log("PUT call successful value returned in body",
                val);
              this.dialog.open(UpdateOkComponent, {
                data: {
                  anyProperty: ide
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

  





  }
  