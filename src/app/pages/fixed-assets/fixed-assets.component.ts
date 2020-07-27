import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../services/assets.service';
import { AssetInterface } from '../../interfaces/asset.interface';
import { Router } from '@angular/router';
import { RequestInterface } from 'src/app/interfaces/request.interface';
import { RequestsService } from 'src/app/services/requests.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-fixed-assets',
  templateUrl: './fixed-assets.component.html',
  styleUrls: ['./fixed-assets.component.scss']
})




export class FixedAssetsComponent implements OnInit {

  assets: AssetInterface[] = [];
  requests: RequestInterface[] = [];

  closeResult = '';

  constructor(
    private assetsService: AssetsService,
    private requestsService: RequestsService,
    private modalService: NgbModal,
    private router: Router) { }

  ngOnInit(): void {


    
    this.assetsService.getAssets()
    .then( assets => this.assets = assets );

    this.requestsService.getRequests()
    .then( requests => this.requests = requests )
    
}


navigateTo(value) {
  if (value) {
      this.router.navigate([value]);
  }
  return false;
}

/*
myFunction(): void { 
  alert(this.val); 
   
} 
onOptionsSelected(value:string){
  console.log("the selected value is " + value);
}


*/



open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}




  }