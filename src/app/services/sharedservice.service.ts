import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Asset } from '../models/asset.model';
import { AssetInterface } from '../interfaces/asset.interface';


@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {
  
  API_URL ="https://devactivofijo.saval.cl:8443"
  private assets: AssetInterface[] = [];
  constructor(
    private location: Location,
    private router: Router,
    private http: HttpClient,
  ) { }


formatDate(f) {
  let dateInFormat = moment(f).format('DD-MM-YYYY HH:MM');
  return dateInFormat
}

goBack() {
  this.location.back();
}

toHome(){
  return this.router.navigateByUrl('/home');
}
/* original que consulta directamente al api*/
findByCode(code: string): Observable<Asset[]> {
  let cod = code
    if (cod.length > 23) {
      let last8 = cod.substr(code.length - 8);
      let hexa = parseInt(last8, 16);
      let hexaStr = hexa.toString();
      code = hexaStr;
    }
  let headers = new HttpHeaders()
    .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
    .set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.get<Asset[]>(this.API_URL + '/webservice/rest/assets/search?code=' + code, { headers })
}


listarAssets(): Observable<Asset[]> {
  let headers = new HttpHeaders()
    .set("Authorization", "Basic bW9iaWxlX3VzZXI6dGVzdGluZw==")
    .set('Content-Type', 'application/x-www-form-urlencoded')
  return this.http.get<Asset[]>(this.API_URL + '/webservice/rest/assets?all=true',{headers})
}


findByCode2(code: any) {
  //alert('buscando')
  //transformacion hexadecinal
//si no hay code
 if(code==""){
   alert('vacio') 
   //aviso de campo vacio 
 }else{
   

  var splitted = code.split("-", 3);
  let codigo = splitted[0]
  let subCodigo = splitted[1]
  

if( isNaN(codigo) ){
  this.findRfid(codigo)
}else if(!isNaN(subCodigo)){
  this.findCode(codigo)
}


 }
}



  




findCode(cod){
// buscar por code, codigo puede tener n zeros a la iquierda o no , devolver code

}

findRfid(code){
console.log('rfid' + code)

  return this.listarAssets()
  


  /*let cod = val
  if (cod.length > 23) {
    let last8 = cod.substr(cod.length - 8);
    let hexa = parseInt(last8, 16);
    let hexaStr = hexa.toString();
    val = hexaStr;
  }

  this.listarAssets().subscribe(
    asset => {
      let este = asset.find( p => p.rfidLabelSap === cod)
      console.log(este)
      return este;
    },
    (error) =>{console.log(error)}
      
  )
*/

}

findReferalCode(cod){

 /* this.listarAssets().subscribe(
    asset => {
      let este = asset.find( p => p.referalCode === cod)
      console.log(este)
      return este;
    },
    (error) =>{console.log(error)}
      
  )
*/

}







}
