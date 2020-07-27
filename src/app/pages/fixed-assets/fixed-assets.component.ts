import { Component, OnInit, ViewChild } from '@angular/core';
import { AssetsService } from '../../services/assets.service';
import { AssetInterface } from '../../interfaces/asset.interface';


import { Router } from '@angular/router';
import { RequestInterface } from 'src/app/interfaces/request.interface';
import { RequestsService } from 'src/app/services/requests.service';



@Component({
  selector: 'app-fixed-assets',
  templateUrl: './fixed-assets.component.html',
  styleUrls: ['./fixed-assets.component.scss']
})




export class FixedAssetsComponent implements OnInit {


  elements: any = [];
  headElements = ['id', 'first', 'last', 'handle'];

  //val: string = ''; 

  assets: AssetInterface[] = [];
  requests: RequestInterface[] = [];

  constructor(
    private assetsService: AssetsService,
    private requestsService: RequestsService,
    private router: Router) { }

  ngOnInit(): void {


    for (let i = 1; i <= 15; i++) {
      this.elements.push({ id: i, first: 'User ' + i, last: 'Name ' + i, handle: 'Handle ' + i });
    }


    
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








  }