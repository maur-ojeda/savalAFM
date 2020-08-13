import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-error',
  templateUrl: './create-error.component.html',
  styleUrls: ['./create-error.component.scss']
})



export class CreateErrorComponent implements OnInit {
  mensaje;
  constructor(public dialogRef: MatDialogRef<CreateErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      
    
      this.mensaje = this.data;

     }

  ngOnInit(): void {
  }

}
