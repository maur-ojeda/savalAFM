import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-error',
  templateUrl: './delete-error.component.html',
  styleUrls: ['./delete-error.component.scss']
})
export class DeleteErrorComponent implements OnInit {
  mensaje;
  constructor(
    public dialogRef: MatDialogRef<DeleteErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
       this.mensaje = this.data;
           }

  ngOnInit(): void {
  }

}

