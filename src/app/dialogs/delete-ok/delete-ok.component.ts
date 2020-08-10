import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-ok',
  templateUrl: './delete-ok.component.html',
  styleUrls: ['./delete-ok.component.scss']
})
export class DeleteOkComponent implements OnInit {
  mensaje;
  constructor(public dialogRef: MatDialogRef<DeleteOkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      // console.log('data:', this.data);
      // console.log('mensaje:', this.data);
      this.mensaje = this.data;
      // console.log(this.mensaje.)
      // console.log(this.mensaje.anyProperty.data.id)

     }

  ngOnInit(): void {
  }

}