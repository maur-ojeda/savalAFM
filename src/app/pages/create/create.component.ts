import { Component, OnInit } from '@angular/core';
//service
import { FixedassetsService} from '../../services/fixedassets.service'
import { NgForm } from '@angular/forms';
import { Fixedasset } from 'src/app/models/fixedasset';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor( public fixedassetsService: FixedassetsService ) { }

  ngOnInit() {
    this.fixedassetsService.getFixedAssets
    this.resetForm();
  }

  resetForm(fixedAssetForm?: NgForm){
    if(fixedAssetForm != null){
      fixedAssetForm.reset();
      this.fixedassetsService.selectedFixedasset =  new Fixedasset();
    }
  }

  onSubmit(fixedAssetForm: NgForm){
      this.fixedassetsService.insertFixedAsset(fixedAssetForm.value);
      this.resetForm(fixedAssetForm);

  }

}
