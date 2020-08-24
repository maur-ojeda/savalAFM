import { Component, OnInit } from '@angular/core';
import { SharedserviceService} from '../../services/sharedservice.service'

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {

  constructor(
    public utils: SharedserviceService
  ) { }

  ngOnInit(): void {
  }

}
