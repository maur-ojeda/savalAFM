import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AssetInterface } from '../interfaces/asset.interface';



@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  private assets: AssetInterface[] = [];

 
  constructor(  private http: HttpClient ) { }

//todo:user y pass dinamico
getAssets(): Promise<AssetInterface[]>{
  let user ="mobile_user";
  let pass ="testing";
  let headers = new HttpHeaders()
  .set('Authorization',   `Basic ${btoa(user + ":" + pass)}`)
  .set('Content-Type', 'application/x-www-form-urlencoded')

  if ( this.assets.length > 0 ) {
    return Promise.resolve( this.assets );
  }

  return new Promise( resolve => {
    this.http.get('https://afsaval.agenciasur.cl/webservice/rest/assets/',{ headers })
      .subscribe( (assets: any) => {
        //console.log(items.data);
        this.assets = assets.data;
        resolve( assets.data );
      });
  });
}


getAssetPorId( id:number ) {
  if ( this.assets.length > 0 ) {
    const asset = this.assets.find( p => p.id === id );
    return Promise.resolve( asset );
  }
  return this.getAssets().then( assets => {
    const asset = this.assets.find( p => p.id === id );
    return Promise.resolve( asset );
  });
}

getAssetPorCode( code: string ) {
  if ( this.assets.length > 0 ) {
    const asset = this.assets.find( p => p.code === code );
    return Promise.resolve( asset );
  }
  return this.getAssets().then( assets => {
    const asset = this.assets.find( p => p.code === code );
    return Promise.resolve( asset );
  });
}

getAssetPorReferalCode( referalCode: string ) {
  if ( this.assets.length > 0 ) {
    const asset = this.assets.find( p => p.referalCode === referalCode );
    return Promise.resolve( asset );

  }
  return this.getAssets().then( assets => {
    const asset = this.assets.find( p => p.referalCode === referalCode );
    return Promise.resolve( asset );
  });
}

getAssetPorRfid( rfidLabelSap: string ) {
  if ( this.assets.length > 0 ) {
    const asset = this.assets.find( p => p.rfidLabelSap === rfidLabelSap );
    return Promise.resolve( asset )
  }
  return this.getAssets().then( assets => {
    const asset = this.assets.find( p => p.rfidLabelSap === rfidLabelSap );
    return Promise.resolve( asset );
  });
}

getAssetPorrfid( rfidLabelSap: string ) {
  if ( this.assets.length > 0 ) {
    const asset = this.assets.find( p => p.rfidLabelSap === rfidLabelSap );
    return Promise.resolve( asset )
  }
  return this.getAssets().then( assets => {
    const asset = this.assets.find( p => p.rfidLabelSap === rfidLabelSap );
    return Promise.resolve( asset );
  });
}





getAssetPorValue( buscado: any ) {

  alert('desde servicio' + buscado);


}


InsertAssets(formValue){

  let user ="mobile_user";
  let pass ="testing";

  let headers = new HttpHeaders()
    .set('Authorization',   `Basic ${btoa(user + ":" + pass)}`)
    .set("Content-Type", "application/json");
    //.set('Content-Type', 'application/x-www-form-urlencoded')//<--funciona desde servidor
    
this.http.post("https://afsaval.agenciasur.cl/webservice/rest/request/add",formValue,{headers})
  .subscribe(
      val => {
          console.log("PUT call successful value returned in body", 
                      val);
      },
      response => {
          console.log("PUT call in error", response);
      },
      () => {
          console.log("The PUT observable is now completed.");
      }
  );

}
updateAssets(formValue, ide){

  let user ="mobile_user";
  let pass ="testing";
  
  
    let headers = new HttpHeaders()
      .set('Authorization',   `Basic ${btoa(user + ":" + pass)}`)
      .set("Content-Type", "application/json");




this.http.put("https://afsaval.agenciasur.cl/webservice/rest/asset/update/"+ide,formValue,{headers})
    .subscribe(
        val => {
            console.log("PUT call successful value returned in body", 
                        val);
        },
        response => {
            console.log("PUT call in error", response);
        },
        () => {
            console.log("The PUT observable is now completed.");
        }
    );
}



deleteAssets(code: string ){


}

/*
httpPutExample() {

  const headers = new HttpHeaders()
  application/json
      .set("Content-Type", "application/json");
  
  this.http.put("/courses/-KgVwECOnlc-LHb_B0cQ.json",
      {
          "courseListIcon": ".../main-page-logo-small-hat.png",
          "description": "Angular Tutorial For Beginners TEST",
          "iconUrl": ".../angular2-for-beginners.jpg",
          "longDescription": "...",
          "url": "new-value-for-url"
      },
      {headers})
      .subscribe(
          val => {
              console.log("PUT call successful value returned in body", 
                          val);
          },
          response => {
              console.log("PUT call in error", response);
          },
          () => {
              console.log("The PUT observable is now completed.");
          }
      );
  }
*/

/*
  httpPatchExample() {

    this.http.patch("/courses/-KgVwECOnlc-LHb_B0cQ.json",
        {
            "description": "Angular Tutorial For Beginners PATCH TEST",
        })
        .subscribe(
            (val) => {
                console.log("PATCH call successful value returned in body", 
                            val);
            },
            response => {
                console.log("PATCH call in error", response);
            },
            () => {
                console.log("The PATCH observable is now completed.");
            });
    }
*/

/*
    httpDeleteExample() {

      this.http.delete("/courses/-KgVwECOnlc-LHb_B0cQ.json")
          .subscribe(
              (val) => {
                  console.log("DELETE call successful value returned in body", 
                              val);
              },
              response => {
                  console.log("DELETE call in error", response);
              },
              () => {
                  console.log("The DELETE observable is now completed.");
              });
      }

*/

/*
      httpPostExample() {

        this.http.post("/courses/-KgVwECOnlc-LHb_B0cQ.json",
            {
                "courseListIcon": "...",
                "description": "TEST",
                "iconUrl": "..",
                "longDescription": "...",
                "url": "new-url"
            })
            .subscribe(
                (val) => {
                    console.log("POST call successful value returned in body", 
                                val);
                },
                response => {
                    console.log("POST call in error", response);
                },
                () => {
                    console.log("The POST observable is now completed.");
                });
        }
*/ 
}
/*
$scope.buscar = function(){
  let arrBusqueda = $scope.buscarActividad.split(",");
  $scope.actividadesShow = 
  $scope.actividades
            .filter((item)=>{ 
               let a =  arrBusqueda.map((value)=>
               {
                return JSON.stringify(item)
                          .toUpperCase()
                          .indexOf(value.toUpperCase()) > -1 ? 1 : 0;
               }).reduce((x, y) => x + y);   
               return a > 0                 
              }) 

}*/