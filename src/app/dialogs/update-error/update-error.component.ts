import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-update-error',
  templateUrl: './update-error.component.html',
  styleUrls: ['./update-error.component.scss']
})
export class UpdateErrorComponent implements OnInit {
  mensaje;
  constructor(
    public dialogRef: MatDialogRef<UpdateErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
       this.mensaje = this.data;
           }

  ngOnInit(): void {
  }

}

