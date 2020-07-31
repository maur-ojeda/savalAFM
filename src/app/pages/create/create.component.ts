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
	//species: SpeciesInterface[] = [];


	constructor(
		// public fixedassetsService: FixedassetsService,
		public cClassService: ClassService,
		// public specieService: SpecieService,
		private builder: FormBuilder

	) {

	}

	ngOnInit() {

		this.cClassService.getcClass()
			.then(cClasses => this.cClasses = cClasses);
		
			this.reactiveForm = this.builder.group({
			select: ['', [Validators.required]],
			text: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]]
		});
		
		this.reactiveForm.valueChanges.subscribe(console.log);
		//console.log(this.reactiveForm.controls.select.status)
		console.log(this.reactiveForm.controls.select.errors.required)

		console.log('select=========')
		console.log(this.reactiveForm.get('select').hasError('required'))


	}





	changeSelect(e) {
		console.log(e.value)
		/*this.select.setValue(e.target.value, {
		  onlySelf: true
		})*/
	  }



	//on submit
	saveData() {
		console.log(this.reactiveForm.value)
	}










	//this.fixedassetsService.getFixedAssets

    /*
   */
	/*
	  this.specieService.getSpecies()
	  .then( species => this.species = species );
	*/
	/*
	 saveData(){
	   console.log(this.myForm.value);
	 }
   */


	// this.resetForm();
}
/*
  resetForm(fixedAssetForm?: NgForm){
    if(fixedAssetForm != null){
      fixedAssetForm.reset();
      this.fixedassetsService.selectedFixedasset =  new Fixedasset();
    }
  }
*/
/*
  onSubmit(fixedAssetForm: NgForm){
      this.fixedassetsService.insertFixedAsset(fixedAssetForm.value);
      this.resetForm(fixedAssetForm);

  }

}
*/


/*

<!--

				<form>
					<div class="row mb-5">
						<div class="col-12">
						<h5 class="text-left">Datos activo fijo</h5>
							<!--clases-->
							<div class="form-group">
								<label for="">Clase</label>
								<div class="form-group">
									<label for=""></label>
									<select class="custom-select">
										<option>Seleccione...</option>
										<option *ngFor="let cClass of cClasses">{{cClass.name}}
											{{cClass.code}}
											{{cClass.id}}</option>
									</select>
								</div>

							</div>
							<!--sociedad-->
							<div class="form-group">
								<label for="">Sociedad</label>
								<input readonly value="LS01" type="text" class="form-control" >
							</div>
							<!--historia-->
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="history_check" checked="" disabled="disabled"/>
								<label class="custom-control-label" for="history_check">Gestión histórica</label>
							</div>
							<!--inventario-->
							<div class="form-group">
								<div class="custom-control custom-checkbox">
									<input type="checkbox" class="custom-control-input" id="inventory_check" checked="" disabled="disabled"/>
									<label class="custom-control-label" for="inventory_check">Incluir activo fijo en lista inventario</label>
								</div>
							</div>
							<!--especies-->
							<div class="form-group">
								<label for="">Especie</label>
								<div class="form-group">
									<label for=""></label>
									<select class="custom-select">
										<option>Seleccione...</option>
										<option *ngFor="let specie of species">
											{{specie.id}}  -  {{specie.name}} -  {{specie.code}}  {{specie.attributes[0].id}}
										</option>
									</select>
								</div>

							</div>

								<div class="col-12 mt-3">
									<button type="button" class="btn btn-lg btn-block btn-primary" type="submit">
										Guardar cambios
									</button>
									<!--button type="button" class="btn btn-lg btn-block btn-secondary" type="reset" (click)="resetForm(fixedAssetForm)">
																																				RESET</button-->
								</div>


						</div>
					</div>
				</form>

		-->

*/