import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-move-ok',
  templateUrl: './move-ok.component.html',
  styleUrls: ['./move-ok.component.scss']
})
export class MoveOkComponent implements OnInit {

  mensaje;
  constructor(public dialogRef: MatDialogRef<MoveOkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.mensaje = this.data;
     }

  ngOnInit(): void {
  }

}
