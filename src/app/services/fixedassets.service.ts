/**
 * GRABA EN FIRESTORE
*/

import { Injectable } from '@angular/core';
//import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Fixedasset } from '../models/fixedasset';

@Injectable({
  providedIn: 'root'
})
export class FixedassetsService {

  //fixedAssetList:AngularFireList<any>;
  selectedFixedasset : Fixedasset = new Fixedasset();

  constructor( 
    //private firebase: AngularFireDatabase
    ) { }
/*
 
  getFixedAssets(){
    this.fixedAssetList = this.firebase.list('fixedAssets');
  }
  insertFixedAsset(fixedasset: Fixedasset){
    this.fixedAssetList.push({
      fechaCreacion: fixedasset.fechaCreacion,
      creadoPor: fixedasset.creadoPor,
      codigo: fixedasset.codigo,
      codigoRfid: fixedasset.codigoRfid,
      claseActivoFijo: fixedasset.claseActivoFijo,
      sociedad: fixedasset.sociedad,
      especie: fixedasset.especie,
      gestionHistorica: fixedasset.gestionHistorica,
      denominacion: fixedasset.denominacion,
      listaInventario: fixedasset.listaInventario,
      cuenta: fixedasset.cuenta,
      centroCosto: fixedasset.centroCosto,
      centro: fixedasset.centro,
      area: fixedasset.area,
      edificio: fixedasset.edificio,
      sala: fixedasset.sala,
      piso: fixedasset.piso,
      acreedor: fixedasset.acreedor,
      fabricante: fixedasset.fabricante,
      condicion: fixedasset.condicion,
      agnosVidaUtil: fixedasset.agnosVidaUtil
    })
  }
  updateFixedAsset(fixedasset: Fixedasset){

    this.fixedAssetList.update(fixedasset.$key, {
      fechaCreacion: fixedasset.fechaCreacion,
      creadoPor: fixedasset.creadoPor,
      codigo: fixedasset.codigo,
      codigoRfid: fixedasset.codigoRfid,
      claseActivoFijo: fixedasset.claseActivoFijo,
      sociedad: fixedasset.sociedad,
      especie: fixedasset.especie,
      gestionHistorica: fixedasset.gestionHistorica,
      denominacion: fixedasset.denominacion,
      listaInventario: fixedasset.listaInventario,
      cuenta: fixedasset.cuenta,
      centroCosto: fixedasset.centroCosto,
      centro: fixedasset.centro,
      area: fixedasset.area,
      edificio: fixedasset.edificio,
      sala: fixedasset.sala,
      piso: fixedasset.piso,
      acreedor: fixedasset.acreedor,
      fabricante: fixedasset.fabricante,
      condicion: fixedasset.condicion,
      agnosVidaUtil: fixedasset.agnosVidaUtil
    })
  }
  deleteFixedAsset($key: string){
    this.fixedAssetList.remove($key);
  }
*/
}
