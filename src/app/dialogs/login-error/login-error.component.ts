import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login-error',
  templateUrl: './login-error.component.html',
  styleUrls: ['./login-error.component.scss']
})
export class LoginErrorComponent implements OnInit {
  mensaje;
  constructor(
    public dialogRef: MatDialogRef<LoginErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
       this.mensaje = this.data;
           }

  ngOnInit(): void {
  }

}