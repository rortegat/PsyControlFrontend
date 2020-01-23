import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from 'src/app/models/patient';
import { MatSnackBar, MatDialog } from '@angular/material';
import { SessionService } from 'src/app/services/session.service';
import { PatientService } from 'src/app/services/api/patient.service';
import { PatientAddComponent } from '../patient-add/patient-add.component';
import { PatientEditComponent } from '../patient-edit/patient-edit.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  public displayedColumns: string[] = ['firstname', 'lastname', 'email', 'phone', 'mobile', 'accion'];
  public patients: MatTableDataSource<Patient>;

  public filterValue:string=""

  constructor(
    private snack: MatSnackBar,
    public dialog: MatDialog,
    private session: SessionService,
    private patient: PatientService,
    private router: Router
  ) {

  }

  ngOnInit() {
    setTimeout(() => { this.session.loading.next(true) }, 0)

    this.patient.getPatients().subscribe((rsp) => {
      this.patients = new MatTableDataSource(rsp)
      this.session.loading.next(false)
    })
  }

  clear() {
    this.filterValue = "";
    this.patients.filter = "";
  }

  filterField(filterValue: string) {
    this.patients.filter = filterValue.trim().toLowerCase();
  }

  addPatient() {
    const dialogRef = this.dialog.open(PatientAddComponent, {
      //width: '650px',
      //data: asset
    })

    dialogRef.afterClosed().subscribe(rsp => {
      console.log(rsp)
      if (rsp != undefined) {
        this.patient.createPatient(rsp).subscribe(() => {
          this.patient.getPatients().subscribe(rsp => this.patients.data = rsp)
          this.snack.open("Paciente Agregado")._dismissAfter(2000)
        })
      }
    })
  }

  editPatient(id: number) {

    this.patient.getPatient(id).subscribe(rsp => {
      console.log(rsp);
      const dialogRef = this.dialog.open(PatientEditComponent, {
        width: '650px',
        data: rsp
      });

      dialogRef.afterClosed().subscribe(rsp => {
        console.log(rsp);
        if (rsp != undefined) {
          this.patient.updatePatient(rsp).subscribe(
            () => {
              this.patient.getPatients().subscribe(rsp => this.patients.data = rsp)
              this.snack.open("Paciente modificado")._dismissAfter(2000)
            }
          );
        }
      });


    })
  }

  onSelect(row:Patient) {
    console.log(row)
    this.router.navigate(["home/patient",row.id])
  }



}
