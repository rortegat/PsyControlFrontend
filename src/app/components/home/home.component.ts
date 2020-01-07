import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSnackBar, MatDialog } from '@angular/material';
import { PatientAddComponent } from '../patient/patient-add/patient-add.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {


  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;


  constructor(
    private snack: MatSnackBar,
    public dialog: MatDialog,
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  nuevo(){

    const dialogRef = this.dialog.open(PatientAddComponent, {
      width: '650px',
      //data: user
    });
    dialogRef.afterClosed().subscribe(rsp => {
      console.log(rsp);
      if(rsp!=undefined)
      this.snack.open("Contacto agregado")._dismissAfter(2000)
    })
  }

}
