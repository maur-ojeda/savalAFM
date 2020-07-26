import { Component, OnInit, ViewChild } from '@angular/core';
import { AssetsService } from '../../services/assets.service';
import { AssetInterface } from '../../interfaces/asset.interface';
import { Router } from '@angular/router';





@Component({
  selector: 'app-fixed-assets',
  templateUrl: './fixed-assets.component.html',
  styleUrls: ['./fixed-assets.component.scss']
})




export class FixedAssetsComponent implements OnInit {


  //val: string = ''; 

  assets: AssetInterface[] = [];
  


  constructor(private assetsService: AssetsService, private router: Router) { }

  ngOnInit(): void {
    this.assetsService.getAssets()
    .then( assets => this.assets = assets );
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