import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss']
})
export class WarningComponent implements OnInit {
  mensaje;
  constructor(
    public dialogRef: MatDialogRef<WarningComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.mensaje = this.data;
   }

  ngOnInit(): void {
  }

}
