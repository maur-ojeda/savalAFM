import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-fixed-asset-rejected',
  templateUrl: './fixed-asset-rejected.component.html',
  styleUrls: ['./fixed-asset-rejected.component.scss']
})
export class FixedAssetRejectedComponent implements OnInit {

  constructor(private location: Location ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

  
}
