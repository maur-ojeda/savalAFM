import { Component } from '@angular/core';
import { FixedAsset } from './models/fixed-asset';
import { FixedAssetDataService } from './services/fixed-asset-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'savalAFM';
  constructor() {
  }
}
