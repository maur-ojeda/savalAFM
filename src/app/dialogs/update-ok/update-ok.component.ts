import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-ok',
  templateUrl: './update-ok.component.html',
  styleUrls: ['./update-ok.component.scss']
})
export class UpdateOkComponent implements OnInit {
  mensaje;
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<UpdateOkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.mensaje = this.data;
   
     
    }

  ngOnInit(): void {
    
  }

  
  
}

