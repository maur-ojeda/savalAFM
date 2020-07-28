import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-fixed-asset-closed',
  templateUrl: './fixed-asset-closed.component.html',
  styleUrls: ['./fixed-asset-closed.component.scss']
})
export class FixedAssetClosedComponent implements OnInit {

  constructor(
    private location: Location 
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

}

