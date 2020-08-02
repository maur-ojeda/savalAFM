import { Component, OnInit } from '@angular/core';


//service
import { FixedassetsService } from '../../services/fixedassets.service'
//import { NgForm } from '@angular/forms';
import { Fixedasset } from 'src/app/models/fixedasset';

import { cClassInterface } from 'src/app/interfaces/class.interface';
import { ClassService } from 'src/app/services/class.service';
import { SpeciesInterface } from 'src/app/interfaces/specie.interface';
import { SpecieService } from 'src/app/services/specie.service';


import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AttributeInterface } from 'src/app/interfaces/attribute.interface';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss']
})
//validaciones asincronas = base de datos
//validaciones sicronas = formato de datos, o logica que no requiere consulta de datos




export class CreateComponent implements OnInit {



	  


	//formbuilder
	reactiveForm: FormGroup;
	cClasses: cClassInterface[] = [];
	species: SpeciesInterface[] = [];
	obj: SpeciesInterface;


	constructor(
		// public fixedassetsService: FixedassetsService,
		public cClassService: ClassService,
		public specieService: SpecieService,
		private builder: FormBuilder

	) {}
	
	ngOnInit() {
		this.cClassService.getcClass()
			.then(cClasses => this.cClasses = cClasses);	
			
			this.specieService.getSpecies()
			.then(species => this.species = species);

			

			this.reactiveForm = this.builder.group({
				
				catalogClass: ['', [Validators.required]],
				specie: ['', [Validators.required]],
				
			//	assetCount:["1",[]],
				sociedad: ['LS01', []],
				history_check: ['true', []],
				inventory_check: ['true', []],
				
				atributo_0: ['',[]],
				atributo_1: ['',[]],
				atributo_2: ['',[]],
				atributo_3: ['',[]],
				atributo_4: ['',[]],
				atributo_5: ['',[]],
				atributo_6: ['',[]],
				atributo_7: ['',[]],
				atributo_8: ['',[]],
				atributo_9: ['',[]],
			/*
				creditorId,
				assetOrigin,
				lifetimeYear
				*/
				
		});
	


		
	
		
	}



	onChange(e: string) {

	 this.specieService.getSpeciesPorId(e)
	 .then( obj => this.obj = obj)

	 
	 this.specieService.getSpeciesPorId(e)
	 .then( ra => {console.log(ra)})

	}

/*
// const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.paisesService.getPaisPorId( id ).then( pais => {

      if ( !pais ) {
        return this.router.navigateByUrl('/');
      }

      this.pais = pais;
      console.log( pais );

    });


*/





saveData() {		

const envio = {

	//"catalogClass": this.reactiveForm.value.catalogClass

	"catalogClass": this.reactiveForm.value.catalogClass,
	"specie": this.reactiveForm.value.catalogClass,
	"specieAttributes":[
	   {
		  "value": this.reactiveForm.value.catalogClass,
		  "specieAttribute": this.reactiveForm.value.catalogClass,
	   },
	   {
		  "value":this.reactiveForm.value.catalogClass,
		  "specieAttribute": this.reactiveForm.value.catalogClass,
	   }
	],
	"assetCount":this.reactiveForm.value.catalogClass,
 
 
	"assetRequestDetails":[
	   {
		  "serieNumber":this.reactiveForm.value.catalogClass,
		  "costCenter":this.reactiveForm.value.catalogClass,
		  "lCenter":this.reactiveForm.value.catalogClass,
		  "lBuilding":this.reactiveForm.value.catalogClass,
		  "lFloor":this.reactiveForm.value.catalogClass,
		  "lArea": this.reactiveForm.value.catalogClass,
		  "lRoom":this.reactiveForm.value.catalogClass,
	   }
	],
	
	"creditorId":this.reactiveForm.value.catalogClass,
	"newAsset": this.reactiveForm.value.catalogClass,
	"assetOrigin":this.reactiveForm.value.catalogClass,
	"lifetimeYear": this.reactiveForm.value.catalogClass,
}
		

		console.log(envio)

	}
}