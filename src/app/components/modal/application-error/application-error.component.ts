import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-application-error',
  templateUrl: './application-error.component.html',
  styleUrls: ['./application-error.component.scss']
})
export class ApplicationErrorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ApplicationErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public error: any) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
