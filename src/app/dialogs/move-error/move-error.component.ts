import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-move-error',
  templateUrl: './move-error.component.html',
  styleUrls: ['./move-error.component.scss']
})
export class MoveErrorComponent implements OnInit {
  mensaje;
  constructor(
    public dialogRef: MatDialogRef<MoveErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
       this.mensaje = this.data;
           }

  ngOnInit(): void {
  }

}

