import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-ok',
  templateUrl: './create-ok.component.html',
  styleUrls: ['./create-ok.component.scss']
})
export class CreateOkComponent implements OnInit {
  mensaje;
  constructor(public dialogRef: MatDialogRef<CreateOkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log('data passed in is:', this.data);
      this.mensaje = this.data;
      console.log('this.mensaje')
      console.log(this.mensaje.anyProperty.data.id)

     }

  ngOnInit(): void {
  }

}
