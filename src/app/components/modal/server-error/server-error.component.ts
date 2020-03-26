import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss']
})
export class ServerErrorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ServerErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public error: any) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
