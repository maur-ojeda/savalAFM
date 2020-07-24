import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Fixedasset } from '../models/fixedasset';

import { FixedAssetStep1 } from '../models/fixed-asset-step1';
import { FixedAssetStep2 } from '../models/fixed-asset-step2';
import { FixedAssetStep3 } from '../models/fixed-asset-step3';
import { FixedAssetStep4 } from '../models/fixed-asset-step4';
import { FixedAssetStep5 } from '../models/fixed-asset-step5';
import { FixedAssetStep6 } from '../models/fixed-asset-step6';

@Injectable({
  providedIn: 'root'
})
export class FixedAssetDataService {

  fixedAssetList:AngularFireList<any>;
  selectedFixedasset : Fixedasset = new Fixedasset();


  fixedAssetStep1 : FixedAssetStep1;
  fixedAssetStep2 : FixedAssetStep2;
  fixedAssetStep3 : FixedAssetStep3;
  fixedAssetStep4 : FixedAssetStep4;
  fixedAssetStep5 : FixedAssetStep5;
  fixedAssetStep6 : FixedAssetStep6;

  constructor(private firebase: AngularFireDatabase) { 
    this.fixedAssetStep1 = new FixedAssetStep1();
    this.fixedAssetStep2 = new FixedAssetStep2();
    this.fixedAssetStep3 = new FixedAssetStep3();
    this.fixedAssetStep4 = new FixedAssetStep4();
    this.fixedAssetStep5 = new FixedAssetStep5();
    this.fixedAssetStep6 = new FixedAssetStep6();
  }





  getFixedAsset(){
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
  postData(){
    let newCombinedObject = {
      fixedAssetStep1 : this.fixedAssetStep1, 
      fixedAssetStep2 : this.fixedAssetStep2,
      fixedAssetStep3 : this.fixedAssetStep3,
      fixedAssetStep4 : this.fixedAssetStep4,
      fixedAssetStep5 : this.fixedAssetStep5,
      fixedAssetStep6 : this.fixedAssetStep6,
    }




    
  }





  
}
