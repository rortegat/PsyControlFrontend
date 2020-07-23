import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from 'src/app/models/patient';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';
import { PatientService } from 'src/app/services/api/patient.service';
import { PatientAddComponent } from '../patient-add/patient-add.component';
import { PatientEditComponent } from '../patient-edit/patient-edit.component';
import { Router } from '@angular/router';
import { ApplicationInfoComponent } from '../../modal/application-info/application-info.component';
import { ApplicationErrorComponent } from '../../modal/application-error/application-error.component';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'phone', 'mobile', 'accion'];
  public patients: MatTableDataSource<Patient>;
  public filterValue: string = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private snack: MatSnackBar,
    public dialog: MatDialog,
    private session: SessionService,
    private patient: PatientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    setTimeout(() => { this.session.loading.next(true) }, 0);
    this.patient.getPatients().subscribe((rsp) => {
      this.patients = new MatTableDataSource(rsp);
      this.patients.paginator = this.paginator;
      this.session.loading.next(false);
    });
  }

  clear() {
    this.filterValue = "";
    this.patients.filter = "";
  }

  filterField(filterValue: string) {
    this.patients.filter = filterValue.trim().toLowerCase();
  }

  addPatient(): void {
    const dialogRef = this.dialog.open(PatientAddComponent, {})

    dialogRef.afterClosed().subscribe(rsp => {
      if (rsp != undefined) {
        this.patient.createPatient(rsp).subscribe(() => {
          this.loadData();
          this.snack.open("Paciente Agregado")._dismissAfter(2000);
        });
      }
    });
  }

  editPatient(id: number): void {

    this.patient.getPatient(id).subscribe(rsp => {
      const dialogRef = this.dialog.open(PatientEditComponent, {
        data: rsp
      });

      dialogRef.afterClosed().subscribe(rsp => {
        if (rsp != undefined) {
          this.patient.updatePatient(rsp).subscribe(
            () => {
              this.loadData();
              this.snack.open("Paciente modificado")._dismissAfter(2000);
            });
        }
      });
    });
  }

  deletePatientButton(patient: Patient): void {
    var info: any = {
      action: "Eliminar paciente",
      message: "Está seguro de eliminar al paciente " + patient.firstname,
    };
    const dialogRef = this.dialog.open(ApplicationInfoComponent, {
      data: info
    });
    dialogRef.afterClosed().subscribe(rsp => {
      if (rsp == true)
        this.deletePatient(patient);
    });
  }

  deletePatient(patient: Patient): void {
    this.patient.deletePatient(patient.id).subscribe(
      () => {
        this.snack.open("Paciente Eliminado")._dismissAfter(2000);
        this.router.navigate(['/home/patient-list']);
      },
      (error) => {
        console.log(error);
        this.dialog.open(ApplicationErrorComponent, {
          data: error
        });
      });
  }

  onSelect(row: Patient): void {
    console.log(row);
    this.router.navigate(["home/patient", row.id]);
  }

}
