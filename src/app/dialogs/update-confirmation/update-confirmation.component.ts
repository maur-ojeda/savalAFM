import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-confirmation',
  templateUrl: './update-confirmation.component.html',
  styleUrls: ['./update-confirmation.component.scss']
})
export class UpdateConfirmationComponent implements OnInit {
  mensaje;
  constructor(
    public dialogRef: MatDialogRef<UpdateConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
       this.mensaje = this.data;
           }
  ngOnInit(): void {
  }

}
