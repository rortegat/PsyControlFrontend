import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-application-info',
  templateUrl: './application-info.component.html',
  styleUrls: ['./application-info.component.scss']
})
export class ApplicationInfoComponent implements OnInit {

  public response: boolean

  constructor(
    public dialogRef: MatDialogRef<ApplicationInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public info: any) { }

  ngOnInit(): void {
  }

  closeDialog(response: boolean){
    this.dialogRef.close(response)
  }

}
